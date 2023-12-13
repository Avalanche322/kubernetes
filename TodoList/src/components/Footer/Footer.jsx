import './footer.scss'

import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import logo from '../../assets/img/logo.png'

const Footer = () => {
	const {i18n, t} = useTranslation();
	const {updateSettings, currentUser} = useAuth();
	let settings = JSON.parse(localStorage.getItem('settings')) ?? {};
	const handlerChangeLanguege = (e) =>{
		try{
			if(settings?.vibration) navigator.vibrate(8); // togle vibration
			settings.language = e.target.value;
			if(currentUser){
				updateSettings(settings)
			} else{
				i18n.changeLanguage(settings.language);
				window.location.reload();
			}
			localStorage.setItem('settings', JSON.stringify(settings));
		}catch(e){
			alert(e.message);
		}
	}
	return (
		<footer className='footer'>
			<div className='big-container'>
				<div className="footer__top top-footer">
					<div className="footer__content top-footer__content">
						<div className="top-footer__short">
							<img src={logo} alt="logo" className='top-footer__logo' />
							<p className='top-footer__text'>{t('topFooterTitle')}</p>
							<div>
								<Link className='top-footer__link fab fa-twitter' to='https://twitter.com/?lang=uk'></Link>
								<Link className='top-footer__link fab fa-telegram-plane' to='https://web.telegram.org/z/'></Link>
								<Link className='top-footer__link fab fa-youtube' to='https://www.youtube.com/'></Link>
								<Link className='top-footer__link fab fa-instagram' to='https://www.instagram.com/'></Link>
							</div>
						</div>
						<div className="top-footer__blocks">
							<div className="top-footer__block block-top-footer">
								<h3 className='block-top-footer__title'>{t('features')}</h3>
								<Link className='block-top-footer__link' to='/help'>{t('howItWorks')}</Link>
								<Link className='block-top-footer__link' to='/help'>{t('forTeams')}</Link>
								<Link className='block-top-footer__link' to='/help'>{t('pricing')}</Link>
								<Link className='block-top-footer__link' to='/help'>{t('templates')}</Link>
							</div>
							<div className="top-footer__block block-top-footer">
								<h3 className='block-top-footer__title'>{t('resources')}</h3>
								<Link className='block-top-footer__link' to='/help'>{t('downloadApps')}</Link>
								<Link className='block-top-footer__link' to='/help'>{t('helpCenter')}</Link>
								<Link className='block-top-footer__link' to='/help'>{t('productivityMethods')}</Link>
								<Link className='block-top-footer__link' to='/help'>{t('referFriend')}</Link>
								<Link className='block-top-footer__link' to='/help'>{t('integrations')}</Link>
								<Link className='block-top-footer__link' to='/help'>{t('channelPartners')}</Link>
							</div>
							<div className="top-footer__block block-top-footer">
								<h3 className='block-top-footer__title'>{t('company')}</h3>
								<Link className='block-top-footer__link' to='/help'>{t('aboutUs')}</Link>
								<Link className='block-top-footer__link' to='/help'>{t('weAreHiring')}</Link>
								<Link className='block-top-footer__link' to='/help'>{t('blog')}</Link>
								<Link className='block-top-footer__link' to='/help'>{t('press')}</Link>
								<Link className='block-top-footer__link' to='/help'>{t('twist')}</Link>
							</div>
						</div>
					</div>
				</div>
				<div className="footer__bottom bottom-footer">
					<div className="footer__content">
						<div className="bottom-footer__list">
							<Link to='/help' className='bottom-footer__item'>{t('security')}</Link> 
							<Link to='/help' className='bottom-footer__item'>{t('privacy')}</Link> 
							<Link to='/help' className='bottom-footer__item'>{t('terms')}</Link> 
							<Link 
								to='https://github.com/Avalanche322' 
								className='bottom-footer__item'
							>© Avalanche Inc.</Link>
						</div>
						<div className="select header-help__select" tabIndex="1">
								<select name="language" id="language" onChange={handlerChangeLanguege} value={settings?.language}>
									<option value="en">English</option>
									<option value="uk">Ukraine</option>
								</select>
								<i className="fas fa-sort-down select__arrow"></i>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
 
export default Footer;