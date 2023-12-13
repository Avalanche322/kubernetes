import {useEffect, useState } from "react";
import useGetDate from "./useGetDate";

const useGetCountTasks = () => {
	const tasks = JSON.parse(localStorage.getItem('tasks'));
	const {today,converToShortDate} = useGetDate();
	const [countTaskToday, setCountTaskToday] = useState(0);
	const [countTaskAll, setCountTaskAll] = useState(0);
	const [countTaskNoCompleted,setCountTaskNoCompleted] = useState(0);
	useEffect(() => {
		if(tasks){
			setCountTaskToday(tasks.filter(t => converToShortDate(t.date) <= converToShortDate(today())).length);
			setCountTaskAll(tasks.length);
			setCountTaskNoCompleted(tasks.filter(t => converToShortDate(t.date) < converToShortDate(today())).length);
		}
		// eslint-disable-next-line
	}, [tasks])
	return {
		countTaskToday,
		countTaskAll,
		countTaskNoCompleted
	}
}
 
export default useGetCountTasks;