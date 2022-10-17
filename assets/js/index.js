// EFECTO MAQUINA DE ESCRIBIR //

var typed = new Typed ('.typed', {
    strings : [
        'Daniel'
    ],
    typeSpeed: 200,
    backSpeed: 0,
    loop: true,
    loopCount: false
})

var typed = new Typed ('.typed2', {
    strings : [
        'Daniel Maria'
    ],
    typeSpeed: 150,
    backSpeed: 0,
    loop: true,
    loopCount: false
})

// VALIDACION //

const inputs = document.querySelectorAll('#resultado input');
const button = document.getElementById('button');
const formulario = document.getElementById('resultado');



// Expresiones //
const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Validacion Efectiva //

const ValidacionFormulario = (e) => {
    console.log(e.target.name);
    switch (e.target.name) {
        case "nombre":
            if(expresiones.nombre.test(e.target.value)){
                document.getElementById('nameInput').classList.remove('nombre_red')
            } else {
                document.getElementById('nameInput').classList.add('nombre_red')
            }
        break;
        case "localizacion":
            if(expresiones.nombre.test(e.target.value)){
                document.getElementById('loc').classList.remove('nombre_red');
            } else {
                document.getElementById('loc').classList.add('nombre_red');
            }
        break;
    }
}

// Lectura del teclado //

inputs.forEach((input) => {
    input.addEventListener('keyup', ValidacionFormulario);
    input.addEventListener('blur', ValidacionFormulario);
})

////////////////////////////////////////////////////

// API VARIABLES //

let output = document.getElementById('output');
button.addEventListener('click',predictName);
let nameInput = document.getElementById('nameInput');
nameInput.addEventListener('change',checkName);
let loc = document.getElementById('loc');

function predictName(){
    let url = 'https://api.agify.io?'
    let names = nameInput.value.trim().split(" ")
    let total_names = names.length;
    let names_params = ""
        
    if (output.hasChildNodes()) {
        output.childNodes.forEach(child => output.removeChild(child));
    }
        
        output.innerHTML = 'Procesando, espera un momento ...';
        output.style.display = 'block'; 

        
    for (var name_idx = 0; name_idx < total_names; name_idx++) {
        names_params = names_params + "name[]=" + names[name_idx] + "&"
    }

    let localization = loc.value == "" ? "US" : loc.value
    url = url + names_params + "country_id=" + localization
    console.log(url)

         fetch(url,{ method:'GET'})
         .then(function(response){return response.json();})
         .then(data => {
            //  if (name != '') {
                console.log(data);

    for (var result_idx = 0; result_idx < data.length; result_idx++) {

        var para = document.createElement('p');
        para.textContent = " " +data[result_idx].name + " en " + data[result_idx].country_id +   " tu edad podria ser " + data[result_idx].age;
         output.appendChild(para);
    }

    })
         .catch(err => {
            output.innerHTML = "Opss, :'( algo ha sucedido..." + err;
            console.log(err)
         });
    }

 function checkName(){
     let name = nameInput.value;
     if (name == '') {
        output.style.display = 'none'; 
     }
}