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
