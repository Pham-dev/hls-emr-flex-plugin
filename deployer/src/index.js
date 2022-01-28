import React from "react";
import DeployApp from "./DeployApp";
import registerServiceWorker from './registerServiceWorker';
import ReactDOM from "react-dom";

const Home = () => {
  return <DeployApp/>;
}

ReactDOM.render(<Home/>, document.getElementById('root'));
registerServiceWorker();
