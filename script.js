const characters = [{"src":"portfolio-images/characters/67-kid.png","title":"67 kid"},{"src":"portfolio-images/characters/agresywny-kroliczek-wielkanocny.png","title":"agresywny króliczek wielkanocny"},{"src":"portfolio-images/characters/bunny.png","title":"Bunny"},{"src":"portfolio-images/characters/capybara.png","title":"Capybara"},{"src":"portfolio-images/characters/catnap.png","title":"Catnap"},{"src":"portfolio-images/characters/dino-dealereq.png","title":"dino dealereq"},{"src":"portfolio-images/characters/dino.png","title":"Dino"},{"src":"portfolio-images/characters/dracula.png","title":"dracula"},{"src":"portfolio-images/characters/fallen-angel.png","title":"Fallen Angel"},{"src":"portfolio-images/characters/gru.png","title":"gru"},{"src":"portfolio-images/characters/hamster.png","title":"Hamster"},{"src":"portfolio-images/characters/hello-kitty.png","title":"Hello Kitty"},{"src":"portfolio-images/characters/herobrine-mutant.png","title":"herobrine mutant"},{"src":"portfolio-images/characters/jelen-z-nocy-99.png","title":"Jeleń z nocy 99"},{"src":"portfolio-images/characters/kraken.png","title":"kraken"},{"src":"portfolio-images/characters/labubu.png","title":"Labubu"},{"src":"portfolio-images/characters/lionek-postac.png","title":"lionek (postać)"},{"src":"portfolio-images/characters/lionek.png","title":"lionek"},{"src":"portfolio-images/characters/loskurczakos.png","title":"LosKurczakos"},{"src":"portfolio-images/characters/madzia.png","title":"Madzia"},{"src":"portfolio-images/characters/ma-y-dealereq.png","title":"mały dealereq"},{"src":"portfolio-images/characters/mario.png","title":"Mario"},{"src":"portfolio-images/characters/miki-mouse.png","title":"Miki Mouse"},{"src":"portfolio-images/characters/minion.png","title":"Minion"},{"src":"portfolio-images/characters/nyancat.png","title":"Nyancat"},{"src":"portfolio-images/characters/owca-noob.png","title":"Owca noob"},{"src":"portfolio-images/characters/peppa.png","title":"Peppa"},{"src":"portfolio-images/characters/pisklak-diler.png","title":"Pisklak diler"},{"src":"portfolio-images/characters/pusheen.png","title":"Pusheen"},{"src":"portfolio-images/characters/slenderman.png","title":"slenderman"},{"src":"portfolio-images/characters/smerf.png","title":"Smerf"},{"src":"portfolio-images/characters/sprunki.png","title":"Sprunki"},{"src":"portfolio-images/characters/squidgame-doll.png","title":"Squidgame Doll"},{"src":"portfolio-images/characters/st-funkopop-dustin.png","title":"ST Funkopop Dustin"},{"src":"portfolio-images/characters/st-funkopop-eleven.png","title":"ST Funkopop Eleven"},{"src":"portfolio-images/characters/st-steve-s-bmw.png","title":"ST Steve's BMW"},{"src":"portfolio-images/characters/stitich.png","title":"Stitich"},{"src":"portfolio-images/characters/straszny-dealereq.png","title":"straszny dealereq"},{"src":"portfolio-images/characters/straszny-zelazny.png","title":"straszny żelazny"},{"src":"portfolio-images/characters/traineater.png","title":"traineater"},{"src":"portfolio-images/characters/tralalelo-tralala.png","title":"Tralalelo tralala"},{"src":"portfolio-images/characters/tung-tung-tung-sahur.png","title":"Tung tung tung sahur"},{"src":"portfolio-images/characters/wednesday.png","title":"Wednesday"},{"src":"portfolio-images/characters/zombie-mutant.png","title":"zombie mutant"}];
const items = [{"src":"portfolio-images/items/bigos.png","title":"bigos"},{"src":"portfolio-images/items/blender.png","title":"blender"},{"src":"portfolio-images/items/burger.png","title":"burger"},{"src":"portfolio-images/items/flaga-polski.png","title":"Flaga polski"},{"src":"portfolio-images/items/frytki-mcdonald-s.png","title":"Frytki McDonald's"},{"src":"portfolio-images/items/happymeal-mcdonald-s.png","title":"HappyMeal McDonald's"},{"src":"portfolio-images/items/kieliszek.png","title":"Kieliszek"},{"src":"portfolio-images/items/klapek-starego.png","title":"Klapek starego"},{"src":"portfolio-images/items/kremowka.png","title":"Kremówka"},{"src":"portfolio-images/items/mikrofala.png","title":"mikrofala"},{"src":"portfolio-images/items/napoj-mcdonald-s.png","title":"Napój McDonald's"},{"src":"portfolio-images/items/palionek.png","title":"palionek"},{"src":"portfolio-images/items/pasek-starego.png","title":"Pasek starego"},{"src":"portfolio-images/items/piwo-janka.png","title":"Piwo Janka"},{"src":"portfolio-images/items/placuchy-ziemniaczane.png","title":"Placuchy ziemniaczane"},{"src":"portfolio-images/items/pomidorowa.png","title":"Pomidorowa"},{"src":"portfolio-images/items/ptasie-mleczko.png","title":"Ptasie mleczko"},{"src":"portfolio-images/items/torba-biedronka.png","title":"Torba biedronka"},{"src":"portfolio-images/items/torba-lidl.png","title":"Torba lidl"}];
const trustedCreators = [
    { name: 'palion', src: 'trusted-images/palion.jfif', subs: '2,03 mln sub' },
    { name: 'dealereq', src: 'trusted-images/dealereq.jpg', subs: '1,52mln sub' },
    { name: 'skkf', src: 'trusted-images/skkf.jpg', subs: '1,49mln sub' },
    { name: 'cpotworek', src: 'trusted-images/cpotworek.jfif', subs: '351tys sub' },
    { name: 'doknes', src: 'trusted-images/doknes.png', subs: '1,38mln' }
];
let currentCategory = 'characters';
let currentPage = 1;
const itemsPerPage = 4;
let trustedCenterIndex = 0;
let trustedIsAnimating = false;

function toAssetUrl(rawPath) {
    return rawPath
        .split('/')
        .map((segment) => encodeURIComponent(segment))
        .join('/');
}

function getAssetCandidates(rawPath) {
    const variants = [
        rawPath,
        encodeURI(rawPath),
        toAssetUrl(rawPath),
        rawPath.normalize('NFC'),
        rawPath.normalize('NFD')
    ];

    return [...new Set(variants.filter(Boolean))];
}

function createResilientImage(rawPath, altText) {
    const img = document.createElement('img');
    img.alt = altText;

    const candidates = getAssetCandidates(rawPath);
    let current = 0;

    const loadNext = () => {
        if (current >= candidates.length) {
            img.removeEventListener('error', loadNext);
            return;
        }
        img.src = candidates[current];
        current += 1;
    };

    img.addEventListener('error', loadNext);
    loadNext();
    return img;
}
function getCurrentImages() {
    return currentCategory === 'characters' ? characters : items;
}
function renderGallery() {
    const gallery = document.getElementById('gallery');
    const images = getCurrentImages();
    const start = (currentPage - 1) * itemsPerPage;
    const pageItems = images.slice(start, start + itemsPerPage);
    gallery.innerHTML = '';
    pageItems.forEach((img) => {
        const tile = document.createElement('div');
        tile.className = 'tile';
        const title = document.createElement('h3');
        title.textContent = img.title;
        const image = createResilientImage(img.src, img.title);

        tile.appendChild(title);
        tile.appendChild(image);
        gallery.appendChild(tile);
    });
}
function renderPagination() {
    const pagination = document.getElementById('pagination');
    const totalItems = getCurrentImages().length;
    const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
    if (currentPage > totalPages) {
        currentPage = totalPages;
    }
    pagination.innerHTML = '';
    const prevBtn = document.createElement('button');
    prevBtn.className = 'page-btn';
    prevBtn.textContent = 'Poprzednia';
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage -= 1;
            renderGallery();
            renderPagination();
        }
    });
    pagination.appendChild(prevBtn);
    for (let page = 1; page <= totalPages; page += 1) {
        const pageBtn = document.createElement('button');
        pageBtn.className = `page-btn${page === currentPage ? ' active' : ''}`;
        pageBtn.textContent = String(page);
        pageBtn.addEventListener('click', () => {
            currentPage = page;
            renderGallery();
            renderPagination();
        });
        pagination.appendChild(pageBtn);
    }
    const nextBtn = document.createElement('button');
    nextBtn.className = 'page-btn';
    nextBtn.textContent = 'Następna';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage += 1;
            renderGallery();
            renderPagination();
        }
    });
    pagination.appendChild(nextBtn);
}
function setCategory(category) {
    currentCategory = category;
    currentPage = 1;
    const charactersBtn = document.getElementById('btn-characters');
    const itemsBtn = document.getElementById('btn-items');
    const isCharacters = category === 'characters';
    charactersBtn.classList.toggle('active', isCharacters);
    itemsBtn.classList.toggle('active', !isCharacters);
    charactersBtn.setAttribute('aria-pressed', String(isCharacters));
    itemsBtn.setAttribute('aria-pressed', String(!isCharacters));
    renderGallery();
    renderPagination();
}

function renderTrustedCarousel(animateIncoming = false) {
    const trustedCarousel = document.getElementById('trusted-carousel');
    if (!trustedCarousel) {
        return;
    }

    trustedCarousel.innerHTML = '';

    for (let offset = -1; offset <= 1; offset += 1) {
        const creatorIndex = (trustedCenterIndex + offset + trustedCreators.length) % trustedCreators.length;
        const creator = trustedCreators[creatorIndex];
        const isCenter = offset === 0;

        const item = document.createElement('div');
        item.className = `carousel-item${isCenter ? ' is-center' : ''}`;
        if (animateIncoming && offset === 1) {
            item.classList.add('entering');
        }

        const avatar = createResilientImage(creator.src, creator.name);
        const name = document.createElement('p');
        name.className = 'creator-name';
        name.textContent = creator.name;

        const subs = document.createElement('p');
        subs.className = 'creator-subs';
        const ytIcon = createResilientImage('icons/youtube-icon.png', 'youtube');
        const subsText = document.createElement('span');
        subsText.textContent = creator.subs;
        subs.appendChild(ytIcon);
        subs.appendChild(subsText);

        item.appendChild(avatar);
        item.appendChild(name);
        item.appendChild(subs);

        trustedCarousel.appendChild(item);
    }
}

function stepTrustedCarousel() {
    const trustedCarousel = document.getElementById('trusted-carousel');
    if (!trustedCarousel || trustedIsAnimating) {
        return;
    }

    trustedIsAnimating = true;
    trustedCarousel.classList.add('fading-out');

    setTimeout(() => {
        trustedCenterIndex = (trustedCenterIndex + 1) % trustedCreators.length;
        renderTrustedCarousel(true);
        trustedCarousel.classList.remove('fading-out');
        trustedCarousel.classList.add('fading-in');

        setTimeout(() => {
            trustedCarousel.classList.remove('fading-in');
            trustedIsAnimating = false;
        }, 420);
    }, 280);
}

function startTrustedCarousel() {
    renderTrustedCarousel();
    setInterval(() => {
        stepTrustedCarousel();
    }, 2400);
}
document.getElementById('btn-characters').addEventListener('click', () => setCategory('characters'));
document.getElementById('btn-items').addEventListener('click', () => setCategory('items'));
document.querySelectorAll('.nav-btn, .footer-btn, .cta-btn, .section-arrow').forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const href = btn.getAttribute('href');
        if (!href || !href.startsWith('#')) {
            return;
        }
        const target = document.querySelector(href);
        if (!target) {
            return;
        }
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
    });
});
setCategory(currentCategory);
startTrustedCarousel();
