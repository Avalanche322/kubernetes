import { memo, useContext, useMemo, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import Comment from "../../common/Comment/Comment";
import Priority from "../../common/Priority/Priority";
import Day from "../../common/Day/Day";
import useGetPriority from "../../customHooks/useGetPriority";
import useGetDay from "../../customHooks/useGetDay";
import { useTranslation } from "react-i18next";
import useGetDate from "../../customHooks/useGetDate";
import Context from "../../contexts/context";
import useEditData from "../../customHooks/API/useEditData";

const Edit = ({cancel,task}) => {
	const [body,setBody] = useState(task.body);
	const {today} = useGetDate();
	const {comments} = useContext(Context);
	const [comment, setComment] = useState({text: "",posted_uid: task.id, date_posted: today()});
	const [date, setDate] = useState(task.date);
	const [priority, setPriority] = useState(task.priority);
	const [error, setError] = useState('');
	const { t } = useTranslation();

	/*hook edit task*/
	const{editTask} = useEditData();

	function handlerSubmit(e){
		e.preventDefault();
		try{
			editTask(body,date,priority,comment,task);
			cancel();
		} catch(e){
			setError(e.message);
			alert(error);
		}
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

	// eslint-disable-next-line
	const lessCodeThanCheckingPrevRow = useMemo(() =>{ // not sure about this function
		for (const com of comments) {
			if(com.posted_uid === task.id){
				setComment(com);
			}
		}
	// eslint-disable-next-line
	}, [task])

	/* Select day*/
	const {setIsSelectDayOpen,isSelectDayOpen,isSelectDay,isDayClass,isDay,handlerSelectValueDay,setIsDay,setIsDayClass,handlerInputDateSubmit} = useGetDay();
	/* Select priority*/
	const {isSelecPriority,handlerPriorityOpen,isSelectPriorityOpen,handlerSelectValuePriority} = useGetPriority();
	/* Select comment*/
	function handlerSetComment(text) {
		setComment(prevState => ({
			...prevState,
			text
		}));
	}
	return (	
		<form className="main-editor-task__form" onSubmit={handlerSubmit}>
			<div className="textarea__body">
				<TextareaAutosize 
					className="textarea__text" 
					maxRows="6" 
					minRows="2" 
					autoFocus 
					placeholder="Task name"
					value={body}
					onChange={(e) => handlerTextArea(e)}>
				</TextareaAutosize>
				<div className="main-editor-task-form__bottom">
					{comment && (body.length > 500 ? 
					<div className="denger limit">{t("taskNameCharacterLimit")} {body.length} / 500</div> : 
					comment.text.length > 500 ?
						<div className="denger limit">{t("commentNameCharacterLimit")} {comment.length} / 500</div> 
						: null)}
					<div className="textarea__block">
						<Day
						setIsSelectDayOpen={setIsSelectDayOpen}
						handlerInputDateSubmit={handlerInputDateSubmit}
						isDayClass={isDayClass}
						isSelectDayOpen={isSelectDayOpen}
						isDay={isDay}
						date={date}
						handlerSetDate={setDate}
						isSelectDay={isSelectDay}
						handlerSelectValueDay={handlerSelectValueDay}
						setIsDay={setIsDay}
						setIsDayClass={setIsDayClass}/>
					<div className="textarea__group">
						<Priority 
							isSelecPriority={isSelecPriority} 
							isPriorityClass={priority === 4 ? '' : `priority-${priority}`}
							handlerSelectValuePriority={handlerSelectValuePriority}
							setIsSelectPriorityOpen={handlerPriorityOpen}
							isSelectPriorityOpen={isSelectPriorityOpen}
							handlerSetPriority={setPriority}/>
						<Comment comment={comment?.text ?? ''} setComment={handlerSetComment}/>
					</div>
					</div>
				</div>
			</div>
			<div className="main-editor-task-form__action">
			<button 
				className="main-editor-task-form__btn-submit btn-submit" 
				type="submit"
				disabled={body.length > 500 || comment.length > 500 || !body.trim()}>
			{t("save")}</button>
			<button 
				className="main-editor-task-form__btn-cancel btn-cancel"
				type="button"
				onClick={() => cancel()}>
			{t("cancel")}</button>
			</div>
		</form>	
	);
}
 
export default memo(Edit);