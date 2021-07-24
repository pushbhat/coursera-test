(function(){
	'use strict';
	angular.module('LunchCheck',[])
	.controller('LunchController',LunchController);
	LunchController.$inject=['$scope'];
	function LunchController($scope){
		$scope.Lunch="";
		$scope.msg="";
    $scope.displaymsg=function() {
    	var msg="";
			msg=getmsg($scope.Lunch);
			$scope.msg=msg;
    };

		function getmsg(str){
			var num=0;
			var dishes=str.split(',');
			num=dishes.length;
			if(num==1&&dishes[0].length==0){
				   return "Please enter data first";
				}
			if(num<=3)
			  return "Enjoy!";
			else {
				return "Too much!"
			}
		}



	}
})();
