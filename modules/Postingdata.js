import { url, apiKey } from "./urlKey";

function manipulateEntry(method, newListItem) {
  console.log(newListItem);
  fetch(url, {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-type": "application/json; charset=utf-8",
      "x-apikey": apiKey,
      "cache-control": "no-cache",
    },
    body: JSON.stringify(newListItem),
  })
    .then((res) => res.json())
    .then((data) => testFunction(data));
}

function testFunction(item) {
  console.log(item);
}

export { manipulateEntry };

// function postTodo(newListItem) {
//   fetch(`https://deleteme-6090.restdb.io/rest/card`, {
//     method: "post",
//     headers: {
//       Accept: "application/json",
//       "Content-type": "application/json",
//       "x-apikey": "5e9570bb436377171a0c2315",
//       "cache-control": "no-cache",
//     },
//     body: JSON.stringify(newListItem),
//   })
//     .then((res) => res.json())

//     .then((todo) => {
//       displayTodo(todo);
//     });
//   document.querySelector(".more-info-container").dataset.active = "false";
// }

// function updateTodo(event, id, newTodo) {
//   event.preventDefault();
//   let postData = JSON.stringify(newTodo);
//   fetch(`https://deleteme-6090.restdb.io/rest/card/${id}`, {
//     method: "put",
//     headers: {
//       "Content-Type": "application/json; charset=utf-8",
//       "x-apikey": "5e9570bb436377171a0c2315",
//       "cache-control": "no-cache",
//     },
//     body: postData,
//   })
//     .then((d) => d.json())
//     .then((item) => assingUpdatedValues(item));
// }
