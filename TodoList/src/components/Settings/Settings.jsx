import './settings.scss'

import React ,{ memo, useContext, useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import {BrowserRouter as Router, Switch, NavLink, Route} from 'react-router-dom';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useTranslation } from "react-i18next";
import { useSwipeable } from "react-swipeable";
import General from "../Settings/General/General";
import Account from "../Settings/Account/Account";
import ChangeEmail from "../Settings/ChangeEmail/ChangeEmail";
import ChangePassword from "../Settings/ChangePassword/ChangePassword";
import DeleteAccount from "../Settings/DeleteAccount/DeleteAccount";
import Context from "../../contexts/context";

const Settings = ({prevPath}) => {
	const {settings} = useContext(Context);
	const [isActiveSidebar, setIsActiveSidebar] = useState(false);
	const history = useHistory();
	let location = useLocation();
	const { t } = useTranslation();
	const close = e => {
		e.stopPropagation();
		history.push(prevPath);
		if(settings.vibration) navigator.vibrate(8); // togle vibration
	};
	const back = e => {
		e.stopPropagation();
		history.go(-1);
		if(settings.vibration) navigator.vibrate(8); // togle vibration
	};
	const handlerActiveSidebar = () => {
		setIsActiveSidebar(!isActiveSidebar);
		if(settings.vibration) navigator.vibrate(8); // togle vibration
	};
	const handlers = useSwipeable({
		onSwipedRight: () => {
			setIsActiveSidebar(true);
			if(settings.vibration) navigator.vibrate(8);
		},
		onSwipedLeft: () => {
			setIsActiveSidebar(false);
			if(settings.vibration) navigator.vibrate(8);
		},
	});
	useEffect(() => {
		let hendler = (event) => {
			if(event.code === 'Escape'){
				history.push(prevPath);
			}
		}
		document.addEventListener('keydown', hendler);
		return () =>{
			document.removeEventListener("keydown", hendler)
		}
	//eslint-disable-next-line
	},[])
	return (
		<Router>
			<TransitionGroup component={null}>
			<CSSTransition 
				in={true}
				classNames="scale" 
				timeout={300}>
				<section className="settings" onClick={close} {...handlers}>
					<div className="settings__body" onClick={e => e.stopPropagation()}>
						<div className={`settings__sidebar ${isActiveSidebar ? "active" : ""}`}>
							<header className="settings-sidebar__header">
								<h2 className="settings__title">{t("settings")}</h2>
								<button type="button" className="fas fa-times close" onClick={handlerActiveSidebar.bind(null)}></button>
							</header>
							<ul className="settings-sidebar__menu">
								<li>
									<NavLink 
										className="settings-sidebar__item" 
										activeClassName="settings-sidebar__item_active" 
										to={{
											pathname: `${prevPath}/settings/account`,
											state: { prevPath: location.state?.prevPath },
										}}
										onClick={handlerActiveSidebar.bind(null, false)}>
										<i className="far fa-user-circle settings-sidebar__logo"></i>
										<span className="">{t("account")}</span>
									</NavLink>
								</li>
								<li>
									<NavLink 
										className="settings-sidebar__item" 
										activeClassName="settings-sidebar__item_active" 
										to={{
											pathname: `${prevPath}/settings/genneral`,
											state: { prevPath: location.state?.prevPath },
										}}
										onClick={handlerActiveSidebar.bind(null, false)}>
										<i className="fas fa-cog settings-sidebar__logo"></i>
										<span className="">{t("general")}</span>	
									</NavLink>
								</li>
							</ul>
						</div>
						<div className="settings__content">
							<TransitionGroup component={null}>
								<Switch>
									<Route path={`${prevPath}/settings/account`} >
										<CSSTransition in={true} key=".1" timeout={600} classNames="move-back" unmountOnExit>
											<Account prevPath={prevPath} close={close} handlerActiveSidebar={handlerActiveSidebar} />
										</CSSTransition>
									</Route>
									<Route path={`${prevPath}/settings/genneral`}>
										<CSSTransition in={true} key=".2" timeout={600} classNames="move-back" unmountOnExit>
											<General close={close} handlerActiveSidebar={handlerActiveSidebar} />
										</CSSTransition>
									</Route>
									<Route path={`${prevPath}/settings/email`}>
										<CSSTransition in={true} key=".3" timeout={600} classNames="move-back" unmountOnExit>
											<ChangeEmail close={close} back={back} handlerActiveSidebar={handlerActiveSidebar} />
										</CSSTransition>
									</Route>
									<Route path={`${prevPath}/settings/password`}>
										<CSSTransition in={true} key=".4" timeout={600} classNames="move-back" unmountOnExit>
											<ChangePassword close={close} back={back} handlerActiveSidebar={handlerActiveSidebar} />
										</CSSTransition>
									</Route>
									<Route path={`${prevPath}/settings/delete`}>
										<CSSTransition in={true} key=".5" timeout={600} classNames="move-back" unmountOnExit>
											<DeleteAccount close={close} back={back} handlerActiveSidebar={handlerActiveSidebar} />
										</CSSTransition>
									</Route>
								</Switch>
							</TransitionGroup>
						</div>
					</div>
				</section>
			</CSSTransition>
			</TransitionGroup>
		</Router>
	);
}
 
export default memo(Settings);