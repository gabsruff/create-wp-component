import styles from "./styles.module.css";

export function generateSlides(data) {
  // Wrapper general
  const wrapper = document.createElement("div");
  wrapper.className = styles["slideWrapper"];

  // Track que contiene los slides
  const track = document.createElement("div");
  track.className = styles["slideTrack"];

  data.forEach((item) => {
    const slide = document.createElement("div");
    slide.className = styles.slide;
    slide.innerHTML = `
	  <img src=${item.image} alt=${item.alt} />
      <h2>${item.title}</h2>
      <p>${item.text}</p>
	  `;
    track.appendChild(slide);
  });

  wrapper.appendChild(track);

  // Botones de navegación
  const nav = document.createElement("div");
  nav.className = styles["navButtons"];
  nav.innerHTML = `
    <button id="prev">❮</button>
    <button id="next">❯</button>
  `;
  wrapper.appendChild(nav);

  return wrapper;
}

export function setupSlideNavigation(wrapper) {
  const track = wrapper.querySelector(`.${styles["slideTrack"]}`);
  const slides = wrapper.querySelectorAll(`.${styles.slide}`);
  const total = slides.length;
  let current = 0;

  const showSlide = (index) => {
    track.style.transform = `translateX(-${index * 100}%)`;
  };

  wrapper.querySelector("#prev").addEventListener("click", () => {
    current = (current - 1 + total) % total;
    showSlide(current);
  });

  wrapper.querySelector("#next").addEventListener("click", () => {
    current = (current + 1) % total;
    showSlide(current);
  });
}
