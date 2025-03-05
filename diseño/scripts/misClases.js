async function clases(id = 0) {
    let clases = document.getElementById("clases");
    let data = clases.innerHTML;
    data = await buscarClases();
    clases.innerHTML += data;
    document.querySelectorAll(".clase").forEach(clase => {
        clase.addEventListener("mouseenter", () => {
          clase.getElementsByClassName("textoImg")[0].style.opacity = "100%";
        });
        clase.addEventListener("mouseleave", () => {
          clase.getElementsByClassName("textoImg")[0].style.opacity = "0%";
        });
      })
}
async function buscarClases() {
    let clases = localStorage.getItem("clases");
    if (clases == null ||clases ==='') {
        return '<p class="aling-center">No te has pauntado a ninguna clase <a href="eGYM.html" class="link-secondary link-offset-2 link-underline-opacity-25">a que esperas?</a></p>';
    }
    clases = clases.split("&");
    let datas = await llamarClases(clases);
    return datas;
}

async function llamarClases(clases) {
    try {
        let response = await fetch("../json/clases.json");
        let json = await response.json();
        let nombres = Object.keys(json);
        let data = '';
        let aparecido =0;
        for (let j = 0; j < clases.length; j++) {
            let clase = parseInt(clases[j]);
            for (let i = 0; i < nombres.length; i++) {                
                if (json[nombres[i]].id ===clase) {
                    
                    let x = aparecido;
                    if (aparecido % 3 === 0) {
                        data += '<div class="cont-clase row g-4">';
                    }
                    data += `<div class="col-lg-4 d-flex justify-content-center align-items-center">
            <div class="clase class-card bg-black shadow-lg p-3 rounded position-relative">
                <img src="${json[nombres[i]].imagen}" 
                    alt="Clase ${json[nombres[i]].id
        }" class="imagen img-fluid rounded top-0 left-0 w-100 h-100">
                    
                <div class="textoImg bg-opacity-50 bg-black rounded text-white d-flex flex-column align-items-center justify-content-center position-absolute top-0 start-0 w-100 h-100" style="opacity:0;">
                    <h4 class="mt-3">${json[nombres[i]].name}</h4>
                    <p>${json[nombres[i]].hora} - ${json[nombres[i]].sala}</p>
                    <button class="btn btn-danger" onclick="eliminarClase(${json[nombres[i]].id})">Eliminar</button>
                </div>
            </div>
        </div>`;
                    if (aparecido > x && i % 3 === 0) {
                        data += '</div>';
                    }
                    aparecido++;
                }
            }            
        }
        return data;
    } catch (error) {
        console.error(error)
        return "<h1>Hoy no hay clases</h1>";
    }
}

function eliminarClase(id) {
    let clasesArray = localStorage.getItem("clases").split('&');
    let newClases = [];
    clasesArray.forEach(clase =>{
        if (parseInt(clase) !== parseInt(id)) {
            newClases.push(clase);
        }
    });
    localStorage.setItem('clases', newClases.join('&'));
    document.querySelectorAll('.cont-clase').forEach(obj=> obj.remove());
    clases();
}