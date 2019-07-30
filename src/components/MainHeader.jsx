import React from "react";
import pic from '../img/profile-cover.jpg';
import { Image, Container } from 'react-bootstrap';

class MainHeader extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			userInfo: {
				firstName: '',
				lastName: '',
				numberTas: '',
				numberCourses: '',
				activeTas: 0,
				activeCourses: 0
			}
		}
	}

	componentDidMount(props) {
		console.log(JSON.stringify(this.props.userInfo))
		this.setState({userInfo: this.props.userInfo})	
	}

	render() {
		let courseNum = this.state.userInfo.activeCourses;
		if(courseNum === undefined)
			courseNum = 0;
		let numTAs = this.state.userInfo.activeTas;
		if(numTAs === undefined)
			numTAs = 0;
		return (
			<Container fluid className="header">
				<div className="topBar">
					<div className="title">THE CAVE</div>
				</div>
				<div className="information">
					<div className="circleContainer">
						<div className="float-left d-none d-sm-block">
							<div className="circle">{numTAs}</div>
							<span className="caption">TAs</span>
						</div>
						<div className="float-left">
							<Image className="circle" id="picture" src={pic} fluid roundedCircle /><br/>
							<span className="caption" id="name">{this.state.userInfo.firstName} {this.state.userInfo.lastName}</span>
						</div>
						<div className="float-left d-none d-sm-block">
							<div className="circle">{courseNum}</div>
							<span className="caption">COURSES</span>
						</div>
					</div>
				</div>
			</Container>
		)
	}
}

export default MainHeader;
