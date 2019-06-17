import React from 'react';
import Ttab from './Components/Ttab';
import PersistentDrawerLeft from './Components/PersistentDrawerLeft';
import Grid from '@material-ui/core/Grid';
class Teachermain extends React.Component{

    state = {
        class_subjects:[],
        division_they_are_class_teacher_of:'',
        taught_subjects:[]
    }
    async componentDidMount(){
        const res=await fetch(`https://wizdem.pythonanywhere.com/Attendance/dashboard-teacher/${this.props.location.state}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'X-Requested-With': 'XMLHttpRequest',
              'Authorization': `Token ${localStorage.getItem('token')}`,
            },
          })
          
          const data = await res.json();
          if(res.status === 200){
            const class_subjects = data.class_subjects;
            const taught_subjects = data.taught_subjects;
            const division_they_are_class_teacher_of = data.division_they_are_class_teacher_of;
            this.setState({
              logged_in:true,
              class_subjects,
              taught_subjects,
              division_they_are_class_teacher_of
      
            });
            
          }
    }
    render(){
        return(
        <div>
            <PersistentDrawerLeft  />
            <Grid container>
              <Grid item xs={12} sm={12} md={12} >
            <Ttab data={this.state}/>
              </Grid>
              </Grid>
            </div>
        );
    }

}



export default Teachermain;