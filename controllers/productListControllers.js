angular.module('sportsStore')
	.constant("productListActiveClass", "btn-primary")
	.constant("productListPageCount", 3)
	.controller('productListCtrl', function($scope, $filter, productListActiveClass, productListPageCount) {

		//This variable is not defined on the $scope so it cannot be accessed from directives or data bindings.
		var selectedCategory = null;

		//Pagination variables
		$scope.selectedPage = 1;
		$scope.pageSize = productListPageCount;

		$scope.selectCategory = function(newCategory) {
			selectedCategory = newCategory;
			$scope.selectedPage = 1;
		}

		$scope.selectPage = function(newPage) {
			$scope.selectedPage = newPage;
		}

		$scope.categoryFilterFn = function(product) {
			return selectedCategory == null || product.category == selectedCategory;
		}

		$scope.getCategoryClass = function(category) {
			return selectedCategory == category ? productListActiveClass : '';
		}

		$scope.getPageClass = function(page) {
			return $scope.selectedPage == page ? productListActiveClass : '';
		}

	});