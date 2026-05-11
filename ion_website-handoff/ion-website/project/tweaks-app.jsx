/* ION Website — Tweaks Panel
   Drives the design via CSS variables + body classes. */

const { useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette":         "navy",
  "heroHeadline":    "방송통신",
  "heroSubline":     "통합 솔루션 기업",
  "heroTagline":     "전기 공사업과 음향 시스템 설계 및 시공을 전문으로 하는 기업.\n하나의 팀, 하나의 공정으로 완성도를 높입니다.",
  "showStats":       true,
  "showSectionNums": true,
  "heroVisual":      "bars",
  "flowStyle":       "rounded",
  "cardHover":       "glow",
  "motion":          "normal"
}/*EDITMODE-END*/;

const PALETTES = {
  navy: {
    label: "Navy & Violet",
    swatch: ["#1a1a4e", "#6c5ce7", "#0984e3", "#78b4ec"],
    vars: {
      "--ion-navy": "#1a1a4e", "--ion-navy-deep": "#0e0e2e",
      "--ion-blue": "#4a90d9", "--ion-blue-light": "#78b4ec",
      "--ion-violet": "#6c5ce7", "--ion-azure": "#0984e3",
      "--ion-grad": "linear-gradient(135deg, #6c5ce7 0%, #0984e3 100%)",
      "--bg-deep": "#0e0e2e",
      "--hero-bg":
        "radial-gradient(ellipse at 80% 20%, rgba(108,92,231,0.45) 0%, transparent 55%)," +
        "radial-gradient(ellipse at 10% 90%, rgba(9,132,227,0.35) 0%, transparent 50%)," +
        "linear-gradient(180deg, #0e0e2e 0%, #1a1a4e 60%, #1f2a6d 100%)"
    }
  },
  ocean: {
    label: "Ocean Blue",
    swatch: ["#001d6c", "#1192e8", "#009d9a", "#82cfff"],
    vars: {
      "--ion-navy": "#001d6c", "--ion-navy-deep": "#000a3a",
      "--ion-blue": "#1192e8", "--ion-blue-light": "#82cfff",
      "--ion-violet": "#0072c3", "--ion-azure": "#009d9a",
      "--ion-grad": "linear-gradient(135deg, #0072c3 0%, #009d9a 100%)",
      "--bg-deep": "#000a3a",
      "--hero-bg":
        "radial-gradient(ellipse at 80% 20%, rgba(17,146,232,0.40) 0%, transparent 55%)," +
        "radial-gradient(ellipse at 10% 90%, rgba(0,157,154,0.35) 0%, transparent 50%)," +
        "linear-gradient(180deg, #000a3a 0%, #001d6c 60%, #003a8c 100%)"
    }
  },
  carbon: {
    label: "Carbon Mono",
    swatch: ["#161616", "#0f62fe", "#525252", "#78a9ff"],
    vars: {
      "--ion-navy": "#161616", "--ion-navy-deep": "#000000",
      "--ion-blue": "#4589ff", "--ion-blue-light": "#78a9ff",
      "--ion-violet": "#0f62fe", "--ion-azure": "#0f62fe",
      "--ion-grad": "linear-gradient(135deg, #0043ce 0%, #0f62fe 100%)",
      "--bg-deep": "#161616",
      "--hero-bg":
        "radial-gradient(ellipse at 80% 20%, rgba(15,98,254,0.35) 0%, transparent 55%)," +
        "radial-gradient(ellipse at 10% 90%, rgba(15,98,254,0.20) 0%, transparent 50%)," +
        "linear-gradient(180deg, #000000 0%, #161616 60%, #262626 100%)"
    }
  },
  ember: {
    label: "Ember",
    swatch: ["#3a0d1d", "#d02670", "#f1c21b", "#ff8389"],
    vars: {
      "--ion-navy": "#3a0d1d", "--ion-navy-deep": "#1a0410",
      "--ion-blue": "#ee5a24", "--ion-blue-light": "#ff8389",
      "--ion-violet": "#d02670", "--ion-azure": "#f1c21b",
      "--ion-grad": "linear-gradient(135deg, #d02670 0%, #ee5a24 100%)",
      "--bg-deep": "#1a0410",
      "--hero-bg":
        "radial-gradient(ellipse at 80% 20%, rgba(208,38,112,0.40) 0%, transparent 55%)," +
        "radial-gradient(ellipse at 10% 90%, rgba(238,90,36,0.32) 0%, transparent 50%)," +
        "linear-gradient(180deg, #1a0410 0%, #3a0d1d 60%, #5d0e1d 100%)"
    }
  }
};
const PALETTE_KEYS = Object.keys(PALETTES);
const PALETTE_OPTIONS = PALETTE_KEYS.map(k => PALETTES[k].swatch);

function applyTweaks(t) {
  const root = document.documentElement;
  const body = document.body;

  const p = PALETTES[t.palette] || PALETTES.navy;
  Object.entries(p.vars).forEach(([k, v]) => root.style.setProperty(k, v));
  const heroEl = document.querySelector(".hero");
  if (heroEl) heroEl.style.background = p.vars["--hero-bg"];

  // Hero copy — rebuild title cleanly each time
  const titleEl = document.querySelector(".hero-title");
  if (titleEl) {
    titleEl.innerHTML =
      `<span class="accent">${t.heroHeadline || ""}</span><br/>${t.heroSubline || ""}`;
  }
  const tagEl = document.querySelector(".hero-tagline");
  if (tagEl) tagEl.innerHTML = (t.heroTagline || "").replace(/\n/g, "<br/>");

  document.querySelectorAll(".hero-stats").forEach(el => {
    el.style.display = t.showStats ? "" : "none";
  });
  document.querySelectorAll(".s-num-badge").forEach(el => {
    el.style.display = t.showSectionNums ? "" : "none";
  });

  const visual = document.querySelector(".hero-visual");
  if (visual) {
    visual.classList.remove("v-bars", "v-minimal", "v-rings");
    visual.classList.add("v-" + t.heroVisual);
  }

  body.classList.remove("flow-rounded", "flow-square", "flow-pill");
  body.classList.add("flow-" + t.flowStyle);

  body.classList.remove("hover-glow", "hover-lift", "hover-border");
  body.classList.add("hover-" + t.cardHover);

  body.classList.remove("motion-still", "motion-normal", "motion-dynamic");
  body.classList.add("motion-" + t.motion);
}

function IonTweaks() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useEffect(() => { applyTweaks(t); }, [t]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Brand palette" />
      <TweakColor
        label="Color theme"
        value={PALETTES[t.palette].swatch}
        options={PALETTE_OPTIONS}
        onChange={(v) => {
          const idx = PALETTE_OPTIONS.findIndex(p => JSON.stringify(p) === JSON.stringify(v));
          if (idx >= 0) setTweak("palette", PALETTE_KEYS[idx]);
        }}
      />

      <TweakSection label="Hero copy" />
      <TweakText label="Headline" value={t.heroHeadline}
                 onChange={v => setTweak("heroHeadline", v)} />
      <TweakText label="Subline" value={t.heroSubline}
                 onChange={v => setTweak("heroSubline", v)} />
      <TweakText label="Tagline" value={t.heroTagline}
                 onChange={v => setTweak("heroTagline", v)} />

      <TweakSection label="Layout" />
      <TweakToggle label="Hero stats" value={t.showStats}
                   onChange={v => setTweak("showStats", v)} />
      <TweakToggle label="Section badges" value={t.showSectionNums}
                   onChange={v => setTweak("showSectionNums", v)} />
      <TweakSelect label="Hero visual" value={t.heroVisual}
                   options={[
                     { value: "bars",    label: "Audio bars" },
                     { value: "rings",   label: "Rings only" },
                     { value: "minimal", label: "Minimal" }
                   ]}
                   onChange={v => setTweak("heroVisual", v)} />

      <TweakSection label="Components" />
      <TweakSelect label="Process icons" value={t.flowStyle}
                   options={[
                     { value: "rounded", label: "Rounded square" },
                     { value: "square",  label: "Sharp square" },
                     { value: "pill",    label: "Circular" }
                   ]}
                   onChange={v => setTweak("flowStyle", v)} />
      <TweakSelect label="Card hover" value={t.cardHover}
                   options={[
                     { value: "glow",   label: "Blue glow" },
                     { value: "lift",   label: "Soft lift" },
                     { value: "border", label: "Gradient border" }
                   ]}
                   onChange={v => setTweak("cardHover", v)} />
      <TweakRadio label="Motion" value={t.motion}
                  options={[
                    { value: "still",   label: "Still" },
                    { value: "normal",  label: "Normal" },
                    { value: "dynamic", label: "Dynamic" }
                  ]}
                  onChange={v => setTweak("motion", v)} />
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById("tweaks-root")).render(<IonTweaks />);
