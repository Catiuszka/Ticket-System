// Loader.js

import React from 'react';
import '../styles/Loader.css'; // Import CSS for styling
import { MutatingDots } from 'react-loader-spinner';

const Loader = ({ loading }) =>{
  return (
    <div className={`loader-container ${loading ? 'visible' : 'hidden'}`}>
        <MutatingDots visible={true} height="100" width="100" color="#225c51" secondaryColor="#3d7a6e" 
            radius="12.5" ariaLabel="mutating-dots-loading" wrapperStyle={{}} wrapperClass=""/>
    </div>
  );
};

export default Loader;
