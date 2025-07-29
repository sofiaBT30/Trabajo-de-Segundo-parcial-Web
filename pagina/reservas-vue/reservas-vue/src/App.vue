<template>
  <div>
    <header>
      <div class="container header-container">
        <div class="logo">
          <img src="/mesa1.jpg" alt="reserva Logo" />
        </div>
        <nav>
          <ul class="nav-links">
            <li><a href="#" :class="{ active: activeSection === 'Inicio' }" @click.prevent="setActiveSection('Inicio')">Inicio</a></li>
            <li><a href="#" :class="{ active: activeSection === 'Menú' }" @click.prevent="setActiveSection('Menú')">Menú</a></li>
            <li><a href="#" :class="{ active: activeSection === 'Ofertas' }" @click.prevent="setActiveSection('Ofertas')">Ofertas</a></li>
            <li><a href="#" :class="{ active: activeSection === 'Reservas' }" @click.prevent="setActiveSection('Reservas')">Reservas</a></li>
            <li><a href="#" :class="{ active: activeSection === 'Contacto' }" @click.prevent="setActiveSection('Contacto')">Contacto</a></li>
          </ul>
        </nav>
        <div class="header-actions">
          <button class="btn-register" @click="openModal('register')">Registrarse</button>
          <button class="btn-login" @click="openModal('login')">Iniciar Sesión</button>
        </div>
      </div>
    </header>

    <main>
      <section class="hero" v-if="activeSection === 'Inicio'">
        <div class="container hero-content">
          <div class="hero-text">
            <h1>Disfruta de nuestros ricos platillos</h1>
            <p>Haz tu reserva en uno de nuestros restaurantes</p>
            <button class="btn-primary" @click="handleHeroReservation">Reserva Ahora</button>
          </div>
          <div class="hero-image">
            <img src="/mesas.jpg" alt="mesas" />
          </div>
        </div>
      </section>

      <section class="restaurants" v-show="activeSection === 'Inicio' || activeSection === 'Reservas'">
        <div class="container">
          <h2>Nuestros Restaurantes</h2>
          <div class="restaurant-grid">
            <article class="restaurant-card" v-for="restaurant in restaurants" :key="restaurant.name">
              <img :src="restaurant.image" :alt="`Restaurante ${restaurant.name}`" />
              <h3>{{ restaurant.name }}</h3>
              <button class="btn-secondary" @click="handleRestaurantReservation(restaurant.name)">Reservar</button>
            </article>
          </div>
        </div>
      </section>

      <section class="dynamic-content" :style="{ display: activeSection !== 'Inicio' && activeSection !== 'Reservas' ? 'block' : 'none' }">
        <div class="container">
          <div v-if="activeSection === 'Menú'">
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
            <textarea placeholder="Escribe tu reseña aquí..." rows="4" ref="menuReviewTextarea" style="width:100%;border-radius:8px;padding:10px;border:1px solid #ccc;"></textarea>
            <button class="btn-primary" @click="submitMenuReview">Enviar Reseña</button>
          </div>

          <div v-else-if="activeSection === 'Ofertas'">
            <h2>Ofertas</h2>
            <p><b>Disfruta nuestras promociones exclusivas para ti</b>.</p>
            <ul>
              <li>2x1 en pizzas los lunes y miércoles.</li>
              <li>10% de descuento en hamburguesas los domingos de familia.</li>
              <li>Postre gratis con cada reserva de más de $30.</li>
            </ul>
          </div>

          <div v-else-if="activeSection === 'Contacto'">
            <h2>Contacto</h2>
            <p>¿Tienes dudas o quieres más información? Escríbenos.</p>
            <form @submit.prevent="submitContactForm">
              <label>Nombre completo:</label><br/>
              <input type="text" v-model="contactForm.name" required style="width:100%;padding:8px;margin:5px 0;border-radius:6px;border:1px solid #ccc;" /><br/>
              <label>Email:</label><br/>
              <input type="email" v-model="contactForm.email" required style="width:100%;padding:8px;margin:5px 0;border-radius:6px;border:1px solid #ccc;" /><br/>
              <label>Mensaje:</label><br/>
              <textarea v-model="contactForm.message" required rows="4" style="width:100%;padding:8px;margin:5px 0;border-radius:6px;border:1px solid #ccc;"></textarea><br/>
              <button type="submit" class="btn-primary">Enviar</button>
            </form>
          </div>
        </div>
      </section>

      <section class="container" style="padding: 30px;">
        <div v-if="!reviewEnviado">
          <h2>Deja tu reseña</h2>
          <input type="text" v-model="reviewNombre" placeholder="Tu nombre" /><br/><br/>
          <textarea v-model="reviewMensaje" placeholder="Tu reseña" rows="4"></textarea><br/><br/>
          <label>Tu puntuación:</label><br/>
          <div style="font-size: 24px;">
            <span
              v-for="n in 5"
              :key="n"
              @click="reviewPuntuacion = n"
              style="cursor: pointer; color: gold;"
            >
              {{ n <= reviewPuntuacion ? '★' : '☆' }}
            </span>
          </div><br/>
          <button @click="enviarReviewFormulario" style="background:#cc2228;color:#fff;padding:10px 25px;border:none;border-radius:30px;">Enviar reseña</button>
        </div>

        <div v-else>
          <h3>¡Gracias por tu reseña, {{ reviewNombre }}!</h3>
          <p><strong>Tu reseña:</strong> {{ reviewMensaje }}</p>
          <p><strong>Tu puntuación:</strong>
            <span style="font-size: 22px; color: gold;">
              <span v-for="n in 5" :key="n">
                {{ n <= reviewPuntuacion ? '★' : '☆' }}
              </span>
            </span>
          </p>
        </div>
      </section>
    </main>

    <footer>
      <div class="container footer-container">
        <p>© 2025 Reservade Mesas Ecuador - Come rico con nosotros</p>
      </div>
    </footer>

    <div class="modal-overlay" :style="{ display: showModal ? 'flex' : 'none' }">
      <div class="modal-content">
        <button class="close-modal-btn" @click="closeModal">×</button>

        <div v-if="modalType === 'register'">
          <h2 style="color:#cc2228;text-align:center;">Registro</h2>
          <form @submit.prevent="submitRegisterForm">
            <label>Nombre Completo:</label><br/>
            <input type="text" v-model="registerForm.name" required style="width:100%;padding:8px;margin:5px 0;border-radius:6px;border:1px solid #ccc;" /><br/>
            <label>Email:</label><br/>
            <input type="email" v-model="registerForm.email" required style="width:100%;padding:8px;margin:5px 0;border-radius:6px;border:1px solid #ccc;" /><br/>
            <label>Contraseña:</label><br/>
            <input type="password" v-model="registerForm.password" required minlength="6" style="width:100%;padding:8px;margin:5px 0;border-radius:6px;border:1px solid #ccc;" /><br/>
            <button type="submit" style="background:#cc2228;color:#fff;padding:10px 25px;border:none;border-radius:30px;cursor:pointer;width:100%;">Registrarse</button>
          </form>
        </div>

        <div v-else-if="modalType === 'login'">
          <h2 style="color:#cc2228;text-align:center;">Iniciar Sesión</h2>
          <form @submit.prevent="submitLoginForm">
            <label>Email:</label><br/>
            <input type="email" v-model="loginForm.email" required style="width:100%;padding:8px;margin:5px 0;border-radius:6px;border:1px solid #ccc;" /><br/>
            <label>Contraseña:</label><br/>
            <input type="password" v-model="loginForm.password" required style="width:100%;padding:8px;margin:5px 0;border-radius:6px;border:1px solid #ccc;" /><br/>
            <button type="submit" style="background:#cc2228;color:#fff;padding:10px 25px;border:none;border-radius:30px;cursor:pointer;width:100%;">Entrar</button>
          </form>
        </div>

        <div v-else-if="modalType === 'reservation'">
          <h2 style="color:#cc2228;text-align:center;">Reserva tu Mesa</h2>
          <form @submit.prevent="submitReservationForm">
            <label>Restaurante:</label><br/>
            <input type="text" v-model="reservationForm.restaurant" readonly style="width:100%;padding:8px;margin:5px 0;border-radius:6px;border:1px solid #ccc;background:#eee;" /><br/>
            <label>Nombre Completo:</label><br/>
            <input type="text" v-model="reservationForm.name" required style="width:100%;padding:8px;margin:5px 0;border-radius:6px;border:1px solid #ccc;" /><br/>
            <label>Email:</label><br/>
            <input type="email" v-model="reservationForm.email" required style="width:100%;padding:8px;margin:5px 0;border-radius:6px;border:1px solid #ccc;" /><br/>
            <label>Fecha:</label><br/>
            <input type="date" v-model="reservationForm.date" required style="width:100%;padding:8px;margin:5px 0;border-radius:6px;border:1px solid #ccc;" /><br/>
            <label>Hora:</label><br/>
            <input type="time" v-model="reservationForm.time" required style="width:100%;padding:8px;margin:5px 0;border-radius:6px;border:1px solid #ccc;" /><br/>
            <button type="submit" style="background:#cc2228;color:#fff;padding:10px 25px;border:none;border-radius:30px;cursor:pointer;width:100%;">Reservar</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Reactive state variables
const activeSection = ref('Inicio');
const usuariologged = ref(localStorage.getItem("usuariologged") === "true"); // Obtener estado al cargar

const showModal = ref(false);
const modalType = ref(''); // 'register', 'login', 'reservation'

const registerForm = ref({ name: '', email: '', password: '' });
const loginForm = ref({ email: '', password: '' });
const reservationForm = ref({ restaurant: '', name: '', email: '', date: '', time: '' });
const contactForm = ref({ name: '', email: '', message: '' });

// Referencia para el textarea de reseña del menú (para obtener su valor)
const menuReviewTextarea = ref(null);

// Your existing Vue review section logic
const reviewNombre = ref("");
const reviewMensaje = ref("");
const reviewPuntuacion = ref(0);
const reviewEnviado = ref(false);

const restaurants = ref([
  { name: 'Restaurante Pizza', image: '/pizza.jpg' },
  { name: 'Restaurante Corviche', image: '/corviche.jpg' },
  { name: 'Restaurante Salchipapas', image: '/salchipapas.jpeg' },
  { name: 'Restaurante Hamburguesa', image: '/hamburguesa.jpeg' },
  { name: 'Restaurante Encebollado', image: '/encebollado.jpeg' },
  { name: 'Restaurante Shuzi', image: '/mesa4.jpg' },
]);

// Functions
const setActiveSection = (section) => {
  activeSection.value = section;
  // Si la sección es "Reservas" y no está logueado, alertar y no cambiar sección (o abrir modal)
  if (section === 'Reservas' && !usuariologged.value) {
    alert("Debes iniciar sesión o registrarte para reservar.");
    // No cambiamos la activeSection aquí, o podrías abrir el modal de login
    // activeSection.value = 'Inicio'; // Opcional: volver a inicio si no está logueado
    openModal('login'); // Abre el modal de login si intenta ir a Reservas sin estar logueado
    return;
  }
};

const openModal = (type, restaurantName = '') => {
  if (type === 'reservation' && !usuariologged.value) {
    alert("Debes iniciar sesión o registrarte para reservar.");
    return;
  }
  modalType.value = type;
  showModal.value = true;
  if (type === 'reservation') {
    reservationForm.value.restaurant = restaurantName;
    // Set current date and time as default for reservation, if not already set
    if (!reservationForm.value.date || !reservationForm.value.time) {
      const now = new Date();
      const year = now.getFullYear();
      const month = (now.getMonth() + 1).toString().padStart(2, '0');
      const day = now.getDate().toString().padStart(2, '0');
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      reservationForm.value.date = `${year}-${month}-${day}`;
      reservationForm.value.time = `${hours}:${minutes}`;
    }
  }
};

const closeModal = () => {
  showModal.value = false;
  modalType.value = '';
  // Limpiar datos de los formularios al cerrar el modal
  registerForm.value = { name: '', email: '', password: '' };
  loginForm.value = { email: '', password: '' };
  reservationForm.value = { restaurant: '', name: '', email: '', date: '', time: '' };
};

const validarEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const submitRegisterForm = () => {
  const { name, email, password } = registerForm.value;
  if (!name || !email || !password || !validarEmail(email) || password.length < 6) {
    alert("Por favor completa todos los campos correctamente.");
    return;
  }

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  usuarios.push({ nombre: name, email, password });
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  usuariologged.value = true;
  localStorage.setItem("usuariologged", "true");
  alert(`Registro exitoso. ¡Bienvenido, ${name}!`);
  closeModal();
};

const submitLoginForm = () => {
  const { email, password } = loginForm.value;
  if (!email || !password || !validarEmail(email)) {
    alert("Completa correctamente todos los campos.");
    return;
  }

  // Aquí iría tu lógica real de validación de credenciales
  // Por ahora, simulamos un login exitoso.
  usuariologged.value = true;
  localStorage.setItem("usuariologged", "true");
  alert(`Inicio de sesión exitoso. ¡Bienvenido de nuevo!`);
  closeModal();
};

const submitReservationForm = () => {
  const { restaurant, name, email, date, time } = reservationForm.value;
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

  const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
  reservas.push({ restaurante, name, email, date, time });
  localStorage.setItem("reservas", JSON.stringify(reservas));

  alert(`¡Reserva confirmada para ${name} en ${restaurant || "nuestros restaurantes"} el ${date} a las ${time}. Gracias!`);
  closeModal();
};

const handleHeroReservation = () => {
  // Asegurarse de que el usuario esté logueado antes de abrir el modal de reserva desde el héroe
  if (!usuariologged.value) {
    alert("Debes iniciar sesión o registrarte para reservar.");
    return;
  }
  openModal('reservation');
};

const handleRestaurantReservation = (restaurantName) => {
  // Asegurarse de que el usuario esté logueado antes de abrir el modal de reserva desde la tarjeta
  if (!usuariologged.value) {
    alert("Debes iniciar sesión o registrarte para reservar.");
    return;
  }
  openModal('reservation', restaurantName);
};

const submitContactForm = () => {
  const { name, email, message } = contactForm.value;
  if (!name || !email || !message) {
    alert("Por favor llena todos los campos.");
    return;
  }
  if (!validarEmail(email)) {
    alert("Por favor ingresa un email válido.");
    return;
  }
  alert("Mensaje enviado. Gracias por contactarnos.");
  contactForm.value = { name: '', email: '', message: '' }; // Limpiar formulario
};

const submitMenuReview = () => {
  // Accede al valor del textarea usando la referencia
  const review = menuReviewTextarea.value.value.trim();
  if (review === "") {
    alert("Por favor escribe una reseña antes de enviar.");
  } else {
    alert("¡Gracias por tu reseña!");
    menuReviewTextarea.value.value = ""; // Limpiar textarea
  }
};

const enviarReviewFormulario = () => {
  if (!reviewNombre.value || !reviewMensaje.value || reviewPuntuacion.value === 0) {
    alert("Por favor completa todos los campos y selecciona una puntuación.");
    return;
  }
  alert("Mensaje enviado. ¡Gracias por contactarnos!");
  reviewEnviado.value = true;
};

// Lifecycle Hooks
onMounted(() => {
  // Simulación API externa (moved to onMounted as it runs once when component is mounted)
  axios.get("https://jsonplaceholder.typicode.com/users")
    .then(res => {
      console.log("Usuarios desde API simulada:", res.data);
    })
    .catch(err => {
      console.error("Error al obtener datos externos:", err);
    });
});
</script>

<style scoped>
/* Reset básico */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
  background-color: #fff;
  color: #222;
  line-height: 1.6;
}

.container {
  width: 90%;
  max-width: 1100px;
  margin: 0 auto;
}

/* HEADER */
header {
  background-color: #e52508;
  color: white;
  padding: 15px 0;
  position: sticky;
  top: 0;
  z-index: 999;
  box-shadow: 0 3px 6px rgba(0,0,0,0.2);
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo img {
  width: 140px;
  cursor: pointer;
}

nav ul.nav-links {
  list-style: none;
  display: flex;
  gap: 30px;
}

nav ul.nav-links li a {
  color: white;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  padding: 6px 15px;
  border-radius: 6px;
  transition: background-color 0.3s ease;
}

nav ul.nav-links li a:hover,
nav ul.nav-links li a.active {
  background-color: #180402;
  color: #b36663;
  font-weight: 700;
}

.header-actions button {
  background-color: #ca3737;
  border: none;
  color: #cdd1d0;
  font-weight: 700;
  padding: 10px 25px;
  border-radius: 30px;
  cursor: pointer;
  margin-left: 15px;
  transition: background-color 0.3s ease;
}

.header-actions button:hover {
  background-color: #0b0404;
}

/* HERO */
.hero {
  background-color: #f4f4f4;
  padding: 60px 0;
}

.hero-content {
  display: flex;
  align-items: center;
  gap: 50px;
  flex-wrap: wrap;
}

.hero-text {
  flex: 1;
  min-width: 280px;
}

.hero-text h1 {
  font-size: 3rem;
  font-weight: 900;
  color: #cc2228;
  margin-bottom: 15px;
}

.hero-text p {
  font-size: 1.3rem;
  margin-bottom: 30px;
  color: #444;
}

.btn-primary {
  background-color: #cc2228;
  color: white;
  border: none;
  padding: 15px 40px;
  font-size: 1.1rem;
  font-weight: 700;
  border-radius: 35px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: auto; /* Ensure button width is flexible */
}

.btn-primary:hover {
  background-color: #a61921;
}

.hero-image {
  flex: 1;
  min-width: 280px;
  max-width: 450px;
}

.hero-image img {
  width: 100%;
  border-radius: 20px;
  box-shadow: 0 6px 20px rgba(237, 227, 227, 0.15);
}

/* RESTAURANTES */
.restaurants {
  padding: 40px 0 70px;
  background-color: #fff;
}

.restaurants h2 {
  text-align: center;
  font-size: 2.4rem;
  font-weight: 800;
  margin-bottom: 45px;
  color: #b72717;
}

.restaurant-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 20px;
}

.restaurant-card {
  background-color: #f8f8f8;
  border-radius: 18px;
  box-shadow: 0 4px 18px rgba(184, 221, 216, 0.1);
  overflow: hidden;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.restaurant-card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-bottom: 5px solid #bb2929;
  border-radius: 18px 18px 0 0;
}

.restaurant-card h3 {
  margin: 20px 0 10px;
  font-size: 1.4rem;
  font-weight: 700;
  color: #ba2512;
}

.restaurant-card button {
  background-color: #cd3317;
  border: none;
  color: white;
  font-weight: 700;
  padding: 12px 0;
  margin: 0 20px 20px;
  border-radius: 30px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.restaurant-card button:hover {
  background-color: #d17676;
}

.restaurant-card:hover {
  transform: translateY(-7px);
  box-shadow: 0 10px 30px rgba(174, 182, 68, 0.3);
}

/* FOOTER */
footer {
  background-color: #d13b3b;
  color: white;
  padding: 25px 0;
  text-align: center;
  font-weight: 600;
  font-size: 1rem;
}

/* Dynamic Content Section */
.dynamic-content {
  padding: 40px 20px;
  /* El display lo controla Vue con v-if/v-show */
}

.dynamic-content h2 {
  font-size: 2rem;
  color: #cc2228;
  margin-bottom: 20px;
}

.dynamic-content p {
  font-size: 1.1rem;
  margin-bottom: 15px;
}

.dynamic-content ul {
  list-style: none;
  margin-bottom: 20px;
  padding-left: 0;
}

.dynamic-content ul li {
  margin-bottom: 8px;
  font-size: 1rem;
}

.dynamic-content form input,
.dynamic-content form textarea {
  width: 100%;
  padding: 8px;
  margin: 5px 0;
  border-radius: 6px;
  border: 1px solid #ccc;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(205, 240, 240, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #fff;
  padding: 25px;
  border-radius: 12px;
  min-width: 320px;
  max-width: 400px;
  position: relative;
  box-shadow: 0 6px 20px rgba(0,0,0,0.25);
}

.close-modal-btn {
  position: absolute;
  top: 8px;
  right: 12px;
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #cc2228;
}

.modal-content h2 {
  margin-bottom: 20px;
}

.modal-content form input,
.modal-content form select {
  width: 100%;
  padding: 8px;
  margin: 5px 0;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.modal-content form button {
  width: 100%;
  margin-top: 15px;
}

/* Media Queries */
@media (max-width: 768px) {
  .hero-content {
    flex-direction: column;
  }

  .hero-text h1 {
    font-size: 2rem;
  }

  .hero-text p {
    font-size: 1.1rem;
  }

  nav ul.nav-links {
    gap: 15px;
  }

  .header-container {
    flex-direction: column;
    gap: 15px;
  }
  .header-actions {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .header-actions button {
    margin: 0 5px;
  }
}
</style>