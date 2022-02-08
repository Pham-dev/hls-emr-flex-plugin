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
            <li className="patient-list-item1">
              <strong className="list-label">{"Phone Number: "}</strong>
              <>256-123-4567</>
            </li>
            <li className="patient-list-item1">
              <strong className="list-label">{"Email: "}</strong>
              <><a href="/">mdoe@example.com</a></>
            </li>
            <li className="patient-list-item1">
              <strong className="list-label">{"MRN: "}</strong>
              <>12-34-56</> 
            </li>
            <li className="patient-list-item1">
              <strong className="list-label">
                {"Address: "}
              </strong>
              <>123 Panorama Drive Broomfield CO 80020</>
              </li>
          </ul>
          : 
          <ul className="patient-info2">
            <li className="patient-list-item">
              <strong className="list-label">{"PCP: "}</strong>
              <Typography>Dr. Andrew Smith</Typography>
            </li>
            <li className="patient-list-item">
              <strong className="list-label">{"Chief Complaint: "}</strong>
              <Typography>Diabetes, Type 2 </Typography>
            </li>
          </ul>
        }
        <Divider className="divider"/>
        {skill === SCHEDULING ?
          <ul className="patient-info3">
            <li className="patient-list-item3">
              <strong className="list-label">
                {"Primary Insurance: "}
              </strong>
              {"Aetna"}
            </li>
            <li className="patient-list-item3">
              <strong className="list-label">
                {"ID #: "}
              </strong>
              <a>{"A1234 12345"}</a>
            </li>
            <li className="patient-list-item3">
              <strong className="list-label">
                {"Group #: "}
              </strong>
              {"12-34-56"}
            </li>
            <li className="patient-list-item3">
              <strong className="list-label">
                {"Payer #: "}
              </strong>
              {"12345 1234"}
            </li>
          </ul> 
          :
          <ul className="info">
            <li className="patient-list-item"><strong className="list-label">{"Current Medications: "}</strong>Metformin 800mg daily; Lipitor 10mg daily; Lisinopril 10mg daily</li>
            <li className="patient-list-item"><strong className="list-label">{"Allergies: "}</strong>Latex, bee stings</li>
            <li className="patient-list-item"><strong className="list-label">{"Problems List: "}</strong> Diabetes, Type 2; Hypertension; Peripheral neuropathy</li>
          </ul>
        }
      </div>
    </PatientInformationPaneBodyStyles>
  )
}

export default PatientInformationPane;
