/**
 * LUXURY DIGITAL WEDDING INVITATION — JAVASCRIPT LOGIC
 * Pure Vanilla JavaScript (No external libraries/frameworks)
 * Author: AE DICREAT Engine
 */

'use strict';

/* ==========================================================================
   1. CENTRALIZED WEDDING DATA CONFIGURATION
   ========================================================================== */
const weddingConfig = {
    // Mempelai Pria (The Groom)
    groom: {
        name: "Habib",
        fullName: "Habib Yulianto, S.Kom.",
        father: "Bapak H. Sukardi",
        mother: "Ibu Hj. Aminah",
        instagram: "@habibyulianto",
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=700&auto=format&fit=crop"
    },

    // Mempelai Wanita (The Bride)
    bride: {
        name: "Adiba",
        fullName: "Adiba Putri Salsabila, S.Pd.",
        father: "Bapak Drs. H. Bambang Wijaya",
        mother: "Ibu Hj. Siti Nurhaliza",
        instagram: "@adibasalsabila",
        photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=700&auto=format&fit=crop"
    },

    // Cover Photo (Fullscreen)
    coverPhoto: "assets/images/habib_adiba.jpeg",

    // Tanggal Pernikahan (ISO Format untuk Countdown Timer)
    weddingDate: "2026-12-10T10:00:00",

    // Jadwal Acara
    event: {
        akad: {
            title: "Akad Nikah",
            date: "KAMIS, 10 DESEMBER 2026",
            time: "08:00 WIB - 10:00 WIB",
            venue: "Masjid Agung Baiturrahman",
            address: "Jl. Soekarno Hatta No. 45, Kediri, Jawa Timur",
            mapsUrl: "https://maps.google.com/?q=Masjid+Agung+Baiturrahman+Kediri"
        },
        reception: {
            title: "Resepsi Pernikahan",
            date: "KAMIS, 10 DESEMBER 2026",
            time: "11:00 WIB - 14:00 WIB",
            venue: "Grand Ballroom Merdeka Hotel",
            address: "Jl. Basuki Rahmat No. 12, Kediri, Jawa Timur",
            mapsUrl: "https://maps.google.com/?q=Grand+Ballroom+Merdeka+Hotel+Kediri"
        }
    },

    // Love Story Timeline
    loveStory: [
        {
            year: "2019",
            title: "First Meet",
            description: "Pertemuan pertama yang tak sengaja di perpustakaan kampus mengawali percakapan sederhana yang berkesan."
        },
        {
            year: "2020",
            title: "Growing Closer",
            description: "Melewati berbagai obrolan mendalam dan menemukan kesamaan visi serta nilai hidup yang saling melengkapi."
        },
        {
            year: "2023",
            title: "Engagement Day",
            description: "Dengan restu kedua orang tua, kami mengikat janji suci pertunangan untuk melangkah ke jenjang yang lebih serius."
        },
        {
            year: "2026",
            title: "The Wedding Day",
            description: "Mengucap ikrar suci pernikahan di hadapan Allah SWT untuk mengarungi bahtera rumah tangga selamanya."
        }
    ],

    // Editorial Story Quotes
    quote: {
        verse: "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.",
        source: "QS. Ar-Rum: 21",
        story: "Pertemuan ini bukanlah sebuah kebetulan, melainkan takdir indah yang telah dirajut oleh Sang Maha Pencipta. Kami bersyukur atas setiap langkah perjalanan yang membawa kami pada gerbang pernikahan suci ini."
    },

    // Background Audio File (Fallback to Web Audio Synth if offline/blocked)
    music: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-wedding-piano-113045.mp3",

    // Galeri Foto (Editorial Photo Grid & Lightbox)
    gallery: [
        {
            url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=900&auto=format&fit=crop",
            caption: "A Promise Under The Sun",
            type: "portrait"
        },
        {
            url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=900&auto=format&fit=crop",
            caption: "Pure Radiance",
            type: "square"
        },
        {
            url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=900&auto=format&fit=crop",
            caption: "Timeless Embrace",
            type: "square"
        },
        {
            url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1200&auto=format&fit=crop",
            caption: "Editorial Elegance",
            type: "landscape"
        },
        {
            url: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=900&auto=format&fit=crop",
            caption: "Golden Sunset Memories",
            type: "portrait"
        },
        {
            url: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=900&auto=format&fit=crop",
            caption: "Whispers of Love",
            type: "square"
        }
    ],

    // Kartu Rekening Digital (Wedding Gift)
    bankAccounts: [
        {
            bank: "BCA",
            number: "8120938471",
            name: "HABIB YULIANTO"
        },
        {
            bank: "DANA",
            number: "081234567890",
            name: "HABIB YULIANTO"
        },
        {
            bank: "MANDIRI",
            number: "1440019283741",
            name: "ADIBA PUTRI SALSABILA"
        }
    ],

    // Kado Fisik
    physicalGift: {
        receiver: "Habib Yulianto & Adiba Putri",
        phone: "0812-3456-7890",
        address: "Jl. Melati No. 18, RT 03 / RW 02, Kec. Wates, Kab. Kediri, Jawa Timur (Kode Pos 64174)"
    },

    // Initial Wishes (RSVP & Doa Tamu)
    initialWishes: []
};

/* ==========================================================================
   2. GUEST NAME EXTRACTION FROM URL
   ========================================================================== */
function getGuestName() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const guest = urlParams.get('to') || urlParams.get('guest') || urlParams.get('u');
        if (guest && guest.trim() !== '') {
            return decodeURIComponent(guest.trim());
        }
    } catch (e) {
        console.error("Error reading URL parameter:", e);
    }
    return "Tamu Undangan";
}

/* ==========================================================================
   3. DOM MANIPULATION & CONTENT POPULATION
   ========================================================================== */
function populateContent() {
    // 1. Guest Name
    const guestName = getGuestName();
    const guestDisplayElements = document.querySelectorAll('.guest-name-text');
    guestDisplayElements.forEach(el => {
        el.textContent = guestName;
    });

    // 2. Couple Names
    document.querySelectorAll('.groom-short-name').forEach(el => el.textContent = weddingConfig.groom.name);
    document.querySelectorAll('.bride-short-name').forEach(el => el.textContent = weddingConfig.bride.name);

    document.querySelectorAll('.groom-full-name').forEach(el => el.textContent = weddingConfig.groom.fullName);
    document.querySelectorAll('.bride-full-name').forEach(el => el.textContent = weddingConfig.bride.fullName);

    document.querySelectorAll('.groom-parents').forEach(el => {
        el.innerHTML = `Putra dari<br><strong>${weddingConfig.groom.father}</strong><br>&amp; <strong>${weddingConfig.groom.mother}</strong>`;
    });

    document.querySelectorAll('.bride-parents').forEach(el => {
        el.innerHTML = `Putri dari<br><strong>${weddingConfig.bride.father}</strong><br>&amp; <strong>${weddingConfig.bride.mother}</strong>`;
    });

    // 3. Images
    const coverImg = document.getElementById('cover-bg-image');
    if (coverImg) coverImg.src = weddingConfig.coverPhoto;

    const groomImg = document.getElementById('groom-photo');
    if (groomImg) groomImg.src = weddingConfig.groom.photo;

    const brideImg = document.getElementById('bride-photo');
    if (brideImg) brideImg.src = weddingConfig.bride.photo;

    // 4. Events (Akad & Resepsi)
    const akadEl = document.getElementById('akad-card');
    if (akadEl) {
        akadEl.querySelector('.event-date').textContent = weddingConfig.event.akad.date;
        akadEl.querySelector('.event-time').textContent = weddingConfig.event.akad.time;
        akadEl.querySelector('.event-venue-name').textContent = weddingConfig.event.akad.venue;
        akadEl.querySelector('.event-address').textContent = weddingConfig.event.akad.address;
        const akadBtn = akadEl.querySelector('.btn-location');
        if (akadBtn) akadBtn.href = weddingConfig.event.akad.mapsUrl;
    }

    const receptionEl = document.getElementById('reception-card');
    if (receptionEl) {
        receptionEl.querySelector('.event-date').textContent = weddingConfig.event.reception.date;
        receptionEl.querySelector('.event-time').textContent = weddingConfig.event.reception.time;
        receptionEl.querySelector('.event-venue-name').textContent = weddingConfig.event.reception.venue;
        receptionEl.querySelector('.event-address').textContent = weddingConfig.event.reception.address;
        const receptionBtn = receptionEl.querySelector('.btn-location');
        if (receptionBtn) receptionBtn.href = weddingConfig.event.reception.mapsUrl;
    }

    // 5. Love Story Timeline
    const timelineContainer = document.getElementById('timeline-items');
    if (timelineContainer) {
        timelineContainer.innerHTML = weddingConfig.loveStory.map((item, index) => `
            <div class="timeline-item reveal ${index % 2 === 0 ? 'reveal-left' : 'reveal-right'} delay-${(index % 4) + 1}">
                <div class="timeline-dot"></div>
                <div class="timeline-year">${item.year}</div>
                <h4 class="timeline-title">${item.title}</h4>
                <p class="timeline-desc">${item.description}</p>
            </div>
        `).join('');
    }

    // 6. Gallery Grid
    const galleryGrid = document.getElementById('gallery-grid');
    if (galleryGrid) {
        galleryGrid.innerHTML = weddingConfig.gallery.map((photo, index) => `
            <div class="gallery-item ${photo.type} reveal reveal-scale delay-${(index % 4) + 1}" data-index="${index}">
                <img class="gallery-img" src="${photo.url}" alt="${photo.caption}" loading="lazy" />
                <div class="gallery-overlay-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <circle cx="11" cy="11" r="8"/>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                        <line x1="11" y1="8" x2="11" y2="14"/>
                        <line x1="8" y1="11" x2="14" y2="11"/>
                    </svg>
                </div>
            </div>
        `).join('');
    }

    // 7. Bank Accounts (Wedding Gift)
    const bankCardsGrid = document.getElementById('bank-cards-grid');
    if (bankCardsGrid) {
        bankCardsGrid.innerHTML = weddingConfig.bankAccounts.map((account, index) => `
            <div class="bank-card reveal reveal-up delay-${(index % 3) + 1}">
                <div class="bank-card-chip"></div>
                <div class="bank-card-header">
                    <span class="bank-card-logo-text">${account.bank}</span>
                    <span style="font-size: 0.7rem; letter-spacing: 0.1em; color: var(--gold); font-weight: 700;">DIGITAL CARD</span>
                </div>
                <div class="bank-card-number" id="acc-num-${index}">${account.number}</div>
                <div class="bank-card-holder">a.n. ${account.name}</div>
                <button class="btn-copy-account" data-clipboard="${account.number}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                    Salin Rekening
                </button>
            </div>
        `).join('');
    }

    // 8. Physical Gift Details
    const giftReceiver = document.getElementById('gift-receiver');
    if (giftReceiver) giftReceiver.textContent = weddingConfig.physicalGift.receiver;

    const giftPhone = document.getElementById('gift-phone');
    if (giftPhone) giftPhone.textContent = weddingConfig.physicalGift.phone;

    const giftAddress = document.getElementById('gift-address');
    if (giftAddress) giftAddress.textContent = weddingConfig.physicalGift.address;

    const btnCopyAddress = document.getElementById('btn-copy-address');
    if (btnCopyAddress) {
        btnCopyAddress.setAttribute('data-clipboard', `${weddingConfig.physicalGift.receiver}\n${weddingConfig.physicalGift.phone}\n${weddingConfig.physicalGift.address}`);
    }
}

/* ==========================================================================
   4. REALTIME COUNTDOWN TIMER
   ========================================================================== */
function initCountdown() {
    const daysEl = document.getElementById('count-days');
    const hoursEl = document.getElementById('count-hours');
    const minutesEl = document.getElementById('count-minutes');
    const secondsEl = document.getElementById('count-seconds');

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    const targetDate = new Date(weddingConfig.weddingDate).getTime();

    function updateTimer() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference <= 0) {
            daysEl.textContent = "00";
            hoursEl.textContent = "00";
            minutesEl.textContent = "00";
            secondsEl.textContent = "00";
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    updateTimer();
    setInterval(updateTimer, 1000);
}

/* ==========================================================================
   5. BACKGROUND AUDIO CONTROLLER & WEB AUDIO SYNTHESIZER FALLBACK
   ========================================================================== */
let audioPlayer = null;
let isAudioPlaying = false;
let audioSynthContext = null;
let synthOscillator = null;

function initAudio() {
    audioPlayer = new Audio();
    audioPlayer.src = weddingConfig.music;
    audioPlayer.loop = true;
    audioPlayer.preload = 'auto';

    // Handle audio error gracefully by initializing procedural harmonic chord synth
    audioPlayer.addEventListener('error', () => {
        console.warn("External MP3 file could not be loaded; enabling procedural harmonic ambient fallback.");
    });
}

function playRomanticAmbientSynth() {
    try {
        if (!audioSynthContext) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            audioSynthContext = new AudioContext();
        }
        if (audioSynthContext.state === 'suspended') {
            audioSynthContext.resume();
        }

        // Gentle romantic harmonic drone
        const masterGain = audioSynthContext.createGain();
        masterGain.gain.setValueAtTime(0.08, audioSynthContext.currentTime);
        masterGain.connect(audioSynthContext.destination);

        const notes = [261.63, 329.63, 392.00, 523.25]; // C Major Romantic Chord
        notes.forEach((freq, idx) => {
            const osc = audioSynthContext.createOscillator();
            const noteGain = audioSynthContext.createGain();

            osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
            osc.frequency.setValueAtTime(freq, audioSynthContext.currentTime);

            // Subtle tremolo
            noteGain.gain.setValueAtTime(0.3 / (idx + 1), audioSynthContext.currentTime);

            osc.connect(noteGain);
            noteGain.connect(masterGain);
            osc.start();
        });
    } catch (e) {
        console.warn("Web Audio API not supported or blocked", e);
    }
}

function toggleAudio() {
    const musicBtn = document.getElementById('music-toggle-btn');
    if (!musicBtn) return;

    if (isAudioPlaying) {
        if (audioPlayer) audioPlayer.pause();
        if (audioSynthContext && audioSynthContext.state === 'running') {
            audioSynthContext.suspend();
        }
        isAudioPlaying = false;
        musicBtn.classList.remove('playing');
        musicBtn.setAttribute('aria-label', 'Putar Musik');
    } else {
        if (audioPlayer && audioPlayer.src) {
            audioPlayer.play().then(() => {
                isAudioPlaying = true;
                musicBtn.classList.add('playing');
                musicBtn.setAttribute('aria-label', 'Jeda Musik');
            }).catch(() => {
                // If audio play failed (e.g. CORS/offline), use synth
                playRomanticAmbientSynth();
                isAudioPlaying = true;
                musicBtn.classList.add('playing');
            });
        } else {
            playRomanticAmbientSynth();
            isAudioPlaying = true;
            musicBtn.classList.add('playing');
        }
    }
}

/* ==========================================================================
   6. COVER OPENING LOGIC
   ========================================================================== */
function initCover() {
    const btnOpen = document.getElementById('btn-open-invitation');
    const coverScreen = document.getElementById('cover-screen');
    const mainContent = document.getElementById('main-content');
    const musicBtn = document.getElementById('music-toggle-btn');
    const btnHeroSaveDate = document.getElementById('btn-hero-save-date');

    if (btnHeroSaveDate) {
        btnHeroSaveDate.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = document.getElementById('intro') || document.getElementById('save-date');
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    if (!btnOpen || !coverScreen) return;

    btnOpen.addEventListener('click', () => {
        // 1. Slide cover up
        coverScreen.classList.add('opened');

        // 2. Unlock body scroll & mark invitation as opened
        document.body.classList.remove('locked');
        document.body.classList.add('invitation-opened');

        // 3. Make main content visible
        if (mainContent) mainContent.classList.add('visible');

        // 4. Trigger Hero text animations right as cover opens
        const heroSection = document.getElementById('hero');
        if (heroSection) {
            setTimeout(() => {
                heroSection.classList.add('hero-animate');
            }, 100);
        }

        // 5. Reveal floating music player
        if (musicBtn) musicBtn.classList.add('visible');

        // 6. Trigger music playback
        toggleAudio();

        // 7. Trigger Intersection Observer for top items
        setTimeout(() => {
            triggerInitialScrollCheck();
        }, 300);
    });
}

/* ==========================================================================
   7. SCROLL REVEAL (INTERSECTION OBSERVER)
   ========================================================================== */
let revealObserver = null;

function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

    if ('IntersectionObserver' in window) {
        revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: '0px 0px -40px 0px',
            threshold: 0.12
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback for older browsers
        revealElements.forEach(el => el.classList.add('active'));
    }
}

function triggerInitialScrollCheck() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            el.classList.add('active');
        }
    });
}

/* ==========================================================================
   8. DYNAMIC FLOATING FLOWER PETALS & PARTICLES
   ========================================================================== */
function initFloatingPetals() {
    const container = document.getElementById('particles-container');
    if (!container) return;

    const totalPetals = 12;
    for (let i = 0; i < totalPetals; i++) {
        createPetal(container);
    }
}

function createPetal(container) {
    const petal = document.createElement('div');
    petal.classList.add('petal');

    const size = Math.random() * 8 + 6; // 6px to 14px
    const left = Math.random() * 95; // 0% to 95%
    const duration = Math.random() * 7 + 7; // 7s to 14s
    const delay = Math.random() * 10; // 0s to 10s

    petal.style.width = `${size}px`;
    petal.style.height = `${size * 1.3}px`;
    petal.style.left = `${left}%`;
    petal.style.animationDuration = `${duration}s`;
    petal.style.animationDelay = `${delay}s`;

    container.appendChild(petal);
}

/* ==========================================================================
   9. EDITORIAL GALLERY LIGHTBOX MODAL
   ========================================================================== */
let currentGalleryIndex = 0;

function initGalleryLightbox() {
    const modal = document.getElementById('lightbox-modal');
    const modalImg = document.getElementById('lightbox-image');
    const btnClose = document.getElementById('lightbox-close');
    const btnPrev = document.getElementById('lightbox-prev');
    const btnNext = document.getElementById('lightbox-next');

    if (!modal || !modalImg) return;

    // Attach click events on gallery items
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            const index = parseInt(item.getAttribute('data-index'), 10) || 0;
            openLightbox(index);
        });
    });

    function openLightbox(index) {
        currentGalleryIndex = index;
        const photo = weddingConfig.gallery[currentGalleryIndex];
        if (photo) {
            modalImg.src = photo.url;
            modalImg.alt = photo.caption || "Wedding Photo";
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeLightbox() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    function showPrev() {
        currentGalleryIndex = (currentGalleryIndex - 1 + weddingConfig.gallery.length) % weddingConfig.gallery.length;
        const photo = weddingConfig.gallery[currentGalleryIndex];
        modalImg.src = photo.url;
    }

    function showNext() {
        currentGalleryIndex = (currentGalleryIndex + 1) % weddingConfig.gallery.length;
        const photo = weddingConfig.gallery[currentGalleryIndex];
        modalImg.src = photo.url;
    }

    if (btnClose) btnClose.addEventListener('click', closeLightbox);
    if (btnPrev) btnPrev.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });
    if (btnNext) btnNext.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('lightbox-content')) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
    });

    // Touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    modal.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    modal.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchEndX < touchStartX - 50) showNext();
        if (touchEndX > touchStartX + 50) showPrev();
    }, { passive: true });
}

/* ==========================================================================
   10. CLIPBOARD COPY & TOAST NOTIFICATION
   ========================================================================== */
function showToast(message) {
    const toast = document.getElementById('toast-notification');
    const toastText = document.getElementById('toast-message');
    if (!toast) return;

    if (toastText) toastText.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function initClipboard() {
    document.addEventListener('click', (e) => {
        const copyBtn = e.target.closest('[data-clipboard]');
        if (!copyBtn) return;

        const textToCopy = copyBtn.getAttribute('data-clipboard');
        if (!textToCopy) return;

        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(textToCopy).then(() => {
                showToast("Berhasil disalin ke clipboard!");
            }).catch(() => {
                fallbackCopyText(textToCopy);
            });
        } else {
            fallbackCopyText(textToCopy);
        }
    });
}

function fallbackCopyText(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        document.execCommand('copy');
        showToast("Berhasil disalin ke clipboard!");
    } catch (err) {
        showToast("Gagal menyalin teks.");
    }
    document.body.removeChild(textArea);
}

/* ==========================================================================
   11. RSVP FORM & WISHES MANAGEMENT (FIREBASE FIRESTORE REALTIME)
   ========================================================================== */

// Nama koleksi di Firestore
const FIRESTORE_COLLECTION = 'wishes';

// Listener Firestore (disimpan agar bisa di-unsubscribe jika perlu)
let firestoreUnsubscribe = null;

// Promise yang resolve ketika Firebase siap (dibuat sebelum module script jalan)
window.__firebasePromise = new Promise((resolve, reject) => {
    // Jika Firebase sudah terlanjur siap (kecil kemungkinan tapi aman)
    if (window.__firebase) {
        resolve(window.__firebase);
    } else {
        window.__firebaseResolve = resolve;
        window.__firebaseReject = reject;
    }
});

function timeAgo(timestamp) {
    if (!timestamp) return '';
    const now = Date.now();
    const diff = now - timestamp;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);

    if (seconds < 5) return 'Baru saja';
    if (seconds < 60) return `${seconds} detik yang lalu`;
    if (minutes === 1) return '1 menit yang lalu';
    if (minutes < 60) return `${minutes} menit yang lalu`;
    if (hours === 1) return '1 jam yang lalu';
    if (hours < 24) return `${hours} jam yang lalu`;
    if (days === 1) return 'Kemarin';
    if (days < 7) return `${days} hari yang lalu`;
    if (weeks === 1) return '1 minggu yang lalu';
    if (weeks < 5) return `${weeks} minggu yang lalu`;
    if (months === 1) return '1 bulan yang lalu';
    if (months < 12) return `${months} bulan yang lalu`;

    // Fallback: tampilkan tanggal
    const date = new Date(timestamp);
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}

function renderWishes(wishes) {
    const container = document.getElementById('wishes-feed');
    if (!container) return;

    if (!wishes || wishes.length === 0) {
        container.innerHTML = `
            <div style="text-align:center; padding: 2rem; color: var(--text-muted); font-size:0.9rem;">
                Belum ada ucapan. Jadilah yang pertama! 💌
            </div>
        `;
        return;
    }

    container.innerHTML = wishes.map(wish => {
        let badgeClass = 'uncertain';
        let badgeText = '?';
        if (wish.status === 'attending') {
            badgeClass = 'attending';
            badgeText = '✓';
        } else if (wish.status === 'not-attending') {
            badgeClass = 'not-attending';
            badgeText = '✗';
        }

        // Waktu: dari Firestore serverTimestamp (seconds) atau timestamp biasa
        let ts = null;
        if (wish.createdAt && wish.createdAt.seconds) {
            ts = wish.createdAt.seconds * 1000;
        } else if (wish.timestamp) {
            ts = wish.timestamp;
        }

        return `
            <div class="wish-card">
                <div class="wish-header">
                    <span class="wish-author">${escapeHtml(wish.name)}</span>
                    <span class="wish-badge ${badgeClass}">${badgeText}</span>
                </div>
                <p class="wish-message">"${escapeHtml(wish.message)}"</p>
                <div class="wish-time">${ts ? timeAgo(ts) : 'Baru saja'}</div>
            </div>
        `;
    }).join('');
}

function escapeHtml(string) {
    if (!string) return '';
    return String(string)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function initRSVP() {
    // Tampilkan kosong dulu sementara menunggu Firebase
    renderWishes([]);

    // Auto-refresh waktu setiap 30 detik
    setInterval(() => {
        const container = document.getElementById('wishes-feed');
        if (container && container.children.length > 0) {
            // Re-render dengan data terkini hanya untuk update timestamp
            const cards = container.querySelectorAll('.wish-time[data-ts]');
            cards.forEach(el => {
                const ts = parseInt(el.getAttribute('data-ts'));
                if (ts) el.textContent = timeAgo(ts);
            });
        }
    }, 30000);

    // Inisialisasi Firestore realtime listener via Promise
    window.__firebasePromise.then((fb) => {
        const { db, collection, onSnapshot, query, orderBy } = fb;
        const wishesRef = collection(db, FIRESTORE_COLLECTION);
        const q = query(wishesRef, orderBy('createdAt', 'desc'));

        // Unsubscribe listener lama jika ada
        if (firestoreUnsubscribe) firestoreUnsubscribe();

        firestoreUnsubscribe = onSnapshot(q, (snapshot) => {
            const wishes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            renderWishes(wishes);
        }, (err) => {
            console.error('Firestore error:', err);
        });
    }).catch(err => {
        console.error('Firebase tidak tersedia:', err);
    });

    const form = document.getElementById('rsvp-form');
    if (!form) return;

    // Prefill name if available in URL
    const guestName = getGuestName();
    const nameInput = document.getElementById('rsvp-name');
    if (nameInput && guestName !== "Tamu Undangan") {
        nameInput.value = guestName;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = (document.getElementById('rsvp-name')?.value || '').trim();
        const attendance = document.getElementById('rsvp-attendance')?.value;
        const message = (document.getElementById('rsvp-message')?.value || '').trim();

        if (!name || !message) {
            showToast("Harap lengkapi nama dan ucapan doa Anda.");
            return;
        }

        const submitBtn = form.querySelector('[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Mengirim...';
        }

        let fb;
        try {
            fb = await window.__firebasePromise;
        } catch (err) {
            showToast("Koneksi ke database gagal. Periksa koneksi internet Anda.");
            if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Kirim Ucapan & Konfirmasi'; }
            return;
        }

        try {
            const { db, collection, addDoc, serverTimestamp } = fb;
            await addDoc(collection(db, FIRESTORE_COLLECTION), {
                name: name,
                status: attendance,
                message: message,
                createdAt: serverTimestamp()
            });

            form.reset();
            showToast("Terima kasih atas konfirmasi dan ucapan doa Anda! 🎉");

            // Scroll wishes container to top
            const wishesContainer = document.getElementById('wishes-feed');
            if (wishesContainer) wishesContainer.scrollTop = 0;
        } catch (err) {
            console.error('Error saving wish:', err);
            showToast("Gagal mengirim. Periksa koneksi internet Anda.");
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Kirim Ucapan & Konfirmasi';
            }
        }
    });
}

/* ==========================================================================
   12. INITIALIZATION ON DOM CONTENT LOADED
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    // Lock scroll for cover
    document.body.classList.add('locked');

    // Populate data
    populateContent();

    // Initialize modules
    initAudio();
    initCover();
    initCountdown();
    initFloatingPetals();
    initScrollReveal();
    initGalleryLightbox();
    initClipboard();
    initRSVP();

    // Floating music button listener
    const musicBtn = document.getElementById('music-toggle-btn');
    if (musicBtn) {
        musicBtn.addEventListener('click', toggleAudio);
    }
});
