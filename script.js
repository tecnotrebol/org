// ... (resto del código igual)

// FUNCIÓN PARA RENDERIZAR PRODUCTOS ACTUALIZADA
function mostrar(lista) {
    const div = document.getElementById("productos");
    const listaVisible = lista.filter(p => p.visible !== false);

    div.innerHTML = listaVisible.map(p => {
        const mensaje = encodeURIComponent(`Hola Tecno Trebol, me interesa obtener información sobre: ${p.nombre}`);
        const linkWhatsapp = `https://wa.me/${numeroWhatsapp}?text=${mensaje}`;
        
        // --- LÓGICA DE OFERTA ---
        const esOferta = p.enOferta === true;
        // ------------------------

        return `
        <div class="card" onclick="ver('${p.id}')">
            ${esOferta ? `<div class="badge-oferta">-${p.oferta}%</div>` : ''}
            <img src="${p.foto}" alt="${p.nombre}">
            <h3>${p.nombre}</h3>
            
            <div class="price">
                ${esOferta ? `<span class="old-price">${p.precioAnterior}</span>` : ''}
                ${p.precio}
            </div>
            
            <a class="btn-whatsapp-card" href="${linkWhatsapp}" target="_blank" onclick="event.stopPropagation()">
                <i class="fab fa-whatsapp"></i> WhatsApp
            </a>
        </div>`;
    }).join('');
}

// ... (función buscarProducto)

// VER DETALLE (MODAL) ACTUALIZADO
function ver(id) {
    const p = productos.find(i => i.id === id);
    if(p) {
        const mensaje = encodeURIComponent(`Hola Tecno Trebol, quiero más información sobre el producto: ¿${p.nombre}?`);
        const esOferta = p.enOferta === true; // --- LÓGICA DE OFERTA ---

        document.getElementById("mNombre").textContent = p.nombre;
        document.getElementById("mFoto").src = p.foto;
        document.getElementById("mDesc").textContent = p.descripcion || "";
        
        // --- LÓGICA DE PRECIO EN MODAL ---
        document.getElementById("mPrecio").innerHTML = `
            ${esOferta ? `<span style="text-decoration:line-through; font-size:18px; color:#999; margin-right:10px;">${p.precioAnterior}</span>` : ''}
            ${p.precio}
        `;
        // ---------------------------------

        document.getElementById("mBtnWhatsapp").href = `https://wa.me/${numeroWhatsapp}?text=${mensaje}`;
        document.getElementById("modalDetalle").style.display = "flex";
        document.body.style.overflow = "hidden";
    }
}
// ... (resto del código)
