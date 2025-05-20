function syntax(type, line) {
	return "<span class=\"" + type + "\">" + line + "</span>";
}

// Select all <code> elements on the webpage
var codeBlocks = document.querySelectorAll('code');

// Loop through each <code> element
codeBlocks.forEach(function (code) {
	let linesIn = code.textContent.split("\n");
	let content = [];
	linesIn.forEach(function (line) {
		l1 = line.trim();
		if (l1.startsWith("#")) {
			content.push(syntax("comment", line));
		}
		else if (l1.startsWith("move")) {
			content.push(syntax("command", line))
		}
		else if (l1.startsWith("if") || line.startsWith("fi")) {
			content.push(syntax("if", line))
		}
		else if (l1.startsWith("while") || line.startsWith("elihw")) {
			content.push(syntax("while", line))
		}
		else {
			content.push(line);
		}
	});
	// Modify the text of each <code"<span class=\"comment\">" + line + "</span>"> element
	// console.log(content);
	code.innerHTML = content.join("\n");
});