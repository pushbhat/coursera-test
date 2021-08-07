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
      console.log(down.searchTerm);
      if( down.searchTerm===" "||  down.searchTerm.length==0){
        down.result=true;
      }
      else{
      var promise=MenuSearchService.getMatchedMenuItems(down.searchTerm);
      console.log("promise",promise);
      promise.then(function(response){
      //  console.log("inside then");
        down.found=response;
        console.log("down",down.found);
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
      //var found =response.data
    //  console.log("response in service",response);
      items=response.data.menu_items;
      //console.log("Items",items);
      for(let i=0;i<items.length;i++){
        if(items[i].description.indexOf(searchTerm)!=-1){
          found.push(items[i]);
        }
      }
    console.log("found",found);
      return found;
    });
  //  console.log("response.data",response);  //console.log("found outside",found); //  return found;//var found=[];  //  for()
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
