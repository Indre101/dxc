import { url, apiKey } from "./modules/urlKey";

async function getCustomerData() {
  document.querySelector(".preloader").dataset.active = "false";

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

function checkIfsubscirbed(item) {
  console.log(item);

  !item.subscriber && item.visitcount > 1
    ? console.log("not yet")
    : showAsset(item);
}
