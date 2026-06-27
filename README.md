# The Last Chapter — Retirement vs. Lifespan Across the OECD

A small data-visualization site on the gap between **when work ends** and **when life
expectancy runs out**, broken down by sex, across all 38 OECD countries.

🌐 **Live page:** https://migelo.github.io/oecd-retirement-gap/

## The question

For each OECD country, how long is the stretch between the normal retirement age and the
age a person is then expected to reach — and how does that differ for men and women?

The unifying metric is **expected years in retirement**: remaining life expectancy *at*
the normal retirement age. It folds the retirement-age gap and the lifespan gap into one
number. Every country gets two span-bars on a shared age ruler — teal for men, amber for
women. Bar length is years of retirement; the distance between the two bars is the gap.

## Key takeaways

- In **every** OECD country, women spend more years in retirement than men.
- The typical gap (2–4 years) is now driven mostly by **longevity**, since most countries
  have equalized statutory ages.
- The **widest** gaps come from countries that still let women retire earlier — Poland
  (65/60, ~8.6-year gap), Colombia, Chile, with Austria, Switzerland and Israel phasing it out.
- The **Baltics** show the reverse: unisex ages but ~5-year gaps, purely from very low male
  life expectancy.
- Ages are rising toward 67 and increasingly indexed to life expectancy — which compresses
  the window but does not close the gender gap.

## Build

Plain static HTML / CSS / vanilla JS — no build step, no dependencies (only Google Fonts).
Open `index.html` locally, or serve the folder:

```sh
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Data & method

- Metric: remaining life expectancy at the normal retirement age (statutory, not effective).
  Values where the age differs from 65 are interpolated from life expectancy at 65; treat
  figures as accurate to roughly half a year.
- Sources: OECD *Pensions at a Glance* 2023 & 2025; Finnish Centre for Pensions; UN World
  Population Prospects 2022/2023; Eurostat; World Bank WDI; national statistical offices.
- Caveats are documented in the **Method** section of the page. Türkiye and Chile are
  flagged because they read differently on other measures.

Numbers are approximations for comparison, not actuarial advice.
