import React from 'react';
import PropTypes from 'prop-types';
import { CustomPanel2Styles } from './CustomPanel2.Styles';
import PatientInformationPane from './Panes/PatientInformationPane/PatientInformationPane';
import CareManagementPane from './Panes/CareManagementPane/CareManagementPane';
import TelehealthPane from './Panes/TelehealthPane/TelehealthPane';
import { EDUCATION, SCHEDULING } from '../constants';
import { Grid } from '@material-ui/core';
import AppointmentSchedulingPane from './Panes/AppointmentSchedulingPane/AppointmentSchedulingPane';
import { withTaskContext } from '@twilio/flex-ui';
import NoTasksPanel2 from '../NoTasksPanel2/NoTasksPanel2';
import PatientInteractionPane from './Panes/PatientInteractionPane/PatientInteractionPane';
import PreventativeCarePane from './Panes/PreventativeCarePane/PreventativeCarePane';

const hasAssignedTask = (tasks) => {
  for (let task of tasks) {
    const value = task[1];
    if (value.taskStatus ==='assigned') return true;
  }
  return false;
}

// It is recommended to keep components stateless and use redux for managing states
const CustomPanel2 = (props) => {
  const workerSkills = props.flexInfo.skills;
  // console.log("props", props);
  const shouldShowTelehealth = process.env.REACT_APP_BACKEND_URL ? true : false;

  if (props && props.tasks.size && hasAssignedTask(props.tasks) && props.task && props.task.attributes) {
    const timeStamps = { date: props.task.dateCreated.toDateString(), time: props.task.dateCreated.toTimeString() };
    props.flex.TaskInfoPanel.Content.replace(<PatientInteractionPane key="PatientInteractionPane-component" timeStamps={timeStamps} workerSkill={workerSkills[0]}/>, { sortOrder: -1 });
    if (workerSkills[0] === EDUCATION) {
      return (
          <CustomPanel2Styles>
            {shouldShowTelehealth ? 
              <Grid container spacing={16} grid-auto-rows={"1fr"}>
                <Grid item xs={12} sm={4}><CareManagementPane/></Grid>
                <Grid item xs={12} sm={8}><PatientInformationPane patientName={props.task.attributes.name} skill={EDUCATION}/></Grid>
                <Grid item xs={12} sm={4}><TelehealthPane nurseName={props.flexInfo.full_name}/></Grid>
                <Grid item xs={12} sm={8}><AppointmentSchedulingPane skill={EDUCATION}/></Grid>
              </Grid> :
              <Grid container spacing={16} grid-auto-rows={"1fr"}>
                <Grid item xs={12} sm={4}><CareManagementPane/></Grid>
                <Grid item xs={12} sm={8}><PatientInformationPane patientName={props.task.attributes.name} skill={EDUCATION}/></Grid>
                <Grid item xs={12} sm={12}><AppointmentSchedulingPane skill={EDUCATION}/></Grid>
              </Grid> 
            }
            
          </CustomPanel2Styles>
      );
    } else if (workerSkills[0] === SCHEDULING) {
      return (
        <CustomPanel2Styles>
          <div className="flex-col">
            <div className="flex-row">
              <PatientInformationPane className="flex-item item1" patientName={props.task.attributes.name} skill={SCHEDULING}/>
              <PreventativeCarePane className="flex-item item2" />
            </div>
            <AppointmentSchedulingPane/>
          </div>
        </CustomPanel2Styles>      
      );
    } else {
      throw new Error("Unknown Worker Skill!");
    }
  } else {
    return <NoTasksPanel2/>;
  }
}

CustomPanel2.displayName = 'CustomPanel2';

CustomPanel2.propTypes = {
  shouldShowPanel: PropTypes.bool.isRequired,
  togglePanel: PropTypes.func.isRequired,
};

export default withTaskContext(CustomPanel2);