define(function (require) {

    "use strict";

    var $           = require('jquery'),
        Backbone    = require('backbone'),
        tplText     = require('text!tpl/RepoList.html'),
        template    = _.template(tplText);


    return Backbone.View.extend({

        initialize: function () {
            this.render();
            this.collection.on("reset", this.render, this);
        },

        render: function () {
            this.$el.html(template({repos:this.collection.toJSON()}));
            return this;
        }

    });

});
