//The template shows how styles and assets should be imported.
//This ensures propper bundling and encapsulation.

import styles from "./styles.module.css";
import img from "./assets/javascript.webp"; //All media should be placed in './assets/'

export const templateHTML = `
  <div class=${styles.templateHeader}>
  <img src=${img} alt="javascript-logo" />
  <h2>Vite WP Component Slides</h2>
  </div>
`;
