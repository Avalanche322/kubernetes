import './account.scss'

import { useRef, useState, useEffect, memo, useCallback } from "react";
import { Link } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import { useContext } from "react";
import { useAuth } from '../../../contexts/AuthContext';
import profileImg from "../../../assets/img/user.png";
import googleIcon from "../../../assets/img/google-icon.png";
import Context from '../../../contexts/context';

const Account = ({close,handlerActiveSidebar,prevPath}) => {
	const {currentUser,changeName,uploadAvatar,removeAvatar,LinkInGoogle,isProviderPasswordUser,isProviderGoogle,unlinkGoogle,googleAccount} 
	= useAuth();
	const {settings} = useContext(Context);
	const [userAvatar, setUserAvatar] = useState(currentUser.photoURL);
	const [userName, setUserName] = useState(currentUser.displayName);
	const [isUploadPhoto, setIsUploadPhoto] = useState(false);
	const [loading,setLoading] = useState(false);
	const [error, setError] = useState('');
	const [isUpdate, setIsUpdate] = useState(false);
	const [isGoogleProvider, setIsGoogleProvider] = useState();
	const [isPasswordProvider, setIsPasswordProvider] = useState();
	const { t } = useTranslation();
	useEffect(() => {
		// title for page
		document.title = `${t("account")} - ${t("settings")} | TodoList`;
	// eslint-disable-next-line
	}, []);
	// check if user is google or password provider
	useEffect(() =>{
		setIsGoogleProvider(isProviderGoogle());
		setIsPasswordProvider(isProviderPasswordUser());
	},[loading,isProviderGoogle,isProviderPasswordUser])

	// Upload photo and hidden input type file
	const hiddenFileInput = useRef(null);
	const handleClick = () => {
		setError("");
		hiddenFileInput.current.click();
	};
	const handleUpdateAvatar = async event => {
		if(settings.vibration) navigator.vibrate(10); // togle vibration
		setError("");
		if(event.target.files[0].size <= 4194304){
			try{
				setLoading(true);
				const fileUploadded = event.target.files[0];
				await uploadAvatar(fileUploadded);
				setUserAvatar(currentUser.photoURL);
				setIsUploadPhoto(true);
				setLoading(false);
				if(settings.vibration) navigator.vibrate(15); // togle vibration
			} catch(e){
				setError(e.message);
				setLoading(false);
			}
		} else { 
			setError("image must be lower 4 MB"); 
		}
  	};
	useEffect(() =>{
		if(profileImg !== userAvatar){
			setIsUploadPhoto(true);
		}
	}, [userAvatar])
	// Remove photo
	const handleRemoveAvatar = async () =>{
		try{
			setError("");
			if(settings.vibration) navigator.vibrate(10); // togle vibration
			setLoading(true);
			setIsUploadPhoto(false);
			await removeAvatar();
			setUserAvatar(currentUser.photoURL);
			setLoading(false);
			if(settings.vibration) navigator.vibrate(15); // togle vibration
		} catch(e){
			setError(e.message);
			setLoading(false);
		}
	}
	const handlerChangeName = useCallback((e) => {
		setError("");
		setUserName(e.target.value);
		if(currentUser.displayName !== e.target.value.trim()){
			setIsUpdate(true);
		} else{
			setIsUpdate(false);
		}
	},[currentUser.displayName])
  	// submit
  	async function Update(e){
		e.preventDefault();
		setError("");
		try{
			if(settings.vibration) navigator.vibrate(10); // togle vibration
			await	changeName(userName);
			setIsUpdate(false);
		} catch(e){
			setIsUpdate(false);
			setError(e.message);
		}
	}
	// link google account
	async function handleLogInWithGoogle(){
		setLoading(true);
		try{
			if(settings.vibration) navigator.vibrate(8); // togle vibration
			setError("");
			await LinkInGoogle();
			setLoading(false);
		} catch(e){
			setLoading(false);
			setError(e.message);
		}
	}
	// unlink google account
	async function handleDisconectGoogle(){
		setLoading(true);
		try{
			if(settings.vibration) navigator.vibrate(8); // togle vibration
			setError("");
			await unlinkGoogle();
			setLoading(false);
		} catch(e){
			setLoading(false);
			setError(e.message);
		}
	}
	// cancel
	const handlerCancel = () =>{
		setError("");
		if(settings.vibration) navigator.vibrate(10); // togle vibration
		setIsUpdate(false);
		setUserName(currentUser.displayName);
	}
	function handlerLinkVibration(){
		if(settings.vibration) navigator.vibrate(8); // togle vibration
	}
	return (
		<form className="settings__form" onSubmit={Update}>
			<header className="settings__header">
				<button type="button" className="fas fa-arrow-left main-back" onClick={handlerActiveSidebar.bind(null, true)}></button>
				<h2 className="settings__title">{t("account")}</h2>
				<button type="button" className="fas fa-times close" onClick={close}></button>
			</header>
			<div className="settings__account settings__container">
				{/**Photo*/}
				<div className="settings-account__block settings__block">
					<h3 className="settings__subtitle">{t("photo")}</h3>
					<div className="settings__group">
						<div className="settings-account__img">
							<img src={userAvatar} alt="" />
						</div>
						<div>
							<div className="settings-account__block-btn">
								<input type="file" accept="image/*" ref={hiddenFileInput} onChange={handleUpdateAvatar} hidden/>
								<button 
									className="settings-account__btn" 
									onClick={handleClick} 
									type="button" 
									disabled={loading}>{t("uploadPhoto")}</button>
								{isUploadPhoto &&
								 <button 
									className="settings-account__btn btn-red" 
									type="button" 
									onClick={handleRemoveAvatar}
									disabled={loading}>
								{t("removePhoto")}</button>}
							</div>
							<span className="settings__subtext">{t("sizePhoto")}</span>
						</div>
					</div>
				</div>
				<div className="settings__block">
					{error && <strong className="fas fa-exclamation-circle denger">{error}</strong>}
				</div>
				{/**Name*/}
				<div className="settings-account__block settings__block">
					<h3 className="settings__subtitle">{t("name")}</h3>
					<div className="settings__group">
						<div className="input settings__input">
							<input 
								type="text" 
								name="name" 
								id="name"
								value={userName ?? ''}
								onChange={handlerChangeName} />
						</div>
					</div>
				</div>
				{/**Email*/}
				<div className="settings-account__block settings__block">
					<h3 className="settings__subtitle">{t("email")}</h3>
					<div className="settings-account__group settings__group">
						<span className="settings__text">{currentUser.email}</span>
						<Link 
							to={`${prevPath}/settings/email`} 
							className="settings-account__btn"
							onClick={handlerLinkVibration}
						>{t("changeEmail")}</Link>
					</div>
				</div>
				{/**Password*/}
				<div className="settings-account__block settings__block">
					<h3 className="settings__subtitle">{t("password")}</h3>
						<Link 
							to={`${prevPath}/settings/password`}
							className="settings-account__btn"
							onClick={handlerLinkVibration}
						>{t("changePassword")}</Link>
				</div>
				{/*Connected accounts*/}
				<div className="settings-account__block settings__block">
					<h3 className="settings__subtitle">{t("connectedAccounts")}</h3>
					<div className="settings-account__group settings__group">
						<p className="settings__subtext">{t("logTodoListGoogle")}</p>
					</div>
					<div className="settings-account__block settings__block">
						{isGoogleProvider && googleAccount && <div className="settings-account__group settings__group">
							<p className="settings__text">{t("connectedAccountsInfo1")} <span>{googleAccount.email}</span>
							</p>
						</div>}
						{!isPasswordProvider && <div className="settings-account__group settings__group">
							<p className="settings__text">
								<Trans i18nKey="connectedAccountsInfo2">
									Your password is not set, so we cannot disconnect you from your Google account. If you want to disconnect, please <Link to={`${prevPath}/settings/password`} className="settings__link">set up your password</Link> first.
								</Trans>
							</p>
						</div>}
						{!isGoogleProvider &&  <div className="settings-account__group settings__group">
							<button className="btn-submit settings__btn-social" onClick={handleLogInWithGoogle.bind(null)} disabled={loading}>
								<img className="settings__img-social" src={googleIcon} alt="Google Icon" />
								{t("logInWithGoogle")}
							</button>
						</div>}
						{isPasswordProvider && isGoogleProvider && <div className="settings-account__group settings__group">
							<button className="btn-submit settings__btn-social" onClick={handleDisconectGoogle.bind(null)} disabled={loading}>
								<img className="settings__img-social" src={googleIcon} alt="Google Icon" />
								{t("logOutWithGoogle")}
							</button>
						</div>}
					</div>
				</div>
				{/**Permanently delete account*/}
				<div className="settings-account__block settings__block">
					<h3 className="settings__subtitle">{t("permanentlyDeleteAccount")}</h3>
					<div className="settings-account__group settings__group">
						<span className="settings__text">{t("permanentlyDeleteAccountText")}</span>
						<Link 
							to={`${prevPath}/settings/delete`} 
							className="settings-account__btn btn-red"
							onClick={handlerLinkVibration}
						>{t("permanentlyDeleteAccount")}</Link>
					</div>
				</div>
			</div>
			{isUpdate && <footer className="settings__footer">
				<button className="btn-cancel" type="button" onClick={handlerCancel.bind(null)}>{t("cancel")}</button>
				<button className="btn-submit settings-footer__btn-submit" type="submit">{t("update")}</button>
			</footer>}
		</form>
	);
}
 
export default memo(Account);