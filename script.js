// line-through  // ! اضافه هذا الكلاس عند الانتهاء من المهمه


let tasks = [

]


tasks =JSON.parse(localStorage.getItem("taskx"))

function filltasks() {
    // التحقق من أن قيمة tasks ليست null قبل استخدامها
    if (tasks !== null) {
        let content = '';
        if (tasks.length == 0) {
            content = `<p style="text-align: center;">لاتوجد مهمة</p>`;
        } else {
            let completedTasksCount = 0; // تهيئة عداد المهام المكتملة
            for (let index = 0; index < tasks.length; index++) {
                const taskloop = tasks[index];
                content += `
                <div class="col-lg-4 col-md-6 col-sm-12 mb-3">
                <div class="card ${taskloop.isDone ? 'text-bg-success' : ''} ms-1">
                    <div class="card-body">
                        <blockquote class="blockquote mb-0">
                        ${taskloop.isDone ? `
                        <p><s>${taskloop.title}</s></p>  
                        ` : `
                        <p>${taskloop.title}</p>
                        `}
                        ${taskloop.isDone ? `
                        <figcaption class="blockquote-footer text-white">${taskloop.date}</figcaption>
                        ` : `
                        <figcaption class="blockquote-footer">${taskloop.date}</figcaption>
                        `}
            <div class="btn-group mt-2" role="group" aria-label="Basic example">
                ${taskloop.isDone ? `
                <button onclick="isdone(${index})" type="button" class="btn btn-success btn-dark me-2"><i class="fa-solid fa-minus"></i></button>
                ` : `
                <button onclick="isdone(${index})" type="button" class="btn btn-success btn-success me-2"><i class="fa-solid fa-check"></i></button>
                `}
                <button onclick="edittask(${index})" type="button" class="btn btn-secondary me-2"><i class="fas fa-pencil-alt"></i></button>
                <button onclick="deletask(${index})" type="button" class="btn btn-danger me-2"><i class="fas fa-trash"></i></button>
            </div>
        </blockquote>
    </div>
</div>
</div>


                `;
                // تحديث عداد المهام المكتملة إذا كانت المهمة قد تمت
                if(taskloop.isDone) {
                    completedTasksCount++;
                }            }
                document.querySelector("#completedTasksCount").textContent = completedTasksCount;

        }
        document.getElementById("tbody").innerHTML = content;
            if (tasks.length > 1) {
                document.getElementById("all_dalet").classList.remove('disabled');
        
            } else {
                document.getElementById("all_dalet").classList.add('disabled');
            }
    } else {
        // إذا كانت tasks تساوي null، قم بتهيئتها بمصفوفة فارغة
        tasks = [];
    }
}

function fcompletedTasksCount(){
    let completedTasksCount = tasks.filter(task => task.isDone).length;
    let asksCount = tasks.length
    document.getElementById("completedTasksCount").textContent = `${completedTasksCount} من ${asksCount}`;
}







filltasks()



document.getElementById("allertq").innerHTML = `
    <div id="myAlert" class="alert alert-warning alert-dismissible fade " role="alert">
        بياناتك تُخزَّن محليًا في متصفحك، ولا تُرسل عبر الإنترنت. هذا يجعل الوصول إليها سريعًا ويحافظ على خصوصيتك <a href="https://ar.wikipedia.org/wiki/%D8%AA%D8%AE%D8%B2%D9%8A%D9%86_%D8%A7%D9%84%D9%88%D9%8A%D8%A8" class="alert-link" target="_blank">تعرف على المزيد</a>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
`;
setTimeout(function() {
    document.getElementById("myAlert").classList.add('show');
}, 2500);




// *?---------------------------------- C

document.getElementById("add_btn").addEventListener("click", function() {
    let now = new Date();
    let date = now.getDate() + "/" + (now.getMonth() + 1) + "/" + now.getFullYear();
    let taskname = prompt("الرجاء إدخال عنوان المهمة");
    
    // إذا كانت السلسلة غير فارغة بعد إزالة الفراغات
    if (taskname.trim().length > 0) {
        let taskobj = {
            "title" : taskname.trim(),
            "date": date,
            "isDone": false
        };
        tasks.push(taskobj);
        // *?---------------------------------- التخزين
        stortasks();
        filltasks();
        fcompletedTasksCount()
    } else {
        alert("الرجاء إدخال عنوان للمهمة. لا يمكن ترك الحقل فارغًا")
        }
});




// *?---------------------------------- D

    function deletask(index){
        let taskalert = tasks[index];
        let confirms = confirm("هل انت متاكد من حذف : " + taskalert.title)
        if(confirms){
            tasks.splice(index,1)
            stortasks()
            filltasks()
            fcompletedTasksCount()
            
        }
    }

// *?---------------------------------- U

function edittask(index){
    let taskalert = tasks[index];
    let newtasknema = prompt("الرجاء كتابة عنوان المهمة الجديدة" , taskalert.title)
    if (newtasknema.trim().length > 0) {
        taskalert.title = newtasknema.trim(); // تعديل هنا
        stortasks()
        filltasks();
        fcompletedTasksCount()
    } else {
        alert("الرجاء إدخال عنوان للمهمة. لا يمكن ترك الحقل فارغًا")
    }
}


// *?---------------------------------- حذف جميع المهام

document.getElementById("all_dalet").addEventListener("click", function(){
    let all_dalet = confirm("هل انت متاكد من حذف جميع المهام!!")
    if(all_dalet){
        tasks = [];
        stortasks()
        filltasks();
        fcompletedTasksCount()
    }
    })


// *?---------------------------------- done


function isdone(index){
    let task = tasks[index]
    if(task.isDone){
        task.isDone = false
    
    }else{
        task.isDone = true
    
    }
    stortasks()
    filltasks();
    fcompletedTasksCount()
}


// *=========================taskstring function
function stortasks(){
    let taskstring = JSON.stringify(tasks)
    localStorage.setItem("taskx",taskstring)
}