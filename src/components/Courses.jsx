import React from "react";
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import AddCourse from './AddCourse.jsx';

const courses = [
	{name: "Computer Science II", uniqueID: 1, code: "COP 3503"}, 
	{name: "Computer Science I", uniqueID: 2, code: "COP 3502"}, 
	{name: "Object Oriented Programming", uniqueID: 3, code: "COP 3101"}
];

const courseCards = courses.map(course => {
		return (
			<Card key={course.uniqueId} className="course-card">
				<Card.Header text="success" className="course-header" />
				<Card.Body key={course.uniqueId}>
					{course.code}:<br/>{course.name}
				</Card.Body>
			</Card>
		)
	});

class Courses extends React.Component {
	state = { show: false, showForgot: false };

  	showModal = () => {
    	this.setState({ show: true });
  	};

  	hideModal = () => {
    	this.setState({ show: false });
  	};

	render() {
		return (
			<>
				<div className="sub-title"><span id="top-line"/>Courses</div>
				<div className="course-wrapper">
					{ courseCards }
					<Card onClick={this.showModal} className="course-card" style={{backgroundColor: 'rgba(0,0,0,0.15)', border: 'none'}}>
						<Card.Body style={{fontSize: '4em', textAlign: 'center', color: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
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