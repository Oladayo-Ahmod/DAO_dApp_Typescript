interface GovernanceProps{
    account : string | undefined
    disability : boolean
    setAmount : React.Dispatch<React.SetStateAction<string | undefined>>
    totalBalance : number
    stakeholderBalance : number
    contributorBalance : number
    contributorStatus : boolean
    stakeholderStatus : boolean
    connectWallet : ()=> void
    getDeployer : ()=> void
    contribute : (modalRef : React.RefObject<HTMLElement>)=>void
    getTotalBalance : ()=> void
    getStakeholderBalance : ()=> void
    getStakeholderStatus : ()=> void
    getContributorBalance : ()=> void
    getContributorStatus : ()=> void
    propose : (modalRef : React.RefObject<HTMLElement>) => void
    proposals : () => void
    voting : (id : number, vote : boolean)=> void
    payBeneficiary : (id : number) => void

}

export default GovernanceProps