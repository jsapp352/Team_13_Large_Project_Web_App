import React from "react";
import { Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import AddTA from './AddTA.jsx';

class TAs extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			tas: '',
			courses: '',
			show: false
		}
	}

  	showModal = () => {
    	this.setState({show: true});
  	}

  	hideModal = () => {
    	this.setState({show: false});
  	}

  	componentDidMount() {
		this.setState({tas: this.props.tas});
		this.setState({courses: this.props.courses});
  	}

	render() {
		let taTable = [];

		if (this.state.tas !== undefined && this.state.tas.length > 0) {
			taTable = this.state.tas.map(ta => {
				return (
					<tr key={ta.userId}>
				       	<td>{ta.firstName}</td>
				       	<td>{ta.lastName}</td>
				       	<td className="d-none d-sm-block">{ta.course}</td>
			      	</tr>
				)
			});
		}

		// console.log('ALL TAS: ' + JSON.stringify(this.state.tas))

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

				<AddTA show={this.state.show} handleClose={this.hideModal} courses={this.state.courses}/>
			</>
		)
	}
}

export default TAs;