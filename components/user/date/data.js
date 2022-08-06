const date = {
    createdDate: (data)=>{
        const month = ['Jan', 'Feb','Mar', 'Apr', 'May', 'Jun', 'Jul','Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        return <span style={{color: 'var(--bright-color'}}>
          {month[new Date(data.createdAt).getMonth()]} {new Date(data.createdAt).getDate()}, {new Date(data.createdAt).getFullYear()} {`(${new Date(data.createdAt).getHours() > 9 ? new Date(data.createdAt).getHours() : "0" + new Date(data.createdAt).getHours()} : ${new Date(data.createdAt).getMinutes() > 9 ? new Date(data.createdAt).getMinutes() : "0" + new Date(data.createdAt).getMinutes()} : ${new Date(data.createdAt).getSeconds() > 9 ? new Date(data.createdAt).getSeconds() : "0" + new Date(data.createdAt).getSeconds()})`}
        </span>
    },

    updatedDate: (data)=>{
        const month = ['Jan', 'Feb','Mar', 'Apr', 'May', 'Jun', 'Jul','Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        return <span style={{color: 'var(--bright-color'}}>
          {month[new Date(data.updatedAt).getMonth()]} {new Date(data.updatedAt).getDate()}, {new Date(data.updatedAt).getFullYear()} {`(${new Date(data.updatedAt).getHours() > 9 ? new Date(data.updatedAt).getHours() : "0" + new Date(data.updatedAt).getHours()} : ${new Date(data.updatedAt).getMinutes() > 9 ? new Date(data.updatedAt).getMinutes() : "0" + new Date(data.updatedAt).getMinutes()} : ${new Date(data.updatedAt).getSeconds() > 9 ? new Date(data.updatedAt).getSeconds() : "0" + new Date(data.updatedAt).getSeconds()})`}
        </span>
      }
}

export default date;