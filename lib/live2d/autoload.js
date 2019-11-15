//注意：live2d_path参数应使用绝对路径
const live2d_path = "/lib/live2d/";
//const live2d_path = "/live2d-widget/";
if (typeof (jQuery) == "undefined") {
  document.write("<script type='text/javascript' src='https://cdn.jsdelivr.net/npm/jquery/dist/jquery.min.js'></script>");
}
document.write("<link rel='stylesheet' type='text/css' href='/lib/live2d/waifu-tips.css'/>");
document.write("<script type='text/javascript' src='/lib/live2d/live2d.min.js'></script>");
document.write("<script type='text/javascript' src='/lib/live2d/waifu-tips.js'></script>");
//document.write("<script type='text/javascript'>loadlive2d('live2d','live2d/assets/remu.model.json')</script>");

//添加标签监听
var documentTitle = document.title;
document.addEventListener('visibilitychange', function () { //浏览器切换事件
  if (document.visibilityState == 'hidden') { //状态判断
    //normal_title=document.title;
    document.title = '(*/ω＼*) |' + documentTitle;
  } else {
    document.title = '(｡･∀･)ﾉﾞ |' + documentTitle;
  }
});
console.log(`
  く__,.ヘヽ.        /  ,ー､ 〉
           ＼ ', !-─‐-i  /  /´
           ／｀ｰ'       L/／｀ヽ､
         /   ／,   /|   ,   ,       ',
       ｲ   / /-‐/  ｉ  L_ ﾊ ヽ!   i
        ﾚ ﾍ 7ｲ｀ﾄ   ﾚ'ｧ-ﾄ､!ハ|   |
          !,/7 '0'     ´0iソ|    |
          |.从"    _     ,,,, / |./    |
          ﾚ'| i＞.､,,__  _,.イ /   .i   |
            ﾚ'| | / k_７_/ﾚ'ヽ,  ﾊ.  |
              | |/i 〈|/   i  ,.ﾍ |  i  |
             .|/ /  ｉ：    ﾍ!    ＼  |
              kヽ>､ﾊ    _,.ﾍ､    /､!
              !'〈//｀Ｔ´', ＼ ｀'7'ｰr'
              ﾚ'ヽL__|___i,___,ンﾚ|ノ
                  ﾄ-,/  |___./
                  'ｰ'    !_,.:
`);