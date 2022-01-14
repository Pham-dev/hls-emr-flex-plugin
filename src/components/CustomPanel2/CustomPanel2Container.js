import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CustomPanel2 from './CustomPanel2';

// Use Redux to attach these states to the component
const mapStateToProps = (state) => ({
  isOpen: state['hls-emr'].customTaskList.isOpen,
});

// Just matches the Dispatch which is the action to perform on the component
const mapDispatchToProps = (dispatch) => ({
  
});

// Sends back the CustomPanel2 Component with State
export default connect(mapStateToProps, mapDispatchToProps)(CustomPanel2);