import { EDUCATION } from "../../../constants";
import { AppointmentSchedulingPaneStyles } from "./AppointmentSchedulingPane.Styles";
import React from "react";

interface AppointmentSchedulingPaneProps {
  skill: string;
}

function getNgrokBasePath() {
  if (process.env.REACT_APP_NGROK_URL) {
    if (process.env.REACT_APP_NGROK_URL.includes("localhost")) {
      return `http://${process.env.REACT_APP_NGROK_URL}`;
    } else {
      return `https://${process.env.REACT_APP_NGROK_URL}`;
    }
  } else {
    console.error("No REACT_APP_NGROK_URL set");
  }
}

const AppointmentSchedulingPane = ({
  skill,
}: AppointmentSchedulingPaneProps) => {
  return (
    <AppointmentSchedulingPaneStyles>
      <p className="title">
        {skill === EDUCATION ? "Care Information" : "Appointment Scheduling"}
      </p>
      <div className="open-emr">
        <iframe
          className="open-emr"
          src={`${getNgrokBasePath()}/interface/main/main_screen.php?auth=login&site=default`}
          allow="fullscreen"
        />{" "}
      </div>
    </AppointmentSchedulingPaneStyles>
  );
};

AppointmentSchedulingPane.displayName = "OpenEMR";

export default AppointmentSchedulingPane;
