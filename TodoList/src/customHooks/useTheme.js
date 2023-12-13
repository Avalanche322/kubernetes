import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import firebase from "../firebase";

const useTheme = () => {
	const themes = JSON.parse(localStorage.getItem('themes'));
	const currentSettings = JSON.parse(localStorage.getItem('settings'));
	const [theme, setTheme] = useState(themes.blueDark);
	const {currentUser} = useAuth();
	const [error, setError] = useState('');
	/*
		fetch settings from firebase and set in local is slow and if settings local is loadded we use them else we fetch thme
	*/
	useEffect(() =>{
		if(currentSettings){
			for (const key in themes) {
				if(currentSettings.theme === key ) {
					setTheme(() => themes[key]);
					
				}
			}
		} else{
			try{
				const settingsRef = firebase.database().ref(`users/${currentUser.uid}/settings`);
				settingsRef.once('value', (snapshot) => {
					const settingsVal = snapshot.val();	
					if(settingsVal){
						for (const key in themes) {
							if(settingsVal.theme === key ) {
								setTheme(() => themes[key]);
								//break
							}
						}
					}
				})
			} catch(e){
				setError(e.message);
			}
		}
	// eslint-disable-next-line
	},[])
	return {theme,setTheme,error}
}
 
export default useTheme;