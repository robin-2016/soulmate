//后端配置文件
var host = "http://192.168.10.104:5000";

var config ={
  host,
  //大数据匹配
  bigdata_url:`${host}/bigdata`,

  //答题，走过的路等
  road_url: `${host}/dati/road`,
  people_url: `${host}/dati/people`,
  book_url: `${host}/dati/book`,
  static_url:`${host}/static`,
  result_url:`${host}/result`
};

//对外把对象返回
module.exports = config