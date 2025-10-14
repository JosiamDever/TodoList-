const quoteText = document.querySelector('.quoteText')

const autorName = document.querySelector('.quoteAuthor')

const apiKey = 'PRmJBgugNyEQvxv2qpOxwQ==sacpzTcVI958h3C1'

function requestQuote(){
  
  const characLimit = 200; 
  
}

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
    
    const fullQuote = data[0];
    
    console.log(fullQuote)
    
    //assigning object data
    quoteText.innerText = `"${fullQuote.quote}"`;
    
    autorName.innerText = fullQuote.author; 
    
  })
  
  .catch(error => {
    console.error(error); 
  }); 

