(function(){
    'use strict';

    angular.module('MenuApp')
    .component('items',{
        templateUrl:'src/items.component.html',
        bindings:{
            menuitems:'<',
            menucategory:'<'
        },
        controller:CatComponentController

    })
    
    function CatComponentController(){
        var ctrl=this;
    }
})();