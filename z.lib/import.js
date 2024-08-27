
function include(loc) {
	var scriptElement = document.currentScript;
	var scriptId = scriptElement.id;
	if (loc) scriptId = loc;

	var xhr = new XMLHttpRequest();
	xhr.open("GET", scriptId, true);
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4 && xhr.status == 200) {
			scriptElement.insertAdjacentHTML('beforebegin', xhr.responseText);
		}
	};
	xhr.send();
}

function includeMD(loc) {
	var scriptElement = document.currentScript;
	var scriptId = scriptElement.id;
	if (loc) scriptId = loc;

	var xhr = new XMLHttpRequest();
	xhr.open("GET", scriptId, true);
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4 && xhr.status == 200) {
			scriptElement.insertAdjacentHTML('beforebegin',
				xhr.responseText
					.replace(/^### (.*$)/gim, '<h3>$1</h3>') // h3 tag
					.replace(/^## (.*$)/gim, '<h2>$1</h2>') // h2 tag
					.replace(/^# (.*$)/gim, '<h1>$1</h1>') // h1 tag
					.replace(/\*\*(.*)\*\*/gim, '<b>$1</b>') // bold text
					.replace(/\*(.*)\*/gim, '<i>$1</i>') // italic text);
					.replace(/\n/gim, "<br>")
					.trim()
			)
		}
	};
	xhr.send();
}

function getAppCard() {
	var scriptElement = document.currentScript;
	var scriptId = scriptElement.id;

	var xhr = new XMLHttpRequest();
	xhr.open("GET", scriptId, true);
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4 && xhr.status == 200) {
			// Create a temporary container element
			var tempContainer = document.createElement('div');
			tempContainer.innerHTML = xhr.responseText;

			// Find the specific element you want to add
			var specificElement = tempContainer.querySelector('#card');

			if (specificElement) {
				specificElement.removeAttribute('hidden');
				specificElement.classList.add('card');
				// Insert the specific element before the script element
				scriptElement.insertAdjacentElement('beforebegin', specificElement);
			} else {
				console.error('Specific element not found in the response.');
			}
		}
	};
	xhr.send();
}

function searchSite() {

	const searchInput = document.getElementById("search-input");

	if (searchInput.value.trim() === "") {
		return false;
	}

	const endpoint = "https://duckduckgo.com/";
	const params = {
		q: searchInput.value.trim(),
		sites: "kittkat.xyz"
	};

	const queryString = Object.entries(params)
		.map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
		.join("&");

	window.location.href = `${endpoint}?${queryString}`;

	return false;
}