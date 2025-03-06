window.onload = async function () {
  let iniciado = obtenerCookie("iniciado");
  if (iniciado === -1) {
    window.location.href = "../" + url + "index.html";
  }
  let saludo = document.getElementById("saludo");
  let nombre = await obtenerNombre(iniciado);
  saludo.innerText += " " + nombre + "!";
  if (localStorage.getItem("cookies")) {
    document
      .getElementsByTagName("body")[0]
      .removeChild(document.getElementById("cookie-banner"));
  }
  try {
    clases(iniciado);
  } catch (error) {
    
  } 
};


function mostrarNav() {
  let div = document.createElement("div");
  div.classList =
    "navCollapsado d-flex text-center justify-content-center flex-column position-fixed w-50 h-100 top-0 end-0 bg-black opacity-75";

  const botonCerrar = document.createElement("button");
  botonCerrar.innerText = "X";
  botonCerrar.classList = "position-absolute text-white p-1 top-0 end-0";

  botonCerrar.onclick = function () {
    div.remove();
  };
  div.appendChild(botonCerrar);
  let lista = document.getElementsByClassName("nav-link");
  let arrayLinks = [];
  let arrayTexto = [];
  for (let i = 0; i < lista.length; i++) {
    arrayLinks.push(lista[i].id);
    arrayTexto.push(lista[i].textContent);
  }
  for (let i = 0; i < lista.length; i++) {
    let a = document.createElement("a");
    a.id = arrayLinks[i];
    a.textContent = arrayTexto[i];
    a.classList = 'redirigir';
    div.appendChild(a);
  }
  document.querySelectorAll('.redirigir').forEach(ele =>{
    ele.addEventListener("click", function(event){
      redirigir(event);
    })
  })
  document.getElementsByTagName("body")[0].appendChild(div);
  div.animate(
    [
      { transform: "translateX(1000px)" },
      { transform: "translateX(900px)" },
      { transform: "translateX(800px)" },
      { transform: "translateX(700px)" },
      { transform: "translateX(600px)" },
      { transform: "translateX(500px)" },
      { transform: "translateX(400px)" },
      { transform: "translateX(300px)" },
      { transform: "translateX(200px)" },
      { transform: "translateX(100px)" },
      { transform: "translateX(0px)" },
    ],
    {
      duration: 1000,
      easing: "ease-in-out",
    }
  );
}

function obtenerCookie(nombre) {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const [key, value] = cookies[i].split("=");

    if (key === nombre) {
      return decodeURIComponent(value);
    }
  }
  return -1;
}

function aceptarCookies() {
  localStorage.setItem("cookies", "aceptadas");
  document
    .getElementsByTagName("body")[0]
    .removeChild(document.getElementById("cookie-banner"));
}

function necesariasCookies() {
  localStorage.setItem("cookies", "necesarias");
  document
    .getElementsByTagName("body")[0]
    .removeChild(document.getElementById("cookie-banner"));
}
async function obtenerNombre(id) {
  try {
    const response = await fetch(urlUsu, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    let nombres = Object.keys(json);

    for (let i = 0; i < nombres.length; i++) {
      if (json[nombres[i]].id === parseInt(id)) {
        return json[nombres[i]].nombre; // Devuelves el nombre directamente
      }
    }
    return "No encontrado"; // Si no se encuentra el ID
  } catch (error) {
    console.error(error);
    return "Error al obtener el nombre"; // En caso de error
  }
}


function aceptarCookies() {
  localStorage.setItem("cookies", "aceptadas");
  document
    .getElementsByTagName("body")[0]
    .removeChild(document.getElementById("cookie-banner"));
}

function necesariasCookies() {
  localStorage.setItem("cookies", "necesarias");
  document
    .getElementsByTagName("body")[0]
    .removeChild(document.getElementById("cookie-banner"));
}

function escuchar() {
  const recognition = new (window.SpeechRecognition ||
    window.webkitSpeechRecognition)();
  recognition.lang = "es-ES";
  recognition.start();
  recognition.onresult = (event) => {
    document.getElementById("buscar").value = event.results[0][0].transcript;
  };
}
