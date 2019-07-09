import React from "react";
import MainHeader from '../components/MainHeader.jsx';
import Sidebar from '../components/Sidebar.jsx';
import { Container, Card } from 'react-bootstrap';

class Instructor extends React.Component {
	render() {
		return (
			<>
				<MainHeader />
				<Container fluid>
					<div style={{height: 'calc(100vh - 290px)', margin: '0'}}>
						<div style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'no-wrap', height: '100%', margin: '0 auto', width: '90vw', paddingTop: '50px'}}>
							<Sidebar />
							<div style={{width: '87%', height: 'auto', padding: '0 30px'}}>
								<div className="sub-title"><span id="top-line"/>Courses</div>
								<div style={{display: 'flex', justifyContent: 'flex-start'}}>
									<Card className="course-card">
										<Card.Header text="success" style={{backgroundColor: '#000', height: '50px'}}>
										</Card.Header>
										<Card.Body>
											COP 3502C:<br/>Computer Science I
										</Card.Body>
									</Card>
									<Card className="course-card">
										<Card.Header text="success" style={{backgroundColor: '#000', height: '50px'}}>
										</Card.Header>
										<Card.Body>
											COP 3502C:<br/>Computer Science I
										</Card.Body>
									</Card>
								</div>
							</div>
						</div>
					</div>
				</Container>
			</>	
		);
	}
}

export default Instructor;
