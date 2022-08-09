function MovingInfo({movingInfo}){
    return(
       
        <marquee
            behavior="smooth"
            direction=""
            style={{fontSize: '.8rem', fontWeight: '400'}}>
            <span style={{marginRight: '5px', display: 'inline-block', fontSize: '.8rem'}}>
                { movingInfo.isLoading ||  !movingInfo.data.movingText? 'Loading...' : movingInfo.data.movingText }
            </span>
        </marquee>
    )
}

export default MovingInfo