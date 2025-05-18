export default function (timestamp, isDetail = false) {
    const date = new Date(+timestamp)


    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    let formatDate = year + '-' + month + '-' + day
    const weekArr = ['星期一','星期二','星期三','星期四','星期五','星期六','星期日',]
    if (isDetail) {
        const hour = date.getHours().toString().padStart(2,'0');
        const min = date.getMinutes().toString().padStart(2,'0');
        const sec = date.getSeconds().toString().padStart(2,'0');
        const day = weekArr[date.getDay()]
        formatDate = formatDate + ' ' + '   '+hour + ':' + min + ":" + sec + ' ' + day;
    }
    return formatDate;


}