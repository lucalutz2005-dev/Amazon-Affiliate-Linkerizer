// analytics

browser.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
	if (changeInfo.status === 'complete') {
		//Show the link icon for any page we currently support
		browser.pageAction.show(tabId);
	}
});

browser.pageAction.onClicked.addListener(function (tab) {
	// put shortlink on clipboard
	var code = localStorage['amzn_code'] || 'jimmysweetblog-20';
	//	//TODO: change this according to country
	copyToClipboard('https://' + getAMZN(tab.url, 'PREFIX') + '.amazon.' + getAMZN(tab.url, 'COUNTRY') + getAMZN(tab.url, 'PRODUCT') + (code ? '/?tag=' + code : ''));
	
	
	// change page action icon
	browser.pageAction.setIcon({
		tabId: tab.id,
		path: '/images/link_clicked.png'
	});
	// change the icon back after a delay
	setTimeout(function () {
		browser.pageAction.setIcon({
			tabId: tab.id,
			path: '/images/icon64.png'
		})
	}, 1500);

});

// http://stackoverflow.com/questions/1764605/scrape-asin-from-amazon-url-using-javascript
// http://en.wikipedia.org/wiki/Amazon_Standard_Identification_Number
// Country = 2
// ASIN = 7
// Affiliate = 9
function getAMZN(url, target) {
	var regexProduct = new RegExp(/^(https?:\/\/)?([\da-z\.-]+)\.amazon\.([\da-z\.-]+)\/?.*\/(exec\/obidos\/tg\/detail\/-|gp\/product|o\/ASIN|dp|dp\/product|exec\/obidos\/asin)\/(\w{10}).*$/);
	var regexHome = new RegExp(/^(https?:\/\/)?([\da-z\.-]+)\.amazon\.([\da-z\.-]+).*$/);

	p = url.match(regexProduct);
	h = url.match(regexHome);
	if (p) {
		if (target == 'PRODUCT') {
			return '/dp/' + p[5];
		} else if (target == 'COUNTRY') {
			return p[3];
		} else if (target == 'PREFIX') {
			return p[2];
		}
	} 
	else if(h) {
		if (target == 'COUNTRY') {
			return h[3];
		} else if (target == 'PREFIX') {
			return h[2];
		} else if (target == 'PRODUCT') {
			return '';
		}
	}
}


//System functions follow

function copyToClipboard(str) {
	var temp = document.getElementById('temp');
	temp.value = str;
	temp.select();
	temp.focus();
	document.execCommand('copy');
}