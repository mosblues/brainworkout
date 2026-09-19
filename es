<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Brain Workout Books — Sopas de letras con un giro</title>
  <link rel="icon" href="/favicon.png">
  <meta name="description" content="Unite al Brain Workout VIP Club para recibir acertijos extra mensuales, acceso anticipado a nuevas mecánicas, descuentos exclusivos y las soluciones de nuestros libros." />

  <!-- Open Graph -->
  <meta property="og:title" content="Brain Workout Books — Sopas de letras con un giro">
  <meta property="og:description" content="Unite al Brain Workout VIP Club y accedé a soluciones y beneficios exclusivos.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://brainworkoutbooks.com/index-es.html">
  <meta property="og:image" content="https://brainworkoutbooks.com/SDL.png">

  <!-- Inter font -->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap" rel="stylesheet" />

  <style>
    :root{
      --ink:#1f2937;   /* gris oscuro sobrio */
      --btn:#111827;   /* botones sólidos oscuros */
      --paper:#ffffff; /* fondos blancos */
      --stone:#efefef; /* gris claro para imgs */
      --accent:#3b82f6;      /* azul */
      --accent-dark:#1e40af; /* azul más oscuro para hover/borde */
    }
    *{box-sizing:border-box}
    html, body { max-width:100%; overflow-x:hidden; }
    img { max-width:100%; height:auto; }

    body {
      margin: 0;
      padding: 0;
      font-family: 'Inter', system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
      background-image: url('https://brainworkoutbooks.com/pattern.png');
      background-repeat: repeat;
      background-size: auto;
      color:var(--ink);
      line-height: 1.45;
    }

     /* SOCIAL BAND (compact) */
.social-band{ max-width:1200px; margin:.5rem auto 1rem; padding:0 2rem; }
.social-box{ border:7px solid var(--ink); border-radius:20px; background:var(--paper); padding:.5rem .75rem; }
.social-row{ display:flex; justify-content:center; align-items:center; gap:18px; flex-wrap:nowrap; }

/* Botón tipo “tile” con imagen completa */
.app-icon{
  width:56px; height:56px; border-radius:14px; overflow:hidden;
  border-color:transparent;
  box-shadow:0 6px 18px rgba(0,0,0,.08);
  transition: transform .12s ease, box-shadow .12s ease;
  background:transparent; /* la imagen trae su fondo */
}
.app-icon:hover{ transform:translateY(-1px); box-shadow:0 8px 22px rgba(0,0,0,.12); }
.app-icon img{ width:100%; height:100%; display:block; object-fit:cover; }

/* Mobile */
@media (max-width:640px){
  .social-band{ padding:0 1rem; }
  .social-box{ border-width:5px; }
  .app-icon{ width:50px; height:50px; border-radius:12px; }
}

    /* Botón azul para el VIP Club */
.btn-accent{
  background:var(--accent);
  color:#fff;
  border-color:var(--accent-dark);
}
.btn-accent:hover{
  background:var(--accent-dark);
  border-color:var(--accent-dark);
}
.btn-accent:focus-visible{
  outline:none;
  box-shadow:0 0 0 3px rgba(59,130,246,.35);
}

    /* Header global con logo + idiomas */
    .site-header{
      width:100%;
      background:#fff;
      border-bottom:2px solid #000;
    }
    .site-header .wrap{
      max-width:1200px; margin:0 auto; padding:12px 2rem;
      display:flex; align-items:center; justify-content:space-between; gap:16px;
      flex-wrap:wrap;
    }
    .site-header .brand{
      display:flex; align-items:center; gap:10px;
    }
    .site-header .brand img{
      height:56px; width:auto; display:block;
    }

    .language-selector { display:flex; gap:10px; align-items:center; }
    .lang-button {
      display:inline-flex; align-items:center; gap:6px;
      font-weight:600; font-size:14px; text-decoration:none;
      color:var(--ink); background:var(--paper);
      border:1.5px solid var(--ink); padding:6px 10px; border-radius:10px;
      transition: background-color .25s, color .25s, border-color .25s;
      white-space:nowrap;
    }
    .lang-button:hover{ background:#f3f4f6; }
    .active-lang{ background:var(--ink); color:#fff; }
    .flag-icon{ width:18px; height:auto; display:block; }
    .lang-text{ display:inline; }

    /* Hero VIP (fondo blanco) */
.hero{
  max-width:1200px;
  margin: 0 auto;
  padding: 1.25rem 2rem 1.5rem 2rem;
}

.hero-box{
  display:grid;
  gap:24px;
  grid-template-columns: 1.2fr 1fr;
  border:7px solid var(--ink);
  border-radius:20px;
  background:var(--paper);
  padding:1.25rem 1.5rem;
  /* antes: align-items:center; */
  align-items:stretch;       /* para que izquierda y derecha tengan la misma altura */
  min-height: 220px;
}

/* NUEVO: hero-left como columna para título + texto + form */
.hero-left{
  display:flex;
  flex-direction:column;
  gap:.5rem;
}

.hero-left h1{
  margin:.25rem 0 .25rem 0;
  font-size:2.1rem;
  color:var(--ink);
  letter-spacing:.2px;
  font-weight:700;
}

.vip-accent{
  font-weight:900;
  font-size:1.15em;
  letter-spacing:.2px;
  color: var(--accent);
}

.hero-left p{
  margin:.25rem 0 .5rem 0;
  font-size:1rem;
  line-height:1.55;
}

.hero-benefits{
  margin:.25rem 0 .75rem 1rem;
  padding-left:.5rem;
}

.hero-benefits li{
  margin:.25rem 0;
  font-size:1rem;
}

/* NUEVO: contenedor de la imagen del regalo */
.hero-right{
  display:flex;
  justify-content:center;
  align-items:center;
}

.hero-right img.hero-gift{
  max-width:320px;      /* tamaño máximo de ancho */
  width:100%;
  max-height:100%;      /* se ajusta a la altura del contenedor (igual a la de la columna izquierda) */
  height:auto;
}

    /* --- Form VIP styles --- */
    .form-stack{ display:flex; flex-direction:column; gap:10px; }
    .input{
      width:100%; padding:.8rem .9rem; font-size:1rem; border:2px solid var(--ink);
      border-radius:10px; background:#fff; color:var(--ink);
    }
    .input:focus{ outline:none; box-shadow:0 0 0 3px rgba(17,24,39,.15); }
    .sr-only{
      position:absolute!important; width:1px!important; height:1px!important;
      padding:0!important; margin:-1px!important; overflow:hidden!important;
      clip:rect(0,0,0,0)!important; white-space:nowrap!important; border:0!important;
    }
    .hp{ position:absolute; left:-50000px; width:1px; height:1px; overflow:hidden; }

    /* Books wrapper (fondo blanco) */
    .books{ max-width:1200px; margin: 0 auto 2rem auto; padding: 0 2rem; }
    .books-box{
      border:7px solid var(--ink); border-radius:20px; background:var(--paper);
      padding: 1.25rem 1.25rem .5rem 1.25rem;
    }
    .books h2{ text-align:center; font-size:2rem; color:var(--ink); margin:.25rem 0 .25rem 0; }
    .books p.section-sub{ text-align:center; margin:.25rem 0 1rem 0; color:#4b5563; }

    .book-card{
      display:grid; gap:20px; grid-template-columns: 300px 1fr;
      border-bottom:1.5px solid #000; padding: 1.25rem 0;
    }
    .book-card:last-of-type{ border-bottom:none; }
    .book-cover{ display:flex; align-items:flex-start; justify-content:center; }
    .book-cover a{ display:inline-block; }
    .book-cover img{
      width: 260px; border:1.5px solid var(--ink); border-radius:14px; background:var(--stone);
      transition: transform .2s ease, box-shadow .2s ease;
    }
    .book-cover img:hover{ transform: translateY(-2px); box-shadow: 0 6px 18px rgba(0,0,0,.08); }

    .book-body h3{ margin:.25rem 0 .5rem 0; font-size:1.5rem; color:var(--ink); letter-spacing:.2px; }
    .book-body p.desc{ margin:.25rem 0 1rem 0; font-size:1.02rem; color:#374151; line-height:1.6; }
    .book-body h3, .book-body p.desc{ word-break:break-word; }
    .book-body ul{ margin:0 0 1rem 1.1rem; color:#374151; }
    .book-body li{ margin:.25rem 0; font-size:1rem; }

    .actions{ display:flex; gap:10px; flex-wrap:wrap; }
    .btn{
      display:inline-block; text-decoration:none; text-align:center; cursor:pointer;
      padding:.58rem .9rem; font-weight:600; border-radius:8px; border:2px solid var(--ink);
      transition: background-color .25s, color .25s, border-color .25s, transform .06s ease-in;
    }
    .btn:active{ transform: translateY(1px); }
    .btn-primary{ background:var(--btn); color:#fff; border-color:var(--btn); }
    .btn-primary:hover{ background:#0b1220; border-color:#0b1220; }
    .btn-outline{ background:#fff; color:var(--ink); }
    .btn-outline:hover{ background:#f3f4f6; }

    /* Footer */
    footer{ border-top:2px solid #000; padding: 1rem 0; background:#fff; }
    footer p{ text-align:center; margin:0; }

    /* ======= RESPONSIVE ======= */
    @media (max-width: 1024px){ .book-card{ grid-template-columns: 260px 1fr; } }
    @media (max-width: 900px){
      .hero-box{ grid-template-columns:1fr; }
      .book-card{ grid-template-columns:1fr; }
      .book-cover img{ width:100%; max-width: 320px; }
    }
    @media (max-width: 640px){
      .site-header .wrap{ padding:8px 10px; gap:8px; flex-wrap:nowrap; }
      .site-header .brand img{ height:40px; }
      .language-selector{ gap:6px; }
      .lang-button{ padding:4px 6px; border-width:1px; }
      .flag-icon{ width:16px; }
      .lang-text{ display:none; }

      .hero{ padding: 1rem; }
      .hero-box{ padding: 1rem; border-width:5px; }
      .hero-left h1{ font-size:1.8rem; }
      .vip-accent{ font-size:1.22em; }

      .books{ padding: 0 1rem; }
      .books-box{ padding: 1rem; border-width:5px; }
      .book-body p.desc{ font-size: 0.98rem; }
      .actions .btn{ width:100%; }
    }
    @media (max-width: 360px){ .site-header .brand img{ height:36px; } }
  </style>
</head>
<body>

  <!-- HEADER: logo + idiomas -->
  <header class="site-header">
    <div class="wrap">
      <a class="brand" href="/" aria-label="Brain Workout Books — Inicio">
        <img src="https://brainworkoutbooks.com/logo.png" alt="Logo de Brain Workout Books">
      </a>
      <nav class="language-selector" aria-label="Selector de idioma">
        <a href="index.html" class="lang-button" aria-label="English">
          <img src="https://brainworkoutbooks.com/us.svg" alt="English" class="flag-icon">
          <span class="lang-text">EN</span>
        </a>
        <a href="index-es.html" class="lang-button active-lang" aria-label="Español">
          <img src="https://brainworkoutbooks.com/es.svg" alt="Español" class="flag-icon">
          <span class="lang-text">ES</span>
        </a>
      </nav>
    </div>
  </header>

 <!-- HERO / VIP Club -->
<section class="hero" id="vip">
  <div class="hero-box">
    <div class="hero-left">
      <h1>Consigue tu <span class="vip-accent">libro gratis</span></h1>
      <p>Ingresa tu email para obtener un <strong>libro gratuito</strong> de sopas de letras, lleno de puzzles diseñados para relajar, concentrarte y ejercitar tu mente. Ideal para resolver cuando quieras.</p>
      

      <!-- ✅ Form ahora va del lado izquierdo junto al texto -->
      <form id="vip-form" class="form-stack"
            action="https://script.google.com/macros/s/AKfycbyb9SUTzZqSgAVw1G9ClgorPqtclY3s5XJLy57yjNuSu53SYa8hhZ6LiijbVhWD-yNubw/exec"
            method="POST" novalidate>
        <label class="sr-only" for="vip-email">Email</label>
        <input class="input" id="vip-email" name="email" type="email" placeholder="Ingresar email" required autocomplete="email"/>

        <!-- Honeypot anti-spam -->
        <input class="hp"
               type="text"
               name="hp"
               tabindex="-1"
               aria-hidden="true"
               autocomplete="off"
               inputmode="none" />

        <!-- Metadato opcional para tu script -->
        <input type="hidden" name="source" value="vip_home_en"/>

        <button id="vip-submit" class="btn btn-accent" type="submit">Obtener mi libro gratis</button>
        <p id="vip-status" class="sr-only" role="status" aria-live="polite"></p>
      </form>
    </div>

    <!-- Derecha: imagen del regalo -->
    <div class="hero-right">
      <img src="https://brainworkoutbooks.com/gift.png"
           alt="Gift box representing your free puzzle pack"
           class="hero-gift">
    </div>
  </div>
</section>

  <!-- SOCIAL BAND (tiles PNG) -->
<section class="social-band" aria-label="Follow and contact">
  <div class="social-box">
    <div class="social-row">

      <a class="app-icon" href="https://instagram.com/brain_workout_books" target="_blank" rel="noopener" aria-label="Instagram">
        <img src="/icons/instagram.png"
             width="56" height="56" alt="Instagram">
      </a>

      <a class="app-icon" href="https://www.tiktok.com/@brain_workout_books" target="_blank" rel="noopener" aria-label="TikTok">
        <img src="/icons/tiktok.png"
             width="56" height="56" alt="TikTok">
      </a>

      <a class="app-icon" href="https://www.amazon.com/author/brainworkoutbooks" target="_blank" rel="noopener" aria-label="Amazon Author">
        <img src="/icons/amazon.png"
             width="56" height="56" alt="Amazon Author">
      </a>

      <a class="app-icon" href="mailto:info@brainworkoutbooks.com" aria-label="Email">
        <img src="/icons/email.png"
             width="56" height="56" alt="Email">
      </a>

    </div>
  </div>
</section>
  
  <!-- BOOK LIST -->
  <main class="books">
    <div class="books-box">
      <h2>Libros</h2>
      <p class="section-sub">Explorá nuestros títulos y encontrá tu próximo desafío mental.</p>

      <!-- Libro 1: Sopa de Letras (ES) — SDL -->
      <section class="book-card">
        <div class="book-cover">
          <a href="https://www.amazon.com/gp/product/B0F5HND1MC" target="_blank" rel="noopener" aria-label="Sopa de Letras para adultos (ES) en Amazon">
            <img src="https://brainworkoutbooks.com/SDL.png" alt="Tapa de Sopa de Letras para adultos (Español)" loading="lazy">
          </a>
        </div>
        <div class="book-body">
          <h3>5000 Palabras Sopa de Letras en Español</h3>
          <p class="desc">Letra grande y temas variados: ideal para relajarte y entrenar la mente.</p>
          <ul>
            <li>158 Sopas de letras (Sin palabras repetidas)</li>
            <li>Letra grande</li>
            <li>Temáticas variadas</li>
          </ul>
          <div class="actions">
            <a class="btn btn-primary" href="https://www.amazon.com/gp/product/B0F5HND1MC" target="_blank" rel="noopener">Ver en Amazon</a>
            <a class="btn btn-outline" href="/solutionSDL">Soluciones</a>
            <a class="btn btn-outline" href="/SDL_Preview.pdf">Vista Previa</a>
          </div>
        </div>
      </section>

      <!-- Book 0: The Killer is Here (EN) — KIH (con Solutions) -->
      <section class="book-card">
        <div class="book-cover">
          <a href="https://www.amazon.com/gp/product/B0HFMCCVX1" target="_blank" rel="noopener" aria-label="El Asesino está aquí (Spanish) on Amazon">
            <img src="https://brainworkoutbooks.com/AEA.png" alt="El Asesino está aquí  (Spanish) cover" loading="lazy">
          </a>
        </div>
        <div class="book-body">
          <h3>El Asesino está aquí </h3>
          <p class="desc">Una experiencia de sopa de letras policial donde cada puzzle es un caso por resolver</p>
          <ul>
            <li>100 Casos Únicos</li>
            <li>Encuentra Pistas y Resuelve Misterios</li>
            <li>Lógica + Sopa de Letras Combinadas</li>
          </ul>
          <div class="actions">
            <a class="btn btn-primary" href="https://www.amazon.com/gp/product/B0HFMCCVX1" target="_blank" rel="noopener">Amazon - Español</a>
            <a class="btn btn-primary" href="https://www.amazon.com/gp/product/B0GXPN55XG" target="_blank" rel="noopener">Amazon - Inglés</a>
            <a class="btn btn-outline" href="/solutions-es">Soluciones</a>
            <a class="btn btn-outline" href="/AEA_Preview.pdf">Vista Previa</a>
          </div>
        </div>
      </section>

      <section class="book-card">
        <div class="book-cover">
          <a href="https://www.amazon.com/gp/product/B0H4CVLPX4" target="_blank" rel="noopener" aria-label="The Killer is Here Volume 2 (English) on Amazon">
            <img src="https://brainworkoutbooks.com/KIH2.png" alt="The Killer is Here volume 2 (English) cover" loading="lazy">
          </a>
        </div>
        <div class="book-body">
          <h3>The Killer is Here Volumen 2 (Inglés)</h3>
          <p class="desc">Una experiencia de sopa de letras policial donde cada puzzle es un caso por resolver</p>
          <ul>
            <li>100 Nuevos Casos Únicos</li>
            <li>Encuentra Pistas y Resuelve Misterios</li>
            <li>Lógica + Sopa de Letras Combinadas</li>
          </ul>
          <div class="actions">
            <a class="btn btn-primary" href="https://www.amazon.com/gp/product/B0H4CVLPX4" target="_blank" rel="noopener">Ver en Amazon</a>
            <a class="btn btn-outline" href="/solutionKIH2">Soluciones</a>
            <a class="btn btn-outline" href="/KIH2_Preview.pdf">Vista Previa</a>
          </div>
        </div>
      </section>
      
      <!-- Book 0: Word Search Dictionary (EN-ES) — AZB (con Solutions) -->
      <section class="book-card">
        <div class="book-cover">
          <a href="https://www.amazon.com/gp/product/B0GVS6RMZD" target="_blank" rel="noopener" aria-label="Word Search Dictionary (English/Spanish) on Amazon">
            <img src="https://brainworkoutbooks.com/AZB.png" alt="Word Search Dictionary (English/Spanish) cover" loading="lazy">
          </a>
        </div>
        <div class="book-body">
          <h3>Sopa de Letras Diccionario (Inglés/Español)</h3>
          <p class="desc">Un diccionario bilingüe, en el que cada palabra en Inglés está conectada a su traducción al Español</p>
          <ul>
            <li>16000 Palabras</li>
            <li>4 libros en 1</li>
            <li>400 Sopas</li>
          </ul>
          <div class="actions">
            <a class="btn btn-primary" href="https://www.amazon.com/gp/product/B0GVS6RMZD" target="_blank" rel="noopener">Ver en Amazon</a>
            <a class="btn btn-outline" href="/solutionAZB">Soluciones</a>
            <a class="btn btn-outline" href="/AZB_Preview.pdf">Vista Previa</a>
          </div>
        </div>
      </section>
      
      <!-- Libro 2: 5000 Unique Words (EN) — WSB (con Soluciones) -->
      <section class="book-card">
        <div class="book-cover">
          <a href="https://www.amazon.com/gp/product/B0F498TWBK" target="_blank" rel="noopener" aria-label="5000 Unique Words (English) en Amazon">
            <img src="https://brainworkoutbooks.com/WSB.png" alt="Tapa de 5000 Unique Words (English)" loading="lazy">
          </a>
        </div>
        <div class="book-body">
          <h3>5000 Large Print Word Search Book (Inglés)</h3>
          <p class="desc">Sopas de letras clásicas con un giro fresco. Letra grande, grillas amplias y horas de diversión relajante.</p>
          <ul>
            <li>158 Sopas de letras (Sin palabras repetidas)</li>
            <li>Letra grande</li>
            <li>Temáticas variadas</li>
          </ul>
          <div class="actions">
            <a class="btn btn-primary" href="https://www.amazon.com/gp/product/B0F498TWBK" target="_blank" rel="noopener">Ver en Amazon</a>
            <a class="btn btn-outline" href="/solutionWSB">Soluciones</a>
            <a class="btn btn-outline" href="/WSB_Preview.pdf">Vista Previa</a>
          </div>
        </div>
      </section>
      
      <!-- Book 0: Find Yourself Word Search (EN) — FYB (con Solutions) -->
      <section class="book-card">
        <div class="book-cover">
          <a href="https://www.amazon.com/gp/product/B0G44LPZKY" target="_blank" rel="noopener" aria-label="Find Yourself Word Search (English) on Amazon">
            <img src="https://brainworkoutbooks.com/FYB.png" alt="Find Yourself Word Search (English) cover" loading="lazy">
          </a>
        </div>
        <div class="book-body">
          <h3>Find Yourself Word Search Experience (Inglés)</h3>
          <p class="desc">Descubrí una experiencia de sopa de letras única: personal, creativa y sorprendentemente introspectiva</p>
          <ul>
            <li>5000 Nombres</li>
            <li>365 Desafíos</li>
            <li>90 Sopas de Letras</li>
          </ul>
          <div class="actions">
            <a class="btn btn-primary" href="https://www.amazon.com/gp/product/B0G44LPZKY" target="_blank" rel="noopener">Ver en Amazon</a>
            <a class="btn btn-outline" href="/solutionFYB">Soluciones</a>
            <a class="btn btn-outline" href="/FYB_Preview.pdf">Vista Previa</a>
          </div>
        </div>
      </section>

      <!-- Libro 3: Positive Vibes -->
      <section class="book-card">
        <div class="book-cover">
          <a href="https://www.amazon.com/gp/product/B0FCFRGNS8" target="_blank" rel="noopener" aria-label="Positive Vibes Word Search en Amazon">
            <img src="https://brainworkoutbooks.com/PVB.png" alt="Tapa de Positive Vibes Word Search" loading="lazy">
          </a>
        </div>
        <div class="book-body">
          <h3>Positive Vibes Word Search (Inglés)</h3>
          <p class="desc">Frases inspiradoras y puzzles amenos: relajate, recargate y jugá.</p>
          <ul>
            <li>80+ Sopas en 3 niveles</li>
            <li>Temas positivos y motivadores</li>
            <li>Letra grande</li>
          </ul>
          <div class="actions">
            <a class="btn btn-primary" href="https://www.amazon.com/gp/product/B0FCFRGNS8" target="_blank" rel="noopener">Ver en Amazon</a>
            <a class="btn btn-outline" href="/PVB_Preview.pdf">Vista Previa</a>
          </div>
        </div>
      </section>

      <!-- Libro 4: Cat Lover's Coloring Word Search -->
      <section class="book-card">
        <div class="book-cover">
          <a href="https://www.amazon.com/gp/product/B0FHKHM815" target="_blank" rel="noopener" aria-label="Cat Lover's Coloring Word Search en Amazon">
            <img src="https://brainworkoutbooks.com/CAT.png" alt="Tapa de Cat Lover's Coloring Word Search" loading="lazy">
          </a>
        </div>
        <div class="book-body">
          <h3>Cat Lover's Coloring Word Search (Inglés)</h3>
          <p class="desc">Sopa de letras coloreable: escenas felinas, datos curiosos y mucha onda cozy.</p>
          <ul>
            <li>Ilustraciones a página completa</li>
            <li>Datos curiosos de gatos</li>
            <li>Letras gruesas para colorear</li>
          </ul>
          <div class="actions">
            <a class="btn btn-primary" href="https://www.amazon.com/gp/product/B0FHKHM815" target="_blank" rel="noopener">Ver en Amazon</a>
            <a class="btn btn-outline" href="/CAT_Preview.pdf">Vista Previa</a>
          </div>
        </div>
      </section>

      <!-- Libro 5: Mindfulness Word Search -->
      <section class="book-card">
        <div class="book-cover">
          <a href="https://www.amazon.com/gp/product/B0F9WPXBZ5" target="_blank" rel="noopener" aria-label="Mindfulness Word Search en Amazon">
            <img src="https://brainworkoutbooks.com/MFB.png" alt="Tapa de Mindfulness Word Search" loading="lazy">
          </a>
        </div>
        <div class="book-body">
          <h3>Mindfulness Word Search (Inglés)</h3>
          <p class="desc">Reflexiones para calmar + Sopas atrapantes: encontrá tu esencia palabra a palabra.</p>
          <ul>
            <li>80+ Sopas</li>
            <li>Reflexiones de mindfulness</li>
            <li>Letra grande</li>
          </ul>
          <div class="actions">
            <a class="btn btn-primary" href="https://www.amazon.com/gp/product/B0F9WPXBZ5" target="_blank" rel="noopener">Ver en Amazon</a>
            <a class="btn btn-outline" href="/MFB_Preview.pdf">Vista Previa</a>
          </div>
        </div>
      </section>

<!-- Libro 2: Sopa de Letras Navideña (ES) — SDL -->
      <section class="book-card">
        <div class="book-cover">
          <a href="https://www.amazon.com/gp/product/B0FVLS5HFK" target="_blank" rel="noopener" aria-label="Sopa de Letras Navideña (ES) en Amazon">
            <img src="https://brainworkoutbooks.com/NVB.png" alt="Tapa de Sopa de Letras Navideña (Español)" loading="lazy">
          </a>
        </div>
        <div class="book-body">
          <h3>3000 Palabras Navideñas en Español</h3>
          <p class="desc">Celebra la temporada con sopas de letras en español inspiradas en las tradiciones navideñas.
Letra grande, sopas creativas y un toque de magia festiva.</p>
          <ul>
            <li>100 Sopas de letras</li>
            <li>Letra grande</li>
            <li>Temas navideños, cuentos, recetas y villancicos</li>
          </ul>
          <div class="actions">
            <a class="btn btn-primary" href="https://www.amazon.com/gp/product/B0FVLS5HFK" target="_blank" rel="noopener">Ver en Amazon</a>
            <a class="btn btn-outline" href="/solutionNVB">Soluciones</a>
            <a class="btn btn-outline" href="/NVB_Preview.pdf">Vista Previa</a>
          </div>
        </div>
      </section>

      
      <!-- Book 0: 3000 Christmas Words (EN) — CHB (con Solutions) -->
      <section class="book-card">
        <div class="book-cover">
          <a href="https://www.amazon.com/gp/product/B0FWLKT2GC" target="_blank" rel="noopener" aria-label="3000 Christmas Words (English) on Amazon">
            <img src="https://brainworkoutbooks.com/CHB.png" alt="3000 Christmas Words (English) cover" loading="lazy">
          </a>
        </div>
        <div class="book-body">
          <h3>3000 Christmas Word Search Advent Calendar (Inglés)</h3>
          <p class="desc">Celebra la temporada con sopas de letras en español inspiradas en las tradiciones navideñas.
Letra grande, sopas creativas y un toque de magia festiva.</p>
          <ul>
            <li>100 Sopas de letras</li>
            <li>Letra grande</li>
            <li>Temas navideños, cuentos, recetas y villancicos</li>
          </ul>
          <div class="actions">
            <a class="btn btn-primary" href="https://www.amazon.com/gp/product/B0FWLKT2GC" target="_blank" rel="noopener">Ver en Amazon</a>
            <a class="btn btn-outline" href="/solutionCHB">Soluciones</a>
            <a class="btn btn-outline" href="/CHB_Preview.pdf">Vista Previa</a>
          </div>
        </div>
      </section>


    </div>
  </main>

  <footer>
    <p>© <span id="y"></span> Brain Workout Books</p>
  </footer>

  <script>
    // Año del footer
    const yEl = document.getElementById('y');
    if (yEl) yEl.textContent = new Date().getFullYear();

    // Envío "fire-and-forget": sendBeacon -> fetch keepalive -> redirección inmediata
    (function(){
      const form = document.getElementById('vip-form');
      if (!form) return;

      const ENDPOINT = form.action; // usa la URL del form
      const emailInput = document.getElementById('vip-email');

      form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Honeypot: si está lleno, simulamos éxito y redirigimos
        const hp = form.querySelector('input[name="hp"]');
        if (hp && hp.value) {
          window.location.assign('https://www.brainworkoutbooks.com/thank-you-es.html');
          return;
        }

        // Validación mínima
        if (!emailInput.checkValidity()){
          emailInput.reportValidity();
          return;
        }

        // Serializar como x-www-form-urlencoded
        const fd = new FormData(form);
        const bodyString = new URLSearchParams(fd).toString();

        // 1) Intentar con sendBeacon (ideal para redirigir sin esperar)
        let sent = false;
        try {
          if (navigator.sendBeacon) {
            const blob = new Blob([bodyString], { type: 'text/plain;charset=UTF-8' });
            sent = navigator.sendBeacon(ENDPOINT, blob);
          }
        } catch(_) {}

        // 2) Fallback: fetch con keepalive (sin esperar respuesta)
        if (!sent) {
          try {
            fetch(ENDPOINT, {
              method: 'POST',
              mode: 'no-cors',
              keepalive: true,
              headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
              body: bodyString
            });
          } catch(_) {}
        }

        // 3) Redirigir inmediatamente
        window.location.assign('https://www.brainworkoutbooks.com/thank-you-es.html');
      });
    })();
  </script>
</body>
</html>
