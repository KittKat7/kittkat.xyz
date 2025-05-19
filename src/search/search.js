var index = null;

async function fetchIndex() {
	if (index != null) return;
	const response = await fetch('/search/index.json');
	const json = await response.json();
	console.log("index loaded");
	return new Map(Object.entries(json)); // Return the fetched data
}

async function displayResult(result) {
	var resultsDiv = document.getElementById("results");
	var node = document.createElement("div");
	if (result == null) {
		node.appendChild(document.createTextNode("NO RESULTS"));
	}
	else {
		var h = document.createElement("h3");
		var link = document.createElement("a");
		h.appendChild(link);
		// link.classList.add("btn");
		link.textContent = `${result["title"]} (${result["link"]})`;
		link.href = result["link"];
		node.appendChild(h);
		node.appendChild(document.createTextNode(result["desc"]));
	}
	resultsDiv.appendChild(node);
	resultsDiv.appendChild(document.createElement("br"));
}

async function searchIndex(search) {
	index = await fetchIndex();

	var h3 = document.getElementById("searchTerm").value = search;

	search = search.toLowerCase().trim();

	if (search == "") {
		displayResult(null);
		return null;
	}

	var resultList = [];

	console.log(search);
	for (let [key, value] of index) {
		console.log(key);
		// title search
		if (value["title"].toLowerCase().includes(search)) {
			resultList.push({
				"link": key,
				"title": value["title"],
				"desc": value["desc"],
			});
		}
		// search description
		else if (value["desc"].toLowerCase().includes(search)) {
			resultList.push({
				"link": key,
				"title": value["title"],
				"desc": value["desc"],
			});
		}
		// search tags
		else {
			for (var i = 0; i < value["tags"].length; i++) {
				if (value["tags"][i].toLowerCase().includes(search)) {
					resultList.push({
						"link": key,
						"title": value["title"],
						"desc": value["desc"],
					});
					break;
				}
			}
		}
	}

	console.log(resultList);

	if (resultList.length == 0) {
		displayResult(null);
		return null;
	}

	for (var i = 0; i < resultList.length; i++) {
		console.log("item");
		console.log(resultList[i]);
		displayResult(resultList[i]);
	}
}

function getSearchTerm() {
	const params = new URLSearchParams(window.location.search);
	const q = params.get("q");
	return q
}

function loadSearch() {

	const searchInput = document.getElementById("search-input");
	var searchStr = searchInput.value;

	if (searchStr.trim() === "") {
		return false;
	}

	searchStr = searchStr.trim();
	searchStr = searchStr.toLowerCase();
	searchStr = searchStr.replace(/[^a-z0-9\s]/g, '').replace(/\s/g, "+");

	window.location.href = `/search/?q=${searchStr}`;

	return false;
}