/** thinker-admin-v1.0.0 MIT License By http://www.thinkphp-admin.com/ */
;layui.define(["element"], function (e) {
    var a = layui.jquery, i = layui.thinkeradmin, l = layui.laytpl, t = layui.element, n = layui.device(),
        o = a(window), r = a("body"), s = a(i.container.id), u = "layui-icon-shrink-right",
        d = "layui-icon-spread-left", c = "thinkeradmin-side-spread-sm", y = "thinkeradmin-side-shrink", m = {
            on: function (e, a) {
                return layui.onevent.call(this, i.eventName, e, a)
            }, screen: function () {
                var e = o.width();
                return e > 1200 ? 3 : e > 992 ? 2 : e > 768 ? 1 : 0
            }, sideFlexible: function (e) {
                var l = a(document).find(i.container.menuIcon), t = m.screen();
                e ? (l.removeClass(d).addClass(u), t < 2 ? s.addClass(c) : s.removeClass(c), s.removeClass(y)) : (l.removeClass(u).addClass(d), t < 2 ? s.removeClass(y) : s.addClass(y), s.removeClass(c)), layui.event.call(this, i.eventName, "menu({*})", {status: e})
            }, resizeTableOnWindowChange: function (e) {
                var l = function () {
                    a(i.container.body).find(".layui-table-view").each(function () {
                        var e = a(this).attr("lay-id");
                        layui.table.resize(e)
                    })
                };
                layui.table && (e ? setTimeout(l, e) : l())
            }, theme: function (e) {
                var i = layui.session.get("theme") || {}, t = "thinkerAdmin_theme", n = document.createElement("style");
                e = a.extend({}, i, e);
                var o = l([".layui-side-menu,", ".thinkeradmin-side-shrink .layui-side-menu .layui-nav>.layui-nav-item>.layui-nav-child", "{background-color:{{d.color.main}} !important;}", ".thinkeradmin-pagetabs .layui-tab-title li:after,", ".thinkeradmin-pagetabs .layui-tab-title li.layui-this:after,", ".layui-layer-admin .layui-layer-title", "{background-color:{{d.color.logo}} !important;}", ".layui-nav-tree .layui-this,", ".layui-nav-tree .layui-this>a,", ".layui-nav-tree .layui-nav-child dd.layui-this,", ".layui-nav-tree .layui-nav-child dd.layui-this a", "{background-color:rgba({{layui.tools.hexToRgb(d.color.selected)}},.3) !important;}", ".layui-nav-tree .layui-nav-bar", "{background-color:{{d.color.selected}} !important;}", ".layui-nav-tree .layui-nav-child dd.layui-this a:after,", ".layui-form-select dl dd.layui-this:after", '{transition: transform .15s cubic-bezier(.645, .045, .355, 1),opacity .15s cubic-bezier(.645, .045, .355, 1),-webkit-transform .15s cubic-bezier(.645, .045, .355, 1);transform: scaleY(1);border-right: 3px solid {{d.color.selected}};content: "";position: absolute;right: 0;top:0;bottom:0; }', ".eleTree-checkbox-checked i,", ".layui-form-checked[lay-skin=primary] i,", ".layui-form-onswitch,", "div[xm-select-skin] .xm-select-title div.xm-select-label>span,", ".xm-select-parent .xm-select-title div.xm-select-label>span", "{background-color: {{d.color.selected}};border-color: {{d.color.selected}}; }", ".layui-form-radio>i:hover, .layui-form-radioed>i,", ".xm-select-parent dl dd.xm-select-this i,", ".xm-form-checkbox>i", "{color: {{d.color.selected}}; }", ".layui-form-select dl dd.layui-this", "{position: relative;background-color: rgba({{layui.tools.hexToRgb(d.color.selected)}},.6); }", ".xm-form-checkbox>i,", ".xm-form-selected .xm-select, .xm-form-selected .xm-select:hover", "{border-color: {{d.color.selected}}; }", "{{# if(layui.tools.rgbIsLight(layui.tools.hexToRgb(d.color.selected))){ }}", ".eleTree-checkbox-checked i,", ".layui-form-checked[lay-skin=primary] i,", ".layui-form-checked, .layui-form-checked:hover,", ".layui-form-select dl dd.layui-this", "{color: black; }", "{{# } }}", ".layui-layout-admin .layui-logo", "{background-color:{{d.color.logo || d.color.main}} !important;}", "{{# if(layui.tools.rgbIsLight(layui.tools.hexToRgb(d.color.logo))){ }}", ".layui-layout-admin .layui-logo,.layui-layout-admin .layui-logo a", "{color: rgba(0,0,0,.8)}", ".thinkeradmin-pagetabs .layui-tab-title li:after,", ".thinkeradmin-pagetabs .layui-tab-title li.layui-this:after,", ".layui-layer-admin .layui-layer-title,.layui-layer-admin i[close]", "{color: rgba(0,0,0,.8)}", "{{# } }}", "{{# if(d.color.header){ }}", ".layui-layout-admin .layui-header", "{background-color:{{ d.color.header }};}", "{{# if(layui.tools.rgbIsLight(layui.tools.hexToRgb(d.color.header))){ }}", ".layui-layout-admin .layui-header a,", ".layui-layout-admin .layui-header a cite", "{color: rgba(0,0,0,.8);}", ".layui-layout-admin .layui-header a:hover", "{color: #1890ff;}", "{{# }else{ }}", ".layui-layout-admin .layui-header a,", ".layui-layout-admin .layui-header a cite", "{color: #f8f8f8;}", ".layui-layout-admin .layui-header a:hover", "{color: #fff;}", "{{# } }}", ".layui-layout-admin .layui-header .layui-nav .layui-nav-more", "{border-top-color: #fbfbfb;}", ".layui-layout-admin .layui-header .layui-nav .layui-nav-mored", "{border-color: transparent; border-bottom-color: #fbfbfb;}", ".layui-layout-admin .layui-header .layui-nav .layui-this:after, .layui-layout-admin .layui-header .layui-nav-bar", "{background-color: #fff; background-color: rgba(255,255,255,.5);}", ".thinkeradmin-pagetabs .layui-tab-title li:after", "{display: none;}", "{{# } }}", "{{# if(layui.tools.rgbIsLight(layui.tools.hexToRgb(d.color.main))){ }}", ".layui-nav-itemed>a, .layui-nav-tree .layui-nav-title a, .layui-nav-tree .layui-nav-title a:hover", "{color: #000000 !important}", ".layui-side-scroll .layui-nav .layui-nav-item a", "{color: rgba(0,0,0,0.7)}", ".layui-nav .layui-nav-mored, .layui-nav-itemed>a .layui-nav-more", "{border-color: transparent transparent rgba(0,0,0,0.7)}", ".layui-nav .layui-nav-more", "{border-color: rgba(0,0,0,0.7) transparent transparent;border-top-color: rgba(0,0,0,0.7)}", ".layui-nav-itemed>.layui-nav-child", "{background-color: transparent !important;}", ".thinkeradmin-side-shrink .layui-side-menu .layui-nav>.layui-nav-itemed>a", "{background: rgba(200,200,200,.3);}", ".layui-side-scroll .layui-nav .layui-this a", "{color: rgba(255,255,255,0.7)}", "{{# } }}"].join("")).render(e),
                    s = document.getElementById(t);
                "styleSheet" in n ? (n.setAttribute("type", "text/css"), n.styleSheet.cssText = o) : n.innerHTML = o, n.id = t, s && r[0].removeChild(s), r[0].appendChild(n), r.attr("thinkeradmin-themealias", e.color.alias), layui.session.set("theme", e)
            }, initTheme: function (e) {
                var a = i.theme;
                e = e || 0, a.color[e] ? (a.color[e].index = e, m.theme({color: a.color[e]})) : i.debug && console.error("theme index: " + e + " is not found on thinkerAdmin.theme")
            }, resizeFn: {}, resize: function (e) {
                var a = layui.router(), i = a.path.join("-");
                m.resizeFn[i] && (o.off("resize", m.resizeFn[i]), delete m.resizeFn[i]), "off" !== e && (e(), m.resizeFn[i] = e, o.on("resize", m.resizeFn[i]))
            }, runResize: function () {
                var e = layui.router(), a = e.path.join("-");
                m.resizeFn[a] && m.resizeFn[a]()
            }, delResize: function () {
                this.resize("off")
            }, fullScreen: function () {
                var e = document.documentElement,
                    a = e.requestFullScreen || e.webkitRequestFullScreen || e.mozRequestFullScreen || e.msRequestFullscreen;
                "undefined" != typeof a && a && a.call(e)
            }, exitFullScreen: function () {
                document.documentElement;
                document.exitFullscreen ? document.exitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitCancelFullScreen ? document.webkitCancelFullScreen() : document.msExitFullscreen && document.msExitFullscreen()
            }
        }, h = m.events = {
            flexible: function (e) {
                var a = e.find(i.container.menuIcon), l = a.hasClass(u);
                m.sideFlexible(!l), m.resizeTableOnWindowChange(350)
            }, refresh: function () {
                layui.index.render()
            }, theme: function () {
                layui.view.dialogRight({
                    id: "thinkerAdmin_Theme", success: function () {
                        layui.view.init("#" + this.id).render(i.view.theme)
                    }
                })
            }, note: function (e) {
                var a = m.screen() < 2, i = layui.session.get("note");
                h.note.index = layui.view.dialog({
                    title: "便签",
                    shade: 0,
                    offset: ["41px", a ? null : e.offset().left - 250 + "px"],
                    anim: -1,
                    id: "thinkerAdmin_Note",
                    skin: "thinkeradmin-note layui-anim layui-anim-upbit",
                    content: '<textarea placeholder="内容"></textarea>',
                    resize: !1,
                    success: function (e, a) {
                        var l = e.find("textarea"), t = void 0 === i ? "备忘记录" : i;
                        l.val(t).focus().on("keyup", function () {
                            layui.session.set("note", this.value)
                        })
                    }
                })
            }, fullscreen: function (e) {
                var a = "layui-icon-screen-full", i = "layui-icon-screen-restore", l = e.children("i");
                l.hasClass(a) ? (m.fullScreen(), l.addClass(i).removeClass(a)) : (m.exitFullScreen(), l.addClass(a).removeClass(i))
            }, back: function () {
                history.back()
            }, setTheme: function (e) {
                var a = e.data("index");
                e.hasClass("layui-this") || (e.addClass("layui-this").siblings(".layui-this").removeClass("layui-this"), m.initTheme(a))
            }, shade: function () {
                m.sideFlexible()
            }, logout: function () {
                i.events.logout ? i.events.logout() : layui.session.logout()
            }
        };
    !function () {
        var e = layui.session.get("theme");
        e ? m.theme(e) : i.theme && m.initTheme(i.theme.initColorIndex), r.addClass("layui-layout-body"), s.addClass("thinkeradmin-tabspage-none"), n.ie && n.ie < 10 && layui.view.error("IE" + n.ie + "下访问可能不佳，推荐使用：Chrome / Firefox / Edge 等高级浏览器", {
            offset: "auto",
            id: "LAY_errorIE"
        })
    }(), m.on("hash(side)", function (e) {
        var l = e.path, t = a(i.container.menu), n = "layui-nav-itemed", o = function (e) {
            return {list: e.children(".layui-nav-child"), name: e.data("name"), jump: e.data("jump")}
        }, r = function (e) {
            var i = layui.tools.makeSpaUrl(l.join("/"));
            e.each(function (e, t) {
                var r = a(t), s = o(r), u = s.list.children("dd"),
                    d = l[0] === s.name || 0 === e && !l[0] || s.jump && i === layui.tools.makeSpaUrl(s.jump);
                if (u.each(function (e, t) {
                    var r = a(t), u = o(r), d = u.list.children("dd"),
                        c = l[0] === s.name && l[1] === u.name || u.jump && i === layui.tools.makeSpaUrl(u.jump);
                    if (d.each(function (e, t) {
                        var r = a(t), d = o(r),
                            c = l[0] === s.name && l[1] === u.name && l[2] === d.name || d.jump && i === layui.tools.makeSpaUrl(d.jump);
                        if (c) {
                            var y = d.list[0] ? n : "layui-this";
                            return r.addClass(y).siblings().removeClass(y), !1
                        }
                    }), c) {
                        var y = u.list[0] ? n : "layui-this";
                        return r.addClass(y).siblings().removeClass(y), !1
                    }
                }), d) {
                    var c = s.list[0] ? n : "layui-this";
                    return r.addClass(c).siblings().removeClass(c), !1
                }
            })
        };
        t.find(".layui-this").removeClass("layui-this"), m.screen() < 2 && m.sideFlexible(), r(t.children("li"))
    }), t.on("nav(thinkeradmin-side-menu)", function (e) {
        e.siblings(".layui-nav-child")[0] && s.hasClass(y) && (m.sideFlexible(1), layer.close(e.data("index")))
    }), r.on("click", "*[thinker-href]", function () {
        var e = a(this), i = e.attr("thinker-href");
        layui.router();
        location.hash = layui.tools.makeSpaUrl(i)
    }), r.on("click", "*[thinkeradmin-event]", function () {
        var e = a(this), i = e.attr("thinkeradmin-event");
        h[i] && h[i].call(this, e)
    }), r.on("mouseenter", "*[lay-tips]", function () {
        var e = a(this);
        if (!e.parent().hasClass("layui-nav-item") || s.hasClass(y)) {
            var i = e.attr("lay-tips"), l = e.attr("lay-offset"), t = e.attr("lay-direction"), n = layer.tips(i, this, {
                tips: t || 1, time: -1, success: function (e, a) {
                    l && e.css("margin-left", l + "px")
                }
            });
            e.data("index", n)
        }
    }).on("mouseleave", "*[lay-tips]", function () {
        layer.close(a(this).data("index"))
    });
    var f = layui.data.resizeSystem = function () {
        layer.closeAll("tips"), f.lock || setTimeout(function () {
            m.sideFlexible(!(m.screen() < 2)), delete f.lock
        }, 100), f.lock = !0
    };
    o.on("resize", layui.data.resizeSystem), e("admin", m)
});