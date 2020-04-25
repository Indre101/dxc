localStorage.setItem("isSubscribed", "false");

function subscribe() {
  console.log("clicked");
  localStorage.setItem("isSubscribed", "true");
  const issubscirbed = localStorage.getItem("isSubscribed");
  showUser(issubscirbed);
}

function showUser(issubscirbed) {
  if (issubscirbed === "true") {
    window.location = "../asset.html";
  } else if (issubscirbed === "false") {
    window.location = "../index.html";
  }
}

export { subscribe };
