/* Used promises in this module since JQuery AJAX also returns a promise. 
In future, we can easily plug RESTful services provided they have the same API as this module
*/
define(function (require) {
    
    "use strict";

    var $           = require('jquery'),
        Backbone    = require('backbone'),
        
        // Function to find the repository by ID
        findRepoById = function (id) {
            var deferred = $.Deferred(),
                repo = null,
                l = repos.length;
            for (var i = 0; i < l; i++) {
                if (repos[i].id === id) {
                    repo = repos[i];
                    break;
                }
            }
            deferred.resolve(repo);
            return deferred.promise();
        },
        
        // Function to find the repository by Name
        findRepoByName = function (searchKey) {
            var deferred = $.Deferred(),
                results = repos.filter(function (element) {
                    return element.name.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
                });
            deferred.resolve(results);
            return deferred.promise();
        },
        
        // Find repositories by Category
        findRepoByCategory = function (category) {
            var deferred = $.Deferred(),
                results;
            if(category.toLowerCase() === 'all') {
                results = repos;
            } else {
                results = repos.filter(function (element) {
                    return element.category.indexOf(category.toLowerCase()) > -1;
                });
            }
                    
            deferred.resolve(results);
            return deferred.promise();
        },
        
        // In memory repositories
        repos = [
            {   id: 1,
                name: "CSS Animation",
                category: ["public","forks"]
            },
            {   id: 2,
                name: "JSON Parser",
                category: ["private","sources"]
            },
            {   id: 3,
                name: "Charting Library",
                category: ["public","sources"]
            },
            {   id: 4,
                name: "Matrix Operations",
                category: ["public","forks"]
            },
            {   id: 5,
                name: "JQuery",
                category: ["public","forks"]
            },
            {   id: 6,
                name: "HighCharts",
                category: ["private","sources"]
            },
            {   id: 7,
                name: "Polymer UI library",
                category: ["private","forks"]
            }
        ],
        
        Repo = Backbone.Model.extend({

            sync: function (method, model, options) {
                if (method === "read") {
                    findRepoById(parseInt(this.id)).done(function (data) {
                        options.success(data);
                    });
                }
            }

        }),

        RepoCollection = Backbone.Collection.extend({

            model: Repo,

            sync: function (method, model, options) {
                if (method === "read" && options.data.name !== undefined) {
                    findRepoByName(options.data.name).done(function (data) {
                        options.success(data);
                    });
                }
                else if(method === "read" && options.data.category !== undefined) {
                    findRepoByCategory(options.data.category).done(function (data) {
                        options.success(data);
                    });
                }
            }

        });

    return {
        Repo: Repo,
        RepoCollection: RepoCollection
    };

});
