import React from "react";
import { Button, Form } from 'react-bootstrap';

class AddCourse extends React.Component {
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
								>Submit</Button>
							</div>
						</Form>
					</div>
				</div>
			</div>
		);
	}
}

export default AddCourse;