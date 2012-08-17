/*
    @Views - Form view with url hash history enabled
      @Register View - $default loads registration for
      @Login View - loads login form
*/
(function(Views, Models) {
"use strict";
    Views.Settings = Backbone.View.extend({
    
        el: $('#settings'),
        
        
        errors: 0,
        
        
        events: {
            'submit #settings-form': 'updateUser',
            
            'blur #name': 'validateName',
            
            'blur #email': 'validateSettingsEmail'
        },
        
        
        initialize: function () {
            _.bindAll(this, 'updateUser', 'getFormObject', 'validateName', 'validateSettingsEmail', 'shout');
        },
        
        
        /*
            @Details - Event handler for registartion form submition
            @Event - submit
        */
        updateUser: function (e) {    
            e.preventDefault();
            
            var user, data, $this = this;
            
            if ($this.errors > 0) {
                $this.shout('Please correct all fields marked with a red border', 10);
                return;
            }
                
            data = $this.getFormObject('settings-form');  

            user = new Models.User();
            user.setUrl('settings');
            user.save(data, 
            {
                success: function (model, res) {
                    $('#email').attr('value', model.get('email'));
                    $('#email').val(model.get('email'));
                    $('#name').attr('value', model.get('name'));
                    $('#name').val(model.get('name'));
                    
                    $this.shout('Account settings saved!');
                },
                error: function () {
                    $this.shout('Error, account settings not saved!');
                }                
            });
        },
        
        
        
        /*
            @Details - Creates a key-value object from a form.
            @Params -  Array @fields : ids of associative fields
        */
        getFormObject: function (id) {
            var formObj = {}, arr = $('#' + id).serializeArray();

            $.each(arr, function (i, fieldObj) {
                if (fieldObj.name !== 'submit') {
                    formObj[fieldObj.name] = fieldObj.value;
                }
            });
            
            return formObj;
        },
        
        

        /*
            @Details - Validates email field
            @Event -  blur
        */
        validateEmail: function (email) {
            var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
            
            return pattern.test(email);
        },
        
        
        /*
            @Details - Validates password field
            @Event -  blur
        */
        validateName: function () {    
            var nameField = $('#name'),
                nameValue = nameField.val();
            
            if ((!nameValue || nameValue.length < 3) && !nameField.hasClass('warning')) {
            
                this.errors += 1;
                nameField.addClass('warning');  
                
            } else if (nameValue && nameValue.length >= 3 && nameField.hasClass('warning')) {
            
                this.errors -= 1;
                nameField.removeClass('warning');
                
            }
        },
        
        
        
        validateSettingsEmail: function () {    
            var emailField = $('#email'),
                emailValue = emailField.val();
            
            if (!this.validateEmail(emailValue) && !emailField.hasClass('warning')) {
            
                this.errors += 1;
                emailField.addClass('warning');
                
            } else if (this.validateEmail(emailValue) && emailField.hasClass('warning')) {
            
                this.errors -= 1;
                emailField.removeClass('warning');
                
            }
        },
        
        
        
        /*
            @Details - Displays notifications to the user
            @Params -  String msg - text to be displayed
                       Number x - seconds before msg is cleared, default max
        */
        shout: function (msg, x) {
            if ($("#appMessage")) {
                $("#appMessage").fadeOut(function () {
                    $("#appMessage").remove();
                });
            }
            
            var elem = $('<div>', {'id': 'appMessage', html: msg});
            
            elem.click(function () {
                $(this).fadeOut(function () {
                    $(this).remove();
                });
            });
            
            if (x) {
                setTimeout(function () {
                    elem.click();
                }, x * 1000);
            }
            
            elem.hide().appendTo('body').slideDown();
        }            
    });
}(App.Views, App.Models));