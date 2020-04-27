import { url, apiKey } from "./urlKey";
import { subscribe } from "./LocalStorage";

async function manipulateEntry(newListItem) {
  const sameuser = await getData(newListItem);

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
    checkIfsubscirbed(response);
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

export { manipulateEntry };

function showAsset(item) {
  console.log(item);
  // subscribe();
}

function checkIfsubscirbed(item) {
  console.log(item);
  !item.subscriber && item.visitcount > 1
    ? console.log("not yet")
    : showAsset(item);
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
