define(function (require) {

    "use strict";

    var $               = require('jquery'),
        Backbone        = require('backbone'),
        RepoListView    = require('app/views/RepoListView'),
        models          = require('app/models/repos'),
        tplText         = require('text!tpl/Home.html'),
        template        = _.template(tplText);


    return Backbone.View.extend({

        initialize: function () {
            this.repoList = new models.RepoCollection();
            this.repoList.fetch({reset: true, data: {name: ''}});
            this.render();
        },

        render: function () {
            this.$el.html(template());
            this.listView = new RepoListView({collection: this.repoList, el: $(".sidebar-results", this.el)});
            return this;
        },

        events: {
            "keyup .sidebar-search"     : "search",
            "keypress .sidebar-search"  : "onkeypress",
            "click .category"           : "clickCategory",
            "click .sidebar-results li" : "clickRepo",
            "click .sidebar-button"     : "clickSideBtn"
        },
        
        clickSideBtn: function() {
            $('.sidebar').toggleClass('sidebar-toggled');
            $('.sidebar-button').toggleClass('sidebar-button-toggled');
        },
        
        clickRepo: function(e) {
            var link = ($(e.target).data('repo') !== undefined) ? 
                $(e.target).data('repo') : $(e.target).parent().data('repo');
            window.location.href = link;
        },
        
        // Function executed when filter based on category is clicked
        clickCategory: function(e) {
            if($(e.target).hasClass('category-active')) return;
            else {
                var category = $(e.target).html();
                $(e.target).parent().children().removeClass('category-active');
                $(e.target).addClass('category-active');
                this.repoList.fetch({reset: true, data: {category: category}});
            }
        },
        
        // Function to live filter when key is pressed in sidebar search
        search: function (e) {
            var key = $('.sidebar-search').val();
            this.repoList.fetch({reset: true, data: {name: key}});
        },
        
        onkeypress: function (e) {
            if (e.keyCode === 13) // enter key pressed
                e.preventDefault();
        }

    });

});
