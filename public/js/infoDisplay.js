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

function openPage(page) {
  window.location.href = `/timeline/${page}`;
}