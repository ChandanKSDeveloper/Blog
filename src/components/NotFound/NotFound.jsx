import React from "react";
import {Layout} from '../index'
import MySvg from './img.svg'


const NotFound = () => {
  return (
    <Layout>
    <div className="min-w-full min-h-full flex items-center justify-center">
    <img src={MySvg} alt="404 not found" />
    </div>
    </Layout>
  );
};

export default NotFound;
