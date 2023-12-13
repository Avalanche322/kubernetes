import './general.scss'

import { useState, useEffect, memo } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from '../../../contexts/AuthContext';
import { useContext } from "react";
import Context from '../../../contexts/context';

const General = ({close,handlerActiveSidebar}) => {
	const {t} = useTranslation();
	const {setTheme,theme} = useContext(Context);
	const [settings, setSettings] = useState(JSON.parse(localStorage.getItem('settings')));
	const currentSettings = JSON.parse(localStorage.getItem('settings'));
	const themes = JSON.parse(localStorage.getItem('themes'));
	const [isUpdate, setIsUpdate] = useState(false);
	const [iSSupportedVibration, SetIsSupportedVibration] = useState(true);
	const {updateSettings} = useAuth();
	const [error, setError] = useState('');
	const [selectedThemeName, setSelectedThemeName] = useState(theme.name);
	useEffect(() => {
		// title for page
		document.title = `${t("general")} - ${t("settings")} | TodoList`;
	// eslint-disable-next-line
	}, [])
	const handlerChangeLanguege = (e) =>{
		if(settings.vibration) navigator.vibrate(8); // togle vibration
		setSettings(prevState => ({
			...prevState,
			language: e.target.value
		}));
		if(currentSettings.language !== e.target.value){
			setIsUpdate(true);
		} else{
			setIsUpdate(false);
		}
	}
	const submit = async (e) => {
		e.preventDefault();
		if(settings.vibration) navigator.vibrate(15); // togle vibration
		try{
			updateSettings(settings);
			localStorage.setItem('settings', JSON.stringify(settings));
			for (const key in themes) {
			if(themes[key].name === settings.theme){
					setTheme(themes[key]);
					//break
				}
			}
			setIsUpdate(false);
			document.title = `${t("general")} - ${t("settings")} | TodoList`;
		}catch(e){
			setError(e.message);
		}
	}
	const handlerCancel = () =>{
		if(settings.vibration) navigator.vibrate(10); // togle vibration
		setIsUpdate(false);
		setSelectedThemeName(currentSettings.theme);
		setSettings({
			theme: currentSettings.theme,
			language: currentSettings.language
		});
		for (const key in themes) {
			if(themes[key].name === currentSettings.theme){
				setTheme(themes[key]);
				//break
			}
		}
	}
	const handlerChangeTheme = (themeKey) =>{
		if(settings.vibration) navigator.vibrate(8); // togle vibration
		setSelectedThemeName(themeKey);
		setSettings(prevState => ({
			...prevState,
			theme: themeKey
		}));
		if(currentSettings.theme !== themeKey){
			setIsUpdate(true);
		} else{
			setIsUpdate(false);
		}
	}
	const handlerVibration = (e) =>{
		if(settings.vibration) navigator.vibrate(8); // togle vibration
		setSettings(prevState => ({
			...prevState,
			vibration: !prevState.vibration
		}));
		if(currentSettings.vibration !== e.target.checked){
			setIsUpdate(true);
		} else{
			setIsUpdate(false);
		}
	}
	const handlerSoundDesctop = (e) =>{
		if(settings.vibration) navigator.vibrate(8); // togle vibration
		setSettings(prevState => ({
			...prevState,
			completed_sound_desktop: !prevState.completed_sound_desktop
		}));
		if(currentSettings.completed_sound_desktop !== e.target.checked){
			setIsUpdate(true);
		} else{
			setIsUpdate(false);
		}
	}
	const handlerSoundMobile = (e) =>{
		if(settings.vibration) navigator.vibrate(8); // togle vibration
		setSettings(prevState => ({
			...prevState,
			completed_sound_mobile: !prevState.completed_sound_mobile
		}));
		if(currentSettings.completed_sound_mobile !== e.target.checked){
			setIsUpdate(true);
		} else{
			setIsUpdate(false);
		}
	}
	const handelClose =(e) =>{
		close(e);
		handlerCancel();
	}
	useEffect(() => {
		if ("vibrate" in navigator) {
			SetIsSupportedVibration(true);
		} else {
			SetIsSupportedVibration(false);
		}
	},[])
	return (
		<form className="settings__form" onSubmit={submit}>
			<header className="settings__header">
				<button type="button" className="fas fa-arrow-left main-back" onClick={handlerActiveSidebar.bind(null, true)}></button>
				<h2 className="settings__title">{t("general")}</h2>
				<button type="button" className="fas fa-times close" onClick={handelClose}></button>
			</header>
			<div className="settings__general settings__container">
				<div className="settings__block">
					<h3 className="settings__subtitle">{t("language")}</h3>
					<div className="settings__group">
						<div className="select" tabIndex="1">
							<select name="language" id="language" onChange={handlerChangeLanguege} value={settings.language}>
								<option value="en">English</option>
								<option value="uk">Ukraine</option>
							</select>
							<i className="fas fa-sort-down select__arrow"></i>
						</div>
					</div>
				</div>
				<div className="settings__block">
					<h3 className="settings__subtitle">{t("theme")}</h3>
					<div className="settings__theme">
						{Object.keys(themes).map((theme) =>{
							return(
								<div className="settings-theme__item" key={themes[theme].id}>
									<button type="button" className="settings-theme__item-btn" onClick={handlerChangeTheme.bind(null,themes[theme].name)}>
										<svg xmlns="http://www.w3.org/2000/svg" width="166" height="77" viewBox="0 0 166 77">
										<defs>
											<rect id="a" width="164" height="75" rx="3" fill="#FFF"></rect>
										</defs>
										<g fill="none" fillRule="evenodd">
											<g transform="translate(1 1)">
												<mask id="b" fill="#fff">
													<use href="#a"></use>
												</mask>
												<rect 
													x="-.5" y="-.5" 
													width="165" height="76" rx="4" 
													fill={`rgb(${themes[theme].bg})`} stroke="#007CC7">
												</rect>
												<path fill={`rgb(${themes[theme].bgLight})`} mask="url(#b)" d="M0 0h164v30H0z"></path>
												<text mask="url(#b)" fontSize="12" fill={`rgb(${themes[theme].text})`}>
													<tspan x="7" y="20">{themes[theme].name}</tspan>
												</text>
												<path d="M11 43a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 1a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm11.3-7h47.4l.8.1.4.4.1.8v3.4l-.1.8-.4.4-.8.1H22.3l-.8-.1a1 1 0 0 1-.4-.4l-.1-.8v-3.4l.1-.8.4-.4.8-.1zm58 0h74.4l.8.1.4.4.1.8v3.4l-.1.8-.4.4-.8.1H80.3l-.8-.1a1 1 0 0 1-.4-.4l-.1-.8v-3.4l.1-.8.4-.4.8-.1zm-58 12h23.4l.8.1.4.4.1.8v3.4l-.1.8-.4.4-.8.1H22.3l-.8-.1a1 1 0 0 1-.4-.4l-.1-.8v-3.4l.1-.8.4-.4.8-.1zm34 0h62.4l.8.1.4.4.1.8v3.4l-.1.8-.4.4-.8.1H56.3l-.8-.1a1 1 0 0 1-.4-.4l-.1-.8v-3.4l.1-.8.4-.4.8-.1zM11 56a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" fill={`rgb(${themes[theme].text})`} fillRule="nonzero" mask="url(#b)"></path>
												<rect 
													fill={`rgb(${themes[theme].textLight})`} mask="url(#b)" 
													x="7" y="62" width="26" height="6" rx="1">
												</rect>
											</g>
											{themes[theme].name === selectedThemeName ? 
											<path d="M149.2 67l-4.1-4.1a.5.5 0 0 0-.7 0c-.2.2-.2.5 0 .7l4.8 4.9 8.5-8.4c.2-.2.2-.6 0-.7a.5.5 0 0 0-.7 0l-7.8 7.7z" fill="#DE354C"></path>
											: null}
										</g>
										</svg>
									</button>
								</div>
							)
						})}
					</div>
				</div>
				<div className="settings__block">
					<h3 className="settings__subtitle">{t("SoundAndVibration")}</h3>
					<div className="settings__group settings-general__group">
						<input
							id="s1" type="checkbox" className="switch" 
							checked={settings.vibration}
							onChange={handlerVibration}
							disabled={!iSSupportedVibration}/>
						<label htmlFor="s1">{t("VibrationMobile")}</label>
					</div>
					{!iSSupportedVibration &&  <p className="settings__subtext">{t("browserDoesntSupportVibration")}</p>}
					<div className="settings__group">
						<input id="s2" type="checkbox" className="switch"
							checked={settings.completed_sound_desktop}
							onChange={handlerSoundDesctop}/>
   					 <label htmlFor="s2">{t("DesktopTaskCompleteTone")}</label>
					</div>
					<div className="settings__group settings-general__group">
						<input id="s3" type="checkbox" className="switch"
							checked={settings.completed_sound_mobile}
							onChange={handlerSoundMobile}/>
   					 <label htmlFor="s3">{t("MobileTaskCompleteTone")}</label>
					</div>
					<p className="settings__subtext">{t("PlaySoundWhenTaskCompleted")}</p>
				</div>
				<div className="settings__group">
					{error && <strong className="fas fa-exclamation-circle denger">{error}</strong>}
				</div>
			</div>
			{isUpdate && <footer className="settings__footer">
				<button className="btn-cancel" type="button" onClick={handlerCancel.bind(null)}>{t("cancel")}</button>
				<button className="btn-submit settings-footer__btn-submit" type="submit">{t("update")}</button>
			</footer>}
		</form>
	);
}
 
export default memo(General);