const btn = document.querySelector(".saveBtn");
const showbox = document.querySelector('.showbox');

let NoDatamsg = document.querySelector('.NoDatamsg');
let currentDate = new Date()

const title = document.querySelector('#title');
const blog = document.querySelector('#blog');
const selectCat = document.querySelector('#selectCategory');

const mUpdtBtn = document.querySelector(".mUpdtBtn")
const mSaveBtn = document.querySelector(".mSaveBtn")

const addBlogBtn=document.querySelector('.addBlogBtn')
  addBlogBtn.addEventListener('click',()=>{
    mUpdtBtn.classList.add('d-none')
    mSaveBtn.classList.remove('d-none')
    title.value=''
    blog.value=''
    selectCat.value='open select'
  })
 

// FOR TIME ADND DATE 
let dd = currentDate.getDate() >= 9 ? currentDate.getDate() : "0" + currentDate.getDate()
let mm = currentDate.getMonth() >= 9 ? "0" + currentDate.getMonth() : currentDate.getMonth()
let yy = currentDate.getFullYear()
let time = currentDate.toLocaleTimeString()


//storing blog in local storage
btn.addEventListener('click', () => {
    


    if (title.value == '') {
        const warnTitle = document.querySelector('.warn-title')
        warnTitle.classList.remove('d-none')
        setTimeout(() => {
            warnTitle.classList.add('d-none')
        }, 3000);
    } else {

        if (blog.value == '') {
            const warnBlog = document.querySelector('.warn-blog')
            warnBlog.classList.remove('d-none')
            setTimeout(() => {
                warnBlog.classList.add('d-none')
            }, 3000);
        } else {

            if (selectCat.value == 'open select') {
                const warnCat = document.querySelector(".warn-cat");
                warnCat.classList.remove('d-none')
                setTimeout(() => {
                    warnCat.classList.add('d-none')

                }, 3000);
            } else {
                const blogData = {
                    title: title.value,
                    blog: blog.value,
                    category: selectCat.value,
                    currentDate: `${dd}-${mm}-${yy}  ${time}`
                };


                let blogs = JSON.parse(localStorage.getItem('blogs')) || [];
                blogs.push(blogData);
                localStorage.setItem('blogs', JSON.stringify(blogs));


                Swal.fire({
                    title: "Insert Successfull",
                    text: "Your Data Is Succesfully Inserted In Database !",
                    icon: "success"
                });
                showblogData();
                title.value = ''
                blog.value = ''
                selectCat.value = 'open select'
            }
        }
    }



});

//  show the data which is store in localstorage

const dltCode = () => {
    const dltBtn = document.querySelectorAll('.dltBtn');

    dltBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            let parent = btn.parentElement.parentElement.parentElement
            let id = parent.getAttribute('id')

            let blog = JSON.parse(localStorage.getItem('blogs'));
            blog.splice(id, 1);
            localStorage.setItem('blogs', JSON.stringify(blog));
            showblogData();
        })
    })
}

//update btn


const updtCode = () => {
    let updtBtn = document.querySelectorAll(".updtBtn")
    updtBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            const parent = btn.parentElement.parentElement.parentElement
            const id = parent.getAttribute('id')
            const upCat = (parent.querySelector('.card-header').innerText)
            const upTitle = (parent.querySelector(".card-title").innerText)
            const upBlog = (parent.querySelector('.card-text').innerText);
            var myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
            myModal.show();

            title.value = upTitle
            blog.value = upBlog
            selectCat.value = upCat


            mUpdtBtn.classList.remove('d-none')
            mSaveBtn.classList.add('d-none')

            mUpdtBtn.addEventListener('click', () => {

                const newData = {

                    title: title.value,
                    blog: blog.value,
                    category: selectCat.value,
                    currentDate: `${dd}-${mm}-${yy}  ${time}`
                }


                let localData = JSON.parse(localStorage.getItem('blogs'))
                localData.splice(id, 1, newData)
                localStorage.setItem('blogs', JSON.stringify(localData))
                Swal.fire({
                    title: "Updated Successful",
                    text: "Your Data Is Updated Successfully In Database",
                    icon: "success"
                });

                showblogData()
                myModal.hide()








            })



        })
    })
}




let BlogArry = [];
const showblogData = () => {

    BlogArry = JSON.parse(localStorage.getItem('blogs'))
    console.log(BlogArry.length);


    if (BlogArry === null) {
        NoDatamsg.classList.remove('d-none')
    } else {


        NoDatamsg.classList.add('d-none')
        showbox.innerHTML = '';
        BlogArry.forEach((data, index) => {
            showbox.innerHTML += `
                    <div class="col-md-4 mb-3" id=${index}>
                        <div class="card text-center">
                            <div class="card-header">
                                ${data.category
                } 
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">${data.title}</h5>
                                <p class="card-text">${data.blog}</p>
                                
                                <a href="#" class="btn mx-2  dltBtn btn-danger">
                                    <box-icon type='outline' name='trash-alt'></box-icon>
                                </a>
                                <a href="#" class="btn updtBtn btn-primary">
                                <box-icon name='cog' type='outline' ></box-icon>
                                </a>
                            </div>
                            <div class="card-footer text-muted ">
                            ${data.currentDate}
                            </div>
                        </div>
                    </div>
    
                `;
            dltCode();
            updtCode();
        })
    }
}
showblogData();



// delete and update coding start here




