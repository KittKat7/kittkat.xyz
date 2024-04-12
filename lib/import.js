
function include() {
	var scriptId = document.currentScript.id;
	var xhr = new XMLHttpRequest();
	xhr.open("GET", scriptId, true);
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4 && xhr.status == 200) {
			// Insert the div before the script element with the dynamically obtained id
			var scriptElement = document.getElementById(scriptId);
			scriptElement.insertAdjacentHTML('beforebegin', xhr.responseText);
		}
	};
	xhr.send();

}