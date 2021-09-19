import {data} from '../data/data.js';


const templateCard = document.getElementById('templateCard').content;
const fragment = document.createDocumentFragment();
const items = document.getElementById('items');
const detail = document.getElementById('detail');
const shoppingList = document.getElementById('shoppingList');
const totalList = document.getElementById('totalList');
let hero = { };
let shoppingCart = [];


document.addEventListener('DOMContentLoaded', () => {

    loadData(data);
})


const loadData = data => {

   data.forEach(hero => {

       const {id,superhero,image} = hero;

       templateCard.querySelector('h5').textContent = superhero;
       templateCard.querySelector('img').setAttribute('src',image);
       templateCard.querySelector('img').dataset.id = id;

       const clone = templateCard.cloneNode(true);

       fragment.appendChild(clone)
   } )


   items.appendChild(fragment);
}



form.addEventListener('submit', () => {
           

    let inputName = document.querySelector('#inputName').value;
    let email = document.querySelector('#email').value;
    let gender = document.querySelector('#gender').value
    let message = document.querySelector('#msm').value;


    if(inputName=="" || email=="" || gender=="" || message==""){
         alert('Ingresar todos los campos');
         return true;
    }
    else{
        if(isNaN(inputName)){
            localStorage.setItem("Name", inputName);
            localStorage.setItem("Email", email);
            localStorage.setItem("Gender", gender);
            localStorage.setItem("Message", message);
            getLocalStorage();
        }else{
             alert("Name most string");
        }
        return false;
    }

    
})


function getLocalStorage(){
    let nameSave = localStorage.getItem("Name");
    let emailSave = localStorage.getItem("Email");
    let genderSave = localStorage.getItem("Gender");
    let messageSave = localStorage.getItem("Message");
    alert(`The information stored is: ${nameSave} 
    ${emailSave}
    ${genderSave}
    ${messageSave}`);
}




items.addEventListener('click', e => {

   let idTarget = e.target.dataset.id;
   

   data.forEach(hero => {

       const {id,name,superhero,publisher,alter_ego,first_appearance,image,price} = hero;

       if(id == idTarget){

           const objeto = {
               id: id,
               name: name,
               superhero: superhero,
               publisher: publisher,
               alter_ego: alter_ego,
               first_appearance: first_appearance,
               image: image,
               price: price
           }
           

           localStorage.setItem("Hero",JSON.stringify(objeto));
           getSuperHero();
           shoppingCart.push(objeto);
           localStorage.setItem('shoppingCart',JSON.stringify(shoppingCart));
           shoppingCartList();
       }   
   })
   e.stopPropagation();
   e.preventDefault();
})


function getSuperHero(){
    detail.innerHTML = '';

    hero = JSON.parse(localStorage.getItem("Hero")); 

    const {superhero,publisher,alter_ego,first_appearance,image,price} = hero;
  
    detail.innerHTML = `
    <table border="2px" align="center">
    <tr>
        <td rowspan="3"><img src="${image}"  width="400" height="500"></td>
        <td align="center">
         <h2>${superhero}</h2>
         <h4>${publisher}</h4>
         <h5>${alter_ego}</h5>
         <h5>${first_appearance}</h5>
         <h5>${price}</h5>
        </td>
    </tr>
</table>
    `
}


const shoppingCartList = () => {
    shoppingList.innerHTML = '';
    let total = 0;
    let totalInt = 0;
    shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
    shoppingCart === null ? ( shoppingCart = []) : (
        shoppingCart.forEach(element => {
            totalInt += element.price;
            shoppingList.innerHTML += 
            `<br> <br>
         <div width="100" height="100" align="center">
         <span>${element.superhero}</span>
         <span>${element.price}</span>
         <span><button id="${element.id}">x</button></span><br>
         </div>`
         total = totalInt;
        })
    )
    getTotal(total);
}

function getTotal(total){
    totalList.innerHTML = '';
    totalList.innerHTML = `<h1 align="center">Total a pagar ${total}</h1>`
    localStorage.setItem('Total',total)
}

shoppingList.addEventListener('click', (e) =>{
    e.preventDefault();

   if(e.target.innerHTML == 'x'){
        let id = e.target.id;
        deleteHero(id);
   }

})


function deleteHero(idI){
    let indexArreglo;

    shoppingCart.forEach((elemento,index) =>{
        if(elemento.id==idI)
        indexArreglo = index;
    })
    
   shoppingCart.splice(indexArreglo,1);
    localStorage.setItem('shoppingCart',JSON.stringify(shoppingCart));
    shoppingCartList();
}
