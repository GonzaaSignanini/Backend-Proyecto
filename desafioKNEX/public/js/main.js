let socket = io.connect();

const input = document.getElementById("chat-input");
const email = document.getElementById("email-input");
const articulo = document.getElementById("articulo-input");
const precio = document.getElementById("precio-input");
const imagen = document.getElementById("miniatura-input");

//--> recibo del server
socket.on("mensajes", function (msjs) {
  document.getElementById("msjs").innerHTML = msjs
    .map(
      (msj) =>
        `<span style="color:blue"><b>${msj.email}</b></span> <span style="color:brown">[ ${msj.fyh}]</span>: <span style="font-family:italic; color:green">${msj.mensaje}</span>`
    )
    .join("<br>");
});

socket.on("productos", (arts) => {

  document.getElementById("arts").innerHTML =  arts
    .map(
      (art) =>
        ` <tr><td>${art.title}</td><td>$${art.price}</td><td><img class="medicine"
          src="${art.thumbnail}">
          </td></tr> `
    )
    .join("<br>");
});
//<--

//--> envuio al server
document.getElementById("chat-btn").addEventListener("click", () => {
  const fyh = new Date().toLocaleString();
  email.value
    ? socket.emit("mensaje", { msj: input.value, email: email.value, fyh: fyh })
    : alert("Debe ingresar su email");
});

document.getElementById("form-btn").addEventListener("click", () => {
  socket.emit("producto", {
    title: articulo.value,
    price: precio.value,
    thumbnail: imagen.value,
  });
});
//<--