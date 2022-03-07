import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from '../../states/CustomPanel2State';
import CustomPanel2 from './CustomPanel2';

// Use Redux to attach these states to the component
const mapStateToProps = (state) => ({
  shouldShowPanel: state['hls-emr'].customPanel2.shouldShowPanel,
  shouldShowTelehealth: state['hls-emr'].videoButton.shouldShowTelehealth
});

// Just matches the Dispatch which is the action to perform on the component
const mapDispatchToProps = (dispatch) => ({
  togglePanel: bindActionCreators(Actions.togglePanel, dispatch),
});

// Sends back the CustomPanel2 Component with State
export default connect(mapStateToProps, mapDispatchToProps)(CustomPanel2);