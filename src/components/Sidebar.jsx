import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faUsers, faChartBar } from '@fortawesome/free-solid-svg-icons';

class Sidebar extends React.Component {
	render() {
		return (
			<div style={{padding: '20px 0', width: '140px', height: 'auto', backgroundColor: '#fff', boxShadow: '5px 5px 2px 1px rgba(200,200,200,1)'}}>
				<div className="menu-item"><FontAwesomeIcon className="menu-icon" icon={faBook} /><p>Courses</p></div>
				<div className="line"/>
				<div className="menu-item"><FontAwesomeIcon className="menu-icon" icon={faUsers} /><p>Teaching Assistants</p></div>
				<div className="line"/>
				<div className="menu-item"><FontAwesomeIcon className="menu-icon" icon={faChartBar} /><p>Statistics</p></div>
			</div>
		)
	}
}

export default Sidebar;