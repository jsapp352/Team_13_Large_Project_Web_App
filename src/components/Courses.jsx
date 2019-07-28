import React from "react";
import { Link } from 'react-router-dom';
import { Card, Dropdown, DropdownButton } from 'react-bootstrap';
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

  	removeCourse(courseInfo) {
  		let newCourseList = [];
        let url = 'https://protected-shelf-85013.herokuapp.com/course/teacher/'+ courseInfo.courseId +'/';

        let options = {
            method:'DELETE',
            headers: { 
            	"Content-Type": "application/json; charset=UTF-8",
                "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyaWNrZCIsImV4cCI6MTU2NTIwMjU5Mn0.MNEgrdSYmZFdkMZIsP1elAQlto7T_qoA6vjTtQIw3_hlChQwI6bLEC9dzHuA-wa9QqHoHCiBKtyrLc-bX8eteA"
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
								<DropdownButton id="dropdown-basic-button" title=''>
  									<Dropdown.Item onClick=''>Edit course</Dropdown.Item>
  									<Dropdown.Item onClick={() => this.removeCourse(course)}>Deactivate course</Dropdown.Item>
								</DropdownButton>
							</Card.Header>
							<Link to='/tas'>
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

				<AddCourse show={this.state.show} handleClose={this.hideModal} />
			</>
		)
	}
}

export default Courses;