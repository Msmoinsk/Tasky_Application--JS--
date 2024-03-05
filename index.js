// var state = {
//     tasklist : [
//         {
//             id : 01 
//             image_url : "",
//             task_title : "",
//             task_type : "",
//             task_desc : ""
//         }
//     ]
// }

// STARTING OF THE MAIN LOGIC------------------------------------------------------------------

// DOM Operations here.......................
const taskContent = document.querySelector('.task__contents');
const taskBody = document.querySelector('.task__modal__body');

// This is for understanding purpose
// console.log(taskContent)
// console.log(taskBody)

// Template for the cards on screen
// `` - this is just like the {} but i used it for HTML writing
const htmlTaskContent = ({ id, title, description, type, url}) => `
    <div class="col-sm-6 col-md-4 col-lg-3 mt-3" id=${id} key=${id}>
        <div class="card shadow task__card">

            <div class="card-header d-flex justify-content-end task__card__header">
                <button type="button" class="btn btn-outline-primary m-2" name=${id} onclick="EditTask()">
                    <i class="fa-solid fa-pencil" name=${id}></i>
                </button>
                <button type="button" class="btn btn-outline-danger m-2" name=${id} onclick="DeleteTask()">
                    <i class="fa-solid fa-trash-can" name=${id}></i>
                </button>
            </div>

            <div class="card-body d-flex flex-column">
                ${
                    url 
                    ? `<img width='100%' height='150px' style="object-fit: cover; object-position: center"  src='${url}' alt='Card Image' class='card-img-top rounded-lg' />`
                    : `<img width='100%' height='150px' style="object-fit: cover; object-position: center"  src="https://tse3.mm.bing.net/th?id=OIP.LZsJaVHEsECjt_hv1KrtbAHaHa&pid=Api&P=0" alt='card image cap' class='card-image-top md-3 rounded-lg' />`
                }
                <h4 class="card-title task__card__title">${title}</h4>
                <p class="descriptions text-muted">${description}</p>
                <div class="Type text-white d-flex flex-wrap">
                    <span class="badge rounded-pill text-bg-primary"><b>${type}</b></span>
                </div>
            </div>

            <div class="card-footer">
                <button type="button" class="btn btn-outline-primary float-right" data-bs-toggle="modal" data-bs-target="#openModel" id="${id}" onclick="OpenTask()">Open Task</button>
            </div>

        </div>
    </div>
`;

// Modal body on >> Click Of open
const htmlModelContent = ({ id, title, description, url}) => {
    const date = new Date(parseInt(id));
    return `
        <div id=${id}>
            ${
                url 
                ? `<img width='100%' height='100%' style="object-fit: cover; object-position: center"  src='${url}' alt='Card Image' class='card-img-top rounded-lg' />`
                : `<img width='100%' height='100%' style="object-fit: cover; object-position: center"  src="https://tse3.mm.bing.net/th?id=OIP.LZsJaVHEsECjt_hv1KrtbAHaHa&pid=Api&P=0" alt='card image cap' class='card-image-top md-3 rounded-lg' />`
            }
            <strong class="text-muted text-sm">Created on : ${date.toDateString()}</strong>
            <h3 class="my-3">${title}</h3>
            <p class="text-muted">${description}</p>
        </div>
    `
};

// 1. Building the Cards logic [ Main Storage ]
// Its a BACKUP storage
const state = {
    tasklist : [],
};

// 2. its a PRIMARY storage
// if the localStorage is cleared then their will be no data
const updateLocalStorage = () => {
    localStorage.setItem(
        'task',
        JSON.stringify({
            tasks : state.tasklist,
        })
    )
}

// 3. Load the data & insert to the [STATE] variable
// It will Work after reload : as it help to keep data permanent
const LoadInitialData = () => {
    const localStorageCopy = JSON.parse(localStorage.getItem('task'))
    if(localStorageCopy) state.tasklist = localStorageCopy.tasks;

    state.tasklist.map((cardDate) => {
        taskContent.insertAdjacentHTML("beforeend",htmlTaskContent(cardDate))
    })
}

// 4. Onn Button Click Funcion
// When the card data given :===> Submit
const handleSubmit = (event) => {
    const id = `${Date.now()}`;
    const input = {
        url: document.getElementById('imageurl').value,
        title: document.getElementById('Title').value,
        type: document.getElementById('Type').value,
        description: document.getElementById('Description').value
    }

    // display in front of ui
    taskContent.insertAdjacentHTML("beforeend",htmlTaskContent({
        id,
        ...input
    }))
    // Backup data 
    state.tasklist.push({...input, id})

    // adding it to localStorage
    updateLocalStorage();
}

// 5. Call LoadInitialData when the page loads
window.addEventListener('load', LoadInitialData);

// 6. Open the Task Modal
// e => is the evant (Name for argument)
const OpenTask = (e) => {
    if(!e) e = window.event;

    const getTask = state.tasklist.find(
        ({id}) => id === e.target.id
    );
    taskBody.innerHTML = htmlModelContent(getTask)
}

// 7. Delete the Task card
// e.target = give the tag name (full)
const DeleteTask = (e) => {
    if(!e) e = window.event;

    // Calling the attribute name="${id}"
    const taskid = e.target.getAttribute("name")
    // console.log(taskid);

    // This is to check what tag is trigers 
    const type = e.target.tagName;
    console.log(type)

    // By this the button behave weird on the mobile and PC
    // In PC button only wrok if the Icon is clicked not the border

    // The Below Function filter : give the array where Taskid value is not their 
    const removeTask = state.tasklist.filter(
        ({id}) => id !== taskid
    );
    state.tasklist = removeTask
    updateLocalStorage();

    // Its explations
    // 1. We are Bounsing back to the main container [ class : task__content ]
    // 2. From that we say toh remove all the parent nodes associated with the child node i.e button
    // 3. we also did the same for the [ i : tag ] but 1 (.parentNode) was added
    // hence this will delete the card on the spot  
    if(type === "BUTTON"){
        return e.target.parentNode.parentNode.parentNode.parentNode.removeChild(
            e.target.parentNode.parentNode.parentNode
        );
    }
    else{
        return e.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(
            e.target.parentNode.parentNode.parentNode.parentNode
    );
    }
};

// 8. Edit Task 
const EditTask = (e) => {
    if(!e) e = window.event;

    const targetId = e.target.id
    const type = e.target.tagName

    // These variable will be used to add the info of particular tags
    let parentnode;
    let task_title;
    let task_description;
    let task_type;
    let SubmitButton;

    if(type === "BUTTON"){
        parentnode = e.target.parentNode.parentNode;
    }
    else{
        parentnode = e.target.parentNode.parentNode.parentNode;
    }

    // let tasktitle = parentnode.childNodes[5].childNodes[1]
    // console.log(tasktitle);

    // We are accessing the Tags By going back to the to parent node and then assecing ht echild node
    // NOTE : that the [ childNodes[3] ] []=> it only takes odd to access the desired tags
    task_title = parentnode.childNodes[3].childNodes[3]
    task_description = parentnode.childNodes[3].childNodes[5]
    
    // Type upgraded : As the issue is whole span tag gets deleted if user Remove the text 
    // so i inserted the <b></b> to correct it
    task_type = parentnode.childNodes[3].childNodes[7].childNodes[1].childNodes[0]
    console.log(task_type);

    SubmitButton = parentnode.childNodes[5].childNodes[1]

    // Set attribute
    task_title.setAttribute("contenteditable", "true")
    task_description.setAttribute("contenteditable", "true")
    task_type.setAttribute("contenteditable", "true")

    // Submit
    SubmitButton.setAttribute('onclick', 'saveEdit()')
    // This change the atttribute in the button wherre [ opentask() is defined ]
    SubmitButton.removeAttribute("data-bs-toggle")
    SubmitButton.removeAttribute("data-bs-target")
    SubmitButton.innerHTML = "Save Changes"
}

// 9. Save changes : this only trigers when the edit button clicked
const saveEdit = (e) => {
    if(!e) e = window.event;

    const targetId = e.target.id

    const parentnode = e.target.parentNode.parentNode;
    const task_title = parentnode.childNodes[3].childNodes[3]
    const task_description = parentnode.childNodes[3].childNodes[5]
    const task_type = parentnode.childNodes[3].childNodes[7].childNodes[1].childNodes[0]

    const SubmitButton = parentnode.childNodes[5].childNodes[1]

    // This will add the Changed data to the local and state Storage
    const updateData = {
        taskTitle : task_title.innerHTML,
        taskDescription : task_description.innerHTML,
        taskType : task_type.innerHTML
    };
    let stateCopy = state.tasklist;
    stateCopy = stateCopy.map(
        (old_task) => old_task.id === targetId 
        ? {
            id : old_task.id,
            url : old_task.url,
            title : updateData.taskTitle,
            type : updateData.taskType,
            description : updateData.taskDescription
        }
        :old_task
    );
    state.tasklist = stateCopy
    updateLocalStorage()
    

    task_title.setAttribute("contenteditable", "false")
    task_description.setAttribute("contenteditable", "false")
    task_type.setAttribute("contenteditable", "false")

    // Submit
    SubmitButton.setAttribute('onclick', 'OpenTask()')
    // This change the atttribute in the button wherre [ opentask() is defined ]
    SubmitButton.setAttribute("data-bs-toggle", "modal")
    SubmitButton.setAttribute("data-bs-target", "#openModel")
    SubmitButton.innerHTML = "Open Task"
}

// Search Bsr Logic
const searchBar = (e) => {
    if(!e) e = window.event;

    
    while (taskContent.firstChild) {
        taskContent.removeChild(taskContent.firstChild);
    }

    const resultData = state.tasklist.filter(({ title }) =>
        title.toLowerCase().includes(e.target.value.toLowerCase())
    );

    resultData.map((cardData) =>
        taskContent.insertAdjacentHTML("beforeend", htmlTaskContent(cardData))
    );
}