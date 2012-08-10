/*
    @Routes - @AppRouter - handles and responds to changes in url hash
    #login - calls loadLogin() method which loads login form
    #register - calls loadRegister() method which loads registration form
*/
(function(Routes) {
"use strict";
    Routes.AppRouter = Backbone.Router.extend({
        routes: {
            'login': 'loadLogin',
            'register': 'loadRegister'
        },
        
        loadLogin: function () {
            $('#register-form').css('display', 'none');
            $('#login-form').css('display', 'block'); 
        },
        
        loadRegister: function () {
            $('#login-form').css('display', 'none');
            $('#register-form').css('display', 'block');
        }
    });
}(App.Routes));