const firebaseConfig = { databaseURL: "https://tecnotrebol-67a34-default-rtdb.firebaseio.com" };
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

let productos = [];
const numeroWhatsapp = "584244649564";

// Cargar productos de Firebase
db.ref("productos").orderByChild("posicion").on("value", s => {
    productos = [];
    s.forEach(childSnapshot => {
        productos.push({ id: childSnapshot.key, ...childSnapshot.val() });
    });
    mostrar(productos);
});

function mostrar(lista) {
    const div = document.getElementById("productos");
    const listaVisible = lista.filter(p => p.visible !== false);
    div.innerHTML = listaVisible.map(p => {
        const mensaje = encodeURIComponent(`Hola Tecno Trebol, me interesa: ${p.nombre}`);
        return `
        <div class="card" onclick="ver('${p.id}')">
            <img src="${p.foto}" alt="${p.nombre}">
            <h3>${p.nombre}</h3>
            <div class="price">${p.precio}</div>
            <a class="btn-whatsapp-card" href="https://wa.me/${numeroWhatsapp}?text=${mensaje}" target="_blank" onclick="event.stopPropagation()">
                <i class="fab fa-whatsapp"></i> WhatsApp
            </a>
        </div>`;
    }).join('');
}

function buscarProducto() {
    const f = document.getElementById("busquedaInput").value.toLowerCase();
    mostrar(productos.filter(p => p.nombre.toLowerCase().includes(f)));
}

function ver(id) {
    const p = productos.find(i => i.id === id);
    if(p) {
        document.getElementById("mNombre").textContent = p.nombre;
        document.getElementById("mFoto").src = p.foto;
        document.getElementById("mDesc").textContent = p.descripcion || "";
        document.getElementById("mPrecio").textContent = p.precio;
        document.getElementById("mBtnWhatsapp").href = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent('Me interesa: '+p.nombre)}`;
        document.getElementById("modalDetalle").style.display = "flex";
        document.body.style.overflow = "hidden";
    }
}

function cerrar() { 
    document.getElementById("modalDetalle").style.display = "none"; 
    document.body.style.overflow = "auto";
}

// BLOQUEO DE TECLAS (F12, Ctrl+U, Ctrl+C)
document.onkeydown = function(e) {
    if(e.keyCode == 123) return false;
    if(e.ctrlKey && (e.keyCode == 'U'.charCodeAt(0) || e.keyCode == 'C'.charCodeAt(0) || e.keyCode == 'S'.charCodeAt(0))) return false;
};
