const quoteText = document.querySelector('.quoteText')

const apiKey = 'PRmJBgugNyEQvxv2qpOxwQ==sacpzTcVI958h3C1' 

fetch('https://api.api-ninjas.com/v1/quotes', {
  
  method: 'GET',
  headers: {
    'X-Api-Key': apiKey
  }
  
})
  
  .then(response => {
    if(!response.ok){
      throw new Error('Resquest error!'); 
    }; 
    return response.json();
  })
  
  .then(data => { 
    const quote = data[0].quote;
    
    
  })
  
  .catch(error => {
    console.error(error); 
  }); 

