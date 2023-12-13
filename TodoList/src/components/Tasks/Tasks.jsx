import { useState, useContext, memo } from "react";
import { CSSTransition,TransitionGroup} from "react-transition-group";
import CustomContexMenu from "./components/CustomContextMenu/CustomContexMenu";
import Edit from "../Edit/Edit";
import Task from "./components/Task/Task";
import Context from "../../contexts/context";

const Tasks = ({tasks,page}) => {
	const [selectTask, setSelectTask] = useState();
	const { taskEdit,setTaskEdit } = useContext(Context);
	const cancelEditTask = () => setTaskEdit({id:null});
	return (
		<>
			<ul className="main__tasks">
				<TransitionGroup component={null}>
				{tasks.map((task) => ( 
					task.id ?
					taskEdit.id !== task.id 
						?  <CSSTransition in={true} key={task.id} timeout={400} classNames="move">					
								<li>
									<Task task={task} page={page} setSelectTask={setSelectTask} selectTask={selectTask}/>
								</li>
							</CSSTransition>
						: <CSSTransition in={true} key={`edit${task.id}`} timeout={400} classNames="move-back" unmountOnExit>
								<li>
									<Edit cancel={cancelEditTask} task={taskEdit}/>
								</li>
							</CSSTransition>
					: null
				)
				)}			
			</TransitionGroup>
		</ul>
		<CustomContexMenu selectTask={selectTask} setSelectTask={setSelectTask} />
		</>
	);
}
 
export default memo(Tasks);