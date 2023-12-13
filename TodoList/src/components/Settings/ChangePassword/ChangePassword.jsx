import { useState, useEffect, memo, useContext } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Context from "../../../contexts/context";

const ChangePassword = ({close,back}) => {
	const {settings} = useContext(Context);
	const {changePassword} = useAuth();
	const [isShowPasswordOld, setIsShowPasswordOld] = useState(false);
	const [isShowPasswordNew, setIsShowPasswordNew] = useState(false);
	const [isShowPasswordConft, setIsShowPasswordConft] = useState(false);
	const { t } = useTranslation();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
	//const history = useHistory();
	useEffect(() => {
		// title for page
		document.title = `${t("changePassword")} - ${t("settings")} | TodoList`;
	// eslint-disable-next-line
	}, []);
	async function handleSubmit(e){
		e.preventDefault();
		if(settings.vibration) navigator.vibrate(15); // togle vibration	
		if(newPassword !== newPasswordConfirm){
			setError("You confirmation password doesn't match your new password. Please try again.");
		} else if(!(/^(?=.*\d)(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(newPassword))){
			setError('password must be at least 8 characters long contain a number and an uppercase letter')
		} else{
			try{
				setLoading(true);
				setError("");
				await changePassword(oldPassword,newPassword);
				setOldPassword("");
				setNewPassword("");
				setNewPasswordConfirm("");
				setMessage("Your password change success");
			} catch(e){			
				setMessage("");
				setLoading(false);
				setError(e.message);
			} finally{
				setLoading(false);
			}
		}	
	}
	function handlerShowPassOld(){
		if(settings.vibration) navigator.vibrate(8); // togle vibration
		setIsShowPasswordOld(!isShowPasswordOld);
	}
	function handlerShowPassNew(){
		if(settings.vibration) navigator.vibrate(8); // togle vibration
		setIsShowPasswordNew(!isShowPasswordNew);
	}
	function handlerShowPassConft(){
		if(settings.vibration) navigator.vibrate(8); // togle vibration
		setIsShowPasswordConft(!isShowPasswordConft);
	}
	function handlerPassOld(e){
		setOldPassword(e.target.value);
		setError("");
		setMessage("");
	}
	function handlerPassNew(e){
		setNewPassword(e.target.value);
		setError("");
		setMessage("");
	}
	function handlerPassConft(e){
		setNewPasswordConfirm(e.target.value);
		setError("");
		setMessage("");
	}
	return (
		<form onSubmit={handleSubmit} className="settings__form">
			<header className="settings__header">
				<button type="button" className="fas fa-arrow-left back" onClick={back}></button>
				<h2 className="settings__title">{t("changePassword")}</h2>
				<button type="button" className="fas fa-times close" onClick={close}></button>
			</header>
			<div className="settings__password settings__container">
				<div className="settings__block">
					<div className="settings__group-title">
						<label className="settings__subtitle" htmlFor="old-password">{t("oldPassword")}</label>
						<Link to="/forgotPassword" target="_blank" className="link-reset-password">{t("ForgotPassword")}</Link>
					</div>
					<div className="settings__group">
						<div className="input settings__input">
							<input 
								type={isShowPasswordOld ? "text" : "password"}
								name="old-password" 
								id="old-password"
								value={oldPassword}
								onChange={handlerPassOld}/>
								<button 
									type="button" 
									className={`${isShowPasswordOld ? "far fa-eye" : "far fa-eye-slash"} btn-password`}
									onClick={handlerShowPassOld.bind(null)}></button>
						</div>
					</div>
				</div>
				<div className="settings__block">
					<label className="settings__subtitle" htmlFor="new-password">{t("newPassword")}</label>
					<div className="settings__group">
						<div className="input settings__input">
							<input 
								type={isShowPasswordNew ? "text" : "password"}
								name="new-password" 
								id="new-password"
								value={newPassword}
								onChange={handlerPassNew}/>
								<button 
									type="button" 
									className={`${isShowPasswordNew ? "far fa-eye" : "far fa-eye-slash"} btn-password`}
									onClick={handlerShowPassNew.bind(null)}></button>
						</div>
					</div>
				</div>
				<div className="settings__block">
					<label className="settings__subtitle" htmlFor="new-confirm-password">{t("confirmNewPassword")}</label>
					<div className="settings__group">
						<div className="input settings__input">
							<input 
								type={isShowPasswordConft ? "text" : "password"}
								name="new-confirm-password" 
								id="new-confirm-password"
								value={newPasswordConfirm}
								onChange={handlerPassConft}/>
								<button 
									type="button" 
									className={`${isShowPasswordConft ? "far fa-eye" : "far fa-eye-slash"} btn-password`}
									onClick={handlerShowPassConft.bind(null)}></button>
						</div>
					</div>
				</div>
				<div className="settings__block">
					<p className="settings__subtext">{t("passwordInfoText")}</p>
				</div>
				<div className="settings__block">
					{error && <strong className="fas fa-exclamation-circle denger">{error}</strong>}
					{message && <strong className="fas fa-exclamation-circle success">{message}</strong>}
				</div>
			</div>
			<footer className="settings__footer">
				<button className="btn-cancel" type="button" onClick={back}>{t("cancel")}</button>
				<button 
					className="btn-submit settings-footer__btn-submit" 
					type="submit" 
					disabled={!newPassword || !newPasswordConfirm || !oldPassword || loading}>
				{t("changePassword")}</button>
			</footer>
		</form>
	);
}
 
export default memo(ChangePassword);