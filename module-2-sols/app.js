(function(){
	'use strict';

     angular.module('ShoppingListCheckOff',[])
     .controller('ToBuyController',ToBuyController)
     .controller('AlreadyBoughtController',AlreadyBoughtController)
		 .service('ShoppingListCheckOffService',ShoppingListCheckOffService);

		 ToBuyController.$inject=['ShoppingListCheckOffService'];
		 function ToBuyController(ShoppingListCheckOffService){
			 var tobuy =this;
			 tobuy.items=ShoppingListCheckOffService.buyitems();

       tobuy.getlength=function(){
         return !(ShoppingListCheckOffService.buylength());
       }

       tobuy.checkoff=function(itemIndex){
				 ShoppingListCheckOffService.checkoffItem(itemIndex);
			 }

		 }

		 AlreadyBoughtController.$inject=['ShoppingListCheckOffService'];
		 function AlreadyBoughtController(ShoppingListCheckOffService){
			 var bought =this;

			 bought.items=ShoppingListCheckOffService.boughtitems();

       bought.getlength=function(){
        return !(ShoppingListCheckOffService.boughtlength());
      }
		 }



		 function ShoppingListCheckOffService() {
			 var service=this;
			 var items=[{name:"i1",quantity:"10"},{name:"i2",quantity:"20"}];
			 var buylist=[
				 {name:"cookies",quantity:"10"},
				 {name:"milk",quantity:"10"},
				 {name:"chips",quantity:"10"},
				 {name:"coke",quantity:"10"},
				 {name:"coffee",quantity:"10"}
			 ];

			  var boughtlist=[];

				service.checkoffItem=function(itemIndex){
					var item=buylist.splice(itemIndex,1);
          var newitem={name:item[0].name,quantity:item[0].quantity};
					boughtlist.push(newitem);
		 };

		 service.buyitems=function(){
			 return buylist;
		 };

    service.buylength=function(){
      return  buylist.length;
    };

    service.boughtlength=function(){
      return  boughtlist.length;
    };

		 service.boughtitems=function(){
			 return boughtlist;
		 };

	 }


})();
