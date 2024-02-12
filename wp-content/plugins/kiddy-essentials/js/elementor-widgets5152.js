"use strict";

jQuery(window).on('elementor/frontend/init', function () {
    elementorFrontend.hooks.addAction('frontend/element_ready/cws_portfolio.default', function ($scope) {
        if ( jQuery('body').hasClass('elementor-editor-active') ) {
            cws_portfolio_pagination_init();
            cws_portfolio_filter_init();
            jQuery('.portfolio_carousel', $scope).cws_flex_carousel('.cws_portfolio', '.cws_portfolio_header');
            jQuery('select.cws_portfolio_filter', $scope).select2();
            setTimeout(isotope_init, 100);
        }
    });
    elementorFrontend.hooks.addAction('frontend/element_ready/cws_our_team.default', function ($scope) {
        if ( jQuery('body').hasClass('elementor-editor-active') ) {
            cws_ourteam_pagination_init();
            cws_ourteam_filter_init();
            jQuery('.ourteam_carousel', $scope).cws_flex_carousel('.cws_ourteam', '.cws_ourteam_header');
            jQuery('select.cws_ourteam_filter', $scope).select2();
            setTimeout(isotope_init, 100);
        }
    });
    elementorFrontend.hooks.addAction('frontend/element_ready/cws_blog.default', function ($scope) {
        if ( jQuery('body').hasClass('elementor-editor-active') ) {
            cws_blog_pagination_init();
            reload_scripts();
            jQuery('.news_carousel', $scope).cws_flex_carousel('.news', '.cws_blog_header');
            setTimeout(isotope_init, 100);
        }
    });
    elementorFrontend.hooks.addAction('frontend/element_ready/cws_carousel.default', function ($scope) {
        if ( jQuery('body').hasClass('elementor-editor-active') ) {
            cws_sc_carousel_init();
        }
    });
    elementorFrontend.hooks.addAction('frontend/element_ready/cws_milestone.default', function ($scope) {
        if ( jQuery('body').hasClass('elementor-editor-active') ) {
            cws_milestone_init();
            jQuery('.cws_milestone', $scope).cws_milestone();
        }
    });
    elementorFrontend.hooks.addAction('frontend/element_ready/cws_accordion_toggle.default', function ($scope) {
        if ( jQuery('body').hasClass('elementor-editor-active') ) {
            cws_accordion_init();
            cws_toggle_init();
            jQuery('.cws_ce_content.ce_accordion', $scope).cws_accordion();
            jQuery('.cws_ce_content.ce_toggle', $scope).cws_toggle('accordion_section', 'accordion_title', 'accordion_content');
        }
    });
    elementorFrontend.hooks.addAction('frontend/element_ready/cws_product_categories.default', function ($scope) {
        if ( jQuery('body').hasClass('elementor-editor-active') ) {
            cws_sc_carousel_init();
        }
    });
    elementorFrontend.hooks.addAction('frontend/element_ready/cws_products.default', function ($scope) {
        if ( jQuery('body').hasClass('elementor-editor-active') ) {
            cws_sc_carousel_init();
        }
    });
    elementorFrontend.hooks.addAction('frontend/element_ready/cws_progress_bar.default', function ($scope) {
        if ( jQuery('body').hasClass('elementor-editor-active') ) {
            cws_progress_bar_init();
            jQuery('.cws_progress_bar', $scope).cws_progress_bar();
        }
    });
    elementorFrontend.hooks.addAction('frontend/element_ready/cws_tabs.default', function ($scope) {
        if ( jQuery('body').hasClass('elementor-editor-active') ) {
            cws_tabs_init();
            jQuery('.cws_ce_content.ce_tabs', $scope).cws_tabs();
        }
    });
    elementorFrontend.hooks.addAction('frontend/element_ready/cws_testimonial_carousel.default', function ($scope) {
        if ( jQuery('body').hasClass('elementor-editor-active') ) {
            cws_sc_carousel_init();
        }
    });
    elementorFrontend.hooks.addAction('frontend/element_ready/cws_tweets.default', function ($scope) {
        if ( jQuery('body').hasClass('elementor-editor-active') ) {
            twitter_carousel_init();
        }
    });
});