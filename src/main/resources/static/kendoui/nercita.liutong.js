//全局的ajax访问，处理ajax清求时sesion超时
$.ajaxSetup({ 
    contentType:"application/x-www-form-urlencoded;charset=utf-8", 
    complete:function(XMLHttpRequest,textStatus){ 
	     var sessionstatus=XMLHttpRequest.getResponseHeader("sessionstatus"); //通过XMLHttpRequest取得响应头，sessionstatus，
	     if(sessionstatus=="timeout"){
	         //如果超时就处理 ，指定要跳转的页面
	         //if(ctxDomain){
	         //	window.location.href= ctxDomain+"/login.jsp";
	         //}else{
	         	window.location.href= "${ctx}/login.jsp";
	         //}
	         return false;
	     } 
    } 
 });

jQuery(function($){  
    // 备份jquery的ajax方法    
    var _ajax=$.ajax;  
    // 重写ajax方法，先判断登录在执行success函数   
    $.ajax=function(opt){  
        var _success = opt && opt.success || function(a, b){}; 
        var _error = opt && opt.error || function(a, b){}; 
        var _opt = $.extend(opt, {  
            success:function(data, textStatus){  
                // 如果后台将请求重定向到了登录页，则data里面存放的就是登录页的源码，这里需要找到data是登录页的证据(标记)
                if((data + "").indexOf("<!DOCTYPE html>") != -1 && (data + "").indexOf("system/user/checkImg") != -1 && (data + "").indexOf("exports['webfed']=exports['webfed'] || {};") == -1) {
                    //if(ctxDomain){
			         //	window.location.href= ctxDomain+"/login.jsp";
			        // }else{
			         	window.location.href= "${ctx}/login.jsp";
			         //}
                    return;  
                }
                _success(data, textStatus);    
            }
        });  
        _ajax(_opt);  
    };  
});  


kendo.ui.plugin(kendo.ui.ComboBox.extend({
    options: {
        name: "ComboBox"
    },

    _filterSource: function () {
        this.dataSource.filter({
            logic: "or",
            filters: [
                { field: "text", operator: "contains", value: this.text() },
                { field: "name", operator: "contains", value: this.text() },
                { field: "pinyin", operator: "contains", value: this.text() },
                { field: "jianpin", operator: "contains", value: this.text() },
                { field: "code", operator: "contains", value: this._prev}
            ]
        });
    }
}));

kendo.ui.plugin(kendo.ui.MultiSelect.extend({
    options: {
        name: "MultiSelect"
    },
    _filterSource: function () {
        this.dataSource.filter({
            logic: "or",
            filters: [
                { field: "text", operator: "contains", value: this._prev },
                { field: "name", operator: "contains", value: this._prev },
                { field: "pinyin", operator: "contains", value: this._prev },
                { field: "jianpin", operator: "contains", value: this._prev },
                { field: "code", operator: "contains", value: this._prev}
            ]
        });
    }
}));


kendo.ui.plugin(kendo.ui.DropDownList.extend({
    options: {
        name: "DropDownList"
    },

    _filterSource: function () {
        this.dataSource.filter({
            logic: "or",
            filters: [
                { field: "text", operator: "contains", value: this._prev },
                { field: "name", operator: "contains", value: this._prev },
                { field: "pinyin", operator: "contains", value: this._prev },
                { field: "jianpin", operator: "contains", value: this._prev },
                { field: "code", operator: "contains", value: this._prev}
            ]
        });
    }
}));


var $productsComparisonTable;
function productsComparison() {
    var $productsComparison = $("#products-comparison");
    if ($productsComparison.length == 0) {
        return;
    }
    var products = webfed.getPageData().products;
    if (products == undefined) {
        return;
    }
    var swiperFlag = products.swiper || false;

    var html = '';
    var $tableWrap = $productsComparison.find("table").addClass("table");
    $tableWrap.empty();

    if (products.names) {
        appendNames(products.names);
        for (var i = 0; i < products.lists.length; i++) {
            appendList(products.lists[i], swiperFlag);
        }
    }
    $tableWrap.prepend($productsComparisonTable);
    $tableWrap.find("tr td").mouseover(function () {
        var index = $(this).index();
        if (index != 0) {
            $tableWrap.find("tr td").removeClass("tdmouseover");
            $tableWrap.find("tr").each(function () {
                $(this).find("td:eq(" + index + ")").addClass("tdmouseover");
            });
        }
    });
    $tableWrap.find("tr td").mouseover(function () {
        var index = $(this).index();
        if (index != 0) {
            $tableWrap.find("tr td").removeClass("tdmouseover");
            $tableWrap.find("tr").each(function () {
                $(this).find("td:eq(" + index + ")").addClass("tdmouseover");
            });
        }
    });
    var mySwiper = new Swiper('.swiper-container', {
        direction: 'horizontal', // 垂直切换选项
        loop: true, // 循环模式选项
        // 如果需要分页器
        pagination: {
            el: '.swiper-pagination',
        },
        // 如果需要前进后退按钮
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    });
}
function appendNames(arr) {
    if (arr.length == 0) { return ''; }
    var str = '<tbody>';
    for (var i = 0; i < arr.length; i++) {
        str += '<tr><td class="cd-products-names">' + arr[i] + '</td></tr>'
    }
    str += '</tbody>';
    $productsComparisonTable = $(str);
}
function appendList(obj, swiperFlag) {
    var str = '';
    var pos = 0;
    if (swiperFlag == false) {
        if (obj.logo && $.trim(obj.logo) != "") {
            var top_logo = '<td class="top-logo">';
            if (obj.href && $.trim(obj.href) != "") {
                top_logo += '    <a href="' + obj.href + '">';
                top_logo += '      <img src="' + obj.logo + '">';
                top_logo += '    </a>';
            } else {
                top_logo += '    <img src="' + obj.logo + '">';
            }
            top_logo += '   </td>';
            $productsComparisonTable.find("tr:eq(" + pos + ")").append(top_logo);
            pos++;
        }//if
    }
    if (swiperFlag == true) {
        if (obj.logo.length) {
            var top_logo = '<td class="top-logo">';
            if (obj.logo.length == 1) {
                top_logo += '    <img src="' + obj.logo + '">';
            } else {
                top_logo += '<div class="swiper-container"><div class="swiper-wrapper">';
                for (var k = 0; k < obj.logo.length; k++) {
                    top_logo += '<div class="swiper-slide"><img src="' + obj.logo[k] + '"></div>';
                }
                top_logo += '</div><div class="swiper-pagination"></div><div class="swiper-button-prev"></div><div class="swiper-button-next"></div></div>';
            }
            top_logo += '   </td>';
            $productsComparisonTable.find("tr:eq(" + pos + ")").append(top_logo);
            pos++;
        }//if
    }

    if (obj.info) {
        var top_info = '<td class="top-info">'
            + '       <h3>' + obj.info + '</h3>'
            + '   </td>';
        $productsComparisonTable.find("tr:eq(" + pos + ")").append(top_info);
        pos++;
    }//if
    for (var i = 1; i < obj.list.length; i++) {
        $productsComparisonTable.find("tr:eq(" + (pos + i - 1) + ")").append('<td>' + obj.list[i] + '</td>');
    }//for
}//function

$(function () {
    productsComparison();
});

/*在KendoGrid中编辑单元格时，使用kendoMultiSelect作为数据源* */
/*刘东明 2018-12-18* */
//editor: ecotopeEditor,
kendo.data.binders.widget.multiValue = kendo.data.Binder.extend({
    init: function (widget, bindings, options) {
        kendo.data.Binder.fn.init.call(this, widget.element[0], bindings, options);
        this.widget = widget;
        this._change = $.proxy(this.change, this);
        this.widget.first("change", this._change);
        this._initChange = false;
    },
    refresh: function () {
        if (!this._initChange) {
            var widget = this.widget;
            var field = widget.options.dataValueField || widget.options.dataTextField;
            var value = this.bindings.multiValue.get() || null;
            console.log("value", value);

            var values = [];
            var selectedValue;
            if (field) {
                if (value instanceof kendo.data.ObservableArray) {
                    for (var idx = 0; idx < value.length; idx++) {
                        selectedValue = value[idx];
                        values[idx] = selectedValue.get ? selectedValue.get(field) : selectedValue;
                    }
                    value = values;
                }
                if (value[field]) {
                    values = value[field].split(",");
                }
            } else {
                values = value;
            }
            widget.value(values);
        }
    },
    change: function () {
        var widget = this.widget;
        //var value = widget.options.valuePrimitive ? widget.value() : widget.dataItems();
        //console.log("value", value);
        var items = widget.dataItems();
        console.log("items", items);
        var ids = [], names = [];
        items.forEach(function (e, i) {
            ids.push(e.id);
            names.push(e.name);
        });
        this._initChange = true;
        this.bindings.multiValue.set({
            "id": ids.join(","),
            "name": names.join(",")
        });
        //this.bindings.multiValue.set(value);
        this._initChange = false;
    }
});

/*--------------------------默认配置--------------------------* */
/*LiuDongMing 2018-12-24*/
/*-------------KendoGrid默认配置-------------* */
function KendoDef() {
    this.type = arguments[0];
    this.field = arguments[1];
    this.prop = arguments[2] || "name";
    return this.init();
}
KendoDef.prototype.init = function () {
    switch (this.type) {
        case "compare":
            return this.sortable();
            break;
        case "template":
            return this.template();
            break;
        default:
            throw new Error("kendo.def不能处理类型" + this.type + "的默认配置");
    }
};
KendoDef.prototype.sortable = function () {
    var self = this;
    return {
        compare: function (obj1, obj2) {
            var s1 = self._value(obj1);
            var s2 = self._value(obj2);
            return s1.localeCompare(s2);
        }
    };
};
KendoDef.prototype.template = function () {
    var self = this;
    return function (obj) {
        return self._value(obj);
    }
};
KendoDef.prototype._value = function (obj) {//内部方法：取得obj.field的值
    var field = this.field;
    var prop = this.prop;
    var value = "";
    if (prop == "") {   //"femaleSeed"
        if (obj[field] != null) value = obj[field];
    } else {          //"femaleSeed.name"
        if (obj != null && obj[field] != null && obj[field][prop] != null) {
            value = obj[field][prop];
        }//if
    }//if-else
    return value;
};
//暴露接口
kendo.defs = function () {
    switch (arguments.length) {
        case 2:
            return new KendoDef(arguments[0], arguments[1]);
            break;
        case 3:
            return new KendoDef(arguments[0], arguments[1], arguments[2]);
            break;
        default:
            throw new Error("kendo.def缺少参数");
    }
};
//处理femaleSeed.name，prop默认值为name
/* sortable: kendo.defs("compare","femaleSeed"),
template: kendo.defs("template","femaleSeed"), */

//处理femaleSeed
/* sortable: kendo.defs("compare","femaleSeed", ""),
template: kendo.defs("template","femaleSeed", ""), */

//处理femaleSeed.code
/* sortable: kendo.defs("compare","femaleSeed","code"),
template: kendo.defs("template","femaleSeed","code"), */

/*kendo MultiSelect获取文字*/
function multiSelectText(id) {
    var array = [];
    var listbox = $("#" + id).closest(".k-widget.k-multiselect").find('[role="listbox"] li');
    for (var i = 0; i < listbox.length; i++) {
        array.push(listbox.eq(i).text());
    }
    //console.log(array.join(","));
    return array.join(",");
}

kendo.tools = {};
kendo.tools.trHighlight = function (options) {
    if (!options.prop || options.prop == "") {//没有属性
        return;
    }
    var defaults = { "id": "grid", "color": "rgb(0,153,203,0.4)" };
    //设置一个空类
    var settings = $.extend({}, defaults, options);
    if (!$("#" + settings.id).length) {
        console.log("没有该id");
        return;
    }
    if (!$("#" + settings.id).data("kendoGrid")) {
        console.log("没有该kendoGrid");
        return;
    }
    var dataView = $("#" + settings.id).data("kendoGrid").dataSource.view();
    console.log("dataView", dataView);
    for (var i = 0; i < dataView.length; i++) {
        if (dataView[i][settings.prop] == true) {
            var uid = dataView[i].uid;
            $("#" + settings.id + " tbody").find("tr[data-uid=" + uid + "] td").css({ "background-color": settings.color });
        }
    }//for
};
//设置一个高度，表内滚动
kendo.tools.limitMaxGridHeight = function (e) {
    //var gridWrapper = e.sender.wrapper;
    var gridDataTable = e.sender.table;
    var gridHead = e.sender.thead;
    var gridPager = e.sender.pager.element;
    var Height = $(window).height()*0.9 - gridHead.height() -  gridPager.height();
    var gridDataArea = gridDataTable.closest(".k-grid-content");
    if(gridDataArea.height() > Height){
        gridDataArea.css({ "cssText": "height:"+Height+"px !important" });
        gridDataTable.css({ "cssText": "height:"+Height+"px !important" });
    }
};

$(document).ready(function () {
    if ($("#zMain").length) {
        $("#zMain").kendoTooltip({
            filter: "button[title]",
            autoHide: true,
            position: "right"
        });
    }
});
function getRandomIndex() {
    return Date.now() + Math.floor((Math.random() * 2 + 1) * 1000);
}
function randomStr() {
    return Math.random().toString(36).substr(2);
}
