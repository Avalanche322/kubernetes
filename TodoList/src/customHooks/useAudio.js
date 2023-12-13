import {useContext } from "react";
import Context from "../contexts/context";
import completedSound from '../assets/sounds/completed.mp3' 
import useWindowSize from "./useWindowSize";

const useAudio = () => {
	const {settings} = useContext(Context);
	const {windowSize} = useWindowSize();
	const completedSoundDesktop = settings?.completed_sound_desktop ?? false;
	const completedSoundMobile = settings?.completed_sound_mobile ?? true;

	const playAudio = () =>{
		const audio = new Audio(completedSound);
		if(windowSize.width <= 768 && completedSoundMobile ){
			audio.play();
		} else if(windowSize.width > 768 && completedSoundDesktop){
			audio.play();
		}
	}

  return {playAudio};
};

export default useAudio