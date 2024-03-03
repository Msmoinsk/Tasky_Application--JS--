// var state = {
//     tasklist : [
//         {
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
                <button type="button" class="btn btn-outline-info m-2" name=${id}>
                    <i class="fa-solid fa-pencil" name=${id}></i>
                </button>
                <button type="button" class="btn btn-outline-danger m-2" name=${id}>
                    <i class="fa-solid fa-trash-can" name=${id}></i>
                </button>
            </div>

            <div class="card-body d-flex flex-column">
                ${
                    url 
                    ? `<img width='100%' src='${url}' alt='Card Image' class='card-img-top rounded-lg' />`
                    : `<img width='100%' height='150px' style="object-fit: cover; object-position: center"  src="https://tse3.mm.bing.net/th?id=OIP.LZsJaVHEsECjt_hv1KrtbAHaHa&pid=Api&P=0" alt='card image cap' class='card-image-top md-3 rounded-lg' />`
                }
                <h4 class="card-title task__card__title">${title}</h4>
                <p class="descriptions text-muted">${description}</p>
                <div class="Type text-white d-flex flex-wrap">
                    <span class="badge rounded-pill text-bg-primary">${type}</span>
                </div>
            </div>

            <div class="card-footer">
                <button type="button" class="btn btn-outline-primary float-right" data-bs-toggle="modal" data-bs-target="#openModel">Open Task</button>
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
                ? `<img width='100%' src='${url}' alt='Card Image' class='card-img-top rounded-lg' />`
                : `<img width='100%' height='150px' style="object-fit: cover; object-position: center"  src="https://tse3.mm.bing.net/th?id=OIP.LZsJaVHEsECjt_hv1KrtbAHaHa&pid=Api&P=0" alt='card image cap' class='card-image-top md-3 rounded-lg' />`
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