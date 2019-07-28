import React from "react";
import { Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faUserMinus, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import AddTA from './AddTA.jsx';

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
			       	<td className="d-none d-sm-block">{teacher.firstName}</td>
			       	<td >{teacher.lastName}</td>
			       	<td className="d-none d-sm-block">{teacher.email}</td>
			       	<td style={{whiteSpace: 'nowrap'}}>
			       		<FontAwesomeIcon icon={faUserEdit} style={{marginRigth: '100px'}}/>&nbsp;&nbsp;&nbsp;
			       		<FontAwesomeIcon icon={faUserMinus}/>
			       	</td>
		      	</tr>
			)
		});

		return (
			<>
				<div className="sub-title"><span id="top-line"/>Instructors</div>
				<div style={{overflowX: 'auto', maxWidth: '100%'}}>
					<Table borderless striped hover responisve="true">
						<thead style={{backgroundColor: 'rgba(0, 0, 0, 0.3)'}}>
					     	<tr>
						       	<th className="d-none d-sm-block">First Name</th>
						       	<th>Last Name</th>
						       	<th className="d-none d-sm-block">Email</th>
						       	<th>Options</th>
					     	</tr>
						</thead>
					   	<tbody>
					     	{teachersTable}
					   	</tbody>
					</Table>
					<Button onClick={this.showModal} className="add-ta"> 
						Add Teacher <FontAwesomeIcon style={{margin: '0 10px'}} icon={faPlus} />
					</Button>
				</div>

				{/*<AddTA show={this.state.show} handleClose={this.hideModal} />*/}
			</>
		)
	}
}

export default Instructors;