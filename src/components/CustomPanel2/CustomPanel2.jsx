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

  if (props.tasks.size && hasAssignedTask(props.tasks)) {
    if (workerSkills[0] === EDUCATION) {
      return (
          <CustomPanel2Styles>
            <Grid container spacing={8}>
              <Grid item xs={12} sm={6}><PatientInformationPane/></Grid>
              <Grid item xs={12} sm={6}><CareManagementPane/></Grid>
              <Grid item xs={12} sm={4}><TelehealthPane/></Grid>
              <Grid item xs={12} sm={8}><AppointmentSchedulingPane/></Grid>
            </Grid>
          </CustomPanel2Styles>
      );
    } else if (workerSkills[0] === SCHEDULING) {
      return (
        <CustomPanel2Styles>
          <Grid direction='column' container className="scheduler">
            <Grid item className="scheduler-panes"><PatientInformationPane/></Grid>
            <Grid item className="scheduler-panes"><AppointmentSchedulingPane/></Grid>
          </Grid>
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