import TextareaAutosize from "react-textarea-autosize";
import { useTranslation } from "react-i18next";
import { memo, useContext } from "react";
import Context from "../../../../../contexts/context";
import useEditData from '../../../../../customHooks/API/useEditData'

const EditComment = ({editComment,setEditComment,setComments}) => {
	const {settings} = useContext(Context);
	const comments = JSON.parse(localStorage.getItem('comments'));
	const { t } = useTranslation();
	const {editTaskComment} = useEditData();

	function handlerCancel(){
		if(settings.vibration) navigator.vibrate(10); // togle vibration
		setEditComment({id:null, text:""});
	}
	function handlerChange(text){
		setEditComment(prevState => ({
			...prevState,
			text
		}))
	}
	function handlerSubmit(e){
		if(settings.vibration) navigator.vibrate(15); // togle vibration
		e.preventDefault();
		editTaskComment(editComment);
		for (let i = 0; i < comments.length; i++) {
			if(comments[i].id === editComment.id){
				comments.splice(i,1,editComment);
				//break
			}
		}
		setComments(comments);
		handlerCancel();
	}
	return (
		<form className="task-detail-comments__form" onSubmit={handlerSubmit}>
			<div className="task-detail-comments__body textarea__body">
				<TextareaAutosize 
					className="textarea__text" 
					maxRows="6" 
					minRows="3" 
					autoFocus 
					placeholder={t("writeComment")}
					value={editComment.text}
					onChange={(e) => handlerChange(e.target.value)}>
				</TextareaAutosize>
				<div className="textarea__bottom">
				{editComment.text.length > 500 ?
					<div className="denger limit">{t("commentNameCharacterLimit")} {editComment.text.length} / 500</div> 
					: null}
				</div>
			</div>
			<div className="task-detail-comments__action">
				<button 
					className="task-detail-comments__btn-submit btn-submit" 
					type="submit"
					disabled={!editComment.text.trim()}>{t("editComment")}</button>
				<button 
						className="task-detail-comments__btn-cancel btn-cancel"
						type="button"
						onClick={handlerCancel.bind(null)}>
					{t("cancel")}</button>
			</div>
		</form>
	);
}
 
export default memo(EditComment);