import PaneHeader from "../../CustomPanel2/Panes/PaneHeader/PaneHeader";
import { AppointmentSchedulingPaneStyles } from "./AppointmentSchedulingPane.Styles";

interface AppointmentSchedulingPaneProps {

}

const AppointmentSchedulingPane = ({}: AppointmentSchedulingPaneProps) => {
  return (
    <AppointmentSchedulingPaneStyles> 
      <PaneHeader text="Appointment Scheduling"/>
      <div className="open-emr">
        <iframe className="open-emr"  src="http://localhost/interface/login/login.php?site=default" allow="fullscreen"></iframe>
      </div>
    </AppointmentSchedulingPaneStyles>

  );
}

AppointmentSchedulingPane.displayName = 'OpenEMR';

export default AppointmentSchedulingPane;
