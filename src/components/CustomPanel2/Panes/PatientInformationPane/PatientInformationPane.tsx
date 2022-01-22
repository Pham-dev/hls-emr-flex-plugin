import { Typography } from "@material-ui/core";
import PaneHeader from "../PaneHeader/PaneHeader";
import { PatientInformationPaneBodyStyles } from "./PatientInformationPane.Styles";


const PatientInformationPane = ({patientName = ''}) => {
  console.log("PATIENT",patientName)
  return (
    <PatientInformationPaneBodyStyles>
      <PaneHeader text="Patient Information"/>
      <div className="information">
        <Typography className="patient-name" color={"secondary"} component={"h1"}><strong>{patientName}</strong></Typography>
        <ul className="patient-info">
          <li className="patient-list-item"><strong>{"Phone Number: "}</strong>256-123-4567</li>
          <li className="patient-list-item"><strong>{"Email: "}</strong><a>mdoe@gmail.com </a></li>
          <li className="patient-list-item"><strong>{"MRN: "}</strong>12-34-56 </li>
          <li className="patient-list-item"><strong>{"Address: "}</strong>123 Panorama Drive Broomfield CO 80020 </li>
        </ul>
      </div>
    </PatientInformationPaneBodyStyles>
  )
}

export default PatientInformationPane;
