import React from "react";
import MainHeader from '../components/MainHeader.jsx';
import Sidebar from '../components/Sidebar.jsx';
import { Container, Card } from 'react-bootstrap';
import WaitList from "./WaitList.js"

class Instructor extends React.Component {
	render() {

		 
		return (
			<>
				<MainHeader />
				<Container fluid>
					<div style={{height: 'calc(100vh - 290px)', margin: '0'}}>
						<div style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'no-wrap', height: '100%', margin: '0 auto', width: '90vw', paddingTop: '50px'}}>
							
							<div style={{width: '87%', height: 'auto', padding: '0 30px'}}>
								<div className="sub-title"><span id="top-line"/>Courses</div>
								<div style={{display: 'flex', justifyContent: 'flex-start'}}>
								<WaitList />
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
