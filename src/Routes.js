import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./layouts/Login";
import InstructorView from './layouts/Instructor.jsx';
import TAView from './layouts/TA.jsx';
import AdminView from './layouts/Admin.jsx';
import NotFound from "./layouts/NotFound.jsx";
import AppliedRoute from "./components/AppliedRoute";
import Queue from "./layouts/Queue.jsx";


// const loggedIn = true;// (localStorage.getItem("isAuth") === 'true');
// const path = '/' + localStorage.getItem("userType");

// const validPaths = ['/', '/courses', '/tas', '/stats', '/ta-stats', '/instructors'];
// const currentPath = window.location.pathname;
// const isValid = validPaths.indexOf(currentPath) > -1;

// const redirectToLogin = (!(localStorage.getItem("isAuth") === 'true')) ? (<Redirect to="/" />) : (<Redirect to={path} />);

export default ({childProps}) => 
	<Switch>
		{/* Home route */}
    	<AppliedRoute exact path="/" component={Login} props={childProps} />

    	{/* Routes for Instructor layout */}
    	<AppliedRoute path="/courses" component={InstructorView} props={childProps} />
	    <AppliedRoute path="/tas" component={InstructorView} props={childProps} />
	    <AppliedRoute path="/stats" component={InstructorView} props={childProps} />

    	{/* Routes for TA layout */}
    	<AppliedRoute path="/ta-stats" component={TAView} props={childProps} />

    	{/* Routes for Admin layout */}
    	<AppliedRoute path="/instructors" component={AdminView} props={childProps} />

    	<AppliedRoute path="/queue" component={Queue} props={childProps} />

    	{/* Redirects user type to first element in sidebar */}

    	<Redirect from="/(admin|admins)" to="/instructors" />
    	<Redirect from="/(teacher|teachers)" to="/courses" />
    	<Redirect from="/(assistant|assistants)" to="/ta-stats" />

   		{/* No matching path leads to "Not Found" page */}
		<Route component={NotFound} />
  	</Switch>;

// export default ({childProps}) => 
// 	<Switch>
// 		{/* Home route */}
//     	{ !(localStorage.getItem("isAuth") === 'true') && <AppliedRoute exact path="/" component={Login} props={childProps} /> }

//     	{/* Routes for Instructor layout */}
//     	{ (localStorage.getItem("isAuth") === 'true') && <AppliedRoute path="/courses" component={InstructorView} props={childProps} /> }
// 	    { (localStorage.getItem("isAuth") === 'true') && <AppliedRoute path="/tas" component={InstructorView} props={childProps} /> }
// 	    { (localStorage.getItem("isAuth") === 'true') && <AppliedRoute path="/stats" component={InstructorView} props={childProps} /> }

//     	{/* Routes for TA layout */}
//     	{ (localStorage.getItem("isAuth") === 'true') &&  <AppliedRoute path="/ta-stats" component={TAView} props={childProps} /> }

//     	{/* Routes for Admin layout */}
//     	{ (localStorage.getItem("isAuth") === 'true') &&  <AppliedRoute path="/instructors" component={AdminView} props={childProps} /> }

//     	{/* Redirects user type to first element in sidebar */}

//     	<Redirect from="/(admin|admins)" to="/instructors" />
//     	<Redirect from="/(teacher|teachers)" to="/courses" />
//     	<Redirect from="/(assistant|assistants)" to="/ta-stats" />

// 		{ isValid && redirectToLogin }

//    		{/* No matching path leads to "Not Found" page */}
// 		<Route component={NotFound} />
//   	</Switch>;