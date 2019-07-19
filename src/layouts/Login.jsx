import React from "react";
import background from '../img/hec.jpg';
import { Card, Button, Form } from 'react-bootstrap';

class Login extends React.Component {
	constructor() {
		super();

		this.state = {
			email: "",
			firstName: "",
			lastName: "",
			userId: 0,
			username : "",
			password : "",
		};

	// const url = 'https://protected-shelf-85013.herokuapp.com/login';
	// const url2 = 'https://protected-shelf-85013.herokuapp.com/course/';

	// var data = {
	// 	"username": "admin",
	// 	"password": "admin123"
	// }
	
	// const options = {
	// 	method : 'POST',
	// 	headers: {"Content-Type": "application/json; charset=UTF-8"},
	// 	body: JSON.stringify(data)
	// };

	// fetch(url, options)
 //        .then(response => response.json())
 //        .then(response => console.log("Success!"))
 //        .catch((error) => console.log("Error"));
	

	// fetch(url2, options)
 //        .then(response => response.json())
 //        .then(response => console.log(response))
 //        .catch((error) => console.log("Error"));
	}

	validateForm() {
		return (this.state.username.length > 0 && this.state.password.length > 0);
	}

	handleUsernameChange = event => {
		this.setState({
			username : event.target.value,
		})
	}

	handlePasswordChange = event => {
		this.setState({
			password: event.target.value,
		});
	}

	handleSubmit = event => {
		// let password = require('password-hash');
		// let hashedPassword;
		// const pass = bcrypt.hashSync(this.state.password))

		const url = 'https://protected-shelf-85013.herokuapp.com/login';
		//event.preventDefault();

		const bcrypt = require('bcryptjs');

		var data = {
			"username": "admin",
			"password": "admin123"
		};
		
		const options = {
			method : 'POST',
			headers: {"Content-Type": "application/json; charset=UTF-8"},
			body: JSON.stringify(data)
		};

		const errors = [];

		
		fetch(url, options)
            .then(response => response.json())
            .then(response => console.log("Success!"))
			// .then(data => {
			// 	this.setState({
			// 		email: data.email,
			// 		userId: data.userId,
			// 		firstName: data.firstName,
			// 		lastName: data.lastName,
			// 		username: data.username
			// 	});

			// 	console.log("user : " + data.password)

			// 	const user = JSON.stringify(this.state);
			// 	localStorage.setItem('user', user);

			// 	bcrypt.compare(this.state.password, data.password)
			// 		.then(function(res) {
			// 			if (res) {
			// 				// accept password.
			// 			}
			// 			else {
			// 				// wrong password.
			// 			}
			// 	});
			// })
			.catch((error) => console.log("Error"));
				//{
				// ReactDOM.unmountComponentAtNode(document.getElementById('root'));
				// ReactDOM.render(<Login />, document.getElementById('root'))
			//})
	}		

	render() {
		return (
			<>
				<div style={{float: 'left', backgroundImage: 'url(' + background + ')', backgroundPosition: 'center', backgroundSize: 'cover', height: '100vh', width: '60vw'}}>
					<div className="stripe" style={{backgroundColor: 'black'}} />
					<div className="stripe" style={{backgroundColor: '#D39700'}} />
				</div>
				<div style={{float: 'left', width: '40vw', height: '100vh'}}>
					<Card style={{width: '80%', margin: '0 auto'}}>
						<Card.Body>
			  				<Form>
							  	<Form.Group controlId="formBasicUsername">
							    	<Form.Label>Username</Form.Label>
							    	<Form.Control type="username" placeholder="Enter username" />
							  	</Form.Group>

							  	<Form.Group controlId="formBasicPassword">
							    	<Form.Label>Password</Form.Label>
							    	<Form.Control type="password" placeholder="Password" />
							  	</Form.Group>

							  	<Form.Group controlId="formBasicChecbox">
							    	<Form.Check type="radio" label="Administrator" />
							    	<Form.Check type="radio" label="Instructor" />
							    	<Form.Check type="radio" label="Teaching Assistant" />
							  	</Form.Group>

							  	<Button variant="primary" type="submit">
							    	Submit
							  	</Button>
							</Form>
						</Card.Body>
		  			</Card>
				</div>
			</>
		)
	}
}

export default Login;