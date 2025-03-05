async function clases(id) {
  let clases = document.getElementById("clases");
  let data = clases.innerHTML;
  data += await llamarClases();
  clases.innerHTML = data;
  
  document.querySelectorAll(".clase").forEach(clase => {
    clase.addEventListener("mouseenter", () => {
      clase.getElementsByClassName("textoImg")[0].style.opacity = "100%";
    });
    clase.addEventListener("mouseleave", () => {
      clase.getElementsByClassName("textoImg")[0].style.opacity = "0%";
    });
  })
}
async function buscar(event) {
  event.stopPropagation();

  let clasesEliminar = document.querySelectorAll(".contenedor-clase");
  clasesEliminar.forEach(obj => {
    obj.parentElement.removeChild(obj);
  });
  let input = document.getElementById("buscar").value.trim().toLowerCase();
  let clases = document.getElementById("clases");
  let data = clases.innerHTML;
  data += await buscarClases(input);
  clases.innerHTML = data;
}

function escucharClick(id) {
  let mazo = document.querySelector(".icon-size");
  //hacemos la animacion del carro
  mazo.animate(
    [
      { transform: "rotate(10deg)" },
      { transform: "rotate(-20deg)" },
      { transform: "rotate(20deg)" },
      { transform: "rotate(-20deg)" },
      { transform: "rotate(10deg)" }
    ], {
    duration: 1000,
    easing: "ease-in-out",
  }
  );
  if (id !== null && id !== undefined) {
    if (localStorage.getItem("clases") === null) {
      let clases = "&" + id;
      localStorage.setItem("clases", clases);
    } else {
      let clases = localStorage.getItem("clases");
      let arrayClases = clases.split("&");
      if (!arrayClases.includes(id + '')) {
        clases += "&" + id;
      }
      localStorage.setItem("clases", clases);
    }
  }
}

async function llamarClases() {
  try {
    const response = await fetch(urlClases,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
    let json = await response.json();
    let nombres = Object.keys(json);
    let data = '';
    for (let i = 0; i < nombres.length; i++) {
      let j = i;
      if (i % 3 === 0) {
        data += '<div class="contenedor-clase row g-4">';
      }
      data += escribirClase(json, nombres[i]);
      if (i > j && i % 3 === 0) {
        data += "</div>";
      }
    }
    return data;
  } catch (error) {
    console.error(error);
    return "<h1>Hoy no hay clases</h1>";
  }
}

async function buscarClases(input) {
  try {
    const response = await fetch(urlClases,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let json = await response.json();
    let nombres = Object.keys(json);
    let data = '';
    let contador = 0;
    for (let i = 0; i < nombres.length; i++) {
      let id = String(json[nombres[i]].nombres);
      if (id.toLowerCase().includes(input)) {
        let j = contador;
        if (contador % 3 === 0) {
          data += '<div class="contenedor-clase row g-4">';
        }
        data += escribirClase(json, nombres[i]);
        if (contador > j && contador % 3 === 0) {
          data += "</div>";
        }
        contador++;
      }
    }
    return data;
  } catch (error) {
    console.error(error);
    return "<h1>Hoy no hay clases</h1>";
  }
}

function escribirClase(json, nombres) {
  return `<div class="col-lg-4 d-flex justify-content-center align-items-center">
              <div class="clase text-white d-inline-block bg-black shadow-lg p-3 rounded position-relative" onclick="escucharClick(${json[nombres].id})">
                  <img src="${json[nombres].imagen}" 
                      alt="Clase ${json[nombres].nombre}" 
                      class="imagen img-fluid rounded top-0 left-0 w-100 h-100">
                      
                  <div class="textoImg bg-opacity-50 bg-black rounded text-white d-flex flex-column align-items-center justify-content-center position-absolute top-0 start-0 w-100 h-100" style="opacity:0;">
                      <h4 class="mt-3">${json[nombres].nombre}</h4>
                      <p>${json[nombres].hora} - ${json[nombres].sala}</p>
                      <p>¡Apúntate haciendo click!</p>
                  </div>
              </div>
          </div>`;
}

function escucharClick(id) {
  let mazo = document.querySelector(".icon-size");
  //hacemos la animacion del carro
  mazo.animate(
    [
      { transform: "rotate(10deg)" },
      { transform: "rotate(-20deg)" },
      { transform: "rotate(20deg)" },
      { transform: "rotate(-20deg)" },
      { transform: "rotate(10deg)" }
    ], {
    duration: 1000,
    easing: "ease-in-out",
  }
  );
  if (id !== null && id !== undefined) {
    if (localStorage.getItem("clases") === null) {
      let clases = "&" + id;
      localStorage.setItem("clases", clases);
    } else {
      let clases = localStorage.getItem("clases");
      let arrayClases = clases.split("&");
      if (!arrayClases.includes(id + '')) {
        clases += "&" + id;
      }
      localStorage.setItem("clases", clases);
    }
  }
} 

async function buscar(event = null) {
  if (event !== null) {
    event.stopPropagation();    
  }

  let clasesEliminar = document.querySelectorAll(".contenedor-clase");
  clasesEliminar.forEach(obj => {
    obj.parentElement.removeChild(obj);
  });
  let input = document.getElementById("buscar").value.trim().toLowerCase();
  let clases = document.getElementById("clases");
  let data = clases.innerHTML;
  data += await buscarClases(input);
  clases.innerHTML = data;
}

function escuchar() {
  const recognition = new (window.SpeechRecognition ||
    window.webkitSpeechRecognition)();
  recognition.lang = "es-ES";
  recognition.start();
  recognition.onresult = (event) => {
    document.getElementById("buscar").value = event.results[0][0].transcript;
  };
  buscar();
}