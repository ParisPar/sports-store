var app = angular.module('sportsStore');

app.controller('sportsStoreCtrl', function($scope, $timeout, $firebaseArray) {

  var myProductsRef = new Firebase("https://sports-store-1912.firebaseio.com/products");
  
  //Using angularFire
  $scope.data = {
    products: $firebaseArray(myProductsRef)
  };

  //Without using angularFire
  /*
  $scope.data = {};
  $scope.data.products = [];

  myProductsRef.on('value', function(snapshot) {

    //For more info on using the $timeout service:
    //http://mancdev.tumblr.com/post/104675276404/using-timeout-in-angular-to-safely-refresh
    //http://stackoverflow.com/questions/22154578/data-from-firebase-not-loading-on-route-change-but-does-on-refresh
    $timeout(function() {
      var productsObject = snapshot.val();

      for(obj in productsObject)
        $scope.data.products.push(productsObject[obj]);
    });

  }, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
  */
  


});