import React from "react";
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';


var t = 'https://vast-coast-27531.herokuapp.com/login';
const options = {
	method: 'POST',
	headers: { "Content-Type": "application/json; charset=UTF-8" },
	body: JSON.stringify({ username: 'admin', password: 'admin123' })
}
fetch(t, options).then(response => {
	console.log(response.headers.get('Authorization'))
})

let url2 = 'https://vast-coast-27531.herokuapp.com/course/';
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