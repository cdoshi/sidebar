define(function (require) {

    "use strict";

    var $ = require('jquery'),
        Backbone = require('backbone'),
        HomeView = require('app/views/HomeView'),
        homeView = new HomeView();

    return Backbone.Router.extend({

        routes: {
            "": "home",
            "repos/:id": "repoDetails"
        },

        home: function () {
            homeView.delegateEvents();
            $('body').html(homeView.$el);
        },

        repoDetails: function (id) {
            require(["app/models/repos", "app/views/RepoView"], function (models, RepoView) {
                var repo = new models.Repo({id: id});
                repo.fetch({
                    success: function (data) {
                        $('body').html(new RepoView({model: data}).$el);
                    }
                });
            });
        }

    });

});
