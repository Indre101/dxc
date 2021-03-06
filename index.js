import "./styles/styles.scss";
import { getCountriesData } from "./modules/selectCountry";
import { manipulateEntry } from "./modules/Postingdata";
import { hamburgerMenu } from "./modules/BurgerMenu";
import { getSVG } from "./modules/svgModule";
import { gsap } from "gsap";
import { intersector } from "./modules/intersectionAnim";

window.addEventListener("DOMContentLoaded", init);

function init() {
  hamburgerMenu();
  getCountriesData();
  animateForm();
  getSVG();
  intersector();
  const checkagreement = document.querySelector(".checkagreement");
  checkagreement.addEventListener("click", () => {
    checkagreement.checked
      ? (document.querySelector(".sign-up-btn").disabled = false)
      : (document.querySelector(".sign-up-btn").disabled = true);
  });

  document.querySelector("form").onsubmit = function () {
    addEventListener("submit", submitForm);
  };
}

// animate form
function animateForm() {
  gsap.from(".animOne", { duration: 2, y: 50, opacity: 0, stagger: 0.5 });
}

function submitForm() {
  event.preventDefault();
  const customerItem = customerData();
  manipulateEntry(customerItem);
  document.querySelector("form").reset();
}

const customerData = () => {
  const {
    firstName,
    lastName,
    workemail,
    jobtitle,
    companyname,
    counrtyPicked,
    isSubscribed,
    agreedToGDPR,
  } = getCustomerDataFromForm();

  return {
    firstname: firstName,
    lastname: lastName,
    workemail: workemail,
    jobtitle: jobtitle,
    company: companyname,
    country: counrtyPicked,
    visitcount: 1,
    subscriber: isSubscribed,
    agreedtogdpr: agreedToGDPR,
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
  const subscribeCheckbox = document.querySelector(".subscribe");
  const gdpr = document.querySelector(".checkagreement");
  const isSubscribed = subscribeCheckbox.checked ? true : false;
  const agreedToGDPR = gdpr.checked ? true : false;

  return {
    firstName,
    lastName,
    counrtyPicked,
    workemail,
    companyname,
    jobtitle,
    isSubscribed,
    agreedToGDPR,
  };
}
