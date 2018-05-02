"use strict";
if (isProduction(window.location.host)) {
	console.log("isProduction");
	chrome.storage.sync.get(['urls'], function (result) {
		onGot(result);
	});
}
function onError(error) {
	console.log(`Error: ${error}`);
}

function onGot(item) {
	console.log("onGot");
	if (item.urls == undefined || item.urls == null || JSON.stringify(item) === "{}") {
		setBorder("", window.location.host.substring(0, window.location.host.indexOf(".")));

	} else {
		var flg = false;

		var records = item.urls;

		records.forEach(function (element) {
			if (setBorder(element.color, element.pattern)) {
				flg = true;
			}
		});
		if (flg == false) {
			setBorder(records[0].color, window.location.host.substring(0, window.location.host.indexOf(".")));
		}
	}
	window.onresize = function () { setBorder(onGot(item)); };

}

function setBorder(color, pattern) {
	console.log("setBorder");
	if (pattern != "" &&
		(window.location.host.substring(0, window.location.host.indexOf(".")) == pattern
			|| window.location.host.substring(0, window.location.host.indexOf("--")) == pattern)) {
		var type = "classic";
		if (window.location.host.indexOf(".lightning.") > 0) {
			type = "lightning";
		}
		addBorder(type, color);
		return true;
	}
	return false;
}

function addBorder(type, color) {
	if (color === "" || color === undefined || color === null) {
		color = "red";
	}

	if (type === "lightning") {
		if (document.querySelector("#SalesforceProductionWarningLeftBar") != null) {
			console.log("remove");
			var leftBarObj = document.querySelector("#SalesforceProductionWarningLeftBar");
			leftBarObj.parentNode.removeChild(leftBarObj);
			var rightBarObj = document.querySelector("#SalesforceProductionWarningRightBar");
			rightBarObj.parentNode.removeChild(rightBarObj);
			var topBarObj = document.querySelector("#SalesforceProductionWarningTopBar");
			topBarObj.parentNode.removeChild(topBarObj);
			var buttomBarObj = document.querySelector("#SalesforceProductionWarningButtomBar");
			buttomBarObj.parentNode.removeChild(buttomBarObj);
		}
		var width = document.body.clientWidth > window.innerWidth ? window.innerWidth : document.body.clientWidth;
		width = width - 5;
		var height = window.innerHeight - 10;
		var leftbar = document.createElement("DIV");
		leftbar.id = "SalesforceProductionWarningLeftBar";
		leftbar.style = "margin:0px;padding:0px;position: fixed;z-index: 100;width: 0px;height:" + height + "px;border:2.5px solid " + color + ";top:0px;left:0px;";

		document.body.appendChild(leftbar);

		var topbar = document.createElement("DIV");
		topbar.id = "SalesforceProductionWarningTopBar";
		topbar.style = "margin:0px;padding:0px;position: fixed;z-index: 100;width:" + width + "px;height:0px;border:2.5px solid " + color + ";top:0px;left:0px;";

		document.body.appendChild(topbar);

		var rightbar = document.createElement("DIV");
		rightbar.id = "SalesforceProductionWarningRightBar";
		rightbar.style = "margin:0px;padding:0px;position: fixed;z-index: 100;width: 0px;height:" + height + "px;border:2.5px solid " + color + ";top:0px;left:" + width + "px;";
		document.body.appendChild(rightbar);

		var buttombar = document.createElement("DIV");
		buttombar.id = "SalesforceProductionWarningButtomBar";
		buttombar.style = "margin:0px;padding:0px;position: fixed;z-index: 100;width:" + width + "px;height:0px;border:2.5px solid " + color + ";top:" + height + "px;left:0px;";
		document.body.appendChild(buttombar);
	} else {
		document.body.style.border = "5px solid " + color;
	}

}
function isProduction(s) {
	console.log("isProduction");
	//var regu =/https:\/\/.*cs[0-9]{1,2}\.(my\.)*salesforce\.com/g;
	var regu = /((login|(ap|na|eu)[0-9]{1,3}|.*[^(cs)][^0-9]{1,3})\.lightning\.force\.com|(login\.|(ap|na|eu)[0-9]{1,3}\.|.*[^(cs)][^0-9]{1,3}\.my\.)(salesforce|visual\.force)\.com)/g;
	var re = new RegExp(regu);
	if (re.test(s)) {
		return true;
	} else {
		return false;
	}
}