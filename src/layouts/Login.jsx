import React from "react";
import background from '../img/hec.jpg';
import { Card, Button, Form } from 'react-bootstrap';

class Login extends React.Component {
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