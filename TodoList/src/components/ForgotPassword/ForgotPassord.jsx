import '../SingIn/auth.scss';

import { Link } from 'react-router-dom';
import logo from "../../assets/img/logo.png";
import { useAuth } from '../../contexts/AuthContext';
import { memo, useState } from 'react';

const ForgotPassword = () => {
	const {resetPassword} = useAuth();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');
	async function handleSubmit(e){
		e.preventDefault();
		try{
			setMessage('');
			setError('');
			setLoading(true);
			await resetPassword(email);
			setMessage('Check your inbox for further instructions')
		} catch(error){
			setMessage('');
			setLoading(false);
			setError(error.message)		
		} finally{
			setLoading(false);
		}
		
	}
	return (
		<div className="sing-up">
			<div className="sing-up__body">
				<div className="sing-up__header">
					<div className="sing-up__logo">
						<img src={logo} alt="logo" />
					</div>
					<h2 className="sing-up__title title">Forgot your password?</h2>
					{error && <strong className="fas fa-exclamation-circle denger">{error}</strong>}
					{message && <strong className="far fa-check-circle success">{message}</strong>}
				</div>
				<form onSubmit={handleSubmit} className="sing-up__form">
					<div className="sing-up__group">
						<label className="sing-up__label" htmlFor="email">Email</label>
						<div className="sing-up__input input">
							<input 
								onChange={(e) => setEmail(e.target.value)}
								type="email" 
								id="email" 
								name="email"/>
						</div>
					</div>
					<button type="submit" className="btn-submit sing-up__btn-submit" disabled={loading}>Reset my password</button>
				</form>
				<p className="sing-up__link"><Link to="/singin" className="link-reset-password">Go to login</Link></p>
			</div>
		</div>
	);
}
 
export default memo(ForgotPassword);