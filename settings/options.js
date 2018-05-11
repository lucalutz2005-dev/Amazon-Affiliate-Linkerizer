//function saveOptions() {
//	localStorage['amzn_code'] = document.getElementById('amzncode').value;
//}
//document.addEventListener('DOMContentLoaded', function () {
//	document.getElementById('amzncode').value = localStorage['amzn_code'] || "";
//	document.getElementById('amzncode').addEventListener("input", saveOptions);
//});
function saveOptions() {

	chrome.storage.sync.set({
		amzncode: document.querySelector("#amzncode").value
	});
}

function restoreOptions() {

	function setCurrentChoice(result) {
		document.querySelector("#amzncode").value = result.amzncode;
	}

	function onError(error) {
		console.log(`Error: ${error}`);
	}

	chrome.storage.sync.get(setCurrentChoice);

}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
document.getElementById('amzncode').addEventListener("input", saveOptions);


//function saveOptions() {
//	var options = {
//		amzncode: document.querySelector("#amzncode").value
//	}
//
//	chrome.storage.sync.set(options);
//	//	browser.storage.local.set(options);
//}
//
//function restoreOptions() {
//
//	function setCurrentChoice(result) {
//		document.querySelector("#amzncode").value = result.amzncode || "hi";
//	}
//
//	function onError(error) {
//		console.log(`Error: ${error}`);
//	}
//
//	chrome.storage.sync.get(setCurrentChoice);
//	//	browser.storage.local.get(setCurrentChoice);
//
//}
//
//
//
//document.addEventListener("DOMContentLoaded", restoreOptions);
//document.querySelector("form").addEventListener("submit", saveOptions);
