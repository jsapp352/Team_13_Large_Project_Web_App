import React from "react";
import ReactDOM from "react-dom";
import { withRouter } from 'react-router-dom';
import { LinkContainer } from "react-router-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faUsers, faSignOutAlt, faSignInAlt, faUserSlash } from '@fortawesome/free-solid-svg-icons';
import Login from "../layouts/Login";
import caveIcon from '../img/cave.png'
import InactiveInstructors from './InactiveInstructors'

class Sidebar extends React.Component {	
	
	handleLogout = () => {
		localStorage.removeItem("isAuth");
		localStorage.removeItem("token");
		localStorage.removeItem("userType");

		this.props.history.push('/'); 
		window.location.reload();
	}

	render() {
		const user = this.props.userType;
		const menuItems = [];
		
		if (user === 'any') {
			menuItems.length = 0;
			menuItems.push(
				<div key={1}>
					<LinkContainer to="/queue">
						<div className="menu-item">
							<img alt="Cave Icon" style={{width: '50px'}} src={caveIcon} />
							<p>Refresh</p>
						</div>
					</LinkContainer>
					<div className="line"/>
					<LinkContainer to="/">
						<div className="menu-item">
							<FontAwesomeIcon className="menu-icon" icon={faSignInAlt} />
							<p>Login</p>
						</div>
					</LinkContainer>
				</div>
			)
		}
		else if (user === 'admin') {
			menuItems.length = 0;
			menuItems.push(
				<div key={1}>
					<LinkContainer to="/instructors">
						<div className="menu-item">
							<FontAwesomeIcon className="menu-icon" icon={faUsers} />
							<p>Teachers</p>
						</div>
					</LinkContainer>
					<div className="line"/>
				</div>
			)
			menuItems.push(
				<div key={2}>
					<LinkContainer to='/inactive'>
						<div className="menu-item">
							<FontAwesomeIcon className="menu-icon" icon={faUserSlash} />
							<p>Inactive Teachers</p>
						</div>
					</LinkContainer>
					<div className="line"/>
				</div>
			)
		}
		else if (user === 'teacher') {
			menuItems.length = 0;
			menuItems.push(
				<div key={2}>
					<LinkContainer to="/courses">
						<div className="menu-item">
							<FontAwesomeIcon className="menu-icon" icon={faBook} />
							<p>Courses</p>
						</div>
					</LinkContainer>
					<div className="line"/>
				</div>
			)			
			menuItems.push(
				<div key={3}>
					<LinkContainer to="/tas">
						<div className="menu-item">
							<FontAwesomeIcon className="menu-icon" icon={faUsers} />
							<p>Teaching Assistants</p>
						</div>
					</LinkContainer>
					<div className="line"/>
				</div>
			)			
		}
		else if (user === 'assistant') {
			menuItems.length = 0;
			menuItems.push(
				<div key={5}>
					<LinkContainer to="/ta-courses">
						<div className="menu-item">
							<FontAwesomeIcon className="menu-icon" icon={faBook} />
							<p>Courses</p>
						</div>
					</LinkContainer>
					<div className="line"/>
				</div>
			)
		}

		if (user !== 'any') {
			menuItems.push(
				<div key={0} className="menu-item" onClick={this.handleLogout}>
					<FontAwesomeIcon className="menu-icon" icon={faSignOutAlt} />
					<p>Log Out</p>
				</div>
			)
		}

		return (
			<div className="sidebar d-none d-sm-block">
				{ menuItems }
			</div>
		)
	}
}

export default withRouter(Sidebar);
