import React from "react";
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Sidebar from '../components/Sidebar.jsx';
import Instructors from '../components/Instructors.jsx';
import { Container } from 'react-bootstrap';
import Login from './Login'
import AddTeacher from '../components/AddTeacher.js'
class Admin extends React.Component {
	constructor()
	{
		super();
		this.state = {
			logout: false,
			showAddModal: false,

			email: '',
			firstName: '',
			lastName: '',
			password: '',
			username: '',
		}

		this.addTeacher = this.addTeacher.bind(this);
		this.removeTeacher = this.removeTeacher.bind(this);
	}


	// get All Teachers, add teachers, delete teachers, search funtionality
	// CORS error
	componentWillMount()
	{
		let url ='https://protected-shelf-85013.herokuapp.com/user/admin/'
		let options = {
			method:'GET',
			headers: { "Content-Type": "application/json; charset=UTF-8",
						"Authorization":"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTU2NDk1MDYyMH0.RQb8qHaPvCDxMmZACbam_-wOksz1aYM3XkIcEHI_YQT_hvXLz8AOxxhqsL_UKphkzm02C_nOCukMF9p3UUn9LA"
				},
		}

		fetch(url, options).then(response=>response.json()).then(data=>{
			console.log(data);
		}).catch(err=>{console.log(err)})
	}

	

	removeTeacher()
	{
		let url ='https://protected-shelf-85013.herokuapp.com/user/admin/'
		
		fetch(url).then(response=>response.json()).then(data=>{
			console.log(data);
		}).catch(err=>{console.log(err)})
	}

	render() {
		if(this.state.logout)
		{
			return(<Login />)
		}

		return (
			<Router>
				<Header />
				<Container fluid style={{height: '80vh'}}>
					<div style={{height: 'calc(100vh - 290px)', margin: '0'}}>
						<div style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'no-wrap', height: '100%', margin: '0 auto', width: '90vw', paddingTop: '50px'}}>
							<Sidebar className="d-none d-sm-block" userType="admin" />
							<div style={{width: '87%', height: 'auto', padding: '0 30px'}}>
								<Switch>
									<Route path="/instructors" component={Instructors} />
	        					</Switch>
							</div>
						</div>
					</div>
				</Container>
			</Router>
		);
	}
}

export default Admin;
