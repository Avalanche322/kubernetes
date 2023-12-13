import { useContext, useState } from "react";
import Context from "../contexts/context";

const useGetPriority = () => {
	const {settings,tasks,setRerenderComponnent} = useContext(Context);
	const [isSelectPriorityOpen, setIsSelectPriorityOpen] = useState(false);
	const [isPriorityClass, setIsPriorityClass] = useState('');
	const [priority, setPriority] = useState(4);
	const [isSelecPriority] = useState ([
		{id:1, priority:1, classValue:"priority-1"},
		{id:2, priority:2, classValue:"priority-2"},
		{id:3, priority:3, classValue:"priority-3"},
		{id:4, priority:4, classValue:""}
	])
	function handlerPriorityOpen(val){
		setIsSelectPriorityOpen(val)
	}
	function handlerSelectValuePriority(classValue, priority, setPriorityEdit = setPriority,task){
		setIsPriorityClass(classValue);
		setPriorityEdit(priority);
		handlerPriorityOpen(false);
		if(task){ // change task priority and add to local tasks array
			setRerenderComponnent({}); // rerender component
			task.priority = priority;
			for (let i = 0; i < tasks.length; i++) {
				if(tasks[i].id === task.id){
					tasks.splice(i,1,task);
					//break
				}
			}
			localStorage.setItem('tasks', JSON.stringify(tasks));
		}
		if(settings.vibration) navigator.vibrate(8); // togle vibration
	}
	return {
		handlerSelectValuePriority,
		priority,
		isSelecPriority,
		isPriorityClass,
		handlerPriorityOpen,
		isSelectPriorityOpen,
		setIsPriorityClass
	}
}
 
export default useGetPriority;