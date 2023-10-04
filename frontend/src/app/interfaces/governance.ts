interface GovernanceProps{
    account : string | undefined
    disability : boolean
    setAmount : React.Dispatch<React.SetStateAction<string | undefined>>
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