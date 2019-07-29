import React from "react";
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Sidebar from '../components/Sidebar.jsx';
import TACourses from '../components/TACourses.jsx';
import Stats from '../components/Stats.jsx';
import { Container } from 'react-bootstrap';

class TA extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			userId: '',
			name: '',
			last: '',
			courses: [],
			ta: ''
		}
	}

	componentDidMount() {
		const url = "https://protected-shelf-85013.herokuapp.com/user/";

		const options = {
			method : "GET",
			headers: { 
				"Content-Type": "application/json; charset=UTF-8",
				"Authorization": localStorage.getItem("token")
				// "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzZXh0aW5hYSIsImV4cCI6MTU2NTI4MDI0Nn0.-7NHGhtkqSrWlHnITaRNAK85WwFU6DZuzaAUhiPtSYHoIrZNjZQsKgCWS6ggPs16P6m8K-_7TIAgWejPQhIVzw"
			}
		}

		// Get current logged in user's id
		fetch(url, options)
			.then(response => response.json())
			.then(ta => {
				console.log("User: " + JSON.stringify(ta))
				this.setState({userId: ta.userId, name: ta.firstName, last: ta.lastName, ta: ta})
			})
			.catch(e => console.log("Error: " + e))

		// Get current logged in user's courses
		const urlCourses = "https://protected-shelf-85013.herokuapp.com/course/ta/";
		fetch(urlCourses, options)
			.then(response => response.json())
			.then(courses => {
				console.log("Courses of Sextina: " + JSON.stringify(courses))
				this.setState({courses: courses})
			})
			.catch(e => console.log("Error: " + e))
  	}

	render() {
		console.log(JSON.stringify(this.state.courses))
		return (
			<Router>
				<Header key={this.state.userId} firstName={this.state.name} lastName={this.state.last} />
				<Container fluid style={{height: '80vh'}}>
					<div style={{height: 'calc(100vh - 290px)', margin: '0'}}>
						<div style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'no-wrap', height: '100%', margin: '0 auto', width: '90vw', paddingTop: '50px'}}>
							<Sidebar className="d-none d-sm-block" userType="assistant" />
							<div style={{width: '87%', height: 'auto', padding: '0 30px'}}>
								<Switch>
									<Route path="/ta-courses" render={(props) => <TACourses {...props} key={this.state.courses.length} courses={this.state.courses} ta={this.state.ta} />} />
									<Route path="/ta-stats" component={Stats} />
	        					</Switch>
							</div>
						</div>
					</div>
				</Container>
			</Router>	
		);
	}
}

export default TA;
