import React from "react";
import pic from '../img/profile-cover.jpg';
import { Image, Container } from 'react-bootstrap';

class Header extends React.Component {
	render() {
		return (
			<Container fluid className="header">
				<div className="topBar">
					<div className="title">THE CAVE</div>
				</div>
				<div className="information" style={{height: '200px'}}>
					<div className="anotherCircleContainer">
						<div className="float-left" style={{margin: '0 40px'}}>
							<Image className="circle" id="picture" src={pic} fluid roundedCircle />
							<span className="caption" style={{whiteSpace: 'nowrap'}} id="name">
								John Doe
							</span>
						</div>
					</div>
				</div>
			</Container>
		)
	}
}

export default Header;