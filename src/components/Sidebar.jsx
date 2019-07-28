import React from "react";
import ReactDOM from "react-dom";
import { withRouter } from 'react-router-dom';
import { LinkContainer } from "react-router-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faUsers, faChartBar, faSignOutAlt, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import Login from "../layouts/Login";

class Sidebar extends React.Component {	
	
	handleLogout = () => {
		localStorage.removeItem("isAuth");
		this.props.history.push('/'); 
		ReactDOM.unmountComponentAtNode(document.getElementById('root'));
		ReactDOM.render(<Login />, document.getElementById('root'))
	}

	render() {
		const user = this.props.userType;
		const menuItems = [];
		
		if (user === 'any') {
			menuItems.length = 0;
			menuItems.push(
				<div key={1}>
					<LinkContainer to="/">
						<div className="menu-item">
							<FontAwesomeIcon className="menu-icon" icon={faSignInAlt} />
							<p>Login</p>
						</div>
					</LinkContainer>
					<div className="line"/>
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
			// menuItems.push(
			// 	<div key={4}>
			// 		<LinkContainer to="/stats">
			// 			<div className="menu-item">
			// 				<FontAwesomeIcon className="menu-icon" icon={faChartBar} />
			// 				<p>Statistics</p>
			// 			</div>
			// 		</LinkContainer>
			// 		<div className="line"/>
			// 	</div>
			// )
		}
		else if (user === 'assistant') {
			menuItems.length = 0;
			menuItems.push(
				<div key={5}>
					<LinkContainer to="/ta-stats">
						<div className="menu-item">
							<FontAwesomeIcon className="menu-icon" icon={faChartBar} />
							<p>Statistics</p>
						</div>
					</LinkContainer>
					<div className="line"/>
				</div>
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

export default withRouter(Sidebar);