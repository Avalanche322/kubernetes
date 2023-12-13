import firebase from "../../firebase";
import { useAuth } from '../../contexts/AuthContext';
import useGetDate from "../useGetDate";
import useGetCountTasks from "../useGetCountTasks";
import Context from "../../contexts/context";
import { useContext } from "react";

const useAddData = () => {
	const settings = JSON.parse(localStorage.getItem('settings'));
	const comments = JSON.parse(localStorage.getItem('comments'));
	const {setTasks,tasks} = useContext(Context);
	const {currentUser} = useAuth();
	const {today} = useGetDate();
	const {countTaskAll} = useGetCountTasks();
	function addTask(body,date,priority,comment){
		try{
			if(countTaskAll < 200){
				const taskRef = firebase.database().ref(`users/${currentUser.uid}/tasks`);
				//const tasks = JSON.parse(localStorage.getItem('tasks'));
				const task = {
					body,
					completed: false,
					date_added: today(),
					date,
					priority
				}
				const insertData = taskRef.push(task);
				task.id = insertData.key;
				setTasks(prevState => ([...prevState,task]))
				tasks.push(task);
				localStorage.setItem('tasks', JSON.stringify(tasks));
				if(settings.vibration) navigator.vibrate(10); // togle vibration
				addTaskComment(comment,insertData.key);
			} else{
				throw new Error('Limit task is 200');
			}
		} catch(e){
			alert(e.message)
		}
	}
	function addTaskComment(text,taskId){
		try{
			if(comments.length < 200){
				if(text){
					const taskCommentRef = firebase.database().ref(`users/${currentUser.uid}/comments`);
					const comment = {
						text,
						date_posted: today(),
						posted_uid: taskId
					}
					const commentRef = taskCommentRef.push(comment);
					comment.id = commentRef.key;
					comments.push(comment);
					localStorage.setItem('comments', JSON.stringify(comments));
					if(settings.vibration) navigator.vibrate(10); // togle vibration
				}
			} else{
				throw new Error('Limit comments is 200');
			}
		} catch(e){
			alert(e.message);
		}
	}
	return {addTaskComment,addTask}
}
 
export default useAddData;