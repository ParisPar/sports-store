angular.module('sportsStore')
  .constant('productsUrl', 'https://sports-store-1912.firebaseio.com/products')
  .constant('ordersUrl', 'https://sports-store-1912.firebaseio.com/orders')
  .controller('sportsStoreCtrl', function($scope, $timeout, $firebaseArray, $location, productsUrl, ordersUrl, cart) {

    var myProductsRef = new Firebase(productsUrl);
    var myOrdersRef = new Firebase(ordersUrl);
    
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
 
    $scope.sendOrder = function(shippingDetails) {

      //Use deep copy to be able to manipulate the data without affecting
      //the other parts of the application
      var order = angular.copy(shippingDetails);
      order.products = cart.getProducts();

      var orders = $firebaseArray(myOrdersRef);

      orders.$add(order)

        .then(function(myOrdersRef) {
          $scope.data.orderId = myOrdersRef.key();
          $scope.data.orderError = null;
        })

        .catch(function(error){
          $scope.data.orderError = error;
          console.log("Error: ", error);
        })

        .finally(function(){
          $location.path("/complete");
        });

    }

  });