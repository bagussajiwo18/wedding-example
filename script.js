/* ==========================================================================
   DIGITAL WEDDING INVITATION - INTERACTIVE SCRIPT (JS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. INITIALIZE DYNAMIC RECIPIENT NAME FROM URL QUERY (?to=Nama+Tamu)
    initGuestName();

    // 2. COVER SCREEN & OPEN INVITATION ACTION
    initCoverScreen();

    // 3. BACKGROUND MUSIC CONTROL
    initAudioPlayer();

    // 4. LIVE COUNTDOWN TIMER
    initCountdownTimer();

    // 5. LIGHTBOX PHOTO GALLERY
    initLightbox();

    // 6. RSVP & GUESTBOOK (LOCALSTORAGE)
    initGuestbook();

    // 7. ACTIVE NAVIGATION TRACKER ON SCROLL
    initScrollSpy();

    // 8. SCROLL REVEAL ANIMATIONS
    initScrollReveal();
});

/* --------------------------------------------------------------------------
   1. GUEST NAME EXTRACTION FROM URL
   -------------------------------------------------------------------------- */
function initGuestName() {
    const urlParams = new URLSearchParams(window.location.search);
    const guestParam = urlParams.get('to') || urlParams.get('nama') || urlParams.get('guest');
    const guestNameElement = document.getElementById('guest-name');
    
    if (guestParam && guestNameElement) {
        // Replace plus signs with spaces and sanitize text
        const formattedName = decodeURIComponent(guestParam.replace(/\+/g, ' '));
        guestNameElement.textContent = formattedName;
    }
}

/* --------------------------------------------------------------------------
   2. COVER SCREEN OPEN ACTION
   -------------------------------------------------------------------------- */
function initCoverScreen() {
    const coverScreen = document.getElementById('cover-screen');
    const btnOpen = document.getElementById('btn-open-invitation');
    const mainContent = document.getElementById('main-content');
    const bgAudio = document.getElementById('bg-music');
    const discIcon = document.querySelector('.disc-icon');

    if (btnOpen && coverScreen) {
        btnOpen.addEventListener('click', () => {
            // Animate cover screen slide up
            coverScreen.classList.add('opened');
            mainContent.classList.remove('locked');

            // Play background music
            if (bgAudio) {
                bgAudio.play().then(() => {
                    if (discIcon) discIcon.classList.add('spinning');
                }).catch(err => {
                    console.log('Audio autoplay prevented by browser policy:', err);
                });
            }

            // Scroll to top of hero smoothly
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

/* --------------------------------------------------------------------------
   3. BACKGROUND MUSIC AUDIO PLAYER
   -------------------------------------------------------------------------- */
function initAudioPlayer() {
    const btnAudio = document.getElementById('btn-audio-toggle');
    const bgAudio = document.getElementById('bg-music');
    const discIcon = document.querySelector('.disc-icon');
    let isPlaying = true;

    if (btnAudio && bgAudio) {
        btnAudio.addEventListener('click', () => {
            if (isPlaying) {
                bgAudio.pause();
                discIcon.classList.remove('spinning');
                isPlaying = false;
            } else {
                bgAudio.play().then(() => {
                    discIcon.classList.add('spinning');
                    isPlaying = true;
                });
            }
        });
    }
}

/* --------------------------------------------------------------------------
   4. LIVE COUNTDOWN TIMER
   -------------------------------------------------------------------------- */
function initCountdownTimer() {
    // Target Date: October 24, 2026 08:00:00 WIB
    const targetDate = new Date('2026-10-24T08:00:00+07:00').getTime();

    // Main section timer elements
    const daysEl    = document.getElementById('days');
    const hoursEl   = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    // Cover page timer elements
    const coverDaysEl    = document.getElementById('cover-days');
    const coverHoursEl   = document.getElementById('cover-hours');
    const coverMinutesEl = document.getElementById('cover-minutes');
    const coverSecondsEl = document.getElementById('cover-seconds');

    function setTimerEl(el, value) {
        if (el) el.textContent = String(value).padStart(2, '0');
    }

    function updateTimer() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference > 0) {
            const days    = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours   = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            setTimerEl(daysEl, days);
            setTimerEl(hoursEl, hours);
            setTimerEl(minutesEl, minutes);
            setTimerEl(secondsEl, seconds);

            setTimerEl(coverDaysEl, days);
            setTimerEl(coverHoursEl, hours);
            setTimerEl(coverMinutesEl, minutes);
            setTimerEl(coverSecondsEl, seconds);
        } else {
            [daysEl, hoursEl, minutesEl, secondsEl,
             coverDaysEl, coverHoursEl, coverMinutesEl, coverSecondsEl].forEach(el => setTimerEl(el, 0));
        }
    }

    updateTimer();
    setInterval(updateTimer, 1000);
}

/* --------------------------------------------------------------------------
   5. LIGHTBOX PHOTO GALLERY MODAL
   -------------------------------------------------------------------------- */
function initLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const highResSrc = item.getAttribute('data-src');
            if (highResSrc && lightboxModal && lightboxImg) {
                lightboxImg.src = highResSrc;
                lightboxModal.classList.add('active');
            }
        });
    });

    if (lightboxClose && lightboxModal) {
        lightboxClose.addEventListener('click', () => {
            lightboxModal.classList.remove('active');
        });

        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                lightboxModal.classList.remove('active');
            }
        });
    }
}

/* --------------------------------------------------------------------------
   6. COPY TO CLIPBOARD & TOAST NOTIFICATION
   -------------------------------------------------------------------------- */
function copyToClipboard(text, label) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            showToast(`${label} berhasil disalin!`);
        }).catch(err => {
            fallbackCopyText(text, label);
        });
    } else {
        fallbackCopyText(text, label);
    }
}

function fallbackCopyText(text, label) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        document.execCommand('copy');
        showToast(`${label} berhasil disalin!`);
    } catch (err) {
        showToast(`Gagal menyalin ${label}`);
    }
    document.body.removeChild(textArea);
}

function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    if (toast && toastMessage) {
        toastMessage.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3200);
    }
}

/* --------------------------------------------------------------------------
   7. RSVP & GUESTBOOK SYSTEM (LOCALSTORAGE)
   -------------------------------------------------------------------------- */
function initGuestbook() {
    const rsvpForm = document.getElementById('rsvp-form');
    const wishesList = document.getElementById('wishes-list');
    const wishesCount = document.getElementById('wishes-count');

    // Default sample wishes if empty
    const defaultWishes = [
        {
            name: "Dimas Anggara & Keluarga",
            status: "Hadir",
            guests: "2 Orang",
            message: "Selamat untuk Rizky dan Amanda! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Aamiin yaa robbal 'aalamiin ✨",
            time: "2 jam yang lalu"
        },
        {
            name: "Siti Nurhaliza",
            status: "Hadir",
            guests: "1 Orang",
            message: "Barakallahu lakuma wa baraka 'alaikuma wa jama'a bainakuma fii khoir. Selamat menempuh hidup baru sahabat tercinta! 💕",
            time: "5 jam yang lalu"
        },
        {
            name: "Budi Santoso",
            status: "Ragu-ragu",
            guests: "1 Orang",
            message: "Selamat ya bro Rizky! Semoga acaranya lancar sampai hari H.",
            time: "1 hari yang lalu"
        }
    ];

    function getStoredWishes() {
        const stored = localStorage.getItem('wedding_wishes_rizky_amanda');
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                return defaultWishes;
            }
        } else {
            localStorage.setItem('wedding_wishes_rizky_amanda', JSON.stringify(defaultWishes));
            return defaultWishes;
        }
    }

    function getStatusBadgeHtml(status) {
        const s = (status || '').toLowerCase();
        if (s.includes('tidak')) {
            return `<span class="badge-attendance tidak-hadir" title="Tidak Hadir" aria-label="Tidak Hadir"><i class="fas fa-times"></i></span>`;
        } else if (s.includes('ragu')) {
            return `<span class="badge-attendance ragu" title="Ragu-ragu" aria-label="Ragu-ragu"><i class="fas fa-question"></i></span>`;
        } else {
            return `<span class="badge-attendance hadir" title="Hadir" aria-label="Hadir"><i class="fas fa-check"></i></span>`;
        }
    }

    function renderWishes() {
        const wishes = getStoredWishes();
        if (!wishesList) return;

        wishesList.innerHTML = '';
        if (wishesCount) wishesCount.textContent = wishes.length;

        wishes.forEach(wish => {
            const wishItem = document.createElement('div');
            wishItem.className = 'wish-item';
            wishItem.innerHTML = `
                <div class="wish-header-line">
                    <span class="wish-author">${escapeHtml(wish.name)}</span>
                    ${getStatusBadgeHtml(wish.status)}
                </div>
                <p class="wish-text">${escapeHtml(wish.message)}</p>
                <span class="wish-time"><i class="far fa-clock"></i> ${escapeHtml(wish.time)}</span>
            `;
            wishesList.appendChild(wishItem);
        });
    }

    if (rsvpForm) {
        rsvpForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameInput = document.getElementById('name-input');
            const statusInput = document.getElementById('status-input');
            const messageInput = document.getElementById('message-input');

            if (!nameInput.value.trim() || !statusInput.value || !messageInput.value.trim()) {
                showToast('Mohon lengkapi seluruh kolom form!');
                return;
            }

            const newWish = {
                name: nameInput.value.trim(),
                status: statusInput.value,
                message: messageInput.value.trim(),
                time: "Baru saja"
            };

            const currentWishes = getStoredWishes();
            currentWishes.unshift(newWish); // Add to top
            localStorage.setItem('wedding_wishes_rizky_amanda', JSON.stringify(currentWishes));

            renderWishes();
            rsvpForm.reset();
            showToast('Konfirmasi & Ucapan Anda berhasil dikirim!');
        });
    }

    renderWishes();
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/* --------------------------------------------------------------------------
   8. ACTIVE NAVIGATION TRACKER ON SCROLL
   -------------------------------------------------------------------------- */
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id], header[id]');
    const navItems = document.querySelectorAll('.nav-item');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSectionId}`) {
                item.classList.add('active');
            }
        });
    });
}

/* --------------------------------------------------------------------------
   9. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
   -------------------------------------------------------------------------- */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    if (!revealElements.length) return;

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.12
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));
}

