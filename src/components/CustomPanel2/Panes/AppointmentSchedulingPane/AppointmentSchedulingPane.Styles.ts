import styled from 'react-emotion';

export const AppointmentSchedulingPaneStyles = styled('div')
  `
    color: #fff;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    border: 1px solid #E1E3E9;
    box-sizing: border-box;
    border-radius: 8px;
    max-width: 1049px;
    width: 100%;
    height: 569px;
    padding-top: 20px;
    padding-left: 20px;
    

    .title {
      font-weight: 700;
      font-size: 14px;
      line-height: 17px;
      color: #606B85;
    }
    .open-emr {
      width: 100%;
      position:relative;
      height: 530px;
      overflow-x: scroll;
    }
    
  `;
