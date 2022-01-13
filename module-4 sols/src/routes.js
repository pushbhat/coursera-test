(function(){

    'use strict';

    angular.module('MenuApp')
    .config(RoutesConfig);
    
    RoutesConfig.$inject=['$stateProvider','$urlRouterProvider'];

    function RoutesConfig($stateProvider,$urlRouterProvider){
        $urlRouterProvider.otherwise('/');

        $stateProvider.state('home',{
            url:'/',
            templateUrl:'src/homeview.template.html'
            // template:'<h1>home</h1>'
        })
        .state('categories',{
            url:'/categories',
            templateUrl:'src/categoriesview.template.html',
            controller:'CategoriesViewContrller as CatViewCtrl',
            resolve:{
                cats:['MenuDataService',
                    function(MenuDataService){
                     return MenuDataService.getAllcategories().
                     then(function(result){
                         console.log("result",result);
                        //  console.log("result.data",result.data);
                         return result
                     })
                     .catch(function(error){
                         console.log("Something caught");
                     })
                    }]
            }
        })
        .state('Items',{
            url:'/items/{menucat}',
            templateUrl:'src/itemsview.template.html',
            controller:'ItemsViewController as ItemsViewCtrl',
            resolve:{
                items:['MenuDataService','$stateParams',
                        function(MenuDataService,$stateParams){
                           return MenuDataService.getItemsForCategory($stateParams.menucat)
                           .then(function(result){
                               console.log("result in resolve",result);
                               return result.data
                           },
                           function(reject){
                               console.log("someting went wrong cannot resolve",reject);
                           })
                        }]
            }
        });
    }
})();