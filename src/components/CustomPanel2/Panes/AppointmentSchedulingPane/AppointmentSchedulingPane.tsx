import { EDUCATION } from "../../../constants";
import { AppointmentSchedulingPaneStyles } from "./AppointmentSchedulingPane.Styles";
import React from "react";

interface AppointmentSchedulingPaneProps {
  skill: string;
}

const AppointmentSchedulingPane = ({ skill }: AppointmentSchedulingPaneProps) => {
  return (
    <AppointmentSchedulingPaneStyles> 
      <p className="title">{skill === EDUCATION ? "Care Information" : "Appointment Scheduling"}</p>
      <div className="open-emr">
        <iframe className="open-emr"  src="http://localhost/interface/login/login.php?site=default" allow="fullscreen"></iframe>
      </div>
    </AppointmentSchedulingPaneStyles>

  );
}

AppointmentSchedulingPane.displayName = 'OpenEMR';

export default AppointmentSchedulingPane;
