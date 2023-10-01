import React, { createContext, useEffect, useState } from 'react';
import { ADDRESS, ABI } from '../constants/index';
import { ethers } from 'ethers';
import Router from 'next/router';
import Swal from 'sweetalert2';
import GovernanceProps from '../src/app/interfaces/governance';

export const GOVERNANCE_CONTEXT = createContext<GovernanceProps | undefined>(
    undefined
  );


let connect : any
if(typeof window !=='undefined'){
    connect = (window as any).ethereum
}


const GovernmentProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => {

    // states variables
    const [account, setAccount] = useState<string>()
    const [deployer, setDeployer] = useState<string | undefined>();

    // wallet connection
    const connectWallet : GovernanceProps["connectWallet"] =async function(){
        try {
            if(connect){
                const connector = await connect.request({method : 'eth_requestAccounts'})
                setAccount(connector[0])
                Router.push('/')
            }
        } catch (error) {
            console.log(error);
        }
    }

    // retrieve contract deployer
    const getDeployer =async()=>{
      try {
          const provider = new ethers.providers.Web3Provider(connect)
          const signer = provider.getSigner()
          const contract = new ethers.Contract(ADDRESS,ABI,signer)
          const deployer = await contract.getDeployer()
          setDeployer(deployer)
      } catch (error) {
          console.log(error);
      }
  }


    return (
      <GOVERNANCE_CONTEXT.Provider
        value={{
         connectWallet
        }}
      >
        {children}
      </GOVERNANCE_CONTEXT.Provider>
    );
  };
  
  export default GovernmentProvider;