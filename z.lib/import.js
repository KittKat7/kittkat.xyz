
function include() {
	var scriptElement = document.currentScript;
	var scriptId = scriptElement.id;

	var xhr = new XMLHttpRequest();
	xhr.open("GET", scriptId, true);
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4 && xhr.status == 200) {
			scriptElement.insertAdjacentHTML('beforebegin', xhr.responseText);
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
				specificElement.classList.add('showcase-card');
				specificElement.classList.add('shadowBox');
				// Insert the specific element before the script element
				scriptElement.insertAdjacentElement('beforebegin', specificElement);
			} else {
				console.error('Specific element not found in the response.');
			}
		}
	};
	xhr.send();
}