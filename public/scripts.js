const apiUrl = "http://localhost:5000/adquisiciones";

// Función para obtener adquisiciones con filtros aplicados
function fetchAdquisiciones(
  filtroUnidad = "",
  filtroTipo = "",
  filtroFecha = ""
) {
  let url = new URL(apiUrl);

  // Agregar parámetros de filtro a la URL si están presentes
  if (filtroUnidad) url.searchParams.append("unidad", filtroUnidad);
  if (filtroTipo) url.searchParams.append("tipo", filtroTipo);
  if (filtroFecha) url.searchParams.append("fecha", filtroFecha);

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

  // Llamar a la función que obtiene adquisiciones con los filtros aplicados
  fetchAdquisiciones(filtroUnidad, filtroTipo, filtroFecha);
}

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
    .then((response) => response.json())
    .then((data) => {
      const form = document.getElementById("adquisicionForm");
      if (form) {
        form.presupuesto.value = data.presupuesto || "";
        form.unidad.value = data.unidad || "";
        form.tipo.value = data.tipo || "";
        form.cantidad.value = data.cantidad || "";
        form.valorUnitario.value = data.valorUnitario || ""; // Cambiado a valorUnitario
        form.valorTotal.value = data.valorTotal || ""; // Cambiado a valorTotal
        form.fecha.value = data.fecha || "";
        form.proveedor.value = data.proveedor || "";
        form.documentacion.value = data.documentacion || "";
        form.dataset.id = data.id; // Guardar el ID en el dataset del formulario
      }
    })
    .catch((error) =>
      console.error("Error al cargar los datos de la adquisición:", error)
    );
}

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
            entryDiv.innerHTML = `
              <p><strong>Fecha:</strong> ${new Date(
                entry.fecha
              ).toLocaleString()}</p>
              <p><strong>Tipo de Cambio:</strong> ${entry.tipoCambio}</p>
              <p><strong>Cambio:</strong></p>
              <pre>${JSON.stringify(entry.cambio, null, 2)}</pre>
            `;
            modalContent.appendChild(entryDiv);
          });
        }
        showModal();
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
