import React from "react";
import pic from '../img/profile-cover.jpg';
import { Image, Container } from 'react-bootstrap';

class MainHeader extends React.Component {
	render() {
		return (
			<Container fluid className="header">
				<div className="topBar">
					<div className="title">THE CAVE</div>
				</div>
				<div className="information">
					<div className="circleContainer">
						<div>
							Queue
						</div>
						
					</div>
				</div>
			</Container>
		)
	}
}

export default MainHeader;