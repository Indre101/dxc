import { url, apiKey } from "./urlKey";
import { subscribe } from "./LocalStorage";

async function manipulateEntry(newListItem) {
  const sameuser = await getData(newListItem);

  if (sameuser.length > 0) {
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
    testFunction(response);
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
    testFunction(response);
  }
}

export { manipulateEntry };

function testFunction(item) {
  console.log(item);
  subscribe();
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
