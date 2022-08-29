const position = (n)=>{
    if(`${n}` === '1' || `${n}` === '21' || `${n}` === '31' || `${n}` === '41'  || `${n}` === '51' || `${n}` === '61' || `${n}` === '71' || `${n}` === '81' || `${n}` === '91'){
        return 'st'
    }
    else if(`${n}`.includes('2')){
        return 'nd'
    }
    else if(`${n}`.includes('3')){
        return 'rd'
    }
    else{
        return 'th'
    }
}

export default position