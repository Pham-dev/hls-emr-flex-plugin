import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { CustomPanel2Styles } from "./CustomPanel2.Styles";
import PatientInformationPane from "./Panes/PatientInformationPane/PatientInformationPane";
import CareManagementPane from "./Panes/CareManagementPane/CareManagementPane";
import TelehealthPane from "./Panes/TelehealthPane/TelehealthPane";
import {
  EDUCATION,
  INTAKE_BY_SCHEDULERS,
  SCHEDULING,
  TRANSFER_TO_NURSE_EDUCATOR,
} from "../constants";
import { Typography } from "@material-ui/core";
import AppointmentSchedulingPane from "./Panes/AppointmentSchedulingPane/AppointmentSchedulingPane";
import { withTaskContext } from "@twilio/flex-ui";
import NoTasksPanel2 from "../NoTasksPanel2/NoTasksPanel2";
import PatientInteractionPane from "./Panes/PatientInteractionPane/PatientInteractionPane";
import PreventativeCarePane from "./Panes/PreventativeCarePane/PreventativeCarePane";
import {
  getAccessTokenInfo,
  getClientId,
  getPatientInfoByName,
  getPatientByPhone,
} from "../../helpers";

const hasAssignedTask = (tasks) => {
  for (let task of tasks) {
    const value = task[1];
    if (value.taskStatus === "assigned") return true;
  }
  return false;
};

// It is recommended to keep components stateless and use redux for managing states
const CustomPanel2 = (props) => {
  useEffect(() => {
    if (props.task && props.task.attributes && props.task.attributes.name) {
      try {
        const nameOrPhone = props.task.attributes?.name;

        //The task must have an associated name!
        if (!nameOrPhone) throw new Error();

        props.fetchingFhirData();

        const Token = props.manager.user.token;
        const body = {
          Token,
        };

        (async () => {
          try {
            const client_id = await getClientId(body);

            //We must get a non null client_id
            if (!client_id) throw new Error();

            const access_token_info = await getAccessTokenInfo(
              client_id,
              Token
            );

            if (!access_token_info) throw new Error();

            var hasNumber = /\d/;
            if (hasNumber.test(nameOrPhone)) {
              //check if is phone number

              const patientResult = await getPatientByPhone(
                access_token_info.access_token,
                nameOrPhone,
                Token
              );

              const info = {
                accessTokenInfo: access_token_info,
                clientId: client_id,
                patientInfo: patientResult,
              };

              props.fetchingFhirDataSuccess(info);
            } else {
              const names = nameOrPhone.split(" ");
              const first_name = names[0];
              const last_name = names[names.length - 1];

              const patientResult = await getPatientInfoByName(
                access_token_info.access_token,
                first_name,
                last_name,
                Token
              );

              const info = {
                accessTokenInfo: access_token_info,
                clientId: client_id,
                patientInfo: patientResult,
              };

              props.fetchingFhirDataSuccess(info);
            }
          } catch (err) {
            console.log("FHIR FAILURE, USING DEFAULT");
            props.fetchingFhirDataFailure();
          }
        })();
      } catch (err) {
        console.log("FHIR FAILURE, USING DEFAULT");
        props.fetchingFhirDataFailure();
      }
    }
  }, [props.task]);

  const workerSkills = props.flexInfo.skills;
  const showTelehealth =
    props.manager.store.getState()["hls-emr"].videoButton.shouldShowTelehealth;
  const shouldShowTelehealth =
    process.env.REACT_APP_TELEHEALTH_URL && showTelehealth ? true : false;

  if (
    props &&
    props.tasks.size &&
    hasAssignedTask(props.tasks) &&
    props.task &&
    props.task.attributes &&
    props.task.workflowName
  ) {
    const timeStamps = {
      date: props.task.dateCreated.toDateString(),
      time: props.task.dateCreated.toTimeString(),
    };
    props.flex.TaskInfoPanel.Content.replace(
      <PatientInteractionPane
        key="PatientInteractionPane-component"
        timeStamps={timeStamps}
        workerSkill={workerSkills[0]}
      />,
      { sortOrder: -1 }
    );
    if (
      props.task.workflowName === TRANSFER_TO_NURSE_EDUCATOR &&
      workerSkills.includes(EDUCATION)
    ) {
      return (
        <CustomPanel2Styles>
          <div className="flex-col">
            <Typography className="patient-info" component={"h1"}>
              <strong>{props.task.attributes.name}</strong>
            </Typography>
            <div className="flex-row">
              <CareManagementPane manager={props.manager} />
              <PatientInformationPane
                name={props.task.attributes.name}
                patientInfo={props.patientInfo}
                pendingRequest={props.isFhirRequestPending}
                skill={EDUCATION}
              />
            </div>
            <div className="flex-row second-row">
              {shouldShowTelehealth && (
                <TelehealthPane nurseName={props.flexInfo.full_name} />
              )}
              <AppointmentSchedulingPane skill={EDUCATION} />
            </div>
          </div>
        </CustomPanel2Styles>
      );
    } else if (
      props.task.workflowName === INTAKE_BY_SCHEDULERS &&
      workerSkills.includes(SCHEDULING)
    ) {
      return (
        <CustomPanel2Styles>
          <div className="flex-col">
            <Typography className="patient-info" component={"h1"}>
              <strong>{props.task.attributes.name}</strong>
            </Typography>
            <div className="flex-row">
              <PatientInformationPane
                name={props.task.attributes.name}
                patientInfo={props.patientInfo}
                pendingRequest={props.isFhirRequestPending}
                skill={SCHEDULING}
              />
              <PreventativeCarePane />
            </div>
            <AppointmentSchedulingPane />
          </div>
        </CustomPanel2Styles>
      );
    } else {
      throw new Error("Unknown Worker Skill!");
    }
  } else {
    return <NoTasksPanel2 />;
  }
};

CustomPanel2.displayName = "CustomPanel2";

CustomPanel2.propTypes = {
  shouldShowPanel: PropTypes.bool.isRequired,
  togglePanel: PropTypes.func.isRequired,
};

export default withTaskContext(CustomPanel2);
