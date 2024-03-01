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

// Building the Cards logic
const state = {
    tasklist : [],
};

// DOM Operations here.......................
const taskContent = document.querySelector('.task__contents');
const taskBody = document.querySelector('.task__modal__body');

// This is for understanding purpose
// console.log(taskContent)
// console.log(taskBody)

// Template for the cards on screen
// `` - this is just like the {} but i used it for HTML writing
const htmlTaskContent = ({ id, title, desription, type, url}) => `
    <div class="col-md-6 col-lg-4 mt-3" id=${id} key=${id}>
        <div class="card shadow task__card">

            <div class="card-header d-flex justify-content-end task__card__header">
                <button type="button" class="btn btn-outline-info mr-1.5" name=${id}>
                    <i class="fa-solid fa-pencil" name=${id}></i>
                </button>
                <button type="button" class="btn btn-outline-danger mr-1.5" name=${id}>
                    <i class="fa-solid fa-trash-can" name=${id}></i>
                </button>
            </div>

            <div class="card-body">
                ${
                    url &&
                    `<img width='100%' src='${url}' alt='Card Image' class='card-img-top rounded-lg' />`
                }
                <h4 class="card-title task__card__title">${title}</h4>
                <p class="descriptions trim-3-lines text-muted">${desription}</p>
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
const htmlModelContent = ({ id, title, desription, url}) => {
    const date = new Date(parseInt(id));
    return `
        <div id=${id}>
            ${
                url &&
                `<img width='100%' src='${url}' alt='Card Image' class='img-fluid' place__holder__img mb-3 />`
            }
            <strong class="text-muted text-sm">Created on : ${date.toDateString()}</strong>
            <h3 class="my-3">${title}</h3>
            <p class="text-muted">${desription}</p>
        </div>
    `
};

const updateLocalStorage = () => {
    localStorage.setItem(
        'task',
        JSON.stringify({
            tasks : state.tasklist,
        })
    )
}