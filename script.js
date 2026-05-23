document.addEventListener('DOMContentLoaded', function(){
  // --- Multilingual translations map & helper ---
  const translations = {
    en: {
      'nav.cars': 'Cars',
      'nav.about': 'About',
      'nav.contact': 'Contact',
      'hero.title': 'Worldwide Car Sourcing & Shipping',
      'hero.lead': 'I buy premium, sports, hybrid and affordable cars from U.S. dealerships and ship them globally — hassle-free.',
      'hero.browse': 'Browse Cars',
      'hero.quote': 'Get A Quote',
      'cars.title': 'Our Selections',
      'cars.muted': 'Curated inventory by category. Click a card to view details or contact me for custom sourcing.',
      'about.title': 'About Lawrence Auto Mobile',
      'process.title': 'Our Full Process',
      'process.muted': 'We handle every step end-to-end so you receive your vehicle smoothly and securely.',
      'contact.title': 'Get A Quote / Contact',
      'contact.label.name': 'Full name',
      'contact.label.email': 'Email',
      'contact.label.phone': 'Phone (with country code)',
      'contact.label.country': 'Destination country',
      'contact.label.message': 'Message / Vehicle details',
      'contact.submit': 'Send Request',
      'modal.exterior': 'Exterior',
      'modal.interior': 'Interior',
      'modal.contact': 'Contact for this car'
    },
    fr: {
      'nav.cars': 'Voitures',
      'nav.about': 'À propos',
      'nav.contact': 'Contact',
      'hero.title': 'Achat et expédition de voitures dans le monde',
      'hero.lead': "J'achète des voitures premium, sportives, hybrides et abordables auprès de concessionnaires américains et les expédie dans le monde entier — sans tracas.",
      'hero.browse': 'Parcourir les voitures',
      'hero.quote': 'Obtenir un devis',
      'cars.title': 'Nos sélections',
      'cars.muted': "Inventaire sélectionné par catégorie. Cliquez sur une carte pour voir les détails ou contactez-moi pour une recherche personnalisée.",
      'about.title': 'À propos de Lawrence Auto Concierge',
      'process.title': 'Notre processus complet',
      'process.muted': 'Nous gérons chaque étape de bout en bout afin que vous receviez votre véhicule en toute sécurité et sans problème.',
      'contact.title': 'Demander un devis / Contact',
      'contact.label.name': 'Nom complet',
      'contact.label.email': 'Email',
      'contact.label.phone': 'Téléphone (avec indicatif)',
      'contact.label.country': 'Pays de destination',
      'contact.label.message': 'Message / Détails du véhicule',
      'contact.submit': 'Envoyer la demande',
      'modal.exterior': 'Extérieur',
      'modal.interior': 'Intérieur',
      'modal.contact': 'Contacter pour cette voiture'
    },
    es: {
      'nav.cars': 'Coches',
      'nav.about': 'Acerca de',
      'nav.contact': 'Contacto',
      'hero.title': 'Compra y envío de coches a todo el mundo',
      'hero.lead': 'Compro coches premium, deportivos, híbridos y asequibles en concesionarios de EE. UU. y los envío internacionalmente, sin complicaciones.',
      'hero.browse': 'Ver coches',
      'hero.quote': 'Obtener presupuesto',
      'cars.title': 'Nuestras selecciones',
      'cars.muted': 'Inventario seleccionado por categoría. Haga clic en una tarjeta para ver detalles o contácteme para búsquedas personalizadas.',
      'about.title': 'Acerca de Lawrence Auto Concierge',
      'process.title': 'Nuestro proceso completo',
      'process.muted': 'Nos encargamos de cada paso de principio a fin para que reciba su vehículo de forma segura y sin contratiempos.',
      'contact.title': 'Solicitar presupuesto / Contacto',
      'contact.label.name': 'Nombre completo',
      'contact.label.email': 'Correo electrónico',
      'contact.label.phone': 'Teléfono (con código de país)',
      'contact.label.country': 'País de destino',
      'contact.label.message': 'Mensaje / Detalles del vehículo',
      'contact.submit': 'Enviar solicitud',
      'modal.exterior': 'Exterior',
      'modal.interior': 'Interior',
      'modal.contact': 'Contactar por este coche'
    }
  };

  function applyTranslations(lang){
    const map = translations[lang] || translations.en;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const txt = map[key];
      if(txt === undefined) return;
      // If label wraps an input, replace only the text node before the input
      if(el.tagName.toLowerCase() === 'label'){
        let replaced = false;
        for(const node of el.childNodes){
          if(node.nodeType === Node.TEXT_NODE){
            node.nodeValue = txt;
            replaced = true;
            break;
          }
        }
        if(!replaced){ el.textContent = txt; }
      } else {
        el.textContent = txt;
      }
    });

    // Update modal/button texts that don't use data-i18n attributes directly
    const ex = document.getElementById('showExterior'); if(ex) ex.textContent = map['modal.exterior'] || ex.textContent;
    const intr = document.getElementById('showInterior'); if(intr) intr.textContent = map['modal.interior'] || intr.textContent;
    const mcb = document.getElementById('modalContactBtn'); if(mcb) mcb.textContent = map['modal.contact'] || mcb.textContent;
  }

  // language selector
  const langSelect = document.getElementById('langSelect');
  const savedLang = localStorage.getItem('siteLang') || (navigator.language || 'en').slice(0,2);
  if(langSelect){
    langSelect.value = savedLang in translations ? savedLang : 'en';
    applyTranslations(langSelect.value);
    langSelect.addEventListener('change', (e)=>{
      const v = e.target.value;
      localStorage.setItem('siteLang', v);
      applyTranslations(v);
    });
  } else {
    applyTranslations(savedLang in translations ? savedLang : 'en');
  }

  // mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  if(toggle && nav){
    toggle.addEventListener('click', ()=>{
      nav.classList.toggle('active');
    });
    // Close menu when a link is clicked
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
      });
    });
  }

  // footer year
  const y = document.getElementById('year'); if(y) y.textContent = new Date().getFullYear();

  // car card gallery modal
  const modal = document.getElementById('carModal');
  const modalClose = document.querySelector('.modal-close');
  const modalBackdrop = document.querySelector('.modal-backdrop');
  const showExteriorBtn = document.getElementById('showExterior');
  const showInteriorBtn = document.getElementById('showInterior');
  const modalMain = document.getElementById('modalMain');
  const modalThumbnails = document.getElementById('modalThumbnails');
  const prevImageBtn = document.getElementById('prevImage');
  const nextImageBtn = document.getElementById('nextImage');
  const modalDetails = document.getElementById('modalDetails');
  const modalContactBtn = document.getElementById('modalContactBtn');
  let selectedCarName = '';
  let selectedCarId = null;
  let galleryType = 'exterior';
  let currentGallery = [];
  let currentIndex = 0;

  // car data (exterior/interior are arrays; each car has 6 exterior + 6 interior images)
  const carData = {
    'luxury1': {
      name: 'Mercedes S-Class',
      exterior: ['https://media.istockphoto.com/id/2159735706/photo/mercedes-benz-w222-in-the-city.webp?s=612x612&w=is&k=20&c=rA6l6TUJjhf-b8yOR9leNVSFv9Wfl8izhsFwlaPJr9Y=', 'https://media.istockphoto.com/id/2151009638/photo/a-black-mercedes-benz-s-class-cruising-near-herman-park-in-houston.webp?s=612x612&w=is&k=20&c=YnqsWqraO4cNaDmCNO_YKmxArSF5hh3rBMdqZqMGsDU=', 'https://media.istockphoto.com/id/2153271805/photo/a-portrait-of-a-black-mercedes-benz-s-class-cruising-in-a-downtown-district.webp?s=612x612&w=is&k=20&c=jZ5ZoOMqdWeJM8lmyINaXAOU21ULu3qteY7AWVMhv-k=', 'https://media.istockphoto.com/id/1035495968/photo/mercedes-benz-s-class.webp?s=612x612&w=is&k=20&c=jec22kLMeSRxN-3MPKE8rtEjXpBA-v3o39oRmgwCBg8=', 'https://media.istockphoto.com/id/2193129385/photo/mercedes.webp?s=612x612&w=is&k=20&c=voZQJVahCyCmh4Jq19bQTATjbhKNB3q7PYSN2jIGOQY=', 'https://media.istockphoto.com/id/902712314/photo/mercedes-benz-s-320-2017-test-drive-day.webp?s=612x612&w=is&k=20&c=2cXSO3QNtFyuPdhZGFSSGgjHVuGsUvsX5GlE_LIumvo=', 'https://media.istockphoto.com/id/2191328313/photo/s350d.webp?s=612x612&w=is&k=20&c=ae_FNtuQOG9_sd2unk13c6afmuG6lLYjGU2Yc1nZm3c='],
      interior: ['https://media.istockphoto.com/id/537889801/photo/luxurious-interior-on-a-mercedes-benz-s-class.webp?s=612x612&w=is&k=20&c=j27qTgFTbbg7MipS5DqjNnmxo1H47i1nF0BLihztkGs=', 'https://media.istockphoto.com/id/532517289/photo/luxurious-interior-on-a-mercedes-benz-s-class.webp?s=612x612&w=is&k=20&c=Il7PN0RlageWizngTq_tebF9_f0uqT96sUoC35txs90=', 'https://media.istockphoto.com/id/537889787/photo/luxurious-interior-on-a-mercedes-benz-s-class.webp?s=612x612&w=is&k=20&c=GGDZhCH_HjOLp1-QLWPUC7CTK4jEoCkdgTTcc5v7tnc=', 'https://media.istockphoto.com/id/537889807/photo/luxurious-interior-on-a-mercedes-benz-s-class.webp?s=612x612&w=is&k=20&c=7HDHJd3BuT4hDKtQ6hfdbZ-tDcwPQ4dR6u6Bbe_47-Y='],
      desc: 'Comfort, technology, and prestige. The ultimate in luxury sedan performance.'
    },
    'luxury2': {
      name: 'BMW 7 Series',
      exterior: ['https://media.istockphoto.com/id/1493154269/photo/blue-illuminated-interior-and-dashboard-of-a-bmw-7-series-viewed-through-the-open-passenger.webp?s=612x612&w=is&k=20&c=lkqvqLy71uL-fAjxrtAOELYj3cwMyw9KzCJ07ecB2Sc=', 'https://media.istockphoto.com/id/1493154270/photo/bmw-7-series-g70-a-modern-premium-limousine-the-car-on-the-background-of-the-philharmonic-on.webp?s=612x612&w=is&k=20&c=HvFiaIW7Oud6igsRWqtm7B1imVaW09HBehnVDpktusA=', 'https://media.istockphoto.com/id/1493155322/photo/bmw-7-series-g70-a-modern-premium-limousine-the-car-on-the-background-of-the-philharmonic-on.webp?s=612x612&w=is&k=20&c=Bk_47u-uGUnDp9OSMc5n1CCLH5sSS2qDPrhv4yXw8hM=', 'https://media.istockphoto.com/id/1493154266/photo/bmw-7-series-g70-a-modern-premium-limousine-the-car-on-the-background-of-the-philharmonic-on.webp?s=612x612&w=is&k=20&c=846RkRPcatYLZpOnr0KIhvLFyEq8mz73BGpjhgA4erU=', 'https://media.istockphoto.com/id/2187961233/photo/bmw-7-luxury-car-automobile-parked-outdoor-back-view.webp?s=612x612&w=is&k=20&c=ohelrvS8XzwjtP1fioZTntercrLOuxy9Pcm7cP2qcYc=', 'https://media.istockphoto.com/id/2184593639/photo/bmw-7-luxury-car-automobile-parked-outdoor-corner-view.webp?s=612x612&w=is&k=20&c=UUq_VwHx7ymDePqR7qUSY4zMqd2z-icWFHN8utus3_c='],
      interior: ['https://media.istockphoto.com/id/2151896831/photo/bmw-520d.webp?s=612x612&w=is&k=20&c=2gPC6QHNGHpKAupZYG6sgXya6yEh4J-dqlp6Aohbi0Y=', 'https://media.istockphoto.com/id/1164295291/photo/view-to-the-white-and-brown-interior-of-modern-car-with-dashboard-media-system-control-panel.webp?s=612x612&w=is&k=20&c=Dsfmz5RHaDWm7OoemJVVq5fbg1F3LVLzGLvzBH7M1mA=', 'https://media.istockphoto.com/id/1349783868/photo/2021-bmw-8-series-840d-xdrive.webp?s=612x612&w=is&k=20&c=Ev0-41fTrHDKqslmZQidA4mO-8O8ONEMerm5wWy1lZ0=', 'https://media.istockphoto.com/id/1274614161/photo/bmw-the-3-digital-dashboard.webp?s=612x612&w=is&k=20&c=3y1YI9kpn3AXxKkI42HRyUmCxZypq5VTVr4thjStyTo=', 'https://media.istockphoto.com/id/1806203965/photo/bmw-320i.webp?s=612x612&w=is&k=20&c=F2ARh_V21hQZhUlhJYXcyXGES5djLWsuhvzpXPhTuQM=', 'https://media.istockphoto.com/id/1865228799/photo/mercedes-benz-gls-suv-2023-test-drive-day.webp?s=612x612&w=is&k=20&c=X4i8etsR5UcJ7PoUHJ0RwLKn-moTDCn3aENLNfCY34w='],
      desc: 'Dynamic driving and premium finish. A masterpiece of engineering.'
    },
    'sports1': {
      name: 'Porsche 911',
      exterior: ['https://media.istockphoto.com/id/2199736015/photo/2018-porsche-718-boxter-s-orange-color-at-miami-beach-luxury-car-porshche-at-ocean-drive.webp?s=612x612&w=is&k=20&c=vr_JLBJ1UdtNzNzQdqMUhD3MyGCFaaOzYz3FNIVcnYM=', 'https://media.istockphoto.com/id/2212266536/photo/2018-porsche-718-boxter-s-orange-color-at-miami-beach-luxury-car-porshche-at-ocean-drive.webp?s=612x612&w=is&k=20&c=16GUsVCaAEAztFVwnSaI1cJfD8lf6qsw9BsJxKF6iLk=', 'https://media.istockphoto.com/id/2218500780/photo/2018-porsche-718-boxter-s-orange-color-at-miami-beach-luxury-car-porshche-at-ocean-drive.webp?s=612x612&w=is&k=20&c=Z3R1Q11yYwqEUcK4QzpTESf5tHCcxw3xh3WsdEvlU_8=', 'https://media.istockphoto.com/id/2177842197/photo/2018-porsche-718-boxter-s-orange-color-at-miami-beach-luxury-car-porsche-at-ocean-drive-miami.webp?s=612x612&w=is&k=20&c=RVA8lApRYTvqSwMcMmfw0BGG0S-e_oXyiD8m_LVZye8=', 'https://media.istockphoto.com/id/2212266536/photo/2018-porsche-718-boxter-s-orange-color-at-miami-beach-luxury-car-porshche-at-ocean-drive.webp?s=612x612&w=is&k=20&c=16GUsVCaAEAztFVwnSaI1cJfD8lf6qsw9BsJxKF6iLk='],
      interior: ['https://images.unsplash.com/photo-1637087867436-a2994e9799ac?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'https://images.unsplash.com/photo-1699325562353-930a639195b2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'https://cdn.pixabay.com/photo/2020/03/26/09/25/porsche-4969780_1280.jpg', 'images/sports1_int_3.jpg', 'images/sports1_int_4.jpg', 'images/sports1_int_5.jpg', 'images/sports1_int_6.jpg'],
      desc: 'Iconic handling and legendary speed. A legend on the road.'
    },
    'sports2': {
      name: 'Ferrari',
      exterior: ['images/sports2_ext_1.jpg', 'images/sports2_ext_2.jpg', 'images/sports2_ext_3.jpg', 'images/sports2_ext_4.jpg', 'images/sports2_ext_5.jpg', 'images/sports2_ext_6.jpg'],
      interior: ['images/sports2_int_1.jpg', 'images/sports2_int_2.jpg', 'images/sports2_int_3.jpg', 'images/sports2_int_4.jpg', 'images/sports2_int_5.jpg', 'images/sports2_int_6.jpg'],
      desc: 'Ultimate performance and limited availability. The peak of automotive excellence.'
    },
    'hybrid1': {
      name: 'Toyota Prius / Hybrid',
      exterior: ['images/hybrid1_ext_1.jpg', 'images/hybrid1_ext_2.jpg', 'images/hybrid1_ext_3.jpg', 'images/hybrid1_ext_4.jpg', 'images/hybrid1_ext_5.jpg', 'images/hybrid1_ext_6.jpg'],
      interior: ['images/hybrid1_int_1.jpg', 'images/hybrid1_int_2.jpg', 'images/hybrid1_int_3.jpg', 'images/hybrid1_int_4.jpg', 'images/hybrid1_int_5.jpg', 'images/hybrid1_int_6.jpg'],
      desc: 'Efficiency meets reliability. The hybrid that started a revolution.'
    },
    'hybrid2': {
      name: 'Plug-in Hybrid',
      exterior: ['images/hybrid2_ext_1.jpg', 'images/hybrid2_ext_2.jpg', 'images/hybrid2_ext_3.jpg', 'images/hybrid2_ext_4.jpg', 'images/hybrid2_ext_5.jpg', 'images/hybrid2_ext_6.jpg'],
      interior: ['images/hybrid2_int_1.jpg', 'images/hybrid2_int_2.jpg', 'images/hybrid2_int_3.jpg', 'images/hybrid2_int_4.jpg', 'images/hybrid2_int_5.jpg', 'images/hybrid2_int_6.jpg'],
      desc: 'Electric range with gas backup. The future of driving.'
    },
    'affordable1': {
      name: 'Honda Civic',
      exterior: ['images/affordable1_ext_1.jpg', 'images/affordable1_ext_2.jpg', 'images/affordable1_ext_3.jpg', 'images/affordable1_ext_4.jpg', 'images/affordable1_ext_5.jpg', 'images/affordable1_ext_6.jpg'],
      interior: ['images/affordable1_int_1.jpg', 'images/affordable1_int_2.jpg', 'images/affordable1_int_3.jpg', 'images/affordable1_int_4.jpg', 'images/affordable1_int_5.jpg', 'images/affordable1_int_6.jpg'],
      desc: 'Trusted, economical, and dependable. A smart choice for everyday driving.'
    },
    'affordable2': {
      name: 'Toyota Corolla',
      exterior: ['images/affordable2_ext_1.jpg', 'images/affordable2_ext_2.jpg', 'images/affordable2_ext_3.jpg', 'images/affordable2_ext_4.jpg', 'images/affordable2_ext_5.jpg', 'images/affordable2_ext_6.jpg'],
      interior: ['images/affordable2_int_1.jpg', 'images/affordable2_int_2.jpg', 'images/affordable2_int_3.jpg', 'images/affordable2_int_4.jpg', 'images/affordable2_int_5.jpg', 'images/affordable2_int_6.jpg'],
      desc: 'Affordable reliability you can trust. Built to last.'
    }
  };

  function openModal(carId){
    const car = carData[carId];
    if(!car) return;
    selectedCarName = car.name;
    selectedCarId = carId;
    galleryType = 'exterior';
    currentGallery = Array.isArray(car.exterior) ? car.exterior.slice() : [car.exterior];
    currentIndex = 0;
    renderGallery();
    modalDetails.innerHTML = `<h3>${car.name}</h3><p>${car.desc}</p>`;
    if(showExteriorBtn) showExteriorBtn.style.opacity = '1';
    if(showInteriorBtn) showInteriorBtn.style.opacity = '0.6';
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
  }

  function renderGallery(){
    if(!modalMain) return;
    modalMain.src = currentGallery[currentIndex] || '';
    // Thumbnails
    if(modalThumbnails){
      modalThumbnails.innerHTML = '';
      currentGallery.forEach((src, i) => {
        const t = document.createElement('img');
        t.src = src;
        t.className = 'thumb' + (i === currentIndex ? ' active' : '');
        t.alt = `Image ${i+1}`;
        t.addEventListener('click', ()=>{ currentIndex = i; renderGallery(); });
        modalThumbnails.appendChild(t);
      });
    }
  }

  function closeModal(){
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
  }

  // card click to open modal
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
      const carId = card.getAttribute('data-id');
      openModal(carId);
    });
  });

  // modal close button and backdrop
  if(modalClose) modalClose.addEventListener('click', closeModal);
  if(modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  // exterior / interior toggle
  if(showExteriorBtn){
    showExteriorBtn.addEventListener('click', () => {
      if(!selectedCarId) return;
      const car = carData[selectedCarId];
      galleryType = 'exterior';
      currentGallery = Array.isArray(car.exterior) ? car.exterior.slice() : [car.exterior];
      currentIndex = 0;
      renderGallery();
      showExteriorBtn.style.opacity = '1';
      showInteriorBtn.style.opacity = '0.6';
    });
  }
  if(showInteriorBtn){
    showInteriorBtn.addEventListener('click', () => {
      if(!selectedCarId) return;
      const car = carData[selectedCarId];
      galleryType = 'interior';
      currentGallery = Array.isArray(car.interior) ? car.interior.slice() : [car.interior];
      currentIndex = 0;
      renderGallery();
      showInteriorBtn.style.opacity = '1';
      showExteriorBtn.style.opacity = '0.6';
    });
  }

  // prev/next
  if(prevImageBtn){
    prevImageBtn.addEventListener('click', ()=>{
      if(!currentGallery.length) return;
      currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
      renderGallery();
    });
  }
  if(nextImageBtn){
    nextImageBtn.addEventListener('click', ()=>{
      if(!currentGallery.length) return;
      currentIndex = (currentIndex + 1) % currentGallery.length;
      renderGallery();
    });
  }

  // keyboard navigation for modal
  document.addEventListener('keydown', (e)=>{
    if(!modal.classList.contains('show')) return;
    if(e.key === 'ArrowLeft'){ if(prevImageBtn) prevImageBtn.click(); }
    if(e.key === 'ArrowRight'){ if(nextImageBtn) nextImageBtn.click(); }
    if(e.key === 'Escape'){ closeModal(); }
  });

  // modal contact button — scroll to contact form and pre-fill car name
  if(modalContactBtn){
    modalContactBtn.addEventListener('click', () => {
      closeModal();
      const contactSection = document.getElementById('contact');
      const messageField = document.querySelector('[name="message"]');
      if(contactSection){
        contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      if(messageField){
        messageField.value = `I am interested in the ${selectedCarName}. `;
        messageField.focus();
      }
    });
  }

  // Form submission now handled by Formspree
  // No client-side handler needed — Formspree will submit and redirect/show success
});
