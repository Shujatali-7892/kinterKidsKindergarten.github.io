"use strict";
is_visible_init();
cws_milestone_init();
cws_progress_bar_init();
widget_carousel_init();
function editor_mobile_header_fix() {
    if (jQuery('body').hasClass('elementor-editor-active')) {
        reset_mobile_menu();
        mobile_menu_controller_init_once = false;
        mobile_menu_controller_init();
    }
}
var directRTL;
if (jQuery("html").attr('dir') == 'rtl') {
	directRTL = 'rtl'
} else {
	directRTL = ''
}
window.addEventListener("load", function() {
	isotope_init();
	canvas_init();
	check_menu_width();
    mobile_menu_controller_init();
	set_heigth_sticky();
	sticky_init();
	jQuery(".portfolio_carousel").cws_flex_carousel(".cws_portfolio", ".cws_portfolio_header");
	jQuery(".ourteam_carousel").cws_flex_carousel(".cws_ourteam", ".cws_ourteam_header");
	jQuery(".news_carousel").cws_flex_carousel(".news", ".cws_blog_header");
	gallery_post_carousel_init();
	cws_parallax_init();
	cws_wp_image_popup();
	widget_carousel_init();
	cws_sc_carousel_init();
	twitter_carousel_init();
}, false);
jQuery(document).ready(function() {
	window.winWidth = window.innerWidth;
    setTimeout(editor_mobile_header_fix, 1000);
    logo_in_menu_replece();
    cws_top_social_init();
    cws_slider_video_height(jQuery(".fs_video_slider"));
    cws_slider_video_height(jQuery(".image_stat_header"));
    canvas_dashed_menu();
    cws_top_panel_slider();
    cws_top_panel_search();
    cws_page_focus();
    cws_patern_width();
    cws_fullwidth_grid();
    widget_carousel_init();
    cws_sc_carousel_init();
    cws_button_init();
    custom_colors_init();
    cws_tabs_init();
    cws_accordion_init();
    cws_toggle_init();
    cws_message_box_init();
    select2_init();
    wow_init();
    widget_archives_hierarchy_init();
    cws_portfolio_single_carousel_init();
    fancybox_init();
    gallery_post_carousel_init();
    load_more_init();
    jQuery(".cws_milestone").cws_milestone();
    jQuery(".cws_progress_bar").cws_progress_bar();
    jQuery(".cws_ce_content.ce_tabs").cws_tabs();
    jQuery(".cws_ce_content.ce_accordion").cws_accordion();
    jQuery(".cws_ce_content.ce_toggle").cws_toggle("accordion_section", "accordion_title", "accordion_content");
    wp_standard_processing();
    cws_blog_pagination_init();
    cws_portfolio_pagination_init();
    cws_portfolio_filter_init();
    cws_ourteam_pagination_init();
    cws_ourteam_filter_init();
    jQuery(".search-form").parent(".cws-widget").addClass("search-form-widget");
    scroll_top_init();
    cws_simcal_fix();

	jQuery(window).resize(function() {
		canvas_init();
		cws_patern_width();
		cws_fullwidth_grid();
		cws_slider_video_height(jQuery(".fs_video_slider"));
		cws_slider_video_height(jQuery(".image_stat_header"));
		cws_wp_image_popup();
	});

});

function cws_fullwidth_grid() {

	var $ = window.jQuery;

	if (!($('.page_content').hasClass('double_sidebar')) && !($('.page_content').hasClass('single_sidebar'))) {

		var $elements = $('.row_bg');
		$.each($elements, function(key, item) {
			var $el = $(this);

			var $el_full = $el.next('.row_bg_content_width');
			var offset = 0 - $el_full.offset().left;
			var width = $(window).width();
			$el.css({
				'position': 'relative',
				'left': offset,
				'right': offset,
				'box-sizing': 'border-box',
				'width': $(window).width()
			});

			var padding = (-1 * offset);
			if (0 > padding) {
				padding = 0;
			}
			var paddingRight = width - padding - $el_full.width();
			if (0 > paddingRight) {
				paddingRight = 0;
			}
			$el.css({ 'padding-left': padding + 'px', 'padding-right': paddingRight + 'px' });
		});

	};

}

function cws_slider_video_height(element) {
	var height_coef = element.attr('data-wrapper-height')
	if (height_coef) {
		if (window.innerWidth < 960) {
			element.height(window.innerWidth / height_coef)
		} else {
			element.height(960 / height_coef)
		}
	}

}

/* SCROLL TO TOP */
function scroll_top_vars_init() {
	window.scroll_top = {
		el: jQuery(".scroll_top"),
		anim_in_class: "fadeIn",
		anim_out_class: "fadeOut"
	};
}

function scroll_top_init() {
	scroll_top_vars_init();
	scroll_top_controller();
	window.addEventListener('scroll', scroll_top_controller, false);
	window.scroll_top.el.on('click', function() {
		jQuery("html, body").animate({ scrollTop: 0 }, '300', function() {
			window.scroll_top.el.css({
				"pointer-events": "none"
			});
			window.scroll_top.el.addClass(window.scroll_top.anim_out_class);
		});
	});
}

function scroll_top_controller() {
	var scroll_pos = window.pageYOffset;
	if (window.scroll_top == undefined) return;
	if (scroll_pos < 1 && window.scroll_top.el.hasClass(window.scroll_top.anim_in_class)) {
		window.scroll_top.el.css({
			"pointer-events": "none"
		});
		window.scroll_top.el.removeClass(window.scroll_top.anim_in_class);
		window.scroll_top.el.addClass(window.scroll_top.anim_out_class);
	} else if (scroll_pos >= 1 && !window.scroll_top.el.hasClass(window.scroll_top.anim_in_class)) {
		window.scroll_top.el.css({
			"pointer-events": "auto"
		});
		window.scroll_top.el.removeClass(window.scroll_top.anim_out_class);
		window.scroll_top.el.addClass(window.scroll_top.anim_in_class);
	}
}
/* \SCROLL TO TOP */

function cws_top_social_init() {
	var el = jQuery(".site_top_panel #top_social_links_wrapper");
	var toggle_class = "expanded";
	var parent_toggle_class = "active_social";
	if (!el.length) return;
	el.on('click', function() {
		var el = jQuery(this);
		if (el.hasClass(toggle_class)) {
			el.removeClass(toggle_class);
			setTimeout(function() {
				el.closest(".site_top_panel").removeClass(parent_toggle_class);
			}, 300);
		} else {
			el.addClass(toggle_class);
			el.closest(".site_top_panel").addClass(parent_toggle_class);
		}
	});
}

function cws_top_panel_slider() {
	jQuery(".site_top_panel.slider .site_top_panel_toggle").click(function() {
		var el = jQuery(this);
		el.parent().parent().toggleClass("active");
	})
}

function cws_top_panel_search() {
	jQuery(".site_top_panel .search_icon").click(function() {
		var el = jQuery(this);
		el.parents('.site_top_panel').find('.row_text_search .search-field').focus();
		el.parents('.site_top_panel').toggleClass("show-search");
	})
}


function cws_patern_width() {
	if (jQuery(".page_content>.pattern").length) {
		if (jQuery('.page_content').children().hasClass('container')) {
			jQuery(".page_content>.pattern").width((jQuery("body").width() - jQuery('.page_content>.container').width()) / 2 - 20);
		} else {
			jQuery(".page_content>.pattern").width((jQuery("body").width() - jQuery('.page_content>main').width()) / 2 - 20);
		}
	}
}

function cws_wp_image_popup() {
	if (jQuery("img[class*='wp-image']").parent("a").length) {
		jQuery("img[class*='wp-image']").each(function() {
			var img_width = jQuery(this).attr('width');

			if (!jQuery(this).hasClass("url")) {

			};
			jQuery(this).parent("a").addClass("wp-image-popup").attr("title", "").css('width', (parseInt(jQuery(this).attr('width')) + 22) + 'px')

			if (jQuery(this).hasClass("aligncenter")) {
				jQuery(this).parent("a").addClass("aligncenter");
			}
			if (jQuery(this).hasClass("alignleft")) {
				jQuery(this).parent("a").addClass("alignleft");
			}
			if (jQuery(this).hasClass("alignright")) {
				jQuery(this).parent("a").addClass("alignright");
			}
			if (jQuery(this).hasClass("noborder")) {
				jQuery(this).parent("a").addClass("noborder").css('width', parseInt(jQuery(this).attr('width')) + 'px')
			}

		})

	}

	jQuery("img[class*='wp-image']").parent('.wp-caption').each(function() {
		jQuery(this).css('width', (parseInt(jQuery(this).find("img[class*='wp-image']").attr('width')) + 22) + 'px')
	})
}

function cws_page_focus() {
	document.getElementsByTagName('html')[0].setAttribute('data-focus-chek', 'focused');

	window.addEventListener('focus', function() {
		document.getElementsByTagName('html')[0].setAttribute('data-focus-chek', 'focused');
	});

	window.addEventListener('blur', function() {
		document.getElementsByTagName('html')[0].removeAttribute('data-focus-chek');
	});
}

function canvas_dashed_menu() {
	var ctx, radius, offsets, menu_button_length;
	radius = 10;
	offsets = 2;
	//menu_button_length = 500;

	var winWidth = window.innerWidth;
	var menu_dashed = jQuery("canvas.menu_dashed");
	var is_rounds = !menu_dashed.closest('.main-menu').hasClass('menu-bees');
	var menuHeight = menu_dashed.parent().innerHeight() - 1;
	var last = menu_dashed.length - 1;

	for (var i = last; i >= 0; i--) {
		menu_button_length = menu_dashed[i].parentNode.clientWidth;
		menu_dashed[i].height = menu_dashed.parent().innerHeight();
		menu_dashed[i].width = menu_button_length + 1;
		ctx = menu_dashed[i].getContext('2d');
		ctx.lineJoin = "round";
		ctx.lineWidth = "1";
		ctx.strokeStyle = "#ffffff";
		ctx.translate(0.5, 0.5);
		ctx.beginPath();
		ctx.setLineDash([4, 2]);

		if (is_rounds) {
			if (!i) {
				if (jQuery("body").hasClass("rtl")){
						ctx.moveTo(offsets, offsets);
						ctx.lineTo(menu_button_length - radius, offsets);
						ctx.moveTo(menu_button_length - radius, menuHeight - offsets);
						ctx.lineTo(0, menuHeight - offsets);

						ctx.moveTo(menu_button_length - radius - offsets, offsets);
						ctx.arc(menu_button_length - radius - offsets, offsets + radius, radius, -Math.PI / 2, 0, false);
						ctx.arc(menu_button_length - radius - offsets, menuHeight - radius - offsets, radius, 0, Math.PI / 2, false);						
						
					} else {				
				// first
						ctx.moveTo(offsets + radius, offsets);
						ctx.lineTo(menu_button_length, offsets);
						ctx.moveTo(menu_button_length, menuHeight - offsets);
						//ctx.lineTo(offsets + radius, menuHeight);

						ctx.arc(offsets + radius, menuHeight - offsets - radius, radius, Math.PI / 2, Math.PI, false);
						ctx.arc(offsets + radius, offsets + radius, radius, Math.PI, -Math.PI / 2, false);
					}
			} else if (i == last) {
				if (jQuery("body").hasClass("rtl")){
						ctx.moveTo(offsets + radius, offsets);
						ctx.lineTo(menu_button_length, offsets);
						ctx.moveTo(menu_button_length, menuHeight - offsets);
						//ctx.lineTo(offsets + radius, menuHeight);

						ctx.arc(offsets + radius, menuHeight - offsets - radius, radius, Math.PI / 2, Math.PI, false);
						ctx.arc(offsets + radius, offsets + radius, radius, Math.PI, -Math.PI / 2, false);
					} else {
						ctx.moveTo(offsets, offsets);
						ctx.lineTo(menu_button_length - radius, offsets);
						ctx.moveTo(menu_button_length - radius, menuHeight - offsets);
						ctx.lineTo(0, menuHeight - offsets);

						ctx.moveTo(menu_button_length - radius - offsets, offsets);
						ctx.arc(menu_button_length - radius - offsets, offsets + radius, radius, -Math.PI / 2, 0, false);
						ctx.arc(menu_button_length - radius - offsets, menuHeight - radius - offsets, radius, 0, Math.PI / 2, false);
					}
			} else {
				ctx.moveTo(offsets, offsets);
				ctx.lineTo(menu_button_length, offsets);
				ctx.moveTo(menu_button_length, menuHeight - offsets);
				ctx.lineTo(offsets, menuHeight - offsets);
			}
		} else {
			ctx.moveTo(offsets, offsets);
			ctx.lineTo(menu_button_length, offsets);
			ctx.moveTo(menu_button_length, menuHeight - offsets);
			ctx.lineTo(offsets, menuHeight - offsets);
		}
		ctx.stroke();
	}
}

function canvas_init() {
	var y, x, ctx, cw, ox, oy, scale

	var c = jQuery("canvas.breadcrumbs");
	var h_c = jQuery("canvas.half_sin");
	var f_h_c = jQuery("canvas.footer_half_sin");
	var t_h_c = jQuery("canvas.top_half_sin");
	var br = jQuery("canvas.separator");

	var cloud = jQuery("canvas.cloud");
	var w_cloud = jQuery("canvas.white_cloud");


	var style = jQuery("#cws-custom-colors-css").text()

	if (br.length) {
		var sepColor = br.attr("data-line-color")
	};

	if (c.length) {
		var crumbs_bg_color = c.attr("data-bg-color");
		var crumbs_line_color = c.attr("data-line-color")
	};

	if (h_c.length) {
		var footer_bg_color = h_c.attr("data-bg-color");
		var footer_line_color = h_c.attr("data-line-color")
	};

	if (f_h_c.length) {
		var footer_cop_bg_color = f_h_c.attr("data-bg-color");
		var footer_cop_line_color = f_h_c.attr("data-line-color");
	};

	if (t_h_c.length) {
		var top_bg_color = t_h_c.attr("data-bg-color");
		var top_line_color = t_h_c.attr("data-line-color");
	};

	if (cloud.length) {
		var cloud_bg_color = cloud.attr("data-bg-color");
		var cloud_line_color = cloud.attr("data-line-color");
		var patternSrc = cloud.attr("data-pattern-src");
		var patternParentHeight = cloud.parent().innerHeight() - 170;
	};

	cw = 1170
	ox = 0
	oy = 8
	scale = 4
	var winWidth = window.innerWidth;
	var ratio = window.devicePixelRatio;

	for (var i = c.length - 1; i >= 0; i--) {
		var breadcrumbs_parent_height = jQuery(c[i]).parent().innerHeight();
		c[i].height = breadcrumbs_parent_height * ratio;
		c[i].width = window.innerWidth * ratio;


		c[i].style.height = breadcrumbs_parent_height + 'px'; //actual height of canvas
		c[i].style.width = window.innerWidth + 'px'; //actual width of canvas

		ctx = c[i].getContext('2d');
		ratio > 1 ? ctx.scale(ratio, ratio) : '';
		ctx.beginPath();
		//
		sineLine(ctx, ox, oy, 4, crumbs_bg_color, breadcrumbs_parent_height - 17, winWidth * ratio)
		ctx.lineTo(winWidth * ratio, breadcrumbs_parent_height);

		for (var ti = (winWidth * ratio); ti >= 0; ti += (-1)) {
			y = scale * Math.sin((-ti) / 8 + 3);
			x = ti;
			ctx.lineTo(ox + x, oy - y);
		}
		ctx.lineTo(0, breadcrumbs_parent_height);
		ctx.fillStyle = crumbs_bg_color;
		ctx.fill();
		ctx.beginPath();
		sineLine(ctx, ox, oy, 4, crumbs_line_color, breadcrumbs_parent_height - 16, winWidth * ratio)
	};

	for (var i = h_c.length - 1; i >= 0; i--) {
		h_c[i].height = 10 * ratio;
		h_c[i].width = (window.innerWidth) * ratio;

		h_c[i].style.height = 10 + 'px'; //actual height of canvas
		h_c[i].style.width = window.innerWidth + 'px'; //actual width of canvas

		ctx = h_c[i].getContext('2d');
		ratio > 1 ? ctx.scale(ratio, ratio) : '';
		ctx.beginPath();
		//

		sineLine(ctx, ox, oy, 1, 'rgb(' + footer_line_color + ')', 0, winWidth, true)
		ctx.lineTo(winWidth, 10);
		ctx.lineTo(0, 10);
		ctx.fillStyle = 'rgb(' + footer_bg_color + ')';
		ctx.fill();

	};

	for (var i = f_h_c.length - 1; i >= 0; i--) {
		f_h_c[i].height = 10 * ratio;
		f_h_c[i].width = (window.innerWidth) * ratio;

		f_h_c[i].style.height = 10 + 'px'; //actual height of canvas
		f_h_c[i].style.width = window.innerWidth + 'px'; //actual width of canvas

		ctx = f_h_c[i].getContext('2d');
		ratio > 1 ? ctx.scale(ratio, ratio) : '';
		ctx.beginPath();
		//
		sineLine(ctx, ox, oy, 1, 'rgb(' + footer_cop_line_color + ')', 0, winWidth, true)
		ctx.lineTo(winWidth, 10);
		ctx.lineTo(0, 10);
		ctx.fillStyle = 'rgb(' + footer_cop_bg_color + ')';
		ctx.fill();

	};

	for (var i = t_h_c.length - 1; i >= 0; i--) {
		t_h_c[i].height = 10 * ratio;
		t_h_c[i].width = (window.innerWidth) * ratio;

		t_h_c[i].style.height = 10 + 'px'; //actual height of canvas
		t_h_c[i].style.width = window.innerWidth + 'px'; //actual width of canvas

		ctx = t_h_c[i].getContext('2d');
		ratio > 1 ? ctx.scale(ratio, ratio) : '';
		ctx.beginPath();
		//
		sineLine(ctx, ox, oy, 1, top_line_color, 0, winWidth, true)
		ctx.lineTo(winWidth, 10);
		ctx.lineTo(0, 10);
		ctx.fillStyle = top_bg_color;
		ctx.fill();

	};

	for (var i = br.length - 1; i >= 0; i--) {
		br[i].height = 22 * ratio;
		br[i].width = (window.innerWidth) * ratio;

		br[i].style.height = 22 + 'px'; //actual height of canvas
		br[i].style.width = window.innerWidth + 'px'; //actual width of canvas

		ctx = br[i].getContext('2d');
		ratio > 1 ? ctx.scale(ratio, ratio) : '';
		ctx.beginPath();
		sineLine(ctx, ox, oy, 4, sepColor, 0, winWidth);
		if (br.parents('.isotope').length) {
			br.parents('.isotope').isotope('layout');
		}
	};

	if (cloud.length) {
		var rat_coef = ratio > 1 ? 1.5 : 1;
		cloud[0].height = (patternParentHeight + 170) * (rat_coef * ratio);
		cloud[0].width = (window.innerWidth) * (rat_coef * ratio);

		cloud[0].style.width = window.innerWidth + 'px'; //actual width of canvas
		cloud[0].style.height = (patternParentHeight + 170) + 'px'; //actual height of canvas

		ctx = cloud[0].getContext('2d');
		ratio > 1 ? ctx.scale(ratio, ratio) : '';
		ctx.beginPath();
		cloudRandomCreator(ctx, ox, oy, 8, sepColor, cloud_bg_color, winWidth, patternParentHeight * rat_coef, patternSrc);
	};
	if (w_cloud.length) {
		w_cloud[0].height = 50 * ratio;
		w_cloud[0].width = (window.innerWidth) * ratio;

		w_cloud[0].style.width = window.innerWidth + 'px'; //actual width of canvas
		w_cloud[0].style.height = 50 + 'px'; //actual height of canvas


		ctx = w_cloud[0].getContext('2d');
		ratio > 1 ? ctx.scale(ratio, ratio) : '';
		ctx.beginPath();

		sepColor = '#ffffff';
		cloud_bg_color = '#ffffff';

		cloudRandomCreator(ctx, ox, oy, 8, sepColor, cloud_bg_color, winWidth, patternParentHeight, false, true);
	};

}

function sineLine(ctx, ox, oy, lineWidth, color, topOfss, width, half_mode) {
	half_mode = half_mode != undefined ? half_mode : false;
	var scale = 4;
	if (half_mode) {
		scale = 4.5;
	}
	var x, y, sin_per
	ctx.strokeStyle = color
	ctx.lineWidth = lineWidth;
	for (var t = 0; t <= width; t += 1) {
		if (half_mode) {
			sin_per = Math.sin(t / 5) < 0 ? Math.sin(t / 5) * (-1) : Math.sin(t / 5);
		} else {
			sin_per = Math.sin(t / 8);
		};
		y = scale * sin_per - topOfss;
		x = t;
		ctx.lineTo(ox + x, oy - y);
	}
	ctx.stroke();
}

function cloudRandomCreator(ctx, ox, oy, lineWidth, color, bg_color, width, patternParentHeight, patternSrc, only_top) {
	patternSrc = patternSrc != undefined ? patternSrc : false;
	only_top = only_top != undefined ? only_top : false;

	var imageObj = new Image();
	imageObj.src = imageObj.src = patternSrc ? patternSrc : '';

	if (patternSrc && !only_top) {
		imageObj.onload = function() {

			var pattern = ctx.createPattern(imageObj, 'repeat');

			cloudPaint(ctx, width, patternParentHeight);
			ctx.closePath();
			ctx.strokeStyle = 'white';
			ctx.fillStyle = bg_color;
			ctx.fill();
			ctx.fillStyle = pattern;
			ctx.fill();
			ctx.lineWidth = lineWidth;
			ctx.stroke();
			//ctx.stroke();
		};
	} else if (!only_top) {
		cloudPaint(ctx, width, patternParentHeight);
		ctx.strokeStyle = 'white';
		ctx.fillStyle = bg_color;
		ctx.fill();
		ctx.lineWidth = lineWidth;
		ctx.stroke();
	} else if (only_top) {
		cloudPaint(ctx, width, 0, only_top);
		ctx.strokeStyle = color;
		ctx.fillStyle = bg_color;
		ctx.fill();
		ctx.lineWidth = lineWidth;
		ctx.stroke();
	}


}

function cloudPaint(ctx, width, patternParentHeight, only_top) {

	var only_top = only_top != undefined ? only_top : false;

	var ratio = window.devicePixelRatio;
	var ratio_coef = ratio > 1 ? 1.5 : 0.93;
	var height_coef = (80 * ratio_coef) + patternParentHeight;
	ctx.moveTo(-10, 50);
	for (var t = 0; t <= Math.floor(width * ratio / 1920); t += 1) {
		var addCoef = 1920 * t;
		ctx.bezierCurveTo(30 + addCoef, 0, 90 + addCoef, 0, 120 + addCoef, 30);
		ctx.bezierCurveTo(130 + addCoef, 25, 150 + addCoef, 15, 170 + addCoef, 30);
		ctx.bezierCurveTo(190 + addCoef, 15, 210 + addCoef, 15, 240 + addCoef, 30);
		ctx.bezierCurveTo(260 + addCoef, 5, 330 + addCoef, 4, 360 + addCoef, 35);
		ctx.bezierCurveTo(380 + addCoef, 10, 405 + addCoef, 15, 420 + addCoef, 30);
		ctx.bezierCurveTo(430 + addCoef, 20, 465 + addCoef, 20, 480 + addCoef, 35);
		ctx.bezierCurveTo(510 + addCoef, 10, 550 + addCoef, 15, 580 + addCoef, 35);
		ctx.bezierCurveTo(590 + addCoef, 25, 610 + addCoef, 25, 620 + addCoef, 35);
		ctx.bezierCurveTo(650 + addCoef, 10, 710 + addCoef, 10, 740 + addCoef, 35);
		ctx.bezierCurveTo(755 + addCoef, 25, 770 + addCoef, 25, 790 + addCoef, 35);
		ctx.bezierCurveTo(810 + addCoef, 20, 850 + addCoef, 5, 890 + addCoef, 35);
		ctx.bezierCurveTo(920 + addCoef, 5, 970 + addCoef, 10, 990 + addCoef, 35);
		ctx.bezierCurveTo(1000 + addCoef, 30, 1025 + addCoef, 25, 1040 + addCoef, 35);
		ctx.bezierCurveTo(1060 + addCoef, 15, 1100 + addCoef, 15, 1120 + addCoef, 35);
		ctx.bezierCurveTo(1140 + addCoef, 15, 1190 + addCoef, 25, 1210 + addCoef, 35);
		ctx.bezierCurveTo(1240 + addCoef, 5, 1300 + addCoef, 5, 1330 + addCoef, 30);
		ctx.bezierCurveTo(1340 + addCoef, 10, 1370 + addCoef, 10, 1380 + addCoef, 30);
		ctx.bezierCurveTo(1410 + addCoef, 0, 1460 + addCoef, 10, 1470 + addCoef, 35);
		ctx.bezierCurveTo(1490 + addCoef, 15, 1530 + addCoef, 15, 1550 + addCoef, 30);
		ctx.bezierCurveTo(1580 + addCoef, 5, 1635 + addCoef, 5, 1665 + addCoef, 35);
		ctx.bezierCurveTo(1685 + addCoef, 20, 1700 + addCoef, 20, 1720 + addCoef, 35);
		ctx.bezierCurveTo(1750 + addCoef, 5, 1820 + addCoef, 5, 1850 + addCoef, 35);
		ctx.bezierCurveTo(1870 + addCoef, 15, 1900 + addCoef, 15, 1920 + addCoef, 30);

		if (t == Math.floor(width * ratio / 1920) && !only_top) {
			for (var ti = Math.floor(width * ratio / 1920); ti >= 0; ti -= 1) {
				addCoef = 1920 * ti;
				ctx.bezierCurveTo(1900 + addCoef, height_coef + 100 - 0, 1870 + addCoef, height_coef + 100 - 0, 1840 + addCoef, height_coef + 100 - 20);
				ctx.bezierCurveTo(1820 + addCoef, height_coef + 100 - 0, 1750 + addCoef, height_coef + 100 - 0, 1720 + addCoef, height_coef + 100 - 30);
				ctx.bezierCurveTo(1700 + addCoef, height_coef + 100 - 20, 1685 + addCoef, height_coef + 100 - 20, 1665 + addCoef, height_coef + 100 - 35);
				ctx.bezierCurveTo(1635 + addCoef, height_coef + 100 - 15, 1580 + addCoef, height_coef + 100 - 15, 1550 + addCoef, height_coef + 100 - 40);
				ctx.bezierCurveTo(1530 + addCoef, height_coef + 100 - 25, 1490 + addCoef, height_coef + 100 - 25, 1470 + addCoef, height_coef + 100 - 45);
				ctx.bezierCurveTo(1450 + addCoef, height_coef + 100 - 20, 1400 + addCoef, height_coef + 100 - 20, 1380 + addCoef, height_coef + 100 - 40);
				ctx.bezierCurveTo(1360 + addCoef, height_coef + 100 - 20, 1330 + addCoef, height_coef + 100 - 15, 1310 + addCoef, height_coef + 100 - 30);
				ctx.bezierCurveTo(1290 + addCoef, height_coef + 100 - 10, 1230 + addCoef, height_coef + 100 - 10, 1210 + addCoef, height_coef + 100 - 35);
				ctx.bezierCurveTo(1190 + addCoef, height_coef + 100 - 15, 1140 + addCoef, height_coef + 100 - 15, 1120 + addCoef, height_coef + 100 - 35);
				ctx.bezierCurveTo(1100 + addCoef, height_coef + 100 - 15, 1060 + addCoef, height_coef + 100 - 20, 1040 + addCoef, height_coef + 100 - 40);
				ctx.bezierCurveTo(1025 + addCoef, height_coef + 100 - 25, 1010 + addCoef, height_coef + 100 - 25, 990 + addCoef, height_coef + 100 - 35);
				ctx.bezierCurveTo(960 + addCoef, height_coef + 100 - 15, 920 + addCoef, height_coef + 100 - 15, 890 + addCoef, height_coef + 100 - 40);
				ctx.bezierCurveTo(860 + addCoef, height_coef + 100 - 10, 820 + addCoef, height_coef + 100 - 10, 790 + addCoef, height_coef + 100 - 40);
				ctx.bezierCurveTo(775 + addCoef, height_coef + 100 - 25, 755 + addCoef, height_coef + 100 - 25, 740 + addCoef, height_coef + 100 - 40);
				ctx.bezierCurveTo(710 + addCoef, height_coef + 100 - 10, 650 + addCoef, height_coef + 100 - 10, 620 + addCoef, height_coef + 100 - 35);
				ctx.bezierCurveTo(610 + addCoef, height_coef + 100 - 20, 590 + addCoef, height_coef + 100 - 20, 580 + addCoef, height_coef + 100 - 30);
				ctx.bezierCurveTo(550 + addCoef, height_coef + 100 - 10, 510 + addCoef, height_coef + 100 - 10, 480 + addCoef, height_coef + 100 - 30);
				ctx.bezierCurveTo(465 + addCoef, height_coef + 100 - 15, 430 + addCoef, height_coef + 100 - 15, 420 + addCoef, height_coef + 100 - 35);
				ctx.bezierCurveTo(400 + addCoef, height_coef + 100 - 5, 360 + addCoef, height_coef + 100 - 5, 340 + addCoef, height_coef + 100 - 25);
				ctx.bezierCurveTo(310 + addCoef, height_coef + 100 - 5, 270 + addCoef, height_coef + 100 - 5, 240 + addCoef, height_coef + 100 - 35);
				ctx.bezierCurveTo(220 + addCoef, height_coef + 100 - 15, 190 + addCoef, height_coef + 100 - 15, 170 + addCoef, height_coef + 100 - 35);
				ctx.bezierCurveTo(155 + addCoef, height_coef + 100 - 15, 135 + addCoef, height_coef + 100 - 15, 120 + addCoef, height_coef + 100 - 30);
				ctx.bezierCurveTo(100 + addCoef, height_coef + 100 - 10, 40 + addCoef, height_coef + 100 - 0, 0 + addCoef, height_coef + 100 - 30);

				if (ti == 0) {
					ctx.bezierCurveTo(0, height_coef + 100 - 0, -10, height_coef + 100 + 0, -30, height_coef + 100 + 0);
				}
			}
		} else if (t == Math.floor(width * ratio / 1920) && only_top) {
			ctx.lineTo(1920 + addCoef, 50);
			ctx.lineTo(-10, 50);
		};

	}


}

function wow_init() {
	if (jQuery('.wow').length) {
		new WOW().init();
	};
}

function reload_scripts() {
	gallery_post_carousel_init();
	wp_standard_processing();
	fancybox_init();
	canvas_init();
}

function is_visible_init() {
	jQuery.fn.is_visible = function() {
		return (jQuery(this).offset().top >= jQuery(window).scrollTop()) && (jQuery(this).offset().top <= jQuery(window).scrollTop() + jQuery(window).height());
	}
}

function wp_standard_processing() {
	var galls;
	jQuery("img[class*='wp-image-']").each(function() {
		var el = jQuery(this);
		el.parent("a").addClass("cws_img_frame");
	});
	galls = jQuery(".gallery[class*='galleryid-']");
	if (galls.length) {
		galls.each(function() {
			var gall = jQuery(this);
			var d = new Date();
			var t = d.getTime();
			var unique = Math.random() * t;
			var gall_id = "wp_gallery_" + unique;
			jQuery("a", gall).attr("data-fancybox-group", gall_id);
		});
	}
	jQuery(".gallery-icon a[href*='.jpg'], .gallery-icon a[href*='.jpeg'], .gallery-icon a[href*='.png'], .gallery-icon a[href*='.gif'], .cws_img_frame[href*='.jpg'], .cws_img_frame[href*='.jpeg'], .cws_img_frame[href*='.png'], .cws_img_frame[href*='.gif']").fancybox();
}

/* sticky */

function get_logo_position() {
	if (jQuery(".site_header").length) {
		return /logo-\w+/.exec(jQuery(".site_header").attr("class"))[0];
	};
}

function sticky_vars() {
	window.sticky_menu = {
		'site_header': jQuery(".site_header"),
		'subst_header_height': 0,
		'logo_position': get_logo_position(),
		'menu_container': jQuery('.site_header .header_nav_part'),
		'header_bg': jQuery('.header_bg_img, .cws_parallax_scene_container').eq(0),
		'is_set': false,
		'logo_init_height': jQuery(".site_header .logo>img").outerHeight(),
		'menu_item_height': jQuery('.site_header .header_nav_part').find(".main-menu>.menu-item").eq(0).outerHeight(),
		'logo_indent': 30,
		'header_content_part_width': parseInt(jQuery(".site_header .container").eq(0).width()),
		'animation_speed': 300
	};
	if (window.sticky_menu.logo_position == "logo-center" && window.sticky_menu.site_header.find(".header_nav_part").length) {
		if (window.sticky_menu.site_header.find(".header_logo_part").length) {
			window.sticky_menu.menu_offset = jQuery(".header_nav_part").offset().top - window.sticky_menu.logo_indent;
		} else {
			window.sticky_menu.menu_offset = jQuery(".header_nav_part").offset().top;
		}
	} else {
		window.sticky_menu.menu_offset = window.sticky_menu.site_header.find(".header_box").offset().top;
		if (window.header_after_slider) {
			window.sticky_menu.menu_offset = window.sticky_menu.menu_offset + window.sticky_menu.site_header.find(".header_box").outerHeight();
		}
	}
	if (window.sticky_menu.site_header.find(".header_logo_part").length) {
		window.sticky_menu.logo_top_init_margin = window.sticky_menu.logo_position == "logo-center" ? parseInt(jQuery(".site_header .header_logo_part").css("padding-top")) : parseInt(jQuery(".site_header .header_box").css("padding-top"));
		window.sticky_menu.logo_bottom_init_margin = window.sticky_menu.logo_position == "logo-center" ? parseInt(jQuery(".site_header .header_logo_part").css("padding-bottom")) : parseInt(jQuery(".site_header .header_box").css("padding-bottom"));
	} else {
		window.sticky_menu.logo_top_init_margin = window.sticky_menu.logo_position == "logo-center" ? parseInt(jQuery(".site_header .header_nav_part").css("padding-top")) : parseInt(jQuery(".site_header .header_box").css("padding-top"));
		window.sticky_menu.logo_bottom_init_margin = window.sticky_menu.logo_position == "logo-center" ? parseInt(jQuery(".site_header .header_nav_part").css("padding-bottom")) : parseInt(jQuery(".site_header .header_box").css("padding-bottom"));
	}
}

function sticky_init() {
	sticky_vars();
	if (window.stick_menu == 1 && !is_mobile_device()) {
		sticky();
		jQuery(window).scroll(sticky);
		jQuery(window).resize(sticky);
	}
}

function sticky(e) {
	var e = e != undefined ? e : new Object();
	var e_type = e.type ? e.type : '';
	var f_is_mobile = is_mobile();
	var is_set = window.sticky_menu.is_set;
	var should_be_sticky = jQuery(document).scrollTop() > window.sticky_menu.menu_offset;
	var header_bg_sections = jQuery('.header_bg_img, .cws_parallax_scene_container');

	if (e_type == 'resize') {
		if ((f_is_mobile && is_set) || !mobile_menu_width_check()) {
			reset_sticky();
		} else if (!f_is_mobile && !is_set && should_be_sticky) {
			set_sticky();
		}
	} else if (e_type == 'scroll') {
		if (!f_is_mobile) {
			if (should_be_sticky && !is_set && (!is_mobile() || mobile_menu_width_check())) {
				set_sticky(true);
			} else if ((!should_be_sticky && is_set) || (is_mobile() && !mobile_menu_width_check())) {
				reset_sticky(true);
			}
		} else {
			reset_sticky(true);
		}
	} else {
		if (should_be_sticky && !is_set && mobile_menu_width_check()) {
			if (header_bg_sections.length) {
				cws_wait_for_header_bg_height_assigned(function() { /* it may require in another conditions too */
					set_sticky();
				});
			} else {
				set_sticky();
			}
		} else if ((!should_be_sticky && is_set) || !mobile_menu_width_check()) {
			reset_sticky();
		}
	}
}

function set_heigth_sticky() {
	var x = jQuery('.site_header .header_box').eq(0).outerHeight();
	jQuery('.site_header').css("height", x);
	jQuery(window).on("resize", function() {
		var x = jQuery('.site_header .header_box').eq(0).outerHeight();
		jQuery('.site_header').css("height", x);
	})
}

function set_sticky(animated) {
	animated = animated != undefined ? animated : false;
	window.sticky_menu.site_header.addClass("sticky");
	var width = Boolean(jQuery(".page_boxed").length) ? jQuery(".page_boxed").outerWidth() + "px" : "100%";
	var left = Boolean(jQuery(".page_boxed").length) ? jQuery(".page_boxed").offset().left + "px" : "0";
	var sticky_el_styles = {
		"position": "fixed",
		"width": width,
		top: 0,
		"left": left
	};
	var tb_spacing_adjustments = {
		"padding-top": window.sticky_menu.logo_indent + "px",
		"padding-bottom": window.sticky_menu.logo_indent + "px"
	};
	var logo_sticky_adjustments = {'height':'auto'};
	if (((window.sticky_menu.menu_item_height - 24) < window.sticky_menu.logo_init_height)) {
		var logo_sticky_adjustments = {
			"height": String(window.sticky_menu.logo_init_height) + "px"
		};
	};
	if (window.sticky_menu.site_header.find(".header_logo_part").hasClass("with_border")) {
		if (((window.sticky_menu.menu_item_height - 24) < window.sticky_menu.logo_init_height)) {
			var logo_sticky_adjustments = {
				"height": String(window.sticky_menu.menu_item_height - 24) + "px"
			};
		};
	};
	if ((window.sticky_menu.logo_position == 'logo-in') || window.sticky_menu.site_header.hasClass('custom_sticky_logo')) {
		logo_sticky_adjustments = {'height':'auto'};
	};

	if (window.sticky_menu.logo_position != "logo-center") {
		window.sticky_menu.site_header.find(".header_box").css(sticky_el_styles);
		if (window.header_after_slider) {
			window.sticky_menu.site_header.find(".header_box").css(tb_spacing_adjustments);
			window.sticky_menu.site_header.find(".logo>img:not(.logo_sticky)").css(logo_sticky_adjustments);
		} else {
			if (animated) {
				window.sticky_menu.site_header.find(".header_box").stop().animate(tb_spacing_adjustments, window.sticky_menu.animation_speed);
				window.sticky_menu.site_header.find(".logo>img:not(.logo_sticky)").stop().animate(logo_sticky_adjustments, window.sticky_menu.animation_speed);
			} else {
				window.sticky_menu.site_header.find(".header_box").css(tb_spacing_adjustments);
				window.sticky_menu.site_header.find(".logo>img:not(.logo_sticky)").css(logo_sticky_adjustments);
			}
		}
	} else {
		window.sticky_menu.menu_container.find(".main-nav-container").css({ "width": window.sticky_menu.header_content_part_width + "px", "margin-left": "auto", "margin-right": "auto" });
		window.sticky_menu.menu_container.css(sticky_el_styles);
		window.sticky_menu.menu_container.css(tb_spacing_adjustments);
	}
	window.sticky_menu.is_set = true;
}

function reset_sticky(animated) {
	animated = animated != undefined ? animated : false;
	var sticky_obj_styles = window.sticky_menu.site_header.find(".header_box")[0].style;
	var logo_sticky_adjustments = {'height':'auto'};
	if (((window.sticky_menu.menu_item_height - 24) < window.sticky_menu.logo_init_height)) {
		logo_sticky_adjustments = {
			"height": window.sticky_menu.logo_init_height + "px"
		};
	}
	if ((window.sticky_menu.logo_position == 'logo-in') || window.sticky_menu.site_header.hasClass('custom_sticky_logo')) {
		logo_sticky_adjustments = {'height':'auto'};
	};
	var tb_spacing_adjustments = {
		"padding-top": window.sticky_menu.logo_top_init_margin + "px",
		"padding-bottom": window.sticky_menu.logo_bottom_init_margin + "px"
	};
	window.sticky_menu.site_header.removeClass("sticky");
	if (window.sticky_menu.logo_position != "logo-center") {
		sticky_obj_styles.removeProperty("position");
		sticky_obj_styles.removeProperty("width");
		sticky_obj_styles.removeProperty("top");
		sticky_obj_styles.removeProperty("left");
		if (!window.header_after_slider) {
			if (animated) {
				window.sticky_menu.site_header.find(".header_box").stop().animate(tb_spacing_adjustments, window.sticky_menu.animation_speed);
				window.sticky_menu.site_header.find(".logo>img:not(.logo_sticky)").stop().animate(logo_sticky_adjustments, window.sticky_menu.animation_speed);
			} else {
				window.sticky_menu.site_header.find(".header_box").css(tb_spacing_adjustments, window.sticky_menu.animation_speed);
				window.sticky_menu.site_header.find(".logo>img:not(.logo_sticky)").css(logo_sticky_adjustments, window.sticky_menu.animation_speed);
			}
		}
	} else {
		window.sticky_menu.menu_container.removeAttr("style");
		window.sticky_menu.menu_container.find(".main-nav-container").removeAttr("style");
	}
	window.sticky_menu.is_set = false;
}

function is_mobile() {
	return window.innerWidth < 768;
}

function is_mobile_device() {
	if ((jQuery(window).width() < 767) || (navigator.userAgent.match(/(Android|iPhone|iPod|iPad)/))) {
		return true;
	} else {
		return false;
	}
}

function mobile_menu_width_check() {
	if (jQuery(".site_header.logo-in-menu .container").length) {
		return jQuery(".site_header .container").width() > parseInt(jQuery(".site_header .main-menu").attr("data-menu-width"));
	} else if(jQuery(".site_header.logo-center .header_logo_part").width()) {
		return jQuery(".site_header .container").width() > (parseInt(jQuery(".site_header .main-menu").attr("data-menu-width")));
	} else{
		return jQuery(".site_header .container").width() > (parseInt(jQuery(".site_header .main-menu").attr("data-menu-width")) + jQuery(".site_header .header_logo_part").width());
	}
}

function logo_in_menu_replece() {
	var html_text = jQuery('.site_header.logo-in-menu .main-menu .header_logo_part').clone()[0];
	jQuery('.site_header.logo-in-menu').length ? jQuery('.site_header.logo-in-menu .container').prepend(html_text) : '';
}


/* sticky */

/* mobile menu */

function mobile_pre_load() {
	if (is_mobile() || is_mobile_device()) {
		jQuery('.main-menu').css('opacity', '0')
	}
}

var mobile_menu_controller_init_once = false;

function mobile_menu_controller_init() {
	if (mobile_menu_controller_init_once == false) {
		window.mobile_nav = {
			"is_mobile_menu": false,
			"nav_obj": jQuery(".main-menu").clone(),
			"level": 1,
			"current_id": false,
			"next_id": false,
			"prev_id": "",
			"animation_params": {
				"vertical_start": 50,
				"vertical_end": 10,
				"horizontal_start": 0,
				"horizontal_end": 70,
				"speed": 200
			}
		};
		if (is_mobile_device()) {
			set_mobile_menu();
		} else {
			mobile_menu_controller();
			jQuery(window).resize(function() {
				mobile_menu_controller();
			});
		}
		mobile_nav_switcher_init();
	}
	mobile_menu_controller_init_once = true;

}

function check_menu_width() {
	var allWidth = 0;
	jQuery(".site_header .main-menu").children().each(function() {
		allWidth = allWidth + jQuery(this).outerWidth(true);
	})
	jQuery(".site_header.mobile_nav .main-menu").length ? '' : jQuery(".site_header .main-menu").attr("data-menu-width", allWidth);
}




function mobile_nav_switcher_init() {
	var nav_container = jQuery(".site_header .header_nav_part");
	jQuery(document).on("click", ".header_nav_part.mobile_nav .mobile_menu_header .mobile_menu_switcher", function() {
		var nav = get_current_nav_level();
		var cls = "opened";
		if (nav_container.hasClass(cls)) {
			nav.stop().animate({ "margin-top": window.mobile_nav.animation_params.vertical_start + "px", "opacity": 0 }, window.mobile_nav.animation_params.speed, function() {
				nav_container.removeClass(cls);
			})
		} else {
			nav_container.addClass(cls);
			nav.stop().animate({ "margin-top": window.mobile_nav.animation_params.vertical_end + "px", "opacity": 1 }, window.mobile_nav.animation_params.speed);
		}
	});
}

function mobile_nav_handlers_init() {
	jQuery(".header_nav_part.mobile_nav .button_open").on("click", function(e) {
		var logo_pos_right = jQuery(".site_header").hasClass('logo-right');
		var logo_pos_left = jQuery(".site_header").hasClass('logo-right');
		var left_a = jQuery(".header_nav_part.mobile_nav .main-nav-container").hasClass('a-left');
		var right_a = jQuery(".header_nav_part.mobile_nav .main-nav-container").hasClass('a-right');
		var posit_menu = '';
		if (logo_pos_right && right_a) {
			posit_menu = 'left'
		} else if (logo_pos_left && left_a) {
			posit_menu = 'right'
		} else if (left_a) {
			posit_menu = 'left'
		} else if (right_a) {
			posit_menu = 'right'
		};
		var el = jQuery(this);
		var next_id = el.closest(".menu-item").attr("id");
		var current_nav_level = get_current_nav_level();
		var next_nav_level = get_next_nav_level(next_id);
		current_nav_level.animate({ "right": window.mobile_nav.animation_params.horizontal_end + "px", "opacity": 0 }, window.mobile_nav.animation_params.speed, function() {
			current_nav_level.remove();
			jQuery(".main-nav-container").append(next_nav_level);
			next_nav_level.css({ "display": "block", "margin-top": window.mobile_nav.animation_params.vertical_end + "px", "right": "-" + window.mobile_nav.animation_params.horizontal_end + "px", "opacity": 0 });
			next_nav_level.animate({ "right": window.mobile_nav.animation_params.horizontal_start + "px", "opacity": 1 }, window.mobile_nav.animation_params.speed);
			window.mobile_nav.current_id = next_id;
			window.mobile_nav.level++;
			mobile_nav_handlers_init();
		});
	});
	jQuery(".header_nav_part.mobile_nav .back>a").on("click", function() {
		var current_nav_level = get_current_nav_level();
		var next_nav_level = get_prev_nav_level();
		current_nav_level.animate({ "right": "-" + window.mobile_nav.animation_params.horizontal_end + "px", "opacity": 0 }, window.mobile_nav.animation_params.speed, function() {
			current_nav_level.remove();
			jQuery(".main-nav-container").append(next_nav_level);
			next_nav_level.css({ "display": "block", "margin-top": window.mobile_nav.animation_params.vertical_end + "px", "right": window.mobile_nav.animation_params.horizontal_end + "px", "opacity": 0 });
			next_nav_level.animate({ "right": window.mobile_nav.animation_params.horizontal_start + "px", "opacity": 1 }, window.mobile_nav.animation_params.speed);
			window.mobile_nav.level--;
			mobile_nav_handlers_init();
		});
	});
}

function get_current_nav_level() {
	var r = window.mobile_nav.level < 2 ? jQuery(".header_nav_part .main-menu") : jQuery(".main-nav-container .sub-menu");
	r.find(".sub-menu").remove();
	return r;
}

function get_next_nav_level(next_id) {
	var r = window.mobile_nav.nav_obj.find("#" + next_id).children(".sub-menu").first().clone();
	r.find(".sub-menu").remove();
	return r;
}

function get_prev_nav_level() {
	var r = {};
	if (window.mobile_nav.level > 2) {
		r = window.mobile_nav.nav_obj.find("#" + window.mobile_nav.current_id).parent(".sub-menu").parent(".menu-item");
		window.mobile_nav.current_id = r.attr("id");
		r = r.children(".sub-menu").first();
	} else {
		r = window.mobile_nav.nav_obj;
		window.mobile_nav.current_id = false;
	}
	r = r.clone();
	r.find(".sub-menu").remove();
	return r;
}

function mobile_menu_controller() {
	window.mobile_menu = {
		'site_header': jQuery(".site_header"),
		'subst_header_height': 0,
		'logo_position': get_logo_position(),
		'menu_container': jQuery('.site_header .header_nav_part'),
		'header_bg': jQuery('.header_bg_img, .cws_parallax_scene_container').eq(0),
		'is_set': false,
		'logo_init_height': jQuery(".site_header .logo>img").outerHeight(),
		'menu_item_height': jQuery('.site_header .header_nav_part').find(".main-menu>.menu-item").eq(0).outerHeight(),
		'logo_indent': 12,
		'header_content_part_width': parseInt(jQuery(".site_header .container").eq(0).width()),
		'animation_speed': 300
	};
	if ((is_mobile() && !window.mobile_nav.is_mobile_menu) || !mobile_menu_width_check()) {
		set_mobile_menu();
	} else if (!is_mobile() && window.mobile_nav.is_mobile_menu && mobile_menu_width_check()) {
		reset_mobile_menu();
	}
}

function set_mobile_menu() {
	var nav = get_current_nav_level();
	jQuery(".site_header").addClass("mobile_nav");
	jQuery('.site_header .header_nav_part').addClass("mobile_nav");
	nav.css({ "margin-top": window.mobile_nav.animation_params.vertical_start + "px" });
	window.mobile_nav.is_mobile_menu = true;
	mobile_nav_handlers_init();
	jQuery(".site_header").addClass('loaded');
}

function reset_mobile_menu() {
	var nav = get_current_nav_level();
	jQuery(".site_header").removeClass("mobile_nav opened");
	jQuery('.site_header .header_nav_part').removeClass("mobile_nav opened");
	nav.removeAttr("style");
	window.mobile_nav.is_mobile_menu = false;
	nav.remove();
	reset_mobile_nav_params();
	canvas_dashed_menu();
}

function reset_mobile_nav_params() {
	jQuery(".main-nav-container").append(window.mobile_nav.nav_obj.clone());
	window.mobile_nav.level = 1;
	window.mobile_nav.current_id = false;
	window.mobile_nav.next_id = false;
}

/* \mobile menu */

/* carousel */

function gallery_post_carousel_init() {
	jQuery(".gallery_post_carousel").each(function() {
		var nav_init = true;
		var owl = jQuery(this);
		owl.owlCarousel({
			direction: directRTL,
			singleItem: true,
			slideSpeed: 300,
			navigation: false,
			pagination: false,
			afterUpdate: function() { setTimeout(function() { jQuery('.isotope').length ? owl.closest('.isotope').isotope('layout') : '' }, 50) },
			afterInit: function() { setTimeout(function() { jQuery('.isotope').length ? owl.closest('.isotope').isotope('layout') : '' }, 50) }
		});

		if (owl.attr('data-nav-init') == undefined) {
			owl.attr('data-nav-init', true);
		} else {
			owl.attr('data-nav-init', false);
		}

		if (owl.attr('data-nav-init') == 'true') {
			nav_init = false;
			jQuery(this).parent().children(".carousel_nav.next").click(function() {
				owl.trigger('owl.next');
			});
			jQuery(this).parent().children(".carousel_nav.prev").click(function() {
				owl.trigger('owl.prev');
			});
		}
	});
}

function widget_carousel_init() {
	jQuery(".widget_carousel").each(function() {
		var cont = jQuery(this);
		cont.owlCarousel({
			direction: directRTL,
			singleItem: true,
			slideSpeed: 300,
			navigation: false,
			pagination: true
		});
	});
}


/* portfolio ajax */

function cws_portfolio_pagination_init() {
	var els = jQuery(".cws_portfolio .pagination");
	els.each(function() {
		var pagination = jQuery(this);
		cws_portfolio_pagination(pagination);
	});
}

function cws_portfolio_pagination(pagination) {
	if (pagination == undefined) return;
	var old_page_links = pagination.find(".page_links");
	var items = old_page_links.find(".page-numbers").not(".current");
	var parent = pagination.closest(".cws_portfolio");
	var grid = parent.find(".cws_portfolio_items");
	var ajax_data_input = parent.find("input.cws_portfolio_ajax_data");
	items.each(function() {
		var item = jQuery(this);
		var url = item.attr("href");
		var ajax_data = JSON.parse(ajax_data_input.val());
		ajax_data['url'] = url;
		item.on("click", function(e) {
			e.preventDefault();
			jQuery.post(ajaxurl, {
				"action": "cws_portfolio_pagination",
				"data": ajax_data
			}, function(data, status) {
				var img_loader;
				var parent_offset = parent.offset().top;
				var old_items = jQuery(".item", grid);
				var new_items = jQuery(".item", jQuery(data));
				var new_page_links = jQuery(".pagination .page_links", jQuery(data));
				var new_page_links_exists = Boolean(new_page_links.children().length);
				new_items.css("display", "none");
				grid.isotope('remove', old_items);
				if (window.scrollY > parent_offset) {
					jQuery('html, body').stop().animate({
						scrollTop: parent_offset
					}, 300);
				}
				grid.append(new_items);
				img_loader = imagesLoaded(grid);
				img_loader.on("always", function() {
					grid.isotope('appended', new_items);
					grid.isotope('layout');
					old_page_links.fadeOut(function() {
						old_page_links.remove();
						if (new_page_links_exists) {
							new_page_links.css("display", "none");
							pagination.append(new_page_links);
							new_page_links.fadeIn();
							cws_portfolio_pagination(pagination);
						} else {
							pagination.remove();
						}
						if (Retina.isRetina()) {
							jQuery(window.retina.root).trigger("load");
						}
						fancybox_init();
					});
				});
			});
		});
	});
}

function cws_portfolio_filter_init() {
	var els = jQuery(".cws_portfolio select.cws_portfolio_filter");
	els.each(function() {
		var el = jQuery(this);
		var parent = el.closest(".cws_portfolio");
		var grid = parent.find(".cws_portfolio_items");
		var ajax_data_input = parent.find("input.cws_portfolio_ajax_data");
		el.on("change", function() {
			var val = el.val();
			var ajax_data = JSON.parse(ajax_data_input.val());
			ajax_data["filter"] = val;
			var old_pagination = parent.find(".pagination");
			var old_page_links = jQuery(".page_links", old_pagination);
			jQuery.post(ajaxurl, {
				"action": "cws_portfolio_filter",
				"data": ajax_data
			}, function(data, status) {
				var img_loader;
				var old_items = jQuery(".item", grid);
				var new_items = jQuery(".item", jQuery(data));
				var new_pagination = jQuery(".pagination", jQuery(data));
				var new_page_links = jQuery(".page_links", new_pagination);
				var new_page_links_exists = Boolean(new_page_links.children().length);
				new_items.css("display", "none");
				grid.isotope('remove', old_items);
				grid.append(new_items);
				img_loader = imagesLoaded(grid);
				img_loader.on("always", function() {
					grid.isotope('appended', new_items);
					grid.isotope('layout');
					ajax_data_input.attr("value", JSON.stringify(ajax_data));
					if (old_pagination.length) {
						if (new_page_links_exists) {
							new_page_links.css("display", "none");
							old_page_links.fadeOut(function() {
								old_page_links.remove();
								old_pagination.append(new_page_links);
								new_page_links.fadeIn();
								cws_portfolio_pagination(old_pagination);
							});
						} else {
							old_pagination.fadeOut(function() {
								old_pagination.remove();
							});
						}
					} else {
						if (new_page_links_exists) {
							new_pagination.css("display", "none");
							parent.append(new_pagination);
							new_pagination.fadeIn();
							cws_portfolio_pagination(new_pagination);
						}
					}
					if (Retina.isRetina()) {
						jQuery(window.retina.root).trigger("load");
					}
					fancybox_init();
				});
			});
		});
	});
}

function cws_portfolio_single_carousel_init() {
	jQuery(".cws_portfolio.single.related").each(function() {
		var parent = jQuery(this);
		var grid = jQuery(".cws_portfolio_items", parent);
		var ajax_data_input = jQuery("#cws_portfolio_single_ajax_data", parent);
		var carousel_nav = jQuery(".carousel_nav_panel", parent);
		if (!carousel_nav.length) return;
		jQuery(".prev,.next", carousel_nav).on("click", function() {
			var el = jQuery(this);
			var action = el.hasClass("prev") ? "prev" : "next";
			var ajax_data = JSON.parse(ajax_data_input.val());
			var current = ajax_data['current'];
			var all = ajax_data['related_ids'];
			var next_ind;
			var next;
			for (var i = 0; i < all.length; i++) {
				if (all[i] == current) {
					if (action == "prev") {
						if (i <= 0) {
							next_ind = all.length - 1;
						} else {
							next_ind = i - 1;
						}
					} else {
						if (i >= all.length - 1) {
							next_ind = 0;
						} else {
							next_ind = i + 1
						}
					}
					break;
				}
			}
			if (typeof next_ind != "number" || typeof all[next_ind] == undefined) return;
			next = all[next_ind];
			jQuery.post(ajaxurl, {
				'action': 'cws_portfolio_single',
				'data': {
					'initial_id': ajax_data['initial'],
					'requested_id': next
				}
			}, function(data, status) {
				var animation_config, old_el, new_el, hiding_class, showing_class, delay, img_loader;
				ajax_data['current'] = next;
				ajax_data_input.attr("value", JSON.stringify(ajax_data));
				animation_config = {
					'prev': {
						'in': 'fadeInLeft',
						'out': 'fadeOutRight'
					},
					'next': {
						'in': 'fadeInRight',
						'out': 'fadeOutLeft'
					},
					'delay': 150
				};
				old_el = jQuery(".cws_portfolio_items .item", parent);
				new_el = jQuery(".item", jQuery(data));
				hiding_class = "animated " + animation_config[action]['out'];
				showing_class = "animated " + animation_config[action]['in'];
				delay = animation_config['delay'];
				new_el.css("display", "none");
				grid.append(new_el);
				img_loader = imagesLoaded(grid);
				img_loader.on('always', function() {
					old_el.addClass(hiding_class);
					setTimeout(function() {
						old_el.remove();
						new_el.addClass(showing_class);
						new_el.css("display", "block");

						if (Retina.isRetina()) {
							jQuery(window.retina.root).trigger("load");
						}
						fancybox_init();

					}, delay);
				});
			});
		});
	});
}


/* blog ajax */

function cws_blog_pagination_init() {
    var els = jQuery(".news .pagination");
    els.each(function() {
        var pagination = jQuery(this);
        cws_blog_pagination(pagination);
    });
}

function cws_blog_pagination(pagination) {
    if ( pagination === undefined ) return;
    var old_page_links = pagination.find(".page_links");
    var items = old_page_links.find(".page-numbers").not(".current");
    var parent = pagination.closest(".news");
    var grid = parent.find(".grid");
    var ajax_data_input = parent.find("input.cws_blog_ajax_data");
    items.each(function() {
        var item = jQuery(this);
        var url = item.attr("href");
        var ajax_data = JSON.parse(ajax_data_input.val());
        ajax_data['url'] = url;
        item.on("click", function(e) {
            e.preventDefault();
            jQuery.post(ajaxurl, {
                "action": "cws_blog_pagination",
                "data": ajax_data
            }, function(data, status) {
                var img_loader;
                var parent_offset = parent.offset().top;
                var old_items = jQuery(".item", grid);
                var new_items = jQuery(".item", jQuery(data));
                var new_page_links = jQuery(".pagination .page_links", jQuery(data));
                var new_page_links_exists = Boolean(new_page_links.children().length);
                new_items.css("display", "none");
                grid.isotope('remove', old_items);
                if (window.scrollY > parent_offset) {
                    jQuery('html, body').stop().animate({
                        scrollTop: parent_offset
                    }, 300);
                }
                grid.append(new_items);
                img_loader = imagesLoaded(grid);
                img_loader.on("always", function() {
                    grid.isotope('appended', new_items);
                    grid.isotope('layout');
                    old_page_links.fadeOut(function() {
                        old_page_links.remove();
                        if (new_page_links_exists) {
                            new_page_links.css("display", "none");
                            pagination.append(new_page_links);
                            new_page_links.fadeIn();
                            cws_blog_pagination(pagination);
                        } else {
                            pagination.remove();
                        }
                        if (Retina.isRetina()) {
                            jQuery(window.retina.root).trigger("load");
                        }
                        reload_scripts();
                    });
                });
            });
        });
    });
}




/* ourteam ajax */

function cws_ourteam_pagination_init() {
	var els = jQuery(".cws_ourteam .pagination");
	els.each(function() {
		var pagination = jQuery(this);
		cws_ourteam_pagination(pagination);
	});
}

function cws_ourteam_pagination(pagination) {
	if (pagination == undefined) return;
	var old_page_links = pagination.find(".page_links");
	var items = old_page_links.find(".page-numbers").not(".current");
	var parent = pagination.closest(".cws_ourteam");
	var grid = parent.find(".cws_ourteam_items");
	var ajax_data_input = parent.find("input.cws_ourteam_ajax_data");
	items.each(function() {
		var item = jQuery(this);
		var url = item.attr("href");
		var ajax_data = JSON.parse(ajax_data_input.val());
		ajax_data['url'] = url;
		item.on("click", function(e) {
			e.preventDefault();
			jQuery.post(ajaxurl, {
				"action": "cws_ourteam_pagination",
				"data": ajax_data
			}, function(data, status) {
				var img_loader;
				var parent_offset = parent.offset().top;
				var old_items = jQuery(".item", grid);
				var new_items = jQuery(".item", jQuery(data));
				var new_page_links = jQuery(".pagination .page_links", jQuery(data));
				var new_page_links_exists = Boolean(new_page_links.children().length);
				new_items.css("display", "none");
				grid.isotope('remove', old_items);
				if (window.scrollY > parent_offset) {
					jQuery('html, body').stop().animate({
						scrollTop: parent_offset
					}, 300);
				}
				grid.append(new_items);
				img_loader = imagesLoaded(grid);
				img_loader.on("always", function() {
					grid.isotope('appended', new_items);
					grid.isotope('layout');
					old_page_links.fadeOut(function() {
						old_page_links.remove();
						if (new_page_links_exists) {
							new_page_links.css("display", "none");
							pagination.append(new_page_links);
							new_page_links.fadeIn();
							cws_ourteam_pagination(pagination);
						} else {
							pagination.remove();
						}
						if (Retina.isRetina()) {
							jQuery(window.retina.root).trigger("load");
						}
						fancybox_init();
					});
				});

			});
		});
	});
}

function cws_ourteam_filter_init() {
	var els = jQuery(".cws_ourteam select.cws_ourteam_filter");
	els.each(function() {
		var el = jQuery(this);
		var parent = el.closest(".cws_ourteam");
		var grid = parent.find(".cws_ourteam_items");
		var ajax_data_input = parent.find("input.cws_ourteam_ajax_data");
		el.on("change", function() {
			var val = el.val();
			var ajax_data = JSON.parse(ajax_data_input.val());
			ajax_data["filter"] = val;
			var old_pagination = parent.find(".pagination");
			var old_page_links = jQuery(".page_links", old_pagination);
			jQuery.post(ajaxurl, {
				"action": "cws_ourteam_filter",
				"data": ajax_data
			}, function(data, status) {
				var img_loader;
				var old_items = jQuery(".item", grid);
				var new_items = jQuery(".item", jQuery(data));
				var new_pagination = jQuery(".pagination", jQuery(data));
				var new_page_links = jQuery(".page_links", new_pagination);
				var new_page_links_exists = Boolean(new_page_links.children().length);
				new_items.css("display", "none");
				grid.isotope('remove', old_items);
				grid.append(new_items);
				img_loader = imagesLoaded(grid);
				img_loader.on("always", function() {
					grid.isotope('appended', new_items);
					grid.isotope('layout');
					ajax_data_input.attr("value", JSON.stringify(ajax_data));
					if (old_pagination.length) {
						if (new_page_links_exists) {
							new_page_links.css("display", "none");
							old_page_links.fadeOut(function() {
								old_page_links.remove();
								old_pagination.append(new_page_links);
								new_page_links.fadeIn();
								cws_ourteam_pagination(old_pagination);
							});
						} else {
							old_pagination.fadeOut(function() {
								old_pagination.remove();
							});
						}
					} else {
						if (new_page_links_exists) {
							new_pagination.css("display", "none");
							parent.append(new_pagination);
							new_pagination.fadeIn();
							cws_ourteam_pagination(new_pagination);
						}
					}
					if (Retina.isRetina()) {
						jQuery(window.retina.root).trigger("load");
					}
					fancybox_init();
				});
			});
		});
	});
}

/* \ourteam ajax */

jQuery.fn.cws_flex_carousel = function(parent_sel, header_sel) {
	parent_sel = parent_sel != undefined ? parent_sel : '';
	header_sel = header_sel != undefined ? header_sel : '';
	jQuery(this).each(function() {
		var owl = jQuery(this);
		var nav = jQuery(".carousel_nav_panel_container", parent_sel);
		owl.cws_flex_carousel_controller(parent_sel, header_sel);
		if (nav.length) {
			jQuery(".next", nav).click(function() {
				owl.trigger("owl.next");
			});
			jQuery(".prev", nav).click(function() {
				owl.trigger("owl.prev");
			});
		}
		jQuery(window).resize(function() {
			owl.cws_flex_carousel_controller(parent_sel, header_sel);
		});
	});
}

jQuery.fn.cws_flex_carousel_controller = function(parent_sel, header_sel) {
	var owl = jQuery(this);
	var nav = jQuery(".carousel_nav_panel_container", parent_sel);
	var show_hide_el = nav.siblings().length ? nav : nav.closest(header_sel);
	var show_hide_el_display_prop = window.getComputedStyle(show_hide_el[0]).display;
	var is_init = owl.hasClass('owl-carousel');
	if (is_init) {
		owl.data('owlCarousel').destroy();
		show_hide_el.css('display', 'none');
	}
	var items_count = owl.children().length;
	var visible_items_count = count_carousel_items(owl);

	var args = {
		direction: directRTL,
		items: visible_items_count,
		slideSpeed: 300,
		navigation: false,
		pagination: false,
		responsive: false
	}
	if (items_count > visible_items_count) {
		owl.owlCarousel(args);
		show_hide_el.css('display', show_hide_el_display_prop);
	}
}

function count_carousel_items(cont, layout_class_prefix, item_class, margin) {
	var re, matches, cols, cont_width, items, item_width, margins_count, cont_without_margins, items_count;
	if (!cont) return 1;
	layout_class_prefix = layout_class_prefix ? layout_class_prefix : 'grid-';
	item_class = item_class ? item_class : 'item';
	margin = margin ? margin : 30;
	re = new RegExp(layout_class_prefix + "(\d+)");
	matches = re.exec(cont.attr("class"));
	cols = matches == null ? 1 : parseInt(matches[1]);
	cont_width = cont.outerWidth();
	items = cont.children("." + item_class);
	item_width = items.eq(0).outerWidth();
	margins_count = cols - 1;
	cont_without_margins = cont_width - (margins_count * margin); /* margins = 30px */
	items_count = Math.round(cont_without_margins / item_width);
	return items_count;
}

function cws_sc_carousel_init() {
	jQuery(".cws_sc_carousel").each(cws_sc_carousel_controller);
	window.addEventListener('resize', function() {
		jQuery(".cws_sc_carousel").each(cws_sc_carousel_controller);
		cws_patern_width
	}, false);
}
var nav_init = true;

function cws_sc_carousel_controller() {
	var el = jQuery(this);
	var bullets_nav = el.hasClass("bullets_nav");
	var content_wrapper = jQuery(".cws_wrapper", el);
	var owl = content_wrapper;
	var content_top_level = content_wrapper.children();
	var nav = jQuery(".carousel_nav_panel", el);
	var cols = el.data("columns");
	var items_count, grid_class, col_class, items, is_init, matches, args, page_content_section, sb_count;
	page_content_section = jQuery(".page_content");
	var autoplay_speed = (el.hasClass( "autoplay" ) ? el.data( "autoplay" ) : false);

	var speed = 300;

	if (page_content_section.hasClass("double_sidebar")) {
		sb_count = 2;
	} else if (page_content_section.hasClass("single_sidebar")) {
		sb_count = 1;
	} else {
		sb_count = 0;
	}
	if (content_top_level.is(".gallery[class*='galleryid-']")) {
		owl = content_top_level.filter(".gallery[class*='galleryid-']");
		is_init = owl.hasClass("owl-carousel");
		if (is_init) owl.data("owlCarousel").destroy();
		owl.children(":not(.gallery-item)").remove();
		if (content_top_level.parents('.cws_sc_carousel').data('columns')) {
            items_count = content_top_level.parents('.cws_sc_carousel').data('columns');
		} else {
            items_count = count_carousel_items(owl, "gallery-columns-", "gallery-item");
		}
        if (content_top_level.parents('.cws_sc_carousel').data('slidespeed')) {
			speed = content_top_level.parents('.cws_sc_carousel').data('slidespeed');
		}
	} else if (content_top_level.is(".woocommerce")) {
		owl = content_top_level.children(".products");
		is_init = owl.hasClass("owl-carousel");
		if (is_init) owl.data("owlCarousel").destroy();
		owl.children(":not(.product)").remove();
		matches = /columns-\d+/.exec(content_top_level.attr("class"));
		grid_class = matches != null && matches[0] != undefined ? matches[0] : '';
		owl.addClass(grid_class);
		items_count = count_carousel_items(owl, "columns-", "product");
		owl.removeClass(grid_class);
	} else if (content_top_level.is("ul")) {
		owl = content_top_level;
		is_init = owl.hasClass("owl-carousel");
		if (is_init) owl.data("owlCarousel").destroy();
		items = owl.children();
		grid_class = "crsl-grid-" + cols;
		col_class = "grid_col_" + Math.round(12 / cols);
		owl.addClass(grid_class);
		if (!items.hasClass("item")) items.addClass("item")
		items.addClass(col_class);
		items_count = count_carousel_items(owl, "crsl-grid-", "item");
		owl.removeClass(grid_class);
		items.removeClass(col_class);
	} else {
		is_init = owl.hasClass("owl-carousel");
		if (is_init) owl.data("owlCarousel").destroy();
		items = owl.children();
		grid_class = "crsl-grid-" + cols;
		col_class = "grid_col_" + Math.round(12 / cols);
		owl.addClass(grid_class);
		if (!items.hasClass("item")) items.addClass("item")
		items.addClass(col_class);
		items_count = count_carousel_items(owl, "crsl-grid-", "item");
		owl.removeClass(grid_class);
		items.removeClass(col_class);
	}
	args = {
		direction: directRTL,
		slideSpeed: speed,
		navigation: false,
		pagination: bullets_nav,
		autoPlay: autoplay_speed
	};
	switch (items_count) {
		case 4:
			if (sb_count == 2) {
				args.itemsCustom = [
					[0, 1],
					[479, 2],
					[767, 2],
					[980, 2],
					[1170, 4]
				];
			} else if (sb_count == 1) {
				args.itemsCustom = [
					[0, 1],
					[479, 2],
					[767, 2],
					[980, 2],
					[1170, 4]
				];
			} else {
				args.itemsCustom = [
					[0, 1],
					[479, 2],
					[767, 2],
					[980, 3],
					[1170, 4]
				];
			}
			break;
		case 3:
			if (sb_count == 2) {
				args.itemsCustom = [
					[0, 1],
					[479, 2],
					[767, 2],
					[980, 1],
					[1170, 3]
				];
			} else if (sb_count == 1) {
				args.itemsCustom = [
					[0, 1],
					[479, 2],
					[767, 2],
					[980, 2],
					[1170, 3]
				];
			} else {
				args.itemsCustom = [
					[0, 1],
					[479, 2],
					[767, 3],
					[980, 3]
				];
			}
			break;
		case 2:
			if (sb_count == 2) {
				args.itemsCustom = [
					[0, 1],
					[479, 2],
					[767, 2],
					[980, 2],
					[1170, 2]
				];
			} else if (sb_count == 1) {
				args.itemsCustom = [
					[0, 1],
					[479, 2],
					[767, 2],
					[980, 2],
					[1170, 2]
				];
			} else {
				args.itemsCustom = [
					[0, 1],
					[479, 2],
					[767, 2],
					[980, 2],
					[1170, 2]
				];
			}
			break;
		default:
			args.singleItem = true;
	}
	if (owl.attr('data-nav-init') === undefined) {
		owl.attr('data-nav-init', true);
	} else {
		owl.attr('data-nav-init', false);
	}

	owl.owlCarousel(args);
	if (nav.length && owl.attr('data-nav-init') === 'true') {
		nav_init = false;
		jQuery(".next", nav).click(function() {
			owl.trigger("owl.next");
		});
		jQuery(".prev", nav).click(function() {
			owl.trigger("owl.prev");
		});
	}
}

function twitter_carousel_init() {
	jQuery(".tweets_carousel").each(function() {
		var el = jQuery(this);
		var owl = jQuery(".cws_wrapper", el);
		owl.owlCarousel({
			direction: directRTL,
			singleItem: true,
			slideSpeed: 300,
			navigation: false,
			pagination: true
		});
	});
}

/* \carousel */

/* carousel */

/* fancybox */

function fancybox_init() {
	jQuery(".fancy").fancybox();
}

/* \fancybox */

/* isotope */

function isotope_init() {
	if (jQuery(".isotope").length ) {
		jQuery(".isotope").isotope({
			itemSelector: ".item"
		});
	}
}

/* \isotope */

/* load more */

function load_more_init() {
	jQuery(document).on("click", ".cws_load_more", function(e) {
		e.preventDefault();
		var el = jQuery(this);
		var url = el.attr("href");
		var paged = parseInt(el.data("paged"));
		var max_paged = parseInt(el.data("max-paged"));
		var template = el.data("template");
		var item_cont = el.siblings(".grid");
		var isotope = false;
		var args = { ajax: "true", paged: paged, template: template };
		if (!item_cont.length) return;
		jQuery.post(url, args, function(data) {
			var new_items = jQuery(data).filter('.item');
			if (!new_items.length) return;
			new_items.css('display', 'none');
			jQuery(item_cont).append(new_items);
			var img_loader = imagesLoaded(jQuery(item_cont));
			img_loader.on('always', function() {
				new_items.css('display', 'block');
				if (jQuery(item_cont).isotope) {
					jQuery(item_cont).isotope('appended', new_items);
					jQuery(item_cont).isotope('layout');
				}
				if (Retina.isRetina()) {
					jQuery(window.retina.root).trigger("load");
				}
				if (paged == max_paged) {
					el.fadeOut({
						duration: 300,
						complete: function() {
							el.remove();
						}
					})
				} else {
					el.data("paged", String(paged + 1));
				}
				reload_scripts();
			});
		});
	});
}

/* \load more */

/* parallax */

function cws_parallax_init() {
	if (jQuery(".cws_prlx_section").length) {
		jQuery(".cws_prlx_section").cws_prlx();
	};

}

/* \parallax */

/* widget archives hierarchy */

function widget_archives_hierarchy_init() {
	widget_archives_hierarchy_controller(".cws-widget>ul li", "ul.children", "parent_archive", "widget_archive_opener");
	widget_archives_hierarchy_controller(".cws-widget .menu>li", "ul.sub-menu", "has_children", "opener");
}

function widget_archives_hierarchy_controller(list_item_selector, sublist_item_selector, parent_class, opener_class) {
	jQuery(list_item_selector).has(sublist_item_selector).each(function() {
		jQuery(this).addClass(parent_class);
		var sublist = jQuery(this).children(sublist_item_selector).first();
		var level_height = jQuery(this).outerHeight() - sublist.outerHeight();
		jQuery(this).append("<span class='fa fa-angle-right " + opener_class + "' style='line-height:" + level_height + "px;'></span>");
	});
	jQuery(list_item_selector + ">" + sublist_item_selector).css("display", "none");
	jQuery(document).on("click", "." + opener_class, function() {
		var el = jQuery(this);
		var sublist = el.siblings(sublist_item_selector);
		if (!sublist.length) return;
		sublist = sublist.first();
		el.toggleClass("active");
		sublist.slideToggle(300);
	});
}

/* \widget archives hierarchy */

/* select 2 */

function select2_init() {
	jQuery(".site-main select").not('[class^="tinvwl"]').select2();
}

/* \select 2 */

/* tabs */

function cws_tabs_init() {
	jQuery.fn.cws_tabs = function() {
		jQuery(this).each(function() {
			var parent = jQuery(this);
			var tabs = parent.find("[role='tab']");
			var tab_items_container = parent.find("[role='tabpanel']").parent();
			tabs.each(function() {
				jQuery(this).on("click", function() {
					var active_ind = jQuery(this).siblings(".active").eq(0).attr("tabindex");
					jQuery(this).addClass("active").siblings().removeClass("active");
					var item = tab_items_container.find("[tabindex='" + this.tabIndex + "']");
					item.siblings("[tabindex='" + active_ind + "']").eq(0).fadeToggle("150", 'swing', function() {
						item.fadeToggle("150");
					});
				});
			});
		});
	}
}

function cws_accordion_init() {
	jQuery.fn.cws_accordion = function() {
		jQuery(this).each(function() {
			var sections = jQuery(this).find(".accordion_section");
			sections.each(function(index, value) {
				var section_index = index;
				jQuery(this).find(".accordion_title").on("click", function() {
					jQuery(this).siblings(".accordion_content").slideDown("300");
					sections.eq(section_index).addClass("active");
					sections.eq(section_index).siblings().removeClass("active").find(".accordion_content").slideUp("300");
				});
			});
		});
	}
}

function cws_toggle_init() {
	jQuery.fn.cws_toggle = function(item_class, opener_class, toggle_section_class) {
		var i = 0;
		jQuery(this).each(function() {
			i++;
			var sections = jQuery(this).find("." + item_class);
			var j = 0;
			sections.each(function(index, value) {
				j++;
				var section_index = index;
				jQuery(this).find("." + opener_class).eq(0).on("click", function() {
					if (!sections.eq(section_index).hasClass("active")) {
						sections.eq(section_index).addClass("active");
						sections.eq(section_index).find("." + toggle_section_class).eq(0).slideDown("300");
					} else {
						sections.eq(section_index).removeClass("active");
						sections.eq(section_index).find("." + toggle_section_class).eq(0).slideUp("300");
					}
				});
			});
		});
	}
}

/* \tabs */

/* message box */

function cws_message_box_init() {
	jQuery(document).on('click', '.cws_msg_box.closable .cls_btn', function() {
		var cls_btn = jQuery(this);
		var el = cls_btn.closest(".cws_msg_box");
		el.animate({ opacity: '0' }, 300, function() {
			el.slideUp(300, function() {
				el.remove();
			});
		});
	});
}

/* \message box */

/* milestone */

function cws_milestone_init() {
	jQuery.fn.cws_milestone = function() {
		jQuery(this).each(function() {
			var el = jQuery(this);
			var number_container = el.find(".milestone_number");
			var done = false;
			if (number_container.length) {
				if (!done) done = milestone_controller(el, number_container);
				jQuery(window).scroll(function() {
					if (!done) done = milestone_controller(el, number_container);
				});
			}
		});
	}
}

function milestone_controller(el, number_container) {
	var od, args;
	var speed = number_container.data('speed');
	var number = number_container.text();
	if (el.is_visible()) {
		args = {
			el: number_container[0],
			format: 'd',
		};
		if (speed) args['duration'] = speed;
		od = new Odometer(args);
		od.update(number);
		return true;
	}
	return false;
}

function get_digit(number, digit) {
	var exp = Math.pow(10, digit);
	return Math.round(number / exp % 1 * 10);
}

/* \milestone */

/* progress bar */

function cws_progress_bar_init() {
	jQuery.fn.cws_progress_bar = function() {
		jQuery(this).each(function() {
			var el = jQuery(this);
			var done = false;
			if (!done) done = progress_bar_controller(el);
			jQuery(window).scroll(function() {
				if (!done) done = progress_bar_controller(el);
			});
		});
	}
}

function progress_bar_controller(el) {
	if (el.is_visible()) {
		var progress = el.find(".progress");
		var value = parseInt(progress.attr("data-value"));
		var width = parseInt(progress.css('width').replace(/%|(px)|(pt)/, ""));
		var ind = el.find(".indicator");
		if (width < value) {
			var progress_interval = setInterval(function() {
				width++;
				progress.css("width", width + "%");
				ind.text(' - ' + width + '%');
				if (width == value) {
					clearInterval(progress_interval);
				}
			}, 5);
		}
		return true;
	}
	return false;
}

/* \progress bar */

/* button */
function custom_colors_init() {
	jQuery(".cws_fa.customized").each(function() {
		var bg_color = jQuery(this).attr("data-bg-color");
		var font_color = jQuery(this).attr("data-font-color");
		var border_color = jQuery(this).attr("data-border-color");
		var alt = jQuery(this).hasClass("alt");
		var icon_wrapp = jQuery(this).parent('.cws_fa_wrapper');
		if (alt) {
			jQuery(this).css({ "background-color": bg_color, "color": font_color });
			jQuery(icon_wrapp).find('.ring').css({ "border-color": border_color });
			if (jQuery(icon_wrapp).parent('a').length) {
				jQuery(icon_wrapp).on("mouseenter", function() {
					jQuery(this).find('.cws_fa').css({ "background-color": font_color, "color": bg_color });
				});
				jQuery(icon_wrapp).on("mouseleave", function() {
					jQuery(this).find('.cws_fa').css({ "background-color": bg_color, "color": font_color });
				});
			};
		} else {
			jQuery(this).css({ "background-color": bg_color, "color": font_color });
			jQuery(icon_wrapp).find('.ring').css({ "border-color": border_color });
			if (jQuery(icon_wrapp).parent('a').length) {
				jQuery(icon_wrapp).on("mouseenter", function() {
					jQuery(this).find('.cws_fa').css({ "background-color": border_color, "color": font_color });
					jQuery(this).find('.ring').css({ "border-color": bg_color });
				});
				jQuery(icon_wrapp).on("mouseleave", function() {
					jQuery(this).find('.cws_fa').css({ "background-color": bg_color, "color": font_color });
					jQuery(this).find('.ring').css({ "border-color": border_color });
				});
			};
		}
	});
}




function cws_button_init() {
	jQuery('.cws_button.customized').each(function() {
		var el = jQuery(this);
		var bg_color = el.data('bg_color'),
			bg_hover_color = el.data('bg_hover_color'),
			text_color = el.data('text_color'),
			alt = el.hasClass('alt'),
			alternative;
		var def_state_style = '';
		var alt_state_style = '';
		if (!bg_color || !bg_hover_color) return;
		def_state_style += 'background-color:' + bg_color + ';border-color:' + bg_hover_color + ';color:' + text_color + ';';
		alt_state_style += 'background-color:' + bg_hover_color + ';border-color:' + bg_color + ';color:' + text_color + ';';
		if (alt) {
			alternative = true;
			cws_button_colors_attach(alternative, el, def_state_style, alt_state_style, bg_color, bg_hover_color);
		} else {
			alternative = false;
			cws_button_colors_attach(alternative, el, def_state_style, alt_state_style);
		}
	});
}

function cws_button_colors_attach(alternative, el, style1, style2, bg_color, bg_hover_color) {
	if (alternative) {
		el.find('.cws_button_inner').attr('style', style1);
		el.attr('style', 'border-color:' + bg_hover_color + ';');
		el.on('hover', function() {
			el.attr('style', 'border-color:' + bg_color + ';');
			el.find('.cws_button_inner').attr('style', style2);
		});
		el.on('mouseleave', function() {
			el.attr('style', 'border-color:' + bg_hover_color + ';');
			el.find('.cws_button_inner').attr('style', style1);
		});
	} else {
		el.attr('style', style1);
		el.on('hover', function() {
			el.attr('style', style2);
		});
		el.on('mouseleave', function() {
			el.attr('style', style1);
		});
	}

}

function cws_is_rtl() {
	return jQuery("body").hasClass("rtl");
}

function cws_simcal_fix() {
	if (jQuery(".simcal-calendar").length) {
		jQuery("body").css({ 'position': 'static' });
	}
}

/* \button */
