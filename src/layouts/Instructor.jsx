import React from "react";
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import MainHeader from '../components/MainHeader.jsx';
import Sidebar from '../components/Sidebar.jsx';
import Courses from '../components/Courses.jsx';
import TAs from '../components/TAs.jsx';
import Stats from '../components/Stats.jsx';
import { Container } from 'react-bootstrap';

export default class Instructor extends React.Component {
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
		let dupsIds = [];
        let taArray = [];
        let activeCourses = 0, activeTas = 0;
		const url = "https://protected-shelf-85013.herokuapp.com/user/";

		const options = {
			method : "GET",
			headers: { 
				"Content-Type": "application/json; charset=UTF-8",
				// "Authorization": localStorage.getItem("token")
				"Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyaWNrZCIsImV4cCI6MTU2NDk2NzUwMn0.T_DnDFqQJ0uwmlaAZkrfUhWUi3PDY5O0t9oYEfLbg5gaySg_XSqGTQ0cqKI8ju7kX8Hl122DLDl7DPukTYwUHA"
			}
		}

		// Get current logged in user's id
		fetch(url, options)
			.then(response => response.json())
			.then(data => {
				this.setState({userId: data.userId})

                const courseUrl = 'https://protected-shelf-85013.herokuapp.com/course/admin/user/' + data.userId + '/';
                
                // Get courses for current teacher
                fetch(courseUrl)
                	.then(res => res.json())
                	.then(courses => {

						let courses_with_list;
                		this.setState({courseList: courses})

                		// For each course in the list of courses, get its list of TAs
                		for (let i = 0; i < courses.length; i++) {
                			// Count if current course is active
                			if (courses[i].active) 
                				activeCourses++;
					
                			const taUrl = 'https://protected-shelf-85013.herokuapp.com/user/teacher/course/' + courses[i].courseId + '/';
                			
                			// Get list of TAs for current course
                			fetch(taUrl, options)
                				.then(res => res.json())
                				.then(tas => {
        						tas.forEach((item) => {
        							// Do not count duplicate TAs
        							// if (dupsIds.indexOf(item.userId) === -1) {
        							// 	dupsIds.push(item.userId);
									let flag = false;
									for(let k = 0; k < taArray.length; k++)
									{
										let id = item.userId;
										if(taArray[k].taId === id)
										{
											flag = true;	
											taArray[k].course = 'Multiple' 
										}
									}
									
    								if (item.active)
    									activeTas++;
				
    								let taInfo = {
										"active": item.active,
									    "email": item.email,
									    "firstName": item.firstName,
									    "kioskPin": item.kioskPin,
									    "lastName": item.lastName,
									    "password": item.password,
									    "role": item.role,
									    "taId": item.userId,
									    "username": item.username,
									    "course": courses[i].courseName,
									    "courseId": courses[i].courseId,
										
									    "userId": this.state.userId
									}

    								if(!flag){taArray.push(taInfo)}
            							// }
            						});
            						taArray.sort((a, b) => (a.lastName > b.lastName) ? 1 : -1)
   									this.setState({
   										taList: taArray, 
   										userInfo: {
   											firstName: data.firstName, 
											lastName: data.lastName,
   											numberTas: taArray.length,
   											numberCourses: courses.length,
   											activeTas: this.state.taList.length,
   											activeCourses: activeCourses
   										}
									})
            				})
                		}
                	})
			})
			.catch(e => console.log(e)) 
  	}

	render() {
		return (
			<Router>
				<MainHeader key={this.state.taList.length} userInfo={this.state.userInfo} />
				<Container fluid style={{height: '90vh'}}>
					<div style={{height: 'calc(100vh - 290px)', margin: '0'}}>
						<div style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'no-wrap', height: '100%', margin: '0 auto', width: '90vw', paddingTop: '50px'}}>
							<Sidebar userType="teacher" />
							<div style={{width: '87%', height: 'auto', padding: '0 30px'}}>
								<Switch>
									<Route path="/courses" render={(props) => <Courses {...props} key={this.state.courseList} courses={this.state.courseList} handleDelete={this.handleDelete}/>} />
	        						<Route path="/tas" render={(props) => <TAs {...props} key={this.state.taList.length} tas={this.state.taList} courses={this.state.courseList}/>} />
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
