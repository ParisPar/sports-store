angular.module('sportsStoreAdmin')
  .constant('authUrl', 'https://sports-store-1912.firebaseio.com/')
  .constant('usersUrl', 'https://sports-store-1912.firebaseio.com/users')
  .constant('ordersUrl', 'https://sports-store-1912.firebaseio.com/orders')
  .controller('adminCtrl',function($scope, authUrl, $firebaseAuth, $rootScope) {

    var ref = new Firebase(authUrl);
    $scope.authObj = $firebaseAuth(ref);

    /*
    Listens for changes to the client’s authentication state. The provided callback 
    will fire when the client’s authenticate state changes. If authenticated, the 
    callback will be passed an object containing the fields uid (the unique user ID), 
    provider (string identifying the provider), auth (the authentication token payload), 
    and expires (expiration time in seconds since the Unix epoch) - and more, depending 
    upon the provider used to authenticate. Otherwise, the callback will be passed null.
     */
    $scope.authObj.$onAuth(function(authData) {
      if(authData){
        $rootScope.loggedIn = true;
        $rootScope.username = authData.password.email.replace(/@.*/, '');//password is the login provider
      } else {
        $rootScope.loggedIn = false;
      }
    })

    $scope.logout = function() {
      $scope.authObj.$unauth();
      $rootScope.loggedIn = false;
    }

  })
  .controller('authCtrl',function($scope, $firebaseAuth, $location, authUrl, usersUrl) {

    var ref = new Firebase(authUrl);
    $scope.authObj = $firebaseAuth(ref);

    $scope.authenticate = function(user, pass) {
      $scope.authObj.$authWithPassword({
        email: user,
        password: pass
      })
      .then(function(authData) {
        //console.log('Logged in with id: ', authData.uid);
        $scope.authenticationError = null;
        $location.path('/main');
      })
      .catch(function(error) {
        $scope.authenticationError = error;
        //console.error('Authentication failed: ', error);
      });
    }
  })
  .controller('mainCtrl', function($scope) {

    $scope.screens = ['Products','Orders'];
    $scope.current = $scope.screens[0];

    $scope.setScreen = function(index) {
      $scope.current = $scope.screens[index];
    }

    $scope.getScreen = function() {
      return $scope.current == 'Products' ? 'views/adminProducts.html' : 'views/adminOrders.html';
    }

  })
  .controller('ordersCtrl', function($scope, $firebaseArray, ordersUrl) {

    var ordersRef = new Firebase(ordersUrl);
    var ordersList = $firebaseArray(ordersRef);

    ordersList.$loaded().then(function() {
      $scope.orders = ordersList
    }).catch(function(error) {
      $scope.error = error;
    });

    $scope.selectedOrder;

    $scope.selectOrder = function(order) {
      $scope.selectedOrder = order;
    };

    $scope.calcTotal = function(order) {
      var total = 0;
      for(var i=0; i<order.products.length; i++)
        total += order.products[i].count * order.products[i].price;
      return total;
    }

  });
