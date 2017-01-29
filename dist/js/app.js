(function() {
	'use strict';

	angular.module('wistia',
		[
			'wistia.core',
			'wistia.home',
			'upload'
		]
	);
})();

(function () {
	'use strict';

	angular.module('wistia.core', []);
})();
(function () {
	'use strict';

	angular.module('wistia.home', []);
})();
(function () {
	'use strict';

	angular.module('upload', []);
})();
(function () {
	'use strict';
	/**
	 * @ngdoc config
	 * @name wistia.core.config:appConfig
	 * @description
	 *   App's core configuration
	 */

	angular.module('wistia.core')
		.config(appConfig);

	appConfig.$inject = [];
	function appConfig () {
  }
})();

(function () {
	'use strict';

	var COMMON = {
		api_key: "93773be19b08b2adfad9cfad8c4294b39be64b8d4bcda8e533f7c617f0d94236",
		api_url: "https://upload.wistia.com",
		embed_url: "https://fast.wistia.net/embed/iframe/",

		//Messages
		messages: {
			multi_upload_err: "You can't upload multiple videos at once.",
			common_err: "An error has occurred. Try again later.",
			partial_upload_success: " was successfully uploaded.",
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
(function () {
	'use strict';

	/**
	 * @ngdoc service
	 * @name wistia.core.service:Util
	 * @description
	 *   Service to handle utilities used in the whole app
	 */

	angular.module('wistia.core')
    .service('Util', Util);

  Util.$inject = ['COMMON'];
  function Util (COMMON) {
  	/**
  	 * @ngdoc method
  	 * @name isValidType
  	 * @methodOf wistia.core.service:Util
  	 * @description
  	 * This method will return if a MIME type is valid for upload
  	 *
  	 * @param {String} type The MIME type to be checked
  	 *
  	 * @returns {Boolean} If is a valid MIME type
  	 */
  	this.isValidType = function (type) {
  		return COMMON.validMIME.indexOf(type) > -1;
  	}
  }
})();

(function () {
	'use strict';

	/**
	 * @ngdoc controller
	 * @name wistia.core.controller:HomeController
	 * @description
	 *   Controller used in Homepage
	 */

	angular.module('wistia.home')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$scope'];
  function HomeController ($scope) {
  	var vm = this;
  	vm.state = {
  		message: {
  			text: '',
  			cssClass: ''
  		},
  		video: {
	  		isUploading: false,
	  		isUploaded: false,
	  		value: 0,
	  		url: '',
	  		height: 0,
	  		width: 0
	  	}
  	};

  	vm.setState = function (state) {
  		vm.state = state;
  		$scope.$apply();
  	};
  }
})();

(function () {
	'use strict';

	/**
	 * @ngdoc component
	 * @name upload.component:wistiaUpload
	 * @description
	 *   Controller used in Homepage
	 */

	angular.module('upload')
    .component('wistiaUpload', {
    	templateUrl: 'src/app/templates/components/wistiaUpload.tpl.html',
    	controller: UploadController,
    	controllerAs: "wistia",
    	bindings: {
    		state: '=',
    		onUpdate: '&'
    	}
    });

  UploadController.$inject = ['$scope', '$sce', '$element', 'COMMON', 'Util'];
  function UploadController ($scope, $sce, $element, COMMON, Util) {
  	var setMessage = function (text, cssClass) {
  		return ({
  			text: text || '',
  			cssClass: cssClass || ''
  		});
  	};

  	var vm = this,
	  	el = angular.element($element[0].querySelector('#fileupload')),
	  	_state;

  	var _options = {
			// jQuery file upload properties
			dataType: 'json',
			dropzone: angular.element($element[0].querySelector('.upload__dropzone')),
			maxNumberOfFiles: 1,
			url: COMMON.api_url,
			formData: {
				api_password: COMMON.api_key
			},

			// jQuery file upload methods
			add: function (e, data) {
				if (!Util.isValidType(data.files[0].type)) {
					_state.message = setMessage(COMMON.messages.MIME_err, 'message--danger');
					vm.onUpdate(_state);

					return;
				} else if (data.originalFiles.length > 1) {
					_state.message = setMessage(COMMON.messages.multi_upload_err, 'message--danger');
					vm.onUpdate(_state);

					return;
				}
				_state.video.isUploading = true;
				_state.message = setMessage();
				vm.onUpdate(_state);

				data.submit();
			},
			progressall: function (e, data) {
        _state.video.value = parseInt(data.loaded / data.total * 100, 10);
				vm.onUpdate(_state);
			},
			done: function (e, data) {
				if(!!data.result && !!data.result.hashed_id) {
					_state.video.isUploading = false;
					_state.video.isUploaded = true;
					_state.video.url = $sce.trustAsResourceUrl(COMMON.embed_url  + data.result.hashed_id);
					_state.video.width = data.result.thumbnail.width;
					_state.video.height = data.result.thumbnail.height;
					_state.message = setMessage(data.result.name + COMMON.messages.partial_upload_success, 'message--success');
					vm.onUpdate(_state);
				}
			},
			fail: function (e, data) {
					_state.video.isUploading = false;
					_state.video.isUploaded = false;
					_state.message = setMessage(COMMON.messages.common_err, 'message--danger');
					vm.onUpdate(_state);
			}

		};

  	vm.$onInit = function () {
  		_state = vm.state;
			el.fileupload(_options);
  	};


  }
})();
