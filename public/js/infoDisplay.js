let expandButtonInfo = document.getElementById('expandButtonInfo')

let buttonOn = false

var navBarAtivado = false

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

var navBar = document.getElementById('navbar')
var navBarAbrirFechar = document.getElementById('navbar-abrir-fechar')
var Painel = document.getElementById('painel')
var navBarContainer = document.getElementById('navbar-container')
var homePanel= document.getElementById('homePanelDisplay')
var addEventPanel = document.getElementById('addEventPanelDisplay')
var adicionarCategoriaPainel = document.getElementById('adicionarCategoriaPainel')
navBarAbrirFechar.addEventListener('click', OpenCloseNavbar);

function OpenCloseNavbar() {
    if (navBarAtivado==false) {
        navBarAtivado = true
        navBar.style.width = "15vw"
        navBarAbrirFechar.innerHTML = '<i class="fa-solid fa-xmark"></i>'
        navBarContainer.style.display = 'flex'
        animateCSS('#navbar-container', 'fadeInLeft');
    } else if (navBarAtivado==true) {
        navBarAtivado = false
        navBar.style.width = "0vw"
        navBarAbrirFechar.innerHTML = '<i class="fa-solid fa-bars"></i>'
        animateCSS('#navbar-container', 'fadeOutLeft').then(() => {
            navBarContainer.style.display = 'none'
        });
    }
}

var painelAtivado = homePanel

function openPainel(tela) {
    console.log(tela)

    console.log(painelAtivado.id)
    animateCSS(`#${painelAtivado.id}`, 'fadeOutLeft').then(() => {
        painelAtivado.style.display = 'none'

        if (tela=='home') {
            painelAtivado = homePanel
            animateCSS("#homePanelDisplay", 'fadeInLeft');
            homePanel.style.display = 'flex'
        }
        if (tela=='addEvent') {
            painelAtivado = addEventPanel
            animateCSS("#addEventPanelDisplay", 'fadeInLeft');
            addEventPanel.style.display = 'flex'
        }
    });



}
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