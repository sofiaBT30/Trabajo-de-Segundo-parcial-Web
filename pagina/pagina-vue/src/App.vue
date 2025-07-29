<template>
  <div>
    <!-- HEADER -->
    <header>
      <div class="container header-container">
        <nav>
          <ul class="nav-links">
            <li><a href="#" class="active">Inicio</a></li>
            <li><a href="#">Menú</a></li>
            <li><a href="#">Ofertas</a></li>
            <li><a href="#">Reservas</a></li>
            <li><a href="#">Contacto</a></li>
          </ul>
        </nav>
        <div class="header-actions">
          <button>Iniciar Sesión</button>
          <button>Registrarse</button>
        </div>
      </div>
    </header>

    <main>
      <!-- SECCIÓN DE RESTAURANTES -->
      <section class="restaurants">
        <h2>Nuestros Restaurantes</h2>
        <div class="restaurant-grid">
          <div class="restaurant-card">
            <img src="/corviche.jpg" alt="corviche" />
            <h3>Corviche</h3>
            <button>Reservar</button>
          </div>
          <div class="restaurant-card">
            <img src="/encebollado.jpg" alt="encebollado" />
            <h3>Encebollado</h3>
            <button>Reservar</button>
          </div>
          <div class="restaurant-card">
            <img src="/hamburguesa.jpg" alt="Hamburguesa" />
            <h3>Hamburguesa</h3>
            <button>Reservar</button>
          </div>
          <div class="restaurant-card">
            <img src="/mesa1.jpg" alt="Mesa 1" />
            <h3>Mesa 1</h3>
            <button>Reservar</button>
          </div>
          <div class="restaurant-card">
            <img src="/mesa2.jpg" alt="Mesa 2" />
            <h3>Mesa 2</h3>
            <button>Reservar</button>
          </div>
          <div class="restaurant-card">
            <img src="/mesa4.jpg" alt="Mesa 4" />
            <h3>Mesa 4</h3>
            <button>Reservar</button>
          </div>
          <div class="restaurant-card">
            <img src="/mesa6.jpg" alt="Mesa 6" />
            <h3>Mesa 6</h3>
            <button>Reservar</button>
          </div>
          <div class="restaurant-card">
            <img src="/mesas.jpg" alt="Mesas" />
            <h3>Mesas</h3>
            <button>Reservar</button>
          </div>
          <div class="restaurant-card">
            <img src="/perfil.jpg" alt="Perfil" />
            <h3>Perfil</h3>
            <button>Reservar</button>
          </div>
          <div class="restaurant-card">
            <img src="/pizza.jpg" alt="Pizza" />
            <h3>Pizza</h3>
            <button>Reservar</button>
          </div>
          <div class="restaurant-card">
            <img src="/salchipapas.jpg" alt="Salchipapas" />
            <h3>Salchipapas</h3>
            <button>Reservar</button>
          </div>
        </div>
      </section>

      <!-- FORMULARIO DE REGISTRO -->
      <section class="container" style="padding: 30px 0;">
        <h2>Registro de Usuario</h2>
        <form id="registerForm" class="form-style">
          <input type="text" id="regName" placeholder="Nombre completo" required />
          <input type="email" id="regEmail" placeholder="Correo electrónico" required />
          <input type="password" id="regPassword" placeholder="Contraseña" required />
          <button type="submit" class="btn-primary">Registrarse</button>
        </form>
      </section>

      <!-- FORMULARIO DE RESERVA -->
      <section class="container" style="padding: 30px 0;">
        <h2>Realiza tu Reserva</h2>
        <form id="reservationForm" class="form-style">
          <select id="resRestaurant" required>
            <option disabled selected>Selecciona restaurante</option>
            <option value="Pizza">Pizza</option>
            <option value="Corviche">Corviche</option>
            <option value="Shuzi">Shuzi</option>
            <option value="Salchipapas">Salchipapas</option>
            <option value="Hamburguesa">Hamburguesa</option>
            <option value="Encebollado">Encebollado</option>
          </select>
          <input type="text" id="resName" placeholder="Nombre completo" required />
          <input type="email" id="resEmail" placeholder="Correo electrónico" required />
          <input type="date" id="resDate" required />
          <input type="time" id="resTime" required />
          <button type="submit" class="btn-primary">Reservar</button>
        </form>
      </section>

      <!-- SECCIÓN DE RESEÑAS -->
      <section id="app" class="container" style="padding: 30px;">
        <div v-if="!enviado">
          <h2>Deja tu reseña</h2>
          <input type="text" v-model="nombre" placeholder="Tu nombre" /><br/><br/>
          <textarea v-model="mensaje" placeholder="Tu reseña" rows="4"></textarea><br/><br/>
          <label>Tu puntuación:</label><br/>
          <div style="font-size: 24px;">
            <span
              v-for="n in 5"
              :key="n"
              @click="puntuacion = n"
              style="cursor: pointer; color: gold;"
            >
              {{ n <= puntuacion ? '★' : '☆' }}
            </span>
          </div><br/>
          <button @click="enviarFormulario" class="btn-primary">Enviar reseña</button>
        </div>

        <div v-else>
          <h3>¡Gracias por tu reseña, {{ nombre }}!</h3>
          <p><strong>Tu reseña:</strong> {{ mensaje }}</p>
          <p><strong>Tu puntuación:</strong>
            <span style="font-size: 22px; color: gold;">
              <span v-for="n in 5" :key="n">
                {{ n <= puntuacion ? '★' : '☆' }}
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
  </div>
</template>
