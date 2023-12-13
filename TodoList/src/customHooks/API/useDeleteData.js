import firebase from "../../firebase";
import { useAuth } from '../../contexts/AuthContext';
import Context from "../../contexts/context";
import { useContext } from "react";

const useDeleteData = () => {
	const comments = JSON.parse(localStorage.getItem('comments'));
	const {currentUser} = useAuth();
	const {settings,tasks,setTasks} = useContext(Context);
	function deleteTask(task){
		try{
			const taskRef = firebase.database().ref(`users/${currentUser.uid}/tasks`).child(task.id);
			taskRef.remove();
			localStorage.setItem('tasks', JSON.stringify(tasks.filter(t => t.id !== task.id)) );
			setTasks(tasks.filter(t => t.id !== task.id));
			for (const comment of comments) {
				if(comment.posted_uid === task.id){
					deleteTaskComment(comment);
				}
			}
			if(settings.vibration) navigator.vibrate(30); // togle vibration
		} catch(e){
			alert(e.message)
		}
	}
	function deleteTaskComment(comment){
		try{
			const taskCommentRef = firebase.database().ref(`users/${currentUser.uid}/comments`).child(comment.id);
			taskCommentRef.remove();
			localStorage.setItem('comments', JSON.stringify(comments.filter(com => com.id !== comment.id)));
			if(settings.vibration) navigator.vibrate(30); // togle vibration
		} catch(e){
			alert(e.message)
		}
	}
	return {deleteTaskComment,deleteTask}
}
 
export default useDeleteData;