//__COMPONENT_CONFIG__ is a global object containing 'component.config.json' information.
//__COMPONENT_CONFIG__.rootID should be used as the root element ID.
//This matches the ID of the element that will be created via Wordpress Shortcode in production.

//Access root element
const root = document.getElementById(__COMPONENT_CONFIG__.rootID);
//All HTML rendered should be inside this element.

//	-------------EDIT BELOW----------------

import { templateHTML } from "./template.js";
import { generateSlides, setupSlideNavigation } from "./generator.js";
import data from "./info.json";

// Insert template
root.innerHTML = templateHTML;

// Generate slides
const slides = generateSlides(data);
root.appendChild(slides);

// Setup Navigation
setupSlideNavigation(slides);
