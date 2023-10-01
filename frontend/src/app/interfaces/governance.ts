interface GovernanceProps{
    connectWallet : ()=> void
    getDeployer : ()=> void
    contribute : (modalRef : React.RefObject<HTMLElement>)=>void
    getTotalBalance : ()=> void
}

export default GovernanceProps