import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Paper, Grid, Link } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import PersistentDrawerLeft from './Components/PersistentDrawerLeft';
import Checkbox from '@material-ui/core/Checkbox';
import Datepicker from './Components/Datepicker';
import Button from '@material-ui/core/Button';


const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 20,
  },
  body: {
    fontSize: 16,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 300,
    
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
  red: {
    color:  'red',
  },
  green: {
    color: 'green',
  },
 
 
});

let id = 0;
function createData(Sap_id,Name,p_a){
  id += 1;
  return { Sap_id, Name,p_a };
}

const rows = [
  createData('60004170103', 'Shail Shah',1),
  createData('60004170122', 'Viram Shah',0),
  createData('60004170084', 'Priya Shah',1),
  createData('60004170073', 'Nirav Jain',0),
  createData('60004170083', 'Preet Soni',1),
];

class EditPage extends React.Component {

    state = {
      message:'',
      startDate: new Date(),
    formattedDate:'',
      check: true,
      uncheck: false,
      students:[
        {Sap_id: "60004170103", Name: "Shail Shah", p_a: 1},
        {Sap_id: "60004170122", Name: "Viram Shah", p_a: 0},
        {Sap_id: "60004170084", Name: "Priya Shah", p_a: 1}
      ],
      attendance:[],
      attendance_list:[]
    }

    handleSubmit = async (event) =>{
      event.preventDefault();
      
      var completeDate=this.state.startDate;
      var date=completeDate.getDate();
      var month =completeDate.getMonth()+1;
      var year = completeDate.getFullYear();
      
          const formatdDate = date + "-" + month + "-" + year;
          await this.setState({
            formattedDate:formatdDate
          })

          let postData = {attendance_list:[{time:this.state.attendance[0].time,attendance_list:this.state.attendance_list}]}
          const formData = new FormData();
          formData.append('attendance',JSON.stringify(postData));
          // formData.append('viram','viram');
      const res=await fetch(`https://wizdem.pythonanywhere.com/Attendance/edit-attendance-of-day/${this.props.location.state.name}/${this.props.location.state.div}/${this.state.formattedDate}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'Authorization': `Token ${localStorage.getItem('token')}`,
        },
        body:JSON.stringify(postData)
       
        // mode: 'no-cors',
      })
      const data = await res.json();
      if(res){
        this.setState({
          message:data.success_message
        })
      if(res.status === 200){
        alert("Attendance Edited");
    }
    }
  }

   
    
    handleChangeCheck = (Sap_id,id) => event => {
      let studentsCopy = this.state.attendance[0].attendance_list;
      if(studentsCopy[id].attendance == 1){
        

        studentsCopy[id] = {...studentsCopy[id],attendance:0}
        this.setState({
          attendance_list:studentsCopy
        })

      }
      else{
        studentsCopy[id] = {...studentsCopy[id],attendance:1}
        this.setState({
          attendance_list:studentsCopy
        })
      }
        
        
      }
      handleChange = (date) => {
        this.setState({
          startDate: date,
         
        });
      }
  
    
      updateChange = async (event) => {
        event.preventDefault();
        var completeDate=this.state.startDate;
        this.setState({
          message:''
        })
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
            if(res.status === 200){
              this.setState({
                attendance:data.attendance
              })
        
          }
        }
    
      async componentDidMount(){
        
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
            attendance:data
          })
    
      }
    }
  
    render(){
        const { classes } = this.props;
        const {attendance,message} = this.state;
    

        return (
        <div>
            <PersistentDrawerLeft />
            <Grid container className={classes.table}>
            <Grid item xs={12}>{(attendance.length == 0) && <Typography variant="h6" style={{margin:10}}>No lecture today</Typography>}</Grid>
            {/* <Grid item xs={12}><Typography align='center' component="h2" variant="display3">Attendance for Date:</Typography></Grid> */}
            </Grid>
            <Grid container spacing={24} style={{padding: 12}}>
            
            <Grid item xs={12} sm={12} md={6} className={classes.attendTable}> 
                <Paper>
                <Table >
                    <TableHead>
                    <TableRow>
                        <CustomTableCell>SAP ID</CustomTableCell>
                        <CustomTableCell>Name</CustomTableCell>
                        {/* <CustomTableCell>Present/Absent</CustomTableCell> */}
                        <CustomTableCell>Edit</CustomTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    { attendance.length>0 && attendance[0].attendance_list.map((row,id) => (
                        <TableRow className={classes.row} key={row.id}>
                        <CustomTableCell component="th" scope="row">
                            {row.sapID}
                        </CustomTableCell>
                        <CustomTableCell>{row.name}</CustomTableCell>
                        {/* {
                            row.p_a.toLowerCase() == "present" ? <CustomTableCell className={classes.green}>{row.attendance}</CustomTableCell> : <CustomTableCell className={classes.red}>{row.p_a}</CustomTableCell>
                        } */}
                        <CustomTableCell component="th" scope="row">
                            <Checkbox
                            
                            checked={row.attendance == "1" ? true : false}
                            onChange={this.handleChangeCheck(row.Sap_id,id)}
                            value={row.Sap_id}
                            />
                        </CustomTableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={2}>
            <Datepicker  startDate={this.state.startDate} handleChange={this.handleChange} updateChange={this.updateChange}/>
            </Grid>
            <Grid item xs={12} sm={12} md={2}>
            <Button variant="contained" onClick={this.updateChange} color="primary" >Submit</Button>
              </Grid>
            <Grid item xs={12} sm={12} md={2}>
            <Button variant="contained" onClick={this.handleSubmit} color="primary" >Post Change</Button>
              </Grid>
              </Grid>
            {message.length > 0 && <Typography variant="h6" style={{margin:20}}>{message}</Typography>}
        </div>
        );
    }
}

EditPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditPage);