import React from 'react'

export default class SignIn extends React.Component
{
	constructor()
	{
		super();
		this.state = {
			admin: false,
			ta: false,
			student: false,
			logged_as_any_user: false,
		}
	}

	render()
	{
		return(<div></div>);
	}

}
