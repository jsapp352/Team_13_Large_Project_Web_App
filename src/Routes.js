import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./layouts/Login";
import InstructorView from './layouts/Instructor.jsx';
import TAView from './layouts/TA.jsx';
import NotFound from "./layouts/NotFound.jsx";
import AppliedRoute from "./components/AppliedRoute";

export default ({ childProps }) => 
	<Switch>
    	<AppliedRoute path="/" exact component={Login} props={childProps} />
    	<AppliedRoute path="/teachers" component={InstructorView} props={childProps} />
    	<AppliedRoute path="/assistants" component={TAView} props={childProps} />
    	<Route component={NotFound} />
  	</Switch>;
