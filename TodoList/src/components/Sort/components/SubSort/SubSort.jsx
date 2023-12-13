import './sub-sort.scss';

import { memo } from "react";
import { useTranslation } from "react-i18next";
import Context from "../../../../contexts/context";
import { useContext } from "react";
import { useAuth } from "../../../../contexts/AuthContext";

const SubSort = ({selectItemSort,setSelectItemSort,project}) => {
	const {settings} = useContext(Context);
	const {t} = useTranslation();
	const {updateSort} = useAuth();
	async function handlerClose(){
		try{
			const sort = JSON.parse(localStorage.getItem('sort'));
			sort[project] = {};
			localStorage.setItem('sort', JSON.stringify(sort))
			setSelectItemSort(prevState =>({
				...prevState,
				[project] : {}
			}));
			updateSort(sort);
			if(settings.vibration) navigator.vibrate(10); // togle vibration
		} catch(e){
			alert(e.message);
		}
	}
	function handlerReverse (val){
		setSelectItemSort(prevState =>({
			...prevState,
			[project] : {
				...prevState[project],
				sort_order: val === "desc" ? "asc" : "desc"
			}
		}));
		// update local storage
		const sort = JSON.parse(localStorage.getItem('sort'));
		sort[project].sort_order = val === "desc" ? "asc" : "desc";
		updateSort(sort);
		if(settings.vibration) navigator.vibrate(8); // togle vibration
	}
	return (
		<div className="main-sort__sub sub-sort-main">
			<button 
				className={`fas fa-long-arrow-alt-${selectItemSort[project]?.sort_order === "desc" ? "up" : "down"} main-sort__btn-reverse`}
				onClick={handlerReverse.bind(null,selectItemSort[project]?.sort_order)}></button>
			<span className="sub-sort-main__name">{t(`sortedBy${selectItemSort[project]?.sorted_by}`)}</span>
			<button className="fas fa-times close" onClick={handlerClose.bind(null)}></button>
		</div>
	);
}
 
export default memo(SubSort);