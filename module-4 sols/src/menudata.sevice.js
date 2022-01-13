(function(){

    'use strict';

    angular.module('Data')
    .service('MenuDataService',MenuDataService);

    MenuDataService.$inject=['$http','ApiBasePath']
    function MenuDataService($http,ApiBasePath){
       
        var service=this;

        service.getAllcategories=function(){
            return $http({
                method:'GET',
                url:(ApiBasePath+'/categories.json')
            }).then(function(result){
                  var data=result.data;
                  console.log("data",data)
                  return data;
            },function(error){
                console.log("something went wrong http")
            });
        };

        service.getItemsForCategory=function(categoryShortName){
            console.log("categoryShortName",categoryShortName);
            return $http({
                method:'GET',
                url: (ApiBasePath + "/menu_items.json"),
                params:{
                    category: categoryShortName
                }
            }).then(function(result){
                console.log("result",result);
                return result;
            },function(reject){
                console.log("something went wrong with http")
                return reject
            });
        };
    }
})();