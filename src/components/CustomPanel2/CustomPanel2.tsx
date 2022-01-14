import React from 'react';
import PropTypes from 'prop-types';
import { CustomPanel2Styles } from './CustomPanel2.Styles';
import PatientInformationPane from './Panes/PatientInformationPane/PatientInformationPane';
import PatientInteractionPane from './Panes/PatientInteractionPane/PatientInteractionPane';
import AppointmentSchedulingPane from '../CustomCRMContainer/AppointmentSchedulingPane/AppointmentSchedulingPane';
import CareManagementPane from './Panes/CareManagementPane/CareManagementPane';
import TelehealthPane from './Panes/TelehealthPane/TelehealthPane';

// It is recommended to keep components stateless and use redux for managing states
const CustomPanel2 = ({}) => {
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
  );
};

CustomPanel2.displayName = 'CustomPanel2';

// CustomPanel2.propTypes = {
//   isOpen: PropTypes.bool.isRequired,
//   dismissBar: PropTypes.func.isRequired,
// };

export default CustomPanel2;