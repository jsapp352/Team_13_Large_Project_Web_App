import React from "react";
import { Route, Link ,BrowserRouter as Router, Switch } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Sidebar from '../components/Sidebar.jsx';
import Instructors from '../components/Instructors.jsx';
import { Container } from 'react-bootstrap';
import Login from './Login'
// import { ClipLoader } from 'react-spinners';
// import { css } from '@emotion/core';

class Admin extends React.Component {
	constructor()
	{
		super();
		this.state = {
			logout: false,
			showAddModal: false,
			teacherList: null,


			email: '',
			firstName: '',
			lastName: '',
			password: '',
			username: '',
		}

	}

	componentWillMount()
	{
		let token = localStorage.getItem('token');
		let url ='https://protected-shelf-85013.herokuapp.com/user/admin/'
		let options = {
			method:'GET',
			headers: { 
				"Content-Type": "application/json; charset=UTF-8",
				"Authorization": token
			},
		}
	
		fetch(url, options).then(response=>response.json()).then(data=>{
			this.setState({teacherList:data});
			
			// localStorage.setItem('teacherList', JSON.stringify(data));
		}).catch(err=>{console.log(err)})
	}

	render() {

		console.log(this.props)
		if(this.state.logout)
		{
			return(<Router>
					<Link to="/login"/>
	        	</Router>);
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

// const override = css`
//     display: block;
//     margin: 0 auto;
// 	padding: 50px;
//     border-color: orange;
// `;
