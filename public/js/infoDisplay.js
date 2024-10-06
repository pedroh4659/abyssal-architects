let expandButtonInfo = document.getElementById('expandButtonInfo')

let buttonOn = false
expandButtonInfo.addEventListener("click", function (e) {
  if (buttonOn==false) {
    infoDisplay.style.display = 'block'
    animateCSS('#infoDisplay', 'slideInDown').then((message) => {
      expandButtonInfo.innerHTML = '<i class="fa-solid fa-arrow-up"></i>'
      buttonOn = true
    })
  } else {
    animateCSS('#infoDisplay', 'slideOutUp').then((message) => {
      infoDisplay.style.display = 'none'
      expandButtonInfo.innerHTML = '<i class="fa-solid fa-arrow-down"></i>'
      buttonOn = false
    });
  }
});

var swiper = new Swiper(".cards", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  initialSlide: 1,
  slidesPerView: "3",
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 100,
    modifier: 0,
    slideShadows: false,
  },
  pagination: {
    el: ".swiper-pagination",
  },
});
function openPage(page) {
  window.location.href = `/timeline/${page}`;
}