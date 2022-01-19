import styled from 'react-emotion';

export const CustomPanel2Styles = styled('div')
  `
    color: #fff;
    border-left: 0.5px solid black;
    padding: 8px;

    .scheduler-panes {
      margin: 10px;
    }
    
    .container {
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      padding: 0;
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