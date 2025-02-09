var thisPort = 8974;
var thisDoGeneric = false;
var thisUseGenericList = false;
var thisWhitelistOrBlacklist = 'whitelist';
var thisGenericList = ["streamable.com", "www.adultswim.com"];

// Saves options to chrome.storage
function saveOptions()
{
	thisDoGeneric = document.getElementById('generic').checked;
	thisUseGenericList = document.getElementById('useGenericList').checked;
	thisWhitelistOrBlacklist = document.getElementById('listType').value;
	thisGenericList = document.getElementById('genericList').value.split("\n");
	thisPort = Number(document.getElementById('Port').value);
	chrome.storage.sync.set(
	{
		"connectionPort": thisPort,
		"doGeneric": thisDoGeneric,
		"useGenericList": thisUseGenericList,
		"whitelistOrBlacklist": thisWhitelistOrBlacklist,
		"genericList": thisGenericList
	}
);
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restoreOptions()
{
	// Use default value color = 'red' and likesColor = true.
	chrome.storage.sync.get(
	{
		"connectionPort": 0,
		"doGeneric": false,
		"useGenericList": false,
		"whitelistOrBlacklist": 'whitelist',
		"genericList": ["streamable.com", "www.adultswim.com"]
	}, function(items)
	{
		document.getElementById('generic').checked = items.doGeneric;
		document.getElementById('useGenericList').checked = items.useGenericList;
		document.getElementById('listType').value = items.whitelistOrBlacklist;
		document.getElementById('genericList').value = items.genericList.join("\n");
		document.getElementById('Port').value = items.connectionPort;

		thisPort = Number(document.getElementById('Port').value);
		thisDoGeneric = document.getElementById('generic').checked;
		thisUseGenericList = document.getElementById('useGenericList').checked;
		thisWhitelistOrBlacklist = document.getElementById('listType').value;
		thisGenericList = document.getElementById('genericList').value.split("\n");
	}
);
}

function checkSaveOptions()
{
	var isChanged = thisDoGeneric != document.getElementById('generic').checked;
	isChanged = isChanged || thisUseGenericList != document.getElementById('useGenericList').checked;
	isChanged = isChanged || thisWhitelistOrBlacklist != document.getElementById('listType').value;
	isChanged = isChanged || thisPort != document.getElementById('Port').value;
	isChanged = isChanged || thisGenericList.toString() != document.getElementById('genericList').value.split("\n").toString();
	if (isChanged)
	{
		saveOptions();
	}
}

document.addEventListener('DOMContentLoaded', restoreOptions);
window.onbeforeunload = function(e)
{
	saveOptions();
};

window.onload = function(e) {
	chrome.storage.sync.get(
		{
			"connectionPort": 0,
			"doGeneric": false,
			"useGenericList": false,
			"whitelistOrBlacklist": 'whitelist',
			"genericList": ["streamable.com", "www.adultswim.com"]
		}, function(items)
		{
			document.getElementById('generic').checked = items.doGeneric;
			document.getElementById('useGenericList').checked = items.useGenericList;
			document.getElementById('listType').value = items.whitelistOrBlacklist;
			document.getElementById('genericList').value = items.genericList.join("\n");
			document.getElementById('Port').value = items.connectionPort;
	
			thisPort = Number(document.getElementById('Port').value);
			thisDoGeneric = document.getElementById('generic').checked;
			thisUseGenericList = document.getElementById('useGenericList').checked;
			thisWhitelistOrBlacklist = document.getElementById('listType').value;
			thisGenericList = document.getElementById('genericList').value.split("\n");
		}
	);
};

//Check if changed before saving so rate limit should not be hit
setInterval(checkSaveOptions, 500);
