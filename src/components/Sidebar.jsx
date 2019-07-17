import React from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faUsers, faChartBar } from '@fortawesome/free-solid-svg-icons';

class Sidebar extends React.Component {
	render() {
		return (
			<div style={{padding: '20px 0', width: '140px', height: 'auto', backgroundColor: '#fff', boxShadow: '5px 5px 2px 1px rgba(200,200,200,1)'}}>
				<Link to="/courses">
					<div className="menu-item">
						<FontAwesomeIcon className="menu-icon" icon={faBook} />
						<p>Courses</p>
					</div>
				</Link>
				<div className="line"/>

				<Link to="/tas">
					<div className="menu-item">
						<FontAwesomeIcon className="menu-icon" icon={faUsers} />
						<p>Teaching Assistants</p>
					</div>
				</Link>
				<div className="line"/>

				<Link to="/stats">
					<div className="menu-item">
						<FontAwesomeIcon className="menu-icon" icon={faChartBar} />
						<p>Statistics</p>
					</div>
				</Link>
			</div>
		)
	}
}

export default Sidebar;