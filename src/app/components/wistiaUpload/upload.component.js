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
