import { Typography, Divider } from "@material-ui/core";
import { SCHEDULING } from "../../../../components/constants";
import PaneHeader from "../PaneHeader/PaneHeader";
import { PatientInformationPaneBodyStyles } from "./PatientInformationPane.Styles";

interface PatientInformationPaneProps {
  patientName: string;
  skill: string;
}

const PatientInformationPane = ({ patientName = '', skill }: PatientInformationPaneProps ) => {
  return (
    <PatientInformationPaneBodyStyles>
      <PaneHeader text="Patient Information"/>
      <div className="information">
        <Typography className="patient-name" component={"h1"}><strong>{patientName}</strong></Typography>
        {skill === SCHEDULING ?
          <ul className="patient-info">
            <li className="patient-list-item"><strong>{"Phone Number: "}</strong>256-123-4567</li>
            <li className="patient-list-item"><strong>{"Email: "}</strong><a>mdoe@example.com</a></li>
            <li className="patient-list-item"><strong>{"MRN: "}</strong>12-34-56 </li>
            <li className="patient-list-item"><strong>{"Address: "}</strong>123 Panorama Drive Broomfield CO 80020 </li>
          </ul>
          : 
          <ul className="patient-info">
            <li className="patient-list-item"><strong>{"PCP: "}</strong>Dr. Andrew Smith</li>
            <li className="patient-list-item"><strong>{"Chief Complaint: "}</strong>Diabetes, Type 2 </li>
          </ul>
        }
        <Divider className="divider"/>
        {skill === SCHEDULING ?
          <ul className="">
            <li className="patient-list-item"><strong>{"Primary Insurance: "}</strong>256-123-4567</li>
            <li className="patient-list-item"><strong>{"ID #: "}</strong><a>A1234 12345</a></li>
            <li className="patient-list-item"><strong>{"Group #: "}</strong>12-34-56 </li>
            <li className="patient-list-item"><strong>{"Payer #: "}</strong>12345 1234</li>
          </ul> 
          :
          <ul className="info">
            <li className="patient-list-item"><strong>{"Current Medications: "}</strong>Metformin 800mg daily; Lipitor 10mg daily; Lisinopril 10mg daily</li>
            <li className="patient-list-item"><strong>{"Allergies: "}</strong>Latex, bee stings</li>
            <li className="patient-list-item"><strong>{"Problems List: "}</strong> Diabetes, Type 2; Hypertension; Peripheral neuropathy</li>
          </ul>
        }
      </div>
    </PatientInformationPaneBodyStyles>
  )
}

export default PatientInformationPane;
