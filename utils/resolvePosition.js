const position = (n)=>{
    //get the last always
    const num = n.toString()
    const lastDigit = +(num[num.length-1])

    // check if lastDigit is 1 and n is not 11, add st
    if(lastDigit===1 && n !== 11){
        return 'st'
    }

    // check if lastDigit is 2 and n is not 12, add nd
    else if(lastDigit===2 && n !== 12){
        return 'nd'
    }

    // check if lastDigit is 3 and n is not 13, add rd
    else if(lastDigit===3 && n !== 13){
        return 'rd'
    }

    // any other number, add th
    else{
        return 'th'
    }
}

export default position