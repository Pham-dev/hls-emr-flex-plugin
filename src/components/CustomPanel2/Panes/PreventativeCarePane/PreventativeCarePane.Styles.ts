import styled from 'react-emotion';

export const PreventativeCarePaneStyles = styled('div')
  `
    background-color: white;
    color: black;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    width: 70%;
    font-size: 14px;

    .check-list {
      font-size: 15px;
      padding: 12px;
      white-space: nowrap;
      display: flex;
      flex-direction: column;
    }

    .header {
      font-weight: bold;
    }

    .content {
      margin-bottom: 13px;
      font-weight: bold;
    }
    .title {
      color: #F22F46;
      font-size: 18px;
      margin-bottom: 15px;
    }

    .table-headers {
      display: flex;
      flex-direction: row;
    }

    .table-content {
      display: flex;
      flex-direction: row;
    }
    
    .input-item {
      
    }

    table {
      font-family: arial, sans-serif;
      border-collapse: collapse;
      width: 100%;
    }
    
    td, th {
      border: 1px solid #dddddd;
      text-align: left;
      padding: 8px;
    }
    
    tr:nth-child(even) {
    }
  `; 