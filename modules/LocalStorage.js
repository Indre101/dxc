{
  /* <script src="https://kea-alt-del.dk/dxc/login.js"></script> */
}
localStorage.setItem("isSubscribed", "false");

document.querySelector("button").onclick = function () {
  localStorage.setItem("isSubscribed", "false");
  const issubscirbed = localStorage.getItem("isSubscribed");

  showUser(issubscirbed);
};

function showUser(issubscirbed) {
  if (issubscirbed === "true") {
    console.log("sub");
  } else if (issubscirbed === "false") {
    console.log("notusb");
  }
}
