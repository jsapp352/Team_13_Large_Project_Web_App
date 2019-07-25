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
		}
	}

	addTeacher()
	{
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

		let url ='https://protected-shelf-85013.herokuapp.com/user/admin/'
		fetch(url, options).then(response=>response.json()).then(data=>{
			console.log(data);
		}).catch(err=>{console.log(err)})
	}

	handleFirst(event)
	{
		this.setState({firstName:event})
	}

	handleLast(event)
	{
		this.setState({lastName:event})
	}

	handlePass(event)
	{
		this.setState({password:event})
	}

	handleUserName(event)
	{
		this.setState({username:event})
	}

	handleConfirmedPass(event)
	{
		this.setState({confirmed:event})
	}
	
 	handleEmail(event)
	{
		this.setState({email:event})
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
						<Form>
							<div className="form-row">
								<div className="form-group col-md-6">
									<label>First Name</label>
									<input type="text" className="form-control" 
										id="firstName"
										//value={}
										onChange = {this.handleFirst}
										placeholder="First Name" />
								</div>
								<div className="form-group col-md-6">
									<label>Last Name</label>
									<input type="text" className="form-control" 
										id="lastName" 
										//value={}
										onChange = {this.handleLast}
										placeholder="Last Name" />
								</div>
							</div>
							<div className="form-row">
								<div className="form-group col-md-6">
									<label>Username</label>
									<input type="text" className="form-control" 
										id="username"
										//value={}
										onChange = {this.handleUserName}
										placeholder="Username" />
								</div>
								<div className="form-group col-md-6">
									<label>Email</label>
									<input type="email" className="form-control" 
										id="email" 
										//value={}
										onChange = {this.handleEmail}
										placeholder="Email" />
								</div>
								<div className="form-group col-md-6">
									<label>Password</label>
									<input type="password" className="form-control" 
										id="year" 
										//value={}
										onChange = {this.handlePass}
										placeholder="Password" />
								</div>
								<div className="form-group col-md-6">
									<label>Confirm Password</label>
									<input type="password" className="form-control" 
										id="year" 
										//value={}
										onChange = {this.handleConfirmedPass}
										placeholder="Password" />
								</div>
							</div>
							<div className="form-row">
							</div>
							<br />
							<div className="text-right">
								<Button type="submit" className="btn btn-dark"
									onClick={this.handleSubmit}
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
