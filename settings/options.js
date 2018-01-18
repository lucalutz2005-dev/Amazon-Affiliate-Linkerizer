document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('amzncode').value = localStorage['amzn_code'] || '';
	document.querySelector('form').addEventListener('submit', function () {
		localStorage['amzn_code'] = document.getElementById('amzncode').value;
	});
});
