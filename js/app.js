//variables
const formulario = document.querySelector('#formulario');
const lista = document.querySelector('#lista-tweets');
let tweets = [];

//event
eventListener();

function eventListener(){
    //cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit',agregarTweet);

    // cuando el documento esta listo

    document.addEventListener('DOMContentLoaded',()=>{
      tweets = JSON.parse(localStorage.getItem('tweets')) || [];



    });


}

//funciones

function agregarTweet(e){
    e.preventDefault();

    const tweet = document.querySelector('#tweet').value;

    if(tweet === ""){
        mostrarError("esta vacio")
        return // evita que se siga ejecutando codigo.
    }

    const tweetObj = {
        id:Date.now(),
        tweet
    }
   
    tweets = [...tweets,tweetObj];

    //crear html

    crearHTML();
    // reiniciar formulario

    formulario.reset();
   



}

function mostrarError(error){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error')

    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError) 
    
    setTimeout(()=>{
mensajeError.remove()
       },2000)
    
}
//muestra el listado de los twits

function crearHTML(){
    limpiarHTML();
    if(tweets.length >= 0){
        tweets.forEach( tweet => {
            //agregar un boton
     const btnEliminar = document.createElement('a');
     btnEliminar.classList.add('borrar-tweet');
     btnEliminar.innerText = "X";

     //añadir la funcion de eliminar

     btnEliminar.onclick = ()=>{
        borrarTweet(tweet.id);
     }


     //crea el html

     let li = document.createElement('li');

     li.innerText = tweet.tweet;

     //asignar boton eliminar
     li.appendChild(btnEliminar);

     lista.appendChild(li)

        });
    }
    sincronizarStorage()
}

//agrega los tweets al storage

function sincronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets))
}

//elimina los twits

function borrarTweet(id){
    
    tweets = tweets.filter(tweet => tweet.id !== id)
    crearHTML();
   

}
function limpiarHTML(){
    while(lista.firstChild){
        lista.removeChild(lista.firstChild)
    }
}

