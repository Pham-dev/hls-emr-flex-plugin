import styled from 'react-emotion';

export const PatientInformationPaneBodyStyles = styled('div')
  `
    background-color: white;
    color: black;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    font-size: 15px;
    
    .information {
      padding: 8px 8px 0px 8px;
    }

    .content {
      color: #666666;
    }
    
    .divider {
      height: 2px;
      margin-bottom: 4px;
    }
    
    .patient-name {
      margin-left: 8px;
      margin-bottom: 8px;
      text-align: left;
      font-size: 18px;
      color: #F22F46;
    }
    
    .patient-info {
      margin-bottom: 4px;
      padding-left: 8px;
      padding-right: 8px;
    }

    .patient-info2 {
      margin-bottom: 4px;
      margin-left: 8px;
      gap: 50px;
      display: flex;
    }

    .patient-info3 {
      margin-bottom: 4px;
      margin-left: 8px;
      display: flex;
      margin-top: 14px;
    }

    .info {
      display: flex;
      flex-direction: column;
      padding-left: 8px;
      padding-right: 8px;
    }

    .patient-list-item {
      display: inline-block;
      padding-top: 5px;
      padding-bottom: 5px;
      margin: 0px 0px 8px 0px;
      font-weight: 500;
    }

    .patient-list-item1 {
      display: inline-block;
      padding-top: 5px;
      padding-bottom: 5px;
      margin: 0px 0px 8px 0px;
      margin-right: 25px;
      font-weight: 500;
    }

    .patient-list-item3 {
      padding-top: 5px;
      padding-bottom: 5px;
      margin: 0px 0px 8px 0px;
      margin-right: 25px;
      white-space: nowrap;
      font-weight: 500;
    }

    strong {
      font-weight: bold;
    }
  `;