
let darkmode = localStorage.getItem("darkmode");

const enableDarkMode = () => {
	document.documentElement.setAttribute("mode", "dark");
	darkmode = "active";
	localStorage.setItem("darkmode", darkmode);
}

const disableDarkMode = () => {
	document.documentElement.setAttribute("mode", "light");
	darkmode = null;
	localStorage.setItem("darkmode", darkmode);
}

function toggleDarkMode() {
	darkmode !== "active" ? enableDarkMode() : disableDarkMode();
}

darkmode === "active" ? enableDarkMode() : disableDarkMode();