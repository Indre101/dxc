import "./styles/styles.scss";
import { getCountriesData } from "./modules/selectCountry";
import { manipulateEntry } from "./modules/Postingdata";
import { hamburgerMenu } from "./modules/BurgerMenu";
import { gsap } from "gsap";

window.addEventListener("DOMContentLoaded", init);

function init() {
	hamburgerMenu();
	getCountriesData();
	animateForm();
	getSVG();
	document.querySelector("form").onsubmit = function () {
		addEventListener("submit", submitForm);
	};
}

// load svg
async function getSVG() {
	console.log("start");
	let response = await fetch("images/infographics/hexagon.svg");
	let mySvgData = await response.text();
	document.querySelector(".diagram").innerHTML = mySvgData;
	console.log(mySvgData);
	fillHexagons();
}

// fill shapes
function fillHexagons() {
	console.log("fillHexagons");
	document.querySelectorAll("#top, #right, #rightDown, #down, #leftDown, #left, #middle, #bottom").forEach((e) => {
		e.classList.add("yellowFill");
	});
	gsap.from(".yellowFill", { delay: 3, duration: 1, y: 50, opacity: 0, stagger: 0.5 });
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
		isSubscribed,
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
	};
};

function getCustomerDataFromForm() {
	const fullName = document.querySelector("#fullName").value;
	const fullNameSplit = fullName.split(" ").filter((word) => word != "");
	const firstName = fullNameSplit[0];
	const lastName =
		fullNameSplit.length > 1 ? fullNameSplit.splice(1, fullNameSplit.length).join(" ") : "Did not provide";
	const counrtyPicked = document.querySelector("#location-picker").value;
	const workemail = document.querySelector("#workEmail").value;
	const companyname = document.querySelector("#companyName").value;
	const jobtitle = document.querySelector("#jobTitle").value;
	const subscribeCheckbox = document.querySelector(".subscribe");
	const isSubscribed = subscribeCheckbox.checked ? true : false;

	return {
		firstName,
		lastName,
		counrtyPicked,
		workemail,
		companyname,
		jobtitle,
		isSubscribed,
	};
}

function resetForm() {
	const counrtyPicked = document.querySelector("#location-picker");
	counrtyPicked.value = "Start typing";
	counrtyPicked.addEventListener("click", () => {
		event.target.value = " ";
	});
}
