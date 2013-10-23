/*
 * jQuery Form Tips 1.2.6
 * By Manuel Boy (http://www.manuelboy.de)
 * Copyright (c) 2012 Manuel Boy
 * Licensed under the MIT License: http://www.opensource.org/licenses/mit-license.php
 */

(function (a) {
    a.fn.formtips = function (b) {
        var c = a.extend({tippedClass:"tipped"}, b);
        return this.each(function () {
            var b = a(this);
            var d = a(b).attr("type");
            if (d != "file" && d != "checkbox" && d != "radio") {
                a(b).bind("focus", function () {
                    var b = a(this).attr("title");
                    if (a(this).val() == b) {
                        a(this).val("").removeClass(c.tippedClass)
                    }
                    return true
                });
                a(b).bind("blur", function () {
                    var b = a(this).attr("title");
                    if (a(this).val() == "") {
                        a(this).val(b).addClass(c.tippedClass)
                    }
                    return true
                });
                var e = a(b).attr("title");
                if (a(b).val() == "" || a(b).val() == a(this).attr("title")) {
                    a(b).val(e).addClass(c.tippedClass)
                } else {
                    a(b).removeClass(c.tippedClass)
                }
                a(b).parentsUntil("form").parent().submit(function () {
                    var d = a(b).attr("title");
                    if (a(b).val() == d) {
                        a(b).val("").removeClass(c.tippedClass)
                    }
                })
            }
        })
    }

})(jQuery);

jQuery.extend(verge);
var desktop = true,
    tablet = false,
    mobile = false;

jQuery(function ($) {

    function equalHeight(group) {
        var tallest = 0;
        group.each(function() {
            thisHeight = $(this).height();
            if(thisHeight > tallest) {
                tallest = thisHeight;
            }
        });
        group.height(tallest);
    };

    $(window).resize(function () {
        if ($.viewportW() >= 1024) {
            desktop = true;
            tablet = false;
            mobile = false;
        }
        if ($.viewportW() >= 768 && $.viewportW() <= 1023) {
            desktop = false;
            tablet = true;
            mobile = false;
        } else {
            if ($.viewportW() <= 767) {
                desktop = false;
                tablet = false;
                mobile = true;
            }
        }

        if (mobile || tablet) {
            $('header').addClass('mobile');
            $('nav').removeClass('nav');



        } else {
            $('header').removeClass('mobile');
            $('nav').addClass('nav');
        }

    }).resize();

    $('input[title]').formtips();

    $(window).load(function () {

        $(window).scrollTo(0,1);

        (function() {
            var $out = $('.out');
            
            if($(document).scrollTop() > 0){
                $out.removeClass('top');
            } 

            $(window).on('scroll', function() {
                if($(document).scrollTop() > 0){
                    $out.removeClass('top');
                } else {
                    $out.addClass('top');
                }
            });
        })();
        $('.menu-list__item a').on('click' ,function(e) {
            e.preventDefault();
            
            $.scrollTo($('#'+$(this).attr('href').slice(1)), 2000);

            if(mobile || tablet){
                $('.menu').toggleClass('closed');
            }
        });

        $('.to-top').on('click', function(e) {
            e.preventDefault();

            $('body, html').animate({scrollTop : $('.out').offset().top}, 750);
        });

        $(window).resize(function(){

            if($('.b-top').height() <= $(window).height()){
                $('.b-top').height($(window).height());
            } else {
                $('.b-top').height('auto');
            }

            $('.c-box').each(function(item) {

                if($(this).height() <= $(window).height()){
                    $(this).height($(window).height());
                } else {
                    $(this).height('auto');
                }
            });

            clearTimeout(doit);
            doit = setTimeout(function () {
                resizedw();
            }, 500);


        }).resize();

        var doit;
        function resizedw() {
           $('.partners__list').each(function () {
                $(this).trigger('configuration', ['debug', false, true]);
            });

        }

        $('.partners__list').carouFredSel({
            auto        : false,
            swipe       : {
                onTouch     : true,
                onMouse     : true
            },
            scroll:{
                items:2
            },
            auto:{
                play:true,
                items:1
            }
        });

    });
});






