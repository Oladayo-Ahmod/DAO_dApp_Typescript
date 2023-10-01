interface GovernanceProps{
    connectWallet : ()=> void
    getDeployer : ()=> void
    contribute : (modalRef : React.RefObject<HTMLElement>)=>void
}

export default GovernanceProps