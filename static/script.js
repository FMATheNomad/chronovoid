const translations = {
    id: {
        loading: "Menyinkronkan ke jam atom...",
        nav_home: "Beranda",
        nav_simulate: "Simulasi",
        home_title: "WAKTU ADALAH SEGALANYA",
        home_subtitle: "Bagaimana dunia menjaga waktu tetap selaras?",
        atomic_label: "TERSINKRONISASI ATOM",
        drift_label: "SELISIH",
        ms_elapsed: "Mikrodetik berlalu sejak halaman dibuka",
        clock_wib: "WIB (Jakarta)",
        clock_utc: "UTC",
        clock_ny: "New York",
        clock_london: "London",
        clock_tokyo: "Tokyo",
        clock_info: "Semua jam di atas tersinkronisasi dalam toleransi \u00b150 mikrodetik dari waktu atom internasional.",
        quote: "Satu mikrodetik meleset. Satu peradaban runtuh.",
        sim_title: "SIMULASI SINKRONISASI",
        sim_desc: "Dua jam virtual dengan offset bawaan. Saksikan proses NTP menyelaraskannya.",
        clock_a: "Jam A (Server)",
        clock_b: "Jam B (Client)",
        inject_btn: "SUNTIK DRIFT",
        reset_btn: "RESET",
        status_drift: "MENYIMPANG",
        status_sync: "MENYINKRONKAN...",
        status_done: "TERSINKRONISASI",
        offset_label: "Offset",
        signal_label: "Sinyal Sinkronisasi",
        ntp_1: "1. Query time request \u2192",
        ntp_2: "2. Server responds with timestamp \u2192",
        ntp_3: "3. Calculate round-trip delay \u2192",
        ntp_4: "4. Adjust Clock B offset \u2192",
        ntp_5: "5. TERSINKRONISASI \u2713",
        manifesto_btn: "Baca Manifesto Chronovoid",
        footer: "Chronovoid \u2014 sebuah eksplorasi waktu, presisi, dan semesta.",
        footer_credits: "Terinspirasi dari NTP, GPS, dan jam atom.",
    },
    en: {
        loading: "Syncing to atomic clock...",
        nav_home: "Home",
        nav_simulate: "Simulate",
        home_title: "TIME IS EVERYTHING",
        home_subtitle: "How does the world keep time in sync?",
        atomic_label: "ATOMIC SYNCHRONIZED",
        drift_label: "DRIFT",
        ms_elapsed: "Microseconds elapsed since page load",
        clock_wib: "WIB (Jakarta)",
        clock_utc: "UTC",
        clock_ny: "New York",
        clock_london: "London",
        clock_tokyo: "Tokyo",
        clock_info: "All clocks above are synchronized within \u00b150 microsecond tolerance of international atomic time.",
        quote: "A microsecond of drift. A civilization collapses.",
        sim_title: "SYNCHRONIZATION SIMULATION",
        sim_desc: "Two virtual clocks with built-in offset. Watch the NTP process align them.",
        clock_a: "Clock A (Server)",
        clock_b: "Clock B (Client)",
        inject_btn: "INJECT DRIFT",
        reset_btn: "RESET",
        status_drift: "DRIFTING",
        status_sync: "SYNCING...",
        status_done: "SYNCHRONIZED",
        offset_label: "Offset",
        signal_label: "Sync Signal",
        ntp_1: "1. Query time request \u2192",
        ntp_2: "2. Server responds with timestamp \u2192",
        ntp_3: "3. Calculate round-trip delay \u2192",
        ntp_4: "4. Adjust Clock B offset \u2192",
        ntp_5: "5. SYNCHRONIZED \u2713",
        manifesto_btn: "Read the Chronovoid Manifesto",
        footer: "Chronovoid \u2014 an exploration of time, precision, and the cosmos.",
        footer_credits: "Inspired by NTP, GPS, and atomic clocks.",
    }
};

let currentLang = 'en';

function detectAndApply() {
    const lang = (navigator.language || (navigator.languages && navigator.languages[0]) || 'en').toLowerCase();
    currentLang = lang.startsWith('id') ? 'id' : 'en';
    applyLanguage(currentLang);
}

function applyLanguage(lang) {
    const t = translations[lang];
    if (!t) return;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (t[key] !== undefined) {
            el.textContent = t[key];
        }
    });
    const loadingEl = document.getElementById('loading-text');
    if (loadingEl) loadingEl.textContent = t.loading;
    document.querySelectorAll('.manifesto-lang').forEach(function(el) {
        el.classList.toggle('active', el.classList.contains('manifesto-lang-' + lang));
    });
}

class VisualEngine {
    constructor() {
        this.canvas = document.getElementById('bg-canvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.stars = [];
        this.nebulaSpots = [];
        this.particles = [];
        this.time = 0;
        this.init();
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        for (let i = 0; i < 400; i++) {
            this.stars.push({
                x: Math.random() * (this.canvas.width || window.innerWidth),
                y: Math.random() * (this.canvas.height || window.innerHeight),
                size: Math.random() * 2 + 0.3,
                speed: Math.random() * 0.4 + 0.05,
                opacity: Math.random() * 0.7 + 0.3,
                twinkleSpeed: Math.random() * 0.03 + 0.005,
                twinklePhase: Math.random() * Math.PI * 2
            });
        }

        const w = this.canvas.width || window.innerWidth;
        const h = this.canvas.height || window.innerHeight;
        this.nebulaSpots = [
            { x: w * 0.3, y: h * 0.4, radius: 350, dx: 0.06, dy: 0.04, color: 'rgba(26, 0, 48, 0.06)' },
            { x: w * 0.7, y: h * 0.6, radius: 300, dx: -0.04, dy: 0.07, color: 'rgba(139, 0, 0, 0.04)' },
            { x: w * 0.5, y: h * 0.3, radius: 250, dx: 0.05, dy: -0.05, color: 'rgba(0, 100, 150, 0.03)' }
        ];

        for (let i = 0; i < 50; i++) {
            this.particles.push({
                x: Math.random() * w, y: Math.random() * h,
                size: Math.random() * 1.5 + 0.3,
                dx: (Math.random() - 0.5) * 0.2, dy: (Math.random() - 0.5) * 0.2,
                opacity: Math.random() * 0.25 + 0.05
            });
        }
    }

    animate() {
        this.time += 0.008;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (const s of this.nebulaSpots) {
            s.x += s.dx; s.y += s.dy;
            if (s.x < -s.radius) s.x = this.canvas.width + s.radius;
            if (s.x > this.canvas.width + s.radius) s.x = -s.radius;
            if (s.y < -s.radius) s.y = this.canvas.height + s.radius;
            if (s.y > this.canvas.height + s.radius) s.y = -s.radius;
            const grad = this.ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.radius);
            grad.addColorStop(0, s.color);
            grad.addColorStop(1, 'transparent');
            this.ctx.fillStyle = grad;
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }

        for (const star of this.stars) {
            star.y -= star.speed;
            if (star.y < -5) {
                star.y = this.canvas.height + 5;
                star.x = Math.random() * this.canvas.width;
            }
            const twinkle = Math.sin(this.time * star.twinkleSpeed * 100 + star.twinklePhase) * 0.3 + 0.7;
            this.ctx.fillStyle = 'rgba(255,255,255,' + (star.opacity * twinkle) + ')';
            this.ctx.beginPath();
            this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            this.ctx.fill();
        }

        for (const p of this.particles) {
            p.x += p.dx; p.y += p.dy;
            if (p.x < 0) p.x = this.canvas.width;
            if (p.x > this.canvas.width) p.x = 0;
            if (p.y < 0) p.y = this.canvas.height;
            if (p.y > this.canvas.height) p.y = 0;
            this.ctx.fillStyle = 'rgba(180,200,255,' + p.opacity + ')';
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fill();
        }

        requestAnimationFrame(() => this.animate());
    }
}

function initGlitchEffect() {
    function schedule() {
        const delay = Math.random() * 7000 + 8000;
        setTimeout(() => {
            document.body.classList.add('page-glitch');
            setTimeout(() => document.body.classList.remove('page-glitch'), 150);
            schedule();
        }, delay);
    }
    schedule();
}

function fmtTime(d) {
    return String(d.getHours()).padStart(2,'0') + ':' +
           String(d.getMinutes()).padStart(2,'0') + ':' +
           String(d.getSeconds()).padStart(2,'0');
}

function fmtTimeMs(d) {
    return String(d.getHours()).padStart(2,'0') + ':' +
           String(d.getMinutes()).padStart(2,'0') + ':' +
           String(d.getSeconds()).padStart(2,'0') + '.' +
           String(d.getMilliseconds()).padStart(3,'0');
}

function getTimeInZone(offset) {
    const now = new Date();
    return new Date(now.getTime() + now.getTimezoneOffset() * 60000 + offset * 3600000);
}

const pageStart = Date.now();

function initClocks() {
    const zones = [
        { id: 'clock-wib', offset: 7 },
        { id: 'clock-utc', offset: 0 },
        { id: 'clock-ny', offset: -4 },
        { id: 'clock-london', offset: 0 },
        { id: 'clock-tokyo', offset: 9 }
    ];

    function update() {
        const elapsed = Date.now() - pageStart;
        for (const z of zones) {
            const el = document.getElementById(z.id);
            if (el) el.textContent = fmtTime(getTimeInZone(z.offset));
        }

        document.querySelectorAll('.clock-drift').forEach(el => {
            const d = (Math.random() - 0.5) * 0.08;
            el.textContent = (d >= 0 ? '+' : '') + d.toFixed(3) + ' \u00b5s';
        });

        const dv = document.getElementById('drift-value');
        if (dv) {
            const d = (Math.random() - 0.5) * 0.002;
            dv.textContent = (d >= 0 ? '+' : '') + d.toFixed(6) + ' \u00b5s';
        }

        const mc = document.getElementById('micro-counter');
        if (mc) mc.textContent = Math.floor(elapsed * 1000).toLocaleString();

        requestAnimationFrame(update);
    }
    update();
}

function initSimulation() {
    let offset = 50;
    let syncing = false;
    let synchronized = false;
    let startSyncTime = 0;
    const SYNC_DURATION = 5000;

    const clockADisp = document.getElementById('clock-a-display');
    const clockBDisp = document.getElementById('clock-b-display');
    const offsetDisp = document.getElementById('offset-value');
    const statusBadge = document.getElementById('status-badge');
    const statusText = document.getElementById('status-text');
    const injectBtn = document.getElementById('inject-btn');
    const resetBtn = document.getElementById('reset-btn');
    const ntpSteps = document.querySelectorAll('.ntp-step');
    const signalCanvas = document.getElementById('signal-canvas');

    function resizeSignal() {
        signalCanvas.width = signalCanvas.clientWidth * 2;
        signalCanvas.height = signalCanvas.clientHeight * 2;
    }
    resizeSignal();
    window.addEventListener('resize', resizeSignal);
    const signalCtx = signalCanvas.getContext('2d');

    function setStatus(state) {
        statusBadge.className = 'clock-badge';
        if (state === 'drift') {
            statusBadge.classList.add('drifting');
            statusText.textContent = translations[currentLang].status_drift;
        } else if (state === 'sync') {
            statusBadge.classList.add('syncing');
            statusText.textContent = translations[currentLang].status_sync;
        } else {
            statusBadge.classList.add('synchronized');
            statusText.textContent = translations[currentLang].status_done;
            clockBDisp.classList.add('synced');
        }
        if (state !== 'done') clockBDisp.classList.remove('synced');
    }

    function resetSteps() {
        ntpSteps.forEach(s => s.classList.remove('active'));
    }

    function runNtpSteps() {
        resetSteps();
        ntpSteps.forEach((s, i) => {
            setTimeout(() => s.classList.add('active'), (i + 1) * 700);
        });
    }

    function injectDrift() {
        const amount = Math.random() * 150 + 50;
        offset += amount;
        syncing = false;
        synchronized = false;
        setStatus('drift');
        clockBDisp.classList.remove('synced');
        resetSteps();
        injectBtn.classList.remove('shockwave');
        void injectBtn.offsetWidth;
        injectBtn.classList.add('shockwave');
        setTimeout(() => {
            if (!syncing && !synchronized && offset > 0.5) startSync();
        }, 1500);
    }

    function startSync() {
        syncing = true;
        synchronized = false;
        startSyncTime = Date.now();
        setStatus('sync');
        runNtpSteps();
    }

    function resetSim() {
        offset = 50;
        syncing = false;
        synchronized = false;
        setStatus('drift');
        clockBDisp.classList.remove('synced');
        resetSteps();
    }

    injectBtn.addEventListener('click', injectDrift);
    resetBtn.addEventListener('click', resetSim);

    let signalPhase = 0;

    function drawSignal(phase) {
        const w = signalCanvas.width;
        const h = signalCanvas.height;
        signalCtx.clearRect(0, 0, w, h);
        const amp = h * 0.3;
        const cy = h / 2;
        const freq = 3;

        signalCtx.strokeStyle = 'rgba(0, 255, 136, 0.5)';
        signalCtx.lineWidth = 2;
        signalCtx.beginPath();
        for (let x = 0; x < w; x++) {
            const y = cy + Math.sin((x / w) * Math.PI * 2 * freq) * amp;
            x === 0 ? signalCtx.moveTo(x, y) : signalCtx.lineTo(x, y);
        }
        signalCtx.stroke();

        const isSynced = synchronized;
        signalCtx.strokeStyle = isSynced ? 'rgba(0, 255, 136, 0.5)' : 'rgba(255, 0, 64, 0.5)';
        signalCtx.lineWidth = 2;
        signalCtx.setLineDash([6, 4]);
        signalCtx.beginPath();
        for (let x = 0; x < w; x++) {
            const y = cy + Math.sin((x / w) * Math.PI * 2 * freq + phase) * amp;
            x === 0 ? signalCtx.moveTo(x, y) : signalCtx.lineTo(x, y);
        }
        signalCtx.stroke();
        signalCtx.setLineDash([]);

        signalCtx.strokeStyle = 'rgba(255,255,255,0.04)';
        signalCtx.lineWidth = 1;
        signalCtx.beginPath();
        signalCtx.moveTo(0, cy);
        signalCtx.lineTo(w, cy);
        signalCtx.stroke();
    }

    setStatus('drift');

    setTimeout(() => {
        if (offset > 0.5 && !syncing && !synchronized) startSync();
    }, 1000);

    let sigTime = 0;

    function updateSim() {
        const now = Date.now();
        const base = now - pageStart;
        const clockA = new Date(base);
        clockADisp.textContent = fmtTimeMs(clockA);

        if (syncing) {
            const elapsed = now - startSyncTime;
            const progress = Math.min(elapsed / SYNC_DURATION, 1);
            offset = 50 * (1 - progress);
            if (offset < 0.3) {
                offset = 0;
                syncing = false;
                synchronized = true;
                setStatus('done');
                ntpSteps.forEach(s => s.classList.add('active'));
            }
        }

        const clockB = new Date(base + offset);
        clockBDisp.textContent = fmtTimeMs(clockB);
        offsetDisp.textContent = offset.toFixed(2);

        sigTime += 0.015;
        const phase = synchronized ? 0 : (offset / 50) * Math.PI * 2;
        drawSignal(phase);

        requestAnimationFrame(updateSim);
    }
    updateSim();
}

function initManifesto() {
    var btn = document.getElementById('manifesto-btn');
    var reveal = document.getElementById('manifesto-reveal');
    if (!btn || !reveal) return;
    btn.addEventListener('click', function() {
        var isOpen = reveal.classList.contains('open');
        if (isOpen) {
            reveal.classList.remove('open');
            btn.textContent = translations[currentLang].manifesto_btn;
        } else {
            reveal.classList.add('open');
            btn.textContent = currentLang === 'id' ? '\u25b2 Tutup Manifesto' : '\u25b2 Close Manifesto';
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    detectAndApply();

    const isHome = document.querySelector('.clocks-grid') !== null;
    const isSim = document.getElementById('sim-panel') !== null;

    new VisualEngine();

    if (isHome) initClocks();
    if (isSim) initSimulation();

    initGlitchEffect();
    initManifesto();

    var path = window.location.pathname.replace(/\/+$/, '');
    document.querySelectorAll('.nav-links a').forEach(function(a) {
        var href = a.getAttribute('href');
        if (href === '.') href = '';
        if (path.endsWith(href) && (href || path.indexOf('/') === path.lastIndexOf('/'))) {
            a.classList.add('active');
        }
    });

    setTimeout(() => {
        const ls = document.getElementById('loading-screen');
        if (ls) ls.classList.add('hidden');
    }, 2500);
});
