const root = document.getElementById(__COMPONENT_CONFIG__.rootID); // ID shared by both live-server and wp-shortcode parent elements.
//Edit below

import { template } from "./template.js";
import { generatePriceCards } from "./generator.js";

root.innerHTML = template;
document.querySelector("#price-table").innerHTML = generatePriceCards();
