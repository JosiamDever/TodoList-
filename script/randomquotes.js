//quote container
import {sideBarCongrats} from '/script/main.js'; 

const quoteText = document.querySelector('.quoteText')

const authorName = document.querySelector('.quoteAuthor')

const apiKey = 'PRmJBgugNyEQvxv2qpOxwQ==sacpzTcVI958h3C1'

//global and flexible variable to define the maximum lenght of each quote by the current screen size 
let characLimit = 150;

function updateCharcLimit(){
  
  if(window.innerWidth > 770){
    
    characLimit = 200;
    
  }else{
    
    characLimit = 150; 
    
  }; 
  
}

//spot on screen rezies just in time:
window.addEventListener('resize', () => {
  
  updateCharcLimit(); 
  
}); 

export async function requestQuote(){
  
  
  
  //this is a promise,it can return a value or a error 
  const respFetch = await fetch('https://api.api-ninjas.com/v1/quotes', {
  
      method: 'GET',
   
      headers: {
        'X-Api-Key': apiKey
      }
  
  });
  
  if(!respFetch.ok){
    throw new Error('request failed'); 
  }
  
  const data = await respFetch.json();
  
  const fullQuote = data[0];
  
  if(fullQuote.quote.trim().length > characLimit){
    
    //fore again the function and ensure that it wont mess the code by other await 
    return await requestQuote(); 
  }
  
  sideBarCongrats.style.display = 'inherit'; 
  
  sideBarCongrats.classList.add('quoteFadeIn'); 
  
  quoteText.innerText = `"${fullQuote.quote}"`;
  
  authorName.innerText = `"${fullQuote.author}"`;
  
  sideBarCongrats.addEventListener('animationend', () => {
    
    sideBarCongrats.classList.remove('quoteFadeIn'); 
    
  }, {once: true}); 
  
}



