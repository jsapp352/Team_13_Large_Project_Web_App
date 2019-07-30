import React from "react";
import { Table, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus,  faUserMinus, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { ClipLoader } from 'react-spinners';
import { css } from '@emotion/core';
import EditTeacher from './EditTeacher.js'

class Instructors extends React.Component {
	constructor()
	{
		super();
		this.state = {
			logout: false,
			showAddModal: false,
			show: false,
			showForgot: false,
			teacherList: [],
			inactiveTeachers: [],
			editTeacher: {},
			showEditModal:false,
			email: '',
			firstName: '',
			lastName: '',
			password: '',
			confirmed: '',
			username: '',
			loading: false,
			deleting:false,
			selectedProfessorUserId: -1,
		}

		this.addTeacher = this.addTeacher.bind(this);
		this.removeTeacher = this.removeTeacher.bind(this);
	}

	componentWillMount()
	{		

		let token = localStorage.getItem('token')
		let url ='https://protected-shelf-85013.herokuapp.com/user/admin/'
		let options = {
			method:'GET',
			headers: { 
				"Content-Type": "application/json; charset=UTF-8",
				"Authorization":token
			},
		}

		fetch(url, options).then(response=>response.json()).then(data=>{
			let inactive = [];
			let active = [];
			for(let i = 0; i < data.length; i++)
			{
				if(!data[i].active)
				{
					inactive.push(data[i]);
				}
				else
				{
					active.push(data[i])
				}
			}	
			active.sort((a, b) => (a.lastName > b.lastName) ? 1 : -1)
			inactive.sort((a, b) => (a.lastName > b.lastName) ? 1 : -1)	
				
			this.setState({teacherList:active, inactiveTeachers:inactive, loading:false});
			
			// localStorage.setItem('teacherList', JSON.stringify(data));
		}).catch(err=>{console.log(err)})

	}

	removeTeacher(id)
	{
		let url = 'https://protected-shelf-85013.herokuapp.com/user/admin/'+ id +'/';

		let options = {
			method:'DELETE',
			headers: { "Content-Type": "application/json; charset=UTF-8",
						"Authorization":"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTU2NDk1MDYyMH0.RQb8qHaPvCDxMmZACbam_-wOksz1aYM3XkIcEHI_YQT_hvXLz8AOxxhqsL_UKphkzm02C_nOCukMF9p3UUn9LA"
				},			
		}

		fetch(url, options).then(response=>response.json()).then(data=>{
			this.setState({selectedProfessorUserId:-1});
			window.location.reload();
		}).catch(e=>console.log(e))
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

		let showHideClassName = this.state.show  ? "pop-outer display-block" : "d-none";
	
		let teachersTable = this.state.teacherList.map(teacher => {
			return (
			<tr key={teacher.userId}>
		       	<td className="d-none d-sm-block">{teacher.firstName}</td>
		       	<td >{teacher.lastName}</td>
		       	<td className="d-none d-sm-block">{teacher.email}</td>
		       	<td style={{whiteSpace: 'nowrap'}}>
		       		<FontAwesomeIcon 
						onClick={() => {
							this.setState({editTeacher:teacher, showEditModal:true});
						 }} 
						icon={faUserEdit} style={{marginRigth: '100px'}}/>&nbsp;&nbsp;&nbsp;
		       		<FontAwesomeIcon onClick={() => this.removeTeacher(teacher.userId)} icon={faUserMinus}/>
		       	</td>
	      	</tr>
		)
		});

		return (
		
			<div>
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
									disabled={
											this.state.firstName === '' ||
											this.state.lastName === '' ||
											this.state.email === '' ||
											this.state.password === '' ||
											this.state.confirmed === '' ||
											this.state.password !== this.state.confirmed
											}
								>Add</Button>
							</div>
						</Form>
					</div>
					</div>
				</div>
				{this.state.showEditModal && <EditTeacher show={this.state.showEditModal} handleClose={()=>this.setState({showEditModal:false})} teacher={this.state.editTeacher} /> }
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
