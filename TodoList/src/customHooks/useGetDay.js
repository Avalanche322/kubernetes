import { useState,useContext } from "react";
import moment from 'moment';
import useGetDate from "./useGetDate";
import Context from "../contexts/context";

const useGetDay = () => {
	const {settings,tasks,setRerenderComponnent} = useContext(Context);
	const [isSelectDayOpen, setIsSelectDayOpen] = useState(false);
	const {today, nextWeek, tomorrow, nextWeekend,converToFullDate} = useGetDate();
	const [date, setDate] = useState(today());
	const [isDay, setIsDay] = useState('today');
	const [isDayClass, setIsDayClass] = useState('fas fa-calendar-week');
	const isSelectDay = [
		{id:0, day:"today", date:today(),classValue:"fas fa-calendar-week"},
		{id:1, day:"tomorrow", date:tomorrow(),classValue:"fas fa-sun"},
		{id:2, day:"nextWeekend", date:nextWeekend(),classValue:"fas fa-couch"},
		{id:3, day:"nextWeek", date:nextWeek(),classValue:"fas fa-fast-forward"},
		{id:4, day:"noDate", date:'',classValue:"far fa-calendar-times"}
	]
	function handlerSelectValueDay(day,date,classValue,setDateEdit = setDate,task){ // setDateEdit it's setState date from edit to change local state
		setIsDay(day);
		setIsDayClass(classValue);
		setDateEdit(date);
		setRerenderComponnent({}); // rerender component
		if(task){ // change task date and add to local tasks array
			task.date = date;
			for (let i = 0; i < tasks.length; i++) {
				if(tasks[i].id === task.id){
					tasks.splice(i,1,task);
				}
			}
			localStorage.setItem('tasks', JSON.stringify(tasks));
		}
		setIsSelectDayOpen(false);
		if(settings.vibration) navigator.vibrate(8); // togle vibration
	}
	function handlerInputDateSubmit(setInputDate,setIsSelectDayOpen,setIsInputDate,inputDate,task){
		setDate(moment(inputDate, ["DD-MM-YYYY", "DD-MMM-YYYY"]).format()); // set input date format year-month-day for post to server
		setIsDay(converToFullDate(inputDate));
		setInputDate(converToFullDate(inputDate));
		setIsDayClass("fas fa-calendar-week");
		setRerenderComponnent({});
		if(task){
			task.date = date;
			for (let i = 0; i < tasks.length; i++) {
				if(tasks[i].id === task.id){
					tasks.splice(i,1,task);
					//break
				}
			}
			localStorage.setItem('tasks', JSON.stringify(tasks));
		}
		setIsSelectDayOpen(false);
		setIsInputDate(false)
		if(settings.vibration) navigator.vibrate(8); // togle vibration
	}
	return {
		handlerSelectValueDay,
		date,
		isDayClass,
		isSelectDayOpen,
		isDay,
		isSelectDay,
		setIsDay,
		setIsDayClass,
		setIsSelectDayOpen,
		handlerInputDateSubmit
	}
}
 
export default useGetDay;