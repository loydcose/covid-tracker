const table = document.querySelector('.main_table')
const homePage = document.querySelector('.main_grid-wrapper')
const searchContainer = document.querySelector('.search-wrapper')
const mainSection = document.querySelector('.main_section')
const searchInput = searchContainer.firstElementChild
const searchButton = searchContainer.firstElementChild.nextElementSibling
const listsContainer = searchContainer.lastElementChild
let debounceTimeout
const notFoundModal = document.querySelector('.not-found')
const loading = document.querySelector('.loading')
var countries = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  'Anguilla',
  'Antigua & Barbuda',
  'Argentina',
  'Armenia',
  'Aruba',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bermuda',
  'Bhutan',
  'Bolivia',
  'Bosnia & Herzegovina',
  'Botswana',
  'Brazil',
  'British Virgin Islands',
  'Brunei',
  'Bulgaria',
  'Burkina Faso',
  'Burundi',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Cape Verde',
  'Cayman Islands',
  'Central Arfrican Republic',
  'Chad',
  'Chile',
  'China',
  'Colombia',
  'Congo',
  'Cook Islands',
  'Costa Rica',
  'Cote D Ivoire',
  'Croatia',
  'Cuba',
  'Curacao',
  'Cyprus',
  'Czech Republic',
  'Denmark',
  'Djibouti',
  'Dominica',
  'Dominican Republic',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Equatorial Guinea',
  'Eritrea',
  'Estonia',
  'Ethiopia',
  'Falkland Islands',
  'Faroe Islands',
  'Fiji',
  'Finland',
  'France',
  'French Polynesia',
  'French West Indies',
  'Gabon',
  'Gambia',
  'Georgia',
  'Germany',
  'Ghana',
  'Gibraltar',
  'Greece',
  'Greenland',
  'Grenada',
  'Guam',
  'Guatemala',
  'Guernsey',
  'Guinea',
  'Guinea Bissau',
  'Guyana',
  'Haiti',
  'Honduras',
  'Hong Kong',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran',
  'Iraq',
  'Ireland',
  'Isle of Man',
  'Israel',
  'Italy',
  'Jamaica',
  'Japan',
  'Jersey',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Kiribati',
  'Kosovo',
  'Kuwait',
  'Kyrgyzstan',
  'Laos',
  'Latvia',
  'Lebanon',
  'Lesotho',
  'Liberia',
  'Libya',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Macau',
  'Macedonia',
  'Madagascar',
  'Malawi',
  'Malaysia',
  'Maldives',
  'Mali',
  'Malta',
  'Marshall Islands',
  'Mauritania',
  'Mauritius',
  'Mexico',
  'Micronesia',
  'Moldova',
  'Monaco',
  'Mongolia',
  'Montenegro',
  'Montserrat',
  'Morocco',
  'Mozambique',
  'Myanmar',
  'Namibia',
  'Nauro',
  'Nepal',
  'Netherlands',
  'Netherlands Antilles',
  'New Caledonia',
  'New Zealand',
  'Nicaragua',
  'Niger',
  'Nigeria',
  'North Korea',
  'Norway',
  'Oman',
  'Pakistan',
  'Palau',
  'Palestine',
  'Panama',
  'Papua New Guinea',
  'Paraguay',
  'Peru',
  'Philippines',
  'Poland',
  'Portugal',
  'Puerto Rico',
  'Qatar',
  'Reunion',
  'Romania',
  'Russia',
  'Rwanda',
  'Saint Pierre & Miquelon',
  'Samoa',
  'San Marino',
  'Sao Tome and Principe',
  'Saudi Arabia',
  'Senegal',
  'Serbia',
  'Seychelles',
  'Sierra Leone',
  'Singapore',
  'Slovakia',
  'Slovenia',
  'Solomon Islands',
  'Somalia',
  'South Africa',
  'South Korea',
  'South Sudan',
  'Spain',
  'Sri Lanka',
  'St Kitts & Nevis',
  'St Lucia',
  'St Vincent',
  'Sudan',
  'Suriname',
  'Swaziland',
  'Sweden',
  'Switzerland',
  'Syria',
  'Taiwan',
  'Tajikistan',
  'Tanzania',
  'Thailand',
  "Timor L'Este",
  'Togo',
  'Tonga',
  'Trinidad & Tobago',
  'Tunisia',
  'Turkey',
  'Turkmenistan',
  'Turks & Caicos',
  'Tuvalu',
  'Uganda',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'United States of America',
  'Uruguay',
  'Uzbekistan',
  'Vanuatu',
  'Vatican City',
  'Venezuela',
  'Vietnam',
  'Virgin Islands (US)',
  'Yemen',
  'Zambia',
  'Zimbabwe',
]
let globalData
let continentsData

// Fetch two api for the homepage. global and continents
loading.showModal()
const fetchGlobalData = fetch('https://disease.sh/v3/covid-19/all')
const fetchContinentsData = fetch('https://disease.sh/v3/covid-19/continents')
fetchGlobalData
  .then((result) => result.json())
  .then((result) => {
    globalData = result
  })
fetchContinentsData
  .then((result) => result.json())
  .then((result) => {
    continentsData = result
    outputDataToHomePage()
  })

// output contents to homepage using two api fetched earlier
function outputDataToHomePage() {
  const asideSection = document.querySelector('.main_aside-section')
  const mainGridWrapper = document.querySelector('.main_grid-wrapper')
  asideSection.innerHTML = `
  <button type="button" class="main-card card" onclick="globalOutputToTable()">
          <div class="card-title">
            <img src="./images/world.svg" alt="world icon" class="purple-filter" />
            <h2>Global</h2>
          </div>
          <p>${globalData.cases.toLocaleString()}</p>
          <h3>Total Cases</h3>
          <div class="main-card_content">
            <div><span>${globalData.active.toLocaleString()}</span><span>Active</span></div>
            <div><span>${globalData.deaths.toLocaleString()}</span><span>Deaths</span></div>
            <div><span>${globalData.recovered.toLocaleString()}</span><span>Recovered</span></div>
          </div>
        </button>`
  mainGridWrapper.innerHTML = `
  <button type="button" class="card" onclick="globalOutputToTable()">
  <div class="card-title">
    <img src="./images/world.svg" alt="world icon" class="purple-filter" />
    <h2>Global</h2>
  </div>
  <p>${globalData.cases.toLocaleString()}</p>
  <h3>Total Cases</h3>
</button>`
  for (let i = 0; i < continentsData.length; i++) {
    mainGridWrapper.innerHTML += `
  <button type="button" class="card" onclick="continentOutputToTable(this)" data-order="${i}"> 
  <div class="card-title">
    <img src="./images/world.svg" alt="world icon" class="purple-filter" />
    <h2>${continentsData[i].continent}</h2>
  </div>
  <p>${continentsData[i].cases.toLocaleString()}</p>
  <h3>Total Cases</h3>
</button>`
  }
  loading.close()
}

// search scripts, input and button
searchInput.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    requestCountry(searchInput.value)
  }
  searchCountry()
})
searchButton.addEventListener('click', () => {
  requestCountry(searchInput.value)
})

// autocomplete searching and debounce concept applied
function searchCountry() {
  clearTimeout(debounceTimeout)
  listsContainer.innerHTML = ''
  if (!searchInput.value) {
    listsContainer.classList.remove('show-autocomplete')
    return
  }
  debounceTimeout = setTimeout(() => {
    var search = countries.reduce(function (result, item) {
      if (item.toLowerCase().includes(searchInput.value)) {
        result.push(countries[countries.indexOf(item)])
      }
      return result
    }, [])
    for (let i = 0; i < search.length; i++) {
      listsContainer.innerHTML += `<li onclick="selectCountry(this)">${search[i]}</li>`
    }
    listsContainer.classList.add('show-autocomplete')
  }, 200)
}

// toggle table, display none and block
function toggleTable() {
  searchInput.value = ''
  listsContainer.innerHTML = ''
  table.classList.toggle('toggle-table')
  // homePage.classList.toggle('hide')
  mainSection.classList.toggle('toggle-table')
}

// selected autocomplete list will put to input search
function selectCountry(list) {
  searchInput.value = list.textContent
  listsContainer.innerHTML = ''
}

// when global card was clicked
function globalOutputToTable() {
  table.innerHTML = `
  <div class="table_intro">
  <div class="table_name-wrapper">
    <img src="./images/world.svg" alt="globe icon" class="table_globe-icon purple-filter" />
    <p>Global</p>
  </div>
  <div class="table_continent-wrapper">
  </div>
</div>`
  outputDataToTable(globalData)
}

// when any of the continents card was clicked
function continentOutputToTable(thisCard) {
  table.innerHTML = `
  <div class="table_intro">
  <div class="table_name-wrapper">
    <img src="./images/world.svg" alt="globe icon" class="table_globe-icon purple-filter"/>
    <p>${continentsData[thisCard.dataset.order].continent}</p>
  </div>
  <div class="table_continent-wrapper">
  </div>
</div>`
  outputDataToTable(continentsData[thisCard.dataset.order])
}

// use the fetch api for country searching
function requestCountry(country) {
  if (!searchInput.value) return
  loading.showModal()
  const url = `https://disease.sh/v3/covid-19/countries/${country}?strict=true`
  fetch(url)
    .then((result) => {
      if (result.ok) {
        return result.json()
      } else {
        return Promise.reject()
      }
    })
    .then((result) => {
      countryOutputToTable(result)
    })
    .catch(() => {
      loading.close()
      notFoundModal.showModal()
    })
}

// output data to table after country searching
function countryOutputToTable(data) {
  table.innerHTML = `
  <div class="table_intro">
  <div class="table_name-wrapper">
    <img src="${data.countryInfo.flag}" alt="${data.country} flag" />
    <p>${data.country}</p>
  </div>
  <div class="table_continent-wrapper">
    <p>${data.continent}</p>
    <img src="./images/world.svg" alt="world icon" class="purple-filter" />
  </div>
</div>`
  outputDataToTable(data)
}

// output the rest of the data to table
function outputDataToTable(data) {
  table.innerHTML += `
<div class="table_population-wrapper">
  <p>${data.population.toLocaleString()}</p>
  <h3>Total Population</h3>
</div>
<hr />
<div class="table_grid-wrapper">
  <div class="table_datas">
    <p class="table_cell">
      <span class="cell_label">Active</span>
      <span class="cell_number">${data.active.toLocaleString()}</span>
    </p>
    <p class="table_cell">
      <span class="cell_label">Active per 1m</span>
      <span class="cell_number">${data.activePerOneMillion.toLocaleString()}</span>
    </p>
  </div>
  <div class="table_datas">
    <p class="table_cell">
      <span class="cell_label">Cases</span>
      <span class="cell_number">${data.cases.toLocaleString()}</span>
    </p>
    <p class="table_cell">
      <span class="cell_label">Today</span>
      <span class="cell_number">${data.todayCases.toLocaleString()}</span>
    </p>
    <p class="table_cell">
      <span class="cell_label">Cases per 1m</span>
      <span class="cell_number">${data.casesPerOneMillion.toLocaleString()}</span>
    </p>
  </div>
  <div class="table_datas">
    <p class="table_cell">
      <span class="cell_label">Deaths</span>
      <span class="cell_number">${data.deaths.toLocaleString()}</span>
    </p>
    <p class="table_cell">
      <span class="cell_label">Today</span>
      <span class="cell_number">${data.todayDeaths.toLocaleString()}</span>
    </p>
    <p class="table_cell">
      <span class="cell_label">Deaths per 1m</span>
      <span class="cell_number">${data.deathsPerOneMillion.toLocaleString()}</span>
    </p>
  </div>
  <div class="table_datas">
    <p class="table_cell">
      <span class="cell_label">Recovered</span>
      <span class="cell_number">${data.recovered.toLocaleString()}</span>
    </p>
    <p class="table_cell">
      <span class="cell_label">Today</span>
      <span class="cell_number">${data.todayRecovered.toLocaleString()}</span>
    </p>
    <p class="table_cell">
      <span class="cell_label">Recovered per 1m</span>
      <span class="cell_number">${data.recoveredPerOneMillion.toLocaleString()}</span>
    </p>
  </div>
  <div class="table_datas">
    <p class="table_cell">
      <span class="cell_label">Critical</span>
      <span class="cell_number">${data.critical.toLocaleString()}</span>
    </p>
    <p class="table_cell">
      <span class="cell_label">Critical per 1m</span>
      <span class="cell_number">${data.criticalPerOneMillion.toLocaleString()}</span>
    </p>
  </div>
</div>
<div class="table_bottom-section">
  <p class="table_date">Last Updated, ${formatDate(data.updated)}</p>
  <button type="button" onclick="toggleTable()">Back</button>
</div>`
  loading.close()
  toggleTable()
}

// milliseconds to date
function formatDate(n) {
  return new Date(n).toLocaleString()
}

function openModal() {
  loading.showModal()
}

function closeModal(thisButton) {
  thisButton.parentElement.close()
  searchInput.value = ''
}
