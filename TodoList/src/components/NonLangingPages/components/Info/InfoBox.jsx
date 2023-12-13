import './info-box.scss'

import swipeGifMain from "../../../../assets/img/swipe-menu.gif";
import swipeGifSettings from "../../../../assets/img/swipe-menu-settings.gif";
import contextMenuMobile from "../../../../assets/img/context-menu-mobile.gif"
import soundVibration from "../../../../assets/img/sound-vibration.png";
import { useRef, useEffect, memo } from "react";
import { useTranslation } from "react-i18next";
import { CSSTransition } from "react-transition-group";
import { LazyLoadImage } from "react-lazy-load-image-component";

const InfoBox = ({setDialogFeature,isDialogFeature}) => {
	const modalBoxRef = useRef();
	const { t } = useTranslation();
	function close (){
		setDialogFeature(false);
	}
	useEffect(() =>{
		if(isDialogFeature){
			let hendler = (event) =>{
				if(!modalBoxRef.current.contains(event.target)){
					close();
				}
			}
			document.addEventListener("mousedown", hendler)
			return () =>{
				document.removeEventListener("mousedown", hendler)
			}
		}
	})
	return (
		<CSSTransition 
			in={isDialogFeature}
			classNames="scale" 
			timeout={300}
			nodeRef={modalBoxRef}
			unmountOnExit
			onEnter={() => setDialogFeature(true)}
			onExited={() => setDialogFeature(false)}>
			<div className="dialog">
				<div className="dialog__body" ref={modalBoxRef}>
					<header className="dialog__header">
						<h2 className="dialog__title">{t("informationForNewUser")}</h2>
						<span className="fas fa-times close" onClick={close}></span>
					</header>
					<div className="dialog__container">
						<div className="dialog__block">
							<h3 className="dialog__sub-title">{t("swipeMenu")}</h3>
							<div>
								<p className="dialog__text">{t("swipeMenuInform")}</p>
								<div className="dialog__gif">
									<LazyLoadImage effect="opacity" src={swipeGifMain} alt="swipe gif home" />
								</div>
								<div className="dialog__gif">
									<LazyLoadImage effect="opacity" src={swipeGifSettings} alt="swipe gif settings" />
								</div>
							</div>
						</div>
						<div className="dialog__block">
							<h3 className="dialog__sub-title">{t("contexMenu")}</h3>
							<div>
								<p className="dialog__text">{t("contexMenuInform")}</p>
								<div className="dialog__gif">
									<LazyLoadImage effect="opacity" src={contextMenuMobile} alt="context menu for mobile" />
								</div>
							</div>
						</div>
						<div className="dialog__block">
							<h3 className="dialog__sub-title">{t("soundVibration")}</h3>
							<div>
								<p className="dialog__text">{t("soundVibrationInform")}</p>
								<div className="dialog__img">
									<LazyLoadImage effect="opacity" src={soundVibration} alt="sound & vibration" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</CSSTransition>
	);
}
 
export default memo(InfoBox);