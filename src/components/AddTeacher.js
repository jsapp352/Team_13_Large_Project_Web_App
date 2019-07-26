import React from "react";
import { Button, Form } from 'react-bootstrap';

export class AddTeacher extends React.Component {

	constructor()
	{
		super();
	
		this.state = {
			email: '',
			firstName: '',
			lastName: '',
			password: '',
			username: '',

			confirmed: '',

			teacherList: [],
		}
		this.addTeacher = this.addTeacher.bind(this);
	}

	addTeacher()
	{

		console.log(this.state);
		let user = {
			email: this.state.email,
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			password: this.state.password,
			username: this.state.username,
		}

		let options = {
			method:'POST',
			headers: { "Content-Type": "application/json; charset=UTF-8",
						"Authorization":"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTU2NDk1MDYyMH0.RQb8qHaPvCDxMmZACbam_-wOksz1aYM3XkIcEHI_YQT_hvXLz8AOxxhqsL_UKphkzm02C_nOCukMF9p3UUn9LA"
				},
			body: JSON.stringify(user),
					
		}
		
		console.log(options);
		
		let url ='https://protected-shelf-85013.herokuapp.com/user/admin/'
		
		fetch(url, options).then(response=>response.json()).then(data=>{
			console.log(data);
			this.setState({teacherList:data})
		}).catch(err=>{console.log(err)})
}

	handleChange = event => {

		this.setState({[event.target.id]:event.target.value})
	}

	render() {
		var { show, handleClose } = this.props;
		const showHideClassName =  show  ? "pop-outer display-block" : "d-none";
	
		return (
			<div className={showHideClassName}> 
				<div className="pop-inner">
					<div className="modal-header">
						<h5 className="modal-title">Add Professor</h5>
						<Button onClick={handleClose} type="button" className="close" aria-label="Close">
							<span aria-hidden="true">×</span>
						</Button>
					</div>
					<div className="modal-body">
						<Form onSubmit={this.addTeacher}>
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
		);
	}
}

export default AddTeacher;
