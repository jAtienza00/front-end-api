window.onload = iniciar;
function iniciar() {
  let iniciado = obtenerCookie("iniciado");
  if (iniciado >= 0) {
    window.location.href = "../"+url+"eGYM.html";
  }
  document.getElementById("boton").addEventListener("click", (ev) => {
    ev.preventDefault();
    let values = [];
    let input = document.getElementsByTagName("input");
    for (let i = 0; i < input.length; i++) {
      values[input[i].id] = input[i].value;
    }
    if (values["confirm-contrasenia"] !== undefined) {
      registrarse(values);
      return;
    }
    iniciarSesion(values);
  });
}
async function registrarse(values) {
  try {
    const response = await fetch(urlUsu , {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: values["nombre"],
        contrasenia: values["contrasenia"],
      }),
    });
    let json = await response.json();
    if (json["creado"] === true) {
      alert("registro exitoso");
      window.location.href = "../"+url+"index.html";
      return;
    }
    error("registrandote");
  } catch (e) {
    error("registrandote");
  }
}

async function iniciarSesion(values) {
  try {
    const response = await fetch(
      urlUsu + "?contrasenia=" +
        values["contrasenia"] +
        "&nombre=" +
        values["nombre"],
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    data = await response.json();
    if (data["encontrado"] === true) {
        document.cookie = `iniciado=${data.id}; path=/; max-age=${60 * 60 * 24}`;
      window.location.href = "../"+url+"eGYM.html";
      return;
    }
    error("registrandote");
  } catch (e) {
    error("registrandote");
  }
}
function error(mensaje) {
  let letrero = document.createElement("div");
  letrero.innerHTML =
    "<h3>Error al intentar " +
    mensaje +
    "</h3> <p>Por favor, intenta de nuevo.</p>";
  letrero.style.position = "fixed";
  letrero.style.top = "20px";
  letrero.style.width = "auto";
  letrero.style.height = "auto";
  letrero.style.backgroundColor = "white";
  letrero.style.color = "black";
  letrero.style.zIndex = "9999";
  letrero.style.padding = "20px";
  letrero.style.borderRadius = "20px";
  letrero.style.boxShadow = "0px 0px 10px rgba(105,105,105)";
  document.getElementsByTagName("body")[0].appendChild(letrero);
  setTimeout(() => {
    letrero.remove();
  }, 3000);
}

function nombreREG(nombre) {
  return /^[a-zA-Z0-9]{4,20}$/.test(nombre);
}

function contraseniaREG(contrasenia) {
  return /^[a-zA-Z0-9]{4,20}$/.test(contrasenia);
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
