;(function() {
	'use strict';

	angular
		.module('tibialotteryApp')
		.filter('boolToCheckOrX', boolToCheckOrX);

	boolToCheckOrX.$inject = ['$sce'];

	function boolToCheckOrX($sce) {
		return boolToCheckOrXFilter;

		function boolToCheckOrXFilter(bool){
			if(bool){
				return $sce.trustAsHtml('<i class="fa fa-check md-valid-text"></i>');
			}else{
				return $sce.trustAsHtml('<i class="fa fa-times md-warn-text"></i>');
			}
		}
	}
})();