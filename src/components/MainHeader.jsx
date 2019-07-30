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
				activeTas: '',
				activeCourses: ''
			}
		}
	}

	componentDidMount(props) {
		console.log(JSON.stringify(this.props.userInfo))
		this.setState({userInfo: this.props.userInfo})
	}

	render() {
		return (
			<Container fluid className="header">
				<div className="topBar">
					<div className="title">THE CAVE</div>
				</div>
				<div className="information">
					<div className="circleContainer">
						<div className="float-left d-none d-sm-block">
							<div className="circle">{this.state.userInfo.activeTas}</div>
							<span className="caption">TAs</span>
						</div>
						<div className="float-left">
							<Image className="circle" id="picture" src={pic} fluid roundedCircle /><br/>
							<span className="caption" id="name">{this.state.userInfo.firstName} {this.state.userInfo.lastName}</span>
						</div>
						<div className="float-left d-none d-sm-block">
							<div className="circle">{this.state.userInfo.activeCourses}</div>
							<span className="caption">COURSES</span>
						</div>
					</div>
				</div>
			</Container>
		)
	}
}

export default MainHeader;
