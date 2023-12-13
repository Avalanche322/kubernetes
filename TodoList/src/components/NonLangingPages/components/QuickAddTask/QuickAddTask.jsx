import './quick-add-task.scss'

import { useEffect, useState, React, useRef } from "react";
import { useTranslation } from "react-i18next";
import { CSSTransition } from "react-transition-group";
import TextareaAutosize from "react-textarea-autosize";
import Comment from "../../../../common/Comment/Comment";
import Priority from "../../../../common/Priority/Priority";
import Day from "../../../../common/Day/Day";
import useGetPriority from "../../../../customHooks/useGetPriority";
import useGetDay from "../../../../customHooks/useGetDay";
import useGetDate from "../../../../customHooks/useGetDate";
import useAddData from "../../../../customHooks/API/useAddData";

const QuickAddTask = ({isOpen, handlerIsOpen}) => {
	/*hook add task*/
	const {addTask} = useAddData();
	/* Select day*/
	const {setIsSelectDayOpen,handlerSelectValueDay,date,isDayClass,isSelectDayOpen,isDay,isSelectDay,setIsDay,setIsDayClass,handlerInputDateSubmit} = useGetDay();	
	/* Select priority*/
	const {handlerSelectValuePriority,priority,isSelecPriority,isPriorityClass,handlerPriorityOpen,isSelectPriorityOpen,} = useGetPriority();
	/* Select comment*/
	const [comment, setComment] = useState('');
	function handlerSetComment(text) {
		setComment(text);
	}
	/*Common*/
	const {today} = useGetDate();
	const [body, setBody] = useState('');
	const quickAddTasRef = useRef(null);
	const { t } = useTranslation();
	const [isQuickComment, setIsQuickComment] = useState(false);
	
	function handlerDefault() {
		setBody('');
		handlerSelectValueDay('today',today(),'fas fa-calendar-week');
		handlerSelectValuePriority('', 4);
		setComment('');
	}
	function handlerTextArea(e){
		if(e.nativeEvent.inputType === "insertLineBreak"){
			if(body.trim()){
				handlerSubmit(e);
			}
			return
		};
		setBody(e.target.value);
	}
	function handlerSubmit(e){
		e.preventDefault();
		try{
			addTask(body,date,priority,comment);
			handlerIsOpen(false);
			handlerDefault();
		} catch(e){
			alert(e.message);
		}
	}
	function handlerCancel(){
		handlerIsOpen(false);
		handlerDefault();
	}
	useEffect(() =>{
		if(isOpen){
			let hendler = (event) =>{
				if(!quickAddTasRef.current.contains(event.target)){
					handlerCancel();
				}
			}
			document.addEventListener("mousedown", hendler)
			return () =>{
				document.removeEventListener("mousedown", hendler)
			}
		}
	})
	useEffect(() => {
		if(isOpen && !isSelectPriorityOpen && !isSelectDayOpen && !isQuickComment){
			let hendler = (event) => {
				if(event.code === 'Escape'){
					handlerCancel();
				}
			}
			document.addEventListener('keydown', hendler);
			return () =>{
				document.removeEventListener("keydown", hendler)
			}
		}
	//eslint-disable-next-line
	})
	return (
		<CSSTransition 
			in={isOpen}
			classNames="scale" 
			timeout={300}
			nodeRef={quickAddTasRef}
			unmountOnExit
			onEnter={() => handlerIsOpen(true)}
			onExited={() => handlerIsOpen(false)}>
			<div className="quick-add">
				<div ref={quickAddTasRef} className="quick-add__body textarea__body">
					<form className="quick-add__form" onSubmit={handlerSubmit}>
						<div className="quick-add__edit">
							<TextareaAutosize 
								className="quick-add__text textarea__text" 
								maxRows="6" 
								minRows="2" 
								autoFocus 
								placeholder={t("taskName")}
								value={body}
								onChange={(e) => handlerTextArea(e)}>
							</TextareaAutosize>
							<div className="quick-add__bottom textarea__bottom">
							{body.length > 500 ? 
							<div className="denger limit">{t("taskNameCharacterLimit")} {body.length} / 500</div> : 
							comment.length > 500 ?
							<div className="denger limit">{t("commentNameCharacterLimit")} {comment.length} / 500</div> 
							: null}
								<div className="textarea__block">
									<Day
										handlerInputDateSubmit={handlerInputDateSubmit}
										setIsSelectDayOpen={setIsSelectDayOpen} 
										isDayClass={isDayClass} 
										isSelectDayOpen={isSelectDayOpen}
										isDay={isDay}
										date={date}
										isSelectDay={isSelectDay}
										handlerSelectValueDay={handlerSelectValueDay}
										setIsDay={setIsDay}
										setIsDayClass={setIsDayClass}/>
									<div className="textarea__group">
										<Priority 
											isSelecPriority={isSelecPriority} 
											isPriorityClass={isPriorityClass} 
											handlerSelectValuePriority={handlerSelectValuePriority}
											setIsSelectPriorityOpen={handlerPriorityOpen}
											isSelectPriorityOpen={isSelectPriorityOpen}/>
										<Comment 
											comment={comment}
											setComment={handlerSetComment}
											isQuickComment={isQuickComment}
											setIsQuickComment={setIsQuickComment} />
									</div>
								</div>
							</div>
						</div>
						<div className="quick-add__action">
							<button 
								className="btn-submit" 
								disabled={!body.trim()}
								type="submit">
							{t("addTask")}</button>
							<button 
								className="btn-cancel"
								type="button"
								onClick={handlerCancel.bind(null)}>
							{t("cancel")}</button>
						</div>
					</form>
				</div>
			</div>
		</CSSTransition>
	);
}
 
export default QuickAddTask;