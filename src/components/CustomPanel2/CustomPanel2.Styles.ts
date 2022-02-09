import styled from 'react-emotion';

export const CustomPanel2Styles = styled('div')
  `
    color: #fff;
    border-left: 0.5px solid #E5E4E2;
    padding: 8px;
    font-size: 12px;

    .scheduler-panes {
    }
    
    .container {
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      padding: 0;
    }

    .flex-col {
      display: flex;
      flex-direction: column;
      gap: 22px;
    }

    .flex-row {
      display: flex;
      flex-direction: row;
      gap: 22px;
    }

    .first-row {
      display: flex;
      gap: 22px;
      height: 80%;
    }

    .scheduler {
      gap: 22px;
    }

    .item1 {
      flex-grow: 2;
    }

    .flex-item {
      
      flex-grow: 1;
      flex-basis: calc(100% / 2);
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