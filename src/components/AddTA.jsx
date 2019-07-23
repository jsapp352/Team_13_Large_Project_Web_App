import React from "react";
import { Button, Form } from 'react-bootstrap';

class AddTA extends React.Component {
	render() {
		var { show, handleClose } = this.props;
		const showHideClassName =  show  ? "pop-outer display-block" : "d-none";

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
						<Form>
							<div className="form-row">
								<div className="form-group col-md-6">
									<label>First Name</label>
									<input type="text" className="form-control" 
										id="firstName"
										//value={}
										onChange = {this.handleChange}
										placeholder="First Name" />
								</div>
								<div className="form-group col-md-6">
									<label>Last Name</label>
									<input type="text" className="form-control" 
										id="lastName" 
										//value={}
										onChange = {this.handleChange}
										placeholder="Last Name" />
								</div>
							</div>
							<div className="form-row">
								<div className="form-group col-md-6">
									<label>Username</label>
									<input type="text" className="form-control" 
										id="username"
										//value={}
										onChange = {this.handleChange}
										placeholder="Username" />
								</div>
								<div className="form-group col-md-6">
									<label>Password</label>
									<input type="password" className="form-control" 
										id="year" 
										//value={}
										onChange = {this.handleChange}
										placeholder="Password" />
								</div>
							</div>
							<div className="form-row">
								<div className="form-group col-md-6">
									<label>Course</label>
									<input type="text" className="form-control" 
										id="courseName"
										//value={}
										onChange = {this.handleChange}
										placeholder="Course" />
								</div>
								<div className="form-group col-md-6">
									<label>Email</label>
									<input type="email" className="form-control" 
										id="email" 
										//value={}
										onChange = {this.handleChange}
										placeholder="Email" />
								</div>
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

export default AddTA;