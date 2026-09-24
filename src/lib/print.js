const BANGLA_FONTS = [
  "400 16px 'Hind Siliguri'",
  "500 16px 'Hind Siliguri'",
  "600 16px 'Hind Siliguri'",
  "700 16px 'Hind Siliguri'",
  "400 16px 'Noto Sans Bengali'",
  "700 16px 'Noto Sans Bengali'",
  "600 16px 'Noto Serif Bengali'",
  "700 16px 'Noto Serif Bengali'",
];

const BANGLA_SAMPLE = "অআইঈউঊঋএঐওঔকখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযরলশষসহড়ঢ়য়ংঃঁ";

async function ensureBanglaFonts() {
  if (!document.fonts) return;
  try {
    await Promise.all(BANGLA_FONTS.map((spec) => document.fonts.load(spec, BANGLA_SAMPLE)));
    await document.fonts.ready;
  } catch {
    await document.fonts.ready.catch(() => {});
  }
}

export async function printWithBanglaFonts() {
  await ensureBanglaFonts();
  window.print();
}
