import styled from 'react-emotion';

export const PatientInformationPaneBodyStyles = styled('div')
  `
    background-color: white;
    border-radius: 5px 5px 5px 5px;
    color: black;
    
    box-shadow:
      0 2.8px 2.2px rgba(0, 0, 0, 0.034),
      0 6.7px 5.3px rgba(0, 0, 0, 0.048),
      0 12.5px 10px rgba(0, 0, 0, 0.06),
      0 22.3px 17.9px rgba(0, 0, 0, 0.072),
      0 41.8px 33.4px rgba(0, 0, 0, 0.086),
      0 100px 80px rgba(0, 0, 0, 0.12);
    
    .information {
      padding: 8px;
    }
    
    .divider {
      height: 2px;
    }
    
    .patient-name {
      margin-left: 8px;
      padding-top: 4px;
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
      margin-top: 8px;
      margin-left: 8px;
      margin-right: 8px;
    }

    strong {
      font-weight: bold;
    }
  `;