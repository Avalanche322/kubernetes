import {useState } from "react";
import firebase from "../../firebase";
import { useTranslation } from "react-i18next";

const useFetchData = () => {
	const [loader, setLoader] = useState(true);
	const {i18n} = useTranslation();
	const settings = JSON.parse(localStorage.getItem('settings'));
	async function fetchData(user){
		try{
			const taskRef = firebase.database().ref(`users/${user.uid}/tasks`);
			const statsRef = firebase.database().ref(`users/${user.uid}/stats`);
			const sortRef = firebase.database().ref(`users/${user.uid}/sort`);
			const settingsRef = firebase.database().ref(`users/${user.uid}/settings`);
			const taskCommentRef = firebase.database().ref(`users/${user.uid}/comments`);
			await taskRef.once('value', (snapshot) =>{
				const tasks = snapshot.val();
					const taskListAll = [];
					for (const id in tasks) {
						taskListAll.push({id,...tasks[id]});
					}
					localStorage.setItem('tasks', JSON.stringify(taskListAll));
				
			})
			await statsRef.once('value', (snapshot) => {
				const statsVal = snapshot.val();
				if(statsVal){
					localStorage.setItem('stats', JSON.stringify(statsVal));
				}
			})
			await sortRef.once('value', (snapshot) => {
				const sortVal = snapshot.val();
					if(sortVal?.hasOwnProperty('home') && sortVal?.hasOwnProperty('inbox')){
						localStorage.setItem('sort', JSON.stringify(sortVal));
					} else if(sortVal?.hasOwnProperty('home')){
						localStorage.setItem('sort', JSON.stringify({inbox: {}, ...sortVal}));
					} else if(sortVal?.hasOwnProperty('inbox')){
						localStorage.setItem('sort', JSON.stringify({home: {}, ...sortVal}));
					} else{
						localStorage.setItem('sort', JSON.stringify({home: {}, inbox:{}}));
					}
			})
			await settingsRef.once('value', async (snapshot) => {
				const settingsVal = snapshot.val();	
				if(settingsVal){
					if(settings?.language){
						i18n.changeLanguage(settings.language);
						document.documentElement.lang = settings.language;
						await settingsRef.update({...settingsVal, ...settings});
						localStorage.setItem('settings', JSON.stringify({...settingsVal, ...settings}));
					} else {
						i18n.changeLanguage(settingsVal.language);
						document.documentElement.lang = settingsVal.language; 
						localStorage.setItem('settings', JSON.stringify(settingsVal));
					}
				}
			})
			await taskCommentRef.once('value', (snapshot) =>{
				const comments = snapshot.val();
				const taskCommentListAll = [];
				for (const id in comments) {
					taskCommentListAll.push({id,...comments[id]});
				}
				localStorage.setItem('comments', JSON.stringify(taskCommentListAll));
			})
			setLoader(false);
		} catch(e){
			setLoader(false);
			alert(e.message);
		}
	}
	return {
		fetchData,
		loader
	}
}
 
export default useFetchData;