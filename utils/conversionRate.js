
const conversionRate = {
    SEC_TO_USD: (amount, conversionRate)=>{
        return Number(amount) * 1 / Number(conversionRate) 
    },

    USD_TO_SEC: (amount, conversionRate)=>{
        return amount * conversionRate
    },
}

export default conversionRate