import React from "react";
import pic from '../img/profile-cover.jpg';
import { Image, Container } from 'react-bootstrap';

class MainHeader extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			numberTas: '',
			numberCourses: '',
			firstName: '',
			lastName: ''
		}
	}

	componentDidMount(props) {
		this.setState({
			numberTas: this.props.ta,
			numberCourses: this.props.courses
		})
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
							<div className="circle">{this.state.numberTas}</div>
							<span className="caption">TAs</span>
						</div>
						<div className="float-left">
							<Image className="circle" id="picture" src={pic} fluid roundedCircle /><br/>
							<span className="caption" id="name">Rick Leinecker</span>
						</div>
						<div className="float-left d-none d-sm-block">
							<div className="circle">{this.state.numberCourses}</div>
							<span className="caption">COURSES</span>
						</div>
					</div>
				</div>
			</Container>
		)
	}
}

export default MainHeader;