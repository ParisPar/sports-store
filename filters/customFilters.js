angular.module('customFilters', [])

	//Creates a filter used to return the name of 'properyName' in the data[i] object. Removes any duplicates
	.filter('unique', function() {
		return function (data, propertyName) {
			if(angular.isArray(data) && angular.isString(propertyName)){
				var results = [];
				var keys = {};
				for(var i=0; i<data.length; i++) {
					var val = data[i][propertyName];
					if(angular.isUndefined(keys[val])) {
						keys[val] = true;
						results.push(val);
					}
				}
				return results;
			} else {
				return data;
			}
		}
	})

	//Returns a range of elements from an array, corresponding to a page of products
	//We declare a dependancy on the $filter service, which we'll use later.
	.filter('range', function($filter) {
		return function (data, curPage, pageSize) {
			if(angular.isArray(data) && angular.isNumber(curPage) && angular.isNumber(pageSize)){
				var startIndex = (curPage-1) * pageSize;

				//We make use of the built-in filter 'limitTo'
				//The limitTo filter will return fewer items if we exceed the array length
				return data.length < startIndex ? [] : $filter('limitTo')(data.splice(startIndex), pageSize);
			} else {
				return data;
			}
		}
	})

	.filter('pageCount', function() {
		return function (data, pageSize) {
			if(angular.isArray(data)) {
				var result = [];
				for(var i=0; i<Math.ceil(data.length/pageSize); i++)
					result.push(i);
				return result;
			} else {
				return data;
			}
		}
	});