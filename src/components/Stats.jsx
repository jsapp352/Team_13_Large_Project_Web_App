import React from "react";
import { Table } from 'react-bootstrap';

class Stats extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			ta: this.props.location.state,
			sessions: '',
			avgTime: '',
		}
	}

	componentDidMount() {
		console.log("State? " + JSON.stringify(this.state.ta))

		const url = "https://protected-shelf-85013.herokuapp.com/session/ta/taSessions/";
		let info;
		
		if (this.state.ta !== undefined) {
			info = {
				courseId: this.state.ta.taInfo.courseId,
				taId: this.state.ta.taInfo.taId,
				userId: this.state.ta.taInfo.userId
			}

			console.log('Body: ' + JSON.stringify(info))
		}

		const options = {
			method : "POST",
			headers: { 
				"Content-Type": "application/json; charset=UTF-8",
			},
			body: JSON.stringify(info)
		}

		fetch(url, options)
			.then(response => response.json())
			.then(data => {
				console.log(data);
				this.setState({
					sessions: data.sessions,
					avgTime: data.averageSessionDuration
				})
			})
			.catch(e => console.log(e))
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

	millisToMinutes(millis) {
	  	let minutes = Math.floor(millis / 60000);

	  	return minutes + ' min';
	}

	secsToMinutes(secs) {
		let minutes = Math.floor(secs / 60);
		return minutes + ' minute' + ((minutes === 1) ? '.' : 's.')
	}

	render() {
		let statsTable = [];

		if (this.state.sessions !== undefined && this.state.sessions.length > 0) {
			statsTable = this.state.sessions.map(session => {
				let timeIn = new Date(session.helpTime)
				let timeOut = new Date(session.endTime)

				return (
					<tr key={session.sessionId}>
				       	<td>{session.studentName}</td>
				       	<td>{(timeIn.getMonth() + 1) + '-' + timeIn.getDate() + '-' + timeIn.getFullYear()}</td>
		       			<td>{this.formatTime(timeIn.getHours(), timeIn.getMinutes())}</td>
		       			<td>{this.formatTime(timeOut.getHours(), timeOut.getMinutes())}</td>
		       			<td>{this.millisToMinutes(timeOut.getTime()-timeIn.getTime())}</td>
			      	</tr>
				)
			});
		}

		if (this.state.ta === undefined) {
			return (<div>No TA selected.</div>)
		}

		return (
			<>
				<div className="sub-title"><span id="top-line"/>Statistics</div>
				<div>
					<div className="scrollableWrapper">
						<Table borderless hover responisve="true">
							<thead style={{letterSpacing: '0.3em', backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
								<tr>
									<th colSpan="5"><b>{this.state.ta.taInfo.firstName} {this.state.ta.taInfo.lastName}</b></th>
								</tr>
							</thead>
							<thead style={{letterSpacing: '0.1em', backgroundColor: 'rgba(0, 0, 0, 0.1)'}}>
						     	<tr>
							       	<th>Student</th>
							       	<th>Date</th>
							       	<th>Time In</th>
							       	<th>Time Out</th>
							       	<th>Total Time</th>
						     	</tr>
							</thead>
						   <tbody>
						     	{statsTable}
						   </tbody>
						</Table>
					</div>
					<div>
						<span>Average session duration: {this.secsToMinutes(this.state.avgTime)}</span>
					</div>
				</div>
			</>
		)
	}
}

export default Stats;