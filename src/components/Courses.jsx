import React from "react";
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faMinus } from '@fortawesome/free-solid-svg-icons';
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

  	removeCourse(courseInfo) {
  		let newCourseList = [];
        let url = 'https://protected-shelf-85013.herokuapp.com/course/teacher/'+ courseInfo.courseId +'/';

        let options = {
            method:'DELETE',
            headers: { 
            	"Content-Type": "application/json; charset=UTF-8",
                "Authorization":"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyaWNrZCIsImV4cCI6MTU2NDk2NzUwMn0.T_DnDFqQJ0uwmlaAZkrfUhWUi3PDY5O0t9oYEfLbg5gaySg_XSqGTQ0cqKI8ju7kX8Hl122DLDl7DPukTYwUHA"
            },
            body: JSON.stringify(courseInfo) 
        }

        fetch(url, options)
        	.then(response => response.json())
        	.then(data => {
            	newCourseList = this.state.courses.filter((value, index, arr) => {
            		return (value.courseId !== data.courseId)
            	})
            	
            	this.setState({courses: newCourseList});
            	window.location.reload();
        	})
        	.catch(e => console.log("Error: " + e))
    }

	render() {
		let courseCards = []

		if (this.state.courses.length > 0) {
			courseCards = this.state.courses.map(course => {
				if (course.active) {
					return (
						<Card key={course.courseId} className="course-card">
							<Card.Header text="success" className="course-header">
								<FontAwesomeIcon onClick={() => this.removeCourse(course)} icon={faMinus} style={{float: 'right', color: '#fff'}}/>
							</Card.Header>
							<Card.Body>
								{course.courseCode}:<br/>{course.courseName}
							</Card.Body>
						</Card>
					)
				}
			});
		}

		return (
			<div>
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
			</div>
		)
	}
}

export default Courses;
