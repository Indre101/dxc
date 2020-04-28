import { url, apiKey } from "./modules/urlKey";
import { manipulateEntry } from "./modules/Postingdata";

window.addEventListener("DOMContentLoaded", init);

function init() {
  console.log("init");
  getCustomerData();
  closeModal();

  document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    const updatedInfom = addNewData();
    manipulateEntry(updatedInfom);
    document.querySelector(".page-wrapper").dataset.active = "";
  });
}

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

function checkIfsubscirbed(item) {
  if ((!item.subscriber || !item.agreedtogdpr) && item.visitcount > 1) {
    document.querySelector(".modal").dataset.active = "";
    document.querySelector(".page-wrapper").dataset.active = "false";
  } else {
    document.querySelector(".modal").dataset.active = "false";
  }
}

function closeModal() {
  document.querySelector(".closeBtn").addEventListener("click", () => {
    document.querySelector(".modal").dataset.active = "false";
    document.querySelector(".page-wrapper").dataset.active = "";
  });
}

function addNewData() {
  const {
    firstName,
    lastName,
    workemail,
    isSubscribed,
    agreedToGDPR,
  } = getCustomerDataFromForm();

  return {
    firstname: firstName,
    lastname: lastName,
    workemail: workemail,
    subscriber: isSubscribed,
    agreedtogdpr: agreedToGDPR,
  };
}

function getCustomerDataFromForm() {
  const fullName = document.querySelector("#fullName").value;
  const fullNameSplit = fullName.split(" ").filter((word) => word != "");
  const firstName = fullNameSplit[0];
  const lastName =
    fullNameSplit.length > 1
      ? fullNameSplit.splice(1, fullNameSplit.length).join(" ")
      : "Did not provide";
  const workemail = document.querySelector("#workEmail").value;
  const subscribeCheckbox = document.querySelector(".subscribe");
  const gdpr = document.querySelector(".checkagreement");
  const isSubscribed = subscribeCheckbox.checked ? true : false;
  const agreedToGDPR = gdpr.checked ? true : false;

  return {
    firstName,
    lastName,
    workemail,
    isSubscribed,
    agreedToGDPR,
  };
}
