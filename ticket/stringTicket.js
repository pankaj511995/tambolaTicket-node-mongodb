exports.stringArrayTicket=(arr)=>{
    let str=''
    arr.forEach(element => {
        element.forEach(e=>{
            str+=e.join('|')
        })});
        return str
}
