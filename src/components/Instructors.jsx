import React from "react";
import { Table, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import Admin from '../layouts/Admin'
import { ClipLoader } from 'react-spinners';
import { css } from '@emotion/core';

class Instructors extends React.Component {
	constructor()
	{
		super();
		this.state = {
			logout: false,
			showAddModal: false,
			teacherList: null,
			show: false,
			showForgot: false,
			teacherList: [],

			email: '',
			firstName: '',
			lastName: '',
			password: '',
			username: '',
			loading: false,
			deleting:false,
			selectedProfessorUserId: -1,
		}

		this.addTeacher = this.addTeacher.bind(this);
	}

  	

	componentWillMount()
	{		
		let url ='https://protected-shelf-85013.herokuapp.com/user/admin/'
		let options = {
			method:'GET',
			headers: { 
				"Content-Type": "application/json; charset=UTF-8",
				"Authorization":'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTU2NDk1NzM5NH0.snNKzwTvMIZEU6VwOyhFHI9yvDqknJG9xgXTShG_SlR3P4FyHZhTmXUFKnRx1dC4hn9d6Wepd7t1Isq28WV5Yg'
			},
		}

		fetch(url, options).then(response=>response.json()).then(data=>{
			this.setState({teacherList:data, loading:false});
			
			// localStorage.setItem('teacherList', JSON.stringify(data));
		}).catch(err=>{console.log(err)})
	}

	removeTeacher(id)
	{
		let url = 'https://protected-shelf-85013.herokuapp.com/user/admin/265/';

		let options = {
			method:'DELTE',
			headers: { "Content-Type": "application/json; charset=UTF-8",
						"Authorization":"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTU2NDk1MDYyMH0.RQb8qHaPvCDxMmZACbam_-wOksz1aYM3XkIcEHI_YQT_hvXLz8AOxxhqsL_UKphkzm02C_nOCukMF9p3UUn9LA"
				},			
		}

		fetch(url, options).then(response=>response.json()).then(data=>{
			console.log(data);
			this.setState({selectedProfessorUserId:-1});
			window.location.reload();
		})
	}
		
	addTeacher()
	{
		this.setState({loading:true, teacherList:null})
		let user = {
			email: this.state.email,
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			password: this.state.password,
			username: this.state.username
		}

		let options = {
			method:'POST',
			headers: { "Content-Type": "application/json; charset=UTF-8",
						"Authorization":"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTU2NDk1MDYyMH0.RQb8qHaPvCDxMmZACbam_-wOksz1aYM3XkIcEHI_YQT_hvXLz8AOxxhqsL_UKphkzm02C_nOCukMF9p3UUn9LA"
				},
			body: JSON.stringify(user),
					
		}
		
		let url ='https://protected-shelf-85013.herokuapp.com/user/admin/'
		fetch(url, options).then(response=>response.json()).then(data=>{
			this.setState({show:false, response:data, loading:false})
			window.location.reload();
		})
	}

	showModal = () => {
    	this.setState({ show: true });
  	};

  	hideModal = () => {
    	this.setState({ show: false });
  	};

	
	handleChange = event => {

		this.setState({[event.target.id]:event.target.value})
	}

	render() 
	{
		if(this.state.teacherList === null || this.state.loading)
		{
			return (
				<div>
					<ClipLoader
					css={override}
					sizeUnit={"px"}
					size={150}
					color={'#123abc'}
					loading={this.state.loading}
					/>
				</div> 
    		)
		}
		let teachersTable;
		let showHideClassName = this.state.show  ? "pop-outer display-block" : "d-none";
		if(this.state.deleting)
		{
			teachersTable = this.state.teacherList.map(teacher => {
				return (
					<tr key={teacher.userId}>					
				       	<td>{teacher.firstName}</td>
				       	<td>{teacher.lastName}</td>
				       	<td className="d-none d-sm-block">{teacher.email}</td>
						<Button onClick={this.hideModal} type="button" className="close" aria-label="Close">
							<span aria-hidden="true">×</span>
						</Button>
						<Button onClick={this.hideModal} type="button" className="close" aria-label="Close">
							<span aria-hidden="true">×</span>
						</Button>
			      	</tr>
				)
			});
		}
		else
		{
			teachersTable = this.state.teacherList.map(teacher => {
				return (
					<tr key={teacher.userId}>
				       	<td>{teacher.firstName}</td>
				       	<td>{teacher.lastName}</td>
				       	<td className="d-none d-sm-block">{teacher.email}</td>
			      	</tr>
				)
			});
		}

		return (

			<div>
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
				<Button onClick={this.removeTeacher} className="add-ta"> 
					Remove Teacher <FontAwesomeIcon style={{margin: '0 10px',}} icon={faMinus} />
				</Button>

				<div className={showHideClassName}> 
				<div className="pop-inner">
					<div className="modal-header">
						<h5 className="modal-title">Add Professor</h5>
						<Button onClick={this.hideModal} type="button" className="close" aria-label="Close">
							<span aria-hidden="true">×</span>
						</Button>
					</div>
					<div className="modal-body">
						<Form>
							<div className="form-row">
								<div className="form-group col-md-6">
									<label>First Name</label>
									<input type="text" className="form-control" 
										id="firstName"
										value={this.state.firstName}
										onChange = {this.handleChange}
										placeholder="First Name" />
								</div>
								<div className="form-group col-md-6">
									<label>Last Name</label>
									<input type="text" className="form-control" 
										id="lastName" 
										value={this.state.lastName}
										onChange = {this.handleChange}
										placeholder="Last Name" />
								</div>
							</div>
							<div className="form-row">
								<div className="form-group col-md-6">
									<label>Username</label>
									<input type="text" className="form-control" 
										id="username"
										value={this.state.username}
										onChange = {this.handleChange}
										placeholder="Username" />
								</div>
								<div className="form-group col-md-6">
									<label>Email</label>
									<input type="email" className="form-control" 
										id="email" 
										value={this.state.email}
										onChange = {this.handleChange}
										placeholder="Email" />
								</div>
								<div className="form-group col-md-6">
									<label>Password</label>
									<input type="password" className="form-control" 
										id="password" 
										value={this.state.password}
										onChange = {this.handleChange}
										placeholder="Password" />
								</div>
								<div className="form-group col-md-6">
									<label>Confirm Password</label>
									<input type="password" className="form-control" 
										id="confirmed" 
										value={this.state.confirmed}
										onChange = {this.handleChange}
										placeholder="Password" />
								</div>
							</div>
							<div className="form-row">
							</div>
							<br />
							<div className="text-right">
								<Button type="submit" className="btn btn-dark"
									onClick={this.addTeacher}
								>Add</Button>
							</div>
						</Form>
					</div>
				</div>
			</div>
			</div>
		)
	}
}

export default Instructors;
const override = css`
    display: block;
    margin: 0 auto;
	padding: 50px;
    border-color: orange;
`;
