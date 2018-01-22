function saveOptions() {
	localStorage['amzn_code'] = document.getElementById('amzncode').value;
}
document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('amzncode').value = localStorage['amzn_code'] || "";
	document.getElementById('amzncode').addEventListener("input", saveOptions);
});
