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

  HomeController.$inject = [];
  function HomeController () {
  	var vm = this;
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
		api_key: "93773be19b08b2adfad9cfad8c4294b39be64b8d4bcda8e533f7c617f0d94236"
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
    		config: '='
    	}
    });

  UploadController.$inject = ['$element', 'COMMON'];
  function UploadController ($element, COMMON) {
  	var vm = this,
  		element = $element;

  		element.fileupload({
  			dataType: 'json',
  			dropzone: angular.element(element[0].querySelector('upload__dropzone')),
  			formData: {
  				api_password: COMMON.api_key
  			},

  			// Methods
  			add: function(e, data) {
  				console.log(e, data);
  			}

  		});
  }
})();
