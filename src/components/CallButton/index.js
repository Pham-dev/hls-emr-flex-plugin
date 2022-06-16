import * as React from "react";
import { withTaskContext, IconButton, styled, Actions } from "@twilio/flex-ui";
import ThreeWayCallIcon from "../icons/ThreeWayCallIcon";
import { useSelector } from "react-redux";
import { mobilePhone as patientPhoneSelector } from "../../states/selectors";
import CallIcon from '@material-ui/icons/Call';

const Button = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  gap: 6px;
  width: 38px;
  height: 28px;
  background: ${props => props.pressed ? '#4B5671' : '#E1E2E9'};
  border-radius: 39px;
	cursor: pointer;
	border: none;
	margin-top: 12px;
	margin-right: 6px;
  &:hover,
  &:active,
  &:focus {
    background-color: #4B5671; //rgba(0, 0, 0, 0.2);
    background-blend-mode: color;
    svg {
      fill: white;
    }
  }
  svg {
    fill: #626B83
  }
`;

export const CallButton = (props) => {
    const { attributes } = props.task;
    const patientNumber = useSelector(patientPhoneSelector);
    console.log("HELLO PROPS", props);
    return (
      <div>
        <Button
          onClick={() => {
            console.log("starting outbound call with attributes", attributes, patientNumber);
            Actions.invokeAction("StartOutboundCall", {
              // Payload below
              destination: patientNumber,
              taskAttributes: { ...attributes },
            });
          }}
        >
          <CallIcon/>
        </Button>
      </div>
    );
}

export default withTaskContext(CallButton);
