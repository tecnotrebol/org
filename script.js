// CONFIGURACIÓN FIREBASE
const firebaseConfig = { databaseURL: "https://tecnotrebol-67a34-default-rtdb.firebaseio.com" };
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

let productos = [];
const numeroWhatsapp = "584244649564";

// ESCUCHAR CAMBIOS EN LA BASE DE DATOS
db.ref("productos").orderByChild("posicion").on("value", snapshot => {
    productos = [];
    snapshot.forEach(child => {
        productos.push({ id: child.key, ...child.val() });
    });
    mostrar(productos);
});

// FUNCIÓN PARA RENDERIZAR PRODUCTOS
function mostrar(lista) {
    const div = document.getElementById("productos");
    const listaVisible = lista.filter(p => p.visible !== false);

    div.innerHTML = listaVisible.map(p => {
        const mensaje = encodeURIComponent(`Hola Tecno Trebol, me interesa obtener información sobre: ${p.nombre}`);
        const linkWhatsapp = `https://wa.me/${numeroWhatsapp}?text=${mensaje}`;

        return `
        <div class="card" onclick="ver('${p.id}')">
            <img src="${p.foto}" alt="${p.nombre}">
            <h3>${p.nombre}</h3>
            <div class="price">${p.precio}</div>
            <a class="btn-whatsapp-card" href="${linkWhatsapp}" target="_blank" onclick="event.stopPropagation()">
                <i class="fab fa-whatsapp"></i> WhatsApp
            </a>
        </div>`;
    }).join('');
}

// BUSCADOR
function buscarProducto() {
    const f = document.getElementById("busquedaInput").value.toLowerCase();
    mostrar(productos.filter(p => p.nombre.toLowerCase().includes(f)));
}

// VER DETALLE (MODAL)
function ver(id) {
    const p = productos.find(i => i.id === id);
    if(p) {
        const mensaje = encodeURIComponent(`Hola Tecno Trebol, quiero más información sobre el producto: ¿${p.nombre}?`);
        document.getElementById("mNombre").textContent = p.nombre;
        document.getElementById("mFoto").src = p.foto;
        document.getElementById("mDesc").textContent = p.descripcion || "";
        document.getElementById("mPrecio").textContent = p.precio;
        document.getElementById("mBtnWhatsapp").href = `https://wa.me/${numeroWhatsapp}?text=${mensaje}`;
        document.getElementById("modalDetalle").style.display = "flex";
        document.body.style.overflow = "hidden";
    }
}

// CERRAR MODAL
function cerrar() { 
    document.getElementById("modalDetalle").style.display = "none"; 
    document.body.style.overflow = "auto";
}

// PROTECCIÓN EXTRA: Bloquea clic derecho para dificultar copia rápida
document.addEventListener('contextmenu', e => e.preventDefault());
