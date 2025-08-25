// ENV Vars
const prodURL = "kittkat.xyz"
const baseURL = window.location.hostname;
const isProd = prodURL == baseURL;
const devDiscordContactWebhook = "https://discord.com/api/webhooks/1407095671072358513/w3mHXxzAfBaj45iyQMkKHgBCWtZgQITtXqL2_4DW_HsCOa-eRIMLq938svmoBcunu1Kz";
const prodDiscordContactWebhook = "https://discord.com/api/webhooks/1408130993012867267/CJ7WOsprH4rlxQUBnxZ7GS_Tf9zTkC_cMlvsMX0hjT26ebRlAGd1yzliev3KeHdOskEo";

async function submitContactForm(ev) {
	ev.preventDefault();
	const name = document.getElementById("contact-name").value;
	const email = document.getElementById("contact-email").value;
	const comment = document.getElementById("contact-comment").value;

	document.getElementById("contact-submit").style.display = "none";

	const webhookbody = {
		embeds: [{
			title: "Contact Form (website)",
			fields: [
				{ name: "name", value: name },
				{ name: "email", value: email },
				{ name: "comment", value: comment },
			]
		}]
	};

	const webhookurl = isProd ? prodDiscordContactWebhook : devDiscordContactWebhook;

	const response = await fetch(webhookurl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(webhookbody),
	});

	if (response.ok) {
		alert("Message has been recieved by club officers");
	} else {
		alert("There was an error, please try again later");
		document.getElementById("contact-submit").style.display = "unset";
	}
}