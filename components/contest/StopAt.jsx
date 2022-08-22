export default function StopAt({config}) {
  return (
        <span style={{color: '#972309', fontSize: '.7rem'}}>
            {new Date(config.data.referralContestStops).toLocaleString()}
        </span>
  )
}
