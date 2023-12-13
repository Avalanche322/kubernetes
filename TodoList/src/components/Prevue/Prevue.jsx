import './prevue.scss'

import { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ScrollAnimation from 'react-animate-on-scroll';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Footer from '../Footer/Footer';
import mainPageImg from '../../assets/img/markdown/Screenshot_1.png'
import inboxPageImg from '../../assets/img/markdown/Screenshot_5.png'
import settingsPageImg from '../../assets/img/markdown/settings.gif'
import taskDetailsPageImg from '../../assets/img/markdown/task-details.gif'

const Prevue = () => {
	const {t} = useTranslation();
	const [active, setActive] = useState(false);
	useEffect(() => {
		// title for page
		document.title = `TodoList: ${t('prevueTitle')}`;
	})
	return (
		<section className='prevue'>
			<header className='prevue__header header-prevue header'>
				<div className="big-container header-prevue__content">
					<h2 className='header-prevue__title'>
						<Link to='/prevue'>The best TodoList</Link>
					</h2>
					<div className={`header-prevue__menu ${active ? '_active' : ''}`}>
						<Link className='header-prevue__link' to='/singin'>{t('singIn')}</Link>
					</div>
					<div
						onClick={() => setActive(!active)}
						className={`${active ? '_active' : ''} header-prevue__humburger header__humburger`}><span></span></div>
				</div>
			</header>
			<div className='prevue__main main-prevue'>
				<div className='main-prevue__waves waves-main-prevue'>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="100vh"
						width="100%">
						<g fill="none">
							<path
								fill="rgba(77, 168, 218, 1)" 
								d="
									M0 200
									C 273,183
										500,100
										1920.00,106 

									V 700
									H 0 
									V 500
									Z">
								<animate 
									repeatCount="indefinite" 
									fill="rgba(77, 168, 218, 1)" 
									attributeName="d" 
									dur="15s" 
									values="
										M0 200
										C 473,283
										500,100
										1920,116 

										V 700
										H 0 
										V 500
										Z; 

										M0 200
										C 473,-40
										700,400
										1920,136 

										V 700
										H 0 
										V 500
										Z; 

										M0 200
										C 973,260
										900,200
										1920,120 

										V 700
										H 0 
										V 500
										Z; 

										M0 200
										C 473,283
										500,100
										1920,116 

										V 700
										H 0 
										V 500
										Z
										">
								</animate>
							</path>
							<path 
								fill="rgba(0, 124, 199, 1)" 
								d="
									M0 67
									C 273,183
										822,200
										1920.00,106 

									V 700 
									H 0 
									V 500
									Z">
								<animate 
									repeatCount="indefinite" 
									fill="rgba(0, 124, 199, 1)" 
									attributeName="d" 
									dur="25s" 
									values="
										M0 350
										C 473,283
										1680,400
										1920,116 

										V 700 
										H 0 
										V 500 
										Z; 

										M0 350
										C 473,200
										1200,723
										1920,136 

										V 700 
										H 0 
										V 500 
										Z; 

										M0 350
										C 973,460
										1850,203
										1920,120 

										V 700
										H 0 
										V 500 
										Z; 

										M0 350
										C 473,283
										1680,400
										1920,116 

										V 700 
										H 0 
										V 500 
										Z
										">
								</animate>
							</path>
						</g>
						<foreignObject width='100%' height='100%'>
							<div className='waves-main-prevue__block'>
								<h2 className='waves-main-prevue__title'>{t('organizeTodoList')}</h2>
								<Link to='/singup' className='btn-submit main-prevue__btn'>{t('getStarted')}</Link>
							</div>
						</foreignObject>
					</svg>
				</div>
				<div className="big-container">
					<div className='main-prevue__section'>
						<div className="main-prevue__content">
							<div className='main-prevue__block'>
								<p className="main-prevue__uppertitle">{t('globalTodoList')}</p>
								<h3 className='main-prevue__title'>{t('manageYourToDo')}</h3>
								<p className='main-prevue__text'>{t('globalTodoListText')}</p>
							</div>
							<ScrollAnimation 
								animateIn='zoom'
								animateOut='zoom-default' 
								initiallyVisible={true}
								style={{opacity: '1'}}>
								<div className='main-prevue__img'>
									<LazyLoadImage effect="opacity" src={mainPageImg} alt="main page" />
								</div>
							</ScrollAnimation>
						</div>
					</div>
					<div className='main-prevue__section'>
						<div className="main-prevue__content">
							<div className='main-prevue__block'>
								<p className="main-prevue__uppertitle">{t('customization')}</p>
								<h3 className='main-prevue__title'>{t('createPerfectList')}</h3>
								<p className='main-prevue__text'>{t('customizationText')}</p>
							</div>
							<ScrollAnimation 
									animateIn='zoom' 
									animateOut='zoom-default' 
									initiallyVisible={true}
									style={{opacity: '1'}}>
								<div className='main-prevue__img'>
									<LazyLoadImage effect="opacity" src={settingsPageImg} alt="settings page" />
								</div>
							</ScrollAnimation>
						</div>
					</div>
					<div className='main-prevue__section'>
						<div className="main-prevue__content">
							<div className='main-prevue__block'>
								<p className="main-prevue__uppertitle">{t('organization')}</p>
								<h3 className='main-prevue__title'>{t('neverMissTask')}</h3>
								<p className='main-prevue__text'>{t('organizationText')}</p>
							</div>
							<ScrollAnimation 
								animateIn='zoom'
								animateOut='zoom-default' 
								initiallyVisible={true}
								style={{opacity: '1'}}>
								<div className='main-prevue__img'>
									<LazyLoadImage effect="opacity" src={inboxPageImg} alt="inbox page" />
								</div>
							</ScrollAnimation>
						</div>
					</div>
					<div className='main-prevue__section'>
						<div className="main-prevue__content">
							<div className='main-prevue__block'>
								<p className="main-prevue__uppertitle">{t('detailsTask')}</p>
								<h3 className='main-prevue__title'>{t('CreateClearActionItems')}</h3>
								<p className='main-prevue__text'>{t('detailsTaskText')}</p>
							</div>
							<ScrollAnimation 
								animateIn='zoom' 
								animateOut='zoom-default' 
								initiallyVisible={true}
								style={{opacity: '1'}}
								>
								<div className='main-prevue__img'>
									<LazyLoadImage effect="opacity" src={taskDetailsPageImg} alt="task details page" />
								</div>
							</ScrollAnimation>
						</div>
					</div>
					<div className="main-prevue__bottom bottom-main-prevue">
						<h3 className='bottom-main-prevue__title'>{t('CreateClearActionItems')}</h3>
						<Link to='/singup' className='btn-submit main-prevue__btn'>{t('getStarted')}</Link>
					</div>
				</div>
			</div>
			<Footer/>
		</section>
	);
}
 
export default Prevue;