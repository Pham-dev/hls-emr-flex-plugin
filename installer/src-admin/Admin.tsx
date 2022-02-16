import React from 'react';
import './index.css'

 const Admin = () => {

  const deploy = () => {
    fetch('http://localhost:3001/deploy')
      .then(async resp => {
        const message = await resp.json();
        console.log(message);
      })
      .catch(err => console.log(err));
  }

  return (
    <div className='text-red'>
      HELLO WORLD, It works.
    </div>
  );
}

export default Admin;
