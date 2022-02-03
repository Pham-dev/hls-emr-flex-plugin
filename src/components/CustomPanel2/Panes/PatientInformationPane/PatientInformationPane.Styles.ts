import styled from 'react-emotion';

export const PatientInformationPaneBodyStyles = styled('div')
  `
    background-color: white;
    color: black;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    
    .information {
      padding: 8px;
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
      margin-bottom: 8px;
    }

    .info {
      display: flex;
      flex-direction: column;
    }

    .patient-list-item {
      display: inline-block;
      padding-top: 5px;
      padding-bottom: 5px;
      margin: 0px 8px 8px 8px;
    }

    strong {
      font-weight: bold;
    }
  `;