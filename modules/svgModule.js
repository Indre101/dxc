import { gsap } from "gsap";

// load svg
async function getSVG() {
	console.log("start");
	let response = await fetch("images/infographics/hexagon_with_text.svg");
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
	gsap.from(".yellowFill", { delay: 1, duration: 1, z: 50, opacity: 0, stagger: 0.5 });
}

export { getSVG };
