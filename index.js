import "./styles/styles.scss";
import { A } from "./modules/test";

import { callMethod } from "./modules/Postingdata";
callMethod("get", showData);

function showData(data) {
  console.log(data);
}

let item = {
  workemail: "somethinnewg@gmail.com",
  jobtitle: "CEO",
  country: "Denmark",
  company: "Something",
  firstname: "Tadas",
  lastname: "Blinda",
};
callMethod("post", showData, item);
