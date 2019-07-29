import React from 'react'
import { Link } from 'react-router-dom';
import { Table, Container } from 'react-bootstrap';
import Sidebar from '../components/Sidebar.jsx';
import caveIcon from '../img/cave.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';

class Queue extends React.Component {
	constructor() {
		super();
		this.state = {
			sessions: [],
			courses: [],
			selected: 0
		}
	}

	componentWillMount() {
		let courses = [];
		let sessionsList = [];

		let url = 'https://protected-shelf-85013.herokuapp.com/course/'
		fetch(url)
			.then(response => response.json())
			.then(data => {
				// console.log("ALL courses: " + JSON.stringify(data))
				for (let i = 0; i < data.length; i++) {
					if (data[i].active) {
						courses.push(data[i]);
						this.setState({courses: courses})

						let currentSession = {};
						fetch('https://protected-shelf-85013.herokuapp.com/session/waiting/' + data[i].courseId + '/')
							.then(resp => resp.json())
							.then(list => {
								currentSession.courseName = data[i].courseName;
								currentSession.courseId = data[i].courseId;
								currentSession.waitlist = list;

								sessionsList.push(currentSession);
								
								this.setState({sessions: sessionsList});
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
		let ext = (hours < 12) ? 'AM' : 'PM'

		if (hours > 12) 
			hours = hours % 12;

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
		let waiting = [], indices = []

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
					// console.log("Found index: " + i);
					objIndex = i;
					break;
				}
			}

			if (objIndex !== -1) {
				let reversedArr = this.state.sessions[objIndex].waitlist.slice(0).reverse();
				if (reversedArr.length > 0) {
					waiting = reversedArr.map((person, index) => {
						let time = new Date(person.startTime);
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
					waiting.push(<tr key={0} style={{position: 'absolute'}}><td>Waitlist empty.</td></tr>)
				}

			}
		}

		return (
			<div>
				<Container fluid className="header">
					<div className="topBar" style={{backgroundColor: '#E0B400'}}>
						<div className="title">THE CAVE</div>
					</div>
				</Container>
				<div className="sidebar-long float-left">
					<img src={ caveIcon } style={{cursor: 'pointer'}} onClick={this.reload}/>
					<div className="line"></div>
					<Link to="/"><FontAwesomeIcon icon={faSignInAlt} /></Link>
				</div>
				<Container fluid style={{height: '90vh'}}>
					<div style={{height: 'calc(100vh - 290px)', margin: '0'}}>
						<div className="queueWrap">
							<Sidebar userType="any" />
							<div style={{float: 'left', width: '87%', height: 'auto', padding: '0 30px'}}>
								<div className="sub-title"><span id="top-line"/>Queue</div>
								<div className="custom">
									Select a course:<br/>
									<select value={this.state.value} onChange={this.handleChange}>
										{options}
									</select>
								</div>
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
						</div>
					</div>
				</Container>
			</div>
		)
	}
}

export default Queue;