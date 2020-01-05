// 实现一个日期格式化函数
export function fmtDate(date){
    var d =new Date(date);
    var y = d.getFullYear();
    var m = d.getMonth()+1;
    var day = d.getDate();
    if(parseInt(m)<10){
        m = '0'+m;
    }
    if(parseInt(day)<10){
        day = '0'+day;
    }
    var date = y + '-' + m + '-'+ day;
    return date
    
  } 