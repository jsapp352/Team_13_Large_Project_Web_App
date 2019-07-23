import React from "react";
import { Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import AddTA from './AddTA.jsx';

class TAs extends React.Component {
	state = { show: false, showForgot: false };

  	showModal = () => {
    	this.setState({ show: true });
  	};

  	hideModal = () => {
    	this.setState({ show: false });
  	};

	render() {
		return (
			<>
				<div className="sub-title"><span id="top-line"/>Teaching Assistants</div>
				<Table borderless striped hover responisve="true" className="header-fixed">
					<thead style={{backgroundColor: 'rgba(0, 0, 0, 0.3)'}}>
				     	<tr>
					       	<th>First Name</th>
					       	<th>Last Name</th>
					       	<th>Course</th>
				     	</tr>
					</thead>
				   <tbody>
				     	<tr>
					       	<td>Ivan</td>
					       	<td>Chaffardett</td>
					       	<td>Computer Science II</td>
				      </tr>
				      <tr>
					       	<td>Andy</td>
					       	<td>Tschida</td>
					       	<td>Computer Science II</td>
				      </tr>
				      <tr>
					       	<td>Michael</td>
					       	<td>Mignon</td>
					       	<td>Computer Science II</td>
				      </tr>
				      <tr>
					       	<td>Justin</td>
					       	<td>Sapp</td>
					       	<td>Computer Science I</td>
				      </tr>
				      <tr>
					       	<td>Shady</td>
					       	<td>Saleh</td>
					       	<td>Computer Science I</td>
				      </tr>
				      <tr>
					       	<td>Tony</td>
					       	<td>Giamenta</td>
					       	<td>Computer Science I</td>
				      </tr>
				   </tbody>
				</Table>
				<Button onClick={this.showModal} className="add-ta"> 
					Add TA <FontAwesomeIcon style={{margin: '0 10px'}} icon={faPlus} />
				</Button>

				<AddTA show={this.state.show} handleClose={this.hideModal} />
			</>
		)
	}
}

export default TAs;