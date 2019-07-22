import React from 'react';
import './css/styles.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from "./Routes";

class App extends React.Component {
	constructor(props) {
	  	super(props);

	  	this.state = {
	    	isAuthenticated: false,
	    	isAuthenticating: true
	  	};
	}

	async componentDidMount() {
		const auth = localStorage.getItem("isAuth");
		console.log(auth);

		if (auth !== null)
			this.userHasAuthenticated(true);
		else
			this.userHasAuthenticated(false);

		this.setState({ isAuthenticating: false });
	}

	userHasAuthenticated = authenticated => {
		this.setState({ isAuthenticated: authenticated });
	}

	render() {
		const childProps = {
		  	isAuthenticated: this.state.isAuthenticated,
		  	userHasAuthenticated: this.userHasAuthenticated
		};

		return (
			!this.state.isAuthenticating &&
			<Router>
				<Routes childProps={childProps}/>
			</Router>
		)

		// return (
		// 	<Router>
		// 		<div>
		// 			<Route exact path="/" component={Login} />
		// 			<Route path="/teachers" component={InstructorView} />
		// 		</div>
		// 	</Router>
		// );
	}
}

export default App;