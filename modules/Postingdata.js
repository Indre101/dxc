import { url, apiKey } from "./urlKey";
import { subscribe } from "./LocalStorage";

async function manipulateEntry(newListItem) {
  showPreloader();
  const sameuser = await getData(newListItem);
  if (sameuser.length > 0) {
    setSubsciption(newListItem, sameuser);
    newListItem.visitcount = sameuser[0].visitcount + 1;
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

function showPreloader() {
  document.querySelector(".preloader")
    ? (document.querySelector(".preloader").dataset.active = "true")
    : false;
}

function showAsset(item) {
  if (document.querySelector(".modal")) {
    document.querySelector(".modal").dataset.active = "false";
  } else {
    subscribe(item);
  }
}

function setSubsciption(newListItem, sameuser) {
  sameuser[0].subscriber ? (newListItem.subscriber = true) : false;
  sameuser[0].agreedtogdpr ? (newListItem.agreedtogdpr = true) : false;
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
