(function(){
    'use strict';

    angular.module('MenuApp')
    .controller('CategoriesViewContrller',CategoriesViewContrller);

    CategoriesViewContrller.$inject=['cats'];

    function CategoriesViewContrller(cats){
        var CatViewCtrl=this;

        CatViewCtrl.cats=cats;
    }
})();