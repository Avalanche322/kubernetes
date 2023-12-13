import { useTranslation } from "react-i18next";
import moment from 'moment';
import 'moment-timezone';
import "moment/locale/en-gb";
import "moment/locale/uk";

const useGetDate = () => {
	const { t } = useTranslation();
	moment.locale("en-gb");
	let today = new Date();
	let tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);
	let nextWeek = new Date();
	nextWeek.setDate(nextWeek.getDate() + 7);
	let nextWeekend  = new Date();
	nextWeekend.setDate(nextWeekend.getDate() + (6 - 1 - nextWeekend.getDay() + 7) % 7 + 1);
	const timeFormat = ["YYYY-MM-DD", "DD-MM-YYYY", "DD-MMM-YYYY","DDD-MM-YYYY"];
	const converToFullDate = (dateString) => { // conver for user display date	
		if(dateString){
			moment.locale(t("locales"));
			if(moment().format('YYYY') === moment(dateString, timeFormat).format('YYYY')){
				return moment(dateString, timeFormat).format('ddd D MMM') // format Thu 4 Aug for user
			} else{
				return moment(dateString, timeFormat).format('ll') // format 3 Aug 2021 for user
			}
		} else{
			return ""
		}
	}
	const converToShortDate = (dateString) => moment(dateString).format("YYYY-MM-DD"); // format YYYY-MM-DD
	const converToTimeformat = (date) => {
		if(moment().format('YYYY') === moment(date).format('YYYY')){
			return moment(date).format("D MMM HH:mm") // format Thu 4 Aug for user
		} else{
			return moment(date).format("D MMM YYYY HH:mm") // format 3 Aug 2021 for user
		}
	}
	return {
		today : () => moment(today).format(), // format year-month-day-time for server
		tomorrow : () => moment(tomorrow).format(), // format year-month-day-time for server
		nextWeek : () => moment(nextWeek).format(), // format year-month-day-time for server
		nextWeekend : () => moment(nextWeekend).format(), // format year-month-day-time for server
		converToFullDate,
		converToShortDate,
		converToTimeformat
	}
}
 
export default useGetDate;