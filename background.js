var regexAmzn = new RegExp(/^(https?:\/\/)?([\da-z\.-]+)\.amazon\.([\da-z\.-]+).*$/);
var code;
var prsvTitle;
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
	//Show the link icon for only Amazon pages
	var url = tab.url;
	if (url.match(regexAmzn)) {
		chrome.pageAction.show(tabId);
	}
	chrome.storage.sync.get(theThings);
});

function theThings(doIt) {
	code = doIt.amzncode || "jimmysweetblog-20";
	prsvTitle = doIt.prsvTitle;
}


chrome.pageAction.onClicked.addListener(function (tab) {
	chrome.storage.sync.get(theThings);

	// build shortlink 
	var goodLink = 'https://' + getAMZN(tab.url, 'PREFIX') + '.amazon.' + getAMZN(tab.url, 'COUNTRY') + getAMZN(tab.url, 'TITLE') + getAMZN(tab.url, 'PRODUCT') + (code ? '?tag=' + code : '');

	copyToClipboard(goodLink);
	chrome.tabs.update({
		url: goodLink
	});
	// change page action icon
	chrome.pageAction.setIcon({
		tabId: tab.id,
		path: '/images/link_clicked.png'
	});
	// change the icon back after a delay
	setTimeout(function () {
		chrome.pageAction.setIcon({
			tabId: tab.id,
			path: '/images/icon64.png'
		})
	}, 1500);

});


// http://stackoverflow.com/questions/1764605/scrape-asin-from-amazon-url-using-javascript
// http://en.wikipedia.org/wiki/Amazon_Standard_Identification_Number
function getAMZN(url, target) {
	var regexProduct = new RegExp(/^(https?:\/\/)?([\da-z\.-]+)\.amazon\.([\da-z\.-]+)(\/.+)?\/(exec\/obidos\/tg\/detail\/-|gp\/product|o\/ASIN|dp|dp\/product|exec\/obidos\/asin)\/(\w{10}).*$/);
	var regexSearch = new RegExp(/^(https?:\/\/)?([\da-z\.-]+)\.amazon\.([\da-z\.-]+)\/s\/(ref=.*).*%3D(.+)&field-keywords=([^&]*)(?:&.*)?$/);

	p = url.match(regexProduct);
	h = url.match(regexAmzn);
	s = url.match(regexSearch);
	if (p) {
		if (target == 'PRODUCT') {
			return '/dp/' + p[6];
		} else if (target == 'TITLE') {
			if (prsvTitle && p[4] !== undefined) {
				return p[4];
			} else {
				return '';
			}
		} else if (target == 'COUNTRY') {
			return p[3];
		} else if (target == 'PREFIX') {
			return p[2];
		}
	} else if (s) {
		if (target == 'PRODUCT') {
			return "/s/?url=search-alias%3D" + s[5] + "&field-keywords=" + s[6] + "&";
		} else if (target == 'PREFIX') {
			return s[2];
		} else if (target == 'COUNTRY') {
			return s[3];
		} else {
			return '';
		}

	} else if (h) {
		if (target == 'COUNTRY') {
			return h[3];
		} else if (target == 'PREFIX') {
			return h[2];
		} else {
			return '';
		}
	}
}


function copyToClipboard(str) {
	var temp = document.getElementById('temp');
	temp.value = str;
	temp.select();
	temp.focus();
	document.execCommand('copy');
}
