import { url, apiKey } from "./modules/urlKey";
import { manipulateEntry } from "./modules/Postingdata";

const bodyScrollLock = require("body-scroll-lock");
const disableBodyScroll = bodyScrollLock.disableBodyScroll;
const enableBodyScroll = bodyScrollLock.enableBodyScroll;

window.addEventListener("DOMContentLoaded", init);

function init() {
  getCustomerData();
  closeModal();

  document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    const updatedInfom = addNewData();
    manipulateEntry(updatedInfom);
    document.querySelector(".page-wrapper").dataset.active = "";
    document.querySelector(".modal").dataset.active = "false";
    const targetElement = document.querySelector("#page-wrapper");
    enableBodyScroll(targetElement);
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
  manipulateEntry(response);
  checkIfsubscirbed(response);
}

function checkIfsubscirbed(item) {
  if (!item.subscriber && item.visitcount > 1) {
    setTimeout(() => {
      const targetElement = document.querySelector("#page-wrapper");
      disableBodyScroll(targetElement);
      document.querySelector(".modal").dataset.active = "";
    }, 6000);
  } else {
    document.querySelector(".modal").dataset.active = "false";
  }
}

function closeModal() {
  document.querySelector(".closeBtn").addEventListener("click", () => {
    document.querySelector(".modal").dataset.active = "false";
    document.querySelector(".page-wrapper").dataset.active = "";
    const targetElement = document.querySelector("#page-wrapper");
    enableBodyScroll(targetElement);
  });
}

function addNewData() {
  const {
    firstName,
    lastName,
    workemail,
    isSubscribed,
  } = getCustomerDataFromForm();

  return {
    firstname: firstName,
    lastname: lastName,
    workemail: workemail,
    subscriber: isSubscribed,
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
  const isSubscribed = subscribeCheckbox.checked ? true : false;

  return {
    firstName,
    lastName,
    workemail,
    isSubscribed,
  };
}
