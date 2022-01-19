import styled from 'react-emotion';

export const PatientInformationPaneBodyStyles = styled('div')
  `
    background-color: white;

    .patient-name {
      color: black;
      text-align: left;
      margin-left: 4px;
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

  export const PatientInformationPaneContainerStyles = styled('div')
  `
    font-family: sans-serif;
  `;