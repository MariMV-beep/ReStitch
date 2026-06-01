document.addEventListener("DOMContentLoaded", function () {
    const boton = document.querySelector('input[type="submit"]');

    boton.addEventListener("click", function (e) {
        e.preventDefault();

        // Validar que todos los campos requeridos estén llenos
        const campos = document.querySelectorAll("input[required]");
        let todosLlenos = true;

        campos.forEach((campo) => {
            if (campo.value.trim() === "") {
                todosLlenos = false;
            }
        });

        if (!todosLlenos) {
            alert("Por favor, completa todos los campos antes de confirmar.");
            return;
        }

        // Crear el modal de confirmación
        const modal = document.createElement("div");
        modal.style.cssText = `
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      font-family: 'Archivo Black', sans-serif;
    `;

        modal.innerHTML = `
      <div style="
        background: white;
        padding: 40px 50px;
        border-radius: 12px;
        text-align: center;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        max-width: 400px;
      ">
        <div style="font-size: 50px; margin-bottom: 16px;">✅</div>
        <h2 style="margin: 0 0 10px; color: #2d6a4f;">¡Éxito!</h2>
        <p style="color: #444; font-size: 16px; margin: 0 0 24px;">
          Tu dirección de envío fue enviada correctamente.
        </p>
        <button onclick="this.closest('div[style]').remove()" style="
          background: #2d6a4f;
          color: white;
          border: none;
          padding: 10px 28px;
          border-radius: 8px;
          font-size: 15px;
          cursor: pointer;
        ">Aceptar</button>
      </div>
    `;

        document.body.appendChild(modal);
    });
});