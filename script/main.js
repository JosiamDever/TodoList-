const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const cancelBtn = document.getElementById('cancelBtn');
const taskContainer = document.getElementById('taskContainer');

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
  checkInput.addEventListener('change', () => {
    
    taskCard.classList.toggle('taskDone'); 
    
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
    
    console.log(taskCard.classList.contains('fadeIn')); 
    
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