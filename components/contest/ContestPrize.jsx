import styled from 'styled-components'

export default function ContestPrize({config}) {
  return (
    <div>
        <Table style={{fontSize: '.7rem', textAlign: 'center'}}>
        <thead>
            <tr>
            <th>Position</th>
            <th>Prize {config.data.nativeCurrency}</th>
            </tr>
        </thead>
        <tbody>
            {
            config.data.referralContestPrize && config.data.referralContestPrize.map((data, i)=>{
                return (
                <tr key={i}>
                    <td>
                    {i+1}{(function(){
                        if(`${i+1}` === '1' || `${i+1}` === '21' || `${i+1}` === '31' || `${i+1}` === '41'  || `${i+1}` === '51' || `${i+1}` === '61' || `${i+1}` === '71' || `${i+1}` === '81' || `${i+1}` === '91'){
                        return 'st'
                        }
                        else if(`${i+1}`.includes('2')){
                        return 'nd'
                        }
                        else if(`${i+1}`.includes('3')){
                        return 'rd'
                        }
                        else{
                        return 'th'
                        }
                    }())}
                    </td>
                    <td>{data}</td>
                </tr>
                )
            })
            }
        </tbody>
        </Table>
    </div>
  )
}


const Table = styled.table`
  font-size: .7rem;
  margin: auto;
  border-spacing: 0.5rem;
  height: 100%;
  border-collapse: collapse;
  text-align: left;
  cursor: default;

  td, th {
    border: 1px solid #999;
    padding: 0.5rem;
    text-align: left;
    padding: 0.25rem;
  }

  th{
    background: var(--major-color-purest);
    color: #fff;
  }

  tr:nth-child(even) {
    background: #ddd;
  }

  tbody tr:hover {
    background: var(--major-color-30A);
  }

`