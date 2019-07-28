import React from "react";
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faUserEdit, faUserMinus, faChartArea } from '@fortawesome/free-solid-svg-icons';
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

  	removeTa(id) {
  		let newTaList = [];
        let url = 'https://protected-shelf-85013.herokuapp.com/user/teacher/'+ id +'/';

        let options = {
            method:'DELETE',
            headers: { 
            	"Content-Type": "application/json; charset=UTF-8",
                "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyaWNrZCIsImV4cCI6MTU2NTIwMjU5Mn0.MNEgrdSYmZFdkMZIsP1elAQlto7T_qoA6vjTtQIw3_hlChQwI6bLEC9dzHuA-wa9QqHoHCiBKtyrLc-bX8eteA"
            }
        }

        fetch(url, options)
        	.then(response => response.json())
        	.then(data => {
            	newTaList = this.state.tas.filter((value, index, arr) => {
            		return (value.userId !== data.userId)
            	})
            	this.setState({tas: newTaList});
            	window.location.reload();
        	})
        	.catch(e => console.log("Error: " + e))
    }

	render() {
		let taTable = [];

		if (this.state.tas !== undefined && this.state.tas.length > 0) {
			taTable = this.state.tas.map(ta => {
				if (ta.active) {
					return (
						<tr key={ta.taId}>
					       	<td className="d-table-cell">
					       		<Link to={{pathname: '/stats', state: {taInfo: ta}}}>{ta.firstName}</Link>
					       	</td>
					       	<td className="d-none d-sm-table-cell">
					       		<Link to={{pathname: '/stats', state: {taInfo: ta}}}>{ta.lastName}</Link>
					       	</td>
					       	<td className="d-none d-sm-table-cell">
					       		<Link to={{pathname: '/stats', state: {taInfo: ta}}}>{ta.course}</Link>
					       	</td>
					       	<td className="d-table-cell" style={{whiteSpace: 'nowrap'}}>
					       		<FontAwesomeIcon icon={faUserEdit} style={{cursor: 'pointer'}}/>&nbsp;&nbsp;&nbsp;
					       		<FontAwesomeIcon style={{cursor: 'pointer'}} onClick={() => this.removeTa(ta.taId)} icon={faUserMinus}/>
					       		&nbsp;&nbsp;&nbsp;
					       		<Link to={{pathname: '/stats', state: {taInfo: ta}}}>
					       			<b><FontAwesomeIcon icon={faChartArea}/></b>
					       		</Link>
					       	</td>
				      	</tr>
					)
				}
			});
		}

		return (
			<>
				<div className="sub-title"><span id="top-line"/>Teaching Assistants</div>
				<div className="scrollableWrapper">
					<Table borderless striped hover responisve="true">
						<thead style={{backgroundColor: 'rgba(0, 0, 0, 0.3)'}}>
					     	<tr>
						       	<th className="d-inline-table-cell">First Name</th>
						       	<th className="d-none d-sm-table-cell">Last Name</th>
						       	<th className="d-none d-sm-table-cell">Course</th>
						       	<th className="d-table-cell">Options</th>
					     	</tr>
						</thead>
					   <tbody>
					     	{taTable}
					   </tbody>
					</Table>
				</div>
				<Button onClick={this.showModal} className="add-ta"> 
					Add TA <FontAwesomeIcon style={{margin: '0 10px'}} icon={faPlus} />
				</Button>

				<AddTA show={this.state.show} handleClose={this.hideModal} courses={this.state.courses}/>
			</>
		)
	}
}

export default TAs;