import React from 'react';
import PersistentDrawerLeft from './Components/PersistentDrawerLeft';
import {Grid , Paper , Typography, TextField, Button, MenuItem, Select, InputLabel, FormControl} from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {Redirect} from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from '@material-ui/core/Avatar';
import {Link} from 'react-router-dom';
const styles = theme => ({
  root: {
    margin:'auto',
    maxWidth:550,
    height:'100vh',
    flexWrap: 'wrap',
    textAlign:'center',
    // [theme.breakpoints.down('md')]:{
    //   width:'100%'
    // }
  },
  Grid: {
    padding: theme.spacing.unit ,
    textAlign: 'center',
  },
  text: {
    color: 'black',
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.primary.main,
  },
  button: {
    margin: 20,
    padding: 2,
    height: 50,
    width: 300,

  },
  paper: {
    padding:15,
    alignItems:'center'
    
    
   },
});


class Teacher extends React.Component{
  state={
    age: '',
    fname:'',
    lname:'',
    password:'',
    spec:'',
    teacherId:'',
    signup:false
  }



  handleSubmit = async (e) => {
    e.preventDefault();
    
    const res=await fetch('https://wizdem.pythonanywhere.com/Attendance/signup-teacher/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      // mode: 'no-cors',
      body: JSON.stringify({
        fname: this.state.fname,
        lname:this.state.lname,
        spec:this.state.spec,
        teacherId:this.state.teacherId,
        password: this.state.password,
      })
    })
    
    const data = await res.json();
    

    if(res.status === 200){
      localStorage.setItem('token',data.token);

     
      this.setState({
        signup:true
      });

    }
  
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    
  };
  
  render(){
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <PersistentDrawerLeft />
        <Paper className={classes.paper}>
        <Avatar className={classes.avatar} align="center" style={{margin:'auto',marginBottom:15}}>
         <LockOutlinedIcon />
       </Avatar>
       <Typography component="h1" variant="h5">
         Sign Up
       </Typography>
        <Grid container spacing={12} >
          <Grid item xs> 
          </Grid>
          <Grid item xs>
          
            <div>
              <form autoComplete="off">
                <Grid container>
                  <Grid item xs={12}>
                    <TextField
                    name="fname"
                    id="outlined-name"
                    label="First Name"
                    value={this.state.fname}
                    onChange={this.handleChange}
                    margin="normal"
                    autoFocus
                    fullWidth />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                    name="lname"
                    id="outlined-name"
                    label="Last Name"
                    value={this.state.lname}
                    onChange={this.handleChange}
                    margin="normal"
                    
                    fullWidth />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="password"
                      id="outlined-name"
                      label="Password"
                      type="password"
                      value={this.state.password}
                      onChange={this.handleChange}
                      margin="normal"
                      
                      fullWidth />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="spec"
                      id="outlined-name"
                      label="Specialisation"
                      value={this.state.spec}
                      onChange={this.handleChange}
                      margin="normal"
                      
                      fullWidth />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                    name="teacherId"
                      id="outlined-name"
                      label="Teacher-ID"
                      value={this.state.teacherId}
                      onChange={this.handleChange}
                      margin="normal"
                      
                      fullWidth />
                  </Grid>

                 
                 
                </Grid>
              </form>
              <div>
                <Button variant="contained" color="primary"  className={classes.button} onClick={this.handleSubmit}>Submit</Button>
              </div>
            </div>
          </Grid>
          <Grid item xs>
          </Grid>
        </Grid>
        <Typography variant="h6" style={{marginTop:10}}>Already have an account? <Link to="/" style={{textDecoration:'none'}}>Sign In</Link></Typography>

        </Paper>
        {this.state.signup && <Redirect to="/teachermain" />}
        
      </div>
    );
  }
}

Teacher.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Teacher);