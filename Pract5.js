const readMorebtn=document.querySelector('.readmorebutton');
const text=document.querySelector('.text');

readMorebtn.addEventListener('click',(e)=>{
    text.classList.toggle('show-more');
})