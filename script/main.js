const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const cancelBtn = document.getElementById('cancelBtn');
const taskContainer = document.getElementById('taskContainer');

//progressBar variables
let currentLenght = 0 

let tasksAmount = document.querySelector('.task-container').childElementCount;

let percentageIncrease = 0; 

let finishedTask = 0; 

const parentBar = document.querySelector('.progressBarConteiner')

const bar = document.querySelector('.progressBar');

//confetti animation 
function fireConfetti(){
  
  confetti({
    
    //number of pieces of confetti
    particleCount: 100,
    
    //gap default amount 
    spread: 70,
    
    //vertically
    origin: {y: 0.6},
    
    //color mix palette
    colors: ['#00ffff', '#9b5de5', '#6565D7']
    
  }); 
  
};


//confetti sound effect by sound lb
const confettiSound = new Howl({
  
  src: ['/style/sounds/partyhorn.mp3'],
  volume: 0.6
  
});

const sideBarCongrats = document.querySelector('.sideBarSurprise')

//update progress bar by checking
function moreOne(spot){
  if(spot){
    
    if(spot.checked && currentLenght < 100){
      
      currentLenght += percentageIncrease;
      
      bar.style.width = currentLenght + '%';
      
      if(currentLenght >= 100){
        
        fireConfetti(); 
        confettiSound.play();
        
        //handling canvas document raised element(CDN lb)
        const confettiCanvas = document.querySelector('canvas');

        confettiCanvas.classList.add('confettiCanvas')
        
        //sidebar animation slid
        sideBarCongrats.style.display = 'flex';
        
        sideBarCongrats.classList.add('skideToLeft');
        
        sideBarCongrats.addEventListener('animationend', () => {
          
        }); 
        
      }; 
      
      return; 
      
    } else if (!spot.checked && currentLenght > 0) {
      
      currentLenght -= percentageIncrease;
      
      bar.style.width = currentLenght + '%';
      
      return; 
      
    }
    
  };
  
}; 

//spot new tasks(resset the tasks calcute to control the envolviment of the progressbar)
const taskEnter = new MutationObserver(events => {
  
  events.forEach(event => {
    
    currentLenght = 0; 
    
    finishedTask = 0;
    
    tasksAmount = 0; 
    
    if(taskContainer.childElementCount > 0){
      
      parentBar.style.display = "inherit"; 
      
    }else{
      
      parentBar.style.display = 'none';
      
    }
    
    //update tasks amount and finished ones 
    let children = taskContainer.querySelectorAll(':scope > div')
    
      children.forEach(div => {
        
        const checkBox = div.querySelector('input[type="checkbox"]')
        
        if(checkBox.checked){
          
          finishedTask += 1;
          
        }
        
        tasksAmount += 1; 
      
      })
    
    //update progress variables
    bar.style.width = 0 + '%';
    
    percentageIncrease = parseFloat((100 / tasksAmount).toFixed(3));
    
    for(let x = finishedTask;x != 0;x--){
      
      currentLenght += percentageIncrease; 
      
      bar.style.width = currentLenght + '%';
      
    }; 
    
  });
  
})

//update progressbar
taskEnter.observe(taskContainer, {childList: true});

//behavioral function of cancel task btn
function toggleCancel(){
  
  if(cancelBtn.style.display == 'none'){
    
    cancelBtn.style.display = 'inherit'; 
    
  }else{
    
    cancelBtn.style.display = 'none'
    
  }; 
  
};

//add new task 
addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  const taskCard = document.createElement('div');
  taskCard.classList.add('task-card');
  
  const checkInput = document.createElement('input');
  checkInput.type = 'checkbox';
  
  //switch the class which display the task as finished
  checkInput.addEventListener('change', (ee) => {
    
    taskCard.classList.toggle('taskDone');
    
    moreOne(ee.target); 
    
  }); 
  
  checkInput.classList.add('checkBox'); 

  const taskContent = document.createElement('span');
  taskContent.textContent = taskText;
  
  //task content wrapper 
  const divContent = document.createElement('div');
  
  divContent.classList.add('taskContent'); 
  
  divContent.appendChild(checkInput);
  divContent.appendChild(taskContent);
  
  //delete btn
  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = '<i class="fa-solid fa-xmark removeTaskBtn"></i>';
  
  deleteBtn.addEventListener('click', () => {
    
    taskCard.classList.add('fadeOut');
    
    taskCard.addEventListener('animationend', () => {
      
      taskCard.remove()
      
    }, {once: true})
    
  }); 
  
  taskCard.appendChild(divContent);
  taskCard.appendChild(deleteBtn);
  taskContainer.appendChild(taskCard);

  taskInput.value = '';
  cancelBtn.style.display = 'none';
  
  taskCard.classList.add('fadeIn');
  
    taskCard.addEventListener('animationend', () => {
    
    taskCard.classList.remove('fadeIn');
    
  }, {once: true});
  
});

//cancel typing new task
cancelBtn.addEventListener('click', () => {
  taskInput.value = '';
  taskInput.blur();
  cancelBtn.style.display = "none"; 
});

//cancel task setting
taskInput.addEventListener('input', () => {
  
  if(taskInput.value == ''){
    
    cancelBtn.style.display = 'none';
    
  }else{
    
    cancelBtn.style.display = 'inherit'; 
    
  };
  
});
