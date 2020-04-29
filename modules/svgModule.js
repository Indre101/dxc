import { gsap } from "gsap";

// load svg
async function getSVG() {
  console.log("start");
  let response = await fetch("images/infographics/hexagon_with_text.svg");
  let mySvgData = await response.text();
  document.querySelector(".diagram").innerHTML = mySvgData;
  fillHexagons();
  // getInfoGraphics();
}

async function getInfoGraphics() {
  console.log("getInfoGraphics");
  let responseOne = await fetch("images/infographics/icon_01.svg");
  let iconOne = await responseOne.text();
  let responseTwo = await fetch("images/infographics/icon_02.svg");
  let iconTwo = await responseTwo.text();
  let responseThree = await fetch("images/infographics/icon_03.svg");
  let iconThree = await responseThree.text();
  let responseFour = await fetch("images/infographics/icon_04.svg");
  let iconFour = await responseFour.text();
  document.querySelector(".info-graphic-01").innerHTML = iconOne;
  document.querySelector(".info-graphic-02").innerHTML = iconTwo;
  document.querySelector(".info-graphic-03").innerHTML = iconThree;
  document.querySelector(".info-graphic-04").innerHTML = iconFour;
}

// fill shapes
function fillHexagons() {
  console.log("fillHexagons");
  document
    .querySelectorAll(
      "#top, #right, #rightDown, #down, #leftDown, #left, #middle, #bottom"
    )
    .forEach((e) => {
      e.classList.add("yellowFill");
    });
  gsap.from(".yellowFill", {
    delay: 1,
    duration: 1,
    z: 50,
    opacity: 0,
    stagger: 0.5,
  });
}

export { getSVG };
