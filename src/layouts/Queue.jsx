import React from 'react'
import { Link } from 'react-router-dom';
import { Table, Container, Accordion, Card } from 'react-bootstrap';
import Sidebar from '../components/Sidebar.jsx';
import caveIcon from '../img/cave.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';

class Queue extends React.Component {
	constructor() {
		super();
		this.state = {
			sessions: [],
			inProgress: [],
			courses: [],
			selected: 0
		}
	}

	componentWillMount() {
		let courses = [];
		let sessionsList = [];
		let inProgressList = [];

		let url = 'https://protected-shelf-85013.herokuapp.com/course/'
		fetch(url)
			.then(response => response.json())
			.then(data => {
				// console.log("ALL courses: " + JSON.stringify(data))
				for (let i = 0; i < data.length; i++) {
					if (data[i].active) {
						courses.push(data[i]);
						this.setState({courses: courses})

						let waitingSession = {};
						fetch('https://protected-shelf-85013.herokuapp.com/session/waiting/' + data[i].courseId + '/')
							.then(resp => resp.json())
							.then(list => {
								waitingSession.courseName = data[i].courseName;
								waitingSession.courseId = data[i].courseId;
								waitingSession.waitlist = list.reverse();

								sessionsList.push(waitingSession);
								
								this.setState({sessions: sessionsList});
							})
							.catch(e => console.log("Error: " + e))

						let inProgressSession = {};
						fetch('https://protected-shelf-85013.herokuapp.com/session/inProgress/' + data[i].courseId + '/')
							.then(resp => resp.json())
							.then(list => {
								inProgressSession.courseName = data[i].courseName;
								inProgressSession.courseId = data[i].courseId;
								inProgressSession.list = list.reverse();
								console.log()
								inProgressList.push(inProgressSession);
								
								this.setState({inProgress: inProgressList});
				// window.location.reload();
							})
							.catch(e => console.log("Error: " + e))
					}
				}
			});
	}

	handleChange = event => {
		console.log("Selected: " + event.target.value)
    	this.setState({selected: event.target.value});
  	}

  	formatTime(hours, minutes) {
  		console.log("Hours: " + hours)
  		console.log("Minutes: " + minutes)
		let ext = (hours < 12) ? 'AM' : 'PM'

		if (hours > 12) 
			hours = hours % 12;

		if (hours === 0)
			hours = 12;

		let h = hours.toString();
		let m = minutes.toString();

		if (h.length === 1)
			h = '0' + h;

		if (m.length === 1)
			m = '0' + m;

		let time = h + ':' + m + ' ' + ext;

		return time;
	}

	reload(event) {
		event.preventDefault();
		window.location.reload();
	}

	render() {
		let courseList = this.state.courses;
		let options = [];
		let waiting = [], progress = [];

		if (courseList !== undefined) {
			options = courseList.map(item => {
				return (<option key={item.courseId} value={item.courseId}>{item.courseName}</option>)
			})
		}

		options.unshift(<option key={0} value={0}> </option>)

		if (this.state.sessions.length > 0) {
			let objIndex = -1;

			for (let i = 0; i < this.state.sessions.length; i++) {
				if (this.state.sessions[i].courseId.toString() === this.state.selected) {
					objIndex = i;
					break;
				}
			}

			if (objIndex !== -1) {
				let reversedArr = this.state.sessions[objIndex].waitlist.slice(0).reverse();
				if (reversedArr.length > 0) {
					waiting = reversedArr.map((person, index) => {
						let time = new Date(person.startTime); // This is setting hour 4 hours less???
						return (
							<tr key={person.sessionId}>
								<td>{index + 1}</td>
								<td>{person.studentName}</td>
								<td>{this.formatTime(time.getHours(), time.getMinutes())}</td>
							</tr>
						);
					});
				}
				else {
					waiting.push(<tr key={0}><td>Waitlist empty.</td></tr>)
				}

			}
		}

		if (this.state.inProgress.length > 0) {
			let objIndex = -1;

			for (let i = 0; i < this.state.inProgress.length; i++) {
				if (this.state.inProgress[i].courseId.toString() === this.state.selected) {
					objIndex = i;
					break;
				}
			}

			if (objIndex !== -1) {
				let reversedArr = this.state.inProgress[objIndex].list.slice(0).reverse();
				if (reversedArr.length > 0) {
					progress = reversedArr.map((person, index) => {
						let time = new Date(person.helpTime);
						return (
							<tr key={person.sessionId}>
								<td>{index + 1}</td>
								<td>{person.studentName}</td>
								<td>{this.formatTime(time.getHours(), time.getMinutes())}</td>
							</tr>
						);
					});
				}
				else {
					progress.push(<tr key={0}><td>Waitlist empty.</td></tr>)
				}

			}
		}
    
		const loggedIn = (localStorage.getItem("isAuth") === 'true');
		const path = loggedIn ? ('/' + localStorage.getItem("userType")) : '/';

		return (
			<div>
				<Container fluid className="header">
					<div className="topBarQueue">
						<div onClick={this.reload} className="title">THE CAVE</div>
					</div>
				</Container>
				<div className="sidebar-long float-left">
					<img alt="Cave Icon" src={ caveIcon } style={{cursor: 'pointer'}} onClick={this.reload}/>
					<div className="line"></div>
					<Link to={path}><FontAwesomeIcon icon={faSignInAlt} /></Link>
				</div>
				<Container fluid style={{height: '90vh'}}>
					<div style={{height: 'calc(100vh - 290px)', margin: '0'}}>
						<div className="queueWrap">
							<Sidebar userType="any" />
							<div className="table-wrap">
								<div className="sub-title"><span id="top-line"/>Current Queue</div>
								<div className="custom">
									Select a course:<br/>
									<select value={this.state.value} onChange={this.handleChange}>
										{options}
									</select>
								</div>
								<Accordion className="accordion" defaultActiveKey="0">
									<Card>
										<Accordion.Toggle as={Card.Header} eventKey="0">
											Waiting Sessions
										</Accordion.Toggle>
										<Accordion.Collapse eventKey="0">
											<div className="scrollableWrapper">
												<Table borderless hover responisve="true" style={{cursor: 'default', width: '100%'}}>
													<thead style={{backgroundColor: 'rgba(0, 0, 0, 0.1)'}}>
														<tr>
															<th>#</th>
															<th>Student</th>
															<th>Waiting since</th>
														</tr>
													</thead>
												  	<tbody style={{width: '100%'}}>
														{waiting}
												   	</tbody>
												</Table>
											</div>
										</Accordion.Collapse>
									</Card>
									<Card>
										<Accordion.Toggle as={Card.Header} eventKey="1">
											In Progress Sessions
										</Accordion.Toggle>
										<Accordion.Collapse eventKey="1">
											<div className="scrollableWrapper">
												<Table borderless hover responisve="true" style={{cursor: 'default', width: '100%'}}>
													<thead style={{backgroundColor: 'rgba(0, 0, 0, 0.1)'}}>
														<tr>
															<th>#</th>
															<th>Student</th>
															<th>Help time</th>
														</tr>
													</thead>
												  	<tbody style={{width: '100%'}}>
														{progress}
												   	</tbody>
												</Table>
											</div>
										</Accordion.Collapse>
										</Card>
								</Accordion>
							</div>
						</div>
					</div>
				</Container>
			</div>
		)
	}
}

export default Queue;
