import React from "react";
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import AddCourse from './AddCourse.jsx';

class Courses extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			courses: '',
			show: false
		}
	}

  	showModal = () => {
    	this.setState({show: true});
  	}

  	hideModal = () => {
    	this.setState({show: false});
  	}

  	componentDidMount() {
		this.setState({courses: this.props.courses});
  	}

	render() {
		let courseCards = []

		if (this.state.courses.length > 0) {
			courseCards = this.state.courses.map(course => {
				return (
					<Card key={course.courseId} className="course-card">
						<Card.Header text="success" className="course-header" />
						<Card.Body>
							{course.courseCode}:<br/>{course.courseName}
						</Card.Body>
					</Card>
				)
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

				<AddCourse show={this.state.show} handleClose={this.hideModal} />
			</>
		)
	}
}

export default Courses;