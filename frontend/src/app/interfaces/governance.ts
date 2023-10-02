interface GovernanceProps{
    connectWallet : ()=> void
    getDeployer : ()=> void
    contribute : (modalRef : React.RefObject<HTMLElement>)=>void
    getTotalBalance : ()=> void
    getStakeholderBalance : ()=> void
    getContributorBalance : ()=> void
    getContributorStatus : ()=> void
    propose : (modalRef : React.RefObject<HTMLElement>) => void,
    proposals : () => void
}

export default GovernanceProps