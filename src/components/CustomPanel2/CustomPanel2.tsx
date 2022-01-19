import React from 'react';
import PropTypes from 'prop-types';
import { CustomPanel2Styles } from './CustomPanel2.Styles';
import PatientInformationPane from './Panes/PatientInformationPane/PatientInformationPane';
import PatientInteractionPane from './Panes/PatientInteractionPane/PatientInteractionPane';
import CareManagementPane from './Panes/CareManagementPane/CareManagementPane';
import TelehealthPane from './Panes/TelehealthPane/TelehealthPane';
import { FlexInfo } from '../Interface';
import { EDUCATION, SCHEDULING } from '../constants';
import { Grid } from '@material-ui/core';
import AppointmentSchedulingPane from '../CustomCRMContainer/AppointmentSchedulingPane/AppointmentSchedulingPane';

interface CustomPanel2Props {
  flexInfo: FlexInfo;
}

// It is recommended to keep components stateless and use redux for managing states
const CustomPanel2 = ({ flexInfo }: CustomPanel2Props) => {
  const workerSkills = flexInfo.skills;

  if (workerSkills[0] === EDUCATION) {
    return (
        <CustomPanel2Styles>
          <div className='container'>
            <div className='grid-one'>
              <PatientInteractionPane/>
            </div>
            <div className='grid-two'>
            <PatientInformationPane/>
            </div>
            <div className='grid-three'>
              <CareManagementPane/>
            </div>
            <div className='grid-four'>
              <TelehealthPane/>
            </div>
          </div>
        </CustomPanel2Styles>
        // interaction details
        // primary information
        // care management programs
        // patitent care information
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
  }
}

CustomPanel2.displayName = 'CustomPanel2';

// CustomPanel2.propTypes = {
//   isOpen: PropTypes.bool.isRequired,
//   dismissBar: PropTypes.func.isRequired,
// };

export default CustomPanel2;