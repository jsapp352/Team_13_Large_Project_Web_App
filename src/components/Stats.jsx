import React from "react";
import { Table } from 'react-bootstrap';

class Stats extends React.Component {
	render() {
		return (
			<>
				<div className="sub-title"><span id="top-line"/>Statistics</div>
				<div>
					<Table borderless hover responisve="true">
						<thead style={{letterSpacing: '0.3em', backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
							<tr>
								<th colSpan="4"><b>IVAN CHAFFARDETT</b></th>
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
					     	<tr>
					       	<td>Ivan</td>
					       	<td>11:40 AM</td>
					       	<td>12:04 AM</td>
					       	<td>24 minutes</td>
					      </tr>
					      <tr>
					       	<td>Andy</td>
					       	<td>02:31 PM</td>
					       	<td>02:39 PM</td>
					       	<td>8 minutes</td>
					      </tr>
					      <tr>
					       	<td>Michael</td>
					       	<td>05:45 PM</td>
					       	<td>06:18 PM</td>
					       	<td>33 minutes</td>
					      </tr>
					      <tr>
					       	<td>Justin</td>
					       	<td>03:41 PM</td>
					       	<td>03:55 PM</td>
					       	<td>14 minutes</td>
					      </tr>
					   </tbody>
					</Table>
				</div>
			</>
		)
	}
}

export default Stats;