// FUNCTION:: Get elements by id
const _ = (elm) => document.getElementById(elm);
// FUNCTION:: Get elements by queryselector
const qs = (elm) => document.querySelector(elm);
// FUNCTION:: Get elements by queryselectorAll
const qsa = (elm) => document.querySelectorAll(elm);

// Get all DOM elements
const [
  backToTopBtn,
  navBar,
  navBarToggleIcon,
  loader,
  filterlinks,
  projectsContainer,
] = [
  qs(".back-to-top-btn"),
  qs(".navbar"),
  qs(".navbar-toggle-icon"),
  qs(".loader-wrapper"),
  qs(".filter-links"),
  qs(".projects"),
];

// -----------------------------------------------------NAVBAR ----------------------------------------------------
navBarToggleIcon.addEventListener("click", () => {
  navBar.classList.toggle("open");
});

window.addEventListener("scroll", () => {
  backToTopBtn.classList.toggle("active", window.scrollY > 500);
  navBar.classList.toggle("animate-slideIn", window.scrollY > 0);
});

// -----------------------------------BACK TO TOP BUTTONS ----------------------------------------------------

window.addEventListener("scroll", () => {
  backToTopBtn.classList.toggle("active", window.scrollY > 500);
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo(0, 0);
});

//Loader
window.addEventListener("load", () => {
  loader.style.display = "none";
});

// Swiper Slider
var swiper = new Swiper(".team-container", {
  pagination: ".swiper-pagination",
  paginationClickable: true,
  slidesPerView: 4,
  spaceBetween: 50,
  loop: true,
  nextButton: ".next",
  prevButton: ".prev",
  breakpoints: {
    1024: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    480: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
  },
});
// Swiper Slider
var swiper = new Swiper(".review-container", {
  nextButton: ".next",
  prevButton: ".prev",
  loop: true,
  autoplay: 3000,
});

// Project Filter
const categories = [
  "all",
  ...new Set(projects.map((project) => project.category)),
];

categories.forEach((category) => {
  filterlinks.innerHTML += `
    <div class="p-1 rounded-sm filter-link capitalize  w-100 text-center" onclick="filterProjects('${category}', this)">${category}</div>
  `;
});

const filterLinks = qsa(".filter-link");
filterLinks[0].classList.add("active");

function removeActiveClass() {
  filterLinks.forEach((filterLink) => {
    filterLink.classList.remove("active");
  });
}

projects.forEach((project) => {
  addProjects({ ...project });
});

function filterProjects(category, link) {
  // Toggle Active class
  removeActiveClass();
  link.classList.add("active");
  projectsContainer.innerHTML = "";
  if (category == "all") {
    projects.forEach((project) => {
      addProjects({ ...project });
    });
  }

  const newProjects = projects.filter(
    (project) => project.category === category
  );
  newProjects.forEach((project) => {
    addProjects({ ...project });
  });
}

function addProjects({ img, id }) {
  projectsContainer.innerHTML += `
   <div class="grow-shrink-14 img overflow-hidden cursor-pointer rounded zoom-in" id="${id}">
            <img
              src="${img}"
              alt=""
              class="image transition-all height-200 object-cover"
            />
     </div>
  `;
}
