import './drop-down.scss';

import React, { useRef, useEffect, useState, memo,useContext } from "react";
import { useTranslation,Trans } from "react-i18next";
import useGetDate from "../../customHooks/useGetDate";
import Context from "../../contexts/context";

const Day = ({setIsSelectDayOpen,isDayClass,isSelectDayOpen,isDay,handlerSetDate,isSelectDay,handlerSelectValueDay,date,setIsDay,setIsDayClass,task,handlerInputDateSubmit}) => {
	const {settings} = useContext(Context);
	let selectDayRef = useRef();
	const {converToFullDate,converToShortDate,today,tomorrow,nextWeek,nextWeekend} = useGetDate();
	const { t } = useTranslation();
	const [isInputDate, setIsInputDate] = useState(false);
	const [inputDate, setInputDate] = useState(converToFullDate(date));
	function handlerInputDate(date){
		setIsInputDate(true);
		if(date === ""){
			setIsInputDate(false);
		}
		if(date === "tomorrow" || date === "завтра"){
			setInputDate(converToFullDate(tomorrow()));
		} else if(date === "today" || date === "сьогодні"){
			setInputDate(converToFullDate(today()));
		} else if(date === "weekends" || date === "вихідні"){
			setInputDate(converToFullDate(nextWeekend()));
		} else if(date === "next week" || date === "наступний тиждень"){
			setInputDate(converToFullDate(nextWeek()));
		} else{
			setInputDate(date);
		}
	}
	function handlerDayOpen(){
		setIsSelectDayOpen(!isSelectDayOpen);
		if(settings.vibration) navigator.vibrate(15); // togle vibration
	}
	function handlerItemDay(selectDay){
		handlerSelectValueDay(selectDay.day,selectDay.date,selectDay.classValue,handlerSetDate,task); // pass handlerSetDate for update local state edit
		setInputDate(converToFullDate(selectDay.date));
	}
	useEffect(() =>{		
		let hendler = (event) =>{
			if(!selectDayRef.current.contains(event.target)){
				setIsSelectDayOpen(false);
				setInputDate(converToFullDate(date));
				setIsInputDate(false);
			}
		}
		document.addEventListener("mousedown", hendler)
		return () =>{
			document.removeEventListener("mousedown", hendler)
		};	
	});
	useEffect(() =>{
		for (const day of isSelectDay) {
			if(converToFullDate(day.date) === converToFullDate(date)){
				setIsDayClass(day.classValue);
				setIsDay(day.day);
				return
			}
		}
		setIsDay(converToFullDate(date));
	// eslint-disable-next-line
	},[])
	useEffect(() => {
		let hendler = (event) => {
			if(event.code === 'Escape'){
				setIsSelectDayOpen(false);
				setInputDate(converToFullDate(date));
				setIsInputDate(false);
			}
		}
		document.addEventListener('keydown', hendler);
		return () =>{
			document.removeEventListener("keydown", hendler)
		}
	//eslint-disable-next-line
	},[])
	return (
		<div ref={selectDayRef} className="day">
			<button 
				className={`day__btn drop-down__btn ${isDayClass} ${converToShortDate(date) < converToShortDate(today()) ? "denger-btn" : ''}`} 
				type="button"
				onClick={handlerDayOpen.bind(null)}>
			{date ? converToFullDate(date) : t("noDate") }
			</button>
			<ul className={`day__list drop-down__list ${isSelectDayOpen ? "open" : "hidden"}`}>
				<li>
					<input 
						value={inputDate}
						className="day__input" 
						type="text"
						placeholder={t("typeAdate")}
						onChange={(e) => handlerInputDate(e.target.value)}/>
				</li>
				{isInputDate && (converToFullDate(inputDate) !== "Invalid date") && <li className="day__moment">
					<p className="day__input-text">{t("didYouMean")}
					<span onClick={handlerInputDateSubmit.bind(null,setInputDate,setIsSelectDayOpen,setIsInputDate,inputDate,task)}>{converToFullDate(inputDate)}</span> ?</p>
					<p className="day__input-subtext">
						<Trans i18nKey="inputDateInfo">
							You can also type in recurring due dates like <span>today</span>, <span>tomorrow</span>,<span>next week</span>, and <span>weekends</span>.
						</Trans></p>
				</li>}
				{isSelectDay.filter(day => day.day !== isDay).map(selectDay =>{
					return (
						<li
							tabIndex="1"
							key={selectDay.id}
							onClick={handlerItemDay.bind(null,selectDay)}
							onKeyDown={(e) => e.key === "Enter" ?  handlerItemDay(selectDay) : null}>
							<span className={`day__day ${selectDay.classValue}`}>{t(selectDay.day)}</span> 
							<span className="day__date">{converToFullDate(selectDay.date)}</span>
						</li>)
				})}
			</ul>
		</div>
	);
}
 
export default memo(Day);