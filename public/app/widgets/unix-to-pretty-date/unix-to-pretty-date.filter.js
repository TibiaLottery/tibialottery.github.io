;(function() {
	'use strict';

	angular
		.module('tibialotteryApp')
		.filter('unixToPrettyDate', unixToPrettyDate);

	function unixToPrettyDate() {
		return unixToPrettyDateFilter;

		function unixToPrettyDateFilter(unixTimeStamp){
			var unixTimeStamp = parseInt(unixTimeStamp, 10) * 1000;
			var date = new Date(unixTimeStamp);

			return moment(date).format("MMMM Do YYYY");
		}
	}
})();