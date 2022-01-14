import PaneHeader from "../PaneHeader/PaneHeader";
import { PatientInformationPaneContainerStyles, PatientInformationPaneBodyStyles } from "./PatientInformationPane.Styles";

interface PatientInformationPaneProps {
  className?: string;
}

const PatientInformationPane = ({className = ''}: PatientInformationPaneProps) => {
  return (
    <div>
      <PaneHeader text="Patient Information"/>
      <PatientInformationPaneBodyStyles>
        <div className="patient-name"><strong>{"Name:"}</strong> Mary Ann Doe</div>
        <ul className="patient-info">
          <li className="patient-list-item"><strong>Phone Number: </strong>256-123-4567{" "}</li>
          <li className="patient-list-item"><strong>Email: </strong><a>mdoe@gmail.com </a></li>
          <li className="patient-list-item"><strong>MRN: </strong>12-34-56 </li>
          <li className="patient-list-item"><strong>Address: </strong>123 Panorama Drive Broomfield CO 80020 </li>
        </ul>
      </PatientInformationPaneBodyStyles>
    </div>
  )
}

export default PatientInformationPane;
