import { IconButton, styled } from '@twilio/flex-ui';
import React from 'react'

const Button = styled(IconButton)`
  background-color: #606b85;
  color: white;
  padding: 2px;
  margin-right: 8px;
  margin-left: 8px;
  &:hover,
  &:active {
    background-color: rgba(0, 0, 0, 0.2);
    background-blend-mode: color;
  }
  &:focus {
    background-color: #606b85;
    border: 1px solid;
    box-shadow: 0 0 0 2px;
  }
`

const VideoButton = (props: any) => {
  const handleClick = () => {
    props.toggleTelehealth();
  }

  return (
    <Button 
      icon={"VideoBold"}
      onClick={handleClick}
      title={"Enable Video"}
    />
  )
}

export default VideoButton;