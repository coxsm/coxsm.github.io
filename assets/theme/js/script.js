(function (a) {
    function d(b) {
        a(b).outerFind("[data-bg-video]").each(function () {
            var b = a(this).attr("data-bg-video"),
                c = b.match(/(http:\/\/|https:\/\/|)?(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(&\S+)?/),
                d = a('<div class="mbr-background-video-preview">').hide().css({
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                });
            a("> *:eq(0)", this).before(d);
            if (c && (/youtu\.?be/g.test(c[3]) || /vimeo/g.test(c[3])))
                if (c && /youtu\.?be/g.test(c[3])) b = "http" + ("https:" === location.protocol ? "s" : "") + ":", b += "//img.youtube.com/vi/" + c[6] + "/maxresdefault.jpg", a("<img>").on("load", function () {
                    if (120 === (this.naturalWidth || this.width)) {
                        var a = this.src.split("/").pop();
                        switch (a) {
                            case "maxresdefault.jpg":
                                this.src = this.src.replace(a, "sddefault.jpg");
                                break;
                            case "sddefault.jpg":
                                this.src = this.src.replace(a, "hqdefault.jpg");
                                break;
                            default:
                                f && d.css("background-image", 'url("images/no-video.jpg")').show()
                        }
                    } else d.css("background-image", 'url("' + this.src + '")').show()
                }).attr("src", b), !a.fn.YTPlayer || f || a.isMobile() || a("> *:eq(1)", this).before('<div class="mbr-background-video"></div>').prev().YTPlayer({
                    videoURL: c[6],
                    containment: "self",
                    showControls: !1,
                    mute: !0
                });
                else {
                    if (c && /vimeo/g.test(c[3])) {
                        var k = new XMLHttpRequest;
                        k.open("GET", "https://vimeo.com/api/v2/video/" + c[6] + ".json", !0);
                        k.onreadystatechange = function () {
                            if (4 === this.readyState)
                                if (200 <=
                                    this.status && 400 > this.status) {
                                    var a = JSON.parse(this.responseText);
                                    d.css("background-image", 'url("' + a[0].thumbnail_large + '")').show()
                                } else f && d.css("background-image", 'url("images/no-video.jpg")').show()
                        };
                        k.send();
                        k = null;
                        !a.fn.vimeo_player || f || a.isMobile() || a("> *:eq(1)", this).before('<div class="mbr-background-video"></div>').prev().vimeo_player({
                            videoURL: b,
                            containment: "self",
                            showControls: !1,
                            mute: !0
                        })
                    }
                }
            else f && d.css("background-image", 'url("images/video-placeholder.jpg")').show()
        })
    }
    a(document).ready(function () {
        if (!f) {
            var b = function (b) {
                var d = a(b).parents("section").find("iframe")[0],
                    e = a(d).attr("src");
                b.parents("section").css("z-index", "5000"); - 1 !== e.indexOf("youtu") && d.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', "*");
                if (-1 !== e.indexOf("vimeo")) {
                    var f = new Vimeo.Player(a(d));
                    f.play()
                }
                a(b).parents("section").find(a(b).attr("data-modal")).css("display",
                    "table").click(function () {
                    -1 !== e.indexOf("youtu") && d.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*"); - 1 !== e.indexOf("vimeo") && f.pause();
                    a(this).css("display", "none").off("click");
                    b.parents("section").css("z-index", "0")
                })
            };
            a(".modalWindow-video iframe").each(function () {
                var b = a(this).attr("data-src");
                a(this).removeAttr("data-src");
                var d = b.match(/(http:\/\/|https:\/\/|)?(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(&\S+)?/); -
                1 !== b.indexOf("youtu") ? a(this).attr("src", "https://youtube.com/embed/" + d[6] + "?rel=0&enablejsapi=1") : -1 !== b.indexOf("vimeo") && a(this).attr("src", "https://player.vimeo.com/video/" + d[6] + "?autoplay=0&loop=0")
            });
            a("[data-modal]").click(function () {
                b(a(this))
            })
        }
    });
})(jQuery);
