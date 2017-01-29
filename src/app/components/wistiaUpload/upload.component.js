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

  UploadController.$inject = ['$scope', '$element', 'COMMON', 'Util'];
  function UploadController ($scope, $element, COMMON, Util) {
  	var setMessage = function (text, cssClass) {
  		return ({
  			text: text || '',
  			cssClass: cssClass || ''
  		});
  	};

  	var vm = this,
	  	el = $element,
	  	_state;

  	vm.$onInit = function () {
  		_state = vm.state;
  	};

		el.fileupload({
			// jQuery file upload properties
			dataType: 'json',
			dropzone: angular.element(el[0].querySelector('upload__dropzone')),
			maxNumberOfFiles: 1,
			url: COMMON.api_url,
			formData: {
				api_password: COMMON.api_key
			},

			// jQuery file upload methods
			add: function (e, data) {
				if (data.originalFiles.length > 1) {
					_state.message = setMessage(COMMON.messages.multi_upload_err, 'message--danger');
					vm.onUpdate(_state);

					return;
				} else if (!Util.isValidType(data.files[0].type)) {
					_state.message = setMessage(COMMON.messages.MIME_err, 'message--danger');
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
				console.log(e, data);
			}

		});
  }
})();
