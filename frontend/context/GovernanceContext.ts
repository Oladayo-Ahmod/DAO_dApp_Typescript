import React, { createContext, useEffect, useState } from 'react';
// import { ADDRESS, ABI } from '../constants/index';
import { ethers } from 'ethers';
import Router from 'next/router';
import Swal from 'sweetalert2';
import GovernanceProps from '../src/app/interfaces/governance';

const GOVERNANCE_CONTEXT = createContext<GovernanceProps | undefined>(undefined)

// states

const [account, setAccount] = useState<string>()

let connect : any
if(typeof window !=='undefined'){
    connect = (window as any).ethereum
}

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





