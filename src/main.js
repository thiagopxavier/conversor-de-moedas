import Swal from 'sweetalert2';

const searchButton = document.querySelector('.search-btn');
const coinInput = document.querySelector('#coint-input');
const coinsList = document.querySelector('.coins');



function fetchAPI(coin){
  const url = `https://api.exchangerate.host/latest?base=${coin}`
  return fetch(url)
  .then(response => response.json())
  .then(data => {
    if(data.base !== coin) {
      throw new Error('Moeda não existente')
    }
    return data.rates
  })
}

function renderCoins(coins) {
  coinsList.innerHTML = '';

  const coinsArray = Object.entries(coins)
  console.log(coinsArray)

  coinsArray.forEach((coin) => {
    const [coinName, value] = coin;
    const li = document.createElement('li');
    li.textContent = `${coinName} - ${value}`;
    coinsList.appendChild(li)
  })

}


function handleSearch(){
  const coin = coinInput.value.toUpperCase();

  if(!coin) {
    return Swal.fire({
      icon: 'error',
      title: 'Opsss',
      text: 'Digite uma moeda'
    })
  }
  fetchAPI(coin)
  .then(renderCoins)
  .catch(error => {
    return Swal.fire({
      icon: 'error',
      title: 'Opsss',
      text: error.message
    })
  })
}



searchButton.addEventListener('click', () => handleSearch())