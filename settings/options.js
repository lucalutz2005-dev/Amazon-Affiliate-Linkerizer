function saveOptions() {

	chrome.storage.sync.set({
		amzncode: document.querySelector("#amzncode").value || "jimmysweetblog-20",
		prsvTitle: document.querySelector("#prsvtitle").checked
	});
}

function restoreOptions() {

	function setCurrentChoice(result) {
		document.querySelector("#amzncode").value = result.amzncode || "jimmysweetblog-20";
		document.querySelector("#prsvtitle").checked = result.prsvTitle;
	}

	function onError(error) {
		console.log(`Error: ${error}`);
	}

	chrome.storage.sync.get(setCurrentChoice);

}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.getElementById('amzncode').addEventListener("input", saveOptions);
document.getElementById('prsvtitle').addEventListener("change", saveOptions);
document.getElementsByTagName('form').addEventListener("mouseover", saveOptions);
