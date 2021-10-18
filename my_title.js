const taskContainer=document.querySelector(".task__container")
console.log(taskContainer);
let globalStore=[];

const generateNewCard = (taskData)=> `
<div class="col-sm-12 col-md-6 col-lg-4 " >
<div class="card">
  <h5 class="card-header d-flex justify-content-end gap-2">  <button type="button" class="btn btn-outline-success"><i class="fas fa-pen"></i></button>
    <button type="button" class="btn btn-outline-danger" id=${taskData.id} onclick="deleteCard.apply(this.arguments)" ><i class="fas fa-trash-alt" id=${taskData.id} onclick="deleteCard.apply(this.arguments)"></i></button></h5>
  <div class="card-body">
    <img src=${taskData.imageUrl} class="card-img-top" alt="...">
    <h5 class="card-title mt-3">${taskData.taskTitle}</h5>
    <p class="card-text">${taskData.taskDescription}</p>
    <a href="#" class="btn btn-primary">${taskData.taskType}</a>
  </div>
</div>  
</div>
`;

//delete card

const deleteCard = (event) => {

  event=window.event;
  const targetID=event.target.id;
  const tagName=event.target.tagName;

  globalStore = globalStore.filter((cardObject)=> {cardObject.id !==targetID});

  localStorage.setItem("tasky",JSON.stringify({cards:globalStore}));

  if(tagName==="BUTTON")
  {
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
  }
  else{
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
  }


};

const loadInitialCardData = () => {

  const getCardData = localStorage.getItem("tasky");

  const {cards} = JSON.parse(getCardData);

  cards.map((cardObject)=> {

    taskContainer.insertAdjacentHTML("beforeend",generateNewCard(cardObject));

    globalStore.push(cardObject)

  }
  )
};


const saveChanges = () => {
    const taskData = {
        id:`${Date.now()}`,
        imageUrl : document.getElementById("imageurl").value,
        taskTitle: document.getElementById("tasktitle").value,
        taskType : document.getElementById("tasktype").value,
        taskDescription : document.getElementById("taskdesc").value
    };
    const newCard =`
       <div class="col-sm-12 col-md-6 col-lg-4 " id=${taskData.id}>
        <div class="card">
          <h5 class="card-header d-flex justify-content-end gap-2">  <button type="button" class="btn btn-outline-success"><i class="fas fa-pen"></i></button>
            <button type="button" class="btn btn-outline-danger"><i class="fas fa-trash-alt"></i></button></h5>
          <div class="card-body">
            <img src=${taskData.imageUrl} class="card-img-top" alt="...">
            <h5 class="card-title mt-3">${taskData.taskTitle}</h5>
            <p class="card-text">${taskData.taskDescription}</p>
            <a href="#" class="btn btn-primary">${taskData.taskType}</a>
          </div>
        </div>  
       </div>
    `;
    taskContainer.insertAdjacentHTML("beforeend",generateNewCard(taskData));

    globalStore.push(taskData);
    localStorage.setItem("tasky",JSON.stringify({cards:globalStore}));


};