import React from "react";
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import MainHeader from '../components/MainHeader.jsx';
import Sidebar from '../components/Sidebar.jsx';
import Courses from '../components/Courses.jsx';
import TAs from '../components/TAs.jsx';
import Stats from '../components/Stats.jsx';
import { Container } from 'react-bootstrap';

class Instructor extends React.Component {
	render() {
		return (
			<Router>
				<MainHeader />
				<Container fluid style={{marginBottom: '10%'}}>
					<div style={{height: 'calc(100vh - 290px)', margin: '0'}}>
						<div style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'no-wrap', height: '100%', margin: '0 auto', width: '90vw', paddingTop: '50px'}}>
							<Sidebar />
							<div style={{width: '87%', height: 'auto', padding: '0 30px'}}>
								<Switch>
									<Route path="/courses" component={Courses} />
	        						<Route path="/tas" component={TAs} />
	        						<Route path="/stats" component={Stats} />
	        					</Switch>
							</div>
						</div>
					</div>
				</Container>
			</Router>	
		);
	}
}







export default Instructor;
