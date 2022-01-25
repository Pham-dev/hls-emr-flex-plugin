import { Typography, Divider } from "@material-ui/core";
import PaneHeader from "../PaneHeader/PaneHeader";
import { PatientInformationPaneBodyStyles } from "./PatientInformationPane.Styles";

const PatientInformationPane = ({patientName = ''}) => {
  return (
    <PatientInformationPaneBodyStyles>
      <PaneHeader text="Patient Information"/>
      <div className="information">
        <Typography className="patient-name" component={"h1"}><strong>{patientName}</strong></Typography>
        <ul className="patient-info">
          <li className="patient-list-item"><strong>{"Phone Number: "}</strong>256-123-4567</li>
          <li className="patient-list-item"><strong>{"Email: "}</strong><a>mdoe@example.com</a></li>
          <li className="patient-list-item"><strong>{"MRN: "}</strong>12-34-56 </li>
          <li className="patient-list-item"><strong>{"Address: "}</strong>123 Panorama Drive Broomfield CO 80020 </li>
        </ul>
        <Divider className="divider"/>
          <ul className="insurance-info">
            <li className="patient-list-item"><strong>{"Primary Insurance: "}</strong>256-123-4567</li>
            <li className="patient-list-item"><strong>{"ID #: "}</strong><a>A1234 12345</a></li>
            <li className="patient-list-item"><strong>{"Group #: "}</strong>12-34-56 </li>
            <li className="patient-list-item"><strong>{"Payer #: "}</strong>12345 1234</li>
          </ul>
      </div>
    </PatientInformationPaneBodyStyles>
  )
}

export default PatientInformationPane;
