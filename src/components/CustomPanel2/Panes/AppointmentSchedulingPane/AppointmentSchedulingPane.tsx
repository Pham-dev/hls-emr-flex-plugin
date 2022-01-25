import { EDUCATION } from "../../../constants";
import PaneHeader from "../PaneHeader/PaneHeader";
import { AppointmentSchedulingPaneStyles } from "./AppointmentSchedulingPane.Styles";

interface AppointmentSchedulingPaneProps {
  skill: string;
}

const AppointmentSchedulingPane = ({ skill }: AppointmentSchedulingPaneProps) => {
  return (
    <AppointmentSchedulingPaneStyles> 
      <PaneHeader text={skill === EDUCATION ? "Care Information" : "Appointment Scheduling"}/>
      <div className="open-emr">
        <iframe className="open-emr"  src="http://localhost/interface/login/login.php?site=default" allow="fullscreen"></iframe>
      </div>
    </AppointmentSchedulingPaneStyles>

  );
}

AppointmentSchedulingPane.displayName = 'OpenEMR';

export default AppointmentSchedulingPane;
