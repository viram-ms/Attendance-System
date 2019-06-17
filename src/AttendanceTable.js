import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import "react-datepicker/dist/react-datepicker.css";
import Datepicker from './Components/Datepicker';
import PersistentDrawerLeft from './Components/PersistentDrawerLeft';
import CustomizedTable from "./Components/CustomizedTable";
import Button from '@material-ui/core/Button';

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import Grid from '@material-ui/core/Grid';
import { CsvDownload } from 'react-json-to-csv';

var Save_as = require('file-saver');

const styles = theme => ({ 
  spacing : {
    padding:'25px 50px',
    [theme.breakpoints.down("sm")]: {
      padding: 10,
      margin: 'auto'
    }
  }
})
 
class AttendanceTable extends React.Component {

  state={
    startDate: new Date(),
    formattedDate:'',
    attendance:[]
  }
  handleChange = (date) => {
    this.setState({
      startDate: date,
     
    });

  }

  updateChange = async (event) => {
    event.preventDefault();
    var completeDate=this.state.startDate;
    var date=completeDate.getDate();
    var month =completeDate.getMonth()+1;
    var year = completeDate.getFullYear();
    
        
        const formattedDate = date + "-" + month + "-" + year;
        await this.setState({
          formattedDate
        });

        const res=await fetch(`https://wizdem.pythonanywhere.com/Attendance/get-attendance-of-day/${this.props.location.state.name}/${this.props.location.state.div}/${this.state.formattedDate}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization': `Token ${localStorage.getItem('token')}`,
          },
          // mode: 'no-cors',
        })
        
        const data = await res.json();
        console.log(data);
    
        if(res.status === 200){
          this.setState({
            attendance:data.attendance
          })          
      }
  }

  async componentDidMount(){
    console.log(this.state.startDate);
    var completeDate=this.state.startDate;
    var date=completeDate.getDate();
    var month =completeDate.getMonth()+1;
    var year = completeDate.getFullYear();
    
        const formatdDate = date + "-" + month + "-" + year;
        await this.setState({
          formattedDate:formatdDate
        })
    
    const res=await fetch(`https://wizdem.pythonanywhere.com/Attendance/get-attendance-of-day/${this.props.location.state.name}/${this.props.location.state.div}/${this.state.formattedDate}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': `Token ${localStorage.getItem('token')}`,
      },
      // mode: 'no-cors',
    })
    
    const data = await res.json();
    if(res.status === 200){
      this.setState({
        attendance:data.attendance
      })
  }
}
    
  render() {
    const { classes } = this.props;
   
    return (
        <div>
            <PersistentDrawerLeft />
          <Grid container>

           
            <Grid item md={12} lg={8} className={classes.spacing}>
            <CustomizedTable attendance={this.state.attendance} subject={this.props.location.state.name}/>
            </Grid>
            <Grid item md={12} lg={2} className={classes.spacing}>
            <Datepicker startDate={this.state.startDate} handleChange={this.handleChange} updateChange={this.updateChange}/>

            </Grid>
            <Grid item md={12} lg={2} className={classes.spacing}>
            <Button variant="contained" color="primary" onClick={this.updateChange} className={classes.button}> Submit</Button>

            </Grid>

          </Grid>
          
           
        
        </div>
    );
  }
}

AttendanceTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AttendanceTable);

