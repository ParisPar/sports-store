angular.module("cart", [])

	//Register a service factory, which will be called to return the service instance.
	//This is the simplest of the three ways to register a service.
	//This function will be called only once, at the time the cart service is needed.
	.factory("cart", function() {
		var cartData = [];

		return {
			addProduct: function(id, name, price) {
				var addedToExistingItem = false;

				for(var i=0; i<cartData.length; i++){
					if(cartData[i].id == id){
						cartData[i].count++;
						addedToExistingItem = true;
						break;
					}
				}	

				if(!addedToExistingItem) {
					cartData.push({
						count: 1,
						id: id,
						price: price,
						name: name
					});
				}
			},

			removeProduct: function(id) {
				for(var i=0; i<cartData.length; i++){
					if(cartData[i].id == id){
						cartData.splice(i,1);
						break;
					}
				}
			},

			getProducts: function() {
				return cartData;
			}
		}
	})

	//Register a new directive with the compiler.
	.directive("cartSummary", function(cart) {//Declare a dependency on the cart service
		return {

			//When you create a directive, it is restricted to attribute and elements only by default. 
			//In order to modify the restriction, we need to use the restrict option.
			restrict: "E",//only matches element name (Other options are 'A', 'C' for attributes and classes)

			//Best Practice: Unless your template is very small, it's typically better to 
			//break it apart into its own HTML file and load it with the templateUrl option. 
			templateUrl: "components/cart/cartSummary.html",

			//Specifies a controller that will provide data and behaviors to the partial view
			controller: function($scope) {
				var cartData = cart.getProducts();//We can use this method because we declared the dependency

				$scope.total = function() {
					var total = 0;

					for(var i=0; i<cartData.length; i++)
						total += cartData[i].count * cartData[i].price;

					return total;
				};

				$scope.itemCount = function() {
					var total = 0;

					for(var i=0; i<cartData.length; i++)
						total += cartData[i].count;

					return total;
				}
			}
		};
	});