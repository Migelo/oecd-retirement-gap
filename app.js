/* ============================================================
   The Last Chapter — data + rendering
   Span bars run from the normal retirement age to the age a
   person is then expected to reach (retire age + years in
   retirement). One shared age ruler for all 38 countries.
   ============================================================ */

// retM/retF  : statutory normal retirement age (2025–26)
// expM/expF  : expected years in retirement (remaining LE at that age)
// le65*/birth*: life expectancy at 65 and at birth, by sex
// flag       : asterisk in the chart; note shown in tooltip
const DATA = [
  { country: "Australia",      retM: 67,   retF: 67,   expM: 18.5, expF: 21.0, le65M: 20.1, le65F: 22.7, birthM: 81.1, birthF: 85.1 },
  { country: "Austria",        retM: 65,   retF: 61.5, expM: 18.5, expF: 25.0, le65M: 18.5, le65F: 21.6, birthM: 79.5, birthF: 84.3, note: "Women's age phasing 60→65 by 2033; ~61.5 in 2026." },
  { country: "Belgium",        retM: 66,   retF: 66,   expM: 17.9, expF: 21.1, le65M: 18.8, le65F: 22.0, birthM: 79.9, birthF: 84.3 },
  { country: "Canada",         retM: 65,   retF: 65,   expM: 19.7, expF: 22.3, le65M: 19.7, le65F: 22.3, birthM: 79.6, birthF: 84.0 },
  { country: "Chile",          retM: 65,   retF: 60,   expM: 17.9, expF: 25.0, le65M: 17.9, le65F: 20.6, birthM: 79.2, birthF: 83.1, flag: true, note: "65/60 split is the funded pillar; the guaranteed pension equalizes women's claim at 65." },
  { country: "Colombia",       retM: 62,   retF: 57,   expM: 17.6, expF: 24.7, le65M: 14.8, le65F: 17.8, birthM: 75.0, birthF: 80.5 },
  { country: "Costa Rica",     retM: 62,   retF: 60,   expM: 18.8, expF: 23.2, le65M: 16.1, le65F: 18.8, birthM: 78.1, birthF: 83.4 },
  { country: "Czechia",        retM: 64.3, retF: 64.3, expM: 17.3, expF: 20.9, le65M: 16.7, le65F: 20.3, birthM: 77.0, birthF: 82.6 },
  { country: "Denmark",        retM: 67,   retF: 67,   expM: 16.7, expF: 19.5, le65M: 18.4, le65F: 21.3, birthM: 80.0, birthF: 83.9, note: "Age indexed to life expectancy; legislated toward 70." },
  { country: "Estonia",        retM: 65,   retF: 65,   expM: 15.9, expF: 20.9, le65M: 15.9, le65F: 20.9, birthM: 74.9, birthF: 83.0 },
  { country: "Finland",        retM: 65,   retF: 65,   expM: 18.4, expF: 22.1, le65M: 18.4, le65F: 22.1, birthM: 79.2, birthF: 84.7 },
  { country: "France",         retM: 64,   retF: 64,   expM: 20.9, expF: 24.7, le65M: 20.0, le65F: 23.8, birthM: 80.4, birthF: 86.1, note: "Min age phasing 62→64; full-rate age remains 67." },
  { country: "Germany",        retM: 66.3, retF: 66.3, expM: 17.0, expF: 20.1, le65M: 18.2, le65F: 21.3, birthM: 79.0, birthF: 83.8, note: "Rising 65→67 by 2031; 66y4m for 2026 retirees." },
  { country: "Greece",         retM: 67,   retF: 67,   expM: 16.6, expF: 19.7, le65M: 18.2, le65F: 21.4, birthM: 79.3, birthF: 84.3 },
  { country: "Hungary",        retM: 65,   retF: 65,   expM: 15.0, expF: 18.8, le65M: 15.0, le65F: 18.8, birthM: 73.7, birthF: 80.2, note: "'Women 40' rule lets women retire earlier with 40 service years." },
  { country: "Iceland",        retM: 67,   retF: 67,   expM: 18.1, expF: 19.9, le65M: 19.8, le65F: 21.7, birthM: 81.0, birthF: 84.5 },
  { country: "Ireland",        retM: 66,   retF: 66,   expM: 18.8, expF: 21.1, le65M: 19.6, le65F: 22.0, birthM: 81.3, birthF: 84.5 },
  { country: "Israel",         retM: 67,   retF: 63.5, expM: 18.7, expF: 24.2, le65M: 20.3, le65F: 22.9, birthM: 81.7, birthF: 85.7, note: "Women's age phasing 62→65 by 2032; ~63.5 in 2026." },
  { country: "Italy",          retM: 67,   retF: 67,   expM: 18.0, expF: 21.0, le65M: 19.7, le65F: 22.8, birthM: 81.6, birthF: 85.8 },
  { country: "Japan",          retM: 65,   retF: 65,   expM: 20.1, expF: 24.9, le65M: 20.1, le65F: 24.9, birthM: 81.1, birthF: 87.1 },
  { country: "Korea",          retM: 62,   retF: 62,   expM: 21.5, expF: 26.3, le65M: 18.7, le65F: 23.6, birthM: 80.6, birthF: 86.4, note: "Age rising to 65 by 2033." },
  { country: "Latvia",         retM: 65,   retF: 65,   expM: 14.6, expF: 19.5, le65M: 14.6, le65F: 19.5, birthM: 71.6, birthF: 80.5 },
  { country: "Lithuania",      retM: 65,   retF: 65,   expM: 14.4, expF: 19.5, le65M: 14.4, le65F: 19.5, birthM: 71.2, birthF: 80.7 },
  { country: "Luxembourg",     retM: 65,   retF: 65,   expM: 19.4, expF: 22.4, le65M: 19.4, le65F: 22.4, birthM: 80.6, birthF: 83.8 },
  { country: "Mexico",         retM: 65,   retF: 65,   expM: 16.2, expF: 18.6, le65M: 16.2, le65F: 18.6, birthM: 72.2, birthF: 77.8 },
  { country: "Netherlands",    retM: 67,   retF: 67,   expM: 17.0, expF: 19.5, le65M: 18.8, le65F: 21.3, birthM: 80.5, birthF: 83.7, note: "Age linked to life expectancy; 67y3m by 2028." },
  { country: "New Zealand",    retM: 65,   retF: 65,   expM: 19.6, expF: 21.7, le65M: 19.6, le65F: 21.7, birthM: 80.1, birthF: 83.5 },
  { country: "Norway",         retM: 67,   retF: 67,   expM: 17.9, expF: 20.0, le65M: 19.6, le65F: 21.8, birthM: 81.8, birthF: 84.9 },
  { country: "Poland",         retM: 65,   retF: 60,   expM: 16.4, expF: 25.0, le65M: 16.4, le65F: 20.5, birthM: 74.9, birthF: 82.4, note: "Persistent 5-year gender gap — one of the OECD's widest." },
  { country: "Portugal",       retM: 66.6, retF: 66.6, expM: 17.7, expF: 21.1, le65M: 19.0, le65F: 22.5, birthM: 79.4, birthF: 85.1, note: "Age recalculated yearly from life expectancy." },
  { country: "Slovakia",       retM: 63.3, retF: 63.3, expM: 17.4, expF: 21.3, le65M: 16.1, le65F: 19.8, birthM: 75.0, birthF: 81.6 },
  { country: "Slovenia",       retM: 65,   retF: 65,   expM: 17.9, expF: 21.5, le65M: 17.9, le65F: 21.5, birthM: 78.9, birthF: 84.3, note: "2025 reform schedules a rise to 67 by 2035." },
  { country: "Spain",          retM: 66.7, retF: 66.7, expM: 18.1, expF: 21.9, le65M: 19.5, le65F: 23.4, birthM: 81.0, birthF: 86.3, note: "Rising to 67 in 2027." },
  { country: "Sweden",         retM: 67,   retF: 67,   expM: 17.9, expF: 20.4, le65M: 19.6, le65F: 22.2, birthM: 81.4, birthF: 85.1, note: "Life-expectancy-linked target age; 67 from 2026." },
  { country: "Switzerland",    retM: 65,   retF: 64.5, expM: 20.1, expF: 23.3, le65M: 20.1, le65F: 22.8, birthM: 82.0, birthF: 85.8, note: "Women's age phasing to 65 by 2028." },
  { country: "Türkiye",        retM: 52,   retF: 49,   expM: 27.0, expF: 35.0, le65M: 15.6, le65F: 19.5, birthM: 74.5, birthF: 79.9, flag: true, note: "Statutory 52/49 is a legacy/transition artifact; effective exit is near 61." },
  { country: "United Kingdom", retM: 66,   retF: 66,   expM: 17.7, expF: 20.1, le65M: 18.5, le65F: 21.0, birthM: 78.8, birthF: 82.8 },
  { country: "United States",  retM: 67,   retF: 67,   expM: 16.6, expF: 19.0, le65M: 18.2, le65F: 20.7, birthM: 75.8, birthF: 81.1 },
];

// ---- axis domain (years of age) ----
const AXIS_MIN = 48;
const AXIS_MAX = 92;
const TICKS = [50, 55, 60, 65, 70, 75, 80, 85, 90];
const pct = (age) => ((age - AXIS_MIN) / (AXIS_MAX - AXIS_MIN)) * 100;
const fmt = (n) => (Number.isInteger(n) ? String(n) : n.toFixed(1));

DATA.forEach((d) => { d.gap = +(d.expF - d.expM).toFixed(1); });

const SORTERS = {
  gap:    (a, b) => b.gap - a.gap,
  women:  (a, b) => b.expF - a.expF,
  men:    (a, b) => b.expM - a.expM,
  retire: (a, b) => b.retM - a.retM || b.retF - a.retF,
  alpha:  (a, b) => a.country.localeCompare(b.country),
};

/* ---------- Span chart ---------- */
const chart = document.getElementById("spanChart");

function buildAxis() {
  const axis = document.createElement("div");
  axis.className = "spanchart__axis";
  TICKS.forEach((t) => {
    const tick = document.createElement("span");
    tick.className = "spanchart__tick";
    tick.style.left = pct(t) + "%";
    tick.textContent = t;
    axis.appendChild(tick);
  });
  return axis;
}

function bar(d, sex) {
  const ret = sex === "m" ? d.retM : d.retF;
  const exp = sex === "m" ? d.expM : d.expF;
  const end = ret + exp;
  const el = document.createElement("div");
  el.className = "bar bar--" + sex;
  el.style.left = pct(ret) + "%";
  el.style.width = (pct(end) - pct(ret)) + "%";
  el.tabIndex = 0;
  el.dataset.end = fmt(end);
  el.setAttribute(
    "aria-label",
    `${d.country}, ${sex === "m" ? "men" : "women"}: retire at ${fmt(ret)}, about ${fmt(exp)} years in retirement, to age ${fmt(end)}.`
  );
  el.addEventListener("pointerenter", (e) => showTip(e, d));
  el.addEventListener("pointermove", moveTip);
  el.addEventListener("pointerleave", hideTip);
  el.addEventListener("focus", (e) => showTip(e, d, el));
  el.addEventListener("blur", hideTip);
  return el;
}

function renderChart(key) {
  const rows = [...DATA].sort(SORTERS[key]);
  chart.innerHTML = "";
  chart.appendChild(buildAxis());

  rows.forEach((d) => {
    const lane = document.createElement("div");
    lane.className = "lane";

    const name = document.createElement("div");
    name.className = "lane__name";
    name.innerHTML = d.country + (d.flag ? ' <span class="flagmark">*</span>' : "");

    const plot = document.createElement("div");
    plot.className = "lane__plot";

    // grid lines inside the plot
    TICKS.forEach((t) => {
      const g = document.createElement("div");
      g.className = "spanchart__grid";
      g.style.left = pct(t) + "%";
      g.style.top = "0";
      plot.appendChild(g);
    });

    plot.appendChild(bar(d, "m"));
    plot.appendChild(bar(d, "f"));

    lane.appendChild(name);
    lane.appendChild(plot);
    chart.appendChild(lane);
  });

  revealLanes();
}

/* ---------- Reveal on scroll ---------- */
let observer;
function revealLanes() {
  const lanes = chart.querySelectorAll(".lane");
  if (!("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    lanes.forEach((l) => l.classList.add("is-in"));
    return;
  }
  if (observer) observer.disconnect();
  observer = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("is-in"); observer.unobserve(en.target); }
    });
  }, { threshold: 0.15 });
  lanes.forEach((l, i) => {
    l.style.transitionDelay = Math.min(i * 12, 240) + "ms";
    observer.observe(l);
  });
}

/* ---------- Tooltip ---------- */
const tip = document.createElement("div");
tip.className = "tip";
tip.setAttribute("role", "status");
document.body.appendChild(tip);

function showTip(e, d, anchorEl) {
  tip.innerHTML = `
    <div class="tip__title">${d.country}${d.flag ? " *" : ""}</div>
    <div class="tip__row"><span>Retire (M / F)</span><span><span class="tip__m">${fmt(d.retM)}</span> / <span class="tip__f">${fmt(d.retF)}</span></span></div>
    <div class="tip__row"><span>Yrs retired</span><span><span class="tip__m">${fmt(d.expM)}</span> / <span class="tip__f">${fmt(d.expF)}</span></span></div>
    <div class="tip__row"><span>Gap (F–M)</span><span>+${fmt(d.gap)}</span></div>
    <div class="tip__row"><span>LE at birth</span><span><span class="tip__m">${fmt(d.birthM)}</span> / <span class="tip__f">${fmt(d.birthF)}</span></span></div>
    ${d.note ? `<div class="tip__note">${d.note}</div>` : ""}`;
  tip.classList.add("is-on");
  if (anchorEl) {
    const r = anchorEl.getBoundingClientRect();
    placeTip(r.left + r.width / 2, r.top);
  } else {
    placeTip(e.clientX, e.clientY);
  }
}
function moveTip(e) { placeTip(e.clientX, e.clientY); }
function placeTip(x, y) {
  const pad = 14;
  const w = tip.offsetWidth, h = tip.offsetHeight;
  let nx = x + pad, ny = y + pad;
  if (nx + w > window.innerWidth - 8) nx = x - w - pad;
  if (ny + h > window.innerHeight - 8) ny = y - h - pad;
  tip.style.left = Math.max(8, nx) + "px";
  tip.style.top = Math.max(8, ny) + "px";
}
function hideTip() { tip.classList.remove("is-on"); }

/* ---------- Sort chips ---------- */
const chips = document.querySelectorAll(".chip");
chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    chips.forEach((c) => c.classList.remove("is-active"));
    chip.classList.add("is-active");
    renderChart(chip.dataset.sort);
  });
});

/* ---------- Data table ---------- */
const tbody = document.querySelector("#dtable tbody");
const headers = document.querySelectorAll("#dtable th.is-sortable");
let tableState = { key: "gap", asc: false };

function renderTable() {
  const { key, asc } = tableState;
  const rows = [...DATA].sort((a, b) => {
    let av = a[key], bv = b[key];
    if (typeof av === "string") return asc ? av.localeCompare(bv) : bv.localeCompare(av);
    return asc ? av - bv : bv - av;
  });
  tbody.innerHTML = rows.map((d) => `
    <tr>
      <td>${d.country}${d.flag ? ' <span class="flagmark">*</span>' : ""}</td>
      <td class="num cell-m">${fmt(d.retM)}</td>
      <td class="num cell-f">${fmt(d.retF)}</td>
      <td class="num cell-m">${fmt(d.expM)}</td>
      <td class="num cell-f">${fmt(d.expF)}</td>
      <td class="num cell-gap">+${fmt(d.gap)}</td>
      <td class="num cell-m">${fmt(d.le65M)}</td>
      <td class="num cell-f">${fmt(d.le65F)}</td>
      <td class="num cell-m">${fmt(d.birthM)}</td>
      <td class="num cell-f">${fmt(d.birthF)}</td>
    </tr>`).join("");

  headers.forEach((h) => {
    const on = h.dataset.key === key;
    h.classList.toggle("is-sorted", on);
    h.classList.toggle("is-asc", on && asc);
    h.setAttribute("aria-sort", on ? (asc ? "ascending" : "descending") : "none");
  });
}

headers.forEach((h) => {
  h.addEventListener("click", () => {
    const key = h.dataset.key;
    if (tableState.key === key) tableState.asc = !tableState.asc;
    else tableState = { key, asc: key === "country" };
    renderTable();
  });
});

/* ---------- Hero demo reveal ---------- */
function animateDemo() {
  const demo = document.querySelector(".demo");
  if (!demo) return;
  const bars = demo.querySelectorAll(".demo__bar");
  const go = () => {
    demo.classList.add("is-shown");
    bars.forEach((b) => { b.style.setProperty("--len", b.dataset.len); });
  };
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { go(); return; }
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((en) => {
      if (en[0].isIntersecting) { go(); io.disconnect(); }
    }, { threshold: 0.3 });
    io.observe(demo);
  } else { go(); }
}

/* ---------- init ---------- */
renderChart("gap");
renderTable();
animateDemo();
