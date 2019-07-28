import React from "react";
import { Button, Form } from 'react-bootstrap';

class AddCourse extends React.Component {
	constructor() {
		super();
	
		this.state = {
			courseCode: '',
			courseName: '',
			semester: '',
			year: '',

			confirmed: ''
		}
	}

	handleSubmit = event => {
		event.preventDefault();
		
		let course = {
			courseCode: this.state.courseCode,
			courseName: this.state.courseName,
			semester: this.state.semester,
			year: this.state.year,
		}

		let options = {
			method:'POST',
			headers: { 
				"Content-Type": "application/json; charset=UTF-8",
				"Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyaWNrZCIsImV4cCI6MTU2NDk2NzUwMn0.T_DnDFqQJ0uwmlaAZkrfUhWUi3PDY5O0t9oYEfLbg5gaySg_XSqGTQ0cqKI8ju7kX8Hl122DLDl7DPukTYwUHA"
			},
			body: JSON.stringify(course),		
		}

		let url ='https://protected-shelf-85013.herokuapp.com/course/teacher/'
		fetch(url, options)
			.then(response => response.json())
			.then(data => {
				// console.log(data);
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
		var { show, handleClose } = this.props;
		const showHideClassName =  show  ? "pop-outer display-block" : "d-none";

		return (
			<div className={showHideClassName}> 
				<div className="pop-inner">
					<div className="modal-header">
						<h5 className="modal-title">Add Course</h5>
						<Button onClick={handleClose} type="button" className="close" aria-label="Close">
							<span aria-hidden="true">×</span>
						</Button>
					</div>
					<div className="modal-body">
						<Form onSubmit={this.handleSubmit}>
							<div className="form-row">
								<div className="form-group col-md-6">
									<label>Course Name</label>
									<input type="text" className="form-control" 
										id="courseName"
										value={this.state.courseName}
										onChange = {this.handleChange}
										placeholder="Course Name" />
								</div>
								<div className="form-group col-md-6">
									<label>Course Code</label>
									<input type="text" className="form-control" 
										id="courseCode" 
										value={this.state.courseCode}
										onChange = {this.handleChange}
										placeholder="Course Code" />
								</div>
							</div>
							<div className="form-row">
								<div className="form-group col-md-6">
									<label>Semester</label>
									<input type="text" className="form-control" 
										id="semester"
										value={this.state.semester}
										onChange = {this.handleChange}
										placeholder="Semester" />
								</div>
								<div className="form-group col-md-6">
									<label>Year</label>
									<input type="number" className="form-control" 
										id="year" 
										value={this.state.year}
										onChange = {this.handleChange}
										placeholder="Year" />
								</div>
							</div>
							<br />
							<div className="text-right">
								<Button type="submit" className="btn btn-dark">Submit</Button>
							</div>
						</Form>
					</div>
				</div>
			</div>
		);
	}
}

export default AddCourse;