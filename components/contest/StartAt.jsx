
export default function StartAt({config}) {
  return (
        <span style={{color: '#972309', fontSize: '.7rem'}}>
            {new Date(config.data.referralContestStarts).toLocaleString()}
        </span>
    )
}
