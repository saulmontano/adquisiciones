const apiUrl = "http://localhost:5000/adquisiciones";
const Urlapi = "http://localhost:5000";

// Función para obtener adquisiciones con filtros aplicados
function fetchAdquisiciones(
  filtroUnidad = "",
  filtroTipo = "",
  filtroFecha = "",
  filtroDocumentacion = "",
  filtroProveedor = ""
) {
  let url = new URL(apiUrl);

  // Agregar parámetros de filtro a la URL si están presentes
  if (filtroUnidad) url.searchParams.append("unidad", filtroUnidad);
  if (filtroTipo) url.searchParams.append("tipo", filtroTipo);
  if (filtroFecha) url.searchParams.append("fecha", filtroFecha);
  if (filtroDocumentacion)
    url.searchParams.append("documentacion", filtroDocumentacion);
  if (filtroProveedor) url.searchParams.append("proveedor", filtroProveedor);
  console.log("URL de la solicitud:", url.toString()); // Agregar este log para depuración

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const adquisicionesContainer =
        document.getElementById("gridAdquisiciones");
      if (adquisicionesContainer) {
        adquisicionesContainer.innerHTML = "";
        data.forEach((adquisicion) => {
          const card = document.createElement("div");
          card.className = "card";
          card.innerHTML = `
            <div class="field">
              <span class="label">Presupuesto:</span>
              <span>${parseFloat(adquisicion.presupuesto) || 0}</span>
            </div>
            <div class="field">
              <span class="label">Unidad:</span>
              <span>${adquisicion.unidad}</span>
            </div>
            <div class="field">
              <span class="label">Tipo:</span>
              <span>${adquisicion.tipo}</span>
            </div>
            <div class="field">
              <span class="label">Cantidad:</span>
              <span>${adquisicion.cantidad}</span>
            </div>
            <div class="field">
              <span class="label">Valor Unitario:</span>
              <span>${adquisicion.valorUnitario}</span>
            </div>
            <div class="field">
              <span class="label">Valor Total:</span>
              <span>${adquisicion.valorTotal}</span>
            </div>
            <div class="field">
              <span class="label">Fecha:</span>
              <span>${new Date(adquisicion.fecha).toLocaleDateString()}</span>
            </div>
            <div class="field">
              <span class="label">Proveedor:</span>
              <span>${adquisicion.proveedor}</span>
            </div>
            <div class="field">
              <span class="label">Documentación:</span>
              <span>${adquisicion.documentacion}</span>
            </div>
            <div class="actions">
              <button onclick="viewHistorial(${
                adquisicion.id
              })">Ver Historial</button>
              <button onclick="editAdquisicion(${
                adquisicion.id
              })">Editar</button>
              <button onclick="deleteAdquisicion(${
                adquisicion.id
              })">Eliminar</button>
            </div>
          `;
          adquisicionesContainer.appendChild(card);
        });
      } else {
        console.error("Contenedor de adquisiciones no encontrado.");
      }
    })
    .catch((error) => console.error("Error fetching adquisiciones:", error));
}

// Función para aplicar los filtros
function aplicarFiltros() {
  const filtroUnidad = document.getElementById("filtroUnidad").value.trim();
  const filtroTipo = document.getElementById("filtroTipo").value.trim();
  const filtroFecha = document.getElementById("filtroFecha").value;
  const filtroDocumentacion = document
    .getElementById("filtroDocumentacion")
    .value.trim();
  const filtroProveedor = document
    .getElementById("filtroProveedor")
    .value.trim();

  // Llamar a la función que obtiene adquisiciones con los filtros aplicados
  fetchAdquisiciones(
    filtroUnidad,
    filtroTipo,
    filtroFecha,
    filtroDocumentacion,
    filtroProveedor
  );
}

function cargarUnidadesAdministrativas() {
  fetch(`${Urlapi}/filtros/unidades`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const filtroUnidadSelect = document.getElementById("filtroUnidad");
      filtroUnidadSelect.innerHTML =
        "<option value=''>Seleccione una unidad</option>";
      data.forEach((unidad) => {
        const option = document.createElement("option");
        option.value = unidad;
        option.textContent = unidad;
        filtroUnidadSelect.appendChild(option);
      });
    })
    .catch((error) =>
      console.error("Error cargando unidades administrativas:", error)
    );
}

function cargarTipos() {
  fetch(`${Urlapi}/filtros/tipos`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const filtroTipoSelect = document.getElementById("filtroTipo");
      filtroTipoSelect.innerHTML =
        "<option value=''>Seleccione un tipo</option>";
      data.forEach((tipo) => {
        const option = document.createElement("option");
        option.value = tipo;
        option.textContent = tipo;
        filtroTipoSelect.appendChild(option);
      });
    })
    .catch((error) =>
      console.error("Error cargando tipos de bien o servicio:", error)
    );
}

function cargarProveedores() {
  fetch(`${Urlapi}/filtros/proveedores`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const filtroProveedorSelect = document.getElementById("filtroProveedor");
      filtroProveedorSelect.innerHTML =
        "<option value=''>Seleccione un proveedor</option>";
      data.forEach((proveedor) => {
        const option = document.createElement("option");
        option.value = proveedor;
        option.textContent = proveedor;
        filtroProveedorSelect.appendChild(option);
      });
    })
    .catch((error) => console.error("Error cargando proveedores:", error));
}

function cargarDocumentaciones() {
  fetch(`${Urlapi}/filtros/documentaciones`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const filtroDocumentacionSelect = document.getElementById(
        "filtroDocumentacion"
      );
      filtroDocumentacionSelect.innerHTML =
        "<option value=''>Seleccione una documentación</option>";
      data.forEach((documentacion) => {
        const option = document.createElement("option");
        option.value = documentacion;
        option.textContent = documentacion;
        filtroDocumentacionSelect.appendChild(option);
      });
    })
    .catch((error) => console.error("Error cargando documentaciones:", error));
}

document.addEventListener("DOMContentLoaded", function () {
  cargarUnidadesAdministrativas();
  cargarTipos();
  cargarProveedores();
  cargarDocumentaciones();
  fetchAdquisiciones(); // Cargar adquisiciones al cargar la página

  // Agregar el evento al botón de aplicar filtros
  const aplicarFiltroButton = document.getElementById("aplicarFiltro");
  if (aplicarFiltroButton) {
    aplicarFiltroButton.addEventListener("click", aplicarFiltros);
  }
});

function updateValorTotal() {
  const cantidadInput = document.getElementById("cantidad");
  const valorUnitarioInput = document.getElementById("valorUnitario"); // Cambiado a valorUnitario
  const valorTotalInput = document.getElementById("valorTotal"); // Cambiado a valorTotal

  if (cantidadInput && valorUnitarioInput && valorTotalInput) {
    const cantidad = parseFloat(cantidadInput.value) || 0;
    const valorUnitario = parseFloat(valorUnitarioInput.value) || 0;
    const valorTotal = cantidad * valorUnitario;
    valorTotalInput.value = valorTotal.toFixed(2); // Asegúrate de que el valor se muestre con dos decimales
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const cantidadInput = document.getElementById("cantidad");
  const valorUnitarioInput = document.getElementById("valorUnitario"); // Cambiado a valorUnitario

  if (cantidadInput && valorUnitarioInput) {
    cantidadInput.addEventListener("input", updateValorTotal);
    valorUnitarioInput.addEventListener("input", updateValorTotal);
  } else {
    console.error("Elementos para cantidad o valor unitario no encontrados.");
  }

  const form = document.getElementById("adquisicionForm");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      updateValorTotal(); // Asegurarse de que el valor total esté calculado antes de enviar

      const formData = new FormData(this);
      const data = Object.fromEntries(formData.entries());

      // Convertir valores numéricos desde cadenas a números
      data.cantidad = parseFloat(data.cantidad) || 0;
      data.presupuesto = parseFloat(data.presupuesto) || 0;
      data.valorTotal = parseFloat(data.valorTotal) || 0; // Cambiado a valorTotal
      data.valorUnitario = parseFloat(data.valorUnitario) || 0; // Cambiado a valorUnitario

      const id = this.dataset.id; // Obtener el ID de la adquisición para editar
      const method = id ? "PUT" : "POST"; // Si hay un ID, se realiza una actualización, si no, una creación

      fetch(apiUrl + (id ? `/${id}` : ""), {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.ok) {
            this.reset();
            delete this.dataset.id; // Limpiar el dataset del formulario
            fetchAdquisiciones(); // Refrescar la lista
          } else {
            console.error("Error al registrar la adquisición");
          }
        })
        .catch((error) =>
          console.error("Error al enviar el formulario:", error)
        );
    });
  }

  fetchAdquisiciones();

  // Agregar el evento al botón de aplicar filtros
  const aplicarFiltroButton = document.getElementById("aplicarFiltro");
  if (aplicarFiltroButton) {
    aplicarFiltroButton.addEventListener("click", aplicarFiltros);
  } else {
    console.error("Botón de aplicar filtros no encontrado.");
  }
});

function editAdquisicion(id) {
  fetch(`${apiUrl}/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // Prellenar los datos en el modal de edición
      document.getElementById("editPresupuesto").value = data.presupuesto || "";
      document.getElementById("editUnidad").value = data.unidad || "";
      document.getElementById("editTipo").value = data.tipo || "";
      document.getElementById("editCantidad").value = data.cantidad || "";
      document.getElementById("editValorUnitario").value =
        data.valorUnitario || "";
      document.getElementById("editValorTotal").value = data.valorTotal || "";
      document.getElementById("editFecha").value = data.fecha || "";
      document.getElementById("editProveedor").value = data.proveedor || "";
      document.getElementById("editDocumentacion").value =
        data.documentacion || "";

      // Guardar los valores originales en el dataset del formulario para comparación
      const editForm = document.getElementById("editForm");
      editForm.dataset.originalData = JSON.stringify(data);
      editForm.dataset.id = id;

      // Abrir el modal de edición
      const editModal = document.getElementById("editModal");
      editModal.style.display = "block";
    })
    .catch((error) =>
      console.error("Error al cargar los datos de la adquisición:", error)
    );
}

document
  .getElementById("editForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const id = this.dataset.id;
    const originalData = JSON.parse(this.dataset.originalData);
    const data = {
      presupuesto: document.getElementById("editPresupuesto").value,
      unidad: document.getElementById("editUnidad").value,
      tipo: document.getElementById("editTipo").value,
      cantidad: document.getElementById("editCantidad").value,
      valorUnitario: document.getElementById("editValorUnitario").value,
      valorTotal: document.getElementById("editValorTotal").value,
      fecha: document.getElementById("editFecha").value,
      proveedor: document.getElementById("editProveedor").value,
      documentacion: document.getElementById("editDocumentacion").value,
    };

    // Comparar los datos actuales con los originales
    const hasChanges = Object.keys(data).some(
      (key) => data[key] !== originalData[key]
    );

    if (!hasChanges) {
      alert("No se han realizado cambios.");
      return;
    }

    fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          document.getElementById("editModal").style.display = "none";
          fetchAdquisiciones(); // Recargar la lista de adquisiciones
        } else {
          console.error("Error al actualizar la adquisición");
        }
      })
      .catch((error) =>
        console.error("Error al enviar el formulario de edición:", error)
      );
  });
// Cerrar el modal de edición
function closeEditModal() {
  const editModal = document.getElementById("editModal");
  if (editModal) {
    editModal.style.display = "none";
  }
}

// Event listeners para cerrar el modal
document
  .getElementById("modalCloseEdit")
  .addEventListener("click", closeEditModal);
document
  .getElementById("editModal")
  .addEventListener("click", function (event) {
    if (event.target === this) {
      closeEditModal();
    }
  });

function deleteAdquisicion(id) {
  fetch(`${apiUrl}/${id}`, { method: "DELETE" })
    .then((response) => {
      if (response.ok) {
        fetchAdquisiciones();
      } else {
        console.error("Error al eliminar la adquisición");
      }
    })
    .catch((error) =>
      console.error("Error al eliminar la adquisición:", error)
    );
}

function viewHistorial(id) {
  fetch(`${apiUrl}/${id}/historial`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const modalContent = document.getElementById("modalContent");
      if (modalContent) {
        modalContent.innerHTML = ""; // Limpiar el contenido del modal

        if (data.length === 0) {
          modalContent.innerHTML = "<p>No hay historial de cambios.</p>";
        } else {
          data.forEach((entry) => {
            const entryDiv = document.createElement("div");
            entryDiv.className = "historial-entry";

            // Construir la estructura HTML para cada campo del JSON
            entryDiv.innerHTML = `
              <div class="historial-item">
                <label class="label">Fecha:</label>
                <span class="value">${new Date(
                  entry.fecha
                ).toLocaleString()}</span>
              </div>
              <div class="historial-item">
                <label class="label">Tipo de Cambio:</label>
                <span class="value">${entry.tipoCambio || "No definido"}</span>
              </div>
              <div class="historial-item">
                <label class="label">Cantidad:</label>
                <span class="value">${entry.cambio.cantidad}</span>
              </div>
              <div class="historial-item">
                <label class="label">Documentación:</label>
                <span class="value">${entry.cambio.documentacion}</span>
              </div>
              <div class="historial-item">
                <label class="label">Fecha de Adquisición:</label>
                <span class="value">${entry.cambio.fecha}</span>
              </div>
              <div class="historial-item">
                <label class="label">Presupuesto:</label>
                <span class="value">${entry.cambio.presupuesto}</span>
              </div>
              <div class="historial-item">
                <label class="label">Proveedor:</label>
                <span class="value">${entry.cambio.proveedor}</span>
              </div>
              <div class="historial-item">
                <label class="label">Tipo de Bien o Servicio:</label>
                <span class="value">${entry.cambio.tipo}</span>
              </div>
              <div class="historial-item">
                <label class="label">Unidad Administrativa:</label>
                <span class="value">${entry.cambio.unidad}</span>
              </div>
              <div class="historial-item">
                <label class="label">Valor Unitario:</label>
                <span class="value">${entry.cambio.valorUnitario}</span>
              </div>
              <div class="historial-item">
                <label class="label">Valor Total:</label>
                <span class="value">${entry.cambio.valorTotal}</span>
              </div>
            `;
            modalContent.appendChild(entryDiv);
          });
        }
        showModal(); // Función para mostrar el modal
      } else {
        console.error("Contenido del modal no encontrado.");
      }
    })
    .catch((error) => console.error("Error fetching historial:", error));
}

function showModal() {
  const modal = document.getElementById("historialModal");
  if (modal) {
    modal.style.display = "block";
  } else {
    console.error("Modal no encontrado.");
  }
}

function hideModal() {
  const modal = document.getElementById("historialModal");
  if (modal) {
    modal.style.display = "none";
  } else {
    console.error("Modal no encontrado.");
  }
}

// Agregar eventos el modal
const modalClose = document.getElementById("modalClose");
const modalOverlay = document.getElementById("modalOverlay");

if (modalClose) {
  modalClose.addEventListener("click", hideModal);
} else {
  console.error("Botón de cerrar modal no encontrado.");
}

if (modalOverlay) {
  modalOverlay.addEventListener("click", hideModal);
} else {
  console.error("Overlay del modal no encontrado.");
}
