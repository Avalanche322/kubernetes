import { useState, useRef,useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useTranslation } from "react-i18next";

const Comment = ({comment, setComment,isQuickComment,setIsQuickComment}) => {
	const [isSelectCommentOpen, setIsSelectCommentOpen] = useState(false);
	let selectCommentRef = useRef();
	const { t } = useTranslation();
	useEffect(() =>{		
		let hendler = (event) =>{
			if(!selectCommentRef.current.contains(event.target)){
				if(setIsQuickComment){
					setIsQuickComment(false); // toggle open comment for quick add task
				} else{
					setIsSelectCommentOpen(false);
				}
			}
		}
		document.addEventListener("mousedown", hendler)
		return () =>{
			document.removeEventListener("mousedown", hendler)
		};	
	});
	useEffect(() => {
		let hendler = (event) => {
			if(event.code === 'Escape'){
				if(setIsQuickComment){
					setIsQuickComment(false); // toggle open comment for quick add task
				} else{
					setIsSelectCommentOpen(false);
				}
			}
		}
		document.addEventListener('keydown', hendler);
		return () =>{
			document.removeEventListener("keydown", hendler)
		}
	//eslint-disable-next-line
	},[])
	function handelToggleComment(){
		if(setIsQuickComment){
			setIsQuickComment(!isQuickComment); // toggle open comment for quick add task
		} else{
			setIsSelectCommentOpen(!isSelectCommentOpen);
		}
	}
	function handelCloseComment(){
		if(setIsQuickComment){
			setIsQuickComment(false); // toggle open comment for quick add task
		} else{
			setIsSelectCommentOpen(false);
		}
	}
	return (
		<div ref={selectCommentRef} className="comment">
			<button 
				type="button"
				data-tip={t("addComment")}
				className={`comment__btn ${comment.length > 0 ? 'fas' : 'far'} fa-comment-alt`}
				onClick={handelToggleComment.bind(null)}>		
			</button>
			<div className={`comment__dialog ${isQuickComment ?? isSelectCommentOpen ? "open" : "hidden"}`}>
				<div className="comment__header">
					<h3 className="comment__title">{t("quickComment")}</h3>
					<span 
						className="fas fa-times comment__close close" 
						onClick={handelCloseComment.bind(null)}>
					</span>
				</div>
				<TextareaAutosize 
					className="comment__text" 
					maxRows="3" 
					minRows="1" 
					autoFocus 
					value={comment}
					onChange={(e) => setComment(e.target.value)}
					placeholder={t("writeComment")}>
				</TextareaAutosize>
			</div>
		</div>
	);
}
 
export default Comment;