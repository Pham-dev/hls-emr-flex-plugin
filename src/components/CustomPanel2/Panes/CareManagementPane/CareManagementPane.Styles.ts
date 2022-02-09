import styled from 'react-emotion';

export const CareManagementPaneStyles = styled('div')
  `
    background-color: white;
    height: 100%;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    .intro-text {
      text-align: center;
      color: black;
      padding-top: 8px;
      font-size: 16px;
    }
  `;

export const CareManagementPaneContentStyles = styled('div')
  `
    padding: 10px;
    color: black;
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    .checkboxes {
      font-size: 14px;
    }
    .check-item {
      margin-top: 7px;
      margin-bottom: 7px;
    }
  `;