import React from "react";
import { Table } from 'react-bootstrap';

class Stats extends React.Component {
	render() {
		const stats = [
			{'studentName': 'Ivan', 'timeIn': '11:40 AM', 'timeOut': '12:04 AM', 'totalTime': '24 minutes', 'id': 1},
			{'studentName': 'Andy', 'timeIn': '2:31 PM', 'timeOut': '2:39 PM', 'totalTime': '8 minutes', 'id': 2},
			{'studentName': 'Michael', 'timeIn': '5:45 PM', 'timeOut': '6:18 PM', 'totalTime': '33 minutes', 'id': 3},
			{'studentName': 'Justin', 'timeIn': '3:41 PM', 'timeOut': '3:55 PM', 'totalTime': '14 minutes', 'id': 4},
			{'studentName': 'Tony', 'timeIn': '11:40 AM', 'timeOut': '12:04 AM', 'totalTime': '24 minutes', 'id': 5},
			{'studentName': 'Elizabeth', 'timeIn': '11:40 AM', 'timeOut': '12:04 AM', 'totalTime': '24 minutes', 'id': 6},
		];

		const statsTable = stats.map(stat => {
			return (
				<tr key={stat.id}>
		       		<td>{stat.studentName}</td>
		       		<td>{stat.timeIn}</td>
		       		<td>{stat.timeOut}</td>
		       		<td>{stat.totalTime}</td>
		      	</tr>
			)
		});

		return (
			<>
				<div className="sub-title"><span id="top-line"/>Statistics</div>
				<div>
					<Table borderless hover responisve="true" className="header-fixed stat-table">
						<thead style={{letterSpacing: '0.3em', backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
							<tr style={{width: '100%'}}>
								<th style={{width: '100%'}}><b>IVAN CHAFFARDETT</b></th>
							</tr>
						</thead>
						<thead style={{letterSpacing: '0.1em', backgroundColor: 'rgba(0, 0, 0, 0.1)'}}>
					     	<tr>
						       	<th>Student</th>
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
			</>
		)
	}
}

export default Stats;