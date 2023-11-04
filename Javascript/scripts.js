//Dark/Light mode
const body = document.querySelector('body');
const modeToggle = document.getElementById('mode-toggle');
const modeStatus = document.querySelector('.modeStat');

function toggleMode() {
  body.classList.toggle('dark-mode');

  const modeMessage = body.classList.contains('dark-mode') ?
    'Dark Mode' 
    : "Light Mode"

  modeStatus.innerText = modeMessage;
}

modeToggle.addEventListener('click', toggleMode);

//Image slider
let imgArray = [
  'https://raw.githubusercontent.com/Woidyla/mywebsite/main/Media/eliot.jpg',
    'https://raw.githubusercontent.com/Woidyla/Project10/main/Media/8205FBB3-97A7-4675-BB26-AD5DAECFF2FE.jpeg',
  
'https://raw.githubusercontent.com/Woidyla/Project10/main/Media/03D5C28F-081D-4E54-94C5-A899EFD9FD6C.jpeg',
  
'https://raw.githubusercontent.com/Woidyla/Project10/main/Media/C53495DA-CDF8-40B0-AB43-866449F8F0DD.jpeg'],
    curIndex = 0;
    imgDuration = 3000;

function slideShow() {
    document.getElementById('slider').className += "fadeOut";
    setTimeout(function() {
        document.getElementById('slider').src = imgArray[curIndex];
        document.getElementById('slider').className = "";
    });
    curIndex++;
    if (curIndex == imgArray.length) { curIndex = 0; }
    setTimeout(slideShow, imgDuration);
}
slideShow();

//contact validation

const form = document.getElementById('theForm')
const submitButton = document.querySelector('.submit')
const successMessage = document.getElementById('form-submitted-msg')

const formElements = [ ...form.elements ]

let allInputsValid = () => {
  let valid = formElements.every((element) => {
    if (element.nodeName === 'SELECT') {
      return element.value !== 'Please select an option'
    } else {
      return element.checkValidity()
    }
  })


  return valid
}

let handleChange = () => {
  formElements.forEach((element) => {
    if (!element.checkValidity()
          && element.nodeName !== 'BUTTON'
          && element.nodeName !== 'SELECT'  
          && element.type !== 'checkbox'
          && element.type !== 'radio'
    ) {
      element.style.borderColor = 'red'
      element.nextElementSibling.style.color = 'red'
      element.nextElementSibling.style.display = 'block'
      element.previousElementSibling.style.color = 'red'
    }
    if (element.checkValidity()
          && element.nodeName !== 'BUTTON'
          && element.nodeName !== 'SELECT'
          && element.type !== 'checkbox'
          && element.type !== 'radio'
    ) {
      element.style.borderColor = 'green'
      element.nextElementSibling.style.color = 'green'
      element.nextElementSibling.style.display = 'none'
      element.previousElementSibling.style.color = 'green'
    }
    if (!element.checkValidity()
          && (element.type === 'checkbox'
              || element.type === 'radio')
    ) {
      element.style.borderColor = 'red'
      element.nextElementSibling.style.color = 'red'
    }
    if (element.checkValidity()
          && (element.type === 'checkbox'
              || element.type === 'radio')
    ) {
      element.style.borderColor = 'green'
      element.nextElementSibling.style.color = 'green'
    }
    if (element.nodeName === 'SELECT'
          && element.value === 'Please select an option'
    ) {
      element.style.borderColor = 'red'
      element.nextElementSibling.style.color = 'red'
      element.nextElementSibling.style.display = 'block'
      element.previousElementSibling.style.color = 'red'
    }
    if (element.nodeName === 'SELECT'
          && element.value !== 'Please select an option'
    ) {
      element.style.borderColor = 'green'
      element.nextElementSibling.style.color = 'green'
      element.nextElementSibling.style.display = 'none'
      element.previousElementSibling.style.color = 'green'
    }
  })
  if (allInputsValid()) {
    submitButton.removeAttribute('disabled', '')
  } else {
    submitButton.setAttribute('disabled', '')
  }
}

let handleSubmit = (e) => {
  e.preventDefault()
  if (allInputsValid()) {
    successMessage.style.display = 'block'
    form.reset()
    submitButton.setAttribute('disabled', '')
    setTimeout(() => {
      successMessage.style.display = 'none'
    }, 3000)
  }
}
formElements.forEach((element) => {
  element.addEventListener('change', handleChange)
})
form.addEventListener('submit', (e) => handleSubmit(e))

//Leaflet JS
        const map = L.map('map').setView([36.441166, -79.407111], 13); //My Lat, Long and Zoom

        const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(map); //Map styles


        var circle = L.circle([36.441166, -79.407111], {radius: 800}).addTo(map); //Location circle

        var popup = L.popup()
           .setLatLng([36.441166, -79.407111])
           .setContent("Generalized location.")
           .openOn(map);
           circle.bindPopup("<b>City of:</b> Pelham"); //Text popup