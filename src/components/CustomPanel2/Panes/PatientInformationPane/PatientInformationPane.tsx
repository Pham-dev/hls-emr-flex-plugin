import { Typography, Divider, Icon as MIcon } from "@material-ui/core";
import { Icon } from "@twilio/flex-ui";
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
        {/* SCHEDULER */}
        <div className="scheduler-patient">
          <div className="column1">
            <div className="flex-row-container">
              <Icon icon="AgentsViewBold" />
              <Typography className="patient-info" component={"h1"}><strong>{"Name: "}{patientName}</strong></Typography>
            </div>
            <div className="flex-row-container">
              <MIcon>key</MIcon>
              <Typography className="patient-info" component={"h1"}><strong>{"MRN: "}</strong>12-34-56 </Typography>
            </div>
            <Divider className="divider"/>
            <div className="flex-row-container">
              <Icon icon="CallBold" />
              <Typography className="patient-info"><strong>{"Phone: "}</strong>256-123-4567</Typography>
            </div>
            <div className="flex-row-container">
                <Icon icon="Email" />
              <Typography className="patient-info"><strong>{"Email: "}</strong><a>mdoe@example.com</a></Typography>
            </div>
            <div className="flex-row-container">
              <MIcon>home</MIcon>
              <Typography className="patient-info"><strong>{"Address: "}</strong>123 Panorama Drive Broomfield CO 80020 </Typography>
            </div>
          </div>

          <div className="column2 vertical-divider"></div>

          <div className="column3">
            <div className="flex-insurance-container">
              <Icon icon="GenericTaskBold"/>
              <Typography className="insurance-info">Insurance Info:</Typography>
            </div>
            <Typography className="insurance-content"><strong>{"Primary Insurance: "}</strong>256-123-4567</Typography>
            <Typography className="insurance-content"><strong>{"ID #: "}</strong><a>A1234 12345</a></Typography>
            <Typography className="insurance-content"><strong>{"Group #: "}</strong>12-34-56 </Typography>
            <Typography className="insurance-content"><strong>{"Payer #: "}</strong>12345 1234</Typography>
          </div>
        </div>

        {skill === SCHEDULING ?
          <ul className="patient-info">
            
            
            
          </ul>
          : 
          <ul className="patient-info">
            <li className="patient-list-item"><strong>{"PCP: "}</strong>Dr. Andrew Smith</li>
            <li className="patient-list-item"><strong>{"Chief Complaint: "}</strong>Diabetes, Type 2 </li>
          </ul>
        }
        {skill === SCHEDULING ?
          <ul className="">
            
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
