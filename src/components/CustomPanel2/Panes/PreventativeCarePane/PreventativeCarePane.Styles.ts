import styled from "@emotion/styled";

export const PreventativeCarePaneStyles = styled('div')
  `
    max-width: 519px;
    width: 49%;
    height: 201px;
    border: 1px solid #E1E3E9;
    box-sizing: border-box;
    border-radius: 8px;
    padding: 20px;
    .title {
      font-size: 14px;
      color: #606B85;
      font-weight: 700;
      margin-bottom: 8px;
    }
    table {
      color: #121C2D;
      width: 100%;
    }
    th{
      font-weight: 700;
      font-size: 8px;
      line-height: 10px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #AFB2C0;
      text-align: start;
    }
    td {
      height: 33px;
      border-bottom: 1px solid #E1E3E9;
      vertical-align: middle;
      font-weight: 500;
      font-size: 10px;
    }
    .outdated {
      font-weight: 600;
      display: flex;
      justify-content: start;
      align-items: center;
      height: 33.99px;
    }
    .outdated-date {
      font-size: 10px;
      color: #E36A19;
    }
    .date-warning {
      font-weight: 700;
      font-size: 10px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #AEB2C1;
    }
  `; 
