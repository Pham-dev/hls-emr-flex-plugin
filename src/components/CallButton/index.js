import * as React from "react";
import { withTaskContext, IconButton, styled, Actions } from "@twilio/flex-ui";

import Call from "@material-ui/icons/Call";

const Button = styled(IconButton)`
  background-color: #4caf50;
  color: white;
  padding: 2px;
  margin-right: 2px;
  margin-left: 8px;
  &:hover,
  &:active {
    background-color: rgba(0, 0, 0, 0.2);
    background-blend-mode: color;
  }
  &:focus {
    background-color: #4caf50;
    border: 1px solid;
    box-shadow: 0 0 0 2px;
  }
`;

export class CallButton extends React.Component {
  render() {
    const { attributes } = this.props.task;
    console.log("HEllo props", this.props);
    return (
      <Button
        icon={<Call />}
        onClick={() => {
          console.log("starting outbound call with attributes", attributes);
          Actions.invokeAction("StartOutboundCall", {
            destination: attributes.from,
            taskAttributes: { ...attributes },
          });
        }}
      />
    );
  }
}

export default withTaskContext(CallButton);
