interface GovernanceProps{
    connectWallet : ()=> void
    getDeployer : ()=> void
    contribution : (modalRef : React.RefObject<HTMLElement>)=>void
}

export default GovernanceProps