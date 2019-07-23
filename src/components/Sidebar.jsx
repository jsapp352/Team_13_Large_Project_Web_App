import React from "react";
// import { Redirect } from 'react-router-dom';
import { LinkContainer } from "react-router-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faUsers, faChartBar, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
// import Login from "../layouts/Login";

class Sidebar extends React.Component {	
	
	handleLogout = () => {
		localStorage.removeItem("isAuth");
		// Redirect to Login page somehow!!
	}

	render() {
		const user = this.props.userType;
		const menuItems = [];
		
		if (user === 'admin') {
			// menuItems.push()
			menuItems.length = 0;
		}
		else if (user === 'teacher') {
			menuItems.length = 0;
			menuItems.push(
				<>
					<LinkContainer to="/courses">
						<div className="menu-item">
							<FontAwesomeIcon className="menu-icon" icon={faBook} />
							<p>Courses</p>
						</div>
					</LinkContainer>
					<div className="line"/>
				</>
			)			
			menuItems.push(
				<>
					<LinkContainer to="/tas">
						<div className="menu-item">
							<FontAwesomeIcon className="menu-icon" icon={faUsers} />
							<p>Teaching Assistants</p>
						</div>
					</LinkContainer>
					<div className="line"/>
				</>
			)			
			menuItems.push(
				<>
					<LinkContainer to="/stats">
						<div className="menu-item">
							<FontAwesomeIcon className="menu-icon" icon={faChartBar} />
							<p>Statistics</p>
						</div>
					</LinkContainer>
					<div className="line"/>
				</>
			)
		}
		else if (user === 'assistant') {
			menuItems.length = 0;
			menuItems.push(
				<>
					<LinkContainer to="/stats">
						<div className="menu-item">
							<FontAwesomeIcon className="menu-icon" icon={faChartBar} />
							<p>Statistics</p>
						</div>
					</LinkContainer>
					<div className="line"/>
				</>
			)
		}

		return (
			<div className="sidebar d-none d-sm-block">
				{ menuItems }

				<div className="menu-item" onClick={this.handleLogout}>
					<FontAwesomeIcon className="menu-icon" icon={faSignOutAlt} />
					<p>Log Out</p>
				</div>
			</div>
		)
	}
}

export default Sidebar;