import styled from 'react-emotion';

export const PatientInformationPaneBodyStyles = styled('div')
  `
    background-color: white;
    border-radius: 5px 5px 5px 5px;
    box-shadow:
      0 2.8px 2.2px rgba(0, 0, 0, 0.034),
      0 6.7px 5.3px rgba(0, 0, 0, 0.048),
      0 12.5px 10px rgba(0, 0, 0, 0.06),
      0 22.3px 17.9px rgba(0, 0, 0, 0.072),
      0 41.8px 33.4px rgba(0, 0, 0, 0.086),
      0 100px 80px rgba(0, 0, 0, 0.12);
    padding-bottom: 5px;
    .patient-name {
      color: black;
      text-align: left;
      margin-left: 8px;
      padding-top: 4px;
    }

    .patient-info {
      color: black;
      display: flex;
      display: -webkit-box;
      display: -moz-box;
      display: -ms-flexbox;
      display: -moz-flex;
      display: -webkit-flex;
      display: flex;
      -ms-box-orient: horizontal;
      -webkit-flex-wrap: wrap;
      flex-wrap: wrap;
    }
    .patient-list-item {
      margin-top: 8px;
      margin-left: 8px;
      margin-right: 8px;
    }  
  `;