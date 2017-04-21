! function(t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof exports ? module.exports = t(require("jquery")) : t(jQuery)
}(function(t) {
    "use strict";
    var e = "animsition",
        i = {
            init: function(n) {
                n = t.extend({
                    inClass: "fade-in",
                    outClass: "fade-out",
                    inDuration: 1500,
                    outDuration: 800,
                    linkElement: ".animsition-link",
                    loading: !0,
                    loadingParentElement: "body",
                    loadingClass: "animsition-loading",
                    unSupportCss: ["animation-duration", "-webkit-animation-duration", "-o-animation-duration"],
                    overlay: !1,
                    overlayClass: "animsition-overlay-slide",
                    overlayParentElement: "body"
                }, n);
                var s = i.supportCheck.call(this, n);
                if (!s && n.unSupportCss.length > 0 && (!s || !this.length)) return "console" in window || (window.console = {}, window.console.log = function(t) {
                    return t
                }), this.length || console.log("Animsition: Element does not exist on page."), s || console.log("Animsition: Does not support this browser."), i.destroy.call(this);
                var o = i.optionCheck.call(this, n);
                return o && i.addOverlay.call(this, n), n.loading && i.addLoading.call(this, n), this.each(function() {
                    var s = this,
                        o = t(this),
                        a = t(window),
                        r = o.data(e);
                    r || (n = t.extend({}, n), o.data(e, {
                        options: n
                    }), a.on("load." + e + " pageshow." + e, function() {
                        i.pageIn.call(s)
                    }), a.on("unload." + e, function() {}), t(n.linkElement).on("click." + e, function(e) {
                        e.preventDefault();
                        var n = t(this),
                            o = n.attr("href");
                        2 === e.which || e.metaKey || e.shiftKey || -1 !== navigator.platform.toUpperCase().indexOf("WIN") && e.ctrlKey ? window.open(o, "_blank") : i.pageOut.call(s, n, o)
                    }))
                })
            },
            addOverlay: function(e) {
                t(e.overlayParentElement).prepend('<div class="' + e.overlayClass + '"></div>')
            },
            addLoading: function(e) {
                t(e.loadingParentElement).append('<div class="' + e.loadingClass + '"></div>')
            },
            removeLoading: function() {
                var i = t(this),
                    n = i.data(e).options,
                    s = t(n.loadingParentElement).children("." + n.loadingClass);
                s.fadeOut().remove()
            },
            supportCheck: function(e) {
                var i = t(this),
                    n = e.unSupportCss,
                    s = n.length,
                    o = !1;
                0 === s && (o = !0);
                for (var a = 0; s > a; a++)
                    if ("string" == typeof i.css(n[a])) {
                        o = !0;
                        break
                    }
                return o
            },
            optionCheck: function(e) {
                var i, n = t(this);
                return i = e.overlay || n.data("animsition-overlay") ? !0 : !1
            },
            animationCheck: function(i, n, s) {
                var o = t(this),
                    a = o.data(e).options,
                    r = typeof i,
                    l = !n && "number" === r,
                    h = n && "string" === r && i.length > 0;
                return l || h ? i = i : n && s ? i = a.inClass : !n && s ? i = a.inDuration : n && !s ? i = a.outClass : n || s || (i = a.outDuration), i
            },
            pageIn: function() {
                var n = this,
                    s = t(this),
                    o = s.data(e).options,
                    a = s.data("animsition-in-duration"),
                    r = s.data("animsition-in"),
                    l = i.animationCheck.call(n, a, !1, !0),
                    h = i.animationCheck.call(n, r, !0, !0),
                    d = i.optionCheck.call(n, o);
                o.loading && i.removeLoading.call(n), d ? i.pageInOverlay.call(n, h, l) : i.pageInBasic.call(n, h, l)
            },
            pageInBasic: function(e, i) {
                var n = t(this);
                n.trigger("animsition.start").css({
                    "animation-duration": i / 1e3 + "s"
                }).addClass(e).animateCallback(function() {
                    n.removeClass(e).css({
                        opacity: 1
                    }).trigger("animsition.end")
                })
            },
            pageInOverlay: function(i, n) {
                var s = t(this),
                    o = s.data(e).options;
                s.trigger("animsition.start").css({
                    opacity: 1
                }), t(o.overlayParentElement).children("." + o.overlayClass).css({
                    "animation-duration": n / 1e3 + "s"
                }).addClass(i).animateCallback(function() {
                    s.trigger("animsition.end")
                })
            },
            pageOut: function(n, s) {
                var o = this,
                    a = t(this),
                    r = a.data(e).options,
                    l = n.data("animsition-out"),
                    h = a.data("animsition-out"),
                    d = n.data("animsition-out-duration"),
                    c = a.data("animsition-out-duration"),
                    u = l ? l : h,
                    p = d ? d : c,
                    f = i.animationCheck.call(o, u, !0, !1),
                    g = i.animationCheck.call(o, p, !1, !1),
                    m = i.optionCheck.call(o, r);
                m ? i.pageOutOverlay.call(o, f, g, s) : i.pageOutBasic.call(o, f, g, s)
            },
            pageOutBasic: function(e, i, n) {
                var s = t(this);
                s.css({
                    "animation-duration": i / 1e3 + "s"
                }).addClass(e).animateCallback(function() {
                    location.href = n
                })
            },
            pageOutOverlay: function(n, s, o) {
                var a = this,
                    r = t(this),
                    l = r.data(e).options,
                    h = r.data("animsition-in"),
                    d = i.animationCheck.call(a, h, !0, !0);
                t(l.overlayParentElement).children("." + l.overlayClass).css({
                    "animation-duration": s / 1e3 + "s"
                }).removeClass(d).addClass(n).animateCallback(function() {
                    location.href = o
                })
            },
            destroy: function() {
                return this.each(function() {
                    var i = t(this);
                    t(window).unbind("." + e), i.css({
                        opacity: 1
                    }).removeData(e)
                })
            }
        };
    t.fn.animateCallback = function(e) {
        var i = "animationend webkitAnimationEnd mozAnimationEnd oAnimationEnd MSAnimationEnd";
        return this.each(function() {
            t(this).bind(i, function() {
                return t(this).unbind(i), e.call(this)
            })
        })
    }, t.fn.animsition = function(n) {
        return i[n] ? i[n].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof n && n ? void t.error("Method " + n + " does not exist on jQuery." + e) : i.init.apply(this, arguments)
    }
}),
function(t) {
    t.fn.appear = function(e, i) {
        var n = t.extend({
            data: void 0,
            one: !0,
            accX: 0,
            accY: 0
        }, i);
        return this.each(function() {
            var i = t(this);
            if (i.appeared = !1, !e) return void i.trigger("appear", n.data);
            var s = t(window),
                o = function() {
                    if (!i.is(":visible")) return void(i.appeared = !1);
                    var t = s.scrollLeft(),
                        e = s.scrollTop(),
                        o = i.offset(),
                        a = o.left,
                        r = o.top,
                        l = n.accX,
                        h = n.accY,
                        d = i.height(),
                        c = s.height(),
                        u = i.width(),
                        p = s.width();
                    r + d + h >= e && e + c + h >= r && a + u + l >= t && t + p + l >= a ? i.appeared || i.trigger("appear", n.data) : i.appeared = !1
                },
                a = function() {
                    if (i.appeared = !0, n.one) {
                        s.unbind("scroll", o);
                        var a = t.inArray(o, t.fn.appear.checks);
                        a >= 0 && t.fn.appear.checks.splice(a, 1)
                    }
                    e.apply(this, arguments)
                };
            n.one ? i.one("appear", n.data, a) : i.bind("appear", n.data, a), s.scroll(o), t.fn.appear.checks.push(o), o()
        })
    }, t.extend(t.fn.appear, {
        checks: [],
        timeout: null,
        checkAll: function() {
            var e = t.fn.appear.checks.length;
            if (e > 0)
                for (; e--;) t.fn.appear.checks[e]()
        },
        run: function() {
            t.fn.appear.timeout && clearTimeout(t.fn.appear.timeout), t.fn.appear.timeout = setTimeout(t.fn.appear.checkAll, 20)
        }
    }), t.each(["append", "prepend", "after", "before", "attr", "removeAttr", "addClass", "removeClass", "toggleClass", "remove", "css", "show", "hide"], function(e, i) {
        var n = t.fn[i];
        n && (t.fn[i] = function() {
            var e = n.apply(this, arguments);
            return t.fn.appear.run(), e
        })
    })
}(jQuery),
function(t) {
    function e(t, e) {
        return t.toFixed(e.decimals)
    }
    t.fn.countTo = function(e) {
        return e = e || {}, t(this).each(function() {
            function i() {
                d += a, h++, n(d), "function" == typeof s.onUpdate && s.onUpdate.call(r, d), h >= o && (l.removeData("countTo"), clearInterval(c.interval), d = s.to, "function" == typeof s.onComplete && s.onComplete.call(r, d))
            }

            function n(t) {
                var e = s.formatter.call(r, t, s);
                l.html(e)
            }
            var s = t.extend({}, t.fn.countTo.defaults, {
                    from: t(this).data("from"),
                    to: t(this).data("to"),
                    speed: t(this).data("speed"),
                    refreshInterval: t(this).data("refresh-interval"),
                    decimals: t(this).data("decimals")
                }, e),
                o = Math.ceil(s.speed / s.refreshInterval),
                a = (s.to - s.from) / o,
                r = this,
                l = t(this),
                h = 0,
                d = s.from,
                c = l.data("countTo") || {};
            l.data("countTo", c), c.interval && clearInterval(c.interval), c.interval = setInterval(i, s.refreshInterval), n(d)
        })
    }, t.fn.countTo.defaults = {
        from: 0,
        to: 0,
        speed: 1e3,
        refreshInterval: 100,
        decimals: 0,
        formatter: e,
        onUpdate: null,
        onComplete: null
    }
}(jQuery),
function(t) {
    t.fn.hoverIntent = function(e, i, n) {
        var s = {
            interval: 100,
            sensitivity: 7,
            timeout: 0
        };
        s = "object" == typeof e ? t.extend(s, e) : t.isFunction(i) ? t.extend(s, {
            over: e,
            out: i,
            selector: n
        }) : t.extend(s, {
            over: e,
            out: e,
            selector: i
        });
        var o, a, r, l, h = function(t) {
                o = t.pageX, a = t.pageY
            },
            d = function(e, i) {
                return i.hoverIntent_t = clearTimeout(i.hoverIntent_t), Math.abs(r - o) + Math.abs(l - a) < s.sensitivity ? (t(i).off("mousemove.hoverIntent", h), i.hoverIntent_s = 1, s.over.apply(i, [e])) : (r = o, l = a, i.hoverIntent_t = setTimeout(function() {
                    d(e, i)
                }, s.interval), void 0)
            },
            c = function(t, e) {
                return e.hoverIntent_t = clearTimeout(e.hoverIntent_t), e.hoverIntent_s = 0, s.out.apply(e, [t])
            },
            u = function(e) {
                var i = jQuery.extend({}, e),
                    n = this;
                n.hoverIntent_t && (n.hoverIntent_t = clearTimeout(n.hoverIntent_t)), "mouseenter" == e.type ? (r = i.pageX, l = i.pageY, t(n).on("mousemove.hoverIntent", h), 1 != n.hoverIntent_s && (n.hoverIntent_t = setTimeout(function() {
                    d(i, n)
                }, s.interval))) : (t(n).off("mousemove.hoverIntent", h), 1 == n.hoverIntent_s && (n.hoverIntent_t = setTimeout(function() {
                    c(i, n)
                }, s.timeout)))
            };
        return this.on({
            "mouseenter.hoverIntent": u,
            "mouseleave.hoverIntent": u
        }, s.selector)
    }
}(jQuery),
function($, window, undefined) {
    function getPixel(t, e) {
        return parseInt(t.css(e), 10) || 0
    }

    function within(t, e, i) {
        return e > t ? e : t > i ? i : t
    }

    function getViewport() {
        var t = window,
            e = "inner";
        return "innerWidth" in window || (e = "client", t = document.documentElement || document.body), {
            width: t[e + "Width"],
            height: t[e + "Height"]
        }
    }

    function removeHash() {
        var t = getScrollXY();
        window.location.hash = "", window.scrollTo(t.x, t.y)
    }

    function doAjax(t, e) {
        var t = "http://ilightbox.net/getSource/jsonp.php?url=" + encodeURIComponent(t).replace(/!/g, "%21").replace(/'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/\*/g, "%2A");
        $.ajax({
            url: t,
            dataType: "jsonp"
        }), iLCallback = function(t) {
            e.call(this, t)
        }
    }

    function findImageInElement(t) {
        var e = $("*", t),
            i = new Array;
        return e.each(function() {
            var t = "",
                e = this;
            if ("none" != $(e).css("background-image") ? t = $(e).css("background-image") : "undefined" != typeof $(e).attr("src") && "img" == e.nodeName.toLowerCase() && (t = $(e).attr("src")), -1 == t.indexOf("gradient")) {
                t = t.replace(/url\(\"/g, ""), t = t.replace(/url\(/g, ""), t = t.replace(/\"\)/g, ""), t = t.replace(/\)/g, "");
                for (var n = t.split(","), s = 0; s < n.length; s++)
                    if (n[s].length > 0 && -1 == $.inArray(n[s], i)) {
                        var o = "";
                        browser.msie && browser.version < 9 && (o = "?" + floor(3e3 * random())), i.push(n[s] + o)
                    }
            }
        }), i
    }

    function getExtension(t) {
        var e = t.split(".").pop().toLowerCase(),
            i = -1 !== e.indexOf("?") ? e.split("?").pop() : "";
        return e.replace(i, "")
    }

    function getTypeByExtension(t) {
        var e, i = getExtension(t);
        return e = -1 !== extensions.image.indexOf(i) ? "image" : -1 !== extensions.flash.indexOf(i) ? "flash" : -1 !== extensions.video.indexOf(i) ? "video" : "iframe"
    }

    function percentToValue(t, e) {
        return parseInt(e / 100 * t)
    }

    function parseURI(t) {
        var e = String(t).replace(/^\s+|\s+$/g, "").match(/^([^:\/?#]+:)?(\/\/(?:[^:@]*(?::[^:@]*)?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);
        return e ? {
            href: e[0] || "",
            protocol: e[1] || "",
            authority: e[2] || "",
            host: e[3] || "",
            hostname: e[4] || "",
            port: e[5] || "",
            pathname: e[6] || "",
            search: e[7] || "",
            hash: e[8] || ""
        } : null
    }

    function absolutizeURI(t, e) {
        function i(t) {
            var e = [];
            return t.replace(/^(\.\.?(\/|$))+/, "").replace(/\/(\.(\/|$))+/g, "/").replace(/\/\.\.$/, "/../").replace(/\/?[^\/]*/g, function(t) {
                "/.." === t ? e.pop() : e.push(t)
            }), e.join("").replace(/^\//, "/" === t.charAt(0) ? "/" : "")
        }
        return e = parseURI(e || ""), t = parseURI(t || ""), e && t ? (e.protocol || t.protocol) + (e.protocol || e.authority ? e.authority : t.authority) + i(e.protocol || e.authority || "/" === e.pathname.charAt(0) ? e.pathname : e.pathname ? (t.authority && !t.pathname ? "/" : "") + t.pathname.slice(0, t.pathname.lastIndexOf("/") + 1) + e.pathname : t.pathname) + (e.protocol || e.authority || e.pathname ? e.search : e.search || t.search) + e.hash : null
    }

    function version_compare(t, e, i) {
        this.php_js = this.php_js || {}, this.php_js.ENV = this.php_js.ENV || {};
        var n = 0,
            s = 0,
            o = 0,
            a = {
                dev: -6,
                alpha: -5,
                a: -5,
                beta: -4,
                b: -4,
                RC: -3,
                rc: -3,
                "#": -2,
                p: 1,
                pl: 1
            },
            r = function(t) {
                return t = ("" + t).replace(/[_\-+]/g, "."), t = t.replace(/([^.\d]+)/g, ".$1.").replace(/\.{2,}/g, "."), t.length ? t.split(".") : [-8]
            },
            l = function(t) {
                return t ? isNaN(t) ? a[t] || -7 : parseInt(t, 10) : 0
            };
        for (t = r(t), e = r(e), s = max(t.length, e.length), n = 0; s > n; n++)
            if (t[n] != e[n]) {
                if (t[n] = l(t[n]), e[n] = l(e[n]), t[n] < e[n]) {
                    o = -1;
                    break
                }
                if (t[n] > e[n]) {
                    o = 1;
                    break
                }
            }
        if (!i) return o;
        switch (i) {
            case ">":
            case "gt":
                return o > 0;
            case ">=":
            case "ge":
                return o >= 0;
            case "<=":
            case "le":
                return 0 >= o;
            case "==":
            case "=":
            case "eq":
                return 0 === o;
            case "<>":
            case "!=":
            case "ne":
                return 0 !== o;
            case "":
            case "<":
            case "lt":
                return 0 > o;
            default:
                return null
        }
    }

    function getScrollXY() {
        var t = 0,
            e = 0;
        return "number" == typeof window.pageYOffset ? (e = window.pageYOffset, t = window.pageXOffset) : document.body && (document.body.scrollLeft || document.body.scrollTop) ? (e = document.body.scrollTop, t = document.body.scrollLeft) : document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop) && (e = document.documentElement.scrollTop, t = document.documentElement.scrollLeft), {
            x: t,
            y: e
        }
    }

    function AC_QuickTimeVersion() {
        return gQTGeneratorVersion
    }

    function _QTComplain(t, e) {
        e = e.replace("%%", t), alert(e)
    }

    function _QTAddAttribute(t, e, i) {
        var n;
        return n = gTagAttrs[t + e], null == n && (n = gTagAttrs[e]), null != n ? (0 == e.indexOf(t) && null == i && (i = e.substring(t.length)), null == i && (i = e), i + '="' + n + '" ') : ""
    }

    function _QTAddObjectAttr(t, e) {
        return 0 == t.indexOf("emb#") ? "" : (0 == t.indexOf("obj#") && null == e && (e = t.substring(4)), _QTAddAttribute("obj#", t, e))
    }

    function _QTAddEmbedAttr(t, e) {
        return 0 == t.indexOf("obj#") ? "" : (0 == t.indexOf("emb#") && null == e && (e = t.substring(4)), _QTAddAttribute("emb#", t, e))
    }

    function _QTAddObjectParam(t, e) {
        var i, n = "",
            s = e ? " />" : ">";
        return -1 == t.indexOf("emb#") && (i = gTagAttrs["obj#" + t], null == i && (i = gTagAttrs[t]), 0 == t.indexOf("obj#") && (t = t.substring(4)), null != i && (n = '  <param name="' + t + '" value="' + i + '"' + s + "\n")), n
    }

    function _QTDeleteTagAttrs() {
        for (var t = 0; t < arguments.length; t++) {
            var e = arguments[t];
            delete gTagAttrs[e], delete gTagAttrs["emb#" + e], delete gTagAttrs["obj#" + e]
        }
    }

    function _QTGenerate(t, e, i) {
        if (4 > i.length || 0 != i.length % 2) return _QTComplain(t, gArgCountErr), "";
        gTagAttrs = [], gTagAttrs.src = i[0], gTagAttrs.width = i[1], gTagAttrs.height = i[2], gTagAttrs.classid = "clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B", gTagAttrs.pluginspage = "http://www.apple.com/quicktime/download/", t = i[3], (null == t || "" == t) && (t = "6,0,2,0"), gTagAttrs.codebase = "http://www.apple.com/qtactivex/qtplugin.cab#version=" + t;
        for (var n, s = 4; s < i.length; s += 2) n = i[s].toLowerCase(), t = i[s + 1], "name" == n || "id" == n ? gTagAttrs.name = t : gTagAttrs[n] = t;
        i = "<object " + _QTAddObjectAttr("classid") + _QTAddObjectAttr("width") + _QTAddObjectAttr("height") + _QTAddObjectAttr("codebase") + _QTAddObjectAttr("name", "id") + _QTAddObjectAttr("tabindex") + _QTAddObjectAttr("hspace") + _QTAddObjectAttr("vspace") + _QTAddObjectAttr("border") + _QTAddObjectAttr("align") + _QTAddObjectAttr("class") + _QTAddObjectAttr("title") + _QTAddObjectAttr("accesskey") + _QTAddObjectAttr("noexternaldata") + ">\n" + _QTAddObjectParam("src", e), s = "  <embed " + _QTAddEmbedAttr("src") + _QTAddEmbedAttr("width") + _QTAddEmbedAttr("height") + _QTAddEmbedAttr("pluginspage") + _QTAddEmbedAttr("name") + _QTAddEmbedAttr("align") + _QTAddEmbedAttr("tabindex"), _QTDeleteTagAttrs("src", "width", "height", "pluginspage", "classid", "codebase", "name", "tabindex", "hspace", "vspace", "border", "align", "noexternaldata", "class", "title", "accesskey");
        for (n in gTagAttrs) t = gTagAttrs[n], null != t && (s += _QTAddEmbedAttr(n), i += _QTAddObjectParam(n, e));
        return i + s + "> </embed>\n</object>"
    }

    function QT_GenerateOBJECTText() {
        return _QTGenerate("QT_GenerateOBJECTText", !1, arguments)
    }
    var extensions = {
            flash: ["swf"],
            image: ["bmp", "gif", "jpeg", "jpg", "png", "tiff", "tif", "jfif", "jpe"],
            iframe: ["asp", "aspx", "cgi", "cfm", "htm", "html", "jsp", "php", "pl", "php3", "php4", "php5", "phtml", "rb", "rhtml", "shtml", "txt"],
            video: ["avi", "mov", "mpg", "mpeg", "movie", "mp4", "webm", "ogv", "ogg", "3gp", "m4v"]
        },
        $win = $(window),
        $doc = $(document),
        browser, transform, gpuAcceleration, fullScreenApi = "",
        supportTouch = !!("ontouchstart" in window) && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
        clickEvent = supportTouch ? "itap.iLightBox" : "click.iLightBox",
        touchStartEvent = supportTouch ? "touchstart.iLightBox" : "mousedown.iLightBox",
        touchStopEvent = supportTouch ? "touchend.iLightBox" : "mouseup.iLightBox",
        touchMoveEvent = supportTouch ? "touchmove.iLightBox" : "mousemove.iLightBox",
        abs = Math.abs,
        sqrt = Math.sqrt,
        round = Math.round,
        max = Math.max,
        min = Math.min,
        floor = Math.floor,
        random = Math.random,
        pluginspages = {
            quicktime: "http://www.apple.com/quicktime/download",
            flash: "http://www.adobe.com/go/getflash"
        },
        iLightBox = function(t, e, i, n) {
            var s = this;
            if (s.options = e, s.selector = t.selector || t, s.context = t.context, s.instant = n, i.length < 1 ? s.attachItems() : s.items = i, s.vars = {
                    total: s.items.length,
                    start: 0,
                    current: null,
                    next: null,
                    prev: null,
                    BODY: $("body"),
                    loadRequests: 0,
                    overlay: $('<div class="ilightbox-overlay"></div>'),
                    loader: $('<div class="ilightbox-loader"><div></div></div>'),
                    toolbar: $('<div class="ilightbox-toolbar"></div>'),
                    innerToolbar: $('<div class="ilightbox-inner-toolbar"></div>'),
                    title: $('<div class="ilightbox-title"></div>'),
                    closeButton: $('<a class="ilightbox-close" title="' + s.options.text.close + '"></a>'),
                    fullScreenButton: $('<a class="ilightbox-fullscreen" title="' + s.options.text.enterFullscreen + '"></a>'),
                    innerPlayButton: $('<a class="ilightbox-play" title="' + s.options.text.slideShow + '"></a>'),
                    innerNextButton: $('<a class="ilightbox-next-button" title="' + s.options.text.next + '"></a>'),
                    innerPrevButton: $('<a class="ilightbox-prev-button" title="' + s.options.text.previous + '"></a>'),
                    holder: $('<div class="ilightbox-holder' + (supportTouch ? " supportTouch" : "") + '" ondragstart="return false;"><div class="ilightbox-container"></div></div>'),
                    nextPhoto: $('<div class="ilightbox-holder' + (supportTouch ? " supportTouch" : "") + ' ilightbox-next" ondragstart="return false;"><div class="ilightbox-container"></div></div>'),
                    prevPhoto: $('<div class="ilightbox-holder' + (supportTouch ? " supportTouch" : "") + ' ilightbox-prev" ondragstart="return false;"><div class="ilightbox-container"></div></div>'),
                    nextButton: $('<a class="ilightbox-button ilightbox-next-button" ondragstart="return false;" title="' + s.options.text.next + '"><span></span></a>'),
                    prevButton: $('<a class="ilightbox-button ilightbox-prev-button" ondragstart="return false;" title="' + s.options.text.previous + '"><span></span></a>'),
                    thumbnails: $('<div class="ilightbox-thumbnails" ondragstart="return false;"><div class="ilightbox-thumbnails-container"><a class="ilightbox-thumbnails-dragger"></a><div class="ilightbox-thumbnails-grid"></div></div></div>'),
                    thumbs: !1,
                    nextLock: !1,
                    prevLock: !1,
                    hashLock: !1,
                    isMobile: !1,
                    mobileMaxWidth: 980,
                    isInFullScreen: !1,
                    isSwipe: !1,
                    mouseID: 0,
                    cycleID: 0,
                    isPaused: 0
                }, s.vars.hideableElements = s.vars.nextButton.add(s.vars.prevButton), s.normalizeItems(), s.availPlugins(), s.options.startFrom = s.options.startFrom > 0 && s.options.startFrom >= s.vars.total ? s.vars.total - 1 : s.options.startFrom, s.options.startFrom = s.options.randomStart ? floor(random() * s.vars.total) : s.options.startFrom, s.vars.start = s.options.startFrom, n ? s.instantCall() : s.patchItemsEvents(), s.options.linkId && (s.hashChangeHandler(), $win.iLightBoxHashChange(function() {
                    s.hashChangeHandler()
                })), supportTouch) {
                var o = /(click|mouseenter|mouseleave|mouseover|mouseout)/gi,
                    a = "itap";
                s.options.caption.show = s.options.caption.show.replace(o, a), s.options.caption.hide = s.options.caption.hide.replace(o, a), s.options.social.show = s.options.social.show.replace(o, a), s.options.social.hide = s.options.social.hide.replace(o, a)
            }
            s.options.controls.arrows && $.extend(s.options.styles, {
                nextOffsetX: 0,
                prevOffsetX: 0,
                nextOpacity: 0,
                prevOpacity: 0
            })
        };
    iLightBox.prototype = {
            showLoader: function() {
                var t = this;
                t.vars.loadRequests += 1, "horizontal" == t.options.path.toLowerCase() ? t.vars.loader.stop().animate({
                    top: "-30px"
                }, t.options.show.speed, "easeOutCirc") : t.vars.loader.stop().animate({
                    left: "-30px"
                }, t.options.show.speed, "easeOutCirc")
            },
            hideLoader: function() {
                var t = this;
                t.vars.loadRequests -= 1, t.vars.loadRequests = t.vars.loadRequests < 0 ? 0 : t.vars.loadRequests, "horizontal" == t.options.path.toLowerCase() ? t.vars.loadRequests <= 0 && t.vars.loader.stop().animate({
                    top: "-192px"
                }, t.options.show.speed, "easeInCirc") : t.vars.loadRequests <= 0 && t.vars.loader.stop().animate({
                    left: "-192px"
                }, t.options.show.speed, "easeInCirc")
            },
            createUI: function() {
                var t = this;
                t.ui = {
                    currentElement: t.vars.holder,
                    nextElement: t.vars.nextPhoto,
                    prevElement: t.vars.prevPhoto,
                    currentItem: t.vars.current,
                    nextItem: t.vars.next,
                    prevItem: t.vars.prev,
                    hide: function() {
                        t.closeAction()
                    },
                    refresh: function() {
                        arguments.length > 0 ? t.repositionPhoto(!0) : t.repositionPhoto()
                    },
                    fullscreen: function() {
                        t.fullScreenAction()
                    }
                }
            },
            attachItems: function() {
                var iL = this,
                    itemsObject = new Array,
                    items = new Array;
                $(iL.selector, iL.context).each(function() {
                    var t = $(this),
                        URL = t.attr(iL.options.attr) || null,
                        options = t.data("options") && eval("({" + t.data("options") + "})") || {},
                        caption = t.data("caption"),
                        title = t.data("title"),
                        type = t.data("type") || getTypeByExtension(URL);
                    items.push({
                        URL: URL,
                        caption: caption,
                        title: title,
                        type: type,
                        options: options
                    }), iL.instant || itemsObject.push(t)
                }), iL.items = items, iL.itemsObject = itemsObject
            },
            normalizeItems: function() {
                var t = this,
                    e = new Array;
                $.each(t.items, function(i, n) {
                    "string" == typeof n && (n = {
                        url: n
                    });
                    var s = n.url || n.URL || null,
                        o = n.options || {},
                        a = n.caption || null,
                        r = n.title || null,
                        l = n.type ? n.type.toLowerCase() : getTypeByExtension(s),
                        h = "object" != typeof s ? getExtension(s) : "";
                    o.thumbnail = o.thumbnail || ("image" == l ? s : null), o.videoType = o.videoType || null, o.skin = o.skin || t.options.skin, o.width = o.width || null, o.height = o.height || null, o.mousewheel = "undefined" != typeof o.mousewheel ? o.mousewheel : !0, o.swipe = "undefined" != typeof o.swipe ? o.swipe : !0, o.social = "undefined" != typeof o.social ? o.social : t.options.social.buttons && $.extend({}, {}, t.options.social.buttons), "video" == l && (o.html5video = "undefined" != typeof o.html5video ? o.html5video : {}, o.html5video.webm = o.html5video.webm || o.html5video.WEBM || null, o.html5video.controls = "undefined" != typeof o.html5video.controls ? o.html5video.controls : "controls", o.html5video.preload = o.html5video.preload || "metadata", o.html5video.autoplay = "undefined" != typeof o.html5video.autoplay ? o.html5video.autoplay : !1), o.width && o.height || ("video" == l ? (o.width = 1280, o.height = 720) : "iframe" == l ? (o.width = "100%", o.height = "90%") : "flash" == l && (o.width = 1280, o.height = 720)), delete n.url, n.index = i, n.URL = s, n.caption = a, n.title = r, n.type = l, n.options = o, n.ext = h, e.push(n)
                }), t.items = e
            },
            instantCall: function() {
                var t = this,
                    e = t.vars.start;
                t.vars.current = e, t.vars.next = t.items[e + 1] ? e + 1 : null, t.vars.prev = t.items[e - 1] ? e - 1 : null, t.addContents(), t.patchEvents()
            },
            addContents: function() {
                var t = this,
                    e = t.vars,
                    i = t.options,
                    n = getViewport(),
                    s = i.path.toLowerCase(),
                    o = e.total > 0 && t.items.filter(function(t) {
                        return -1 === ["image", "flash", "video"].indexOf(t.type) && "undefined" == typeof t.recognized && (i.smartRecognition || t.options.smartRecognition)
                    }),
                    a = o.length > 0;
                i.mobileOptimizer && !i.innerToolbar && (e.isMobile = n.width <= e.mobileMaxWidth), e.overlay.addClass(i.skin).hide().css("opacity", i.overlay.opacity), i.linkId && e.overlay[0].setAttribute("linkid", i.linkId), i.controls.toolbar && (e.toolbar.addClass(i.skin).append(e.closeButton), i.controls.fullscreen && e.toolbar.append(e.fullScreenButton), i.controls.slideshow && e.toolbar.append(e.innerPlayButton), e.total > 1 && e.toolbar.append(e.innerPrevButton).append(e.innerNextButton)), e.BODY.addClass("ilightbox-noscroll").append(e.overlay).append(e.loader).append(e.holder).append(e.nextPhoto).append(e.prevPhoto), i.innerToolbar || e.BODY.append(e.toolbar), i.controls.arrows && e.BODY.append(e.nextButton).append(e.prevButton), i.controls.thumbnail && e.total > 1 && (e.BODY.append(e.thumbnails), e.thumbnails.addClass(i.skin).addClass("ilightbox-" + s), $("div.ilightbox-thumbnails-grid", e.thumbnails).empty(), e.thumbs = !0);
                var r = "horizontal" == i.path.toLowerCase() ? {
                    left: parseInt(n.width / 2 - e.loader.outerWidth() / 2)
                } : {
                    top: parseInt(n.height / 2 - e.loader.outerHeight() / 2)
                };
                e.loader.addClass(i.skin).css(r), e.nextButton.add(e.prevButton).addClass(i.skin), "horizontal" == s && e.loader.add(e.nextButton).add(e.prevButton).addClass("horizontal"), e.BODY[e.isMobile ? "addClass" : "removeClass"]("isMobile"), i.infinite || (e.prevButton.add(e.prevButton).add(e.innerPrevButton).add(e.innerNextButton).removeClass("disabled"), 0 == e.current && e.prevButton.add(e.innerPrevButton).addClass("disabled"), e.current >= e.total - 1 && e.nextButton.add(e.innerNextButton).addClass("disabled")), i.show.effect ? (e.overlay.stop().fadeIn(i.show.speed), e.toolbar.stop().fadeIn(i.show.speed)) : (e.overlay.show(), e.toolbar.show());
                var l = o.length;
                a ? (t.showLoader(), $.each(o, function() {
                    var n = function(n) {
                        var s = -1,
                            o = (t.items.filter(function(t, e) {
                                return t.URL == n.url && (s = e), t.URL == n.url
                            }), t.items[s]);
                        n && $.extend(!0, o, {
                            URL: n.source,
                            type: n.type,
                            recognized: !0,
                            options: {
                                html5video: n.html5video,
                                width: "image" == n.type ? 0 : n.width || o.width,
                                height: "image" == n.type ? 0 : n.height || o.height,
                                thumbnail: o.options.thumbnail || n.thumbnail
                            }
                        }), l--, 0 == l && (t.hideLoader(), e.dontGenerateThumbs = !1, t.generateThumbnails(), i.show.effect ? setTimeout(function() {
                            t.generateBoxes()
                        }, i.show.speed) : t.generateBoxes())
                    };
                    t.ogpRecognition(this, n)
                })) : i.show.effect ? setTimeout(function() {
                    t.generateBoxes()
                }, i.show.speed) : t.generateBoxes(), t.createUI(), window.iLightBox = {
                    close: function() {
                        t.closeAction()
                    },
                    fullscreen: function() {
                        t.fullScreenAction()
                    },
                    moveNext: function() {
                        t.moveTo("next")
                    },
                    movePrev: function() {
                        t.moveTo("prev")
                    },
                    goTo: function(e) {
                        t.goTo(e)
                    },
                    refresh: function() {
                        t.refresh()
                    },
                    reposition: function() {
                        arguments.length > 0 ? t.repositionPhoto(!0) : t.repositionPhoto()
                    },
                    setOption: function(e) {
                        t.setOption(e)
                    },
                    destroy: function() {
                        t.closeAction(), t.dispatchItemsEvents()
                    }
                }, i.linkId && (e.hashLock = !0, window.location.hash = i.linkId + "/" + e.current, setTimeout(function() {
                    e.hashLock = !1
                }, 55)), i.slideshow.startPaused || (t.resume(), e.innerPlayButton.removeClass("ilightbox-play").addClass("ilightbox-pause")), "function" == typeof t.options.callback.onOpen && t.options.callback.onOpen.call(t)
            },
            loadContent: function(t, e, i) {
                var n, s, o = this;
                switch (o.createUI(), t.speed = i || o.options.effects.loadedFadeSpeed, "current" == e && (o.vars.lockWheel = t.options.mousewheel ? !1 : !0, o.vars.lockSwipe = t.options.swipe ? !1 : !0), e) {
                    case "current":
                        n = o.vars.holder, s = o.vars.current;
                        break;
                    case "next":
                        n = o.vars.nextPhoto, s = o.vars.next;
                        break;
                    case "prev":
                        n = o.vars.prevPhoto, s = o.vars.prev
                }
                if (n.removeAttr("style class").addClass("ilightbox-holder" + (supportTouch ? " supportTouch" : "")).addClass(t.options.skin), $("div.ilightbox-inner-toolbar", n).remove(), t.title || o.options.innerToolbar) {
                    var a = o.vars.innerToolbar.clone();
                    if (t.title && o.options.show.title) {
                        var r = o.vars.title.clone();
                        r.empty().html(t.title), a.append(r)
                    }
                    o.options.innerToolbar && a.append(o.vars.total > 1 ? o.vars.toolbar.clone() : o.vars.toolbar), n.prepend(a)
                }
                o.loadSwitcher(t, n, s, e)
            },
            loadSwitcher: function(t, e, i, n) {
                var s = this,
                    o = s.options,
                    a = {
                        element: e,
                        position: i
                    };
                switch (t.type) {
                    case "image":
                        "function" == typeof o.callback.onBeforeLoad && o.callback.onBeforeLoad.call(s, s.ui, i), "function" == typeof t.options.onBeforeLoad && t.options.onBeforeLoad.call(s, a), s.loadImage(t.URL, function(r) {
                            "function" == typeof o.callback.onAfterLoad && o.callback.onAfterLoad.call(s, s.ui, i), "function" == typeof t.options.onAfterLoad && t.options.onAfterLoad.call(s, a);
                            var l = r ? r.width : 400,
                                h = r ? r.height : 200;
                            e.data({
                                naturalWidth: l,
                                naturalHeight: h
                            }), $("div.ilightbox-container", e).empty().append(r ? '<img src="' + t.URL + '" class="ilightbox-image" />' : '<span class="ilightbox-alert">' + o.errors.loadImage + "</span>"), "function" == typeof o.callback.onRender && o.callback.onRender.call(s, s.ui, i), "function" == typeof t.options.onRender && t.options.onRender.call(s, a), s.configureHolder(t, n, e)
                        });
                        break;
                    case "video":
                        e.data({
                            naturalWidth: t.options.width,
                            naturalHeight: t.options.height
                        }), s.addContent(e, t), "function" == typeof o.callback.onRender && o.callback.onRender.call(s, s.ui, i), "function" == typeof t.options.onRender && t.options.onRender.call(s, a), s.configureHolder(t, n, e);
                        break;
                    case "iframe":
                        s.showLoader(), e.data({
                            naturalWidth: t.options.width,
                            naturalHeight: t.options.height
                        });
                        var r = s.addContent(e, t);
                        "function" == typeof o.callback.onRender && o.callback.onRender.call(s, s.ui, i), "function" == typeof t.options.onRender && t.options.onRender.call(s, a), "function" == typeof o.callback.onBeforeLoad && o.callback.onBeforeLoad.call(s, s.ui, i), "function" == typeof t.options.onBeforeLoad && t.options.onBeforeLoad.call(s, a), r.bind("load", function() {
                            "function" == typeof o.callback.onAfterLoad && o.callback.onAfterLoad.call(s, s.ui, i), "function" == typeof t.options.onAfterLoad && t.options.onAfterLoad.call(s, a), s.hideLoader(), s.configureHolder(t, n, e), r.unbind("load")
                        });
                        break;
                    case "inline":
                        var r = $(t.URL),
                            l = s.addContent(e, t),
                            h = findImageInElement(e);
                        e.data({
                            naturalWidth: s.items[i].options.width || r.outerWidth(),
                            naturalHeight: s.items[i].options.height || r.outerHeight()
                        }), l.children().eq(0).show(), "function" == typeof o.callback.onRender && o.callback.onRender.call(s, s.ui, i), "function" == typeof t.options.onRender && t.options.onRender.call(s, a), "function" == typeof o.callback.onBeforeLoad && o.callback.onBeforeLoad.call(s, s.ui, i), "function" == typeof t.options.onBeforeLoad && t.options.onBeforeLoad.call(s, a), s.loadImage(h, function() {
                            "function" == typeof o.callback.onAfterLoad && o.callback.onAfterLoad.call(s, s.ui, i), "function" == typeof t.options.onAfterLoad && t.options.onAfterLoad.call(s, a), s.configureHolder(t, n, e)
                        });
                        break;
                    case "flash":
                        var r = s.addContent(e, t);
                        e.data({
                            naturalWidth: s.items[i].options.width || r.outerWidth(),
                            naturalHeight: s.items[i].options.height || r.outerHeight()
                        }), "function" == typeof o.callback.onRender && o.callback.onRender.call(s, s.ui, i), "function" == typeof t.options.onRender && t.options.onRender.call(s, a), s.configureHolder(t, n, e);
                        break;
                    case "ajax":
                        var d = t.options.ajax || {};
                        "function" == typeof o.callback.onBeforeLoad && o.callback.onBeforeLoad.call(s, s.ui, i), "function" == typeof t.options.onBeforeLoad && t.options.onBeforeLoad.call(s, a), s.showLoader(), $.ajax({
                            url: t.URL || o.ajaxSetup.url,
                            data: d.data || null,
                            dataType: d.dataType || "html",
                            type: d.type || o.ajaxSetup.type,
                            cache: d.cache || o.ajaxSetup.cache,
                            crossDomain: d.crossDomain || o.ajaxSetup.crossDomain,
                            global: d.global || o.ajaxSetup.global,
                            ifModified: d.ifModified || o.ajaxSetup.ifModified,
                            username: d.username || o.ajaxSetup.username,
                            password: d.password || o.ajaxSetup.password,
                            beforeSend: d.beforeSend || o.ajaxSetup.beforeSend,
                            complete: d.complete || o.ajaxSetup.complete,
                            success: function(r, l, h) {
                                s.hideLoader();
                                var c = $(r),
                                    u = $("div.ilightbox-container", e),
                                    p = s.items[i].options.width || parseInt(c[0].getAttribute("width")),
                                    f = s.items[i].options.height || parseInt(c[0].getAttribute("height")),
                                    g = c[0].getAttribute("width") && c[0].getAttribute("height") ? {
                                        overflow: "hidden"
                                    } : {};
                                u.empty().append($('<div class="ilightbox-wrapper"></div>').css(g).html(c)), e.show().data({
                                    naturalWidth: p || u.outerWidth(),
                                    naturalHeight: f || u.outerHeight()
                                }).hide(), "function" == typeof o.callback.onRender && o.callback.onRender.call(s, s.ui, i), "function" == typeof t.options.onRender && t.options.onRender.call(s, a);
                                var m = findImageInElement(e);
                                s.loadImage(m, function() {
                                    "function" == typeof o.callback.onAfterLoad && o.callback.onAfterLoad.call(s, s.ui, i), "function" == typeof t.options.onAfterLoad && t.options.onAfterLoad.call(s, a), s.configureHolder(t, n, e)
                                }), o.ajaxSetup.success(r, l, h), "function" == typeof d.success && d.success(r, l, h)
                            },
                            error: function(r, l, h) {
                                "function" == typeof o.callback.onAfterLoad && o.callback.onAfterLoad.call(s, s.ui, i), "function" == typeof t.options.onAfterLoad && t.options.onAfterLoad.call(s, a), s.hideLoader(), $("div.ilightbox-container", e).empty().append('<span class="ilightbox-alert">' + o.errors.loadContents + "</span>"), s.configureHolder(t, n, e), o.ajaxSetup.error(r, l, h), "function" == typeof d.error && d.error(r, l, h)
                            }
                        });
                        break;
                    case "html":
                        var r, c = t.URL;
                        if (container = $("div.ilightbox-container", e), c[0].nodeName) r = c.clone();
                        else {
                            var u = $(c);
                            r = u.selector ? $("<div>" + u + "</div>") : u
                        }
                        var p = s.items[i].options.width || parseInt(r.attr("width")),
                            f = s.items[i].options.height || parseInt(r.attr("height"));
                        s.addContent(e, t), r.appendTo(document.documentElement).hide(), "function" == typeof o.callback.onRender && o.callback.onRender.call(s, s.ui, i), "function" == typeof t.options.onRender && t.options.onRender.call(s, a);
                        var h = findImageInElement(e);
                        "function" == typeof o.callback.onBeforeLoad && o.callback.onBeforeLoad.call(s, s.ui, i), "function" == typeof t.options.onBeforeLoad && t.options.onBeforeLoad.call(s, a), s.loadImage(h, function() {
                            "function" == typeof o.callback.onAfterLoad && o.callback.onAfterLoad.call(s, s.ui, i), "function" == typeof t.options.onAfterLoad && t.options.onAfterLoad.call(s, a), e.show().data({
                                naturalWidth: p || container.outerWidth(),
                                naturalHeight: f || container.outerHeight()
                            }).hide(), r.remove(), s.configureHolder(t, n, e)
                        })
                }
            },
            configureHolder: function(t, e, i) {
                var n = this,
                    s = n.vars,
                    o = n.options;
                if ("current" != e && i.addClass("next" == e ? "ilightbox-next" : "ilightbox-prev"), "current" == e) var a = s.current;
                else if ("next" == e) var r = o.styles.nextOpacity,
                    a = s.next;
                else var r = o.styles.prevOpacity,
                    a = s.prev;
                var l = {
                    element: i,
                    position: a
                };
                n.items[a].options.width = n.items[a].options.width || 0, n.items[a].options.height = n.items[a].options.height || 0, "current" == e ? o.show.effect ? i.css(transform, gpuAcceleration).fadeIn(t.speed, function() {
                    if (i.css(transform, ""), t.caption) {
                        n.setCaption(t, i);
                        var e = $("div.ilightbox-caption", i),
                            s = parseInt(e.outerHeight() / i.outerHeight() * 100);
                        o.caption.start & 50 >= s && e.fadeIn(o.effects.fadeSpeed)
                    }
                    var r = t.options.social;
                    r && (n.setSocial(r, t.URL, i), o.social.start && $("div.ilightbox-social", i).fadeIn(o.effects.fadeSpeed)), n.generateThumbnails(), "function" == typeof o.callback.onShow && o.callback.onShow.call(n, n.ui, a), "function" == typeof t.options.onShow && t.options.onShow.call(n, l)
                }) : (i.show(), n.generateThumbnails(), "function" == typeof o.callback.onShow && o.callback.onShow.call(n, n.ui, a), "function" == typeof t.options.onShow && t.options.onShow.call(n, l)) : o.show.effect ? i.fadeTo(t.speed, r, function() {
                    "next" == e ? s.nextLock = !1 : s.prevLock = !1, n.generateThumbnails(), "function" == typeof o.callback.onShow && o.callback.onShow.call(n, n.ui, a), "function" == typeof t.options.onShow && t.options.onShow.call(n, l)
                }) : (i.css({
                    opacity: r
                }).show(), "next" == e ? s.nextLock = !1 : s.prevLock = !1, n.generateThumbnails(), "function" == typeof o.callback.onShow && o.callback.onShow.call(n, n.ui, a), "function" == typeof t.options.onShow && t.options.onShow.call(n, l)), setTimeout(function() {
                    n.repositionPhoto()
                }, 0)
            },
            generateBoxes: function() {
                var t = this,
                    e = t.vars,
                    i = t.options;
                i.infinite && e.total >= 3 ? (e.current == e.total - 1 && (e.next = 0), 0 == e.current && (e.prev = e.total - 1)) : i.infinite = !1, t.loadContent(t.items[e.current], "current", i.show.speed), t.items[e.next] && t.loadContent(t.items[e.next], "next", i.show.speed), t.items[e.prev] && t.loadContent(t.items[e.prev], "prev", i.show.speed)
            },
            generateThumbnails: function() {
                var t = this,
                    e = t.vars,
                    i = t.options,
                    n = null;
                if (e.thumbs && !t.vars.dontGenerateThumbs) {
                    var s = e.thumbnails,
                        o = $("div.ilightbox-thumbnails-container", s),
                        a = $("div.ilightbox-thumbnails-grid", o),
                        r = 0;
                    a.removeAttr("style").empty(), $.each(t.items, function(l, h) {
                        var d = e.current == l ? "ilightbox-active" : "",
                            c = e.current == l ? i.thumbnails.activeOpacity : i.thumbnails.normalOpacity,
                            u = h.options.thumbnail,
                            p = $('<div class="ilightbox-thumbnail"></div>'),
                            f = $('<div class="ilightbox-thumbnail-icon"></div>');
                        p.css({
                            opacity: 0
                        }).addClass(d), "video" != h.type && "flash" != h.type || "undefined" != typeof h.options.icon ? h.options.icon && (f.addClass("ilightbox-thumbnail-" + h.options.icon), p.append(f)) : (f.addClass("ilightbox-thumbnail-video"), p.append(f)), u && t.loadImage(u, function(e) {
                            r++, e ? p.data({
                                naturalWidth: e.width,
                                naturalHeight: e.height
                            }).append('<img src="' + u + '" border="0" />') : p.data({
                                naturalWidth: i.thumbnails.maxWidth,
                                naturalHeight: i.thumbnails.maxHeight
                            }), clearTimeout(n), n = setTimeout(function() {
                                t.positionThumbnails(s, o, a)
                            }, 20), setTimeout(function() {
                                p.fadeTo(i.effects.loadedFadeSpeed, c)
                            }, 20 * r)
                        }), a.append(p)
                    }), t.vars.dontGenerateThumbs = !0
                }
            },
            positionThumbnails: function(t, e, i) {
                var n = this,
                    s = n.vars,
                    o = n.options,
                    a = getViewport(),
                    r = o.path.toLowerCase();
                t || (t = s.thumbnails), e || (e = $("div.ilightbox-thumbnails-container", t)), i || (i = $("div.ilightbox-thumbnails-grid", e));
                var l = $(".ilightbox-thumbnail", i),
                    h = "horizontal" == r ? a.width - o.styles.pageOffsetX : l.eq(0).outerWidth() - o.styles.pageOffsetX,
                    d = "horizontal" == r ? l.eq(0).outerHeight() - o.styles.pageOffsetY : a.height - o.styles.pageOffsetY,
                    c = "horizontal" == r ? 0 : h,
                    u = "horizontal" == r ? d : 0,
                    p = $(".ilightbox-active", i),
                    f = {};
                arguments.length < 3 && (l.css({
                    opacity: o.thumbnails.normalOpacity
                }), p.css({
                    opacity: o.thumbnails.activeOpacity
                })), l.each(function() {
                    var t = $(this),
                        e = t.data(),
                        i = "horizontal" == r ? 0 : o.thumbnails.maxWidth;
                    height = "horizontal" == r ? o.thumbnails.maxHeight : 0, dims = n.getNewDimenstions(i, height, e.naturalWidth, e.naturalHeight, !0), t.css({
                        width: dims.width,
                        height: dims.height
                    }), "horizontal" == r && t.css({
                        "float": "left"
                    }), "horizontal" == r ? c += t.outerWidth() : u += t.outerHeight()
                }), f = {
                    width: c,
                    height: u
                }, i.css(f), f = {};
                var g = i.offset(),
                    m = p.length ? p.offset() : {
                        top: parseInt(d / 2),
                        left: parseInt(h / 2)
                    };
                g.top = g.top - $doc.scrollTop(), g.left = g.left - $doc.scrollLeft(), m.top = m.top - g.top - $doc.scrollTop(), m.left = m.left - g.left - $doc.scrollLeft(), "horizontal" == r ? (f.top = 0, f.left = parseInt(h / 2 - m.left - p.outerWidth() / 2)) : (f.top = parseInt(d / 2 - m.top - p.outerHeight() / 2), f.left = 0), arguments.length < 3 ? i.stop().animate(f, o.effects.repositionSpeed, "easeOutCirc") : i.css(f)
            },
            loadImage: function(t, e) {
                $.isArray(t) || (t = [t]);
                var i = this,
                    n = t.length;
                n > 0 ? (i.showLoader(), $.each(t, function(s) {
                    var o = new Image;
                    o.onload = function() {
                        n -= 1, 0 == n && (i.hideLoader(), e(o))
                    }, o.onerror = o.onabort = function() {
                        n -= 1, 0 == n && (i.hideLoader(), e(!1))
                    }, o.src = t[s]
                })) : e(!1)
            },
            patchItemsEvents: function() {
                var t = this,
                    e = t.vars,
                    i = supportTouch ? "itap.iL" : "click.iL",
                    n = supportTouch ? "click.iL" : "itap.iL";
                if (t.context && t.selector) {
                    var s = $(t.selector, t.context);
                    $(t.context).on(i, t.selector, function() {
                        var i = $(this),
                            n = s.index(i);
                        return e.current = n, e.next = t.items[n + 1] ? n + 1 : null, e.prev = t.items[n - 1] ? n - 1 : null, t.addContents(), t.patchEvents(), !1
                    }).on(n, t.selector, function() {
                        return !1
                    })
                } else $.each(t.itemsObject, function(s, o) {
                    o.on(i, function() {
                        return e.current = s, e.next = t.items[s + 1] ? s + 1 : null, e.prev = t.items[s - 1] ? s - 1 : null, t.addContents(), t.patchEvents(), !1
                    }).on(n, function() {
                        return !1
                    })
                })
            },
            dispatchItemsEvents: function() {
                {
                    var t = this;
                    t.vars, t.options
                }
                t.context && t.selector ? $(t.context).off(".iL", t.selector) : $.each(t.itemsObject, function(t, e) {
                    e.off(".iL")
                })
            },
            refresh: function() {
                var t = this;
                t.dispatchItemsEvents(), t.attachItems(), t.normalizeItems(), t.patchItemsEvents()
            },
            patchEvents: function() {
                function t(t) {
                    i.isMobile || (i.mouseID || i.hideableElements.show(), i.mouseID = clearTimeout(i.mouseID), -1 === h.indexOf(t.target) && (i.mouseID = setTimeout(function() {
                        i.hideableElements.hide(), i.mouseID = clearTimeout(i.mouseID)
                    }, 3e3)))
                }
                var e = this,
                    i = e.vars,
                    n = e.options,
                    s = n.path.toLowerCase(),
                    o = $(".ilightbox-holder"),
                    a = fullScreenApi.fullScreenEventName + ".iLightBox",
                    r = 1e3,
                    l = verticalDistanceThreshold = 100,
                    h = [i.nextButton[0], i.prevButton[0], i.nextButton[0].firstChild, i.prevButton[0].firstChild];
                $win.bind("resize.iLightBox", function() {
                    var t = getViewport();
                    n.mobileOptimizer && !n.innerToolbar && (i.isMobile = t.width <= i.mobileMaxWidth), i.BODY[i.isMobile ? "addClass" : "removeClass"]("isMobile"), e.repositionPhoto(null), supportTouch && (clearTimeout(i.setTime), i.setTime = setTimeout(function() {
                        var t = getScrollXY().y;
                        window.scrollTo(0, t - 30), window.scrollTo(0, t + 30), window.scrollTo(0, t)
                    }, 2e3)), i.thumbs && e.positionThumbnails()
                }).bind("keydown.iLightBox", function(t) {
                    if (n.controls.keyboard) switch (t.keyCode) {
                        case 13:
                            t.shiftKey && n.keyboard.shift_enter && e.fullScreenAction();
                            break;
                        case 27:
                            n.keyboard.esc && e.closeAction();
                            break;
                        case 37:
                            n.keyboard.left && !i.lockKey && e.moveTo("prev");
                            break;
                        case 38:
                            n.keyboard.up && !i.lockKey && e.moveTo("prev");
                            break;
                        case 39:
                            n.keyboard.right && !i.lockKey && e.moveTo("next");
                            break;
                        case 40:
                            n.keyboard.down && !i.lockKey && e.moveTo("next")
                    }
                }), fullScreenApi.supportsFullScreen && $win.bind(a, function() {
                    e.doFullscreen()
                });
                var d = [n.caption.show + ".iLightBox", n.caption.hide + ".iLightBox", n.social.show + ".iLightBox", n.social.hide + ".iLightBox"].filter(function(t, e, i) {
                        return i.lastIndexOf(t) === e
                    }),
                    c = "";
                $.each(d, function(t, e) {
                    0 != t && (c += " "), c += e
                }), $doc.on(clickEvent, ".ilightbox-overlay", function() {
                    n.overlay.blur && e.closeAction()
                }).on(clickEvent, ".ilightbox-next, .ilightbox-next-button", function() {
                    e.moveTo("next")
                }).on(clickEvent, ".ilightbox-prev, .ilightbox-prev-button", function() {
                    e.moveTo("prev")
                }).on(clickEvent, ".ilightbox-thumbnail", function() {
                    var t = $(this),
                        n = $(".ilightbox-thumbnail", i.thumbnails),
                        s = n.index(t);
                    s != i.current && e.goTo(s)
                }).on(c, ".ilightbox-holder:not(.ilightbox-next, .ilightbox-prev)", function(t) {
                    var e = $("div.ilightbox-caption", i.holder),
                        s = $("div.ilightbox-social", i.holder),
                        o = n.effects.fadeSpeed;
                    i.nextLock || i.prevLock ? (t.type != n.caption.show || e.is(":visible") ? t.type == n.caption.hide && e.is(":visible") && e.fadeOut(o) : e.fadeIn(o), t.type != n.social.show || s.is(":visible") ? t.type == n.social.hide && s.is(":visible") && s.fadeOut(o) : s.fadeIn(o)) : (t.type != n.caption.show || e.is(":visible") ? t.type == n.caption.hide && e.is(":visible") && e.stop().fadeOut(o) : e.stop().fadeIn(o), t.type != n.social.show || s.is(":visible") ? t.type == n.social.hide && s.is(":visible") && s.stop().fadeOut(o) : s.stop().fadeIn(o))
                }).on("mouseenter.iLightBox mouseleave.iLightBox", ".ilightbox-wrapper", function(t) {
                    i.lockWheel = "mouseenter" == t.type ? !0 : !1
                }).on(clickEvent, ".ilightbox-toolbar a.ilightbox-close, .ilightbox-toolbar a.ilightbox-fullscreen, .ilightbox-toolbar a.ilightbox-play, .ilightbox-toolbar a.ilightbox-pause", function() {
                    var t = $(this);
                    t.hasClass("ilightbox-fullscreen") ? e.fullScreenAction() : t.hasClass("ilightbox-play") ? (e.resume(), t.addClass("ilightbox-pause").removeClass("ilightbox-play")) : t.hasClass("ilightbox-pause") ? (e.pause(), t.addClass("ilightbox-play").removeClass("ilightbox-pause")) : e.closeAction()
                }).on(touchMoveEvent, ".ilightbox-overlay, .ilightbox-thumbnails-container", function(t) {
                    t.preventDefault()
                }), n.controls.arrows && !supportTouch && $doc.on("mousemove.iLightBox", t), n.controls.slideshow && n.slideshow.pauseOnHover && $doc.on("mouseenter.iLightBox mouseleave.iLightBox", ".ilightbox-holder:not(.ilightbox-next, .ilightbox-prev)", function(t) {
                    "mouseenter" == t.type && i.cycleID ? e.pause() : "mouseleave" == t.type && i.isPaused && e.resume()
                });
                var u = $(".ilightbox-overlay, .ilightbox-holder, .ilightbox-thumbnails");
                n.controls.mousewheel && u.on("mousewheel.iLightBox", function(t, n) {
                    i.lockWheel || (t.preventDefault(), 0 > n ? e.moveTo("next") : n > 0 && e.moveTo("prev"))
                }), n.controls.swipe && o.on(touchStartEvent, function(t) {
                    function a(t) {
                        var e = $(this),
                            i = m[t],
                            n = [v.coords[0] - c.coords[0], v.coords[1] - c.coords[1]];
                        e[0].style["horizontal" == s ? "left" : "top"] = ("horizontal" == s ? i.left - n[0] : i.top - n[1]) + "px"
                    }

                    function h(t) {
                        if (v) {
                            var e = t.originalEvent.touches ? t.originalEvent.touches[0] : t;
                            c = {
                                time: (new Date).getTime(),
                                coords: [e.pageX - f, e.pageY - p]
                            }, o.each(a), t.preventDefault()
                        }
                    }

                    function d() {
                        o.each(function() {
                            var t = $(this),
                                e = t.data("offset") || {
                                    top: t.offset().top - p,
                                    left: t.offset().left - f
                                },
                                i = e.top,
                                n = e.left;
                            t.css(transform, gpuAcceleration).stop().animate({
                                top: i,
                                left: n
                            }, 500, "easeOutCirc", function() {
                                t.css(transform, "")
                            })
                        })
                    }
                    if (!(i.nextLock || i.prevLock || 1 == i.total || i.lockSwipe)) {
                        i.BODY.addClass("ilightbox-closedhand");
                        var c, u = t.originalEvent.touches ? t.originalEvent.touches[0] : t,
                            p = $doc.scrollTop(),
                            f = $doc.scrollLeft(),
                            g = [o.eq(0).offset(), o.eq(1).offset(), o.eq(2).offset()],
                            m = [{
                                top: g[0].top - p,
                                left: g[0].left - f
                            }, {
                                top: g[1].top - p,
                                left: g[1].left - f
                            }, {
                                top: g[2].top - p,
                                left: g[2].left - f
                            }],
                            v = {
                                time: (new Date).getTime(),
                                coords: [u.pageX - f, u.pageY - p]
                            };
                        o.bind(touchMoveEvent, h), $doc.one(touchStopEvent, function() {
                            o.unbind(touchMoveEvent, h), i.BODY.removeClass("ilightbox-closedhand"), v && c && ("horizontal" == s && c.time - v.time < r && abs(v.coords[0] - c.coords[0]) > l && abs(v.coords[1] - c.coords[1]) < verticalDistanceThreshold ? v.coords[0] > c.coords[0] ? i.current != i.total - 1 || n.infinite ? (i.isSwipe = !0, e.moveTo("next")) : d() : 0 != i.current || n.infinite ? (i.isSwipe = !0, e.moveTo("prev")) : d() : "vertical" == s && c.time - v.time < r && abs(v.coords[1] - c.coords[1]) > l && abs(v.coords[0] - c.coords[0]) < verticalDistanceThreshold ? v.coords[1] > c.coords[1] ? i.current != i.total - 1 || n.infinite ? (i.isSwipe = !0, e.moveTo("next")) : d() : 0 != i.current || n.infinite ? (i.isSwipe = !0, e.moveTo("prev")) : d() : d()), v = c = undefined
                        })
                    }
                })
            },
            goTo: function(t) {
                var e = this,
                    i = e.vars,
                    n = e.options,
                    s = t - i.current;
                if (n.infinite && (t == i.total - 1 && 0 == i.current && (s = -1), i.current == i.total - 1 && 0 == t && (s = 1)), 1 == s) e.moveTo("next");
                else if (-1 == s) e.moveTo("prev");
                else {
                    if (i.nextLock || i.prevLock) return !1;
                    "function" == typeof n.callback.onBeforeChange && n.callback.onBeforeChange.call(e, e.ui), n.linkId && (i.hashLock = !0, window.location.hash = n.linkId + "/" + t), e.items[t] && (e.items[t].options.mousewheel ? e.vars.lockWheel = !1 : i.lockWheel = !0, i.lockSwipe = e.items[t].options.swipe ? !1 : !0), $.each([i.holder, i.nextPhoto, i.prevPhoto], function(t, e) {
                        e.css(transform, gpuAcceleration).fadeOut(n.effects.loadedFadeSpeed)
                    }), i.current = t, i.next = t + 1, i.prev = t - 1, e.createUI(), setTimeout(function() {
                        e.generateBoxes()
                    }, n.effects.loadedFadeSpeed + 50), $(".ilightbox-thumbnail", i.thumbnails).removeClass("ilightbox-active").eq(t).addClass("ilightbox-active"), e.positionThumbnails(), n.linkId && setTimeout(function() {
                        i.hashLock = !1
                    }, 55), n.infinite || (i.nextButton.add(i.prevButton).add(i.innerPrevButton).add(i.innerNextButton).removeClass("disabled"), 0 == i.current && i.prevButton.add(i.innerPrevButton).addClass("disabled"), i.current >= i.total - 1 && i.nextButton.add(i.innerNextButton).addClass("disabled")), e.resetCycle(), "function" == typeof n.callback.onAfterChange && n.callback.onAfterChange.call(e, e.ui)
                }
            },
            moveTo: function(t) {
                var e = this,
                    i = e.vars,
                    n = e.options,
                    s = n.path.toLowerCase(),
                    o = getViewport(),
                    a = n.effects.switchSpeed;
                if (i.nextLock || i.prevLock) return !1;
                var r = "next" == t ? i.next : i.prev;
                if (n.linkId && (i.hashLock = !0, window.location.hash = n.linkId + "/" + r), "next" == t) {
                    if (!e.items[r]) return !1;
                    var l = i.nextPhoto,
                        h = i.holder,
                        d = i.prevPhoto,
                        c = "ilightbox-prev",
                        u = "ilightbox-next"
                } else if ("prev" == t) {
                    if (!e.items[r]) return !1;
                    var l = i.prevPhoto,
                        h = i.holder,
                        d = i.nextPhoto,
                        c = "ilightbox-next",
                        u = "ilightbox-prev"
                }
                "function" == typeof n.callback.onBeforeChange && n.callback.onBeforeChange.call(e, e.ui), "next" == t ? i.nextLock = !0 : i.prevLock = !0;
                var p = $("div.ilightbox-caption", h),
                    f = $("div.ilightbox-social", h);
                if (p.length && p.stop().fadeOut(a, function() {
                        $(this).remove()
                    }), f.length && f.stop().fadeOut(a, function() {
                        $(this).remove()
                    }), e.items[r].caption) {
                    e.setCaption(e.items[r], l);
                    var g = $("div.ilightbox-caption", l),
                        m = parseInt(g.outerHeight() / l.outerHeight() * 100);
                    n.caption.start && 50 >= m && g.fadeIn(a)
                }
                var v = e.items[r].options.social;
                v && (e.setSocial(v, e.items[r].URL, l), n.social.start && $("div.ilightbox-social", l).fadeIn(n.effects.fadeSpeed)), $.each([l, h, d], function(t, e) {
                    e.removeClass("ilightbox-next ilightbox-prev")
                });
                var y = l.data("offset"),
                    b = o.width - n.styles.pageOffsetX,
                    w = o.height - n.styles.pageOffsetY,
                    x = y.newDims.width,
                    S = y.newDims.height,
                    T = y.thumbsOffset,
                    C = y.diff,
                    _ = parseInt(w / 2 - S / 2 - C.H - T.H / 2),
                    L = parseInt(b / 2 - x / 2 - C.W - T.W / 2);
                l.css(transform, gpuAcceleration).animate({
                    top: _,
                    left: L,
                    opacity: 1
                }, a, i.isSwipe ? "easeOutCirc" : "easeInOutCirc", function() {
                    l.css(transform, "")
                }), $("div.ilightbox-container", l).animate({
                    width: x,
                    height: S
                }, a, i.isSwipe ? "easeOutCirc" : "easeInOutCirc");
                var k = h.data("offset"),
                    I = k.object;
                C = k.diff, x = k.newDims.width, S = k.newDims.height, x = parseInt(x * n.styles["next" == t ? "prevScale" : "nextScale"]), S = parseInt(S * n.styles["next" == t ? "prevScale" : "nextScale"]), _ = parseInt("horizontal" == s ? w / 2 - I.offsetY - S / 2 - C.H - T.H / 2 : w - I.offsetX - C.H - T.H / 2), "prev" == t ? L = parseInt("horizontal" == s ? b - I.offsetX - C.W - T.W / 2 : b / 2 - x / 2 - C.W - I.offsetY - T.W / 2) : (_ = "horizontal" == s ? _ : parseInt(I.offsetX - C.H - S - T.H / 2), L = parseInt("horizontal" == s ? I.offsetX - C.W - x - T.W / 2 : b / 2 - I.offsetY - x / 2 - C.W - T.W / 2)), $("div.ilightbox-container", h).animate({
                    width: x,
                    height: S
                }, a, i.isSwipe ? "easeOutCirc" : "easeInOutCirc"), h.addClass(c).css(transform, gpuAcceleration).animate({
                    top: _,
                    left: L,
                    opacity: n.styles.prevOpacity
                }, a, i.isSwipe ? "easeOutCirc" : "easeInOutCirc", function() {
                    h.css(transform, ""), $(".ilightbox-thumbnail", i.thumbnails).removeClass("ilightbox-active").eq(r).addClass("ilightbox-active"), e.positionThumbnails(), e.items[r] && (i.lockWheel = e.items[r].options.mousewheel ? !1 : !0, i.lockSwipe = e.items[r].options.swipe ? !1 : !0), i.isSwipe = !1, "next" == t ? (i.nextPhoto = d, i.prevPhoto = h, i.holder = l, i.nextPhoto.hide(), i.next = i.next + 1, i.prev = i.current, i.current = i.current + 1, n.infinite && (i.current > i.total - 1 && (i.current = 0), i.current == i.total - 1 && (i.next = 0), 0 == i.current && (i.prev = i.total - 1)), e.createUI(), e.items[i.next] ? e.loadContent(e.items[i.next], "next") : i.nextLock = !1) : (i.prevPhoto = d, i.nextPhoto = h, i.holder = l, i.prevPhoto.hide(), i.next = i.current, i.current = i.prev, i.prev = i.current - 1, n.infinite && (i.current == i.total - 1 && (i.next = 0), 0 == i.current && (i.prev = i.total - 1)), e.createUI(), e.items[i.prev] ? e.loadContent(e.items[i.prev], "prev") : i.prevLock = !1), n.linkId && setTimeout(function() {
                        i.hashLock = !1
                    }, 55), n.infinite || (i.nextButton.add(i.prevButton).add(i.innerPrevButton).add(i.innerNextButton).removeClass("disabled"), 0 == i.current && i.prevButton.add(i.innerPrevButton).addClass("disabled"), i.current >= i.total - 1 && i.nextButton.add(i.innerNextButton).addClass("disabled")), e.repositionPhoto(), e.resetCycle(), "function" == typeof n.callback.onAfterChange && n.callback.onAfterChange.call(e, e.ui)
                }), _ = "horizontal" == s ? getPixel(d, "top") : parseInt("next" == t ? -(w / 2) - d.outerHeight() : 2 * _), L = "horizontal" == s ? parseInt("next" == t ? -(b / 2) - d.outerWidth() : 2 * L) : getPixel(d, "left"), d.css(transform, gpuAcceleration).animate({
                    top: _,
                    left: L,
                    opacity: n.styles.nextOpacity
                }, a, i.isSwipe ? "easeOutCirc" : "easeInOutCirc", function() {
                    d.css(transform, "")
                }).addClass(u)
            },
            setCaption: function(t, e) {
                var i = $('<div class="ilightbox-caption"></div>');
                t.caption && (i.html(t.caption), $("div.ilightbox-container", e).append(i))
            },
            normalizeSocial: function(t, e) {
                var i = this,
                    n = (i.vars, i.options),
                    s = window.location.href;
                return $.each(t, function(i, o) {
                    if (!o) return !0;
                    var a, r, l = i.toLowerCase();
                    switch (l) {
                        case "facebook":
                            a = "http://www.facebook.com/share.php?v=4&src=bm&u={URL}", r = "Share on Facebook";
                            break;
                        case "twitter":
                            a = "http://twitter.com/home?status={URL}", r = "Share on Twitter";
                            break;
                        case "googleplus":
                            a = "https://plus.google.com/share?url={URL}", r = "Share on Google+";
                            break;
                        case "delicious":
                            a = "http://delicious.com/post?url={URL}", r = "Share on Delicious";
                            break;
                        case "digg":
                            a = "http://digg.com/submit?phase=2&url={URL}", r = "Share on Digg";
                            break;
                        case "reddit":
                            a = "http://reddit.com/submit?url={URL}", r = "Share on reddit"
                    }
                    t[i] = {
                        URL: o.URL && absolutizeURI(s, o.URL) || n.linkId && window.location.href || "string" != typeof e && s || e && absolutizeURI(s, e) || s,
                        source: o.source || a || o.URL && absolutizeURI(s, o.URL) || e && absolutizeURI(s, e),
                        text: o.text || r || "Share on " + i,
                        width: "undefined" == typeof o.width || isNaN(o.width) ? 640 : parseInt(o.width),
                        height: o.height || 360
                    }
                }), t
            },
            setSocial: function(t, e, i) {
                var n = this,
                    s = $('<div class="ilightbox-social"></div>'),
                    o = "<ul>";
                t = n.normalizeSocial(t, e), $.each(t, function(t, e) {
                    var i = (t.toLowerCase(), e.source.replace(/\{URL\}/g, encodeURIComponent(e.URL).replace(/!/g, "%21").replace(/'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/\*/g, "%2A").replace(/%20/g, "+")));
                    o += '<li class="' + t + '"><a href="' + i + '" onclick="javascript:window.open(this.href' + (e.width <= 0 || e.height <= 0 ? "" : ", '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=" + e.height + ",width=" + e.width + ",left=40,top=40'") + ');return false;" title="' + e.text + '" target="_blank"></a></li>'
                }), o += "</ul>", s.html(o), $("div.ilightbox-container", i).append(s)
            },
            fullScreenAction: function() {
                {
                    var t = this;
                    t.vars
                }
                fullScreenApi.supportsFullScreen ? fullScreenApi.isFullScreen() ? fullScreenApi.cancelFullScreen(document.documentElement) : fullScreenApi.requestFullScreen(document.documentElement) : t.doFullscreen()
            },
            doFullscreen: function() {
                var t = this,
                    e = t.vars,
                    i = getViewport(),
                    n = t.options;
                if (n.fullAlone) {
                    var s = e.holder,
                        o = t.items[e.current],
                        a = i.width,
                        r = i.height,
                        l = [s, e.nextPhoto, e.prevPhoto, e.nextButton, e.prevButton, e.overlay, e.toolbar, e.thumbnails, e.loader],
                        h = [e.nextPhoto, e.prevPhoto, e.nextButton, e.prevButton, e.loader, e.thumbnails];
                    if (e.isInFullScreen) e.isInFullScreen = e.lockKey = e.lockWheel = e.lockSwipe = !1, e.overlay.css({
                        opacity: t.options.overlay.opacity
                    }), $.each(h, function(t, e) {
                        e.show()
                    }), e.fullScreenButton.attr("title", n.text.enterFullscreen), s.data({
                        naturalWidth: s.data("naturalWidthOld"),
                        naturalHeight: s.data("naturalHeightOld"),
                        naturalWidthOld: null,
                        naturalHeightOld: null
                    }), $.each(l, function(t, e) {
                        e.removeClass("ilightbox-fullscreen")
                    }), "function" == typeof n.callback.onExitFullScreen && n.callback.onExitFullScreen.call(t, t.ui);
                    else {
                        if (e.isInFullScreen = e.lockKey = e.lockWheel = e.lockSwipe = !0, e.overlay.css({
                                opacity: 1
                            }), $.each(h, function(t, e) {
                                e.hide()
                            }), e.fullScreenButton.attr("title", n.text.exitFullscreen), -1 != n.fullStretchTypes.indexOf(o.type)) s.data({
                            naturalWidthOld: s.data("naturalWidth"),
                            naturalHeightOld: s.data("naturalHeight"),
                            naturalWidth: a,
                            naturalHeight: r
                        });
                        else {
                            var i = o.options.fullViewPort || n.fullViewPort || "",
                                d = a,
                                c = r,
                                u = s.data("naturalWidth"),
                                p = s.data("naturalHeight");
                            if ("fill" == i.toLowerCase()) c = d / u * p, r > c && (d = r / p * u, c = r);
                            else if ("fit" == i.toLowerCase()) {
                                var f = t.getNewDimenstions(d, c, u, p, !0);
                                d = f.width, c = f.height
                            } else if ("stretch" == i.toLowerCase()) d = d, c = c;
                            else {
                                var g = u > d || p > c ? !0 : !1,
                                    f = t.getNewDimenstions(d, c, u, p, g);
                                d = f.width, c = f.height
                            }
                            s.data({
                                naturalWidthOld: s.data("naturalWidth"),
                                naturalHeightOld: s.data("naturalHeight"),
                                naturalWidth: d,
                                naturalHeight: c
                            })
                        }
                        $.each(l, function(t, e) {
                            e.addClass("ilightbox-fullscreen")
                        }), "function" == typeof n.callback.onEnterFullScreen && n.callback.onEnterFullScreen.call(t, t.ui)
                    }
                } else e.isInFullScreen = e.isInFullScreen ? !1 : !0;
                t.repositionPhoto(!0)
            },
            closeAction: function() {
                var t = this,
                    e = t.vars,
                    i = t.options;
                $win.unbind(".iLightBox"), $doc.off(".iLightBox"), e.isInFullScreen && fullScreenApi.cancelFullScreen(document.documentElement), $(".ilightbox-overlay, .ilightbox-holder, .ilightbox-thumbnails").off(".iLightBox"), i.hide.effect ? e.overlay.stop().fadeOut(i.hide.speed, function() {
                    e.overlay.remove(), e.BODY.removeClass("ilightbox-noscroll").off(".iLightBox")
                }) : (e.overlay.remove(), e.BODY.removeClass("ilightbox-noscroll").off(".iLightBox"));
                var n = [e.toolbar, e.holder, e.nextPhoto, e.prevPhoto, e.nextButton, e.prevButton, e.loader, e.thumbnails];
                $.each(n, function(t, e) {
                    e.removeAttr("style").remove()
                }), e.dontGenerateThumbs = e.isInFullScreen = !1, window.iLightBox = null, i.linkId && (e.hashLock = !0, removeHash(), setTimeout(function() {
                    e.hashLock = !1
                }, 55)), "function" == typeof i.callback.onHide && i.callback.onHide.call(t, t.ui)
            },
            repositionPhoto: function() {
                var t = this,
                    e = t.vars,
                    i = t.options,
                    n = i.path.toLowerCase(),
                    s = getViewport(),
                    o = s.width,
                    a = s.height,
                    r = e.isInFullScreen && i.fullAlone || e.isMobile ? 0 : "horizontal" == n ? 0 : e.thumbnails.outerWidth(),
                    l = e.isMobile ? e.toolbar.outerHeight() : e.isInFullScreen && i.fullAlone ? 0 : "horizontal" == n ? e.thumbnails.outerHeight() : 0,
                    h = e.isInFullScreen && i.fullAlone ? o : o - i.styles.pageOffsetX,
                    d = e.isInFullScreen && i.fullAlone ? a : a - i.styles.pageOffsetY,
                    c = "horizontal" == n ? parseInt(t.items[e.next] || t.items[e.prev] ? 2 * (i.styles.nextOffsetX + i.styles.prevOffsetX) : 30 >= h / 10 ? 30 : h / 10) : parseInt(30 >= h / 10 ? 30 : h / 10) + r,
                    u = "horizontal" == n ? parseInt(30 >= d / 10 ? 30 : d / 10) + l : parseInt(t.items[e.next] || t.items[e.prev] ? 2 * (i.styles.nextOffsetX + i.styles.prevOffsetX) : 30 >= d / 10 ? 30 : d / 10),
                    p = {
                        type: "current",
                        width: h,
                        height: d,
                        item: t.items[e.current],
                        offsetW: c,
                        offsetH: u,
                        thumbsOffsetW: r,
                        thumbsOffsetH: l,
                        animate: arguments.length,
                        holder: e.holder
                    };
                t.repositionEl(p), t.items[e.next] && (p = $.extend(p, {
                    type: "next",
                    item: t.items[e.next],
                    offsetX: i.styles.nextOffsetX,
                    offsetY: i.styles.nextOffsetY,
                    holder: e.nextPhoto
                }), t.repositionEl(p)), t.items[e.prev] && (p = $.extend(p, {
                    type: "prev",
                    item: t.items[e.prev],
                    offsetX: i.styles.prevOffsetX,
                    offsetY: i.styles.prevOffsetY,
                    holder: e.prevPhoto
                }), t.repositionEl(p));
                var f = "horizontal" == n ? {
                    left: parseInt(h / 2 - e.loader.outerWidth() / 2)
                } : {
                    top: parseInt(d / 2 - e.loader.outerHeight() / 2)
                };
                e.loader.css(f)
            },
            repositionEl: function(t) {
                var e = this,
                    i = e.vars,
                    n = e.options,
                    s = n.path.toLowerCase(),
                    o = "current" == t.type && i.isInFullScreen && n.fullAlone ? t.width : t.width - t.offsetW,
                    a = "current" == t.type && i.isInFullScreen && n.fullAlone ? t.height : t.height - t.offsetH,
                    r = t.item,
                    l = t.item.options,
                    h = t.holder,
                    d = t.offsetX || 0,
                    c = t.offsetY || 0,
                    u = t.thumbsOffsetW,
                    p = t.thumbsOffsetH;
                "current" == t.type ? ("number" == typeof l.width && l.width && (o = i.isInFullScreen && n.fullAlone && (-1 != n.fullStretchTypes.indexOf(r.type) || l.fullViewPort || n.fullViewPort) ? o : l.width > o ? o : l.width), "number" == typeof l.height && l.height && (a = i.isInFullScreen && n.fullAlone && (-1 != n.fullStretchTypes.indexOf(r.type) || l.fullViewPort || n.fullViewPort) ? a : l.height > a ? a : l.height)) : ("number" == typeof l.width && l.width && (o = l.width > o ? o : l.width), "number" == typeof l.height && l.height && (a = l.height > a ? a : l.height)), a = parseInt(a - $(".ilightbox-inner-toolbar", h).outerHeight());
                var f = "string" == typeof l.width && -1 != l.width.indexOf("%") ? percentToValue(parseInt(l.width.replace("%", "")), t.width) : h.data("naturalWidth"),
                    g = "string" == typeof l.height && -1 != l.height.indexOf("%") ? percentToValue(parseInt(l.height.replace("%", "")), t.height) : h.data("naturalHeight"),
                    m = "string" == typeof l.width && -1 != l.width.indexOf("%") || "string" == typeof l.height && -1 != l.height.indexOf("%") ? {
                        width: f,
                        height: g
                    } : e.getNewDimenstions(o, a, f, g),
                    v = $.extend({}, m, {});
                "prev" == t.type || "next" == t.type ? (f = parseInt(m.width * ("next" == t.type ? n.styles.nextScale : n.styles.prevScale)), g = parseInt(m.height * ("next" == t.type ? n.styles.nextScale : n.styles.prevScale))) : (f = m.width, g = m.height);
                var y = parseInt((getPixel(h, "padding-left") + getPixel(h, "padding-right") + getPixel(h, "border-left-width") + getPixel(h, "border-right-width")) / 2),
                    b = parseInt((getPixel(h, "padding-top") + getPixel(h, "padding-bottom") + getPixel(h, "border-top-width") + getPixel(h, "border-bottom-width") + $(".ilightbox-inner-toolbar", h).outerHeight()) / 2);
                switch (t.type) {
                    case "current":
                        var w = parseInt(t.height / 2 - g / 2 - b - p / 2),
                            x = parseInt(t.width / 2 - f / 2 - y - u / 2);
                        break;
                    case "next":
                        var w = parseInt("horizontal" == s ? t.height / 2 - c - g / 2 - b - p / 2 : t.height - d - b - p / 2),
                            x = parseInt("horizontal" == s ? t.width - d - y - u / 2 : t.width / 2 - f / 2 - y - c - u / 2);
                        break;
                    case "prev":
                        var w = parseInt("horizontal" == s ? t.height / 2 - c - g / 2 - b - p / 2 : d - b - g - p / 2),
                            x = parseInt("horizontal" == s ? d - y - f - u / 2 : t.width / 2 - c - f / 2 - y - u / 2)
                }
                h.data("offset", {
                    top: w,
                    left: x,
                    newDims: v,
                    diff: {
                        W: y,
                        H: b
                    },
                    thumbsOffset: {
                        W: u,
                        H: p
                    },
                    object: t
                }), t.animate > 0 && n.effects.reposition ? (h.css(transform, gpuAcceleration).stop().animate({
                    top: w,
                    left: x
                }, n.effects.repositionSpeed, "easeOutCirc", function() {
                    h.css(transform, "")
                }), $("div.ilightbox-container", h).stop().animate({
                    width: f,
                    height: g
                }, n.effects.repositionSpeed, "easeOutCirc"), $("div.ilightbox-inner-toolbar", h).stop().animate({
                    width: f
                }, n.effects.repositionSpeed, "easeOutCirc", function() {
                    $(this).css("overflow", "visible")
                })) : (h.css({
                    top: w,
                    left: x
                }), $("div.ilightbox-container", h).css({
                    width: f,
                    height: g
                }), $("div.ilightbox-inner-toolbar", h).css({
                    width: f
                }))
            },
            resume: function(t) {
                var e = this,
                    i = e.vars,
                    n = e.options;
                !n.slideshow.pauseTime || n.controls.slideshow && i.total <= 1 || t < i.isPaused || (i.isPaused = 0, i.cycleID && (i.cycleID = clearTimeout(i.cycleID)), i.cycleID = setTimeout(function() {
                    i.current == i.total - 1 ? e.goTo(0) : e.moveTo("next")
                }, n.slideshow.pauseTime))
            },
            pause: function(t) {
                {
                    var e = this,
                        i = e.vars;
                    e.options
                }
                t < i.isPaused || (i.isPaused = t || 100, i.cycleID && (i.cycleID = clearTimeout(i.cycleID)))
            },
            resetCycle: function() {
                var t = this,
                    e = t.vars,
                    i = t.options;
                i.controls.slideshow && e.cycleID && !e.isPaused && t.resume()
            },
            getNewDimenstions: function(t, e, i, n, s) {
                var o = this;
                factor = t ? e ? min(t / i, e / n) : t / i : e / n, s || (factor > o.options.maxScale ? factor = o.options.maxScale : factor < o.options.minScale && (factor = o.options.minScale));
                var a = o.options.keepAspectRatio ? round(i * factor) : t,
                    r = o.options.keepAspectRatio ? round(n * factor) : e;
                return {
                    width: a,
                    height: r,
                    ratio: factor
                }
            },
            setOption: function(t) {
                var e = this;
                e.options = $.extend(!0, e.options, t || {}), e.refresh()
            },
            availPlugins: function() {
                var t = this,
                    e = document.createElement("video");
                t.plugins = {
                    flash: !1,
                    quicktime: parseInt(PluginDetect.getVersion("QuickTime")) >= 0 ? !0 : !1,
                    html5H264: !(!e.canPlayType || !e.canPlayType("video/mp4").replace(/no/, "")),
                    html5WebM: !(!e.canPlayType || !e.canPlayType("video/webm").replace(/no/, "")),
                    html5Vorbis: !(!e.canPlayType || !e.canPlayType("video/ogg").replace(/no/, "")),
                    html5QuickTime: !(!e.canPlayType || !e.canPlayType("video/quicktime").replace(/no/, ""))
                }
            },
            addContent: function(t, e) {
                var i, n = this;
                switch (e.type) {
                    case "video":
                        var s = !1,
                            o = e.videoType,
                            a = e.options.html5video;
                        ("video/mp4" == o || "mp4" == e.ext || "m4v" == e.ext || a.h264) && n.plugins.html5H264 ? (e.ext = "mp4", e.URL = a.h264 || e.URL) : a.webm && n.plugins.html5WebM ? (e.ext = "webm", e.URL = a.webm || e.URL) : a.ogg && n.plugins.html5Vorbis && (e.ext = "ogv", e.URL = a.ogg || e.URL), !n.plugins.html5H264 || "video/mp4" != o && "mp4" != e.ext && "m4v" != e.ext ? !n.plugins.html5WebM || "video/webm" != o && "webm" != e.ext ? !n.plugins.html5Vorbis || "video/ogg" != o && "ogv" != e.ext ? !n.plugins.html5QuickTime || "video/quicktime" != o && "mov" != e.ext && "qt" != e.ext || (s = !0, o = "video/quicktime") : (s = !0, o = "video/ogg") : (s = !0, o = "video/webm") : (s = !0, o = "video/mp4"), s ? i = $("<video />", {
                            width: "100%",
                            height: "100%",
                            preload: a.preload,
                            autoplay: a.autoplay,
                            poster: a.poster,
                            controls: a.controls
                        }).append($("<source />", {
                            src: e.URL,
                            type: o
                        })) : n.plugins.quicktime ? (i = $("<object />", {
                            type: "video/quicktime",
                            pluginspage: pluginspages.quicktime
                        }).attr({
                            data: e.URL,
                            width: "100%",
                            height: "100%"
                        }).append($("<param />", {
                            name: "src",
                            value: e.URL
                        })).append($("<param />", {
                            name: "autoplay",
                            value: "false"
                        })).append($("<param />", {
                            name: "loop",
                            value: "false"
                        })).append($("<param />", {
                            name: "scale",
                            value: "tofit"
                        })), browser.msie && (i = QT_GenerateOBJECTText(e.URL, "100%", "100%", "", "SCALE", "tofit", "AUTOPLAY", "false", "LOOP", "false"))) : i = $("<span />", {
                            "class": "ilightbox-alert",
                            html: n.options.errors.missingPlugin.replace("{pluginspage}", pluginspages.quicktime).replace("{type}", "QuickTime")
                        });
                        break;
                    case "flash":
                        if (n.plugins.flash) {
                            var r = "",
                                l = 0;
                            e.options.flashvars ? $.each(e.options.flashvars, function(t, e) {
                                0 != l && (r += "&"), r += t + "=" + encodeURIComponent(e), l++
                            }) : r = null, i = $("<embed />").attr({
                                type: "application/x-shockwave-flash",
                                src: e.URL,
                                width: "number" == typeof e.options.width && e.options.width && "1" == n.options.minScale && "1" == n.options.maxScale ? e.options.width : "100%",
                                height: "number" == typeof e.options.height && e.options.height && "1" == n.options.minScale && "1" == n.options.maxScale ? e.options.height : "100%",
                                quality: "high",
                                bgcolor: "#000000",
                                play: "true",
                                loop: "true",
                                menu: "true",
                                wmode: "transparent",
                                scale: "showall",
                                allowScriptAccess: "always",
                                allowFullScreen: "true",
                                flashvars: r,
                                fullscreen: "yes"
                            })
                        } else i = $("<span />", {
                            "class": "ilightbox-alert",
                            html: n.options.errors.missingPlugin.replace("{pluginspage}", pluginspages.flash).replace("{type}", "Adobe Flash player")
                        });
                        break;
                    case "iframe":
                        i = $("<iframe />").attr({
                            width: "number" == typeof e.options.width && e.options.width && "1" == n.options.minScale && "1" == n.options.maxScale ? e.options.width : "100%",
                            height: "number" == typeof e.options.height && e.options.height && "1" == n.options.minScale && "1" == n.options.maxScale ? e.options.height : "100%",
                            src: e.URL,
                            frameborder: 0,
                            hspace: 0,
                            vspace: 0,
                            scrolling: supportTouch ? "auto" : "scroll",
                            webkitAllowFullScreen: "",
                            mozallowfullscreen: "",
                            allowFullScreen: ""
                        });
                        break;
                    case "inline":
                        i = $('<div class="ilightbox-wrapper"></div>').html($(e.URL).clone(!0));
                        break;
                    case "html":
                        var i, h = e.URL;
                        if (h[0].nodeName) i = $('<div class="ilightbox-wrapper"></div>').html(h);
                        else {
                            var d = $(e.URL),
                                c = d.selector ? $("<div>" + d + "</div>") : d;
                            i = $('<div class="ilightbox-wrapper"></div>').html(c)
                        }
                }
                return $("div.ilightbox-container", t).empty().html(i), "video" === i[0].tagName.toLowerCase() && browser.webkit && setTimeout(function() {
                    var t = i[0].currentSrc + "?" + floor(3e4 * random());
                    i[0].currentSrc = t, i[0].src = t
                }), i
            },
            ogpRecognition: function(t, e) {
                var i = this,
                    n = t.URL;
                i.showLoader(), doAjax(n, function(t) {
                    if (i.hideLoader(), t) {
                        var n = new Object;
                        if (n.length = !1, n.url = t.url, 200 == t.status) {
                            var s = t.results,
                                o = s.type,
                                a = s.source;
                            n.source = a.src, n.width = a.width && parseInt(a.width) || 0, n.height = a.height && parseInt(a.height) || 0, n.type = o, n.thumbnail = a.thumbnail || s.images[0], n.html5video = s.html5video || {}, n.length = !0, "application/x-shockwave-flash" == a.type ? n.type = "flash" : -1 != a.type.indexOf("video/") ? n.type = "video" : -1 != a.type.indexOf("/html") ? n.type = "iframe" : -1 != a.type.indexOf("image/") && (n.type = "image")
                        } else if ("undefined" != typeof t.response) throw t.response;
                        e.call(this, n.length ? n : !1)
                    }
                })
            },
            hashChangeHandler: function(t) {
                var e = this,
                    i = e.vars,
                    n = e.options,
                    s = t || window.location.href,
                    o = parseURI(s).hash,
                    a = o.split("/"),
                    r = a[1];
                if (!(i.hashLock || "#" + n.linkId != a[0] && o.length > 1))
                    if (r) {
                        var l = a[1] || 0;
                        if (e.items[l]) {
                            var h = $(".ilightbox-overlay");
                            h.length && h.attr("linkid") == n.linkId ? e.goTo(l) : e.itemsObject[l].trigger(supportTouch ? "itap" : "click")
                        } else {
                            var h = $(".ilightbox-overlay");
                            h.length && e.closeAction()
                        }
                    } else {
                        var h = $(".ilightbox-overlay");
                        h.length && e.closeAction()
                    }
            }
        }, $.fn.iLightBox = function() {
            var t = arguments,
                e = $.isPlainObject(t[0]) ? t[0] : t[1],
                i = $.isArray(t[0]) || "string" == typeof t[0] ? t[0] : t[1];
            e || (e = {});
            var n = $.extend(!0, {
                    attr: "href",
                    path: "vertical",
                    skin: "dark",
                    linkId: !1,
                    infinite: !1,
                    startFrom: 0,
                    randomStart: !1,
                    keepAspectRatio: !0,
                    maxScale: 1,
                    minScale: .2,
                    innerToolbar: !1,
                    smartRecognition: !1,
                    mobileOptimizer: !0,
                    fullAlone: !0,
                    fullViewPort: null,
                    fullStretchTypes: "flash, video",
                    overlay: {
                        blur: !0,
                        opacity: .85
                    },
                    controls: {
                        arrows: !1,
                        slideshow: !1,
                        toolbar: !0,
                        fullscreen: !0,
                        thumbnail: !0,
                        keyboard: !0,
                        mousewheel: !0,
                        swipe: !0
                    },
                    keyboard: {
                        left: !0,
                        right: !0,
                        up: !0,
                        down: !0,
                        esc: !0,
                        shift_enter: !0
                    },
                    show: {
                        effect: !0,
                        speed: 300,
                        title: !0
                    },
                    hide: {
                        effect: !0,
                        speed: 300
                    },
                    caption: {
                        start: !0,
                        show: "mouseenter",
                        hide: "mouseleave"
                    },
                    social: {
                        start: !0,
                        show: "mouseenter",
                        hide: "mouseleave",
                        buttons: !1
                    },
                    styles: {
                        pageOffsetX: 0,
                        pageOffsetY: 0,
                        nextOffsetX: 45,
                        nextOffsetY: 0,
                        nextOpacity: 1,
                        nextScale: 1,
                        prevOffsetX: 45,
                        prevOffsetY: 0,
                        prevOpacity: 1,
                        prevScale: 1
                    },
                    thumbnails: {
                        maxWidth: 120,
                        maxHeight: 80,
                        normalOpacity: 1,
                        activeOpacity: .6
                    },
                    effects: {
                        reposition: !0,
                        repositionSpeed: 200,
                        switchSpeed: 500,
                        loadedFadeSpeed: 180,
                        fadeSpeed: 200
                    },
                    slideshow: {
                        pauseTime: 5e3,
                        pauseOnHover: !1,
                        startPaused: !0
                    },
                    text: {
                        close: "Press Esc to close",
                        enterFullscreen: "Enter Fullscreen (Shift+Enter)",
                        exitFullscreen: "Exit Fullscreen (Shift+Enter)",
                        slideShow: "Slideshow",
                        next: "Next",
                        previous: "Previous"
                    },
                    errors: {
                        loadImage: "An error occurred when trying to load photo.",
                        loadContents: "An error occurred when trying to load contents.",
                        missingPlugin: "The content your are attempting to view requires the <a href='{pluginspage}' target='_blank'>{type} plugin</a>."
                    },
                    ajaxSetup: {
                        url: "",
                        beforeSend: function() {},
                        cache: !1,
                        complete: function() {},
                        crossDomain: !1,
                        error: function() {},
                        success: function() {},
                        global: !0,
                        ifModified: !1,
                        username: null,
                        password: null,
                        type: "GET"
                    },
                    callback: {}
                }, e),
                s = $.isArray(i) || "string" == typeof i ? !0 : !1;
            if (i = $.isArray(i) ? i : new Array, "string" == typeof t[0] && (i[0] = t[0]), version_compare($.fn.jquery, "1.8", ">=")) {
                var o = new iLightBox($(this), n, i, s);
                return {
                    close: function() {
                        o.closeAction()
                    },
                    fullscreen: function() {
                        o.fullScreenAction()
                    },
                    moveNext: function() {
                        o.moveTo("next")
                    },
                    movePrev: function() {
                        o.moveTo("prev")
                    },
                    goTo: function(t) {
                        o.goTo(t)
                    },
                    refresh: function() {
                        o.refresh()
                    },
                    reposition: function() {
                        arguments.length > 0 ? o.repositionPhoto(!0) : o.repositionPhoto()
                    },
                    setOption: function(t) {
                        o.setOption(t)
                    },
                    destroy: function() {
                        o.closeAction(), o.dispatchItemsEvents()
                    }
                }
            }
            throw "The jQuery version that was loaded is too old. iLightBox requires jQuery 1.8+"
        }, $.iLightBox = function() {
            return $.fn.iLightBox(arguments[0], arguments[1])
        }, $.extend($.easing, {
            easeInCirc: function(t, e, i, n, s) {
                return -n * (sqrt(1 - (e /= s) * e) - 1) + i
            },
            easeOutCirc: function(t, e, i, n, s) {
                return n * sqrt(1 - (e = e / s - 1) * e) + i
            },
            easeInOutCirc: function(t, e, i, n, s) {
                return (e /= s / 2) < 1 ? -n / 2 * (sqrt(1 - e * e) - 1) + i : n / 2 * (sqrt(1 - (e -= 2) * e) + 1) + i
            }
        }),
        function() {
            $.each("touchstart touchmove touchend tap taphold swipe swipeleft swiperight scrollstart scrollstop".split(" "), function(t, e) {
                $.fn[e] = function(t) {
                    return t ? this.bind(e, t) : this.trigger(e)
                }, $.attrFn && ($.attrFn[e] = !0)
            });
            var t = {
                startEvent: "touchstart.iTap",
                endEvent: "touchend.iTap"
            };
            $.event.special.itap = {
                setup: function() {
                    var e, i, n = this,
                        s = $(this);
                    s.bind(t.startEvent, function() {
                        e = getScrollXY(), s.one(t.endEvent, function(t) {
                            i = getScrollXY();
                            var s = t || window.event;
                            t = $.event.fix(s), t.type = "itap", e && i && e.x == i.x && e.y == i.y && ($.event.dispatch || $.event.handle).call(n, t), e = i = undefined
                        })
                    })
                },
                teardown: function() {
                    $(this).unbind(t.startEvent)
                }
            }
        }(),
        function() {
            if (fullScreenApi = {
                    supportsFullScreen: !1,
                    isFullScreen: function() {
                        return !1
                    },
                    requestFullScreen: function() {},
                    cancelFullScreen: function() {},
                    fullScreenEventName: "",
                    prefix: ""
                }, browserPrefixes = "webkit moz o ms khtml".split(" "), "undefined" != typeof document.cancelFullScreen) fullScreenApi.supportsFullScreen = !0;
            else
                for (var t = 0, e = browserPrefixes.length; e > t; t++)
                    if (fullScreenApi.prefix = browserPrefixes[t], "undefined" != typeof document[fullScreenApi.prefix + "CancelFullScreen"]) {
                        fullScreenApi.supportsFullScreen = !0;
                        break
                    }
            fullScreenApi.supportsFullScreen && (fullScreenApi.fullScreenEventName = fullScreenApi.prefix + "fullscreenchange", fullScreenApi.isFullScreen = function() {
                switch (this.prefix) {
                    case "":
                        return document.fullScreen;
                    case "webkit":
                        return document.webkitIsFullScreen;
                    default:
                        return document[this.prefix + "FullScreen"]
                }
            }, fullScreenApi.requestFullScreen = function(t) {
                return "" === this.prefix ? t.requestFullScreen() : t[this.prefix + "RequestFullScreen"]()
            }, fullScreenApi.cancelFullScreen = function() {
                return "" === this.prefix ? document.cancelFullScreen() : document[this.prefix + "CancelFullScreen"]()
            })
        }(),
        function() {
            function t(t) {
                t = t.toLowerCase();
                var e = /(chrome)[ \/]([\w.]+)/.exec(t) || /(webkit)[ \/]([\w.]+)/.exec(t) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(t) || /(msie) ([\w.]+)/.exec(t) || t.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(t) || [];
                return {
                    browser: e[1] || "",
                    version: e[2] || "0"
                }
            }
            var e = t(navigator.userAgent);
            browser = {}, e.browser && (browser[e.browser] = !0, browser.version = e.version), browser.chrome ? browser.webkit = !0 : browser.webkit && (browser.safari = !0)
        }(),
        function() {
            function t(t) {
                for (var n = 0, s = e.length; s > n; n++) {
                    var o = e[n] ? e[n] + t.charAt(0).toUpperCase() + t.slice(1) : t;
                    if (i.style[o] !== undefined) return o
                }
            }
            var e = ["", "webkit", "moz", "ms", "o"],
                i = document.createElement("div");
            transform = t("transform") || "", gpuAcceleration = t("perspective") ? "translateZ(0) " : ""
        }();
    var PluginDetect = {
        version: "0.7.9",
        name: "PluginDetect",
        handler: function(t, e, i) {
            return function() {
                t(e, i)
            }
        },
        openTag: "<",
        isDefined: function(t) {
            return "undefined" != typeof t
        },
        isArray: function(t) {
            return /array/i.test(Object.prototype.toString.call(t))
        },
        isFunc: function(t) {
            return "function" == typeof t
        },
        isString: function(t) {
            return "string" == typeof t
        },
        isNum: function(t) {
            return "number" == typeof t
        },
        isStrNum: function(t) {
            return "string" == typeof t && /\d/.test(t)
        },
        getNumRegx: /[\d][\d\.\_,-]*/,
        splitNumRegx: /[\.\_,-]/g,
        getNum: function(t, e) {
            var i = this,
                n = i.isStrNum(t) ? (i.isDefined(e) ? new RegExp(e) : i.getNumRegx).exec(t) : null;
            return n ? n[0] : null
        },
        compareNums: function(t, e, i) {
            var n, s, o, a = this,
                r = parseInt;
            if (a.isStrNum(t) && a.isStrNum(e)) {
                if (a.isDefined(i) && i.compareNums) return i.compareNums(t, e);
                for (n = t.split(a.splitNumRegx), s = e.split(a.splitNumRegx), o = 0; o < min(n.length, s.length); o++) {
                    if (r(n[o], 10) > r(s[o], 10)) return 1;
                    if (r(n[o], 10) < r(s[o], 10)) return -1
                }
            }
            return 0
        },
        formatNum: function(t, e) {
            var i, n, s = this;
            if (!s.isStrNum(t)) return null;
            for (s.isNum(e) || (e = 4), e--, n = t.replace(/\s/g, "").split(s.splitNumRegx).concat(["0", "0", "0", "0"]), i = 0; 4 > i; i++) /^(0+)(.+)$/.test(n[i]) && (n[i] = RegExp.$2), (i > e || !/\d/.test(n[i])) && (n[i] = "0");
            return n.slice(0, 4).join(",")
        },
        $$hasMimeType: function(t) {
            return function(e) {
                if (!t.isIE && e) {
                    var i, n, s, o = t.isArray(e) ? e : t.isString(e) ? [e] : [];
                    for (s = 0; s < o.length; s++)
                        if (t.isString(o[s]) && /[^\s]/.test(o[s]) && (i = navigator.mimeTypes[o[s]], n = i ? i.enabledPlugin : 0, n && (n.name || n.description))) return i
                }
                return null
            }
        },
        findNavPlugin: function(t, e, i) {
            var n, s, o, a = this,
                r = new RegExp(t, "i"),
                l = !a.isDefined(e) || e ? /\d/ : 0,
                h = i ? new RegExp(i, "i") : 0,
                d = navigator.plugins,
                c = "";
            for (n = 0; n < d.length; n++)
                if (o = d[n].description || c, s = d[n].name || c, (r.test(o) && (!l || l.test(RegExp.leftContext + RegExp.rightContext)) || r.test(s) && (!l || l.test(RegExp.leftContext + RegExp.rightContext))) && (!h || !h.test(o) && !h.test(s))) return d[n];
            return null
        },
        getMimeEnabledPlugin: function(t, e, i) {
            var n, s, o, a, r = this,
                l = new RegExp(e, "i"),
                h = "",
                d = i ? new RegExp(i, "i") : 0,
                c = r.isString(t) ? [t] : t;
            for (a = 0; a < c.length; a++)
                if ((n = r.hasMimeType(c[a])) && (n = n.enabledPlugin) && (o = n.description || h, s = n.name || h, (l.test(o) || l.test(s)) && (!d || !d.test(o) && !d.test(s)))) return n;
            return 0
        },
        getPluginFileVersion: function(t, e) {
            var i, n, s, o, a = this,
                r = -1;
            if (a.OS > 2 || !t || !t.version || !(i = a.getNum(t.version))) return e;
            if (!e) return i;
            for (i = a.formatNum(i), e = a.formatNum(e), n = e.split(a.splitNumRegx), s = i.split(a.splitNumRegx), o = 0; o < n.length; o++) {
                if (r > -1 && o > r && "0" != n[o]) return e;
                if (s[o] != n[o] && (-1 == r && (r = o), "0" != n[o])) return e
            }
            return i
        },
        AXO: window.ActiveXObject,
        getAXO: function(t) {
            var e = null,
                i = this;
            try {
                e = new i.AXO(t)
            } catch (n) {}
            return e
        },
        convertFuncs: function(t) {
            var e, i, n = /^[\$][\$]/;
            for (e in t)
                if (n.test(e)) try {
                    i = e.slice(2), i.length > 0 && !t[i] && (t[i] = t[e](t), delete t[e])
                } catch (s) {}
        },
        initObj: function(t, e, i) {
            var n, s;
            if (t) {
                if (1 == t[e[0]] || i)
                    for (n = 0; n < e.length; n += 2) t[e[n]] = e[n + 1];
                for (n in t) s = t[n], s && 1 == s[e[0]] && this.initObj(s, e)
            }
        },
        initScript: function() {
            var t, e = this,
                i = navigator,
                n = document,
                s = i.userAgent || "",
                o = i.vendor || "",
                a = i.platform || "",
                r = i.product || "";
            e.initObj(e, ["$", e]);
            for (t in e.Plugins) e.Plugins[t] && e.initObj(e.Plugins[t], ["$", e, "$$", e.Plugins[t]], 1);
            if (e.convertFuncs(e), e.OS = 100, a) {
                var l = ["Win", 1, "Mac", 2, "Linux", 3, "FreeBSD", 4, "iPhone", 21.1, "iPod", 21.2, "iPad", 21.3, "Win.*CE", 22.1, "Win.*Mobile", 22.2, "Pocket\\s*PC", 22.3, "", 100];
                for (t = l.length - 2; t >= 0; t -= 2)
                    if (l[t] && new RegExp(l[t], "i").test(a)) {
                        e.OS = l[t + 1];
                        break
                    }
            }
            if (e.head = n.getElementsByTagName("head")[0] || n.getElementsByTagName("body")[0] || n.body || null, e.isIE = new Function("return/*@cc_on!@*/!1")(), e.verIE = e.isIE && /MSIE\s*(\d+\.?\d*)/i.test(s) ? parseFloat(RegExp.$1, 10) : null, e.verIEfull = null, e.docModeIE = null, e.isIE) {
                var h, d = document.createElement("div");
                try {
                    d.style.behavior = "url(#default#clientcaps)", e.verIEfull = d.getComponentVersion("{89820200-ECBD-11CF-8B85-00AA005B4383}", "componentid").replace(/,/g, ".")
                } catch (c) {}
                h = parseFloat(e.verIEfull || "0", 10), e.docModeIE = n.documentMode || (/back/i.test(n.compatMode || "") ? 5 : h) || e.verIE, e.verIE = h || e.docModeIE
            }
            if (e.ActiveXEnabled = !1, e.isIE) {
                var t, u = ["Msxml2.XMLHTTP", "Msxml2.DOMDocument", "Microsoft.XMLDOM", "ShockwaveFlash.ShockwaveFlash", "TDCCtl.TDCCtl", "Shell.UIHelper", "Scripting.Dictionary", "wmplayer.ocx"];
                for (t = 0; t < u.length; t++)
                    if (e.getAXO(u[t])) {
                        e.ActiveXEnabled = !0;
                        break
                    }
            }
            e.isGecko = /Gecko/i.test(r) && /Gecko\s*\/\s*\d/i.test(s), e.verGecko = e.isGecko ? e.formatNum(/rv\s*\:\s*([\.\,\d]+)/i.test(s) ? RegExp.$1 : "0.9") : null, e.isChrome = /Chrome\s*\/\s*(\d[\d\.]*)/i.test(s), e.verChrome = e.isChrome ? e.formatNum(RegExp.$1) : null, e.isSafari = (/Apple/i.test(o) || !o && !e.isChrome) && /Safari\s*\/\s*(\d[\d\.]*)/i.test(s), e.verSafari = e.isSafari && /Version\s*\/\s*(\d[\d\.]*)/i.test(s) ? e.formatNum(RegExp.$1) : null, e.isOpera = /Opera\s*[\/]?\s*(\d+\.?\d*)/i.test(s), e.verOpera = e.isOpera ? parseFloat(RegExp.$1, 10) : null, e.addWinEvent("load", e.handler(e.runWLfuncs, e))
        },
        init: function(t) {
            var e, t, i = this,
                n = {
                    status: -3,
                    plugin: 0
                };
            return i.isString(t) ? 1 == t.length ? (i.getVersionDelimiter = t, n) : (t = t.toLowerCase().replace(/\s/g, ""), e = i.Plugins[t], e && e.getVersion ? (n.plugin = e, i.isDefined(e.installed) || (e.installed = null, e.version = null, e.version0 = null, e.getVersionDone = null, e.pluginName = t), i.garbage = !1, i.isIE && !i.ActiveXEnabled && "java" !== t ? (n.status = -2, n) : (n.status = 1, n)) : n) : n
        },
        fPush: function(t, e) {
            var i = this;
            i.isArray(e) && (i.isFunc(t) || i.isArray(t) && t.length > 0 && i.isFunc(t[0])) && e.push(t)
        },
        callArray: function(t) {
            var e, i = this;
            if (i.isArray(t))
                for (e = 0; e < t.length; e++) {
                    if (null === t[e]) return;
                    i.call(t[e]), t[e] = null
                }
        },
        call: function(t) {
            var e = this,
                i = e.isArray(t) ? t.length : -1;
            i > 0 && e.isFunc(t[0]) ? t[0](e, i > 1 ? t[1] : 0, i > 2 ? t[2] : 0, i > 3 ? t[3] : 0) : e.isFunc(t) && t(e)
        },
        getVersionDelimiter: ",",
        $$getVersion: function(t) {
            return function(e, i, n) {
                var s, o, a = t.init(e);
                return a.status < 0 ? null : (s = a.plugin, 1 != s.getVersionDone && (s.getVersion(null, i, n), null === s.getVersionDone && (s.getVersionDone = 1)), t.cleanup(), o = s.version || s.version0, o = o ? o.replace(t.splitNumRegx, t.getVersionDelimiter) : o)
            }
        },
        cleanup: function() {
            var t = this;
            t.garbage && t.isDefined(window.CollectGarbage) && window.CollectGarbage()
        },
        isActiveXObject: function(t, e) {
            var i = this,
                n = !1,
                s = '<object width="1" height="1" style="display:none" ' + t.getCodeBaseVersion(e) + ">" + t.HTML + i.openTag + "/object>";
            if (!i.head) return n;
            i.head.insertBefore(document.createElement("object"), i.head.firstChild), i.head.firstChild.outerHTML = s;
            try {
                i.head.firstChild.classid = t.classID
            } catch (o) {}
            try {
                i.head.firstChild.object && (n = !0)
            } catch (o) {}
            try {
                n && i.head.firstChild.readyState < 4 && (i.garbage = !0)
            } catch (o) {}
            return i.head.removeChild(i.head.firstChild), n
        },
        codebaseSearch: function(t, e) {
            var i = this;
            if (!i.ActiveXEnabled || !t) return null;
            t.BIfuncs && t.BIfuncs.length && null !== t.BIfuncs[t.BIfuncs.length - 1] && i.callArray(t.BIfuncs);
            var n, s = t.SEARCH;
            if (i.isStrNum(e)) return s.match && s.min && i.compareNums(e, s.min) <= 0 ? !0 : s.match && s.max && i.compareNums(e, s.max) >= 0 ? !1 : (n = i.isActiveXObject(t, e), n && (!s.min || i.compareNums(e, s.min) > 0) && (s.min = e), n || s.max && !(i.compareNums(e, s.max) < 0) || (s.max = e), n);
            var o, a, r, l, h, d = [0, 0, 0, 0],
                c = [].concat(s.digits),
                u = s.min ? 1 : 0,
                p = function(e, n) {
                    var s = [].concat(d);
                    return s[e] = n, i.isActiveXObject(t, s.join(","))
                };
            if (s.max) {
                for (l = s.max.split(i.splitNumRegx), o = 0; o < l.length; o++) l[o] = parseInt(l[o], 10);
                l[0] < c[0] && (c[0] = l[0])
            }
            if (s.min) {
                for (h = s.min.split(i.splitNumRegx), o = 0; o < h.length; o++) h[o] = parseInt(h[o], 10);
                h[0] > d[0] && (d[0] = h[0])
            }
            if (h && l)
                for (o = 1; o < h.length && h[o - 1] == l[o - 1]; o++) l[o] < c[o] && (c[o] = l[o]), h[o] > d[o] && (d[o] = h[o]);
            if (s.max)
                for (o = 1; o < c.length; o++)
                    if (l[o] > 0 && 0 == c[o] && c[o - 1] < s.digits[o - 1]) {
                        c[o - 1] += 1;
                        break
                    }
            for (o = 0; o < c.length; o++) {
                for (r = {}, a = 0; 20 > a && !(c[o] - d[o] < 1) && (n = round((c[o] + d[o]) / 2), !r["a" + n]); a++) r["a" + n] = 1, p(o, n) ? (d[o] = n, u = 1) : c[o] = n;
                if (c[o] = d[o], !u && p(o, d[o]) && (u = 1), !u) break
            }
            return u ? d.join(",") : null
        },
        addWinEvent: function(t, e) {
            var i, n = this,
                s = window;
            n.isFunc(e) && (s.addEventListener ? s.addEventListener(t, e, !1) : s.attachEvent ? s.attachEvent("on" + t, e) : (i = s["on" + t], s["on" + t] = n.winHandler(e, i)))
        },
        winHandler: function(t, e) {
            return function() {
                t(), "function" == typeof e && e()
            }
        },
        WLfuncs0: [],
        WLfuncs: [],
        runWLfuncs: function(t) {
            t.winLoaded = !0, t.callArray(t.WLfuncs0), t.callArray(t.WLfuncs), t.onDoneEmptyDiv && t.onDoneEmptyDiv()
        },
        winLoaded: !1,
        $$onWindowLoaded: function(t) {
            return function(e) {
                t.winLoaded ? t.call(e) : t.fPush(e, t.WLfuncs)
            }
        },
        div: null,
        divID: "plugindetect",
        divWidth: 50,
        pluginSize: 1,
        emptyDiv: function() {
            var t, e, i, n, s, o = this;
            if (o.div && o.div.childNodes)
                for (t = o.div.childNodes.length - 1; t >= 0; t--) {
                    if (i = o.div.childNodes[t], i && i.childNodes)
                        for (e = i.childNodes.length - 1; e >= 0; e--) {
                            s = i.childNodes[e];
                            try {
                                i.removeChild(s)
                            } catch (a) {}
                        }
                    if (i) try {
                        o.div.removeChild(i)
                    } catch (a) {}
                }
            if (o.div || (n = document.getElementById(o.divID), n && (o.div = n)), o.div && o.div.parentNode) {
                try {
                    o.div.parentNode.removeChild(o.div)
                } catch (a) {}
                o.div = null
            }
        },
        DONEfuncs: [],
        onDoneEmptyDiv: function() {
            var t, e, i = this;
            if (i.winLoaded && (!i.WLfuncs || !i.WLfuncs.length || null === i.WLfuncs[i.WLfuncs.length - 1])) {
                for (t in i)
                    if (e = i[t], e && e.funcs) {
                        if (3 == e.OTF) return;
                        if (e.funcs.length && null !== e.funcs[e.funcs.length - 1]) return
                    }
                for (t = 0; t < i.DONEfuncs.length; t++) i.callArray(i.DONEfuncs);
                i.emptyDiv()
            }
        },
        getWidth: function(t) {
            if (t) {
                var e = t.scrollWidth || t.offsetWidth,
                    i = this;
                if (i.isNum(e)) return e
            }
            return -1
        },
        getTagStatus: function(t, e, i, n) {
            var s = this,
                o = t.span,
                a = s.getWidth(o),
                r = i.span,
                l = s.getWidth(r),
                h = e.span,
                d = s.getWidth(h);
            if (!(o && r && h && s.getDOMobj(t))) return -2;
            if (d > l || 0 > a || 0 > l || 0 > d || d <= s.pluginSize || s.pluginSize < 1) return 0;
            if (a >= d) return -1;
            try {
                if (a == s.pluginSize && (!s.isIE || 4 == s.getDOMobj(t).readyState)) {
                    if (!t.winLoaded && s.winLoaded) return 1;
                    if (t.winLoaded && s.isNum(n) && (s.isNum(t.count) || (t.count = n), n - t.count >= 10)) return 1
                }
            } catch (c) {}
            return 0
        },
        getDOMobj: function(t, e) {
            var i = this,
                n = t ? t.span : 0,
                s = n && n.firstChild ? 1 : 0;
            try {
                s && e && i.div.focus()
            } catch (o) {}
            return s ? n.firstChild : null
        },
        setStyle: function(t, e) {
            var i, n = t.style;
            if (n && e)
                for (i = 0; i < e.length; i += 2) try {
                    n[e[i]] = e[i + 1]
                } catch (s) {}
        },
        insertDivInBody: function(t, e) {
            var i = this,
                n = "pd33993399",
                s = null,
                o = e ? window.top.document : window.document,
                a = o.getElementsByTagName("body")[0] || o.body;
            if (!a) try {
                o.write('<div id="' + n + '">.' + i.openTag + "/div>"), s = o.getElementById(n)
            } catch (r) {}
            a = o.getElementsByTagName("body")[0] || o.body, a && (a.insertBefore(t, a.firstChild), s && a.removeChild(s))
        },
        insertHTML: function(t, e, i, n) {
            var s, o, a, r = document,
                l = this,
                h = r.createElement("span"),
                d = ["outlineStyle", "none", "borderStyle", "none", "padding", "0px", "margin", "0px", "visibility", "visible"],
                c = "outline-style:none;border-style:none;padding:0px;margin:0px;visibility:visible;";
            if (l.isDefined(n) || (n = ""), l.isString(t) && /[^\s]/.test(t)) {
                for (t = t.toLowerCase().replace(/\s/g, ""), s = l.openTag + t + ' width="' + l.pluginSize + '" height="' + l.pluginSize + '" ', s += 'style="' + c + 'display:inline;" ', o = 0; o < e.length; o += 2) /[^\s]/.test(e[o + 1]) && (s += e[o] + '="' + e[o + 1] + '" ');
                for (s += ">", o = 0; o < i.length; o += 2) /[^\s]/.test(i[o + 1]) && (s += l.openTag + 'param name="' + i[o] + '" value="' + i[o + 1] + '" />');
                s += n + l.openTag + "/" + t + ">"
            } else s = n;
            if (l.div || (a = r.getElementById(l.divID), a ? l.div = a : (l.div = r.createElement("div"), l.div.id = l.divID), l.setStyle(l.div, d.concat(["width", l.divWidth + "px", "height", l.pluginSize + 3 + "px", "fontSize", l.pluginSize + 3 + "px", "lineHeight", l.pluginSize + 3 + "px", "verticalAlign", "baseline", "display", "block"])), a || (l.setStyle(l.div, ["position", "absolute", "right", "0px", "top", "0px"]), l.insertDivInBody(l.div))), l.div && l.div.parentNode) {
                l.setStyle(h, d.concat(["fontSize", l.pluginSize + 3 + "px", "lineHeight", l.pluginSize + 3 + "px", "verticalAlign", "baseline", "display", "inline"]));
                try {
                    h.innerHTML = s
                } catch (u) {}
                try {
                    l.div.appendChild(h)
                } catch (u) {}
                return {
                    span: h,
                    winLoaded: l.winLoaded,
                    tagName: t,
                    outerHTML: s
                }
            }
            return {
                span: null,
                winLoaded: l.winLoaded,
                tagName: "",
                outerHTML: s
            }
        },
        Plugins: {
            quicktime: {
                mimeType: ["video/quicktime", "application/x-quicktimeplayer", "image/x-macpaint", "image/x-quicktime"],
                progID: "QuickTimeCheckObject.QuickTimeCheck.1",
                progID0: "QuickTime.QuickTime",
                classID: "clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B",
                minIEver: 7,
                HTML: '<param name="src" value="" /><param name="controller" value="false" />',
                getCodeBaseVersion: function(t) {
                    return 'codebase="#version=' + t + '"'
                },
                SEARCH: {
                    min: 0,
                    max: 0,
                    match: 0,
                    digits: [16, 128, 128, 0]
                },
                getVersion: function(t) {
                    var e, i = this,
                        n = i.$,
                        s = null,
                        o = null;
                    if (n.isIE) {
                        if (n.isStrNum(t) && (e = t.split(n.splitNumRegx), e.length > 3 && parseInt(e[3], 10) > 0 && (e[3] = "9999"), t = e.join(",")), n.isStrNum(t) && n.verIE >= i.minIEver && i.canUseIsMin() > 0) return i.installed = i.isMin(t), void(i.getVersionDone = 0);
                        i.getVersionDone = 1, !s && n.verIE >= i.minIEver && (s = i.CDBASE2VER(n.codebaseSearch(i))), s || (o = n.getAXO(i.progID), o && o.QuickTimeVersion && (s = o.QuickTimeVersion.toString(16), s = parseInt(s.charAt(0), 16) + "." + parseInt(s.charAt(1), 16) + "." + parseInt(s.charAt(2), 16)))
                    } else n.hasMimeType(i.mimeType) && (o = 3 != n.OS ? n.findNavPlugin("QuickTime.*Plug-?in", 0) : null, o && o.name && (s = n.getNum(o.name)));
                    i.installed = s ? 1 : o ? 0 : -1, i.version = n.formatNum(s, 3)
                },
                cdbaseUpper: ["7,60,0,0", "0,0,0,0"],
                cdbaseLower: ["7,50,0,0", null],
                cdbase2ver: [function(t, e) {
                    var i = e.split(t.$.splitNumRegx);
                    return [i[0], i[1].charAt(0), i[1].charAt(1), i[2]].join(",")
                }, null],
                CDBASE2VER: function(t) {
                    var e, i = this,
                        n = i.$,
                        s = i.cdbaseUpper,
                        o = i.cdbaseLower;
                    if (t)
                        for (t = n.formatNum(t), e = 0; e < s.length; e++)
                            if (s[e] && n.compareNums(t, s[e]) < 0 && o[e] && n.compareNums(t, o[e]) >= 0 && i.cdbase2ver[e]) return i.cdbase2ver[e](i, t);
                    return t
                },
                canUseIsMin: function() {
                    var t, e = this,
                        i = e.$,
                        n = e.canUseIsMin,
                        s = e.cdbaseUpper,
                        o = e.cdbaseLower;
                    if (!n.value)
                        for (n.value = -1, t = 0; t < s.length; t++) {
                            if (s[t] && i.codebaseSearch(e, s[t])) {
                                n.value = 1;
                                break
                            }
                            if (o[t] && i.codebaseSearch(e, o[t])) {
                                n.value = -1;
                                break
                            }
                        }
                    return e.SEARCH.match = 1 == n.value ? 1 : 0, n.value
                },
                isMin: function(t) {
                    var e = this,
                        i = e.$;
                    return i.codebaseSearch(e, t) ? .7 : -1
                }
            },
            flash: {
                mimeType: "application/x-shockwave-flash",
                progID: "ShockwaveFlash.ShockwaveFlash",
                classID: "clsid:D27CDB6E-AE6D-11CF-96B8-444553540000",
                getVersion: function() {
                    var t, e, i, n, s = function(t) {
                            if (!t) return null;
                            var e = /[\d][\d\,\.\s]*[rRdD]{0,1}[\d\,]*/.exec(t);
                            return e ? e[0].replace(/[rRdD\.]/g, ",").replace(/\s/g, "") : null
                        },
                        o = this,
                        a = o.$,
                        r = null,
                        l = null,
                        h = null;
                    if (a.isIE) {
                        for (t = 15; t > 2; t--)
                            if (l = a.getAXO(o.progID + "." + t)) {
                                h = t.toString();
                                break
                            }
                        if (l || (l = a.getAXO(o.progID)), "6" == h) try {
                            l.AllowScriptAccess = "always"
                        } catch (d) {
                            return "6,0,21,0"
                        }
                        try {
                            r = s(l.GetVariable("$version"))
                        } catch (d) {}!r && h && (r = h)
                    } else {
                        if (i = a.hasMimeType(o.mimeType)) {
                            e = a.getDOMobj(a.insertHTML("object", ["type", o.mimeType], [], "", o));
                            try {
                                r = a.getNum(e.GetVariable("$version"))
                            } catch (d) {}
                        }
                        r || (n = i ? i.enabledPlugin : null, n && n.description && (r = s(n.description)), r && (r = a.getPluginFileVersion(n, r)))
                    }
                    return o.installed = r ? 1 : -1, o.version = a.formatNum(r), !0
                }
            },
            shockwave: {
                mimeType: "application/x-director",
                progID: "SWCtl.SWCtl",
                classID: "clsid:166B1BCA-3F9C-11CF-8075-444553540000",
                getVersion: function() {
                    var t, e = null,
                        i = null,
                        n = this,
                        s = n.$;
                    if (s.isIE) {
                        try {
                            i = s.getAXO(n.progID).ShockwaveVersion("")
                        } catch (o) {}
                        s.isString(i) && i.length > 0 ? e = s.getNum(i) : s.getAXO(n.progID + ".8") ? e = "8" : s.getAXO(n.progID + ".7") ? e = "7" : s.getAXO(n.progID + ".1") && (e = "6")
                    } else t = s.findNavPlugin("Shockwave\\s*for\\s*Director"), t && t.description && s.hasMimeType(n.mimeType) && (e = s.getNum(t.description)), e && (e = s.getPluginFileVersion(t, e));
                    n.installed = e ? 1 : -1, n.version = s.formatNum(e)
                }
            },
            zz: 0
        }
    };
    PluginDetect.initScript();
    var gArgCountErr = 'The "%%" function requires an even number of arguments.\nArguments should be in the form "atttributeName", "attributeValue", ...',
        gTagAttrs = null,
        gQTGeneratorVersion = 1;
    ! function() {
        function t(t) {
            return t = t || location.href, "#" + t.replace(/^[^#]*#?(.*)$/, "$1")
        }
        var e, i = document,
            n = $.event.special,
            s = i.documentMode,
            o = "oniLightBoxHashChange" in window && (void 0 === s || s > 7);
        $.fn.iLightBoxHashChange = function(t) {
            return t ? this.bind("iLightBoxHashChange", t) : this.trigger("iLightBoxHashChange")
        }, $.fn.iLightBoxHashChange.delay = 50, n.iLightBoxHashChange = $.extend(n.iLightBoxHashChange, {
            setup: function() {
                return o ? !1 : void $(e.start)
            },
            teardown: function() {
                return o ? !1 : void $(e.stop)
            }
        }), e = function() {
            function e() {
                var i = t(),
                    s = h(a);
                i !== a ? (l(a = i, s), $(window).trigger("iLightBoxHashChange")) : s !== a && (location.href = location.href.replace(/#.*/, "") + s), n = setTimeout(e, $.fn.iLightBoxHashChange.delay)
            }
            var n, s = {},
                a = t(),
                r = function(t) {
                    return t
                },
                l = r,
                h = r;
            return s.start = function() {
                n || e()
            }, s.stop = function() {
                n && clearTimeout(n), n = void 0
            }, browser.msie && !o && function() {
                var n, o;
                s.start = function() {
                    n || (o = (o = $.fn.iLightBoxHashChange.src) && o + t(), n = $('<iframe tabindex="-1" title="empty"/>').hide().one("load", function() {
                        o || l(t()), e()
                    }).attr("src", o || "javascript:0").insertAfter("body")[0].contentWindow, i.onpropertychange = function() {
                        try {
                            "title" === event.propertyName && (n.document.title = i.title)
                        } catch (t) {}
                    })
                }, s.stop = r, h = function() {
                    return t(n.location.href)
                }, l = function(t, e) {
                    var s = n.document,
                        o = $.fn.iLightBoxHashChange.domain;
                    t !== e && (s.title = i.title, s.open(), o && s.write('<script>document.domain="' + o + '"</script>'), s.close(), n.location.hash = t)
                }
            }(), s
        }()
    }(), Array.prototype.filter || (Array.prototype.filter = function(t) {
        "use strict";
        if (null == this) throw new TypeError;
        var e = Object(this),
            i = e.length >>> 0;
        if ("function" != typeof t) throw new TypeError;
        for (var n = [], s = arguments[1], o = 0; i > o; o++)
            if (o in e) {
                var a = e[o];
                t.call(s, a, o, e) && n.push(a)
            }
        return n
    }), Array.prototype.indexOf || (Array.prototype.indexOf = function(t, e) {
        var i;
        if (null == this) throw new TypeError('"this" is null or not defined');
        var n = Object(this),
            s = n.length >>> 0;
        if (0 === s) return -1;
        var o = +e || 0;
        if (1 / 0 === abs(o) && (o = 0), o >= s) return -1;
        for (i = max(o >= 0 ? o : s - abs(o), 0); s > i;) {
            if (i in n && n[i] === t) return i;
            i++
        }
        return -1
    }), Array.prototype.lastIndexOf || (Array.prototype.lastIndexOf = function(t) {
        "use strict";
        if (null == this) throw new TypeError;
        var e = Object(this),
            i = e.length >>> 0;
        if (0 === i) return -1;
        var n = i;
        arguments.length > 1 && (n = Number(arguments[1]), n != n ? n = 0 : 0 != n && n != 1 / 0 && n != -(1 / 0) && (n = (n > 0 || -1) * floor(abs(n))));
        for (var s = n >= 0 ? min(n, i - 1) : i - abs(n); s >= 0; s--)
            if (s in e && e[s] === t) return s;
        return -1
    })
}(jQuery, this),
function() {
    "use strict";

    function t() {}

    function e(t, e) {
        for (var i = t.length; i--;)
            if (t[i].listener === e) return i;
        return -1
    }
    var i = t.prototype;
    i.getListeners = function(t) {
        var e, i, n = this._getEvents();
        if ("object" == typeof t) {
            e = {};
            for (i in n) n.hasOwnProperty(i) && t.test(i) && (e[i] = n[i])
        } else e = n[t] || (n[t] = []);
        return e
    }, i.flattenListeners = function(t) {
        var e, i = [];
        for (e = 0; t.length > e; e += 1) i.push(t[e].listener);
        return i
    }, i.getListenersAsObject = function(t) {
        var e, i = this.getListeners(t);
        return i instanceof Array && (e = {}, e[t] = i), e || i
    }, i.addListener = function(t, i) {
        var n, s = this.getListenersAsObject(t),
            o = "object" == typeof i;
        for (n in s) s.hasOwnProperty(n) && -1 === e(s[n], i) && s[n].push(o ? i : {
            listener: i,
            once: !1
        });
        return this
    }, i.on = i.addListener, i.addOnceListener = function(t, e) {
        return this.addListener(t, {
            listener: e,
            once: !0
        })
    }, i.once = i.addOnceListener, i.defineEvent = function(t) {
        return this.getListeners(t), this
    }, i.defineEvents = function(t) {
        for (var e = 0; t.length > e; e += 1) this.defineEvent(t[e]);
        return this
    }, i.removeListener = function(t, i) {
        var n, s, o = this.getListenersAsObject(t);
        for (s in o) o.hasOwnProperty(s) && (n = e(o[s], i), -1 !== n && o[s].splice(n, 1));
        return this
    }, i.off = i.removeListener, i.addListeners = function(t, e) {
        return this.manipulateListeners(!1, t, e)
    }, i.removeListeners = function(t, e) {
        return this.manipulateListeners(!0, t, e)
    }, i.manipulateListeners = function(t, e, i) {
        var n, s, o = t ? this.removeListener : this.addListener,
            a = t ? this.removeListeners : this.addListeners;
        if ("object" != typeof e || e instanceof RegExp)
            for (n = i.length; n--;) o.call(this, e, i[n]);
        else
            for (n in e) e.hasOwnProperty(n) && (s = e[n]) && ("function" == typeof s ? o.call(this, n, s) : a.call(this, n, s));
        return this
    }, i.removeEvent = function(t) {
        var e, i = typeof t,
            n = this._getEvents();
        if ("string" === i) delete n[t];
        else if ("object" === i)
            for (e in n) n.hasOwnProperty(e) && t.test(e) && delete n[e];
        else delete this._events;
        return this
    }, i.emitEvent = function(t, e) {
        var i, n, s, o, a = this.getListenersAsObject(t);
        for (s in a)
            if (a.hasOwnProperty(s))
                for (n = a[s].length; n--;) i = a[s][n], o = i.listener.apply(this, e || []), (o === this._getOnceReturnValue() || i.once === !0) && this.removeListener(t, a[s][n].listener);
        return this
    }, i.trigger = i.emitEvent, i.emit = function(t) {
        var e = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(t, e)
    }, i.setOnceReturnValue = function(t) {
        return this._onceReturnValue = t, this
    }, i._getOnceReturnValue = function() {
        return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
    }, i._getEvents = function() {
        return this._events || (this._events = {})
    }, "function" == typeof define && define.amd ? define(function() {
        return t
    }) : "undefined" != typeof module && module.exports ? module.exports = t : this.EventEmitter = t
}.call(this),
    function(t) {
        "use strict";
        var e = document.documentElement,
            i = function() {};
        e.addEventListener ? i = function(t, e, i) {
            t.addEventListener(e, i, !1)
        } : e.attachEvent && (i = function(e, i, n) {
            e[i + n] = n.handleEvent ? function() {
                var e = t.event;
                e.target = e.target || e.srcElement, n.handleEvent.call(n, e)
            } : function() {
                var i = t.event;
                i.target = i.target || i.srcElement, n.call(e, i)
            }, e.attachEvent("on" + i, e[i + n])
        });
        var n = function() {};
        e.removeEventListener ? n = function(t, e, i) {
            t.removeEventListener(e, i, !1)
        } : e.detachEvent && (n = function(t, e, i) {
            t.detachEvent("on" + e, t[e + i]);
            try {
                delete t[e + i]
            } catch (n) {
                t[e + i] = void 0
            }
        });
        var s = {
            bind: i,
            unbind: n
        };
        "function" == typeof define && define.amd ? define(s) : t.eventie = s
    }(this),
    function(t) {
        "use strict";

        function e(t, e) {
            for (var i in e) t[i] = e[i];
            return t
        }

        function i(t) {
            return "[object Array]" === l.call(t)
        }

        function n(t) {
            var e = [];
            if (i(t)) e = t;
            else if ("number" == typeof t.length)
                for (var n = 0, s = t.length; s > n; n++) e.push(t[n]);
            else e.push(t);
            return e
        }

        function s(t, i) {
            function s(t, i, a) {
                if (!(this instanceof s)) return new s(t, i);
                "string" == typeof t && (t = document.querySelectorAll(t)), this.elements = n(t), this.options = e({}, this.options), "function" == typeof i ? a = i : e(this.options, i), a && this.on("always", a), this.getImages(), o && (this.jqDeferred = new o.Deferred);
                var r = this;
                setTimeout(function() {
                    r.check()
                })
            }

            function l(t) {
                this.img = t
            }
            s.prototype = new t, s.prototype.options = {}, s.prototype.getImages = function() {
                this.images = [];
                for (var t = 0, e = this.elements.length; e > t; t++) {
                    var i = this.elements[t];
                    "IMG" === i.nodeName && this.addImage(i);
                    for (var n = i.querySelectorAll("img"), s = 0, o = n.length; o > s; s++) {
                        var a = n[s];
                        this.addImage(a)
                    }
                }
            }, s.prototype.addImage = function(t) {
                var e = new l(t);
                this.images.push(e)
            }, s.prototype.check = function() {
                function t(t, s) {
                    return e.options.debug && r && a.log("confirm", t, s), e.progress(t), i++, i === n && e.complete(), !0
                }
                var e = this,
                    i = 0,
                    n = this.images.length;
                if (this.hasAnyBroken = !1, !n) return void this.complete();
                for (var s = 0; n > s; s++) {
                    var o = this.images[s];
                    o.on("confirm", t), o.check()
                }
            }, s.prototype.progress = function(t) {
                this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded;
                var e = this;
                setTimeout(function() {
                    e.emit("progress", e, t), e.jqDeferred && e.jqDeferred.notify(e, t)
                })
            }, s.prototype.complete = function() {
                var t = this.hasAnyBroken ? "fail" : "done";
                this.isComplete = !0;
                var e = this;
                setTimeout(function() {
                    if (e.emit(t, e), e.emit("always", e), e.jqDeferred) {
                        var i = e.hasAnyBroken ? "reject" : "resolve";
                        e.jqDeferred[i](e)
                    }
                })
            }, o && (o.fn.imagesLoaded = function(t, e) {
                var i = new s(this, t, e);
                return i.jqDeferred.promise(o(this))
            });
            var h = {};
            return l.prototype = new t, l.prototype.check = function() {
                var t = h[this.img.src];
                if (t) return void this.useCached(t);
                if (h[this.img.src] = this, this.img.complete && void 0 !== this.img.naturalWidth) return void this.confirm(0 !== this.img.naturalWidth, "naturalWidth");
                var e = this.proxyImage = new Image;
                i.bind(e, "load", this), i.bind(e, "error", this), e.src = this.img.src
            }, l.prototype.useCached = function(t) {
                if (t.isConfirmed) this.confirm(t.isLoaded, "cached was confirmed");
                else {
                    var e = this;
                    t.on("confirm", function(t) {
                        return e.confirm(t.isLoaded, "cache emitted confirmed"), !0
                    })
                }
            }, l.prototype.confirm = function(t, e) {
                this.isConfirmed = !0, this.isLoaded = t, this.emit("confirm", this, e)
            }, l.prototype.handleEvent = function(t) {
                var e = "on" + t.type;
                this[e] && this[e](t)
            }, l.prototype.onload = function() {
                this.confirm(!0, "onload"), this.unbindProxyEvents()
            }, l.prototype.onerror = function() {
                this.confirm(!1, "onerror"), this.unbindProxyEvents()
            }, l.prototype.unbindProxyEvents = function() {
                i.unbind(this.proxyImage, "load", this), i.unbind(this.proxyImage, "error", this)
            }, s
        }
        var o = t.jQuery,
            a = t.console,
            r = void 0 !== a,
            l = Object.prototype.toString;
        "function" == typeof define && define.amd ? define(["eventEmitter/EventEmitter", "eventie/eventie"], s) : t.imagesLoaded = s(t.EventEmitter, t.eventie)
    }(window),
    function(t) {
        function e() {}

        function i(t) {
            function i(e) {
                e.prototype.option || (e.prototype.option = function(e) {
                    t.isPlainObject(e) && (this.options = t.extend(!0, this.options, e))
                })
            }

            function s(e, i) {
                t.fn[e] = function(s) {
                    if ("string" == typeof s) {
                        for (var a = n.call(arguments, 1), r = 0, l = this.length; l > r; r++) {
                            var h = this[r],
                                d = t.data(h, e);
                            if (d)
                                if (t.isFunction(d[s]) && "_" !== s.charAt(0)) {
                                    var c = d[s].apply(d, a);
                                    if (void 0 !== c) return c
                                } else o("no such method '" + s + "' for " + e + " instance");
                            else o("cannot call methods on " + e + " prior to initialization; attempted to call '" + s + "'")
                        }
                        return this
                    }
                    return this.each(function() {
                        var n = t.data(this, e);
                        n ? (n.option(s), n._init()) : (n = new i(this, s), t.data(this, e, n))
                    })
                }
            }
            if (t) {
                var o = "undefined" == typeof console ? e : function(t) {
                    console.error(t)
                };
                return t.bridget = function(t, e) {
                    i(e), s(t, e)
                }, t.bridget
            }
        }
        var n = Array.prototype.slice;
        "function" == typeof define && define.amd ? define("jquery-bridget/jquery.bridget", ["jquery"], i) : i("object" == typeof exports ? require("jquery") : t.jQuery)
    }(window),
    function(t) {
        function e(e) {
            var i = t.event;
            return i.target = i.target || i.srcElement || e, i
        }
        var i = document.documentElement,
            n = function() {};
        i.addEventListener ? n = function(t, e, i) {
            t.addEventListener(e, i, !1)
        } : i.attachEvent && (n = function(t, i, n) {
            t[i + n] = n.handleEvent ? function() {
                var i = e(t);
                n.handleEvent.call(n, i)
            } : function() {
                var i = e(t);
                n.call(t, i)
            }, t.attachEvent("on" + i, t[i + n])
        });
        var s = function() {};
        i.removeEventListener ? s = function(t, e, i) {
            t.removeEventListener(e, i, !1)
        } : i.detachEvent && (s = function(t, e, i) {
            t.detachEvent("on" + e, t[e + i]);
            try {
                delete t[e + i]
            } catch (n) {
                t[e + i] = void 0
            }
        });
        var o = {
            bind: n,
            unbind: s
        };
        "function" == typeof define && define.amd ? define("eventie/eventie", o) : "object" == typeof exports ? module.exports = o : t.eventie = o
    }(window),
    function() {
        "use strict";

        function t() {}

        function e(t, e) {
            for (var i = t.length; i--;)
                if (t[i].listener === e) return i;
            return -1
        }

        function i(t) {
            return function() {
                return this[t].apply(this, arguments)
            }
        }
        var n = t.prototype,
            s = this,
            o = s.EventEmitter;
        n.getListeners = function(t) {
            var e, i, n = this._getEvents();
            if (t instanceof RegExp) {
                e = {};
                for (i in n) n.hasOwnProperty(i) && t.test(i) && (e[i] = n[i])
            } else e = n[t] || (n[t] = []);
            return e
        }, n.flattenListeners = function(t) {
            var e, i = [];
            for (e = 0; e < t.length; e += 1) i.push(t[e].listener);
            return i
        }, n.getListenersAsObject = function(t) {
            var e, i = this.getListeners(t);
            return i instanceof Array && (e = {}, e[t] = i), e || i
        }, n.addListener = function(t, i) {
            var n, s = this.getListenersAsObject(t),
                o = "object" == typeof i;
            for (n in s) s.hasOwnProperty(n) && -1 === e(s[n], i) && s[n].push(o ? i : {
                listener: i,
                once: !1
            });
            return this
        }, n.on = i("addListener"), n.addOnceListener = function(t, e) {
            return this.addListener(t, {
                listener: e,
                once: !0
            })
        }, n.once = i("addOnceListener"), n.defineEvent = function(t) {
            return this.getListeners(t), this
        }, n.defineEvents = function(t) {
            for (var e = 0; e < t.length; e += 1) this.defineEvent(t[e]);
            return this
        }, n.removeListener = function(t, i) {
            var n, s, o = this.getListenersAsObject(t);
            for (s in o) o.hasOwnProperty(s) && (n = e(o[s], i), -1 !== n && o[s].splice(n, 1));
            return this
        }, n.off = i("removeListener"), n.addListeners = function(t, e) {
            return this.manipulateListeners(!1, t, e)
        }, n.removeListeners = function(t, e) {
            return this.manipulateListeners(!0, t, e)
        }, n.manipulateListeners = function(t, e, i) {
            var n, s, o = t ? this.removeListener : this.addListener,
                a = t ? this.removeListeners : this.addListeners;
            if ("object" != typeof e || e instanceof RegExp)
                for (n = i.length; n--;) o.call(this, e, i[n]);
            else
                for (n in e) e.hasOwnProperty(n) && (s = e[n]) && ("function" == typeof s ? o.call(this, n, s) : a.call(this, n, s));
            return this
        }, n.removeEvent = function(t) {
            var e, i = typeof t,
                n = this._getEvents();
            if ("string" === i) delete n[t];
            else if (t instanceof RegExp)
                for (e in n) n.hasOwnProperty(e) && t.test(e) && delete n[e];
            else delete this._events;
            return this
        }, n.removeAllListeners = i("removeEvent"), n.emitEvent = function(t, e) {
            var i, n, s, o, a = this.getListenersAsObject(t);
            for (s in a)
                if (a.hasOwnProperty(s))
                    for (n = a[s].length; n--;) i = a[s][n], i.once === !0 && this.removeListener(t, i.listener), o = i.listener.apply(this, e || []), o === this._getOnceReturnValue() && this.removeListener(t, i.listener);
            return this
        }, n.trigger = i("emitEvent"), n.emit = function(t) {
            var e = Array.prototype.slice.call(arguments, 1);
            return this.emitEvent(t, e)
        }, n.setOnceReturnValue = function(t) {
            return this._onceReturnValue = t, this
        }, n._getOnceReturnValue = function() {
            return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
        }, n._getEvents = function() {
            return this._events || (this._events = {})
        }, t.noConflict = function() {
            return s.EventEmitter = o, t
        }, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function() {
            return t
        }) : "object" == typeof module && module.exports ? module.exports = t : s.EventEmitter = t
    }.call(this),
    function(t) {
        function e(t) {
            if (t) {
                if ("string" == typeof n[t]) return t;
                t = t.charAt(0).toUpperCase() + t.slice(1);
                for (var e, s = 0, o = i.length; o > s; s++)
                    if (e = i[s] + t, "string" == typeof n[e]) return e
            }
        }
        var i = "Webkit Moz ms Ms O".split(" "),
            n = document.documentElement.style;
        "function" == typeof define && define.amd ? define("get-style-property/get-style-property", [], function() {
            return e
        }) : "object" == typeof exports ? module.exports = e : t.getStyleProperty = e
    }(window),
    function(t) {
        function e(t) {
            var e = parseFloat(t),
                i = -1 === t.indexOf("%") && !isNaN(e);
            return i && e
        }

        function i() {}

        function n() {
            for (var t = {
                    width: 0,
                    height: 0,
                    innerWidth: 0,
                    innerHeight: 0,
                    outerWidth: 0,
                    outerHeight: 0
                }, e = 0, i = a.length; i > e; e++) {
                var n = a[e];
                t[n] = 0
            }
            return t
        }

        function s(i) {
            function s() {
                if (!u) {
                    u = !0;
                    var n = t.getComputedStyle;
                    if (h = function() {
                            var t = n ? function(t) {
                                return n(t, null)
                            } : function(t) {
                                return t.currentStyle
                            };
                            return function(e) {
                                var i = t(e);
                                return i || o("Style returned " + i + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"), i
                            }
                        }(), d = i("boxSizing")) {
                        var s = document.createElement("div");
                        s.style.width = "200px", s.style.padding = "1px 2px 3px 4px", s.style.borderStyle = "solid", s.style.borderWidth = "1px 2px 3px 4px", s.style[d] = "border-box";
                        var a = document.body || document.documentElement;
                        a.appendChild(s);
                        var r = h(s);
                        c = 200 === e(r.width), a.removeChild(s)
                    }
                }
            }

            function r(t) {
                if (s(), "string" == typeof t && (t = document.querySelector(t)), t && "object" == typeof t && t.nodeType) {
                    var i = h(t);
                    if ("none" === i.display) return n();
                    var o = {};
                    o.width = t.offsetWidth, o.height = t.offsetHeight;
                    for (var r = o.isBorderBox = !(!d || !i[d] || "border-box" !== i[d]), u = 0, p = a.length; p > u; u++) {
                        var f = a[u],
                            g = i[f];
                        g = l(t, g);
                        var m = parseFloat(g);
                        o[f] = isNaN(m) ? 0 : m
                    }
                    var v = o.paddingLeft + o.paddingRight,
                        y = o.paddingTop + o.paddingBottom,
                        b = o.marginLeft + o.marginRight,
                        w = o.marginTop + o.marginBottom,
                        x = o.borderLeftWidth + o.borderRightWidth,
                        S = o.borderTopWidth + o.borderBottomWidth,
                        $ = r && c,
                        T = e(i.width);
                    T !== !1 && (o.width = T + ($ ? 0 : v + x));
                    var C = e(i.height);
                    return C !== !1 && (o.height = C + ($ ? 0 : y + S)), o.innerWidth = o.width - (v + x), o.innerHeight = o.height - (y + S), o.outerWidth = o.width + b, o.outerHeight = o.height + w, o
                }
            }

            function l(e, i) {
                if (t.getComputedStyle || -1 === i.indexOf("%")) return i;
                var n = e.style,
                    s = n.left,
                    o = e.runtimeStyle,
                    a = o && o.left;
                return a && (o.left = e.currentStyle.left), n.left = i, i = n.pixelLeft, n.left = s, a && (o.left = a), i
            }
            var h, d, c, u = !1;
            return r
        }
        var o = "undefined" == typeof console ? i : function(t) {
                console.error(t)
            },
            a = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"];
        "function" == typeof define && define.amd ? define("get-size/get-size", ["get-style-property/get-style-property"], s) : "object" == typeof exports ? module.exports = s(require("desandro-get-style-property")) : t.getSize = s(t.getStyleProperty)
    }(window),
    function(t) {
        function e(t) {
            "function" == typeof t && (e.isReady ? t() : a.push(t))
        }

        function i(t) {
            var i = "readystatechange" === t.type && "complete" !== o.readyState;
            e.isReady || i || n()
        }

        function n() {
            e.isReady = !0;
            for (var t = 0, i = a.length; i > t; t++) {
                var n = a[t];
                n()
            }
        }

        function s(s) {
            return "complete" === o.readyState ? n() : (s.bind(o, "DOMContentLoaded", i), s.bind(o, "readystatechange", i), s.bind(t, "load", i)), e
        }
        var o = t.document,
            a = [];
        e.isReady = !1, "function" == typeof define && define.amd ? define("doc-ready/doc-ready", ["eventie/eventie"], s) : "object" == typeof exports ? module.exports = s(require("eventie")) : t.docReady = s(t.eventie)
    }(window),
    function(t) {
        "use strict";

        function e(t, e) {
            return t[a](e)
        }

        function i(t) {
            if (!t.parentNode) {
                var e = document.createDocumentFragment();
                e.appendChild(t)
            }
        }

        function n(t, e) {
            i(t);
            for (var n = t.parentNode.querySelectorAll(e), s = 0, o = n.length; o > s; s++)
                if (n[s] === t) return !0;
            return !1
        }

        function s(t, n) {
            return i(t), e(t, n)
        }
        var o, a = function() {
            if (t.matches) return "matches";
            if (t.matchesSelector) return "matchesSelector";
            for (var e = ["webkit", "moz", "ms", "o"], i = 0, n = e.length; n > i; i++) {
                var s = e[i],
                    o = s + "MatchesSelector";
                if (t[o]) return o
            }
        }();
        if (a) {
            var r = document.createElement("div"),
                l = e(r, "div");
            o = l ? e : s
        } else o = n;
        "function" == typeof define && define.amd ? define("matches-selector/matches-selector", [], function() {
            return o
        }) : "object" == typeof exports ? module.exports = o : window.matchesSelector = o
    }(Element.prototype),
    function(t, e) {
        "use strict";
        "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["doc-ready/doc-ready", "matches-selector/matches-selector"], function(i, n) {
            return e(t, i, n)
        }) : "object" == typeof exports ? module.exports = e(t, require("doc-ready"), require("desandro-matches-selector")) : t.fizzyUIUtils = e(t, t.docReady, t.matchesSelector)
    }(window, function(t, e, i) {
        var n = {};
        n.extend = function(t, e) {
            for (var i in e) t[i] = e[i];
            return t
        }, n.modulo = function(t, e) {
            return (t % e + e) % e
        };
        var s = Object.prototype.toString;
        n.isArray = function(t) {
            return "[object Array]" == s.call(t)
        }, n.makeArray = function(t) {
            var e = [];
            if (n.isArray(t)) e = t;
            else if (t && "number" == typeof t.length)
                for (var i = 0, s = t.length; s > i; i++) e.push(t[i]);
            else e.push(t);
            return e
        }, n.indexOf = Array.prototype.indexOf ? function(t, e) {
            return t.indexOf(e)
        } : function(t, e) {
            for (var i = 0, n = t.length; n > i; i++)
                if (t[i] === e) return i;
            return -1
        }, n.removeFrom = function(t, e) {
            var i = n.indexOf(t, e); - 1 != i && t.splice(i, 1)
        }, n.isElement = "function" == typeof HTMLElement || "object" == typeof HTMLElement ? function(t) {
            return t instanceof HTMLElement
        } : function(t) {
            return t && "object" == typeof t && 1 == t.nodeType && "string" == typeof t.nodeName
        }, n.setText = function() {
            function t(t, i) {
                e = e || (void 0 !== document.documentElement.textContent ? "textContent" : "innerText"), t[e] = i
            }
            var e;
            return t
        }(), n.getParent = function(t, e) {
            for (; t != document.body;)
                if (t = t.parentNode, i(t, e)) return t
        }, n.getQueryElement = function(t) {
            return "string" == typeof t ? document.querySelector(t) : t
        }, n.handleEvent = function(t) {
            var e = "on" + t.type;
            this[e] && this[e](t)
        }, n.filterFindElements = function(t, e) {
            t = n.makeArray(t);
            for (var s = [], o = 0, a = t.length; a > o; o++) {
                var r = t[o];
                if (n.isElement(r))
                    if (e) {
                        i(r, e) && s.push(r);
                        for (var l = r.querySelectorAll(e), h = 0, d = l.length; d > h; h++) s.push(l[h])
                    } else s.push(r)
            }
            return s
        }, n.debounceMethod = function(t, e, i) {
            var n = t.prototype[e],
                s = e + "Timeout";
            t.prototype[e] = function() {
                var t = this[s];
                t && clearTimeout(t);
                var e = arguments,
                    o = this;
                this[s] = setTimeout(function() {
                    n.apply(o, e), delete o[s]
                }, i || 100)
            }
        }, n.toDashed = function(t) {
            return t.replace(/(.)([A-Z])/g, function(t, e, i) {
                return e + "-" + i
            }).toLowerCase()
        };
        var o = t.console;
        return n.htmlInit = function(i, s) {
            e(function() {
                for (var e = n.toDashed(s), a = document.querySelectorAll(".js-" + e), r = "data-" + e + "-options", l = 0, h = a.length; h > l; l++) {
                    var d, c = a[l],
                        u = c.getAttribute(r);
                    try {
                        d = u && JSON.parse(u)
                    } catch (p) {
                        o && o.error("Error parsing " + r + " on " + c.nodeName.toLowerCase() + (c.id ? "#" + c.id : "") + ": " + p);
                        continue
                    }
                    var f = new i(c, d),
                        g = t.jQuery;
                    g && g.data(c, s, f)
                }
            })
        }, n
    }),
    function(t, e) {
        "use strict";
        "function" == typeof define && define.amd ? define("outlayer/item", ["eventEmitter/EventEmitter", "get-size/get-size", "get-style-property/get-style-property", "fizzy-ui-utils/utils"], function(i, n, s, o) {
            return e(t, i, n, s, o)
        }) : "object" == typeof exports ? module.exports = e(t, require("wolfy87-eventemitter"), require("get-size"), require("desandro-get-style-property"), require("fizzy-ui-utils")) : (t.Outlayer = {}, t.Outlayer.Item = e(t, t.EventEmitter, t.getSize, t.getStyleProperty, t.fizzyUIUtils))
    }(window, function(t, e, i, n, s) {
        "use strict";

        function o(t) {
            for (var e in t) return !1;
            return e = null, !0
        }

        function a(t, e) {
            t && (this.element = t, this.layout = e, this.position = {
                x: 0,
                y: 0
            }, this._create())
        }

        function r(t) {
            return t.replace(/([A-Z])/g, function(t) {
                return "-" + t.toLowerCase()
            })
        }
        var l = t.getComputedStyle,
            h = l ? function(t) {
                return l(t, null)
            } : function(t) {
                return t.currentStyle
            },
            d = n("transition"),
            c = n("transform"),
            u = d && c,
            p = !!n("perspective"),
            f = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "otransitionend",
                transition: "transitionend"
            }[d],
            g = ["transform", "transition", "transitionDuration", "transitionProperty"],
            m = function() {
                for (var t = {}, e = 0, i = g.length; i > e; e++) {
                    var s = g[e],
                        o = n(s);
                    o && o !== s && (t[s] = o)
                }
                return t
            }();
        s.extend(a.prototype, e.prototype), a.prototype._create = function() {
            this._transn = {
                ingProperties: {},
                clean: {},
                onEnd: {}
            }, this.css({
                position: "absolute"
            })
        }, a.prototype.handleEvent = function(t) {
            var e = "on" + t.type;
            this[e] && this[e](t)
        }, a.prototype.getSize = function() {
            this.size = i(this.element)
        }, a.prototype.css = function(t) {
            var e = this.element.style;
            for (var i in t) {
                var n = m[i] || i;
                e[n] = t[i]
            }
        }, a.prototype.getPosition = function() {
            var t = h(this.element),
                e = this.layout.options,
                i = e.isOriginLeft,
                n = e.isOriginTop,
                s = t[i ? "left" : "right"],
                o = t[n ? "top" : "bottom"],
                a = this.layout.size,
                r = -1 != s.indexOf("%") ? parseFloat(s) / 100 * a.width : parseInt(s, 10),
                l = -1 != o.indexOf("%") ? parseFloat(o) / 100 * a.height : parseInt(o, 10);
            r = isNaN(r) ? 0 : r, l = isNaN(l) ? 0 : l, r -= i ? a.paddingLeft : a.paddingRight, l -= n ? a.paddingTop : a.paddingBottom, this.position.x = r, this.position.y = l
        }, a.prototype.layoutPosition = function() {
            var t = this.layout.size,
                e = this.layout.options,
                i = {},
                n = e.isOriginLeft ? "paddingLeft" : "paddingRight",
                s = e.isOriginLeft ? "left" : "right",
                o = e.isOriginLeft ? "right" : "left",
                a = this.position.x + t[n];
            i[s] = this.getXValue(a), i[o] = "";
            var r = e.isOriginTop ? "paddingTop" : "paddingBottom",
                l = e.isOriginTop ? "top" : "bottom",
                h = e.isOriginTop ? "bottom" : "top",
                d = this.position.y + t[r];
            i[l] = this.getYValue(d), i[h] = "", this.css(i), this.emitEvent("layout", [this])
        }, a.prototype.getXValue = function(t) {
            var e = this.layout.options;
            return e.percentPosition && !e.isHorizontal ? t / this.layout.size.width * 100 + "%" : t + "px"
        }, a.prototype.getYValue = function(t) {
            var e = this.layout.options;
            return e.percentPosition && e.isHorizontal ? t / this.layout.size.height * 100 + "%" : t + "px"
        }, a.prototype._transitionTo = function(t, e) {
            this.getPosition();
            var i = this.position.x,
                n = this.position.y,
                s = parseInt(t, 10),
                o = parseInt(e, 10),
                a = s === this.position.x && o === this.position.y;
            if (this.setPosition(t, e), a && !this.isTransitioning) return void this.layoutPosition();
            var r = t - i,
                l = e - n,
                h = {};
            h.transform = this.getTranslate(r, l), this.transition({
                to: h,
                onTransitionEnd: {
                    transform: this.layoutPosition
                },
                isCleaning: !0
            })
        }, a.prototype.getTranslate = function(t, e) {
            var i = this.layout.options;
            return t = i.isOriginLeft ? t : -t, e = i.isOriginTop ? e : -e, p ? "translate3d(" + t + "px, " + e + "px, 0)" : "translate(" + t + "px, " + e + "px)"
        }, a.prototype.goTo = function(t, e) {
            this.setPosition(t, e), this.layoutPosition()
        }, a.prototype.moveTo = u ? a.prototype._transitionTo : a.prototype.goTo, a.prototype.setPosition = function(t, e) {
            this.position.x = parseInt(t, 10), this.position.y = parseInt(e, 10)
        }, a.prototype._nonTransition = function(t) {
            this.css(t.to), t.isCleaning && this._removeStyles(t.to);
            for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this)
        }, a.prototype._transition = function(t) {
            if (!parseFloat(this.layout.options.transitionDuration)) return void this._nonTransition(t);
            var e = this._transn;
            for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
            for (i in t.to) e.ingProperties[i] = !0, t.isCleaning && (e.clean[i] = !0);
            if (t.from) {
                this.css(t.from);
                var n = this.element.offsetHeight;
                n = null
            }
            this.enableTransition(t.to), this.css(t.to), this.isTransitioning = !0
        };
        var v = "opacity," + r(m.transform || "transform");
        a.prototype.enableTransition = function() {
            this.isTransitioning || (this.css({
                transitionProperty: v,
                transitionDuration: this.layout.options.transitionDuration
            }), this.element.addEventListener(f, this, !1))
        }, a.prototype.transition = a.prototype[d ? "_transition" : "_nonTransition"], a.prototype.onwebkitTransitionEnd = function(t) {
            this.ontransitionend(t)
        }, a.prototype.onotransitionend = function(t) {
            this.ontransitionend(t)
        };
        var y = {
            "-webkit-transform": "transform",
            "-moz-transform": "transform",
            "-o-transform": "transform"
        };
        a.prototype.ontransitionend = function(t) {
            if (t.target === this.element) {
                var e = this._transn,
                    i = y[t.propertyName] || t.propertyName;
                if (delete e.ingProperties[i], o(e.ingProperties) && this.disableTransition(), i in e.clean && (this.element.style[t.propertyName] = "", delete e.clean[i]), i in e.onEnd) {
                    var n = e.onEnd[i];
                    n.call(this), delete e.onEnd[i]
                }
                this.emitEvent("transitionEnd", [this])
            }
        }, a.prototype.disableTransition = function() {
            this.removeTransitionStyles(), this.element.removeEventListener(f, this, !1), this.isTransitioning = !1
        }, a.prototype._removeStyles = function(t) {
            var e = {};
            for (var i in t) e[i] = "";
            this.css(e)
        };
        var b = {
            transitionProperty: "",
            transitionDuration: ""
        };
        return a.prototype.removeTransitionStyles = function() {
            this.css(b)
        }, a.prototype.removeElem = function() {
            this.element.parentNode.removeChild(this.element), this.css({
                display: ""
            }), this.emitEvent("remove", [this])
        }, a.prototype.remove = function() {
            if (!d || !parseFloat(this.layout.options.transitionDuration)) return void this.removeElem();
            var t = this;
            this.once("transitionEnd", function() {
                t.removeElem()
            }), this.hide()
        }, a.prototype.reveal = function() {
            delete this.isHidden, this.css({
                display: ""
            });
            var t = this.layout.options,
                e = {},
                i = this.getHideRevealTransitionEndProperty("visibleStyle");
            e[i] = this.onRevealTransitionEnd, this.transition({
                from: t.hiddenStyle,
                to: t.visibleStyle,
                isCleaning: !0,
                onTransitionEnd: e
            })
        }, a.prototype.onRevealTransitionEnd = function() {
            this.isHidden || this.emitEvent("reveal")
        }, a.prototype.getHideRevealTransitionEndProperty = function(t) {
            var e = this.layout.options[t];
            if (e.opacity) return "opacity";
            for (var i in e) return i
        }, a.prototype.hide = function() {
            this.isHidden = !0, this.css({
                display: ""
            });
            var t = this.layout.options,
                e = {},
                i = this.getHideRevealTransitionEndProperty("hiddenStyle");
            e[i] = this.onHideTransitionEnd, this.transition({
                from: t.visibleStyle,
                to: t.hiddenStyle,
                isCleaning: !0,
                onTransitionEnd: e
            })
        }, a.prototype.onHideTransitionEnd = function() {
            this.isHidden && (this.css({
                display: "none"
            }), this.emitEvent("hide"))
        }, a.prototype.destroy = function() {
            this.css({
                position: "",
                left: "",
                right: "",
                top: "",
                bottom: "",
                transition: "",
                transform: ""
            })
        }, a
    }),
    function(t, e) {
        "use strict";
        "function" == typeof define && define.amd ? define("outlayer/outlayer", ["eventie/eventie", "eventEmitter/EventEmitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function(i, n, s, o, a) {
            return e(t, i, n, s, o, a)
        }) : "object" == typeof exports ? module.exports = e(t, require("eventie"), require("wolfy87-eventemitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : t.Outlayer = e(t, t.eventie, t.EventEmitter, t.getSize, t.fizzyUIUtils, t.Outlayer.Item)
    }(window, function(t, e, i, n, s, o) {
        "use strict";

        function a(t, e) {
            var i = s.getQueryElement(t);
            if (!i) return void(r && r.error("Bad element for " + this.constructor.namespace + ": " + (i || t)));
            this.element = i, l && (this.$element = l(this.element)), this.options = s.extend({}, this.constructor.defaults), this.option(e);
            var n = ++d;
            this.element.outlayerGUID = n, c[n] = this, this._create(), this.options.isInitLayout && this.layout()
        }
        var r = t.console,
            l = t.jQuery,
            h = function() {},
            d = 0,
            c = {};
        return a.namespace = "outlayer", a.Item = o, a.defaults = {
            containerStyle: {
                position: "relative"
            },
            isInitLayout: !0,
            isOriginLeft: !0,
            isOriginTop: !0,
            isResizeBound: !0,
            isResizingContainer: !0,
            transitionDuration: "0.4s",
            hiddenStyle: {
                opacity: 0,
                transform: "scale(0.001)"
            },
            visibleStyle: {
                opacity: 1,
                transform: "scale(1)"
            }
        }, s.extend(a.prototype, i.prototype), a.prototype.option = function(t) {
            s.extend(this.options, t)
        }, a.prototype._create = function() {
            this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), s.extend(this.element.style, this.options.containerStyle), this.options.isResizeBound && this.bindResize()
        }, a.prototype.reloadItems = function() {
            this.items = this._itemize(this.element.children)
        }, a.prototype._itemize = function(t) {
            for (var e = this._filterFindItemElements(t), i = this.constructor.Item, n = [], s = 0, o = e.length; o > s; s++) {
                var a = e[s],
                    r = new i(a, this);
                n.push(r)
            }
            return n
        }, a.prototype._filterFindItemElements = function(t) {
            return s.filterFindElements(t, this.options.itemSelector)
        }, a.prototype.getItemElements = function() {
            for (var t = [], e = 0, i = this.items.length; i > e; e++) t.push(this.items[e].element);
            return t
        }, a.prototype.layout = function() {
            this._resetLayout(), this._manageStamps();
            var t = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited;
            this.layoutItems(this.items, t), this._isLayoutInited = !0
        }, a.prototype._init = a.prototype.layout, a.prototype._resetLayout = function() {
            this.getSize()
        }, a.prototype.getSize = function() {
            this.size = n(this.element)
        }, a.prototype._getMeasurement = function(t, e) {
            var i, o = this.options[t];
            o ? ("string" == typeof o ? i = this.element.querySelector(o) : s.isElement(o) && (i = o), this[t] = i ? n(i)[e] : o) : this[t] = 0
        }, a.prototype.layoutItems = function(t, e) {
            t = this._getItemsForLayout(t), this._layoutItems(t, e), this._postLayout()
        }, a.prototype._getItemsForLayout = function(t) {
            for (var e = [], i = 0, n = t.length; n > i; i++) {
                var s = t[i];
                s.isIgnored || e.push(s)
            }
            return e
        }, a.prototype._layoutItems = function(t, e) {
            if (this._emitCompleteOnItems("layout", t), t && t.length) {
                for (var i = [], n = 0, s = t.length; s > n; n++) {
                    var o = t[n],
                        a = this._getItemLayoutPosition(o);
                    a.item = o, a.isInstant = e || o.isLayoutInstant, i.push(a)
                }
                this._processLayoutQueue(i)
            }
        }, a.prototype._getItemLayoutPosition = function() {
            return {
                x: 0,
                y: 0
            }
        }, a.prototype._processLayoutQueue = function(t) {
            for (var e = 0, i = t.length; i > e; e++) {
                var n = t[e];
                this._positionItem(n.item, n.x, n.y, n.isInstant)
            }
        }, a.prototype._positionItem = function(t, e, i, n) {
            n ? t.goTo(e, i) : t.moveTo(e, i)
        }, a.prototype._postLayout = function() {
            this.resizeContainer()
        }, a.prototype.resizeContainer = function() {
            if (this.options.isResizingContainer) {
                var t = this._getContainerSize();
                t && (this._setContainerMeasure(t.width, !0), this._setContainerMeasure(t.height, !1))
            }
        }, a.prototype._getContainerSize = h, a.prototype._setContainerMeasure = function(t, e) {
            if (void 0 !== t) {
                var i = this.size;
                i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), t = Math.max(t, 0), this.element.style[e ? "width" : "height"] = t + "px"
            }
        }, a.prototype._emitCompleteOnItems = function(t, e) {
            function i() {
                s.dispatchEvent(t + "Complete", null, [e])
            }

            function n() {
                a++, a === o && i()
            }
            var s = this,
                o = e.length;
            if (!e || !o) return void i();
            for (var a = 0, r = 0, l = e.length; l > r; r++) {
                var h = e[r];
                h.once(t, n)
            }
        }, a.prototype.dispatchEvent = function(t, e, i) {
            var n = e ? [e].concat(i) : i;
            if (this.emitEvent(t, n), l)
                if (this.$element = this.$element || l(this.element), e) {
                    var s = l.Event(e);
                    s.type = t, this.$element.trigger(s, i)
                } else this.$element.trigger(t, i)
        }, a.prototype.ignore = function(t) {
            var e = this.getItem(t);
            e && (e.isIgnored = !0)
        }, a.prototype.unignore = function(t) {
            var e = this.getItem(t);
            e && delete e.isIgnored
        }, a.prototype.stamp = function(t) {
            if (t = this._find(t)) {
                this.stamps = this.stamps.concat(t);
                for (var e = 0, i = t.length; i > e; e++) {
                    var n = t[e];
                    this.ignore(n)
                }
            }
        }, a.prototype.unstamp = function(t) {
            if (t = this._find(t))
                for (var e = 0, i = t.length; i > e; e++) {
                    var n = t[e];
                    s.removeFrom(this.stamps, n), this.unignore(n)
                }
        }, a.prototype._find = function(t) {
            return t ? ("string" == typeof t && (t = this.element.querySelectorAll(t)), t = s.makeArray(t)) : void 0
        }, a.prototype._manageStamps = function() {
            if (this.stamps && this.stamps.length) {
                this._getBoundingRect();
                for (var t = 0, e = this.stamps.length; e > t; t++) {
                    var i = this.stamps[t];
                    this._manageStamp(i)
                }
            }
        }, a.prototype._getBoundingRect = function() {
            var t = this.element.getBoundingClientRect(),
                e = this.size;
            this._boundingRect = {
                left: t.left + e.paddingLeft + e.borderLeftWidth,
                top: t.top + e.paddingTop + e.borderTopWidth,
                right: t.right - (e.paddingRight + e.borderRightWidth),
                bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth)
            }
        }, a.prototype._manageStamp = h, a.prototype._getElementOffset = function(t) {
            var e = t.getBoundingClientRect(),
                i = this._boundingRect,
                s = n(t),
                o = {
                    left: e.left - i.left - s.marginLeft,
                    top: e.top - i.top - s.marginTop,
                    right: i.right - e.right - s.marginRight,
                    bottom: i.bottom - e.bottom - s.marginBottom
                };
            return o
        }, a.prototype.handleEvent = function(t) {
            var e = "on" + t.type;
            this[e] && this[e](t)
        }, a.prototype.bindResize = function() {
            this.isResizeBound || (e.bind(t, "resize", this), this.isResizeBound = !0)
        }, a.prototype.unbindResize = function() {
            this.isResizeBound && e.unbind(t, "resize", this), this.isResizeBound = !1
        }, a.prototype.onresize = function() {
            function t() {
                e.resize(), delete e.resizeTimeout
            }
            this.resizeTimeout && clearTimeout(this.resizeTimeout);
            var e = this;
            this.resizeTimeout = setTimeout(t, 100)
        }, a.prototype.resize = function() {
            this.isResizeBound && this.needsResizeLayout() && this.layout()
        }, a.prototype.needsResizeLayout = function() {
            var t = n(this.element),
                e = this.size && t;
            return e && t.innerWidth !== this.size.innerWidth
        }, a.prototype.addItems = function(t) {
            var e = this._itemize(t);
            return e.length && (this.items = this.items.concat(e)), e
        }, a.prototype.appended = function(t) {
            var e = this.addItems(t);
            e.length && (this.layoutItems(e, !0), this.reveal(e))
        }, a.prototype.prepended = function(t) {
            var e = this._itemize(t);
            if (e.length) {
                var i = this.items.slice(0);
                this.items = e.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(e, !0), this.reveal(e), this.layoutItems(i)
            }
        }, a.prototype.reveal = function(t) {
            this._emitCompleteOnItems("reveal", t);
            for (var e = t && t.length, i = 0; e && e > i; i++) {
                var n = t[i];
                n.reveal()
            }
        }, a.prototype.hide = function(t) {
            this._emitCompleteOnItems("hide", t);
            for (var e = t && t.length, i = 0; e && e > i; i++) {
                var n = t[i];
                n.hide()
            }
        }, a.prototype.revealItemElements = function(t) {
            var e = this.getItems(t);
            this.reveal(e)
        }, a.prototype.hideItemElements = function(t) {
            var e = this.getItems(t);
            this.hide(e)
        }, a.prototype.getItem = function(t) {
            for (var e = 0, i = this.items.length; i > e; e++) {
                var n = this.items[e];
                if (n.element === t) return n
            }
        }, a.prototype.getItems = function(t) {
            t = s.makeArray(t);
            for (var e = [], i = 0, n = t.length; n > i; i++) {
                var o = t[i],
                    a = this.getItem(o);
                a && e.push(a)
            }
            return e
        }, a.prototype.remove = function(t) {
            var e = this.getItems(t);
            if (this._emitCompleteOnItems("remove", e), e && e.length)
                for (var i = 0, n = e.length; n > i; i++) {
                    var o = e[i];
                    o.remove(), s.removeFrom(this.items, o)
                }
        }, a.prototype.destroy = function() {
            var t = this.element.style;
            t.height = "", t.position = "", t.width = "";
            for (var e = 0, i = this.items.length; i > e; e++) {
                var n = this.items[e];
                n.destroy()
            }
            this.unbindResize();
            var s = this.element.outlayerGUID;
            delete c[s], delete this.element.outlayerGUID, l && l.removeData(this.element, this.constructor.namespace)
        }, a.data = function(t) {
            t = s.getQueryElement(t);
            var e = t && t.outlayerGUID;
            return e && c[e]
        }, a.create = function(t, e) {
            function i() {
                a.apply(this, arguments)
            }
            return Object.create ? i.prototype = Object.create(a.prototype) : s.extend(i.prototype, a.prototype), i.prototype.constructor = i, i.defaults = s.extend({}, a.defaults), s.extend(i.defaults, e), i.prototype.settings = {}, i.namespace = t, i.data = a.data, i.Item = function() {
                o.apply(this, arguments)
            }, i.Item.prototype = new o, s.htmlInit(i, t), l && l.bridget && l.bridget(t, i), i
        }, a.Item = o, a
    }),
    function(t, e) {
        "use strict";
        "function" == typeof define && define.amd ? define("isotope/js/item", ["outlayer/outlayer"], e) : "object" == typeof exports ? module.exports = e(require("outlayer")) : (t.Isotope = t.Isotope || {}, t.Isotope.Item = e(t.Outlayer))
    }(window, function(t) {
        "use strict";

        function e() {
            t.Item.apply(this, arguments)
        }
        e.prototype = new t.Item, e.prototype._create = function() {
            this.id = this.layout.itemGUID++, t.Item.prototype._create.call(this), this.sortData = {}
        }, e.prototype.updateSortData = function() {
            if (!this.isIgnored) {
                this.sortData.id = this.id, this.sortData["original-order"] = this.id, this.sortData.random = Math.random();
                var t = this.layout.options.getSortData,
                    e = this.layout._sorters;
                for (var i in t) {
                    var n = e[i];
                    this.sortData[i] = n(this.element, this)
                }
            }
        };
        var i = e.prototype.destroy;
        return e.prototype.destroy = function() {
            i.apply(this, arguments), this.css({
                display: ""
            })
        }, e
    }),
    function(t, e) {
        "use strict";
        "function" == typeof define && define.amd ? define("isotope/js/layout-mode", ["get-size/get-size", "outlayer/outlayer"], e) : "object" == typeof exports ? module.exports = e(require("get-size"), require("outlayer")) : (t.Isotope = t.Isotope || {}, t.Isotope.LayoutMode = e(t.getSize, t.Outlayer))
    }(window, function(t, e) {
        "use strict";

        function i(t) {
            this.isotope = t, t && (this.options = t.options[this.namespace], this.element = t.element, this.items = t.filteredItems, this.size = t.size)
        }
        return function() {
            function t(t) {
                return function() {
                    return e.prototype[t].apply(this.isotope, arguments)
                }
            }
            for (var n = ["_resetLayout", "_getItemLayoutPosition", "_manageStamp", "_getContainerSize", "_getElementOffset", "needsResizeLayout"], s = 0, o = n.length; o > s; s++) {
                var a = n[s];
                i.prototype[a] = t(a)
            }
        }(), i.prototype.needsVerticalResizeLayout = function() {
            var e = t(this.isotope.element),
                i = this.isotope.size && e;
            return i && e.innerHeight != this.isotope.size.innerHeight
        }, i.prototype._getMeasurement = function() {
            this.isotope._getMeasurement.apply(this, arguments)
        }, i.prototype.getColumnWidth = function() {
            this.getSegmentSize("column", "Width")
        }, i.prototype.getRowHeight = function() {
            this.getSegmentSize("row", "Height")
        }, i.prototype.getSegmentSize = function(t, e) {
            var i = t + e,
                n = "outer" + e;
            if (this._getMeasurement(i, n), !this[i]) {
                var s = this.getFirstItemSize();
                this[i] = s && s[n] || this.isotope.size["inner" + e]
            }
        }, i.prototype.getFirstItemSize = function() {
            var e = this.isotope.filteredItems[0];
            return e && e.element && t(e.element)
        }, i.prototype.layout = function() {
            this.isotope.layout.apply(this.isotope, arguments)
        }, i.prototype.getSize = function() {
            this.isotope.getSize(), this.size = this.isotope.size
        }, i.modes = {}, i.create = function(t, e) {
            function n() {
                i.apply(this, arguments)
            }
            return n.prototype = new i, e && (n.options = e), n.prototype.namespace = t, i.modes[t] = n, n
        }, i
    }),
    function(t, e) {
        "use strict";
        "function" == typeof define && define.amd ? define("masonry/masonry", ["outlayer/outlayer", "get-size/get-size", "fizzy-ui-utils/utils"], e) : "object" == typeof exports ? module.exports = e(require("outlayer"), require("get-size"), require("fizzy-ui-utils")) : t.Masonry = e(t.Outlayer, t.getSize, t.fizzyUIUtils)
    }(window, function(t, e, i) {
        var n = t.create("masonry");
        return n.prototype._resetLayout = function() {
            this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns();
            var t = this.cols;
            for (this.colYs = []; t--;) this.colYs.push(0);
            this.maxY = 0
        }, n.prototype.measureColumns = function() {
            if (this.getContainerWidth(), !this.columnWidth) {
                var t = this.items[0],
                    i = t && t.element;
                this.columnWidth = i && e(i).outerWidth || this.containerWidth
            }
            var n = this.columnWidth += this.gutter,
                s = this.containerWidth + this.gutter,
                o = s / n,
                a = n - s % n,
                r = a && 1 > a ? "round" : "floor";
            o = Math[r](o), this.cols = Math.max(o, 1)
        }, n.prototype.getContainerWidth = function() {
            var t = this.options.isFitWidth ? this.element.parentNode : this.element,
                i = e(t);
            this.containerWidth = i && i.innerWidth
        }, n.prototype._getItemLayoutPosition = function(t) {
            t.getSize();
            var e = t.size.outerWidth % this.columnWidth,
                n = e && 1 > e ? "round" : "ceil",
                s = Math[n](t.size.outerWidth / this.columnWidth);
            s = Math.min(s, this.cols);
            for (var o = this._getColGroup(s), a = Math.min.apply(Math, o), r = i.indexOf(o, a), l = {
                    x: this.columnWidth * r,
                    y: a
                }, h = a + t.size.outerHeight, d = this.cols + 1 - o.length, c = 0; d > c; c++) this.colYs[r + c] = h;
            return l
        }, n.prototype._getColGroup = function(t) {
            if (2 > t) return this.colYs;
            for (var e = [], i = this.cols + 1 - t, n = 0; i > n; n++) {
                var s = this.colYs.slice(n, n + t);
                e[n] = Math.max.apply(Math, s)
            }
            return e
        }, n.prototype._manageStamp = function(t) {
            var i = e(t),
                n = this._getElementOffset(t),
                s = this.options.isOriginLeft ? n.left : n.right,
                o = s + i.outerWidth,
                a = Math.floor(s / this.columnWidth);
            a = Math.max(0, a);
            var r = Math.floor(o / this.columnWidth);
            r -= o % this.columnWidth ? 0 : 1, r = Math.min(this.cols - 1, r);
            for (var l = (this.options.isOriginTop ? n.top : n.bottom) + i.outerHeight, h = a; r >= h; h++) this.colYs[h] = Math.max(l, this.colYs[h])
        }, n.prototype._getContainerSize = function() {
            this.maxY = Math.max.apply(Math, this.colYs);
            var t = {
                height: this.maxY
            };
            return this.options.isFitWidth && (t.width = this._getContainerFitWidth()), t
        }, n.prototype._getContainerFitWidth = function() {
            for (var t = 0, e = this.cols; --e && 0 === this.colYs[e];) t++;
            return (this.cols - t) * this.columnWidth - this.gutter
        }, n.prototype.needsResizeLayout = function() {
            var t = this.containerWidth;
            return this.getContainerWidth(), t !== this.containerWidth
        }, n
    }),
    function(t, e) {
        "use strict";
        "function" == typeof define && define.amd ? define("isotope/js/layout-modes/masonry", ["../layout-mode", "masonry/masonry"], e) : "object" == typeof exports ? module.exports = e(require("../layout-mode"), require("masonry-layout")) : e(t.Isotope.LayoutMode, t.Masonry)
    }(window, function(t, e) {
        "use strict";

        function i(t, e) {
            for (var i in e) t[i] = e[i];
            return t
        }
        var n = t.create("masonry"),
            s = n.prototype._getElementOffset,
            o = n.prototype.layout,
            a = n.prototype._getMeasurement;
        i(n.prototype, e.prototype), n.prototype._getElementOffset = s, n.prototype.layout = o, n.prototype._getMeasurement = a;
        var r = n.prototype.measureColumns;
        n.prototype.measureColumns = function() {
            this.items = this.isotope.filteredItems, r.call(this)
        };
        var l = n.prototype._manageStamp;
        return n.prototype._manageStamp = function() {
            this.options.isOriginLeft = this.isotope.options.isOriginLeft, this.options.isOriginTop = this.isotope.options.isOriginTop, l.apply(this, arguments)
        }, n
    }),
    function(t, e) {
        "use strict";
        "function" == typeof define && define.amd ? define("isotope/js/layout-modes/fit-rows", ["../layout-mode"], e) : "object" == typeof exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode)
    }(window, function(t) {
        "use strict";
        var e = t.create("fitRows");
        return e.prototype._resetLayout = function() {
            this.x = 0, this.y = 0, this.maxY = 0, this._getMeasurement("gutter", "outerWidth")
        }, e.prototype._getItemLayoutPosition = function(t) {
            t.getSize();
            var e = t.size.outerWidth + this.gutter,
                i = this.isotope.size.innerWidth + this.gutter;
            0 !== this.x && e + this.x > i && (this.x = 0, this.y = this.maxY);
            var n = {
                x: this.x,
                y: this.y
            };
            return this.maxY = Math.max(this.maxY, this.y + t.size.outerHeight), this.x += e, n
        }, e.prototype._getContainerSize = function() {
            return {
                height: this.maxY
            }
        }, e
    }),
    function(t, e) {
        "use strict";
        "function" == typeof define && define.amd ? define("isotope/js/layout-modes/vertical", ["../layout-mode"], e) : "object" == typeof exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode)
    }(window, function(t) {
        "use strict";
        var e = t.create("vertical", {
            horizontalAlignment: 0
        });
        return e.prototype._resetLayout = function() {
            this.y = 0
        }, e.prototype._getItemLayoutPosition = function(t) {
            t.getSize();
            var e = (this.isotope.size.innerWidth - t.size.outerWidth) * this.options.horizontalAlignment,
                i = this.y;
            return this.y += t.size.outerHeight, {
                x: e,
                y: i
            }
        }, e.prototype._getContainerSize = function() {
            return {
                height: this.y
            }
        }, e
    }),
    function(t, e) {
        "use strict";
        "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size", "matches-selector/matches-selector", "fizzy-ui-utils/utils", "isotope/js/item", "isotope/js/layout-mode", "isotope/js/layout-modes/masonry", "isotope/js/layout-modes/fit-rows", "isotope/js/layout-modes/vertical"], function(i, n, s, o, a, r) {
            return e(t, i, n, s, o, a, r)
        }) : "object" == typeof exports ? module.exports = e(t, require("outlayer"), require("get-size"), require("desandro-matches-selector"), require("fizzy-ui-utils"), require("./item"), require("./layout-mode"), require("./layout-modes/masonry"), require("./layout-modes/fit-rows"), require("./layout-modes/vertical")) : t.Isotope = e(t, t.Outlayer, t.getSize, t.matchesSelector, t.fizzyUIUtils, t.Isotope.Item, t.Isotope.LayoutMode)
    }(window, function(t, e, i, n, s, o, a) {
        function r(t, e) {
            return function(i, n) {
                for (var s = 0, o = t.length; o > s; s++) {
                    var a = t[s],
                        r = i.sortData[a],
                        l = n.sortData[a];
                    if (r > l || l > r) {
                        var h = void 0 !== e[a] ? e[a] : e,
                            d = h ? 1 : -1;
                        return (r > l ? 1 : -1) * d
                    }
                }
                return 0
            }
        }
        var l = t.jQuery,
            h = String.prototype.trim ? function(t) {
                return t.trim()
            } : function(t) {
                return t.replace(/^\s+|\s+$/g, "")
            },
            d = document.documentElement,
            c = d.textContent ? function(t) {
                return t.textContent
            } : function(t) {
                return t.innerText
            },
            u = e.create("isotope", {
                layoutMode: "masonry",
                isJQueryFiltering: !0,
                sortAscending: !0
            });
        u.Item = o, u.LayoutMode = a, u.prototype._create = function() {
            this.itemGUID = 0, this._sorters = {}, this._getSorters(), e.prototype._create.call(this), this.modes = {}, this.filteredItems = this.items, this.sortHistory = ["original-order"];
            for (var t in a.modes) this._initLayoutMode(t)
        }, u.prototype.reloadItems = function() {
            this.itemGUID = 0, e.prototype.reloadItems.call(this)
        }, u.prototype._itemize = function() {
            for (var t = e.prototype._itemize.apply(this, arguments), i = 0, n = t.length; n > i; i++) {
                var s = t[i];
                s.id = this.itemGUID++
            }
            return this._updateItemsSortData(t), t
        }, u.prototype._initLayoutMode = function(t) {
            var e = a.modes[t],
                i = this.options[t] || {};
            this.options[t] = e.options ? s.extend(e.options, i) : i, this.modes[t] = new e(this)
        }, u.prototype.layout = function() {
            return !this._isLayoutInited && this.options.isInitLayout ? void this.arrange() : void this._layout()
        }, u.prototype._layout = function() {
            var t = this._getIsInstant();
            this._resetLayout(), this._manageStamps(), this.layoutItems(this.filteredItems, t), this._isLayoutInited = !0
        }, u.prototype.arrange = function(t) {
            function e() {
                n.reveal(i.needReveal), n.hide(i.needHide)
            }
            this.option(t), this._getIsInstant();
            var i = this._filter(this.items);
            this.filteredItems = i.matches;
            var n = this;
            this._bindArrangeComplete(), this._isInstant ? this._noTransition(e) : e(), this._sort(), this._layout()
        }, u.prototype._init = u.prototype.arrange, u.prototype._getIsInstant = function() {
            var t = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited;
            return this._isInstant = t, t
        }, u.prototype._bindArrangeComplete = function() {
            function t() {
                e && i && n && s.dispatchEvent("arrangeComplete", null, [s.filteredItems])
            }
            var e, i, n, s = this;
            this.once("layoutComplete", function() {
                e = !0, t()
            }), this.once("hideComplete", function() {
                i = !0, t()
            }), this.once("revealComplete", function() {
                n = !0, t()
            })
        }, u.prototype._filter = function(t) {
            var e = this.options.filter;
            e = e || "*";
            for (var i = [], n = [], s = [], o = this._getFilterTest(e), a = 0, r = t.length; r > a; a++) {
                var l = t[a];
                if (!l.isIgnored) {
                    var h = o(l);
                    h && i.push(l), h && l.isHidden ? n.push(l) : h || l.isHidden || s.push(l)
                }
            }
            return {
                matches: i,
                needReveal: n,
                needHide: s
            }
        }, u.prototype._getFilterTest = function(t) {
            return l && this.options.isJQueryFiltering ? function(e) {
                return l(e.element).is(t)
            } : "function" == typeof t ? function(e) {
                return t(e.element)
            } : function(e) {
                return n(e.element, t)
            }
        }, u.prototype.updateSortData = function(t) {
            var e;
            t ? (t = s.makeArray(t), e = this.getItems(t)) : e = this.items, this._getSorters(), this._updateItemsSortData(e)
        }, u.prototype._getSorters = function() {
            var t = this.options.getSortData;
            for (var e in t) {
                var i = t[e];
                this._sorters[e] = p(i)
            }
        }, u.prototype._updateItemsSortData = function(t) {
            for (var e = t && t.length, i = 0; e && e > i; i++) {
                var n = t[i];
                n.updateSortData()
            }
        };
        var p = function() {
            function t(t) {
                if ("string" != typeof t) return t;
                var i = h(t).split(" "),
                    n = i[0],
                    s = n.match(/^\[(.+)\]$/),
                    o = s && s[1],
                    a = e(o, n),
                    r = u.sortDataParsers[i[1]];
                return t = r ? function(t) {
                    return t && r(a(t))
                } : function(t) {
                    return t && a(t)
                }
            }

            function e(t, e) {
                var i;
                return i = t ? function(e) {
                    return e.getAttribute(t)
                } : function(t) {
                    var i = t.querySelector(e);
                    return i && c(i)
                }
            }
            return t
        }();
        u.sortDataParsers = {
            parseInt: function(t) {
                return parseInt(t, 10)
            },
            parseFloat: function(t) {
                return parseFloat(t)
            }
        }, u.prototype._sort = function() {
            var t = this.options.sortBy;
            if (t) {
                var e = [].concat.apply(t, this.sortHistory),
                    i = r(e, this.options.sortAscending);
                this.filteredItems.sort(i), t != this.sortHistory[0] && this.sortHistory.unshift(t)
            }
        }, u.prototype._mode = function() {
            var t = this.options.layoutMode,
                e = this.modes[t];
            if (!e) throw new Error("No layout mode: " + t);
            return e.options = this.options[t], e
        }, u.prototype._resetLayout = function() {
            e.prototype._resetLayout.call(this), this._mode()._resetLayout()
        }, u.prototype._getItemLayoutPosition = function(t) {
            return this._mode()._getItemLayoutPosition(t)
        }, u.prototype._manageStamp = function(t) {
            this._mode()._manageStamp(t)
        }, u.prototype._getContainerSize = function() {
            return this._mode()._getContainerSize()
        }, u.prototype.needsResizeLayout = function() {
            return this._mode().needsResizeLayout()
        }, u.prototype.appended = function(t) {
            var e = this.addItems(t);
            if (e.length) {
                var i = this._filterRevealAdded(e);
                this.filteredItems = this.filteredItems.concat(i)
            }
        }, u.prototype.prepended = function(t) {
            var e = this._itemize(t);
            if (e.length) {
                this._resetLayout(), this._manageStamps();
                var i = this._filterRevealAdded(e);
                this.layoutItems(this.filteredItems), this.filteredItems = i.concat(this.filteredItems), this.items = e.concat(this.items)
            }
        }, u.prototype._filterRevealAdded = function(t) {
            var e = this._filter(t);
            return this.hide(e.needHide), this.reveal(e.matches), this.layoutItems(e.matches, !0), e.matches
        }, u.prototype.insert = function(t) {
            var e = this.addItems(t);
            if (e.length) {
                var i, n, s = e.length;
                for (i = 0; s > i; i++) n = e[i], this.element.appendChild(n.element);
                var o = this._filter(e).matches;
                for (i = 0; s > i; i++) e[i].isLayoutInstant = !0;
                for (this.arrange(), i = 0; s > i; i++) delete e[i].isLayoutInstant;
                this.reveal(o)
            }
        };
        var f = u.prototype.remove;
        return u.prototype.remove = function(t) {
            t = s.makeArray(t);
            var e = this.getItems(t);
            f.call(this, t);
            var i = e && e.length;
            if (i)
                for (var n = 0; i > n; n++) {
                    var o = e[n];
                    s.removeFrom(this.filteredItems, o)
                }
        }, u.prototype.shuffle = function() {
            for (var t = 0, e = this.items.length; e > t; t++) {
                var i = this.items[t];
                i.sortData.random = Math.random()
            }
            this.options.sortBy = "random", this._sort(), this._layout()
        }, u.prototype._noTransition = function(t) {
            var e = this.options.transitionDuration;
            this.options.transitionDuration = 0;
            var i = t.call(this);
            return this.options.transitionDuration = e, i
        }, u.prototype.getFilteredItemElements = function() {
            for (var t = [], e = 0, i = this.filteredItems.length; i > e; e++) t.push(this.filteredItems[e].element);
            return t
        }, u
    }),
    function(t) {
        "use strict";
        t.fn.extend({
            customSelect: function(e) {
                if ("undefined" == typeof document.body.style.maxHeight) return this;
                var i = {
                        customClass: "customSelect",
                        mapClass: !0,
                        mapStyle: !0
                    },
                    e = t.extend(i, e),
                    n = e.customClass,
                    s = function(e, i) {
                        var n = e.find(":selected"),
                            s = i.children(":first"),
                            a = n.html() || "&nbsp;";
                        s.html(a), n.attr("disabled") ? i.addClass(o("DisabledOption")) : i.removeClass(o("DisabledOption")), setTimeout(function() {
                            i.removeClass(o("Open")), t(document).off("mouseup.customSelect")
                        }, 60)
                    },
                    o = function(t) {
                        return n + t
                    };
                return this.each(function() {
                    var i = t(this),
                        a = t("<span />").addClass(o("Inner")),
                        r = t("<span />");
                    i.after(r.append(a)), r.addClass(n), e.mapClass && r.addClass(i.attr("class")), e.mapStyle && r.attr("style", i.attr("style")), i.addClass("hasCustomSelect").on("render.customSelect", function() {
                        s(i, r), i.css("width", "");
                        var t = parseInt(i.outerWidth(), 10) - (parseInt(r.outerWidth(), 10) - parseInt(r.width(), 10));
                        r.css({
                            display: "inline-block"
                        });
                        var e = r.outerHeight();
                        i.attr("disabled") ? r.addClass(o("Disabled")) : r.removeClass(o("Disabled")), a.css({
                            width: t,
                            display: "inline-block"
                        }), i.css({
                            "-webkit-appearance": "menulist-button",
                            width: r.outerWidth(),
                            position: "absolute",
                            opacity: 0,
                            height: e,
                            fontSize: r.css("font-size")
                        })
                    }).on("change.customSelect", function() {
                        r.addClass(o("Changed")), s(i, r)
                    }).on("keyup.customSelect", function(t) {
                        r.hasClass(o("Open")) ? (13 == t.which || 27 == t.which) && s(i, r) : (i.trigger("blur.customSelect"), i.trigger("focus.customSelect"))
                    }).on("mousedown.customSelect", function() {
                        r.removeClass(o("Changed"))
                    }).on("mouseup.customSelect", function(e) {
                        r.hasClass(o("Open")) || (t("." + o("Open")).not(r).length > 0 && "undefined" != typeof InstallTrigger ? i.trigger("focus.customSelect") : (r.addClass(o("Open")), e.stopPropagation(), t(document).one("mouseup.customSelect", function(e) {
                            e.target != i.get(0) && t.inArray(e.target, i.find("*").get()) < 0 ? i.trigger("blur.customSelect") : s(i, r)
                        })))
                    }).on("focus.customSelect", function() {
                        r.removeClass(o("Changed")).addClass(o("Focus"))
                    }).on("blur.customSelect", function() {
                        r.removeClass(o("Focus") + " " + o("Open"))
                    }).on("mouseenter.customSelect", function() {
                        r.addClass(o("Hover"))
                    }).on("mouseleave.customSelect", function() {
                        r.removeClass(o("Hover"))
                    }).trigger("render.customSelect")
                })
            }
        })
    }(jQuery),
    function(t) {
        var e = -1,
            i = -1,
            n = function(e) {
                var i = 1,
                    n = t(e),
                    o = null,
                    a = [];
                return n.each(function() {
                    var e = t(this),
                        n = e.offset().top - s(e.css("margin-top")),
                        r = a.length > 0 ? a[a.length - 1] : null;
                    null === r ? a.push(e) : Math.floor(Math.abs(o - n)) <= i ? a[a.length - 1] = r.add(e) : a.push(e), o = n
                }), a
            },
            s = function(t) {
                return parseFloat(t) || 0
            },
            o = function(e) {
                var i = {
                    byRow: !0,
                    remove: !1,
                    property: "height"
                };
                return "object" == typeof e ? t.extend(i, e) : ("boolean" == typeof e ? i.byRow = e : "remove" === e && (i.remove = !0), i)
            },
            a = t.fn.matchHeight = function(e) {
                var i = o(e);
                if (i.remove) {
                    var n = this;
                    return this.css(i.property, ""), t.each(a._groups, function(t, e) {
                        e.elements = e.elements.not(n)
                    }), this
                }
                return this.length <= 1 ? this : (a._groups.push({
                    elements: this,
                    options: i
                }), a._apply(this, i), this)
            };
        a._groups = [], a._throttle = 80, a._maintainScroll = !1, a._beforeUpdate = null, a._afterUpdate = null, a._apply = function(e, i) {
            var r = o(i),
                l = t(e),
                h = [l],
                d = t(window).scrollTop(),
                c = t("html").outerHeight(!0),
                u = l.parents().filter(":hidden");
            return u.each(function() {
                var e = t(this);
                e.data("style-cache", e.attr("style"))
            }), u.css("display", "block"), r.byRow && (l.each(function() {
                var e = t(this),
                    i = "inline-block" === e.css("display") ? "inline-block" : "block";
                e.data("style-cache", e.attr("style")), e.css({
                    display: i,
                    "padding-top": "0",
                    "padding-bottom": "0",
                    "margin-top": "0",
                    "margin-bottom": "0",
                    "border-top-width": "0",
                    "border-bottom-width": "0",
                    height: "100px"
                })
            }), h = n(l), l.each(function() {
                var e = t(this);
                e.attr("style", e.data("style-cache") || "")
            })), t.each(h, function(e, i) {
                var n = t(i),
                    o = 0;
                return r.byRow && n.length <= 1 ? void n.css(r.property, "") : (n.each(function() {
                    var e = t(this),
                        i = "inline-block" === e.css("display") ? "inline-block" : "block",
                        n = {
                            display: i
                        };
                    n[r.property] = "", e.css(n), e.outerHeight(!1) > o && (o = e.outerHeight(!1)), e.css("display", "")
                }), void n.each(function() {
                    var e = t(this),
                        i = 0;
                    "border-box" !== e.css("box-sizing") && (i += s(e.css("border-top-width")) + s(e.css("border-bottom-width")), i += s(e.css("padding-top")) + s(e.css("padding-bottom"))), e.css(r.property, o - i)
                }))
            }), u.each(function() {
                var e = t(this);
                e.attr("style", e.data("style-cache") || null)
            }), a._maintainScroll && t(window).scrollTop(d / c * t("html").outerHeight(!0)), this
        }, a._applyDataApi = function() {
            var e = {};
            t("[data-match-height], [data-mh]").each(function() {
                var i = t(this),
                    n = i.attr("data-match-height") || i.attr("data-mh");
                e[n] = n in e ? e[n].add(i) : i
            }), t.each(e, function() {
                this.matchHeight(!0)
            })
        };
        var r = function(e) {
            a._beforeUpdate && a._beforeUpdate(e, a._groups), t.each(a._groups, function() {
                a._apply(this.elements, this.options)
            }), a._afterUpdate && a._afterUpdate(e, a._groups)
        };
        a._update = function(n, s) {
            if (s && "resize" === s.type) {
                var o = t(window).width();
                if (o === e) return;
                e = o
            }
            n ? -1 === i && (i = setTimeout(function() {
                r(s), i = -1
            }, a._throttle)) : r(s)
        }, t(a._applyDataApi), t(window).bind("load", function(t) {
            a._update(!1, t)
        }), t(window).bind("resize orientationchange", function(t) {
            a._update(!0, t)
        })
    }(jQuery),
    function(t) {
        function e(e) {
            var i = e || window.event,
                n = [].slice.call(arguments, 1),
                s = 0,
                o = 0,
                a = 0;
            return e = t.event.fix(i), e.type = "mousewheel", i.wheelDelta && (s = i.wheelDelta / 120), i.detail && (s = -i.detail / 3), a = s, void 0 !== i.axis && i.axis === i.HORIZONTAL_AXIS && (a = 0, o = -1 * s), void 0 !== i.wheelDeltaY && (a = i.wheelDeltaY / 120), void 0 !== i.wheelDeltaX && (o = -1 * i.wheelDeltaX / 120), n.unshift(e, s, o, a), (t.event.dispatch || t.event.handle).apply(this, n)
        }
        var i = ["DOMMouseScroll", "mousewheel"];
        if (t.event.fixHooks)
            for (var n = i.length; n;) t.event.fixHooks[i[--n]] = t.event.mouseHooks;
        t.event.special.mousewheel = {
            setup: function() {
                if (this.addEventListener)
                    for (var t = i.length; t;) this.addEventListener(i[--t], e, !1);
                else this.onmousewheel = e
            },
            teardown: function() {
                if (this.removeEventListener)
                    for (var t = i.length; t;) this.removeEventListener(i[--t], e, !1);
                else this.onmousewheel = null
            }
        }, t.fn.extend({
            mousewheel: function(t) {
                return t ? this.bind("mousewheel", t) : this.trigger("mousewheel")
            },
            unmousewheel: function(t) {
                return this.unbind("mousewheel", t)
            }
        })
    }(jQuery),
    function(t, e) {
        "use strict";
        e.SliderPro = {
            modules: [],
            addModule: function(t, i) {
                this.modules.push(t), e.extend(n.prototype, i)
            }
        };
        var i = e.SliderPro.namespace = "SliderPro",
            n = function(t, i) {
                this.instance = t, this.$slider = e(this.instance), this.$slides = null, this.$slidesMask = null, this.$slidesContainer = null, this.slides = [], this.slidesOrder = [], this.options = i, this.settings = {}, this.originalSettings = {}, this.originalGotoSlide = null, this.selectedSlideIndex = 0, this.previousSlideIndex = 0, this.middleSlidePosition = 0, this.supportedAnimation = null, this.vendorPrefix = null, this.transitionEvent = null, this.positionProperty = null, this.isIE = null, this.slidesPosition = 0, this.slideWidth = 0, this.slideHeight = 0, this.slideSize = 0, this.previousSlideWidth = 0, this.previousSlideHeight = 0, this.previousWindowWidth = 0, this.previousWindowHeight = 0, this.visibleOffset = 0, this.allowResize = !0, this.uniqueId = (new Date).valueOf(), this.breakpoints = [], this.currentBreakpoint = -1, this.shuffledIndexes = [], this._init()
            };
        n.prototype = {
            _init: function() {
                var n = this;
                this.supportedAnimation = o.getSupportedAnimation(), this.vendorPrefix = o.getVendorPrefix(), this.transitionEvent = o.getTransitionEvent(), this.isIE = o.checkIE(), this.$slider.removeClass("sp-no-js"), t.navigator.userAgent.match(/(iPad|iPhone|iPod)/g) && this.$slider.addClass("ios");
                var s = /(msie) ([\w.]+)/,
                    a = s.exec(t.navigator.userAgent.toLowerCase());
                this.isIE && this.$slider.addClass("ie"), null !== a && this.$slider.addClass("ie" + parseInt(a[2], 10)), this.$slidesContainer = e('<div class="sp-slides-container"></div>').appendTo(this.$slider), this.$slidesMask = e('<div class="sp-mask"></div>').appendTo(this.$slidesContainer), this.$slides = this.$slider.find(".sp-slides").appendTo(this.$slidesMask), this.$slider.find(".sp-slide").appendTo(this.$slides);
                var r = e.SliderPro.modules;
                if ("undefined" != typeof r)
                    for (var l = 0; l < r.length; l++) {
                        var h = r[l].substring(0, 1).toLowerCase() + r[l].substring(1) + "Defaults";
                        "undefined" != typeof this[h] && e.extend(this.defaults, this[h])
                    }
                if (this.settings = e.extend({}, this.defaults, this.options), "undefined" != typeof r)
                    for (var d = 0; d < r.length; d++) "undefined" != typeof this["init" + r[d]] && this["init" + r[d]]();
                if (this.originalSettings = e.extend({}, this.settings), this.originalGotoSlide = this.gotoSlide, null !== this.settings.breakpoints) {
                    for (var c in this.settings.breakpoints) this.breakpoints.push({
                        size: parseInt(c, 10),
                        properties: this.settings.breakpoints[c]
                    });
                    this.breakpoints = this.breakpoints.sort(function(t, e) {
                        return t.size >= e.size ? 1 : -1
                    })
                }
                if (this.selectedSlideIndex = this.settings.startSlide, this.settings.shuffle === !0) {
                    var u = this.$slides.find(".sp-slide"),
                        p = [];
                    u.each(function(t) {
                        n.shuffledIndexes.push(t)
                    });
                    for (var f = this.shuffledIndexes.length - 1; f > 0; f--) {
                        var g = Math.floor(Math.random() * (f + 1)),
                            m = this.shuffledIndexes[f];
                        this.shuffledIndexes[f] = this.shuffledIndexes[g], this.shuffledIndexes[g] = m
                    }
                    e.each(this.shuffledIndexes, function(t, e) {
                        p.push(u[e])
                    }), this.$slides.empty().append(p)
                }
                e(t).on("resize." + this.uniqueId + "." + i, function() {
                    var i = e(t).width(),
                        s = e(t).height();
                    n.allowResize === !1 || n.previousWindowWidth === i && n.previousWindowHeight === s || (n.previousWindowWidth = i, n.previousWindowHeight = s, n.allowResize = !1, setTimeout(function() {
                        n.resize(), n.allowResize = !0
                    }, 200))
                }), this.on("update." + i, function() {
                    n.previousSlideWidth = 0, n.resize()
                }), this.update(), this.$slides.find(".sp-slide").eq(this.selectedSlideIndex).addClass("sp-selected"), this.trigger({
                    type: "init"
                }), e.isFunction(this.settings.init) && this.settings.init.call(this, {
                    type: "init"
                })
            },
            update: function() {
                var t = this;
                "horizontal" === this.settings.orientation ? (this.$slider.removeClass("sp-vertical").addClass("sp-horizontal"), this.$slider.css({
                    height: "",
                    "max-height": ""
                }), this.$slides.find(".sp-slide").css("top", "")) : "vertical" === this.settings.orientation && (this.$slider.removeClass("sp-horizontal").addClass("sp-vertical"), this.$slides.find(".sp-slide").css("left", "")), this.positionProperty = "horizontal" === this.settings.orientation ? "left" : "top", this.gotoSlide = this.originalGotoSlide;
                for (var i = this.slides.length - 1; i >= 0; i--)
                    if (0 === this.$slider.find('.sp-slide[data-index="' + i + '"]').length) {
                        var n = this.slides[i];
                        n.destroy(), this.slides.splice(i, 1)
                    }
                this.slidesOrder.length = 0, this.$slider.find(".sp-slide").each(function(i) {
                    var n = e(this);
                    "undefined" == typeof n.attr("data-init") ? t._createSlide(i, n) : t.slides[i].setIndex(i), t.slidesOrder.push(i)
                }), this.middleSlidePosition = parseInt((t.slidesOrder.length - 1) / 2, 10), this.settings.loop === !0 && this._updateSlidesOrder(), this.trigger({
                    type: "update"
                }), e.isFunction(this.settings.update) && this.settings.update.call(this, {
                    type: "update"
                })
            },
            _createSlide: function(t, i) {
                var n = new s(e(i), t, this.settings);
                this.slides.splice(t, 0, n)
            },
            _updateSlidesOrder: function() {
                var t, i, n = e.inArray(this.selectedSlideIndex, this.slidesOrder) - this.middleSlidePosition;
                if (0 > n)
                    for (t = this.slidesOrder.splice(n, Math.abs(n)), i = t.length - 1; i >= 0; i--) this.slidesOrder.unshift(t[i]);
                else if (n > 0)
                    for (t = this.slidesOrder.splice(0, n), i = 0; i <= t.length - 1; i++) this.slidesOrder.push(t[i])
            },
            _updateSlidesPosition: function() {
                for (var t = parseInt(this.$slides.find(".sp-slide").eq(this.selectedSlideIndex).css(this.positionProperty), 10), e = 0; e < this.slidesOrder.length; e++) {
                    var i = this.$slides.find(".sp-slide").eq(this.slidesOrder[e]);
                    i.css(this.positionProperty, t + (e - this.middleSlidePosition) * (this.slideSize + this.settings.slideDistance))
                }
            },
            _resetSlidesPosition: function() {
                for (var t = 0; t < this.slidesOrder.length; t++) {
                    var e = this.$slides.find(".sp-slide").eq(this.slidesOrder[t]);
                    e.css(this.positionProperty, t * (this.slideSize + this.settings.slideDistance))
                }
                var i = -parseInt(this.$slides.find(".sp-slide").eq(this.selectedSlideIndex).css(this.positionProperty), 10) + this.visibleOffset;
                this._moveTo(i, !0)
            },
            resize: function() {
                var i = this;
                if (null !== this.settings.breakpoints && this.breakpoints.length > 0)
                    if (e(t).width() > this.breakpoints[this.breakpoints.length - 1].size && -1 !== this.currentBreakpoint) this.currentBreakpoint = -1, this._setProperties(this.originalSettings, !1);
                    else
                        for (var n = 0, s = this.breakpoints.length; s > n; n++)
                            if (e(t).width() <= this.breakpoints[n].size) {
                                if (this.currentBreakpoint !== this.breakpoints[n].size) {
                                    var o = {
                                        type: "breakpointReach",
                                        size: this.breakpoints[n].size,
                                        settings: this.breakpoints[n].properties
                                    };
                                    this.trigger(o), e.isFunction(this.settings.breakpointReach) && this.settings.breakpointReach.call(this, o), this.currentBreakpoint = this.breakpoints[n].size;
                                    var a = e.extend({}, this.originalSettings, this.breakpoints[n].properties);
                                    return void this._setProperties(a, !1)
                                }
                                break
                            }
                this.settings.responsive === !0 ? "fullWidth" !== this.settings.forceSize && "fullWindow" !== this.settings.forceSize || "auto" !== this.settings.visibleSize && ("auto" === this.settings.visibleSize || "vertical" !== this.settings.orientation) ? this.$slider.css({
                    width: "100%",
                    "max-width": this.settings.width,
                    marginLeft: ""
                }) : (this.$slider.css("margin", 0), this.$slider.css({
                    width: e(t).width(),
                    "max-width": "",
                    marginLeft: -this.$slider.offset().left
                })) : this.$slider.css({
                    width: this.settings.width
                }), -1 === this.settings.aspectRatio && (this.settings.aspectRatio = this.settings.width / this.settings.height), this.slideWidth = this.$slider.width(), this.slideHeight = "fullWindow" === this.settings.forceSize ? e(t).height() : isNaN(this.settings.aspectRatio) ? this.settings.height : this.slideWidth / this.settings.aspectRatio, (this.previousSlideWidth !== this.slideWidth || this.previousSlideHeight !== this.slideHeight || "auto" !== this.settings.visibleSize || this.$slider.outerWidth() > this.$slider.parent().width() || this.$slider.width() !== this.$slidesMask.width()) && (this.previousSlideWidth = this.slideWidth, this.previousSlideHeight = this.slideHeight, this.slideSize = "horizontal" === this.settings.orientation ? this.slideWidth : this.slideHeight, this.visibleSlidesSize = this.slideSize, this.visibleOffset = 0, e.each(this.slides, function(t, e) {
                    e.setSize(i.slideWidth, i.slideHeight)
                }), this.$slidesMask.css({
                    width: this.slideWidth,
                    height: this.slideHeight
                }), this.settings.autoHeight === !0 ? setTimeout(function() {
                    i._resizeHeight()
                }, 1) : this.$slidesMask.css(this.vendorPrefix + "transition", ""), "auto" !== this.settings.visibleSize && ("horizontal" === this.settings.orientation ? ("fullWidth" === this.settings.forceSize || "fullWindow" === this.settings.forceSize ? (this.$slider.css("margin", 0), this.$slider.css({
                    width: e(t).width(),
                    "max-width": "",
                    marginLeft: -this.$slider.offset().left
                })) : this.$slider.css({
                    width: this.settings.visibleSize,
                    "max-width": "100%",
                    marginLeft: 0
                }), this.$slidesMask.css("width", this.$slider.width()), this.visibleSlidesSize = this.$slidesMask.width(), this.visibleOffset = Math.round((this.$slider.width() - this.slideWidth) / 2)) : (this.$slider.css("fullWindow" === this.settings.forceSize ? {
                    height: e(t).height(),
                    "max-height": ""
                } : {
                    height: this.settings.visibleSize,
                    "max-height": "100%"
                }), this.$slidesMask.css("height", this.$slider.height()), this.visibleSlidesSize = this.$slidesMask.height(), this.visibleOffset = Math.round((this.$slider.height() - this.slideHeight) / 2))), this._resetSlidesPosition(), this.trigger({
                    type: "sliderResize"
                }), e.isFunction(this.settings.sliderResize) && this.settings.sliderResize.call(this, {
                    type: "sliderResize"
                }))
            },
            _resizeHeight: function() {
                var t = this,
                    e = this.getSlideAt(this.selectedSlideIndex),
                    n = e.getSize();
                e.off("imagesLoaded." + i), e.on("imagesLoaded." + i, function(i) {
                    if (i.index === t.selectedSlideIndex) {
                        var n = e.getSize();
                        t._resizeHeightTo(n.height)
                    }
                }), "loading" !== n && this._resizeHeightTo(n.height)
            },
            gotoSlide: function(t) {
                if (t !== this.selectedSlideIndex && "undefined" != typeof this.slides[t]) {
                    var i = this;
                    this.previousSlideIndex = this.selectedSlideIndex, this.selectedSlideIndex = t, this.$slides.find(".sp-selected").removeClass("sp-selected"), this.$slides.find(".sp-slide").eq(this.selectedSlideIndex).addClass("sp-selected"), this.settings.loop === !0 && (this._updateSlidesOrder(), this._updateSlidesPosition()), this.settings.autoHeight === !0 && this._resizeHeight();
                    var n = -parseInt(this.$slides.find(".sp-slide").eq(this.selectedSlideIndex).css(this.positionProperty), 10) + this.visibleOffset;
                    this._moveTo(n, !1, function() {
                        i.settings.loop === !0 && i._resetSlidesPosition(), i.trigger({
                            type: "gotoSlideComplete",
                            index: t,
                            previousIndex: i.previousSlideIndex
                        }), e.isFunction(i.settings.gotoSlideComplete) && i.settings.gotoSlideComplete.call(i, {
                            type: "gotoSlideComplete",
                            index: t,
                            previousIndex: i.previousSlideIndex
                        })
                    }), this.trigger({
                        type: "gotoSlide",
                        index: t,
                        previousIndex: this.previousSlideIndex
                    }), e.isFunction(this.settings.gotoSlide) && this.settings.gotoSlide.call(this, {
                        type: "gotoSlide",
                        index: t,
                        previousIndex: this.previousSlideIndex
                    })
                }
            },
            nextSlide: function() {
                var t = this.selectedSlideIndex >= this.getTotalSlides() - 1 ? 0 : this.selectedSlideIndex + 1;
                this.gotoSlide(t)
            },
            previousSlide: function() {
                var t = this.selectedSlideIndex <= 0 ? this.getTotalSlides() - 1 : this.selectedSlideIndex - 1;
                this.gotoSlide(t)
            },
            _moveTo: function(t, e, i) {
                var n = this,
                    s = {};
                if (t !== this.slidesPosition)
                    if (this.slidesPosition = t, "css-3d" !== this.supportedAnimation && "css-2d" !== this.supportedAnimation || this.isIE !== !1) s["margin-" + this.positionProperty] = t, "undefined" != typeof e && e === !0 ? this.$slides.css(s) : (this.$slides.addClass("sp-animated"), this.$slides.animate(s, this.settings.slideAnimationDuration, function() {
                        n.$slides.removeClass("sp-animated"), "function" == typeof i && i()
                    }));
                    else {
                        var o, a = "horizontal" === this.settings.orientation ? t : 0,
                            r = "horizontal" === this.settings.orientation ? 0 : t;
                        s[this.vendorPrefix + "transform"] = "css-3d" === this.supportedAnimation ? "translate3d(" + a + "px, " + r + "px, 0)" : "translate(" + a + "px, " + r + "px)", "undefined" != typeof e && e === !0 ? o = "" : (this.$slides.addClass("sp-animated"), o = this.vendorPrefix + "transform " + this.settings.slideAnimationDuration / 1e3 + "s", this.$slides.on(this.transitionEvent, function(t) {
                            t.target === t.currentTarget && (n.$slides.off(n.transitionEvent), n.$slides.removeClass("sp-animated"), "function" == typeof i && i())
                        })), s[this.vendorPrefix + "transition"] = o, this.$slides.css(s)
                    }
            },
            _stopMovement: function() {
                var t = {};
                if ("css-3d" !== this.supportedAnimation && "css-2d" !== this.supportedAnimation || this.isIE !== !1) this.$slides.stop(), this.slidesPosition = parseInt(this.$slides.css("margin-" + this.positionProperty), 10);
                else {
                    var e = this.$slides.css(this.vendorPrefix + "transform"),
                        i = -1 !== e.indexOf("matrix3d") ? "matrix3d" : "matrix",
                        n = e.replace(i, "").match(/-?[0-9\.]+/g),
                        s = "matrix3d" === i ? parseInt(n[12], 10) : parseInt(n[4], 10),
                        o = "matrix3d" === i ? parseInt(n[13], 10) : parseInt(n[5], 10);
                    t[this.vendorPrefix + "transform"] = "css-3d" === this.supportedAnimation ? "translate3d(" + s + "px, " + o + "px, 0)" : "translate(" + s + "px, " + o + "px)", t[this.vendorPrefix + "transition"] = "", this.$slides.css(t), this.$slides.off(this.transitionEvent), this.slidesPosition = "horizontal" === this.settings.orientation ? s : o
                }
                this.$slides.removeClass("sp-animated")
            },
            _resizeHeightTo: function(t) {
                var i = this,
                    n = {
                        height: t
                    };
                "css-3d" === this.supportedAnimation || "css-2d" === this.supportedAnimation ? (n[this.vendorPrefix + "transition"] = "height " + this.settings.heightAnimationDuration / 1e3 + "s", this.$slidesMask.off(this.transitionEvent), this.$slidesMask.on(this.transitionEvent, function(t) {
                    t.target === t.currentTarget && (i.$slidesMask.off(i.transitionEvent), i.trigger({
                        type: "resizeHeightComplete"
                    }), e.isFunction(i.settings.resizeHeightComplete) && i.settings.resizeHeightComplete.call(i, {
                        type: "resizeHeightComplete"
                    }))
                }), this.$slidesMask.css(n)) : this.$slidesMask.stop().animate(n, this.settings.heightAnimationDuration, function() {
                    i.trigger({
                        type: "resizeHeightComplete"
                    }), e.isFunction(i.settings.resizeHeightComplete) && i.settings.resizeHeightComplete.call(i, {
                        type: "resizeHeightComplete"
                    })
                })
            },
            destroy: function() {
                this.$slider.removeData("sliderPro"), this.$slider.removeAttr("style"), this.$slides.removeAttr("style"), this.off("update." + i), e(t).off("resize." + this.uniqueId + "." + i);
                var n = e.SliderPro.modules;
                if ("undefined" != typeof n)
                    for (var s = 0; s < n.length; s++) "undefined" != typeof this["destroy" + n[s]] && this["destroy" + n[s]]();
                e.each(this.slides, function(t, e) {
                    e.destroy()
                }), this.slides.length = 0, this.$slides.prependTo(this.$slider), this.$slidesContainer.remove()
            },
            _setProperties: function(t, e) {
                for (var i in t) this.settings[i] = t[i], e !== !1 && (this.originalSettings[i] = t[i]);
                this.update()
            },
            on: function(t, e) {
                return this.$slider.on(t, e)
            },
            off: function(t) {
                return this.$slider.off(t)
            },
            trigger: function(t) {
                return this.$slider.triggerHandler(t)
            },
            getSlideAt: function(t) {
                return this.slides[t]
            },
            getSelectedSlide: function() {
                return this.selectedSlideIndex
            },
            getTotalSlides: function() {
                return this.slides.length
            },
            defaults: {
                width: 500,
                height: 300,
                responsive: !0,
                aspectRatio: -1,
                imageScaleMode: "cover",
                centerImage: !0,
                allowScaleUp: !0,
                autoHeight: !1,
                startSlide: 0,
                shuffle: !1,
                orientation: "horizontal",
                forceSize: "none",
                loop: !0,
                slideDistance: 10,
                slideAnimationDuration: 700,
                heightAnimationDuration: 700,
                visibleSize: "auto",
                breakpoints: null,
                init: function() {},
                update: function() {},
                sliderResize: function() {},
                gotoSlide: function() {},
                gotoSlideComplete: function() {},
                resizeHeightComplete: function() {},
                breakpointReach: function() {}
            }
        };
        var s = function(t, e, i) {
            this.$slide = t, this.$mainImage = null, this.$imageContainer = null, this.hasMainImage = !1, this.isMainImageLoaded = !1, this.isMainImageLoading = !1, this.hasImages = !1, this.areImagesLoaded = !1, this.width = 0, this.height = 0, this.settings = i, this.setIndex(e), this._init()
        };
        s.prototype = {
            _init: function() {
                this.$slide.attr("data-init", !0), this.$mainImage = 0 !== this.$slide.find(".sp-image").length ? this.$slide.find(".sp-image") : null, null !== this.$mainImage && (this.hasMainImage = !0, this.$imageContainer = e('<div class="sp-image-container"></div>').prependTo(this.$slide), 0 !== this.$mainImage.parent("a").length ? this.$mainImage.parent("a").appendTo(this.$imageContainer) : this.$mainImage.appendTo(this.$imageContainer)), this.hasImages = 0 !== this.$slide.find("img").length ? !0 : !1
            },
            setSize: function(t, e) {
                this.width = t, this.height = this.settings.autoHeight === !0 ? "auto" : e, this.$slide.css({
                    width: this.width,
                    height: this.height
                }), this.hasMainImage === !0 && (this.$imageContainer.css({
                    width: this.width,
                    height: this.height
                }), "undefined" == typeof this.$mainImage.attr("data-src") && this.resizeMainImage())
            },
            getSize: function() {
                var t, e = this;
                if (this.hasImages === !0 && this.areImagesLoaded === !1 && "undefined" == typeof this.$slide.attr("data-loading")) {
                    this.$slide.attr("data-loading", !0);
                    var n = o.checkImagesComplete(this.$slide, function() {
                        e.areImagesLoaded = !0, e.$slide.removeAttr("data-loading"), e.trigger({
                            type: "imagesLoaded." + i,
                            index: e.index
                        })
                    });
                    return "complete" === n ? (t = this.calculateSize(), {
                        width: t.width,
                        height: t.height
                    }) : "loading"
                }
                return t = this.calculateSize(), {
                    width: t.width,
                    height: t.height
                }
            },
            calculateSize: function() {
                var t = this.$slide.width(),
                    i = this.$slide.height();
                return this.$slide.children().each(function(n, s) {
                    var o = e(s);
                    if (o.is(":hidden") !== !0) {
                        var a = s.getBoundingClientRect(),
                            r = o.position().top + (a.bottom - a.top),
                            l = o.position().left + (a.right - a.left);
                        r > i && (i = r), l > t && (t = l)
                    }
                }), {
                    width: t,
                    height: i
                }
            },
            resizeMainImage: function(t) {
                var e = this;
                if (t === !0 && (this.isMainImageLoaded = !1, this.isMainImageLoading = !1), this.isMainImageLoaded === !1 && this.isMainImageLoading === !1) return this.isMainImageLoading = !0, void o.checkImagesComplete(this.$mainImage, function() {
                    e.isMainImageLoaded = !0, e.isMainImageLoading = !1, e.resizeMainImage(), e.trigger({
                        type: "imagesLoaded." + i,
                        index: e.index
                    })
                });
                if (this.settings.allowScaleUp === !1) {
                    this.$mainImage.css({
                        width: "",
                        height: "",
                        maxWidth: "",
                        maxHeight: ""
                    });
                    var n = this.$mainImage.width(),
                        s = this.$mainImage.height();
                    this.$mainImage.css({
                        maxWidth: n,
                        maxHeight: s
                    })
                }
                this.settings.autoHeight === !0 ? this.$mainImage.css({
                    width: "100%",
                    height: "auto"
                }) : "cover" === this.settings.imageScaleMode ? this.$mainImage.css(this.$mainImage.width() / this.$mainImage.height() <= this.width / this.height ? {
                    width: "100%",
                    height: "auto"
                } : {
                    width: "auto",
                    height: "100%"
                }) : "contain" === this.settings.imageScaleMode ? this.$mainImage.css(this.$mainImage.width() / this.$mainImage.height() >= this.width / this.height ? {
                    width: "100%",
                    height: "auto"
                } : {
                    width: "auto",
                    height: "100%"
                }) : "exact" === this.settings.imageScaleMode && this.$mainImage.css({
                    width: "100%",
                    height: "100%"
                }), this.settings.centerImage === !0 && this.$mainImage.css({
                    marginLeft: .5 * (this.$imageContainer.width() - this.$mainImage.width()),
                    marginTop: .5 * (this.$imageContainer.height() - this.$mainImage.height())
                })
            },
            destroy: function() {
                this.$slide.removeAttr("style"), this.$slide.removeAttr("data-init"), this.$slide.removeAttr("data-index"), this.$slide.removeAttr("data-loaded"), this.hasMainImage === !0 && (this.$slide.find(".sp-image").removeAttr("style").appendTo(this.$slide), this.$slide.find(".sp-image-container").remove())
            },
            getIndex: function() {
                return this.index
            },
            setIndex: function(t) {
                this.index = t, this.$slide.attr("data-index", this.index)
            },
            on: function(t, e) {
                return this.$slide.on(t, e)
            },
            off: function(t) {
                return this.$slide.off(t)
            },
            trigger: function(t) {
                return this.$slide.triggerHandler(t)
            }
        }, t.SliderPro = n, t.SliderProSlide = s, e.fn.sliderPro = function(t) {
            var i = Array.prototype.slice.call(arguments, 1);
            return this.each(function() {
                if ("undefined" == typeof e(this).data("sliderPro")) {
                    var s = new n(this, t);
                    e(this).data("sliderPro", s)
                } else if ("undefined" != typeof t) {
                    var o = e(this).data("sliderPro");
                    if ("function" == typeof o[t]) o[t].apply(o, i);
                    else if ("undefined" != typeof o.settings[t]) {
                        var a = {};
                        a[t] = i[0], o._setProperties(a)
                    } else "object" == typeof t ? o._setProperties(t) : e.error(t + " does not exist in sliderPro.")
                }
            })
        };
        var o = {
            supportedAnimation: null,
            vendorPrefix: null,
            transitionEvent: null,
            isIE: null,
            getSupportedAnimation: function() {
                if (null !== this.supportedAnimation) return this.supportedAnimation;
                var t = document.body || document.documentElement,
                    e = t.style,
                    i = "undefined" != typeof e.transition || "undefined" != typeof e.WebkitTransition || "undefined" != typeof e.MozTransition || "undefined" != typeof e.OTransition;
                if (i === !0) {
                    var n = document.createElement("div");
                    if (("undefined" != typeof n.style.WebkitPerspective || "undefined" != typeof n.style.perspective) && (this.supportedAnimation = "css-3d"), "css-3d" === this.supportedAnimation && "undefined" != typeof n.styleWebkitPerspective) {
                        var s = document.createElement("style");
                        s.textContent = "@media (transform-3d),(-webkit-transform-3d){#test-3d{left:9px;position:absolute;height:5px;margin:0;padding:0;border:0;}}", document.getElementsByTagName("head")[0].appendChild(s), n.id = "test-3d", document.body.appendChild(n), (9 !== n.offsetLeft || 5 !== n.offsetHeight) && (this.supportedAnimation = null), s.parentNode.removeChild(s), n.parentNode.removeChild(n)
                    }
                    null !== this.supportedAnimation || "undefined" == typeof n.style["-webkit-transform"] && "undefined" == typeof n.style.transform || (this.supportedAnimation = "css-2d")
                } else this.supportedAnimation = "javascript";
                return this.supportedAnimation
            },
            getVendorPrefix: function() {
                if (null !== this.vendorPrefix) return this.vendorPrefix;
                var t = document.createElement("div"),
                    e = ["Webkit", "Moz", "ms", "O"];
                if ("transform" in t.style) return this.vendorPrefix = "", this.vendorPrefix;
                for (var i = 0; i < e.length; i++)
                    if (e[i] + "Transform" in t.style) {
                        this.vendorPrefix = "-" + e[i].toLowerCase() + "-";
                        break
                    }
                return this.vendorPrefix
            },
            getTransitionEvent: function() {
                if (null !== this.transitionEvent) return this.transitionEvent;
                var t = document.createElement("div"),
                    e = {
                        transition: "transitionend",
                        WebkitTransition: "webkitTransitionEnd",
                        MozTransition: "transitionend",
                        OTransition: "oTransitionEnd"
                    };
                for (var i in e)
                    if (i in t.style) {
                        this.transitionEvent = e[i];
                        break
                    }
                return this.transitionEvent
            },
            checkImagesComplete: function(t, e) {
                var i = this,
                    n = this.checkImagesStatus(t);
                if ("loading" === n) var s = setInterval(function() {
                    n = i.checkImagesStatus(t), "complete" === n && (clearInterval(s), "function" == typeof e && e())
                }, 100);
                else "function" == typeof e && e();
                return n
            },
            checkImagesStatus: function(t) {
                var i = "complete";
                return t.is("img") && t[0].complete === !1 ? i = "loading" : t.find("img").each(function() {
                    var t = e(this)[0];
                    t.complete === !1 && (i = "loading")
                }), i
            },
            checkIE: function() {
                if (null !== this.isIE) return this.isIE; {
                    var e = t.navigator.userAgent;
                    e.indexOf("MSIE")
                }
                return this.isIE = -1 !== e.indexOf("MSIE") || e.match(/Trident.*rv\:11\./) ? !0 : !1, this.isIE
            }
        };
        t.SliderProUtils = o
    }(window, jQuery),
    function(t, e) {
        "use strict";
        var i = "Thumbnails." + e.SliderPro.namespace,
            n = {
                $thumbnails: null,
                $thumbnailsContainer: null,
                thumbnails: null,
                selectedThumbnailIndex: 0,
                thumbnailsSize: 0,
                thumbnailsContainerSize: 0,
                thumbnailsPosition: 0,
                thumbnailsOrientation: null,
                thumbnailsPositionProperty: null,
                isThumbnailScroller: !1,
                initThumbnails: function() {
                    var t = this;
                    this.thumbnails = [], this.on("update." + i, e.proxy(this._thumbnailsOnUpdate, this)), this.on("sliderResize." + i, e.proxy(this._thumbnailsOnResize, this)), this.on("gotoSlide." + i, function(e) {
                        t._gotoThumbnail(e.index)
                    })
                },
                _thumbnailsOnUpdate: function() {
                    var t = this;
                    if (0 === this.$slider.find(".sp-thumbnail").length && 0 === this.thumbnails.length) return void(this.isThumbnailScroller = !1);
                    if (this.isThumbnailScroller = !0, null === this.$thumbnailsContainer && (this.$thumbnailsContainer = e('<div class="sp-thumbnails-container"></div>').insertAfter(this.$slidesContainer)), null === this.$thumbnails)
                        if (0 !== this.$slider.find(".sp-thumbnails").length) {
                            if (this.$thumbnails = this.$slider.find(".sp-thumbnails").appendTo(this.$thumbnailsContainer), this.settings.shuffle === !0) {
                                var i = this.$thumbnails.find(".sp-thumbnail"),
                                    n = [];
                                e.each(this.shuffledIndexes, function(t, s) {
                                    var o = e(i[s]);
                                    0 !== o.parent("a").length && (o = o.parent("a")), n.push(o)
                                }), this.$thumbnails.empty().append(n)
                            }
                        } else this.$thumbnails = e('<div class="sp-thumbnails"></div>').appendTo(this.$thumbnailsContainer);
                    this.$slides.find(".sp-thumbnail").each(function() {
                        var i = e(this),
                            n = i.parents(".sp-slide").index(),
                            s = t.$thumbnails.find(".sp-thumbnail").length - 1;
                        0 !== i.parent("a").length && (i = i.parent("a")), n > s ? i.appendTo(t.$thumbnails) : i.insertBefore(t.$thumbnails.find(".sp-thumbnail").eq(n))
                    });
                    for (var s = this.thumbnails.length - 1; s >= 0; s--)
                        if (0 === this.$thumbnails.find('.sp-thumbnail[data-index="' + s + '"]').length) {
                            var o = this.thumbnails[s];
                            o.destroy(), this.thumbnails.splice(s, 1)
                        }
                    this.$thumbnails.find(".sp-thumbnail").each(function(i) {
                        var n = e(this);
                        "undefined" == typeof n.attr("data-init") ? t._createThumbnail(n, i) : t.thumbnails[i].setIndex(i)
                    }), this.$thumbnailsContainer.removeClass("sp-top-thumbnails sp-bottom-thumbnails sp-left-thumbnails sp-right-thumbnails"), "top" === this.settings.thumbnailsPosition ? (this.$thumbnailsContainer.addClass("sp-top-thumbnails"), this.thumbnailsOrientation = "horizontal") : "bottom" === this.settings.thumbnailsPosition ? (this.$thumbnailsContainer.addClass("sp-bottom-thumbnails"), this.thumbnailsOrientation = "horizontal") : "left" === this.settings.thumbnailsPosition ? (this.$thumbnailsContainer.addClass("sp-left-thumbnails"), this.thumbnailsOrientation = "vertical") : "right" === this.settings.thumbnailsPosition && (this.$thumbnailsContainer.addClass("sp-right-thumbnails"), this.thumbnailsOrientation = "vertical"), this.settings.thumbnailPointer === !0 ? this.$thumbnailsContainer.addClass("sp-has-pointer") : this.$thumbnailsContainer.removeClass("sp-has-pointer"), this.selectedThumbnailIndex = this.selectedSlideIndex, this.$thumbnails.find(".sp-thumbnail-container").eq(this.selectedThumbnailIndex).addClass("sp-selected-thumbnail"), this.thumbnailsSize = 0, e.each(this.thumbnails, function(e, i) {
                        i.setSize(t.settings.thumbnailWidth, t.settings.thumbnailHeight), t.thumbnailsSize += "horizontal" === t.thumbnailsOrientation ? i.getSize().width : i.getSize().height
                    }), "horizontal" === this.thumbnailsOrientation ? (this.$thumbnails.css({
                        width: this.thumbnailsSize,
                        height: this.settings.thumbnailHeight
                    }), this.$thumbnailsContainer.css("height", ""), this.thumbnailsPositionProperty = "left") : (this.$thumbnails.css({
                        width: this.settings.thumbnailWidth,
                        height: this.thumbnailsSize
                    }), this.$thumbnailsContainer.css("width", ""), this.thumbnailsPositionProperty = "top"), this.trigger({
                        type: "thumbnailsUpdate"
                    }), e.isFunction(this.settings.thumbnailsUpdate) && this.settings.thumbnailsUpdate.call(this, {
                        type: "thumbnailsUpdate"
                    })
                },
                _createThumbnail: function(t, e) {
                    var n = this,
                        o = new s(t, this.$thumbnails, e);
                    o.on("thumbnailClick." + i, function(t) {
                        n.gotoSlide(t.index)
                    }), this.thumbnails.splice(e, 0, o)
                },
                _thumbnailsOnResize: function() {
                    if (this.isThumbnailScroller !== !1) {
                        var i, n = this;
                        "horizontal" === this.thumbnailsOrientation ? (this.thumbnailsContainerSize = Math.min(this.$slidesMask.width(), this.thumbnailsSize), this.$thumbnailsContainer.css("width", this.thumbnailsContainerSize), "fullWindow" === this.settings.forceSize && (this.$slidesMask.css("height", this.$slidesMask.height() - this.$thumbnailsContainer.outerHeight(!0)), this.slideHeight = this.$slidesMask.height(), e.each(this.slides, function(t, e) {
                            e.setSize(n.slideWidth, n.slideHeight)
                        }))) : "vertical" === this.thumbnailsOrientation && (this.$slidesMask.width() + this.$thumbnailsContainer.outerWidth(!0) > this.$slider.parent().width() && ("fullWidth" === this.settings.forceSize || "fullWindow" === this.settings.forceSize ? this.$slider.css("max-width", e(t).width() - this.$thumbnailsContainer.outerWidth(!0)) : this.$slider.css("max-width", this.$slider.parent().width() - this.$thumbnailsContainer.outerWidth(!0)), this.$slidesMask.css("width", this.$slider.width()), "horizontal" === this.settings.orientation ? (this.visibleOffset = Math.round((this.$slider.width() - this.slideSize) / 2), this.visibleSlidesSize = this.$slidesMask.width()) : "vertical" === this.settings.orientation && (this.slideWidth = this.$slider.width(), e.each(this.slides, function(t, e) {
                            e.setSize(n.slideWidth, n.slideHeight)
                        })), this._resetSlidesPosition()), this.thumbnailsContainerSize = Math.min(this.$slidesMask.height(), this.thumbnailsSize), this.$thumbnailsContainer.css("height", this.thumbnailsContainerSize)), i = this.thumbnailsSize <= this.thumbnailsContainerSize || 0 === this.$thumbnails.find(".sp-selected-thumbnail").length ? 0 : Math.max(-this.thumbnails[this.selectedThumbnailIndex].getPosition()[this.thumbnailsPositionProperty], this.thumbnailsContainerSize - this.thumbnailsSize), "top" === this.settings.thumbnailsPosition ? this.$slider.css({
                            paddingTop: this.$thumbnailsContainer.outerHeight(!0),
                            paddingLeft: "",
                            paddingRight: ""
                        }) : "bottom" === this.settings.thumbnailsPosition ? this.$slider.css({
                            paddingTop: "",
                            paddingLeft: "",
                            paddingRight: ""
                        }) : "left" === this.settings.thumbnailsPosition ? this.$slider.css({
                            paddingTop: "",
                            paddingLeft: this.$thumbnailsContainer.outerWidth(!0),
                            paddingRight: ""
                        }) : "right" === this.settings.thumbnailsPosition && this.$slider.css({
                            paddingTop: "",
                            paddingLeft: "",
                            paddingRight: this.$thumbnailsContainer.outerWidth(!0)
                        }), this._moveThumbnailsTo(i, !0)
                    }
                },
                _gotoThumbnail: function(t) {
                    if (this.isThumbnailScroller !== !1 && "undefined" != typeof this.thumbnails[t]) {
                        var i = this.selectedThumbnailIndex,
                            n = this.thumbnailsPosition;
                        if (this.selectedThumbnailIndex = t, this.$thumbnails.find(".sp-selected-thumbnail").removeClass("sp-selected-thumbnail"), this.$thumbnails.find(".sp-thumbnail-container").eq(this.selectedThumbnailIndex).addClass("sp-selected-thumbnail"), this.selectedThumbnailIndex >= i) {
                            var s = this.selectedThumbnailIndex === this.thumbnails.length - 1 ? this.selectedThumbnailIndex : this.selectedThumbnailIndex + 1,
                                o = this.thumbnails[s],
                                a = "horizontal" === this.thumbnailsOrientation ? o.getPosition().right : o.getPosition().bottom,
                                r = -this.thumbnailsPosition + this.thumbnailsContainerSize;
                            a > r && (n = this.thumbnailsPosition - (a - r))
                        } else if (this.selectedThumbnailIndex < i) {
                            var l = 0 === this.selectedThumbnailIndex ? this.selectedThumbnailIndex : this.selectedThumbnailIndex - 1,
                                h = this.thumbnails[l],
                                d = "horizontal" === this.thumbnailsOrientation ? h.getPosition().left : h.getPosition().top;
                            d < -this.thumbnailsPosition && (n = -d)
                        }
                        this._moveThumbnailsTo(n), this.trigger({
                            type: "gotoThumbnail"
                        }), e.isFunction(this.settings.gotoThumbnail) && this.settings.gotoThumbnail.call(this, {
                            type: "gotoThumbnail"
                        })
                    }
                },
                _moveThumbnailsTo: function(t, i, n) {
                    var s = this,
                        o = {};
                    if (t !== this.thumbnailsPosition)
                        if (this.thumbnailsPosition = t, "css-3d" === this.supportedAnimation || "css-2d" === this.supportedAnimation) {
                            var a, r = "horizontal" === this.thumbnailsOrientation ? t : 0,
                                l = "horizontal" === this.thumbnailsOrientation ? 0 : t;
                            o[this.vendorPrefix + "transform"] = "css-3d" === this.supportedAnimation ? "translate3d(" + r + "px, " + l + "px, 0)" : "translate(" + r + "px, " + l + "px)", "undefined" != typeof i && i === !0 ? a = "" : (this.$thumbnails.addClass("sp-animated"), a = this.vendorPrefix + "transform 0.7s", this.$thumbnails.on(this.transitionEvent, function(t) {
                                t.target === t.currentTarget && (s.$thumbnails.off(s.transitionEvent), s.$thumbnails.removeClass("sp-animated"), "function" == typeof n && n(), s.trigger({
                                    type: "thumbnailsMoveComplete"
                                }), e.isFunction(s.settings.thumbnailsMoveComplete) && s.settings.thumbnailsMoveComplete.call(s, {
                                    type: "thumbnailsMoveComplete"
                                }))
                            })), o[this.vendorPrefix + "transition"] = a, this.$thumbnails.css(o)
                        } else o["margin-" + this.thumbnailsPositionProperty] = t, "undefined" != typeof i && i === !0 ? this.$thumbnails.css(o) : this.$thumbnails.addClass("sp-animated").animate(o, 700, function() {
                            s.$thumbnails.removeClass("sp-animated"), "function" == typeof n && n(), s.trigger({
                                type: "thumbnailsMoveComplete"
                            }), e.isFunction(s.settings.thumbnailsMoveComplete) && s.settings.thumbnailsMoveComplete.call(s, {
                                type: "thumbnailsMoveComplete"
                            })
                        })
                },
                _stopThumbnailsMovement: function() {
                    var t = {};
                    if ("css-3d" === this.supportedAnimation || "css-2d" === this.supportedAnimation) {
                        var e = this.$thumbnails.css(this.vendorPrefix + "transform"),
                            i = -1 !== e.indexOf("matrix3d") ? "matrix3d" : "matrix",
                            n = e.replace(i, "").match(/-?[0-9\.]+/g),
                            s = "matrix3d" === i ? parseInt(n[12], 10) : parseInt(n[4], 10),
                            o = "matrix3d" === i ? parseInt(n[13], 10) : parseInt(n[5], 10);
                        t[this.vendorPrefix + "transform"] = "css-3d" === this.supportedAnimation ? "translate3d(" + s + "px, " + o + "px, 0)" : "translate(" + s + "px, " + o + "px)", t[this.vendorPrefix + "transition"] = "", this.$thumbnails.css(t), this.$thumbnails.off(this.transitionEvent), this.thumbnailsPosition = "horizontal" === this.thumbnailsOrientation ? parseInt(n[4], 10) : parseInt(n[5], 10)
                    } else this.$thumbnails.stop(), this.thumbnailsPosition = parseInt(this.$thumbnails.css("margin-" + this.thumbnailsPositionProperty), 10);
                    this.$thumbnails.removeClass("sp-animated")
                },
                destroyThumbnails: function() {
                    var n = this;
                    this.off("update." + i), this.isThumbnailScroller !== !1 && (this.off("sliderResize." + i), this.off("gotoSlide." + i), e(t).off("resize." + this.uniqueId + "." + i), this.$thumbnails.find(".sp-thumbnail").each(function() {
                        var t = e(this),
                            s = parseInt(t.attr("data-index"), 10),
                            o = n.thumbnails[s];
                        o.off("thumbnailClick." + i), o.destroy()
                    }), this.thumbnails.length = 0, this.$thumbnails.appendTo(this.$slider), this.$thumbnailsContainer.remove(), this.$slider.css({
                        paddingTop: "",
                        paddingLeft: "",
                        paddingRight: ""
                    }))
                },
                thumbnailsDefaults: {
                    thumbnailWidth: 100,
                    thumbnailHeight: 80,
                    thumbnailsPosition: "bottom",
                    thumbnailPointer: !1,
                    thumbnailsUpdate: function() {},
                    gotoThumbnail: function() {},
                    thumbnailsMoveComplete: function() {}
                }
            },
            s = function(t, e, i) {
                this.$thumbnail = t, this.$thumbnails = e, this.$thumbnailContainer = null, this.width = 0, this.height = 0, this.isImageLoaded = !1, this.setIndex(i), this._init()
            };
        s.prototype = {
            _init: function() {
                var t = this;
                this.$thumbnail.attr("data-init", !0), this.$thumbnailContainer = e('<div class="sp-thumbnail-container"></div>').appendTo(this.$thumbnails), 0 !== this.$thumbnail.parent("a").length ? this.$thumbnail.parent("a").appendTo(this.$thumbnailContainer) : this.$thumbnail.appendTo(this.$thumbnailContainer), this.$thumbnailContainer.on("click." + i, function() {
                    t.trigger({
                        type: "thumbnailClick." + i,
                        index: t.index
                    })
                })
            },
            setSize: function(t, e) {
                this.width = t, this.height = e, this.$thumbnailContainer.css({
                    width: this.width,
                    height: this.height
                }), this.$thumbnail.is("img") && "undefined" == typeof this.$thumbnail.attr("data-src") && this.resizeImage()
            },
            getSize: function() {
                return {
                    width: this.$thumbnailContainer.outerWidth(!0),
                    height: this.$thumbnailContainer.outerHeight(!0)
                }
            },
            getPosition: function() {
                return {
                    left: this.$thumbnailContainer.position().left + parseInt(this.$thumbnailContainer.css("marginLeft"), 10),
                    right: this.$thumbnailContainer.position().left + parseInt(this.$thumbnailContainer.css("marginLeft"), 10) + this.$thumbnailContainer.outerWidth(),
                    top: this.$thumbnailContainer.position().top + parseInt(this.$thumbnailContainer.css("marginTop"), 10),
                    bottom: this.$thumbnailContainer.position().top + parseInt(this.$thumbnailContainer.css("marginTop"), 10) + this.$thumbnailContainer.outerHeight()
                }
            },
            setIndex: function(t) {
                this.index = t, this.$thumbnail.attr("data-index", this.index)
            },
            resizeImage: function() {
                var t = this;
                if (this.isImageLoaded === !1) return void SliderProUtils.checkImagesComplete(this.$thumbnailContainer, function() {
                    t.isImageLoaded = !0, t.resizeImage()
                });
                this.$thumbnail = this.$thumbnailContainer.find(".sp-thumbnail");
                var e = this.$thumbnail.width(),
                    i = this.$thumbnail.height();
                this.$thumbnail.css(e / i <= this.width / this.height ? {
                    width: "100%",
                    height: "auto"
                } : {
                    width: "auto",
                    height: "100%"
                }), this.$thumbnail.css({
                    marginLeft: .5 * (this.$thumbnailContainer.width() - this.$thumbnail.width()),
                    marginTop: .5 * (this.$thumbnailContainer.height() - this.$thumbnail.height())
                })
            },
            destroy: function() {
                this.$thumbnailContainer.off("click." + i), this.$thumbnail.removeAttr("data-init"), this.$thumbnail.removeAttr("data-index"), 0 !== this.$thumbnail.parent("a").length ? this.$thumbnail.parent("a").insertBefore(this.$thumbnailContainer) : this.$thumbnail.insertBefore(this.$thumbnailContainer), this.$thumbnailContainer.remove()
            },
            on: function(t, e) {
                return this.$thumbnailContainer.on(t, e)
            },
            off: function(t) {
                return this.$thumbnailContainer.off(t)
            },
            trigger: function(t) {
                return this.$thumbnailContainer.triggerHandler(t)
            }
        }, e.SliderPro.addModule("Thumbnails", n)
    }(window, jQuery),
    function(t, e) {
        "use strict";
        var i = "ConditionalImages." + e.SliderPro.namespace,
            n = {
                previousImageSize: null,
                currentImageSize: null,
                isRetinaScreen: !1,
                initConditionalImages: function() {
                    this.currentImageSize = this.previousImageSize = "default", this.isRetinaScreen = "undefined" != typeof this._isRetina && this._isRetina() === !0, this.on("update." + i, e.proxy(this._conditionalImagesOnUpdate, this)), this.on("sliderResize." + i, e.proxy(this._conditionalImagesOnResize, this))
                },
                _conditionalImagesOnUpdate: function() {
                    e.each(this.slides, function(t, i) {
                        var n = i.$slide;
                        n.find("img:not([ data-default ])").each(function() {
                            var t = e(this);
                            "undefined" != typeof t.attr("data-src") ? t.attr("data-default", t.attr("data-src")) : t.attr("data-default", t.attr("src"))
                        })
                    })
                },
                _conditionalImagesOnResize: function() {
                    if (this.currentImageSize = this.slideWidth <= this.settings.smallSize ? "small" : this.slideWidth <= this.settings.mediumSize ? "medium" : this.slideWidth <= this.settings.largeSize ? "large" : "default", this.previousImageSize !== this.currentImageSize) {
                        var t = this;
                        e.each(this.slides, function(i, n) {
                            var s = n.$slide;
                            s.find("img").each(function() {
                                var i = e(this),
                                    s = "";
                                t.isRetinaScreen === !0 && "undefined" != typeof i.attr("data-retina" + t.currentImageSize) ? (s = i.attr("data-retina" + t.currentImageSize), "undefined" != typeof i.attr("data-retina") && i.attr("data-retina") !== s && i.attr("data-retina", s)) : (t.isRetinaScreen === !1 || t.isRetinaScreen === !0 && "undefined" == typeof i.attr("data-retina")) && "undefined" != typeof i.attr("data-" + t.currentImageSize) && (s = i.attr("data-" + t.currentImageSize), "undefined" != typeof i.attr("data-src") && i.attr("data-src") !== s && i.attr("data-src", s)), "" !== s && "undefined" == typeof i.attr("data-src") && i.attr("src") !== s && t._loadConditionalImage(i, s, function(t) {
                                    t.hasClass("sp-image") && (n.$mainImage = t, n.resizeMainImage(!0))
                                })
                            })
                        }), this.previousImageSize = this.currentImageSize
                    }
                },
                _loadConditionalImage: function(t, i, n) {
                    var s = e(new Image);
                    s.attr("class", t.attr("class")), s.attr("style", t.attr("style")), e.each(t.data(), function(t, e) {
                        s.attr("data-" + t, e)
                    }), "undefined" != typeof t.attr("width") && s.attr("width", t.attr("width")), "undefined" != typeof t.attr("height") && s.attr("height", t.attr("height")), "undefined" != typeof t.attr("alt") && s.attr("alt", t.attr("alt")), "undefined" != typeof t.attr("title") && s.attr("title", t.attr("title")), s.attr("src", i), s.insertAfter(t), t.remove(), t = null, "function" == typeof n && n(s)
                },
                destroyConditionalImages: function() {
                    this.off("update." + i), this.off("sliderResize." + i)
                },
                conditionalImagesDefaults: {
                    smallSize: 480,
                    mediumSize: 768,
                    largeSize: 1024
                }
            };
        e.SliderPro.addModule("ConditionalImages", n)
    }(window, jQuery),
    function(t, e) {
        "use strict";
        var i = "Retina." + e.SliderPro.namespace,
            n = {
                initRetina: function() {
                    this._isRetina() !== !1 && (this.on("update." + i, e.proxy(this._checkRetinaImages, this)), 0 !== this.$slider.find(".sp-thumbnail").length && this.on("update.Thumbnails." + i, e.proxy(this._checkRetinaThumbnailImages, this)))
                },
                _isRetina: function() {
                    return t.devicePixelRatio >= 2 ? !0 : t.matchMedia && t.matchMedia("(-webkit-min-device-pixel-ratio: 2),(min-resolution: 2dppx)").matches ? !0 : !1
                },
                _checkRetinaImages: function() {
                    var t = this;
                    e.each(this.slides, function(i, n) {
                        var s = n.$slide;
                        "undefined" == typeof s.attr("data-retina-loaded") && (s.attr("data-retina-loaded", !0), s.find("img[data-retina]").each(function() {
                            var i = e(this);
                            "undefined" != typeof i.attr("data-src") ? i.attr("data-src", i.attr("data-retina")) : t._loadRetinaImage(i, function(t) {
                                t.hasClass("sp-image") && (n.$mainImage = t, n.resizeMainImage(!0))
                            })
                        }))
                    })
                },
                _checkRetinaThumbnailImages: function() {
                    var t = this;
                    e.each(this.thumbnails, function(i, n) {
                        var s = n.$thumbnailContainer;
                        "undefined" == typeof s.attr("data-retina-loaded") && (s.attr("data-retina-loaded", !0), s.find("img[data-retina]").each(function() {
                            var i = e(this);
                            "undefined" != typeof i.attr("data-src") ? i.attr("data-src", i.attr("data-retina")) : t._loadRetinaImage(i, function(t) {
                                t.hasClass("sp-thumbnail") && n.resizeImage()
                            })
                        }))
                    })
                },
                _loadRetinaImage: function(t, i) {
                    var n = !1,
                        s = "";
                    if ("undefined" != typeof t.attr("data-retina") && (n = !0, s = t.attr("data-retina")), "undefined" != typeof t.attr("data-src") && (n === !1 && (s = t.attr("data-src")), t.removeAttr("data-src")), "" !== s) {
                        var o = e(new Image);
                        o.attr("class", t.attr("class")), o.attr("style", t.attr("style")), e.each(t.data(), function(t, e) {
                            o.attr("data-" + t, e)
                        }), "undefined" != typeof t.attr("width") && o.attr("width", t.attr("width")), "undefined" != typeof t.attr("height") && o.attr("height", t.attr("height")), "undefined" != typeof t.attr("alt") && o.attr("alt", t.attr("alt")), "undefined" != typeof t.attr("title") && o.attr("title", t.attr("title")), o.insertAfter(t), t.remove(), t = null, o.attr("src", s), "function" == typeof i && i(o)
                    }
                },
                destroyRetina: function() {
                    this.off("update." + i), this.off("update.Thumbnails." + i)
                }
            };
        e.SliderPro.addModule("Retina", n)
    }(window, jQuery),
    function(t, e) {
        "use strict";
        var i = "LazyLoading." + e.SliderPro.namespace,
            n = {
                allowLazyLoadingCheck: !0,
                initLazyLoading: function() {
                    this.on("sliderResize." + i, e.proxy(this._lazyLoadingOnResize, this)), this.on("gotoSlide." + i, e.proxy(this._checkAndLoadVisibleImages, this)), this.on("thumbnailsUpdate." + i + " thumbnailsMoveComplete." + i, e.proxy(this._checkAndLoadVisibleThumbnailImages, this))
                },
                _lazyLoadingOnResize: function() {
                    var t = this;
                    this.allowLazyLoadingCheck !== !1 && (this.allowLazyLoadingCheck = !1, this._checkAndLoadVisibleImages(), 0 !== this.$slider.find(".sp-thumbnail").length && this._checkAndLoadVisibleThumbnailImages(), setTimeout(function() {
                        t.allowLazyLoadingCheck = !0
                    }, 500))
                },
                _checkAndLoadVisibleImages: function() {
                    if (0 !== this.$slider.find(".sp-slide:not([ data-loaded ])").length) {
                        var t = this,
                            i = this.settings.loop === !0 ? this.middleSlidePosition : this.selectedSlideIndex,
                            n = Math.ceil((this.visibleSlidesSize - this.slideSize) / 2 / this.slideSize),
                            s = i - n - 1 > 0 ? i - n - 1 : 0,
                            o = i + n + 1 < this.getTotalSlides() - 1 ? i + n + 1 : this.getTotalSlides() - 1,
                            a = this.slidesOrder.slice(s, o + 1);
                        e.each(a, function(i, n) {
                            var s = t.slides[n],
                                o = s.$slide;
                            "undefined" == typeof o.attr("data-loaded") && (o.attr("data-loaded", !0), o.find("img[ data-src ]").each(function() {
                                var i = e(this);
                                t._loadImage(i, function(t) {
                                    t.hasClass("sp-image") && (s.$mainImage = t, s.resizeMainImage(!0))
                                })
                            }))
                        })
                    }
                },
                _checkAndLoadVisibleThumbnailImages: function() {
                    if (0 !== this.$slider.find(".sp-thumbnail-container:not([ data-loaded ])").length) {
                        var t = this,
                            i = this.thumbnailsSize / this.thumbnails.length,
                            n = Math.floor(Math.abs(this.thumbnailsPosition / i)),
                            s = Math.floor((-this.thumbnailsPosition + this.thumbnailsContainerSize) / i),
                            o = this.thumbnails.slice(n, s + 1);
                        e.each(o, function(i, n) {
                            var s = n.$thumbnailContainer;
                            "undefined" == typeof s.attr("data-loaded") && (s.attr("data-loaded", !0), s.find("img[ data-src ]").each(function() {
                                var i = e(this);
                                t._loadImage(i, function() {
                                    n.resizeImage()
                                })
                            }))
                        })
                    }
                },
                _loadImage: function(t, i) {
                    var n = e(new Image);
                    n.attr("class", t.attr("class")), n.attr("style", t.attr("style")), e.each(t.data(), function(t, e) {
                        n.attr("data-" + t, e)
                    }), "undefined" != typeof t.attr("width") && n.attr("width", t.attr("width")), "undefined" != typeof t.attr("height") && n.attr("height", t.attr("height")), "undefined" != typeof t.attr("alt") && n.attr("alt", t.attr("alt")), "undefined" != typeof t.attr("title") && n.attr("title", t.attr("title")), n.attr("src", t.attr("data-src")), n.removeAttr("data-src"), n.insertAfter(t), t.remove(), t = null, "function" == typeof i && i(n)
                },
                destroyLazyLoading: function() {
                    this.off("update." + i), this.off("gotoSlide." + i), this.off("sliderResize." + i), this.off("thumbnailsUpdate." + i), this.off("thumbnailsMoveComplete." + i)
                }
            };
        e.SliderPro.addModule("LazyLoading", n)
    }(window, jQuery),
    function(t, e) {
        "use strict";
        var i = "Layers." + e.SliderPro.namespace,
            n = {
                layersGotoSlideReference: null,
                waitForLayersTimer: null,
                initLayers: function() {
                    this.on("update." + i, e.proxy(this._layersOnUpdate, this)), this.on("sliderResize." + i, e.proxy(this._layersOnResize, this)), this.on("gotoSlide." + i, e.proxy(this._layersOnGotoSlide, this))
                },
                _layersOnUpdate: function() {
                    var t = this;
                    e.each(this.slides, function(t, i) {
                        i.$slide;
                        this.$slide.find(".sp-layer:not([ data-layer-init ])").each(function() {
                            var t = new o(e(this));
                            "undefined" == typeof i.layers && (i.layers = []), i.layers.push(t), e(this).hasClass("sp-static") === !1 && ("undefined" == typeof i.animatedLayers && (i.animatedLayers = []), i.animatedLayers.push(t))
                        })
                    }), this.settings.waitForLayers === !0 && (clearTimeout(this.waitForLayersTimer), this.waitForLayersTimer = setTimeout(function() {
                        t.layersGotoSlideReference = t.gotoSlide, t.gotoSlide = t._layersGotoSlide
                    }, 1)), this.showLayers(this.selectedSlideIndex)
                },
                _layersOnResize: function() {
                    var t, i, n = this,
                        s = this.settings.autoScaleLayers;
                    this.settings.autoScaleLayers !== !1 && (-1 === this.settings.autoScaleReference ? "string" == typeof this.settings.width && -1 !== this.settings.width.indexOf("%") ? s = !1 : t = parseInt(this.settings.width, 10) : t = this.settings.autoScaleReference, i = s === !0 && this.slideWidth < t ? n.slideWidth / t : 1, e.each(this.slides, function(t, n) {
                        "undefined" != typeof n.layers && e.each(n.layers, function(t, e) {
                            e.scale(i)
                        })
                    }))
                },
                _layersGotoSlide: function(t) {
                    var e = this,
                        n = this.slides[this.selectedSlideIndex].animatedLayers;
                    this.$slider.hasClass("sp-swiping") || "undefined" == typeof n || 0 === n.length ? this.layersGotoSlideReference(t) : (this.on("hideLayersComplete." + i, function() {
                        e.off("hideLayersComplete." + i), e.layersGotoSlideReference(t)
                    }), this.hideLayers(this.selectedSlideIndex))
                },
                _layersOnGotoSlide: function() {
                    this.previousSlideIndex !== this.selectedSlideIndex && this.settings.waitForLayers === !1 && this.hideLayers(this.previousSlideIndex), this.showLayers(this.selectedSlideIndex)
                },
                showLayers: function(t) {
                    var i = this,
                        n = this.slides[t].animatedLayers,
                        s = 0;
                    "undefined" != typeof n && e.each(n, function(t, o) {
                        o.isVisible() === !0 ? (s++, s === n.length && (i.trigger({
                            type: "showLayersComplete",
                            index: t
                        }), e.isFunction(i.settings.showLayersComplete) && i.settings.showLayersComplete.call(i, {
                            type: "showLayersComplete",
                            index: t
                        }))) : o.show(function() {
                            s++, s === n.length && (i.trigger({
                                type: "showLayersComplete",
                                index: t
                            }), e.isFunction(i.settings.showLayersComplete) && i.settings.showLayersComplete.call(i, {
                                type: "showLayersComplete",
                                index: t
                            }))
                        })
                    })
                },
                hideLayers: function(t) {
                    var i = this,
                        n = this.slides[t].animatedLayers,
                        s = 0;
                    "undefined" != typeof n && e.each(n, function(t, o) {
                        o.isVisible() === !1 ? (s++, s === n.length && (i.trigger({
                            type: "hideLayersComplete",
                            index: t
                        }), e.isFunction(i.settings.hideLayersComplete) && i.settings.hideLayersComplete.call(i, {
                            type: "hideLayersComplete",
                            index: t
                        }))) : o.hide(function() {
                            s++, s === n.length && (i.trigger({
                                type: "hideLayersComplete",
                                index: t
                            }), e.isFunction(i.settings.hideLayersComplete) && i.settings.hideLayersComplete.call(i, {
                                type: "hideLayersComplete",
                                index: t
                            }))
                        })
                    })
                },
                destroyLayers: function() {
                    this.off("update." + i), this.off("resize." + i), this.off("gotoSlide." + i), this.off("hideLayersComplete." + i)
                },
                layersDefaults: {
                    waitForLayers: !1,
                    autoScaleLayers: !0,
                    autoScaleReference: -1,
                    showLayersComplete: function() {},
                    hideLayersComplete: function() {}
                }
            },
            s = t.SliderProSlide.prototype.destroy;
        t.SliderProSlide.prototype.destroy = function() {
            "undefined" != typeof this.layers && (e.each(this.layers, function(t, e) {
                e.destroy()
            }), this.layers.length = 0), "undefined" != typeof this.animatedLayers && (this.animatedLayers.length = 0), s.apply(this)
        };
        var o = function(t) {
            this.$layer = t, this.visible = !1, this.styled = !1, this.data = null, this.position = null, this.horizontalProperty = null, this.verticalProperty = null, this.horizontalPosition = null, this.verticalPosition = null, this.scaleRatio = 1, this.supportedAnimation = SliderProUtils.getSupportedAnimation(), this.vendorPrefix = SliderProUtils.getVendorPrefix(), this.transitionEvent = SliderProUtils.getTransitionEvent(), this.stayTimer = null, this._init()
        };
        o.prototype = {
            _init: function() {
                this.$layer.attr("data-layer-init", !0), this.$layer.hasClass("sp-static") ? this._setStyle() : this.$layer.css({
                    visibility: "hidden",
                    display: "none"
                })
            },
            _setStyle: function() {
                this.styled = !0, this.$layer.css("display", ""), this.data = this.$layer.data(), "undefined" != typeof this.data.width && this.$layer.css("width", this.data.width), "undefined" != typeof this.data.height && this.$layer.css("height", this.data.height), "undefined" != typeof this.data.depth && this.$layer.css("z-index", this.data.depth), this.position = this.data.position ? this.data.position.toLowerCase() : "topleft", this.horizontalProperty = -1 !== this.position.indexOf("right") ? "right" : -1 !== this.position.indexOf("left") ? "left" : "center", this.verticalProperty = -1 !== this.position.indexOf("bottom") ? "bottom" : -1 !== this.position.indexOf("top") ? "top" : "center", this._setPosition(), this.scale(this.scaleRatio)
            },
            _setPosition: function() {
                var t = this.$layer.attr("style");
                this.horizontalPosition = "undefined" != typeof this.data.horizontal ? this.data.horizontal : 0, this.verticalPosition = "undefined" != typeof this.data.vertical ? this.data.vertical : 0, "center" === this.horizontalProperty ? (this.$layer.is("img") === !1 && ("undefined" == typeof t || "undefined" != typeof t && -1 === t.indexOf("width")) && (this.$layer.css("white-space", "nowrap"), this.$layer.css("width", this.$layer.outerWidth(!0))), this.$layer.css({
                    marginLeft: "auto",
                    marginRight: "auto",
                    left: this.horizontalPosition,
                    right: 0
                })) : this.$layer.css(this.horizontalProperty, this.horizontalPosition), "center" === this.verticalProperty ? (this.$layer.is("img") === !1 && ("undefined" == typeof t || "undefined" != typeof t && -1 === t.indexOf("height")) && (this.$layer.css("white-space", "nowrap"), this.$layer.css("height", this.$layer.outerHeight(!0))), this.$layer.css({
                    marginTop: "auto",
                    marginBottom: "auto",
                    top: this.verticalPosition,
                    bottom: 0
                })) : this.$layer.css(this.verticalProperty, this.verticalPosition)
            },
            scale: function(t) {
                if (!this.$layer.hasClass("sp-no-scale") && (this.scaleRatio = t, this.styled !== !1)) {
                    var e = "center" === this.horizontalProperty ? "left" : this.horizontalProperty,
                        i = "center" === this.verticalProperty ? "top" : this.verticalProperty,
                        n = {};
                    n[this.vendorPrefix + "transform-origin"] = this.horizontalProperty + " " + this.verticalProperty, n[this.vendorPrefix + "transform"] = "scale(" + this.scaleRatio + ")", "string" != typeof this.horizontalPosition && (n[e] = this.horizontalPosition * this.scaleRatio), "string" != typeof this.verticalPosition && (n[i] = this.verticalPosition * this.scaleRatio), "string" == typeof this.data.width && -1 !== this.data.width.indexOf("%") && (n.width = (parseInt(this.data.width, 10) / this.scaleRatio).toString() + "%"), "string" == typeof this.data.height && -1 !== this.data.height.indexOf("%") && (n.height = (parseInt(this.data.height, 10) / this.scaleRatio).toString() + "%"), this.$layer.css(n)
                }
            },
            show: function(t) {
                if (this.visible !== !0) {
                    this.visible = !0, this.styled === !1 && this._setStyle();
                    var e = this,
                        i = "undefined" != typeof this.data.showOffset ? this.data.showOffset : 50,
                        n = "undefined" != typeof this.data.showDuration ? this.data.showDuration / 1e3 : .4,
                        s = "undefined" != typeof this.data.showDelay ? this.data.showDelay : 10,
                        o = "undefined" != typeof e.data.stayDuration ? parseInt(e.data.stayDuration, 10) : -1;
                    if ("javascript" === this.supportedAnimation) this.$layer.stop().delay(s).css({
                        opacity: 0,
                        visibility: "visible"
                    }).animate({
                        opacity: 1
                    }, 1e3 * n, function() {
                        -1 !== o && (e.stayTimer = setTimeout(function() {
                            e.hide(), e.stayTimer = null
                        }, o)), "undefined" != typeof t && t()
                    });
                    else {
                        var a = {
                                opacity: 0,
                                visibility: "visible"
                            },
                            r = {
                                opacity: 1
                            },
                            l = "";
                        a[this.vendorPrefix + "transform"] = "scale(" + this.scaleRatio + ")", r[this.vendorPrefix + "transform"] = "scale(" + this.scaleRatio + ")", r[this.vendorPrefix + "transition"] = "opacity " + n + "s", "undefined" != typeof this.data.showTransition && ("left" === this.data.showTransition ? l = i + "px, 0" : "right" === this.data.showTransition ? l = "-" + i + "px, 0" : "up" === this.data.showTransition ? l = "0, " + i + "px" : "down" === this.data.showTransition && (l = "0, -" + i + "px"), a[this.vendorPrefix + "transform"] += "css-3d" === this.supportedAnimation ? " translate3d(" + l + ", 0)" : " translate(" + l + ")", r[this.vendorPrefix + "transform"] += "css-3d" === this.supportedAnimation ? " translate3d(0, 0, 0)" : " translate(0, 0)", r[this.vendorPrefix + "transition"] += ", " + this.vendorPrefix + "transform " + n + "s"), this.$layer.on(this.transitionEvent, function(i) {
                            i.target === i.currentTarget && (e.$layer.off(e.transitionEvent).css(e.vendorPrefix + "transition", ""), -1 !== o && (e.stayTimer = setTimeout(function() {
                                e.hide(), e.stayTimer = null
                            }, o)), "undefined" != typeof t && t())
                        }), this.$layer.css(a), setTimeout(function() {
                            e.$layer.css(r)
                        }, s)
                    }
                }
            },
            hide: function(t) {
                if (this.visible !== !1) {
                    var i = this,
                        n = "undefined" != typeof this.data.hideOffset ? this.data.hideOffset : 50,
                        s = "undefined" != typeof this.data.hideDuration ? this.data.hideDuration / 1e3 : .4,
                        o = "undefined" != typeof this.data.hideDelay ? this.data.hideDelay : 10;
                    if (this.visible = !1, null !== this.stayTimer && clearTimeout(this.stayTimer), "javascript" === this.supportedAnimation) this.$layer.stop().delay(o).animate({
                        opacity: 0
                    }, 1e3 * s, function() {
                        e(this).css("visibility", "hidden"), "undefined" != typeof t && t()
                    });
                    else {
                        var a = "",
                            r = {
                                opacity: 0
                            };
                        r[this.vendorPrefix + "transform"] = "scale(" + this.scaleRatio + ")", r[this.vendorPrefix + "transition"] = "opacity " + s + "s", "undefined" != typeof this.data.hideTransition && ("left" === this.data.hideTransition ? a = "-" + n + "px, 0" : "right" === this.data.hideTransition ? a = n + "px, 0" : "up" === this.data.hideTransition ? a = "0, -" + n + "px" : "down" === this.data.hideTransition && (a = "0, " + n + "px"), r[this.vendorPrefix + "transform"] += "css-3d" === this.supportedAnimation ? " translate3d(" + a + ", 0)" : " translate(" + a + ")", r[this.vendorPrefix + "transition"] += ", " + this.vendorPrefix + "transform " + s + "s"), this.$layer.on(this.transitionEvent, function(e) {
                            e.target === e.currentTarget && (i.$layer.off(i.transitionEvent).css(i.vendorPrefix + "transition", ""), i.visible === !1 && i.$layer.css("visibility", "hidden"), "undefined" != typeof t && t())
                        }), setTimeout(function() {
                            i.$layer.css(r)
                        }, o)
                    }
                }
            },
            isVisible: function() {
                return this.visible === !1 || this.$layer.is(":hidden") ? !1 : !0
            },
            destroy: function() {
                this.$layer.removeAttr("style"), this.$layer.removeAttr("data-layer-init")
            }
        }, e.SliderPro.addModule("Layers", n)
    }(window, jQuery),
    function(t, e) {
        "use strict";
        var i = "Fade." + e.SliderPro.namespace,
            n = {
                fadeGotoSlideReference: null,
                initFade: function() {
                    this.on("update." + i, e.proxy(this._fadeOnUpdate, this))
                },
                _fadeOnUpdate: function() {
                    this.settings.fade === !0 && (this.fadeGotoSlideReference = this.gotoSlide, this.gotoSlide = this._fadeGotoSlide)
                },
                _fadeGotoSlide: function(t) {
                    if (t !== this.selectedSlideIndex)
                        if (this.$slider.hasClass("sp-swiping")) this.fadeGotoSlideReference(t);
                        else {
                            var i, n, s = this,
                                o = t;
                            e.each(this.slides, function(t, e) {
                                var a = e.getIndex(),
                                    r = e.$slide;
                                a === o ? (r.css({
                                    opacity: 0,
                                    left: 0,
                                    top: 0,
                                    "z-index": 20
                                }), i = r) : a === s.selectedSlideIndex ? (r.css({
                                    opacity: 1,
                                    left: 0,
                                    top: 0,
                                    "z-index": 10
                                }), n = r) : r.css("visibility", "hidden")
                            }), this.previousSlideIndex = this.selectedSlideIndex, this.selectedSlideIndex = t, s.settings.loop === !0 && s._updateSlidesOrder(), this._moveTo(this.visibleOffset, !0), this.settings.fadeOutPreviousSlide === !0 && this._fadeSlideTo(n, 0), this._fadeSlideTo(i, 1, function() {
                                e.each(s.slides, function(t, e) {
                                    var i = e.$slide;
                                    i.css({
                                        visibility: "",
                                        opacity: "",
                                        "z-index": ""
                                    })
                                }), s._resetSlidesPosition(), s.trigger({
                                    type: "gotoSlideComplete",
                                    index: t,
                                    previousIndex: s.previousSlideIndex
                                }), e.isFunction(s.settings.gotoSlideComplete) && s.settings.gotoSlideComplete.call(s, {
                                    type: "gotoSlideComplete",
                                    index: t,
                                    previousIndex: s.previousSlideIndex
                                })
                            }), this.settings.autoHeight === !0 && this._resizeHeight(), this.trigger({
                                type: "gotoSlide",
                                index: t,
                                previousIndex: this.previousSlideIndex
                            }), e.isFunction(this.settings.gotoSlide) && this.settings.gotoSlide.call(this, {
                                type: "gotoSlide",
                                index: t,
                                previousIndex: this.previousSlideIndex
                            })
                        }
                },
                _fadeSlideTo: function(t, e, i) {
                    var n = this;
                    "css-3d" === this.supportedAnimation || "css-2d" === this.supportedAnimation ? (setTimeout(function() {
                        var i = {
                            opacity: e
                        };
                        i[n.vendorPrefix + "transition"] = "opacity " + n.settings.fadeDuration / 1e3 + "s", t.css(i)
                    }, 1), t.on(this.transitionEvent, function(e) {
                        e.target === e.currentTarget && (t.off(n.transitionEvent), t.css(n.vendorPrefix + "transition", ""), "function" == typeof i && i())
                    })) : t.stop().animate({
                        opacity: e
                    }, this.settings.fadeDuration, function() {
                        "function" == typeof i && i()
                    })
                },
                destroyFade: function() {
                    this.off("update." + i), null !== this.fadeGotoSlideReference && (this.gotoSlide = this.fadeGotoSlideReference)
                },
                fadeDefaults: {
                    fade: !1,
                    fadeOutPreviousSlide: !0,
                    fadeDuration: 500
                }
            };
        e.SliderPro.addModule("Fade", n)
    }(window, jQuery),
    function(t, e) {
        "use strict";
        var i = "TouchSwipe." + e.SliderPro.namespace,
            n = {
                touchStartPoint: {
                    x: 0,
                    y: 0
                },
                touchEndPoint: {
                    x: 0,
                    y: 0
                },
                touchDistance: {
                    x: 0,
                    y: 0
                },
                touchStartPosition: 0,
                isTouchMoving: !1,
                touchSwipeEvents: {
                    startEvent: "",
                    moveEvent: "",
                    endEvent: ""
                },
                initTouchSwipe: function() {
                    this.settings.touchSwipe !== !1 && (this.touchSwipeEvents.startEvent = "touchstart." + i + " mousedown." + i, this.touchSwipeEvents.moveEvent = "touchmove." + i + " mousemove." + i, this.touchSwipeEvents.endEvent = "touchend." + this.uniqueId + "." + i + " mouseup." + this.uniqueId + "." + i, this.$slidesMask.on(this.touchSwipeEvents.startEvent, e.proxy(this._onTouchStart, this)), this.$slidesMask.on("dragstart." + i, function(t) {
                        t.preventDefault()
                    }), this.$slidesMask.addClass("sp-grab"))
                },
                _onTouchStart: function(t) {
                    if (!(e(t.target).closest(".sp-selectable").length >= 1)) {
                        var n = "undefined" != typeof t.originalEvent.touches ? t.originalEvent.touches[0] : t.originalEvent;
                        "undefined" == typeof t.originalEvent.touches && t.preventDefault(), e(t.target).parents(".sp-slide").find("a").one("click." + i, function(t) {
                            t.preventDefault()
                        }), this.touchStartPoint.x = n.pageX || n.clientX, this.touchStartPoint.y = n.pageY || n.clientY, this.touchStartPosition = this.slidesPosition, this.touchDistance.x = this.touchDistance.y = 0, this.$slides.hasClass("sp-animated") && (this.isTouchMoving = !0, this._stopMovement(), this.touchStartPosition = this.slidesPosition), this.$slidesMask.on(this.touchSwipeEvents.moveEvent, e.proxy(this._onTouchMove, this)), e(document).on(this.touchSwipeEvents.endEvent, e.proxy(this._onTouchEnd, this)), this.$slidesMask.removeClass("sp-grab").addClass("sp-grabbing"), this.$slider.addClass("sp-swiping")
                    }
                },
                _onTouchMove: function(t) {
                    var e = "undefined" != typeof t.originalEvent.touches ? t.originalEvent.touches[0] : t.originalEvent;
                    this.isTouchMoving = !0, this.touchEndPoint.x = e.pageX || e.clientX, this.touchEndPoint.y = e.pageY || e.clientY, this.touchDistance.x = this.touchEndPoint.x - this.touchStartPoint.x, this.touchDistance.y = this.touchEndPoint.y - this.touchStartPoint.y;
                    var i = "horizontal" === this.settings.orientation ? this.touchDistance.x : this.touchDistance.y,
                        n = "horizontal" === this.settings.orientation ? this.touchDistance.y : this.touchDistance.x;
                    Math.abs(i) > Math.abs(n) && (t.preventDefault(), this.settings.loop === !1 && (this.slidesPosition > this.touchStartPosition && 0 === this.selectedSlideIndex || this.slidesPosition < this.touchStartPosition && this.selectedSlideIndex === this.getTotalSlides() - 1) && (i = .2 * i), this._moveTo(this.touchStartPosition + i, !0))
                },
                _onTouchEnd: function(t) {
                    var n = this,
                        s = "horizontal" === this.settings.orientation ? this.touchDistance.x : this.touchDistance.y;
                    if (this.$slidesMask.off(this.touchSwipeEvents.moveEvent), e(document).off(this.touchSwipeEvents.endEvent), this.$slidesMask.removeClass("sp-grabbing").addClass("sp-grab"), (this.isTouchMoving === !1 || this.isTouchMoving === !0 && Math.abs(this.touchDistance.x) < 10 && Math.abs(this.touchDistance.y) < 10) && (e(t.target).parents(".sp-slide").find("a").off("click." + i), this.$slider.removeClass("sp-swiping")), setTimeout(function() {
                            n.$slider.removeClass("sp-swiping")
                        }, 1), this.isTouchMoving !== !1) {
                        this.isTouchMoving = !1, e(t.target).parents(".sp-slide").one("click", function(t) {
                            t.preventDefault()
                        });
                        var o = -parseInt(this.$slides.find(".sp-slide").eq(this.selectedSlideIndex).css(this.positionProperty), 10) + this.visibleOffset;
                        if (Math.abs(s) < this.settings.touchSwipeThreshold) this._moveTo(o);
                        else {
                            var a = s / (this.slideSize + this.settings.slideDistance);
                            a = parseInt(a, 10) + (a > 0 ? 1 : -1);
                            var r = this.slidesOrder[e.inArray(this.selectedSlideIndex, this.slidesOrder) - a];
                            this.settings.loop === !0 ? this.gotoSlide(r) : "undefined" != typeof r ? this.gotoSlide(r) : this._moveTo(o)
                        }
                    }
                },
                destroyTouchSwipe: function() {
                    this.$slidesMask.off(this.touchSwipeEvents.startEvent), this.$slidesMask.off(this.touchSwipeEvents.moveEvent), this.$slidesMask.off("dragstart." + i), e(document).off(this.touchSwipeEvents.endEvent), this.$slidesMask.removeClass("sp-grab")
                },
                touchSwipeDefaults: {
                    touchSwipe: !0,
                    touchSwipeThreshold: 50
                }
            };
        e.SliderPro.addModule("TouchSwipe", n)
    }(window, jQuery),
    function(t, e) {
        "use strict";
        var i = "Caption." + e.SliderPro.namespace,
            n = {
                $captionContainer: null,
                captionContent: "",
                initCaption: function() {
                    this.on("update." + i, e.proxy(this._captionOnUpdate, this)), this.on("gotoSlide." + i, e.proxy(this._updateCaptionContent, this))
                },
                _captionOnUpdate: function() {
                    this.$captionContainer = this.$slider.find(".sp-caption-container"), this.$slider.find(".sp-caption").length && 0 === this.$captionContainer.length && (this.$captionContainer = e('<div class="sp-caption-container"></div>').appendTo(this.$slider), this._updateCaptionContent()), this.$slides.find(".sp-caption").each(function() {
                        e(this).css("display", "none")
                    })
                },
                _updateCaptionContent: function() {
                    var t = this,
                        e = this.$slider.find(".sp-slide").eq(this.selectedSlideIndex).find(".sp-caption"),
                        i = 0 !== e.length ? e.html() : "";
                    this.settings.fadeCaption === !0 ? "" !== this.captionContent ? (0 === parseFloat(this.$captionContainer.css("opacity"), 10) && (this.$captionContainer.css(this.vendorPrefix + "transition", ""), this.$captionContainer.css("opacity", 1)), this._fadeCaptionTo(0, function() {
                        t.captionContent = i, "" !== i ? (t.$captionContainer.html(t.captionContent), t._fadeCaptionTo(1)) : t.$captionContainer.empty()
                    })) : (this.captionContent = i, this.$captionContainer.html(this.captionContent), this.$captionContainer.css("opacity", 0), this._fadeCaptionTo(1)) : (this.captionContent = i, this.$captionContainer.html(this.captionContent))
                },
                _fadeCaptionTo: function(t, e) {
                    var i = this;
                    "css-3d" === this.supportedAnimation || "css-2d" === this.supportedAnimation ? (setTimeout(function() {
                        var e = {
                            opacity: t
                        };
                        e[i.vendorPrefix + "transition"] = "opacity " + i.settings.captionFadeDuration / 1e3 + "s", i.$captionContainer.css(e)
                    }, 1), this.$captionContainer.on(this.transitionEvent, function(t) {
                        t.target === t.currentTarget && (i.$captionContainer.off(i.transitionEvent), i.$captionContainer.css(i.vendorPrefix + "transition", ""), "function" == typeof e && e())
                    })) : this.$captionContainer.stop().animate({
                        opacity: t
                    }, this.settings.captionFadeDuration, function() {
                        "function" == typeof e && e()
                    })
                },
                destroyCaption: function() {
                    this.off("update." + i), this.off("gotoSlide." + i), this.$captionContainer.remove(), this.$slider.find(".sp-caption").each(function() {
                        e(this).css("display", "")
                    })
                },
                captionDefaults: {
                    fadeCaption: !0,
                    captionFadeDuration: 500
                }
            };
        e.SliderPro.addModule("Caption", n)
    }(window, jQuery),
    function(t, e) {
        "use strict";
        var i = "DeepLinking." + e.SliderPro.namespace,
            n = {
                initDeepLinking: function() {
                    var n = this,
                        s = !0;
                    this.on("init." + i, function() {
                        n._gotoHash(t.location.hash)
                    }), this.on("gotoSlide." + i, function(e) {
                        if (s = !1, n.settings.updateHash === !0) {
                            var i = n.$slider.find(".sp-slide").eq(e.index).attr("id");
                            "undefined" == typeof i && (i = e.index), t.location.hash = n.$slider.attr("id") + "/" + i
                        }
                        s = !0
                    }), e(t).on("hashchange." + this.uniqueId + "." + i, function() {
                        s === !0 && n._gotoHash(t.location.hash)
                    })
                },
                _parseHash: function(t) {
                    if ("" !== t) {
                        t = t.substring(1);
                        var e = t.split("/"),
                            i = e.pop(),
                            n = t.slice(0, -i.toString().length - 1);
                        if (this.$slider.attr("id") === n) return {
                            sliderID: n,
                            slideId: i
                        }
                    }
                    return !1
                },
                _gotoHash: function(t) {
                    var e = this._parseHash(t);
                    if (e !== !1) {
                        var i = e.slideId,
                            n = parseInt(i, 10);
                        if (isNaN(n)) {
                            var s = this.$slider.find(".sp-slide#" + i).index(); - 1 !== s && this.gotoSlide(s)
                        } else this.gotoSlide(n)
                    }
                },
                destroyDeepLinking: function() {
                    this.off("init." + i), this.off("gotoSlide." + i), e(t).off("hashchange." + this.uniqueId + "." + i)
                },
                deepLinkingDefaults: {
                    updateHash: !1
                }
            };
        e.SliderPro.addModule("DeepLinking", n)
    }(window, jQuery),
    function(t, e) {
        "use strict";
        var i = "Autoplay." + e.SliderPro.namespace,
            n = {
                autoplayTimer: null,
                isTimerRunning: !1,
                isTimerPaused: !1,
                initAutoplay: function() {
                    this.on("update." + i, e.proxy(this._autoplayOnUpdate, this))
                },
                _autoplayOnUpdate: function() {
                    this.settings.autoplay === !0 ? (this.on("gotoSlide." + i, e.proxy(this._autoplayOnGotoSlide, this)), this.on("mouseenter." + i, e.proxy(this._autoplayOnMouseEnter, this)), this.on("mouseleave." + i, e.proxy(this._autoplayOnMouseLeave, this)), this.startAutoplay()) : (this.off("gotoSlide." + i), this.off("mouseenter." + i), this.off("mouseleave." + i), this.stopAutoplay())
                },
                _autoplayOnGotoSlide: function() {
                    this.isTimerRunning === !0 && this.stopAutoplay(), this.isTimerPaused === !1 && this.startAutoplay()
                },
                _autoplayOnMouseEnter: function() {
                    !this.isTimerRunning || "pause" !== this.settings.autoplayOnHover && "stop" !== this.settings.autoplayOnHover || (this.stopAutoplay(), this.isTimerPaused = !0)
                },
                _autoplayOnMouseLeave: function() {
                    this.settings.autoplay === !0 && this.isTimerRunning === !1 && "stop" !== this.settings.autoplayOnHover && (this.startAutoplay(), this.isTimerPaused = !1)
                },
                startAutoplay: function() {
                    var t = this;
                    this.isTimerRunning = !0, this.autoplayTimer = setTimeout(function() {
                        "normal" === t.settings.autoplayDirection ? t.nextSlide() : "backwards" === t.settings.autoplayDirection && t.previousSlide()
                    }, this.settings.autoplayDelay)
                },
                stopAutoplay: function() {
                    this.isTimerRunning = !1, this.isTimerPaused = !1, clearTimeout(this.autoplayTimer)
                },
                destroyAutoplay: function() {
                    clearTimeout(this.autoplayTimer), this.off("update." + i), this.off("gotoSlide." + i), this.off("mouseenter." + i), this.off("mouseleave." + i)
                },
                autoplayDefaults: {
                    autoplay: !0,
                    autoplayDelay: 5e3,
                    autoplayDirection: "normal",
                    autoplayOnHover: "pause"
                }
            };
        e.SliderPro.addModule("Autoplay", n)
    }(window, jQuery),
    function(t, e) {
        "use strict";
        var i = "Keyboard." + e.SliderPro.namespace,
            n = {
                initKeyboard: function() {
                    var t = this,
                        n = !1;
                    this.settings.keyboard !== !1 && (this.$slider.on("focus." + i, function() {
                        n = !0
                    }), this.$slider.on("blur." + i, function() {
                        n = !1
                    }), e(document).on("keydown." + this.uniqueId + "." + i, function(e) {
                        (t.settings.keyboardOnlyOnFocus !== !0 || n !== !1) && (37 === e.which ? t.previousSlide() : 39 === e.which ? t.nextSlide() : 13 === e.which && t.$slider.find(".sp-slide").eq(t.selectedSlideIndex).find(".sp-image-container a")[0].click())
                    }))
                },
                destroyKeyboard: function() {
                    this.$slider.off("focus." + i), this.$slider.off("blur." + i), e(document).off("keydown." + this.uniqueId + "." + i)
                },
                keyboardDefaults: {
                    keyboard: !0,
                    keyboardOnlyOnFocus: !1
                }
            };
        e.SliderPro.addModule("Keyboard", n)
    }(window, jQuery),
    function(t, e) {
        "use strict";
        var i = "FullScreen." + e.SliderPro.namespace,
            n = {
                isFullScreen: !1,
                $fullScreenButton: null,
                sizeBeforeFullScreen: {},
                initFullScreen: function() {
                    (document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled) && this.on("update." + i, e.proxy(this._fullScreenOnUpdate, this))
                },
                _fullScreenOnUpdate: function() {
                    this.settings.fullScreen === !0 && null === this.$fullScreenButton ? this._addFullScreen() : this.settings.fullScreen === !1 && null !== this.$fullScreenButton && this._removeFullScreen(), this.settings.fullScreen === !0 && (this.settings.fadeFullScreen === !0 ? this.$fullScreenButton.addClass("sp-fade-full-screen") : this.settings.fadeFullScreen === !1 && this.$fullScreenButton.removeClass("sp-fade-full-screen"))
                },
                _addFullScreen: function() {
                    this.$fullScreenButton = e('<div class="sp-full-screen-button"></div>').appendTo(this.$slider), this.$fullScreenButton.on("click." + i, e.proxy(this._onFullScreenButtonClick, this)), document.addEventListener("fullscreenchange", e.proxy(this._onFullScreenChange, this)), document.addEventListener("mozfullscreenchange", e.proxy(this._onFullScreenChange, this)), document.addEventListener("webkitfullscreenchange", e.proxy(this._onFullScreenChange, this)), document.addEventListener("MSFullscreenChange", e.proxy(this._onFullScreenChange, this))
                },
                _removeFullScreen: function() {
                    null !== this.$fullScreenButton && (this.$fullScreenButton.off("click." + i), this.$fullScreenButton.remove(), this.$fullScreenButton = null, document.removeEventListener("fullscreenchange", this._onFullScreenChange), document.removeEventListener("mozfullscreenchange", this._onFullScreenChange), document.removeEventListener("webkitfullscreenchange", this._onFullScreenChange), document.removeEventListener("MSFullscreenChange", this._onFullScreenChange))
                },
                _onFullScreenButtonClick: function() {
                    this.isFullScreen === !1 ? this.instance.requestFullScreen ? this.instance.requestFullScreen() : this.instance.mozRequestFullScreen ? this.instance.mozRequestFullScreen() : this.instance.webkitRequestFullScreen ? this.instance.webkitRequestFullScreen() : this.instance.msRequestFullscreen && this.instance.msRequestFullscreen() : document.exitFullScreen ? document.exitFullScreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitCancelFullScreen ? document.webkitCancelFullScreen() : document.msExitFullscreen && document.msExitFullscreen()
                },
                _onFullScreenChange: function() {
                    this.isFullScreen = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement ? !0 : !1, this.isFullScreen === !0 ? (this.sizeBeforeFullScreen = {
                        forceSize: this.settings.forceSize,
                        autoHeight: this.settings.autoHeight
                    }, this.$slider.addClass("sp-full-screen"), this.settings.forceSize = "fullWindow", this.settings.autoHeight = !1) : (this.$slider.css("margin", ""), this.$slider.removeClass("sp-full-screen"), this.settings.forceSize = this.sizeBeforeFullScreen.forceSize, this.settings.autoHeight = this.sizeBeforeFullScreen.autoHeight), this.resize()
                },
                destroyFullScreen: function() {
                    this.off("update." + i), this._removeFullScreen()
                },
                fullScreenDefaults: {
                    fullScreen: !1,
                    fadeFullScreen: !0
                }
            };
        e.SliderPro.addModule("FullScreen", n)
    }(window, jQuery),
    function(t, e) {
        "use strict";
        var i = "Buttons." + e.SliderPro.namespace,
            n = {
                $buttons: null,
                initButtons: function() {
                    this.on("update." + i, e.proxy(this._buttonsOnUpdate, this))
                },
                _buttonsOnUpdate: function() {
                    this.$buttons = this.$slider.find(".sp-buttons"), this.settings.buttons === !0 && this.getTotalSlides() > 1 && 0 === this.$buttons.length ? this._createButtons() : this.settings.buttons === !0 && this.getTotalSlides() !== this.$buttons.find(".sp-button").length && 0 !== this.$buttons.length ? this._adjustButtons() : (this.settings.buttons === !1 || this.getTotalSlides() <= 1 && 0 !== this.$buttons.length) && this._removeButtons()
                },
                _createButtons: function() {
                    var t = this;
                    this.$buttons = e('<div class="sp-buttons"></div>').appendTo(this.$slider);
                    for (var n = 0; n < this.getTotalSlides(); n++) e('<div class="sp-button"></div>').appendTo(this.$buttons);
                    this.$buttons.on("click." + i, ".sp-button", function() {
                        t.gotoSlide(e(this).index())
                    }), this.$buttons.find(".sp-button").eq(this.selectedSlideIndex).addClass("sp-selected-button"), this.on("gotoSlide." + i, function(e) {
                        t.$buttons.find(".sp-selected-button").removeClass("sp-selected-button"), t.$buttons.find(".sp-button").eq(e.index).addClass("sp-selected-button")
                    }), this.$slider.addClass("sp-has-buttons")
                },
                _adjustButtons: function() {
                    this.$buttons.empty();
                    for (var t = 0; t < this.getTotalSlides(); t++) e('<div class="sp-button"></div>').appendTo(this.$buttons);
                    this.$buttons.find(".sp-selected-button").removeClass("sp-selected-button"), this.$buttons.find(".sp-button").eq(this.selectedSlideIndex).addClass("sp-selected-button")
                },
                _removeButtons: function() {
                    this.$buttons.off("click." + i, ".sp-button"), this.off("gotoSlide." + i), this.$buttons.remove(), this.$slider.removeClass("sp-has-buttons")
                },
                destroyButtons: function() {
                    this._removeButtons(), this.off("update." + i)
                },
                buttonsDefaults: {
                    buttons: !0
                }
            };
        e.SliderPro.addModule("Buttons", n)
    }(window, jQuery),
    function(t, e) {
        "use strict";
        var i = "Arrows." + e.SliderPro.namespace,
            n = {
                $arrows: null,
                $previousArrow: null,
                $nextArrow: null,
                initArrows: function() {
                    this.on("update." + i, e.proxy(this._arrowsOnUpdate, this)), this.on("gotoSlide." + i, e.proxy(this._checkArrowsVisibility, this))
                },
                _arrowsOnUpdate: function() {
                    var t = this;
                    this.settings.arrows === !0 && null === this.$arrows ? (this.$arrows = e('<div class="sp-arrows"></div>').appendTo(this.$slidesContainer), this.$previousArrow = e('<div class="sp-arrow sp-previous-arrow"></div>').appendTo(this.$arrows), this.$nextArrow = e('<div class="sp-arrow sp-next-arrow"></div>').appendTo(this.$arrows), this.$previousArrow.on("click." + i, function() {
                        t.previousSlide()
                    }), this.$nextArrow.on("click." + i, function() {
                        t.nextSlide()
                    }), this._checkArrowsVisibility()) : this.settings.arrows === !1 && null !== this.$arrows && this._removeArrows(), this.settings.arrows === !0 && (this.settings.fadeArrows === !0 ? this.$arrows.addClass("sp-fade-arrows") : this.settings.fadeArrows === !1 && this.$arrows.removeClass("sp-fade-arrows"))
                },
                _checkArrowsVisibility: function() {
                    this.settings.arrows !== !1 && this.settings.loop !== !0 && (0 === this.selectedSlideIndex ? this.$previousArrow.css("display", "none") : this.$previousArrow.css("display", "block"), this.selectedSlideIndex === this.getTotalSlides() - 1 ? this.$nextArrow.css("display", "none") : this.$nextArrow.css("display", "block"))
                },
                _removeArrows: function() {
                    null !== this.$arrows && (this.$previousArrow.off("click." + i), this.$nextArrow.off("click." + i), this.$arrows.remove(), this.$arrows = null)
                },
                destroyArrows: function() {
                    this._removeArrows(), this.off("update." + i), this.off("gotoSlide." + i)
                },
                arrowsDefaults: {
                    arrows: !1,
                    fadeArrows: !0
                }
            };
        e.SliderPro.addModule("Arrows", n)
    }(window, jQuery),
    function(t, e) {
        "use strict";
        var i = "ThumbnailTouchSwipe." + e.SliderPro.namespace,
            n = {
                thumbnailTouchStartPoint: {
                    x: 0,
                    y: 0
                },
                thumbnailTouchEndPoint: {
                    x: 0,
                    y: 0
                },
                thumbnailTouchDistance: {
                    x: 0,
                    y: 0
                },
                thumbnailTouchStartPosition: 0,
                isThumbnailTouchMoving: !1,
                isThumbnailTouchSwipe: !1,
                thumbnailTouchSwipeEvents: {
                    startEvent: "",
                    moveEvent: "",
                    endEvent: ""
                },
                initThumbnailTouchSwipe: function() {
                    this.on("update." + i, e.proxy(this._thumbnailTouchSwipeOnUpdate, this))
                },
                _thumbnailTouchSwipeOnUpdate: function() {
                    this.isThumbnailScroller !== !1 && (this.settings.thumbnailTouchSwipe === !0 && this.isThumbnailTouchSwipe === !1 && (this.isThumbnailTouchSwipe = !0, this.thumbnailTouchSwipeEvents.startEvent = "touchstart." + i + " mousedown." + i, this.thumbnailTouchSwipeEvents.moveEvent = "touchmove." + i + " mousemove." + i, this.thumbnailTouchSwipeEvents.endEvent = "touchend." + this.uniqueId + "." + i + " mouseup." + this.uniqueId + "." + i, this.$thumbnails.on(this.thumbnailTouchSwipeEvents.startEvent, e.proxy(this._onThumbnailTouchStart, this)), this.$thumbnails.on("dragstart." + i, function(t) {
                        t.preventDefault()
                    }), this.$thumbnails.addClass("sp-grab")), e.each(this.thumbnails, function(t, e) {
                        e.off("thumbnailClick")
                    }))
                },
                _onThumbnailTouchStart: function(t) {
                    if (!(e(t.target).closest(".sp-selectable").length >= 1)) {
                        var n = "undefined" != typeof t.originalEvent.touches ? t.originalEvent.touches[0] : t.originalEvent;
                        "undefined" == typeof t.originalEvent.touches && t.preventDefault(), e(t.target).parents(".sp-thumbnail-container").find("a").one("click." + i, function(t) {
                            t.preventDefault()
                        }), this.thumbnailTouchStartPoint.x = n.pageX || n.clientX, this.thumbnailTouchStartPoint.y = n.pageY || n.clientY, this.thumbnailTouchStartPosition = this.thumbnailsPosition, this.thumbnailTouchDistance.x = this.thumbnailTouchDistance.y = 0, this.$thumbnails.hasClass("sp-animated") && (this.isThumbnailTouchMoving = !0, this._stopThumbnailsMovement(), this.thumbnailTouchStartPosition = this.thumbnailsPosition), this.$thumbnails.on(this.thumbnailTouchSwipeEvents.moveEvent, e.proxy(this._onThumbnailTouchMove, this)), e(document).on(this.thumbnailTouchSwipeEvents.endEvent, e.proxy(this._onThumbnailTouchEnd, this)), this.$thumbnails.removeClass("sp-grab").addClass("sp-grabbing"), this.$thumbnailsContainer.addClass("sp-swiping")
                    }
                },
                _onThumbnailTouchMove: function(t) {
                    var e = "undefined" != typeof t.originalEvent.touches ? t.originalEvent.touches[0] : t.originalEvent;
                    this.isThumbnailTouchMoving = !0, this.thumbnailTouchEndPoint.x = e.pageX || e.clientX, this.thumbnailTouchEndPoint.y = e.pageY || e.clientY, this.thumbnailTouchDistance.x = this.thumbnailTouchEndPoint.x - this.thumbnailTouchStartPoint.x, this.thumbnailTouchDistance.y = this.thumbnailTouchEndPoint.y - this.thumbnailTouchStartPoint.y;
                    var i = "horizontal" === this.thumbnailsOrientation ? this.thumbnailTouchDistance.x : this.thumbnailTouchDistance.y,
                        n = "horizontal" === this.thumbnailsOrientation ? this.thumbnailTouchDistance.y : this.thumbnailTouchDistance.x;
                    if (Math.abs(i) > Math.abs(n)) {
                        if (t.preventDefault(), this.thumbnailsPosition >= 0) {
                            var s = -this.thumbnailTouchStartPosition;
                            i = s + .2 * (i - s)
                        } else if (this.thumbnailsPosition <= -this.thumbnailsSize + this.thumbnailsContainerSize) {
                            var o = this.thumbnailsSize - this.thumbnailsContainerSize + this.thumbnailTouchStartPosition;
                            i = -o + .2 * (i + o)
                        }
                        this._moveThumbnailsTo(this.thumbnailTouchStartPosition + i, !0)
                    }
                },
                _onThumbnailTouchEnd: function(t) {
                    {
                        var n = this;
                        "horizontal" === this.thumbnailsOrientation ? this.thumbnailTouchDistance.x : this.thumbnailTouchDistance.y
                    }
                    if (this.$thumbnails.off(this.thumbnailTouchSwipeEvents.moveEvent), e(document).off(this.thumbnailTouchSwipeEvents.endEvent), this.$thumbnails.removeClass("sp-grabbing").addClass("sp-grab"), this.isThumbnailTouchMoving === !1 || this.isThumbnailTouchMoving === !0 && Math.abs(this.thumbnailTouchDistance.x) < 10 && Math.abs(this.thumbnailTouchDistance.y) < 10) {
                        var s = e(t.target).hasClass("sp-thumbnail-container") ? e(t.target) : e(t.target).parents(".sp-thumbnail-container"),
                            o = s.index();
                        return void(0 !== e(t.target).parents("a").length ? (e(t.target).parents("a").off("click." + i), this.$thumbnailsContainer.removeClass("sp-swiping")) : o !== this.selectedThumbnailIndex && -1 !== o && this.gotoSlide(o))
                    }
                    this.isThumbnailTouchMoving = !1, e(t.target).parents(".sp-thumbnail").one("click", function(t) {
                        t.preventDefault()
                    }), setTimeout(function() {
                        n.$thumbnailsContainer.removeClass("sp-swiping")
                    }, 1), this.thumbnailsPosition > 0 ? this._moveThumbnailsTo(0) : this.thumbnailsPosition < this.thumbnailsContainerSize - this.thumbnailsSize && this._moveThumbnailsTo(this.thumbnailsContainerSize - this.thumbnailsSize), this.trigger({
                        type: "thumbnailsMoveComplete"
                    }), e.isFunction(this.settings.thumbnailsMoveComplete) && this.settings.thumbnailsMoveComplete.call(this, {
                        type: "thumbnailsMoveComplete"
                    })
                },
                destroyThumbnailTouchSwipe: function() {
                    this.off("update." + i), this.isThumbnailScroller !== !1 && (this.$thumbnails.off(this.thumbnailTouchSwipeEvents.startEvent), this.$thumbnails.off(this.thumbnailTouchSwipeEvents.moveEvent), this.$thumbnails.off("dragstart." + i), e(document).off(this.thumbnailTouchSwipeEvents.endEvent), this.$thumbnails.removeClass("sp-grab"))
                },
                thumbnailTouchSwipeDefaults: {
                    thumbnailTouchSwipe: !0
                }
            };
        e.SliderPro.addModule("ThumbnailTouchSwipe", n)
    }(window, jQuery),
    function(t, e) {
        "use strict";
        var i = "ThumbnailArrows." + e.SliderPro.namespace,
            n = {
                $thumbnailArrows: null,
                $previousThumbnailArrow: null,
                $nextThumbnailArrow: null,
                initThumbnailArrows: function() {
                    var t = this;
                    this.on("update." + i, e.proxy(this._thumbnailArrowsOnUpdate, this)), this.on("sliderResize." + i + " thumbnailsMoveComplete." + i, function() {
                        t.isThumbnailScroller === !0 && t.settings.thumbnailArrows === !0 && t._checkThumbnailArrowsVisibility()
                    })
                },
                _thumbnailArrowsOnUpdate: function() {
                    var t = this;
                    this.isThumbnailScroller !== !1 && (this.settings.thumbnailArrows === !0 && null === this.$thumbnailArrows ? (this.$thumbnailArrows = e('<div class="sp-thumbnail-arrows"></div>').appendTo(this.$thumbnailsContainer), this.$previousThumbnailArrow = e('<div class="sp-thumbnail-arrow sp-previous-thumbnail-arrow"></div>').appendTo(this.$thumbnailArrows), this.$nextThumbnailArrow = e('<div class="sp-thumbnail-arrow sp-next-thumbnail-arrow"></div>').appendTo(this.$thumbnailArrows), this.$previousThumbnailArrow.on("click." + i, function() {
                        var e = Math.min(0, t.thumbnailsPosition + t.thumbnailsContainerSize);
                        t._moveThumbnailsTo(e)
                    }), this.$nextThumbnailArrow.on("click." + i, function() {
                        var e = Math.max(t.thumbnailsContainerSize - t.thumbnailsSize, t.thumbnailsPosition - t.thumbnailsContainerSize);
                        t._moveThumbnailsTo(e)
                    })) : this.settings.thumbnailArrows === !1 && null !== this.$thumbnailArrows && this._removeThumbnailArrows(), this.settings.thumbnailArrows === !0 && (this.settings.fadeThumbnailArrows === !0 ? this.$thumbnailArrows.addClass("sp-fade-thumbnail-arrows") : this.settings.fadeThumbnailArrows === !1 && this.$thumbnailArrows.removeClass("sp-fade-thumbnail-arrows"), this._checkThumbnailArrowsVisibility()))
                },
                _checkThumbnailArrowsVisibility: function() {
                    0 === this.thumbnailsPosition ? this.$previousThumbnailArrow.css("display", "none") : this.$previousThumbnailArrow.css("display", "block"), this.thumbnailsPosition === this.thumbnailsContainerSize - this.thumbnailsSize ? this.$nextThumbnailArrow.css("display", "none") : this.$nextThumbnailArrow.css("display", "block")
                },
                _removeThumbnailArrows: function() {
                    null !== this.$thumbnailArrows && (this.$previousThumbnailArrow.off("click." + i), this.$nextThumbnailArrow.off("click." + i), this.$thumbnailArrows.remove(), this.$thumbnailArrows = null)
                },
                destroyThumbnailArrows: function() {
                    this._removeThumbnailArrows(), this.off("update." + i), this.off("sliderResize." + i), this.off("thumbnailsMoveComplete." + i)
                },
                thumbnailArrowsDefaults: {
                    thumbnailArrows: !1,
                    fadeThumbnailArrows: !0
                }
            };
        e.SliderPro.addModule("ThumbnailArrows", n)
    }(window, jQuery),
    function(t, e) {
        "use strict";
        var i = "Video." + e.SliderPro.namespace,
            n = {
                initVideo: function() {
                    this.on("update." + i, e.proxy(this._videoOnUpdate, this)), this.on("gotoSlideComplete." + i, e.proxy(this._videoOnGotoSlideComplete, this))
                },
                _videoOnUpdate: function() {
                    var t = this;
                    this.$slider.find(".sp-video").not("a, [data-video-init]").each(function() {
                        var i = e(this);
                        t._initVideo(i)
                    }), this.$slider.find("a.sp-video").not("[data-video-preinit]").each(function() {
                        var i = e(this);
                        t._preinitVideo(i)
                    })
                },
                _initVideo: function(t) {
                    var n = this;
                    t.attr("data-video-init", !0).videoController(), t.on("videoPlay." + i, function() {
                        "stopAutoplay" === n.settings.playVideoAction && "undefined" != typeof n.stopAutoplay && (n.stopAutoplay(), n.settings.autoplay = !1);
                        var i = {
                            type: "videoPlay",
                            video: t
                        };
                        n.trigger(i), e.isFunction(n.settings.videoPlay) && n.settings.videoPlay.call(n, i)
                    }), t.on("videoPause." + i, function() {
                        "startAutoplay" === n.settings.pauseVideoAction && "undefined" != typeof n.startAutoplay && (n.startAutoplay(), n.settings.autoplay = !0);
                        var i = {
                            type: "videoPause",
                            video: t
                        };
                        n.trigger(i), e.isFunction(n.settings.videoPause) && n.settings.videoPause.call(n, i)
                    }), t.on("videoEnded." + i, function() {
                        "startAutoplay" === n.settings.endVideoAction && "undefined" != typeof n.startAutoplay ? (n.startAutoplay(), n.settings.autoplay = !0) : "nextSlide" === n.settings.endVideoAction ? n.nextSlide() : "replayVideo" === n.settings.endVideoAction && t.videoController("replay");
                        var i = {
                            type: "videoEnd",
                            video: t
                        };
                        n.trigger(i), e.isFunction(n.settings.videoEnd) && n.settings.videoEnd.call(n, i)
                    })
                },
                _preinitVideo: function(t) {
                    var n = this;
                    t.attr("data-video-preinit", !0), t.on("click." + i, function(i) {
                        if (!n.$slider.hasClass("sp-swiping")) {
                            i.preventDefault();
                            var s, o, a, r, l, h, d, c = t.attr("href"),
                                u = t.children("img").attr("width"),
                                p = t.children("img").attr("height"); - 1 !== c.indexOf("youtube") || -1 !== c.indexOf("youtu.be") ? o = "youtube" : -1 !== c.indexOf("vimeo") && (o = "vimeo"), a = "youtube" === o ? /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/ : /http:\/\/(www\.)?vimeo.com\/(\d+)/, r = c.match(a), l = r[2], h = "youtube" === o ? "http://www.youtube.com/embed/" + l + "?enablejsapi=1&wmode=opaque" : "http://player.vimeo.com/video/" + l + "?api=1", d = c.split("?")[1], "undefined" != typeof d && (d = d.split("&"), e.each(d, function(t, e) {
                                -1 === e.indexOf(l) && (h += "&" + e)
                            })), s = e("<iframe></iframe>").attr({
                                src: h,
                                width: u,
                                height: p,
                                "class": t.attr("class"),
                                frameborder: 0
                            }).insertBefore(t), n._initVideo(s), s.videoController("play"), t.css("display", "none")
                        }
                    })
                },
                _videoOnGotoSlideComplete: function(t) {
                    var e = this.$slides.find(".sp-slide").eq(t.previousIndex).find(".sp-video[data-video-init]");
                    if (-1 !== t.previousIndex && 0 !== e.length && ("stopVideo" === this.settings.leaveVideoAction ? e.videoController("stop") : "pauseVideo" === this.settings.leaveVideoAction ? e.videoController("pause") : "removeVideo" === this.settings.leaveVideoAction && (0 !== e.siblings("a.sp-video").length ? (e.siblings("a.sp-video").css("display", ""), e.videoController("destroy"), e.remove()) : e.videoController("stop"))), "playVideo" === this.settings.reachVideoAction) {
                        var n = this.$slides.find(".sp-slide").eq(t.index).find(".sp-video[data-video-init]"),
                            s = this.$slides.find(".sp-slide").eq(t.index).find(".sp-video[data-video-preinit]");
                        0 !== n.length ? n.videoController("play") : 0 !== s.length && s.trigger("click." + i)
                    }
                },
                destroyVideo: function() {
                    this.$slider.find(".sp-video[ data-video-preinit ]").each(function() {
                        var t = e(this);
                        t.removeAttr("data-video-preinit"), t.off("click." + i)
                    }), this.$slider.find(".sp-video[ data-video-init ]").each(function() {
                        var t = e(this);
                        t.removeAttr("data-video-init"), t.off("Video"), t.videoController("destroy")
                    }), this.off("update." + i), this.off("gotoSlideComplete." + i)
                },
                videoDefaults: {
                    reachVideoAction: "none",
                    leaveVideoAction: "pauseVideo",
                    playVideoAction: "stopAutoplay",
                    pauseVideoAction: "none",
                    endVideoAction: "none",
                    videoPlay: function() {},
                    videoPause: function() {},
                    videoEnd: function() {}
                }
            };
        e.SliderPro.addModule("Video", n)
    }(window, jQuery),
    function(t) {
        "use strict";
        var e = window.navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? !0 : !1,
            i = function(e, i) {
                this.$video = t(e), this.options = i, this.settings = {}, this.player = null, this._init()
            };
        i.prototype = {
            _init: function() {
                this.settings = t.extend({}, this.defaults, this.options);
                var e = this,
                    i = t.VideoController.players,
                    n = this.$video.attr("id");
                for (var s in i)
                    if ("undefined" != typeof i[s] && i[s].isType(this.$video)) {
                        this.player = new i[s](this.$video);
                        break
                    }
                if (null !== this.player) {
                    var o = ["ready", "start", "play", "pause", "ended"];
                    t.each(o, function(i, s) {
                        var o = "video" + s.charAt(0).toUpperCase() + s.slice(1);
                        e.player.on(s, function() {
                            e.trigger({
                                type: o,
                                video: n
                            }), t.isFunction(e.settings[o]) && e.settings[o].call(e, {
                                type: o,
                                video: n
                            })
                        })
                    })
                }
            },
            play: function() {
                e === !0 && this.player.isStarted() === !1 || "playing" === this.player.getState() || this.player.play()
            },
            stop: function() {
                e === !0 && this.player.isStarted() === !1 || "stopped" === this.player.getState() || this.player.stop()
            },
            pause: function() {
                e === !0 && this.player.isStarted() === !1 || "paused" === this.player.getState() || this.player.pause()
            },
            replay: function() {
                (e !== !0 || this.player.isStarted() !== !1) && this.player.replay()
            },
            on: function(t, e) {
                return this.$video.on(t, e)
            },
            off: function(t) {
                return this.$video.off(t)
            },
            trigger: function(t) {
                return this.$video.triggerHandler(t)
            },
            destroy: function() {
                this.player.isStarted() === !0 && this.stop(), this.player.off("ready"), this.player.off("start"), this.player.off("play"), this.player.off("pause"), this.player.off("ended"), this.$video.removeData("videoController")
            },
            defaults: {
                videoReady: function() {},
                videoStart: function() {},
                videoPlay: function() {},
                videoPause: function() {},
                videoEnded: function() {}
            }
        }, t.VideoController = {
            players: {},
            addPlayer: function(t, e) {
                this.players[t] = e
            }
        }, t.fn.videoController = function(e) {
            var n = Array.prototype.slice.call(arguments, 1);
            return this.each(function() {
                if ("undefined" == typeof t(this).data("videoController")) {
                    var s = new i(this, e);
                    t(this).data("videoController", s)
                } else if ("undefined" != typeof e) {
                    var o = t(this).data("videoController");
                    "function" == typeof o[e] ? o[e].apply(o, n) : t.error(e + " does not exist in videoController.")
                }
            })
        };
        var n = function(e) {
            this.$video = e, this.player = null, this.ready = !1, this.started = !1, this.state = "", this.events = t({}), this._init()
        };
        n.prototype = {
            _init: function() {},
            play: function() {},
            pause: function() {},
            stop: function() {},
            replay: function() {},
            isType: function() {},
            isReady: function() {
                return this.ready
            },
            isStarted: function() {
                return this.started
            },
            getState: function() {
                return this.state
            },
            on: function(t, e) {
                return this.events.on(t, e)
            },
            off: function(t) {
                return this.events.off(t)
            },
            trigger: function(t) {
                return this.events.triggerHandler(t)
            }
        };
        var s = {
                youtubeAPIAdded: !1,
                youtubeVideos: []
            },
            o = function(e) {
                this.init = !1;
                var i = window.YT && window.YT.Player;
                if ("undefined" != typeof i) n.call(this, e);
                else if (s.youtubeVideos.push({
                        video: e,
                        scope: this
                    }), s.youtubeAPIAdded === !1) {
                    s.youtubeAPIAdded = !0;
                    var o = document.createElement("script");
                    o.src = "http://www.youtube.com/player_api";
                    var a = document.getElementsByTagName("script")[0];
                    a.parentNode.insertBefore(o, a), window.onYouTubePlayerAPIReady = function() {
                        t.each(s.youtubeVideos, function(t, e) {
                            n.call(e.scope, e.video)
                        })
                    }
                }
            };
        o.prototype = new n, o.prototype.constructor = o, t.VideoController.addPlayer("YoutubeVideo", o), o.isType = function(t) {
            if (t.is("iframe")) {
                var e = t.attr("src");
                if (-1 !== e.indexOf("youtube.com") || -1 !== e.indexOf("youtu.be")) return !0
            }
            return !1
        }, o.prototype._init = function() {
            this.init = !0, this._setup()
        }, o.prototype._setup = function() {
            var t = this;
            this.player = new YT.Player(this.$video[0], {
                events: {
                    onReady: function() {
                        t.trigger({
                            type: "ready"
                        }), t.ready = !0
                    },
                    onStateChange: function(e) {
                        switch (e.data) {
                            case YT.PlayerState.PLAYING:
                                t.started === !1 && (t.started = !0, t.trigger({
                                    type: "start"
                                })), t.state = "playing", t.trigger({
                                    type: "play"
                                });
                                break;
                            case YT.PlayerState.PAUSED:
                                t.state = "paused", t.trigger({
                                    type: "pause"
                                });
                                break;
                            case YT.PlayerState.ENDED:
                                t.state = "ended", t.trigger({
                                    type: "ended"
                                })
                        }
                    }
                }
            })
        }, o.prototype.play = function() {
            var t = this;
            if (this.ready === !0) this.player.playVideo();
            else var e = setInterval(function() {
                t.ready === !0 && (clearInterval(e), t.player.playVideo())
            }, 100)
        }, o.prototype.pause = function() {
            e === !0 ? this.stop() : this.player.pauseVideo()
        }, o.prototype.stop = function() {
            this.player.seekTo(1), this.player.stopVideo(), this.state = "stopped"
        }, o.prototype.replay = function() {
            this.player.seekTo(1), this.player.playVideo()
        }, o.prototype.on = function(t, e) {
            var i = this;
            if (this.init === !0) n.prototype.on.call(this, t, e);
            else var s = setInterval(function() {
                i.init === !0 && (clearInterval(s), n.prototype.on.call(i, t, e))
            }, 100)
        };
        var a = {
                vimeoAPIAdded: !1,
                vimeoVideos: []
            },
            r = function(e) {
                if (this.init = !1, "undefined" != typeof window.Froogaloop) n.call(this, e);
                else if (a.vimeoVideos.push({
                        video: e,
                        scope: this
                    }), a.vimeoAPIAdded === !1) {
                    a.vimeoAPIAdded = !0;
                    var i = document.createElement("script");
                    i.src = "http://a.vimeocdn.com/js/froogaloop2.min.js";
                    var s = document.getElementsByTagName("script")[0];
                    s.parentNode.insertBefore(i, s);
                    var o = setInterval(function() {
                        "undefined" != typeof window.Froogaloop && (clearInterval(o), t.each(a.vimeoVideos, function(t, e) {
                            n.call(e.scope, e.video)
                        }))
                    }, 100)
                }
            };
        r.prototype = new n, r.prototype.constructor = r, t.VideoController.addPlayer("VimeoVideo", r), r.isType = function(t) {
            if (t.is("iframe")) {
                var e = t.attr("src");
                if (-1 !== e.indexOf("vimeo.com")) return !0
            }
            return !1
        }, r.prototype._init = function() {
            this.init = !0, this._setup()
        }, r.prototype._setup = function() {
            var t = this;
            this.player = $f(this.$video[0]), this.player.addEvent("ready", function() {
                t.ready = !0, t.trigger({
                    type: "ready"
                }), t.player.addEvent("play", function() {
                    t.started === !1 && (t.started = !0, t.trigger({
                        type: "start"
                    })), t.state = "playing", t.trigger({
                        type: "play"
                    })
                }), t.player.addEvent("pause", function() {
                    t.state = "paused", t.trigger({
                        type: "pause"
                    })
                }), t.player.addEvent("finish", function() {
                    t.state = "ended", t.trigger({
                        type: "ended"
                    })
                })
            })
        }, r.prototype.play = function() {
            var t = this;
            if (this.ready === !0) this.player.api("play");
            else var e = setInterval(function() {
                t.ready === !0 && (clearInterval(e), t.player.api("play"))
            }, 100)
        }, r.prototype.pause = function() {
            this.player.api("pause")
        }, r.prototype.stop = function() {
            this.player.api("seekTo", 0), this.player.api("pause"), this.state = "stopped"
        }, r.prototype.replay = function() {
            this.player.api("seekTo", 0), this.player.api("play")
        }, r.prototype.on = function(t, e) {
            var i = this;
            if (this.init === !0) n.prototype.on.call(this, t, e);
            else var s = setInterval(function() {
                i.init === !0 && (clearInterval(s), n.prototype.on.call(i, t, e))
            }, 100)
        };
        var l = function(t) {
            n.call(this, t)
        };
        l.prototype = new n, l.prototype.constructor = l, t.VideoController.addPlayer("HTML5Video", l), l.isType = function(t) {
            return t.is("video") && t.hasClass("video-js") === !1 && t.hasClass("sublime") === !1 ? !0 : !1
        }, l.prototype._init = function() {
            var t = this;
            this.player = this.$video[0], this.ready = !0, this.player.addEventListener("play", function() {
                t.started === !1 && (t.started = !0, t.trigger({
                    type: "start"
                })), t.state = "playing", t.trigger({
                    type: "play"
                })
            }), this.player.addEventListener("pause", function() {
                t.state = "paused", t.trigger({
                    type: "pause"
                })
            }), this.player.addEventListener("ended", function() {
                t.state = "ended", t.trigger({
                    type: "ended"
                })
            })
        }, l.prototype.play = function() {
            this.player.play()
        }, l.prototype.pause = function() {
            this.player.pause()
        }, l.prototype.stop = function() {
            this.player.currentTime = 0, this.player.pause(), this.state = "stopped"
        }, l.prototype.replay = function() {
            this.player.currentTime = 0, this.player.play()
        };
        var h = function(t) {
            n.call(this, t)
        };
        h.prototype = new n, h.prototype.constructor = h, t.VideoController.addPlayer("VideoJSVideo", h), h.isType = function(t) {
            return "undefined" == typeof t.attr("data-videojs-id") && !t.hasClass("video-js") || "undefined" == typeof videojs ? !1 : !0
        }, h.prototype._init = function() {
            var t = this,
                e = this.$video.attr(this.$video.hasClass("video-js") ? "id" : "data-videojs-id");
            this.player = videojs(e), this.player.ready(function() {
                t.ready = !0, t.trigger({
                    type: "ready"
                }), t.player.on("play", function() {
                    t.started === !1 && (t.started = !0, t.trigger({
                        type: "start"
                    })), t.state = "playing", t.trigger({
                        type: "play"
                    })
                }), t.player.on("pause", function() {
                    t.state = "paused", t.trigger({
                        type: "pause"
                    })
                }), t.player.on("ended", function() {
                    t.state = "ended", t.trigger({
                        type: "ended"
                    })
                })
            })
        }, h.prototype.play = function() {
            this.player.play()
        }, h.prototype.pause = function() {
            this.player.pause()
        }, h.prototype.stop = function() {
            this.player.currentTime(0), this.player.pause(), this.state = "stopped"
        }, h.prototype.replay = function() {
            this.player.currentTime(0), this.player.play()
        };
        var d = function(t) {
            n.call(this, t)
        };
        d.prototype = new n, d.prototype.constructor = d, t.VideoController.addPlayer("SublimeVideo", d), d.isType = function(t) {
            return t.hasClass("sublime") && "undefined" != typeof sublime ? !0 : !1
        }, d.prototype._init = function() {
            var t = this;
            sublime.ready(function() {
                t.player = sublime.player(t.$video.attr("id")), t.ready = !0, t.trigger({
                    type: "ready"
                }), t.player.on("play", function() {
                    t.started === !1 && (t.started = !0, t.trigger({
                        type: "start"
                    })), t.state = "playing", t.trigger({
                        type: "play"
                    })
                }), t.player.on("pause", function() {
                    t.state = "paused", t.trigger({
                        type: "pause"
                    })
                }), t.player.on("stop", function() {
                    t.state = "stopped", t.trigger({
                        type: "stop"
                    })
                }), t.player.on("end", function() {
                    t.state = "ended", t.trigger({
                        type: "ended"
                    })
                })
            })
        }, d.prototype.play = function() {
            this.player.play()
        }, d.prototype.pause = function() {
            this.player.pause()
        }, d.prototype.stop = function() {
            this.player.stop()
        }, d.prototype.replay = function() {
            this.player.stop(), this.player.play()
        };
        var c = function(t) {
            n.call(this, t)
        };
        c.prototype = new n, c.prototype.constructor = c, t.VideoController.addPlayer("JWPlayerVideo", c), c.isType = function(t) {
            return "undefined" == typeof t.attr("data-jwplayer-id") && !t.hasClass("jwplayer") && 0 === t.find("object[data*='jwplayer']").length || "undefined" == typeof jwplayer ? !1 : !0
        }, c.prototype._init = function() {
            var t, e = this;
            this.$video.hasClass("jwplayer") ? t = this.$video.attr("id") : "undefined" != typeof this.$video.attr("data-jwplayer-id") ? t = this.$video.attr("data-jwplayer-id") : 0 !== this.$video.find("object[data*='jwplayer']").length && (t = this.$video.find("object").attr("id")), this.player = jwplayer(t), this.player.onReady(function() {
                e.ready = !0, e.trigger({
                    type: "ready"
                }), e.player.onPlay(function() {
                    e.started === !1 && (e.started = !0, e.trigger({
                        type: "start"
                    })), e.state = "playing", e.trigger({
                        type: "play"
                    })
                }), e.player.onPause(function() {
                    e.state = "paused", e.trigger({
                        type: "pause"
                    })
                }), e.player.onComplete(function() {
                    e.state = "ended", e.trigger({
                        type: "ended"
                    })
                })
            })
        }, c.prototype.play = function() {
            this.player.play(!0)
        }, c.prototype.pause = function() {
            this.player.pause(!0)
        }, c.prototype.stop = function() {
            this.player.stop(), this.state = "stopped"
        }, c.prototype.replay = function() {
            this.player.seek(0), this.player.play(!0)
        }
    }(jQuery),
    function(t, e) {
        "use strict";
        var i = "ThumbnailsNc." + e.SliderPro.namespace,
            n = {
                $thumbnailsNc: null,
                $thumbnailsNcContainer: null,
                thumbnailsNc: null,
                selectedThumbnailNcIndex: 0,
                thumbnailsNcSize: 0,
                thumbnailsNcContainerSize: 0,
                thumbnailsNcPositionProperty: null,
                initThumbnailsNc: function() {
                    var t = this;
                    this.thumbnailsNc = [], this.on("update." + i, e.proxy(this._thumbnailsOnUpdateNc, this)), this.on("gotoSlide." + i, function(e) {
                        t._gotoThumbnailNc(e.index)
                    })
                },
                _thumbnailsOnUpdateNc: function() {
                    var t = this;
                    if (null === this.$thumbnailsNcContainer && (this.$thumbnailsNcContainer = e('<div class="sp-nc-thumbnails-container"></div>').insertAfter(this.$slidesContainer)), null === this.$thumbnailsNc)
                        if (0 !== this.$slider.find(".sp-nc-thumbnails").length) {
                            if (this.$thumbnailsNc = this.$slider.find(".sp-nc-thumbnails").appendTo(this.$thumbnailsNcContainer), this.settings.shuffle === !0) {
                                var i = this.$thumbnailsNc.find(".sp-nc-thumbnail"),
                                    n = [];
                                e.each(this.shuffledIndexes, function(t, s) {
                                    var o = e(i[s]);
                                    0 !== o.parent("a").length && (o = o.parent("a")), n.push(o)
                                }), this.$thumbnailsNc.empty().append(n)
                            }
                        } else this.$thumbnailsNc = e('<div class="sp-nc-thumbnails"></div>').appendTo(this.$thumbnailsNcContainer);
                    this.$slides.find(".sp-nc-thumbnail").each(function() {
                        var i = e(this),
                            n = i.parents(".sp-slide").index(),
                            s = t.$thumbnailsNc.find(".sp-nc-thumbnail").length - 1;
                        0 !== i.parent("a").length && (i = i.parent("a")), n > s ? i.appendTo(t.$thumbnailsNc) : i.insertBefore(t.$thumbnailsNc.find(".sp-nc-thumbnail").eq(n))
                    });
                    for (var s = this.thumbnailsNc.length - 1; s >= 0; s--)
                        if (0 === this.$thumbnailsNc.find('.sp-nc-thumbnail[data-index="' + s + '"]').length) {
                            var o = this.thumbnailsNc[s];
                            o.destroy(), this.thumbnailsNc.splice(s, 1)
                        }
                    this.$thumbnailsNc.find(".sp-nc-thumbnail").each(function(i) {
                        var n = e(this);
                        "undefined" == typeof n.attr("data-init") ? t._createThumbnailNc(n, i) : t.thumbnailsNc[i].setIndexNc(i)
                    }), this.settings.thumbnailPointer === !0 ? this.$thumbnailsNcContainer.addClass("sp-has-pointer") : this.$thumbnailsNcContainer.removeClass("sp-has-pointer"), this.selectedThumbnailNcIndex = this.selectedSlideIndex, this.$thumbnailsNc.find(".sp-nc-thumbnail-container").eq(this.selectedThumbnailNcIndex).addClass("sp-nc-selected-thumbnail"), this.thumbnailsNcSize = 0, e.each(this.thumbnailsNc, function(e, i) {
                        i.setSizeNc(t.settings.thumbnailWidth, t.settings.thumbnailHeight)
                    })
                },
                _createThumbnailNc: function(t, e) {
                    var n = this,
                        o = new s(t, this.$thumbnailsNc, e);
                    o.on("thumbnailClick." + i, function(t) {
                        n.gotoSlide(t.index)
                    }), this.thumbnailsNc.splice(e, 0, o)
                },
                _gotoThumbnailNc: function(t) {
                    this.selectedThumbnailNcIndex;
                    this.selectedThumbnailNcIndex = t, this.$thumbnailsNc.find(".sp-nc-selected-thumbnail").removeClass("sp-nc-selected-thumbnail"), this.$thumbnailsNc.find(".sp-nc-thumbnail-container").eq(this.selectedThumbnailNcIndex).addClass("sp-nc-selected-thumbnail"), this.trigger({
                        type: "gotoThumbnail"
                    }), e.isFunction(this.settings.gotoThumbnail) && this.settings.gotoThumbnail.call(this, {
                        type: "gotoThumbnail"
                    })
                },
                thumbnailsNcDefaults: {
                    thumbnailWidth: 100,
                    thumbnailHeight: 80,
                    thumbnailPointer: !1,
                    gotoThumbnail: function() {}
                }
            },
            s = function(t, e, i) {
                this.$thumbnail = t, this.$thumbnailsNc = e, this.$thumbnailContainer = null, this.width = 0, this.height = 0, this.isImageLoaded = !1, this.setIndexNc(i), this._init()
            };
        s.prototype = {
            _init: function() {
                var t = this;
                this.$thumbnail.attr("data-init", !0), this.$thumbnailContainer = e('<div class="sp-nc-thumbnail-container"></div>').appendTo(this.$thumbnailsNc), this.$thumbnail.appendTo(this.$thumbnailContainer), this.$thumbnailContainer.on("click." + i, function() {
                    t.trigger({
                        type: "thumbnailClick." + i,
                        index: t.index
                    })
                })
            },
            setSizeNc: function(t, e) {
                this.width = t, this.height = e, this.$thumbnailContainer.css({
                    width: this.width,
                    height: this.height
                }), this.$thumbnail.is("img") && "undefined" == typeof this.$thumbnail.attr("data-src") && this.resizeImageNc()
            },
            getSizeNc: function() {
                return {
                    width: this.$thumbnailContainer.outerWidth(!0),
                    height: this.$thumbnailContainer.outerHeight(!0)
                }
            },
            setIndexNc: function(t) {
                this.index = t, this.$thumbnail.attr("data-index", this.index)
            },
            resizeImageNc: function() {
                var t = this;
                if (this.isImageLoaded === !1) return void SliderProUtils.checkImagesComplete(this.$thumbnailContainer, function() {
                    t.isImageLoaded = !0, t.resizeImageNc()
                });
                this.$thumbnail = this.$thumbnailContainer.find(".sp-nc-thumbnail");
                var e = this.$thumbnail.width(),
                    i = this.$thumbnail.height();
                this.$thumbnail.css(e / i <= this.width / this.height ? {
                    width: "100%",
                    height: "auto"
                } : {
                    width: "auto",
                    height: "100%"
                })
            },
            on: function(t, e) {
                return this.$thumbnailContainer.on(t, e)
            },
            off: function(t) {
                return this.$thumbnailContainer.off(t)
            },
            trigger: function(t) {
                return this.$thumbnailContainer.triggerHandler(t)
            }
        }, e.SliderPro.addModule("ThumbnailsNc", n)
    }(window, jQuery),
    function(t) {
        t.fn.extend({
            leanerModal: function(e) {
                function i(e) {
                    t(e).removeClass("active"), t("#lean_overlay").fadeOut(), t(e).css({
                        display: "none"
                    })
                }
                var n = {
                        overlay: .5,
                        closeButton: ".modal_close"
                    },
                    s = t('<div id="lean_overlay"></div>');
                return t("#lean_overlay").length || t("body").append(s), e = t.extend(n, e), this.each(function() {
                    var n = e;
                    t(this).live("click", function() {
                        var e = n.id;
                        t("#lean_overlay").live("click", function() {
                            i(e)
                        }), t(n.closeButton).live("click", function() {
                            i(e)
                        });
                        var s = (t(e).outerHeight(), t(e).outerWidth());
                        return t("#lean_overlay").css({
                            display: "block",
                            opacity: 0
                        }), t("#lean_overlay").stop(!0, !0).fadeTo(200, n.overlay), t(e).css({
                            display: "block",
                            position: "fixed",
                            opacity: 0,
                            "z-index": 11e3,
                            left: "50%",
                            "margin-left": -(s / 2) + "px"
                        }), t(e).stop(!0, !0).fadeTo(200, 1).addClass("active"), !1
                    })
                })
            }
        })
    }(jQuery),
    function(t, e, i, n) {
        function s(e, i) {
            this.settings = null, this.options = t.extend({}, s.Defaults, i), this.$element = t(e), this.drag = t.extend({}, u), this.state = t.extend({}, p), this.e = t.extend({}, f), this._plugins = {}, this._supress = {}, this._current = null, this._speed = null, this._coordinates = [], this._breakpoint = null, this._width = null, this._items = [], this._clones = [], this._mergers = [], this._invalidated = {}, this._pipe = [], t.each(s.Plugins, t.proxy(function(t, e) {
                this._plugins[t[0].toLowerCase() + t.slice(1)] = new e(this)
            }, this)), t.each(s.Pipe, t.proxy(function(e, i) {
                this._pipe.push({
                    filter: i.filter,
                    run: t.proxy(i.run, this)
                })
            }, this)), this.setup(), this.initialize()
        }

        function o(t) {
            if (t.touches !== n) return {
                x: t.touches[0].pageX,
                y: t.touches[0].pageY
            };
            if (t.touches === n) {
                if (t.pageX !== n) return {
                    x: t.pageX,
                    y: t.pageY
                };
                if (t.pageX === n) return {
                    x: t.clientX,
                    y: t.clientY
                }
            }
        }

        function a(t) {
            var e, n, s = i.createElement("div"),
                o = t;
            for (e in o)
                if (n = o[e], "undefined" != typeof s.style[n]) return s = null, [n, e];
            return [!1]
        }

        function r() {
            return a(["transition", "WebkitTransition", "MozTransition", "OTransition"])[1]
        }

        function l() {
            return a(["transform", "WebkitTransform", "MozTransform", "OTransform", "msTransform"])[0]
        }

        function h() {
            return a(["perspective", "webkitPerspective", "MozPerspective", "OPerspective", "MsPerspective"])[0]
        }

        function d() {
            return "ontouchstart" in e || !!navigator.msMaxTouchPoints
        }

        function c() {
            return e.navigator.msPointerEnabled
        }
        var u, p, f;
        u = {
            start: 0,
            startX: 0,
            startY: 0,
            current: 0,
            currentX: 0,
            currentY: 0,
            offsetX: 0,
            offsetY: 0,
            distance: null,
            startTime: 0,
            endTime: 0,
            updatedX: 0,
            targetEl: null
        }, p = {
            isTouch: !1,
            isScrolling: !1,
            isSwiping: !1,
            direction: !1,
            inMotion: !1
        }, f = {
            _onDragStart: null,
            _onDragMove: null,
            _onDragEnd: null,
            _transitionEnd: null,
            _resizer: null,
            _responsiveCall: null,
            _goToLoop: null,
            _checkVisibile: null
        }, s.Defaults = {
            items: 3,
            loop: !1,
            center: !1,
            mouseDrag: !0,
            touchDrag: !0,
            pullDrag: !0,
            freeDrag: !1,
            margin: 0,
            stagePadding: 0,
            merge: !1,
            mergeFit: !0,
            autoWidth: !1,
            startPosition: 0,
            rtl: !1,
            smartSpeed: 250,
            fluidSpeed: !1,
            dragEndSpeed: !1,
            responsive: {},
            responsiveRefreshRate: 200,
            responsiveBaseElement: e,
            responsiveClass: !1,
            fallbackEasing: "swing",
            info: !1,
            nestedItemSelector: !1,
            itemElement: "div",
            stageElement: "div",
            themeClass: "owl-theme",
            baseClass: "owl-carousel",
            itemClass: "owl-item",
            centerClass: "center",
            activeClass: "active"
        }, s.Width = {
            Default: "default",
            Inner: "inner",
            Outer: "outer"
        }, s.Plugins = {}, s.Pipe = [{
            filter: ["width", "items", "settings"],
            run: function(t) {
                t.current = this._items && this._items[this.relative(this._current)]
            }
        }, {
            filter: ["items", "settings"],
            run: function() {
                var t = this._clones,
                    e = this.$stage.children(".cloned");
                (e.length !== t.length || !this.settings.loop && t.length > 0) && (this.$stage.children(".cloned").remove(), this._clones = [])
            }
        }, {
            filter: ["items", "settings"],
            run: function() {
                var t, e, i = this._clones,
                    n = this._items,
                    s = this.settings.loop ? i.length - Math.max(2 * this.settings.items, 4) : 0;
                for (t = 0, e = Math.abs(s / 2); e > t; t++) s > 0 ? (this.$stage.children().eq(n.length + i.length - 1).remove(), i.pop(), this.$stage.children().eq(0).remove(), i.pop()) : (i.push(i.length / 2), this.$stage.append(n[i[i.length - 1]].clone().addClass("cloned")), i.push(n.length - 1 - (i.length - 1) / 2), this.$stage.prepend(n[i[i.length - 1]].clone().addClass("cloned")))
            }
        }, {
            filter: ["width", "items", "settings"],
            run: function() {
                var t, e, i, n = this.settings.rtl ? 1 : -1,
                    s = (this.width() / this.settings.items).toFixed(3),
                    o = 0;
                for (this._coordinates = [], e = 0, i = this._clones.length + this._items.length; i > e; e++) t = this._mergers[this.relative(e)], t = this.settings.mergeFit && Math.min(t, this.settings.items) || t, o += (this.settings.autoWidth ? this._items[this.relative(e)].width() + this.settings.margin : s * t) * n, this._coordinates.push(o)
            }
        }, {
            filter: ["width", "items", "settings"],
            run: function() {
                var e, i, n = (this.width() / this.settings.items).toFixed(3),
                    s = {
                        width: Math.abs(this._coordinates[this._coordinates.length - 1]) + 2 * this.settings.stagePadding,
                        "padding-left": this.settings.stagePadding || "",
                        "padding-right": this.settings.stagePadding || ""
                    };
                if (this.$stage.css(s), s = {
                        width: this.settings.autoWidth ? "auto" : n - this.settings.margin
                    }, s[this.settings.rtl ? "margin-left" : "margin-right"] = this.settings.margin, !this.settings.autoWidth && t.grep(this._mergers, function(t) {
                        return t > 1
                    }).length > 0)
                    for (e = 0, i = this._coordinates.length; i > e; e++) s.width = Math.abs(this._coordinates[e]) - Math.abs(this._coordinates[e - 1] || 0) - this.settings.margin, this.$stage.children().eq(e).css(s);
                else this.$stage.children().css(s)
            }
        }, {
            filter: ["width", "items", "settings"],
            run: function(t) {
                t.current && this.reset(this.$stage.children().index(t.current))
            }
        }, {
            filter: ["position"],
            run: function() {
                this.animate(this.coordinates(this._current))
            }
        }, {
            filter: ["width", "position", "items", "settings"],
            run: function() {
                var t, e, i, n, s = this.settings.rtl ? 1 : -1,
                    o = 2 * this.settings.stagePadding,
                    a = this.coordinates(this.current()) + o,
                    r = a + this.width() * s,
                    l = [];
                for (i = 0, n = this._coordinates.length; n > i; i++) t = this._coordinates[i - 1] || 0, e = Math.abs(this._coordinates[i]) + o * s, (this.op(t, "<=", a) && this.op(t, ">", r) || this.op(e, "<", a) && this.op(e, ">", r)) && l.push(i);
                this.$stage.children("." + this.settings.activeClass).removeClass(this.settings.activeClass), this.$stage.children(":eq(" + l.join("), :eq(") + ")").addClass(this.settings.activeClass), this.settings.center && (this.$stage.children("." + this.settings.centerClass).removeClass(this.settings.centerClass), this.$stage.children().eq(this.current()).addClass(this.settings.centerClass))
            }
        }], s.prototype.initialize = function() {
            if (this.trigger("initialize"), this.$element.addClass(this.settings.baseClass).addClass(this.settings.themeClass).toggleClass("owl-rtl", this.settings.rtl), this.browserSupport(), this.settings.autoWidth && this.state.imagesLoaded !== !0) {
                var e, i, s;
                if (e = this.$element.find("img"), i = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : n, s = this.$element.children(i).width(), e.length && 0 >= s) return this.preloadAutoWidthImages(e), !1
            }
            this.$element.addClass("owl-loading"), this.$stage = t("<" + this.settings.stageElement + ' class="owl-stage"/>').wrap('<div class="owl-stage-outer">'), this.$element.append(this.$stage.parent()), this.replace(this.$element.children().not(this.$stage.parent())), this._width = this.$element.width(), this.refresh(), this.$element.removeClass("owl-loading").addClass("owl-loaded"), this.eventsCall(), this.internalEvents(), this.addTriggerableEvents(), this.trigger("initialized")
        }, s.prototype.setup = function() {
            var e = this.viewport(),
                i = this.options.responsive,
                n = -1,
                s = null;
            i ? (t.each(i, function(t) {
                e >= t && t > n && (n = Number(t))
            }), s = t.extend({}, this.options, i[n]), delete s.responsive, s.responsiveClass && this.$element.attr("class", function(t, e) {
                return e.replace(/\b owl-responsive-\S+/g, "")
            }).addClass("owl-responsive-" + n)) : s = t.extend({}, this.options), (null === this.settings || this._breakpoint !== n) && (this.trigger("change", {
                property: {
                    name: "settings",
                    value: s
                }
            }), this._breakpoint = n, this.settings = s, this.invalidate("settings"), this.trigger("changed", {
                property: {
                    name: "settings",
                    value: this.settings
                }
            }))
        }, s.prototype.optionsLogic = function() {
            this.$element.toggleClass("owl-center", this.settings.center), this.settings.loop && this._items.length < this.settings.items && (this.settings.loop = !1), this.settings.autoWidth && (this.settings.stagePadding = !1, this.settings.merge = !1)
        }, s.prototype.prepare = function(e) {
            var i = this.trigger("prepare", {
                content: e
            });
            return i.data || (i.data = t("<" + this.settings.itemElement + "/>").addClass(this.settings.itemClass).append(e)), this.trigger("prepared", {
                content: i.data
            }), i.data
        }, s.prototype.update = function() {
            for (var e = 0, i = this._pipe.length, n = t.proxy(function(t) {
                    return this[t]
                }, this._invalidated), s = {}; i > e;)(this._invalidated.all || t.grep(this._pipe[e].filter, n).length > 0) && this._pipe[e].run(s), e++;
            this._invalidated = {}
        }, s.prototype.width = function(t) {
            switch (t = t || s.Width.Default) {
                case s.Width.Inner:
                case s.Width.Outer:
                    return this._width;
                default:
                    return this._width - 2 * this.settings.stagePadding + this.settings.margin
            }
        }, s.prototype.refresh = function() {
            if (0 === this._items.length) return !1;
            (new Date).getTime();
            this.trigger("refresh"), this.setup(), this.optionsLogic(), this.$stage.addClass("owl-refresh"), this.update(), this.$stage.removeClass("owl-refresh"), this.state.orientation = e.orientation, this.watchVisibility(), this.trigger("refreshed")
        }, s.prototype.eventsCall = function() {
            this.e._onDragStart = t.proxy(function(t) {
                this.onDragStart(t)
            }, this), this.e._onDragMove = t.proxy(function(t) {
                this.onDragMove(t)
            }, this), this.e._onDragEnd = t.proxy(function(t) {
                this.onDragEnd(t)
            }, this), this.e._onResize = t.proxy(function(t) {
                this.onResize(t)
            }, this), this.e._transitionEnd = t.proxy(function(t) {
                this.transitionEnd(t)
            }, this), this.e._preventClick = t.proxy(function(t) {
                this.preventClick(t)
            }, this)
        }, s.prototype.onThrottledResize = function() {
            e.clearTimeout(this.resizeTimer), this.resizeTimer = e.setTimeout(this.e._onResize, this.settings.responsiveRefreshRate)
        }, s.prototype.onResize = function() {
            return this._items.length ? this._width === this.$element.width() ? !1 : this.trigger("resize").isDefaultPrevented() ? !1 : (this._width = this.$element.width(), this.invalidate("width"), this.refresh(), void this.trigger("resized")) : !1
        }, s.prototype.eventsRouter = function(t) {
            var e = t.type;
            "mousedown" === e || "touchstart" === e ? this.onDragStart(t) : "mousemove" === e || "touchmove" === e ? this.onDragMove(t) : "mouseup" === e || "touchend" === e ? this.onDragEnd(t) : "touchcancel" === e && this.onDragEnd(t)
        }, s.prototype.internalEvents = function() {
            var i = (d(), c());
            this.settings.mouseDrag ? (this.$stage.on("mousedown", t.proxy(function(t) {
                this.eventsRouter(t)
            }, this)), this.$stage.on("dragstart", function() {
                return !1
            }), this.$stage.get(0).onselectstart = function() {
                return !1
            }) : this.$element.addClass("owl-text-select-on"), this.settings.touchDrag && !i && this.$stage.on("touchstart touchcancel", t.proxy(function(t) {
                this.eventsRouter(t)
            }, this)), this.transitionEndVendor && this.on(this.$stage.get(0), this.transitionEndVendor, this.e._transitionEnd, !1), this.settings.responsive !== !1 && this.on(e, "resize", t.proxy(this.onThrottledResize, this))
        }, s.prototype.onDragStart = function(n) {
            var s, a, r, l;
            if (s = n.originalEvent || n || e.event, 3 === s.which || this.state.isTouch) return !1;
            if ("mousedown" === s.type && this.$stage.addClass("owl-grab"), this.trigger("drag"), this.drag.startTime = (new Date).getTime(), this.speed(0), this.state.isTouch = !0, this.state.isScrolling = !1, this.state.isSwiping = !1, this.drag.distance = 0, a = o(s).x, r = o(s).y, this.drag.offsetX = this.$stage.position().left, this.drag.offsetY = this.$stage.position().top, this.settings.rtl && (this.drag.offsetX = this.$stage.position().left + this.$stage.width() - this.width() + this.settings.margin), this.state.inMotion && this.support3d) l = this.getTransformProperty(), this.drag.offsetX = l, this.animate(l), this.state.inMotion = !0;
            else if (this.state.inMotion && !this.support3d) return this.state.inMotion = !1, !1;
            this.drag.startX = a - this.drag.offsetX, this.drag.startY = r - this.drag.offsetY, this.drag.start = a - this.drag.startX, this.drag.targetEl = s.target || s.srcElement, this.drag.updatedX = this.drag.start, ("IMG" === this.drag.targetEl.tagName || "A" === this.drag.targetEl.tagName) && (this.drag.targetEl.draggable = !1), t(i).on("mousemove.owl.dragEvents mouseup.owl.dragEvents touchmove.owl.dragEvents touchend.owl.dragEvents", t.proxy(function(t) {
                this.eventsRouter(t)
            }, this))
        }, s.prototype.onDragMove = function(t) {
            var i, s, a, r, l, h;
            this.state.isTouch && (this.state.isScrolling || (i = t.originalEvent || t || e.event, s = o(i).x, a = o(i).y, this.drag.currentX = s - this.drag.startX, this.drag.currentY = a - this.drag.startY, this.drag.distance = this.drag.currentX - this.drag.offsetX, this.drag.distance < 0 ? this.state.direction = this.settings.rtl ? "right" : "left" : this.drag.distance > 0 && (this.state.direction = this.settings.rtl ? "left" : "right"), this.settings.loop ? this.op(this.drag.currentX, ">", this.coordinates(this.minimum())) && "right" === this.state.direction ? this.drag.currentX -= (this.settings.center && this.coordinates(0)) - this.coordinates(this._items.length) : this.op(this.drag.currentX, "<", this.coordinates(this.maximum())) && "left" === this.state.direction && (this.drag.currentX += (this.settings.center && this.coordinates(0)) - this.coordinates(this._items.length)) : (r = this.coordinates(this.settings.rtl ? this.maximum() : this.minimum()), l = this.coordinates(this.settings.rtl ? this.minimum() : this.maximum()), h = this.settings.pullDrag ? this.drag.distance / 5 : 0, this.drag.currentX = Math.max(Math.min(this.drag.currentX, r + h), l + h)), (this.drag.distance > 8 || this.drag.distance < -8) && (i.preventDefault !== n ? i.preventDefault() : i.returnValue = !1, this.state.isSwiping = !0), this.drag.updatedX = this.drag.currentX, (this.drag.currentY > 16 || this.drag.currentY < -16) && this.state.isSwiping === !1 && (this.state.isScrolling = !0, this.drag.updatedX = this.drag.start), this.animate(this.drag.updatedX)))
        }, s.prototype.onDragEnd = function(e) {
            var n, s, o;
            if (this.state.isTouch) {
                if ("mouseup" === e.type && this.$stage.removeClass("owl-grab"), this.trigger("dragged"), this.drag.targetEl.removeAttribute("draggable"), this.state.isTouch = !1, this.state.isScrolling = !1, this.state.isSwiping = !1, 0 === this.drag.distance && this.state.inMotion !== !0) return this.state.inMotion = !1, !1;
                this.drag.endTime = (new Date).getTime(), n = this.drag.endTime - this.drag.startTime, s = Math.abs(this.drag.distance), (s > 3 || n > 300) && this.removeClick(this.drag.targetEl), o = this.closest(this.drag.updatedX), this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed), this.current(o), this.invalidate("position"), this.update(), this.settings.pullDrag || this.drag.updatedX !== this.coordinates(o) || this.transitionEnd(), this.drag.distance = 0, t(i).off(".owl.dragEvents")
            }
        }, s.prototype.removeClick = function(i) {
            this.drag.targetEl = i, t(i).on("click.preventClick", this.e._preventClick), e.setTimeout(function() {
                t(i).off("click.preventClick")
            }, 300)
        }, s.prototype.preventClick = function(e) {
            e.preventDefault ? e.preventDefault() : e.returnValue = !1, e.stopPropagation && e.stopPropagation(), t(e.target).off("click.preventClick")
        }, s.prototype.getTransformProperty = function() {
            var t, i;
            return t = e.getComputedStyle(this.$stage.get(0), null).getPropertyValue(this.vendorName + "transform"), t = t.replace(/matrix(3d)?\(|\)/g, "").split(","), i = 16 === t.length, i !== !0 ? t[4] : t[12]
        }, s.prototype.closest = function(e) {
            var i = -1,
                n = 30,
                s = this.width(),
                o = this.coordinates();
            return this.settings.freeDrag || t.each(o, t.proxy(function(t, a) {
                return e > a - n && a + n > e ? i = t : this.op(e, "<", a) && this.op(e, ">", o[t + 1] || a - s) && (i = "left" === this.state.direction ? t + 1 : t), -1 === i
            }, this)), this.settings.loop || (this.op(e, ">", o[this.minimum()]) ? i = e = this.minimum() : this.op(e, "<", o[this.maximum()]) && (i = e = this.maximum())), i
        }, s.prototype.animate = function(e) {
            this.trigger("translate"), this.state.inMotion = this.speed() > 0, this.support3d ? this.$stage.css({
                transform: "translate3d(" + e + "px,0px, 0px)",
                transition: this.speed() / 1e3 + "s"
            }) : this.state.isTouch ? this.$stage.css({
                left: e + "px"
            }) : this.$stage.animate({
                left: e
            }, this.speed() / 1e3, this.settings.fallbackEasing, t.proxy(function() {
                this.state.inMotion && this.transitionEnd()
            }, this))
        }, s.prototype.current = function(t) {
            if (t === n) return this._current;
            if (0 === this._items.length) return n;
            if (t = this.normalize(t), this._current !== t) {
                var e = this.trigger("change", {
                    property: {
                        name: "position",
                        value: t
                    }
                });
                e.data !== n && (t = this.normalize(e.data)), this._current = t, this.invalidate("position"), this.trigger("changed", {
                    property: {
                        name: "position",
                        value: this._current
                    }
                })
            }
            return this._current
        }, s.prototype.invalidate = function(t) {
            this._invalidated[t] = !0
        }, s.prototype.reset = function(t) {
            t = this.normalize(t), t !== n && (this._speed = 0, this._current = t, this.suppress(["translate", "translated"]), this.animate(this.coordinates(t)), this.release(["translate", "translated"]))
        }, s.prototype.normalize = function(e, i) {
            var s = i ? this._items.length : this._items.length + this._clones.length;
            return !t.isNumeric(e) || 1 > s ? n : e = this._clones.length ? (e % s + s) % s : Math.max(this.minimum(i), Math.min(this.maximum(i), e))
        }, s.prototype.relative = function(t) {
            return t = this.normalize(t), t -= this._clones.length / 2, this.normalize(t, !0)
        }, s.prototype.maximum = function(t) {
            var e, i, n, s = 0,
                o = this.settings;
            if (t) return this._items.length - 1;
            if (!o.loop && o.center) e = this._items.length - 1;
            else if (o.loop || o.center)
                if (o.loop || o.center) e = this._items.length + o.items;
                else {
                    if (!o.autoWidth && !o.merge) throw "Can not detect maximum absolute position.";
                    for (revert = o.rtl ? 1 : -1, i = this.$stage.width() - this.$element.width();
                        (n = this.coordinates(s)) && !(n * revert >= i);) e = ++s
                } else e = this._items.length - o.items;
            return e
        }, s.prototype.minimum = function(t) {
            return t ? 0 : this._clones.length / 2
        }, s.prototype.items = function(t) {
            return t === n ? this._items.slice() : (t = this.normalize(t, !0), this._items[t])
        }, s.prototype.mergers = function(t) {
            return t === n ? this._mergers.slice() : (t = this.normalize(t, !0), this._mergers[t])
        }, s.prototype.clones = function(e) {
            var i = this._clones.length / 2,
                s = i + this._items.length,
                o = function(t) {
                    return t % 2 === 0 ? s + t / 2 : i - (t + 1) / 2
                };
            return e === n ? t.map(this._clones, function(t, e) {
                return o(e)
            }) : t.map(this._clones, function(t, i) {
                return t === e ? o(i) : null
            })
        }, s.prototype.speed = function(t) {
            return t !== n && (this._speed = t), this._speed
        }, s.prototype.coordinates = function(e) {
            var i = null;
            return e === n ? t.map(this._coordinates, t.proxy(function(t, e) {
                return this.coordinates(e)
            }, this)) : (this.settings.center ? (i = this._coordinates[e], i += (this.width() - i + (this._coordinates[e - 1] || 0)) / 2 * (this.settings.rtl ? -1 : 1)) : i = this._coordinates[e - 1] || 0, i)
        }, s.prototype.duration = function(t, e, i) {
            return Math.min(Math.max(Math.abs(e - t), 1), 6) * Math.abs(i || this.settings.smartSpeed)
        }, s.prototype.to = function(i, n) {
            if (this.settings.loop) {
                var s = i - this.relative(this.current()),
                    o = this.current(),
                    a = this.current(),
                    r = this.current() + s,
                    l = 0 > a - r ? !0 : !1,
                    h = this._clones.length + this._items.length;
                r < this.settings.items && l === !1 ? (o = a + this._items.length, this.reset(o)) : r >= h - this.settings.items && l === !0 && (o = a - this._items.length, this.reset(o)), e.clearTimeout(this.e._goToLoop), this.e._goToLoop = e.setTimeout(t.proxy(function() {
                    this.speed(this.duration(this.current(), o + s, n)), this.current(o + s), this.update()
                }, this), 30)
            } else this.speed(this.duration(this.current(), i, n)), this.current(i), this.update()
        }, s.prototype.next = function(t) {
            t = t || !1, this.to(this.relative(this.current()) + 1, t)
        }, s.prototype.prev = function(t) {
            t = t || !1, this.to(this.relative(this.current()) - 1, t)
        }, s.prototype.transitionEnd = function(t) {
            return t !== n && (t.stopPropagation(), (t.target || t.srcElement || t.originalTarget) !== this.$stage.get(0)) ? !1 : (this.state.inMotion = !1, void this.trigger("translated"))
        }, s.prototype.viewport = function() {
            var n;
            if (this.options.responsiveBaseElement !== e) n = t(this.options.responsiveBaseElement).width();
            else if (e.innerWidth) n = e.innerWidth;
            else {
                if (!i.documentElement || !i.documentElement.clientWidth) throw "Can not detect viewport width.";
                n = i.documentElement.clientWidth
            }
            return n
        }, s.prototype.replace = function(e) {
            this.$stage.empty(), this._items = [], e && (e = e instanceof jQuery ? e : t(e)), this.settings.nestedItemSelector && (e = e.find("." + this.settings.nestedItemSelector)), e.filter(function() {
                return 1 === this.nodeType
            }).each(t.proxy(function(t, e) {
                e = this.prepare(e), this.$stage.append(e), this._items.push(e), this._mergers.push(1 * e.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)
            }, this)), this.reset(t.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0), this.invalidate("items")
        }, s.prototype.add = function(t, e) {
            e = e === n ? this._items.length : this.normalize(e, !0), this.trigger("add", {
                content: t,
                position: e
            }), 0 === this._items.length || e === this._items.length ? (this.$stage.append(t), this._items.push(t), this._mergers.push(1 * t.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)) : (this._items[e].before(t), this._items.splice(e, 0, t), this._mergers.splice(e, 0, 1 * t.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)), this.invalidate("items"), this.trigger("added", {
                content: t,
                position: e
            })
        }, s.prototype.remove = function(t) {
            t = this.normalize(t, !0), t !== n && (this.trigger("remove", {
                content: this._items[t],
                position: t
            }), this._items[t].remove(), this._items.splice(t, 1), this._mergers.splice(t, 1), this.invalidate("items"), this.trigger("removed", {
                content: null,
                position: t
            }))
        }, s.prototype.addTriggerableEvents = function() {
            var e = t.proxy(function(e, i) {
                return t.proxy(function(t) {
                    t.relatedTarget !== this && (this.suppress([i]), e.apply(this, [].slice.call(arguments, 1)), this.release([i]))
                }, this)
            }, this);
            t.each({
                next: this.next,
                prev: this.prev,
                to: this.to,
                destroy: this.destroy,
                refresh: this.refresh,
                replace: this.replace,
                add: this.add,
                remove: this.remove
            }, t.proxy(function(t, i) {
                this.$element.on(t + ".owl.carousel", e(i, t + ".owl.carousel"))
            }, this))
        }, s.prototype.watchVisibility = function() {
            function i(t) {
                return t.offsetWidth > 0 && t.offsetHeight > 0
            }

            function n() {
                i(this.$element.get(0)) && (this.$element.removeClass("owl-hidden"), this.refresh(), e.clearInterval(this.e._checkVisibile))
            }
            i(this.$element.get(0)) || (this.$element.addClass("owl-hidden"), e.clearInterval(this.e._checkVisibile), this.e._checkVisibile = e.setInterval(t.proxy(n, this), 500))
        }, s.prototype.preloadAutoWidthImages = function(e) {
            var i, n, s, o;
            i = 0, n = this, e.each(function(a, r) {
                s = t(r), o = new Image, o.onload = function() {
                    i++, s.attr("src", o.src), s.css("opacity", 1), i >= e.length && (n.state.imagesLoaded = !0, n.initialize())
                }, o.src = s.attr("src") || s.attr("data-src") || s.attr("data-src-retina")
            })
        }, s.prototype.destroy = function() {
            this.$element.hasClass(this.settings.themeClass) && this.$element.removeClass(this.settings.themeClass), this.settings.responsive !== !1 && t(e).off("resize.owl.carousel"), this.transitionEndVendor && this.off(this.$stage.get(0), this.transitionEndVendor, this.e._transitionEnd);
            for (var n in this._plugins) this._plugins[n].destroy();
            (this.settings.mouseDrag || this.settings.touchDrag) && (this.$stage.off("mousedown touchstart touchcancel"), t(i).off(".owl.dragEvents"), this.$stage.get(0).onselectstart = function() {}, this.$stage.off("dragstart", function() {
                return !1
            })), this.$element.off(".owl"), this.$stage.children(".cloned").remove(), this.e = null, this.$element.removeData("owlCarousel"), this.$stage.children().contents().unwrap(), this.$stage.children().unwrap(), this.$stage.unwrap()
        }, s.prototype.op = function(t, e, i) {
            var n = this.settings.rtl;
            switch (e) {
                case "<":
                    return n ? t > i : i > t;
                case ">":
                    return n ? i > t : t > i;
                case ">=":
                    return n ? i >= t : t >= i;
                case "<=":
                    return n ? t >= i : i >= t
            }
        }, s.prototype.on = function(t, e, i, n) {
            t.addEventListener ? t.addEventListener(e, i, n) : t.attachEvent && t.attachEvent("on" + e, i)
        }, s.prototype.off = function(t, e, i, n) {
            t.removeEventListener ? t.removeEventListener(e, i, n) : t.detachEvent && t.detachEvent("on" + e, i)
        }, s.prototype.trigger = function(e, i, n) {
            var s = {
                    item: {
                        count: this._items.length,
                        index: this.current()
                    }
                },
                o = t.camelCase(t.grep(["on", e, n], function(t) {
                    return t
                }).join("-").toLowerCase()),
                a = t.Event([e, "owl", n || "carousel"].join(".").toLowerCase(), t.extend({
                    relatedTarget: this
                }, s, i));
            return this._supress[e] || (t.each(this._plugins, function(t, e) {
                e.onTrigger && e.onTrigger(a)
            }), this.$element.trigger(a), this.settings && "function" == typeof this.settings[o] && this.settings[o].apply(this, a)), a
        }, s.prototype.suppress = function(e) {
            t.each(e, t.proxy(function(t, e) {
                this._supress[e] = !0
            }, this))
        }, s.prototype.release = function(e) {
            t.each(e, t.proxy(function(t, e) {
                delete this._supress[e]
            }, this))
        }, s.prototype.browserSupport = function() {
            if (this.support3d = h(), this.support3d) {
                this.transformVendor = l();
                var t = ["transitionend", "webkitTransitionEnd", "transitionend", "oTransitionEnd"];
                this.transitionEndVendor = t[r()], this.vendorName = this.transformVendor.replace(/Transform/i, ""), this.vendorName = "" !== this.vendorName ? "-" + this.vendorName.toLowerCase() + "-" : ""
            }
            this.state.orientation = e.orientation
        }, t.fn.owlCarousel = function(e) {
            return this.each(function() {
                t(this).data("owlCarousel") || t(this).data("owlCarousel", new s(this, e))
            })
        }, t.fn.owlCarousel.Constructor = s
    }(window.Zepto || window.jQuery, window, document),
    function(t, e) {
        var i = function(e) {
            this._core = e, this._loaded = [], this._handlers = {
                "initialized.owl.carousel change.owl.carousel": t.proxy(function(e) {
                    if (e.namespace && this._core.settings && this._core.settings.lazyLoad && (e.property && "position" == e.property.name || "initialized" == e.type))
                        for (var i = this._core.settings, n = i.center && Math.ceil(i.items / 2) || i.items, s = i.center && -1 * n || 0, o = (e.property && e.property.value || this._core.current()) + s, a = this._core.clones().length, r = t.proxy(function(t, e) {
                                this.load(e)
                            }, this); s++ < n;) this.load(a / 2 + this._core.relative(o)), a && t.each(this._core.clones(this._core.relative(o++)), r)
                }, this)
            }, this._core.options = t.extend({}, i.Defaults, this._core.options), this._core.$element.on(this._handlers)
        };
        i.Defaults = {
            lazyLoad: !1
        }, i.prototype.load = function(i) {
            var n = this._core.$stage.children().eq(i),
                s = n && n.find(".owl-lazy");
            !s || t.inArray(n.get(0), this._loaded) > -1 || (s.each(t.proxy(function(i, n) {
                var s, o = t(n),
                    a = e.devicePixelRatio > 1 && o.attr("data-src-retina") || o.attr("data-src");
                this._core.trigger("load", {
                    element: o,
                    url: a
                }, "lazy"), o.is("img") ? o.one("load.owl.lazy", t.proxy(function() {
                    o.css("opacity", 1), this._core.trigger("loaded", {
                        element: o,
                        url: a
                    }, "lazy")
                }, this)).attr("src", a) : (s = new Image, s.onload = t.proxy(function() {
                    o.css({
                        "background-image": "url(" + a + ")",
                        opacity: "1"
                    }), this._core.trigger("loaded", {
                        element: o,
                        url: a
                    }, "lazy")
                }, this), s.src = a)
            }, this)), this._loaded.push(n.get(0)))
        }, i.prototype.destroy = function() {
            var t, e;
            for (t in this.handlers) this._core.$element.off(t, this.handlers[t]);
            for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
        }, t.fn.owlCarousel.Constructor.Plugins.Lazy = i
    }(window.Zepto || window.jQuery, window, document),
    function(t) {
        var e = function(i) {
            this._core = i, this._handlers = {
                "initialized.owl.carousel": t.proxy(function() {
                    this._core.settings.autoHeight && this.update()
                }, this),
                "changed.owl.carousel": t.proxy(function(t) {
                    this._core.settings.autoHeight && "position" == t.property.name && this.update()
                }, this),
                "loaded.owl.lazy": t.proxy(function(t) {
                    this._core.settings.autoHeight && t.element.closest("." + this._core.settings.itemClass) === this._core.$stage.children().eq(this._core.current()) && this.update()
                }, this)
            }, this._core.options = t.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers)
        };
        e.Defaults = {
            autoHeight: !1,
            autoHeightClass: "owl-height"
        }, e.prototype.update = function() {
            this._core.$stage.parent().height(this._core.$stage.children().eq(this._core.current()).height()).addClass(this._core.settings.autoHeightClass)
        }, e.prototype.destroy = function() {
            var t, e;
            for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
            for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
        }, t.fn.owlCarousel.Constructor.Plugins.AutoHeight = e
    }(window.Zepto || window.jQuery, window, document),
    function(t, e, i) {
        var n = function(e) {
            this._core = e, this._videos = {}, this._playing = null, this._fullscreen = !1, this._handlers = {
                "resize.owl.carousel": t.proxy(function(t) {
                    this._core.settings.video && !this.isInFullScreen() && t.preventDefault()
                }, this),
                "refresh.owl.carousel changed.owl.carousel": t.proxy(function() {
                    this._playing && this.stop()
                }, this),
                "prepared.owl.carousel": t.proxy(function(e) {
                    var i = t(e.content).find(".owl-video");
                    i.length && (i.css("display", "none"), this.fetch(i, t(e.content)))
                }, this)
            }, this._core.options = t.extend({}, n.Defaults, this._core.options), this._core.$element.on(this._handlers), this._core.$element.on("click.owl.video", ".owl-video-play-icon", t.proxy(function(t) {
                this.play(t)
            }, this))
        };
        n.Defaults = {
            video: !1,
            videoHeight: !1,
            videoWidth: !1
        }, n.prototype.fetch = function(t, e) {
            var i = t.attr("data-vimeo-id") ? "vimeo" : "youtube",
                n = t.attr("data-vimeo-id") || t.attr("data-youtube-id"),
                s = t.attr("data-width") || this._core.settings.videoWidth,
                o = t.attr("data-height") || this._core.settings.videoHeight,
                a = t.attr("href");
            if (!a) throw new Error("Missing video URL.");
            if (n = a.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/), n[3].indexOf("youtu") > -1) i = "youtube";
            else {
                if (!(n[3].indexOf("vimeo") > -1)) throw new Error("Video URL not supported.");
                i = "vimeo"
            }
            n = n[6], this._videos[a] = {
                type: i,
                id: n,
                width: s,
                height: o
            }, e.attr("data-video", a), this.thumbnail(t, this._videos[a])
        }, n.prototype.thumbnail = function(e, i) {
            var n, s, o, a = i.width && i.height ? 'style="width:' + i.width + "px;height:" + i.height + 'px;"' : "",
                r = e.find("img"),
                l = "src",
                h = "",
                d = this._core.settings,
                c = function(t) {
                    s = '<div class="owl-video-play-icon"></div>', n = d.lazyLoad ? '<div class="owl-video-tn ' + h + '" ' + l + '="' + t + '"></div>' : '<div class="owl-video-tn" style="opacity:1;background-image:url(' + t + ')"></div>', e.after(n), e.after(s)
                };
            return e.wrap('<div class="owl-video-wrapper"' + a + "></div>"), this._core.settings.lazyLoad && (l = "data-src", h = "owl-lazy"), r.length ? (c(r.attr(l)), r.remove(), !1) : void("youtube" === i.type ? (o = "http://img.youtube.com/vi/" + i.id + "/hqdefault.jpg", c(o)) : "vimeo" === i.type && t.ajax({
                type: "GET",
                url: "http://vimeo.com/api/v2/video/" + i.id + ".json",
                jsonp: "callback",
                dataType: "jsonp",
                success: function(t) {
                    o = t[0].thumbnail_large, c(o)
                }
            }))
        }, n.prototype.stop = function() {
            this._core.trigger("stop", null, "video"), this._playing.find(".owl-video-frame").remove(), this._playing.removeClass("owl-video-playing"), this._playing = null
        }, n.prototype.play = function(e) {
            this._core.trigger("play", null, "video"), this._playing && this.stop();
            var i, n, s = t(e.target || e.srcElement),
                o = s.closest("." + this._core.settings.itemClass),
                a = this._videos[o.attr("data-video")],
                r = a.width || "100%",
                l = a.height || this._core.$stage.height();
            "youtube" === a.type ? i = '<iframe width="' + r + '" height="' + l + '" src="http://www.youtube.com/embed/' + a.id + "?autoplay=1&v=" + a.id + '" frameborder="0" allowfullscreen></iframe>' : "vimeo" === a.type && (i = '<iframe src="http://player.vimeo.com/video/' + a.id + '?autoplay=1" width="' + r + '" height="' + l + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'), o.addClass("owl-video-playing"), this._playing = o, n = t('<div style="height:' + l + "px; width:" + r + 'px" class="owl-video-frame">' + i + "</div>"), s.after(n)
        }, n.prototype.isInFullScreen = function() {
            var n = i.fullscreenElement || i.mozFullScreenElement || i.webkitFullscreenElement;
            return n && t(n).parent().hasClass("owl-video-frame") && (this._core.speed(0), this._fullscreen = !0), n && this._fullscreen && this._playing ? !1 : this._fullscreen ? (this._fullscreen = !1, !1) : this._playing && this._core.state.orientation !== e.orientation ? (this._core.state.orientation = e.orientation, !1) : !0
        }, n.prototype.destroy = function() {
            var t, e;
            this._core.$element.off("click.owl.video");
            for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
            for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
        }, t.fn.owlCarousel.Constructor.Plugins.Video = n
    }(window.Zepto || window.jQuery, window, document),
    function(t, e, i, n) {
        var s = function(e) {
            this.core = e, this.core.options = t.extend({}, s.Defaults, this.core.options), this.swapping = !0, this.previous = n, this.next = n, this.handlers = {
                "change.owl.carousel": t.proxy(function(t) {
                    "position" == t.property.name && (this.previous = this.core.current(), this.next = t.property.value)
                }, this),
                "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": t.proxy(function(t) {
                    this.swapping = "translated" == t.type
                }, this),
                "translate.owl.carousel": t.proxy(function() {
                    this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap()
                }, this)
            }, this.core.$element.on(this.handlers)
        };
        s.Defaults = {
            animateOut: !1,
            animateIn: !1
        }, s.prototype.swap = function() {
            if (1 === this.core.settings.items && this.core.support3d) {
                this.core.speed(0);
                var e, i = t.proxy(this.clear, this),
                    n = this.core.$stage.children().eq(this.previous),
                    s = this.core.$stage.children().eq(this.next),
                    o = this.core.settings.animateIn,
                    a = this.core.settings.animateOut;
                this.core.current() !== this.previous && (a && (e = this.core.coordinates(this.previous) - this.core.coordinates(this.next), n.css({
                    left: e + "px"
                }).addClass("animated owl-animated-out").addClass(a).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", i)), o && s.addClass("animated owl-animated-in").addClass(o).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", i))
            }
        }, s.prototype.clear = function(e) {
            t(e.target).css({
                left: ""
            }).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut), this.core.transitionEnd()
        }, s.prototype.destroy = function() {
            var t, e;
            for (t in this.handlers) this.core.$element.off(t, this.handlers[t]);
            for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
        }, t.fn.owlCarousel.Constructor.Plugins.Animate = s
    }(window.Zepto || window.jQuery, window, document),
    function(t, e, i) {
        var n = function(e) {
            this.core = e, this.core.options = t.extend({}, n.Defaults, this.core.options), this.handlers = {
                "translated.owl.carousel refreshed.owl.carousel": t.proxy(function() {
                    this.autoplay()
                }, this),
                "play.owl.autoplay": t.proxy(function(t, e, i) {
                    this.play(e, i)
                }, this),
                "stop.owl.autoplay": t.proxy(function() {
                    this.stop()
                }, this),
                "mouseover.owl.autoplay": t.proxy(function() {
                    this.core.settings.autoplayHoverPause && this.pause()
                }, this),
                "mouseleave.owl.autoplay": t.proxy(function() {
                    this.core.settings.autoplayHoverPause && this.autoplay()
                }, this)
            }, this.core.$element.on(this.handlers)
        };
        n.Defaults = {
            autoplay: !1,
            autoplayTimeout: 5e3,
            autoplayHoverPause: !1,
            autoplaySpeed: !1
        }, n.prototype.autoplay = function() {
            this.core.settings.autoplay && !this.core.state.videoPlay ? (e.clearInterval(this.interval), this.interval = e.setInterval(t.proxy(function() {
                this.play()
            }, this), this.core.settings.autoplayTimeout)) : e.clearInterval(this.interval)
        }, n.prototype.play = function() {
            return i.hidden === !0 || this.core.state.isTouch || this.core.state.isScrolling || this.core.state.isSwiping || this.core.state.inMotion ? void 0 : this.core.settings.autoplay === !1 ? void e.clearInterval(this.interval) : void this.core.next(this.core.settings.autoplaySpeed)
        }, n.prototype.stop = function() {
            e.clearInterval(this.interval)
        }, n.prototype.pause = function() {
            e.clearInterval(this.interval)
        }, n.prototype.destroy = function() {
            var t, i;
            e.clearInterval(this.interval);
            for (t in this.handlers) this.core.$element.off(t, this.handlers[t]);
            for (i in Object.getOwnPropertyNames(this)) "function" != typeof this[i] && (this[i] = null)
        }, t.fn.owlCarousel.Constructor.Plugins.autoplay = n
    }(window.Zepto || window.jQuery, window, document),
    function(t) {
        "use strict";
        var e = function(i) {
            this._core = i, this._initialized = !1, this._pages = [], this._controls = {}, this._templates = [], this.$element = this._core.$element, this._overrides = {
                next: this._core.next,
                prev: this._core.prev,
                to: this._core.to
            }, this._handlers = {
                "prepared.owl.carousel": t.proxy(function(e) {
                    this._core.settings.dotsData && this._templates.push(t(e.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot"))
                }, this),
                "add.owl.carousel": t.proxy(function(e) {
                    this._core.settings.dotsData && this._templates.splice(e.position, 0, t(e.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot"))
                }, this),
                "remove.owl.carousel prepared.owl.carousel": t.proxy(function(t) {
                    this._core.settings.dotsData && this._templates.splice(t.position, 1)
                }, this),
                "change.owl.carousel": t.proxy(function(t) {
                    if ("position" == t.property.name && !this._core.state.revert && !this._core.settings.loop && this._core.settings.navRewind) {
                        var e = this._core.current(),
                            i = this._core.maximum(),
                            n = this._core.minimum();
                        t.data = t.property.value > i ? e >= i ? n : i : t.property.value < n ? i : t.property.value
                    }
                }, this),
                "changed.owl.carousel": t.proxy(function(t) {
                    "position" == t.property.name && this.draw()
                }, this),
                "refreshed.owl.carousel": t.proxy(function() {
                    this._initialized || (this.initialize(), this._initialized = !0), this._core.trigger("refresh", null, "navigation"), this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation")
                }, this)
            }, this._core.options = t.extend({}, e.Defaults, this._core.options), this.$element.on(this._handlers)
        };
        e.Defaults = {
            nav: !1,
            navRewind: !0,
            navText: ["prev", "next"],
            navSpeed: !1,
            navElement: "div",
            navContainer: !1,
            navContainerClass: "owl-nav",
            navClass: ["owl-prev", "owl-next"],
            slideBy: 1,
            dotClass: "owl-dot",
            dotsClass: "owl-dots",
            dots: !0,
            dotsEach: !1,
            dotData: !1,
            dotsSpeed: !1,
            dotsContainer: !1,
            controlsClass: "owl-controls"
        }, e.prototype.initialize = function() {
            var e, i, n = this._core.settings;
            n.dotsData || (this._templates = [t("<div>").addClass(n.dotClass).append(t("<span>")).prop("outerHTML")]), n.navContainer && n.dotsContainer || (this._controls.$container = t("<div>").addClass(n.controlsClass).appendTo(this.$element)), this._controls.$indicators = n.dotsContainer ? t(n.dotsContainer) : t("<div>").hide().addClass(n.dotsClass).appendTo(this._controls.$container), this._controls.$indicators.on("click", "div", t.proxy(function(e) {
                var i = t(e.target).parent().is(this._controls.$indicators) ? t(e.target).index() : t(e.target).parent().index();
                e.preventDefault(), this.to(i, n.dotsSpeed)
            }, this)), e = n.navContainer ? t(n.navContainer) : t("<div>").addClass(n.navContainerClass).prependTo(this._controls.$container), this._controls.$next = t("<" + n.navElement + ">"), this._controls.$previous = this._controls.$next.clone(), this._controls.$previous.addClass(n.navClass[0]).html(n.navText[0]).hide().prependTo(e).on("click", t.proxy(function() {
                this.prev(n.navSpeed)
            }, this)), this._controls.$next.addClass(n.navClass[1]).html(n.navText[1]).hide().appendTo(e).on("click", t.proxy(function() {
                this.next(n.navSpeed)
            }, this));
            for (i in this._overrides) this._core[i] = t.proxy(this[i], this)
        }, e.prototype.destroy = function() {
            var t, e, i, n;
            for (t in this._handlers) this.$element.off(t, this._handlers[t]);
            for (e in this._controls) this._controls[e].remove();
            for (n in this.overides) this._core[n] = this._overrides[n];
            for (i in Object.getOwnPropertyNames(this)) "function" != typeof this[i] && (this[i] = null)
        }, e.prototype.update = function() {
            var t, e, i, n = this._core.settings,
                s = this._core.clones().length / 2,
                o = s + this._core.items().length,
                a = n.center || n.autoWidth || n.dotData ? 1 : n.dotsEach || n.items;
            if ("page" !== n.slideBy && (n.slideBy = Math.min(n.slideBy, n.items)), n.dots || "page" == n.slideBy)
                for (this._pages = [], t = s, e = 0, i = 0; o > t; t++)(e >= a || 0 === e) && (this._pages.push({
                    start: t - s,
                    end: t - s + a - 1
                }), e = 0, ++i), e += this._core.mergers(this._core.relative(t))
        }, e.prototype.draw = function() {
            var e, i, n = "",
                s = this._core.settings,
                o = (this._core.$stage.children(), this._core.relative(this._core.current()));
            if (!s.nav || s.loop || s.navRewind || (this._controls.$previous.toggleClass("disabled", 0 >= o), this._controls.$next.toggleClass("disabled", o >= this._core.maximum())), this._controls.$previous.toggle(s.nav), this._controls.$next.toggle(s.nav), s.dots) {
                if (e = this._pages.length - this._controls.$indicators.children().length, s.dotData && 0 !== e) {
                    for (i = 0; i < this._controls.$indicators.children().length; i++) n += this._templates[this._core.relative(i)];
                    this._controls.$indicators.html(n)
                } else e > 0 ? (n = new Array(e + 1).join(this._templates[0]), this._controls.$indicators.append(n)) : 0 > e && this._controls.$indicators.children().slice(e).remove();
                this._controls.$indicators.find(".active").removeClass("active"), this._controls.$indicators.children().eq(t.inArray(this.current(), this._pages)).addClass("active")
            }
            this._controls.$indicators.toggle(s.dots)
        }, e.prototype.onTrigger = function(e) {
            var i = this._core.settings;
            e.page = {
                index: t.inArray(this.current(), this._pages),
                count: this._pages.length,
                size: i && (i.center || i.autoWidth || i.dotData ? 1 : i.dotsEach || i.items)
            }
        }, e.prototype.current = function() {
            var e = this._core.relative(this._core.current());
            return t.grep(this._pages, function(t) {
                return t.start <= e && t.end >= e
            }).pop()
        }, e.prototype.getPosition = function(e) {
            var i, n, s = this._core.settings;
            return "page" == s.slideBy ? (i = t.inArray(this.current(), this._pages), n = this._pages.length, e ? ++i : --i, i = this._pages[(i % n + n) % n].start) : (i = this._core.relative(this._core.current()), n = this._core.items().length, e ? i += s.slideBy : i -= s.slideBy), i
        }, e.prototype.next = function(e) {
            t.proxy(this._overrides.to, this._core)(this.getPosition(!0), e)
        }, e.prototype.prev = function(e) {
            t.proxy(this._overrides.to, this._core)(this.getPosition(!1), e)
        }, e.prototype.to = function(e, i, n) {
            var s;
            n ? t.proxy(this._overrides.to, this._core)(e, i) : (s = this._pages.length, t.proxy(this._overrides.to, this._core)(this._pages[(e % s + s) % s].start, i))
        }, t.fn.owlCarousel.Constructor.Plugins.Navigation = e
    }(window.Zepto || window.jQuery, window, document),
    function(t, e) {
        "use strict";
        var i = function(n) {
            this._core = n, this._hashes = {}, this.$element = this._core.$element, this._handlers = {
                "initialized.owl.carousel": t.proxy(function() {
                    "URLHash" == this._core.settings.startPosition && t(e).trigger("hashchange.owl.navigation")
                }, this),
                "prepared.owl.carousel": t.proxy(function(e) {
                    var i = t(e.content).find("[data-hash]").andSelf("[data-hash]").attr("data-hash");
                    this._hashes[i] = e.content
                }, this)
            }, this._core.options = t.extend({}, i.Defaults, this._core.options), this.$element.on(this._handlers), t(e).on("hashchange.owl.navigation", t.proxy(function() {
                var t = e.location.hash.substring(1),
                    i = this._core.$stage.children(),
                    n = this._hashes[t] && i.index(this._hashes[t]) || 0;
                return t ? void this._core.to(n, !1, !0) : !1
            }, this))
        };
        i.Defaults = {
            URLhashListener: !1
        }, i.prototype.destroy = function() {
            var i, n;
            t(e).off("hashchange.owl.navigation");
            for (i in this._handlers) this._core.$element.off(i, this._handlers[i]);
            for (n in Object.getOwnPropertyNames(this)) "function" != typeof this[n] && (this[n] = null)
        }, t.fn.owlCarousel.Constructor.Plugins.Hash = i
    }(window.Zepto || window.jQuery, window, document),
    function(t, e) {
        function i(e) {
            this.$element = t(e), this.init()
        }
        var n = "scrolly2";
        i.prototype.init = function() {
            var i = this;
            this.startPosition = 0, this.offsetTop = this.$element.offset().top, this.height = this.$element.outerHeight(!0), this.velocity = this.$element.attr("data-velocity"), this.direction = this.$element.attr("data-direction"), t(e).bind("scroll", function() {
                i.scrolly2()
            })
        }, i.prototype.scrolly2 = function() {
            var i = t(e).scrollTop() - 20,
                n = t(e).scrollTop() + t(e).height() + 20,
                s = this.$element.offset().top,
                o = this.$element.offset().top + this.$element.height();
            if (!(s >= n || i >= o)) {
                this.$element.offset().top > t(e).height() && "none" !== this.direction && (this.startPosition = (this.$element.offset().top - t(e).height()) * Math.abs(this.velocity));
                var a = this.startPosition + t(e).scrollTop() * this.velocity,
                    r = "50%",
                    l = "50%";
                if ("left" === this.direction) r = a + "px";
                else if ("right" === this.direction) r = "calc(100% + " + -a + "px)";
                else if ("down" === this.direction) {
                    var h = -(t(e).height() - this.$element.offset().top - this.$element.height() - parseInt(this.$element.css("paddingTop")) - parseInt(this.$element.css("paddingBottom")));
                    l = "calc(100% + " + (h - t(e).scrollTop() - a) + "px)"
                } else l = this.$element.offset().top - t(e).scrollTop() + a + "px";
                this.$element.css({
                    backgroundPosition: r + " " + l
                })
            }
        }, t.fn[n] = function(e) {
            return this.each(function() {
                t.data(this, "plugin_" + n) || t.data(this, "plugin_" + n, new i(this, e))
            })
        }
    }(jQuery, window, document),
    function(t) {
        var e = !1,
            i = !1,
            n = {
                isUrl: function(t) {
                    var e = new RegExp("^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$", "i");
                    return e.test(t) ? !0 : !1
                },
                loadContent: function(t, e) {
                    t.html(e)
                },
                addPrefix: function(t) {
                    var e = t.attr("id"),
                        i = t.attr("class");
                    t.hasClass("fa") || ("string" == typeof e && "" !== e && t.attr("id", e.replace(/([A-Za-z0-9_.\-]+)/g, "sidr-id-$1")), "string" == typeof i && "" !== i && "sidr-inner" !== i && t.attr("class", i.replace(/([A-Za-z0-9_.\-]+)/g, "sidr-class-$1")), t.removeAttr("style"))
                },
                execute: function(n, o, a) {
                    "function" == typeof o ? (a = o, o = "sidr") : o || (o = "sidr");
                    var r, l, h, d = t("#" + o),
                        c = t(d.data("body")),
                        u = t("html"),
                        p = d.outerWidth(!0),
                        f = d.data("speed"),
                        g = d.data("side"),
                        m = d.data("displace"),
                        v = d.data("onOpen"),
                        y = d.data("onClose"),
                        b = "sidr" === o ? "sidr-open" : "sidr-open " + o + "-open";
                    if ("open" === n || "toggle" === n && !d.is(":visible")) {
                        if (d.is(":visible") || e) return;
                        if (i !== !1) return void s.close(i, function() {
                            s.open(o)
                        });
                        e = !0, "left" === g ? (r = {
                            left: p + "px"
                        }, l = {
                            left: "0px"
                        }) : (r = {
                            right: p + "px"
                        }, l = {
                            right: "0px"
                        }), c.is("body") && (h = u.scrollTop(), u.css("overflow-x", "hidden").scrollTop(h)), m ? c.addClass("sidr-animating").css({
                            width: c.width(),
                            position: "absolute"
                        }).animate(r, f, function() {
                            t(this).addClass(b)
                        }) : setTimeout(function() {
                            t(this).addClass(b)
                        }, f), d.css("display", "block").animate(l, f, function() {
                            e = !1, i = o, "function" == typeof a && a(o), c.removeClass("sidr-animating")
                        }), v()
                    } else {
                        if (!d.is(":visible") || e) return;
                        e = !0, "left" === g ? (r = {
                            left: 0
                        }, l = {
                            left: "-" + p + "px"
                        }) : (r = {
                            right: 0
                        }, l = {
                            right: "-" + p + "px"
                        }), c.is("body") && (h = u.scrollTop(), u.removeAttr("style").scrollTop(h)), c.addClass("sidr-animating").animate(r, f).removeClass(b), d.animate(l, f, function() {
                            d.removeAttr("style").hide(), c.removeAttr("style"), t("html").removeAttr("style"), e = !1, i = !1, "function" == typeof a && a(o), c.removeClass("sidr-animating")
                        }), y()
                    }
                }
            },
            s = {
                open: function(t, e) {
                    n.execute("open", t, e)
                },
                close: function(t, e) {
                    n.execute("close", t, e)
                },
                toggle: function(t, e) {
                    n.execute("toggle", t, e)
                },
                toogle: function(t, e) {
                    n.execute("toggle", t, e)
                }
            };
        t.sidr = function(e) {
            return s[e] ? s[e].apply(this, Array.prototype.slice.call(arguments, 1)) : "function" != typeof e && "string" != typeof e && e ? void t.error("Method " + e + " does not exist on jQuery.sidr") : s.toggle.apply(this, arguments)
        }, t.fn.sidr = function(e) {
            var i = t.extend({
                    name: "sidr",
                    speed: 200,
                    side: "left",
                    source: null,
                    renaming: !0,
                    body: "body",
                    displace: !0,
                    onOpen: function() {},
                    onClose: function() {}
                }, e),
                o = i.name,
                a = t("#" + o);
            if (0 === a.length && (a = t("<div />").attr("id", o).appendTo(t("body"))), a.addClass("sidr").addClass(i.side).data({
                    speed: i.speed,
                    side: i.side,
                    body: i.body,
                    displace: i.displace,
                    onOpen: i.onOpen,
                    onClose: i.onClose
                }), "function" == typeof i.source) {
                var r = i.source(o);
                n.loadContent(a, r)
            } else if ("string" == typeof i.source && n.isUrl(i.source)) t.get(i.source, function(t) {
                n.loadContent(a, t)
            });
            else if ("string" == typeof i.source) {
                var l = "",
                    h = i.source.split(",");
                if (t.each(h, function(e, i) {
                        l += '<div class="sidr-inner">' + t(i).html() + "</div>"
                    }), i.renaming) {
                    var d = t("<div />").html(l);
                    d.find("*").each(function(e, i) {
                        var s = t(i);
                        n.addPrefix(s)
                    }), l = d.html()
                }
                n.loadContent(a, l)
            } else null !== i.source && t.error("Invalid Sidr Source");
            return this.each(function() {
                var e = t(this),
                    i = e.data("sidr");
                i || e.click(function() {
                    return s.toggle(o), !1
                })
            })
        }
    }(jQuery),
    function(t) {
        var e = Array.prototype.slice,
            i = Array.prototype.splice,
            n = {
                topSpacing: 0,
                bottomSpacing: 0,
                className: "is-sticky",
                wrapperClassName: "sticky-wrapper",
                center: !1,
                getWidthFrom: "",
                widthFromWrapper: !0,
                responsiveWidth: !1
            },
            s = t(window),
            o = t(document),
            a = [],
            r = s.height(),
            l = function() {
                for (var e = s.scrollTop(), i = o.height(), n = i - r, l = e > n ? n - e : 0, h = 0; h < a.length; h++) {
                    var d = a[h],
                        c = d.stickyWrapper.offset().top,
                        u = c - d.topSpacing - l;
                    if (u >= e) null !== d.currentTop && (d.stickyElement.css({
                        width: "",
                        position: "",
                        top: ""
                    }), d.stickyElement.parent().removeClass(d.className), d.stickyElement.trigger("sticky-end", [d]), d.currentTop = null);
                    else {
                        var p = i - d.stickyElement.outerHeight() - d.topSpacing - d.bottomSpacing - e - l;
                        if (0 > p ? p += d.topSpacing : p = d.topSpacing, d.currentTop != p) {
                            var f;
                            d.getWidthFrom ? f = t(d.getWidthFrom).width() || null : d.widthFromWrapper && (f = d.stickyWrapper.width()), null == f && (f = d.stickyElement.width()), d.stickyElement.css("width", f).css("position", "fixed").css("top", p), d.stickyElement.parent().addClass(d.className), null === d.currentTop ? d.stickyElement.trigger("sticky-start", [d]) : d.stickyElement.trigger("sticky-update", [d]), d.currentTop === d.topSpacing && d.currentTop > p || null === d.currentTop && p < d.topSpacing ? d.stickyElement.trigger("sticky-bottom-reached", [d]) : null !== d.currentTop && p === d.topSpacing && d.currentTop < p && d.stickyElement.trigger("sticky-bottom-unreached", [d]), d.currentTop = p
                        }
                    }
                }
            },
            h = function() {
                r = s.height();
                for (var e = 0; e < a.length; e++) {
                    var i = a[e],
                        n = null;
                    i.getWidthFrom ? i.responsiveWidth === !0 && (n = t(i.getWidthFrom).width()) : i.widthFromWrapper && (n = i.stickyWrapper.width()), null != n && i.stickyElement.css("width", n)
                }
            },
            d = {
                init: function(e) {
                    var i = t.extend({}, n, e);
                    return this.each(function() {
                        var e = t(this),
                            s = e.attr("id"),
                            o = (e.outerHeight(), s ? s + "-" + n.wrapperClassName : n.wrapperClassName),
                            r = t("<div></div>").attr("id", o).addClass(i.wrapperClassName);
                        e.wrapAll(r);
                        var l = e.parent();
                        i.center && l.css({
                            width: e.outerWidth(),
                            marginLeft: "auto",
                            marginRight: "auto"
                        }), "right" == e.css("float") && e.css({
                            "float": "none"
                        }).parent().css({
                            "float": "right"
                        }), i.stickyElement = e, i.stickyWrapper = l, i.currentTop = null, a.push(i)
                    })
                },
                update: l,
                unstick: function() {
                    return this.each(function() {
                        for (var e = this, n = t(e), s = -1, o = a.length; o-- > 0;) a[o].stickyElement.get(0) === e && (i.call(a, o, 1), s = o); - 1 != s && (n.unwrap(), n.css({
                            width: "",
                            position: "",
                            top: "",
                            "float": ""
                        }))
                    })
                }
            };
        s.scroll(function() {
            l()
        }), s.resize(function() {
            h()
        }), t.fn.sticky = function(i) {
            return d[i] ? d[i].apply(this, e.call(arguments, 1)) : "object" != typeof i && i ? void t.error("Method " + i + " does not exist on jQuery.sticky") : d.init.apply(this, arguments)
        }, t.fn.unstick = function(i) {
            return d[i] ? d[i].apply(this, e.call(arguments, 1)) : "object" != typeof i && i ? void t.error("Method " + i + " does not exist on jQuery.sticky") : d.unstick.apply(this, arguments)
        }, t(function() {
            setTimeout(l, 0)
        })
    }(jQuery),
    function(t, e) {
        "use strict";
        var i = function() {
            var i = {
                    bcClass: "sf-breadcrumb",
                    menuClass: "sf-js-enabled",
                    anchorClass: "sf-with-ul",
                    menuArrowClass: "sf-arrows"
                },
                n = function() {
                    var i = /iPhone|iPad|iPod/i.test(navigator.userAgent);
                    return i && t(e).load(function() {
                        t("body").children().on("click", t.noop)
                    }), i
                }(),
                s = function() {
                    var t = document.documentElement.style;
                    return "behavior" in t && "fill" in t && /iemobile/i.test(navigator.userAgent)
                }(),
                o = function() {
                    return !!e.PointerEvent
                }(),
                a = function(t, e) {
                    var n = i.menuClass;
                    e.cssArrows && (n += " " + i.menuArrowClass), t.toggleClass(n)
                },
                r = function(e, n) {
                    return e.find("li." + n.pathClass).slice(0, n.pathLevels).addClass(n.hoverClass + " " + i.bcClass).filter(function() {
                        return t(this).children(n.popUpSelector).hide().show().length
                    }).removeClass(n.pathClass)
                },
                l = function(t) {
                    t.children("a").toggleClass(i.anchorClass)
                },
                h = function(t) {
                    var e = t.css("ms-touch-action"),
                        i = t.css("touch-action");
                    i = i || e, i = "pan-y" === i ? "auto" : "pan-y", t.css({
                        "ms-touch-action": i,
                        "touch-action": i
                    })
                },
                d = function(e, i) {
                    var a = "li:has(" + i.popUpSelector + ")";
                    t.fn.hoverIntent && !i.disableHI ? e.hoverIntent(u, p, a) : e.on("mouseenter.superfish", a, u).on("mouseleave.superfish", a, p);
                    var r = "MSPointerDown.superfish";
                    o && (r = "pointerdown.superfish"), n || (r += " touchend.superfish"), s && (r += " mousedown.superfish"), e.on("focusin.superfish", "li", u).on("focusout.superfish", "li", p).on(r, "a", i, c)
                },
                c = function(e) {
                    var i = t(this),
                        n = i.siblings(e.data.popUpSelector);
                    n.length > 0 && n.is(":hidden") && (i.one("click.superfish", !1), "MSPointerDown" === e.type || "pointerdown" === e.type ? i.trigger("focus") : t.proxy(u, i.parent("li"))())
                },
                u = function() {
                    var e = t(this),
                        i = m(e);
                    clearTimeout(i.sfTimer), e.siblings().superfish("hide").end().superfish("show")
                },
                p = function() {
                    var e = t(this),
                        i = m(e);
                    n ? t.proxy(f, e, i)() : (clearTimeout(i.sfTimer), i.sfTimer = setTimeout(t.proxy(f, e, i), i.delay))
                },
                f = function(e) {
                    e.retainPath = t.inArray(this[0], e.$path) > -1, this.superfish("hide"), this.parents("." + e.hoverClass).length || (e.onIdle.call(g(this)), e.$path.length && t.proxy(u, e.$path)())
                },
                g = function(t) {
                    return t.closest("." + i.menuClass)
                },
                m = function(t) {
                    return g(t).data("sf-options")
                };
            return {
                hide: function(e) {
                    if (this.length) {
                        var i = this,
                            n = m(i);
                        if (!n) return this;
                        var s = n.retainPath === !0 ? n.$path : "",
                            o = i.find("li." + n.hoverClass).add(this).not(s).removeClass(n.hoverClass).children(n.popUpSelector),
                            a = n.speedOut;
                        e && (o.show(), a = 0), n.retainPath = !1, n.onBeforeHide.call(o), o.stop(!0, !0).animate(n.animationOut, a, function() {
                            var e = t(this);
                            n.onHide.call(e)
                        })
                    }
                    return this
                },
                show: function() {
                    var t = m(this);
                    if (!t) return this;
                    var e = this.addClass(t.hoverClass),
                        i = e.children(t.popUpSelector);
                    return t.onBeforeShow.call(i), i.stop(!0, !0).animate(t.animation, t.speed, function() {
                        t.onShow.call(i)
                    }), this
                },
                destroy: function() {
                    return this.each(function() {
                        var e, n = t(this),
                            s = n.data("sf-options");
                        return s ? (e = n.find(s.popUpSelector).parent("li"), clearTimeout(s.sfTimer), a(n, s), l(e), h(n), n.off(".superfish").off(".hoverIntent"), e.children(s.popUpSelector).attr("style", function(t, e) {
                            return e.replace(/display[^;]+;?/g, "")
                        }), s.$path.removeClass(s.hoverClass + " " + i.bcClass).addClass(s.pathClass), n.find("." + s.hoverClass).removeClass(s.hoverClass), s.onDestroy.call(n), void n.removeData("sf-options")) : !1
                    })
                },
                init: function(e) {
                    return this.each(function() {
                        var n = t(this);
                        if (n.data("sf-options")) return !1;
                        var s = t.extend({}, t.fn.superfish.defaults, e),
                            o = n.find(s.popUpSelector).parent("li");
                        s.$path = r(n, s), n.data("sf-options", s), a(n, s), l(o), h(n), d(n, s), o.not("." + i.bcClass).superfish("hide", !0), s.onInit.call(this)
                    })
                }
            }
        }();
        t.fn.superfish = function(e) {
            return i[e] ? i[e].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof e && e ? t.error("Method " + e + " does not exist on jQuery.fn.superfish") : i.init.apply(this, arguments)
        }, t.fn.superfish.defaults = {
            popUpSelector: "ul,.sf-mega",
            hoverClass: "sfHover",
            pathClass: "overrideThisToUse",
            pathLevels: 1,
            delay: 800,
            animation: {
                opacity: "show"
            },
            animationOut: {
                opacity: "hide"
            },
            speed: "normal",
            speedOut: "fast",
            cssArrows: !0,
            disableHI: !1,
            onInit: t.noop,
            onBeforeShow: t.noop,
            onShow: t.noop,
            onBeforeHide: t.noop,
            onHide: t.noop,
            onIdle: t.noop,
            onDestroy: t.noop
        }
    }(jQuery, window),
    function(t) {
        t.fn.supersubs = function(e) {
            var i = t.extend({}, t.fn.supersubs.defaults, e);
            return this.each(function() {
                var e = t(this),
                    n = t.meta ? t.extend({}, i, e.data()) : i;
                $ULs = e.find("ul").show();
                var s = t('<li id="menu-fontsize">&#8212;</li>').css({
                    padding: 0,
                    position: "absolute",
                    top: "-999em",
                    width: "auto"
                }).appendTo(e)[0].clientWidth;
                t("#menu-fontsize").remove(), $ULs.each(function() {
                    var e = t(this),
                        i = e.children(),
                        o = i.children("a"),
                        a = i.css("white-space", "nowrap").css("float");
                    e.add(i).add(o).css({
                        "float": "none",
                        width: "auto"
                    });
                    var r = e[0].clientWidth / s;
                    r += n.extraWidth, r > n.maxWidth ? r = n.maxWidth : r < n.minWidth && (r = n.minWidth), r += "em", e.css("width", r), i.css({
                        "float": a,
                        width: "100%",
                        "white-space": "normal"
                    }).each(function() {
                        var e = t(this).children("ul"),
                            i = void 0 !== e.css("left") ? "left" : "right";
                        e.css(i, "100%")
                    })
                }).hide()
            })
        }, t.fn.supersubs.defaults = {
            minWidth: 9,
            maxWidth: 25,
            extraWidth: 0
        }
    }(jQuery),
    function(t) {
        function e(t, e) {
            return "function" == typeof t ? t.call(e) : t
        }

        function i(t) {
            for (; t = t.parentNode;)
                if (t == document) return !0;
            return !1
        }

        function n(e, i) {
            this.$element = t(e), this.options = i, this.enabled = !0, this.fixTitle()
        }
        n.prototype = {
            show: function() {
                var i = this.getTitle();
                if (i && this.enabled) {
                    var n = this.tip();
                    n.find(".tipsy-inner")[this.options.html ? "html" : "text"](i), n[0].className = "tipsy", n.remove().css({
                        top: 0,
                        left: 0,
                        visibility: "hidden",
                        display: "block"
                    }).prependTo(document.body);
                    var s, o = t.extend({}, this.$element.offset(), {
                            width: this.$element[0].offsetWidth,
                            height: this.$element[0].offsetHeight
                        }),
                        a = n[0].offsetWidth,
                        r = n[0].offsetHeight,
                        l = e(this.options.gravity, this.$element[0]);
                    switch (l.charAt(0)) {
                        case "n":
                            s = {
                                top: o.top + o.height + this.options.offset,
                                left: o.left + o.width / 2 - a / 2
                            };
                            break;
                        case "s":
                            s = {
                                top: o.top - r - this.options.offset,
                                left: o.left + o.width / 2 - a / 2
                            };
                            break;
                        case "e":
                            s = {
                                top: o.top + o.height / 2 - r / 2,
                                left: o.left - a - this.options.offset
                            };
                            break;
                        case "w":
                            s = {
                                top: o.top + o.height / 2 - r / 2,
                                left: o.left + o.width + this.options.offset
                            }
                    }
                    2 == l.length && (s.left = "w" == l.charAt(1) ? o.left + o.width / 2 - 15 : o.left + o.width / 2 - a + 15), n.css(s).addClass("tipsy-" + l), n.find(".tipsy-arrow")[0].className = "tipsy-arrow tipsy-arrow-" + l.charAt(0), this.options.className && n.addClass(e(this.options.className, this.$element[0])), this.options.fade ? n.stop().css({
                        opacity: 0,
                        display: "block",
                        visibility: "visible"
                    }).animate({
                        opacity: this.options.opacity
                    }) : n.css({
                        visibility: "visible",
                        opacity: this.options.opacity
                    })
                }
            },
            hide: function() {
                this.options.fade ? this.tip().stop().fadeOut(function() {
                    t(this).remove()
                }) : this.tip().remove()
            },
            fixTitle: function() {
                var t = this.$element;
                (t.attr("title") || "string" != typeof t.attr("original-title")) && t.attr("original-title", t.attr("title") || "").removeAttr("title")
            },
            getTitle: function() {
                var t, e = this.$element,
                    i = this.options;
                this.fixTitle();
                var t, i = this.options;
                return "string" == typeof i.title ? t = e.attr("title" == i.title ? "original-title" : i.title) : "function" == typeof i.title && (t = i.title.call(e[0])), t = ("" + t).replace(/(^\s*|\s*$)/, ""), t || i.fallback
            },
            tip: function() {
                return this.$tip || (this.$tip = t('<div class="tipsy"></div>').html('<div class="tipsy-arrow"></div><div class="tipsy-inner"></div>'), this.$tip.data("tipsy-pointee", this.$element[0])), this.$tip
            },
            validate: function() {
                this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
            },
            enable: function() {
                this.enabled = !0
            },
            disable: function() {
                this.enabled = !1
            },
            toggleEnabled: function() {
                this.enabled = !this.enabled
            }
        }, t.fn.tipsy = function(e) {
            function i(i) {
                var s = t.data(i, "tipsy");
                return s || (s = new n(i, t.fn.tipsy.elementOptions(i, e)), t.data(i, "tipsy", s)), s
            }

            function s() {
                var t = i(this);
                t.hoverState = "in", 0 == e.delayIn ? t.show() : (t.fixTitle(), setTimeout(function() {
                    "in" == t.hoverState && t.show()
                }, e.delayIn))
            }

            function o() {
                var t = i(this);
                t.hoverState = "out", 0 == e.delayOut ? t.hide() : setTimeout(function() {
                    "out" == t.hoverState && t.hide()
                }, e.delayOut)
            }
            if (e === !0) return this.data("tipsy");
            if ("string" == typeof e) {
                var a = this.data("tipsy");
                return a && a[e](), this
            }
            if (e = t.extend({}, t.fn.tipsy.defaults, e), e.live || this.each(function() {
                    i(this)
                }), "manual" != e.trigger) {
                var r = e.live ? "live" : "bind",
                    l = "hover" == e.trigger ? "mouseenter" : "focus",
                    h = "hover" == e.trigger ? "mouseleave" : "blur";
                this[r](l, s)[r](h, o)
            }
            return this
        }, t.fn.tipsy.defaults = {
            className: null,
            delayIn: 0,
            delayOut: 0,
            fade: !1,
            fallback: "",
            gravity: "n",
            html: !1,
            live: !1,
            offset: 0,
            opacity: .8,
            title: "title",
            trigger: "hover"
        }, t.fn.tipsy.revalidate = function() {
            t(".tipsy").each(function() {
                var e = t.data(this, "tipsy-pointee");
                e && i(e) || t(this).remove()
            })
        }, t.fn.tipsy.elementOptions = function(e, i) {
            return t.metadata ? t.extend({}, i, t(e).metadata()) : i
        }, t.fn.tipsy.autoNS = function() {
            return t(this).offset().top > t(document).scrollTop() + t(window).height() / 2 ? "s" : "n"
        }, t.fn.tipsy.autoWE = function() {
            return t(this).offset().left > t(document).scrollLeft() + t(window).width() / 2 ? "e" : "w"
        }, t.fn.tipsy.autoBounds = function(e, i) {
            return function() {
                var n = {
                        ns: i[0],
                        ew: i.length > 1 ? i[1] : !1
                    },
                    s = t(document).scrollTop() + e,
                    o = t(document).scrollLeft() + e,
                    a = t(this);
                return a.offset().top < s && (n.ns = "n"), a.offset().left < o && (n.ew = "w"), t(window).width() + t(document).scrollLeft() - a.offset().left < e && (n.ew = "e"), t(window).height() + t(document).scrollTop() - a.offset().top < e && (n.ns = "s"), n.ns + (n.ew ? n.ew : "")
            }
        }
    }(jQuery),
    function(t) {
        "function" == typeof define && define.amd && define.amd.jQuery ? define(["jquery"], t) : t(jQuery)
    }(function(t) {
        function e(e) {
            return !e || void 0 !== e.allowPageScroll || void 0 === e.swipe && void 0 === e.swipeStatus || (e.allowPageScroll = h), void 0 !== e.click && void 0 === e.tap && (e.tap = e.click), e || (e = {}), e = t.extend({}, t.fn.swipe.defaults, e), this.each(function() {
                var n = t(this),
                    s = n.data(L);
                s || (s = new i(this, e), n.data(L, s))
            })
        }

        function i(e, i) {
            function k(e) {
                if (!(he() || t(e.target).closest(i.excludedElements, Ue).length > 0)) {
                    var n, s = e.originalEvent ? e.originalEvent : e,
                        o = T ? s.touches[0] : s;
                    return qe = w, T ? Ve = s.touches.length : e.preventDefault(), He = 0, De = null, je = null, Me = 0, Re = 0, Be = 0, We = 1, Fe = 0, Qe = fe(), Ne = ve(), re(), !T || Ve === i.fingers || i.fingers === y || N() ? (ce(0, o), Xe = _e(), 2 == Ve && (ce(1, s.touches[1]), Re = Be = we(Qe[0].start, Qe[1].start)), (i.swipeStatus || i.pinchStatus) && (n = H(s, qe))) : n = !1, n === !1 ? (qe = $, H(s, qe), n) : (i.hold && (ti = setTimeout(t.proxy(function() {
                        Ue.trigger("hold", [s.target]), i.hold && (n = i.hold.call(Ue, s, s.target))
                    }, this), i.longTapThreshold)), de(!0), null)
                }
            }

            function I(t) {
                var e = t.originalEvent ? t.originalEvent : t;
                if (qe !== S && qe !== $ && !le()) {
                    var n, s = T ? e.touches[0] : e,
                        o = ue(s);
                    if (Ye = _e(), T && (Ve = e.touches.length), i.hold && clearTimeout(ti), qe = x, 2 == Ve && (0 == Re ? (ce(1, e.touches[1]), Re = Be = we(Qe[0].start, Qe[1].start)) : (ue(e.touches[1]), Be = we(Qe[0].end, Qe[1].end), je = Se(Qe[0].end, Qe[1].end)), We = xe(Re, Be), Fe = Math.abs(Re - Be)), Ve === i.fingers || i.fingers === y || !T || N()) {
                        if (De = Ce(o.start, o.end), F(t, De), He = $e(o.start, o.end), Me = be(), ge(De, He), (i.swipeStatus || i.pinchStatus) && (n = H(e, qe)), !i.triggerOnTouchEnd || i.triggerOnTouchLeave) {
                            var a = !0;
                            if (i.triggerOnTouchLeave) {
                                var r = Le(this);
                                a = ke(o.end, r)
                            }!i.triggerOnTouchEnd && a ? qe = O(x) : i.triggerOnTouchLeave && !a && (qe = O(S)), (qe == $ || qe == S) && H(e, qe)
                        }
                    } else qe = $, H(e, qe);
                    n === !1 && (qe = $, H(e, qe))
                }
            }

            function z(t) {
                var e = t.originalEvent;
                return T && e.touches.length > 0 ? (ae(), !0) : (le() && (Ve = Ze), Ye = _e(), Me = be(), R() || !M() ? (qe = $, H(e, qe)) : i.triggerOnTouchEnd || 0 == i.triggerOnTouchEnd && qe === x ? (t.preventDefault(), qe = S, H(e, qe)) : !i.triggerOnTouchEnd && G() ? (qe = S, D(e, qe, p)) : qe === x && (qe = $, H(e, qe)), de(!1), null)
            }

            function E() {
                Ve = 0, Ye = 0, Xe = 0, Re = 0, Be = 0, We = 1, re(), de(!1)
            }

            function P(t) {
                var e = t.originalEvent;
                i.triggerOnTouchLeave && (qe = O(S), H(e, qe))
            }

            function A() {
                Ue.unbind(ze, k), Ue.unbind(Oe, E), Ue.unbind(Ee, I), Ue.unbind(Pe, z), Ae && Ue.unbind(Ae, P), de(!1)
            }

            function O(t) {
                var e = t,
                    n = W(),
                    s = M(),
                    o = R();
                return !n || o ? e = $ : !s || t != x || i.triggerOnTouchEnd && !i.triggerOnTouchLeave ? !s && t == S && i.triggerOnTouchLeave && (e = $) : e = S, e
            }

            function H(t, e) {
                var i = void 0;
                return Q() || V() ? i = D(t, e, c) : (U() || N()) && i !== !1 && (i = D(t, e, u)), se() && i !== !1 ? i = D(t, e, f) : oe() && i !== !1 ? i = D(t, e, g) : ne() && i !== !1 && (i = D(t, e, p)), e === $ && E(t), e === S && (T ? 0 == t.touches.length && E(t) : E(t)), i
            }

            function D(e, h, d) {
                var m = void 0;
                if (d == c) {
                    if (Ue.trigger("swipeStatus", [h, De || null, He || 0, Me || 0, Ve, Qe]), i.swipeStatus && (m = i.swipeStatus.call(Ue, e, h, De || null, He || 0, Me || 0, Ve, Qe), m === !1)) return !1;
                    if (h == S && q()) {
                        if (Ue.trigger("swipe", [De, He, Me, Ve, Qe]), i.swipe && (m = i.swipe.call(Ue, e, De, He, Me, Ve, Qe), m === !1)) return !1;
                        switch (De) {
                            case n:
                                Ue.trigger("swipeLeft", [De, He, Me, Ve, Qe]), i.swipeLeft && (m = i.swipeLeft.call(Ue, e, De, He, Me, Ve, Qe));
                                break;
                            case s:
                                Ue.trigger("swipeRight", [De, He, Me, Ve, Qe]), i.swipeRight && (m = i.swipeRight.call(Ue, e, De, He, Me, Ve, Qe));
                                break;
                            case o:
                                Ue.trigger("swipeUp", [De, He, Me, Ve, Qe]), i.swipeUp && (m = i.swipeUp.call(Ue, e, De, He, Me, Ve, Qe));
                                break;
                            case a:
                                Ue.trigger("swipeDown", [De, He, Me, Ve, Qe]), i.swipeDown && (m = i.swipeDown.call(Ue, e, De, He, Me, Ve, Qe))
                        }
                    }
                }
                if (d == u) {
                    if (Ue.trigger("pinchStatus", [h, je || null, Fe || 0, Me || 0, Ve, We, Qe]), i.pinchStatus && (m = i.pinchStatus.call(Ue, e, h, je || null, Fe || 0, Me || 0, Ve, We, Qe), m === !1)) return !1;
                    if (h == S && j()) switch (je) {
                        case r:
                            Ue.trigger("pinchIn", [je || null, Fe || 0, Me || 0, Ve, We, Qe]), i.pinchIn && (m = i.pinchIn.call(Ue, e, je || null, Fe || 0, Me || 0, Ve, We, Qe));
                            break;
                        case l:
                            Ue.trigger("pinchOut", [je || null, Fe || 0, Me || 0, Ve, We, Qe]), i.pinchOut && (m = i.pinchOut.call(Ue, e, je || null, Fe || 0, Me || 0, Ve, We, Qe))
                    }
                }
                return d == p ? (h === $ || h === S) && (clearTimeout(Je), clearTimeout(ti), Z() && !te() ? (Ke = _e(), Je = setTimeout(t.proxy(function() {
                    Ke = null, Ue.trigger("tap", [e.target]), i.tap && (m = i.tap.call(Ue, e, e.target))
                }, this), i.doubleTapThreshold)) : (Ke = null, Ue.trigger("tap", [e.target]), i.tap && (m = i.tap.call(Ue, e, e.target)))) : d == f ? (h === $ || h === S) && (clearTimeout(Je), Ke = null, Ue.trigger("doubletap", [e.target]), i.doubleTap && (m = i.doubleTap.call(Ue, e, e.target))) : d == g && (h === $ || h === S) && (clearTimeout(Je), Ke = null, Ue.trigger("longtap", [e.target]), i.longTap && (m = i.longTap.call(Ue, e, e.target))), m
            }

            function M() {
                var t = !0;
                return null !== i.threshold && (t = He >= i.threshold), t
            }

            function R() {
                var t = !1;
                return null !== i.cancelThreshold && null !== De && (t = me(De) - He >= i.cancelThreshold), t
            }

            function B() {
                return null !== i.pinchThreshold ? Fe >= i.pinchThreshold : !0
            }

            function W() {
                var t;
                return t = i.maxTimeThreshold && Me >= i.maxTimeThreshold ? !1 : !0
            }

            function F(t, e) {
                if (i.allowPageScroll === h || N()) t.preventDefault();
                else {
                    var r = i.allowPageScroll === d;
                    switch (e) {
                        case n:
                            (i.swipeLeft && r || !r && i.allowPageScroll != m) && t.preventDefault();
                            break;
                        case s:
                            (i.swipeRight && r || !r && i.allowPageScroll != m) && t.preventDefault();
                            break;
                        case o:
                            (i.swipeUp && r || !r && i.allowPageScroll != v) && t.preventDefault();
                            break;
                        case a:
                            (i.swipeDown && r || !r && i.allowPageScroll != v) && t.preventDefault()
                    }
                }
            }

            function j() {
                var t = X(),
                    e = Y(),
                    i = B();
                return t && e && i
            }

            function N() {
                return !!(i.pinchStatus || i.pinchIn || i.pinchOut)
            }

            function U() {
                return !(!j() || !N())
            }

            function q() {
                var t = W(),
                    e = M(),
                    i = X(),
                    n = Y(),
                    s = R(),
                    o = !s && n && i && e && t;
                return o
            }

            function V() {
                return !!(i.swipe || i.swipeStatus || i.swipeLeft || i.swipeRight || i.swipeUp || i.swipeDown)
            }

            function Q() {
                return !(!q() || !V())
            }

            function X() {
                return Ve === i.fingers || i.fingers === y || !T
            }

            function Y() {
                return 0 !== Qe[0].end.x
            }

            function G() {
                return !!i.tap
            }

            function Z() {
                return !!i.doubleTap
            }

            function K() {
                return !!i.longTap
            }

            function J() {
                if (null == Ke) return !1;
                var t = _e();
                return Z() && t - Ke <= i.doubleTapThreshold
            }

            function te() {
                return J()
            }

            function ee() {
                return (1 === Ve || !T) && (isNaN(He) || He < i.threshold)
            }

            function ie() {
                return Me > i.longTapThreshold && b > He
            }

            function ne() {
                return !(!ee() || !G())
            }

            function se() {
                return !(!J() || !Z())
            }

            function oe() {
                return !(!ie() || !K())
            }

            function ae() {
                Ge = _e(), Ze = event.touches.length + 1
            }

            function re() {
                Ge = 0, Ze = 0
            }

            function le() {
                var t = !1;
                if (Ge) {
                    var e = _e() - Ge;
                    e <= i.fingerReleaseThreshold && (t = !0)
                }
                return t
            }

            function he() {
                return !(Ue.data(L + "_intouch") !== !0)
            }

            function de(t) {
                t === !0 ? (Ue.bind(Ee, I), Ue.bind(Pe, z), Ae && Ue.bind(Ae, P)) : (Ue.unbind(Ee, I, !1), Ue.unbind(Pe, z, !1), Ae && Ue.unbind(Ae, P, !1)), Ue.data(L + "_intouch", t === !0)
            }

            function ce(t, e) {
                var i = void 0 !== e.identifier ? e.identifier : 0;
                return Qe[t].identifier = i, Qe[t].start.x = Qe[t].end.x = e.pageX || e.clientX, Qe[t].start.y = Qe[t].end.y = e.pageY || e.clientY, Qe[t]
            }

            function ue(t) {
                var e = void 0 !== t.identifier ? t.identifier : 0,
                    i = pe(e);
                return i.end.x = t.pageX || t.clientX, i.end.y = t.pageY || t.clientY, i
            }

            function pe(t) {
                for (var e = 0; e < Qe.length; e++)
                    if (Qe[e].identifier == t) return Qe[e]
            }

            function fe() {
                for (var t = [], e = 0; 5 >= e; e++) t.push({
                    start: {
                        x: 0,
                        y: 0
                    },
                    end: {
                        x: 0,
                        y: 0
                    },
                    identifier: 0
                });
                return t
            }

            function ge(t, e) {
                e = Math.max(e, me(t)), Ne[t].distance = e
            }

            function me(t) {
                return Ne[t] ? Ne[t].distance : void 0
            }

            function ve() {
                var t = {};
                return t[n] = ye(n), t[s] = ye(s), t[o] = ye(o), t[a] = ye(a), t
            }

            function ye(t) {
                return {
                    direction: t,
                    distance: 0
                }
            }

            function be() {
                return Ye - Xe
            }

            function we(t, e) {
                var i = Math.abs(t.x - e.x),
                    n = Math.abs(t.y - e.y);
                return Math.round(Math.sqrt(i * i + n * n))
            }

            function xe(t, e) {
                var i = e / t * 1;
                return i.toFixed(2)
            }

            function Se() {
                return 1 > We ? l : r
            }

            function $e(t, e) {
                return Math.round(Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2)))
            }

            function Te(t, e) {
                var i = t.x - e.x,
                    n = e.y - t.y,
                    s = Math.atan2(n, i),
                    o = Math.round(180 * s / Math.PI);
                return 0 > o && (o = 360 - Math.abs(o)), o
            }

            function Ce(t, e) {
                var i = Te(t, e);
                return 45 >= i && i >= 0 ? n : 360 >= i && i >= 315 ? n : i >= 135 && 225 >= i ? s : i > 45 && 135 > i ? a : o
            }

            function _e() {
                var t = new Date;
                return t.getTime()
            }

            function Le(e) {
                e = t(e);
                var i = e.offset(),
                    n = {
                        left: i.left,
                        right: i.left + e.outerWidth(),
                        top: i.top,
                        bottom: i.top + e.outerHeight()
                    };
                return n
            }

            function ke(t, e) {
                return t.x > e.left && t.x < e.right && t.y > e.top && t.y < e.bottom
            }
            var Ie = T || _ || !i.fallbackToMouseEvents,
                ze = Ie ? _ ? C ? "MSPointerDown" : "pointerdown" : "touchstart" : "mousedown",
                Ee = Ie ? _ ? C ? "MSPointerMove" : "pointermove" : "touchmove" : "mousemove",
                Pe = Ie ? _ ? C ? "MSPointerUp" : "pointerup" : "touchend" : "mouseup",
                Ae = Ie ? null : "mouseleave",
                Oe = _ ? C ? "MSPointerCancel" : "pointercancel" : "touchcancel",
                He = 0,
                De = null,
                Me = 0,
                Re = 0,
                Be = 0,
                We = 1,
                Fe = 0,
                je = 0,
                Ne = null,
                Ue = t(e),
                qe = "start",
                Ve = 0,
                Qe = null,
                Xe = 0,
                Ye = 0,
                Ge = 0,
                Ze = 0,
                Ke = 0,
                Je = null,
                ti = null;
            try {
                Ue.bind(ze, k), Ue.bind(Oe, E)
            } catch (ei) {
                t.error("events not supported " + ze + "," + Oe + " on jQuery.swipe")
            }
            this.enable = function() {
                return Ue.bind(ze, k), Ue.bind(Oe, E), Ue
            }, this.disable = function() {
                return A(), Ue
            }, this.destroy = function() {
                return A(), Ue.data(L, null), Ue
            }, this.option = function(e, n) {
                if (void 0 !== i[e]) {
                    if (void 0 === n) return i[e];
                    i[e] = n
                } else t.error("Option " + e + " does not exist on jQuery.swipe.options");
                return null
            }
        }
        var n = "left",
            s = "right",
            o = "up",
            a = "down",
            r = "in",
            l = "out",
            h = "none",
            d = "auto",
            c = "swipe",
            u = "pinch",
            p = "tap",
            f = "doubletap",
            g = "longtap",
            m = "horizontal",
            v = "vertical",
            y = "all",
            b = 10,
            w = "start",
            x = "move",
            S = "end",
            $ = "cancel",
            T = "ontouchstart" in window,
            C = window.navigator.msPointerEnabled && !window.navigator.pointerEnabled,
            _ = window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
            L = "TouchSwipe",
            k = {
                fingers: 1,
                threshold: 75,
                cancelThreshold: null,
                pinchThreshold: 20,
                maxTimeThreshold: null,
                fingerReleaseThreshold: 250,
                longTapThreshold: 500,
                doubleTapThreshold: 200,
                swipe: null,
                swipeLeft: null,
                swipeRight: null,
                swipeUp: null,
                swipeDown: null,
                swipeStatus: null,
                pinchIn: null,
                pinchOut: null,
                pinchStatus: null,
                click: null,
                tap: null,
                doubleTap: null,
                longTap: null,
                hold: null,
                triggerOnTouchEnd: !0,
                triggerOnTouchLeave: !1,
                allowPageScroll: "auto",
                fallbackToMouseEvents: !0,
                excludedElements: "label, button, input, select, textarea, a, .noSwipe"
            };
        t.fn.swipe = function(i) {
            var n = t(this),
                s = n.data(L);
            if (s && "string" == typeof i) {
                if (s[i]) return s[i].apply(this, Array.prototype.slice.call(arguments, 1));
                t.error("Method " + i + " does not exist on jQuery.swipe")
            } else if (!(s || "object" != typeof i && i)) return e.apply(this, arguments);
            return n
        }, t.fn.swipe.defaults = k, t.fn.swipe.phases = {
            PHASE_START: w,
            PHASE_MOVE: x,
            PHASE_END: S,
            PHASE_CANCEL: $
        }, t.fn.swipe.directions = {
            LEFT: n,
            RIGHT: s,
            UP: o,
            DOWN: a,
            IN: r,
            OUT: l
        }, t.fn.swipe.pageScroll = {
            NONE: h,
            HORIZONTAL: m,
            VERTICAL: v,
            AUTO: d
        }, t.fn.swipe.fingers = {
            ONE: 1,
            TWO: 2,
            THREE: 3,
            ALL: y
        }
    }), jQuery(function(t) {
        t("div.quantity:not(.buttons_added), td.quantity:not(.buttons_added)").addClass("buttons_added").append('<input type="button" value="+" class="plus" />').prepend('<input type="button" value="-" class="minus" />'), t(document).on("click", ".plus, .minus", function() {
            var e = t(this).closest(".quantity").find(".qty"),
                i = parseFloat(e.val()),
                n = parseFloat(e.attr("max")),
                s = parseFloat(e.attr("min")),
                o = e.attr("step");
            i && "" !== i && "NaN" !== i || (i = 0), ("" === n || "NaN" === n) && (n = ""), ("" === s || "NaN" === s) && (s = 0), ("any" === o || "" === o || void 0 === o || "NaN" === parseFloat(o)) && (o = 1), t(this).is(".plus") ? e.val(n && (n == i || i > n) ? n : i + parseFloat(o)) : s && (s == i || s > i) ? e.val(s) : i > 0 && e.val(i - parseFloat(o)), e.trigger("change")
        })
    }),
    function(t) {
        "use strict";
        var e = {
            init: function() {
                this.config(), this.bindEvents()
            },
            config: function() {
                this.config = {
                    $window: t(window),
                    $document: t(document),
                    $windowWidth: t(window).width(),
                    $windowHeight: t(window).height(),
                    $windowTop: t(window).scrollTop(),
                    $body: t("body"),
                    $mobileMenuBreakpoint: 960,
                    $siteHeader: null,
                    $siteHeaderHeight: 0,
                    $siteHeaderTop: 0,
                    $siteHeaderBottom: 0,
                    $siteLogo: null,
                    $siteLogoHeight: 0,
                    $siteLogoSrc: null,
                    $siteNavWrap: null,
                    $localScrollOffset: 0,
                    $localScrollSpeed: 600,
                    $localScrollArray: [],
                    $mobileMenuStyle: null,
                    $hasFixedFooter: !1,
                    $hasFooterReveal: !1,
                    $hasTopBar: !1,
                    $hasHeaderOverlay: !1,
                    $hasStickyHeader: !1,
                    $stickyHeaderBreakPoint: 960,
                    $hasStickyMobileHeader: !1,
                    $hasStickyTopBar: !1,
                    $stickyTopBar: null,
                    $stickyTopBarHeight: 0,
                    $is_rtl: !1,
                    $retinaLogo: null,
                    $isMobile: !1,
                    $verticalHeaderActive: !1
                }
            },
            bindEvents: function() {
                var e = this;
                e.config.$document.on("ready", function() {
                    e.initUpdateConfig(), e.pageAnimations(), e.superFish(), e.megaMenusWidth(), e.mobileMenu(), e.navNoClick(), e.hideEditLink(), e.customMenuWidgetAccordion(), e.inlineHeaderLogo(), e.menuSearch(), e.headerCart(), e.backTopLink(), e.smoothCommentScroll(), e.tipsyTooltips(), e.customHovers(), e.toggleBar(), e.localScrollLinks(), e.customSelects(), e.skillbar(), e.milestone(), e.owlCarousel(), e.archiveMasonryGrids(), e.iLightbox(), e.wooSelects(), e.overlayHovers(), e.isotopeGrids()
                }), e.config.$window.on("load", function() {
                    e.windowLoadUpdateConfig(), e.megaMenusTop(), e.flushDropdownsTop(), e.equalHeights(), e.overlayHeaderTopWrapPadding(), e.fadeIn(), e.parallax(), e.cartSearchDropdownsRelocate(), e.sliderPro(), t.fn.animsition && wpexLocalize.pageAnimation && wpexLocalize.pageAnimationInDuration ? setTimeout(function() {
                        e.stickyTopBar(), e.stickyHeader()
                    }, wpexLocalize.pageAnimationInDuration) : (e.stickyTopBar(), e.stickyHeader()), e.stickyHeaderShrink(), e.footerRevealInit(), e.fixedFooter(), window.setTimeout(function() {
                        e.scrollToHash(e)
                    }, 500)
                }), e.config.$window.resize(function() {
                    e.config.$window.width() != e.config.$windowWidth && (e.resizeUpdateConfig(), e.megaMenusWidth(), e.overlayHeaderTopWrapPadding(), e.inlineHeaderLogo(), e.fixedFooter(), e.footerRevealInit()), e.config.$window.height() != e.config.$windowHeight && (e.fixedFooter(), e.footerRevealInit())
                }), e.config.$window.scroll(function() {
                    e.config.$windowTop = e.config.$window.scrollTop(), e.localScrollHighlight(), e.footerRevealScrollShow()
                }), e.config.$window.on("orientationchange", function() {
                    resizeUpdateConfig(), e.isotopeGrids(), e.archiveMasonryGrids(), e.inlineHeaderLogo()
                }), e.config.$document.click(function() {
                    t("#searchform-dropdown, #searchform-header-replace").removeClass("show"), t("a.search-dropdown-toggle").parent("li").removeClass("active"), t("#toggle-bar-wrap").removeClass("active-bar");
                    var e = t("a.toggle-bar-btn");
                    0 !== e.length && e.children(".fa").removeClass(e.data("icon-hover")).addClass(e.data("icon"))
                })
            },
            initUpdateConfig: function() {
                this.config.$isMobile = this.mobileCheck(), wpexLocalize.localScrollSpeed && (this.config.$localScrollSpeed = parseInt(wpexLocalize.localScrollSpeed)), t("#site-header").length && (this.config.$siteHeader = t("#site-header")), t("#site-logo img").length && (this.config.$siteLogo = t("#site-logo img"), this.config.$siteLogoSrc = this.config.$siteLogo.attr("src")), t("#site-navigation-wrap").length && (this.config.$siteNavWrap = t("#site-navigation-wrap")), t("#site-navigation-wrap").length && (this.config.$mobileMenuStyle = wpexLocalize.mobileMenuStyle), this.config.$localScrollArray = this.localScrollLinksArray(), this.config.$body.hasClass("wpex-has-fixed-footer") && (this.config.$hasFixedFooter = !0), t(".footer-reveal").length && t("#wrap").length && t("#main").length && (this.config.$hasFooterReveal = !0), this.config.$siteHeader && this.config.$siteHeader.hasClass("fix-overlay-header") && (this.config.$hasHeaderOverlay = !0), wpexLocalize.isRTL && (this.config.$isRTL = !0), t("#top-bar-wrap").length && (this.config.$hasTopBar = !0, t("#top-bar-wrap").hasClass("wpex-top-bar-sticky") && (this.config.$stickyTopBar = t("#top-bar-wrap"))), wpexLocalize.localScrollSpeed && (this.config.localScrollSpeed = parseInt(wpexLocalize.localScrollSpeed)), this.config.$stickyTopBar && (this.config.$hasStickyTopBar = wpexLocalize.hasStickyTopBarMobile || this.config.$windowWidth >= wpexLocalize.stickyTopBarBreakPoint ? !0 : !1), this.config.$hasStickyMobileHeader = "toggle" == this.config.$mobileMenuStyle ? !1 : wpexLocalize.hasStickyMobileHeader, wpexLocalize.hasStickyHeader && (wpexLocalize.stickyHeaderBreakPoint && (this.config.$stickyHeaderBreakPoint = wpexLocalize.stickyHeaderBreakPoint), this.config.$hasStickyHeader = this.config.$hasStickyMobileHeader || this.config.$windowWidth >= this.config.$stickyHeaderBreakPoint ? !0 : !1), "undefined" != typeof $wpexRetinaLogo && window.devicePixelRatio >= 2 && (this.config.retinaLogo = $wpexRetinaLogo), this.config.$body.hasClass("wpex-has-vertical-header") && (this.config.$verticalHeaderActive = !0);
                var e = t(".dropdown-menu a");
                e.each(function() {
                    var e = t(this),
                        i = e.attr("href");
                    i && -1 != i.indexOf("localscroll-") && (e.parent("li").addClass("local-scroll"), e.parent("li.current-menu-item").removeClass("current-menu-item"))
                })
            },
            windowLoadUpdateConfig: function() {
                if (this.config.$siteHeader) {
                    var e = this.config.$siteHeader.offset().top;
                    this.config.$windowHeight = this.config.$window.height(), this.config.$siteHeaderHeight = this.config.$siteHeader.outerHeight(), this.config.$siteHeaderBottom = e + this.config.$siteHeaderHeight, this.config.$siteHeaderTop = e, this.config.$siteLogo && (this.config.$siteLogoHeight = this.config.$siteLogo.height())
                }
                this.config.$stickyTopBar && (this.config.$stickyTopBarHeight = this.config.$stickyTopBar.outerHeight(), t(".wpex-sticky-top-bar-holder").height(this.config.$stickyTopBarHeight)), this.config.$localScrollOffset = this.parseLocalScrollOffset()
            },
            resizeUpdateConfig: function() {
                this.config.$windowHeight = this.config.$window.height(), this.config.$windowWidth = this.config.$window.width(), this.config.$windowTop = this.config.$window.scrollTop(), this.config.$siteHeader && (t(".wpex-sticky-header-holder").length && t(".wpex-sticky-header-holder").height(""), this.config.$siteHeaderHeight = this.config.$siteHeader.outerHeight(), t(".wpex-sticky-header-holder").length && t(".wpex-sticky-header-holder").height(this.config.$siteHeaderHeight)), this.config.$windowWidth < 960 ? this.config.$verticalHeaderActive = !1 : this.config.$body.hasClass("wpex-has-vertical-header") && (this.config.$verticalHeaderActive = !0), this.config.$stickyTopBar && (this.config.$stickyTopBarHeight = this.config.$stickyTopBar.outerHeight(), t(".wpex-sticky-top-bar-holder").height(this.config.$stickyTopBarHeight)), this.config.$hasStickyTopBar && (this.stickyTopBar("unstick"), wpexLocalize.hasStickyTopBarMobile || this.config.$windowWidth >= wpexLocalize.stickyTopBarBreakPoint ? (this.config.$hasStickyTopBar = !0, this.stickyTopBar()) : wpexLocalize.hasStickyTopBarMobile || (this.config.$hasStickyTopBar = !1)), wpexLocalize.hasStickyHeader && (this.stickyHeader("unstick"), this.stickyHeaderShrink("destroy"), this.config.$hasStickyMobileHeader || this.config.$windowWidth >= wpexLocalize.stickyHeaderBreakPoint ? (this.config.$hasStickyHeader = !0, this.stickyHeader(), this.stickyHeaderShrink()) : this.config.$hasStickyMobileHeader || (this.config.$hasStickyHeader = !1)), this.config.$localScrollOffset = this.parseLocalScrollOffset()
            },
            mobileCheck: function() {
                return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? (this.config.$body.addClass("wpex-is-mobile-device"), !0) : void 0
            },
            pageAnimations: function() {
                t.fn.animsition && wpexLocalize.pageAnimation && t(".animsition").animsition({
                    touchSupport: !1,
                    inClass: wpexLocalize.pageAnimationIn,
                    outClass: wpexLocalize.pageAnimationOut,
                    inDuration: wpexLocalize.pageAnimationInDuration,
                    outDuration: wpexLocalize.pageAnimationOutDuration,
                    linkElement: 'a[href]:not([target="_blank"]):not([href^="#"]):not([href*="javascript"]):not([href*=".jpg"]):not([href*=".jpeg"]):not([href*=".gif"]):not([href*=".png"]):not([href*=".mov"]):not([href*=".swf"]):not([href*=".mp4"]):not([href*=".flv"]):not([href*=".avi"]):not([href*=".mp3"]):not([href^="mailto:"]):not([href*="?"]):not([href*="#localscroll"]):not([class="wcmenucart"])',
                    loading: !0
                })
            },
            superFish: function() {
                t.fn.superfish && t("#site-navigation ul.sf-menu").superfish({
                    delay: wpexLocalize.superfishDelay,
                    animation: {
                        opacity: "show"
                    },
                    animationOut: {
                        opacity: "hide"
                    },
                    speed: wpexLocalize.superfishSpeed,
                    speedOut: wpexLocalize.superfishSpeedOut,
                    cssArrows: !1,
                    disableHI: !1
                })
            },
            megaMenusWidth: function() {
                if (this.config.$siteHeader && "one" === wpexLocalize.siteHeaderStyle) {
                    var e = t("#site-navigation-wrap"),
                        i = this.config.$siteHeader.find(".container").outerWidth(),
                        n = e.outerWidth(),
                        s = e.css("right"),
                        s = parseInt(s);
                    "auto" == s && (s = 0);
                    var o = i - n - s;
                    t("#site-navigation-wrap .megamenu > ul").css({
                        width: i,
                        "margin-left": -o
                    })
                }
            },
            megaMenusTop: function() {
                if (this.config.$siteHeaderHeight && this.config.$siteNavWrap && this.config.$siteHeader.hasClass("header-one") && !t("#site-navigation-wrap").hasClass("wpex-flush-dropdowns") && this.config.$siteHeader.hasClass("header-one")) {
                    var e = this.config.$siteNavWrap.outerHeight(),
                        i = this.config.$siteHeaderHeight - e;
                    t("#site-navigation-wrap .megamenu > ul").css({
                        top: i / 2 + e
                    })
                }
            },
            flushDropdownsTop: function() {
                if (this.config.$siteHeaderHeight && this.config.$siteNavWrap && this.config.$siteNavWrap.hasClass("wpex-flush-dropdowns")) {
                    var e = this.config.$siteNavWrap.outerHeight(),
                        i = this.config.$siteHeaderHeight - e;
                    t("#site-navigation-wrap .dropdown-menu > .menu-item-has-children > ul").css({
                        top: i / 2 + e
                    })
                }
            },
            mobileMenu: function() {
                var e = this;
                if ("sidr" == this.config.$mobileMenuStyle && "undefined" != typeof wpexLocalize.sidrSource) {
                    var e = this;
                    t("a.mobile-menu-toggle, li.mobile-menu-toggle > a").sidr({
                        name: "sidr-main",
                        source: wpexLocalize.sidrSource,
                        side: wpexLocalize.sidrSide,
                        displace: wpexLocalize.sidrDisplace,
                        speed: parseInt(wpexLocalize.sidrSpeed),
                        renaming: !0,
                        onOpen: function() {
                            e.config.$body.addClass("wpex-noscroll");
                            var i = t(".sidr-class-menu-item-has-children");
                            i.children("a").append('<span class="sidr-class-dropdown-toggle"></span>');
                            var n = t(".sidr-class-dropdown-toggle");
                            "li" == wpexLocalize.sidrDropdownTarget && (n = t(".sidr-class-menu-item-has-children")), n.on(e.config.$isMobile ? "touchstart" : "click", function() {
                                if ("li" == wpexLocalize.sidrDropdownTarget) var e = t(this);
                                else var n = t(this).parent("a"),
                                    e = n.parent("li"); {
                                    var s = e.parents("li");
                                    e.children("ul")
                                }
                                return e.hasClass("active") ? e.removeClass("active").children("ul").slideUp("fast") : (i.not(s).removeClass("active").children("ul").slideUp("fast"), e.addClass("active").children("ul").slideDown("fast")), !1
                            }), e.config.$body.append('<div class="wpex-sidr-overlay wpex-hidden"></div>'), t(".wpex-sidr-overlay").fadeIn(wpexLocalize.sidrSpeed), t("#sidr-main").bind("mousewheel DOMMouseScroll", function(t) {
                                var e = t.originalEvent,
                                    i = e.wheelDelta || -e.detail;
                                this.scrollTop += 30 * (0 > i ? 1 : -1), t.preventDefault()
                            }), t("a.sidr-class-toggle-sidr-close").on(e.config.$isMobile ? "touchstart" : "click", function() {
                                return t.sidr("close", "sidr-main"), !1
                            }), t(".wpex-sidr-overlay").on(e.config.$isMobile ? "touchstart" : "click", function() {
                                return t.sidr("close", "sidr-main"), !1
                            }), e.config.$window.resize(function() {
                                e.config.$windowWidth >= e.config.$mobileMenuBreakpoint && t.sidr("close", "sidr-main")
                            })
                        },
                        onClose: function() {
                            e.config.$body.removeClass("wpex-noscroll"), t(".sidr-class-menu-item-has-children.active").removeClass("active").children("ul").hide(), t(".wpex-sidr-overlay").fadeOut(wpexLocalize.sidrSpeed, function() {
                                t(this).remove()
                            })
                        }
                    }), t("li.sidr-class-local-scroll > a").click(function() {
                        var i = this.hash;
                        return t.sidr("close", "sidr-main"), e.scrollTo(i), !1
                    })
                } else if ("toggle" == this.config.$mobileMenuStyle && this.config.$siteHeader) {
                    if (t("#wpex-mobile-menu-fixed-top").length ? t("#wpex-mobile-menu-fixed-top").append('<nav class="mobile-toggle-nav clr"></nav>') : t('<nav class="mobile-toggle-nav clr"></nav>').insertAfter(this.config.$siteHeader), t("#mobile-menu-alternative").length) var i = t("#mobile-menu-alternative .dropdown-menu").html();
                    else var i = t("#site-navigation .dropdown-menu").html();
                    t(".mobile-toggle-nav").html('<ul class="mobile-toggle-nav-ul">' + i + "</ul>"), t(".mobile-toggle-nav-ul, .mobile-toggle-nav-ul *").children().each(function() {
                        this.attributes;
                        t(this).removeAttr("style")
                    }), t(".mobile-toggle-nav-ul").addClass("container"), t(".mobile-menu-toggle").on(e.config.$isMobile ? "touchstart" : "click", function() {
                        return wpexLocalize.animateMobileToggle ? t(".mobile-toggle-nav").slideToggle("fast").toggleClass("visible") : t(".mobile-toggle-nav").toggle().toggleClass("visible"), !1
                    }), e.config.$window.resize(function() {
                        e.config.$windowWidth >= e.config.$mobileMenuBreakpoint && t(".mobile-toggle-nav").length && t(".mobile-toggle-nav").hide().removeClass("visible")
                    })
                } else if ("full_screen" == this.config.$mobileMenuStyle && this.config.$siteHeader) {
                    var n = wpexLocalize.fullScreenMobileMenuStyle ? wpexLocalize.fullScreenMobileMenuStyle : !1;
                    if (e.config.$body.append('<div class="full-screen-overlay-nav clr ' + n + '"><span class="full-screen-overlay-nav-close"></span><nav class="full-screen-overlay-nav-ul-wrapper"><ul class="full-screen-overlay-nav-ul"></ul></nav></div>'), t("#mobile-menu-alternative").length) var i = t("#mobile-menu-alternative .dropdown-menu").html();
                    else var i = t("#site-navigation .dropdown-menu").html();
                    t(".full-screen-overlay-nav-ul").html(i), t(".full-screen-overlay-nav, .full-screen-overlay-nav *").children().each(function() {
                        this.attributes;
                        t(this).removeAttr("style")
                    }), t(".mobile-menu-toggle").on(e.config.$isMobile ? "touchstart" : "click", function() {
                        return t(".full-screen-overlay-nav").addClass("visible"), e.config.$body.addClass("wpex-noscroll"), !1
                    }), t(".full-screen-overlay-nav-close").on(e.config.$isMobile ? "touchstart" : "click", function() {
                        return t(".full-screen-overlay-nav").removeClass("visible"), e.config.$body.removeClass("wpex-noscroll"), !1
                    })
                }
            },
            navNoClick: function() {
                t("li.nav-no-click > a, li.sidr-class-nav-no-click > a").live("click", function() {
                    return !1
                })
            },
            stickyTopBar: function(e) {
                if (this.config.$hasTopBar && this.config.$hasStickyTopBar && this.config.$stickyTopBar) {
                    var i = this;
                    if ("unstick" == e && t(".wpex-sticky-top-bar-holder").length) return i.config.$stickyTopBar.unstick(), i.config.$stickyTopBarHeight = t("#top-bar-wrap").outerHeight(), void t(".wpex-sticky-top-bar-holder").height("");
                    if (i.config.$hasStickyTopBar && !t(".wpex-sticky-top-bar-holder").length) {
                        var n = t("#wpex-mobile-menu-fixed-top");
                        if (n.is(":visible")) var s = n.outerHeight();
                        else var s = 0;
                        i.config.$stickyTopBar.sticky({
                            topSpacing: s,
                            getWidthFrom: "#wrap",
                            responsiveWidth: !0,
                            wrapperClassName: "wpex-sticky-top-bar-holder"
                        }), i.config.$stickyTopBar.on("sticky-start", function() {
                            t(".wpex-sticky-top-bar-holder").height(i.config.$stickyTopBar.outerHeight())
                        })
                    }
                }
            },
            stickyHeader: function(e) {
                var i = this,
                    n = t(".fixed-nav"),
                    s = 0,
                    o = t("#wpex-mobile-menu-fixed-top");
                if ("unstick" == e) {
                    if (t(".wpex-sticky-header-holder").length) {
                        i.stickyHeaderShrink("resize_destroy"), t("#site-header.fixed-scroll").unstick(), t(".wpex-sticky-header-holder").css("height", "");
                        var a = i.config.retinaLogo ? i.config.retinaLogo : i.config.$siteLogoSrc;
                        a && i.config.$siteLogo.attr("src", a)
                    }
                    t(".wpex-sticky-menu-holder").length && t(".fixed-nav").unstick()
                } else {
                    if (!this.config.$siteHeader || !this.config.$hasStickyHeader) return;
                    if (i.config.$hasStickyTopBar && (s += i.config.$stickyTopBar.outerHeight()), o.is(":visible") && (s += o.outerHeight()), t(".wpex-sticky-header-holder").length) return;
                    i.config.$siteHeader.hasClass("fixed-scroll") ? (i.config.$siteHeader.sticky({
                        topSpacing: s,
                        getWidthFrom: "#wrap",
                        responsiveWidth: !0,
                        wrapperClassName: "wpex-sticky-header-holder"
                    }), t(".wpex-sticky-header-holder").height(i.config.$siteHeaderHeight), i.config.$siteHeader.on("sticky-start", function() {
                        i.config.$siteLogo && wpexLocalize.stickyheaderCustomLogo && !i.config.$siteHeader.hasClass("wpex-shrink-sticky-header") && i.config.$siteLogo.attr("src", wpexLocalize.stickyheaderCustomLogo)
                    }), i.config.$siteHeader.on("sticky-end", function() {
                        if (!i.config.$siteHeader.hasClass("wpex-shrink-sticky-header")) {
                            var t = i.config.retinaLogo ? i.config.retinaLogo : i.config.$siteLogoSrc;
                            t && i.config.$siteLogo.attr("src", t)
                        }
                    })) : n.length && (n.sticky({
                        topSpacing: s,
                        getWidthFrom: "#wrap",
                        responsiveWidth: !0,
                        wrapperClassName: "wpex-sticky-menu-holder"
                    }), n.on("sticky-start", function() {
                        t(".wpex-sticky-menu-holder").height(n.outerHeight())
                    }), n.on("sticky-end", function() {
                        t(".wpex-sticky-menu-holder").height("")
                    }))
                }
            },
            stickyHeaderShrink: function(e) {
                function i() {
                    if (s.config.$siteHeader.hasClass("wpex-header-shrunk")) {
                        o.stop(!0, !0).animate({
                            height: l,
                            "padding-top": a,
                            "padding-bottom": r
                        }, {
                            duration: c,
                            queue: !1
                        });
                        var t = s.config.retinaLogo ? s.config.retinaLogo : s.config.$siteLogoSrc;
                        t && s.config.$siteLogo.attr("src", t), s.config.$siteLogo && s.config.$siteLogo.stop(!0, !0).animate({
                            height: s.config.$siteLogoHeight
                        }, {
                            duration: c,
                            queue: !1
                        }), setTimeout(function() {
                            s.config.$siteHeaderHeight = s.config.$siteHeader.outerHeight(), s.megaMenusTop(), s.flushDropdownsTop()
                        }, c), s.config.$siteHeader.removeClass("wpex-header-shrunk")
                    }
                }

                function n() {
                    if (h) {
                        o.css({
                            height: "",
                            "padding-top": "",
                            "padding-bottom": ""
                        });
                        var t = s.config.retinaLogo ? s.config.retinaLogo : s.config.$siteLogoSrc;
                        t && s.config.$siteLogo.attr("src", t), s.config.$siteLogo && s.config.$siteLogo.css({
                            height: s.config.$siteLogoHeight
                        }), s.config.$siteHeaderHeight = s.config.$siteHeader.outerHeight(), s.megaMenusTop(), s.flushDropdownsTop(), s.config.$siteHeader.removeClass("wpex-header-shrunk")
                    }
                }
                if (this.config.$siteHeader && this.config.$siteHeader.hasClass("wpex-shrink-sticky-header") && t(".wpex-sticky-header-holder").length) {
                    var s = this,
                        o = t("#site-header-inner"),
                        a = t("#site-header-inner").css("padding-top"),
                        r = t("#site-header-inner").css("padding-bottom"),
                        l = o.outerHeight(),
                        h = parseInt(wpexLocalize.shrinkHeaderHeight),
                        d = parseInt(wpexLocalize.shrinkHeaderLogoHeight),
                        c = 300;
                    if ("destroy" == e) return void i();
                    if ("resize_destroy" == e) return void n();
                    var u = wpexLocalize.stickyShrinkOffset;
                    s.config.$siteHeaderBottom && (u = s.config.$siteHeaderBottom), s.config.$window.scroll(function() {
                        s.config.$hasStickyHeader && (s.config.$windowTop > u ? s.config.$siteHeader.hasClass("wpex-header-shrunk") || (o.stop(!0, !0).animate({
                            height: h,
                            "padding-top": "0",
                            "padding-bottom": "0"
                        }, {
                            duration: c,
                            queue: !1
                        }), s.config.$siteLogo && s.config.$siteLogo.stop(!0, !0).animate({
                            height: d
                        }, {
                            duration: c,
                            queue: !1
                        }), s.config.$siteLogo && wpexLocalize.stickyheaderCustomLogo && s.config.$siteLogo.attr("src", wpexLocalize.stickyheaderCustomLogo), setTimeout(function() {
                            s.config.$siteHeaderHeight = s.config.$siteHeader.outerHeight(), s.megaMenusTop(), s.flushDropdownsTop()
                        }, c), s.config.$siteHeader.addClass("wpex-header-shrunk")) : i())
                    })
                }
            },
            overlayHeaderTopWrapPadding: function() {
                if (this.config.$hasTopBar && this.config.$hasHeaderOverlay) {
                    var e = t("boxed" == wpexLocalize.mainLayout ? "#wrap" : "#outer-wrap");
                    t(e).css({
                        "padding-top": t("#top-bar-wrap").outerHeight()
                    }), t("#site-header.overlay-header").css({
                        top: t("#top-bar-wrap").outerHeight()
                    });
                    var i = t(".offset-overlay-header").first();
                    i.length && this.config.$siteHeaderHeight && i.css({
                        "padding-top": this.config.$siteHeaderHeight + 60
                    })
                }
            },
            menuSearch: function() {
                if ("drop_down" == wpexLocalize.menuSearchStyle) t("a.search-dropdown-toggle").click(function() {
                    return t("#searchform-dropdown").toggleClass("show"), t("#searchform-dropdown input").focus(), t(this).parent("li").toggleClass("active"), t("div#current-shop-items-dropdown").removeClass("show"), t("li.wcmenucart-toggle-dropdown").removeClass("active"), !1
                }), t("#searchform-dropdown").click(function(t) {
                    t.stopPropagation()
                });
                else if ("overlay" == wpexLocalize.menuSearchStyle) {
                    if (!t.fn.leanerModal) return;
                    var e = t("a.search-overlay-toggle");
                    e.leanerModal({
                        id: "#searchform-overlay",
                        top: 100,
                        overlay: .8
                    }), e.click(function() {
                        t("#site-searchform input").focus()
                    })
                } else if ("header_replace" == wpexLocalize.menuSearchStyle) {
                    var i = t("#searchform-header-replace");
                    t("a.search-header-replace-toggle").click(function() {
                        return i.toggleClass("show"), i.find("input").focus(), !1
                    }), t("#searchform-header-replace-close").click(function() {
                        return i.removeClass("show"), !1
                    }), i.click(function(t) {
                        t.stopPropagation()
                    })
                }
            },
            headerCart: function() {
                if (!t("a.wcmenucart").hasClass("go-to-shop"))
                    if ("drop_down" == wpexLocalize.wooCartStyle) t(".toggle-cart-widget").click(function() {
                        return t("#searchform-dropdown").removeClass("show"), t("a.search-dropdown-toggle").parent("li").removeClass("active"), t("div#current-shop-items-dropdown").toggleClass("show"), t(this).toggleClass("active"), !1
                    }), t("div#current-shop-items-dropdown").click(function(t) {
                        t.stopPropagation()
                    }), this.config.$document.click(function() {
                        t("div#current-shop-items-dropdown").removeClass("show"), t("li.wcmenucart-toggle-dropdown").removeClass("active")
                    }), t("#current-shop-items-dropdown").bind("mousewheel DOMMouseScroll", function(t) {
                        var e = t.originalEvent,
                            i = e.wheelDelta || -e.detail;
                        this.scrollTop += 30 * (0 > i ? 1 : -1), t.preventDefault()
                    });
                    else if ("overlay" == wpexLocalize.wooCartStyle) {
                    if (!t.fn.leanerModal) return;
                    t(".toggle-cart-widget").leanerModal({
                        id: "#current-shop-items-overlay",
                        top: 100,
                        overlay: .8
                    })
                }
            },
            cartSearchDropdownsRelocate: function() {
                var e = t("#site-navigation .dropdown-menu > li:nth-last-child(1)");
                if (!this.config.$hasHeaderOverlay && this.config.$siteHeader && e.length && this.config.$siteHeader.hasClass("wpex-reposition-cart-search-drops")) {
                    var i = t("#searchform-dropdown"),
                        n = t("#current-shop-items-dropdown"),
                        s = e.position();
                    if (i.length) {
                        var o = s.left - i.outerWidth() + e.width();
                        i.css({
                            right: "auto",
                            left: o
                        })
                    }
                    if (n.length) {
                        var a = s.left - n.outerWidth() + e.width();
                        n.css({
                            right: "auto",
                            left: a
                        })
                    }
                }
            },
            hideEditLink: function() {
                t("a.hide-post-edit").click(function() {
                    return t("div.post-edit").hide(), !1
                })
            },
            customMenuWidgetAccordion: function() {
                var e = this;
                t("#main .widget_nav_menu .current-menu-ancestor").addClass("active").children("ul").show(), t("#main .widget_nav_menu").each(function() {
                    {
                        var i = (t(this), t(this).find(".menu-item-has-children"));
                        i.children(".sub-menu")
                    }
                    i.each(function() {
                        t(this).addClass("parent");
                        var n = t(this).children("a");
                        n.on(e.config.$isMobile ? "touchstart" : "click", function() {
                            var e = t(this).parent("li"),
                                n = e.parents("li");
                            return e.hasClass("active") ? e.removeClass("active").children(".sub-menu").slideUp("fast") : (i.not(n).removeClass("active").children(".sub-menu").slideUp("fast"), e.addClass("active").children(".sub-menu").slideDown("fast")), !1
                        })
                    })
                })
            },
            inlineHeaderLogo: function() {
                if ("five" == wpexLocalize.siteHeaderStyle) {
                    var e = t("#site-header-inner > .header-five-logo"),
                        i = t("#site-header-inner .navbar-style-five"),
                        n = i.children("#site-navigation").children("ul").children("li").size(),
                        s = Math.round(n / 2) - parseInt(wpexLocalize.headerFiveSplitOffset),
                        o = t(".menu-item-logo .header-five-logo");
                    this.config.$windowWidth >= this.config.$mobileMenuBreakpoint && e.length && i.length && (t('<li class="menu-item-logo"></li>').insertAfter(i.find("#site-navigation > ul > li:nth( " + s + " )")), e.appendTo(i.find(".menu-item-logo"))), this.config.$windowWidth < this.config.$mobileMenuBreakpoint && o.length && (o.prependTo(t("#site-header-inner")), t(".menu-item-logo").remove()), e.addClass("display")
                }
            },
            backTopLink: function() {
                var e = this,
                    i = t("a#site-scroll-top");
                if (i.length) {
                    var n = wpexLocalize.windowScrollTopSpeed ? wpexLocalize.windowScrollTopSpeed : 2e3,
                        n = parseInt(n);
                    this.config.$window.scroll(function() {
                        t(this).scrollTop() > 100 ? i.addClass("show") : i.removeClass("show")
                    }), i.on(e.config.$isMobile ? "touchstart" : "click", function() {
                        return t("html, body").stop(!0, !0).animate({
                            scrollTop: 0
                        }, n), !1
                    })
                }
            },
            smoothCommentScroll: function() {
                t(".single li.comment-scroll a").click(function() {
                    return t("html, body").stop(!0, !0).animate({
                        scrollTop: t(this.hash).offset().top - 180
                    }, "normal"), !1
                })
            },
            tipsyTooltips: function() {
                t("a.tooltip-left").tipsy({
                    fade: !0,
                    gravity: "e"
                }), t("a.tooltip-right").tipsy({
                    fade: !0,
                    gravity: "w"
                }), t("a.tooltip-up").tipsy({
                    fade: !0,
                    gravity: "s"
                }), t("a.tooltip-down").tipsy({
                    fade: !0,
                    gravity: "n"
                })
            },
            customHovers: function() {
                t(".wpex-data-hover").each(function() {
                    var e = t(this),
                        i = t(this).css("backgroundColor"),
                        n = t(this).css("color"),
                        s = t(this).attr("data-hover-background"),
                        o = t(this).attr("data-hover-color");
                    e.hover(function() {
                        "undefined" !== CSSStyleDeclaration.prototype.setProperty ? (s && this.style.setProperty("background-color", s, "important"), o && this.style.setProperty("color", o, "important")) : (s && e.css("background-color", s), o && e.css("color", o))
                    }, function() {
                        "undefined" !== CSSStyleDeclaration.prototype.setProperty ? (s && this.style.setProperty("background-color", i, "important"), o && this.style.setProperty("color", n, "important")) : (s && i && e.css("background-color", i), o && n && e.css("color", n))
                    })
                })
            },
            toggleBar: function() {
                var e = this,
                    i = t("a.toggle-bar-btn");
                i.length && (i.on(e.config.$isMobile ? "touchstart" : "click", function() {
                    var e = t(".toggle-bar-btn").find(".fa");
                    return e.toggleClass(i.data("icon")), e.toggleClass(i.data("icon-hover")), t("#toggle-bar-wrap").toggleClass("active-bar"), !1
                }), t("#toggle-bar-wrap").click(function(t) {
                    t.stopPropagation()
                }))
            },
            skillbar: function() {
                t(".vcex-skillbar").each(function() {
                    var e = t(this);
                    e.appear(function() {
                        e.find(".vcex-skillbar-bar").animate({
                            width: t(this).attr("data-percent")
                        }, 800)
                    })
                }, {
                    accX: 0,
                    accY: 0
                })
            },
            milestone: function() {
                t(".vcex-animated-milestone").each(function() {
                    t(this).appear(function() {
                        t(this).find(".vcex-milestone-time").countTo({
                            formatter: function(t, e) {
                                return t.toFixed(e.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ",")
                            }
                        })
                    }, {
                        accX: 0,
                        accY: 0
                    })
                })
            },
            parallax: function() {
                t(".wpex-parallax-bg").each(function() {
                    var e = t(this);
                    e.scrolly2().trigger("scroll"), e.css({
                        opacity: 1
                    })
                })
            },
            parseLocalScrollOffset: function() {
                if (wpexLocalize.localScrollOffset) return wpexLocalize.localScrollOffset;
                if (!this.config.$siteHeader || this.config.$verticalHeaderActive) return 0;
                var e = 0;
                return this.config.$siteHeaderHeight && this.config.$siteHeader.hasClass("fixed-scroll") && (e = !this.config.$hasStickyMobileHeader && this.config.$windowWidth <= wpexLocalize.stickyHeaderBreakPoint ? 0 : this.config.$siteHeader.hasClass("wpex-shrink-sticky-header") ? wpexLocalize.shrinkHeaderHeight : this.config.$siteHeaderHeight), t("#site-navigation-wrap").length && t("#site-navigation-wrap").hasClass("fixed-nav") && this.config.$windowWidth >= wpexLocalize.stickyHeaderBreakPoint && (e = parseInt(e) + parseInt(t("#site-navigation-wrap").outerHeight())), this.config.$hasStickyTopBar && this.config.$stickyTopBarHeight && (e = parseInt(e) + parseInt(this.config.$stickyTopBarHeight)), e
            },
            localScrollLinksArray: function() {
                var e = [];
                if (!t("li.local-scroll").length) return e;
                for (var i = t("#site-navigation li.local-scroll").children("a"), n = 0; n < i.length; n++) {
                    var s = i[n],
                        o = "#" + t(s).attr("href").replace(/^.*?(#|$)/, "");
                    o && (t('[data-ls_id="' + o + '"]').length ? e.push(o) : t(o).length && e.push(o))
                }
                return e
            },
            scrollTo: function(e, i) {
                if (e) {
                    var n = this,
                        s = null,
                        o = t("html, body"),
                        a = !1,
                        r = n.config.$localScrollSpeed ? parseInt(n.config.$localScrollSpeed) : 1e3,
                        l = t('[data-ls_id="' + e + '"]');
                    if (l.length) s = l, a = !0;
                    else if (-1 != e.indexOf("localscroll-")) {
                        var h = e.replace("localscroll-", "");
                        l = t('[data-ls_id="' + h + '"]'), s = l.length ? l : t(h)
                    } else s = t(e);
                    if (s.length) {
                        e && a && wpexLocalize.localScrollUpdateHash && (window.location.hash = e);
                        var d = t(".mobile-toggle-nav");
                        if (d.length && d.is(":visible")) wpexLocalize.animateMobileToggle ? t(".mobile-toggle-nav").slideUp("fast", function() {
                            t(".mobile-toggle-nav").removeClass("visible"), o.stop(!0, !0).animate({
                                scrollTop: s.offset().top
                            }, r)
                        }) : (t(".mobile-toggle-nav").hide().removeClass("visible"), o.stop(!0, !0).animate({
                            scrollTop: s.offset().top
                        }, r));
                        else {
                            var c = i ? i : s.offset().top - n.config.$localScrollOffset;
                            o.stop(!0, !0).animate({
                                scrollTop: c
                            }, r)
                        }
                    }
                }
            },
            localScrollLinks: function() {
                var e = this;
                t("li.local-scroll > a, .vcex-navbar-link.local-scroll").on("click", function() {
                    var t = this.hash;
                    return e.scrollTo(t), !1
                }), t(".local-scroll-link").click(function() {
                    var t = this.hash;
                    return e.scrollTo(t), !1
                }), t("body.single div.entry-summary a.woocommerce-review-link").click(function() {
                    var i = this.hash,
                        n = t(i);
                    if (n.length) {
                        var s = n.offset().top - e.config.$localScrollOffset - 20;
                        e.scrollTo(i, s)
                    }
                    return !1
                })
            },
            localScrollHighlight: function() {
                var e = this,
                    i = this.config.$localScrollArray;
                if (i.length) {
                    for (var n = this.config.$window.scrollTop(), s = this.config.$windowHeight, o = this.config.$document.height(), a = 0; a < i.length; a++) {
                        var r = i[a];
                        if (t('[data-ls_id="' + r + '"]').length) {
                            var l = t('[data-ls_id="' + r + '"]'),
                                h = l.offset().top - e.config.$localScrollOffset - 1,
                                d = l.outerHeight();
                            n >= h && h + d > n ? t("li.local-scroll a[href='" + r + "']").parent("li").addClass("current-menu-item") : t("li.local-scroll a[href='" + r + "']").parent("li").removeClass("current-menu-item")
                        } else if (t(r).length) {
                            var h = t(r).offset().top - e.config.$localScrollOffset - 1,
                                d = t(r).outerHeight();
                            n >= h && h + d > n ? t("li.local-scroll a[href='" + r + "']").parent("li").addClass("current-menu-item") : t("li.local-scroll a[href='" + r + "']").parent("li").removeClass("current-menu-item")
                        }
                    }
                    var c = i[i.length - 1];
                    n + s == o && (t(".local-scroll.current-menu-item").removeClass("current-menu-item"), t("li.local-scroll a[href='" + c + "']").parent("li").addClass("current-menu-item"))
                }
            },
            scrollToHash: function(e) {
                var i = e,
                    n = location.hash;
                if (n) return -1 != n.indexOf("localscroll-") ? void i.scrollTo(n.replace("localscroll-", "")) : void(t('[data-ls_id="' + n + '"]') && i.scrollTo(n))
            },
            equalHeights: function() {
                t.fn.matchHeight && t(".equal-height-column, .match-height-row .match-height-content, .vcex-feature-box-match-height .vcex-match-height, .equal-height-content, .match-height-grid .match-height-content, .blog-entry-equal-heights .blog-entry-inner, .wpex-vc-row-columns-match-height .wpex-vc-column-wrapper").matchHeight()
            },
            footerRevealInit: function() {
                if (this.config.$hasFooterReveal) {
                    var e = !1,
                        i = t(window).height(),
                        n = t(".footer-reveal").outerHeight();
                    i > t("#wrap").height() && (e = !0), n > i && (e = !0), e ? t(".footer-reveal").show().toggleClass("footer-reveal footer-reveal-visible") : t("#wrap").css({
                        "margin-bottom": n
                    })
                }
            },
            footerRevealScrollShow: function() {
                this.config.$hasFooterReveal && (this.config.$windowTop > t("#main").offset().top ? t(".footer-reveal").hasClass("wpex-visible") || t(".footer-reveal").show().addClass("wpex-visible") : t(".footer-reveal").hasClass("wpex-visible") && t(".footer-reveal").removeClass("wpex-visible").hide())
            },
            fixedFooter: function() {
                if (this.config.$hasFixedFooter) {
                    var e = t("#main");
                    if (e.length) {
                        var i = t("#main").outerHeight(),
                            n = t("html").height(),
                            s = i + (this.config.$window.height() - n);
                        e.css("min-height", s)
                    }
                }
            },
            customSelects: function() {
                t(wpexLocalize.customSelects).customSelect({
                    customClass: "theme-select"
                })
            },
            fadeIn: function() {
                t(".fade-in-image, .wpex-show-on-load").addClass("no-opacity")
            },
            owlCarousel: function() {
                var e = this;
                t(".wpex-carousel").each(function() {
                    var i = t(this),
                        n = i.data();
                    i.owlCarousel({
                        animateIn: !1,
                        animateOut: !1,
                        lazyLoad: !1,
                        smartSpeed: e.parseData(n.smartSpeed, wpexLocalize.carouselSpeed),
                        rtl: e.config.$isRTL,
                        dots: n.dots,
                        nav: n.nav,
                        items: n.items,
                        slideBy: n.slideby,
                        center: n.center,
                        loop: n.loop,
                        margin: n.margin,
                        autoplay: n.autoplay,
                        autoplayTimeout: n.autoplayTimeout,
                        navText: ['<span class="fa fa-chevron-left"><span>', '<span class="fa fa-chevron-right"></span>'],
                        responsive: {
                            0: {
                                items: n.itemsMobilePortrait
                            },
                            480: {
                                items: n.itemsMobileLandscape
                            },
                            768: {
                                items: n.itemsTablet
                            },
                            960: {
                                items: n.items
                            }
                        }
                    })
                })
            },
            sliderPro: function() {
                var e = this;
                t(".wpex-slider").each(function() {
                    var i = t(this),
                        n = i.data();
                    t(".wpex-slider-slide, .wpex-slider-thumbnails").css({
                        opacity: 1,
                        display: "block"
                    });
                    var s = t(".wpex-slider").prev(".wpex-slider-preloaderimg"),
                        o = s.length ? s.outerHeight() : null,
                        a = e.parseData(n.heightAnimationDuration, 500);
                    i.sliderPro({
                        responsive: !0,
                        width: "100%",
                        height: o,
                        fade: e.parseData(n.fade, 600),
                        touchSwipe: e.parseData(n.touchSwipe, !0),
                        fadeDuration: e.parseData(n.animationSpeed, 600),
                        slideAnimationDuration: e.parseData(n.animationSpeed, 600),
                        autoHeight: e.parseData(n.autoHeight, !0),
                        heightAnimationDuration: a,
                        arrows: e.parseData(n.arrows, !0),
                        fadeArrows: e.parseData(n.fadeArrows, !0),
                        autoplay: e.parseData(n.autoPlay, !0),
                        autoplayDelay: e.parseData(n.autoPlayDelay, 5e3),
                        buttons: e.parseData(n.buttons, !0),
                        shuffle: e.parseData(n.shuffle, !1),
                        orientation: e.parseData(n.direction, "horizontal"),
                        loop: e.parseData(n.loop, !1),
                        keyboard: !1,
                        fullScreen: e.parseData(n.fullscreen, !1),
                        slideDistance: e.parseData(n.slideDistance, 0),
                        thumbnailHeight: e.parseData(n.thumbnailHeight, 70),
                        thumbnailWidth: e.parseData(n.thumbnailWidth, 70),
                        thumbnailPointer: e.parseData(n.thumbnailPointer, !1),
                        updateHash: e.parseData(n.updateHash, !1),
                        thumbnailArrows: !1,
                        fadeThumbnailArrows: !1,
                        thumbnailTouchSwipe: !0,
                        fadeCaption: e.parseData(n.fadeCaption, !0),
                        captionFadeDuration: 500,
                        waitForLayers: !0,
                        autoScaleLayers: !0,
                        forceSize: "none",
                        thumbnailPosition: "bottom",
                        reachVideoAction: "playVideo",
                        leaveVideoAction: "pauseVideo",
                        endVideoAction: "nextSlide",
                        init: function() {
                            i.prev(".wpex-slider-preloaderimg").hide(), i.parent(".gallery-format-post-slider") && t(".blog-masonry-grid").length && setTimeout(function() {
                                t(".blog-masonry-grid").isotope("layout")
                            }, a + 1)
                        },
                        gotoSlideComplete: function() {
                            i.parent(".gallery-format-post-slider") && t(".blog-masonry-grid").length && t(".blog-masonry-grid").isotope("layout")
                        }
                    })
                }), t(".woo-product-entry-slider").click(function() {
                    return !1
                })
            },
            isotopeGrids: function() {
                var e = this;
                t(".vcex-isotope-grid").each(function() {
                    var i = t(this);
                    i.imagesLoaded(function() {
                        var n = i.isotope({
                                itemSelector: ".vcex-isotope-entry",
                                transformsEnabled: !0,
                                isOriginLeft: e.config.$isRTL ? !1 : !0,
                                transitionDuration: i.data("transition-duration") ? i.data("transition-duration") + "s" : "0.4s",
                                layoutMode: i.data("layout-mode") ? i.data("layout-mode") : "masonry",
                                filter: i.data("filter") ? i.data("filter") : ""
                            }),
                            s = i.prev("ul.vcex-filter-links");
                        if (s.length) {
                            var o = s.find("a");
                            o.click(function() {
                                return n.isotope({
                                    filter: t(this).attr("data-filter")
                                }), t(this).parents("ul").find("li").removeClass("active"), t(this).parent("li").addClass("active"), !1
                            })
                        }
                    })
                })
            },
            archiveMasonryGrids: function() {
                var e = this,
                    i = t(".blog-masonry-grid,div.wpex-row.portfolio-masonry,div.wpex-row.portfolio-no-margins,div.wpex-row.staff-masonry,div.wpex-row.staff-no-margins");
                i.each(function() {
                    {
                        var i = t(this),
                            n = i.data(),
                            s = e.parseData(n.transitionDuration, "0.0");
                        e.parseData(n.layoutMode, "masonry")
                    }
                    i.imagesLoaded(function() {
                        i.isotope({
                            itemSelector: ".isotope-entry",
                            transformsEnabled: !0,
                            isOriginLeft: e.config.$isRTL ? !1 : !0,
                            transitionDuration: s + "s"
                        })
                    })
                })
            },
            iLightbox: function() {
                var e = this;
                t(".wpex-lightbox").each(function() {
                    var i = t(this);
                    if (!i.hasClass("wpex-lightbox-group-item")) {
                        var n = i.data();
                        i.iLightBox({
                            skin: e.parseData(n.skin, wpexLocalize.iLightbox.skin),
                            controls: {
                                fullscreen: wpexLocalize.iLightbox.controls.fullscreen
                            },
                            show: {
                                title: wpexLocalize.iLightbox.show.title,
                                speed: parseInt(wpexLocalize.iLightbox.show.speed)
                            },
                            hide: {
                                speed: parseInt(wpexLocalize.iLightbox.hide.speed)
                            },
                            effects: {
                                reposition: !0,
                                repositionSpeed: 200,
                                switchSpeed: 300,
                                loadedFadeSpeed: wpexLocalize.iLightbox.effects.loadedFadeSpeed,
                                fadeSpeed: wpexLocalize.iLightbox.effects.fadeSpeed
                            },
                            overlay: wpexLocalize.iLightbox.overlay,
                            social: wpexLocalize.iLightbox.social
                        })
                    }
                }), t(".wpex-lightbox-video, .wpb_single_image.video-lightbox a, .wpex-lightbox-autodetect, .wpex-lightbox-autodetect a").each(function() {
                    var i = t(this),
                        n = i.data();
                    i.iLightBox({
                        smartRecognition: !0,
                        skin: e.parseData(n.skin, wpexLocalize.iLightbox.skin),
                        path: "horizontal",
                        controls: {
                            fullscreen: wpexLocalize.iLightbox.controls.fullscreen
                        },
                        show: {
                            title: wpexLocalize.iLightbox.show.title,
                            speed: parseInt(wpexLocalize.iLightbox.show.speed)
                        },
                        hide: {
                            speed: parseInt(wpexLocalize.iLightbox.hide.speed)
                        },
                        effects: {
                            reposition: !0,
                            repositionSpeed: 200,
                            switchSpeed: 300,
                            loadedFadeSpeed: wpexLocalize.iLightbox.effects.loadedFadeSpeed,
                            fadeSpeed: wpexLocalize.iLightbox.effects.fadeSpeed
                        },
                        overlay: wpexLocalize.iLightbox.overlay,
                        social: wpexLocalize.iLightbox.social
                    })
                }), t(".lightbox-group").each(function() {
                    var i = t(this),
                        n = i.find("a.wpex-lightbox-group-item"),
                        s = i.data();
                    n.iLightBox({
                        skin: e.parseData(s.skin, wpexLocalize.iLightbox.skin),
                        path: e.parseData(s.path, wpexLocalize.iLightbox.path),
                        infinite: !0,
                        show: {
                            title: wpexLocalize.iLightbox.show.title,
                            speed: parseInt(wpexLocalize.iLightbox.show.speed)
                        },
                        hide: {
                            speed: parseInt(wpexLocalize.iLightbox.hide.speed)
                        },
                        controls: {
                            arrows: e.parseData(s.arrows, wpexLocalize.iLightbox.controls.arrows),
                            thumbnail: e.parseData(s.thumbnails, wpexLocalize.iLightbox.controls.thumbnail),
                            fullscreen: wpexLocalize.iLightbox.controls.fullscreen,
                            mousewheel: wpexLocalize.iLightbox.controls.mousewheel
                        },
                        effects: {
                            reposition: !0,
                            repositionSpeed: 200,
                            switchSpeed: 300,
                            loadedFadeSpeed: wpexLocalize.iLightbox.effects.loadedFadeSpeed,
                            fadeSpeed: wpexLocalize.iLightbox.effects.fadeSpeed
                        },
                        overlay: wpexLocalize.iLightbox.overlay,
                        social: wpexLocalize.iLightbox.social
                    })
                }), t(".wpex-lightbox-gallery").on("click", function() {
                    var e = t(this).data("gallery").split(",");
                    return e && t.iLightBox(e, {
                        skin: wpexLocalize.iLightbox.skin,
                        path: "horizontal",
                        infinite: !0,
                        show: {
                            title: wpexLocalize.iLightbox.show.title,
                            speed: parseInt(wpexLocalize.iLightbox.show.speed)
                        },
                        hide: {
                            speed: parseInt(wpexLocalize.iLightbox.hide.speed)
                        },
                        controls: {
                            arrows: wpexLocalize.iLightbox.controls.arrows,
                            thumbnail: wpexLocalize.iLightbox.controls.thumbnail,
                            fullscreen: wpexLocalize.iLightbox.controls.fullscreen,
                            mousewheel: wpexLocalize.iLightbox.controls.mousewheel
                        },
                        effects: {
                            reposition: !0,
                            repositionSpeed: 200,
                            switchSpeed: 300,
                            loadedFadeSpeed: wpexLocalize.iLightbox.effects.loadedFadeSpeed,
                            fadeSpeed: wpexLocalize.iLightbox.effects.fadeSpeed
                        },
                        overlay: wpexLocalize.iLightbox.overlay,
                        social: wpexLocalize.iLightbox.social
                    }), !1
                })
            },
            overlayHovers: function() {
                t(".overlay-parent-title-push-up").each(function() {
                    var e = t(this),
                        i = e.find(".overlay-title-push-up"),
                        n = e.find("a"),
                        s = n.find("img"),
                        o = i.outerHeight();
                    e.imagesLoaded(function() {
                        i.css({
                            bottom: -o
                        }), n.css({
                            height: s.outerHeight()
                        }), s.css({
                            position: "absolute",
                            top: "0",
                            left: "0",
                            width: "100%",
                            height: "100%"
                        }), e.hover(function() {
                            s.css({
                                top: -20
                            }), i.css({
                                bottom: 0
                            })
                        }, function() {
                            s.css({
                                top: "0"
                            }), i.css({
                                bottom: -o
                            })
                        })
                    })
                })
            },
            wooSelects: function() {
                void 0 !== t.fn.select2 && t("#calc_shipping_country").select2()
            },
            parseData: function(t, e) {
                return "undefined" != typeof t ? t : e
            }
        };
        e.init()
    }(jQuery);;
document.documentElement.className += ' js_active ';
document.documentElement.className += 'ontouchstart' in document.documentElement ? ' vc_mobile ' : ' vc_desktop ';
(function() {
    var prefix = ['-webkit-', '-moz-', '-ms-', '-o-', ''];
    for (var i = 0; i < prefix.length; i++) {
        if (prefix[i] + 'transform' in document.documentElement.style) {
            document.documentElement.className += " vc_transform ";
        }
    }
})();
jQuery(window).load(function() {});

function vc_js() {
    vc_twitterBehaviour();
    vc_toggleBehaviour();
    vc_tabsBehaviour();
    vc_accordionBehaviour();
    vc_teaserGrid();
    vc_carouselBehaviour();
    vc_slidersBehaviour();
    vc_prettyPhoto();
    vc_googleplus();
    vc_pinterest();
    vc_progress_bar();
    vc_plugin_flexslider();
    vc_google_fonts();
    vc_gridBehaviour();
    vc_rowBehaviour();
    vc_ttaActivation();
    jQuery(document).trigger('vc_js');
    window.setTimeout(vc_waypoints, 500);
}
jQuery(document).ready(function($) {
    window.vc_js();
});
if ('function' !== typeof(window['vc_plugin_flexslider'])) {
    window.vc_plugin_flexslider = function($parent) {
        var $slider = $parent ? $parent.find('.wpb_flexslider') : jQuery('.wpb_flexslider');
        $slider.each(function() {
            var this_element = jQuery(this);
            var sliderSpeed = 800,
                sliderTimeout = parseInt(this_element.attr('data-interval')) * 1000,
                sliderFx = this_element.attr('data-flex_fx'),
                slideshow = true;
            if (0 === sliderTimeout) {
                slideshow = false;
            }
            this_element.is(':visible') && this_element.flexslider({
                animation: sliderFx,
                slideshow: slideshow,
                slideshowSpeed: sliderTimeout,
                sliderSpeed: sliderSpeed,
                smoothHeight: true
            });
        });
    };
}
if ('function' !== typeof(window['vc_twitterBehaviour'])) {
    window.vc_twitterBehaviour = function() {
        jQuery('.wpb_twitter_widget .tweets').each(function(index) {
            var this_element = jQuery(this),
                tw_name = this_element.attr('data-tw_name'),
                tw_count = this_element.attr('data-tw_count');
            this_element.tweet({
                username: tw_name,
                join_text: "auto",
                avatar_size: 0,
                count: tw_count,
                template: "{avatar}{join}{text}{time}",
                auto_join_text_default: "",
                auto_join_text_ed: "",
                auto_join_text_ing: "",
                auto_join_text_reply: "",
                auto_join_text_url: "",
                loading_text: '<span class="loading_tweets">loading tweets...</span>'
            });
        });
    };
}
if ('function' !== typeof(window['vc_googleplus'])) {
    window.vc_googleplus = function() {
        if (0 < jQuery('.wpb_googleplus').length) {
            (function() {
                var po = document.createElement('script');
                po.type = 'text/javascript';
                po.async = true;
                po.src = 'https://apis.google.com/js/plusone.js';
                var s = document.getElementsByTagName('script')[0];
                s.parentNode.insertBefore(po, s);
            })();
        }
    }
}
if ('function' !== typeof(window['vc_pinterest'])) {
    window.vc_pinterest = function() {
        if (0 < jQuery('.wpb_pinterest').length) {
            (function() {
                var po = document.createElement('script');
                po.type = 'text/javascript';
                po.async = true;
                po.src = 'http://assets.pinterest.com/js/pinit.js';
                var s = document.getElementsByTagName('script')[0];
                s.parentNode.insertBefore(po, s);
            })();
        }
    }
}
if ('function' !== typeof(window['vc_progress_bar'])) {
    window.vc_progress_bar = function() {
        if ('undefined' !== typeof(jQuery.fn.waypoint)) {
            jQuery('.vc_progress_bar').waypoint(function() {
                jQuery(this).find('.vc_single_bar').each(function(index) {
                    var $this = jQuery(this),
                        bar = $this.find('.vc_bar'),
                        val = bar.data('percentage-value');
                    setTimeout(function() {
                        bar.css({
                            "width": val + '%'
                        });
                    }, index * 200);
                });
            }, {
                offset: '85%'
            });
        }
    }
}
if ('function' !== typeof(window['vc_waypoints'])) {
    window.vc_waypoints = function() {
        if ('undefined' !== typeof(jQuery.fn.waypoint)) {
            jQuery('.wpb_animate_when_almost_visible:not(.wpb_start_animation)').waypoint(function() {
                jQuery(this).addClass('wpb_start_animation');
            }, {
                offset: '85%'
            });
        }
    }
}
if ('function' !== typeof(window['vc_toggleBehaviour'])) {
    window.vc_toggleBehaviour = function($el) {
        function event(e) {
            e && e.preventDefault && e.preventDefault();
            var title = jQuery(this);
            var element = title.closest('.vc_toggle');
            var content = element.find('.vc_toggle_content');
            if (element.hasClass('vc_toggle_active')) {
                content.slideUp({
                    duration: 300,
                    complete: function() {
                        element.removeClass('vc_toggle_active');
                    }
                });
            } else {
                content.slideDown({
                    duration: 300,
                    complete: function() {
                        element.addClass('vc_toggle_active');
                    }
                });
            }
        }
        if ($el) {
            if ($el.hasClass('vc_toggle_title')) {
                $el.unbind('click').click(event);
            } else {
                $el.find(".vc_toggle_title").unbind('click').click(event);
            }
        } else {
            jQuery(".vc_toggle_title").unbind('click').on('click', event);
        }
    }
}
if ('function' !== typeof(window['vc_tabsBehaviour'])) {
    window.vc_tabsBehaviour = function($tab) {
        if (jQuery.ui) {
            var $call = $tab || jQuery('.wpb_tabs, .wpb_tour'),
                ver = jQuery.ui && jQuery.ui.version ? jQuery.ui.version.split('.') : '1.10',
                old_version = 1 === parseInt(ver[0]) && 9 > parseInt(ver[1]);
            $call.each(function(index) {
                var $tabs, interval = jQuery(this).attr("data-interval"),
                    tabs_array = [];
                $tabs = jQuery(this).find('.wpb_tour_tabs_wrapper').tabs({
                    show: function(event, ui) {
                        wpb_prepare_tab_content(event, ui);
                    },
                    beforeActivate: function(event, ui) {
                        1 !== ui.newPanel.index() && ui.newPanel.find('.vc_pie_chart:not(.vc_ready)');
                    },
                    activate: function(event, ui) {
                        wpb_prepare_tab_content(event, ui);
                    }
                });
                if (interval && 0 < interval) {
                    try {
                        $tabs.tabs('rotate', interval * 1000);
                    } catch (e) {
                        window.console && window.console.log && console.log(e);
                    }
                }
                jQuery(this).find('.wpb_tab').each(function() {
                    tabs_array.push(this.id);
                });
                jQuery(this).find('.wpb_tabs_nav li').click(function(e) {
                    e.preventDefault();
                    if (old_version) {
                        $tabs.tabs("select", jQuery('a', this).attr('href'));
                    } else {
                        $tabs.tabs("option", "active", jQuery(this).index());
                    }
                    return false;
                });
                jQuery(this).find('.wpb_prev_slide a, .wpb_next_slide a').click(function(e) {
                    e.preventDefault();
                    if (old_version) {
                        var index = $tabs.tabs('option', 'selected');
                        if (jQuery(this).parent().hasClass('wpb_next_slide')) {
                            index++;
                        } else {
                            index--;
                        }
                        if (0 > index) {
                            index = $tabs.tabs("length") - 1;
                        } else if (index >= $tabs.tabs("length")) {
                            index = 0;
                        }
                        $tabs.tabs("select", index);
                    } else {
                        var index = $tabs.tabs("option", "active"),
                            length = $tabs.find('.wpb_tab').length;
                        if (jQuery(this).parent().hasClass('wpb_next_slide')) {
                            index = (index + 1) >= length ? 0 : index + 1;
                        } else {
                            index = 0 > index - 1 ? length - 1 : index - 1;
                        }
                        $tabs.tabs("option", "active", index);
                    }
                });
            });
        }
    }
}
if ('function' !== typeof(window['vc_accordionBehaviour'])) {
    window.vc_accordionBehaviour = function() {
        jQuery('.wpb_accordion').each(function(index) {
            var $this = jQuery(this);
            var $tabs, interval = $this.attr("data-interval"),
                active_tab = !isNaN(jQuery(this).data('active-tab')) && 0 < parseInt($this.data('active-tab')) ? parseInt($this.data('active-tab')) - 1 : false,
                collapsible = false === active_tab || 'yes' === $this.data('collapsible');
            $tabs = $this.find('.wpb_accordion_wrapper').accordion({
                header: "> div > h3",
                autoHeight: false,
                heightStyle: "content",
                active: active_tab,
                collapsible: collapsible,
                navigation: true,
                activate: vc_accordionActivate,
                change: function(event, ui) {
                    if ('undefined' !== typeof(jQuery.fn.isotope)) {
                        ui.newContent.find('.isotope').isotope("layout");
                    }
                    vc_carouselBehaviour(ui.newPanel);
                }
            });
            if (true === $this.data('vcDisableKeydown')) {
                $tabs.data('uiAccordion')._keydown = function() {};
            }
        });
    }
}
if ('function' !== typeof(window['vc_teaserGrid'])) {
    window.vc_teaserGrid = function() {
        var layout_modes = {
            fitrows: 'fitRows',
            masonry: 'masonry'
        };
        jQuery('.wpb_grid .teaser_grid_container:not(.wpb_carousel), .wpb_filtered_grid .teaser_grid_container:not(.wpb_carousel)').each(function() {
            var $container = jQuery(this);
            var $thumbs = $container.find('.wpb_thumbnails');
            var layout_mode = $thumbs.attr('data-layout-mode');
            $thumbs.isotope({
                itemSelector: '.isotope-item',
                layoutMode: ('undefined' === typeof(layout_modes[layout_mode]) ? 'fitRows' : layout_modes[layout_mode])
            });
            $container.find('.categories_filter a').data('isotope', $thumbs).click(function(e) {
                e.preventDefault();
                var $thumbs = jQuery(this).data('isotope');
                jQuery(this).parent().parent().find('.active').removeClass('active');
                jQuery(this).parent().addClass('active');
                $thumbs.isotope({
                    filter: jQuery(this).attr('data-filter')
                });
            });
            jQuery(window).bind('load resize', function() {
                $thumbs.isotope("layout");
            });
        });
    }
}
if ('function' !== typeof(window['vc_carouselBehaviour'])) {
    window.vc_carouselBehaviour = function($parent) {
        var $carousel = $parent ? $parent.find(".wpb_carousel") : jQuery(".wpb_carousel");
        $carousel.each(function() {
            var $this = jQuery(this);
            if (true !== $this.data('carousel_enabled') && $this.is(':visible')) {
                $this.data('carousel_enabled', true);
                var visible_count = getColumnsCount(jQuery(this)),
                    carousel_speed = 500;
                if (jQuery(this).hasClass('columns_count_1')) {
                    carousel_speed = 900;
                }
                var carousele_li = jQuery(this).find('.wpb_thumbnails-fluid li');
                carousele_li.css({
                    "margin-right": carousele_li.css("margin-left"),
                    "margin-left": 0
                });
                jQuery(this).find('.wpb_wrapper:eq(0)').jCarouselLite({
                    btnNext: jQuery(this).find('.next'),
                    btnPrev: jQuery(this).find('.prev'),
                    visible: visible_count,
                    speed: carousel_speed
                }).width('100%');
                var fluid_ul = jQuery(this).find('ul.wpb_thumbnails-fluid');
                fluid_ul.width(fluid_ul.width() + 300);
                jQuery(window).resize(function() {
                    var before_resize = screen_size;
                    screen_size = getSizeName();
                    if (before_resize != screen_size) {
                        window.setTimeout('location.reload()', 20);
                    }
                });
            }
        });
    }
}
if ('function' !== typeof(window['vc_slidersBehaviour'])) {
    window.vc_slidersBehaviour = function() {
        jQuery('.wpb_gallery_slides').each(function(index) {
            var this_element = jQuery(this);
            var $imagesGrid;
            if (this_element.hasClass('wpb_slider_nivo')) {
                var sliderSpeed = 800,
                    sliderTimeout = this_element.attr('data-interval') * 1000;
                if (0 === sliderTimeout) {
                    sliderTimeout = 9999999999;
                }
                this_element.find('.nivoSlider').nivoSlider({
                    effect: 'boxRainGrow,boxRain,boxRainReverse,boxRainGrowReverse',
                    slices: 15,
                    boxCols: 8,
                    boxRows: 4,
                    animSpeed: sliderSpeed,
                    pauseTime: sliderTimeout,
                    startSlide: 0,
                    directionNav: true,
                    directionNavHide: true,
                    controlNav: true,
                    keyboardNav: false,
                    pauseOnHover: true,
                    manualAdvance: false,
                    prevText: 'Prev',
                    nextText: 'Next'
                });
            } else if (this_element.hasClass('wpb_image_grid')) {
                if (jQuery.fn.imagesLoaded) {
                    $imagesGrid = this_element.find('.wpb_image_grid_ul').imagesLoaded(function() {
                        $imagesGrid.isotope({
                            itemSelector: '.isotope-item',
                            layoutMode: 'fitRows'
                        });
                    });
                } else {
                    this_element.find('.wpb_image_grid_ul').isotope({
                        itemSelector: '.isotope-item',
                        layoutMode: 'fitRows'
                    });
                }
            }
        });
    }
}
if ('function' !== typeof(window['vc_prettyPhoto'])) {
    window.vc_prettyPhoto = function() {
        try {
            if (jQuery && jQuery.fn && jQuery.fn.prettyPhoto) {
                jQuery('a.prettyphoto, .gallery-icon a[href*=".jpg"]').prettyPhoto({
                    animationSpeed: 'normal',
                    padding: 15,
                    opacity: 0.7,
                    showTitle: true,
                    allowresize: true,
                    counter_separator_label: '/',
                    hideflash: false,
                    deeplinking: false,
                    modal: false,
                    callback: function() {
                        var url = location.href;
                        var hashtag = (url.indexOf('#!prettyPhoto')) ? true : false;
                        if (hashtag) {
                            location.hash = "!";
                        }
                    },
                    social_tools: ''
                });
            }
        } catch (err) {
            window.console && window.console.log && console.log(err);
        }
    }
}
if ('function' !== typeof(window['vc_google_fonts'])) {
    window.vc_google_fonts = function() {
        return false;
    }
}
window.vcParallaxSkroll = false;
if ('function' !== typeof(window['vc_rowBehaviour'])) {
    window.vc_rowBehaviour = function() {
        var $ = window.jQuery;

        function localFunction() {
            var $elements = $('[data-vc-full-width="true"]');
            $.each($elements, function(key, item) {
                var $el = $(this);
                $el.addClass('vc_hidden');
                var $el_full = $el.next('.vc_row-full-width');
                var el_margin_left = parseInt($el.css('margin-left'), 10);
                var el_margin_right = parseInt($el.css('margin-right'), 10);
                var offset = 0 - $el_full.offset().left - el_margin_left;
                var width = $(window).width();
                $el.css({
                    'position': 'relative',
                    'left': offset,
                    'box-sizing': 'border-box',
                    'width': $(window).width()
                });
                if (!$el.data('vcStretchContent')) {
                    var padding = (-1 * offset);
                    if (0 > padding) {
                        padding = 0;
                    }
                    var paddingRight = width - padding - $el_full.width() + el_margin_left + el_margin_right;
                    if (0 > paddingRight) {
                        paddingRight = 0;
                    }
                    $el.css({
                        'padding-left': padding + 'px',
                        'padding-right': paddingRight + 'px'
                    });
                }
                $el.attr("data-vc-full-width-init", "true");
                $el.removeClass('vc_hidden');
            });
        }

        function parallaxRow() {
            var vcSkrollrOptions, vcParallaxSkroll, callSkrollInit = false;
            if (vcParallaxSkroll) {
                vcParallaxSkroll.destroy();
            }
            $('.vc_parallax-inner').remove();
            $('[data-5p-top-bottom]').removeAttr('data-5p-top-bottom data-30p-top-bottom');
            $('[data-vc-parallax]').each(function() {
                var skrollrSpeed, skrollrSize, skrollrStart, skrollrEnd, $parallaxElement, parallaxImage, youtubeId;
                callSkrollInit = true;
                if ('on' === $(this).data('vcParallaxOFade')) {
                    $(this).children().attr('data-5p-top-bottom', 'opacity:0;').attr('data-30p-top-bottom', 'opacity:1;');
                }
                skrollrSize = $(this).data('vcParallax') * 100;
                $parallaxElement = $('<div />').addClass('vc_parallax-inner').appendTo($(this));
                $parallaxElement.height(skrollrSize + '%');
                parallaxImage = $(this).data('vcParallaxImage');
                youtubeId = vcExtractYoutubeId(parallaxImage);
                if (youtubeId) {
                    insertYoutubeVideoAsBackground($parallaxElement, youtubeId);
                } else if ('undefined' !== typeof(parallaxImage)) {
                    $parallaxElement.css('background-image', 'url(' + parallaxImage + ')');
                }
                skrollrSpeed = skrollrSize - 100;
                skrollrStart = -skrollrSpeed;
                skrollrEnd = 0;
                $parallaxElement.attr('data-bottom-top', 'top: ' + skrollrStart + '%;').attr('data-top-bottom', 'top: ' + skrollrEnd + '%;');
            });
            if (callSkrollInit && window.skrollr) {
                vcSkrollrOptions = {
                    forceHeight: false,
                    smoothScrolling: false,
                    mobileCheck: function() {
                        return false;
                    }
                };
                vcParallaxSkroll = skrollr.init(vcSkrollrOptions);
                return vcParallaxSkroll;
            }
            return false;
        }

        function fullHeightRow() {
            $('.vc_row-o-full-height:first').each(function() {
                var $window, windowHeight, offsetTop, fullHeight;
                $window = $(window);
                windowHeight = $window.height();
                offsetTop = $(this).offset().top;
                if (offsetTop < windowHeight) {
                    fullHeight = 100 - offsetTop / (windowHeight / 100);
                    $(this).css('min-height', fullHeight + 'vh');
                }
            });
            $('.vc_row-o-full-height.vc_row-o-content-middle').each(function() {
                var elHeight = $(this).height();
                $('<div><!-- IE flexbox min height vertical align fixer --></div>').addClass('vc_row-full-height-fixer').height(elHeight).prependTo($(this));
            });
        }
        $(window).unbind('resize.vcRowBehaviour').bind('resize.vcRowBehaviour', localFunction);
        $(window).bind('resize.vcRowBehaviour', fullHeightRow);
        localFunction();
        fullHeightRow();
        initVideoBackgrounds();
        parallaxRow();
    }
}
if ('function' !== typeof(window['vc_gridBehaviour'])) {
    window.vc_gridBehaviour = function() {
        jQuery.fn.vcGrid && jQuery('[data-vc-grid]').vcGrid();
    }
}
if ('function' !== typeof(window['getColumnsCount'])) {
    window.getColumnsCount = function(el) {
        var find = false,
            i = 1;
        while (false === find) {
            if (el.hasClass('columns_count_' + i)) {
                find = true;
                return i;
            }
            i++;
        }
    }
}
var screen_size = getSizeName();

function getSizeName() {
    var screen_w = jQuery(window).width();
    if (1170 < screen_w) {
        return 'desktop_wide';
    }
    if (960 < screen_w && 1169 > screen_w) {
        return 'desktop';
    }
    if (768 < screen_w && 959 > screen_w) {
        return 'tablet';
    }
    if (300 < screen_w && 767 > screen_w) {
        return 'mobile';
    }
    if (300 > screen_w) {
        return 'mobile_portrait';
    }
    return '';
}

function loadScript(url, $obj, callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    if (script.readyState) {
        script.onreadystatechange = function() {
            if ("loaded" === script.readyState || "complete" === script.readyState) {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {}
    script.src = url;
    $obj.get(0).appendChild(script);
}
if ('function' !== typeof(window['wpb_prepare_tab_content'])) {
    window.wpb_prepare_tab_content = function(event, ui) {
        var panel = ui.panel || ui.newPanel,
            $pie_charts = panel.find('.vc_pie_chart:not(.vc_ready)'),
            $round_charts = panel.find('.vc_round-chart'),
            $line_charts = panel.find('.vc_line-chart'),
            $carousel = panel.find('[data-ride="vc_carousel"]'),
            $ui_panel, $google_maps;
        vc_carouselBehaviour();
        vc_plugin_flexslider(panel);
        if (ui.newPanel.find('.vc_masonry_media_grid, .vc_masonry_grid').length) {
            ui.newPanel.find('.vc_masonry_media_grid, .vc_masonry_grid').each(function() {
                var grid = jQuery(this).data('vcGrid');
                grid && grid.gridBuilder && grid.gridBuilder.setMasonry && grid.gridBuilder.setMasonry();
            });
        }
        if (panel.find('.vc_masonry_media_grid, .vc_masonry_grid').length) {
            panel.find('.vc_masonry_media_grid, .vc_masonry_grid').each(function() {
                var grid = jQuery(this).data('vcGrid');
                grid && grid.gridBuilder && grid.gridBuilder.setMasonry && grid.gridBuilder.setMasonry();
            });
        }
        $pie_charts.length && jQuery.fn.vcChat && $pie_charts.vcChat();
        $round_charts.length && jQuery.fn.vcRoundChart && $round_charts.vcRoundChart({
            reload: false
        });
        $line_charts.length && jQuery.fn.vcLineChart && $line_charts.vcLineChart({
            reload: false
        });
        $carousel.length && jQuery.fn.carousel && $carousel.carousel('resizeAction');
        $ui_panel = panel.find('.isotope, .wpb_image_grid_ul');
        $google_maps = panel.find('.wpb_gmaps_widget');
        if (0 < $ui_panel.length) {
            $ui_panel.isotope("layout");
        }
        if ($google_maps.length && !$google_maps.is('.map_ready')) {
            var $frame = $google_maps.find('iframe');
            $frame.attr('src', $frame.attr('src'));
            $google_maps.addClass('map_ready');
        }
        if (panel.parents('.isotope').length) {
            panel.parents('.isotope').each(function() {
                jQuery(this).isotope("layout");
            });
        }
    }
}

function vc_ttaActivation() {
    jQuery('[data-vc-accordion]').on('show.vc.accordion', function(e) {
        var $ = window.jQuery,
            ui = {};
        ui.newPanel = $(this).data('vc.accordion').getTarget();
        window.wpb_prepare_tab_content(e, ui);
    });
}

function vc_accordionActivate(event, ui) {
    if (ui.newPanel.length && ui.newHeader.length) {
        var $pie_charts = ui.newPanel.find('.vc_pie_chart:not(.vc_ready)'),
            $round_charts = ui.newPanel.find('.vc_round-chart'),
            $line_charts = ui.newPanel.find('.vc_line-chart'),
            $carousel = ui.newPanel.find('[data-ride="vc_carousel"]');
        if ('undefined' !== typeof(jQuery.fn.isotope)) {
            ui.newPanel.find('.isotope, .wpb_image_grid_ul').isotope("layout");
        }
        if (ui.newPanel.find('.vc_masonry_media_grid, .vc_masonry_grid').length) {
            ui.newPanel.find('.vc_masonry_media_grid, .vc_masonry_grid').each(function() {
                var grid = jQuery(this).data('vcGrid');
                grid && grid.gridBuilder && grid.gridBuilder.setMasonry && grid.gridBuilder.setMasonry();
            });
        }
        vc_carouselBehaviour(ui.newPanel);
        vc_plugin_flexslider(ui.newPanel);
        $pie_charts.length && jQuery.fn.vcChat && $pie_charts.vcChat();
        $round_charts.length && jQuery.fn.vcRoundChart && $round_charts.vcRoundChart({
            reload: false
        });
        $line_charts.length && jQuery.fn.vcLineChart && $line_charts.vcLineChart({
            reload: false
        });
        $carousel.length && jQuery.fn.carousel && $carousel.carousel('resizeAction');
        if (ui.newPanel.parents('.isotope').length) {
            ui.newPanel.parents('.isotope').each(function() {
                jQuery(this).isotope("layout");
            });
        }
    }
}

function initVideoBackgrounds() {
    jQuery('.vc_row').each(function() {
        var $row = jQuery(this),
            youtubeUrl, youtubeId;
        if ($row.data('vcVideoBg')) {
            youtubeUrl = $row.data('vcVideoBg');
            youtubeId = vcExtractYoutubeId(youtubeUrl);
            if (youtubeId) {
                $row.find('.vc_video-bg').remove();
                insertYoutubeVideoAsBackground($row, youtubeId);
            }
            jQuery(window).on('grid:items:added', function(event, $grid) {
                if (!$row.has($grid).length) {
                    return;
                }
                vcResizeVideoBackground($row);
            });
        } else {
            $row.find('.vc_video-bg').remove();
        }
    });
}

function insertYoutubeVideoAsBackground($element, youtubeId, counter) {
    if ('undefined' === typeof(YT.Player)) {
        counter = 'undefined' === typeof(counter) ? 0 : counter;
        if (100 < counter) {
            console.warn('Too many attempts to load YouTube api');
            return;
        }
        setTimeout(function() {
            insertYoutubeVideoAsBackground($element, youtubeId, counter++);
        }, 100);
        return;
    }
    var $container = $element.prepend('<div class="vc_video-bg"><div class="inner"></div></div>').find('.inner');
    new YT.Player($container[0], {
        width: '100%',
        height: '100%',
        videoId: youtubeId,
        playerVars: {
            playlist: youtubeId,
            iv_load_policy: 3,
            enablejsapi: 1,
            disablekb: 1,
            autoplay: 1,
            controls: 0,
            showinfo: 0,
            rel: 0,
            loop: 1
        },
        events: {
            onReady: function(event) {
                event.target.mute().setLoop(true);
            }
        }
    });
    vcResizeVideoBackground($element);
    jQuery(window).bind('resize', function() {
        vcResizeVideoBackground($element);
    });
}

function vcResizeVideoBackground($element) {
    var iframeW, iframeH, marginLeft, marginTop, containerW = $element.innerWidth(),
        containerH = $element.innerHeight(),
        ratio1 = 16,
        ratio2 = 9;
    if ((containerW / containerH) < (ratio1 / ratio2)) {
        iframeW = containerH * (ratio1 / ratio2);
        iframeH = containerH;
        marginLeft = -Math.round((iframeW - containerW) / 2) + 'px';
        marginTop = -Math.round((iframeH - containerH) / 2) + 'px';
        iframeW += 'px';
        iframeH += 'px';
    } else {
        iframeW = containerW;
        iframeH = containerW * (ratio2 / ratio1);
        marginTop = -Math.round((iframeH - containerH) / 2) + 'px';
        marginLeft = -Math.round((iframeW - containerW) / 2) + 'px';
        iframeW += 'px';
        iframeH += 'px';
    }
    $element.find('.vc_video-bg iframe').css({
        maxWidth: '1000%',
        marginLeft: marginLeft,
        marginTop: marginTop,
        width: iframeW,
        height: iframeH
    });
}

function vcExtractYoutubeId(url) {
    if ('undefined' === typeof(url)) {
        return false;
    }
    var id = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
    if (null !== id) {
        return id[1];
    }
    return false;
}