import "./styles/styles.scss";
import { subscribe } from "./modules/LocalStorage";
import { getCountriesData } from "./modules/selectCountry";
import { manipulateEntry } from "./modules/selectCountry";

window.addEventListener("DOMContentLoaded", init);

function init() {
  getCountriesData();
  document.querySelector("form").addEventListener("submit", submitForm);
}

function submitForm() {
  event.preventDefault();

  const customer = {
    firstname: "ll",

    country: "denmark",
  };
  // const customerItem = customerData();
  // console.log(customerItem);
  manipulateEntry("post", customer);
  document.querySelector("form").reset();
  subscribe();
}

const customerData = () => {
  const {
    firstName,
    lastName,
    workemail,
    jobtitle,
    companyname,
    counrtyPicked,
  } = getCustomerDataFromForm();

  const customer = {
    firstname: firstName,
    lastname: lastName,
    workemail: workemail,
    jobtitle: jobtitle,
    company: companyname,
    country: counrtyPicked,
  };

  return customer;
};

function getCustomerDataFromForm() {
  const fullName = document.querySelector("#fullName").value;
  const fullNameSplit = fullName.split(" ").filter((word) => word != "");
  const firstName = fullNameSplit[0];
  const lastName =
    fullNameSplit.length > 1
      ? fullNameSplit.splice(1, fullNameSplit.length).join(" ")
      : "Did not provide";
  const counrtyPickederListbox = document.querySelector(
    "#location-picker__listbox"
  );
  counrtyPickederListbox.classList.add("autocomplete__menu--hidden");
  const counrtyPicked = document.querySelector("#location-picker").value;
  const workemail = document.querySelector("#workEmail").value;
  const companyname = document.querySelector("#companyName").value;
  const jobtitle = document.querySelector("#jobTitle").value;

  return {
    firstName,
    lastName,
    counrtyPicked,
    workemail,
    companyname,
    jobtitle,
  };
}
