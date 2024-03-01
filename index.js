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

const state = {
    tasklist : [],
};

// DOM Operations here.......................
const taskContent = document.querySelector('.task__contents');
const taskBody = document.querySelector('.task__modal__body');

// This is for understanding purpose
// console.log(taskContent)
// console.log(taskBody)

const htmlTaskContent = ({id,title,desription,type,url}) => {}