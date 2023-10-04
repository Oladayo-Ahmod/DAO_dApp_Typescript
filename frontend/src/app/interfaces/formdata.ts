interface FormdataProps{
    title : string
    description : string
    beneficiary : string
    amount : string
    setFormData : React.Dispatch<React.SetStateAction<{
        title : string
        description : string
        beneficiary : string
        amount : string
    }>> 
    formData : {
        title : string
        description : string
        beneficiary : string
        amount : string
    } 
}

export default FormdataProps