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

	angular.module('wistia.home', []);
})();
(function () {
	'use strict';

	angular.module('wistia.core', []);
})();
(function () {
	'use strict';

	angular.module('upload', []);
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
	  		isUploaded: false
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

		//Messages
		messages: {
			multiUploadErr: "You can't upload multiple videos at once."
		}
	};

	angular.module('wistia.core')
		.constant('COMMON', COMMON);

})();
(function () {
	'use strict';

	angular.module('wistia.core')
    .service('Util', Util);

  Util.$inject = [];
  function Util () {
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

  UploadController.$inject = ['$scope', '$element', 'COMMON'];
  function UploadController ($scope, $element, COMMON) {
  	var setMessage = function (text, cssClass) {
  		return ({
  			text: text || '',
  			cssClass: cssClass || ''
  		});
  	};

  	var vm = this,
	  	element = $element,
	  	_state;

  	vm.$onInit = function () {
  		_state = vm.state;
  	};

		element.fileupload({
			dataType: 'json',
			dropzone: angular.element(element[0].querySelector('upload__dropzone')),
			maxNumberOfFiles: 1,
			url: COMMON.api_url,
			formData: {
				api_password: COMMON.api_key
			},

			// jQuery file upload methods
			add: function(e, data) {
				if (data.originalFiles.length > 1) {
					_state.message = setMessage(COMMON.messages.multiUploadErr, 'message--danger');
					vm.onUpdate(_state);
					return;
				}
				data.submit();
			},

			processdone: function(asd, asd2) {
				console.log(asd, asd2, " OK");
			}

		});
  }
})();
