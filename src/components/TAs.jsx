import React from "react";
import { Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

class TAs extends React.Component {
	render() {
		return (
			<>
				<div className="sub-title"><span id="top-line"/>Teaching Assistants</div>
				<FontAwesomeIcon style={{float: 'right'}} icon={faUserPlus} />
				<Table borderless striped hover responsive="true">
					<thead style={{backgroundColor: 'rgba(0, 0, 0, 0.3)'}}>
				     	<tr>
					       	<th>First Name</th>
					       	<th>Last Name</th>
				     	</tr>
					</thead>
				   <tbody>
				     	<tr>
					       	<td>Ivan</td>
					       	<td>Chaffardett</td>
				      </tr>
				      <tr>
					       	<td>Andy</td>
					       	<td>Tschida</td>
				      </tr>
				      <tr>
					       	<td>Michael</td>
					       	<td>Mignon</td>
				      </tr>
				      <tr>
					       	<td>Justin</td>
					       	<td>Sapp</td>
				      </tr>
				   </tbody>
				</Table>
			</>
		)
	}
}

export default TAs;