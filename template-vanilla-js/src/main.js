const root = document.getElementById(__COMPONENT_CONFIG__.rootID); // ID shared by both live-server and wp-shortcode parent elements.
//Edit below

import { templateHTML } from "./template.js";
import { generateSlides, setupSlideNavigation } from "./generator.js";
import data from "./info.json";

// Insertar template
root.innerHTML = templateHTML;

// Generar slides
const slides = generateSlides(data);
root.appendChild(slides);

// Configurar navegación
setupSlideNavigation(slides);
