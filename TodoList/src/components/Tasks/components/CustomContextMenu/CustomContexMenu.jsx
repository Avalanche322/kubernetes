import './custom-context-menu.scss'

import { useContext, useState } from "react";
import { ContextMenu, MenuItem } from "react-contextmenu";
import ReactTooltip from "react-tooltip";
import Context from "../../../../contexts/context";
import useGetPriority from "../../../../customHooks/useGetPriority";
import useGetDay from "../../../../customHooks/useGetDay";
import firebase from "../../../../firebase";
import { useAuth } from '../../../../contexts/AuthContext';
import { useTranslation } from "react-i18next";
import useDeleteData from "../../../../customHooks/API/useDeleteData";

const CustomContexMenu = ({selectTask,setSelectTask}) => {
	const [overlay, setOverlay] = useState(false);
	const {isSelecPriority} = useGetPriority();
	const {setTaskEdit,setAddForm,settings,tasks,setRerenderComponnent} = useContext(Context);
	const {isSelectDay} = useGetDay();
	const {deleteTask} = useDeleteData();
	const {currentUser} = useAuth();
	const { t } = useTranslation();
	function changeDay(date){
		const taskRef = firebase.database().ref(`users/${currentUser.uid}/tasks`).child(selectTask.id);
		taskRef.update({
			date
		});
		selectTask.date = date;
		localStorage.setItem('tasks', JSON.stringify(tasks));
		setRerenderComponnent({}); // rerender component
		if(settings.vibration) navigator.vibrate(8); // togle vibration
	}
	function changePriority(priority){
		const taskRef = firebase.database().ref(`users/${currentUser.uid}/tasks`).child(selectTask.id);
		taskRef.update({
			priority
		});
		selectTask.priority = priority;
		localStorage.setItem('tasks', JSON.stringify(tasks));
		if(settings.vibration) navigator.vibrate(8); // togle vibration
	}
	function handlerTaskEdit(){
		setTaskEdit(selectTask);
		setAddForm(false);
		if(settings.vibration) navigator.vibrate(8); // togle vibration
	}
	function handlerOnHide(){
		setOverlay(false);
		setSelectTask({id:null});
		if(settings.vibration) navigator.vibrate(15); // togle vibration
	}
	function handlerOnShow(){
		setOverlay(true);
		if(settings.vibration) navigator.vibrate(15); // togle vibration
	}
	return (
		<>
			{overlay && <div className="overlay"></div>}
				<ContextMenu 
					onShow={handlerOnShow} 
					onHide={handlerOnHide} 
					className="context-menu" id="contextmenu">
				<MenuItem onClick={handlerTaskEdit.bind(null)}>
					<span className="far fa-edit context-menu__edit">{t("editTask")}</span>
				</MenuItem>
				<MenuItem >
					<div className="context-menu__schedul">
						<h3 className="context-menu-schedul__title context-menu__title">{t("schedule")}</h3>
						<div className="context-menu-schedul__list context-menu__list">
							{isSelectDay.map(selectDay =>{
								return (
									<div data-tip={t(selectDay.day)} key={selectDay.id}>
										<MenuItem 
											className={`fas ${selectDay.classValue} context-menu-list__item`}
											onClick={changeDay.bind(null,selectDay.date)}>
										</MenuItem>
									</div>
								)
							})}
						</div>
					</div>
				</MenuItem>
				<MenuItem>
					<div className="context-menu__priority">
						<h3 className="context-menu-priority__title context-menu__title">{t("priority")}</h3>
						<div className="context-menu-priority__list context-menu__list">
								{isSelecPriority.map(selecPriority =>{
									return (
										<div data-tip={`${t("priority")} ${selecPriority.priority}`} key={selecPriority.id}>
											<MenuItem 
												className={`fas fa-flag ${selecPriority.classValue} context-menu-list__item`}
												onClick={changePriority.bind(null,selecPriority.priority)}>
											</MenuItem>
										</div>
									)
								})}
						</div>
					</div>
				</MenuItem>
				<MenuItem onClick={deleteTask.bind(null,selectTask)}>
					<span className="fas fa-trash-alt context-menu__delete">{t("delete")}</span>
				</MenuItem>
				<ReactTooltip 
					effect="solid" 		
					className="tooltip"
					place="bottom"
					arrowColor="transparent" />
			</ContextMenu>
		</>
	);
}
 
export default CustomContexMenu;