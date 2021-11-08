
export function getUniqueItems(data,type){
    let unique = data.map((item) => item[type])
    if(type === "colors"){
        unique = unique.flat().map((col) => col.color)
    }
    return ["all",...new Set(unique)]
}

export function getNumOfDays(from,to){
    var date1 = new Date(from)
    var date2 = new Date(to)
    var Difference_In_Time = date2.getTime() - date1.getTime()
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    return Difference_In_Days
}

export function convertDate(dateString) {
    var p = dateString.split(/\D/g)
    return [p[2], p[1], p[0]].join("-")
}


