import React from 'react';

const BeforeText = () => {
  return (
    <div className='flex flex-col justify-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-gradient-x'>
      <h1 className='text-center text-white text-2xl font-bold p-4 py-[5rem]'>
        Enter any word below! <br />
        Click the send icon in the input field! <br />
        Select a translation language! <br />
        Instantly see the detected language! <br />
      </h1>
    </div>
  );
};

export default BeforeText;