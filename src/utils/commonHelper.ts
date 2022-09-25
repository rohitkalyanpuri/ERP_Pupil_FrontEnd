export const formatDate = (date: Date,formate:string) => {
  function pad(s: any) {
    return s < 10 ? "0" + s : s;
  }
  var d = new Date(date);
  if(formate == "mm/dd/yyyy"){
    return [pad(d.getMonth() + 1), pad(d.getDate()), d.getFullYear()].join("/");
  }else {
    return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join("-");
  }
};
