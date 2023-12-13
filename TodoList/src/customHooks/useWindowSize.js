import { useState, useEffect } from "react";
const useWindowSize = () => {
	const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  	});
	const [isTouchDevice, setIsTouchDevice] = useState();

  useEffect(() => {
    	function handleResize() {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
			setIsTouchDevice('ontouchstart' in document.documentElement);
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}
   	window.addEventListener("resize", handleResize);
    	handleResize();
    	return () => window.removeEventListener("resize", handleResize);
  }, []);
  return {windowSize,isTouchDevice};

}
 
export default useWindowSize;