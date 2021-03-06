import React from "react";
import { Button, Form } from 'react-bootstrap';
import Admin from '../layouts/Admin'
import { ClipLoader } from 'react-spinners';
import { css } from '@emotion/core';


export default class EditCourse extends React.Component {

	constructor(props)
	{
		super();
		this.state = {
			courseCode: props.course.courseCode,
			courseId: props.course.courseId,
			courseName: props.course.courseName,
			semester: props.course.semester,
			year: props.course.year,
			show: true,
		}
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event)
	{
		event.preventDefault();
		let token = localStorage.getItem('token')
		let url ='https://protected-shelf-85013.herokuapp.com/course/teacher/' + this.state.courseId + '/'
		let user = {
			courseCode: ,
			courseName: ,
			semester: ,
			year: ,
		}
		let options = {
			method:'PUT',
			headers: { 
				"Content-Type": "application/json; charset=UTF-8",
				"Authorization": token
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
						<Form>
							<div className="form-row">
								<div className="form-group col-md-6">
									<label>Course Name</label>
									<input type="text" className="form-control" 
										id="courseName"
										//value={}
										onChange = {this.handleChange}
										placeholder="Course Name" />
								</div>
								<div className="form-group col-md-6">
									<label>Course Code</label>
									<input type="text" className="form-control" 
										id="courseCode" 
										//value={}
										onChange = {this.handleChange}
										placeholder="Course Code" />
								</div>
							</div>
							<div className="form-row">
								<div className="form-group col-md-6">
									<label>Semester</label>
									<input type="text" className="form-control" 
										id="semester"
										//value={}
										onChange = {this.handleChange}
										placeholder="Semester" />
								</div>
								<div className="form-group col-md-6">
									<label>Year</label>
									<input type="number" className="form-control" 
										id="year" 
										//value={}
										onChange = {this.handleChange}
										placeholder="Year" />
								</div>
							</div>
							<br />
							<div className="text-right">
								<Button type="submit" className="btn btn-dark"
									onClick={this.handleSubmit}
								>Submit Changes</Button>
							</div>
						</Form>
					</div>
				</div>
			</div>
		);
	}
}

const override = css`
    display: block;
    margin: 0 auto;
	padding: 50px;
    border-color: orange;
`;
