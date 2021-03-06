define(function (require) {

    "use strict";

    var $           = require('jquery'),
        Backbone    = require('backbone'),
        tplText     = require('text!tpl/Repo.html'),
        template    = _.template(tplText);

    return Backbone.View.extend({

        initialize: function () {
            this.render();
        },

        render: function () {
            this.$el.html(template({repo:this.model.toJSON()}));
            return this;
        },

    });

});
