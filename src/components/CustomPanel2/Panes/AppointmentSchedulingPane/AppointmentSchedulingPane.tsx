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
          <iframe className="open-emr" src="http://localhost/interface/main/main_screen.php?auth=login&site=default" allow="fullscreen"/>
      </div>
    </AppointmentSchedulingPaneStyles>

  );
}

AppointmentSchedulingPane.displayName = 'OpenEMR';

export default AppointmentSchedulingPane;
