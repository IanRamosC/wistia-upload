(function () {
	'use strict';

	var COMMON = {
		api_key: "93773be19b08b2adfad9cfad8c4294b39be64b8d4bcda8e533f7c617f0d94236",
		api_url: "https://upload.wistia.com",

		//Messages
		messages: {
			multi_upload_err: "You can't upload multiple videos at once.",
			MIME_err: "Invalid file format."
		},

		//List of all valid MIME types
		validMIME: [
			'video/quicktime',
			'video/mpeg',
			'application/x-troff-msvideo',
			'video/avi',
			'video/msvideo',
			'video/x-msvideo',
			'video/x-flv',
			'video/x-f4v',
			'video/mp4',
			'video/x-m4v',
			'video/x-ms-asf',
			'video/x-ms-wmv',
			'video/dvd',
			'video/3gpp',
			'video/x-matroska',
			'video/divx',
			'video/x-xvid',
			'video/webm'
		]
	};

	angular.module('wistia.core')
		.constant('COMMON', COMMON);

})();