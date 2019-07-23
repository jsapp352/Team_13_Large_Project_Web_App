import React from "react";
import background from '../img/hec.jpg';
import { Card, Button, Form } from 'react-bootstrap';

class Login extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			userId: 0,
			username : "",
			password : "",
			userType : "admin"
		};
	}

	validateForm() {
		return (this.state.username.length > 0 && this.state.password.length > 0);
	}

	handleChange = event => {
		this.setState({
			[event.target.id]: event.target.value
		});
	}

	handleSubmit = event => {
		event.preventDefault();
		console.log("TYPEEEEE: " + this.state.userType);

		const url = 'https://protected-shelf-85013.herokuapp.com/login';

		const options = {
			method : 'POST',
			headers: { "Content-Type": "application/json; charset=UTF-8"},
			body: JSON.stringify({
				username: 'admin',
				password: 'admin123'
			})
		}

		let q = '';
		fetch(url, options)
			.then(response => {
				q = response.headers.get('authorization');
				console.log(q); // Delete this before production.
			})
			.then(() => {
				if (q == null) {
					console.log("Wrong password.");
					this.props.userHasAuthenticated(false);
				}
				else {
					console.log("Good.");
					this.props.userHasAuthenticated(true);
					localStorage.setItem("isAuth", true);

					// This should change depending on the type of user...
					const path = '/' + this.state.userType;
					this.props.history.push(path); 
				}
			})
	}		

	render() {
		return (
			<>
				<div className="cover d-none d-md-none d-lg-block" style={{backgroundImage: 'url(' + background + ')'}}>
					<div className="stripe" style={{backgroundColor: 'black'}} />
					<div className="stripe" style={{backgroundColor: '#D39700'}} />
				</div>
				<div className="login-wrapper">
					<Card>
						<Card.Body style={{boxShadow: '5px 5px 2px 1px rgba(200,200,200,1)'}}>
							<div className="m-sm-4">
								<div className="text-center mt-4">
									<h1 className="h2">Welcome!</h1>
									<p> Sign in to continue </p><br/>
								</div>
								<Form onSubmit={this.handleSubmit}>
									<Form.Group controlId="userType" className="selector">
										<Form.Label>Type of user:</Form.Label>
										<Form.Control as="select" onChange={this.handleChange}>
											<option value="admins">Administrator</option>
											<option value="teachers">Instructor</option>
											<option value="assistants">Teaching Assistant</option>
										</Form.Control>
									</Form.Group>
									<Form.Group controlId="username">
										<Form.Label>Username</Form.Label>
										<Form.Control 
											className="form-control-lg"
											type="username"
											value={this.state.username}
											onChange={this.handleChange}
											placeholder="Enter username" 
										/>
									</Form.Group>

									<Form.Group controlId="password">
										<Form.Label>Password</Form.Label>
										<Form.Control 
											className="form-control-lg"
											type="password" 
											value={this.state.password}
											onChange={this.handleChange}
											placeholder="Password" 
										/>
									</Form.Group>

									<Button disabled={!this.validateForm()} variant="dark" type="submit">
										Login
									</Button>
								</Form>
							</div>
						</Card.Body>
					</Card>
				</div>
			</>
		)
	}
}

export default Login;