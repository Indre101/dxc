import { url, apiKey } from "./urlKey";
import { subscribe } from "./LocalStorage";

async function manipulateEntry(newListItem) {
  const sameuser = await getData(newListItem);
  document.querySelector(".preloader").dataset.active = "true";
  if (sameuser.length > 0) {
    newListItem.visitcount = sameuser[0].visitcount + 1;

    sameuser[0].subscriber ? (newListItem.subscriber = true) : false;

    const data = await fetch(`${url}/${sameuser[0]._id}`, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json; charset=utf-8",
        "x-apikey": apiKey,
        "cache-control": "no-cache",
      },
      body: JSON.stringify(newListItem),
    });
    const response = await data.json();
    showAsset(response);
  } else {
    const data = await fetch(url, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json; charset=utf-8",
        "x-apikey": apiKey,
        "cache-control": "no-cache",
      },
      body: JSON.stringify(newListItem),
    });
    const response = await data.json();
    showAsset(response);
  }
}

function showAsset(item) {
  subscribe(item);
}

async function getData(newListItem) {
  const data = await fetch(url, {
    method: "get",
    headers: {
      "Content-type": "application/json; charset=utf-8",
      "x-apikey": apiKey,
      "cache-control": "no-cache",
    },
  });

  const response = await data.json();
  const sameUser = await checkIfuserAlreadyExist(response, newListItem);
  return sameUser;
}

function checkIfuserAlreadyExist(data, newListItem) {
  const sameUser = data.filter(
    (user) =>
      user.workemail === newListItem.workemail &&
      user.firstname === newListItem.firstname
  );
  return sameUser;
}

export { manipulateEntry };
