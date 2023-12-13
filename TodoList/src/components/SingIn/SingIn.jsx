import './auth.scss'

import { useAuth } from '../../contexts/AuthContext';
import { useState, useEffect, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import logo from '../../assets/img/logo.png'
import googleIcon from '../../assets/img/google-icon.png';

const SingIn = () => {
	const {t} = useTranslation();
	const {singin,singInWithGoogle} = useAuth();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const history = useHistory();
	const [isShowPassword, setIsShowPassword] = useState(false);
	useEffect(() => {
		// title for page
		document.title = `${t('singIn')} | TodoList`
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	async function handleSubmit(e){
		e.preventDefault();
		try{
			setError('');
			setLoading(true);
			await singin(email,password);
			history.push('/');
		} catch(e){
			setLoading(false);
			setError('Email or password incorrect')
		}
	}
	async function handleSubmitWithGoogle(){
		try{
			setLoading(true);
			await singInWithGoogle();
			history.push('/');
		} catch(e){
			setLoading(false);
		}
	}
	function handlerInputEmail (e){
		setError('');
		setEmail(e.target.value);
	}
	function handlerInputPass (e){
		setError('');
		setPassword(e.target.value);
	}
	return (
		<div className="sing-in">
			<div className="sing-in__body">
				<div className="sing-in__header">
					<div className="sing-in__logo">
						<img src={logo} alt="logo" />
					</div>
					<h2 className="sing-in__title title">{t('singIn')}</h2>
					{error && <strong className="fas fa-exclamation-circle denger">{error}</strong>}
				</div>
				<button className="btn-submit sing-in__btn-social" onClick={handleSubmitWithGoogle.bind()} disabled={loading}>
						<img className="sing-in__img-social" src={googleIcon} alt="Google Icon" />
						{t('continueWithGoogle')}
				</button>
				<div className="sing-in__or">
					<span>{t('or')}</span>
				</div>
				<form onSubmit={handleSubmit} className="sing-in__form">
					<div className="sing-in__group">
						<label className="sing-up__label" htmlFor="email">{t('email')}</label>
						<div className="input">
							<input 
								onChange={handlerInputEmail}
								type="email" 
								id="email" 
								name="email"/>
						</div>
					</div>
					<div className="sing-in__group">
						<label className="sing-ip__label" htmlFor="password">{t('password')}</label>
						<div className="input">
							<input 
								onChange={handlerInputPass}
								type={isShowPassword ? "text" : "password"} 
								id="password" 
								name="password" />
							<button 
								type="button" 
								className={`${isShowPassword ? "far fa-eye" : "far fa-eye-slash"} btn-password`}
								onClick={setIsShowPassword.bind(null,!isShowPassword)}></button>
						</div>
					</div>
					<button type="submit" className="btn-submit sing-in__btn-submit" disabled={loading}>{t('singIn')}</button>
				</form>
				<p className="sing-in__link">{t('needAccount')} <Link to="/singup" className="link-reset-password">{t('singUp')}</Link></p>
				<p className="sing-in__link"><Link to="/forgotPassword" className="link-reset-password">{t('ForgotPassword')}</Link></p>
			</div>
		</div>
	);
}
 
export default memo(SingIn);