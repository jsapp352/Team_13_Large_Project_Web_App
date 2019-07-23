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
		const tas = [
			{'firstName': 'Ivan', 'lastName': 'Chaffardett', 'course': 'Computer Science II'},
			{'firstName': 'Andy', 'lastName': 'Tschida', 'course': 'Computer Science II'},
			{'firstName': 'Michael', 'lastName': 'Mignon', 'course': 'Computer Science II'},
			{'firstName': 'Justin', 'lastName': 'Sapp', 'course': 'Computer Science I'},
			{'firstName': 'Shady', 'lastName': 'Saleh', 'course': 'Computer Science I'},
			{'firstName': 'Tony', 'lastName': 'Giamenta', 'course': 'Computer Science I'},
			{'firstName': 'Tony', 'lastName': 'Giamenta', 'course': 'Security in Computing'}
		];

		const taTable = tas.map(ta => {
			return (
				<tr>
			       	<td>{ta.firstName}</td>
			       	<td>{ta.lastName}</td>
			       	<td className="d-none d-sm-block">{ta.course}</td>
		      	</tr>
			)
		});

		return (
			<>
				<div className="sub-title"><span id="top-line"/>Teaching Assistants</div>
				<Table borderless striped hover responisve="true" className="header-fixed">
					<thead style={{backgroundColor: 'rgba(0, 0, 0, 0.3)'}}>
				     	<tr>
					       	<th>First Name</th>
					       	<th>Last Name</th>
					       	<th className="d-none d-sm-block">Course</th>
				     	</tr>
					</thead>
				   <tbody>
				     	{taTable}
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