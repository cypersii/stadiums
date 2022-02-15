const html=document.querySelector('html');
const num=document.querySelectorAll('.container-main li');
console.log(num.length)
if(num.length<=4){
	html.style.height='100%';
}else{
	html.style.height='max-content'
}
