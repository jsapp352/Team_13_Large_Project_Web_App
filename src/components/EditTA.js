import React from "react";
import { Button, Form } from 'react-bootstrap';

export default class EditTA extends React.Component {
	constructor(props)
	{
		super();
		console.log(props)
		this.state = {
			courseId: props.TA.courseId,
			email: props.TA.email,
			firstName: props.TA.firstName,
			lastName: props.TA.lastName,
			password: props.TA.password,
			username: props.TA.username,
			kioskPin: props.TA.kioskPin,
			userId: props.TA.taId,
		}
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	
	handleChange(event){
		this.setState({[event.target.id]:event.target.value})
	}

	handleSubmit(event)
	{
		event.preventDefault();
		console.log(this.state)
		let url ='https://protected-shelf-85013.herokuapp.com/user/teacher/' + this.state.userId + '/'
		let user = {
			email: this.state.email,
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			courses: this.state.courseId
		}
		let token = localStorage.getItem('token')
		let options = {
			method:'PUT',
			headers: { 
				"Content-Type": "application/json; charset=UTF-8",
				"Authorization": token
			},
			body: JSON.stringify(user),
					
		}	
		console.log(url)	
		fetch(url, options).then(response=>response.json()).then(data=>{
			this.setState({show:false})
			console.log(data)
			window.location.reload();
			
		})
	}


	render() {
		var { show, handleClose } = this.props;
		const showHideClassName =  show  ? "pop-outer display-block" : "d-none";
		return (
			<div className={showHideClassName}> 
				<div className="pop-inner">
					<div className="modal-header">
						<h5 className="modal-title">Edit TA</h5>
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
										placeholder="First Name" />
								</div>
								<div className="form-group col-md-6">
									<label>Last Name</label>
									<input type="text" className="form-control" 
										id="lastName" 
										value={this.state.lastName}
										onChange = {(event)=>this.handleChange(event)}
										placeholder="Last Name" />
								</div>
							</div>
							
							<div className="form-row">
								<div className="form-group col-md-6">
									<label>Course</label>
									<input type="text" className="form-control" 
										id="courseName"
										value={this.state.course}
										onChange = {(event)=>this.handleChange(event)}
										placeholder="Course" />
								</div>
								<div className="form-group col-md-6">
									<label>Email</label>
									<input type="email" className="form-control" 
										id="email" 
										value={this.state.email}
										onChange = {(event)=>this.handleChange(event)}
										placeholder="Email" />
								</div>
							</div>
							<br />
							<div className="text-right">
								<Button type="submit" className="btn btn-dark"
									onClick={(event) => this.handleSubmit(event)}
								>Submit Changes</Button>
							</div>
						</Form>
					</div>
				</div>
			</div>
		);
	}
}

