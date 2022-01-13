(function(){
    'use strict';

    angular.module('MenuApp')
    .component('categories',{
        templateUrl:'src/categories.component.html',
        bindings:{
            catitems:'<'
        },
        controller:CatComponentController

    })
    
    function CatComponentController(){
        var ctrl=this;
    }
})();