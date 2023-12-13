import firebase from "../../firebase";
import { useAuth } from '../../contexts/AuthContext';
import { useContext } from "react";
import Context from '../../contexts/context';
import useAddData from "./useAddData";
import useDeleteData from "./useDeleteData";

const useEditData = () => {
	const comments = JSON.parse(localStorage.getItem('comments'));
	const {tasks} = useContext(Context);
	const {currentUser} = useAuth();
	const {addTaskComment} = useAddData();
	const {deleteTaskComment} = useDeleteData();

	function editTask(body,date,priority,comment,task){
		const taskRef = firebase.database().ref(`users/${currentUser.uid}/tasks`).child(task.id);
		const UpdateTask = {
			body,
			completed: false,
			date,
			priority
		}
		taskRef.update(UpdateTask);
		for (let i = 0; i < tasks.length; i++) {
			if(tasks[i].id === task.id){
				tasks.splice(i,1,{id:task.id, ...UpdateTask});
				//break
			}
		}
		localStorage.setItem('tasks', JSON.stringify(tasks));
		comment.id ? editTaskComment(comment,task.id) : addTaskComment(comment.text,task.id);
	}
	function editTaskComment(comment){
		if(!comment.text){
			deleteTaskComment(comment)
		} else{
			const taskCommentRef = firebase.database().ref(`users/${currentUser.uid}/comments`).child(comment.id);
			const updateTaskComment = {
				date_posted: comment.date_posted,
				posted_uid: comment.posted_uid,
				text: comment.text
			}
			taskCommentRef.update(updateTaskComment);
			for (let i = 0; i < comments.length; i++) {
				if(comments[i].id === comment.id){
					comments.splice(i,1,comment);
				}
			}
			localStorage.setItem('comments', JSON.stringify(comments));
		}
	}
	return {editTaskComment,editTask}
}
 
export default useEditData;