; (function ($, h, c) { var a = $([]), e = $.resize = $.extend($.resize, {}), i, k = "setTimeout", j = "resize", d = j + "-special-event", b = "delay", f = "throttleWindow"; e[b] = 350; e[f] = true; $.event.special[j] = { setup: function () { if (!e[f] && this[k]) { return false } var l = $(this); a = a.add(l); $.data(this, d, { w: l.width(), h: l.height() }); if (a.length === 1) { g() } }, teardown: function () { if (!e[f] && this[k]) { return false } var l = $(this); a = a.not(l); l.removeData(d); if (!a.length) { clearTimeout(i) } }, add: function (l) { if (!e[f] && this[k]) { return false } var n; function m(s, o, p) { var q = $(this), r = $.data(this, d); r.w = o !== c ? o : q.width(); r.h = p !== c ? p : q.height(); n.apply(this, arguments) } if ($.isFunction(l)) { n = l; return m } else { n = l.handler; l.handler = m } } }; function g() { i = h[k](function () { a.each(function () { var n = $(this), m = n.width(), l = n.height(), o = $.data(this, d); if (m !== o.w || l !== o.h) { n.trigger(j, [o.w = m, o.h = l]) } }); g() }, e[b]) } })(jQuery, this);
(function (exports) {
	exports['webfed'] = exports['webfed'] || {};
	if (exports['webfed']['setPageData']) return;
	var data = {};
	exports['webfed']['setPageData'] = function (obj) {
		data = $.extend({}, data, obj);
	};
	exports['webfed']['getPageData'] = function (attr) {
		return attr ? data && data[attr] : data;
	};
})(window);
; (function () {
	CheckHolder = function (holder, callback) {
		this.holder = $(holder);
		if (typeof callback != 'function') {
			callback = function () {
			}
		}
		this.callback = callback;
		this.init();
	}
	CheckHolder.prototype.init = function () {
		this.checkAlls = this.holder.find(".check-all");
		this.update();
	}
	CheckHolder.prototype.update = function () {
		var $holder = this.holder, $checkAlls = this.checkAlls, that = this;
		$checkAlls
			.each(function (i) {
				var $checkAll = $(this), belong = $checkAll
					.attr("data-belong"), $checks = $holder.find(
						"[data-belong='" + belong + "']").not($checkAll);
				that.check($checkAll, $checks);
			});
	}
	CheckHolder.prototype.check = function ($checkAll, $checks) {
		var that = this;
		$checkAll.off("click.check");
		$checks.off("click.check");
		$checkAll.on("click.check", function () {
			var checked = false;
			if ($checkAll.prop("checked")) {
				checked = true;
			}
			$checks.each(function () {
				var $check = $(this);
				$check.prop("checked", checked);
				that.callback($check);
			})
		});
		$checks.on("click.check", function () {
			var $check = $(this);
			if ($check.prop("checked")) {
				if ($checks.filter(":checked").size() == $checks.size()) {
					$checkAll.prop("checked", true);
				}
			} else {
				$checkAll.prop("checked", false);
			}
			that.callback($check);
		});
	}
	CheckHolder.prototype.uncheckAll = function () {
		this.checkAlls.prop("checked", false);
	}
})();
;
(function () {
	var switchCrop = function () {
		var $switchTarget = $("#switchCrop"), $switchHead = $switchTarget
			.find(".switch-hd"), $switchBody = $switchTarget
				.find(".switch-bd"), $crops = $switchTarget.find(".crops"), $items = $crops
					.children(), $name = $switchTarget.find(".name"), $triangle = $switchTarget
						.find(".triangle"), tw = $triangle.attr("data-tooltip");
		$switchHead.on("click", function (e) {
			e.preventDefault();
			e.stopPropagation();
			if ($switchTarget.hasClass("switch-open")) {
				hide();
			} else {
				open();
			}
		});
		$items.on("click", function (e) {
			e.preventDefault();
			e.stopPropagation();
			var $item = $(this);
			changeCrop($item.attr("value")); /* 切换作物* */
			$name.text($item.text());
			$items.removeClass("selected");
			$item.addClass("selected");
			hide();
		});
		var open = function () {
			$switchBody.show();
			$switchTarget.addClass("switch-open");
		}
		var hide = function () {
			$switchBody.hide();
			$switchTarget.removeClass("switch-open");
		}
		var showTips = function () {
			var offset = $triangle.offset(), $tips = $("<span class='switch-tips' style='left:"
				+ (offset.left - 30)
				+ "px;top:"
				+ (offset.top - 28)
				+ "px;'>" + tw + "</span>");
			$("body").append($tips);
		}
		var hideTips = function () {
			$(".switch-tips").remove();
		}
		$triangle.on("mouseenter", function () {
			showTips();
		}).on("mouseleave", function () {
			hideTips();
		});
		$("body").on("click", function () {
			hide();
		});
	}
	var switchQuery = function () {
		var $advancedQuery = $("#advancedQuery"), $basicQuery = $("#basicQuery"), $advancedQueryBtn = $("#advancedQueryBtn"), $basicQueryBtn = $("#basicQueryBtn");

		$advancedQueryBtn.on("click", function () {
			$basicQuery.hide();
			$advancedQuery.show();
		});
		$basicQueryBtn.on("click", function () {
			$advancedQuery.hide();
			$basicQuery.show();
		});
	}
	var quickChannel = function () {
		var $quickChannel = $("#quickChannel"), $cls = $quickChannel
			.children(".cl"), $add = $quickChannel.find(".add"), $quickPanels = $("#quickPanels"), $panels = $quickPanels
				.children(".panel");
		$cls
			.on(
				"mouseenter",
				function (e) {
					e.preventDefault();
					e.stopPropagation();
					var $cl = $(this), i = $cl.index(), $panel = $panels
						.eq(i), offset = $cl.offset();
					if ($panel.is(":visible")) {
						$panel.hide();
					} else {
						$panel
							.css({
								top: (offset.top
									+ $cl.outerHeight() + 12),
								left: (offset.left + ($cl
									.outerWidth() - 75) / 2)
							});
						$panel.show();
					}
				});
		$("body").on("click", function () {
			$panels.hide();
		});
		$add
			.on(
				"click",
				function () {
					$add
						.before('<span class="cl"><i class="icon icon-func"></i>功能</span>');
					if ($quickChannel.children(".cl").size() >= 4) {
						$add.hide();
					}
				});
	}
	var advancedQuery = function () {
		var $advancedQuery = $("#advancedQuery"), $propertyQuery = $advancedQuery
			.find(".property-query"), $stateQuery = $advancedQuery
				.find(".state-query"), $propCondHolder = $propertyQuery
					.find(".condition-holder"), $stateCondHolder = $stateQuery
						.find(".condition-holder"), $pCondWrap = $propertyQuery
							.find(".cond-wrap"), $sCondWrap = $stateQuery
								.find(".cond-wrap"), $pAdd = $propCondHolder.find(".add"), $pDel = $propCondHolder
									.find(".del"), $sAdd = $stateCondHolder.find(".add"), $sDel = $stateCondHolder
										.find(".del"), pTpl = '<div class="cond-group"><span class="cond-item"><select class="s1"><option>并且</option></select><select><option>系谱</option></select><input type="text" value="" class="ipt"/><select><option>模糊</option><option>精确</option></select></span><span class="cond-item"><select class="s1"><option>并且</option></select><select><option>系谱</option></select><input type="text" value="" class="ipt"/><select><option>模糊</option><option>精确</option></select></span></div>', sTpl = '<div class="cond-group"><span class="cond-item"><select class="s1"><option>并且</option></select><select><option>抗病性</option></select><select><option>大于</option><option>小于</option></select><input type="text" value="" class="ipt"/></span><span class="cond-item"><select class="s1"><option>并且</option></select><select><option>抗病性</option></select><select><option>大于</option><option>小于</option></select><input type="text" value="" class="ipt"/></span></div>';
		$pAdd.on("click", function () {
			$pCondWrap.append(pTpl);
		});
		$pDel.on("click", function () {
			$pCondWrap.find(".cond-group").filter(":gt(1)").last().remove();
		});
		$sAdd.on("click", function () {
			$sCondWrap.append(sTpl);
		});
		$sDel.on("click", function () {
			$sCondWrap.find(".cond-group").filter(":gt(1)").last().remove();
		});
	}
	var breedingExperiment = function () {
		var checkHolder, checkHolder1, $breedingExperiment = $("#breedingExperiment"), $add = $breedingExperiment
			.find(".btn-add"), $remove = $breedingExperiment
				.find(".btn-remove"), $up = $breedingExperiment.find(".btn-up"), $down = $breedingExperiment
					.find(".btn-down"), $reset = $breedingExperiment
						.find(".btn-reset"), $experimentMaterialChoose = $("#experimentMaterialChoose"), $experimentMaterial = $("#experimentMaterial"), $emcTBody = $experimentMaterialChoose
							.find("tbody"), $emTBody = $experimentMaterial.find("tbody");
		checkHolder = new CheckHolder($experimentMaterialChoose, function (
			$check) {
			if ($check.is("[data-parent]")) {
				var $parent = $check.parents($check.attr("data-parent"));
				if ($check.prop("checked")) {
					$parent.addClass("selected");
				} else {
					$parent.removeClass("selected");
				}
			}
		});
		checkHolder1 = new CheckHolder($experimentMaterial, function ($check) {
			if ($check.is("[data-parent]")) {
				var $parent = $check.parents($check.attr("data-parent"));
				if ($check.prop("checked")) {
					$parent.addClass("selected");
				} else {
					$parent.removeClass("selected");
				}
			}
		});
		$add
			.on(
				"click",
				function () {
					var $selectedRows = $emcTBody.find(".selected");
					$selectedRows
						.each(function () {
							var $selectedRow = $(this), $emLast = $emTBody
								.find("tr").last(), no = $emLast
									.size() == 0 ? 0
									: parseInt($emLast.find(
										"td:eq(1)").text());
							$emTBody
								.append('<tr data-number="'
									+ $selectedRow.find(
										"td:eq(1)")
										.text()
									+ '"><td><input type="checkbox" value="" class="check" data-belong="em1" data-parent="tr"/></td><td>'
									+ (no + 1)
									+ '</td><td>'
									+ $selectedRow.find(
										"td:eq(2)")
										.text()
									+ '</td><td>'
									+ $selectedRow.find(
										"td:eq(3)")
										.text()
									+ '</td><td><input type="checkbox" value="" class="check"/></td><td><input type="checkbox" value="" class="check" data-belong="em2"/></td><td><input type="checkbox" value="" class="check" data-belong="em3"/></td><td><input type="checkbox" value="" class="check" data-belong="em4"/></td></tr>');
							$selectedRow.remove();
						});
					updateCheck();
				});
		$remove
			.on(
				"click",
				function () {
					var $selectedRows = $emTBody.find(".selected");
					$selectedRows
						.each(function () {
							var $selectedRow = $(this)
							$emcTBody
								.append('<tr><td><input type="checkbox" value="" class="check" data-belong="em" autocomplete="off" data-parent="tr"/></td><td>'
									+ $selectedRow
										.attr("data-number")
									+ '</td><td>'
									+ $selectedRow.find(
										"td:eq(2)")
										.text()
									+ '</td><td>'
									+ $selectedRow.find(
										"td:eq(3)")
										.text()
									+ '</td></tr>');
							$selectedRow.remove();
						});
					updateNo();
					updateCheck();
				});
		var updateNo = function () {
			var $rows = $emTBody.find("tr");
			$rows.each(function (i) {
				var $row = $(this);
				$row.find("td:eq(1)").text(i + 1);
			});
		}
		$up.on("click", function () {
			var $selectedRows = $emTBody.find(".selected");
			$selectedRows.each(function () {
				var $selectedRow = $(this), $prevRow = $selectedRow.prev("tr");
				if ($prevRow.size() > 0 && !$prevRow.hasClass("selected")) {
					$prevRow.before($selectedRow);
				}
			});
			updateNo();
		});
		$down
			.on(
				"click",
				function () {
					var $selectedRows = $emTBody.find(".selected"), size = $selectedRows
						.size();
					$selectedRows.each(function (i) {
						var $selectedRow = $selectedRows.eq(size - 1
							- i), $nextRow = $selectedRow
								.next("tr");
						if ($nextRow.size() > 0
							&& !$nextRow.hasClass("selected")) {
							$nextRow.after($selectedRow);
						}
					});
					updateNo();
				});
		$reset.on("click", function () {
			location.reload();
		});
		var updateCheck = function () {
			checkHolder.uncheckAll();
			checkHolder.update();
			checkHolder1.uncheckAll();
			checkHolder1.update();
		}
	}
	function collapsed(e) {
		var $switch1 = $("#leftSwitch"),
			$switch2 = $("#leftSwitch2"),
			$leftArea = $("#zLeft"),
			$rightArea = $("#zRight");
		$switch1.attr("title", "关闭");
		$switch2.attr("title", "关闭");
		var width = parseFloat($leftArea.data("aniW"));
		if ($leftArea.hasClass("collapsed")) {
			$switch1.attr("title", "关闭");
			$switch2.attr("title", "关闭");
			$leftArea.animate({
				width: 200
			}, function () {
				$leftArea.removeClass("collapsed");
				$(window).resize();
			});
			$rightArea.animate({
				marginLeft: 200
			});
			$switch1.animate({
				left: 200 - 10
			});
			$switch2.animate({
				left: 200 - 10
			});
			gridHeaderAutoScrollable(-142);
		} else {
			$switch1.attr("title", "展开");
			$switch2.attr("title", "展开");
			$leftArea.animate({
				width: 58
			}, function () {
				$leftArea.addClass("collapsed");
				$(window).resize();
			});
			$rightArea.animate({
				marginLeft: 58
			});
			$switch1.animate({
				left: 48
			});
			$switch2.animate({
				left: 48
			});
			gridHeaderAutoScrollable(142);
		}
	}
	var bottomSwitch = function () {
		var $switch1 = $("#leftSwitch"), $leftArea = $("#zLeft");
		$leftArea.data("aniW", $leftArea.width());
		$switch1.on("click", collapsed);
	}
	var bottomSwitch2 = function () {
		var $switch2 = $("#leftSwitch2"), $leftArea = $("#zLeft");
		$leftArea.data("aniW", $leftArea.width());
		$switch2.on("click", collapsed);
	}
	var adjustLeft = function () {
		var $dragbar = $("#dragbar"), $switch1 = $("#leftSwitch"),
			$leftArea = $("#zLeft"), $rightArea = $("#zRight"),
			state = false, sx, minW = 200, maxW = 500, $body = $("body");
		$dragbar.on("mousedown", function (e) {
			state = true;
			sx = e.pageX;
			$body.css("cursor", "w-resize").addClass("user-select");
			/*unselectable为IE准备,onselectstart为Chrome、Safari准备,-moz-user-select是FF的css* */
			/*<div unselectable="on" onselectstart="return false;" style="-moz-user-select:none;">* */
		});
		$body.on("mousemove", function (e) {
			if (!state)
				return;
			var ex = e.pageX, mx = ex - sx, w = $leftArea.outerWidth() + mx;
			if (w < minW)
				return;
			else if (w > maxW)
				return;
			sx = ex;
			$leftArea.width(w);
			$leftArea.css({
				marginRight: -w
			});
			$rightArea.css({
				marginLeft: w
			});
			$switch1.css({
				left: w - 10
			});
			$leftArea.data("aniW", w);
			/*return false;* */
		}).on("mouseup", function () {
			state = false;
			$body.css("cursor", "default").removeClass("user-select");
		});
		/*用js实现禁用鼠标拖动链接的文字* */
		$(".side-menu li a").attr("ondragstart", "return false");
	}
	var accordion = function () {
		var $accordionWrap = $(".accordion-wrap"), $accordions = $accordionWrap
			.find(".accordion");
		$accordions.each(function () {
			var $accordion = $(this), $accordionHeader = $accordion
				.find(".accordion-header"), $accordionContent = $accordion
					.find(".accordion-content"), acH = $accordionContent
						.outerHeight();
			$accordionHeader.on("click", function () {
				if ($accordion.hasClass("accordion-close")) {
					$accordion.removeClass("accordion-close");
					$accordionContent.animate({
						height: acH
					});
				} else {
					$accordion.addClass("accordion-close");
					$accordionContent.animate({
						height: 0
					});
				}
			});
		});
	}
	$(function () {
		switchCrop();
		switchQuery();
		quickChannel();
		/*accordion();* */
		advancedQuery();
		bottomSwitch();
		bottomSwitch2();
		adjustLeft();
		breedingExperiment();
	});
})();
/*左侧导航栏展开/关闭，对Grid可滚动区域头部宽度的影响* */
function gridHeaderAutoScrollable(width) {
	if (webfed["getPageData"]('verticalScrollbar') != true) {
		return;
	}
	if (webfed["getPageData"]('grid') == "") {
		return;
	}
	var id = webfed["getPageData"]('grid');
	var $grid = $(id);
	var $header = $(id + " .k-grid-header");
	var $headerScrollable = $header.find(".k-grid-header-wrap.k-auto-scrollable");
	$headerScrollable.css("width", $headerScrollable.width() + width);
}



$(function () {
	function autoHeight() {
		/*设置左侧菜单最小高度，默认垂直到底* */
		var WH = $(window).height();
		var $bottom = $("#zBottom");
		var $right = $("#zRight");
		var $footerDiv = $(".footerDiv");
		var accordionH = $("#zLeft .accordion-wrap").height() + 32;
		if ($bottom.length != 0) {/*左侧导航菜单* */
			$bottom.css("min-height", Math.max(WH - $bottom.offset().top, accordionH));
		}
		if ($right.length != 0) {/*右侧内容区域* */
			$right.css("min-height", Math.max(WH - $right.offset().top, accordionH));
			var $zMain = $("#zMain");
			var $zPanel = $("#zPanel");
			if ($zMain.length != 0) {
				$zMain.css("min-height", "auto");
				if ($footerDiv.length == 0) $zMain.append("<div class='footerDiv'></div>");
			}else if($zPanel.length != 0){
				if ($footerDiv.length == 0) $zPanel.append("<div class='footerDiv'></div>");
			}
		}
	}
	$(window).load(autoHeight);
	$(window).resize(autoHeight);

	function autoSwitch() {
		/*leftSwitch伸缩按钮，根据页面垂直滚动条的滚动，重新计算top* */
		var $switch = $("#leftSwitch"), $leftArea = $("#zLeft");
		if ($switch.length != 0 && $leftArea.length != 0) {
			var autoH = $leftArea.height();
			var fixedH = $(window).height() - $leftArea.offset().top;
			var scrollTop = $(this).scrollTop();
			$switch.css("top", fixedH / 2 + scrollTop);
		}
	}
	$(window).load(autoSwitch);
	$(document).scroll(autoSwitch);
	/*修正readonly背景色，去掉firefox光标* */
	/*$("input[readonly]").css({"opacity":"0.5","filter":"alpha(opacity=50)"});* */
	$("input[readonly]").focus(function () {
		$(this).blur();
	});
	/*左侧导航栏，设置鼠标经过时的提示文字* */
	var $a = $(".accordion-content ul.side-menu li a");
	$a.each(function () {
		$(this).attr("title", $(this).text());
	});


	$(window).scroll(function () {
		/*没有考虑突然新加20条数据，突然减少20条数据，在页面上去掉表格的滚动条* */
		if (webfed["getPageData"]('verticalScrollbar') != true) {
			return;
		}
		if (webfed["getPageData"]('grid') == "") {
			return;
		}
		var id = webfed["getPageData"]('grid');
		var $grid = $(id);
		var $header = $(id + " .k-grid-header");
		var $content = $(id + " .k-grid-content.k-auto-scrollable");
		var $footer = $(id + " .k-pager-wrap.k-grid-pager");

		var gridHeight = $content.height();   /*表格高度:1300px* */
		var $scrollTr = $(id + " .k-grid-content.k-auto-scrollable table tr");
		var $pager = $(".k-pager-wrap.k-grid-pager.k-floatwrap");
		var $locked = $(id + " .k-grid-content-locked");
		var $lockedTr = $(id + " .k-grid-content-locked table tbody tr");

		/*当滚动到一定高度时，tr消失与显示* */
		var windowHeight = $(window).height();   /*浏览器窗口的高度* */
		var scrollTop = $(this).scrollTop();
		var gridTop = $grid.offset().top;

		/*控制表格中显示的部分* */
		function scrollTr() {
			var sh = 0;
			$scrollTr.show();
			$scrollTr.each(function () {
				sh += $(this).height();
				var i = $(this).index();
				if (sh <= windowHeight + scrollTop - gridTop || i == 0) {
					$(this).show(0, function () {
						if ($locked.length) {/*有左侧固定列* */
							/*$lockedTr.eq(i).css("height",$scrollTr.eq(i).height());* */
							var lockedHeight = $lockedTr.eq(i).outerHeight();
							var scrollHeight = $scrollTr.eq(i).outerHeight();
							if (scrollHeight >= lockedHeight) {
								$lockedTr.eq(i).css("outerHeight", scrollHeight);
							} else {
								$scrollTr.eq(i).css("outerHeight", lockedHeight);
							}
						}/*if* */
					});
					$(this).show(0);
				} else {
					$(this).hide(0);
				}
			});
		}

		var $headerLocked = $header.find(".k-grid-header-locked");
		var $headerScrollable = $header.find(".k-grid-header-wrap.k-auto-scrollable");

		/*内容区域有水平滚动条时，header超出父容器* */
		$content.scroll(function () {
			if ($locked.length != 0 && id == "#grid" && webfed["getPageData"]('gridContentLocked') != true) {
				return;
			}
			var scrollLeft = $(this).scrollLeft();
			if ($header.hasClass("fudong")) {
				if ($headerLocked.length && $headerScrollable.length) {
					/*此时什么都不用做* */
				} else {
					$header.css("margin-left", -scrollLeft - 1);
				}
			}/*if* */
			if (scrollLeft != 0 && !$header.hasClass("fudong") && !$headerLocked.length && !$headerScrollable.length) {
				$content.css("margin-top", $header.height());
				if ($locked.length) $locked.css("margin-top", $header.height());
				$header.css({ "position": "absolute", "margin-left": -scrollLeft - 1 });
			}/*if* */
			if (scrollLeft == 0) {/*防止滚动条和header滚动不同步* */
				$header.css({ "margin-left": 0 });
			}/*if* */
			if (($locked.length && id == "#evaluateGrid") || webfed["getPageData"]('gridContentLocked') == true) {
				/*console.log("$content.scrollTop",$content.scrollTop());* */
				$locked.css({ "top": -$content.scrollTop() });
				/*if($locked.length) $locked.css("margin-top",$header.height());* */
			}
		});

		if (id == "#grid" && webfed["getPageData"]('gridContentLocked') != true) {
			if (scrollTop >= gridTop) {
				if ($locked.length) {
					/*表格头部固定* */
					/*$content.css("margin-top",$header.height());/*使用间距比添加标签更有效  2018-11-15(delete)* */
					/*$locked.css("margin-top",$header.height());/*2018-11-15(delete)* */
					$header.closest("div.z-table").css({ "position": "relative", "overflow": "hidden" });
					$header.css({ "position": "relative", "z-index": "99", "padding-right": "19px" }).addClass("fudong");/*2018-11-15(static)* */
					$header.animate({ "top": (scrollTop - gridTop - 1) }, 0);
					/*控制表格中显示的部分* */
					scrollTr();
				} else {
					$content.css({ "max-height": $(window).height() - $header.height() - $footer.height() - 17, "overflow-y": "scroll" });
				}
			} else if (scrollTop < gridTop) {
				if ($locked.length) {
					$content.css("margin-top", 0);
					$locked.css("margin-top", 0);
					$header.css({ "position": "relative", "top": "0", "z-index": "1" }).removeClass("fudong");/*2018-11-15(static)
	        		/*控制表格中显示的部分* */
					scrollTr();
				}
			}/*if-else* */
		}/*if* */


		if (($locked.length && id == "#evaluateGrid") || webfed["getPageData"]('gridContentLocked') == true) {
			if (scrollTop >= gridTop) {
				$header.closest("div.z-table").css({ "position": "relative", "overflow": "hidden" });
				$header.css({ "position": "absolute", "z-index": "99", "padding-right": "19px" }).addClass("fudong");
				$headerLocked.css({ "position": "relative", "z-index": "1" });
				$headerScrollable.css({ "margin-left": 0 });
				$header.animate({ "top": (scrollTop - gridTop - 1) }, 0);
				var contentHeight = $(window).height() - $header.height() - $footer.height() - 17;
				$content.css({ "max-height": $(window).height() - $header.height() - $footer.height(), "overflow-y": "scroll", "margin-bottom": 37 });
				$grid.css({ "max-height": $(window).height() - $header.height() + 10, "overflow-y": "hidden" });
				$locked.css({ "margin-bottom": 17 });
				$footer.css({ "position": "absolute", "z-index": "99", "bottom": "0", "width": $grid.outerWidth() - 2 });
			} else if (scrollTop < gridTop) {
				$header.css({ "position": "static", "top": "0", "z-index": "4" }).removeClass("fudong");
				$headerLocked.css({ "position": "absolute", "z-index": "99" });
				$headerScrollable.css({ "margin-left": $headerLocked.width() + 1 });
			}/*if-else* */
		}/*if* */


	});
	function setGridContentLocked() {

	}
	webfed["setPageData"]({
		setGridContentLocked: setGridContentLocked
	});
});

/*LiuDongMing*/
$(function () {
	/* 使用KendoUI替代Alert提示框、Confirm确认框 * */
	var flag = false;
	var myKendoConfirm = function (options) {
		this.defaults = {
			text: "",        /*提示文本* */
			css: "",
			textCSS: "",     /*自定义文本样式* */
			autoClose: false, /*自动关闭* */
			time: 2000,      /*time秒后，弹框自动关闭* */
			title: "",       /*提示* */
			manipute: null,  /*关闭按钮触发的事件* */
			cancel: null,    /*关闭按钮触发的事件* */
			okVal: "确定",       /*确认按钮文字* */
			cancelVal: "取消"    /*取消按钮文字* */
		};
		this.type = -1;/*按钮类型* */
		this.options = $.extend({}, this.defaults, options);
		this.init();
		this.setOptions();
	};
	myKendoConfirm.prototype.init = function () {
		var self = this;
		if ($("#kendoConfirm").length != 0) {
			/*$("body").remove($("#kendoConfirm"));* */
			$("#kendoConfirm").remove();
		}
		if (this.options.okVal != "" && this.options.cancelVal == "") {/*确定，警示提示框* */
			this.type = 0;/*按钮类型* */
			var tpl = [
				'    <div id="kendoConfirm" style="min-height:150px;position:relative;">',
				'        <p class="content"  style="margin-bottom:40px;font-size:15px;text-align:justify;' + this.options.textCSS + '"></p>',
				'        <div style="text-align:center;position:absolute;bottom:0;left:0;width:100%;height:40px;">',
				'            <button id="kendoButtonOK" type="button">' + this.options.okVal + '</button>',
				'        </div>',
				'    </div>'
			].join('');
		}
		if (this.options.okVal != "" && this.options.cancelVal != "") {/*确定、取消，询问提示框* */
			this.type = 1;/*按钮类型* */
			var tpl = [
				'    <div id="kendoConfirm" style="min-height:150px;position:relative;">',
				'        <p class="content"  style="margin-bottom:40px;font-size:15px;text-align:justify;' + this.options.textCSS + '"></p>',
				'        <div style="text-align:center;position:absolute;bottom:0;left:0;width:100%;height:40px;">',
				'            <button id="kendoButtonOK" type="button">' + this.options.okVal + '</button>',
				'            <button id="kendoButtonCancel" type="button">' + this.options.cancelVal + '</button>',
				'        </div>',
				'    </div>'
			].join('');
		}
		if (this.options.okVal == "" && this.options.cancelVal == "") {/*操作成功提示框，没有标题、确认、取消按钮，一闪而过* */
			this.type = 2;/*按钮类型* */
			var tpl = [
				'    <div id="kendoConfirm" style="min-height:150px;position:relative;">',
				'        <p class="content"  style="font-size:15px;text-align:justify;' + this.options.textCSS + '"></p>',
				'    </div>'
			].join('');
		}
		if (this.options.okVal == "" && this.options.cancelVal != "") {/*只有取消按钮，询问提示框* */
			this.type = 3;/*按钮类型* */
			var tpl = [
				'    <div id="kendoConfirm" style="min-height:150px;position:relative;">',
				'        <p class="content"  style="margin-bottom:40px;font-size:15px;text-align:justify;' + this.options.textCSS + '"></p>',
				'        <div style="text-align:center;position:absolute;bottom:0;left:0;width:100%;height:40px;">',
				'            <button id="kendoButtonCancel" type="button">' + this.options.cancelVal + '</button>',
				'        </div>',
				'    </div>'
			].join('');
		}
		$(tpl).appendTo($("body"));
		/*使用kendoWindow替代Confirm提示框* */
		var width = "300px";
		if (this.options.width) {
			width = this.options.width;
		}
		$("#kendoConfirm").kendoWindow({
			width: width,
			actions: ["Close"],
			modal: true,     /*灰色背景* */
			visible: false,  /*不可见* */
			pinned: true,     /*不随页面滚动条滚动* */
			title: this.options.title    /*提示* */
		});
	};
	myKendoConfirm.prototype.setOptions = function () {
		var self = this;
		var $p = $("#kendoConfirm p.content");
		$p.html(this.options.text);/*内容* */
		var $content = $("#kendoConfirm p.content");

		var dialog = $("#kendoConfirm").data("kendoWindow");
		/*根据文字宽度，调整窗口宽度* */
		var textNum = $content.text().length;
		if (textNum <= 18) {
			$content.css("text-align", "center");
		}
		/*console.log("文字个数",textNum);* */
		if (textNum >= 200 && textNum < 300) {
			dialog.setOptions({
				width: 400
			});
		} else if (textNum >= 300 && textNum < 400) {
			dialog.setOptions({
				width: 450
			});
		} else if (textNum >= 400 && textNum < 500) {
			dialog.setOptions({
				width: 500
			});
		} else if (textNum >= 500 && textNum < 600) {
			dialog.setOptions({
				width: 550
			});
		} else if (textNum >= 600 && textNum < 600) {
			dialog.setOptions({
				width: 600
			});
		} else if (textNum >= 700) {
			dialog.setOptions({
				width: 650
			});
			$content.css({ "max-height": 600, "overflow-y": "scroll" });
		}

		if ($content.height() <= $content.css("max-height")) {
			$content.css({ "overflow-y": "hidden", "overflow-x": "hidden" });
		}

		dialog.center().toFront().open();  /*视口居中、z-index最上层、打开* */
		if (this.options.autoClose == true) {
			setTimeout(function () {
				dialog.close();
			}, this.options.time);/*自动关闭* */
		}
		switch (this.type) {
			case 0:
				$p.css("margin-top", ($("#kendoConfirm").height() - $p.height() - 40) / 2);
				/*确认按钮* */
				$("#kendoButtonOK").kendoButton({
					icon: "check",
					click: function () {
						var dialog = $("#kendoConfirm").data("kendoWindow");
						/*dialog.bind("close",self.options.manipute);* */
						dialog.close();
					}
				});
				if (typeof self.options.manipute == 'function') {
					dialog.bind("close", self.options.manipute);
				}
				break;
			case 1:
				$p.css("margin-top", ($("#kendoConfirm").height() - $p.height() - 40) / 2);
				/*确认按钮* */
				$("#kendoButtonOK").kendoButton({
					icon: "check",
					click: function () {
						flag = true;
						var dialog = $("#kendoConfirm").data("kendoWindow");
						if (typeof self.options.manipute == 'function') {
							dialog.bind("close", self.options.manipute);
						}
						dialog.close();
					}
				});
				/*取消按钮* */
				$("#kendoButtonCancel").kendoButton({
					icon: "close",
					click: function () {
						flag = false;
						var dialog = $("#kendoConfirm").data("kendoWindow");
						if (typeof self.options.cancel == 'function') {
							dialog.bind("close", self.options.cancel);
						}
						dialog.close();
					}
				});
				if (typeof self.options.cancel == 'function') {/*点击X，行为同取消按钮* */
					$(".k-window-actions").bind("click", self.options.cancel);
				}
				break;
			case 2:
				$p.css("margin-top", ($("#kendoConfirm").height() - $p.height()) / 2);
				if (typeof self.options.manipute == 'function') {
					dialog.bind("close", self.options.manipute);
				}
				break;
			case 3:
				$p.css("margin-top", ($("#kendoConfirm").height() - $p.height() - 40) / 2);
				/*取消按钮* */
				$("#kendoButtonCancel").kendoButton({
					icon: "close",
					click: function () {
						var dialog = $("#kendoConfirm").data("kendoWindow");
						if (typeof self.options.cancel == 'function') {
							dialog.bind("close", self.options.cancel);
						}
						dialog.close();
					}
				});
				if (typeof self.options.manipute == 'function') {
					dialog.bind("close", self.options.manipute);
				}
				break;
		}/*switch* */
		dialog.bind("close", function () {
			dialog.destroy();
		});
	};
	window["customKendoAlert"] = function (options) {
		return new myKendoConfirm($.extend({ autoClose: true, okVal: "", cancelVal: "" }, options));
	};
	window["customKendoConfirm"] = function (options) {
		return new myKendoConfirm(options);
	};
});

$.ucasTpl = function (tpl, data) {
	return tpl.replace(/(?:\{(\w+)\})/g, function (all, $1) {
		return data[$1];
	});
};

//页面引导
$(function () {
	//段落模板
	var p_tpl = '<p style="{style}">{content}</p>';
	var p_config = {
		type: "p",      //文本
		content: "",
		style: "font-size:14px;color:#000;text-indent:28px;margin: 12px 0;line-height:23px;",
	};
	//图片模板
	var image_tpl = [
		'<div style="text-align:{align}"><a href="javascript:;" data-lightbox="image"><img src="{url}" class="image" width="{width}" height="{height}"/></a></div>'
	].join('');
	var image_config = {
		type: "img",      //图片
		url: "",
		original: false,//图片原始大小
		width: 100,
		height: 100,
		align: "center",
		style: ""
	};
	var creatContent = function (array) {
		var str = "<div>";
		for (var i = 0; i < array.length; i++) {
			var item = array[i];
			if (item.type == "img") {  //图片
				let config = $.extend({}, image_config, item);
				if (config.original) {
					config.width = "100%";
					config.height = "auto";
				}
				str += $.ucasTpl(image_tpl, config);
			} else {                 //文本
				str += $.ucasTpl(p_tpl, $.extend({}, p_config, item));
			}
		}
		str += "</div>"
		return str;
	}

	/* 使用KendoUI替代Alert提示框、Confirm确认框 * */
	var flag = false;
	var myTabStripWindow = function (options) {
		this.defaults = {
			title: "帮助引导",
			suffix: "",   //当页面上有多个引导时，防止重复
			width: 600,
			height: 400,
			tabs: [],     //只有1项时，不需要选项卡
			content: []
		};
		this.mode = "content";
		if (options.content) {
			var temp = JSON.parse(JSON.stringify(options));
			temp.tabs = [{
				title: options.title,
				width: options.width,
				height: options.height,
				children: options.content
			}];
			temp.content = null;
			this.options = $.extend({}, this.defaults, temp);
			this.mode = "content";
		} else if (options.tabs) {
			this.options = $.extend({}, this.defaults, options);
			this.mode = "tabs";
		}
		this.init();
		this.setOptions();
	};
	myTabStripWindow.prototype.init = function () {
		var self = this;
		var suffix = this.options.suffix;
		var winId = 'walkThroughWindow' + suffix;   //弹框id
		var tabId = 'walkThroughTabstrip' + suffix; //选项卡id

		if ($("#" + winId).length != 0) {
			$("#" + winId).remove();
		}
		if ($("#" + tabId).length != 0) {
			$("#" + tabId).remove();
		}
		var tabs = this.options.tabs;
		var tabTemplate = "";

		if (tabs.length == 1) {
			tabTemplate = creatContent(tabs[0].children);
		}

		// tabTemplate = "<div id='walkThroughTabstrip'><ul><li class='k-state-active'>第一步</li><li>第二步</li></ul>" +
		// 	"<div>this is Paris</div><div>this is New York</div>";
		if (tabs.length >= 2) {
			var ul = "<ul>";
			var div = "";
			for (var i = 0; i < tabs.length; i++) {
				var item = tabs[i];
				if (i == 0) {
					ul += '<li class="k-state-active">' + (item.title) + '</li>';
				} else {
					ul += '<li>' + (item.title) + '</li>';
				}
				div += creatContent(tabs[i].children);
			}
			tabTemplate = [
				'<div id="' + tabId + '">',
				ul + '</ul>',
				div + '</div>'
			].join("");
		}
		//$(tpl).appendTo($("body"));

		var tpl = "<div id='" + winId + "'>" + tabTemplate + "</div>";
		//console.log(tpl);
		$(tpl).appendTo($("body"));

		//$(function (){
		//walkThroughWindow = $("<div id='" + winId + "'></div>").kendoWindow({
		walkThroughWindow = $("#" + winId).kendoWindow({
			title: this.mode == "content" ? this.options.title : "帮助引导",
			width: this.options.width,
			height: this.options.height,
			resizable: true,
			modal: false,
			actions: [
				"Pin",
				"Minimize",
				"Maximize",
				"Close"
			],
			// content: {
			// 	//dataType: "html",
			// 	template: ""
			// }
			//content: tabTemplate
		}).data("kendoWindow");

		if (tabs.length >= 2) {
			var walkThroughTab = $("#" + tabId).kendoTabStrip({
				animation: {
					open: {
						effects: "fadeIn"
					}
				},
				//tabPosition: "left",
			});
		}
		//walkThroughWindow.open().center();

		// });
	};
	myTabStripWindow.prototype.setOptions = function () {
		var suffix = this.options.suffix;
		var winId = 'walkThroughWindow' + suffix;   //弹框id
		var tabId = 'walkThroughTabstrip' + suffix; //选项卡id
		var dialog = $("#" + winId).data("kendoWindow");
		/*视口居中、z-index最上层、打开* */
		dialog.center().toFront().open();
		dialog.bind("close", function () {
			dialog.destroy();
		});
		// if (this.optionstabs.length >= 2) {
		// 	var walkThroughTab = $("#" + tabId).kendoTabStrip({
		// 		animation: {
		// 			open: {
		// 				effects: "fadeIn"
		// 			}
		// 		},
		// 	});
		// }
	};
	window["TabStripWindow"] = function (options) {
		return new myTabStripWindow(options);
	};
});


//页面引导
$(function () {
	var myPageWalkThrough = function (options) {
		this.defaults = {
			menuId: "help-menu",
			tipsId: "context-target",
			list: []
		};
		//this.mode = "content";
		this.options = $.extend({}, this.defaults, options);
		this.init();
		this.setOptions();
	};
	myPageWalkThrough.prototype.init = function () {
		var self = this;
		var menuId = this.options.menuId;   //菜单
		var tipsId = this.options.tipsId;    //提示
		var list = this.options.list;
		if (!list.length) {
			console.log("不能为空！");
			return;
		}
		if ($("#" + menuId).length != 0) {
			$("#" + menuId).remove();
		}
		if ($("#" + tipsId).length != 0) {
			$("#" + tipsId).remove();
		}

		var dataSource = [];
		for (let i = 0; i < list.length; i++) {
			var title = list[i].title || "步骤" + i;
			dataSource[i] = { text: title };
		}
		$("#" + this.options.menuId).kendoContextMenu({
			target: "#" + this.options.tipsId,
			showOn: "mouseover",
			alignToAnchor: true,
			closeOnClick: true,
			dataSource: dataSource,
			select: onSelect,
		});
		function onSelect(e) {
			var index = $(e.item).index();
			self.options.TabStripWindow(this.options.list[index]);
		}
	};
	myPageWalkThrough.prototype.setOptions = function () {
		// if (!this.options.list.length) {
		// 	console.log("不能为空！");
		// 	return;
		// }
		// var contextMenu = $("#" + this.options.menuId).data("kendoContextMenu");
		// contextMenu.bind("select", function (e) {
		// 	// var item = e.item;
		// 	// var type = e.type;
		// 	// var target  = e.target;
		// 	//console.log({item: item, type: type, target: target});
		// 	var index = $(e.item).index();
		// 	TabStripWindow(this.options.list[index]);
		// });
	};
	window["PageWalkThrough"] = function (options) {
		return new myPageWalkThrough(options);
	};
});



$(function () {
	if (window.top !== window.self) return;
	var href = window.location.href,
		isNotop = false;
	if ($('#G-wg-rtlink').length > 0 || isNotop) {
		return;
	}
	var timer = null,
		gotostr = '<div class="G-wg-rtlink" id="G-wg-rtlink"> <a href="javascript:void(0);" id="J-wg-gotop" class="G-wg-gotop">回顶部</a></div>';
	$('body').append(gotostr);
	var $window = $(window),
		$document = $(document),
		$goto_top = $('#J-wg-gotop');
	var isIE = navigator.userAgent.indexOf("MSIE") > 0;

	function goTopSet() {
		var top = $window.height() + $document.scrollTop() - 10;
		$goto_top.css({
			'visibility': 'visible'
		}).fadeIn();
	}

	if (isIE) {
		$goto_top.css({
			'visibility': 'visible'
		}).hide();
		$window.scroll(function () {
			window.clearTimeout(timer);
			if ($document.scrollTop() > $window.height()) {
				$goto_top.show();
			} else {
				$goto_top.hide();
			}
		});
	} else {
		$goto_top.css({
			'visibility': 'visible'
		}).hide();
		$window.scroll(function () {
			window.clearTimeout(timer);
			if ($document.scrollTop() > $window.height()) {
				$goto_top.css({
					'visibility': 'visible'
				}).fadeIn("slow");
			} else {
				$goto_top.fadeOut("slow");
			}
		});
	}

	$('#J-wg-gotop').click(function () {
		$('html,body').animate({
			scrollTop: $('#container').offset().top
		},
			1000);
	});
});
