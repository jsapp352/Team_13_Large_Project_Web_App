import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faUsers, faChartBar, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

class Sidebar extends React.Component {	
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
			<div className="sidebar">
				{menuItems}
				<LinkContainer to="/logout">
					<div className="menu-item">
						<FontAwesomeIcon className="menu-icon" icon={faSignOutAlt} />
						<p>Log Out</p>
					</div>
				</LinkContainer>
			</div>
		)
	}
}

// <LinkContainer to="/courses">
// 	<div className="menu-item">
// 		<FontAwesomeIcon className="menu-icon" icon={faBook} />
// 		<p>Courses</p>
// 	</div>
// </LinkContainer>
// <div className="line"/>

// <LinkContainer to="/tas">
// 	<div className="menu-item">
// 		<FontAwesomeIcon className="menu-icon" icon={faUsers} />
// 		<p>Teaching Assistants</p>
// 	</div>
// </LinkContainer>
// <div className="line"/>

// <LinkContainer to="/stats">
// 	<div className="menu-item">
// 		<FontAwesomeIcon className="menu-icon" icon={faChartBar} />
// 		<p>Statistics</p>
// 	</div>
// </LinkContainer>

export default Sidebar;