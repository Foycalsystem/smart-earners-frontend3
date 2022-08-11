import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import PlaceIcon from '@mui/icons-material/Place'
import CallIcon from '@mui/icons-material/Call'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import FacebookIcon from '@mui/icons-material/Facebook'
import Telegram from '@mui/icons-material/Telegram'

const SocialLinks=({text})=>{
    const Ln=({url, children})=>{
      return <a style={{margin: '5px'}} target="_blank" href={url}>{children}</a>
    }
    return (
      <div style={{width: '120px'}}>
         <div style={{fontSize: '.9rem', textAlign: 'center', fontWeight: 'bold'}}>
           {text}
         </div>
         
          <span style={{fontSize: '.9rem', textAlign: 'center', display: 'flex', justifyContent: 'center'}}>
  
              <Ln url="https://mobile.twitter.com/smart_earners"><TwitterIcon fontSize="small" /></Ln>
              <Ln url="https://www.instagram.com/teamsmartearners"><InstagramIcon fontSize="small" /></Ln>
              <Ln url="https://t.me/OfficialSmartEarners"><Telegram fontSize="small" /></Ln>
  
          </span>
      </div>
    )
  }

  export default SocialLinks