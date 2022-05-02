import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ACTION_FETCHING_FIHR, TaskActions } from "../../states/TaskState";
import { Actions } from "../../states/CustomPanel2State";
import CustomPanel2 from "./CustomPanel2";

// Use Redux to attach these states to the component
const mapStateToProps = (state) => ({
  accessTokenInfo: state["hls-emr"].taskState.accessTokenInfo,
  clientId: state["hls-emr"].taskState.clientId,
  patientInfo: state["hls-emr"].taskState.patientInfo,
  isFihrRequestPending: state["hls-emr"].taskState.fetching,
  shouldShowPanel: state["hls-emr"].customPanel2.shouldShowPanel,
  shouldShowTelehealth: state["hls-emr"].videoButton.shouldShowTelehealth,
});

// Just matches the Dispatch which is the action to perform on the component
const mapDispatchToProps = (dispatch) => ({
  fetchingFihrData: bindActionCreators(TaskActions.fetchingFihrData, dispatch),
  fetchingFihrDataSuccess: bindActionCreators(
    TaskActions.fetchingFihrDataSuccess,
    dispatch
  ),
  fetchingFihrDataFailure: bindActionCreators(
    TaskActions.fetchingFihrDataFailure,
    dispatch
  ),
  togglePanel: bindActionCreators(Actions.togglePanel, dispatch),
});

// Sends back the CustomPanel2 Component with State
export default connect(mapStateToProps, mapDispatchToProps)(CustomPanel2);
