import React from "react";
import { Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import AddTeacher from './AddTeacher.js';

class Instructors extends React.Component {
	state = { show: false, showForgot: false };

  	showModal = () => {
    	this.setState({ show: true });
  	};

  	hideModal = () => {
    	this.setState({ show: false });
  	};

	render() {
		const teachers = [
			{'firstName': 'Sean', 'lastName': 'Szumlanski', 'email': 'sean@ucf.edu', 'id': 1},
			{'firstName': 'Rick', 'lastName': 'Leinecker', 'email': 'rick@ucf.edu', 'id': 2},
			{'firstName': 'Sarah', 'lastName': 'Angell', 'email': 'sarah@ucf.edu', 'id': 3},
			{'firstName': 'Arup', 'lastName': 'Guha', 'email': 'arup@ucf.edu', 'id': 4},
			{'firstName': 'Shahram', 'lastName': 'Jahani', 'email': 'extracredit@ucf.edu', 'id': 5},
		];

		const teachersTable = teachers.map(teacher => {
			return (
				<tr key={teacher.id}>
			       	<td>{teacher.firstName}</td>
			       	<td>{teacher.lastName}</td>
			       	<td className="d-none d-sm-block">{teacher.email}</td>
		      	</tr>
			)
		});

		return (
			<>
				<div className="sub-title"><span id="top-line"/>Instructors</div>
				<Table borderless striped hover responisve="true" className="header-fixed">
					<thead style={{backgroundColor: 'rgba(0, 0, 0, 0.3)'}}>
				     	<tr>
					       	<th>First Name</th>
					       	<th>Last Name</th>
					       	<th className="d-none d-sm-block">Email</th>
				     	</tr>
					</thead>
				   	<tbody>
				     	{teachersTable}
				   	</tbody>
				</Table>
				<Button onClick={this.showModal} className="add-ta"> 
					Add Teacher <FontAwesomeIcon style={{margin: '0 10px'}} icon={faPlus} />
				</Button>

				<AddTeacher show={this.state.show} handleClose={this.hideModal} />
			</>
		)
	}
}

export default Instructors;
