import React from "react";
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

let url = 'https://protected-shelf-85013.herokuapp.com/login';

var data = {
	"username": "admin",
	"password": "admin123"
}

const options = {
	method : 'POST',
	headers: {"Content-Type": "application/json"},
	body: JSON.stringify(data)
};

fetch(url, options)
	.then(response => response.json())
	// .then(data => {
    //     console.log(data);
    //})

let url2 = 'https://protected-shelf-85013.herokuapp.com/course/';
fetch(url2)
	.then(response => response.json())
	.then(data => {
        console.log(data);
    })

class Courses extends React.Component {
	render() {
		return (
			<>
				<div className="sub-title"><span id="top-line"/>Courses</div>
				<div style={{display: 'flex', justifyContent: 'flex-start'}}>
					<Card className="course-card">
						<Card.Header text="success" style={{backgroundColor: '#000', height: '50px'}}>
						</Card.Header>
						<Card.Body>
							COP 3503C:<br/>Computer Science II
						</Card.Body>
					</Card>
					<Card className="course-card">
						<Card.Header text="success" style={{backgroundColor: '#000', height: '50px'}}>
						</Card.Header>
						<Card.Body>
							COP 3502C:<br/>Computer Science I
						</Card.Body>
					</Card>
					<Card className="course-card" style={{backgroundColor: 'rgba(0,0,0,0.15)', border: 'none'}}>
						<Card.Body style={{fontSize: '4em', textAlign: 'center', color: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
							<FontAwesomeIcon icon={faPlusCircle} />
						</Card.Body>
					</Card>
				</div>
			</>
		)
	}
}

export default Courses;