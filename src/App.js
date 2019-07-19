import React from 'react';
import './css/styles.css';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import InstructorView from './layouts/Instructor.jsx';
import Login from './layouts/Login.jsx';

function App() {
	return (
		<Router>
			<div>
				<Route exact path="/" component={InstructorView} />
				<Route path="/login" component={Login} />
			</div>
		</Router>
	);
}

export default App;
