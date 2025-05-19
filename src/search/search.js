var index = null;

// Fetch the search index json file
async function fetchIndex() {
	if (index != null) return;
	const response = await fetch('/search/index.json');
	const json = await response.json();
	return new Map(Object.entries(json)); // Return the fetched data
}

// Adds items to the search list displayed on the page. If null is passed, will display no results.
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
		link.textContent = `[${result["index"]}] ${result["title"]} (${result["link"]})`;
		link.href = result["link"];
		node.appendChild(h);
		node.appendChild(document.createTextNode(result["desc"]));
	}
	resultsDiv.appendChild(node);
	resultsDiv.appendChild(document.createElement("br"));
}

// Runs a search through the index for the provided search term. Uses displayResult to display the located search results.
async function searchIndex(search) {
	index = await fetchIndex();

	var h3 = document.getElementById("searchTerm").value = search;

	search = search.toLowerCase().trim();

	if (search == "") {
		displayResult(null);
		return null;
	}

	function SearchResult(index, link, title, tags, desc) {
		this.index = index;
		this.link = link;
		this.title = title;
		this.tags = tags;
		this.desc = desc;
	}

	function count(a, b) {
		return a.toLowerCase().split(b.toLowerCase()).length - 1;
	}

	var resultList = [];

	for (let [key, value] of index) {
		var sr = new SearchResult(0, key, value["title"], value["tags"], value["desc"]);
		var words = search.split(" ");

		for (var i = 0; i < words.length; i++) {
			var w = words[i];
			// title search
			var c = count(sr.title, w)
			sr.index += 3 * c;

			// search tags
			for (var j = 0; j < sr.tags.length; j++) {
				c = count(sr.tags[j], w)
				sr.index += 2 * c
			}

			// search description
			var c = count(sr.desc, w)
			sr.index += 1 * c;
		}

		if (sr.index > 0) {
			resultList.push(sr);
		}
	}

	if (resultList.length == 0) {
		displayResult(null);
		return null;
	}

	resultList.sort((a, b) => b.index - a.index);

	for (var i = 0; i < resultList.length; i++) {
		displayResult(resultList[i]);
	}
}

// Get the search term from the URL
function getSearchTerm() {
	const params = new URLSearchParams(window.location.search);
	const q = params.get("q");
	return q
}

// Executes on a search, and directs the user the the search page with the search term.
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