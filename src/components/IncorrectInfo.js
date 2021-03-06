import React from "react";
import { Button, Form } from 'react-bootstrap';

export default class IncorrectInfo extends React.Component {
	constructor(props) {
		super();
	
		this.state = {
			show: props.show
		}
	}

	render() {
		
		const showHideClassName =  this.props.show  ? "pop-outer display-block" : "d-none";		
		
		return (
			<div className={showHideClassName}> 
				<div className="pop-inner">
					<div className="modal-header">
						<h5 className="modal-title" style={{color: 'red'}}>Invalid Information</h5>
						<Button onClick={this.props.hideModal} type="button" className="close" aria-label="Close">
							<span aria-hidden="true">×</span>
						</Button>
					</div>
					<div className="modal-body">
						<div>
							You have entered an invalid username or password. <br/><br/>
							<span>Please try again.</span>
						</div>
					</div>
				</div>
			</div>
			
		);
	}
}
