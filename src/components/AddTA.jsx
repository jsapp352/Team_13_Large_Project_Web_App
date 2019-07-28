import React from "react";
import { Button, Form } from 'react-bootstrap';
// import  MultiSelectReact  from 'multi-select-react';

class AddTA extends React.Component {
	constructor() {
		super();
	
		this.state = {
			courses: [],
			email: '',
			firstName: '',
			lastName: '',
			password: '',
			username: ''
		}
	}

	handleSubmit = event => {
		event.preventDefault();

		let ta = {
			courses: this.state.courses,
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

	// optionClicked(optionsList) {
	// 	this.setState({ courses: optionsList });
	// }

	// selectedBadgeClicked(optionsList) {
	// 	this.setState({ courses: optionsList });
	// }

	render() {
		const courses = this.props.courses;
		let optionList = [];
		
		if (courses.length > 0)	{
			optionList = this.props.courses.map(course => {
				return (<option key={course.courseId} value={course.courseId}>{course.courseName}</option>)
			});
		}

		var { show, handleClose } = this.props;
		const showHideClassName =  show  ? "pop-outer display-block" : "d-none";

		// const selectedOptionsStyles = {
		//     color: "#3c763d",
		//     backgroundColor: "#dff0d8"
		// };

		// const optionsListStyles = {
		//     backgroundColor: "#dff0d8",
		//     color: "#3c763d"
		// };

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
									{/*<MultiSelectReact
							        	options={this.state.options} 
							            optionClicked={this.optionClicked.bind(this)}
							            selectedBadgeClicked={this.selectedBadgeClicked.bind(this)}
							            selectedOptionsStyles={selectedOptionsStyles}
							            optionsListStyles={optionsListStyles} 
							            isTextWrap={true}
							        />*/}
									 <select type="text" className="form-control"
										id="courses"
										// value={this.state.courses}
										onChange = {this.handleChange}
										placeholder="Course">
										{optionList}
									</select>
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