import React from "react";
import { Card, Dropdown, DropdownButton } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faMinus } from '@fortawesome/free-solid-svg-icons';
import AddCourse from './AddCourse.jsx';
import EditTA from './EditTA.js'
import { Link } from 'react-router-dom'

class Courses extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			courses: '',
			show: false,
			editTa: false,
			ta_to_change: {},
			selectedCourse: {},
			showTAForCourse: false,
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
		console.log(this.state)
		if (this.state.courses.length > 0) {
			courseCards = this.state.courses.map(course => {
				if (course.active) {
					return (
						<Card onClick={(event)=>{
								this.setState({selectedCourse: course, showTAForCourse: true});
								}} 
								key={course.courseId} className="course-card">
							<Card.Header text="success" className="course-header">
								<DropdownButton id="dropdown-basic-button" title=''>
  									<Dropdown.Item onClick=''>Edit course</Dropdown.Item>
  									<Dropdown.Item onClick={() => this.removeCourse(course)}>Deactivate course</Dropdown.Item>
								</DropdownButton>
							</Card.Header>
					<Link to={{pathname:'/tas', state:course}}>
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
				{this.state.editTa && <EditTA show={this.state.editTa} handleClose={()=>this.setState({editTa:false})} TA={this.state.ta_to_change} />} 
				<AddCourse show={this.state.show} handleClose={this.hideModal} />
			</div>
		)
	}
}

export default Courses;
