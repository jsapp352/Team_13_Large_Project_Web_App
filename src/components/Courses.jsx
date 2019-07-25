import React from "react";
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import AddCourse from './AddCourse.jsx';

class Courses extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			courses: ''
		}
	}

	state = { show: false, showForgot: false };

  	showModal = () => {
    	this.setState({ show: true });
  	};

  	hideModal = () => {
    	this.setState({ show: false });
  	};

  	componentDidMount() {
		// const url = 'https://protected-shelf-85013.herokuapp.com/user/'

		// const options = {
		// 	method : 'GET',
		// 	headers: { 
		// 		"Content-Type": "application/json; charset=UTF-8",
		// 		"Authorization": localStorage.getItem("token")
		// 	}
		// }

		// fetch(url, options)
		// 	.then(response => response.json())
		// 	.then(data => {
  //               const courseUrl = 'https://protected-shelf-85013.herokuapp.com/course/admin/user/2/' //' + data.userId + '/';
  //               fetch(courseUrl)
  //               	.then(res => res.json())
  //               	.then(courseList => {
  //               		console.log("Courses of this teacher: " + JSON.stringify(courseList));
  //               		this.setState({courses: courseList})
  //               	})
		// 	})

		this.setState({courses: this.props.courses});
		console.log("AJAAAAAA: " + this.state.courses)
  	}

	render() {
		let courseCards = []

		// if (this.state.courses !== undefined) {
		// 	courseCards = this.state.courses.map(course => {
		// 		return (
		// 			<Card key={course.courseId} className="course-card">
		// 				<Card.Header text="success" className="course-header" />
		// 				<Card.Body>
		// 					{course.courseCode}:<br/>{course.courseName}
		// 				</Card.Body>
		// 			</Card>
		// 		)
		// 	});
		// }

		return (
			<>
				<div className="sub-title"><span id="top-line"/>Courses</div>
				<div className="course-wrapper">
					{ courseCards }
					<Card onClick={this.showModal} className="course-card" style={{backgroundColor: 'rgba(0,0,0,0.15)', border: 'none'}}>
						<Card.Body id="add-course">
							<FontAwesomeIcon icon={faPlusCircle} />
						</Card.Body>
					</Card>
				</div>

				<AddCourse show={this.state.show} handleClose={this.hideModal} />
			</>
		)
	}
}

export default Courses;