import React, { createContext, useEffect, useState } from 'react';
import { ADDRESS, ABI } from '../constants/index';
import { ethers , BigNumber} from 'ethers';
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
    const [deployer, setDeployer] = useState<string>();
    const [amount,setAmount] = useState<string>()
    const [disability, setDisability] = useState(false);
    const [totalBalance, setTotalBalance] = useState<number>(0)
    const [stakeholderBalance, setStakeholderBalance] = useState<number>(0)
    const [contributorBalance, setContributorBalance] = useState<number>(0)
    const [stakeholderStatus , setStakeholderStatus] = useState(false)
    const [contributorStatus , setContributorStatus] = useState(false)



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
    const getDeployer : GovernanceProps["getDeployer"]  =async()=>{
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

  // contribution functionality
  const contribute : GovernanceProps["contribute"] =async(modalRef : React.RefObject<HTMLElement>)=>{
    try {
        if (amount && connect) {
            setDisability(true)
            const provider = new ethers.providers.Web3Provider(connect)
            const signer = provider.getSigner()
            const contract = new ethers.Contract(ADDRESS,ABI,signer)
            const parsedAmount : BigNumber =  ethers.utils.parseEther(amount) as BigNumber
            const tx = await contract.contribute({value : parsedAmount})
            await tx.wait(1)
            setDisability(false)
            const modalElement  = modalRef.current ? modalRef.current : ''
            if (modalElement instanceof HTMLElement) {
              modalElement.classList.remove('show')
              modalElement.style.display = 'none'
          }
            
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                text: `You have successfully contributed ${amount} ETH to the DAO`,
                showConfirmButton: true,
                timer: 4000
            })

        }
        else{
            setDisability(false)
        }
    } catch (error) {
        console.log(error);
    }

}

  // retrieve total balance
  const getTotalBalance : GovernanceProps["getTotalBalance"] =async()=>{
    try {
        const provider = new ethers.providers.Web3Provider(connect)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(ADDRESS,ABI,signer)
        const tx = await contract.getTotalBalance()
        let balance = await tx.toString()
        balance =  ethers.utils.formatUnits(balance,'ether')
        setTotalBalance(balance)
    } catch (error) {
        console.log(error);
    }

}

// retreive stakeholders balance
const getStakeholderBalance : GovernanceProps["getStakeholderBalance"] =async()=>{
  if (stakeholderStatus) {
      try {
          const provider = new ethers.providers.Web3Provider(connect)
          const signer = provider.getSigner()
          const contract = new ethers.Contract(ADDRESS,ABI,signer)
          const tx = await contract.getStakeholdersBalances()
          let balance = await tx.toString()
          balance =  ethers.utils.formatUnits(balance,'ether')
          setStakeholderBalance(balance)
         } catch (error) {
          console.log(error);
         }
  }

}




    return (
      <GOVERNANCE_CONTEXT.Provider
        value={{
         connectWallet,
         getDeployer,
         contribute,
         getTotalBalance,
         getStakeholderBalance
        }}
      >
        {children}
      </GOVERNANCE_CONTEXT.Provider>
    );
  };
  
  export default GovernmentProvider;