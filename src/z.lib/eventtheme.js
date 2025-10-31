
document.addEventListener('DOMContentLoaded', () => {
	const dt = new Date();
	if (dt.getMonth() == 9 && dt.getDate() == 31) {
		document.documentElement.setAttribute("mode", "dark");
		document.documentElement.setAttribute("event", "halloween");
		const style = document.createElement("link");
		style.rel = "stylesheet";
		style.href = "/z.lib/events.css";

		document.head.appendChild(style);
	}
})
