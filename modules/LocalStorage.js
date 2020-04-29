localStorage.setItem("isSubscribed", "false");

function subscribe(customerid) {
  localStorage.setItem("isSubscribed", "true");
  localStorage.setItem("customerid", customerid._id);
  const issubscirbed = localStorage.getItem("isSubscribed");
  showUser(issubscirbed);
}

function showUser(issubscirbed) {
  if (issubscirbed === "true") {
    window.location = "/asset.html";
  } else if (issubscirbed === "false") {
    window.location = "/index.html";
  }
}

export { subscribe };
