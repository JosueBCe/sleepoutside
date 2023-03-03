let currentIndex = 1;
let newIndex = 0;
let index = 0;

export function generateSlideHTML(data) {
  let html = "";

  data.forEach((slide) => {
    let styleSlide = `style="display: none"`;
    index++;

    if (index == 1) styleSlide = `style="display: block"`;

    html += `<div class="slide${index}" ${styleSlide}>${slide}</div>`;
  });

  return html;
}

export function productCarousel(product) {
  let imagesFile = [];

  for (let i = 0; i < product.Colors.length; i++) {
    imagesFile.push(`<img src=${product.Colors[i].ColorPreviewImageSrc}>`);
  }

  const slideHTML = generateSlideHTML(imagesFile);

  const slides = document.querySelector(".slides");
  if (slides) slides.innerHTML = slideHTML;

  // Hide buttons with only 1 color
  if (index == 1) {
    document.querySelector(".prev").style.display = "none";
    document.querySelector(".next").style.display = "none";
  }

  // LEFT & RIGHT arrows
  let prevButton = document.querySelector(".prev");
  let nextButton = document.querySelector(".next");

  prevButton.addEventListener("click", () => left());
  nextButton.addEventListener("click", () => right());
}

// LEFT arrow
function left() {
  document.querySelector(`.slide${currentIndex}`).style.display = "none";

  if (currentIndex == 1) {
    newIndex = index;
    currentIndex = index;
  } else {
    currentIndex--;
    newIndex = currentIndex;
  }

  document.querySelector(`.slide${newIndex}`).style.display = "block";
}

// RIGHT arrow
function right() {
  document.querySelector(`.slide${currentIndex}`).style.display = "none";

  if (currentIndex == index) {
    newIndex = 1;
    currentIndex = 1;
  } else {
    currentIndex++;
    newIndex = currentIndex;
  }

  document.querySelector(`.slide${newIndex}`).style.display = "block";
}
