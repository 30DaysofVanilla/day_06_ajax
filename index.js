document.addEventListener('DOMContentLoaded', () => {
  const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

  function getData(url, then){
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();

    xhr.onreadystatechange = function(){
      if(xhr.readyState === 4){
        if(xhr.status === 200){
          console.log('GET SUCCESS')
          then(xhr.response);
        } else {
          console.log('error retrieving json data');
        }
      }
    }
  }

  function queryCache(query, data){
    if (!query) return;
    return data.filter(item => {
      return item.city.slice(0,query.length).toLowerCase() === query.toLowerCase() ||
      item.state.slice(0,query.length).toLowerCase() === query.toLowerCase();
    });
  }

  function clear(className){
    const groupByClassName = document.getElementsByClassName(className);
    Array.from(groupByClassName).forEach(el => el.parentNode.removeChild(el));
  }

  function render(data = []){
    clear("place");
    data.forEach(place => {
      const newPlace = document.createElement('p');
      newPlace.innerHTML = place.city + ' , ' + place.state;
      newPlace.className = "place";
      document.body.appendChild(newPlace);
    });
    return true;
  }

  function initApplication(data){
    const cache = JSON.parse(data);
    document.getElementById('textField')
            .addEventListener('keyup', (e) => {
              const query = e.target.value;
              render(queryCache(query,cache));
            });
  }

  getData(endpoint, initApplication);
})
