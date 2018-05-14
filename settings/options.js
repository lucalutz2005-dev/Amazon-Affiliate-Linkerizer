function saveOptions() {

	chrome.storage.sync.set({
		amzncode: document.querySelector("#amzncode").value || "jimmysweetblog-20"
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
document.getElementById('amzncode').addEventListener("input", saveOptions);
