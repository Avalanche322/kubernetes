import './app.scss';

import React from "react";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Loader from './components/Loader/Loader';
import NonLandingPages from "./components/NonLangingPages/NonLandingPages";
import PrivateRoute from './common/PrivateRoute/PrivateRoute';
import { useAuth } from "./contexts/AuthContext";
import ForgotPassword from "./components/ForgotPassword/ForgotPassord";
import { CSSTransition } from "react-transition-group";
import Prevue from "./components/Prevue/Prevue";

const SingUp = React.lazy(() => import("./components/SingUp/SingUp"));
const SingIn = React.lazy(() => import("./components/SingIn/SingIn"));
function App() {
	const {loader, currentUser} = useAuth();

	return ( 
		<div className="App">
				<CSSTransition 
					in={loader && !!currentUser} 
					timeout={400}
					classNames="opacity"
					unmountOnExit>
					<Loader/>
				</CSSTransition>
				<Router>
					<Switch>
						<Route 
							path="/singup" 
							component={() => 
							<React.Suspense fallback={ <Loader/>}>
								<SingUp/> {/* Sing Up */}
							</React.Suspense> }/>
						<Route 
							path="/singin" 
							component={() => 
							<React.Suspense fallback={ <Loader/>}>
								<SingIn/>  {/* Sing In */}
							</React.Suspense> }/>
						<Route 
							path="/forgotPassword" 
							component={() => 
							<React.Suspense fallback={ <Loader/>}>
								<ForgotPassword/> {/* Forgot Password */}
							</React.Suspense> }/>
							<Route 
								path="/prevue" 
								component={() => 
								<React.Suspense fallback={ <Loader/>}>
									<Prevue/> {/* Prevue */}
								</React.Suspense> }/>
						<PrivateRoute component={() => {
							return (
								!loader && <NonLandingPages/>
							)
						}}/>
					</Switch>
				</Router>
		</div>
	);
}

export default App;
