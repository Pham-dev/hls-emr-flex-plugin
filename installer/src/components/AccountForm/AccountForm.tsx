import React from 'react';
import { useEffect, useState } from 'react';
import { getBackendUri } from '../../constants/backendUri';

const AccountForm = () => {
  // Call useEffect to call function to get account Name
  const [accountName, setAccountName] = useState<string>("");
  const [accountSid, setAccountSid] = useState<string>("");
  const [accountAuthToken, setAccountAuthToken] = useState<string>("");
  const [pluginFriendlyName, setPluginFriendlyName] = useState<string>("");
  const [pluginSid, setPluginSid] = useState<string>("");


  const handleDeployment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (accountSid && accountAuthToken) {
      const base64Account = btoa(accountSid + ":" + accountAuthToken);
      console.log(base64Account);

      // This call creates the workspace and routers via APIs
      fetch(getBackendUri() + "/task-router/deploy-task-router")
        .then(resp => resp.json())
        .then(data => {
          console.log(data);
        })
        .catch(err => console.error(err));

      // This call gets all the plugins
      await fetch(getBackendUri() + "/plugin/get-plugins")
        .then(plugin => plugin.json())
        .then(resp => {
          console.log(resp);
          setPluginFriendlyName(resp.data.plugins.friendly_name)
          setPluginSid(resp.data.plugins.sid);
          console.log(resp.data.plugins);
        })
        .catch(err => console.error(err));

      // Releast the plugin
      

    }
  }

  useEffect(() => {
    const getAccount = async () => {
      await fetch(getBackendUri() + "/account/get-account-name")
      .then(resp => resp.json())
      .then(jsonResp => setAccountName(jsonResp.data.accountName));

      await fetch(getBackendUri() + "/account/get-account-info")
        .then(resp => resp.json())
        .then(async (jsonResp) => {
          setAccountSid(jsonResp.data.accountSid);
          setAccountAuthToken(jsonResp.data.authToken);
      });
    }
    getAccount();
  }, []);

  return (
    <div className='col-start-5 col-span-4 flex flex-col'>
      <form className='text-deploy-blue'>
        <div className='flex flex-col'>
          <div className='row mb-5'>
              <div className='mb-3'>
                <span className='font-bold pr-2'>Step 1:</span>
                <span>Account Information</span>
              </div>
              <div className='pl-4'>
                <div className='p-0'>
                  <div className='mb-2'>Account Name</div>
                  <input value={accountName} disabled className='bg-light-gray px-2 py-2 rounded-md border'></input>
                </div>
              </div>
          </div>
          
          <div className='row mb-5'>
            <div className='mb-3 items-center'>
              <span className='pr-2 font-bold'>Step 2:</span>
              <span className='pr-2'>Set up your application</span>
            </div>
            <div className='pl-4 mt-4'>
              <div className="verify-account-sid">
                <label htmlFor={'ACCOUNT_SID'}>
                  <span className='text-red mr-2'>*</span>
                  <span>Verify Account SID</span>
                </label>
              </div>
              <div className='mb-2'>
                <input className='w-auto px-2 py-2 rounded-md border' type={'text'} defaultValue={accountSid} placeholder={"Account SID"} disabled></input>
              </div>
              <div className="verify-account-sid mt-4">
                <label htmlFor={'ACCOUNT_SID'}>
                  <span className='text-red mr-2'>*</span>
                  <span>Verify Account Auth Token</span>
                </label>
              </div>
              <div className='mb-2'>
                <input className='w- px-2 py-2 rounded-md border' type={'text'} defaultValue={accountAuthToken} placeholder={"Auth Token"} disabled></input>
              </div>
            </div>
          </div>

          <div className='row mb-5'>
              <div className='mb-3'>
                <span className='font-bold pr-2'>Step 3:</span>
                <span>Deploy your application and try it out!</span>
              </div>
              <div className='pl-4'>
                <button className="bg-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleDeployment}>
                  Deploy this application
                </button>
              </div>
          </div>

        </div>
      </form>
    </div>
  );
};

export default AccountForm;
