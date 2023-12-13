import './header.scss'

import { useRef, useEffect, memo } from 'react';
import NavigationList from '../NavigationList/NavigationList';
import ReactTooltip from "react-tooltip";
import { useTranslation } from "react-i18next";
import Context from "../../contexts/context";
import { useContext } from "react";

const Header = ({isActive, setIsActive}) => {
	const {settings} = useContext(Context);
	let headerRef = useRef();
	const { t } = useTranslation();
	useEffect(() =>{
		let hendler = (event) =>{
			if(!headerRef.current.contains(event.target)){
				setIsActive(false);
				//if(settings.vibration) navigator.vibrate(20); // togle vibration
			}
		}
		document.addEventListener("mousedown", hendler)
		return () =>{
			document.removeEventListener("mousedown", hendler)
		}
	});
	const handlerSidebar = () =>{
		setIsActive(!isActive)
		if(settings.vibration) navigator.vibrate(15); // togle vibration
	}
	return (
		<>
			<header ref={headerRef} className="header">
				<div className="header__content">
					<div className="header__start">
						<div 
							className={`header__humburger ${isActive ? "_active" : ''}`} 
							onClick={handlerSidebar.bind(null)}
							onKeyDown={(e) => e.key === "Enter" ?  handlerSidebar() : null}
							data-place="right"
							data-tip={!isActive ? t("openMenu") : t("closeMenu")}>
							<span></span>
						</div>
						<h2 className="header__logo">The best TodoList</h2>
					</div>
					<nav className={`header__menu ${isActive ? 'header__menu_active' : ''}`}>
						<NavigationList isActive={isActive} setIsActive={setIsActive}/>
					</nav>
				</div>
				<ReactTooltip 
					effect="solid"		
					className="tooltip"
					arrowColor="transparent" />
			</header>
		</>
	);
}
 
export default memo(Header);