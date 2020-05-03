var s,
    app = {

        init: function() {
            //Global settings
            s = this.settings;

            // initalize
            this.initalizers();
            this.bindUiActions();
        },
        bindUiActions: function (){
            // Should include all JS user interactions
            var self = this;

            $('.select-posts,.select-categories').on('click', function () {
                self.homePostsCatSwitch();
            });
        },
        initalizers: function (){
            // Init menu
            this.panel();

            // Fast Click for Mobile - removes 300ms delay - https://github.com/ftlabs/fastclick
            FastClick.attach(document.body);
        },
        homePostsCatSwitch: function(){
            // Toggles between showing the categories and posts on the homepage
            $('.home-page-posts').toggleClass("hide");
            $('.home-page-categories').toggleClass("hide");
            $('.select-posts').toggleClass("active");
            $('.select-categories').toggleClass("active");
            $('.home-footer').toggleClass("hide");
        },
        panel: function(){
            $('nav.panel').show();

            $('.menu-trigger').bigSlide({
                menuWidth: "31.2em",
                easyClose: false,
                afterOpen: function() {
                    //$('.menu-trigger').hide();
                },
                afterClose: function() {
                    //$('.menu-trigger').show();
                }
            });
        }
    };

$(document).ready(function(){
    app.init();
});