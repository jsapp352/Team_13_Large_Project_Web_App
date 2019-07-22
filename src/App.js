import React from 'react';
// import logo from './logo.svg';
import './css/styles.css';
import Instructor from './layouts/Instructor.jsx';
import Queue from './Queue'
function App() {
	return (
		<div>
			<Instructor />
			<Queue/>
		</div>

		// Use browser router.
	);
}

export default App;
