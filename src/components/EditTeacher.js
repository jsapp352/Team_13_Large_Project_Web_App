import React from "react";
import { Button, Form } from 'react-bootstrap';
// import Admin from '../layouts/Admin'
// import { ClipLoader } from 'react-spinners';
// import { css } from '@emotion/core';


export default class EditTeacher extends React.Component {

	constructor(props)
	{
		super();
		this.state = {
			email: props.teacher.email,
			firstName: props.teacher.firstName,
			lastName: props.teacher.lastName,
			password: props.teacher.password,
			username: props.teacher.username,
			confirmed: props.teacher.password,
			userId: props.teacher.userId,
			tempPass:'temporary',
			show: true,
		}
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event)
	{
		event.preventDefault();
		let url ='https://protected-shelf-85013.herokuapp.com/user/admin/' + this.state.userId + '/'
		let user = {
			email: this.state.email,
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			password: this.state.password,
			username: this.state.username
		}
		let options = {
			method:'PUT',
			headers: { "Content-Type": "application/json; charset=UTF-8",
						"Authorization":"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTU2NDk1MDYyMH0.RQb8qHaPvCDxMmZACbam_-wOksz1aYM3XkIcEHI_YQT_hvXLz8AOxxhqsL_UKphkzm02C_nOCukMF9p3UUn9LA"
				},
			body: JSON.stringify(user),
					
		}		
		fetch(url, options).then(response=>response.json()).then(data=>{
			this.setState({show:false})
			window.location.reload();
		})
	}

	handleChange(event){
		this.setState({[event.target.id]:event.target.value})
	}

	render() {
		var { show, handleClose } = this.props;
		let teacher = this.props.teacher;
		let showHideClassName =  show  ? "pop-outer display-block" : "d-none";
		return (
			<div className={showHideClassName}> 
				<div className="pop-inner">
					<div className="modal-header">
						<h5 className="modal-title">Edit: {teacher.firstName} {teacher.lastName}</h5>
						<Button onClick={handleClose} type="button" className="close" aria-label="Close">
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
										onChange = {(event)=>this.handleChange(event)}
										 />
								</div>
								<div className="form-group col-md-6">
									<label>Last Name</label>
									<input type="text" className="form-control" 
										id="lastName" 
										value={this.state.lastName}
										onChange = {(event)=>this.handleChange(event)}
										/>
								</div>
							</div>
							<div className="form-row">
								<div className="form-group col-md-6">
									<label>Username</label>
									<input type="text" className="form-control" 
										id="username"
										value={this.state.username}
										onChange = {(event)=>this.handleChange(event)}
										placeholder="Username" />
								</div>
								<div className="form-group col-md-6">
									<label>Email</label>
									<input type="email" className="form-control" 
										id="email" 
										value={this.state.email}
										onChange = {(event)=>this.handleChange(event)}
										placeholder="Email" />
								</div>
								<div className="form-group col-md-6">
									<label>Password</label>
									<input type="password" className="form-control" 
										id="password" 
										value={this.state.password}
										onChange = {(event)=>this.handleChange(event)}
										placeholder="Password" />
								</div>
								<div className="form-group col-md-6">
									<label>Confirm Password</label>
									<input type="password" className="form-control" 
										id="confirmed" 
										value={this.state.confirmed}
										onChange = {(event)=>this.handleChange(event)}
										placeholder="Password" />
								</div>
							</div>
							<div className="form-row">
							</div>
							<br />
							<div className="text-right">
								<Button type="submit" className="btn btn-dark"
									onClick={(event)=>this.handleSubmit(event)}
								>Submit Changes</Button>
							</div>
						</Form>
					</div>
				</div>
			</div>
		);
	}
}

// const override = css`
//     display: block;
//     margin: 0 auto;
// 	padding: 50px;
//     border-color: orange;
// `;
