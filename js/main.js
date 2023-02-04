const BASE_API = "https://api.nationalize.io?name="
const BASE_COUNTRY_API = "https://restcountries.com/v3.1/alpha/"

const elForm = document.querySelector("[data-search-form]")
const elItemTemplate = document.querySelector("[data-info-item-template]")
const elInfoList = document.querySelector("[data-info-list]")
const elLoader = document.querySelector("[data-loader]")

// Get Data
async function getData(name) {
  loader(true)
  const request = await fetch(BASE_API + name)
  const data = await request.json()
  
  if (data.country.length === 0) {
    loader(false)
  }

  renderNations(data)
}


// Get Country Data 
async function getCountryData(country) {
  const requestCountries = await fetch(BASE_COUNTRY_API + country)
  const data = requestCountries.json()

  loader(false)
  
  return data
}

// Search
elForm.addEventListener("submit", (evt) => {
  evt.preventDefault()

  const name = elForm.search.value

  getData(name)

  elForm.reset()
})

// Render function
function renderNations(nations) {
  elInfoList.innerHTML = ""

  const elItem = elItemTemplate.content.cloneNode(true)
  const elItemInner = elItem.querySelector("[data-card-item-inner]")
  const nationsList = nations.country
  let html = ""

  elItem.querySelector("[data-item-name]").textContent = `Searched Name: ${nations.name}`

  nationsList.forEach(nation => {
    getCountryData(nation.country_id).then(data => {
      html += `<p class="card-item__nation" data-item-nation-text>${data[0].fifa} <small>(${data[0].name.common})</small> - ${((nation.probability) * 100).toFixed(1)}%</p>`

      elItemInner.innerHTML = html
    }).catch(err => {
      html += `<p>${err}</p>`

      elItemInner.innerHTML = html
    })
  });

  elInfoList.appendChild(elItem)
}

// Loader
function loader(state) {
  if (state) {
    elLoader.classList.remove("hidden")
  } else {
    elLoader.classList.add("hidden")
  }
}