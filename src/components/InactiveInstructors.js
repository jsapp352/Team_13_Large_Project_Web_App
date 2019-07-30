
import React from "react";
import { Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faUserMinus, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import AddTA from './AddTA.jsx';

export default class InactiveInstructors extends React.Component {
	constructor()
	{
		super();
		this.state = {
			loading:true,
			inactiveTeachers: [],
		}
	}

	componentWillMount()
	{		
		let url ='https://protected-shelf-85013.herokuapp.com/user/admin/'
		
		let token = localStorage.getItem('token')
		
		let options = {
			method:'GET',
			headers: { 
				"Content-Type": "application/json; charset=UTF-8",
				"Authorization": token
			}
		}

		fetch(url, options).then(response=>response.json()).then(data=>{
			let inactive = [];
			for(let i = 0; i < data.length; i++)
			{
				if(!data[i].active)
				{
					inactive.push(data[i]);
				}
			}	
			inactive.sort((a, b) => (a.lastName > b.lastName) ? 1 : -1)	
				
			this.setState({inactiveTeachers:inactive, loading:false});
			
			// localStorage.setItem('teacherList', JSON.stringify(data));
		}).catch(err=>{console.log(err)})

	}
	render() {
		const teachersTable = this.state.inactiveTeachers.map(teacher => {
			return (
				<tr key={teacher.id}>
			       	<td className="d-none d-sm-block">{teacher.firstName}</td>
			       	<td >{teacher.lastName}</td>
			       	<td className="d-none d-sm-block">{teacher.email}</td>
		      	</tr>
			)
		});
		return (
			<div>
				<div className="sub-title"><span id="top-line"/>Inactive Instructors</div>
				<div style={{overflowX: 'auto', maxWidth: '100%'}}>
					<div className="scrollableWrapper">
						<Table borderless striped hover responisve="true">
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
					</div>
				</div>
			</div>
		)
	}
}
