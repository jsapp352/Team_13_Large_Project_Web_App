import React from "react";
import background from '../img/hec.jpg';
import { Card, Button, Form } from 'react-bootstrap';
import { Link, BrowserRouter as Router} from 'react-router-dom';
import Queue from './Queue';
import IncorrectInfo from '../components/IncorrectInfo';

class Login extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			userId: 0,
			username : "",
			password : "",
			userType : "admin",
			error: false,
		};
		this.hideModal = this.hideModal.bind(this);
		this.showModal = this.showModal.bind(this);
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

		const url = 'https://protected-shelf-85013.herokuapp.com/login';
		const user = this.state.username;
		const pass = this.state.password;

		const options = {
			method : 'POST',
			headers: { "Content-Type": "application/json; charset=UTF-8"},
			body: JSON.stringify({
				'username': user,
				'password': pass
			})
		}

		let q = '';
		fetch(url, options)
			.then(response => {
				q = response.headers.get('authorization');
				// console.log(q)
				let opt = {
					method : 'GET',
					headers: { 
						"Content-Type": "application/json; charset=UTF-8",
						"Authorization" : q
					},
				}

				// console.log(opt)
				fetch('https://protected-shelf-85013.herokuapp.com/user/', opt)
					.then(r => r.json())
					.then(user => {
						// console.log(user)
						this.setState({userType: user.role})

						if (q == null) {
							this.setState({error:true})
						}
						else {
							localStorage.setItem("isAuth", true);
							localStorage.setItem("token", q);
							localStorage.setItem("userType", this.state.userType);
			
							const path = '/' + this.state.userType;
							if (this.props.history !== undefined)
								this.props.history.push(path); 
					
							// debugger;
							window.location.reload();
						}
					})
			
			})
	}	
	
	hideModal()
	{
		this.setState({error: false})
	}	

	showModal()
	{
		this.setState({error:true})
	}

	render() {
		return (
			<div>
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
						
									<Link to='/queue' className="queueLink"><b>Student?</b> See the live queue <u>here</u></Link>
								</Form>
							</div>
						</Card.Body>
					</Card>
				</div>
				<IncorrectInfo show={this.state.error} hideModal={this.hideModal} />
			</div>
		)
	}
}

export default Login;
