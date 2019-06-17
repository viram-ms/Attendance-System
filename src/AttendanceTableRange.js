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
  },
  smallSpacing: {
    padding:'25px',
    [theme.breakpoints.down("sm")]: {
      padding: 10,
      margin: 'auto'
    }
  }
})
 
class AttendanceTableRange extends React.Component {

  state={
    startDate: new Date(),
    endDate: new Date(),
    formattedDatestart:'',
    formatdDateend:'',
    attendance:[]
  }
  handleChange = (date) => {
    this.setState({
      startDate: date,
    });
  }
  handleChangeEnd = (date) => {
      console.log(date);
    this.setState({
      endDate: date,
    });
  }

  updateChange = async (event) => {
    event.preventDefault();
    var startcompleteDate=this.state.startDate;
    var startdate=startcompleteDate.getDate();
    var startmonth =startcompleteDate.getMonth()+1;
    var startyear = startcompleteDate.getFullYear();

    var endcompleteDate=this.state.endDate;
    var enddate=endcompleteDate.getDate();
    var endmonth =endcompleteDate.getMonth()+1;
    var endyear = endcompleteDate.getFullYear();
    
        const formatdDatestart = startdate + "-" + startmonth + "-" + startyear;
        const formatdDateend = enddate + "-" + endmonth + "-" + endyear;

        await this.setState({
            formattedDatestart:formatdDatestart,
            formatdDateend: formatdDateend
        })

    const res=await fetch(`https://wizdem.pythonanywhere.com/Attendance/get-attendance-of-range/${this.props.location.state.name}/${this.props.location.state.div}/${this.state.formattedDatestart}/${this.state.formatdDateend}`, {
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
    
    var startcompleteDate=this.state.startDate;
    var startdate=startcompleteDate.getDate();
    var startmonth =startcompleteDate.getMonth()+1;
    var startyear = startcompleteDate.getFullYear();

    var endcompleteDate=this.state.endDate;
    var enddate=endcompleteDate.getDate();
    var endmonth =endcompleteDate.getMonth()+1;
    var endyear = endcompleteDate.getFullYear();
    const formatdDatestart = startdate + "-" + startmonth + "-" + startyear;
    const formatdDateend = enddate + "-" + endmonth + "-" + endyear;

    await this.setState({
        formattedDatestart:formatdDatestart,
        formatdDateend: formatdDateend
    })
    
    const res=await fetch(`https://wizdem.pythonanywhere.com/Attendance/get-attendance-of-range/${this.props.location.state.name}/${this.props.location.state.div}/${this.state.formattedDatestart}/${this.state.formatdDateend}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': `Token ${localStorage.getItem('token')}`,
      },
      // mode: 'no-cors',
    });
    console.log(res);
    
    const data = await res.json();
    console.log(data);
    

    if(res.status === 200){
      this.setState({
        attendance:data
      })
      
      

  }
}
    
  render() {
    const { classes } = this.props;
   
    return (
        <div>
            <PersistentDrawerLeft />
          <Grid container>

           
            <Grid item  xs={12} sm={12} md={12} lg={7} className={classes.spacing}>
            <CustomizedTable attendance={this.state.attendance} subject={this.props.location.state.name}/>
            </Grid>
            <Grid item  xs={12} sm={12} md={12} lg={2} className={classes.spacing}>
            <Datepicker startDate={this.state.startDate} handleChange={this.handleChange} updateChange={this.updateChange}/>

            </Grid>
            <Grid item  xs={12} sm={12} md={12} lg={2} className={classes.spacing}>
         
            <Datepicker startDate={this.state.endDate} handleChange={this.handleChangeEnd} updateChange={this.updateChange}/>
        </Grid>
            <Grid item xs={12} sm={12} md={12} lg={1} className={classes.smallSpacing}>
            <Button variant="contained" color="primary" onClick={this.updateChange} className={classes.button}> Submit</Button>

            </Grid>
          </Grid>
          
           
        
        </div>
    );
  }
}

AttendanceTableRange.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AttendanceTableRange);

