
import React from 'react';
import AppointmentSchedulingPane from './AppointmentSchedulingPane/AppointmentSchedulingPane';

// It is recommended to keep components stateless and use redux for managing states
const CustomCRMContainer = ({}) => {
  return (
      <div className='grid-four'>
        <AppointmentSchedulingPane/>
      </div>
  );
};

CustomCRMContainer.displayName = 'CustomCRMContainer';

// CustomCRMContainer.propTypes = {
//   isOpen: PropTypes.bool.isRequired,
//   dismissBar: PropTypes.func.isRequired,
// };

export default CustomCRMContainer;