import styled from 'react-emotion';

export const CareManagementPaneStyles = styled('div')
  `
    max-width: 519px;
    width: 50%;
    height: 201px;
    border: 1px solid #E1E3E9;
    box-sizing: border-box;
    border-radius: 8px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .title-block {
      position: relative;
      height: 40px;
    }
    .title {
      font-size: 14px;
      color: #606B85;
      font-weight: 700;
    }
    .sub-title {
      font-size: 10px;
      color: #606B85;
      line-height: 12px;
    }
    select {
      display: block;
      padding: 8px 10px;
      width: 200px;
      height: 35px;
    }
    .enroll-btn {
      font-weight: 600;
      font-size: 12px;
      line-height: 15px;
      color: #AEB2C1;
      padding: 7.5px 19px 7.5px 13.58px;
      background: #F4F4F6;
      width: 85px;
      height: 30px;
      text-transform: capitalize;
    }
  `;

