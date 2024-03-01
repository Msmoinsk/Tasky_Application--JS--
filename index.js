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
    <div class="col-md-6 col-lg-4 mt-3" id=${id}>
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
                
            </div>


        </div>
    </div>
`;