import { memo, useContext } from "react";
import { useHistory, useLocation } from "react-router";
import Context from "../../../../contexts/context";
import { ContextMenuTrigger } from "react-contextmenu";
import { useTranslation } from "react-i18next";
import ReactTooltip from "react-tooltip";
import useCompletedTask from "../../../../customHooks/API/useCompletedTask";
import Day from "../../../../common/Day/Day";
import firebase from "../../../../firebase";
import { useAuth } from "../../../../contexts/AuthContext";
import useGetDay from "../../../../customHooks/useGetDay";
import useGetDate from "../../../../customHooks/useGetDate";
import useWindowSize from "../../../../customHooks/useWindowSize";

const Task = ({task,page,setSelectTask,selectTask}) => {
	const { setTaskEdit,setAddForm,comments } = useContext(Context);
	const {completedTask} = useCompletedTask();
	const {currentUser} = useAuth();
	const location = useLocation();
	const {today,converToShortDate} = useGetDate();
	const {isTouchDevice} = useWindowSize();
	const history = useHistory();
	const commentsCount = comments.filter(com => com.posted_uid === task.id).length;
	const { t } = useTranslation();
	const handlerTaskEdit = () =>{
		setTaskEdit(task);
		setAddForm(false);
	}
	const handlerLinkToDetails = () => {
		history.push({
			pathname: `${location.pathname}/task/${task.id}`,
			state: { background: location, prevPath: location.pathname, id: task.id }
		})
	}
	function changeDay(date){
		const taskRef = firebase.database().ref(`users/${currentUser.uid}/tasks`).child(task.id);
		taskRef.update({
			date
		});
	}
	/* Select day*/
	const {isSelectDayOpen,isSelectDay,isDay,handlerSelectValueDay,setIsDay,setIsDayClass,setIsSelectDayOpen,handlerInputDateSubmit} = useGetDay();

	return (		
		<ContextMenuTrigger id="contextmenu" holdToDisplay={isTouchDevice ? 700 : -1} collect={() => setSelectTask(task)}>
			<div className={`main__task ${selectTask?.id === task.id ? 'main__task-focus' : ''}`}>
					<input className="task__inp-cbx" id={`cbx${task.id}`} type="checkbox" style={{display: "none"}} />
					<label 
						tabIndex="1" 
						className="task__cbx" 
						htmlFor={`cbx${task.id}`} 
						onClick={completedTask.bind(null,task)}
						onKeyDown={(e) => e.key === "Enter" ?  completedTask(task) : null}>
						<span className={`priority-cbx-${task.priority}`}>
							<svg width="8px" height="8px" viewBox="0 0 12 9">
							<polyline points="1 5 4 8 11 1"></polyline>
							</svg>
						</span>
					</label>
				<div className="main__group-task">
					<div 
						tabIndex="1" 
						onClick={handlerLinkToDetails.bind(null)} 
						onKeyDown={(e) => e.key === "Enter" ?  handlerLinkToDetails() : null}
						className="main__link">
						<p className={`task__text main__text ${task.completed ? "completed" : ""}`}>{task.body}</p>
					</div>
					<div className="main__group">
						{(page === "home" && converToShortDate(task.date) === converToShortDate(today())) ? null : 
							<Day
									task={task}
									handlerInputDateSubmit={handlerInputDateSubmit}
									isDayClass={"fas fa-calendar-week"}
									isSelectDayOpen={isSelectDayOpen}
									isDay={isDay}
									setIsSelectDayOpen={setIsSelectDayOpen}
									date={task.date}
									handlerSetDate={changeDay}
									isSelectDay={isSelectDay}
									handlerSelectValueDay={handlerSelectValueDay}
									setIsDay={setIsDay}
									setIsDayClass={setIsDayClass}/>
						}
						{commentsCount ? <button
							onClick={handlerLinkToDetails.bind(null)}
							type="button" 
							className="far fa-comment-alt btn"
						>{commentsCount}</button> : null}
					</div>
				</div>
				<div>
					<button 
						data-tip={t("editTask")} 
						onClick={handlerTaskEdit.bind(null)} 
						className="far fa-edit btn-action main__task-action"
					></button>
					<ReactTooltip 
						effect="solid" 
						place="bottom" 
						className="tooltip"
						arrowColor="transparent" />
				</div>
			</div>
		</ContextMenuTrigger>
	);
}
 
export default memo(Task);