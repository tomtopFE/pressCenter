/**
 * zepto.getcode.js 1.0
 * autor: wangzc92
 */
;(function($, window, document, undefined) {
    $.fn.getcode = function(parameter) {
        parameter = parameter || {};
        var defaults = {
            navClass: '.tab-nav',        //tab导航菜单class
            navAct: 'active',           //tab导航激活class
            itemClass: '.tab-items',       //tab内容class
            itemAct: 'show'              //tab内容激活class
            // type: [],                  //类型列表
            // githubUrl:'',       //github json存放路径
            // projectName: ''   //app项目名
        };
        var options = $.extend({}, defaults, parameter);
        return this.each(function(index) {
            var $tab = $(this);
            var $tabNav = $tab.find(options.navClass);
            var $tabItems = $tab.find(options.itemClass);
            var _navAct = options.navAct;
            var _itemAct = options.itemAct;
            var _type = parameter.type;
            var _githubUrl = parameter.githubUrl;
            var _projectName = parameter.projectName;
            for(var i in _type){
                var is_active=i==0?_navAct:"";
                var is_show=i==0?_itemAct:"";
                var li = '<li class=' + is_active + ' >' + _type[i] + '</li>';
                var item = '<div class="item '+is_show+'"><span class="copy">复制代码</span><textarea id="show_' + _type[i] + '"></textarea></div>';
                var fromJson = _githubUrl + '/' + _projectName + '-' +  _type[i] + '.json';
                $tabNav.append(li);
                $tabItems.append(item);
                var getData=function(item){
                    var toId = 'show_' + _type[item];
                    $.getJSON(fromJson, function(result){
                        var html = template('code', result);
                        document.getElementById(toId).innerHTML = html;
                    })
                }(i);
            }
            tabs();
            codeCopy();
            function tabs(){
                var navs = $tabNav.find("li");
                var items = $tabItems.find(".item");
                navs.click(function(){
                    navs.eq($(this).index()).addClass(_navAct).siblings().removeClass(_navAct);
                    items.hide().eq($(this).index()).show();
                });
            }
            function codeCopy(){
                var codeClipboard = new Clipboard('.copy',{
                    text: function(trigger) {
                        var text=$(trigger).parents(".item").find("textarea").val();
                        return text;
                    }
                });
                codeClipboard.on('success', function(e) {
                    $(e.trigger).addClass("success");
                    setTimeout(function(){$(e.trigger).removeClass("success")}, 3000 )
                });
            }
        });
    };
})(Zepto, window, document);