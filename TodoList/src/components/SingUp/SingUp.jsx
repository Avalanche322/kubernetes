import '../SingIn/auth.scss';

import { useState, useEffect, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import logo from '../../assets/img/logo.png'
import googleIcon from '../../assets/img/google-icon.png';
import { useAuth } from '../../contexts/AuthContext';

const SingUp = () => {
	const {t} = useTranslation();
	const {singup,singInWithGoogle} = useAuth();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const history = useHistory();
	const [isShowPassword, setIsShowPassword] = useState(false);

	useEffect(() => {
		// title for page
		document.title = `${t('singUp')} | TodoList`
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	async function handleSubmit(e){
		e.preventDefault();

		if(!password && !name){
			return setError('All fields must be filled')
		}
		else if(!(/^(?=.*\d)(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(password))){
			return setError('password must be at least 8 characters long contain a number and an uppercase letter')
		}
		try{
			setError('');
			setLoading(true);
			await singup(email,password,name);
			history.push('/');
		} catch(error){
			setLoading(false);
			setError(error.message)		
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
	function handlerInputName (e){
		setError('');
		setName(e.target.value);
	}
	function handlerInputPass (e){
		setError('');
		setPassword(e.target.value);
	}
	return (
		<div className="sing-up">
			<div className="sing-up__body">
				<div className="sing-up__header">
					<div className="sing-up__logo">
						<img src={logo} alt="logo" />
					</div>
					<h2 className="sing-up__title title">{t('singUp')}</h2>
					{error && <strong className="fas fa-exclamation-circle denger">{error}</strong>}
				</div>
				<button className="btn-submit sing-in__btn-social" onClick={handleSubmitWithGoogle.bind()} disabled={loading}>
						<img className="sing-in__img-social" src={googleIcon} alt="Google Icon" />
						{t('continueWithGoogle')}
				</button>
				<div className="sing-up__or">
					<span>{t('or')}</span>
				</div>
				<form onSubmit={handleSubmit} className="sing-up__form">
					<div className="sing-up__group">
						<label className="sing-up__label" htmlFor="email">{t('email')}</label>
						<div className="sing-up__input input">
							<input 
								onChange={handlerInputEmail}
								type="email" 
								id="email" 
								name="email"/>
						</div>
					</div>
					<div className="sing-up__group">
						<label className="sing-up__label" htmlFor="name">{t('name')}</label>
						<div className="sing-up__input input" >
							<input 
								onChange={handlerInputName}
								type="text" 
								id="name" 
								name="name"/>
						</div>
					</div>
					<div className="sing-up__group">
						<label className="sing-up__label" htmlFor="password">{t('password')}</label>
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
					<button type="submit" className="btn-submit sing-up__btn-submit" disabled={loading}>{t('singUp')}</button>
				</form>
				<p className="sing-up__link">{t('alreadyHaveAccount')} <Link to="/singin" className="link-reset-password">{t('singIn')}</Link></p>
				<p className="sing-up__link"><Link to="/forgotPassword" className="link-reset-password">{t('ForgotPassword')}</Link></p>
			</div>
		</div>
	);
}
 
export default memo(SingUp);