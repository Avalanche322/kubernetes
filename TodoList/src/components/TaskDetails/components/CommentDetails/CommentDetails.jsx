import './comment-details.scss';

import { memo, useState, useRef, useEffect, useContext } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useTranslation } from "react-i18next";
import ReactTooltip from "react-tooltip";
import useGetDate from "../../../../customHooks/useGetDate"
import { useAuth } from "../../../../contexts/AuthContext";
import EditComment from "./components/EditComment";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Context from "../../../../contexts/context";
import useAddData from "../../../../customHooks/API/useAddData";
import useDeleteData from "../../../../customHooks/API/useDeleteData";

const CommentDetails = ({taskId}) => {
	const {settings} = useContext(Context);
	const [comments, setComments] = useState(JSON.parse(localStorage.getItem('comments')));
	const [commentText, setCommentText] = useState("");
	const [editComment, setEditComment] = useState({id:null, text:""});
	const { t } = useTranslation();
	const {converToTimeformat} = useGetDate();
	const {currentUser} = useAuth();
	const {addTaskComment} = useAddData();
	const {deleteTaskComment} = useDeleteData();
	const listRef = useRef(null);
	function handlerSubmit(e){
		e.preventDefault();
		if(settings.vibration) navigator.vibrate(15); // togle vibration
		addTaskComment(commentText,taskId);
		setComments(JSON.parse(localStorage.getItem('comments')) );
		setCommentText("");
	}
	const handlerDelete = (comment) => {
		deleteTaskComment(comment);
		setComments(prevState => prevState.filter(com => com.id !== comment.id));
	}
	useEffect(() =>{ // scroll to bottom comments
		if(listRef.current){
			listRef.current.scrollTo(0, listRef.current.clientHeight);
		}
	}, [comments])
	
	return (
		<>
			<div className="task-detail-tabs__item">
				{comments.length 
					? <ul className="task-detail-tabs__list" ref={listRef}>
						<TransitionGroup component={null}>
							{comments.filter(comment => comment.posted_uid === taskId)
								.map(comment =>(
									editComment.id !== comment.id 
										? <CSSTransition in={true} key={comment.id} timeout={400} classNames="move">
											<li>
												<div className="task-detail-comments__img avatar">
													<img src={currentUser.photoURL} alt="avatar" />
												</div>
												<div className="task-detail-comments__group">
													<div className="task-detail-comments__block">
														<span className="task-detail-comments__name">{
														!currentUser.displayName
															? "Someone"
															: currentUser.displayName.length > 10? currentUser.displayName.substring(0, 7) + "." 
															: currentUser.displayName}
														</span>
														<span className="task-detail-comments__time">{converToTimeformat(comment.date_posted)}</span>
														<div className="task-detail-comments__active">
															<button 
																data-tip={t("editComment")}
																className="far fa-edit task-detail-comments__btn btn-action"
																onClick={() => setEditComment(comment)}>
															</button> {/* edit btn*/}
															<button 
																data-tip={t("delete")}
																className="fas fa-trash-alt task-detail-comments__btn btn-action"
																onClick={handlerDelete.bind(null,comment)}>
															</button> {/* delete btn*/}
														</div>
													</div>
													<p className="task__text">{comment.text}</p>
												</div>
											</li>
										</CSSTransition>
										: <li key={comment.id}>
											<EditComment 
												editComment={editComment} 
												setEditComment={setEditComment} 
												setComments={setComments}
											/>
										</li>
								) )}
						</TransitionGroup>
					</ul>
				: <div className="task-detail-comments__no-com">
						<i className="far fa-comments"></i>
						<p>{t("YouCanAddCommentsForYourTask")}</p>
					</div>}
				<form className="task-detail-comments__form" onSubmit={handlerSubmit}>
					<div className="task-detail-comments__body textarea__body">
						<TextareaAutosize 
							className="textarea__text" 
							maxRows="6" 
							minRows="3" 
							autoFocus 
							placeholder={t("writeComment")}
							value={commentText}
							onChange={(e) => setCommentText(e.target.value)}>
						</TextareaAutosize>
						<div className="textarea__bottom">
						{commentText.length > 500 ?
							<div className="denger limit">{t("commentNameCharacterLimit")} {commentText.length} / 500</div> 
							: null}
						</div>
					</div>
					<div className="task-detail-comments__action">
						<button 
							className="task-detail-comments__btn-submit btn-submit" 
							type="submit"
							disabled={!commentText.trim()}>{t("addCommnet")}</button>
					</div>
				</form>
			</div>
			<ReactTooltip 
				effect="solid" 
				place="bottom" 
				className="tooltip"
				arrowColor="transparent" />
		</>
	);
}
 
export default memo(CommentDetails);