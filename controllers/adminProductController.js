angular.module('sportsStoreAdmin')
	.constant('productsUrl', 'https://sports-store-1912.firebaseio.com/products')
	.controller('productCtrl', function($scope, productsUrl, $firebaseArray, $timeout) {

		var myProductsRef = new Firebase(productsUrl);
		var productsArray = $firebaseArray(myProductsRef);

		$scope.editedProduct = null;

		productsArray = $firebaseArray(myProductsRef);

		$scope.listProducts = function() {
			$scope.products = productsArray;
		}

		$scope.deleteProduct = function(product) {
			productsArray.$remove(product);
		}

		$scope.createProduct = function(product) {
			productsArray.$add(product);
		}

		$scope.updateProduct = function(product) {
			productsArray.$save(product);
			$scope.editedProduct = null;
		}

		$scope.startEdit = function(product) {
			$scope.editedProduct = product;
		}

		$scope.cancelEdit = function(product) {
			$scope.editedProduct = null;
		}

		$scope.listProducts();

	});