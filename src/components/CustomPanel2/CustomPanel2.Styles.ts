import styled from 'react-emotion';

export const CustomPanel2Styles = styled('div')
  `
    color: #fff;
    border-left: 0.5px solid #E5E4E2;
    padding: 8px;
    font-size: 12px;

    .scheduler-panes {
      margin: 10px;
    }
    
    .container {
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      padding: 0;
    }
    
    .first-row {
      display: flex;
      gap: 22px;
    }

    .flex-item {
    }

    .grid-one {
      margin: 4px;
      width: 33%;
    }
    .grid-two {
      margin: 4px;
      width: 33%;
      flex: 1;
    }
    .grid-three {
      margin: 4px;
      width: 33%;
      flex: none;
    }
    .grid-four {
      margin: 4px;
      width: 100%;
      height: 100%;
       flex: none;
    }`;