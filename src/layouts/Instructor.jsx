import React from "react";
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import MainHeader from '../components/MainHeader.jsx';
import Sidebar from '../components/Sidebar.jsx';
import Courses from '../components/Courses.jsx';
import TAs from '../components/TAs.jsx';
import Stats from '../components/Stats.jsx';
import { Container } from 'react-bootstrap';

class Instructor extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			userId: '',
			userInfo: {firstName: '', lastName: '', numberTas: 0, numberCourses: 0},
			courseList: '',
			taList: ''
		}
	}

	componentWillMount() {
        let taArray = [];
		const url = 'https://protected-shelf-85013.herokuapp.com/user/'

		const options = {
			method : 'GET',
			headers: { 
				"Content-Type": "application/json; charset=UTF-8",
				// "Authorization": localStorage.getItem("token")
				"Authorization": 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwcm9mZXNzb3IiLCJleHAiOjE1NjQ5NTAyNjV9.BhiaI01En_vgIj8vx8M8f2Pm4dgyZPFEmLQ-00_a2i6Ii7rGb5j8Gh8oDlqJx4J1t0zyLG8L8yH4kjHaHyQPMQ'
			}
		}

		fetch(url, options)
			.then(response => response.json())
			.then(data => {
				console.log("User ID: " + JSON.stringify(data))
				this.setState({userId: data.userId})

                const courseUrl = 'https://protected-shelf-85013.herokuapp.com/course/admin/user/' + data.userId + '/';
                fetch(courseUrl)
                	.then(res => res.json())
                	.then(courses => {
                		console.log("Courses of this teacher!!: " + JSON.stringify(courses));
                		this.setState({courseList: courses})

                		for (let i = 0; i < courses.length; i++) {
                			const taUrl = 'https://protected-shelf-85013.herokuapp.com/user/teacher/course/' + courses[i].courseId + '/';
                			fetch(taUrl, options)
                				.then(res => res.json())
                				.then(tas => {
                					console.log('The TAs for ' + courses[i].courseName + ' are:' + JSON.stringify(tas))
                					if (tas.length != 0) {
                						taArray.push(tas);
       									this.setState({
       										taList: taArray, 
       										userInfo: {
       											firstName: data.firstName, 
												lastName: data.lastName,
       											numberTas: taArray.length,
       											numberCourses: courses.length
       										}
       									})
                					}
                				})
                		}

                	})
			})
  	}

	render() {
		console.log('INSTRUCTOR NOW WW' + JSON.stringify(this.state.taList))
		return (
			<Router>
				<MainHeader key={this.state.userInfo} userInfo={this.state.userInfo} />
				<Container fluid style={{height: '90vh'}}>
					<div style={{height: 'calc(100vh - 290px)', margin: '0'}}>
						<div style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'no-wrap', height: '100%', margin: '0 auto', width: '90vw', paddingTop: '50px'}}>
							<Sidebar userType="teacher" />
							<div style={{width: '87%', height: 'auto', padding: '0 30px'}}>
								<Switch>
									<Route path="/courses" render={(props) => <Courses {...props} key={this.state.courseList} courses={this.state.courseList} />} />
	        						<Route path="/tas" render={(props) => <TAs {...props} key={this.state.length} courses={this.state.taList} />} />
	        						<Route path="/stats" component={Stats} />
	        					</Switch>
							</div>
						</div>
					</div>
				</Container>
			</Router>	
		);
	}
}

export default Instructor;
