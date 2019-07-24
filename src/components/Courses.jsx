import React from "react";
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import AddCourse from './AddCourse.jsx';

class Courses extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			id: "",
			name: "",
			code: "",
			semester: "",
			year: "",
			userId: ""
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
		const url = 'https://protected-shelf-85013.herokuapp.com/user/'

		const options = {
			method : 'GET',
			headers: { 
				"Content-Type": "application/json; charset=UTF-8",
				"Authorization": localStorage.getItem("token")
			}
		}

		fetch(url, options)
			.then(response => response.json())
			.then(data => {
			    console.log(data);
                this.setState({userId: data.userId});
			})
  	}

  // 	getCourses() {
  // 		const url = 'https://protected-shelf-85013.herokuapp.com/admin/' + this.state.userId;

		// fetch(url)
		// 	.then(response => response.json())
		// 	.then(data => {
  //               console.log(data);
		// 	})
  // 	}

	render() {
		const courses = [
			{'name': "Computer Science II", 'id': 1, 'code': "COP 3503"}, 
			{'name': "Computer Science I", 'id': 2, 'code': "COP 3502"}, 
			{'name': "Object Oriented Programming", 'id': 3, 'code': "COP 3101"}
		];

		const courseCards = courses.map(course => {
			return (
				<Card key={course.id} className="course-card">
					<Card.Header text="success" className="course-header" />
					<Card.Body key={course.uniqueId}>
						{course.code}:<br/>{course.name}
					</Card.Body>
				</Card>
			)
		});

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