import "./styles/styles.scss";
import { getCountriesData } from "./modules/selectCountry";
import { manipulateEntry } from "./modules/Postingdata";

window.addEventListener("DOMContentLoaded", init);

function init() {
  getCountriesData();
  document.querySelector("form").onsubmit = function () {
    addEventListener("submit", submitForm);
  };
}

function submitForm() {
  event.preventDefault();
  const customerItem = customerData();
  manipulateEntry(customerItem);
  document.querySelector("form").reset();
  resetForm();
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

  return {
    firstname: firstName,
    lastname: lastName,
    workemail: workemail,
    jobtitle: jobtitle,
    company: companyname,
    country: counrtyPicked,
    visitcount: 1,
  };
};

function getCustomerDataFromForm() {
  const fullName = document.querySelector("#fullName").value;
  const fullNameSplit = fullName.split(" ").filter((word) => word != "");
  const firstName = fullNameSplit[0];
  const lastName =
    fullNameSplit.length > 1
      ? fullNameSplit.splice(1, fullNameSplit.length).join(" ")
      : "Did not provide";
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

function resetForm() {
  const counrtyPicked = document.querySelector("#location-picker");
  counrtyPicked.value = "Start typing";
  counrtyPicked.addEventListener("click", () => {
    event.target.value = " ";
  });
}
