import React from 'react';
import PersistentDrawerLeft from './Components/PersistentDrawerLeft';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {Redirect} from 'react-router-dom';
import { Typography } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from '@material-ui/core/Avatar';
import {Link } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';



const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class login extends React.Component {

  state = {
    age: '',
    logged_in:false,
    username: '',
    password:'',
    teacherId:'',
    open: false,
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  componentDidMount() {
  }

   handle_login = async (e) => {
    e.preventDefault();
   const res=await fetch('https://wizdem.pythonanywhere.com/Attendance/login-teacher/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      // mode: 'no-cors',
      body: JSON.stringify({
        teacherId: this.state.teacherId,
        password: this.state.password,
      })
    })
    if(res.status === 500){
      this.setState({
        open:true
      })
    }
    const data = await res.json();
    if(res.status === 200){
      localStorage.setItem('token',data.token);
      this.setState({
        logged_in:true,
      });
    }
  };

  handle_logout = () => {
    localStorage.removeItem('token');
    this.setState({ logged_in: false, teacherId: '' });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.main} >
        <PersistentDrawerLeft />
        <Paper className={classes.paper}>
        
        <Avatar className={classes.avatar}>
         <LockOutlinedIcon />
       </Avatar>
       <Typography component="h1" variant="h5">
         Sign In
       </Typography>
       <form  autoComplete="off"  onSubmit = {this.handle_login}>
        <FormControl margin="normal" required fullWidth>
           <InputLabel htmlFor="email">Teacher Id</InputLabel>
           <Input id="name" name="teacherId" autoComplete="email" autoFocus value={this.state.name} onChange={this.handleChange}/>
         </FormControl>
         <FormControl margin="normal" required fullWidth>
           <InputLabel htmlFor="password">Password</InputLabel>
           <Input name="password" type="password" id="password" value={this.state.password} onChange={this.handleChange} autoComplete="current-password" />
         </FormControl>
         <Button
           type="submit"
           fullWidth
           variant="contained"
           color="primary"
           className={classes.submit}
           onClick={this.handle_login}
         >
           Sign In
         </Button>
        </form>
        <Typography variant="h6" style={{marginTop:10, textAlign:'center'}}>Don't have an account? <br /><Link to="/teacher" style={{textDecoration:'none'}}>Sign Up</Link></Typography>
        </Paper>
        {this.state.logged_in && <Redirect to={{pathname:'/teachermain',state:this.state.teacherId,logged_in:this.state.logged_in}} />}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
         
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Incorrect Teacher ID and Password. Please Try Again.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
login.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(login);

