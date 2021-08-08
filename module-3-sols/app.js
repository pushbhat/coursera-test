(function(){
  'use strict';

  angular.module('NarrowItDownApp',[])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService',MenuSearchService)
  .constant('apiBasePath'," https://davids-restaurant.herokuapp.com/menu_items.json")
  .directive('foundItems',FoundItemsDirective);

  NarrowItDownController.$inject=['MenuSearchService'];
  function NarrowItDownController(MenuSearchService){
    var down=this;
    down.searchTerm="";
    down.result=false;
    down.getresult=function(){
      down.result=false;
      console.log(down.searchTerm);
      if( down.searchTerm===" "||  down.searchTerm.length==0){
        down.result=true;
        down.found=[];
      }
      else{
       down.found=[]; 
      var promise=MenuSearchService.getMatchedMenuItems(down.searchTerm);
      console.log("promise",promise);
      promise.then(function(response){
        down.found=response;
        console.log("down.found in ctrl",down.found);
      })
      .catch(function(error){
        console.log("something went wrong");
      });
    }
    }
    down.removeItem=function(index){
       MenuSearchService.removeItem(index);
    }
    down.myresult=function(){
      return down.result;
    }
  }
  MenuSearchService.$inject=['$http','apiBasePath']
  function MenuSearchService($http, apiBasePath){
  var service=this;
  var found=[];
  var items=[];

  service.getMatchedMenuItems=function(searchTerm){
    return $http({
      method:"GET",
      url:apiBasePath,
    }).then(function(response){
      items=response.data.menu_items;
      found=[];
      for(let i=0;i<items.length;i++){
        if(items[i].description.indexOf(searchTerm)!=-1){
          found.push(items[i]);
        }
      }
    console.log("found in service ",found);
      return found;
    });
  };
  service.removeItem=function(index){
     found.splice(index,1);
  };
  }

  function FoundItemsDirective(){
    var ddo={
      templateUrl:'foundItems.html',
      scope:{
        items:'<',
        onRemove: '&',
        onCheck:'&',
      },
        controller:FoundController,
      controllerAs: 'foundlist',
      bindToController:true
    };
    return ddo;
  }
  function FoundController(){
    var foundlist =this;
  }
})();
