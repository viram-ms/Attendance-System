import React from 'react';
import PersistentDrawerLeft from './Components/PersistentDrawerLeft';
import {Grid, TextField, Paper, Button, Typography} from '@material-ui/core';
import PropTypes from 'prop-types';
import {createMuiTheme ,MuiThemeProvider} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';


const theme=createMuiTheme({
    typography: {
        useNextVariants: true,
      },
   
}

);
const styles = theme => ({
  root: {
    margin:'auto',
    maxWidth:650,
    height:'100vh',
    flexWrap: 'wrap',
    textAlign:'center',
    // [theme.breakpoints.down('md')]:{
    //   width:'100%'
    // }
  },
  button: {
    padding: 20,
    margin: 20,
    width: 200,
    '&:hover': {
      backgroundColor: 'black',
    }
  },
    input: {
      display: 'none',
    },
    text: {
      color: 'black',
      paddingBottom:10
    },
    paper: {
      padding:25,
      
      
     },
     formControl: {
      width:200,
      fontSize:16
      
    },
  });

class Student extends React.Component{
    state={ 
      fname:'',
      lname:'',
      sap:'',
      div:'',
        }
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        
      };
    render(){
      const { classes } = this.props;
        return(
            <div className={classes.root}>
               <PersistentDrawerLeft /> 
               <Grid container justify="center" spacing={24}>
            <Grid item>
            <Paper className={classes.paper}>
            <div>
              <Typography component="h2" variant="h3" align="center"  gutterBottom className={classes.text}>STUDENT </Typography>
            </div>

            <form>
            <Grid container justify="center" spacing={24}>
            <Grid item xs={7}>
            <TextField
            name="fname"
            id="outlined-name"
            label="First Name"
            value={this.state.name}
            margin="normal"
            variant="outlined"
            onChange={this.handleChange}
            fullWidth />
            </Grid>
            {/* <Grid item xs={5}>
            </Grid>  */}
            <Grid item xs={7}>
            <TextField
            name="lname"
            id="outlined-name"
            label="Last Name"
            value={this.state.name}
            margin="normal"
            variant="outlined"
            onChange={this.handleChange}

            fullWidth />
            </Grid>
     
            <Grid item xs={7}>
            <TextField
            name="sap"
            id="outlined-name"
            label="Sap Id"
            value={this.state.name}
            margin="normal"
            variant="outlined"
            onChange={this.handleChange}

            fullWidth />
            </Grid>
            <Grid item xs={7}>

            <FormControl className={classes.formControl}>
          <Select
            value={this.state.div}
            onChange={this.handleChange}
            name="div"
            displayEmpty
            className={classes.selectEmpty}
          >
            <MenuItem value="" disabled>
              Division
            </MenuItem>
            <MenuItem value={'A'}>A</MenuItem>
            <MenuItem value={'B'}>B</MenuItem>
            
          </Select>
          
        </FormControl >
          
        </Grid>
            <Grid item xs={7}></Grid>
            <Grid item xs={6}>
          <Button variant="contained" color="primary" className={classes.button}>Submit</Button>
            </Grid>
    
            </Grid>
            </form>
            </Paper>  
            </Grid>
            </Grid>
            </div>
           
        );
    }
}
Student.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Student);

