import React from "react";
import { Button, Form } from 'react-bootstrap';
import MultiSelect from "@khanacademy/react-multi-select";

class AddTA extends React.Component {
	constructor() {
		super();
	
		this.state = {
			courses: [],
			email: '',
			firstName: '',
			lastName: '',
			password: '',
			username: '',
			selected: []
		}
	}

	handleSubmit = event => {
		event.preventDefault();

		let ta = {
			courses: this.state.selected.toString(),
			email: this.state.email,
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			password: this.state.password,
			username: this.state.username
		}

		let options = {
			method:'POST',
			headers: { 
				"Content-Type": "application/json; charset=UTF-8",
				"Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyaWNrZCIsImV4cCI6MTU2NTA0NjY0NX0.hWCit110CuqKWgTVhTYJnP5L1xFcT86azB4EpceAcw9L61q4XquzxAEu-uKhi97Ve3EF5KePZOXVqW59Uvac9Q"
			},
			body: JSON.stringify(ta)	
		}

		let url ='https://protected-shelf-85013.herokuapp.com/user/teacher/'
		fetch(url, options)
			.then(response => response.json())
			.then(data => {
				window.location.reload();
			})
			.catch(err => {
				console.log(err)
			})
	}

	handleChange = event => {
		this.setState({
			[event.target.id]: event.target.value
		});
	}

	render() {
		const courses = this.props.courses;
		let options = [];
		
		if (courses.length > 0)	{
			options = this.props.courses.map(course => {
				return ({label: course.courseName, value: course.courseId});
			});
		}

		const selected = this.state.selected;
		console.log("Selected: " + selected);
		console.log("Selected as string: " + selected.toString())

		var { show, handleClose } = this.props;
		const showHideClassName =  show  ? "pop-outer display-block" : "d-none";

		console.log('Options = ' + options)

		return (
			<div className={showHideClassName}> 
				<div className="pop-inner">
					<div className="modal-header">
						<h5 className="modal-title">Add TA</h5>
						<Button onClick={handleClose} type="button" className="close" aria-label="Close">
							<span aria-hidden="true">×</span>
						</Button>
					</div>
					<div className="modal-body">
						<Form onSubmit={this.handleSubmit}>
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
									<label>Password</label>
									<input type="password" className="form-control" 
										id="password" 
										value={this.state.password}
										onChange = {this.handleChange}
										placeholder="Password" />
								</div>
							</div>
							<div className="form-row">
								<div className="form-group col-md-6">
									<label>Course</label>
									<MultiSelect
      									options={options}
      									selected={selected}
      									onSelectedChanged={selected => this.setState({selected})}
    								/>
								</div>
								<div className="form-group col-md-6">
									<label>Email</label>
									<input type="email" className="form-control" 
										id="email" 
										value={this.state.email}
										onChange = {this.handleChange}
										placeholder="Email" />
								</div>
							</div>
							<br />
							<div className="text-right">
								<Button type="submit" className="btn btn-dark">Add</Button>
							</div>
						</Form>
					</div>
				</div>
			</div>
		);
	}
}

export default AddTA;