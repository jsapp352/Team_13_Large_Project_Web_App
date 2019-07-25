import React from "react";
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Sidebar from '../components/Sidebar.jsx';
import Stats from '../components/Stats.jsx';
import { Container } from 'react-bootstrap';

class TA extends React.Component {
	render() {
		return (
			<Router>
				<Header />
				<Container fluid style={{height: '80vh'}}>
					<div style={{height: 'calc(100vh - 290px)', margin: '0'}}>
						<div style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'no-wrap', height: '100%', margin: '0 auto', width: '90vw', paddingTop: '50px'}}>
							<Sidebar className="d-none d-sm-block" userType="assistant" />
							<div style={{width: '87%', height: 'auto', padding: '0 30px'}}>
								<Switch>
	        						<Route path="/ta-stats" component={Stats} />
	        					</Switch>
							</div>
						</div>
					</div>
				</Container>
			</Router>	
		);
	}
}

export default TA;