/*
    @Routes - @AppRouter - handles and responds to changes in url hash
    #login - calls loadLogin() method which loads login form
    #register - calls loadRegister() method which loads registration form
*/
(function(routes) {
"use strict";
    routes.Router = Backbone.Router.extend({
        routes: {
            'login': 'loadLogin',
            'login/:error': 'loadLogin',
            'register': 'loadRegister',
            'index': 'loadRegister',
            '': 'loadRegister'
        },
        
        loadLogin: function (error) {
            $('#register-form').fadeOut(function () {
                $('#login-form').fadeIn();
                
                if (error) {
                    $.shout('Invalid email / password combination',  10);
                }
            });
        },
        
        loadRegister: function () {
            $('#login-form').fadeOut(function () {
                $('#register-form').fadeIn();
            });
        }
    });
}(App.Routes));