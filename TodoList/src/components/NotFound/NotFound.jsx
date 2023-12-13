import './not-found.scss'

import { Link } from "react-router-dom";
import { memo, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Trans } from "react-i18next";
import Context from "../../contexts/context";

const NotFound = () => {
	const {settings} = useContext(Context);
	const { t } = useTranslation();
	useEffect(() => {
		// title for page
		document.title = `${t("notFound")} | TodoList`;
	// eslint-disable-next-line
	}, [])
	function handlerGoHome(){
		if(settings.vibration) navigator.vibrate(8); // togle vibration
	}
	return (
		<div className="not-found">
    		<div className="not-found__code">
				 	<span>4</span>
					<span className="far fa-question-circle fa-spin"></span>
					<span>4</span>
			 </div>
    		<div className="not-found__text">
				{t("notFoundPart1")}
				<p>
					<Trans i18nKey="notFoundPart2">
						Let's go <Link to="/home" className="btn-cancel" onClick={handlerGoHome}>home</Link> and try from there.
					</Trans>
				</p>
			</div>
      </div>
	);
}
 
export default memo(NotFound);