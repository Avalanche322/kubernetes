import {useContext } from "react";
import firebase from "../../firebase";
import { useAuth } from '../../contexts/AuthContext';
import useGetDate from "../useGetDate";
import Context from "../../contexts/context";
import useAudio from "../useAudio";
import useDeleteData from "./useDeleteData"

const useCompletedTask = () => {
	const {currentUser} = useAuth();
	const {deleteTask,deleteTaskComment} = useDeleteData();
	const {converToShortDate} = useGetDate();
	const {settings} = useContext(Context);
	const {playAudio} = useAudio();
	
	async function handlerCountCompletedTask(){
		const stats = JSON.parse(localStorage.getItem('stats'));
		stats.days_items.total_completed++;
		stats.days_items.date = converToShortDate(new Date());
		stats.completed_count++;
		localStorage.setItem('stats', JSON.stringify(stats));
		const statsRef = firebase.database().ref(`users/${currentUser.uid}/stats`);
		await statsRef.update(stats)
	}
	function completedTask(task){
		const comments = JSON.parse(localStorage.getItem('comments'));
		try{
			const taskRef = firebase.database().ref(`users/${currentUser.uid}/tasks`).child(task.id);
			taskRef.update({
				completed: !task.completed,
			});
			deleteTask(task);
			if(settings.vibration) navigator.vibrate(10); // togle vibration
			handlerCountCompletedTask(); // count completed task
			playAudio();
			for (const comment of comments) {
				if(comment.posted_uid === task.id){
					deleteTaskComment(comment);
				}
			}				
		} catch(e){
			alert(e.message);
		}
	}
	
	return {completedTask}
}
 
export default useCompletedTask;