import React from 'react'

const NoPluginMessage = () => {
  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-red font-bold text-lg'>
        {"❗️ HLS Flex Plugin was not found ❗️"}
      </h1>
      <p>
        {"Please run through docker steps again!"}
      </p>
    </div>
  )
}

export default NoPluginMessage;