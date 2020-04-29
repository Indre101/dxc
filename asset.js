import { url, apiKey } from "./modules/urlKey";
import { intersector } from "./modules/intersectionAnim";

intersector();

async function getCustomerData() {
	const customerId = localStorage.getItem("customerid");
	const data = await fetch(`${url}/${customerId}`, {
		method: "get",
		headers: {
			"Content-type": "application/json; charset=utf-8",
			"x-apikey": apiKey,
			"cache-control": "no-cache",
		},
	});
	const response = await data.json();
	checkIfsubscirbed(response);
}
getCustomerData();

function checkIfsubscirbed(item) {
	console.log(item);
	!item.subscriber && item.visitcount > 1 ? console.log("show modal") : console.log("hide modal");
}
