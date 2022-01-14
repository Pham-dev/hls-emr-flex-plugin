import PaneHeader from "../PaneHeader/PaneHeader";
import { PatientInteractionPaneStyles } from "./PatientInteractionPane.Styles";

interface PatientInteractionPaneProps {

}

const PatientInteractionPane = ({}: PatientInteractionPaneProps) => {
  return (
    <div>
      <PaneHeader text="Interaction Details"/>
      <PatientInteractionPaneStyles>
        <ul>
          <li className="interaction">
            <span>{"💬  01/05/2022"}{" 08:32 am"}<br/></span>
            <span>{"Website Chatbot triage"}</span>
          </li>
          <li className="interaction">
            <span>{"💬  01/05/2022"}{" 08:34 am"}<br/></span>
            <span>{"Chat with Scheduler"}</span>
          </li>
          <li className="interaction">
            <span>{"🎥  01/05/2022"}{" 08:49 am"}<br/></span>
            <span>{"Video with Nurse Educator"}<br/></span>
            <span><strong>{"Current"}</strong></span>
          </li>
        </ul>
      </PatientInteractionPaneStyles>
    </div>
  );
}

export default PatientInteractionPane;
