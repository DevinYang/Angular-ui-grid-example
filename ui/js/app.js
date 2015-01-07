/**
 * AngularJS module to process a form.
 */
angular.module('myApp', ['ngRoute', 'ngTouch', 'mm.foundation','ui.grid', 'ui.grid.selection', 'ui.grid.pinning', 'ui.grid.infiniteScroll'])
.controller('Grid1Controller', function ($scope, $http, uiGridConstants) {
	$scope.oneGrid = {
			enableSorting: true,
			enableFiltering: true,
			onRegisterApi: function( gridApi ) {
				$scope.oneGridApi = gridApi;
			},
			/*
			 * if there are more columns on the json, but if "columnDefs" is present - only fields defined are shown
			 */
			columnDefs: [
			             {
			            	 field: 'firstName',
			            	 enableColumnMenu: false, /* To remove the column menu */
			            	 sort: { /* on load default sorting with column priority uiGridConstants.ASC, uiGridConstants.DESC */
			            		 direction: uiGridConstants.ASC,
			            		 priority: 1
			            	 }
			             },
			             {
			            	 field: 'lastName',
			            	 enableHiding: false, suppressRemoveSort: false, /* To just remove specific options from the column menu & from the grid menu */
			            	 sort: {
			            		 direction: uiGridConstants.ASC,
			            		 priority: 0
			            	 },
			            	 filter: {
			            		 condition: uiGridConstants.filter.ENDS_WITH,
			            		 placeholder: 'ends with'
			            	 }
			             },
			             {
			            	 field: 'employed',
			            	 enableFiltering: false,
			            	 sort: {
			            		 direction: uiGridConstants.ASC,
			            		 priority: 0,
			            	 },

			            	 sortingAlgorithm: function(a, b) { /* customer sort algorithm */
			            		 var nulls = $scope.oneGridApi.core.sortHandleNulls(a, b);
			            		 if( nulls !== null ) {
			            			 return nulls;
			            		 }
			            	 }
			             },
			             { field: 'company', enableSorting: true  },
			             { field: 'age', filters: [
			                                       {
			                                    	   condition: uiGridConstants.filter.GREATER_THAN,
			                                    	   placeholder: 'greater than'
			                                       },
			                                       {
			                                    	   condition: uiGridConstants.filter.LESS_THAN, //LESS_THAN_OR_EQUAL
			                                    	   placeholder: 'less than'
			                                       }
			                                       ]}
			             ]
	};

	$http.get('data/dataGrid.json')
	.success(function(data) {
		$scope.oneGrid.data = data;
	});
})
.controller('Grid2Controller', function ($scope, $http) {
	$scope.twoGrid = {

			columnDefs: [
			             {
			            	 field: 'firstName',
			            	 enableHiding: false, /* To just remove specific options from the column menu & from the grid menu */
			            	 pinnedLeft:true, enablePinning: false /* to un/freeze column - needs  'ui.grid.pinning' */
			             },
			             { field: 'lastName' },
			             { field: 'employed' },
			             { field: 'company' },
			             { field: 'age' }
			             ],

			             enableGridMenu: true,

			             infiniteScrollPercentage: 15 /* Lazy data load - need 'ui.grid.infiniteScroll'*/
	};

	/* Lazy data load ~~ START */
	var page = 1; // record start index
	var getData = function(data, page) {
		var res = [];
		var dataSetCount = 50; // count of dataset to be fetched
		for (var i = 0; i < page * dataSetCount && i < data.length; ++i) {
			res.push(data[i]);
		}
		return res;
	};

	$http.get('data/dataGrid.json')
	.success(function(data) {
		// initial data set
		$scope.twoGrid.data = getData(data, page);
		++page;
	});

	$scope.twoGrid.onRegisterApi = function(gridApi){
		gridApi.infiniteScroll.on.needLoadMoreData($scope, function(){
			$http.get('data/dataGrid.json')
			.success(function(data) {
				// subsequent data fetch
				$scope.twoGrid.data = getData(data, page);
				++page;
				gridApi.infiniteScroll.dataLoaded();
			})
			.error(function() {
				gridApi.infiniteScroll.dataLoaded();
			});
		});
	};
	/* Lazy data load ~~ END */
});
