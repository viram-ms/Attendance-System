import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 16,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    margin:'auto',
    ['@media (max-width:780px)']: { // eslint-disable-line no-useless-computed-key
        width: '100%!important'
      }
  },
  table: {
  minWidth:350, 
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
  red:{
    backgroundColor:'#f44336',
    color:'white',
    textAlign:'center!important'
  },
  green:{
    backgroundColor:'#00c853',
    color:'white',
    textAlign:'center!important'
  },
  tableCenter:{
    textAlign:'center!important',
    padding:'0px!important'
  }
  
  
});

let id = 0;
function createData(name, sap, percent) {
  id += 1;
  return { id, name, sap, percent };
}

// const rows = [
//   createData('Viram shah', 60004170122, 60),
//   createData('vishal shah', 60004170123, 80),
//   createData('Viraj shah', 60004170123, 74),
//   createData('yash shah', 60004170124, 85),
//   createData('vasu shah', 60004170125, 40)

// ];

class CustomizedTable extends React.Component {
state={
  attendance: ''
}

componentDidMount(){
  const {attendance} = this.props;
  this.setState({
    attendance
  });
  console.log(this.state);
}

componentDidUpdate(prevProps){
  if(prevProps.attendance !== this.props.attendance){
    this.setState({
      attendance: this.props.attendance
    })
  }
}

  

    render(){
        const { classes } = this.props;
        const {attendance} = this.state;
        return (
         <div>


<Paper className={classes.root}>

 {(attendance.length == 0) && <Typography variant="h6" align="center">No lecture today</Typography>}

 </Paper>   
 <Paper>
      
<Table className={classes.table}>
  <TableHead>
    <TableRow >
      <CustomTableCell  className={classes.tableCenter} style={{fontSize:'1rem'}}>Name</CustomTableCell>
      <CustomTableCell    className={classes.tableCenter} style={{fontSize:'1rem'}}>Sap ID</CustomTableCell>
      <CustomTableCell  className={classes.tableCenter} style={{fontSize:'1rem'}}>Attendance</CustomTableCell>
      <CustomTableCell  className={classes.tableCenter} style={{fontSize:'1rem'}}>Timing</CustomTableCell>

    
    </TableRow>
  </TableHead>
  <TableBody >
    {attendance.length>0 && attendance.map((item) => item.attendance_list.map(row => (

      <TableRow className={classes.row} key={row.id}>
        <CustomTableCell component="th" scope="row"  className={classes.tableCenter}>
      <Link to={ {pathname:`/student/$${row.sapID}`, subject:this.props.subject,sapID:row.sapID}} style={{textDecoration:'none',color:'black'}}>
     
          {row.name}
        </Link>
        </CustomTableCell>
        <CustomTableCell   className={classes.tableCenter} >{row.sapID}</CustomTableCell>
        {/* {
          row.percent > 75 ?  <CustomTableCell   className={classes.green} >{row.attendance}</CustomTableCell> :  <CustomTableCell className={classes.red}   >{row.percent}</CustomTableCell>
        } */}
        <CustomTableCell   className={classes.tableCenter} >{row.attendance}</CustomTableCell>
        <CustomTableCell   className={classes.tableCenter} >{item.time}</CustomTableCell>


       
    
      </TableRow>
    )))}
  </TableBody>
</Table>
</Paper>
</div>

            
          );

    }


 
}

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedTable);
