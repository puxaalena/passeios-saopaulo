
const calendar = document.getElementById("calendar");
const lista = document.getElementById("lista-passeios");

const start = 14;
const end = 31;
let passeios = {};

// ==== Calendar configuration ====
const year = 2026;
const month = 0; // January = 0

// First weekday of the month (0 = Sunday)
const firstWeekday = new Date(year, month, 1).getDay();

// Total days in the month
const totalDays = new Date(year, month + 1, 0).getDate();

// Insert blank divs before day 1 for correct alignment
for (let i = 0; i < firstWeekday; i++) {
    const blank = document.createElement("div");
    blank.classList.add("dia");
    blank.style.visibility = "hidden"; // invisible placeholder
    calendar.appendChild(blank);
}

// Create day divs
for (let day = 1; day <= totalDays; day++) {
    const div = document.createElement("div");
    div.classList.add("dia");
    div.textContent = day;

    // Optional: highlight today
    const today = new Date();
    if (
        day === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear()
    ) {
        div.classList.add("hoje");
    }

    // Active days logic
    if (day >= start && day <= end) {
        div.classList.add("ativo");
        div.addEventListener("click", (event) => abrirDia(day, event));
    } else {
        div.style.opacity = 0.4;
    }

    calendar.appendChild(div);
}

// ==== Function to open selected day ====
function abrirDia(dia, event) {
    document.querySelectorAll(".dia").forEach((d) =>
        d.classList.remove("selecionado")
    );
    event.currentTarget.classList.add("selecionado");

    // Show passeios
    lista.innerHTML = "";
    if (!passeios[dia] || passeios[dia].length === 0) {
        lista.innerHTML = "<p>Nenhum passeio adicionado.</p>";
    } else {
        passeios[dia].forEach((p) => {
            const card = document.createElement("div");
            card.classList.add("passeio-card");
            card.innerHTML = `
                <img src="${p.foto}" />
                <div class="conteudo">
                    <h3>${p.nome}</h3>
                    <p>${p.descricao || ""}</p>
                </div>
            `;
            card.onclick = () => window.location.href = p.link;
            lista.appendChild(card);
        });
    }
}

// ==== Function to add passeios ====
function addPasseio(dia, nome, foto, link, descricao) {
    if (!passeios[dia]) passeios[dia] = [];
    passeios[dia].push({ nome, foto, link, descricao });
}

// ==== PASSEIOS ORGANIZADOS — JANEIRO 2026 ====

// 15/01 — Parque Ibirapuera + MAC USP
addPasseio(
  15,
  "Parque Ibirapuera",
  "imgs/ibirapuera.jpg",
  "https://parqueibirapuera.org/",
  "Caminhada, descanso e contato com a natureza no principal parque de São Paulo."
);

addPasseio(
  15,
  "MAC USP",
  "imgs/mac usp.jpg",
  "https://www.mac.usp.br/",
  "Museu de Arte Contemporânea da USP com vista panorâmica da cidade."
);

// 17/01 — Edifício Altino Arantes (Farol Santander)
addPasseio(
  17,
  "Edifício Altino Arantes (Farol Santander)",
  "imgs/altino.jpg",
  "https://farolsantander.com.br/",
  "Prédio histórico com vários andares, exposições, experiências culturais e mirante."
);

// 19/01 — Beco do Batman
addPasseio(
  19,
  "Beco do Batman",
  "imgs/beco.jpg",
  "https://www.google.com/maps/place/Beco+do+Batman/",
  "Galeria de arte urbana a céu aberto na Vila Madalena, ideal para fotos e caminhada."
);

// 20/01 — MIS + MASP (terça-feira gratuita)
addPasseio(
  20,
  "MIS – Museu da Imagem e do Som",
  "imgs/mis.jpg",
  "https://mis-sp.org.br/",
  "Museu com exposições audiovisuais e experiências interativas. Entrada gratuita às terças."
);

addPasseio(
  20,
  "MASP",
  "imgs/maspcapa.jpg",
  "https://masp.org.br/",
  "Museu de Arte de São Paulo, ícone da Avenida Paulista. Entrada gratuita às terças."
);

// 22/01 — Museu Catavento
addPasseio(
  22,
  "Museu Catavento",
  "imgs/catavento.jpg",
  "https://museucatavento.org.br/",
  "Museu de ciência interativo, com experiências práticas e educativas."
);

// 24/01 — CCBB
addPasseio(
  24,
  "CCBB – Centro Cultural Banco do Brasil",
  "imgs/ccbb.jpg",
  "https://www.bb.com.br/site/ccbb/",
  "Centro cultural com exposições, cinema e atividades gratuitas."
);

// 26/01 — Museu da Língua Portuguesa
addPasseio(
  26,
  "Museu da Língua Portuguesa",
  "imgs/portuguesa.jpg",
  "https://www.museudalinguaportuguesa.org.br/",
  "Museu interativo e imersivo sobre a língua portuguesa, com projeções e sons."
);

// 28/01 — Parque Burle Marx
addPasseio(
  28,
  "Parque Burle Marx",
  "imgs/burlemarx.jpg",
  "https://www.saopaulo.sp.gov.br/cidade/parques/parque-burle-marx/",
  "Parque com jardins projetados por Burle Marx, trilhas e áreas verdes amplas."
);

// 30/01 — Parque Trianon + Mirante SESC Paulista
addPasseio(
  30,
  "Parque Trianon",
  "imgs/trianon.jpg",
  "https://www.saopaulo.sp.gov.br/cidade/parques/parque-tenente-siqueira-campos-trianon/",
  "Parque urbano na Avenida Paulista, ideal para uma pausa verde."
);

addPasseio(
  30,
  "Mirante do SESC Paulista",
  "imgs/sesc.jpg",
  "https://www.sescsp.org.br/unidades/paulista/",
  "Mirante com vista panorâmica da cidade, ótimo para ver o pôr do sol."
);

// ==== Menu toggle (existing) ====
const nav = document.querySelector("#menu");
const menuBtn = document.querySelector(".menu-btn");

menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    nav.classList.toggle("open");
});

document.addEventListener("click", (e) => {
    if (!nav.contains(e.target) && !menuBtn.contains(e.target)) {
        nav.classList.remove("open");
    }
});

document.querySelectorAll("#menu a").forEach((link) => {
    link.addEventListener("click", () => nav.classList.remove("open"));
});
