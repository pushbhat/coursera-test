(function(){
    'use strict';

    angular.module('MenuApp')
    .controller('ItemsViewController',ItemsViewController);

    ItemsViewController.$inject=['items'];

    function ItemsViewController(items){
        var ItemsViewCtrl=this;

        ItemsViewCtrl.items=items.menu_items;
        ItemsViewCtrl.itemcat=items.category.name;
        console.log(" injected items category",ItemsViewCtrl.itemcat)
        console.log("ItemsViewCtrl.items",ItemsViewCtrl.items)
    }
})();