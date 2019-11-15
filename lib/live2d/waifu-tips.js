function render(template, context) {

    var tokenReg = /(\\)?\{([^\{\}\\]+)(\\)?\}/g;

    return template.replace(tokenReg, function (word, slash1, token, slash2) {
        if (slash1 || slash2) {
            return word.replace('\\', '');
        }

        var variables = token.replace(/\s/g, '').split('.');
        var currentObject = context;
        var i, length, variable;

        for (i = 0, length = variables.length; i < length; ++i) {
            variable = variables[i];
            currentObject = currentObject[variable];
            if (currentObject === undefined || currentObject === null) return '';
        }
        return currentObject;
    });
}
String.prototype.render = function (context) {
    return render(this, context);
};

function getChromeVersion() {
    let match = window.navigator.userAgent.match(/chrome\/(\d+)/i);
    if (match) {
        return +match[1]
    } else {
        return null
    }
}

(function () {

if (getChromeVersion() >= 72) {
    let element = new Image();
    Object.defineProperty(element, 'id', {
        get: function () {
            showMessage('哈哈，你打开了控制台，是想要看看我的秘密吗？', 5000);
        }
    });
    console.log('%c检测控制台是否开启', element);
} else {
    var re = /x/;
    console.log(re);
    re.toString = function () {
        showMessage('哈哈，你打开了控制台，是想要看看我的秘密吗？', 5000);
        return '';
    };
}
})();

$(document).on('copy', function (){
    showMessage('你都复制了些什么呀，如果要转载，记得加上出处哦', 5000);
});


$.ajax({
    cache: true,
    url: "/lib/live2d/waifu-tips.json",
    dataType: "json",
    success: function (result){
        $.each(result.mouseover, function (index, tips){
            $(document).on("mouseover", tips.selector, function (){
                var text = tips.text;
                if(Array.isArray(tips.text)) text = tips.text[Math.floor(Math.random() * tips.text.length + 1)-1];
                text = text.render({text: $(this).text()});
                showMessage(text, 3000);
            });
        });
        $.each(result.click, function (index, tips){
            $(document).on("click", tips.selector, function (){
                var text = tips.text;
                if(Array.isArray(tips.text)) text = tips.text[Math.floor(Math.random() * tips.text.length + 1)-1];
                text = text.render({text: $(this).text()});
                showMessage(text, 3000,);
            });
        });
    }
});
//console.log('11111' + window.location.pathname + '222222');
(function () {

    var text;
    var referrer = document.createElement('a');
    if (document.referrer !== '') {
        referrer.href = document.referrer;
    }

    if (referrer.href !== '' && referrer.hostname !== 'lilei.blog' && referrer.hostname!=='pro90rushb.github.io') {
        var referrer = document.createElement('a');
        referrer.href = document.referrer;
        text = 'Hello! 来自 <span style="color:#0099cc;">' + referrer.hostname + '</span> 的朋友';
        var domain = referrer.hostname.split('.')[1];
        if (domain == 'baidu') {
            text = 'Hello! 来自 百度搜索 的朋友<br>你是搜索 <span style="color:#0099cc;">' + referrer.search.split('&wd=')[1].split('&')[0] + '</span> 找到的我吗？';
        } else if (domain == 'so') {
            text = 'Hello! 来自 360搜索 的朋友<br>你是搜索 <span style="color:#0099cc;">' + referrer.search.split('&q=')[1].split('&')[0] + '</span> 找到的我吗？';
        } else if (domain == 'google') {
            text = 'Hello! 来自 谷歌搜索 的朋友<br>欢迎阅读<span style="color:#0099cc;">『' + document.title.split(' - ')[0] + '』</span>';
        }
    } else {
        if (window.location.pathname === '/') { //如果是主页
            var now = (new Date()).getHours();
            if (now > 23 || now <= 5) {
                text = '你是夜猫子呀？这么晚还不睡觉，明天起的来嘛';
            } else if (now > 5 && now <= 7) {
                text = '早上好！一日之计在于晨，美好的一天就要开始了';
            } else if (now > 7 && now <= 11) {
                text = '上午好！工作顺利嘛，不要久坐，多起来走动走动哦！';
            } else if (now > 11 && now <= 14) {
                text = '中午了，工作了一个上午，现在是午餐时间！';
            } else if (now > 14 && now <= 17) {
                text = '午后很容易犯困呢，今天的运动目标完成了吗？';
            } else if (now > 17 && now <= 19) {
                text = '傍晚了！窗外夕阳的景色很美丽呢，最美不过夕阳红~';
            } else if (now > 19 && now <= 21) {
                text = '晚上好，今天过得怎么样？';
            } else if (now > 21 && now <= 23) {
                text = '已经这么晚了呀，早点休息吧，晚安~';
            } else {
                text = '嗨~ 快来逗我玩吧！';
            }
        }
    }
    showMessage(text, 6000);
})();

window.setInterval(showHitokoto,30000);

function showHitokoto(){
    $.getJSON('https://v1.hitokoto.cn',function(result){
        showMessage(result.hitokoto + "        ——  " + result.from, 5000);
    });
}

//利用cookie判断是否第一次打开页面
function setCookie(name, value, hour) {
    var exp = new Date();
    exp.setTime(exp.getTime() + hour * 60 * 60 * 1000);
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/;";
}
function getCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    //console.log(arr);
    if (arr != null) {
        return unescape(arr[2]);
    }
    else{
        return null;
    }
}
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);

    if (cval != null) {

        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString()+";path=/;";;
    }
}
function live2dIsHidden() {

    if (getCookie("live2dhidden") === "yes") {

       $('.waifu').hide();
    }
}
live2dIsHidden();

function showMessage(text, timeout){
    if (getCookie("live2dhidden") === "yes")return;
    //windows.name = 'live2dHidden';
    if(Array.isArray(text)) text = text[Math.floor(Math.random() * text.length + 1)-1];
 //   console.log(text);
    $('.waifu-tips').stop();
    $('.waifu-tips').html(text).fadeTo(200, 1);
    if (timeout === null) timeout = 5000;
    hideMessage(timeout);
}
function hideMessage(timeout){
    $('.waifu-tips').stop().css('opacity',1);
    if (timeout === null) timeout = 5000;
    $('.waifu-tips').delay(timeout).fadeTo(200, 0);
}


function initLive2d() {
    $('.hide-button').fadeOut(0).on('click', () => {
        //12分钟重置1次
        setCookie("live2dhidden", "yes", 0.2),
        showMessage('会想你的噢，下次再见啦！', 2000),
        $('.waifu').hide(2000);

    });
    $('.waifu').hover(() => {
        $('.hide-button').fadeIn(600)
    }, () => {
        $('.hide-button').fadeOut(600)
    });
}

initLive2d ();
