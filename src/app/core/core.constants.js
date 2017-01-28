(function () {
	'use strict';

	var COMMON = {
		api_key: "93773be19b08b2adfad9cfad8c4294b39be64b8d4bcda8e533f7c617f0d94236",
		api_url: "https://upload.wistia.com",

		//Messages
		messages: {
			multiUploadErr: "You can't upload multiple videos at once."
		}
	};

	angular.module('wistia.core')
		.constant('COMMON', COMMON);

})();