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
    return data.filter(item => {
      return item.city.slice(0,query.length).toLowerCase() === query.toLowerCase() ||
      item.state.slice(0,query.length).toLowerCase() === query.toLowerCase();
    });
  }
  
  function initApplication(data){
    const cache = JSON.parse(data);
    const input = document.getElementById('textField')
                          .addEventListener('keyup', (e) => {
                            //call function to compare w/ cache
                            //render new data accordingly
                            const query = e.target.value;
                            queryCache(query,cache);
                          })
  }

  getData(endpoint, initApplication);
})
