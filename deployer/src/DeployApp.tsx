import React from 'react';
import AccountForm from './components/AccountForm/AccountForm';
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
      {/* step 1: Your Twilio Account  */}
      <AccountForm/>
      {/* step 2: Set up your application */}
    </Layout>
  );
}

export default DeployApp;
