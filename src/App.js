import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,

} from 'react-router-dom';
import Subject from './Subject';
import Student from './Student';
import Teacher from './Teacher';
import AttendanceTable from './AttendanceTable';
import AttendanceTableRange from './AttendanceTableRange';

import AttendanceStudent from './AttendaceStudent';
import Teachermain from './Teachermain';
import login from './login';
import AttendForDate from './AttendForDate';
import StudentAttend from './StudentAttend';
import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import EditPage from './EditPage';
import {ProtectedRoute} from './ProtectRoute';

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green,
  },
  status: {
    danger: 'orange',
  },
});

class App extends Component {
  render() {
    return (
      <Router>
         <div>
       {/* <PersistentDrawerLeft /> */}
        
      <Switch>
        <Route exact path="/" component={login} />

        <ProtectedRoute exact path="/student" component={Student} />
        <ProtectedRoute exact path="/teacher" component={Teacher} />
        <ProtectedRoute exact path="/subject" component={Subject} />
        <ProtectedRoute exact path="/attendanceTable/:div" component={AttendanceTable} />
        <ProtectedRoute exact path="/attendanceTable/range/:div" component={AttendanceTableRange} />

        <ProtectedRoute exact path="/editTable/:div" component={EditPage} />

        {/* <Route exact path="/student/:id" component={AttendanceStudent} /> */}
        <ProtectedRoute exact path="/teachermain" component={Teachermain} />
        <ProtectedRoute exact path="/attendfordate" component={AttendForDate} />
        <ProtectedRoute exact path="/Student/:id" component={StudentAttend} />
        <ProtectedRoute exact path="/EditPage" component={EditPage} />
      </Switch>
      </div>
      </Router>     
    );
  }
}

export default App;
