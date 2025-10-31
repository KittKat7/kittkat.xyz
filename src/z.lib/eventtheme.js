
(function main() {
	const dt = new Date();
	if (dt.getMonth() == 9 && dt.getDate() == 31) {
		document.body.setAttribute("mode", "dark");
		document.body.setAttribute("event", "halloween");
		const style = document.createElement("link");
		style.rel = "stylesheet";
		style.href = "/z.lib/events.css";

		document.head.appendChild(style);
		// <link rel="stylesheet" href="/style.css?v=202508250154">
	}
})()
