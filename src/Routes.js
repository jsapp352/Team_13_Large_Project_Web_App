import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./layouts/Login";
import InstructorView from './layouts/Instructor.jsx';
import TAView from './layouts/TA.jsx';
import AdminView from './layouts/Admin.jsx';
import NotFound from "./layouts/NotFound.jsx";
import AppliedRoute from "./components/AppliedRoute";
import Queue from "./layouts/Queue.jsx";
import InactiveInstructors from './components/InactiveInstructors'

class Routes extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: '',
            path: ''
        }
    }
    componentDidMount() {
        this.setState({loggedIn: (localStorage.getItem("isAuth") === 'true')});
        const path = '/' + localStorage.getItem("userType");
        this.setState({path: path});
    }

    render() {
        const childProps = this.props.childProps;
        const validPaths = ['/', '/courses', '/tas', '/stats', '/ta-stats', '/instructors', 'inactive'];
        const currentPath = window.location.pathname;
        const isValid = validPaths.indexOf(currentPath) > -1;
        const redirectToLogin = (!(localStorage.getItem("isAuth") === 'true')) ? (<Redirect to="/" />) : (<Redirect to={this.state.path} />);

        return(
            <Switch>
                {/* Home route */}
                { !(this.state.loggedIn) && <AppliedRoute exact path="/" component={Login} props={childProps} /> }

                {/* Routes for Instructor layout */}
                { (this.state.loggedIn) && <AppliedRoute path="/courses" component={InstructorView} props={childProps} /> }
                { (this.state.loggedIn) && <AppliedRoute path="/tas" component={InstructorView} props={childProps} /> }
                { (this.state.loggedIn) && <AppliedRoute path="/stats" component={InstructorView} props={childProps} /> }

                {/* Routes for TA layout */}
                { (this.state.loggedIn) &&  <AppliedRoute path="/ta-courses" component={TAView} props={childProps} /> }

                {/* Routes for Admin layout */}
                { (this.state.loggedIn) &&  <AppliedRoute path="/instructors" component={AdminView} props={childProps} /> }
            
                { (this.state.loggedIn) &&  <AppliedRoute path="/inactive" component={AdminView} props={childProps} /> }
                    
                
                <AppliedRoute path="/queue" component={Queue} props={childProps} />

                {/* Redirects user type to first element in sidebar */}
                <Redirect from="/(admin|admins)" to="/instructors" />
                <Redirect from="/(teacher|teachers)" to="/courses" />
                <Redirect from="/(assistant|assistants)" to="/ta-courses" />
                <Redirect from="/login" to="/" />

                { isValid && redirectToLogin }

                {/* No matching path leads to "Not Found" page */}
                <Route component={NotFound} />
            </Switch>
        )
    }
}

export default Routes;
