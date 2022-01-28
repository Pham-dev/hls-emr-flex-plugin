import React from 'react';
import Layout from './components/Layout/Layout';
import './index.css'

 const DeployApp = () => {

  const deploy = () => {
    fetch('http://localhost:3001/deploy')
      .then(async resp => {
        const message = await resp.json();
        console.log(message);
      })
      .catch(err => console.log(err));
  }

  return (
    <Layout>
      {/*  */}
      <button onClick={deploy} className="bg-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
        Button
      </button>
      hello
    </Layout>
  );
}

export default DeployApp;
