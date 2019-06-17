import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import CardActions from '@material-ui/core/CardActions';

import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import VerticalAlignBottomIcon from '@material-ui/icons/VerticalAlignBottom';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Grid, Button, CardContent } from '@material-ui/core';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import CreateIcon from '@material-ui/icons/Create';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import {Link,Redirect} from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Datepicker from './Datepicker';
var Save_as = require('file-saver');

//import './style.css'

const styles = theme => ({

  card: {
    height: 225,
   

  },
  content: {
    padding: 2
  },
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },


});

class Mysubjectcard extends React.Component {
  state = { 
    expanded: false,
    open: false,
    openDownload: false,
    startDate: new Date(),
    endDate: new Date(),
    formattedDatestart:'',
    formatdDateend:''

  };

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

  Download = (subject, div) => async (event) => {
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

    const res=await fetch(`https://wizdem.pythonanywhere.com/Attendance/get_csv/${subject}/${div}/${this.state.formattedDatestart}/${this.state.formatdDateend}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization': `Token ${localStorage.getItem('token')}`,
          },
          responseType: 'blob',
        }).then(res => res.blob())
        .then(blob => Save_as(blob, 'test.csv'));
    console.log(res);

        
      //   const data = await res.json();
      //   console.log(data);
      //   if(res.status === 200){
      //     this.setState({
      //       attendance:data.attendance
      //     })          
      // }
    

  }
  handleOpen = () =>{
    this.setState({
      open: true
    })
  }

  handleClickDownload =()=>{
    this.setState({
      openDownload: true
    })
  }

  handleClose = () =>{
    this.setState({
      open: false
    })
  }

  handleCloseDownload = () =>{
    this.setState({
      openDownload: false
    })
  }
  

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };


    async handleClick(subject,div){
      //alert("heyyyy");
    const url = ``;
    const res1 = await fetch(url,{
      method: 'GET',
      headers: {
      'Content-Type': 'text/csv',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': `Token ${localStorage.getItem('token')}`,
    },
    responseType: 'blob',
    }).then(res => res.blob())
    .then(blob => Save_as(blob, 'test.csv'))
    console.log(res1);
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
      <Grid container spacing={16}>
      {this.props.taught_subjects.map((subject) => {
        return(
        <Grid item xs={12} sm={12} md={6}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h5" gutterBottom className={classes.content}><b>{subject.name}</b></Typography>
              <Typography variant="h6" gutterBottom className={classes.content}>Semester{subject.semester}</Typography>
              <Typography variant="title" gutterBottom className={classes.content}>{subject.subjectCode}</Typography>

            </CardContent>

            <CardActions disableActionSpacing style={{}}>
              <Button variant="contained" color="default" className={classes.button} onClick={this.handleClickDownload}>
              {/* onClick={this.handleClick.bind(this,subject.name,subject.div)} */}
                Download
                <CloudDownloadIcon className={classes.rightIcon} />
              </Button>

              <Dialog
                open={this.state.openDownload}
                onClose={this.handleCloseDownload}
                aria-labelledby="form-dialog-title"
                variant="outlined"
                style={{padding: 20}}
                >
       <div style={{display: 'flex'}}> 
       <DialogTitle id="form-dialog-title" style={{flexGrow: 1}}>
         SELECT Dates
         
       </DialogTitle>
       <Button  onClick={this.handleCloseDownload} color="primary" style={{padding:'10px'}}>
            close
          </Button>
         </div>
       
       <DialogActions>
         <Grid container spacing={24} style={{padding: 10}}>
           <Grid item xs={12} sm={12} md={4} >
       <Datepicker startDate={this.state.startDate} handleChange={this.handleChange}  />

           </Grid>
           <Grid item xs={12} sm={12} md={4}>
       <Datepicker startDate={this.state.endDate} handleChange={this.handleChangeEnd} />

           </Grid>
           <Grid item xs={12} sm={12} md={4}>
           <Button  onClick={this.Download(subject.name,subject.div)} color="primary" variant="contained" style={{padding:'10px'}}>
            Download
          </Button>
           </Grid>
           </Grid>

       
         
        </DialogActions>
     </Dialog>
              

             <Button variant="contained" color="default" className={classes.button} onClick={this.handleOpen}>
                View
              <RemoveRedEyeIcon className={classes.rightIcon} />
              </Button>
              <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
                >
       <div style={{display: 'flex'}}> 
       <DialogTitle id="form-dialog-title" style={{flexGrow: 1}}>
         SELECT VIEWS
         
       </DialogTitle>
       <Button  onClick={this.handleClose} color="primary" style={{padding:'10px'}}>
            close
          </Button>
         </div>
       
       <DialogActions>
       <Link to={{
                pathname:`/attendanceTable/${subject.div}`, state:subject}} style={{textDecoration:'none'}}><Button variant="contained" color="primary" className={classes.button}>
                View single date
        <RemoveRedEyeIcon className={classes.rightIcon} />
              </Button></Link>
              <Link to={{
                pathname:`/attendanceTable/range/${subject.div}`, state:subject}} style={{textDecoration:'none'}}><Button variant="contained" color="primary" className={classes.button}>
                View range date
        <RemoveRedEyeIcon className={classes.rightIcon} />
              </Button></Link>
         
        </DialogActions>
     </Dialog>

    
              <Link to={{
                pathname:`/editTable/${subject.div}`, state:subject}} style={{textDecoration:'none'}}><Button variant="contained" color="default" className={classes.button}>
                Edit
        <CreateIcon className={classes.rightIcon} />
              </Button></Link>
            </CardActions>
          </Card>
        </Grid>
)})}
        

      </Grid>
    
      </div>
    );
  }
}
Mysubjectcard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Mysubjectcard);