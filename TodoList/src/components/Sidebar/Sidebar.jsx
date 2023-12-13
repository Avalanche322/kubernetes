import './sidebar.scss'

import { useState,useContext } from "react";
import ReactTooltip from "react-tooltip";
import { useTranslation } from "react-i18next";
import NavigationList from "../NavigationList/NavigationList";
import Context from "../../contexts/context";

const Sidebar = () => {
	const { settings } = useContext(Context);
	const [isActive, setActive] = useState(JSON.parse(localStorage.getItem('sidebar_on')));
	const { t } = useTranslation();
	const handlerSidebar = () =>{
		setActive(!isActive);
		localStorage.setItem('sidebar_on', JSON.stringify(!isActive));
		if(settings.vibration) navigator.vibrate(10); // togle vibration
	}
	return (
		<aside className={`sidebar ${isActive  ? "sidebar__active" : ""}`}>
			<div className="sidebar__header">
				<h1 className="sidebar__logo">The best TodoList</h1>
				<div tabIndex="1" className="sidebar__humburger"
					onClick={handlerSidebar.bind(null)}
					onKeyDown={(e) => e.key === "Enter" ?  handlerSidebar() : null}
					data-place="right"
					data-for="tooltip-aside"
					data-tip={!isActive  ? t("openMenu") : t("closeMenu")}>
					<span></span>
				</div>
			</div>
			<nav className="sidebar__menu">
				<NavigationList isActive={isActive }/>
			</nav>
			<ReactTooltip 
					id="tooltip-aside"
					effect="solid"		
					className="tooltip"
					arrowColor="transparent" />
		</aside>
	);
}
 
export default Sidebar;