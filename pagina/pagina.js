document.addEventListener("DOMContentLoaded", () => {
  let usuariologged = localStorage.getItem("usuariologged") === "true";

  // Obtener elementos
  const navLinks = document.querySelectorAll("nav ul.nav-links li a");
  const main = document.querySelector("main");
  const btnRegister = document.querySelector(".btn-register");
  const btnLogin = document.querySelector(".btn-login");
  const btnReservaHero = document.querySelector(".btn-primary");
  const btnReservarRestaurantes = document.querySelectorAll(".restaurant-card button");

  const contentContainer = document.createElement("section");
  contentContainer.classList.add("dynamic-content");
  contentContainer.style.padding = "40px 20px";
  main.appendChild(contentContainer);

  const modalOverlay = document.createElement("div");
  modalOverlay.style.position = "fixed";
  modalOverlay.style.top = "0";
  modalOverlay.style.left = "0";
  modalOverlay.style.width = "100%";
  modalOverlay.style.height = "100%";
  modalOverlay.style.backgroundColor = "rgba(0,0,0,0.5)";
  modalOverlay.style.display = "none";
  modalOverlay.style.justifyContent = "center";
  modalOverlay.style.alignItems = "center";
  modalOverlay.style.zIndex = "1000";

  const modalContent = document.createElement("div");
  modalContent.style.backgroundColor = "#fff";
  modalContent.style.padding = "25px";
  modalContent.style.borderRadius = "12px";
  modalContent.style.minWidth = "320px";
  modalContent.style.maxWidth = "400px";
  modalContent.style.position = "relative";
  modalContent.style.boxShadow = "0 6px 20px rgba(0,0,0,0.25)";

  const closeModalBtn = document.createElement("button");
  closeModalBtn.textContent = "×";
  closeModalBtn.style.position = "absolute";
  closeModalBtn.style.top = "8px";
  closeModalBtn.style.right = "12px";
  closeModalBtn.style.fontSize = "1.5rem";
  closeModalBtn.style.background = "none";
  closeModalBtn.style.border = "none";
  closeModalBtn.style.cursor = "pointer";
  closeModalBtn.style.color = "#cc2228";

  closeModalBtn.addEventListener("click", () => {
    modalOverlay.style.display = "none";
    modalContent.innerHTML = "";
    modalContent.appendChild(closeModalBtn);
  });

  modalContent.appendChild(closeModalBtn);
  modalOverlay.appendChild(modalContent);
  document.body.appendChild(modalOverlay);

  function showModal(htmlContent) {
    modalContent.innerHTML = "";
    modalContent.appendChild(closeModalBtn);
    modalContent.insertAdjacentHTML("beforeend", htmlContent);
    modalOverlay.style.display = "flex";
  }

  function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function mostrarSeccion(nombre) {
    navLinks.forEach(link => link.classList.remove("active"));
    const link = [...navLinks].find(l => l.textContent === nombre);
    if(link) link.classList.add("active");

    contentContainer.innerHTML = "";

    if (nombre === "Inicio") {
      contentContainer.style.display = "none";
    } else {
      contentContainer.style.display = "block";
      if (nombre === "Menú") {
        contentContainer.innerHTML = `
          <h2>Menú</h2>
          <p>Aquí encontrarás los deliciosos platillos que ofrecemos.</p>
          <ul>
            <li>Pizza </li>
            <li>Corviche </li>
            <li>Salchipapas </li>
            <li>Hamburguesa </li>
            <li>Encebollado </li>
            <li>Shuzi </li>
          </ul>
          <p>¡Deja tu reseña abajo!</p>
          <textarea placeholder="Escribe tu reseña aquí..." rows="4" style="width:100%;border-radius:8px;padding:10px;border:1px solid #ccc;"></textarea>
          <button style="margin-top:10px;padding:10px 25px;background:#cc2228;color:#fff;border:none;border-radius:30px;cursor:pointer;">Enviar Reseña</button>
        `;
        const btnEnviarReseña = contentContainer.querySelector("button");
        btnEnviarReseña.addEventListener("click", () => {
          const reseña = contentContainer.querySelector("textarea").value.trim();
          if (reseña === "") {
            alert("Por favor escribe una reseña antes de enviar.");
          } else {
            alert("¡Gracias por tu reseña!");
            contentContainer.querySelector("textarea").value = "";
          }
        });
      } else if (nombre === "Ofertas") {
        contentContainer.innerHTML = `
          <h2>Ofertas</h2>
          <p><b>Disfruta nuestras promociones exclusivas para ti</b>.</p>
          <ul>
            <li>2x1 en pizzas los lunes y miércoles.</li>
            <li>10% de descuento en hamburguesas los domingos de familia.</li>
            <li>Postre gratis con cada reserva de más de $30.</li>
          </ul>
        `;
      } else if (nombre === "Reservas") {
        if (!usuariologged) {
          alert("Debes iniciar sesión o registrarte para reservar.");
          return;
        }
        abrirFormularioReserva();
      } else if (nombre === "Contacto") {
        contentContainer.innerHTML = `
          <h2>Contacto</h2>
          <p>¿Tienes dudas o quieres más información? Escríbenos.</p>
          <form id="contactForm">
            <label>Nombre completo:</label><br/>
            <input type="text" id="contactName" required style="width:100%;padding:8px;margin:5px 0;border-radius:6px;border:1px solid #ccc;" /><br/>
            <label>Email:</label><br/>
            <input type="email" id="contactEmail" required style="width:100%;padding:8px;margin:5px 0;border-radius:6px;border:1px solid #ccc;" /><br/>
            <label>Mensaje:</label><br/>
            <textarea id="contactMessage" required rows="4" style="width:100%;padding:8px;margin:5px 0;border-radius:6px;border:1px solid #ccc;"></textarea><br/>
            <button type="submit" style="background:#cc2228;color:#fff;padding:10px 25px;border:none;border-radius:30px;cursor:pointer;">Enviar</button>
          </form>
        `;
        const form = document.getElementById("contactForm");
        form.addEventListener("submit", (e) => {
          e.preventDefault();
          const name = document.getElementById("contactName").value.trim();
          const email = document.getElementById("contactEmail").value.trim();
          const message = document.getElementById("contactMessage").value.trim();

          if (name === "" || email === "" || message === "") {
            alert("Por favor llena todos los campos.");
            return;
          }
          if (!validarEmail(email)) {
            alert("Por favor ingresa un email válido.");
            return;
          }
          alert("Mensaje enviado. Gracias por contactarnos.");
          form.reset();
        });
      }
    }
  }

  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      mostrarSeccion(link.textContent);
    });
  });

  mostrarSeccion("Inicio");

  btnRegister.addEventListener("click", () => {
    showModal(`
      <h2 style="color:#cc2228;text-align:center;">Registro</h2>
      <form id="registerForm">
        <label>Nombre Completo:</label><br/>
        <input type="text" id="regName" required style="width:100%;padding:8px;margin:5px 0;border-radius:6px;border:1px solid #ccc;" /><br/>
        <label>Email:</label><br/>
        <input type="email" id="regEmail" required style="width:100%;padding:8px;margin:5px 0;border-radius:6px;border:1px solid #ccc;" /><br/>
        <label>Contraseña:</label><br/>
        <input type="password" id="regPassword" required minlength="6" style="width:100%;padding:8px;margin:5px 0;border-radius:6px;border:1px solid #ccc;" /><br/>
        <button type="submit" style="background:#cc2228;color:#fff;padding:10px 25px;border:none;border-radius:30px;cursor:pointer;width:100%;">Registrarse</button>
      </form>
    `);

    const registerForm = document.getElementById("registerForm");
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("regName").value.trim();
      const email = document.getElementById("regEmail").value.trim();
      const password = document.getElementById("regPassword").value;

      if (!name || !email || !password || !validarEmail(email) || password.length < 6) {
        alert("Por favor completa todos los campos correctamente.");
        return;
      }

      usuariologged = true;
      localStorage.setItem("usuariologged", "true");
      alert(`Registro exitoso. ¡Bienvenido, ${name}!`);
      modalOverlay.style.display = "none";
    });
  });

  btnLogin.addEventListener("click", () => {
    showModal(`
      <h2 style="color:#cc2228;text-align:center;">Iniciar Sesión</h2>
      <form id="loginForm">
        <label>Email:</label><br/>
        <input type="email" id="loginEmail" required style="width:100%;padding:8px;margin:5px 0;border-radius:6px;border:1px solid #ccc;" /><br/>
        <label>Contraseña:</label><br/>
        <input type="password" id="loginPassword" required style="width:100%;padding:8px;margin:5px 0;border-radius:6px;border:1px solid #ccc;" /><br/>
        <button type="submit" style="background:#cc2228;color:#fff;padding:10px 25px;border:none;border-radius:30px;cursor:pointer;width:100%;">Entrar</button>
      </form>
    `);

    const loginForm = document.getElementById("loginForm");
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value.trim();
      const password = document.getElementById("loginPassword").value;

      if (!email || !password || !validarEmail(email)) {
        alert("Completa correctamente todos los campos.");
        return;
      }

      usuariologged = true;
      localStorage.setItem("usuariologged", "true");
      alert(`Inicio de sesión exitoso. ¡Bienvenido de nuevo!`);
      modalOverlay.style.display = "none";
    });
  });

  function abrirFormularioReserva(restaurantName) {
    let nombreRestaurante = restaurantName || "";
    showModal(`
      <h2 style="color:#cc2228;text-align:center;">Reserva tu Mesa</h2>
      <form id="reservationForm">
        <label>Restaurante:</label><br/>
        <input type="text" id="resRestaurant" value="${nombreRestaurante}" readonly style="width:100%;padding:8px;margin:5px 0;border-radius:6px;border:1px solid #ccc;background:#eee;" /><br/>
        <label>Nombre Completo:</label><br/>
        <input type="text" id="resName" required style="width:100%;padding:8px;margin:5px 0;border-radius:6px;border:1px solid #ccc;" /><br/>
        <label>Email:</label><br/>
        <input type="email" id="resEmail" required style="width:100%;padding:8px;margin:5px 0;border-radius:6px;border:1px solid #ccc;" /><br/>
        <label>Fecha:</label><br/>
        <input type="date" id="resDate" required style="width:100%;padding:8px;margin:5px 0;border-radius:6px;border:1px solid #ccc;" /><br/>
        <label>Hora:</label><br/>
        <input type="time" id="resTime" required style="width:100%;padding:8px;margin:5px 0;border-radius:6px;border:1px solid #ccc;" /><br/>
        <button type="submit" style="background:#cc2228;color:#fff;padding:10px 25px;border:none;border-radius:30px;cursor:pointer;width:100%;">Reservar</button>
      </form>
    `);

    const reservationForm = document.getElementById("reservationForm");
    reservationForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("resName").value.trim();
      const email = document.getElementById("resEmail").value.trim();
      const date = document.getElementById("resDate").value;
      const time = document.getElementById("resTime").value;

      if (!name || !email || !date || !time || !validarEmail(email)) {
        alert("Completa correctamente todos los campos.");
        return;
      }

      const hoy = new Date();
      const fechaSeleccionada = new Date(date + "T" + time);
      if (fechaSeleccionada < hoy) {
        alert("Por favor selecciona una fecha y hora válida.");
        return;
      }

      alert(`¡Reserva confirmada para ${name} en ${nombreRestaurante || "nuestros restaurantes"} el ${date} a las ${time}. Gracias!`);
      modalOverlay.style.display = "none";
    });
  }

  btnReservaHero.addEventListener("click", () => {
    if (!usuariologged) {
      alert("Debes iniciar sesión o registrarte para reservar.");
      return;
    }
    abrirFormularioReserva();
  });

  btnReservarRestaurantes.forEach(btn => {
    btn.addEventListener("click", (e) => {
      if (!usuariologged) {
        alert("Debes iniciar sesión o registrarte para reservar.");
        return;
      }
      const card = e.target.closest(".restaurant-card");
      const nombre = card.querySelector("h3").textContent;
      abrirFormularioReserva(nombre);
    });
  });
});
