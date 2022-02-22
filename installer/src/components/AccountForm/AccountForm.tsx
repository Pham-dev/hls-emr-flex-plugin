import React from 'react';
import { useEffect, useState } from 'react';
import { getBackendUri } from '../../constants/backendUri';
import { hlsPluginName } from '../../constants/constants';
import { Plugin } from '../../constants/interface';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import NoPluginMessage from '../NoPluginMessage/NoPluginMessage';

const AccountForm = () => {
  // Call useEffect to call function to get account Name
  const [accountName, setAccountName] = useState<string>("");
  const [accountSid, setAccountSid] = useState<string>("");
  const [accountAuthToken, setAccountAuthToken] = useState<string>("");
  const [pluginFriendlyName, setPluginFriendlyName] = useState<string>("");
  const [pluginSid, setPluginSid] = useState<string>("");
  const [hlsPluginExists, setHlsPluginExists] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDeployed, setIsDeployed] = useState<boolean>(false);

  const handleDeployment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (accountSid && accountAuthToken) {
      // This call creates the workspace and routers via APIs
      await fetch(getBackendUri() + "/task-router/deploy-task-router")
        .then(resp => resp.json())
        .then(data => {
          console.log(data);
        })
        .catch(err => console.error(err));

      // This call gets all the plugins
      const plugin = await fetch(getBackendUri() + "/plugin/get-plugins")
        .then(plugin => plugin.json())
        .then(async resp => {
          const plugins: Plugin[] = resp.data.plugins;
          const hlsPlugin = Object.values(plugins).find(plugin => plugin.friendly_name === hlsPluginName);
          if (hlsPlugin) {
            setPluginFriendlyName(hlsPlugin.friendly_name);
            setPluginSid(hlsPlugin.sid);
          }
          return hlsPlugin;
        })
        .catch(err => console.error(err));
      if (!plugin) setHlsPluginExists(false);
      
      // Release the plugin config to Flex Account
      const configRelease = await fetch(getBackendUri() + "/plugin/release-plugin")
        .then(res => res.json())
        .then(release => release.data)
        .catch(err => console.error(err));
      if (configRelease) {
        setIsLoading(false);
        setIsDeployed(true);
      }
      console.log(configRelease);
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
      <form className=''>
        <div className='flex flex-col'>
          <div className='row mb-5 text-deploy-blue'>
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
          
          <div className='row mb-5 text-deploy-blue'>
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
              <div className='mb-3 text-deploy-blue'>
                <span className='font-bold pr-2'>Step 3:</span>
                <span>Deploy your application and try it out!</span>
              </div>
              <div className='pl-4'>
                {!isLoading ?
                  <button className="bg-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleDeployment}>
                    {"Deploy this application"}
                  </button>
                  :
                  <LoadingSpinner/>
                }
              </div>
              {isDeployed ?
                <div className='mt-8 border-2 rounded white p-3'>
                  <h1 className='font-xxl font-bold border-1 bg-red mb-2 text-white text-center'>{"HLS Flex Plugin Information"}</h1>
                  <div><span className='font-bold text-deploy-blue'>{"Flex Plugin Name: "}</span><span>{pluginFriendlyName}</span></div>
                  <div><span className='font-bold text-deploy-blue'>{"Flex Plugin SID: "}</span><span>{pluginSid}</span></div>
                </div> :
                <></>
              }
          </div>
          {hlsPluginExists ??
            <NoPluginMessage/>
          }
        </div>
      </form>
    </div>
  );
};

export default AccountForm;
