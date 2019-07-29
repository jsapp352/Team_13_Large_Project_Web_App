import React from "react";
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

class Courses extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			ta: '',
			courses: []
		}
	}

  	componentDidMount() {
  		console.log("From TAC: " + this.props.courses)
		this.setState({courses: this.props.courses});
		this.setState({ta: this.props.ta});
  	}

	render() {
		let courseCards = []

		if (this.state.courses.length > 0) {
			courseCards = this.state.courses.map(course => {
				if (course.active) {
					let information = {
						"active": this.state.ta.active,
					    "email": this.state.ta.email,
					    "firstName": this.state.ta.firstName,
					    "kioskPin": this.state.ta.kioskPin,
					    "lastName": this.state.ta.lastName,
					    "password": this.state.ta.password,
					    "role": this.state.ta.role,
					    "taId": this.state.ta.userId,
					    "username": this.state.ta.username,
					    "course": course.courseName,
					    "courseId": course.courseId,
					    "userId": this.state.ta.userId
					}

					return (
							<Card key={course.courseId} className="course-card">
								<Card.Header text="success" className="course-header">
								</Card.Header>
								<Link to={{pathname: '/ta-stats', state: {taInfo: information}}} >
								<Card.Body>
									{course.courseCode}:<br/>{course.courseName}
								</Card.Body>
								</Link>
							</Card>
					)
				}
			});
		}

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
			</>
		)
	}
}

export default Courses;