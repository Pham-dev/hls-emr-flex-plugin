import React from 'react';

const AccountForm = () => {
  return (
    <div className='col-start-5 col-span-4'>
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
                  <input className='bg-light-gray px-2 py-2 rounded-md border'></input>
                </div>
              </div>
          </div>
          
          <div className='row mb-5'>
            <div className='mb-3 items-center'>
              <span className='pr-2 font-bold'>Step 2:</span>
              <span className='pr-2'>Set up your application</span>
            </div>
            <div className='pl-4 mb-1'>
              <div>
                <label htmlFor={'ACCOUNT_SID'}>
                  <span className='text-red mr-2'>*</span>
                  <span>Verify Account SID</span>
                </label>
              </div>
              <div className='mb-2'>
                <input  className='w-100 px-2 py-2 rounded-md border' type={'text'} required name={'ACCOUNT_SID'}></input>
              </div>
            </div>
          </div>

          <div className='row mb-5'>
              <div className='mb-3'>
                <span className='font-bold pr-2'>Step 3:</span>
                <span>Deploy your application and try it out!</span>
              </div>
              <div className='pl-4'>
                <button className="bg-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
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
