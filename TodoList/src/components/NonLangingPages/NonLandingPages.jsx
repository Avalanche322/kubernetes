import { useState} from "react";
import { useSwipeable } from "react-swipeable";
import {Route, Switch, Redirect} from 'react-router-dom';
import {ThemeProvider} from "styled-components";
import { useLocation } from "react-router";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import useWindowSize from '../../customHooks/useWindowSize';
import Context from "../../contexts/context"
import Home from "../Home/Home";
import Inbox from "../Inbox/Inbox";
import { GlobalStyles } from "../../assets/theme/GlobalStles";
import useTheme from "../../customHooks/useTheme";
import Settings from "../Settings/Settings";
import NotFound from "../NotFound/NotFound";
import TaskDetails from "../TaskDetails/TaskDetails";
import InfoBox from "./components/Info/InfoBox";
import QuickAddTask from "./components/QuickAddTask/QuickAddTask";
import { useAuth } from "../../contexts/AuthContext";

const NonLandingPages  = () => {
	const {isNewUserDialog, currentUser} = useAuth();
	const [isDialogFeature, setDialogFeature] = useState(isNewUserDialog);
	const settings = JSON.parse(localStorage.getItem('settings'));
	const comments = JSON.parse(localStorage.getItem('comments'));
	const [tasks,setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) );
	const [addForm, setAddForm] = useState(false); // add task toggle open
	const [taskEdit, setTaskEdit] = useState({id:null}); // task edit toggle open
	const {windowSize} = useWindowSize();
	const {theme,setTheme} = useTheme();
	const [isActiveHeader, setIsActiveHeader] = useState(false); // sidebar header
	let location = useLocation(); // location for settings and task details
	const [, setRerenderComponnent] = useState({}); // rerender component
	const swipe = useSwipeable({
		onSwipedRight: () => {
			if(!location.pathname.startsWith('/settings/') || !location.pathname.startsWith('/task/') ){ // don't toggle header if open settings or task details
				setIsActiveHeader(true);
				if(settings.vibration) navigator.vibrate(8);
			}
		},
		onSwipedLeft: () => {
			setIsActiveHeader(false);
			if(settings.vibration) navigator.vibrate(8);
		},
	});
	/*Quick Add Task Modal Box*/
  	const [isQuickAddTaskOpen,setQuickAddTaskOpen] = useState(false);
	function handlerQuickAddTaskOpen(val){
		setQuickAddTaskOpen(val);
		if(val && settings.vibration){
			navigator.vibrate(8); // togle vibration
		}
	}
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyles/>
			<Context.Provider value={{addForm,setAddForm,taskEdit,setTaskEdit,theme,setTheme,settings,comments,tasks,setTasks,setRerenderComponnent,location, isQuickAddTaskOpen, handlerQuickAddTaskOpen, setDialogFeature, isDialogFeature}}>		
				<div className='wrapper'>
					<InfoBox setDialogFeature={setDialogFeature} isDialogFeature={isDialogFeature} />
					<QuickAddTask isOpen={isQuickAddTaskOpen} handlerIsOpen={handlerQuickAddTaskOpen}/>
					{windowSize.width <= 768 ? <Header isActive={isActiveHeader} setIsActive={setIsActiveHeader}/> : <Sidebar/>}
					<main className="main" {...swipe}>
						<Switch>
							<Route
								exact
								path="/"
								render={() => {
									return (
										currentUser ?
										<Redirect to="/home" /> :
										<Redirect to="/prevue" /> 
									)
								}}
							/>
							<Route path="/home" component={Home} />
							<Route path="/inbox" component={Inbox} />
							<Route path="*" component={NotFound}/>
						</Switch>
						<Route path={`${location.state?.prevPath}/settings`}>
							<Settings prevPath={location.state?.prevPath}/>
						</Route>
						<Route path={`${location.state?.prevPath}/task/:id`} component={TaskDetails}/>
						{isActiveHeader && <div className="overlay-bg"></div>}
					</main>
				</div> 	
			</Context.Provider>
		</ThemeProvider>
	);
}
 
export default NonLandingPages ;