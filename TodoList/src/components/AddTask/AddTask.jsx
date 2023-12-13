import { useState,useContext, useRef, memo } from "react";
import { useTranslation } from "react-i18next";
import { CSSTransition } from "react-transition-group";
import Context from "../../contexts/context";
import TextareaAutosize from "react-textarea-autosize";
import Comment from "../../common/Comment/Comment";
import Priority from "../../common/Priority/Priority";
import Day from "../../common/Day/Day";
import useGetPriority from "../../customHooks/useGetPriority";
import useGetDay from "../../customHooks/useGetDay";
import useGetDate from "../../customHooks/useGetDate";
import useAddData from "../../customHooks/API/useAddData";

const AddTask = () => {
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
	const { addForm, setAddForm,setTaskEdit, settings } = useContext(Context);
	const {today} = useGetDate();
	const [body, setBody] = useState('');
	const { t } = useTranslation();
	const nodeRef = useRef(null);
	const timeout = 500;
	function handlerTextArea(e){ // submit using Enter
		if(e.which === 13){
			if(body.trim()){
				handlerSubmit(e);
			}
			return
		};
	}

	function handlerDefault() {
		setBody('');
		handlerSelectValueDay(t("today"),today(),'fas fa-calendar-week');
		handlerSelectValuePriority('', 4);
		setComment('');
	}
	function handlerSubmit(e){
		e.preventDefault();
		try{
			addTask(body,date,priority,comment);
			handlerDefault();
		} catch(e){
			alert(e.message);
		}
	}
	function handlerCancel() {
		setAddForm(false);
		handlerDefault();
		if(settings.vibration) navigator.vibrate(8); // togle vibration
	}
	function handlerAddTask() {
		if(settings.vibration) navigator.vibrate(8); // togle vibration
		setAddForm(true);
		setTaskEdit({id:null});
	}

	return (
		<div className="main__editor-task">
			<CSSTransition 
			in={addForm}
			classNames="height" 
			timeout={timeout}
			nodeRef={nodeRef}
			unmountOnExit
			onEnter={() => setAddForm(true)}
			onExited={() => setAddForm(false)}>
				<form ref={nodeRef} className="main-editor-task__form" onSubmit={handlerSubmit}>
					<div className="textarea__body">
						<TextareaAutosize 
							className="textarea__text" 
							maxRows="6" 
							minRows="2" 
							autoFocus 
							placeholder="Task name"
							value={body}
							onChange={(e) => setBody(e.target.value)}
							onKeyDown={(e) => handlerTextArea(e)}>
						</TextareaAutosize>
						<div className="textarea__bottom">
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
									<Comment comment={comment} setComment={handlerSetComment}/>
								</div>
							</div>
						</div>
					</div>
					<div className="main-editor-task-form__action">
						<button 
							className="main-editor-task-form__btn-submit btn-submit" 
							type="submit"
							disabled={body.length > 500 || comment.length > 500 || !body.trim()}>
						{t("addTask")}</button>
						<button 
							className="main-editor-task-form__btn-cancel btn-cancel"
							type="button"
							onClick={handlerCancel.bind(null)}>
						{t("cancel")}</button>
					</div>
				</form>
			</CSSTransition>
			{!addForm && 
				<button className="main-editor-task__btn" onClick={handlerAddTask.bind(null)}>
					<i className="fas fa-plus"></i>
					<span>{t("addTask")}</span>
				</button>
			}
		</div>
	);
}
 
export default memo(AddTask);