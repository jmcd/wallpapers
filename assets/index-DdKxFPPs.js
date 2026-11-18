(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i;function t(t){if(typeof t!=`string`)return null;let n=e.exec(t.trim());if(!n)return null;let r=n[1];return r.length===3&&(r=r.split(``).map(e=>e+e).join(``)),[0,2,4].map(e=>parseInt(r.slice(e,e+2),16)/255)}var n=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4,r=e=>e<=.0031308?e*12.92:1.055*e**(1/2.4)-.055;function i(e){let r=t(e);if(!r)throw Error(`Invalid colour: ${e}`);return r.map(n)}function a(e){return`#`+e.map(e=>Math.round(Math.min(1,Math.max(0,r(e)))*255).toString(16).padStart(2,`0`)).join(``)}function o([e,t,n]){let r=Math.cbrt(.4122214708*e+.5363325363*t+.0514459929*n),i=Math.cbrt(.2119034982*e+.6806995451*t+.1073969566*n),a=Math.cbrt(.0883024619*e+.2817188376*t+.6299787005*n);return[.2104542553*r+.793617785*i-.0040720468*a,1.9779984951*r-2.428592205*i+.4505937099*a,.0259040371*r+.7827717662*i-.808675766*a]}function s([e,t,n]){let r=(e+.3963377774*t+.2158037573*n)**3,i=(e-.1055613458*t-.0638541728*n)**3,a=(e-.0894841775*t-1.291485548*n)**3;return[4.0767416621*r-3.3077115913*i+.2309699292*a,-1.2684380046*r+2.6097574011*i-.3413193965*a,-.0041960863*r-.7034186147*i+1.707614701*a]}function c({l:e,c:t,h:n}){let r=n*Math.PI/180;return s([e,t*Math.cos(r),t*Math.sin(r)])}function l(e){let[t,n,r]=o(e),i=Math.hypot(n,r),a=Math.atan2(r,n)*180/Math.PI;return a<0&&(a+=360),{l:t,c:i,h:a}}function u(e){return l(i(e))}var d=e=>e.every(e=>e>=-1e-4&&e<=1.0001);function f(e){return a(c(e))}var p=.005,m=1.5;function h(e,t){if(!t)return e;let[n,r]=t;return e<=n+m||e>=r-m?e:e-n<r-e?n:r}function g(e,t,n){if(!n)return e;let r=n.filter(e=>t<e.belowL).map(e=>[...e.hue]).sort((e,t)=>e[0]-t[0]),i=[];for(let e of r){let t=i[i.length-1];t&&e[0]<=t[1]?t[1]=Math.max(t[1],e[1]):i.push(e)}for(let t of i)e=h(e,t);return e}function _(e,r){let i=t(e),o=u(e),s=Math.min(r.l[1],Math.max(r.l[0],o.l)),l=o.c<.02?o.h:g(h(o.h,r.excludeHue),s,r.hueBands);if(o.l>=r.l[0]-p&&o.l<=r.l[1]+p&&o.c>=r.c[0]-p&&o.c<=r.c[1]+p&&l===o.h)return a(i.map(n));let m=Math.min(r.c[1],Math.max(r.c[0],o.c));if(!d(c({l:s,c:m,h:l}))){let e=0,t=m;for(let n=0;n<24;n++){let n=(e+t)/2;d(c({l:s,c:n,h:l}))?e=n:t=n}m=e}return f({l:s,c:m,h:l})}function v(e,n){if(!t(e))return n.default;let r=e;for(let e=0;e<6;e++){let e=_(r,n);if(e===r.toLowerCase()||e===a(i(r)))return e;r=e}return r}function y(e){let t=String(e),n=t.indexOf(`.`);return n<0?0:t.length-n-1}function b(e,t){if(e.kind===`color`)return v(typeof t==`string`?t:``,e);let n=typeof t==`number`?t:typeof t==`string`&&t.trim()!==``?Number(t):NaN;if(!Number.isFinite(n))return e.default;let r=Math.min(e.max,Math.max(e.min,n)),i=e.min+Math.round((r-e.min)/e.step)*e.step;return Number(Math.min(e.max,i).toFixed(y(e.step)))}function x(e,t){return Object.fromEntries(e.map(e=>[e.id,e.id in t?b(e,t[e.id]):e.default]))}function S(e=.35){return{kind:`range`,id:`grain`,label:`Grain`,min:0,max:1,step:.01,default:e}}function C(e){let t=Math.imul(e>>>0,747796405)+2891336453>>>0,n=Math.imul(t>>>(t>>>28)+4^t,277803737)>>>0;return(n>>>22^n)>>>0}function w(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function T(){let e=new Uint32Array(1);return crypto.getRandomValues(e),e[0]}var E={id:`test-pattern`,name:`Test pattern`,era:`2020s`,version:1,params:[{kind:`range`,id:`bands`,label:`Bands`,min:2,max:20,step:1,default:6},{kind:`color`,id:`tint`,label:`Tint`,default:`#3366cc`,l:[.2,.9],c:[0,.3]},S(.35)],presets:[{id:`default`,label:`Default`,values:{bands:6,tint:`#3366cc`,grain:.35}}],fragment:`uniform float u_bands;
uniform float u_offset;
uniform float u_blue;

vec3 wallpaper(vec2 p) {
  // Red: slow ramp 0.40 → 0.44 across the width (a few 8-bit levels) for the dither test.
  float t = clamp(p.x / max(u_aspect, 1.0) + 0.5, 0.0, 1.0);
  float r = mix(0.40, 0.44, t);
  // Green: soft stripes along y, offset by the seed.
  float g = 0.5 + 0.5 * sin((p.y + u_offset) * u_bands * 6.2831853);
  return vec3(r, g * 0.8, u_blue);
}
`,uniforms(e,t){return{u_bands:Number(e.bands),u_offset:w(t)(),u_blue:i(String(e.tint))[2]}}},D=`uniform vec3 u_core;
uniform vec3 u_outer;
uniform vec3 u_sky;
uniform vec2 u_origin;     // burst origin in p-space
uniform float u_tilt;      // radians, fan direction offset from straight up
uniform float u_horizon;   // radians, slope of the dark ground line
uniform float u_rays;
uniform float u_spread;    // half-angle of the fan, radians
uniform float u_glow;
uniform float u_streaks;
uniform float u_stars;
uniform float u_drift;     // hue drift across the fan: cooler on the left, as in the purple original

float stars(vec2 p) {
  float scale = 55.0;
  vec2 q = p * scale;
  vec2 cell = floor(q);
  float acc = 0.0;
  // Derivatives must be taken in uniform control flow: inside the loop, after the per-cell
  // \`continue\`, neighbouring pixels diverge and real GPUs return garbage (streaks in the stars).
  float px = max(fwidth(q.x), 1e-4) * 0.6;
  for (int j = -1; j <= 1; j++)
    for (int i = -1; i <= 1; i++) {
      vec2 c = cell + vec2(float(i), float(j));
      uvec3 k = uvec3(uvec2(ivec2(c)), u_seed ^ 0x51ed27u);
      float present = hash13(k);
      if (present > u_stars * 0.32) continue;
      vec2 pos = c + vec2(hash13(k + 11u), hash13(k + 23u));
      float b = hash13(k + 37u);
      float size = mix(0.026, 0.08, b * b);
      float d = length(q - pos);
      acc += (0.3 + 0.8 * b * b) * exp(-pow(d / max(size, px), 2.0)) * (size / max(size, px));
    }
  return acc;
}

vec3 wallpaper(vec2 p) {
  vec2 d = p - u_origin;
  float r = length(d);
  float ang = atan(d.x, d.y) - u_tilt;             // 0 = straight up the fan axis

  // Sky: colour at the top fading to near-black at the bottom.
  float skyT = smoothstep(-0.6, 0.55, p.y);
  vec3 col = mix(u_sky * 0.12, u_sky, skyT);

  // Ground line through the origin: a crisp, dark edge that the rays end at (slightly wavy).
  vec2 n = vec2(-sin(u_horizon), cos(u_horizon));
  float above = dot(d, n) + (fbm(vec2(dot(d, vec2(n.y, -n.x)) * 2.5, 7.0), 3) - 0.5) * 0.03;
  float ground = smoothstep(-0.012, 0.01, above);

  // Fan mask by angle: soft, irregular edge; outer rays may droop below horizontal.
  float edgeJitter = (vnoise(vec2(ang * 3.0, 11.0)) - 0.5) * 0.25;
  float fan = 1.0 - smoothstep(u_spread * 0.75, u_spread * 1.15, abs(ang) + edgeJitter);
  // How far towards the side of the fan (0 at the axis, 1 at its edge).
  float side = clamp(abs(ang) / max(u_spread, 0.1), 0.0, 1.2);

  // Ray structure: broad soft curtains with fine streaks along them, not a regular comb.
  float a = ang / PI;
  float lr = log(r + 0.02);
  float broad = fbm(vec2(a * u_rays * 0.35, lr * 0.35), 4);
  float fine = fbm(vec2(a * u_rays * 2.2, lr * 1.1 + 3.0), 4);
  // (near the origin the streaks melt into a soft mist rather than converging like a comb)
  float rays = mix(0.45, 1.0, smoothstep(0.25, 0.8, broad)) * (1.0 + u_streaks * 1.0 * (fine - 0.5) * smoothstep(0.04, 0.25, r));
  rays = mix(0.8, rays, smoothstep(0.02, 0.22, r));

  // Intensity along the ray. Dim right at the origin, brightest a little way out; the central
  // rays fade with distance while the side rays run on, long and bright, to the frame edges.
  float rise = mix(0.3, 1.0, smoothstep(0.0, 0.18, r));
  // How far a ray falls off depends on its direction (measured on the originals, from straight
  // up): the long low rays beyond about 60 deg run on to the frame edges, the diagonals at
  // 35-55 deg fade fast (dark top corners), the near-vertical centre in between.
  float x = abs(atan(d.x, d.y));
  float k = mix(mix(1.0, 2.4, smoothstep(0.35, 0.65, x)), 0.4, smoothstep(0.95, 1.15, x));
  float fall = exp(-r * k);
  // The side rays are no brighter at their start than the centre, but run on further.
  float lobes = mix(1.0, 0.75, smoothstep(0.6, 0.9, side) * (1.0 - smoothstep(0.2, 0.5, r)));
  float I = rays * fan * fall * rise * lobes * mix(0.15, 1.0, ground);

  // Colour: whitish core near the origin to the outer colour, which drifts in hue across the
  // fan (cooler on the left) and greys out far up the centre.
  float t = clamp(r * (0.9 + 0.9 * side) + (fine - 0.5) * 0.3, 0.0, 1.0);
  vec3 rayCol = mixOklab(u_core, u_outer, smoothstep(0.08, 0.6, t));
  vec3 lab = toOklab(rayCol);
  // (measured on the purple original: -10 deg at 75 deg left of the axis, -40 at 90, -57 at 105)
  float hr = -1.0 * u_drift * smoothstep(0.65, 1.1, -ang / max(u_spread, 0.1));
  hr += -0.4 * u_drift * smoothstep(0.75, 1.0, ang / max(u_spread, 0.1));
  // (only the drifting, purple version greys out up there; the blue one stays blue)
  float grey = smoothstep(0.3, 0.75, r) * (1.0 - smoothstep(0.3, 0.6, side)) * 0.65 * u_drift;
  lab.yz = mat2(cos(hr), sin(hr), -sin(hr), cos(hr)) * lab.yz * (1.0 - grey) * (1.0 + 0.15 * smoothstep(0.4, 0.75, side));
  rayCol = fromOklab(lab);
  col += rayCol * I * 1.45;

  // A soft glow above the origin (not a hot point), sitting on the ground.
  float g = exp(-pow(length(d - vec2(0.03, 0.18) * vec2(cos(u_tilt), 1.0)) / (0.1 + 0.12 * u_glow), 2.0)) * u_glow;
  col += u_core * g * 0.35 * ground;

  // Ground darkening.
  col *= mix(0.3, 1.0, ground);

  // Stars, dimmed where the aurora is bright.
  col += vec3(0.95, 0.96, 1.0) * stars(p) * (1.0 - clamp(I * 2.5 + g, 0.0, 0.9)) * 0.9;
  return col;
}
`,O=Math.PI/180,k={id:`aurora`,name:`Aurora`,era:`2000s`,version:1,params:[{kind:`color`,id:`core`,label:`Core`,default:`#ffd0f0`,l:[.78,.95],c:[.03,.14]},{kind:`color`,id:`outer`,label:`Outer`,default:`#a34f9e`,l:[.42,.65],c:[.08,.22]},{kind:`color`,id:`sky`,label:`Sky`,default:`#2a1d4f`,l:[.12,.28],c:[0,.09]},{kind:`range`,id:`rays`,label:`Rays`,min:8,max:40,step:1,default:18},{kind:`range`,id:`spread`,label:`Spread`,min:100,max:210,step:1,default:195},{kind:`range`,id:`streaks`,label:`Streaks`,min:0,max:1,step:.01,default:.5},{kind:`range`,id:`stars`,label:`Stars`,min:0,max:1,step:.01,default:.4},{kind:`range`,id:`drift`,label:`Hue drift`,min:0,max:1,step:.01,default:0},S(.3)],presets:[{id:`magenta`,label:`Magenta`,values:{core:`#ffd0f0`,outer:`#a34f9e`,sky:`#1e2032`,rays:18,spread:195,streaks:.5,stars:.4,drift:1,grain:.3}},{id:`ice`,label:`Ice blue`,values:{core:`#aac6ff`,outer:`#3f6fd8`,sky:`#14254a`,rays:16,spread:195,streaks:.45,stars:.5,drift:0,grain:.3}},{id:`violet`,label:`Violet`,values:{core:`#ffd6f2`,outer:`#af3cc7`,sky:`#241c4f`,rays:12,spread:140,streaks:.7,stars:.5,drift:.6,grain:.3}}],fragment:D,uniforms(e,t,n){let r=w(t^10526880),a=n<1,o=Math.max(n,1)*.5,s=(r()-.5)*.45*Math.min(o,.6),c=a?-.25/n:-.18-(n>2?0:.04);return{u_core:i(String(e.core)),u_outer:i(String(e.outer)),u_sky:i(String(e.sky)),u_origin:[s,Math.max(c,-.45)],u_tilt:(r()-.5)*20*O,u_horizon:(r()-.5)*16*O,u_rays:Number(e.rays),u_spread:Number(e.spread)/2*O,u_glow:.6,u_streaks:Number(e.streaks),u_stars:Number(e.stars),u_drift:Number(e.drift??0)}}},A=`#define MAX_PETALS 7
uniform vec3 u_petal;
uniform vec3 u_glow;
uniform vec3 u_bg;
uniform vec3 u_deep;          // crease colour, derived from the petal colour
uniform float u_depth;        // 0 on light backgrounds, 1 on dark
uniform float u_light;
uniform float u_soft;
uniform int u_count;
uniform vec2 u_base[MAX_PETALS];
uniform float u_angle[MAX_PETALS];
uniform float u_len[MAX_PETALS];     // arc length of the spine
uniform float u_width[MAX_PETALS];
uniform float u_curl[MAX_PETALS];    // signed sideways bend of the spine
uniform float u_scurve[MAX_PETALS];  // counter-bend near the tip
uniform float u_side[MAX_PETALS];    // which way the light comes from (+1/-1)
uniform float u_cup[MAX_PETALS];     // how deeply the sheet is cupped across its width
uniform float u_roll[MAX_PETALS];     // signed: which long side rolls over (+1/-1 * max angle, radians)
uniform float u_rollFrac[MAX_PETALS]; // fraction of the full width that rolls (at the bottom)
uniform float u_rollTop[MAX_PETALS];  // that fraction at the tip, relative to the bottom
uniform float u_rollEnd[MAX_PETALS];  // where along the petal the fold runs out (> 1: never)
uniform float u_foldR[MAX_PETALS];    // radius of the fold at the crest (sheet units)

/*
 * Each petal is a sheet along a curved spine, gently cupped across its width. One long side
 * rolls over towards the viewer: across the width (unrolled coordinate w in [-W, W]) the sheet
 * is flat up to w0, then curls forwards with constant curvature k:
 *   across x = w0 + sin(th)/k,   depth z = (1 - cos th)/k,   th in [0, psi(t)].
 * psi grows along the petal (no roll at the base, most near the top), so the rolled side's
 * outline sweeps in an S-curve. Past th = PI/2 the sheet comes back over itself and its
 * underside shows as a band beside a soft crest; the free edge casts a shadow on the face.
 * Every solution of x(th) = pixel is found analytically; the nearest (largest z) wins.
 */
struct Hit { float cov; float inside; vec3 nrm; float back; float t; float lipShadow; float lipEdge; float flap; float across; };

float widthAt(int i, float t) {
  float tc = clamp(t, 0.0, 1.0);
  float k = max(tc - 0.62, 0.0) / 0.38;
  // Broad, dome-like tip: a flattened (super-elliptical) cap rather than a pointed one.
  return u_width[i] * (0.78 + 0.22 * smoothstep(0.0, 0.6, tc)) * pow(max(0.0, 1.0 - pow(k, 2.2)), 0.5);
}

float sideOffset(int i, float t) {
  float tc = clamp(t, 0.0, 1.0);
  return u_len[i] * (u_curl[i] * tc * tc + u_scurve[i] * tc * tc * tc);
}

Hit petal(vec2 p, int i, float px) {
  Hit h; h.cov = 0.0; h.inside = -1e3; h.nrm = vec3(0.0, 0.0, 1.0); h.back = 0.0; h.t = 0.0; h.lipShadow = 0.0; h.lipEdge = 1e3; h.flap = 0.0; h.across = 0.0;
  float th0 = u_angle[i];
  vec2 a = vec2(sin(th0), cos(th0));
  vec2 n = vec2(cos(th0), -sin(th0));
  vec2 q = p - u_base[i];
  float L = u_len[i];
  float t = dot(q, a) / L;
  float tc = clamp(t, 0.0, 1.0);
  h.t = tc;
  float v = dot(q, n) - sideOffset(i, t);
  float rs = u_roll[i] < 0.0 ? -1.0 : 1.0;
  float x = v * rs;                                   // rolling side is +x
  h.across = x / max(u_width[i], 1e-3);
  if (t > 1.0) {
    h.inside = -length(vec2((t - 1.0) * L, abs(v)));
    h.t = 1.0;
    return h;
  }
  float W = widthAt(i, tc);
  if (W <= 1e-4) return h;
  // One side folds over: a tight bend of radius R through angle psi at the crest, then the
  // rest of the rolled width (the flap) continues straight — for psi near PI it lies across
  // the face with its underside towards us. The part that folds is widest at the bottom and
  // narrows towards the tip, so the flap's free edge runs diagonally across the face.
  float psi = max(abs(u_roll[i]), 1e-3);
  // The fold tapers to nothing at rollEnd: it eases in (no kink where the taper starts) and
  // ends linearly, so crest and free edge meet in a point.
  float ro = clamp((u_rollEnd[i] - t) / 0.36, 0.0, 1.0);
  float runOut = 1.0 - (1.0 - ro) * (1.0 - ro);
  float Lr = max(u_rollFrac[i] * 2.0 * W * mix(1.0, u_rollTop[i], smoothstep(0.3, 0.9, t)) * runOut, 1e-4);
  float w0 = W - Lr;
  float R = min(u_foldR[i], Lr / psi);
  float arc = psi * R;
  float cps = cos(psi), sps = sin(psi);
  float xEnd = w0 + R * sps + (Lr - arc) * cps;       // the flap's free edge
  // the folded part never reaches past the unfolded outline
  // Above the fold's run-out the folded side has its own cap: it leaves the beak almost
  // sideways, then rounds up to the dome top, so the beak is a point rather than a shoulder.
  float Wr = W;
  float re = u_rollEnd[i];
  if (re < 1.0 && t > re) {
    float k = (t - re) / (1.0 - re);
    Wr = min(W, widthAt(i, re) * sqrt(max(0.0, 1.0 - pow(k, 2.0))) * (1.0 - 0.5 * sqrt(k)));
  }
  float xmax = min(max(w0 + (psi >= PI * 0.5 ? R : R * sps), xEnd), Wr);
  float xmin = min(-W, xEnd);
  // Distance inwards: across the width, or up to the tip plane at the dome top.
  float inside = min(min(x - xmin, xmax - x), (1.0 - t) * L);

  float bestZ = -1e9, bestTh = -1.0, bestW = 0.0;
  if (x >= -W && x <= min(w0, Wr)) { bestZ = 0.0; bestTh = 0.0; bestW = x; }
  // The bend.
  float y = (x - w0) / R;
  if (abs(y) <= 1.0) {
    float as = asin(y);
    float cands[2] = float[2](as, PI - as);
    for (int j = 0; j < 2; j++) {
      float th = cands[j];
      if (th < 0.0 || th > psi) continue;
      float z = R * (1.0 - cos(th));
      if (z > bestZ) { bestZ = z; bestTh = th; bestW = w0 + R * th; }
    }
  }
  // The straight flap beyond the bend.
  if (Lr > arc + 1e-5 && abs(cps) > 1e-3) {
    float d = (x - w0 - R * sps) / cps;
    if (d >= 0.0 && d <= Lr - arc) {
      float z = R * (1.0 - cps) + d * sps;
      if (z > bestZ) { bestZ = z; bestTh = psi; bestW = w0 + arc + d; h.flap = d / max(Lr - arc, 1e-4); }
    }
  }
  // Where the flap's free edge lies over the face: an edge line and a soft shadow.
  if (psi > PI * 0.5) {
    h.lipEdge = abs(x - xEnd);
    if (bestTh < PI * 0.5 && x < xEnd + 1e-4)
      // (only as strong as the flap is long: none where the fold has run out)
      h.lipShadow = exp(-(xEnd - x) / (0.24 + 0.12 * u_soft)) * smoothstep(PI * 0.5, PI * 0.8, psi)
                  * smoothstep(0.1, 0.35, Lr);
  }
  if (bestTh < 0.0) { h.inside = inside; return h; }

  float ew = px * 0.8;
  h.inside = inside;
  h.cov = smoothstep(-ew, ew, inside) * smoothstep(-ew, ew, (1.0 - t) * L + 1.0);
  h.t = tc;
  // Normal: cupped across the width, then the rolled part turned forwards by th.
  float c = clamp(bestW / W, -1.0, 1.0);
  float slope = 2.0 * u_cup[i] * c;
  vec3 nrm = normalize(vec3((slope * cos(bestTh) - sin(bestTh)) * rs, 0.0, cos(bestTh) + slope * sin(bestTh)));
  h.back = nrm.z < 0.0 ? 1.0 : 0.0;
  h.nrm = nrm.z < 0.0 ? -nrm : nrm;
  return h;
}

// Shade petal i at p: rgb and coverage. Shading is evaluated in several taps across the petal
// by the caller, which blurs the silhouette, the crest and the flap's edge like a lens would.
vec4 shade(vec2 p, int i, float px, vec3 deep) {
  Hit h = petal(p, i, px);
  if (h.cov <= 0.0) return vec4(0.0);
  // One light for the whole scene, from the upper left and in front.
  // On dark backgrounds it grazes a little more, so the faces turned towards it stand out.
  vec3 Ld = normalize(mix(vec3(-0.5, 0.55, 0.68), vec3(-0.75, 0.5, 0.22), 0.4 * u_depth));
  float diff = dot(h.nrm, Ld);
  float lit = smoothstep(-0.1, 1.0, diff);
  // Light pools towards the top of each petal; on dark backgrounds the base falls to near black.
  float height = smoothstep(mix(0.0, 0.35, u_depth), 0.95, h.t);
  lit *= mix(0.5, 0.25, u_depth) + mix(0.5, 0.75, u_depth) * height;
  // The flap's underside runs from warm orange by the crest to deep red at its free edge.
  vec3 under = mixOklab(mixOklab(u_petal, u_glow, 0.25), deep, 0.2 + 0.45 * h.flap);
  vec3 face = mixOklab(u_petal, under, h.back);
  vec3 pc = mixOklab(deep, face, smoothstep(0.0, 0.85, lit));
  pc = mixOklab(pc, u_glow, smoothstep(0.55, 0.92, lit) * (0.35 + 0.75 * u_light) * (1.0 - 0.75 * h.back));
  // Translucent edges: light comes through the sheet near its outline, more so on dark grounds.
  float rim = exp(-max(h.inside, 0.0) / 0.06) * smoothstep(0.3, 0.8, h.t) * (1.0 - h.back);
  pc = mixOklab(pc, u_glow, rim * (0.2 + 0.45 * u_depth) * u_light);
  // the tip glows as if lit from behind
  pc = mixOklab(pc, u_glow, smoothstep(0.4, 1.0, h.t) * 0.7 * lit * u_light * (1.0 - 0.6 * h.back));
  // Shadow under the flap's free edge: a deep, reddish valley on the face beneath it.
  pc = mixOklab(pc, deep * 0.7, 0.85 * h.lipShadow);
  // The free edge itself catches the light: a thin bright line, like the edge of paper.
  pc = mixOklab(pc, u_glow, 0.3 * u_light * exp(-pow(h.lipEdge / (1.2 * px), 2.0)));
  return vec4(pc * h.cov, h.cov);
}

vec3 wallpaper(vec2 p) {
  float hx = max(u_aspect, 1.0) * 0.5;
  float hy = max(1.0 / u_aspect, 1.0) * 0.5;
  vec2 uv = p / vec2(hx, hy);

  // Background: pale in the top-left corner, the base colour at the right, deep at the bottom.
  vec3 bgLow = u_bg * mix(0.25, 0.5, u_depth);
  vec3 col = mixOklab(bgLow, u_bg, smoothstep(-1.1, 0.3, uv.y - uv.x * 0.3));
  col = mixOklab(col, mixOklab(u_bg, vec3(1.0), 0.35), smoothstep(0.0, 1.3, uv.y - uv.x * 0.7) * (1.0 - u_depth));

  float px = max(fwidth(p.x), 1e-5);
  vec3 deep = mixOklab(u_deep, vec3(0.07, 0.006, 0.05), u_depth * 0.35);

  for (int i = 0; i < MAX_PETALS; i++) {
    if (i >= u_count) break;
    Hit h = petal(p, i, px);
    // Depth of field. The front petal is in focus except where its dome curves away on the
    // unfolded side; petals behind are sharp low down and very soft towards their tips.
    float backness = 1.0 - float(i + 1) / float(max(u_count, 1));
    float ttt = h.t * h.t * h.t;
    float away = smoothstep(0.55, 1.0, h.t) * smoothstep(0.0, 0.8, -h.across);
    float blur = u_soft * (backness * (0.004 + 0.1 * ttt) + 0.06 * away * (1.0 - backness));
    if (h.inside < -blur * 1.5 - 0.3) continue;
    vec4 acc;
    float alpha;
    if (blur < 2.0 * px) {
      acc = shade(p, i, px, deep);
      alpha = acc.a;
    } else {
      // Colour from taps on a spiral over the blur disc (rotated per pixel, so no ghost rings);
      // coverage from the distance to the outline, which is smooth however wide the blur.
      float rot = hash12(uvec2((p + 2.0) / px)) * TAU;
      acc = vec4(0.0);
      for (int k = 0; k < 16; k++) {
        float r = sqrt((float(k) + 0.5) / 16.0) * blur;
        float ang = rot + float(k) * 2.39996;
        acc += shade(p + r * vec2(cos(ang), sin(ang)), i, px, deep);
      }
      acc /= 16.0;
      // (capped by the taps' own coverage, so slivers thinner than the blur don't swell into blobs)
      alpha = min(smoothstep(-0.8 * blur, 0.8 * blur, h.inside), 2.0 * acc.a);
    }
    // Soft shadow onto what's behind, just outside the (blurred) silhouette.
    // It ramps up with distance from the outline, so the blurred edge is never darkened.
    float sh = (1.0 - alpha) * exp(-max(-h.inside, 0.0) / (0.035 + 0.05 * u_soft)) * smoothstep(0.0, 2.5 * blur + 0.002, -h.inside);
    col *= 1.0 - sh * (0.25 + 0.3 * u_depth);
    if (alpha <= 0.0) continue;
    col = mix(col, acc.rgb / acc.a, alpha);
  }
  return col;
}
`,j=7;function ee(e,t){let n=t.slice(0,j),r=(e,t)=>[...n.map(e),...Array(j-n.length).fill(t)],a=u(String(e.background)).l,o=u(String(e.petal)),s=u(String(e.glow)),c=(s.h-o.h+540)%360-180;c=Math.max(-35,Math.min(35,c));let l=f({l:s.l,c:Math.min(s.c,.18),h:o.h+c}),d=Math.min(1,Math.max(0,(.7-a)/.5)),p=f({l:o.l*(.7-.42*d),c:Math.min(.19,o.c*1.08),h:o.h-22});return{u_petal:i(String(e.petal)),u_glow:i(l),u_deep:i(p),u_bg:i(String(e.background)),u_depth:d,u_light:Number(e.light),u_soft:Number(e.softness),u_count:{int:n.length},u_base:{vec2Array:[...n.flatMap(e=>e.base),...Array((j-n.length)*2).fill(0)]},u_angle:{floatArray:r(e=>e.angle,0)},u_len:{floatArray:r(e=>e.len,1)},u_width:{floatArray:r(e=>e.width,0)},u_curl:{floatArray:r(e=>e.curl,0)},u_scurve:{floatArray:r(e=>e.scurve,0)},u_side:{floatArray:r(e=>e.side,1)},u_cup:{floatArray:r(e=>e.cup,0)},u_roll:{floatArray:r(e=>e.roll,0)},u_rollFrac:{floatArray:r(e=>e.rollFrac,.4)},u_rollTop:{floatArray:r(e=>e.rollTop,1)},u_rollEnd:{floatArray:r(e=>e.rollEnd??2,2)},u_foldR:{floatArray:r(e=>e.foldR,.05)}}}var M={id:`petals`,name:`Petals`,era:`2020s`,version:1,params:[{kind:`color`,id:`petal`,label:`Petal`,default:`#f7901f`,l:[.55,.85],c:[.1,.22]},{kind:`color`,id:`glow`,label:`Glow`,default:`#ffd27a`,l:[.8,.97],c:[.04,.18]},{kind:`color`,id:`background`,label:`Background`,default:`#5aa8e6`,l:[.1,.85],c:[0,.15]},{kind:`range`,id:`petals`,label:`Petals`,min:3,max:7,step:1,default:5},{kind:`range`,id:`spread`,label:`Spread`,min:.3,max:1,step:.01,default:.7},{kind:`range`,id:`curl`,label:`Curl`,min:0,max:1,step:.01,default:.6},{kind:`range`,id:`light`,label:`Light`,min:.2,max:1,step:.01,default:.75},{kind:`range`,id:`softness`,label:`Softness`,min:0,max:1,step:.01,default:.5},S(.25)],presets:[{id:`light`,label:`Light`,values:{petal:`#f7901f`,glow:`#ffd27a`,background:`#5aa8e6`,petals:5,spread:.7,curl:.6,light:.75,softness:.5,grain:.25}},{id:`dark`,label:`Dark`,values:{petal:`#e0581f`,glow:`#fca94c`,background:`#0b1d33`,petals:5,spread:.7,curl:.6,light:.9,softness:.5,grain:.25}}],fragment:A,uniforms(e,t,n){let r=w(t^10385941),i=Number(e.petals),a=Number(e.spread),o=Number(e.curl),s=Math.max(n,1)*.5,c=Math.max(1/n,1)*.5,l=[],u=Array.from({length:i-1},(e,t)=>t),d=u.map(e=>(i-1==1?r()<.5?-1:1:e/(i-2)*2-1)+(r()-.5)*.3),f=[...u].sort((e,t)=>Math.abs(d[t])-Math.abs(d[e])+(r()-.5)*.6),p=(r()-.5)*.4,m=(r()-.5)*.3*s,h=.35*c;for(let e of f){let t=d[e],n=1-Math.abs(t),u=Math.sign(t)||1,f=r()<.3*o;l.push({base:[m+t*s*.12,-c-h],angle:p+t*(.5+1*a),len:(2*c+h)*(.85+.3*n+r()*.15)*Math.max(1,s/c*.6),width:(.22+.1*r())*(.85+.35*a)*(i<=4?1.25:1),curl:u*o*(.2+.25*r()),scurve:-u*o*(.1+.2*r()),side:u,cup:.2+.2*r(),roll:f?u*Math.PI*.95:u*.5*o,rollFrac:.3+.15*r(),rollTop:.4+.2*r(),foldR:.03+.02*r()})}let g=r()<.5?-1:1,_=o>.15;return l.push({base:[m-g*s*(.1+.15*r()),-c-h],angle:p*.5+g*(.1+.15*r()),len:(2*c+h)*(1+.12*r())*Math.max(1,s/c*.55),width:(.4+.08*r())*(i<=4?1.1:1),curl:g*.03,scurve:-g*.015,side:g,cup:.22,roll:_?-g*Math.PI*(.85+.12*o):0,rollFrac:.45+.25*o*(.7+.3*r()),rollTop:.15+.15*r(),rollEnd:.76+.1*r(),foldR:.045+.03*r()}),ee(e,l)}},te=`#define MAX_PLANES 2
#define MAX_CRESCENTS 3
#define MAX_BANDS 4
uniform vec3 u_base;
uniform vec3 u_light;       // the lighter, translucent tint of planes and bands
uniform vec3 u_shadow;      // deep tone of the smoky knot
uniform float u_soft;
uniform float u_smoke;
uniform vec2 u_knot;        // centre of the smoky knot
uniform float u_knotAngle;
// Translucent planes bounded by a parabola: vertex, axis angle, curvature, length, alpha.
uniform int u_planes;
uniform vec2 u_pVertex[MAX_PLANES];
uniform float u_pAngle[MAX_PLANES];
uniform float u_pCurv[MAX_PLANES];
uniform float u_pLen[MAX_PLANES];
uniform float u_pAlpha[MAX_PLANES];
// Thin bright slivers: start point, direction, bulge (signed, towards the left normal),
// length and greatest half-thickness. Tapered to points at both ends.
uniform int u_crescents;
uniform vec2 u_cVertex[MAX_CRESCENTS];
uniform float u_cAngle[MAX_CRESCENTS];
uniform float u_cCurv[MAX_CRESCENTS];
uniform float u_cLen[MAX_CRESCENTS];
uniform float u_cThick[MAX_CRESCENTS];
// Wide soft bands crossing the frame: a point, a direction, curvature, half-width, alpha.
uniform int u_bands;
uniform vec2 u_bPoint[MAX_BANDS];
uniform float u_bAngle[MAX_BANDS];
uniform float u_bCurv[MAX_BANDS];
uniform float u_bWidth[MAX_BANDS];
uniform float u_bAlpha[MAX_BANDS];
uniform vec3 u_blob;        // soft light oval: x, y, size

vec2 rot(vec2 v, float a) { float c = cos(a), s = sin(a); return vec2(c * v.x + s * v.y, -s * v.x + c * v.y); }

// Signed distance (approx.) to a parabola u = k w^2, positive inside (towards +u).
float parabola(vec2 q, float k) {
  return (q.x - k * q.y * q.y) / sqrt(1.0 + 4.0 * k * k * q.y * q.y);
}

vec3 wallpaper(vec2 p) {
  float hx = max(u_aspect, 1.0) * 0.5;
  float hy = max(1.0 / u_aspect, 1.0) * 0.5;
  vec2 uv = p / vec2(hx, hy);
  float px = max(fwidth(p.x), 1e-5);
  float edgeSoft = 0.004 + 0.05 * u_soft;

  // Base: lighter towards the left, deeper towards the lower right.
  vec3 col = mixOklab(mixOklab(u_base, u_light, 0.28), u_base, smoothstep(-1.1, 0.9, uv.x * 0.8 - uv.y * 0.3));
  col = mixOklab(col, u_base * 0.82, smoothstep(0.2, 1.4, uv.x * 0.5 - uv.y * 0.7) * 0.6);
  // a pale strip down the far left edge (measured L 0.69 against 0.53 a little further in)
  col = mixOklab(col, u_light, smoothstep(-0.72, -1.0, uv.x) * 0.55);

  // Smoky knot: an elongated, noise-warped dark blur.
  vec2 kq = rot(p - u_knot, u_knotAngle);
  kq += (vec2(fbm(p * 3.0 + 3.1, 4), fbm(p * 3.0 + 9.7, 4)) - 0.5) * 0.12;
  float knot = 0.8 * exp(-dot(kq / vec2(0.4, 0.085), kq / vec2(0.4, 0.085)));
  knot += 0.45 * exp(-dot(kq / vec2(0.65, 0.2), kq / vec2(0.65, 0.2)));
  col = mixOklab(col, u_shadow, clamp(knot * u_smoke, 0.0, 0.85));

  // Large translucent planes with a crisp bright rim on the curved edge.
  for (int i = 0; i < MAX_PLANES; i++) {
    if (i >= u_planes) break;
    vec2 q = rot(p - u_pVertex[i], u_pAngle[i]);     // q.x along the axis, q.y across
    float d = parabola(q, u_pCurv[i]);
    float along = 1.0 - smoothstep(u_pLen[i] * 0.55, u_pLen[i], q.x);
    // Softer on the upper side of the plane, crisp on the curved leading edge.
    float soft = mix(px + 0.003, edgeSoft * 3.0, smoothstep(0.0, 0.3, q.y));
    float fill = smoothstep(-soft, soft, d) * along;
    col = mix(col, mixOklab(col, u_light, 0.75), fill * u_pAlpha[i]);
    // a soft lit band along the curved edge, brightest at the tip
    float rim = exp(-abs(d - 0.002) / (px * 1.2 + 0.004)) * along * (1.0 - smoothstep(0.05, 0.4, abs(q.y)));
    col = mix(col, mixOklab(col, vec3(1.0), 0.45), rim * 0.55);
  }

  // Wide translucent bands, drawn over the plane: where a band crosses the plane's tip the
  // overlap is brighter and both sets of edges show — the lens shapes of the original.
  float planeMask = 0.0;
  for (int i = 0; i < MAX_PLANES; i++) {
    if (i >= u_planes) break;
    vec2 q = rot(p - u_pVertex[i], u_pAngle[i]);
    planeMask = max(planeMask, smoothstep(-px, px, parabola(q, u_pCurv[i])) * (1.0 - smoothstep(u_pLen[i] * 0.55, u_pLen[i], q.x)));
  }
  for (int i = 0; i < MAX_BANDS; i++) {
    if (i >= u_bands) break;
    vec2 q = rot(p - u_bPoint[i], u_bAngle[i]);      // q.x across, q.y along
    float d = abs(q.x - u_bCurv[i] * q.y * q.y) - u_bWidth[i];
    float edgeW = mix(edgeSoft * 2.5, px * 1.5 + edgeSoft * 0.4, planeMask);   // crisper where it crosses the plane
    float inside = 1.0 - smoothstep(-edgeW, edgeW, d);
    col = mix(col, mixOklab(col, u_light, 0.55 + 0.1 * planeMask), inside * u_bAlpha[i] * (1.0 + 0.25 * planeMask));
    // Edges: faintly dark over the background, a fine bright line where over the plane.
    float e = exp(-abs(d) / (px * 1.6 + edgeSoft * 0.5 * (1.0 - planeMask)));
    col = mixOklab(col, u_shadow, 0.3 * u_bAlpha[i] * e * (1.0 - planeMask));
    col = mix(col, mixOklab(col, vec3(1.0), 0.45), 0.35 * e * planeMask * u_bAlpha[i]);
  }

  // Bright slivers (the lens shapes): crisp light fill, a fine bright edge and a dark line
  // along their lower side.
  for (int i = 0; i < MAX_CRESCENTS; i++) {
    if (i >= u_crescents) break;
    vec2 q = rot(p - u_cVertex[i], u_cAngle[i]);     // q.x along, q.y across (left)
    float t = q.x / u_cLen[i];
    if (t < -0.05 || t > 1.05) continue;
    float tc = clamp(t, 0.0, 1.0);
    float off = 4.0 * u_cCurv[i] * tc * (1.0 - tc);
    // max(): float PI is a hair over pi, so sin(PI * 1.0) < 0 and pow() of it is NaN (black) on
    // real GPUs across the whole strip past the far tip. SwiftShader hides this (pow of |x|).
    float half_ = u_cThick[i] * pow(max(sin(PI * tc), 0.0), 0.8);
    float dy = q.y - off;
    float d = abs(dy) - half_;
    // translucent and soft-edged, lighter along its upper edge
    float es = px * 1.2 + 0.002 + 0.004 * u_soft;
    float fill = 1.0 - smoothstep(-es, es, d);
    float upper = smoothstep(-half_, half_, dy);
    col = mix(col, mixOklab(col, u_light, 0.55 + 0.3 * upper), fill * 0.75);
    col = mix(col, mixOklab(col, vec3(1.0), 0.35), exp(-abs(dy - half_) / es) * sin(PI * tc) * 0.5);
    // a soft dark line under it (on the right side of travel), fading towards the tips
    float under = exp(-abs(dy + half_ + es) / (es * 1.5)) * sin(PI * tc);
    col = mixOklab(col, u_shadow * 0.8, under * 0.35);
  }

  // Soft light oval.
  vec2 bq = (p - u_blob.xy) / vec2(u_blob.z, u_blob.z * 0.4);
  col = mix(col, mixOklab(col, u_light, 0.7), exp(-dot(bq, bq)) * 0.55);
  return col;
}
`;function ne(e,t){let n=u(String(e.base)),r=u(String(e.light)),a=(r.h-n.h+540)%360-180;a=Math.max(-25,Math.min(25,a));let o=f({l:r.l,c:Math.min(r.c,n.c+.04),h:n.h+a}),s=f({l:n.l*.62,c:Math.min(.2,n.c*1.35),h:n.h+4}),c=(e,t,n,r)=>[...e.slice(0,n).flatMap(t),...Array(Math.max(0,n-e.length)).fill(r).flat()];return{u_base:i(String(e.base)),u_light:i(o),u_shadow:i(s),u_soft:Number(e.softness),u_smoke:Number(e.smoke),u_knot:t.knot,u_knotAngle:t.knotAngle,u_planes:{int:Math.min(t.planes.length,2)},u_pVertex:{vec2Array:c(t.planes,e=>e.vertex,2,[0,0])},u_pAngle:{floatArray:c(t.planes,e=>[e.angle],2,[0])},u_pCurv:{floatArray:c(t.planes,e=>[e.curv],2,[1])},u_pLen:{floatArray:c(t.planes,e=>[e.len],2,[1])},u_pAlpha:{floatArray:c(t.planes,e=>[e.alpha],2,[0])},u_crescents:{int:Math.min(t.crescents.length,3)},u_cVertex:{vec2Array:c(t.crescents,e=>e.vertex,3,[0,0])},u_cAngle:{floatArray:c(t.crescents,e=>[e.angle],3,[0])},u_cCurv:{floatArray:c(t.crescents,e=>[e.curv],3,[0])},u_cLen:{floatArray:c(t.crescents,e=>[e.len],3,[.1])},u_cThick:{floatArray:c(t.crescents,e=>[e.thick],3,[.01])},u_bands:{int:Math.min(t.bands.length,4)},u_bPoint:{vec2Array:c(t.bands,e=>e.point,4,[0,0])},u_bAngle:{floatArray:c(t.bands,e=>[e.angle],4,[0])},u_bCurv:{floatArray:c(t.bands,e=>[e.curv],4,[0])},u_bWidth:{floatArray:c(t.bands,e=>[e.width],4,[.1])},u_bAlpha:{floatArray:c(t.bands,e=>[e.alpha],4,[0])},u_blob:t.blob}}var re={id:`drift`,name:`Drift`,era:`2000s`,version:1,params:[{kind:`color`,id:`base`,label:`Base`,default:`#3f72b8`,l:[.4,.68],c:[.06,.16],excludeHue:[64,134]},{kind:`color`,id:`light`,label:`Light`,default:`#8fb3dc`,l:[.68,.9],c:[.02,.12]},{kind:`range`,id:`ribbons`,label:`Bands`,min:1,max:3,step:1,default:2},{kind:`range`,id:`width`,label:`Band width`,min:.04,max:.12,step:.01,default:.06},{kind:`range`,id:`flow`,label:`Flow`,min:0,max:1,step:.01,default:.5},{kind:`range`,id:`smoke`,label:`Smoke`,min:0,max:1,step:.01,default:.7},{kind:`range`,id:`softness`,label:`Softness`,min:0,max:1,step:.01,default:.5},S(.3)],presets:[{id:`classic`,label:`Classic blue`,values:{base:`#3f72b8`,light:`#8fb3dc`,ribbons:2,width:.06,flow:.5,smoke:.7,softness:.5,grain:.3}}],fragment:te,uniforms(e,t,n){let r=w(t^860663),i=e=>(r()-.5)*2*e,a=Math.max(n,1)*.5,o=Math.max(1/n,1)*.5,s=Number(e.flow),c=Number(e.width),l=r()<.5?1:-1,u=a/.667,d=o/.5,f=(e,t)=>[l*e*u,t*d],p=e=>l>0?e:Math.PI-e,m=-.27+i(.08),h=i(.08),g=m+.09+i(.03),_=h-.04+i(.03),v=.075+i(.2),y=[{vertex:f(g,_),angle:p(v),curv:3.5+4*s+i(.6),len:1.25*u,alpha:.4+i(.08)}],b=[{vertex:f(g+.007,_-.045),angle:p(-.63+i(.06)),curv:-.017*l,len:.263,thick:.007},{vertex:f(g-.04,_-.1),angle:p(-.45+i(.06)),curv:-.005*l,len:.275,thick:.006},{vertex:f(m-.29+i(.04),h+.045+i(.03)),angle:p(-.25+i(.08)),curv:.022*l,len:.2,thick:.012}],x=Number(e.ribbons),S=[{x:-.17,a:-2.24,c:.3,a0:.45,w:.025,y:-.05},{x:.38,a:.238,c:0,a0:.3},{x:-.62,a:-.15,c:.25,a0:.25},{x:.05,a:-.35,c:.15,a0:.3}].slice(0,x+1).map((e,t)=>({point:t===0?f(g+.07+i(.02),_-.12+i(.02)):f(e.x+i(.08),(e.y??0)+i(.1)),angle:p(e.a+i(.15)),curv:l*(e.c+i(.6)*s),width:(e.w??c)*(.8+.4*r()),alpha:e.a0+i(.08)})),C=[l*(m-.12+i(.04))*u,(h-.11+i(.03))*d,.07+i(.015)];return ne(e,{knot:f(m,h),knotAngle:p(-.75+i(.15)),planes:y,crescents:b,bands:S,blob:C})}},ie=`#define MAX_ARCS 10
#define MAX_STREAKS 4
uniform vec3 u_base;
uniform vec3 u_lite;        // the lighter tint the background brightens towards
uniform vec3 u_line;
uniform vec2 u_lightPos;
uniform float u_thick;
uniform float u_glow;
uniform int u_arcs;
uniform vec2 u_aC[MAX_ARCS];      // ellipse centre
uniform vec2 u_aR[MAX_ARCS];      // semi-axes
uniform float u_aRot[MAX_ARCS];
uniform vec2 u_aSpan[MAX_ARCS];   // visible range of the ellipse angle (radians)
uniform float u_aBright[MAX_ARCS];
uniform int u_streaks;
uniform vec2 u_sA[MAX_STREAKS];   // streak start
uniform vec2 u_sB[MAX_STREAKS];   // streak end
uniform float u_sBright[MAX_STREAKS];

vec2 rot(vec2 v, float a) { float c = cos(a), s = sin(a); return vec2(c * v.x + s * v.y, -s * v.x + c * v.y); }

// Approximate signed distance to an ellipse (Inigo Quilez's cheap form).
float ellipseDist(vec2 q, vec2 r) {
  float k0 = length(q / r);
  float k1 = length(q / (r * r));
  return k0 * (k0 - 1.0) / max(k1, 1e-5);
}

// Smooth window over an angle range, fading in and out at the ends; handles wrap-around.
float angleWindow(float a, vec2 span) {
  float len = mod(span.y - span.x, TAU);
  float x = mod(a - span.x, TAU);
  float fade = 0.35 * len;
  return smoothstep(0.0, fade, x) * (1.0 - smoothstep(len - fade, len, x)) * step(x, len);
}

vec3 wallpaper(vec2 p) {
  float px = max(fwidth(p.x), 1e-5);
  // Background: brightening towards the light, deepest in the opposite corner.
  float dl = length(p - u_lightPos);
  vec3 col = mixOklab(u_lite, u_base, smoothstep(0.0, 1.5, dl));
  col = mixOklab(col, u_base * 0.68, smoothstep(0.7, 1.7, dl) * 0.75);

  float w = 0.0015 + 0.004 * u_thick;           // line core half-width
  float lines = 0.0;
  float halo = 0.0;
  for (int i = 0; i < MAX_ARCS; i++) {
    if (i >= u_arcs) break;
    vec2 q = rot(p - u_aC[i], u_aRot[i]);
    float d = ellipseDist(q, u_aR[i]);
    float ang = atan(q.y / u_aR[i].y, q.x / u_aR[i].x);
    float win = angleWindow(ang, u_aSpan[i]) * u_aBright[i];
    // A soft (slightly out-of-focus) core inside a broad luminous band, with a wide glow,
    // like light trails; the brightest arcs carry the widest bands.
    float sig = w + px * 0.7 + 0.0015;
    float core = exp(-(d * d) / (2.0 * sig * sig));
    float bw = 0.008 + 0.018 * u_thick + 0.012 * u_aBright[i];
    float band = exp(-(d * d) / (2.0 * bw * bw));
    // the band brightens along its length towards the lower left, away from the light
    float along = 0.55 + 0.45 * smoothstep(-1.0, 1.0, -cos(ang) * 0.6 - sin(ang) * 0.8);
    lines += core * win * 0.8 + band * win * 0.3 * along;
    halo += (exp(-abs(d) / (0.025 + 0.04 * u_glow)) * 0.22 + exp(-abs(d) / 0.006) * 0.2) * win;
  }
  for (int i = 0; i < MAX_STREAKS; i++) {
    if (i >= u_streaks) break;
    vec2 a = u_sA[i], b = u_sB[i];
    vec2 ab = b - a;
    float h = clamp(dot(p - a, ab) / dot(ab, ab), 0.0, 1.0);
    float d = length(p - a - ab * h);
    float fade = sin(PI * h) * u_sBright[i];
    float sg = w * 0.8 + px * 0.7;
    lines += exp(-(d * d) / (2.0 * sg * sg)) * fade * 0.45;
    halo += exp(-d / (0.01 + 0.02 * u_glow)) * 0.18 * fade;
  }
  // (softer and less white than a light trail: the original's lines are faint cyan)
  col = mix(col, mixOklab(col, u_line, 0.5), clamp(halo * (0.3 + 0.5 * u_glow), 0.0, 0.7));
  col = mix(col, mixOklab(col, u_line, 0.6), clamp(lines, 0.0, 1.0) * 0.5);
  return col;
}
`,N=10,ae=4;function oe(e,t){let n=u(String(e.base)),r=f({l:Math.min(.8,n.l+.22),c:n.c*.75,h:n.h-18}),a=t.arcs.slice(0,N),o=t.streaks.slice(0,ae),s=(e,t,n,r)=>[...e,...Array(t*n-e.length).fill(r)];return{u_base:i(String(e.base)),u_lite:i(r),u_line:i(String(e.line)),u_lightPos:t.light,u_thick:Number(e.thickness),u_glow:Number(e.glow),u_arcs:{int:a.length},u_aC:{vec2Array:s(a.flatMap(e=>e.c),N,2,0)},u_aR:{vec2Array:s(a.flatMap(e=>e.r),N,2,1)},u_aRot:{floatArray:s(a.map(e=>e.rot),N,1,0)},u_aSpan:{vec2Array:s(a.flatMap(e=>e.span),N,2,0)},u_aBright:{floatArray:s(a.map(e=>e.bright),N,1,0)},u_streaks:{int:o.length},u_sA:{vec2Array:s(o.flatMap(e=>[e.seg[0],e.seg[1]]),ae,2,0)},u_sB:{vec2Array:s(o.flatMap(e=>[e.seg[2],e.seg[3]]),ae,2,0)},u_sBright:{floatArray:s(o.map(e=>e.bright),ae,1,0)}}}var P={id:`orbit`,name:`Orbit`,era:`2000s`,version:1,params:[{kind:`color`,id:`base`,label:`Base`,default:`#2f63a8`,l:[.35,.62],c:[.06,.16],excludeHue:[64,134]},{kind:`color`,id:`line`,label:`Lines`,default:`#c7e6fb`,l:[.82,.97],c:[0,.08]},{kind:`range`,id:`arcs`,label:`Arcs`,min:2,max:10,step:1,default:6},{kind:`range`,id:`thickness`,label:`Thickness`,min:0,max:1,step:.01,default:.35},{kind:`range`,id:`glow`,label:`Glow`,min:0,max:1,step:.01,default:.55},{kind:`range`,id:`tilt`,label:`Tilt`,min:-30,max:30,step:1,default:0},{kind:`range`,id:`streaks`,label:`Streaks`,min:0,max:4,step:1,default:3},S(.3)],presets:[{id:`classic`,label:`Classic blue`,values:{base:`#2f63a8`,line:`#c7e6fb`,arcs:6,thickness:.35,glow:.55,tilt:0,streaks:3,grain:.3}}],fragment:ie,uniforms(e,t,n){return oe(e,se(e,t,n))}};function se(e,t,n){let r=w(t^2839),i=e=>(r()-.5)*2*e,a=Math.max(n,1)*.5,o=Math.max(1/n,1)*.5,s=a/.8,c=o/.5,l=r()<.5?1:-1,u=Number(e.tilt)*Math.PI/180,d=(e,t)=>[l*e*s,t*c],f=[{c:[1.817,.32],r:[2.341,.736],rot:.071,span:[Math.PI*.8,Math.PI*1.45],bright:1},{c:[.392,.211],r:[.877,.348],rot:-.005,span:[Math.PI*.72,Math.PI*1.75],bright:.9},{c:[.86,-.242],r:[1.183,.671],rot:-.343,span:[Math.PI*.7,Math.PI*1.35],bright:.55},{c:[.5,0],r:[.7,.48],rot:.1,span:[Math.PI*.15,Math.PI*.75],bright:.3}],p=Number(e.arcs),m=[];for(let e=0;e<p;e++){let t=f[e%f.length],n=1+i(.12),a=t.span[0]+i(.06)*Math.PI,o=t.span[1]+i(.06)*Math.PI;m.push({c:d(t.c[0]+i(.08),t.c[1]+i(.06)),r:[t.r[0]*n*s,t.r[1]*(1+i(.1))*c],rot:l*(t.rot+u+i(.08)),span:l>0?[a,o]:[Math.PI-o,Math.PI-a],bright:t.bright*(e<f.length?1:.6)*(.85+.3*r())})}let h=Number(e.streaks),g=Array.from({length:h},(e,t)=>{let n=-.8+.25*t+i(.1),a=-.5+i(.2)+.15*t,o=.9+i(.25),s=.55+i(.12),[c,l]=d(n,a),[u,f]=d(n+Math.cos(s)*o,a+Math.sin(s)*o);return{seg:[c,l,u,f],bright:.4+.4*r()}});return{light:d(.63,.33),arcs:m,streaks:g}}var ce=`// Large overlapping translucent sheets, each bounded by one long smooth curve,
// with a crisp lit edge, light falling off away from the edge, plus straight thin lines.
#define MAX_SHEETS 6
#define SHEET_SAMPLES 48
#define MAX_LINES 3
uniform vec3 u_base;
uniform vec3 u_lite;
uniform vec3 u_deep;
uniform vec3 u_high;
uniform float u_soft;
uniform float u_sheen;
uniform int u_sheets;
uniform vec2 u_sP0[MAX_SHEETS];
uniform vec2 u_sP1[MAX_SHEETS];
uniform vec2 u_sP2[MAX_SHEETS];
uniform vec2 u_sP3[MAX_SHEETS];
uniform float u_sSide[MAX_SHEETS];    // which side of the curve is the sheet (+1 / -1)
uniform float u_sAlpha[MAX_SHEETS];   // > 0 lighter sheet, < 0 darker
uniform float u_sFall[MAX_SHEETS];    // distance over which the sheet's light fades from its edge
uniform float u_sCrisp[MAX_SHEETS];   // 0..1 crispness of the edge
uniform vec2 u_sSoftAfter[MAX_SHEETS];// edge turns soft between these spine parameters
uniform float u_sGlow[MAX_SHEETS];    // light glow just outside the edge
uniform int u_lines;
uniform vec2 u_lA[MAX_LINES];
uniform vec2 u_lB[MAX_LINES];
uniform float u_lBright[MAX_LINES];

vec2 bez3(vec2 a, vec2 b, vec2 c, vec2 d, float t) {
  float u = 1.0 - t;
  return u * u * u * a + 3.0 * u * u * t * b + 3.0 * u * t * t * c + t * t * t * d;
}

// Signed distance to an open cubic curve (positive on the curve's left), and the spine parameter.
vec2 curveSD(vec2 p, int i) {
  float best = 1e9, bestT = 0.0, bestS = 1.0;
  vec2 prev = u_sP0[i];
  for (int k = 1; k <= SHEET_SAMPLES; k++) {
    float t = float(k) / float(SHEET_SAMPLES);
    vec2 cur = bez3(u_sP0[i], u_sP1[i], u_sP2[i], u_sP3[i], t);
    vec2 ab = cur - prev;
    float h = clamp(dot(p - prev, ab) / max(dot(ab, ab), 1e-9), 0.0, 1.0);
    vec2 d = p - prev - ab * h;
    float dd = dot(d, d);
    if (dd < best) { best = dd; bestT = (float(k - 1) + h) / float(SHEET_SAMPLES); bestS = ab.x * d.y - ab.y * d.x >= 0.0 ? 1.0 : -1.0; }
    prev = cur;
  }
  return vec2(sqrt(best) * bestS, bestT);
}

vec3 wallpaper(vec2 p) {
  float hx = max(u_aspect, 1.0) * 0.5;
  float hy = max(1.0 / u_aspect, 1.0) * 0.5;
  vec2 uv = p / vec2(hx, hy);
  float px = max(fwidth(p.x), 1e-5);
  // Lighter towards the top and right, deep navy in the lower left.
  float g = uv.y * 0.5 + uv.x * 0.45;
  vec3 col = mixOklab(u_deep, mixOklab(u_base, u_lite, 0.85), smoothstep(-1.1, 1.0, g));
  col = mixOklab(col, u_deep, smoothstep(-0.3, 0.9, -uv.y * 0.75 - uv.x * 0.55) * 0.95);

  for (int i = 0; i < MAX_SHEETS; i++) {
    if (i >= u_sheets) break;
    vec2 st = curveSD(p, i);
    float sd = st.x * u_sSide[i];                     // > 0 inside the sheet
    float soften = smoothstep(u_sSoftAfter[i].x, u_sSoftAfter[i].y, st.y);
    float crisp = u_sCrisp[i] * (1.0 - soften);
    float ew = mix(0.004 + 0.06 * u_soft, px * 1.2, crisp);
    float inside = smoothstep(-ew, ew, sd);
    float fall = exp(-max(sd, 0.0) / max(u_sFall[i], 1e-3));
    // light only near the lit edge: far from it the sheet is barely there (the deep corner stays deep)
    float a = u_sAlpha[i] * inside * (0.1 + 0.9 * fall);
    if (a >= 0.0) col = mix(col, mixOklab(col, mixOklab(u_lite, u_high, 0.12), 0.8), a);
    else col = mix(col, mixOklab(col, u_base * 0.45, 0.8), -a);
    // Crisp lit edge line, and a glow just outside it.
    float line = exp(-abs(sd) / (px * 1.3)) * crisp;
    col = mix(col, mixOklab(col, u_high, 0.75), line * 0.55 * u_sheen);
    // bloom around the lit edge, on both sides
    float bloom = exp(-abs(sd) / (0.012 + 0.02 * u_soft)) * crisp;
    col = mix(col, mixOklab(col, u_high, 0.6), bloom * 0.3 * u_sheen);
    float glow = exp(-max(-sd, 0.0) / (0.03 + 0.03 * u_soft)) * (1.0 - inside) * u_sGlow[i];
    col = mix(col, mixOklab(col, u_lite, 0.7), glow * 0.7);
  }
  for (int i = 0; i < MAX_LINES; i++) {
    if (i >= u_lines) break;
    vec2 a = u_lA[i], b = u_lB[i], ab = b - a;
    float h = clamp(dot(p - a, ab) / dot(ab, ab), 0.0, 1.0);
    float d = length(p - a - ab * h);
    float br = abs(u_lBright[i]);
    float fade = smoothstep(0.0, 0.25, h) * smoothstep(1.0, 0.75, h) * br;
    if (u_lBright[i] < 0.0) {
      // a soft streak only: a wide gaussian band of light
      float sw = 0.02 + 0.03 * u_soft;
      col = mix(col, mixOklab(col, u_lite, 0.7), exp(-(d * d) / (2.0 * sw * sw)) * fade);
      continue;
    }
    float sg = 0.0025 + px * 0.6;
    col = mix(col, mixOklab(col, u_high, 0.8), exp(-(d * d) / (2.0 * sg * sg)) * fade * 0.6 * u_sheen);
    col = mix(col, mixOklab(col, u_lite, 0.6), exp(-d / (0.012 + 0.02 * u_soft)) * fade * 0.25);
  }
  return col;
}
`,le={sheets:[{c:[[.06,-.02],[.15,.2],[.22,.4],[.3,.8]],side:1,alpha:.1,fall:.25,crisp:.2,softAfter:[0,1],glow:0},{c:[[.015,-.036],[.384,.341],[.45,.338],[.783,-.037]],side:-1,alpha:.55,fall:.35,crisp:1,softAfter:[.85,1],glow:.3},{c:[[.4,-.05],[.321,.32],[.039,.809],[.6,.57]],side:1,alpha:.45,fall:.25,crisp:1,softAfter:[.72,.95],glow:.15},{c:[[.61,1.05],[.53,.643],[.631,.489],[1.05,.5]],side:-1,alpha:-.32,fall:.25,crisp:.6,softAfter:[1,1],glow:.55}],lines:[{a:[.33,.8],b:[.9,-.03],bright:.75},{a:[.36,.79],b:[.93,-.02],bright:.08},{a:[.22,.97],b:[.76,.2],bright:-.35}]};function ue(e,t,n){let r=u(String(e.base)),a=f({l:Math.min(.84,r.l+.24),c:Math.min(.16,r.c*1.05),h:r.h-14}),o=f({l:Math.max(.14,r.l-.34),c:Math.min(.13,r.c*.95),h:r.h+6}),s=Math.max(n,1)*.5,c=Math.max(1/n,1)*.5,l=([e,t])=>[(e-.5)*2*s,(.5-t)*2*c],d=t.sheets.slice(0,6),p=(e,t,n)=>[...e,...Array((6-d.length)*t).fill(n)],m=Number(e.breadth),h=t.lines.filter(e=>e.bright!==0).slice(0,3);return{u_base:i(String(e.base)),u_lite:i(a),u_deep:i(o),u_high:i(String(e.highlight)),u_soft:Number(e.softness),u_sheen:Number(e.sheen),u_sheets:{int:d.length},u_sP0:{vec2Array:p(d.flatMap(e=>l(e.c[0])),2,0)},u_sP1:{vec2Array:p(d.flatMap(e=>l(e.c[1])),2,0)},u_sP2:{vec2Array:p(d.flatMap(e=>l(e.c[2])),2,0)},u_sP3:{vec2Array:p(d.flatMap(e=>l(e.c[3])),2,0)},u_sSide:{floatArray:p(d.map(e=>e.side),1,1)},u_sAlpha:{floatArray:p(d.map(e=>e.alpha),1,0)},u_sFall:{floatArray:p(d.map(e=>e.fall*m*Math.min(s/.8,c/.5)),1,1)},u_sCrisp:{floatArray:p(d.map(e=>e.crisp),1,0)},u_sSoftAfter:{vec2Array:p(d.flatMap(e=>e.softAfter),2,1)},u_sGlow:{floatArray:p(d.map(e=>e.glow),1,0)},u_lines:{int:h.length},u_lA:{vec2Array:[...h.flatMap(e=>l(e.a)),...Array((3-h.length)*2).fill(0)]},u_lB:{vec2Array:[...h.flatMap(e=>l(e.b)),...Array((3-h.length)*2).fill(0)]},u_lBright:{floatArray:[...h.map(e=>e.bright),...Array(3-h.length).fill(0)]}}}var de={id:`fold`,name:`Fold`,era:`2000s`,version:2,params:[{kind:`color`,id:`base`,label:`Base`,default:`#2f62a8`,l:[.35,.62],c:[.06,.16],excludeHue:[64,134]},{kind:`color`,id:`highlight`,label:`Highlight`,default:`#cfe6f7`,l:[.8,.96],c:[.01,.08]},{kind:`range`,id:`folds`,label:`Sheets`,min:2,max:4,step:1,default:4},{kind:`range`,id:`breadth`,label:`Breadth`,min:.5,max:1.5,step:.01,default:1},{kind:`range`,id:`sheen`,label:`Sheen`,min:0,max:1,step:.01,default:.7},{kind:`range`,id:`softness`,label:`Softness`,min:0,max:1,step:.01,default:.5},S(.3)],presets:[{id:`classic`,label:`Classic blue`,values:{base:`#2f62a8`,highlight:`#cfe6f7`,folds:4,breadth:1,sheen:.7,softness:.5,grain:.3}}],fragment:ce,uniforms(e,t,n){let r=w(t^61469),i=e=>(r()-.5)*2*e,a=r()<.5,o=([e,t])=>[a?1-e:e,t],s=([e,t],n)=>[e+i(n),t+i(n)],c=Number(e.folds),l=le.sheets,u=(c>=4?l:c===3?[l[1],l[2],l[3]]:[l[1],l[2]]).map(e=>({...e,c:[o(s(e.c[0],.04)),o(s(e.c[1],.07)),o(s(e.c[2],.07)),o(s(e.c[3],.04))],side:a?-e.side:e.side,alpha:e.alpha*(.85+.3*r())})),d=[i(.08),i(.05)];return ue(e,{sheets:u,lines:le.lines.map(e=>({...e,a:o([e.a[0]+d[0],e.a[1]+d[1]]),b:o([e.b[0]+d[0],e.b[1]+d[1]])}))},n)}},fe=`// Shared translucent-ribbon engine (used by Fold and Sweep).
#define MAX_RIBBONS 8
#define RIBBON_SAMPLES 40
uniform int u_ribbons;
uniform vec2 u_rP0[MAX_RIBBONS];
uniform vec2 u_rP1[MAX_RIBBONS];
uniform vec2 u_rP2[MAX_RIBBONS];
uniform vec2 u_rP3[MAX_RIBBONS];
uniform vec2 u_rW[MAX_RIBBONS];       // half-width at start and end
uniform float u_rAlpha[MAX_RIBBONS];
uniform float u_rSoft[MAX_RIBBONS];   // which edge is soft: -1 / +1 (the other is crisp and lit)
uniform float u_rCap[MAX_RIBBONS];    // 1 = rounded end at t = 1 (a fold), 0 = runs off

vec2 bez(vec2 a, vec2 b, vec2 c, vec2 d, float t) {
  float u = 1.0 - t;
  return u * u * u * a + 3.0 * u * u * t * b + 3.0 * u * t * t * c + t * t * t * d;
}

// Nearest point on the ribbon's spine: returns (signed distance, t). Sign: which side.
vec2 ribbonSpine(vec2 p, int i) {
  float best = 1e9, bestT = 0.0, bestS = 1.0;
  vec2 prev = u_rP0[i];
  for (int k = 1; k <= RIBBON_SAMPLES; k++) {
    float t = float(k) / float(RIBBON_SAMPLES);
    vec2 cur = bez(u_rP0[i], u_rP1[i], u_rP2[i], u_rP3[i], t);
    vec2 ab = cur - prev;
    float h = clamp(dot(p - prev, ab) / max(dot(ab, ab), 1e-9), 0.0, 1.0);
    vec2 d = p - prev - ab * h;
    float dd = dot(d, d);
    if (dd < best) {
      best = dd;
      bestT = (float(k - 1) + h) / float(RIBBON_SAMPLES);
      bestS = sign(ab.x * d.y - ab.y * d.x);
    }
    prev = cur;
  }
  return vec2(sqrt(best) * (bestS == 0.0 ? 1.0 : bestS), bestT);
}

// Composites every ribbon over col. lightCol: the tint ribbons brighten towards; rimCol: edge
// highlight; softness: overall blur of the soft edges; rim: strength of the crisp edge line.
vec3 drawRibbons(vec3 col, vec2 p, vec3 lightCol, vec3 rimCol, float softness, float rim, float px, float shadow) {
  for (int i = 0; i < MAX_RIBBONS; i++) {
    if (i >= u_ribbons) break;
    vec2 st = ribbonSpine(p, i);
    float t = st.y;
    float w = mix(u_rW[i].x, u_rW[i].y, t);
    // Capped ribbons keep their width to the end: the nearest point on the spine is then the
    // end point itself, so the end is a broad, smooth semicircle (a rounded fold, not a tip).
    float across = st.x;                              // signed distance from the spine
    float edge = w - abs(across);                     // > 0 inside
    float softSide = step(0.0, across * u_rSoft[i]);  // 1 on the soft side
    // both edges are soft; the lit edge a little less so
    float blur = mix(px * 1.2 + 0.012 * softness + 0.05 * w * softness, px + 0.04 * softness + 0.15 * w * softness, softSide);
    float inside = smoothstep(-blur, blur, edge);
    // Optional soft shadow just outside the ribbon, on its soft side (depth).
    if (shadow > 0.0) col *= 1.0 - shadow * 0.22 * (1.0 - inside) * exp(-max(-edge, 0.0) / 0.035) * softSide * u_rAlpha[i];
    // Ends: runs off (open) or a rounded fold.
    // Open ends fade out gently (they normally lie beyond the frame anyway).
    if (u_rCap[i] < 0.5) inside *= smoothstep(0.0, 0.18, t) * smoothstep(1.0, 0.82, t);
    // Sheet shading: lighter towards the crisp edge, like light catching a curved sheet.
    float c = clamp(across / max(w, 1e-4) * -u_rSoft[i], -1.0, 1.0);   // +1 at the crisp edge
    float sheen = 0.45 + 0.55 * smoothstep(-1.0, 1.0, c);
    col = mix(col, mixOklab(col, lightCol, 0.65 * sheen), inside * u_rAlpha[i]);
    // A crisp, bright line along the lit edge.
    float line = exp(-abs(edge) / (px * 1.3)) * (1.0 - softSide);
    if (u_rCap[i] < 0.5) line *= smoothstep(0.0, 0.2, t) * smoothstep(1.0, 0.8, t);
    col = mix(col, mixOklab(col, rimCol, 0.8), line * rim * u_rAlpha[i] * 1.4);
  }
  return col;
}
`,F=8;function pe(e){let t=e.slice(0,F),n=e=>[...t.flatMap(t=>t.p[e]),...Array((F-t.length)*2).fill(0)],r=(e,n)=>[...t.map(e),...Array(F-t.length).fill(n)];return{u_ribbons:{int:t.length},u_rP0:{vec2Array:n(0)},u_rP1:{vec2Array:n(1)},u_rP2:{vec2Array:n(2)},u_rP3:{vec2Array:n(3)},u_rW:{vec2Array:[...t.flatMap(e=>e.w),...Array((F-t.length)*2).fill(0)]},u_rAlpha:{floatArray:r(e=>e.alpha,0)},u_rSoft:{floatArray:r(e=>e.soft,1)},u_rCap:{floatArray:r(e=>+!!e.cap,0)}}}function me(e,t,n,r){let i=([e,i])=>[t*e*n,i*r];return{...e,p:[i(e.p[0]),i(e.p[1]),i(e.p[2]),i(e.p[3])],soft:e.soft*t,w:[e.w[0]*Math.min(n,r),e.w[1]*Math.min(n,r)]}}var he=`uniform vec3 u_base;
uniform vec3 u_lite;
uniform vec3 u_deep;
uniform vec3 u_ribbon;
uniform float u_soft;
uniform float u_depth;

vec3 wallpaper(vec2 p) {
  float hx = max(u_aspect, 1.0) * 0.5;
  float hy = max(1.0 / u_aspect, 1.0) * 0.5;
  vec2 uv = p / vec2(hx, hy);
  float px = max(fwidth(p.x), 1e-5);
  // Light in the upper middle, deep navy along the bottom.
  float g = uv.y * 0.75 - abs(uv.x - 0.1) * 0.25;
  vec3 col = mixOklab(u_deep, mixOklab(u_base, u_lite, 0.75), smoothstep(-0.9, 1.0, g));
  // Translucent ribbons of light, brighter where they overlap, with a fine bright line along the
  // crisp edge (faint: the detail map of the original shows them clearly, the eye barely).
  return drawRibbons(col, p, mixOklab(u_lite, u_ribbon, 0.5), u_ribbon, 0.2 + 0.5 * u_soft, 0.3, px, u_depth * 0.4);
}
`;function ge(e,t){let n=u(String(e.base)),r=f({l:Math.min(.82,n.l+.24),c:n.c*1,h:n.h-10}),a=f({l:Math.max(.2,n.l-.2),c:Math.min(.16,n.c*.8),h:n.h+4});return{u_base:i(String(e.base)),u_lite:i(r),u_deep:i(a),u_ribbon:i(String(e.ribbon)),u_soft:1-Number(e.sharpness),u_depth:Number(e.depth),...pe(t)}}var _e=[{p:[[.017,-.387],[.354,-.281],[.58,-.32],[.925,-.138]],w:[.05,.09],alpha:.262,soft:-1},{p:[[.167,.14],[.438,.319],[.579,.391],[.886,.491]],w:[.012,.02],alpha:.375,soft:-1},{p:[[-.096,-.482],[.274,-.322],[.595,-.097],[.946,.045]],w:[.07,.15],alpha:.375,soft:-1},{p:[[-.372,-.578],[-.053,-.149],[.357,.183],[.875,.115]],w:[.09,.22],alpha:.45,soft:-1}],ve=[{p:[[-.528,.548],[-.399,.297],[-.247,.046],[-.171,-.233]],w:[.018,.03],alpha:.375,soft:1},{p:[[-.86,-.5],[-.27,-.056],[-.28,.224],[.093,.48]],w:[.04,.075],alpha:.45,soft:-1}],ye=[..._e,...ve],be=[3,5,4,2,1,0],xe={id:`sweep`,name:`Sweep`,era:`2000s`,version:1,params:[{kind:`color`,id:`base`,label:`Base`,default:`#3567b0`,l:[.35,.62],c:[.06,.16],excludeHue:[64,134]},{kind:`color`,id:`ribbon`,label:`Ribbon`,default:`#a9d0f0`,l:[.72,.92],c:[.02,.1]},{kind:`range`,id:`ribbons`,label:`Ribbons`,min:2,max:6,step:1,default:6},{kind:`range`,id:`width`,label:`Width`,min:.5,max:1.6,step:.01,default:1.25},{kind:`range`,id:`sharpness`,label:`Sharpness`,min:.3,max:1,step:.01,default:.7},{kind:`range`,id:`depth`,label:`Depth`,min:0,max:1,step:.01,default:.4},S(.3)],presets:[{id:`classic`,label:`Classic blue`,values:{base:`#3567b0`,ribbon:`#a9d0f0`,ribbons:6,width:1.25,sharpness:.7,depth:.4,grain:.3}}],fragment:`${fe}\n${he}`,uniforms(e,t,n){let r=w(t^24299),i=e=>(r()-.5)*2*e,a=Math.max(n,1)*.5,o=Math.max(1/n,1)*.5,s=r()<.5?1:-1,c=a/.8,l=o/.5,u=Number(e.width),d=Number(e.ribbons),f=([e,t],n)=>[e+i(n),t+i(n)];return ge(e,be.slice(0,d).sort((e,t)=>e-t).map(e=>ye[e]).map(e=>me({...e,p:(([e,t,n,r])=>[f(e,.08),f(t,.06),f(n,.06),f(r,.08)])(e.p),w:[e.w[0]*u*(.8+.4*r()),e.w[1]*u*(.8+.4*r())],alpha:e.alpha*(.85+.3*r())},s,c,l)))}},Se=`// Stacked hill layers, back to front. Each ridge is a smooth curve in image coordinates
// (u right, v down); below it the layer runs from its crest colour down to its body colour.
#define MAX_LAYERS 9
uniform vec3 u_skyTop;
uniform vec3 u_skyBottom;
uniform float u_soft;
uniform float u_mirror;      // 1 = dome on the right
uniform int u_layers;
uniform vec4 u_ridge[MAX_LAYERS];     // v0, slope, dome height, dome centre u
uniform vec4 u_shape[MAX_LAYERS];     // dome width, wave amplitude, wave frequency, wave phase
uniform vec3 u_top[MAX_LAYERS];       // crest colour
uniform vec3 u_body[MAX_LAYERS];      // colour further down
uniform vec3 u_deep[MAX_LAYERS];      // colour at the very bottom of the layer
uniform vec2 u_depth[MAX_LAYERS];     // distance (in v) from crest to body, and body to deep
uniform float u_edge[MAX_LAYERS];     // extra edge softness (a shading edge rather than a ridge)
uniform vec3 u_fog;                   // the dark ground haze across the bottom of the frame

float ridgeV(int i, float u) {
  vec4 r = u_ridge[i];
  vec4 s = u_shape[i];
  float dome = -r.z * exp(-pow((u - r.w) / max(s.x, 1e-3), 2.0));
  float waves = s.y * (sin(u * s.z + s.w) + 0.45 * sin(u * s.z * 2.3 + s.w * 1.7) + 0.2 * sin(u * s.z * 5.1 + s.w * 0.6));
  return r.x + r.y * u + dome + waves;
}

vec3 wallpaper(vec2 p) {
  float hx = max(u_aspect, 1.0) * 0.5;
  float hy = max(1.0 / u_aspect, 1.0) * 0.5;
  float u = p.x / (2.0 * hx) + 0.5;
  if (u_mirror > 0.5) u = 1.0 - u;
  float v = 0.5 - p.y / (2.0 * hy);
  float pv = max(fwidth(v), 1e-5);

  vec3 col = mixOklab(u_skyTop, u_skyBottom, smoothstep(-0.2, 1.1, u * 0.7 + v * 0.6));
  float onHill = 0.0;   // coverage by the two front layers (the brushed texture lives there)
  for (int i = 0; i < MAX_LAYERS; i++) {
    if (i >= u_layers) break;
    float rv = ridgeV(i, u);
    float below = v - rv;
    float blur = pv * 0.8 + 0.0015 + 0.008 * u_soft + u_edge[i] * (1.0 + 1.5 * (1.0 - u));   // softest on the left
    float inside = smoothstep(-blur, blur, below);
    // A soft darkening on what's behind, just above this ridge (it stands in front).
    col = mixOklab(col, col * 0.86, (1.0 - inside) * exp(-max(-below, 0.0) / (0.012 + 0.02 * u_soft)) * 0.6 * step(u_edge[i], 0.0));
    if (inside <= 0.0) continue;
    vec3 c = mixOklab(u_top[i], u_body[i], smoothstep(0.0, u_depth[i].x, below));
    c = mixOklab(c, u_deep[i], smoothstep(u_depth[i].x * 0.6, u_depth[i].x + u_depth[i].y, below));
    // A slightly lighter lip right along the crest.
    c = mixOklab(c, mixOklab(u_top[i], vec3(1.0), 0.15), exp(-below / (0.006 + 0.01 * u_soft)) * 0.5 * step(u_edge[i], 0.0));
    col = mix(col, c, inside);
    if (i >= u_layers - 2) onHill = max(onHill, inside);
  }
  // Ground haze: the bottom of the frame sinks into the dark ground colour along a nearly level
  // line (measured: from about v 0.6 at the left to 0.72 at the right).
  float fogEdge = 0.6 + 0.12 * u;
  col = mixOklab(col, u_fog, smoothstep(fogEdge - 0.04, fogEdge + 0.16, v) * 0.92);
  // Brushed texture on the front hills: fine streaks a few pixels apart running along the slope
  // (the sky stays smooth).
  vec2 bq = vec2(u * 6.0, (v - 0.35 * u) * 420.0);
  float brush = fbm(bq, 3) - 0.5 + 0.5 * (fbm(bq * vec2(3.0, 1.7) + 9.0, 2) - 0.5);
  col *= 1.0 + 0.1 * brush * onHill;
  return col;
}
`,Ce=9;function we(e,t){let n=t.layers.slice(0,Ce),r=e=>[...n.flatMap(e),...Array((Ce-n.length)*4).fill(0)],a=e=>[...n.flatMap(t=>i(e(t))),...Array((Ce-n.length)*3).fill(0)];return{u_mirror:+!!t.mirror,u_skyTop:i(t.skyTop),u_skyBottom:i(t.skyBottom),u_soft:Number(e.softness),u_layers:{int:n.length},u_ridge:{vec4Array:r(e=>[e.v0,e.slope,e.dome,e.domeU])},u_shape:{vec4Array:r(e=>[e.domeW,e.amp,e.freq,e.phase])},u_top:{vec3Array:a(e=>e.top)},u_body:{vec3Array:a(e=>e.body)},u_deep:{vec3Array:a(e=>e.deep)},u_depth:{vec2Array:[...n.flatMap(e=>e.depth),...Array((Ce-n.length)*2).fill(1)]},u_edge:{floatArray:[...n.map(e=>e.edge??0),...Array(Ce-n.length).fill(0)]},u_fog:i(t.fog)}}var I=(e,t,n=0,r=0)=>{let i=u(e);return f({l:Math.max(.05,Math.min(.97,i.l+t)),c:Math.max(0,i.c+n),h:i.h+r})};function Te(e,t=()=>0,n=3,r=1){let i=String(e.sky),a=String(e.far),o=String(e.mid),s=String(e.near),c=String(e.lower),l=String(e.ground),u=e=>t()*e,d=Number(e.time??0),f=[];for(let e=0;e<n;e++){let t=n===1?0:e/(n-1),a=I(i,-.04-.06*t,.01);f.push({v0:.15+.08*t+u(.02),slope:.14+u(.04),dome:0,domeU:0,domeW:1,amp:.008*r,freq:9+e+u(2),phase:e*1.7+u(3),top:a,body:I(a,-.05),deep:I(a,-.1),depth:[.15,.3]})}return f.push({v0:.27+u(.02),slope:.12+u(.03),dome:0,domeU:0,domeW:1,amp:.012*r,freq:8+u(2),phase:.6+u(3),top:I(a,.03),body:I(a,-.08,.03),deep:I(a,-.15,.04),depth:[.08,.2]}),f.push({v0:.36+u(.02),slope:.1+u(.03),dome:0,domeU:0,domeW:1,amp:.014*r,freq:7+u(2),phase:2.1+u(3),top:I(o,.04),body:o,deep:I(o,-.12,.02,-15),depth:[.08,.15]}),f.push({v0:.34+u(.03),slope:.22+u(.05),dome:.18+u(.02),domeU:.15+u(.06),domeW:.45+u(.05),amp:.006*r,freq:10+u(2),phase:4+u(3),top:I(s,-.03*(1-d),.01,-22*(1-d)),body:I(s,.05*(1-d)-.06*d,-.02-.01*d,-3*(1-d)+65*d),deep:l,depth:[.25,.4]}),f.push({v0:.35+u(.03),slope:.38+u(.05),dome:.05,domeU:-.2,domeW:.3,amp:.004*r,freq:5+u(1.5),phase:1+u(3),top:c,body:I(c,-.06,-.02,-10),deep:I(c,-.14,-.02,-40),depth:[.15,.3],edge:.02}),{skyTop:I(i,.07,-.02,-8),skyBottom:I(i,-.06,.01,5),layers:f,fog:l}}var Ee={sky:`#5b9bd8`,far:`#e3e6f7`,mid:`#f2b445`,near:`#e8604f`,lower:`#ed324e`,ground:`#24477a`},De={sky:`#1d1f4a`,far:`#b8423a`,mid:`#9b59d8`,near:`#4c8ab4`,lower:`#c13c35`,ground:`#2c0a12`};function Oe(e,t,n,r,i){let a=u(e),o=u(t),s=(o.h-a.h+540)%360-180,c=a.c<.03?o.h:a.h;return(a.c<.03||o.c<.03)&&(s=((o.c<.03?c:o.h)-c+540)%360-180),f({l:a.l+(o.l-a.l)*n,c:Math.min(.24,(a.c+(o.c-a.c)*n)*i),h:(c+s*n+r+360)%360})}function ke(e){let t=Number(e.time),n=Number(e.hue),r=Number(e.vividness),i={};for(let e of Object.keys(Ee))i[e]=Oe(Ee[e],De[e],t,e===`sky`||e===`ground`?0:n,r);return i}var Ae={id:`hills`,name:`Hills`,era:`2020s`,version:1,params:[{kind:`range`,id:`time`,label:`Day → Night`,min:0,max:1,step:.01,default:0},{kind:`range`,id:`hue`,label:`Hue shift`,min:-240,max:35,step:1,default:0},{kind:`range`,id:`vividness`,label:`Vividness`,min:.6,max:1.2,step:.01,default:1},{kind:`range`,id:`roughness`,label:`Roughness`,min:0,max:2,step:.01,default:1},{kind:`range`,id:`softness`,label:`Softness`,min:0,max:1,step:.01,default:.4},S(.25)],presets:[{id:`day`,label:`Day`,values:{time:0,hue:0,vividness:1,roughness:1,softness:.4,grain:.25}},{id:`night`,label:`Night`,values:{time:1,hue:0,vividness:1,roughness:1,softness:.4,grain:.25}}],fragment:Se,uniforms(e,t){let n=w(t^16657),r={...e,...ke(e)},i=n()<.5;return we(r,{...Te(r,()=>(n()-.5)*2,3,Number(e.roughness)),mirror:i})}},je=`// A canyon: mountain layers, back to front. Each ridge is a cubic in image coordinates
// (u right, v down) plus jagged noise; below it the layer runs from crest to body colour.
// Farther layers are hazier; a soft glow sits in the valley.
#define MAX_LAYERS 9
uniform vec3 u_skyTop;
uniform vec3 u_skyBottom;
uniform vec3 u_skyRight;         // the sky darkens (dark) / turns pinker (light) to the right
uniform vec3 u_floor;            // the colour of the valley floor (the front-left mass's low ridge)
uniform vec3 u_haze;
uniform vec3 u_glow;
uniform vec2 u_glowPos;          // u, v of the valley glow
uniform float u_glowAmt;
uniform float u_soft;
uniform float u_shiftU;          // moves the valley sideways
uniform float u_mirror;
uniform int u_layers;
uniform float u_knots[MAX_LAYERS * 9];  // ridge height (v) at u = 0, 1/8, ... 1 for each layer
uniform vec4 u_misc[MAX_LAYERS];   // roughness, noise phase, haze, depth
uniform vec3 u_top[MAX_LAYERS];
uniform vec3 u_body[MAX_LAYERS];

// Smooth (Catmull-Rom) ridge through the layer's nine knots.
float ridgeKnots(int i, float u) {
  float x = clamp(u, 0.0, 1.0) * 8.0;
  int k = int(min(floor(x), 7.0));
  float t = x - float(k);
  int b = i * 9;
  float p0 = u_knots[b + max(k - 1, 0)];
  float p1 = u_knots[b + k];
  float p2 = u_knots[b + k + 1];
  float p3 = u_knots[b + min(k + 2, 8)];
  float t2 = t * t, t3 = t2 * t;
  float r = 0.5 * (2.0 * p1 + (-p0 + p2) * t + (2.0 * p0 - 5.0 * p1 + 4.0 * p2 - p3) * t2 + (-p0 + 3.0 * p1 - 3.0 * p2 + p3) * t3);
  // continue the end slopes beyond the frame (for valley shifts)
  if (u < 0.0) r += (u_knots[b] - u_knots[b + 1]) * (-u * 8.0);
  if (u > 1.0) r += (u_knots[b + 8] - u_knots[b + 7]) * ((u - 1.0) * 8.0);
  return r;
}

float jag(float u, float ph) {
  // irregular small steps, like weathered ridges
  // a slow undulation plus finer steps
  float n = 1.4 * (vnoise(vec2(u * 5.0 + ph * 7.0, ph * 3.0 + 50.0)) - 0.5);
  float a = 1.0, f = 12.0;
  for (int k = 0; k < 4; k++) {
    n += a * (vnoise(vec2(u * f + ph * 7.0, ph * 3.0 + float(k) * 11.0)) - 0.5);
    f *= 2.1; a *= 0.5;
  }
  return n;
}

vec3 wallpaper(vec2 p) {
  float hx = max(u_aspect, 1.0) * 0.5;
  float hy = max(1.0 / u_aspect, 1.0) * 0.5;
  float u = p.x / (2.0 * hx) + 0.5;
  float v = 0.5 - p.y / (2.0 * hy);
  if (u_mirror > 0.5) u = 1.0 - u;
  u -= u_shiftU;
  float pv = max(fwidth(v), 1e-5);

  vec3 col = mixOklab(mixOklab(u_skyTop, u_skyRight, smoothstep(0.3, 1.0, u)), u_skyBottom, smoothstep(0.05, 0.6, v));
  for (int i = 0; i < MAX_LAYERS; i++) {
    if (i >= u_layers) break;
    vec4 m = u_misc[i];
    float rv = ridgeKnots(i, u) + m.x * (0.5 + 2.2 * (1.0 - m.z)) * jag(u, m.y);
    float below = v - rv;
    float blur = pv * 0.8 + 0.0012 + u_soft * (0.004 + 0.012 * m.z);
    float inside = smoothstep(-blur, blur, below);
    if (inside <= 0.0) continue;
    // where the front-left mass's ridge levels out into the valley floor, its crest takes the
    // floor colour (purple-magenta), not its pink upper crest
    vec3 top = i == 4 ? mixOklab(u_top[i], u_floor, smoothstep(0.4, 0.62, rv)) : u_top[i];
    vec3 lc = mixOklab(top, u_body[i], smoothstep(0.0, m.w, below));
    // atmospheric haze: farther layers (and their upper parts) fade towards the haze colour
    lc = mixOklab(lc, u_haze, m.z * (1.0 - 0.6 * smoothstep(0.0, 0.3, below)));
    col = mix(col, lc, inside);
  }
  // Soft glow / mist in the valley.
  // Mist and light rising from the valley floor: a wide soft glow plus a brighter core.
  vec2 gq = vec2((u - u_glowPos.x) * 1.2, (v - u_glowPos.y) * 1.6);
  float g = exp(-dot(gq, gq) / 0.03) * 0.55 + exp(-dot(gq, gq) / 0.006) * 0.35;
  col = mix(col, mixOklab(col, u_glow, 0.75), clamp(u_glowAmt * 1.4 * g, 0.0, 0.85));
  return col;
}
`,Me=[{knots:[.3,.14,.06,.1,.24,.3,.12,.02,.1],rough:.02,phase:.4,haze:.95,depth:.4},{knots:[1.2,1.2,1.2,1,.48,.25,.07,.03,.02],rough:.02,phase:1.1,haze:.8,depth:.3},{knots:[1.2,1.2,1.2,1.1,.75,.4,.2,.09,.03],rough:.022,phase:2.3,haze:.6,depth:.3},{knots:[1.2,1.2,1.2,1.2,.85,.6,.37,.21,.1],rough:.018,phase:3.7,haze:.35,depth:.35},{knots:[.06,.12,.25,.36,.6,.66,.69,.67,.63],rough:.014,phase:4.2,haze:.2,depth:.25},{knots:[.2,.31,.41,.47,.62,.72,.79,.82,.84],rough:.014,phase:5.9,haze:.1,depth:.25},{knots:[.43,.5,.53,.58,.7,.79,.83,.84,.85],rough:.012,phase:6.6,haze:0,depth:.25},{knots:[.55,.6,.66,.75,.83,.92,.98,1.02,1.05],rough:.01,phase:7.3,haze:0,depth:.25},{knots:[.71,.75,.79,.87,.99,1.1,1.18,1.25,1.3],rough:.008,phase:8.8,haze:0,depth:.25}],L={skyTop:`#d6e0ec`,skyRight:`#d0bed8`,skyBottom:`#cbb8d0`,floor:`#ad3cc8`,haze:`#cdbcd2`,glow:`#ec8fae`,tops:[`#e4dde8`,`#e8d4e0`,`#e1b2c9`,`#d06d99`,`#d9798b`,`#9935bd`,`#5b16c8`,`#37169a`,`#291579`],bodies:[`#ddd3e2`,`#ddc4d7`,`#d394b9`,`#c55aa6`,`#993ac0`,`#8a2ac3`,`#4a14b6`,`#361698`,`#231472`]},R={skyTop:`#3327d3`,skyRight:`#290d96`,skyBottom:`#3a13a0`,floor:`#6e2190`,haze:`#3816a2`,glow:`#a257d6`,tops:[`#3430cc`,`#3a2cc4`,`#3125ac`,`#291c94`,`#6b2a8c`,`#411073`,`#240751`,`#130536`,`#0c0321`],bodies:[`#302cbc`,`#3326b2`,`#2a1f9a`,`#221782`,`#491478`,`#390d6a`,`#190646`,`#130536`,`#0c031f`]};function Ne(e,t,n,r,i){let a=u(e),o=u(t),s=(o.h-a.h+540)%360-180;return f({l:a.l+(o.l-a.l)*n,c:Math.min(.26,(a.c+(o.c-a.c)*n)*i),h:(a.h+s*n+r+360)%360})}function Pe(e,t=()=>0,n=!1){let r=Number(e.time),i=Number(e.hue),a=Number(e.vividness),o=Number(e.roughness),s=(e,t)=>Ne(e,t,r,i,a),c=e=>t()*e,l=Me.map((t,n)=>({...t,knots:((e,n)=>t.knots.map((t,r)=>t+e+n*(r/8-.5)+c(.015)))(c(.03),c(.06)),rough:t.rough*o*(n<=3?1:n===4?.45:.15),phase:t.phase+c(3),haze:Math.min(1,t.haze*Number(e.haze)*2),top:s(L.tops[n],R.tops[n]),body:s(L.bodies[n],R.bodies[n])}));return{skyTop:s(L.skyTop,R.skyTop),skyRight:s(L.skyRight,R.skyRight),skyBottom:s(L.skyBottom,R.skyBottom),floor:s(L.floor,R.floor),haze:s(L.haze,R.haze),glow:s(L.glow,R.glow),glowPos:[.6,.62],layers:l,shiftU:Number(e.valley),mirror:n}}function Fe(e,t){let n=t.layers.slice(0,9),r=(e,t)=>[...e,...Array((9-n.length)*t).fill(0)];return{u_skyTop:i(t.skyTop),u_skyBottom:i(t.skyBottom),u_skyRight:i(t.skyRight),u_floor:i(t.floor),u_haze:i(t.haze),u_glow:i(t.glow),u_glowPos:t.glowPos,u_glowAmt:Number(e.haze),u_soft:Number(e.softness),u_shiftU:t.shiftU,u_mirror:+!!t.mirror,u_layers:{int:n.length},u_knots:{floatArray:r(n.flatMap(e=>e.knots),9)},u_misc:{vec4Array:r(n.flatMap(e=>[e.rough,e.phase,e.haze,e.depth]),4)},u_top:{vec3Array:r(n.flatMap(e=>i(e.top)),3)},u_body:{vec3Array:r(n.flatMap(e=>i(e.body)),3)}}}var Ie={id:`valley`,name:`Valley`,era:`2020s`,version:1,params:[{kind:`range`,id:`time`,label:`Light → Dark`,min:0,max:1,step:.01,default:0},{kind:`range`,id:`hue`,label:`Hue shift`,min:-150,max:60,step:1,default:0},{kind:`range`,id:`vividness`,label:`Vividness`,min:.6,max:1.2,step:.01,default:1},{kind:`range`,id:`valley`,label:`Valley`,min:-.2,max:.2,step:.01,default:0},{kind:`range`,id:`haze`,label:`Haze`,min:0,max:1,step:.01,default:.5},{kind:`range`,id:`roughness`,label:`Roughness`,min:0,max:2,step:.01,default:1},{kind:`range`,id:`softness`,label:`Softness`,min:0,max:1,step:.01,default:.3},S(.25)],presets:[{id:`light`,label:`Light`,values:{time:0,hue:0,vividness:1,valley:0,haze:.5,roughness:1,softness:.3,grain:.25}},{id:`dark`,label:`Dark`,values:{time:1,hue:0,vividness:1,valley:0,haze:.5,roughness:1,softness:.3,grain:.25}}],fragment:je,uniforms(e,t){let n=w(t^31249);return Fe(e,Pe(e,()=>(n()-.5)*2,n()<.5))}},Le=`// Sweeping translucent bands over a green hillside with terraced ripples.
// Each layer is the region below a top edge (and, for bands, above a bottom edge); edges are
// smooth curves through nine knots in image coordinates (u right, v down).
#define MAX_LAYERS 7
uniform vec3 u_skyL;
uniform vec3 u_skyR;
uniform float u_soft;
uniform float u_mirror;
uniform int u_layers;
uniform float u_topK[MAX_LAYERS * 9];
uniform float u_botK[MAX_LAYERS * 9];   // band bottom edge; values > 2 mean "no bottom"
uniform vec3 u_cL[MAX_LAYERS];          // colour on the left
uniform vec3 u_cR[MAX_LAYERS];          // colour on the right
uniform vec3 u_cD[MAX_LAYERS];          // colour deeper down the layer
uniform vec4 u_lm[MAX_LAYERS];          // alpha, depth, ripple amount, edge glow
uniform float u_feather[MAX_LAYERS];    // extra softness of this layer's top edge
uniform vec3 u_shine;                   // bright highlight colour on the meadow
#define MAX_RIPPLE_KEYS 9
uniform vec4 u_ripA[MAX_RIPPLE_KEYS];   // ripple crest keys: peak (u, v), arc width a, arc height b
uniform vec4 u_ripB[MAX_RIPPLE_KEYS];   // left-side drift k, tail drop, tail length
uniform float u_ripLast;                // index of the last key (one past the last visible crest)
uniform float u_ripStep;                // key spacing between visible crests
uniform float u_ripples;

float cr(float p0, float p1, float p2, float p3, float t) {
  float t2 = t * t, t3 = t2 * t;
  return 0.5 * (2.0 * p1 + (-p0 + p2) * t + (2.0 * p0 - 5.0 * p1 + 4.0 * p2 - p3) * t2 + (-p0 + 3.0 * p1 - 3.0 * p2 + p3) * t3);
}
float topEdge(int i, float u) {
  float x = clamp(u, 0.0, 1.0) * 8.0;
  int k = int(min(floor(x), 7.0));
  int b = i * 9;
  return cr(u_topK[b + max(k - 1, 0)], u_topK[b + k], u_topK[b + k + 1], u_topK[b + min(k + 2, 8)], x - float(k));
}
float botEdge(int i, float u) {
  float x = clamp(u, 0.0, 1.0) * 8.0;
  int k = int(min(floor(x), 7.0));
  int b = i * 9;
  return cr(u_botK[b + max(k - 1, 0)], u_botK[b + k], u_botK[b + k + 1], u_botK[b + min(k + 2, 8)], x - float(k));
}

// Ripple crests form a continuous family: crest phi interpolates the keys either side. Region phi
// is everything below crest phi's top and right of its left side; ripG < 0 inside it. As phi grows
// the crest moves down and to the right, so each pixel leaves the regions once, at the crest that
// passes through it.
vec4 ripKeyA(float phi) { float i = clamp(floor(phi), 0.0, u_ripLast - 1.0); vec4 r = vec4(0.0);
  for (int k = 0; k < MAX_RIPPLE_KEYS - 1; k++) if (float(k) == i) r = mix(u_ripA[k], u_ripA[k + 1], phi - i);
  return r; }
vec4 ripKeyB(float phi) { float i = clamp(floor(phi), 0.0, u_ripLast - 1.0); vec4 r = vec4(0.0);
  for (int k = 0; k < MAX_RIPPLE_KEYS - 1; k++) if (float(k) == i) r = mix(u_ripB[k], u_ripB[k + 1], phi - i);
  return r; }
float ripG(vec2 pq, float phi) {
  vec4 A = ripKeyA(phi), B = ripKeyB(phi);
  vec2 q = pq - A.xy;
  float t = clamp(-q.x / A.z, 0.0, 1.0);
  float top = q.x < 0.0 ? A.w * (1.0 - sqrt(1.0 - t * t)) : B.y * smoothstep(0.0, B.z, q.x);
  float s = clamp(q.y / A.w, 0.0, 1.0);
  float left = q.y < A.w ? -A.z * sqrt(1.0 - (1.0 - s) * (1.0 - s)) : -A.z + B.x * (q.y - A.w) * (q.y - A.w);
  return max(top - q.y, left - q.x);
}

vec3 wallpaper(vec2 p) {
  float hx = max(u_aspect, 1.0) * 0.5;
  float hy = max(1.0 / u_aspect, 1.0) * 0.5;
  float u = p.x / (2.0 * hx) + 0.5;
  float v = 0.5 - p.y / (2.0 * hy);
  if (u_mirror > 0.5) u = 1.0 - u;
  // Derivatives only here, in uniform control flow (real GPUs return garbage inside the
  // per-pixel loops and branches below).
  float pu = max(fwidth(u), 1e-5);
  float pv = max(fwidth(v), 1e-5);
  float blur = pv * 0.8 + 0.0015 + 0.012 * u_soft;

  vec3 col = mixOklab(u_skyL, u_skyR, smoothstep(0.0, 1.0, u * 0.8 + (0.5 - v) * 0.4));
  for (int i = 0; i < MAX_LAYERS; i++) {
    if (i >= u_layers) break;
    vec4 lm = u_lm[i];
    float te = topEdge(i, u);
    float below = v - te;
    float fb = blur + u_feather[i];
    float inside = smoothstep(-fb * 0.3, fb, below);
    float hasBot = u_botK[i * 9] < 2.0 ? 1.0 : 0.0;
    float be = hasBot > 0.5 ? botEdge(i, u) : 9.0;
    inside *= 1.0 - hasBot * smoothstep(-blur, blur, v - be);
    // soft shadow just above this layer's top edge (it lies in front)
    col = mixOklab(col, col * 0.8, (1.0 - inside) * exp(-max(-below, 0.0) / (0.01 + 0.03 * u_soft)) * 0.35 * lm.x);
    if (inside <= 0.0) continue;
    vec3 c = mixOklab(u_cL[i], u_cR[i], smoothstep(0.0, 1.0, u));
    c = mixOklab(c, u_cD[i], smoothstep(0.0, lm.y, below));
    // a lighter lip along the top edge
    c = mixOklab(c, mixOklab(c, vec3(1.0), 0.35), exp(-below / (0.004 + 0.012 * u_soft)) * lm.w);
    if (lm.z > 0.0) {
      // Meadow light: a bright patch towards the lower right, dark in the lower-left corner.
      vec2 gq = vec2(u - 0.78, v - 0.85);
      c = mixOklab(c, u_shine, 0.55 * exp(-dot(gq, gq) / 0.12));
      float corner = length(vec2(u * 1.1, (1.0 - v) * 1.4));
      c = mixOklab(c, c * 0.12, smoothstep(0.55, 0.0, corner) * 0.9);
      // Ripples: nested crests measured from the original. Each is crisp along its top and tail
      // (bright just below, fading to dark at the next crest: a sawtooth) and soft down its left
      // side, where the light rises and falls as a smooth wave. phi* is the crest through this
      // pixel; its position between visible crests is the phase.
      vec2 pq = vec2(u, v);
      float last = -1.0;
      float prev = ripG(pq, 0.0);
      for (int k = 1; k <= 4 * (MAX_RIPPLE_KEYS - 1); k++) {
        float ph = float(k) * 0.25;
        if (ph > u_ripLast + 0.001) break;
        float g = ripG(pq, ph);
        if ((prev > 0.0) != (g > 0.0)) last = ph;
        prev = g;
      }
      float phi = -1.0;
      if (last > 0.0) {
        float lo = last - 0.25, hi = last;
        float glo = ripG(pq, lo);
        for (int b = 0; b < 10; b++) {
          float mid = 0.5 * (lo + hi);
          float gm = ripG(pq, mid);
          if ((gm > 0.0) == (glo > 0.0)) { lo = mid; glo = gm; } else hi = mid;
        }
        phi = 0.5 * (lo + hi);
      }
      if (phi >= 0.0) {
        float fs = fract(phi / u_ripStep);
        vec4 A = ripKeyA(phi), B = ripKeyB(phi);
        vec2 q = pq - A.xy;
        // where on its crest this pixel is: 0 along the top and tail, 1 down the left side
        float side = q.y > A.w ? 1.0 : (q.x < 0.0 ? smoothstep(0.5, 0.95, -q.x / A.z) : 0.0);
        // phase change across one pixel, from ripG(pq, phi) = 0: the pixel's change in ripG over
        // ripG's rate along phi (fwidth(phi) here would be in non-uniform control flow)
        float gPhi = (ripG(pq, phi + 0.002) - ripG(pq, phi - 0.002)) / 0.004;
        float gPx = 0.5 * (abs(ripG(pq + vec2(pu, 0.0), phi) - ripG(pq - vec2(pu, 0.0), phi))
                         + abs(ripG(pq + vec2(0.0, pv), phi) - ripG(pq - vec2(0.0, pv), phi)));
        float aa = gPx / max(abs(gPhi), 1e-5) / u_ripStep + 0.004 + 0.03 * u_soft;
        // the light rises across the crest (over w of the phase: a smooth wave on the left side,
        // a crisp edge on top, never sharper than a pixel) and falls off towards the next crest
        float w = max(0.45 * side, aa);
        float r = fract(fs + 0.5 * w);
        float light = r < w ? smoothstep(0.0, w, r) : 1.0 - smoothstep(w, 1.0, r);
        float sh = light * 2.0 - 1.0;
        // fade along each tail, down the left sides, past the last crest and under the ridge; the
        // first crest is fainter
        float fade = (q.x > 0.0 ? smoothstep(1.4 * B.z, 0.7 * B.z, q.x) : 1.0)
                   * smoothstep(0.95, 0.84, v)
                   * smoothstep(u_ripLast, u_ripLast - 0.6, phi)
                   * mix(0.2, 1.0, smoothstep(0.0, 1.0, phi))
                   * smoothstep(0.03, 0.12, below) * lm.z * u_ripples;
        c = mixOklab(c, mixOklab(c, u_shine, 0.95), max(sh, 0.0) * 0.5 * fade);
        c = mixOklab(c, c * 0.35, max(-sh, 0.0) * 0.4 * fade);
      }
    }
    col = mix(col, c, inside * lm.x);
  }
  return col;
}
`,Re=[9,9,9,9,9,9,9,9,9],ze=[{px:.19,py:.517,a:.28,b:.09,k:1.2,drop:.03,tail:.12},{px:.204,py:.547,a:.187,b:.092,k:1.48,drop:.035,tail:.2},{px:.29,py:.578,a:.187,b:.087,k:1.19,drop:.048,tail:.188},{px:.348,py:.616,a:.163,b:.086,k:1.81,drop:.042,tail:.168},{px:.394,py:.658,a:.126,b:.088,k:2.64,drop:.036,tail:.172},{px:.457,py:.705,a:.099,b:.072,k:1.85,drop:.031,tail:.152},{px:.515,py:.757,a:.067,b:.07,k:3.87,drop:.027,tail:.134},{px:.567,py:.832,a:.02,b:.044,k:4,drop:.016,tail:.112}],Be=[{top:[.04,.06,.09,.12,.16,.2,.25,.27,.28],alpha:.55,depth:.3,ripple:0,glow:.6},{top:[.06,.08,.11,.15,.2,.27,.34,.4,.44],alpha:.75,depth:.25,ripple:0,glow:.5},{top:[.17,.18,.2,.24,.3,.37,.43,.46,.43],bottom:[.27,.29,.32,.37,.42,.47,.52,.53,.45],alpha:.95,depth:.2,ripple:0,glow:.35},{top:[.31,.33,.36,.39,.43,.47,.51,.54,.56],alpha:1,depth:.3,ripple:0,glow:.1},{top:[.4,.42,.45,.49,.53,.58,.62,.65,.67],alpha:1,depth:.5,ripple:1,glow:0,feather:.12}],Ve={skyL:`#b5a6f2`,skyR:`#4d6cff`,left:[`#c9c4fa`,`#e2a6d6`,`#ff6a58`,`#06521f`,`#578e26`],right:[`#a3aaff`,`#7a72ff`,`#c977c9`,`#0e5a22`,`#4e8620`],deep:[`#9aa3ff`,`#8a7cf2`,`#ff5c63`,`#124e20`,`#a6dc2c`],shine:`#c8fa30`},He={skyL:`#5550a8`,skyR:`#3138d8`,left:[`#6a6ac0`,`#5a4fa0`,`#3a3478`,`#1c4e73`,`#4ab84a`],right:[`#4f78d0`,`#4f58c8`,`#8a4f8a`,`#2a4e66`,`#3e9a46`],deep:[`#4a6ac8`,`#3d3a92`,`#7c4278`,`#2a4a60`,`#113a12`],shine:`#5ad45a`};function Ue(e,t,n,r,i){let a=u(e),o=u(t),s=(o.h-a.h+540)%360-180;return f({l:a.l+(o.l-a.l)*n,c:Math.min(.26,(a.c+(o.c-a.c)*n)*i),h:(a.h+s*n+r+360)%360})}function We(e,t=()=>0,n=!1){let r=Number(e.time),i=Number(e.hue),a=Number(e.vividness),o=(e,t)=>Ue(e,t,r,i,a),s=e=>t()*e,c=Number(e.sweep),l=Be.map((e,t)=>{let n=s(.025),r=s(.05)+(c-1)*.15*(t<3?1:.5),i=e=>e.map((e,t)=>e+n+r*(t/8-.5)+s(.01));return{...e,top:i(e.top),bottom:e.bottom?i(e.bottom):void 0,left:o(Ve.left[t],He.left[t]),right:o(Ve.right[t],He.right[t]),deep:o(Ve.deep[t],He.deep[t])}}),u=s(.04),d=s(.025),f=ze.map(e=>({...e,px:e.px+u,py:e.py+d})),[p,m]=f.slice(-2);f.push({...m,px:2*m.px-p.px,py:2*m.py-p.py});let h=Math.round(Number(e.ripples)*.8),g=(ze.length-1)/(h-1);return{skyL:o(Ve.skyL,He.skyL),skyR:o(Ve.skyR,He.skyR),shine:o(Ve.shine,He.shine),layers:l,ripples:f,ripStep:g,mirror:n}}function Ge(e,t){let n=t.layers.slice(0,7),r=(e,t,r=0)=>[...e,...Array((7-n.length)*t).fill(r)];return{u_skyL:i(t.skyL),u_skyR:i(t.skyR),u_soft:Number(e.softness),u_mirror:+!!t.mirror,u_layers:{int:n.length},u_topK:{floatArray:r(n.flatMap(e=>e.top),9)},u_botK:{floatArray:r(n.flatMap(e=>e.bottom??Re),9,9)},u_cL:{vec3Array:r(n.flatMap(e=>i(e.left)),3)},u_cR:{vec3Array:r(n.flatMap(e=>i(e.right)),3)},u_cD:{vec3Array:r(n.flatMap(e=>i(e.deep)),3)},u_lm:{vec4Array:r(n.flatMap(e=>[e.alpha,e.depth,e.ripple,e.glow]),4)},u_ripA:{vec4Array:t.ripples.flatMap(e=>[e.px,e.py,e.a,e.b])},u_ripB:{vec4Array:t.ripples.flatMap(e=>[e.k,e.drop,e.tail,0])},u_ripLast:t.ripples.length-1,u_ripStep:t.ripStep,u_shine:i(t.shine),u_feather:{floatArray:r(n.map(e=>e.feather??0),1)},u_ripples:Math.min(1,Number(e.depth))*(1-.45*Number(e.time))}}var Ke={id:`meadow`,name:`Meadow`,era:`2020s`,version:1,params:[{kind:`range`,id:`time`,label:`Light → Dark`,min:0,max:1,step:.01,default:0},{kind:`range`,id:`hue`,label:`Hue shift`,min:0,max:120,step:1,default:0},{kind:`range`,id:`vividness`,label:`Vividness`,min:.6,max:1.2,step:.01,default:1},{kind:`range`,id:`ripples`,label:`Ripples`,min:7,max:15,step:1,default:10},{kind:`range`,id:`depth`,label:`Ripple depth`,min:0,max:1,step:.01,default:.7},{kind:`range`,id:`sweep`,label:`Sweep`,min:.6,max:1.4,step:.01,default:1},{kind:`range`,id:`softness`,label:`Softness`,min:0,max:1,step:.01,default:.4},S(.25)],presets:[{id:`light`,label:`Light`,values:{time:0,hue:0,vividness:1,ripples:10,depth:.7,sweep:1,softness:.4,grain:.25}},{id:`dark`,label:`Dark`,values:{time:1,hue:0,vividness:1,ripples:10,depth:.7,sweep:1,softness:.4,grain:.25}}],fragment:Le,uniforms(e,t){let n=w(t^23070);return Ge(e,We(e,()=>(n()-.5)*2,n()<.5))}},qe=`// Bands of colour fanning out from a vanishing point just above the frame.
#define MAX_BANDS 32
uniform vec2 u_vp;                 // vanishing point (u, v), image coordinates
uniform vec3 u_core;               // the light at the top
uniform vec2 u_lightPos;           // where the light is (u, v)
uniform float u_coreAmt;
uniform float u_curve;             // how much the bands bend as they spread
uniform float u_soft;
uniform float u_streak;
uniform float u_mirror;
uniform int u_bands;
uniform float u_edge[MAX_BANDS];   // boundary between band i and i+1 (degrees from straight down)
uniform vec3 u_stops[MAX_BANDS * 4]; // each band's colour at r = 0.15, 0.4, 0.78, 1.15

// Mix in OKLCh along the shorter hue arc: orange to blue passes through mauve and violet, as in
// the original, rather than through grey (OKLab) — and keeps its chroma on the way.
vec3 mixOklch(vec3 x, vec3 y, float t) {
  vec3 a = toOklab(x), b = toOklab(y);
  float ca = length(a.yz), cb = length(b.yz);
  float ha = atan(a.z, a.y), hb = atan(b.z, b.y);
  float dh = mod(hb - ha + PI, TAU) - PI;
  // with a near-grey end the hue is meaningless: take the other end's
  if (ca < 0.02) { ha = hb; dh = 0.0; }
  if (cb < 0.02) dh = 0.0;
  float h = ha + dh * t, c = mix(ca, cb, t);
  return fromOklab(vec3(mix(a.x, b.x, t), c * cos(h), c * sin(h)));
}

// A band's colour at distance r from the vanishing point: warm near the light, its own colour
// further out.
vec3 bandColour(int i, float r) {
  vec3 s0 = u_stops[i * 4], s1 = u_stops[i * 4 + 1], s2 = u_stops[i * 4 + 2], s3 = u_stops[i * 4 + 3];
  if (r < 0.4) return mixOklch(s0, s1, smoothstep(0.15, 0.4, r));
  if (r < 0.78) return mixOklch(s1, s2, smoothstep(0.4, 0.78, r));
  return mixOklch(s2, s3, smoothstep(0.78, 1.15, r));
}

vec3 wallpaper(vec2 p) {
  float hx = max(u_aspect, 1.0) * 0.5;
  float hy = max(1.0 / u_aspect, 1.0) * 0.5;
  float u = p.x / (2.0 * hx) + 0.5;
  float v = 0.5 - p.y / (2.0 * hy);
  if (u_mirror > 0.5) u = 1.0 - u;
  // work in a square-ish space so angles don't depend on the frame's shape
  vec2 d = vec2((u - u_vp.x) * 2.0 * hx, (v - u_vp.y) * 2.0 * hy);
  float r = length(d);
  float a = degrees(atan(d.x, max(d.y, 1e-4)));
  if (d.y < 0.0) a = sign(d.x) * (180.0 - abs(degrees(atan(d.x, -d.y))));
  // bands bend a little as they spread
  a += u_curve * 14.0 * sign(a) * smoothstep(0.0, 1.2, r) * smoothstep(0.0, 60.0, abs(a));
  // edges wander, with a ragged dry-brush quality
  a += 1.6 * (fbm(vec2(r * 2.5, a * 0.03), 3) - 0.5) + 0.5 * (fbm(vec2(r * 14.0, a * 0.2), 3) - 0.5);
  // Edge width in frame units (so far edges are as crisp as near ones), feathering out towards
  // the light where the original's bands dissolve into the glow.
  float wd = (0.0012 + 0.01 * u_soft) * (1.0 + 4.0 * smoothstep(0.45, 0.0, r));
  float w = degrees(wd / max(r, 0.03)) + max(fwidth(a), 0.01) * 0.7;

  vec3 col = vec3(0.0);
  float total = 0.0;
  for (int i = 0; i < MAX_BANDS; i++) {
    if (i >= u_bands) break;
    float lo = i == 0 ? -400.0 : u_edge[i - 1];
    float hi = i + 1 >= u_bands ? 400.0 : u_edge[i];
    float wt = smoothstep(lo - w, lo + w, a) * (1.0 - smoothstep(hi - w, hi + w, a));
    if (wt <= 0.0) continue;
    vec3 c = bandColour(i, r);
    // a slightly brighter sheen along each band's left edge
    c = mixOklab(c, mixOklab(c, vec3(1.0), 0.2), exp(-max(a - lo, 0.0) / (0.8 + w)) * 0.3 * step(-399.0, lo));
    col += c * wt;
    total += wt;
  }
  col /= max(total, 1e-4);
  // brushed streaks running along the rays, and fine wrinkles across them
  float s = fbm(vec2(a * 0.9, log(r + 0.05) * 3.0), 4) - 0.5;
  float wr = fbm(vec2(a * 5.0, r * 42.0), 3) - 0.5;
  // fine dry-brush streaks a few pixels wide, long along the ray
  float fs = fbm(vec2(a * 7.0, log(r + 0.05) * 1.2), 3) - 0.5;
  // Near the light the original's bands dissolve into smooth glow: streaks there converge into a
  // visible burst point, so they fade out towards it.
  float calm = smoothstep(0.04, 0.4, r);
  col *= 1.0 + u_streak * calm * (0.22 * s + 0.07 * wr + 0.14 * fs);
  // The light itself: a soft glow just above the frame, screen-blended so it only brightens.
  // (The warm haze around it is in the bands' own near colours, sampled with the glow in them,
  // so this only adds the brightest point.)
  vec2 lq = vec2((u - u_lightPos.x) * 2.0 * hx * 1.4, (v - u_lightPos.y) * 2.0 * hy);
  float lr = length(lq);
  float gw = clamp(u_coreAmt * exp(-lr * 4.5) * 0.2, 0.0, 1.0);
  col = 1.0 - (1.0 - col) * (1.0 - u_core * gw);
  return col;
}
`,Je=[-81.9,-74.9,-70.9,-67.6,-63.9,-61.4,-55.9,-50.4,-41.6,-13.1,-5.1,5.1,9.6,15.1,18.4,23.1,26.9,30.4,33.1,38.1,40.9,44.6,48.9,52.1,59.4,62.4,70.6,73.1,75.1,82.1],Ye=[[`#8e78b6`,`#8e78b6`,`#8e78b6`,`#8e78b6`],[`#faa263`,`#a57aa7`,`#a57aa7`,`#a57aa7`],[`#f8b277`,`#c07f8c`,`#c07f8c`,`#c07f8c`],[`#f9c18b`,`#de8669`,`#de8669`,`#de8669`],[`#f9bd87`,`#ee8d5a`,`#ee8d5a`,`#ee8d5a`],[`#f8905a`,`#f7995e`,`#f7995e`,`#f7995e`],[`#f28e5c`,`#6b7ac1`,`#6b7ac1`,`#6b7ac1`],[`#df8667`,`#2f7bc9`,`#2f7bc9`,`#2f7bc9`],[`#d68572`,`#186cc7`,`#01278c`,`#01278c`],[`#da876c`,`#2274c9`,`#02238a`,`#02147d`],[`#f9ad73`,`#9b78ae`,`#0346aa`,`#022288`],[`#f9ad73`,`#b17c9e`,`#086dc7`,`#044eb2`],[`#f9ca91`,`#faa265`,`#a179ab`,`#4f7bc6`],[`#f9cc93`,`#f9a265`,`#9e79ad`,`#467bc7`],[`#f8d498`,`#f9b47b`,`#ea895e`,`#aa7ba5`],[`#f8d498`,`#fabe88`,`#f99b60`,`#cf817d`],[`#f8d498`,`#f9c890`,`#f9a466`,`#ee895b`],[`#f9d599`,`#f9d196`,`#f8ac70`,`#f99c61`],[`#f9d599`,`#f9bd87`,`#f8985e`,`#dc846e`],[`#f8d498`,`#f9ad73`,`#d68375`,`#d68375`],[`#f8d498`,`#f9ae74`,`#e58765`,`#e58765`],[`#f8d498`,`#9b78ae`,`#2e7bc9`,`#2e7bc9`],[`#f9c68e`,`#8878b8`,`#0276c9`,`#0276c9`],[`#f9ba84`,`#9478b3`,`#277ac9`,`#277ac9`],[`#f9b47b`,`#7c78bc`,`#7c78bc`,`#7c78bc`],[`#fab67d`,`#8878b8`,`#8878b8`,`#8878b8`],[`#f9b177`,`#9177b4`,`#9177b4`,`#9177b4`],[`#f9b278`,`#b67d98`,`#b67d98`,`#b67d98`],[`#f9b881`,`#f99f63`,`#f99f63`,`#f99f63`],[`#f9b47b`,`#aa7ca3`,`#aa7ca3`,`#aa7ca3`],[`#9778b1`,`#9778b1`,`#9778b1`,`#9778b1`]],Xe=[[`#145edb`,`#145edb`,`#145edb`,`#145edb`],[`#44acb2`,`#0366de`,`#0366de`,`#0366de`],[`#63bbaa`,`#0478d5`,`#0478d5`,`#0478d5`],[`#80c7a4`,`#0588ca`,`#0588ca`,`#0588ca`],[`#78c5a6`,`#0692c3`,`#0692c3`,`#0692c3`],[`#0e9bbb`,`#2ea3b6`,`#2ea3b6`,`#2ea3b6`],[`#0695bf`,`#2156d4`,`#2156d4`,`#2156d4`],[`#0589ca`,`#3140c1`,`#3140c1`,`#3140c1`],[`#0684cd`,`#382fae`,`#2f1076`,`#2f1076`],[`#0587cb`,`#3533b3`,`#2e1072`,`#250c5e`],[`#5ab6ad`,`#0a62dd`,`#391892`,`#2d0f6f`],[`#5cb7ac`,`#036ddb`,`#382fae`,`#3b1e9a`],[`#96cea2`,`#44acb2`,`#0464df`,`#284ecd`],[`#9dd0a2`,`#44acb2`,`#0963de`,`#2b4ac9`],[`#b1d7a0`,`#65bcaa`,`#068fc6`,`#036add`],[`#b2d79f`,`#7ac5a4`,`#33a5b6`,`#0580d0`],[`#b2d79e`,`#91cda3`,`#48aeb2`,`#0790c6`],[`#b3d79f`,`#acd6a0`,`#59b6ae`,`#39a7b4`],[`#b4d79f`,`#78c5a5`,`#2da3b6`,`#0585cc`],[`#b2d79f`,`#5cb7ac`,`#0784ce`,`#0784ce`],[`#b1d7a0`,`#5db8ac`,`#058bc8`,`#058bc8`],[`#b1d7a0`,`#0962dd`,`#323fc2`,`#323fc2`],[`#8dcba4`,`#175dd9`,`#3533b3`,`#3533b3`],[`#73c2a6`,`#1060dc`,`#343dc0`,`#343dc0`],[`#68bdaa`,`#1a5ad7`,`#1a5ad7`,`#1a5ad7`],[`#6bbea8`,`#175dd9`,`#175dd9`,`#175dd9`],[`#62baaa`,`#115fdb`,`#115fdb`,`#115fdb`],[`#63bbaa`,`#0572d9`,`#0572d9`,`#0572d9`],[`#6dc0a7`,`#40aab3`,`#40aab3`,`#40aab3`],[`#66bdaa`,`#026add`,`#026add`,`#026add`],[`#0d61dd`,`#0d61dd`,`#0d61dd`,`#0d61dd`]],Ze={light:`#fbe3a8`,dark:`#b6e8a8`},Qe=32;function $e(e,t,n,r,i){let a=u(e),o=u(t),s=(o.h-a.h+540)%360-180;return f({l:a.l+(o.l-a.l)*n,c:Math.min(.26,(a.c+(o.c-a.c)*n)*i),h:(a.h+s*n+r+360)%360})}function et(e,t=()=>0,n=!1){let r=Number(e.time),i=Number(e.hue),a=Number(e.vividness),o=(e,t)=>$e(e,t,r,i,a),s=e=>t()*e,c=Number(e.spread),l=Je.map(e=>e*c+s(1));for(let e=1;e<l.length;e++)l[e]=Math.max(l[e],l[e-1]+1);let u=.5+s(.06),d=-.05+s(.02);return{vp:[u,d],light:[u,d+.02],edges:l,stops:Ye.map((e,t)=>e.map((e,n)=>o(e,Xe[t][n]))),core:o(Ze.light,Ze.dark),mirror:n}}function tt(e,t){let n=Math.min(Qe,t.stops.length),r=t.edges.slice(0,n-1),a=t.stops.slice(0,n).flatMap(e=>e.flatMap(i));return{u_vp:t.vp,u_lightPos:t.light,u_core:i(t.core),u_coreAmt:Number(e.glow),u_curve:Number(e.curve),u_soft:Number(e.softness),u_streak:Number(e.streaks),u_mirror:+!!t.mirror,u_bands:{int:n},u_edge:{floatArray:[...r,...Array(Qe-r.length).fill(0)]},u_stops:{vec3Array:[...a,...Array((Qe-n)*12).fill(0)]}}}var nt={id:`fan`,name:`Fan`,era:`2020s`,version:1,params:[{kind:`range`,id:`time`,label:`Light → Dark`,min:0,max:1,step:.01,default:0},{kind:`range`,id:`hue`,label:`Hue shift`,min:-90,max:15,step:1,default:0},{kind:`range`,id:`vividness`,label:`Vividness`,min:.6,max:1.2,step:.01,default:1},{kind:`range`,id:`spread`,label:`Spread`,min:.6,max:1.5,step:.01,default:1},{kind:`range`,id:`curve`,label:`Curve`,min:0,max:1,step:.01,default:.2},{kind:`range`,id:`glow`,label:`Glow`,min:0,max:1,step:.01,default:.75},{kind:`range`,id:`streaks`,label:`Streaks`,min:0,max:1,step:.01,default:.6},{kind:`range`,id:`softness`,label:`Softness`,min:0,max:1,step:.01,default:.1},S(.25)],presets:[{id:`light`,label:`Light`,values:{time:0,hue:0,vividness:1,spread:1,curve:.2,glow:.75,streaks:.6,softness:.1,grain:.25}},{id:`dark`,label:`Dark`,values:{time:1,hue:0,vividness:1,spread:1,curve:.2,glow:.75,streaks:.6,softness:.1,grain:.25}}],fragment:qe,uniforms(e,t){let n=w(t^64017);return tt(e,et(e,()=>(n()-.5)*2,n()<.5))}},rt=`// A soft, out-of-focus scene of blue forms behind a curved sheet of glass. The sheet's top edge
// is an S-curve; just below it the glass bends the scene above into streaks that run along the
// curve, thickest at the crest, ending in a ragged inner boundary.
uniform vec3 u_skyTop;
uniform vec3 u_skyMid;
uniform vec3 u_skyHorizon;
uniform vec3 u_hill;
uniform vec3 u_band;
uniform vec3 u_mass;
uniform vec3 u_massDeep;
uniform vec3 u_floor;
uniform vec3 u_orbR;
uniform vec3 u_orbRDeep;
uniform vec3 u_orbL;
uniform vec3 u_orbLDeep;
uniform vec3 u_rim;
uniform vec3 u_glass;            // the body of the glass band
uniform vec3 u_glassPale;        // pale streaks inside it
uniform vec3 u_glassDeep;        // its deep streaks and inner boundary
uniform float u_edge[9];         // glass edge height v at u = 0, 1/8, ... 1
uniform float u_refract;
uniform float u_rimAmt;
uniform float u_soft;
uniform float u_mirror;
uniform vec3 u_orbRPos;          // u, v, radius
uniform vec3 u_orbLPos;

float cr(float p0, float p1, float p2, float p3, float t) {
  float t2 = t * t, t3 = t2 * t;
  return 0.5 * (2.0 * p1 + (-p0 + p2) * t + (2.0 * p0 - 5.0 * p1 + 4.0 * p2 - p3) * t2 + (-p0 + 3.0 * p1 - 3.0 * p2 + p3) * t3);
}
float edgeV(float u) {
  float x = clamp(u, 0.0, 1.0) * 8.0;
  int k = int(min(floor(x), 7.0));
  float r = cr(u_edge[max(k - 1, 0)], u_edge[k], u_edge[k + 1], u_edge[min(k + 2, 8)], x - float(k));
  if (u < 0.0) r += (u_edge[0] - u_edge[1]) * (-u * 8.0);
  if (u > 1.0) r += (u_edge[8] - u_edge[7]) * ((u - 1.0) * 8.0);
  return r;
}

float softDisc(vec2 q, vec2 c, vec2 r, float blur) {
  float d = length((q - c) / r) - 1.0;
  return 1.0 - smoothstep(-blur, blur, d);
}

// A soft-edged sphere lit from the upper left, falling into deep shadow at its bottom.
vec3 orb(vec2 q, vec3 pos, vec3 base, vec3 deep, float blur, float grainy, out float cov) {
  vec2 d = (q - pos.xy) / pos.z;
  float rr = length(d);
  cov = 1.0 - smoothstep(1.0 - blur, 1.0 + blur, rr);
  float rc = min(rr, 1.0);
  vec3 n = normalize(vec3(d.x, -d.y, sqrt(max(1.0 - rc * rc, 0.0)) + 0.02));
  // a grazing light from the upper left: only the top-left of the sphere is pale, the rest
  // falls away into the deep colour and then to near black at the bottom of the frame
  float diff = dot(n, normalize(vec3(-0.75, 0.6, 0.28)));
  vec3 c = mixOklab(deep, base, smoothstep(0.0, 1.0, diff));
  c = mixOklab(c, u_floor, smoothstep(0.72, 1.02, q.y) * 0.8);
  c *= 1.0 + grainy * 0.16 * (fbm(q * 170.0 + 3.0, 3) - 0.5);
  return c;
}

// The out-of-focus scene behind (and above) the glass.
vec3 scene(vec2 q) {
  float u = q.x, v = q.y;
  float b = 0.04 + 0.08 * u_soft;
  // sky: deep at the top, paling to the warm horizon
  vec3 c = mixOklab(u_skyTop, u_skyMid, smoothstep(0.0, 0.32, v));
  c = mixOklab(c, u_skyHorizon, smoothstep(0.24, 0.46, v));
  // a distant blurred hill at the left
  c = mixOklab(c, u_hill, softDisc(q, vec2(0.06, 0.53), vec2(0.17, 0.07), 0.5 + b) * 0.85);
  // the big mass below the horizon, deepening to near black at the floor
  vec3 mass = mixOklab(u_mass, u_massDeep, smoothstep(0.52, 0.8, v));
  mass = mixOklab(mass, u_floor, smoothstep(0.78, 1.02, v));
  c = mixOklab(c, mass, smoothstep(0.47, 0.56, v));
  // the hump of the mass catches light
  c = mixOklab(c, u_band, softDisc(q, vec2(0.55, 0.58), vec2(0.3, 0.1), 0.8) * 0.5);
  // two round forms in front: the left one darker and softer, the right one grainy
  float cov;
  vec3 oc = orb(q, u_orbLPos, u_orbL, u_orbLDeep, b * 0.9, 0.3, cov);
  c = mixOklab(c, oc, cov);
  oc = orb(q, u_orbRPos, u_orbR, u_orbRDeep, b * 0.45, 1.0, cov);
  c = mixOklab(c, oc, cov);
  return c;
}

vec3 wallpaper(vec2 p) {
  float hx = max(u_aspect, 1.0) * 0.5;
  float hy = max(1.0 / u_aspect, 1.0) * 0.5;
  float u = p.x / (2.0 * hx) + 0.5;
  float v = 0.5 - p.y / (2.0 * hy);
  if (u_mirror > 0.5) u = 1.0 - u;
  float pv = max(fwidth(v), 1e-5);

  float e = edgeV(u);
  float d = v - e;                       // > 0 below the glass edge
  vec3 col = scene(vec2(u, v));
  if (d > -0.01) {
    float slope = (edgeV(u + 0.004) - edgeV(u - 0.004)) / 0.008;
    vec2 tang = normalize(vec2(1.0, slope));
    // The refracting band is thickest at the crest, where the edge is highest.
    float thick = mix(0.09, 0.24, smoothstep(0.7, 0.2, e));
    float sv = clamp(d / thick, 0.0, 1.0);
    // Its inner boundary falls in a few large, soft steps (about 0.09 apart), larger at the crest.
    float crest = smoothstep(0.7, 0.3, e);
    // (a smooth staircase: x - sin(2 pi x) / (2 pi), minus its trend, so there are no seams)
    float tu = u / 0.09 + 0.6 * fbm(vec2(u * 4.0, 2.3), 2);
    float teeth = -sin(TAU * tu) / TAU * 0.16 * (0.6 + 0.8 * fbm(vec2(u * 3.0, 4.1), 2))
                + (fbm(vec2(u * 6.0, 1.7), 3) - 0.5) * 0.05;
    float inner = thick * 0.88 + teeth * crest;
    float edgeBlur = 0.012 + 0.025 * u_soft;
    float zone = smoothstep(0.0, 0.006, d) * (1.0 - smoothstep(inner - edgeBlur, inner + edgeBlur, d));
    // The band: pale cream-aqua light near the edge (the bright horizon smeared along the curve),
    // turning to glass blue and then deep blue towards the inner boundary, with soft streaks that
    // follow the curve.
    float s1 = fbm(vec2(u * 2.5 + 3.0, sv * 7.0), 3);
    float s2 = fbm(vec2(u * 6.0, sv * 14.0 + 5.0), 2);
    float st = s1 + 0.35 * (s2 - 0.5);
    float paleAmt = smoothstep(0.75, 0.1, sv) * (0.45 + 0.55 * crest) * smoothstep(0.3, 0.6, st + 0.15 * (1.0 - sv));
    vec3 glass = mixOklab(u_glass, u_glassDeep, smoothstep(0.45, 1.0, sv));
    glass = mixOklab(glass, u_glassPale, paleAmt);
    glass = mixOklab(glass, u_glassDeep, smoothstep(0.42, 0.3, st) * 0.45);
    // The scene above shows through faintly, smeared along the curve.
    float src = mix(0.3, 0.62, sv) + (e - 0.2) * 0.3 + 0.06 * (s1 - 0.5);
    vec3 refr = vec3(0.0);
    for (int k = -4; k <= 4; k++) refr += scene(vec2(u, src) + tang * (float(k) * 0.014));
    refr /= 9.0;
    // Under the band the sheet lifts the blue mass behind it into view, saturated and deep
    // (the pale horizon never shows below the glass).
    // Everything under the edge is filled first; the band is then laid over its upper part.
    vec3 under = mixOklab(col, mixOklab(u_band, u_glassDeep, 0.5), smoothstep(0.6, 0.4, v));
    under = mixOklab(under, u_glassDeep, 0.35 * exp(-max(d - inner, 0.0) / 0.08));
    col = mix(col, under, smoothstep(0.0, 0.006, d) * u_refract);
    col = mix(col, mixOklab(glass, refr, 0.15), zone * u_refract);
    // below the band the sheet lifts and tints the scene slightly
    col = mixOklab(col, mixOklab(col, u_band, 0.3), smoothstep(0.0, 0.03, d) * 0.22);
    // the edge: a bright fine rim and a deeper shadow line just beneath it
    float rim = exp(-abs(d) / (pv * 1.3 + 0.0008));
    col = mixOklab(col, u_rim, rim * u_rimAmt);
    col = mixOklab(col, u_massDeep, exp(-abs(d - 0.008) / (pv * 2.0 + 0.004)) * 0.6 * u_rimAmt);
  }
  return col;
}
`,it=[.73,.69,.63,.53,.41,.3,.23,.185,.17],at=[`skyTop`,`skyMid`,`skyHorizon`,`hill`,`band`,`mass`,`massDeep`,`floor`,`orbR`,`orbRDeep`,`orbL`,`orbLDeep`,`rim`,`glass`,`glassPale`,`glassDeep`],ot={skyTop:`#2f70bc`,skyMid:`#9bb7d4`,skyHorizon:`#dfd8b4`,hill:`#469ecb`,band:`#4a8ad8`,mass:`#407dd0`,massDeep:`#1f449a`,floor:`#020e3c`,orbR:`#88accc`,orbRDeep:`#0b2968`,orbL:`#4a7595`,orbLDeep:`#0c2238`,rim:`#eaf4ff`,glass:`#3d88c6`,glassPale:`#d6dcc0`,glassDeep:`#1e4fb4`},st={skyTop:`#00011d`,skyMid:`#160f8b`,skyHorizon:`#6153c6`,hill:`#2d4bb1`,band:`#3646be`,mass:`#1c3e9a`,massDeep:`#0d216f`,floor:`#010430`,orbR:`#4b5ba4`,orbRDeep:`#0d184c`,orbL:`#30418a`,orbLDeep:`#040d38`,rim:`#b8c8ff`,glass:`#1c3aa8`,glassPale:`#5a62cc`,glassDeep:`#070f6a`};function ct(e,t,n,r,i){let a=u(e),o=u(t),s=(o.h-a.h+540)%360-180,c=a.c<.03?o.h:a.h;return f({l:a.l+(o.l-a.l)*n,c:Math.min(.26,(a.c+(o.c-a.c)*n)*i),h:(c+(a.c<.03?0:s)*n+r+360)%360})}function lt(e,t=()=>0,n=!1){let r=Number(e.time),i=Number(e.hue),a=Number(e.vividness),o=e=>t()*e,s=Object.fromEntries(at.map(e=>[e,ct(ot[e],st[e],r,i,a)])),c=Number(e.height),l=o(.04),u=o(.08);return{colors:s,edge:it.map((e,t)=>e+(c-.5)*.3+l+u*(t/8-.5)+o(.01)),orbR:[1.457+o(.05),1.163+o(.04),.817+o(.04)],orbL:[.227+o(.06),.939+o(.04),.282+o(.03)],mirror:n}}function ut(e,t){let n=e=>i(t.colors[e]);return{u_skyTop:n(`skyTop`),u_skyMid:n(`skyMid`),u_skyHorizon:n(`skyHorizon`),u_hill:n(`hill`),u_band:n(`band`),u_mass:n(`mass`),u_massDeep:n(`massDeep`),u_floor:n(`floor`),u_orbR:n(`orbR`),u_orbRDeep:n(`orbRDeep`),u_orbL:n(`orbL`),u_orbLDeep:n(`orbLDeep`),u_rim:n(`rim`),u_glass:n(`glass`),u_glassPale:n(`glassPale`),u_glassDeep:n(`glassDeep`),u_edge:{floatArray:t.edge},u_refract:Number(e.refraction),u_rimAmt:Number(e.rim),u_soft:Number(e.blur),u_mirror:+!!t.mirror,u_orbRPos:t.orbR,u_orbLPos:t.orbL}}var dt={id:`glass-wave`,name:`Glass Wave`,era:`2020s`,version:1,params:[{kind:`range`,id:`time`,label:`Light → Dark`,min:0,max:1,step:.01,default:0},{kind:`range`,id:`hue`,label:`Hue shift`,min:-60,max:60,step:1,default:0},{kind:`range`,id:`vividness`,label:`Vividness`,min:.6,max:1.2,step:.01,default:1},{kind:`range`,id:`height`,label:`Height`,min:.2,max:.8,step:.01,default:.5},{kind:`range`,id:`refraction`,label:`Refraction`,min:0,max:1,step:.01,default:.85},{kind:`range`,id:`rim`,label:`Rim`,min:0,max:1,step:.01,default:.8},{kind:`range`,id:`blur`,label:`Blur`,min:.2,max:1,step:.01,default:.6},S(.25)],presets:[{id:`light`,label:`Light`,values:{time:0,hue:0,vividness:1,height:.5,refraction:.85,rim:.8,blur:.6,grain:.25}},{id:`dark`,label:`Dark`,values:{time:1,hue:0,vividness:1,height:.5,refraction:.85,rim:.8,blur:.6,grain:.25}}],fragment:rt,uniforms(e,t){let n=w(t^399957);return ut(e,lt(e,()=>(n()-.5)*2,n()<.5))}},ft=`// Stacked satin-paper sheets. Each sheet lies to the left of its rim, a smooth S-curve given as
// u = f(v) through nine knots; the leftmost sheet is on top. Sheets are lit towards their own rim
// and fall into shadow under the sheet in front.
#define MAX_SHEETS 4
#define CP 13
#define SUB 12
uniform int u_sheets;
uniform vec2 u_rimC[MAX_SHEETS * CP];   // each rim's control points, top to bottom (image coords)
uniform int u_rimN[MAX_SHEETS];         // how many control points each rim has
uniform vec3 u_near[MAX_SHEETS];      // the lit plateau before the sheet's own rim
uniform vec3 u_nearLow[MAX_SHEETS];   // the same lower down
uniform vec3 u_far[MAX_SHEETS];       // colour away from it
uniform vec3 u_farLow[MAX_SHEETS];    // the far colour lower down the sheet
uniform vec3 u_back;                  // the rearmost sheet (right of every rim)
uniform vec3 u_backLow;
uniform vec3 u_backDark;              // the rearmost sheet in the shadow of the last rim
uniform vec3 u_backDarkLow;
uniform vec3 u_rimCol;
uniform vec3 u_glow;
uniform float u_rimAmt;
uniform float u_sheen;                // how wide the lit plateau before each rim is
uniform float u_soft;
uniform float u_mirror;

vec2 crPt(vec2 a, vec2 b, vec2 c, vec2 d, float t) {
  float t2 = t * t, t3 = t2 * t;
  return 0.5 * (2.0 * b + (-a + c) * t + (2.0 * a - 5.0 * b + 4.0 * c - d) * t2 + (-a + 3.0 * b - 3.0 * c + d) * t3);
}

// Signed distance (in frame-scaled units) from q to rim i, evaluated on the smooth Catmull-Rom
// curve through its control points: > 0 on the sheet's side (left walking top to bottom).
float rimSD(int i, vec2 q, vec2 sc) {
  int n = u_rimN[i];
  int b = i * CP;
  float best = 1e9, sgn = 1.0;
  vec2 prev = u_rimC[b] * sc;
  for (int k = 0; k < CP - 1; k++) {
    if (k >= n - 1) break;
    vec2 p0 = u_rimC[b + max(k - 1, 0)] * sc;
    vec2 p1 = u_rimC[b + k] * sc;
    vec2 p2 = u_rimC[b + k + 1] * sc;
    vec2 p3 = u_rimC[b + min(k + 2, n - 1)] * sc;
    // skip spans that are clearly too far away to hold the nearest point
    vec2 lo = min(min(p0, p1), min(p2, p3)), hi = max(max(p0, p1), max(p2, p3));
    vec2 out2 = max(max(lo - q, q - hi), 0.0);
    if (dot(out2, out2) > best) { prev = p2; continue; }
    prev = p1;
    for (int s = 1; s <= SUB; s++) {
      vec2 cur = crPt(p0, p1, p2, p3, float(s) / float(SUB));
      vec2 ab = cur - prev;
      float h = clamp(dot(q - prev, ab) / max(dot(ab, ab), 1e-12), 0.0, 1.0);
      vec2 dd = q - prev - ab * h;
      float l = dot(dd, dd);
      if (l < best) { best = l; sgn = ab.x * dd.y - ab.y * dd.x >= 0.0 ? 1.0 : -1.0; }
      prev = cur;
    }
  }
  return sqrt(best) * sgn;
}

vec3 wallpaper(vec2 p) {
  float hx = max(u_aspect, 1.0) * 0.5;
  float hy = max(1.0 / u_aspect, 1.0) * 0.5;
  float u = p.x / (2.0 * hx) + 0.5;
  float v = 0.5 - p.y / (2.0 * hy);
  if (u_mirror > 0.5) u = 1.0 - u;
  float px = max(fwidth(u) * 2.0 * hx / (2.0 * min(hx, hy)), 1e-5);
  vec2 sc = vec2(2.0 * hx, 2.0 * hy) / (2.0 * min(hx, hy));
  vec2 q = vec2(u, v) * sc;
  float low = smoothstep(0.15, 1.0, v);
  float dd[MAX_SHEETS];
  for (int j = 0; j < MAX_SHEETS; j++) dd[j] = j < u_sheets ? rimSD(j, q, sc) : 0.0;

  // The rearmost sheet: in shadow just right of the last rim, rising to its lit colour.
  int last = u_sheets - 1;
  float dl = max(-dd[last], 0.0);
  vec3 col = mixOklab(mixOklab(u_backDark, u_backDarkLow, low), mixOklab(u_back, u_backLow, low),
                      smoothstep(0.01, 0.2 + 0.1 * (1.0 - u_sheen), dl));

  // Sheets from back (rightmost) to front (leftmost). Each is seen between the rim of the sheet in
  // front (left) and its own rim (right): it starts in that sheet's shadow and rises in an
  // S-curve to a lit plateau before its own rim (measured on the original's row profiles).
  for (int j = MAX_SHEETS - 1; j >= 0; j--) {
    if (j >= u_sheets) continue;
    float d = dd[j];                                  // > 0 on this sheet (left of its rim)
    float blur = px * 0.8 + 0.001 + 0.004 * u_soft;
    float inside = smoothstep(-blur, blur, d);
    // a narrow, deep shadow this sheet casts on the one behind, right at its rim
    col = mixOklab(col, col * 0.45, (1.0 - inside) * exp(-max(-d, 0.0) / (0.008 + 0.02 * u_soft)) * 0.7);
    if (inside > 0.0) {
      float t, lit;
      if (j == 0) {
        t = q.x / max(q.x + max(d, 0.0), 1e-4);       // from the left edge of the frame
        lit = smoothstep(0.4, 0.97, t);
      } else {
        float df = max(-dd[j - 1], 0.0);
        t = df / max(df + max(d, 0.0), 1e-4);
        lit = smoothstep(0.25, 1.0 - 0.3 * u_sheen, t);
      }
      vec3 far = mixOklab(u_far[j], u_farLow[j], low);
      vec3 near = mixOklab(u_near[j], u_nearLow[j], low);
      vec3 c = mixOklab(far, near, lit);
      // the front sheet catches a warm glow at the far left
      if (j == 0) c = mixOklab(c, u_glow, exp(-dot(vec2(u * 1.6, v - 0.45), vec2(u * 1.6, v - 0.45)) / 0.06) * 0.5);
      col = mix(col, c, inside);
    }
    // the rim: a fine bright edge with a slightly darker line just inside it
    float rim = exp(-abs(d + 0.0014) / (px * 1.4 + 0.0013));
    col = mixOklab(col, u_rimCol, clamp(rim * u_rimAmt * 1.15, 0.0, 1.0));
    col = mixOklab(col, col * 0.7, exp(-abs(d - 0.004) / (px * 1.5 + 0.0015)) * 0.35 * u_rimAmt * inside);
  }
  return col;
}
`,pt=[[[.18,-.06],[.27,0],[.324,.05],[.356,.15],[.345,.25],[.298,.35],[.233,.45],[.155,.55],[.085,.65],[.033,.75],[.008,.85],[-.02,.92],[-.06,1.05]],[[.5,-.06],[.6,0],[.688,.05],[.731,.15],[.709,.25],[.623,.35],[.474,.45],[.312,.55],[.179,.65],[.087,.75],[.03,.85],[.003,.95],[-.03,1.05]],[[1.03,-.05],[.988,.1],[.931,.2],[.833,.3],[.711,.4],[.586,.5],[.476,.6],[.391,.7],[.335,.8],[.306,.9],[.295,1.06]],[[1.04,-.02],[.989,.15],[.951,.25],[.894,.35],[.834,.45],[.777,.55],[.731,.65],[.699,.75],[.681,.85],[.672,.95],[.67,1.06]]],mt=13,z={near:[`#d8c7b1`,`#eee6db`,`#c2bab2`,`#d0c8c0`],nearLow:[`#e5d8bf`,`#dbcaae`,`#d0c6be`,`#929aac`],far:[`#8b6845`,`#684f40`,`#695951`,`#a09085`],farLow:[`#b89f7b`,`#a58153`,`#6e5640`,`#4b4558`],back:`#e4ded5`,backLow:`#c4c3c0`,backDark:`#8c8075`,backDarkLow:`#6d747f`,rim:`#fffaf0`,glow:`#d8a860`},B={near:[`#30314c`,`#3c3e61`,`#2e314b`,`#111930`],nearLow:[`#454569`,`#343656`,`#3b3d58`,`#24253b`],far:[`#212031`,`#171725`,`#141723`,`#0d1024`],farLow:[`#28273e`,`#221f31`,`#101018`,`#0e0f1a`],back:`#55628b`,backLow:`#48557a`,backDark:`#131828`,backDarkLow:`#161929`,rim:`#a4a4ff`,glow:`#3a3a6a`};function ht(e,t,n,r,i){let a=u(e),o=u(t),s=(o.h-a.h+540)%360-180;return f({l:a.l+(o.l-a.l)*n,c:Math.min(.24,(a.c+(o.c-a.c)*n)*i),h:(a.h+s*n+r+360)%360})}function gt(e,t=()=>0,n=!1){let r=Number(e.time),i=Number(e.hue),a=Number(e.vividness),o=(e,t)=>ht(e,t,r,i,a),s=e=>t()*e,c=Number(e.sheets),l=Number(e.curvature),u=pt.length-c;return{rims:pt.slice(u).map(e=>{let t=e.reduce((e,t)=>e+t[0],0)/e.length,n=s(.04),r=s(.05);return e.map(([e,i])=>[t+(e-t)*l+n+r*(i-.5),i])}),pal:{near:z.near.slice(u).map((e,t)=>o(e,B.near[u+t])),nearLow:z.nearLow.slice(u).map((e,t)=>o(e,B.nearLow[u+t])),far:z.far.slice(u).map((e,t)=>o(e,B.far[u+t])),farLow:z.farLow.slice(u).map((e,t)=>o(e,B.farLow[u+t])),back:o(z.back,B.back),backLow:o(z.backLow,B.backLow),backDark:o(z.backDark,B.backDark),backDarkLow:o(z.backDarkLow,B.backDarkLow),rim:o(z.rim,B.rim),glow:o(z.glow,B.glow)},mirror:n}}function _t(e,t){let n=Math.min(4,t.rims.length),r=(e,t)=>[...e,...Array((4-n)*t).fill(0)],a=e=>r(e.slice(0,n).flatMap(i),3);return{u_sheets:{int:n},u_rimC:{vec2Array:r(t.rims.slice(0,n).flatMap(e=>[...e.slice(0,mt).flat(),...Array((mt-Math.min(mt,e.length))*2).fill(0)]),26)},u_rimN:{intArray:[...t.rims.slice(0,n).map(e=>Math.min(mt,e.length)),...Array(4-n).fill(2)]},u_near:{vec3Array:a(t.pal.near)},u_nearLow:{vec3Array:a(t.pal.nearLow)},u_far:{vec3Array:a(t.pal.far)},u_farLow:{vec3Array:a(t.pal.farLow)},u_back:i(t.pal.back),u_backLow:i(t.pal.backLow),u_backDark:i(t.pal.backDark),u_backDarkLow:i(t.pal.backDarkLow),u_rimCol:i(t.pal.rim),u_glow:i(t.pal.glow),u_rimAmt:Number(e.edge),u_sheen:Number(e.sheen),u_soft:Number(e.softness),u_mirror:+!!t.mirror}}var vt={id:`satin`,name:`Satin`,era:`2020s`,version:1,params:[{kind:`range`,id:`time`,label:`Light → Dark`,min:0,max:1,step:.01,default:0},{kind:`range`,id:`hue`,label:`Hue shift`,min:-255,max:20,step:1,default:0},{kind:`range`,id:`vividness`,label:`Vividness`,min:.5,max:1.5,step:.01,default:1},{kind:`range`,id:`sheets`,label:`Sheets`,min:2,max:4,step:1,default:4},{kind:`range`,id:`curvature`,label:`Curvature`,min:.6,max:1.3,step:.01,default:1},{kind:`range`,id:`sheen`,label:`Sheen`,min:0,max:1,step:.01,default:.45},{kind:`range`,id:`edge`,label:`Edge`,min:0,max:1,step:.01,default:.9},{kind:`range`,id:`softness`,label:`Softness`,min:0,max:1,step:.01,default:.4},S(.2)],presets:[{id:`light`,label:`Light`,values:{time:0,hue:0,vividness:1,sheets:4,curvature:1,sheen:.45,edge:.9,softness:.4,grain:.2}},{id:`dark`,label:`Dark`,values:{time:1,hue:0,vividness:1,sheets:4,curvature:1,sheen:.45,edge:.9,softness:.4,grain:.2}}],fragment:ft,uniforms(e,t){let n=w(t^23166);return _t(e,gt(e,()=>(n()-.5)*2,n()<.5))}},yt=`#define MAX_LOBES 96
uniform vec3 u_sky;       // clear sky (bottom of the faint gradient)
uniform vec3 u_skyTop;
uniform vec3 u_body;      // thick cloud
uniform vec3 u_core;      // the brightest cores
uniform vec3 u_crease;    // faint sky-tinted shade between lobes
uniform vec2 u_band;      // unit direction the wisps stretch along
uniform float u_wisps;
uniform float u_soft;
uniform int u_lobes;
uniform vec4 u_lobe[MAX_LOBES];   // x, y, radius, density weight

float density(vec2 q) {
  float D = 0.0;
  for (int i = 0; i < MAX_LOBES; i++) {
    if (i >= u_lobes) break;
    vec4 l = u_lobe[i];
    vec2 d = q - l.xy;
    D += l.w * exp(-dot(d, d) / (l.z * l.z));
  }
  return D;
}

vec3 wallpaper(vec2 p) {
  vec2 dir = u_band;
  vec2 nrm = vec2(-dir.y, dir.x);
  vec2 b = vec2(dot(p, dir), dot(p, nrm));   // band space

  // Warp along the band so the masses trail off into wisps.
  float w1 = fbm(b * vec2(1.5, 4.0) + 11.0, 4) - 0.5;
  float w2 = fbm(p * 7.0 + 3.0, 3) - 0.5;
  vec2 q = p + dir * w1 * (0.06 + 0.18 * u_wisps) + nrm * w2 * 0.04;

  float D = density(q);
  // Thin streaks stretched along the band, only near the masses.
  vec2 bq = vec2(dot(q, dir), dot(q, nrm));
  float streak = smoothstep(0.45, 0.8, fbm(bq * vec2(2.0, 6.0) + 37.0, 5));
  D += u_wisps * 0.35 * streak * clamp(D * 3.0, 0.0, 1.0);

  // Billows: puffs a few lobes across and fine fluff, so the inside is mottled (bright puffs,
  // bluish thin gaps) and the edges are cauliflower-soft rather than smooth contours.
  float puff = fbm(q * 6.0 + 5.0, 4);
  float fluff = fbm(q * 28.0 + 9.0, 4);
  float Dd = D * (0.82 + 0.62 * puff) + (fluff - 0.5) * 0.25 * smoothstep(0.03, 0.4, D);

  float t0 = 0.3;
  float w = mix(0.08, 0.45, u_soft);
  // The edge is defined at the fine scale; inside, cloud thickens (more opaque, whiter) gradually.
  float a = smoothstep(t0 - 0.3 * w, t0 + w, Dd) * mix(0.6, 1.0, smoothstep(t0, t0 + 0.5, Dd) * mix(0.7, 1.0, smoothstep(0.28, 0.6, puff)));

  float hy = 0.5 * max(1.0 / u_aspect, 1.0);
  vec3 sky = mix(u_sky, u_skyTop, smoothstep(-hy, hy, p.y));
  // White cores are spots where the cloud is thick and a puff bulges, not whole plateaus.
  vec3 cloud = mixOklab(u_body, u_core, smoothstep(0.38, 0.9, Dd) * smoothstep(0.28, 0.6, puff));
  // Faint sky-tinted shade in the thin parts between puffs.
  float crease = (1.0 - smoothstep(0.35, 0.6, puff)) * smoothstep(0.3, 0.8, D) * 0.45;
  cloud = mixOklab(cloud, u_crease, crease);
  return mixOklab(sky, cloud, a);
}
`,bt=(e,t,n=1)=>{let r=u(e);return f({l:Math.max(0,Math.min(1,r.l+t)),c:r.c*n,h:r.h})},xt=`#73ADD6`,St={sky:xt,skyTop:bt(xt,-.01),body:`#E5EDF4`,core:`#FFFFFF`,crease:bt(xt,.08,.6)},Ct=`#4A6AA8`,wt={sky:Ct,skyTop:bt(Ct,-.02),body:`#E8C4CF`,core:`#FFE6D8`,crease:`#8F92BE`};function Tt(e,t,n,r){let i=u(e),a=u(t),o=i.c<.02?a.h:i.h,s=((a.c<.02?o:a.h)-o+540)%360-180;return f({l:i.l+(a.l-i.l)*n,c:i.c+(a.c-i.c)*n,h:(o+s*n+r+360)%360})}function Et(e){let t=Number(e.time),n=Number(e.hue),r=(e,n)=>t===0&&n===0?St[e]:Tt(St[e],wt[e],t,n);return{sky:r(`sky`,n),skyTop:r(`skyTop`,n),body:r(`body`,0),core:r(`core`,0),crease:r(`crease`,n)}}function Dt(e,t,n){let r=e=>(t()-.5)*2*e,i=Math.max(n,1)/2,a=Math.max(1/n,1)/2,o=Number(e.size),s=.4+r(.1),c=t()<.5?-s:Math.PI+s,l=[Math.cos(c),Math.sin(c)],u=[-l[1],l[0]],d=4*i*a,f=Math.min(18,Math.round(Number(e.clouds)*Math.max(1,d/(4/3)))),p=.07*o**.6,m=[],h=Array.from({length:f},(e,t)=>t);for(let e=f-1;e>0;e--){let n=Math.floor(t()*(e+1));[h[e],h[n]]=[h[n],h[e]]}for(let e=0;e<f;e++){let n=a*(1-2*((h[e]+.15+.7*t())/f)**2),s=(.3+.45*t())*o,c;if(e%4==3)c=(t()<.5?-1:1)*(i-.1*t());else{let e=0,t=-1;for(let a=0;a<8;a++){let a=r(i*.95),o=Math.min(1/0,...m.map(e=>Math.hypot(e.x-a,(e.y-n)*1.5)));o>t&&(t=o,e=a)}c=e}let l=Math.max(3,Math.round(s/(1.4*p)));m.push({x:c,y:n,len:s,thick:.3*s,bend:r(.25),k0:l,k:l,s:Math.round(.5*l)})}let g=m.reduce((e,t)=>e+2+t.k+t.s,0);for(;g>96;){let e=m.reduce((e,t)=>t.k+t.s>e.k+e.s?t:e);e.s>0?e.s--:e.k--,g--}let _=f*o*o/Math.max(d,4/3)/(6/(4/3)),v=Math.min(1,1.6/Math.max(_,1e-6))**.5,y=[],b=(e,t,n)=>[e.x+l[0]*t+u[0]*n,e.y+l[1]*t+u[1]*n];for(let e of m){let n=Math.sqrt(e.k0/e.k);for(let n of[-.25,.25])y.push({c:b(e,n*e.len,r(.3)*e.thick),r:2.4*p,d:v*(.18+.12*t())});for(let i=0;i<e.k;i++){let a=e.k===1?0:i/(e.k-1)-.5+r(.4/e.k),o=1-4*a*a;y.push({c:b(e,a*e.len,e.bend*(a*a-1/12)*e.len+r(.35)*e.thick),r:1.5*p*n*(.6+.8*t())*(.75+.25*o),d:v*(.12+.28*o*t()+.1*t())})}for(let n=0;n<e.s;n++)y.push({c:b(e,r(.42)*e.len,(t()<.5?-1:1)*(.2+.4*t())*e.thick),r:p*(.45+.25*t()),d:v*(.2+.4*t())})}let x=y.reduce((e,t)=>e+Math.PI*t.r*t.r*t.d,0)/d;if(x<.1)for(let e of y)e.r*=Math.sqrt(.1/x);return{band:c,lobes:y}}function Ot(e,t){let n=Et(e),r=t.lobes.slice(0,96);return{u_sky:i(n.sky),u_skyTop:i(n.skyTop),u_body:i(n.body),u_core:i(n.core),u_crease:i(n.crease),u_band:[Math.cos(t.band),Math.sin(t.band)],u_wisps:Number(e.wisps),u_soft:Number(e.softness),u_lobes:{int:r.length},u_lobe:{vec4Array:[...r.flatMap(e=>[e.c[0],e.c[1],e.r,e.d]),...Array((96-r.length)*4).fill(0)]}}}var kt={time:0,hue:0,clouds:6,size:1,wisps:.6,softness:.5,grain:.2},At={id:`cumulus`,name:`Cumulus`,era:`90s`,version:1,params:[{kind:`range`,id:`time`,label:`Day → Dusk`,min:0,max:1,step:.01,default:0},{kind:`range`,id:`hue`,label:`Sky hue`,min:-15,max:50,step:1,default:0},{kind:`range`,id:`clouds`,label:`Clouds`,min:3,max:9,step:1,default:6},{kind:`range`,id:`size`,label:`Size`,min:.6,max:1.4,step:.01,default:1},{kind:`range`,id:`wisps`,label:`Wisps`,min:0,max:1,step:.01,default:.6},{kind:`range`,id:`softness`,label:`Softness`,min:0,max:1,step:.01,default:.5},S(.2)],presets:[{id:`day`,label:`Day`,values:{...kt}},{id:`dusk`,label:`Dusk`,values:{...kt,time:1}}],fragment:yt,uniforms(e,t,n){return Ot(e,Dt(e,w(t^790741),n))}},jt=`uniform vec3 u_bg;        // background, near-black and tinted
uniform vec3 u_bgFar;     // the darkest corner, top, on the halo side
uniform vec3 u_inner;     // inside, away from the halo
uniform vec3 u_inner2;    // inside, on the halo side
uniform vec3 u_innerLow;  // the light low inside the bowl
uniform vec3 u_rim;       // rim colour at the sides
uniform vec3 u_hot;       // white-hot rim at the bottom
uniform vec3 u_haloCol;   // spill outside the rim
uniform vec2 u_c;         // bowl centre (p-space)
uniform float u_r;        // bowl radius
uniform float u_side;     // +1: halo spills right
uniform float u_shine;
uniform float u_haloAmt;
uniform vec3 u_blob[3];   // inner colour blobs: x, y (circle units), radius

// Light of colour \`over\` laid on \`under\` with strength a: lightness blends linearly, hue and chroma
// switch over sooner (a^0.7), so dim light stays saturated instead of greying toward the background.
vec3 tint(vec3 under, vec3 over, float a) {
  a = clamp(a, 0.0, 1.0);
  vec3 u = toOklab(under), o = toOklab(over);
  return fromOklab(vec3(mix(u.x, o.x, a), mix(u.yz, o.yz, pow(a, 0.7))));
}

// OKLCh blend, so two far-apart inner colours meet through saturated hues rather than grey. It takes
// the shorter way round the hue circle unless that passes the middle of the yellow/olive band
// (92.5 degrees); close colours never flip. A near-grey end takes the other end's hue.
vec3 mixLch(vec3 a, vec3 b, float t) {
  vec3 x = toOklab(a), y = toOklab(b);
  float cx = length(x.yz), cy = length(y.yz);
  float hx = atan(x.z, x.y), hy = atan(y.z, y.y);
  if (cx < 0.02) hx = hy;
  if (cy < 0.02) hy = hx;
  float dh = mod(hy - hx + 3.14159265, 6.28318531) - 3.14159265;
  float toMid = mod(radians(92.5) - hx + 3.14159265, 6.28318531) - 3.14159265;
  if (toMid * dh > 0.0 && abs(toMid) < abs(dh)) dh -= sign(dh) * 6.28318531;
  float h = hx + dh * t, c = mix(cx, cy, t);
  return fromOklab(vec3(mix(x.x, y.x, t), c * cos(h), c * sin(h)));
}

// Weight (0..1) of a hue in degrees inside [lo, hi], with 8-degree soft edges.
float inBand(float h, float lo, float hi) {
  return smoothstep(lo, lo + 8.0, h) * (1.0 - smoothstep(hi - 8.0, hi, h));
}

// Last guard against yellow, olive and brown, whatever blend produced the colour: fades chroma inside
// hue 60-140 below L 0.85 and 35-150 below L 0.6, smoothly in hue and lightness (no seams). The
// white-hot spot (L >= 0.88) keeps its pale gold.
vec3 unOlive(vec3 c) {
  vec3 lab = toOklab(max(c, 0.0));
  float h = mod(degrees(atan(lab.z, lab.y)) + 360.0, 360.0);
  float w = max(inBand(h, 35.0, 150.0) * (1.0 - smoothstep(0.55, 0.65, lab.x)),
                inBand(h, 60.0, 140.0) * (1.0 - smoothstep(0.8, 0.88, lab.x)));
  return fromOklab(vec3(lab.x, lab.yz * (1.0 - w)));
}

vec3 wallpaper(vec2 p) {
  float hx = 0.5 * max(u_aspect, 1.0), hy = 0.5 * max(1.0 / u_aspect, 1.0);
  vec2 v = p - u_c;
  float dist = max(length(v), 1e-5);
  float d = dist - u_r;                  // signed distance to the rim, negative inside
  float s = -v.y / dist;                 // 1 at the bottom, 0 at the equator
  float x = v.x * u_side / u_r;          // positive toward the halo side
  float depth = -v.y / u_r;              // 1 at the bottom of the bowl, -1 at its top
  float aa = fwidth(d);

  // 1. Background: darker toward the top corner on the halo side (measured on all four).
  vec2 corner = vec2(u_side * hx, hy);
  float far = 1.0 - smoothstep(0.0, 0.45, length((p - corner) / vec2(2.0 * hx, 2.0 * hy)));
  vec3 bg = mixOklab(u_bg, u_bgFar, far);

  // 2. Halo: coloured spill below the rim, stronger on the halo side.
  float side = smoothstep(-0.6, 0.6, x);
  // A tight spill hugging the rim plus a broad warm wash toward the bottom corner on the halo side.
  vec2 q = vec2(x, v.y / u_r);
  float amt = 1.67 * u_haloAmt;
  float h = 1.3 * amt * smoothstep(-0.2, 0.9, s) * mix(0.35, 1.0, side) * exp(-max(d, 0.0) / 0.14);
  h += amt * 0.12 * smoothstep(-0.2, 1.6, x) * smoothstep(0.3, -1.2, q.y) * exp(-max(d, 0.0) / 0.5);
  vec3 haloCol = mixOklab(u_inner, u_haloCol, smoothstep(-0.9, 0.1, x));
  vec3 col = mixOklab(bg, haloCol, 1.0 - exp(-3.0 * h));   // outside only; the inside starts from bg

  // 3. Inside: two colours across the bowl, varied by blobs, lit from below.
  // The light is a soft oval pool low in the bowl, level below its centre; the upper sides stay as
  // dark as the background, so the circle shows only where the rim is lit.
  vec2 lq = vec2(x / 0.9, max(q.y + 0.45, 0.0) / 0.65);
  float pool = exp(-dot(lq, lq));
  // Inner -> Inner 2 across the bowl. Blobs pull that blend toward one colour (blob 1 toward Inner 2)
  // and add light: the originals' brighter cyan or green patches low in the bowl.
  float t = smoothstep(-0.3, 0.3, x);
  for (int i = 0; i < 3; i++) {
    vec2 bq = q - u_blob[i].xy;
    float w = exp(-dot(bq, bq) / (u_blob[i].z * u_blob[i].z));
    t = mix(t, i == 1 ? 1.0 : 0.0, 0.5 * w);
    pool += 0.5 * w * (1.0 - pool) * smoothstep(-0.5, 0.1, depth);
  }
  vec3 base = mixLch(u_inner, u_inner2, t);
  // The glass edge: just inside the rim the light falls away, except along the bottom.
  pool *= mix(smoothstep(0.0, 0.18, -d / u_r), 1.0, smoothstep(0.75, 0.95, s));
  vec3 lit = toOklab(base);
  lit = fromOklab(vec3(lit.x + 0.1, lit.yz * 1.15));   // the light is brighter than the picked colours
  vec3 inside = tint(bg, lit, pool);
  inside = mixOklab(inside, u_innerLow, pow(smoothstep(0.45, 1.0, depth), 1.3) * smoothstep(0.9, 0.3, abs(x)));
  col = mixOklab(col, inside, 1.0 - smoothstep(-aa, aa, d));

  // 4. Rim: a crisp outer edge and a soft inner falloff, brightest and widest at the bottom,
  // fading to a faint glassy line above the equator. Added as light.
  float low = smoothstep(0.5, 1.0, s);
  float I = (smoothstep(0.0, 0.6, s) + 0.04 * smoothstep(-0.45, 0.0, s)) * mix(0.5, 1.2, u_shine);
  float wo = max(0.0025, 1.2 * aa);
  float wi = 0.012 + 0.02 * low;
  float glow = d > 0.0 ? exp(-d / wo) : exp(d / wi);
  // The hot core: a white-hot band along the bottom, broad inside and cut off crisply at the edge
  // (measured: L > 0.8 over 0.03 inside, dropping within ~0.004 outside).
  float wc = max(d > 0.0 ? 0.002 : 0.02, 1.2 * aa);
  float core = exp(-abs(d) / wc) * smoothstep(0.78, 0.97, s);
  vec3 rimCol = u_rim * I * glow + u_hot * core * mix(0.35, 0.85, u_shine);
  // Bloom: the hot bottom lights the glass inside, and the air just below it in a halo-tinted glow.
  float bloom = 0.3 * mix(0.5, 1.2, u_shine) * smoothstep(0.85, 1.0, s);
  col = d < 0.0 ? tint(col, u_hot, bloom * exp(d / 0.05))
                : tint(col, mixOklab(u_hot, u_haloCol, 0.5), 1.4 * bloom * exp(-d / 0.03));
  return unOlive(col + rimCol);
}
`,Mt=[60,140],Nt=[35,150];function Pt(e){let t=Math.min(1,Math.max(0,e.l)),n=(e.h%360+360)%360,r=t<.6?Nt:Mt,i=r[0]-3,a=r[1]+3;t<.85&&n>i&&n<a&&(n=n-i<a-n?i:a);let o=Math.max(0,e.c);for(let e=0;e<40;e++){let e=u(f({l:t,c:o,h:n})),i=e.l<.85&&e.c>=.03&&e.h>r[0]&&e.h<r[1];if(Math.abs(e.l-t)<.01&&Math.abs(e.c-o)<.01&&!i)break;o*=.93}return f({l:t,c:o,h:n})}function Ft(e){let t=t=>String(e[t]),n=u(t(`inner`)),r=u(t(`rim`)),i=u(t(`background`)),a=r.h>=345||r.h<=45;return{bg:t(`background`),bgFar:Pt({l:Math.max(.075,i.l-.06),c:i.c,h:i.h}),inner:t(`inner`),inner2:t(`inner2`),innerLow:Pt({l:n.l+.26,c:n.c*1.1,h:n.h}),rim:t(`rim`),hot:Pt({l:.95,c:Math.min(.1,r.c*.4),h:a?100:r.h}),halo:Pt({l:r.l-.2,c:r.c*.8,h:r.h+10})}}function It(e,t,n){let r=Math.max(n,1)/2,i=Math.max(1/n,1)/2,a=t()<.5?1:-1,o=(t()<.5?-1:1)*(.02+.1*t()),s=Math.min(.52*Number(e.size)*(.94+.12*t()),r-Math.abs(o)-.03),c=Number(e.height)*(n<1?1.6:1)*2*i,l=Array.from({length:3},()=>[t()-.5,-.75+.6*t(),.35+.25*t()]);return{c:[o,-i+c+s],r:s,side:a,blobs:l}}function Lt(e,t){let n=Ft(e);return{u_bg:i(n.bg),u_bgFar:i(n.bgFar),u_inner:i(n.inner),u_inner2:i(n.inner2),u_innerLow:i(n.innerLow),u_rim:i(n.rim),u_hot:i(n.hot),u_haloCol:i(n.halo),u_c:t.c,u_r:t.r,u_side:t.side,u_shine:Number(e.shine),u_haloAmt:Number(e.halo),u_blob:{vec3Array:t.blobs.flat()}}}var Rt={size:1,height:.09,shine:.7,halo:.6,grain:.15},zt=(e,t,n,r,i,a)=>({id:e,label:t,values:{inner:n,inner2:r,rim:i,background:a,...Rt}}),Bt={excludeHue:Nt},Vt={id:`crescent`,name:`Crescent`,era:`2020s`,version:1,params:[{kind:`color`,id:`inner`,label:`Inner`,default:`#570191`,l:[.28,.55],c:[.09,.22],...Bt},{kind:`color`,id:`inner2`,label:`Inner 2`,default:`#930b76`,l:[.28,.55],c:[.09,.22],...Bt},{kind:`color`,id:`rim`,label:`Rim`,default:`#fa3058`,l:[.45,.65],c:[.14,.27],...Bt},{kind:`color`,id:`background`,label:`Background`,default:`#0b0125`,l:[.06,.2],c:[0,.08],...Bt},{kind:`range`,id:`size`,label:`Size`,min:.8,max:1.15,step:.01,default:1},{kind:`range`,id:`height`,label:`Height`,min:.04,max:.3,step:.01,default:.09},{kind:`range`,id:`shine`,label:`Shine`,min:0,max:1,step:.01,default:.7},{kind:`range`,id:`halo`,label:`Halo`,min:0,max:1,step:.01,default:.6},S(.15)],presets:[zt(`violet`,`Violet`,`#570191`,`#930b76`,`#fa3058`,`#0b0125`),zt(`blue`,`Blue`,`#013b93`,`#070093`,`#b52ef0`,`#010d19`),zt(`ember`,`Ember`,`#7f0248`,`#ad1225`,`#fa4722`,`#170010`),zt(`lagoon`,`Lagoon`,`#00755d`,`#02518d`,`#6d32ff`,`#020d07`)],fragment:jt,uniforms(e,t,n){return Lt(e,It(e,w(t^810588),n))}};function V({l:e,c:t,h:n}){let r=n*Math.PI/180;return[e,t*Math.cos(r),t*Math.sin(r)]}function H([e,t,n]){let r=Math.atan2(n,t)*180/Math.PI;return r<0&&(r+=360),{l:e,c:Math.hypot(t,n),h:r}}function U(e){if(d(c(e)))return e;let t=0,n=e.c;for(let r=0;r<24;r++){let r=(t+n)/2;d(c({...e,c:r}))?t=r:n=r}return{...e,c:t}}function Ht(e){let t=H(e);return d(c(t))?e:V(U(t))}var W=(e,t,n)=>{let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)},G=[{hue:[60,140],belowL:.8},{hue:[35,60],belowL:.6}],K=e=>(e%360+360)%360,Ut=e=>Math.min(1,Math.max(0,(e-.02)/.02));function Wt(e,t,n,r){let i=Math.min(e,e+t),a=Math.max(e,e+t),o=0;for(let e=-2;e<=2;e++)o+=Math.max(0,Math.min(a,r+360*e)-Math.max(i,n+360*e));return o}function Gt(e,t,n,r){let i=K(n-t);if(i===0)return 0;let a=[i,i-360];return a.sort((e,t)=>Math.abs(e)-Math.abs(t)),Math.min(e.l,r.l)>=.8||a.sort((e,n)=>Wt(t,e,60,140)-Wt(t,n,60,140)||Math.abs(e)-Math.abs(n)),a[0]}function Kt(e,t){let n=Ut(e.c),r=Ut(t.c);return Gt(e,n===0?t.h:e.h,r===0?e.h:t.h,t)}function qt(e,t,n,r){let i=Ut(e.c),a=Ut(t.c),o=(i===0?t.h:e.h)+(1-i)*r,s=r*Math.max(0,i+a-1);return{l:e.l+(t.l-e.l)*n,c:e.c+(t.c-e.c)*n,h:K(o+s*n)}}function Jt(e,t,n){return qt(e,t,n,Kt(e,t))}function Yt(e,t){let n=W(.01,.04,e);return[n*W(52,60,t)*(1-W(140,148,t)),n*W(27,35,t)*(1-W(60,68,t))]}var Xt=.02;function Zt(e,t){let n=e-t;return n<=-.02?t:n>=.02?e:t+(n+.02)*(n+.02)/.08}var Qt=[`background`,`light`,`cool`,`accent`,`warm`],$t={background:{l:[.03,.22],c:[0,.04],hueBands:G},light:{l:[.85,.98],c:[0,.06],hueBands:G},cool:{l:[.35,.65],c:[.08,.18],hueBands:G},accent:{l:[.4,.7],c:[.08,.18],hueBands:G},warm:{l:[.55,.79],c:[.08,.18],hueBands:G}},en={background:`#140f18`,light:`#ede6f7`,cool:`#6b42aa`,accent:`#ba3f60`,warm:`#e56549`},tn={background:`#06101c`,light:`#e1f2f8`,cool:`#2850b0`,accent:`#0d9298`,warm:`#e87a65`},nn={background:`#170d1a`,light:`#fce8f2`,cool:`#6b2d7d`,accent:`#bc3e79`,warm:`#e8809a`},rn={light:0,cool:.18,accent:.45,warm:.66,peach:.84},an={lavender:[.94,.06],violet:[.06,.3],magenta:[.3,.45],red:[.45,.58],orange:[.58,.76],peach:[.76,.94]},on=.035;function sn(e,t){let n=H(e),r=n.l*t,i=n.c*(.6+.4*t),a=n.h;if(a>30&&a<70){let e=Math.max(W(.66,.58,r),W(48,56,a)*W(.86,.78,r));a-=(a-30)*e}let[o]=Yt(i,a);return i-=(i-Math.min(i,on))*o*W(.86,.78,r),Ht(V({l:r,c:i,h:a}))}var cn={gapK:.5,gapW:.55,rimL:.15,rimW:.2};function ln(e){let t=cn,n=e<t.rimW?t.rimL*(1-e/t.rimW)**2:0;return{k:1-(1-t.gapK)*W(1-t.gapW,1,e),rim:n}}function un(){let e=0;for(let t=0;t<256;t++)e+=ln((t+.5)/256).k;return e/256}function dn(e,t){let n=[];for(let r=0;r<32;r++){let i=r/32,a=0;for(;a<t.length-2&&i>=t[a+1];)a++;let o=(i-t[a])/(t[a+1]-t[a]);n.push(sn(V(U(Jt(e[a],e[a+1],o))),1))}return n}function fn([e,t,n,r,i]){let a=dn([t,n,r,i,U({l:Math.max(i.l+.12,.8),c:i.c*.6,h:i.h>300||i.h<50?Math.min(52,K(i.h+8)>300?i.h:i.h+8):i.h}),t],[rn.light,rn.cool,rn.accent,rn.warm,rn.peach,1]),o=Ht(V({l:.32,c:n.c*.55,h:n.h})),s=sn(V({l:.24,c:.04,h:Jt(r,i,.3).h}),1),c=K(265-e.h+180)-180,l=Ht(V({l:e.l*.25,c:e.c,h:K(e.h+Math.max(-45,Math.min(45,c)))}));return{cycle:a,bgNear:V(e),bgFar:l,face:o,floor:s,light:V(t)}}function pn(e){return fn(Qt.map(t=>u(e[t])))}var mn={inner:.6,run:.61,sheen:.41,fanAlpha:.75,faceTop:.15,light:.2},hn=[[-.72,-.02],[-.4,-.1],[-.16,-.08],[-.08,.1],[.032,.28],[.192,.22],[.352,.05],[.48,-.15],[.672,-.35],[.752,-.5]],gn={a:.19,b:.578,dip:.253,dipW:.08},_n=.7,vn={gapShare:.5,round:.05,out0:.43,out1:.31},yn={jump:.4,step:.03,sigma:.45,weights:{lavender:.06,violet:.22,magenta:.13,red:.17,orange:.38,peach:.04}};function bn(e,t){let n=gn.a+(gn.b-gn.a)*W(0,.8,t)-gn.dip*Math.exp(-(((t-e.uCrest)/gn.dipW)**2));return e.scale*Math.max(.5*gn.a,n)}function xn(e){let t=Math.max(e,1)/2,n=Math.max(1/e,1)/2;return e<1?{sx:n/.5,sy:n/.5,t:n/.5*.9}:{sx:e<1.6?Math.sqrt(t/.8):t/.8,sy:1,t:1}}function Sn(e,t){let n=e.length,r=Math.min(n-2,Math.max(0,Math.floor(t))),i=Math.min(1,Math.max(0,t-r)),a=t=>t<0?[2*e[0][0]-e[1][0],2*e[0][1]-e[1][1]]:t>n-1?[2*e[n-1][0]-e[n-2][0],2*e[n-1][1]-e[n-2][1]]:e[t],o=a(r-1),s=a(r),c=a(r+1),l=a(r+2),u=(e,t)=>Math.max(1e-6,Math.sqrt(Math.hypot(t[0]-e[0],t[1]-e[1]))),d=0+u(o,s),f=d+u(s,c),p=f+u(c,l),m=d+(f-d)*i,h=(e,t,n,r)=>{let i=(m-n)/(r-n);return[e[0]+(t[0]-e[0])*i,e[1]+(t[1]-e[1])*i]},g=h(o,s,0,d),_=h(s,c,d,f),v=h(c,l,f,p);return h(h(g,_,0,f),h(_,v,d,p),d,f)}function Cn(e){return e.map((t,n)=>{let r=e[Math.max(0,n-1)],i=e[Math.min(e.length-1,n+1)],a=i.x-r.x,o=i.y-r.y,s=Math.hypot(a,o);return[-o/s,a/s]})}function wn(e){let t=Cn(e.spine);return{outer:e.spine.map((e,n)=>[e.x+t[n][0]*e.hOut,e.y+t[n][1]*e.hOut]),inner:e.spine.map((e,n)=>[e.x-t[n][0]*e.hIn,e.y-t[n][1]*e.hIn])}}function Tn(e,t,n){if(t.amp===0)return e;let r=e.length,i=[0];for(let t=1;t<r;t++)i.push(i[t-1]+Math.hypot(e[t][0]-e[t-1][0],e[t][1]-e[t-1][1]));let a=i[r-1];return e.map((o,s)=>{let c=e[Math.max(0,s-1)],l=e[Math.min(r-1,s+1)],u=l[0]-c[0],d=l[1]-c[1],f=Math.hypot(u,d)||1,p=Math.min(1,i[s]/(.15*a),(a-i[s])/(.15*a)),m=t.amp*n*p*Math.sin(2*Math.PI*i[s]/(t.len*n)+t.phase);return[o[0]-d/f*m,o[1]+u/f*m]})}function En(e,t){let n=e.length,r=[0];for(let t=1;t<n;t++)r.push(r[t-1]+Math.hypot(e[t][0]-e[t-1][0],e[t][1]-e[t-1][1]));let i=r[n-1]/(n-1),a=[],o=0;for(let t=0;t<n;t++){let s=i*t;for(;o<n-2&&r[o+1]<s;)o++;let c=Math.min(1,Math.max(0,(s-r[o])/(r[o+1]-r[o]||1)));a.push([e[o][0]+(e[o+1][0]-e[o][0])*c,e[o][1]+(e[o+1][1]-e[o][1])*c])}let s=Math.ceil(3*t/i),c=Array.from({length:2*s+1},(e,n)=>Math.exp(-.5*((n-s)*i/t)**2)),l=e=>e<0?[2*a[0][0]-a[-e][0],2*a[0][1]-a[-e][1]]:e>n-1?[2*a[n-1][0]-a[2*(n-1)-e][0],2*a[n-1][1]-a[2*(n-1)-e][1]]:a[e];return a.map((e,t)=>{let n=0,r=0,i=0;for(let e=-s;e<=s;e++){let a=l(t+e),o=c[e+s];n+=a[0]*o,r+=a[1]*o,i+=o}return[n/i,r/i]})}function Dn(e,t,n){let r=1024,i=e.length-1,a=En(Tn(Array.from({length:r},(t,n)=>Sn(e,i*n/1023)),n,t),vn.round*t),o=[0];for(let e=1;e<r;e++)o.push(o[e-1]+Math.hypot(a[e][0]-a[e-1][0],a[e][1]-a[e-1][1]));let s=o[1023],c=[],l=0;for(let e=0;e<40;e++){let t=s*e/39;for(;l<1022&&o[l+1]<t;)l++;let n=Math.min(1,Math.max(0,(t-o[l])/(o[l+1]-o[l])));c.push({x:a[l][0]+(a[l+1][0]-a[l][0])*n,y:a[l][1]+(a[l+1][1]-a[l][1])*n})}let u=On(c),d=c.map((e,t)=>({...e,tx:u[t][0],ty:u[t][1]})),f=8;for(let e=9;e<=31;e++)c[e].y>c[f].y&&(f=e);let p=f/39,m=e=>vn.out0+(vn.out1-vn.out0)*e,h=c.map((e,n)=>bn({uCrest:p,scale:t},n/39)),g=h.map((e,t)=>e*m(t/39)),_=h.map((e,t)=>e-g[t]),v=Cn(c),y=g.map(()=>1/0),b=_.map(()=>1/0);for(let e=1;e<=3;e++)for(let t=0;t+e<40;t++){let n=v[t],r=v[t+e],i=Math.atan2(n[0]*r[1]-n[1]*r[0],n[0]*r[0]+n[1]*r[1]);if(Math.abs(i)<1e-9)continue;let a=_n*Math.hypot(c[t+e].x-c[t].x,c[t+e].y-c[t].y)/(2*Math.sin(Math.abs(i)/2)),o=i>0?y:b;for(let n=t;n<=t+e;n++)o[n]=Math.min(o[n],a)}for(let e=0;e<39;e++)for(let t=0;t<=1.0001;t+=.125){let[,n,r]=kn(d,e,t),i=(n[0]*r[1]-n[1]*r[0])/Math.hypot(n[0],n[1])**3,a=v[e][0]*v[e+1][1]-v[e][1]*v[e+1][0];if(Math.abs(i)<1e-9||i*a<=0)continue;let o=i>0?y:b,s=_n/Math.abs(i);t<=.5&&(o[e]=Math.min(o[e],s)),t>=.5&&(o[e+1]=Math.min(o[e+1],s))}let x=(e,t,n)=>t.map((t,r)=>{let i=t;for(let t=0;t<40;t++){if(Math.abs(t-r)<2||v[r][0]*v[t][0]+v[r][1]*v[t][1]>=0)continue;let a=c[t].x-c[r].x,o=c[t].y-c[r].y,s=Math.hypot(a,o);e*(a*v[r][0]+o*v[r][1])>.5*s&&(i=Math.min(i,n*s))}return i}),S=(e,t)=>{let n=e.map((e,n)=>Math.min(e,.9*t[n])),r=[-4,-3,-2,-1,0,1,2,3,4].map(e=>Math.exp(-.5*(e/1.5)**2));return n.map((i,a)=>{let o=0,s=0;return r.forEach((e,t)=>{o+=e*n[Math.min(39,Math.max(0,a+t-4))],s+=e}),Math.min(o/s,e[a],t[a])})},C=S(g,x(1,y,vn.gapShare)),w=S(_,x(-1,b,vn.gapShare)),T=(e,t,n)=>x(e,t.map(e=>e/_n),.5).map((e,t)=>Math.max(0,Math.min(10,e)-n[t]));return{spine:d.map((e,t)=>({x:e.x,y:e.y,hOut:C[t],hIn:w[t],tx:e.tx,ty:e.ty})),uCrest:p,room:{out:T(1,y,C),in:T(-1,b,w)}}}function On(e){let t=e.length,n=e=>{let n=Array(t).fill(1),r=Array(t).fill(4),i=Array(t).fill(1),a=e.map((n,r)=>3*(e[Math.min(t-1,r+1)]-e[Math.max(0,r-1)]));r[0]=2,r[t-1]=2,a[0]=3*(e[1]-e[0]),a[t-1]=3*(e[t-1]-e[t-2]);for(let e=1;e<t;e++){let t=n[e]/r[e-1];r[e]-=t*i[e-1],a[e]-=t*a[e-1]}let o=Array(t);o[t-1]=a[t-1]/r[t-1];for(let e=t-2;e>=0;e--)o[e]=(a[e]-i[e]*o[e+1])/r[e];return o},r=n(e.map(e=>e.x)),i=n(e.map(e=>e.y));return r.map((e,t)=>[e,i[t]])}function kn(e,t,n){let r=e[t],i=e[t+1],a=[r.tx,r.ty],o=[i.tx,i.ty],s=n*n,c=s*n,l=[2*c-3*s+1,c-2*s+n,-2*c+3*s,c-s],u=[6*s-6*n,3*s-4*n+1,-6*s+6*n,3*s-2*n],d=[12*n-6,6*n-4,-12*n+6,6*n-2],f=e=>[e[0]*r.x+e[1]*a[0]+e[2]*i.x+e[3]*o[0],e[0]*r.y+e[1]*a[1]+e[2]*i.y+e[3]*o[1]];return[f(l),f(u),f(d)]}function An(e,t,n,r){if(!(n>t)||!(r>0))return e.map(()=>0);let i=(e,t)=>e[Math.min(39,Math.max(0,t))],a=(e,t,n)=>e.map((r,a)=>{let o=0,s=0;for(let r=-t;r<=t;r++){let t=Math.exp(-.5*(r/n)**2);o+=t*i(e,a+r),s+=t}return o/s}),o=a(e.map((t,n)=>Math.min(...[-3,-2,-1,0,1,2,3].map(t=>i(e,n+t)))),3,1.5),s=o.map((e,i)=>{let a=(i/39-t)/(n-t);return a<=0||a>=1?0:r*Math.sin(Math.PI*a)**.7});return a(s.map((e,t)=>Math.min(e,.85*o[t])),4,2).map((t,n)=>Math.min(t,s[n],.85*e[n]))}var jn=e=>Math.sqrt(-2*Math.log(1-e()))*Math.cos(2*Math.PI*e());function Mn(e){let t=e();for(let[n,r]of Object.entries(yn.weights)){if(t<r||n===`peach`){let[t,r]=an[n];return(t+(r>t?r-t:r+1-t)*e())%1}t-=r}return 0}function Nn(e,t,n){let r=Array.from({length:t},()=>Math.exp(yn.sigma*jn(e))*(e()<.08?3:1)),i=r.reduce((e,t)=>e+t,0),a=[],o=0,s=e();for(let c=0;c<t;c++){c>0&&(s=e()<yn.jump?Mn(e):((s+yn.step*jn(e))%1+1)%1);let t=(e()*2-1)*.06,l=o<.3||o>.7;a.push({v0:o,t:s,lJit:t,uStart:l?e()*.6*n:0}),o+=r[c]/i}return a}function Pn(e,t,n,r,i){let{t:a}=xn(t),{spine:o,uCrest:s,room:c}=Dn(e,a,{amp:.015+.02*r(),len:.5+.4*r(),phase:2*Math.PI*r()}),l={u:.08+.07*r(),gap:.5,spread:.15},u={a:.03+.03*r(),k:2+2*r(),phase:2*Math.PI*r(),a2:.01+.015*r(),k2:5+3*r(),phase2:2*Math.PI*r()},d=Nn(r,Math.min(80,Math.max(1,Math.round(42*n.sheets))),l.u),f=Math.max(t,1)/2,p=0;for(;p<39&&o[p].x<-f;)p++;let m=p/39,h=Math.max(m+.1,s-.12),g=Math.max(.02,m-.12),_=(.18+.06*r())*a,v={u0:g,u1:h,h:_,heights:An(c.out,g,h,_)},y=Math.max(.05,m-.1),b=Math.max(y+.1,s+.02),x=(.2+.06*r())*a,S={u0:y,u1:b,h:x,band:.35+.2*r(),heights:An(c.in,y,b,x)},C=.7+.15*r(),w=Math.round(C*39),T=Cn(o)[w],E=.25*bn({uCrest:s,scale:a},C);return{mirror:i,scale:a,knots:e,spine:o,uCrest:s,room:c,ripple:u,sheets:d,fan:l,face:v,floor:S,sheen:{c:[o[w].x+T[0]*E,o[w].y+T[1]*E],r:.12*a},noise:Math.floor(r()*1e3)}}function Fn(e){let t=1;for(let n=1;n<e.length-1;n++)e[n][1]>e[t][1]&&(t=n);return t}function In(e,t,n,r){let[i,a]=[Math.max(t,1)/2,Math.max(1/t,1)/2],{sx:o,sy:s,t:c}=xn(t),l=e=>-i+2*i*e,u=e=>a-2*a*e,d=hn.map(([e,t])=>[e*o,t*s]),f=t<1;d[0]=f?[d[0][0],d[0][1]+(e()*2-1)*.06*c]:[l(.03+.05*e()),u(.4+.22*e())],d[d.length-1]=f?[d[d.length-1][0]+(e()*2-1)*.05*c,-a-.15]:[l(.82+.23*e()),-a-.15];for(let t=1;t<d.length-1;t++)d[t]=[d[t][0]+(e()*2-1)*.04*c,d[t][1]+(e()*2-1)*.06*c];if(r>=19&&(d[5]=[d[5][0]+.05,d[5][1]],d[2]=[d[2][0]-.05,d[2][1]]),!f){let e=Fn(d);d[e]=[Math.min(l(.62),Math.max(l(.42),d[e][0])),Math.min(u(zn[0]),Math.max(u(zn[1]),d[e][1]))];for(let t=1;t<d.length-1;t++)t!==e&&(d[t][1]=Math.min(d[t][1],d[e][1]-.01))}let p=d[0],m=d[d.length-1],h=e=>p[1]+(m[1]-p[1])*(e-p[0])/(m[0]-p[0]);for(let e=1;e<d.length-1;e++)d[e][1]=h(d[e][0])+(d[e][1]-h(d[e][0]))*n;if(f){let t=l(.4+.2*e())-d[Fn(d)][0];for(let e of d)e[0]+=t}let g=Fn(d);for(let e=1;e<d.length-1;e++){let t=e===g?d[e-1][0]-.06:d[e-1][0]+.02;d[e][0]<t&&(d[e][0]=t)}let _=d.length-1;return d[_][0]=Math.max(d[_][0],d[_-1][0]+.06),d}var Ln=(e,t)=>{let{sx:n,sy:r}=xn(t),i=0;for(let t=1;t<e.length-1;t++){let a=hn[t];Math.hypot(e[t][0]-a[0]*n,e[t][1]-a[1]*r)>=.04&&i++}return i},Rn=.12,zn=[.24,.34];function Bn(e,t,n,r,i){let a=Math.max(1/t,1)/2*(1-2*Rn),o=t<1,s=e=>Pn(e,t,n,w(r^2654435769),i),c=s(e);for(let t=0;t<30;t++){let t=Math.max(...wn(c).outer.map(e=>e[1]))-a;if(t<=0)break;e=e.map((n,r)=>o||r>0&&r<e.length-1?[n[0],n[1]-t-1e-4]:n),c=s(e)}return c}function Vn(e,t,n){let r=w(e),i=r()<.5?1:-1,a=Bn(In(r,t,n.bend,0),t,n,e,i);for(let o=1;o<20&&Ln(a.knots,t)<2;o++)a=Bn(In(r,t,n.bend,o),t,n,e,i);return a}function Hn(e,t){let n=pn(Object.fromEntries(Qt.map(t=>[t,String(e[t])]))),r=Number(e.faces),i=t.sheets.flatMap(e=>[e.v0,e.t,e.lJit,e.uStart]);for(;i.length<320;)i.push(2,0,0,0);return{u_spine:{vec4Array:t.spine.flatMap(e=>[e.x,e.y,e.hOut,e.hIn])},u_spineT:{vec4Array:Array.from({length:t.spine.length/2},(e,n)=>[t.spine[2*n].tx,t.spine[2*n].ty,t.spine[2*n+1].tx,t.spine[2*n+1].ty]).flat()},u_sheet:{vec4Array:i},u_sheetCount:{int:t.sheets.length},u_cycle:{vec3Array:n.cycle.flat()},u_bgNear:n.bgNear,u_bgFar:n.bgFar,u_face:n.face,u_floor:n.floor,u_light:n.light,u_faceH:{vec4Array:Array.from({length:t.spine.length/2},(e,n)=>[t.face.heights[2*n],t.floor.heights[2*n],t.face.heights[2*n+1],t.floor.heights[2*n+1]]).flat()},u_faceAux:[0,r,0,0],u_floorAux:[t.floor.band,0,r,0],u_ripple:[t.ripple.a,t.ripple.k,t.ripple.phase,0],u_ripple2:[t.ripple.a2,t.ripple.k2,t.ripple.phase2,0],u_fan:[t.fan.u,t.fan.gap,t.fan.spread*t.scale,0],u_sheen:[t.sheen.c[0],t.sheen.c[1],t.sheen.r,r],u_look:[t.mirror,t.noise,t.uCrest,t.scale],u_profile:[cn.gapK,cn.gapW,cn.rimL,cn.rimW],u_profileMean:un(),u_shade:[mn.inner,mn.run,mn.sheen,mn.fanAlpha],u_shade2:[mn.faceTop,mn.light,0,0]}}var Un=`// Strata: a thick stack of thin coloured sheets along one spine, seen edge-on, over two flat faces and a near-black
// background. stackCoord is an exact port of src/recipes/strata/layout.ts; shade, profile, sheetColour and
// strataGuard of src/recipes/strata/palette.ts.

#define SPINE_N 40
#define MAX_SHEETS 80
#define CYCLE_N 32
uniform vec4 u_spine[SPINE_N];     // x, y (canonical q), hOut, hIn
uniform vec4 u_spineT[SPINE_N / 2]; // spline tangents, two points per entry: (tx, ty) of 2k, then of 2k + 1
uniform vec4 u_sheet[MAX_SHEETS];  // v0, t (cycle), lJit, uStart; padding has v0 = 2
uniform int u_sheetCount;
uniform vec3 u_cycle[CYCLE_N];     // OKLab, cyclic
uniform vec3 u_bgNear, u_bgFar, u_face, u_floor, u_light; // OKLab
uniform vec4 u_faceH[SPINE_N / 2];  // layout.ts Face heights: (face, floor) of point 2k, then of 2k + 1
uniform vec4 u_faceAux;            // -, faces
uniform vec4 u_floorAux;           // band, -, faces
uniform vec4 u_fan;                // u, gap, spread (p), -
uniform vec4 u_ripple, u_ripple2;  // layout.ts Ripple: a, k, phase (two components)
uniform vec4 u_sheen;              // centre, r, faces
uniform vec4 u_look;               // mirror, noise, uCrest, scale
uniform vec4 u_profile;            // palette.ts PROFILE: gapK, gapW, rimL, rimW
uniform float u_profileMean;       // palette.ts profileMean()
uniform vec4 u_shade;              // palette.ts SHADING: inner, run, sheen, fanAlpha
uniform vec4 u_shade2;             // SHADING.faceTop, SHADING.light

const vec2 LIGHT = vec2(-0.6, 0.8);  // canonical: from the upper left
const float WARM_SHADOW_H = 30.0;
const float OLIVE_C = 0.035;

float wrapH(float h) { return mod(h, 360.0); }
vec3 lch(vec3 lab) {
  float c = length(lab.yz);
  float h = c < 1e-7 ? 0.0 : degrees(atan(lab.z, lab.y));
  return vec3(lab.x, c, wrapH(h));
}
vec3 labOf(vec3 o) { return vec3(o.x, o.y * cos(radians(o.z)), o.y * sin(radians(o.z))); }
float sstep(float e0, float e1, float x) { float t = clamp((x - e0) / (e1 - e0), 0.0, 1.0); return t * t * (3.0 - 2.0 * t); }

bool inGamut(vec3 lab) {
  vec3 rgb = fromOklab(lab);
  return all(greaterThanEqual(rgb, vec3(-1e-4))) && all(lessThanEqual(rgb, vec3(1.0 + 1e-4)));
}
vec3 gamutFit(vec3 lab) {
  if (inGamut(lab)) return lab;
  float lo = 0.0, hi = 1.0;
  for (int i = 0; i < 16; i++) {
    float mid = 0.5 * (lo + hi);
    if (inGamut(vec3(lab.x, lab.yz * mid))) lo = mid; else hi = mid;
  }
  return vec3(lab.x, lab.yz * lo);
}
vec2 bandWeights(float c, float h) {
  float wc = sstep(0.01, 0.04, c);
  return wc * vec2(sstep(52.0, 60.0, h) * (1.0 - sstep(140.0, 148.0, h)),
                   sstep(27.0, 35.0, h) * (1.0 - sstep(60.0, 68.0, h)));
}

// palette.ts shade: darken by k; warm hues swing toward red as they darken, olive hues lose chroma.
vec3 shadeC(vec3 lab, float k) {
  vec3 o = lch(lab);
  float l = o.x * k, c = o.y * (0.6 + 0.4 * k), h = o.z;
  if (h > WARM_SHADOW_H && h < 70.0) {
    float sw = max(sstep(0.66, 0.58, l), sstep(48.0, 56.0, h) * sstep(0.86, 0.78, l));
    h -= (h - WARM_SHADOW_H) * sw;
  }
  float wy = bandWeights(c, h).x;
  c -= (c - min(c, OLIVE_C)) * wy * sstep(0.86, 0.78, l);
  return gamutFit(labOf(vec3(l, c, h)));
}

// palette.ts strataGuard.
vec3 strataGuard(vec3 lab, float hue) {
  vec3 o = lch(lab);
  float l = clamp(o.x, 0.0, 1.0);
  float wh = sstep(0.005, 0.02, o.y);
  float h = o.z;
  if (wh < 1.0) {
    float d = mod(o.z - hue + 180.0, 360.0) - 180.0;
    h = wrapH(hue + d * wh);
  }
  float target = 0.02 * sstep(0.35, 0.4, l) * (1.0 - sstep(0.85, 0.9, l));
  float c = max(o.y, target);
  vec2 w = bandWeights(c, h);
  if (w.y > 0.0 && h > 27.0 && h < 68.0) h -= (h - 27.0) * w.y * (1.0 - sstep(0.6, 0.65, l));
  if (w.x > 0.0) c -= (c - min(c, OLIVE_C)) * w.x * (1.0 - sstep(0.8, 0.85, l));
  return gamutFit(labOf(vec3(l, c, h)));
}

// palette.ts profile: (k, rim) across a sheet, lit side at f = 0.
vec2 profileK(float f) {
  float rim = f < u_profile.w ? u_profile.z * (1.0 - f / u_profile.w) * (1.0 - f / u_profile.w) : 0.0;
  return vec2(1.0 - (1.0 - u_profile.x) * sstep(1.0 - u_profile.y, 1.0, f), rim);
}

vec3 sheetColour(float t, float lJit) {
  float x = fract(t) * float(CYCLE_N);
  int i = int(floor(x)) % CYCLE_N;
  vec3 c = mix(u_cycle[i], u_cycle[(i + 1) % CYCLE_N], x - floor(x));
  return vec3(c.x + lJit, c.yz);
}

// palette.ts sheetMean.
vec3 sheetMean(int j) {
  vec4 S = u_sheet[j];
  vec3 base = sheetColour(S.y, S.z);
  vec3 c = shadeC(base, u_profileMean);
  return vec3(c.x + u_profile.z * u_profile.w / 3.0 * (base.x > 0.85 ? 1.6 : 1.0), c.yz);
}

int sheetIndex(float v, int n) {
  int lo = 0, hi = n - 1;
  for (int it = 0; it < 7; it++) {
    int mid = (lo + hi + 1) / 2;
    if (u_sheet[mid].x <= v) lo = mid; else hi = mid - 1;
  }
  return lo;
}

float cross2(vec2 a, vec2 b) { return a.x * b.y - a.y * b.x; }

// layout.ts cr1: Catmull–Rom of four values between the middle two.
float cr1(float a0, float a1, float a2, float a3, float s) {
  float s2 = s * s, s3 = s2 * s;
  return a1 + 0.5 * s * (a2 - a0) + s2 * (a0 - 2.5 * a1 + 2.0 * a2 - 0.5 * a3) + s3 * (-0.5 * a0 + 1.5 * a1 - 1.5 * a2 + 0.5 * a3);
}

// (face, floor) heights at spine point i.
vec2 faceH(int i) { vec4 h = u_faceH[clamp(i, 0, SPINE_N - 1) / 2]; return (clamp(i, 0, SPINE_N - 1) % 2 == 0) ? h.xy : h.zw; }
// layout.ts faceHeightAt for both faces at u.
vec2 faceHeights(float u) {
  float x = clamp(u * float(SPINE_N - 1), 0.0, float(SPINE_N - 1) - 1e-4);
  int i = int(floor(x));
  float s = x - float(i);
  vec2 a0 = faceH(i - 1), a1 = faceH(i), a2 = faceH(i + 1), a3 = faceH(i + 2);
  return max(vec2(0.0), vec2(cr1(a0.x, a1.x, a2.x, a3.x, s), cr1(a0.y, a1.y, a2.y, a3.y, s)));
}

// layout.ts rippleV: the sheet warp across the stack; also returns d(warped)/dv.
float rippleV(float u, float v, out float slope) {
  float w = u_ripple.x * sin(6.2831853 * u_ripple.y * u + u_ripple.z) + u_ripple2.x * sin(6.2831853 * u_ripple2.y * u + u_ripple2.z);
  slope = 1.0 + 3.14159265 * cos(3.14159265 * v) * w;
  return v + sin(3.14159265 * v) * w;
}

vec2 tangentAt(int i) { vec4 t = u_spineT[i / 2]; return (i % 2 == 0) ? t.xy : t.zw; }

// layout.ts seg: Hermite segment i with the natural spline's tangents (C2) at s → point, first and second derivatives.
void segAt(int i, float s, out vec2 c, out vec2 d1, out vec2 d2) {
  vec2 p1 = u_spine[i].xy, p2 = u_spine[i + 1].xy;
  vec2 m0 = tangentAt(i), m1 = tangentAt(i + 1);
  float s2 = s * s, s3 = s2 * s;
  c = (2.0 * s3 - 3.0 * s2 + 1.0) * p1 + (s3 - 2.0 * s2 + s) * m0 + (-2.0 * s3 + 3.0 * s2) * p2 + (s3 - s2) * m1;
  d1 = (6.0 * s2 - 6.0 * s) * p1 + (3.0 * s2 - 4.0 * s + 1.0) * m0 + (-6.0 * s2 + 6.0 * s) * p2 + (3.0 * s2 - 2.0 * s) * m1;
  d2 = (12.0 * s - 6.0) * p1 + (6.0 * s - 4.0) * m0 + (-12.0 * s + 6.0) * p2 + (6.0 * s - 2.0) * m1;
}

// layout.ts nearestOn: Newton on (C − q)·C′ = 0 from s0. Returns s, sets the point, tangent and distance.
float nearestOn(int i, vec2 q, float s0, out vec2 c, out vec2 t, out float dist) {
  float s = s0;
  vec2 d2;
  for (int k = 0; k < 4; k++) {
    segAt(i, s, c, t, d2);
    vec2 e = c - q;
    float f = dot(e, t), fp = dot(t, t) + dot(e, d2);
    if (fp <= 1e-12) break;
    s = clamp(s - f / fp, 0.0, 1.0);
  }
  segAt(i, s, c, t, d2);
  dist = length(q - c);
  return s;
}

// layout.ts stackCoord, without the v ∈ [0, 1] test (the fan widens the stack first). Returns found, and sets
// u, v, width (hOut + hIn), the unit normal (+ outer) and the arc length of the segment.
bool stackCoord(vec2 q, out float u, out float v, out float width, out vec2 nrm, out float segLen) {
  float best = 1e9; int bi = 0; float bt = 0.0;
  for (int i = 0; i < SPINE_N - 1; i++) {
    vec2 a = u_spine[i].xy, e = u_spine[i + 1].xy - a;
    float t = clamp(dot(q - a, e) / dot(e, e), 0.0, 1.0);
    float d = length(a + t * e - q);
    if (d < best) { best = d; bi = i; bt = t; }
  }
  vec2 c, tg, c2, t2; float dist, dist2;
  int ri = bi;
  float rs = nearestOn(bi, q, bt, c, tg, dist);
  if (bi > 0) {
    float s2 = nearestOn(bi - 1, q, 1.0, c2, t2, dist2);
    if (dist2 < dist) { ri = bi - 1; rs = s2; c = c2; tg = t2; dist = dist2; }
  }
  if (bi < SPINE_N - 2) {
    float s2 = nearestOn(bi + 1, q, 0.0, c2, t2, dist2);
    if (dist2 < dist) { ri = bi + 1; rs = s2; c = c2; tg = t2; dist = dist2; }
  }
  float along = dot(q - c, tg);
  if ((ri == 0 && rs <= 0.0 && along < -1e-9) || (ri == SPINE_N - 2 && rs >= 1.0 && along > 1e-9)) return false;
  float d = cross2(tg, q - c) >= 0.0 ? dist : -dist;
  vec4 A = u_spine[ri], B = u_spine[ri + 1];
  vec4 A0 = u_spine[max(0, ri - 1)], B1 = u_spine[min(SPINE_N - 1, ri + 2)];
  float hOut = max(0.0, cr1(A0.z, A.z, B.z, B1.z, rs)), hIn = max(0.0, cr1(A0.w, A.w, B.w, B1.w, rs));
  width = hOut + hIn;
  v = (hOut - d) / width;
  u = (float(ri) + rs) / float(SPINE_N - 1);
  vec2 tn = normalize(tg);
  nrm = vec2(-tn.y, tn.x);
  segLen = length(B.xy - A.xy);
  return true;
}

// A sheet's colour at f across it (0 = outer edge), with the lit side chosen by wl (1 = outer lit).
vec3 sheetAt(int j, float f, float wl, float kDepth, float fanW, out float hue) {
  vec4 S = u_sheet[j];
  vec3 base = sheetColour(S.y, S.z);
  hue = lch(base).z;
  vec2 pr = mix(profileK(1.0 - f), profileK(f), wl);
  pr.x = mix(pr.x, 1.0, fanW);   // fan blades: open gaps instead of dark ones
  float boost = base.x > 0.85 ? 1.6 : 1.0;
  vec3 c = shadeC(base, pr.x * kDepth);
  return vec3(c.x + pr.y * boost * kDepth, c.yz);
}

vec3 wallpaper(vec2 p) {
  float px = 1.0 / min(u_resolution.x, u_resolution.y);
  float hx = max(u_aspect, 1.0) * 0.5;
  vec2 q = vec2(u_look.x * p.x, p.y);
  float faces = u_faceAux.y;

  // Background: a faint glow on the entry side.
  vec3 col = mix(u_bgFar, u_bgNear, sstep(hx, -hx, q.x));
  float hue = lch(u_bgNear).z;

  // The stack lookup (also places the faces).
  float u, v, width, segLen; vec2 nrm;
  bool found = stackCoord(q, u, v, width, nrm, segLen);

  // Faces, behind the stack (layout.ts faceAt): off the stack on the face's side, within its height; e is the
  // distance from the stack's edge, so the outline runs parallel to the stack.
  float cover = min(1.0, faces);
  if (found) {
    vec2 fh = faceHeights(u);
    // Each face carries on under the outer half of the stack (review: stopping at the edge let the stack's edge
    // blend with background, a dark seam, and showed a hard line through the fan's gaps); its shading uses the
    // distance beyond the edge, clamped at 0. Coverage also fades with the local height, so the tips taper.
    float eFace = max(0.0, -v * width), eFloor = max(0.0, (v - 1.0) * width);
    float onFace = (v < 0.5 ? 1.0 : 0.0) * (1.0 - sstep(-px, px, eFace - fh.x)) * sstep(0.0, px, fh.x) * cover;
    if (onFace > 0.0) {
      vec3 fc = u_face;
      fc.x *= 1.0 + u_shade2.x * (2.0 * clamp(eFace / max(fh.x, 1e-6), 0.0, 1.0) - 1.0);   // lighter away from the stack
      fc.x += 0.06 * (1.0 - sstep(0.004, 0.004 + px, fh.x - eFace));          // a crisp rim on the leaf's edge
      col = mix(col, fc, onFace);
      hue = lch(u_face).z;
    }
    float onFloor = (v > 0.5 ? 1.0 : 0.0) * (1.0 - sstep(-px, px, eFloor - fh.y)) * sstep(0.0, px, fh.y) * cover;
    if (onFloor > 0.0) {
      float x = clamp(eFloor / max(fh.y, 1e-6), 0.0, 1.0);
      vec3 fc = u_floor;
      fc.x *= mix(0.6, 1.0, sstep(0.0, 0.25, x));   // in the stack's shadow near it
      fc = mix(fc, u_light, 0.2 * u_floorAux.z * exp(-0.5 * ((x - u_floorAux.x) / 0.08) * ((x - u_floorAux.x) / 0.08)));
      col = mix(col, fc, onFloor);
      hue = lch(u_floor).z;
    }
  }

  // The stack.
  if (found) {
    float fanW = u < u_fan.x ? (1.0 - u / u_fan.x) * (1.0 - u / u_fan.x) : 0.0;
    float wf = width + u_fan.z * fanW;
    float vf = 0.5 + (v - 0.5) * width / wf;
    float dv = px / wf;   // one pixel in v
    if (vf > -dv && vf < 1.0 + dv) {
      int n = u_sheetCount;
      float rs;
      float vc = clamp(rippleV(u, clamp(vf, 0.0, 1.0), rs), 0.0, 0.999999);
      float dv0 = dv;
      dv *= rs;   // one pixel in the warped coordinate
      int j = sheetIndex(vc, n);
      float v0 = u_sheet[j].x, v1 = j + 1 < n ? u_sheet[j + 1].x : 1.0;
      float keep = 1.0 - u_fan.y * fanW;   // the fan opens a gap at the end of each sheet's slot
      float wpx = (v1 - v0) * keep / dv;   // the sheet's visible width in pixels

      float uCrest = u_look.z;
      float kDepth = mix(1.0, u_shade.x, vf * vf * exp(-((u - uCrest) / 0.1) * ((u - uCrest) / 0.1)))
                   * mix(u_shade.y, 1.0, sstep(0.25, 0.45, u));
      float lit = dot(nrm, normalize(LIGHT));
      float wl = sstep(-0.2, 0.2, lit);
      kDepth *= 1.0 + u_shade2.y * (sstep(-0.6, 0.9, lit) - 0.6);   // broad light: the stack's surface facing the light
      // Blade ends fade over a pixel or 0.004 of the stack's length, whichever is longer (crisp ends alias in the fan).
      float duPx = max(px / (segLen * float(SPINE_N - 1)), 0.004);

      // Four samples across the sheets within the pixel (spec §8): rims, sheet edges, fan gaps and blade ends blend.
      vec3 acc = vec3(0.0);
      float accCov = 0.0, sh = 0.0;
      for (int k = 0; k < 4; k++) {
        float vs = clamp(vc + dv * (float(k) - 1.5) * 0.25, 0.0, 0.999999);
        int js = sheetIndex(vs, n);
        float s0 = u_sheet[js].x, s1 = js + 1 < n ? u_sheet[js + 1].x : 1.0;
        float fss = (vs - s0) / (s1 - s0);
        float cov = (fss <= keep ? 1.0 : 0.0) * clamp((u - u_sheet[js].w) / duPx + 0.5, 0.0, 1.0);
        float hs;
        vec3 c = sheetAt(js, clamp(fss / keep, 0.0, 1.0), wl, kDepth, fanW, hs);
        acc += c * cov;
        accCov += cov;
        if (k == 1) sh = hs;
      }
      float hs0;
      vec3 sc = accCov > 0.0 ? acc / accCov : sheetAt(j, 0.5, wl, kDepth, fanW, hs0);
      float cov = accCov * 0.25;

      // Footprint filter: thin sheets fade to the exact box average over the pixel, shaded by depth.
      float thin = 1.0 - sstep(1.5, 3.0, wpx);
      if (thin > 0.0) {
        float lo2 = max(0.0, vc - 0.5 * dv), hi2 = min(1.0, vc + 0.5 * dv);
        // Exact box average over the sheets under the pixel (past 8 sheets, the first 8 stand in).
        // Each sheet counts by its own blade-end coverage, so ragged fan ends average instead of speckling.
        vec3 avg = vec3(0.0);
        float covered = 0.0;
        int k0 = sheetIndex(lo2, n);
        bool done = false;
        for (int k = 0; k < 8; k++) {
          int jj = k0 + k;
          if (jj >= n) { done = true; break; }
          float a0 = max(lo2, u_sheet[jj].x), a1 = min(hi2, jj + 1 < n ? u_sheet[jj + 1].x : 1.0);
          float w = max(0.0, a1 - a0) * clamp((u - u_sheet[jj].w) / duPx + 0.5, 0.0, 1.0);
          avg += w * sheetMean(jj);
          covered += w;
          if (a1 >= hi2) { done = true; break; }
        }
        float thinCov = keep;
        if (done) {
          avg /= max(1e-6, covered);
          thinCov = keep * covered / max(1e-6, hi2 - lo2);
        } else {
          // More than 8 sheets under the pixel: the first 8 stand in for the rest.
          avg /= max(1e-6, covered);
        }
        sc = mix(sc, shadeC(avg, kDepth), thin);
        cov = mix(cov, thinCov, thin);
      }
      // Sheen on the descent.
      vec2 sd2 = (q - u_sheen.xy) / u_sheen.z;
      sc = mix(sc, u_light, u_shade.z * u_sheen.w * exp(-dot(sd2, sd2)));

      // Coverage: the stack's own edges, the samples' share of blade (fan gaps, ragged ends), the fan's translucency.
      float edge = clamp(min(vf, 1.0 - vf) / dv0 + 0.5, 0.0, 1.0);
      float alpha = mix(u_shade.w, 1.0, sstep(0.0, u_fan.x, u));
      float a = edge * cov * alpha;
      col = mix(col, sc, a);
      if (a > 0.5) hue = sh;
    }
  }
  return fromOklab(strataGuard(col, hue));
}
`,Wn={background:`Background`,light:`Light`,cool:`Cool`,accent:`Accent`,warm:`Warm`},Gn=e=>({kind:`color`,id:e,label:Wn[e],default:en[e],...$t[e]}),Kn={sheets:1,bend:1,faces:1,grain:.06},qn=(e,t,n)=>({id:e,label:t,values:{...n,...Kn}}),Jn={id:`strata`,name:`Strata`,era:`2020s`,version:1,params:[...Qt.map(Gn),{kind:`range`,id:`sheets`,label:`Sheets`,min:.6,max:1.4,step:.01,default:1},{kind:`range`,id:`bend`,label:`Bend`,min:.6,max:1.4,step:.01,default:1},{kind:`range`,id:`faces`,label:`Faces`,min:0,max:1.5,step:.01,default:1},S(.06)],presets:[qn(`sunset`,`Sunset`,en),qn(`lagoon`,`Lagoon`,tn),qn(`berry`,`Berry`,nn)],fragment:Un,uniforms(e,t,n){return Hn(e,Vn(t,n,{sheets:Number(e.sheets),bend:Number(e.bend)}))}},Yn=`uniform vec3 u_field;      // the teal sky
uniform vec3 u_fieldTop;   // darker, the top corner away from the warm glow
uniform vec3 u_fieldMid;   // lighter, lower down and toward the cool side
uniform vec3 u_warm;       // floor corner on the sweep's side
uniform vec3 u_cool;       // the other floor corner, and the rise
uniform vec3 u_threads;    // lit edges and threads
uniform vec3 u_hot;        // the white-hot floor streak
uniform float u_mirror;    // +1: the sweep enters from the left
uniform vec2 u_sweep[4];   // lit edges, cubic Bézier control points
uniform vec2 u_rise[4];
uniform vec2 u_sweepW;     // sheet width at t = 0 and t = 1
uniform vec2 u_riseW;
uniform float u_sweepSide; // which side of its lit edge each sheet lies on
uniform float u_riseSide;
uniform vec2 u_cross;
uniform vec4 u_curtain[6]; // x, slant, half-width, strength
uniform vec3 u_streak[5];  // y at x = 0, slope, half-width
uniform float u_count;
uniform float u_curtains;
uniform float u_shine;

#define SAMPLES 40

vec2 bez(vec2 a, vec2 b, vec2 c, vec2 d, float t) {
  float u = 1.0 - t;
  return u * u * u * a + 3.0 * u * u * t * b + 3.0 * u * t * t * c + t * t * t * d;
}

// Nearest point on a cubic edge (the spine search of the shared ribbon engine): (signed distance, t).
vec2 spine(vec2 p, vec2 a, vec2 b, vec2 c, vec2 d) {
  float best = 1e9, bestT = 0.0, bestS = 1.0;
  vec2 prev = a;
  for (int k = 1; k <= SAMPLES; k++) {
    float t = float(k) / float(SAMPLES);
    vec2 cur = bez(a, b, c, d, t);
    vec2 ab = cur - prev;
    float h = clamp(dot(p - prev, ab) / max(dot(ab, ab), 1e-9), 0.0, 1.0);
    vec2 e = p - prev - ab * h;
    float dd = dot(e, e);
    if (dd < best) {
      best = dd;
      bestT = (float(k - 1) + h) / float(SAMPLES);
      bestS = sign(ab.x * e.y - ab.y * e.x);
    }
    prev = cur;
  }
  return vec2(sqrt(best) * (bestS == 0.0 ? 1.0 : bestS), bestT);
}

// OKLCh blend (as in Crescent): far-apart colours meet through saturated hues, never grey. Takes the
// shorter way round unless that passes the middle of the yellow/olive band (92.5 degrees).
vec3 mixLch(vec3 a, vec3 b, float t) {
  vec3 x = toOklab(a), y = toOklab(b);
  float cx = length(x.yz), cy = length(y.yz);
  float hx = atan(x.z, x.y), hy = atan(y.z, y.y);
  if (cx < 0.02) hx = hy;
  if (cy < 0.02) hy = hx;
  float dh = mod(hy - hx + 3.14159265, 6.28318531) - 3.14159265;
  float toMid = mod(radians(92.5) - hx + 3.14159265, 6.28318531) - 3.14159265;
  if (toMid * dh > 0.0 && abs(toMid) < abs(dh)) dh -= sign(dh) * 6.28318531;
  float h = hx + dh * t, c = mix(cx, cy, t);
  return fromOklab(vec3(mix(x.x, y.x, t), c * cos(h), c * sin(h)));
}

// Toward a light, near-white colour: lightness moves linearly, chroma only late (t^2), so the way up
// stays coloured instead of passing through grey.
vec3 lighten(vec3 a, vec3 b, float t) {
  t = clamp(t, 0.0, 1.0);
  vec3 x = toOklab(a), y = toOklab(b);
  float cx = length(x.yz), cy = length(y.yz);
  vec2 dir = cx > 1e-4 ? x.yz / cx : (cy > 1e-4 ? y.yz / cy : vec2(1.0, 0.0));
  return fromOklab(vec3(mix(x.x, y.x, t), dir * mix(cx, cy, t * t)));
}

// Hue in degrees, 0..360.
float hueOf(vec3 lab) { return mod(degrees(atan(lab.z, lab.y)) + 360.0, 360.0); }

// The yellow rule's last guard, whatever blend produced the colour: hue 60-140 is kept only where it
// reads as light (fully guarded below L 0.78, released by 0.82); below L 0.6, 35-150 is kept clear too.
// The hue turns toward green (152), or for dark oranges back to 32, keeping chroma. Smooth in lightness.
// In hue the two directions part at 58 degrees: any smooth turn there would pass through the band, so
// the hue switches over and chroma dips within 2 degrees of the split to hide the step.
vec3 unYellow(vec3 c) {
  vec3 lab = toOklab(max(c, 0.0));
  float C = length(lab.yz);
  if (C < 1e-4) return c;
  float h = hueOf(lab);
  float midL = 1.0 - smoothstep(0.78, 0.82, lab.x);
  float darkL = 1.0 - smoothstep(0.56, 0.6, lab.x);
  float green = step(58.0, h) * step(h, 152.0) * midL;
  float orange = smoothstep(32.0, 35.0, h) * (1.0 - step(58.0, h)) * darkL;
  float h2 = radians(mix(mix(h, 152.0, green), 32.0, orange));
  C *= 1.0 - 0.8 * (1.0 - smoothstep(0.0, 2.0, abs(h - 58.0))) * midL;
  return fromOklab(vec3(lab.x, C * cos(h2), C * sin(h2)));
}

// One fanned bundle of glass threads, added as light. a..d: the lit edge; W: sheet width at its ends.
vec3 bundle(vec3 col, vec2 p, vec2 a, vec2 b, vec2 c, vec2 d, vec2 W, float side, vec3 tcol, vec2 ends, float px, float halo, float grow) {
  vec2 st = spine(p, a, b, c, d);
  float t = st.y;
  // The sheet's coloured air: the field around the edge takes the threads' hue (lightness kept).
  vec3 lab = toOklab(col), tl = toOklab(tcol);
  float k = halo * exp(-abs(st.x - 0.5 * side * mix(W.x, W.y, smoothstep(0.0, grow, t))) / 0.12) * smoothstep(0.0, 0.05, t) * (1.0 - smoothstep(0.7, 1.0, t));
  col = mixLch(col, fromOklab(vec3(lab.x, tl.yz * 0.75)), k);   // along the hue arc: never through grey
  float w = mix(W.x, W.y, smoothstep(0.0, grow, t));     // full width by t = grow
  float u = st.x * side / w;                       // 0 at the lit edge, 1 at the far edge
  float fade = smoothstep(0.0, 0.03, t) * (1.0 - smoothstep(ends.x, ends.y, t));
  // The lit edge: a thin bright line, at least ~1 px.
  float lw = max(0.0012, px);
  float edge = exp(-abs(st.x) / lw);
  // Threads: evenly spaced lines across the sheet, ~1 px wide (a partition of unity, so their sum
  // never beats). Closer than ~3 px they crossfade to their mean, an even sheen.
  float fw = u_count * px / w;                     // thread spacings per pixel
  float f = abs(fract(u * u_count + 0.5) - 0.5) / fw;
  float line = 1.0 - smoothstep(0.0, 1.0, f);
  float thr = mix(min(fw, 1.0), line, smoothstep(1.5, 3.5, 1.0 / fw));
  float inside = smoothstep(-0.5 * fw / u_count, 0.0, u) * (1.0 - smoothstep(0.9, 1.0, u));
  float I = (exp(-1.6 * max(u, 0.0)) * (0.9 * thr + 0.1) * inside + 1.8 * edge) * fade;   // max: exp would overflow to NaN far out on the unlit side
  // Added as light: lightness as if added in RGB, colour along the hue arc (adding RGB light of a
  // far-apart hue greys the mix).
  float amt = I * 0.6;
  vec3 hc = toOklab(mixLch(col, tcol, clamp(1.5 * amt, 0.0, 1.0)));
  return fromOklab(vec3(toOklab(col + tcol * amt).x, hc.yz));
}

vec3 wallpaper(vec2 p) {
  float hx = 0.5 * max(u_aspect, 1.0), hy = 0.5 * max(1.0 / u_aspect, 1.0);
  float px = 1.0 / min(u_resolution.x, u_resolution.y);
  float xs = p.x * u_mirror;                       // positive toward the cool side
  float up = (p.y + hy) / (2.0 * hy);              // 0 at the bottom, 1 at the top

  // 1. Field: darker toward the top corner away from the warm glow, lighter lower down on the cool side.
  float top = 1.0 - smoothstep(0.0, 0.6, length((vec2(xs, p.y) - vec2(hx, hy)) / vec2(2.0 * hx, 2.0 * hy)));
  vec3 col = mixLch(u_field, u_fieldTop, top);
  float mid = smoothstep(0.85, 0.25, up) * smoothstep(-0.8, 0.8, xs / hx);
  col = mixLch(col, u_fieldMid, 0.85 * mid);

  // 2. Curtains: soft, slightly slanted vertical bands of light, fading out below the crossing.
  float lift = 0.0;
  for (int i = 0; i < 6; i++) {
    vec4 c = u_curtain[i];
    float dx = (p.x - c.x - c.y * p.y) / c.z;
    lift += 0.16 * c.w * exp(-dx * dx);
  }
  lift *= u_curtains * smoothstep(u_cross.y - 0.02, u_cross.y + 0.3, p.y);
  vec3 lab = toOklab(col);
  col = fromOklab(vec3(lab.x + min(lift, 0.12), lab.yz));

  // 3. Corner glows: warm on the sweep's side, cool on the other, rising from the floor.
  // Measured: warm reaches 0.6 of the height on its side, cool about 0.4; the hue turns from warm to
  // cool mostly on the cool half.
  float side = smoothstep(-0.25, 0.8, xs / hx);
  vec3 glow = mixLch(u_warm, u_cool, side);
  float g = (1.0 - smoothstep(0.05, 0.62 - 0.2 * smoothstep(-0.8, 0.0, xs / hx), up)) * mix(1.0, 0.85, side);
  col = mixLch(col, glow, 0.97 * g);

  // 4. Floor streaks: thin soft lines lightening toward the glow beneath them; the white-hot streak
  // just below the crossing.
  vec3 glowHi = lighten(glow, u_hot, 0.5);
  float slope = u_streak[0].y;
  for (int i = 0; i < 5; i++) {
    vec3 s = u_streak[i];
    float dy = (p.y - s.x - s.y * p.x) / s.z;
    col = lighten(col, glowHi, 0.6 * u_shine * exp(-dy * dy) * smoothstep(0.75, 0.2, up));
  }
  vec2 hc = u_cross + vec2(-0.15 * u_mirror, -0.1);
  float along = (p.x - hc.x) / 0.2;
  float across = p.y - hc.y - slope * (p.x - hc.x);
  float reach = exp(-along * along * along * along);
  float hot = reach * (exp(-abs(across) / max(0.012, px)) + 0.5 * exp(-across * across / 0.0025));
  col = lighten(col, u_hot, min(1.0, 1.2 * u_shine * hot));

  // 5. Bundles: fanned threads, lit from their edge, added as light.
  float floorNear = smoothstep(u_cross.y + 0.3, u_cross.y, p.y);
  vec3 sweepCol = mixLch(u_threads, u_warm, 0.45 * floorNear);
  vec3 riseCol = mixLch(u_threads, u_cool, 0.35 + 0.3 * floorNear);
  col = bundle(col, p, u_sweep[0], u_sweep[1], u_sweep[2], u_sweep[3], u_sweepW, u_sweepSide, sweepCol, vec2(0.85, 1.0), px, 0.6, 0.5);
  col = bundle(col, p, u_rise[0], u_rise[1], u_rise[2], u_rise[3], u_riseW, u_riseSide, riseCol, vec2(0.8, 1.0), px, 0.0, 1.0);
  return unYellow(col);
}
`,Xn=[60,140],Zn=[35,150],Qn=.8;function $n(e){let t=Math.min(1,Math.max(0,e.l)),n=(e.h%360+360)%360;if(t<.6){let e=Zn[0]-3,t=Zn[1]+3;n>e&&n<t&&(n=n-e<t-n?e:t)}else t<Qn&&n>Xn[0]&&n<Xn[1]&&(n=153);let r=t<.6?Zn:Xn,i=Math.max(0,e.c);for(let e=0;e<40;e++){let e=u(f({l:t,c:i,h:n})),a=e.l<Qn&&e.c>=.03&&e.h>r[0]&&e.h<r[1];if(Math.abs(e.l-t)<.01&&Math.abs(e.c-i)<.01&&!a)break;i*=.93}return f({l:t,c:i,h:n})}function er(e){let t=t=>String(e[t]),n=u(t(`field`)),r=u(t(`warm`)),i=(u(t(`cool`)).h-n.h+540)%360-180;return{field:t(`field`),fieldTop:$n({l:n.l-.05,c:n.c,h:n.h}),fieldMid:$n({l:n.l+.1,c:n.c,h:n.h+.25*i}),warm:t(`warm`),cool:t(`cool`),threads:t(`threads`),hot:$n({l:.99,c:Math.min(.025,r.c),h:r.h})}}var tr=.8,nr=[.35,-.3],rr=[[-.593,.169],[.005,-.307]],ir=[[.777,.302],[.641,-.315]],ar=.8;function or(e,t,n){let r=Math.max(n,1)/2,i=Math.max(1/n,1)/2,a=r/tr,o=e=>e*(2*t()-1),s=t()<.5?1:-1,c=(nr[0]+o(.08))*a,l=-i+(n<1?.25:.2)*2*i+o(.03),u=l-nr[1],d=e=>[e[0]*a+o(.04),e[1]+u+o(.04)],f=e=>[e[0]*s,e[1]],p=[[-r,Math.min(l+.72,i-.05)],d(rr[0]),d(rr[1]),[c,l+.03]],m=[[ar*a,i+.03],d(ir[0]),d(ir[1]),[c,l-.06]],h=Array.from({length:6},(e,n)=>[(2*t()-1)*r,o(.08),n===0?.005+.005*t():.02+.04*t(),.4+.6*t()]),g=Array.from({length:5},(e,n)=>[l-.15+.23*(n+t())/5,s*(-.12+o(.035)),.004+.026*t()]);return{mirror:s,sweep:{edge:p.map(f),w:[.02,.15],side:-s},rise:{edge:m.map(f),w:[.06,.12],side:s},cross:f([c,l]),curtains:h,streaks:g}}function sr(e,t){let n=er(e),r=Number(e.fan);return{u_field:i(n.field),u_fieldTop:i(n.fieldTop),u_fieldMid:i(n.fieldMid),u_warm:i(n.warm),u_cool:i(n.cool),u_threads:i(n.threads),u_hot:i(n.hot),u_mirror:t.mirror,u_sweep:{vec2Array:t.sweep.edge.flat()},u_rise:{vec2Array:t.rise.edge.flat()},u_sweepW:[t.sweep.w[0]*r,t.sweep.w[1]*r],u_riseW:[t.rise.w[0]*r,t.rise.w[1]*r],u_sweepSide:t.sweep.side,u_riseSide:t.rise.side,u_cross:t.cross,u_curtain:{vec4Array:t.curtains.flat()},u_streak:{vec3Array:t.streaks.flat()},u_count:Number(e.count),u_curtains:Number(e.curtains),u_shine:Number(e.shine)}}var cr={curtains:.5,count:24,fan:1,shine:.7,grain:.15},lr=(e,t,n,r,i,a)=>({id:e,label:t,values:{field:n,warm:r,cool:i,threads:a,...cr}}),ur={id:`lumen`,name:`Lumen`,era:`2000s`,version:1,params:[{kind:`color`,id:`field`,label:`Field`,default:`#017b80`,l:[.4,.6],c:[.05,.12],excludeHue:Zn},{kind:`color`,id:`warm`,label:`Warm glow`,default:`#ebd732`,l:[.8,.94],c:[.08,.18]},{kind:`color`,id:`cool`,label:`Cool glow`,default:`#5ffcff`,l:[.8,.94],c:[.08,.16]},{kind:`color`,id:`threads`,label:`Threads`,default:`#1ab25e`,l:[.6,.8],c:[.1,.2],excludeHue:Xn},{kind:`range`,id:`curtains`,label:`Curtains`,min:0,max:1,step:.01,default:.5},{kind:`range`,id:`count`,label:`Threads`,min:12,max:40,step:1,default:24},{kind:`range`,id:`fan`,label:`Fan`,min:.6,max:1.4,step:.01,default:1},{kind:`range`,id:`shine`,label:`Shine`,min:0,max:1,step:.01,default:.7},S(.15)],presets:[lr(`teal`,`Teal`,`#017b80`,`#ebd732`,`#5ffcff`,`#1ab25e`),lr(`dusk`,`Dusk`,`#2e4b83`,`#f8a5dd`,`#78eaff`,`#b28fef`),lr(`rose`,`Rose`,`#81385e`,`#ffa48a`,`#ffcde4`,`#f2798f`)],fragment:Yn,uniforms(e,t,n){return sr(e,or(e,w(t^108521),n))}},dr=[`field`,`falling`,`rising`,`top`,`bar`],fr={field:{l:[.1,.3],c:[0,.15],excludeHue:[35,150]},falling:{l:[.6,.8],c:[.1,.26],excludeHue:[60,140]},rising:{l:[.4,.75],c:[.1,.3],excludeHue:[35,150]},top:{l:[.6,.85],c:[.08,.22],excludeHue:[60,140]},bar:{l:[.6,.85],c:[.1,.24],excludeHue:[60,140]}},pr=[`field`,`falling`,`rising`,`top`,`bar`,`fallingRising`,`barTop`,`fallingLeft`,`fallingBar`,`topLeft`,`topRight`,`leftFace`,`rightFace`],mr={field:[`field`],falling:[`falling`],rising:[`rising`],top:[`top`],bar:[`bar`],fallingRising:[`falling`,`rising`],barTop:[`bar`,`top`],fallingLeft:[`falling`],fallingBar:[`falling`,`bar`],topLeft:[`falling`,`rising`],topRight:[`falling`,`top`,`bar`],leftFace:[`falling`,`rising`],rightFace:[`falling`,`rising`,`bar`]},hr={field:`#17064a`,falling:`#ed064a`,rising:`#6807f9`,top:`#00c0f8`,bar:`#52cf3a`},gr={...hr,fallingRising:`#ed06f9`,barTop:`#52cff8`,fallingLeft:`#ff8644`,fallingBar:`#e4e765`,topLeft:`#f8b3f9`,topRight:`#ffffff`,leftFace:`#ff86f8`,rightFace:`#d2d2d2`},_r=.005,vr=(e,t)=>((t-e)%360+540)%360-180,yr=e=>(e%360+360)%360,br=(e,t,n)=>Math.min(1,Math.max(0,(e-t)/(n-t)));function xr(e,t,n){if(e>=t&&e<=n)return 1;let r=Math.min(Math.abs(vr(e,t)),Math.abs(vr(e,n)));return Math.max(0,1-r/8)}function Sr(e,t){let n=mr[e].map(e=>i(t[e]));return l([0,1,2].map(e=>Math.max(...n.map(t=>t[e]))))}var Cr={};for(let e of pr.slice(5)){let t=Sr(e,hr),n=u(gr[e]),r=n.c>=_r;Cr[e]={a:(n.l-t.l)/(1-t.l),k:r?n.c/t.c:0,dh:r?vr(t.h,n.h):0}}function wr(e,t,n){if(d(c({l:e,c:t,h:n})))return t;let r=0,i=t;for(let t=0;t<30;t++){let t=(r+i)/2;d(c({l:e,c:t,h:n}))?r=t:i=t}return r}function Tr(e,t,n=0){let r=Sr(e,t),i=Cr[e],a=yr(r.h+i.dh),o=r.c*i.k,s=Math.max(...mr[e].map(e=>u(t[e]).l)),c=Math.max(r.l+i.a*(1-r.l),s,n);return c+=xr(a,60,140)*br(o,.01,.04)*Math.max(0,.8-c),c+=xr(a,35,60)*br(o,.01,.04)*Math.max(0,.6-c),c=Math.min(1,c),o=wr(c,o,a),c=Math.min(1,c+(1-br(o,.03,.05))*Math.max(0,.82-c)),{l:c,c:wr(c,o,a),h:a}}function Er(e){let t={};for(let n of dr)t[n]=u(e[n]);for(let n of[`fallingRising`,`barTop`,`fallingLeft`,`fallingBar`,`leftFace`,`rightFace`])t[n]=Tr(n,e);return t.topLeft=Tr(`topLeft`,e,t.leftFace.l+.02),t.topRight=Tr(`topRight`,e,t.rightFace.l+.02),t}function Dr(e){let t=Er(e);return pr.flatMap(e=>c(t[e]).map(e=>Math.min(1,Math.max(0,e))))}var Or=(e,t,n)=>Math.min(n,Math.max(t,e));function kr(e,t,n){let r=Math.max(n,1)/2,i=Math.max(1/n,1)/2,a=Number(e.size),o=t()<.5?1:-1,s=Math.tan(Number(e.angle)*Math.PI/180),c=.256*a,l=.221*a,u=Or((.39+.06*(2*t()-1))*r,-r+l+.03,r-l-.03),d=Math.min(Number(e.height)*i+.03*(2*t()-1),i-.03),f=c/(2*s)+(.25+.3*t())*a,p=2*s*l+(.03+.13*t())*a;return{mirror:o,apex:[u,d],slope:s,thick:c,half:l,cap:f,bar:p}}function Ar(e,t,n){return kr(e,w(t^368990),n)}var jr=`// Prism (spec §5): flat bands in three directions crossing in a cube. The shader only decides
// which cell each sub-sample is in; the colours come from palette.ts via u_cells.
uniform vec3 u_cells[13];   // CELLS order: field, falling, rising, top, bar, fallingRising, barTop,
                            // fallingLeft, fallingBar, topLeft, topRight, leftFace, rightFace
uniform float u_mirror;     // +1: cube right of centre, as in the original
uniform vec2 u_apex;        // local frame: where the two bands' top edges cross
uniform float u_slope;      // tan(angle)
uniform float u_thick;      // vertical thickness of both bands
uniform float u_half;       // column half-width
uniform float u_cap;        // x distance from the apex to the rising band's cap corner
uniform float u_bar;        // bar length below the cube's bottom corner

const int FIELD = 0, FALLING = 1, RISING = 2, TOP = 3, BAR = 4, FALLING_RISING = 5, BAR_TOP = 6,
          FALLING_LEFT = 7, FALLING_BAR = 8, TOP_LEFT = 9, TOP_RIGHT = 10, LEFT_FACE = 11, RIGHT_FACE = 12;

int cellAt(vec2 p) {
  vec2 d = vec2(p.x * u_mirror, p.y) - u_apex;
  float s = u_slope, w = u_half, T = u_thick;
  float fTop = -s * d.x;                 // falling band's top edge
  float rTop = s * d.x;                  // rising band's top edge
  bool inR = d.y <= fTop && d.y > fTop - T;
  bool inU = d.y <= rTop && d.y > rTop - T && d.y + s * (d.x + u_cap) + s * u_cap >= 0.0;
  bool inCol = abs(d.x) <= w;
  bool left = d.x < 0.0;
  bool inBar = d.x >= 0.0 && d.x <= w && d.y >= -T - u_bar + s * d.x;

  if (inR && inU && inCol) {
    bool topFace = d.y > -2.0 * s * w + s * abs(d.x);
    return topFace ? (left ? TOP_LEFT : TOP_RIGHT) : (left ? LEFT_FACE : RIGHT_FACE);
  }
  if (inR && inU) return FALLING_RISING;
  if (inR && inCol) return left ? FALLING_LEFT : (inBar ? FALLING_BAR : FALLING);
  if (inR) return FALLING;
  if (inU && inBar) return BAR_TOP;
  if (inU) return (!left && d.y > rTop - 2.0 * s * w) ? TOP : RISING;
  if (inBar) return BAR;
  return FIELD;
}

vec3 wallpaper(vec2 p) {
  // 4x4 sub-samples per output pixel, offsets fixed in global pixel space (seamless across tiles).
  float px = 1.0 / min(u_resolution.x, u_resolution.y);
  vec3 acc = vec3(0.0);
  for (int j = 0; j < 4; j++) {
    for (int i = 0; i < 4; i++) {
      vec2 o = ((vec2(float(i), float(j)) + 0.5) / 4.0 - 0.5) * px;
      acc += u_cells[cellAt(p + o)];
    }
  }
  return acc / 16.0;
}
`,Mr={field:`Field`,falling:`Falling band`,rising:`Rising band`,top:`Top band`,bar:`Bar`},Nr=e=>({kind:`color`,id:e,label:Mr[e],default:hr[e],...fr[e]});function Pr(e,t){return{u_cells:{vec3Array:Dr(Object.fromEntries(dr.map(t=>[t,String(e[t])])))},u_mirror:t.mirror,u_apex:t.apex,u_slope:t.slope,u_thick:t.thick,u_half:t.half,u_cap:t.cap,u_bar:t.bar}}var Fr={size:1,height:.61,angle:17.2,grain:0},Ir=(e,t,n,r,i,a,o)=>({id:e,label:t,values:{field:n,falling:r,rising:i,top:a,bar:o,...Fr}}),Lr={id:`prism`,name:`Prism`,era:`2010s`,version:1,params:[...dr.map(Nr),{kind:`range`,id:`size`,label:`Size`,min:.8,max:1.25,step:.01,default:1},{kind:`range`,id:`height`,label:`Height`,min:.3,max:.8,step:.01,default:.61},{kind:`range`,id:`angle`,label:`Angle`,min:12,max:24,step:.1,default:17.2},S(0)],presets:[Ir(`indigo`,`Indigo`,`#17064a`,`#ed064a`,`#6807f9`,`#00c0f8`,`#52cf3a`),Ir(`midnight`,`Midnight`,`#020511`,`#397be9`,`#009b95`,`#70d5ed`,`#b093e5`),Ir(`coral`,`Coral`,`#30042e`,`#f36451`,`#de4181`,`#6bc3f4`,`#ffac6e`)],fragment:jr,uniforms(e,t,n){return Pr(e,Ar(e,t,n))}},Rr=e=>(e%360+360)%360,zr=e=>Math.min(1,Math.max(0,e)),Br=(e,t,n)=>e+(t-e)*n;function Vr(e,t,n,r){let i=Math.min(e,e+t),a=Math.max(e,e+t),o=0;for(let e=-2;e<=2;e++)o+=Math.max(0,Math.min(a,r+360*e)-Math.max(i,n+360*e));return o}function Hr(e,t,n){let r=Rr(t-e),i=r===0?[0]:[r,r-360];return i.sort((t,r)=>Vr(e,t,...n)-Vr(e,r,...n)||Math.abs(t)-Math.abs(r)),i[0]}function Ur(e,t,n,r){if(Rr(e)>n&&Rr(e)<r)return 0;if(t===0)return null;let i=null;for(let a=-2;a<=2;a++){let o=((t>0?n+360*a:r+360*a)-e)/t;o>=0&&o<1&&(i===null||o<i)&&(i=o)}return i}var Wr=e=>zr((e-.02)/.02);function Gr(e){if(d(c(e)))return e;let t=0,n=e.c;for(let r=0;r<30;r++){let r=(t+n)/2;d(c({...e,c:r}))?t=r:n=r}return{...e,c:t}}function Kr(e,t,n,r,i,a){let o=Wr(e.c),s=Wr(t.c),c=o===0?t.h:e.h,l=Hr(c,s===0?e.h:t.h,n),u=c+(1-o)*l,d=l*Math.max(0,o+s-1),f=r?a.hueEase:1,p=null,m=0,h=0;if(r&&t.l>e.l){m=(a.brownMaxL-e.l)/(t.l-e.l),h=m>0?m**f:0;let n=Ur(u,d,...a.brown);n!==null&&m>0&&m<1&&n<h&&(p=n)}return i.map(n=>{let i=n**f;p!==null&&(i=n<=m?Math.min(i,p):p+(1-p)*(i-h)/(1-h));let o=r?n:1-(1-n)**a.chromaEase;return Gr({l:Br(e.l,t.l,n),c:Br(e.c,t.c,o),h:Rr(u+d*i)})})}function qr(e,[t,n]){return e.c<.02||e.h<=t||e.h>=n?e:{...e,h:e.h-t<n-e.h?t:n}}function Jr(e,t,n,r){let[i,a,o]=[qr(e,r.snap[0].excludeHue),qr(t,r.snap[1].excludeHue),qr(n,r.snap[2].excludeHue)],s=(r.size-1)/2,c=Array.from({length:s+1},(e,t)=>t/s),l=Kr(i,a,r.lowBand,!1,c,r),u=Kr(a,o,r.highBand,!0,c,r);return[...l,...u.slice(1)]}function Yr(e){return e.flatMap(e=>c(e).map(e=>Math.min(1,Math.max(0,e))))}var Xr=[`deep`,`body`,`highlight`],Zr={deep:{l:[.1,.28],c:[0,.12],excludeHue:[35,150]},body:{l:[.38,.6],c:[.1,.26],excludeHue:[35,150]},highlight:{l:[.66,.92],c:[.03,.18],excludeHue:[60,140]}},Qr={deep:`#050c29`,body:`#063ad7`,highlight:`#0cc1fd`},$r={size:33,lowBand:Zr.deep.excludeHue,highBand:Zr.highlight.excludeHue,snap:[Zr.deep,Zr.body,Zr.highlight],hueEase:1.8,chromaEase:1.3,brown:[32,60],brownMaxL:.6};function ei(e){return Jr(u(e.deep),u(e.body),u(e.highlight),$r)}function ti(e){return Yr(ei(e))}function ni(e,t){let n=Math.max(t,1)/2,r=(e()<.5?-1:1)*.1*e()*n,i=(e()<.5?-1:1)*.06*e(),a=Array.from({length:6},()=>[1+Math.floor(10*e()),.2+.8*e(),2*Math.PI*e()]);return{centre:[r,i],waves:a}}function ri(e,t){return ni(w(e^238777),t)}var ii=`// Warp (spec §5): thin streaks bursting from a dark core. Light = radial envelope + broad sector
// waves + streaks from log-polar cells; the colour comes from the ramp built in palette.ts.
uniform vec3 u_ramp[33];      // light 0..1 in steps of 1/32, linear RGB
uniform vec2 u_centre;        // burst centre, p-space
uniform vec3 u_waves[6];      // sector waves: cycles (whole), amplitude, phase
uniform int u_sectorCount;    // streak sectors round the circle
uniform float u_length;       // streak length scale
uniform float u_density;      // Density slider (streak count scale)
uniform float u_core;         // radial envelope scale
uniform float u_sectors;      // sector wave strength
uniform float u_env[17];      // envelope light at r = 0, 0.05, ..., 0.80 (Core 1)

const float STEP = 0.12;          // log-radius cell size
const float PRESENCE = 0.7;       // chance a cell holds a streak
const int MIN_SECTORS = 24;       // sectors at the centre
const float FULL_R = 0.6;         // radius from which a cell has the full sector count (grows as (r / FULL_R)^SECTOR_POW)
const float SECTOR_POW = 1.4;
const float SIGMA = 0.0067;       // streak angular sigma, rad (0.9° FWHM)
const float LEN_MIN = 0.08;       // streak length / start radius: LEN_MIN + LEN_TAIL·h^LEN_POW
const float LEN_TAIL = 2.4;
const float LEN_POW = 2.0;
const float WIDE_MIN = 0.7;       // streak width factor (spec §4: FWHM p10 0.7°, p90 1.9°)
const float WIDE_TAIL = 2.0;
const float FADE_IN = 0.3;        // tapers along the streak, as fractions of its length
const float FADE_OUT = 0.4;
const float AMP_MIN = 0.07;       // streak light: AMP_MIN + AMP_TAIL·h^AMP_POW
const float AMP_TAIL = 0.2;
const float AMP_POW = 1.0;
const float STREAK_FAR = 0.6;     // streak strength far out, relative to the bright ring
const float INNER_BOOST = 1.2;    // extra streak strength near the core, where sectors are fewer
const float WINDOW = 2.5;         // streaks fade to zero between WINDOW_IN and WINDOW sigmas
const float WINDOW_IN = 2.0;
const int MAX_REACH = 12;         // neighbour sectors checked at most
const float THIN_TAIL = 0.3;      // thin streaks: width factor WIDE_MIN + THIN_TAIL·h
const int BROAD_EVERY = 4;        // broad streaks (WIDE_MIN + WIDE_TAIL·h², up to 2.7) only in every 4th sector
const float SECTOR_SCALE = 1.4;   // sector wave strength at Sectors 1 (scales all light)

float envAt(float r) {
  float x = clamp(r / u_core / 0.05, 0.0, 16.0);
  int i = int(floor(x));
  int j = min(i + 1, 16);
  return mix(u_env[i], u_env[j], x - float(i));
}

float sectorLight(float th) {
  float s = 0.0, n = 0.0;
  for (int k = 0; k < 6; k++) {
    s += u_waves[k].y * sin(u_waves[k].x * th + u_waves[k].z);
    n += u_waves[k].y;
  }
  return u_sectors * SECTOR_SCALE * s / max(n, 1e-6);
}

float h(uint a, uint b, uint salt) { return hash13(uvec3(a, b, pcg(u_seed) ^ salt)); }

// Sectors per radial cell: fewer near the centre, as in the original (38 streaks round r 0.1, 213
// round r 0.5), growing with the cell's radius up to the full count at FULL_R.
int sectorsAt(int i, int n) {
  float ri = exp(float(i) * STEP);
  // A multiple of BROAD_EVERY, so broad slots stay evenly spaced across the wrap at θ = 0.
  return max(MIN_SECTORS, BROAD_EVERY * int(floor(float(n) * pow(min(1.0, ri / FULL_R), SECTOR_POW) / float(BROAD_EVERY) + 0.5)));
}

// One cell's streak, added to the sharp and the sector-blurred sums.
void addStreak(int i, int j, float sector, bool broadSlot, float r, float th, float px, float densityScale,
               inout float sum, inout float wide) {
  uint ui = uint(i + 100000), uj = uint(j);
  if (h(uj, ui, 0x1u) > PRESENCE) return;
  float r0 = exp((float(i) + h(uj, ui, 0x2u)) * STEP);
  float len = r0 * u_length * (LEN_MIN + LEN_TAIL * pow(h(uj, ui, 0x3u), LEN_POW));
  float t = (r - r0) / len;
  if (t < 0.0 || t > 1.0) return;
  float ths = (float(j) + h(uj, ui, 0x4u)) * sector;
  float d = th - ths;
  d -= TAU * floor((d + PI) / TAU);                   // wrap to [-π, π)
  float hw = h(uj, ui, 0x6u);
  float sw = SIGMA * densityScale * (WIDE_MIN + (broadSlot ? WIDE_TAIL * hw * hw : THIN_TAIL * hw));   // angular sigma
  float s = max(sw, 0.5 * px / r);                    // never narrower than half a pixel
  float sWide = max(s, 0.6 * sector);                 // the same streak blurred to its sector's width
  float ad = abs(d);
  float across = exp(-0.5 * ad * ad / (s * s)) * (sw / s) * (1.0 - smoothstep(WINDOW_IN * s, WINDOW * s, ad));
  float acrossWide = exp(-0.5 * ad * ad / (sWide * sWide)) * (sw / sWide) * (1.0 - smoothstep(WINDOW_IN * sWide, WINDOW * sWide, ad));
  float along = smoothstep(0.0, FADE_IN, t) * (1.0 - smoothstep(FADE_OUT, 1.0, t));
  float amp = AMP_MIN + AMP_TAIL * pow(h(uj, ui, 0x5u), AMP_POW);
  sum += amp * across * along;
  wide += amp * acrossWide * along;
}

float streakLight(float r, float th, float px) {
  int i0 = int(floor(log(r) / STEP));
  // Cells inward that can still reach r: the longest streak ends at 1 + (LEN_MIN + LEN_TAIL)·Length
  // times its start radius, which is at least one cell inward of where its cell begins.
  int back = int(ceil(log(1.0 + (LEN_MIN + LEN_TAIL) * u_length) / STEP));
  float densityScale = 1.0 / u_density;              // streaks get finer as Density adds more of them
  float sum = 0.0, wide = 0.0;
  for (int di = 0; di <= back; di++) {
    int i = i0 - di;
    int n = sectorsAt(i, u_sectorCount);
    float sector = TAU / float(n);
    int j0 = int(floor(th / sector));
    // Each streak fades to zero by WINDOW sigmas, so it must be fully covered: a streak in sector
    // j0 ± k is at least (k − 1) sectors away. Every sector within thinReach is visited; beyond it,
    // only the broad slots (every BROAD_EVERY-th sector) up to broadReach.
    float thinMax = max(max(SIGMA * densityScale * (WIDE_MIN + THIN_TAIL), 0.5 * px / r), 0.6 * sector);
    float broadMax = max(SIGMA * densityScale * (WIDE_MIN + WIDE_TAIL), thinMax);
    int thinReach = min(MAX_REACH, int(ceil(WINDOW * thinMax / sector)) + 1);
    int broadReach = min(MAX_REACH, int(ceil(WINDOW * broadMax / sector)) + 1);
    for (int dj = -thinReach; dj <= thinReach; dj++) {
      int j = (j0 + dj + 2 * n) % n;
      addStreak(i, j, sector, j % BROAD_EVERY == 0, r, th, px, densityScale, sum, wide);
    }
    // Broad slots left of the thin range: the aligned j in [j0 − broadReach, j0 − thinReach − 1].
    int lo = j0 - broadReach + 2 * n, hi = j0 - thinReach - 1 + 2 * n;
    for (int k = lo + (BROAD_EVERY - lo % BROAD_EVERY) % BROAD_EVERY; k <= hi; k += BROAD_EVERY) addStreak(i, k % n, sector, true, r, th, px, densityScale, sum, wide);
    lo = j0 + thinReach + 1 + 2 * n; hi = j0 + broadReach + 2 * n;
    for (int k = lo + (BROAD_EVERY - lo % BROAD_EVERY) % BROAD_EVERY; k <= hi; k += BROAD_EVERY) addStreak(i, k % n, sector, true, r, th, px, densityScale, sum, wide);
  }
  // Where sectors are narrower than ~1.5 px the streaks cannot be resolved: fade to the same
  // streaks blurred to sector width (a local average). The sector count used for the fade is the
  // continuous one, so the fade never steps at a cell boundary.
  float nr = max(float(MIN_SECTORS), float(u_sectorCount) * pow(min(1.0, r / FULL_R), SECTOR_POW));
  float arc = TAU / nr * r;
  return mix(sum, wide, smoothstep(1.5 * px, 0.75 * px, arc));
}

vec3 rampAt(float light) {
  float x = clamp(light, 0.0, 1.0) * 32.0;
  int i = int(floor(x));
  int j = min(i + 1, 32);
  return mix(u_ramp[i], u_ramp[j], x - float(i));
}

vec3 wallpaper(vec2 p) {
  float px = 1.0 / min(u_resolution.x, u_resolution.y);
  vec2 d = p - u_centre;
  float r = length(d);
  float light = envAt(r);
  if (r > 1e-6) {
    float th = atan(d.y, d.x);
    if (th < 0.0) th += TAU;
    // Streaks rise out of the core and ease off outward (spec §4: the spread shrinks with the mean),
    // but never vanish, so wide frames keep dim streaks to their edges.
    float rc = r / u_core;
    float weight = smoothstep(0.0, 0.06, rc) * mix(1.0, STREAK_FAR, smoothstep(0.3, 0.8, rc))
                 * (1.0 + INNER_BOOST * (1.0 - smoothstep(0.05, 0.25, rc)));   // fewer, brighter streaks near the core
    light = (light + streakLight(r, th, px) * weight) * max(0.0, 1.0 + sectorLight(th) * smoothstep(0.0, 0.08, r));
  }
  return rampAt(light);
}
`,ai={deep:`Deep`,body:`Body`,highlight:`Highlight`},oi=e=>({kind:`color`,id:e,label:ai[e],default:Qr[e],...Zr[e]}),si=[0,.14,.3,.43,.48,.49,.46,.38,.3,.22,.15,.08,.03,.01,0,0,0];function ci(e,t){return{u_ramp:{vec3Array:ti(Object.fromEntries(Xr.map(t=>[t,String(e[t])])))},u_centre:t.centre,u_waves:{vec3Array:t.waves.flat()},u_sectorCount:{int:Math.round(800*Number(e.density))},u_length:Number(e.length),u_density:Number(e.density),u_core:Number(e.core),u_sectors:Number(e.sectors),u_env:{floatArray:si}}}var li={density:1,length:1,core:1,sectors:.7,grain:.15},ui=(e,t,n,r,i)=>({id:e,label:t,values:{deep:n,body:r,highlight:i,...li}}),di={id:`warp`,name:`Warp`,era:`2000s`,version:1,params:[...Xr.map(oi),{kind:`range`,id:`density`,label:`Density`,min:.5,max:1.6,step:.01,default:1},{kind:`range`,id:`length`,label:`Length`,min:.5,max:2,step:.01,default:1},{kind:`range`,id:`core`,label:`Core`,min:.5,max:2,step:.01,default:1},{kind:`range`,id:`sectors`,label:`Sectors`,min:0,max:1,step:.01,default:.7},S(.15)],presets:[ui(`blue`,`Blue`,Qr.deep,Qr.body,Qr.highlight),ui(`ember`,`Ember`,`#210104`,`#cc2b0e`,`#ffb98a`),ui(`violet`,`Violet`,`#11042f`,`#822cc4`,`#fca4d6`)],fragment:ii,uniforms(e,t,n){return ci(e,ri(t,n))}},fi=[`left`,`middle`,`right`,`floor`],pi={left:{l:[.48,.72],c:[.08,.24],excludeHue:[60,150]},middle:{l:[.62,.85],c:[.04,.16],excludeHue:[60,150]},right:{l:[.42,.68],c:[.08,.25],excludeHue:[60,150]},floor:{l:[.1,.26],c:[0,.12],excludeHue:[35,150]}},mi=5/8,hi=4/8,gi={left:`#2981fb`,middle:`#47c5d2`,right:`#5952e9`,floor:`#000b38`},_i=[60,150],vi=[35,150],yi=[35,60],bi=.55,xi=60.01,Si=.6,Ci=e=>(e%360+360)%360,wi=e=>Math.min(1,Math.max(0,e)),Ti=(e,t,n)=>e+(t-e)*n,Ei=(e,t)=>((t-e)%360+540)%360-180,Di=(e,t,n)=>wi((e-t)/(n-t));function Oi(e,t,n){if(e>=t&&e<=n)return 1;let r=Math.min(Math.abs(Ei(e,t)),Math.abs(Ei(e,n)));return Math.max(0,1-r/8)}function ki(e,t,n,r){let i=Math.min(e,e+t),a=Math.max(e,e+t),o=0;for(let e=-2;e<=2;e++)o+=Math.max(0,Math.min(a,r+360*e)-Math.max(i,n+360*e));return o}function Ai(e,t,n){let r=Ci(t-e),i=r===0?[0]:[r,r-360];return i.sort((t,r)=>ki(e,t,...n)-ki(e,r,...n)||Math.abs(t)-Math.abs(r)),i[0]}var ji=e=>wi((e-.02)/.02);function Mi(e){if(d(c(e)))return e;let t=0,n=e.c;for(let r=0;r<30;r++){let r=(t+n)/2;d(c({...e,c:r}))?t=r:n=r}return{...e,c:t}}function Ni(e,t,n,r){let i=ji(e.c),a=ji(t.c),o=i===0?t.h:e.h,s=Ai(o,a===0?e.h:t.h,r),c=o+(1-i)*s,l=s*Math.max(0,i+a-1);return{l:Ti(e.l,t.l,n),c:Ti(e.c,t.c,n),h:Ci(c+l*n)}}function Pi(e){return e.l<bi&&e.h>yi[0]&&e.h<xi?{...e,h:yi[0]}:e}function Fi(e,[t,n]){return e.c<.02||e.h<=t||e.h>=n?e:{...e,h:e.h-t<n-e.h?t:n}}function Ii(e,t){let n=Fi(u(e),pi[t].excludeHue);return{...n,l:n.l+Oi(n.h,...yi)*Di(n.c,.01,.04)*Math.max(0,Si-n.l)}}function Li(e,t){let n=Ii(e.left,`left`),r=Ii(e.middle,`middle`),i=Ii(e.right,`right`),a=wi(t);return Mi(Pi(a<=.5?Ni(n,r,a*2,_i):Ni(r,i,a*2-1,_i)))}var Ri=1.6,zi=40;function Bi(e,t,n){let r=Ni(Ii(e.left,`left`),Ii(e.right,`right`),wi(t)**Ri,_i),i=ji(n.c),a=ji(r.c),o=Ai(n.h,r.h,_i)*Math.min(i,a),s=Math.max(-40,Math.min(zi,o));return Mi(Pi({l:r.l,c:r.c,h:Ci((i===0?r.h:n.h)+s)}))}function Vi(e){let t=Fi(u(e.floor),pi.floor.excludeHue),n={l:.96,c:.04,h:Ii(e.middle,`middle`).h},r=Array.from({length:9},(e,t)=>t/8),i=r.map(t=>Li(e,t)),a=r.map((t,n)=>Bi(e,t,i[n])),o=[];for(let e=0;e<9;e++){let s=e/8;r.forEach((e,r)=>{let c=s<=.5?Ni(t,a[r],s/hi,vi):s<=.625?Ni(a[r],i[r],(s-hi)/.125,_i):Ni(i[r],n,(s-mi)/.375,_i);o.push(Mi(Pi(c)))})}for(let e=1;e<9;e++)for(let t=0;t<9;t++){let n=o[(e-1)*9+t],r=o[e*9+t],i=wi((.5800000000000001-n.l)/.03);i>0&&r.h>yi[0]&&r.h<xi&&(o[e*9+t]=Mi({...r,h:Ti(r.h,yi[0],i)}))}return o}function Hi(e){return Vi(e).flatMap(e=>c(e).map(e=>Math.min(1,Math.max(0,e))))}var Ui=10.5,Wi=[.04,.18],Gi=.02,Ki=[.03,.09],qi=.18,Ji=.15,Yi=.3,q=(e,t,n)=>e+(t-e)*n,Xi=e=>e()<.5?-1:1;function Zi(e){let t=e.slice(1).map((t,n)=>t-e[n]),n=0;for(let e=0;e+1<t.length;e++)Math.abs(t[e]-t[e+1])<.2*Math.max(t[e],t[e+1])&&n++;return n/Math.max(1,t.length-1)}function Qi(e,t,n,r,i){let a=r-n,o=[],s=1/0;for(let r=0;r<40&&s>1/3;r++){let r=[];for(let o=0;o<t;o++){let s=n+(o+.5+.95*(e()-.5))*a/t,c=q(Wi[0],Wi[1],e()**2)*i;r.push({c:s,w:c})}r.sort((e,t)=>e.c-t.c);let c=Zi(r.map(e=>e.c));c<s&&(o=r,s=c)}return o}function $i(e,t,n,r,i){let a=e.filter(e=>e.capY===null).map(e=>[na(e.xl,e.resL,n,r,i),na(e.xr,e.resR,n,r,i)]).sort((e,t)=>e[0]-t[0]),o=-t,s=0;for(let[e,t]of a)e>o&&(s=Math.max(s,e-o)),o=Math.max(o,t);return Math.max(s,t-o)}function ea(e,t,n,r,i,a,o){for(let s=0;s<16;s++){let s=Math.max(...n.map(n=>$i(e,t,n,a,o)));if(s<=r)return;let c=s-r*.9;e.forEach((e,t)=>{t!==i&&e.capY===null&&(e.xl-=c/2,e.xr+=c/2)})}}function ta(e,t,n,r){let i=Math.max(t,1)/2,a=Math.max(1/t,1)/2,o=Xi(e)*.15*e(),s=1+.15*(2*e()-1),c=r<.001?1/0:Math.max(2.13*s/r,a+Yi),l=e()<.5,u=.25+.2*e(),d=a/.5,f={y:(.1+.15*e())*d,width:qi},p=(-.25-.07*e())*d,m={top:p,bottom:p-Ji*d},h=.25*(2*e()-1),g=q(.035,.06,e()),_=[m.top,0,a],v=(e,t)=>Number.isFinite(c)?(e+o*t/c)/(1+t/c):e,y=Math.min(..._.map(e=>v(-i,e)))-.1,b=Math.max(..._.map(e=>v(i,e)))+.1,x=Math.round(Ui*(b-y-.2)*n),S=Qi(e,Math.max(5,Math.min(40,x)),y,b,1/n),C=1;for(let e=1;e<S.length-1;e++)Math.abs(S[e].c-h)<Math.abs(S[C].c-h)&&(C=e);let w=S[C-1].c,T=S[C+1].c;S[C]={c:Math.min(.25,Math.max(-.25,Math.min(T-.001,Math.max(w+.001,h)))),w:g};let E=l?-1:1,D=S.map((t,n)=>{let r=Gi*(2*e()-1),i=Gi*(2*e()-1),o=Math.abs(t.c-h)<.3,s=(e()<(o?.8:.6)?1:-1)*q(Ki[0],Ki[1],e()),c=e()<1/3&&n!==C,l=q(a-.25,a-.02,e()),u=E*(q(2,6,e())*Math.PI/180);return{xl:t.c-t.w/2,xr:t.c+t.w/2,resL:r,resR:i,step:c?Math.abs(s):s,capY:c?l:null,capTilt:u}});for(let e=0;e<6&&(ea(D,i,_,.15,C,o,c),ra(D,o,c,a),!(Math.max(..._.map(e=>$i(D,i,e,o,c)))<=.17));e++);let O=ia(e,i,f.y,l);for(let e of O)e.y0<f.y-.3&&(e.y0*=d);return{vpX:o,vpDepth:c,mirror:l,middle:u,glow:f,floor:m,shafts:D,sliver:C,veils:O}}function na(e,t,n,r,i){return e+(Number.isFinite(i)?(e-r)*n/i:0)+t*n}function ra(e,t,n,r){let i=e.flatMap(e=>[{s:e,side:`L`},{s:e,side:`R`}]),a=e=>e.side===`L`?e.s.xl:e.s.xr,o=e=>e.side===`L`?e.s.resL:e.s.resR,s=(e,t)=>{e.side===`L`?e.s.resL=t:e.s.resR=t};i.sort((e,t)=>a(e)-a(t));for(let e=0;e<8;e++){let e=!1;for(let c=1;c<i.length;c++){let l=i[c-1],u=i[c];for(let i of[-r,r])if(na(a(u),o(u),i,t,n)<na(a(l),o(l),i,t,n)){let t=(o(l)+o(u))/2;s(l,t),s(u,t),e=!0}}if(!e)return}for(let e of i)s(e,0)}function ia(e,t,n,r){let i=2+Math.floor(e()*3),a=5+Math.floor(e()*4),o=[],s=e=>r?{...e,slope:-e.slope,freq:-e.freq,x0:-e.x1,x1:-e.x0}:e;for(let r=0;r<Math.min(i,10-a);r++){let r=2*t*q(.4,.55,e()),i=t*q(.3,.7,e());o.push(s({y0:n-.25+.06*(e()-.5),slope:q(.14,.18,e()),amp:.01*e(),freq:q(2,4,e()),phase:2*Math.PI*e(),x0:i-r,x1:i,width:q(.003,.008,e()),strength:q(.03,.07,e())}))}let c=2*t*q(.5,.7,e()),l=t*q(.6,1,e()),u=q(-.35,-.2,e());for(let t=0;t<a;t++){let n=l-c*q(.9,1,e()),r=Math.PI/(l-n),i=(n+l)/2-.1*(l-n);o.push(s({y0:u-.02*t+.01*(e()-.5),slope:q(.1,.25,e()),amp:q(.02,.06,e()),freq:r,phase:-r*i,x0:n,x1:l,width:q(.003,.008,e()),strength:q(.03,.07,e())}))}return o}function aa(e,t,n,r){return ta(w(e^378650),t,n,r)}var oa=`uniform vec3 u_table[81];    // 9 drift columns × 9 light rows, row-major by light, linear RGB (palette.ts)
uniform vec2 u_vp;           // convergence point: x, depth below y = 0 (1e6 = parallel)
uniform float u_mirror;      // +1: Left colour on the left
uniform float u_middle;      // where the Middle colour sits, as a fraction of the width from the Left side
uniform vec3 u_glow;         // y, width, strength (Glow slider)
uniform vec2 u_floor;        // shafts fade from top (x) to bottom (y)
uniform vec4 u_shaftA[40];   // xl, xr (at y = 0), light step, cap y (9 = none)
uniform vec4 u_shaftB[40];   // left residual, right residual, cap tilt (rad), 1 = the sliver
uniform int u_shaftCount;
uniform vec4 u_veilA[10];    // y0, slope, amp, freq
uniform vec4 u_veilB[10];    // phase, x0, x1, width
uniform vec4 u_veilC[10];    // strength (Veils slider applied)
uniform int u_veilCount;

// Light model (fitted to the original in plan Task 5; light 0 = Floor, 0.625 = the drift colour, 1 = Hot).
const float T_BASE = 0.50;      // light above the glow (between the Left → Right row and the drift row)
const float BASE_RISE = 0.33;   // the field reaches T_BASE this far above the floor's top
const float GLOW_AMP = 0.15;
const float GLOW_SPREAD = 1.4;  // the glow's light is broader than the sliver's band (teal down to y 400 px on the left in the original)
const float SLIVER_AMP = 0.34;
const float SLIVER_UP = 1.6;    // the sliver's glow reaches this many band widths up
const float SLIVER_DOWN = 0.5;  // and fewer down: it ends just below the glow, where the upper veils cross
const float STEP_GAIN = 1.5;    // layout steps are in OKLab L; light runs about 1/0.67 as fast
const float VEIL_GAIN = 1.5;
const float FLOOR_TILT = 0.25;  // the light-to-floor boundary rises toward the Right side, along the upper veils (spec §4 cells)
const float TILT_PIVOT = -0.25; // … about a point left of centre, so the field under the sliver darkens early (the original's dark pool)

float edgeX(float x0, float res, float y) {
  return x0 + (x0 - u_vp.x) * y / u_vp.y + res * y;
}

/** 1-pixel box coverage of the band between two edges; a capped shaft hangs from the top down to its (tilted) cap. */
float shaftCover(vec2 p, vec4 a, vec4 b, float px) {
  float xl = edgeX(a.x, b.x, p.y), xr = edgeX(a.y, b.y, p.y);
  float c = clamp((p.x - xl) / px + 0.5, 0.0, 1.0) * clamp((xr - p.x) / px + 0.5, 0.0, 1.0);
  if (a.w < 8.0) {
    float capLine = a.w + tan(b.z) * (p.x - 0.5 * (xl + xr));
    c *= clamp((p.y - capLine) / px + 0.5, 0.0, 1.0);
  }
  return c;
}

vec3 tableAt(float u, float t) {
  float fu = clamp(u, 0.0, 1.0) * 8.0, ft = clamp(t, 0.0, 1.0) * 8.0;
  int i0 = min(int(floor(fu)), 7), j0 = min(int(floor(ft)), 7);
  float su = fu - float(i0), st = ft - float(j0);
  vec3 a = mix(u_table[j0 * 9 + i0], u_table[j0 * 9 + i0 + 1], su);
  vec3 b = mix(u_table[(j0 + 1) * 9 + i0], u_table[(j0 + 1) * 9 + i0 + 1], su);
  return mix(a, b, st);
}

vec3 wallpaper(vec2 p) {
  float px = 1.0 / min(u_resolution.x, u_resolution.y);
  float hx = max(u_aspect, 1.0) * 0.5;

  // Base field: light above, falling to the floor below; the glow band across the upper middle.
  // The tilt only spans the original's own width (4:3 half-width 0.667), so wide frames keep both sides lit.
  float yf = p.y - FLOOR_TILT * (clamp(u_mirror * p.x, -0.667, 0.667) - TILT_PIVOT);
  float t = T_BASE * smoothstep(u_floor.y - 0.05, u_floor.x + BASE_RISE, yf);
  float gy = (yf - u_glow.x) / (GLOW_SPREAD * u_glow.y);
  t += u_glow.z * GLOW_AMP * exp(-gy * gy);

  // Shafts: light steps that add up where they overlap, fading into the floor.
  float fade = smoothstep(u_floor.y, u_floor.x, yf);
  float sy = (p.y - u_glow.x) / ((p.y > u_glow.x ? SLIVER_UP : SLIVER_DOWN) * u_glow.y);
  for (int i = 0; i < 40; i++) {
    if (i >= u_shaftCount) break;
    float c = shaftCover(p, u_shaftA[i], u_shaftB[i], px);
    if (c <= 0.0) continue;
    t += STEP_GAIN * u_shaftA[i].z * c * fade;
    if (u_shaftB[i].w > 0.5) t += u_glow.z * SLIVER_AMP * c * exp(-sy * sy);
  }

  // Veils: soft thin lines, at least a pixel wide with the same total light.
  for (int i = 0; i < 10; i++) {
    if (i >= u_veilCount) break;
    vec4 a = u_veilA[i], b = u_veilB[i];
    float len = b.z - b.y;
    float ends = smoothstep(b.y, b.y + 0.15 * len, p.x) * smoothstep(b.z, b.z - 0.15 * len, p.x);
    if (ends <= 0.0) continue;
    float d = p.y - (a.x + a.y * p.x + a.z * sin(a.w * p.x + b.x));
    float w = max(b.w, px);
    t += VEIL_GAIN * u_veilC[i].x * exp(-(d * d) / (w * w)) * (b.w / w) * ends;
  }

  // Drift: Left → Middle at u_middle → Right across the width.
  float x01 = clamp((u_mirror * p.x + hx) / (2.0 * hx), 0.0, 1.0);
  float u = x01 < u_middle ? 0.5 * x01 / u_middle : 0.5 + 0.5 * (x01 - u_middle) / (1.0 - u_middle);
  return tableAt(u, t);
}
`,sa={left:`Left`,middle:`Middle`,right:`Right`,floor:`Floor`},ca=e=>({kind:`color`,id:e,label:sa[e],default:gi[e],...pi[e]}),la=1e6,ua=9,da=(e,t,n)=>[...e,...Array.from({length:t-e.length},()=>Array(n).fill(0))].flat();function fa(e,t){let n=Object.fromEntries(fi.map(t=>[t,String(e[t])])),r=Number(e.veils);return{u_table:{vec3Array:Hi(n)},u_vp:[t.vpX,Number.isFinite(t.vpDepth)?t.vpDepth:la],u_mirror:t.mirror?-1:1,u_middle:t.middle,u_glow:[t.glow.y,t.glow.width,Number(e.glow)],u_floor:[t.floor.top,t.floor.bottom],u_shaftA:{vec4Array:da(t.shafts.map(e=>[e.xl,e.xr,e.step,e.capY??ua]),40,4)},u_shaftB:{vec4Array:da(t.shafts.map((e,n)=>[e.resL,e.resR,e.capTilt,+(n===t.sliver)]),40,4)},u_shaftCount:{int:t.shafts.length},u_veilA:{vec4Array:da(t.veils.map(e=>[e.y0,e.slope,e.amp,e.freq]),10,4)},u_veilB:{vec4Array:da(t.veils.map(e=>[e.phase,e.x0,e.x1,e.width]),10,4)},u_veilC:{vec4Array:da(t.veils.map(e=>[e.strength*r,0,0,0]),10,4)},u_veilCount:{int:t.veils.length}}}var pa={shafts:1,lean:1,glow:1,veils:1,grain:.12},ma=(e,t,n,r,i,a)=>({id:e,label:t,values:{left:n,middle:r,right:i,floor:a,...pa}}),ha={id:`quartz`,name:`Quartz`,era:`2000s`,version:1,params:[...fi.map(ca),{kind:`range`,id:`shafts`,label:`Shafts`,min:.6,max:1.6,step:.01,default:1},{kind:`range`,id:`lean`,label:`Lean`,min:0,max:2,step:.01,default:1},{kind:`range`,id:`glow`,label:`Glow`,min:0,max:2,step:.01,default:1},{kind:`range`,id:`veils`,label:`Veils`,min:0,max:1.5,step:.01,default:1},S(.12)],presets:[ma(`blue`,`Blue`,gi.left,gi.middle,gi.right,gi.floor),ma(`emerald`,`Emerald`,`#009f82`,`#72d0d0`,`#0070ba`,`#001421`),ma(`dusk`,`Dusk`,`#7f57d1`,`#e2a0c5`,`#b92846`,`#130326`)],fragment:oa,uniforms(e,t,n){return fa(e,aa(t,n,Number(e.shafts),Number(e.lean)))}},ga=[`light`,`shadow`,`beam`],_a={light:{l:[.65,.88],c:[.04,.18],excludeHue:[60,150]},shadow:{l:[.4,.62],c:[.04,.2],excludeHue:[35,150]},beam:{l:[.02,.2],c:[0,.06],excludeHue:[35,150]}},va=.3,ya={light:`#00befc`,shadow:`#006bbd`,beam:`#010204`},ba=[60,150],xa=[35,60],Sa=.55,Ca=60.01,wa=.7,Ta=.1,Ea=.035,Da=e=>(e%360+360)%360,Oa=e=>Math.min(1,Math.max(0,e)),ka=(e,t,n)=>e+(t-e)*n,Aa=(e,t)=>((t-e)%360+540)%360-180,ja=(e,t,n)=>Oa((e-t)/(n-t));function Ma(e,t,n){if(e>=t&&e<=n)return 1;let r=Math.min(Math.abs(Aa(e,t)),Math.abs(Aa(e,n)));return Math.max(0,1-r/8)}function Na(e,t,n,r){let i=Math.min(e,e+t),a=Math.max(e,e+t),o=0;for(let e=-2;e<=2;e++)o+=Math.max(0,Math.min(a,r+360*e)-Math.max(i,n+360*e));return o}function Pa(e,t,n){let r=Da(t-e),i=r===0?[0]:[r,r-360];return i.sort((t,r)=>Na(e,t,...n)-Na(e,r,...n)||Math.abs(t)-Math.abs(r)),i[0]}var Fa=e=>Oa((e-.02)/.02);function Ia(e){if(d(c(e)))return e;let t=0,n=e.c;for(let r=0;r<30;r++){let r=(t+n)/2;d(c({...e,c:r}))?t=r:n=r}return{...e,c:t}}function La(e){return e.l<Sa&&e.h>xa[0]&&e.h<Ca?{...e,h:xa[0]}:e}function Ra(e,[t,n]){return e.c<.02||e.h<=t||e.h>=n?e:{...e,h:e.h-t<n-e.h?t:n}}function za(e){let t=Ra(u(e),_a.light.excludeHue);return{...t,l:t.l+Ma(t.h,...xa)*ja(t.c,.01,.04)*Math.max(0,wa-t.l)}}var Ba=e=>Ra(u(e),_a.shadow.excludeHue);function Va(e,t){let n=Ba(e.shadow),r=za(e.light),i=Oa(t),a=Fa(n.c),o=Fa(r.c),s=a===0?r.h:n.h,c=Pa(s,o===0?n.h:r.h,ba),l=s+(1-a)*c,u=c*Math.max(0,a+o-1),d=ka(n.c,r.c,i)*(1+va*4*i*(1-i));return Ia(La({l:ka(n.l,r.l,i),c:d,h:Da(l+u*i**3)}))}function Ha(e){return Ia(Ra(u(e.beam),_a.beam.excludeHue))}function Ua(e,t){let n=Va(e,t);return Ia({l:Ha(e).l+Ta,c:Math.min(Ea,n.c),h:n.h})}var Wa=e=>c(e).map(e=>Math.min(1,Math.max(0,e)));function Ga(e){let t=Array.from({length:17},(t,n)=>Va(e,n/16));for(let e=1;e<17;e++){let n=t[e-1],r=t[e],i=Oa((.5800000000000001-n.l)/.03);i>0&&r.h>xa[0]&&r.h<Ca&&(t[e]=Ia({...r,h:ka(r.h,xa[0],i)}))}return t}function Ka(e){let t=Array.from({length:17},(e,t)=>t/16);return{panel:Ga(e).flatMap(Wa),rim:t.flatMap(t=>Wa(Ua(e,t))),core:Wa(Ha(e))}}var qa=.31,Ja=.7,Ya=.05,Xa=.0125,Za=.0112,Qa=1.41,$a=.0125,eo=.0122,to=.0101,no=.02,ro=.361,io=20,ao=16,oo=20,so=.05,co=e=>e*Math.PI/180,lo=(e,t,n)=>Math.min(n,Math.max(t,e)),uo=(e,t,n)=>e+(t-e)*n,fo=(e,t,n)=>[e[0]+n*Math.cos(t),e[1]+n*Math.sin(t)];function po(e,t,n,r){let i=[Math.cos(t),Math.sin(t)],a=[n+Ya,r+Ya],o=-1/0,s=1/0;for(let t=0;t<2;t++){if(Math.abs(i[t])<1e-12){if(Math.abs(e[t])>a[t])return[0,0];continue}let n=(-a[t]-e[t])/i[t],r=(a[t]-e[t])/i[t];o=Math.max(o,Math.min(n,r)),s=Math.min(s,Math.max(n,r))}return s>o?[o,s]:[0,0]}function mo(e,t,n){let[r,i]=po(e.p,e.a,t-Ya,n-Ya),a=Math.max(r,e.s0),o=Math.min(i,e.s1);return o>a?[a,o]:null}function ho(e,t,n,r){let i=[Math.cos(t),Math.sin(t)],a=[Math.cos(r),Math.sin(r)],o=i[0]*a[1]-i[1]*a[0];return Math.abs(o)<1e-9?null:((n[0]-e[0])*a[1]-(n[1]-e[1])*a[0])/o}var go=(e,t,n)=>Math.abs(e[0])<=t&&Math.abs(e[1])<=n;function _o(e,t,n){let r=Math.max(t,1)/2,i=Math.max(1/t,1)/2,a=Math.min(1.5,Math.max(1,r/.8)),o=t=>(e()*2-1)*t,s=lo(Math.round(n.beams),3,6),c=e()<.5,l=r/.8*-.205+o(.08),u=-.01+o(.07);l=lo(l,-r+.15,r-.15),u=lo(u,-i+.15,i-.15),t<1&&(u=lo(u,-.25*i,.25*i));let d=[l,u],f=32+o(3)+n.lean,p=Math.min(3.4+o(4),f-io),m=Math.max(47.3+o(2)+n.lean,f+ao),h=ro*(1+o(.2))*a,g=co(-31+o(5)),_=co(f),v=co(m),y=po(d,_,r,i),b=po(d,_,r-Ya,i-Ya)[1]+Xa,x=fo(d,_,b),S={role:`main`,p:d,a:_,s0:y[0],s1:b,w0:Za,w1:Za*Qa,shadow:1,lit:1},C=co(p),w={role:`left`,p:d,a:C,s0:po(d,C,r,i)[0],s1:0,w0:$a,w1:$a,shadow:qa,lit:Ja},T=[Math.sin(v),-Math.cos(v)],E=(x[0]-d[0])*T[0]+(x[1]-d[1])*T[1];function D(e,t,n){let a=e===0?d:e===E?x:[d[0]+e*T[0],d[1]+e*T[1]],o=po(a,t,r,i),s=o[1];if(e===0||e===E)s=0;else{let e=ho(a,t,d,_),n=e===null?null:ho(d,_,a,t);e!==null&&n!==null&&n>=S.s0&&n<=S.s1&&go(fo(a,t,e),r,i)&&(s=e)}return{role:`family`,p:a,a:t,s0:o[0],s1:s,w0:n,w1:n,shadow:0,lit:0}}let O=h;for(let e=0;e<12;e++){let e=mo(D(E+O,v,no),r,i);if(e&&e[1]-e[0]>=.25)break;O*=.85}let k=null,A=-1/0;for(let t=0;t<oo;t++){let t=[0,E,E+O];for(let n=3;n<s;n++){let n=Math.min(t.length-2,Math.floor(e()*(t.length-1)));t.splice(n+1,0,uo(t[n],t[n+1],.35+.3*e()))}let n=t.map(e=>D(e,v+co(o(.4)),uo(to,no,e/t[t.length-1])*(1+o(.15)))),a=t.slice(1).map((e,n)=>e-t[n]),l=Math.max(...a)/Math.min(...a),u=.35+.3*e(),f=null,p=[0,0];for(let e=n.length-1;e>=0&&!f;e--){let t=mo(n[e],r,i);if(!t||e===n.length-1&&t[1]-t[0]<.25)continue;let a=fo(n[e].p,n[e].a,t[1]-u*(t[1]-t[0])),o=po(a,g,r,i)[1];for(let t of n.slice(e+1)){let e=ho(a,g,t.p,t.a);e!==null&&e>0&&e<o&&go(fo(a,g,e),r,i)&&(o=e)}let s={role:`spur`,p:a,a:g,s0:0,s1:o,w0:eo,w1:eo,shadow:0,lit:0},c=mo(s,r,i);c&&c[1]-c[0]>=.1&&(f=s,p=a)}let m=Math.min(...a)>=so,h=f!==null&&m&&(s===3||l>1.15),_=!!f*10+Math.min(Math.min(...a)/so,1)*5+Math.min(l,2),y={mirror:c,light:[Math.SQRT1_2,-Math.SQRT1_2],j1:d,j0:x,j2:p,beams:[S,w,...n,...f?[f]:[]]};if(h){k=y;break}_>A&&(k=y,A=_)}let j=k,ee=e=>({...e,w0:e.w0*n.width,w1:e.w1*n.width}),M=e=>[-e[0],e[1]],te=e=>c?{...e,p:M(e.p),a:Math.PI-e.a}:e;return{mirror:c,light:c?M(j.light):j.light,j1:c?M(j.j1):j.j1,j0:c?M(j.j0):j.j0,j2:c?M(j.j2):j.j2,beams:j.beams.map(e=>te(ee(e)))}}function vo(e,t,n){return _o(w(e^377255),t,n)}var yo=`uniform vec3 u_panel[17];    // panel ramp, t = i/16 (0 Shadow … 1 Light), linear RGB (palette.ts)
uniform vec3 u_rim[17];      // beam-edge tint beside panel colour t
uniform vec3 u_core;         // beam core
uniform vec3 u_light;        // unit vector toward the light (xy), Shade slider (z)
uniform vec4 u_beamA[12];    // anchor x, y, angle (rad), shadow strength
uniform vec4 u_beamB[12];    // s0, s1 along the beam, full width at s0, at s1
uniform float u_beamLit[12]; // lit-side darkening strength
uniform int u_beamCount;
uniform int u_mainIdx;

// Light model (fitted to the original in plan Task 5). t is a position on the panel ramp.
const float T_FAR = 1.30;       // light far from every beam, at dot(p, light) = 0.5 (above 1: the far field reaches Light)
const float G_SPAN = 0.259;      // overall gradient toward the light, per unit of dot(p, light)
const float D_SHADE = 0.816;     // shadow depth at a beam on its shaded side (away from the light)
const float LAMBDA = 0.349;      // … and how far it reaches
const float D_LIT = 0.401;       // the broad, shallower darkening on the lit side
const float LAMBDA_LIT = 1.20;
const float KNEE = 0.2;         // light above 1 − KNEE eases toward Light instead of clamping, so no panel is flat

/** Smoothly approaches 1 from below: identity up to 1 − KNEE, then 1 − KNEE·exp(−(t − 1 + KNEE)/KNEE) (C¹ at the join). */
float knee(float t) {
  float k0 = 1.0 - KNEE;
  return t <= k0 ? t : 1.0 - KNEE * exp(-(t - k0) / KNEE);
}

vec3 panelAt(float t) {
  float f = clamp(t, 0.0, 1.0) * 16.0;
  int i = min(int(floor(f)), 15);
  return mix(u_panel[i], u_panel[i + 1], f - float(i));
}

vec3 rimAt(float t) {
  float f = clamp(t, 0.0, 1.0) * 16.0;
  int i = min(int(floor(f)), 15);
  return mix(u_rim[i], u_rim[i + 1], f - float(i));
}

vec3 wallpaper(vec2 p) {
  float px = 1.0 / min(u_resolution.x, u_resolution.y);
  vec2 light = u_light.xy;
  float shade = u_light.z;
  // The light, before Shade: (T_FAR − 1) above Light far from the beams, minus the gradient and the shadows.
  // Shade scales it about the Light end (t = 1), as the spec says.
  float v = (T_FAR - 1.0) + G_SPAN * (dot(p, light) - 0.5);
  float cov = 0.0, core = 0.0;

  for (int i = 0; i < 12; i++) {
    if (i >= u_beamCount) break;
    vec4 A = u_beamA[i], B = u_beamB[i];
    vec2 d = vec2(cos(A.z), sin(A.z));
    vec2 n = vec2(-d.y, d.x);
    vec2 away = dot(n, light) < 0.0 ? n : -n;   // the shaded side's normal
    vec2 r = p - A.xy;
    float s = dot(r, d);
    float sc = clamp(s, B.x, B.y);
    vec2 e = r - sc * d;
    float dist = length(e);

    // Shadow: deep and wide on the side away from the light, shallow on the lit side. Past a beam's end the
    // two blend by angle, so its extension leaves no step in the panel.
    float wShade = clamp(0.5 + 0.5 * dot(e, away) / max(dist, 1e-6), 0.0, 1.0);
    float sh = mix(u_beamLit[i] * D_LIT * exp(-dist / LAMBDA_LIT), A.w * D_SHADE * exp(-dist / LAMBDA), wShade);
    v -= sh;

    // Beam: analytic 1-pixel box coverage across the strip and at its ends; overlapping strips take the maximum.
    float hw = 0.5 * mix(B.z, B.w, clamp((sc - B.x) / max(B.y - B.x, 1e-6), 0.0, 1.0));
    float across = abs(dot(r, n));
    float ends = clamp((s - B.x) / px + 0.5, 0.0, 1.0) * clamp((B.y - s) / px + 0.5, 0.0, 1.0);
    float coreHw = min(0.75 * hw, hw - px);
    cov = max(cov, clamp((hw - across) / px + 0.5, 0.0, 1.0) * ends);
    core = max(core, clamp((coreHw - across) / px + 0.5, 0.0, 1.0) * ends);
  }

  float t = knee(1.0 + shade * v);
  vec3 panel = panelAt(t);
  return mix(panel, mix(rimAt(t), u_core, core), cov);
}
`,bo={light:`Light`,shadow:`Shadow`,beam:`Beam`},xo=e=>({kind:`color`,id:e,label:bo[e],default:ya[e],..._a[e]}),So=(e,t,n)=>[...e,...Array.from({length:t-e.length},()=>Array(n).fill(0))].flat();function Co(e,t){let n=Ka(Object.fromEntries(ga.map(t=>[t,String(e[t])])));return{u_panel:{vec3Array:n.panel},u_rim:{vec3Array:n.rim},u_core:n.core,u_light:[t.light[0],t.light[1],Number(e.shade)],u_beamA:{vec4Array:So(t.beams.map(e=>[e.p[0],e.p[1],e.a,e.shadow]),12,4)},u_beamB:{vec4Array:So(t.beams.map(e=>[e.s0,e.s1,e.w0,e.w1]),12,4)},u_beamLit:{floatArray:So(t.beams.map(e=>[e.lit]),12,1)},u_beamCount:{int:t.beams.length},u_mainIdx:{int:t.beams.findIndex(e=>e.role===`main`)}}}var wo={beams:3,lean:0,width:1,shade:1,grain:.06},To=(e,t,n,r,i)=>({id:e,label:t,values:{light:n,shadow:r,beam:i,...wo}}),Eo={id:`skylight`,name:`Skylight`,era:`2010s`,version:1,params:[...ga.map(xo),{kind:`range`,id:`beams`,label:`Beams`,min:3,max:6,step:1,default:3},{kind:`range`,id:`lean`,label:`Lean`,min:-12,max:12,step:.5,default:0},{kind:`range`,id:`width`,label:`Width`,min:.6,max:1.6,step:.01,default:1},{kind:`range`,id:`shade`,label:`Shade`,min:0,max:2,step:.01,default:1},S(.06)],presets:[To(`blue`,`Blue`,ya.light,ya.shadow,ya.beam),To(`teal`,`Teal`,`#60dbd4`,`#007f95`,`#010304`),To(`violet`,`Violet`,`#be9df7`,`#5847b7`,`#030106`)],fragment:yo,uniforms(e,t,n){return Co(e,vo(t,n,{beams:Number(e.beams),lean:Number(e.lean),width:Number(e.width)}))}},Do=[`deep`,`body`,`crest`],Oo={deep:{l:[.18,.4],c:[.02,.14],excludeHue:[35,150]},body:{l:[.4,.65],c:[.06,.23],excludeHue:[35,150]},crest:{l:[.68,.9],c:[.04,.17],excludeHue:[60,150]}},ko={deep:`#032c51`,body:`#0568e9`,crest:`#23c6f7`},Ao={size:33,lowBand:Oo.deep.excludeHue,highBand:Oo.crest.excludeHue,snap:[Oo.deep,Oo.body,Oo.crest],hueEase:1.6,chromaEase:1,brown:[32,60],brownMaxL:.55},jo=e=>Math.min(1,Math.max(0,e)),Mo=(e,t)=>((t-e)%360+540)%360-180,No=(e,t,n)=>jo((e-t)/(n-t));function Po(e,t,n){if(e>=t&&e<=n)return 1;let r=Math.min(Math.abs(Mo(e,t)),Math.abs(Mo(e,n)));return Math.max(0,1-r/8)}var Fo=e=>({...e,l:e.l+Po(e.h,35,60)*No(e.c,.01,.04)*Math.max(0,.7-e.l)});function Io(e){let t=u(e.deep),n=u(e.body);return Jr(t,{...n,l:Math.max(n.l,t.l)},Fo(u(e.crest)),Ao)}function Lo(e){return Yr(Io(e))}var Ro=.8,zo=.6,Bo=.1,Vo=.85,Ho=e=>1/(1+Math.exp(-e)),Uo=e=>Ro*Math.tanh(e/Ro),Wo=(e,t,n)=>Math.min(n,Math.max(t,e)),Go=(e,t,n)=>e+(t-e)*n,Ko={base:[-.8999,-.5133,-.4182,-.3424,-.2543,-.0923,.0035,.1859,.9534],rise:[-2e-4,-.0192,.0305,.1087,.1744,.2417,.2396,.2052,.1002],amp:[.0047,.0288,.141,.1401,.1623,.2499,.4937,.6382,.3936],x0:[.2702,.2745,.208,.2493,.2853,.1202,-.0814,-.2853,-.0012],w:[.1994,.1416,.1416,.0875,.0895,.0582,.157,.1218,.1086]};function qo(e,t){return e*t>0?2*e*t/(e+t):0}function J(e,t){let n=Wo(t,0,1)*8,r=Math.min(7,Math.floor(n)),i=n-r,a=t=>e[t+1]-e[t],o=r===0?a(0):qo(a(r-1),a(r)),s=r===7?a(7):qo(a(r),a(r+1)),c=i*i,l=c*i;return(2*l-3*c+1)*e[r]+(l-2*c+i)*o+(-2*l+3*c)*e[r+1]+(l-c)*s}function Jo(e,t,n){let r=J(e.w,n);return J(e.base,n)+J(e.rise,n)*Uo(t)+J(e.amp,n)*Ho((t-J(e.x0,n))/r)}function Yo(e,t,n){let r=1e-4;return(Jo(e,t,n+r)-Jo(e,t,n-r))/(2*r)}function Xo(e,t,n){let r=0,i=1;if(Jo(e,t,0)>=n)return 0;if(Jo(e,t,1)<=n)return 1;for(let a=0;a<24;a++){let a=(r+i)/2;Jo(e,t,a)<n?r=a:i=a}return(r+i)/2}function Zo(e,t){let n=1/0;for(let r=0;r<=48;r++)for(let i=0;i<=80;i++)n=Math.min(n,Yo(e,-t+2*t*r/48,i/80));return n}function Qo(e,t,n){let r=0;for(let i=0;i<=120;i++){let a=-n+2*n*i/120;r=Math.max(r,(Jo(e,a+1e-4,t)-Jo(e,a-1e-4,t))/2e-4)}return r}function $o(e,t,n){if(e<.1||e>.85)return 0;let r=Wo((e-Bo)/.04,0,1)*Wo((Vo-e)/.04,0,1),i;return i=e<t-.08?Go(.2,.45,Wo((e-Bo)/Math.max(1e-6,t-.08-Bo),0,1)):e<t?Go(.45,1,(e-(t-.08))/.08):e<=n?1:e<=n+.08?Go(1,.45,(e-n)/.08):Go(.45,.3,Wo((e-n-.08)/.06,0,1)),i*r}function es(e,t,n){let r=Math.max(t,1)/2,i=Math.max(1/t,1)/2,a=e()<.5,o=(e()*2-1)*.1,s=(e()*2-1)*.15,c=(40+e()*15)*Math.PI/180,l=Math.min(1,r/(2/3)),u={base:[...Ko.base],rise:[...Ko.rise],amp:Ko.amp.map((e,t)=>e*(1+s*(t/8-.5))),x0:Ko.x0.map(e=>(e+o)*l),w:[...Ko.w]};if(i>.5){let e=2*i,t=J(u.base,.5);u.base=u.base.map(n=>(n-t)*e+t)}let d=[...u.amp],f=1;for(let e=0;e<4;e++){u.amp=d.map(e=>e*f);let e=Xo(u,J(u.x0,.7),i),t=Qo(u,e,r),n=J(u.rise,e);f=Wo(f*Math.max(.05,Math.tan(c)-n)/Math.max(.05,t-n),.6,1.6)}u.amp=d.map(e=>e*f*n.bend);for(let e=0;e<16&&Zo(u,r)<.05;e++)u.amp=u.amp.map(e=>e*.9);let p=Math.min(80,Math.round(40*n.grooves)),m=Math.round(p/3),h=p-m,g=()=>Array.from({length:h-1},()=>.4+1.6*e()**3),_=e=>{for(let t=0;t+5<=e.length;t++){let n=e.slice(t,t+5);if(Math.max(...n)<=Math.min(...n)*1.15)return!0}return!1},v=e=>{let t=1/0;for(let n=0;n+5<=e.length;n++){let r=e.slice(n,n+5);t=Math.min(t,Math.max(...r)/Math.min(...r))}return t},y=g();for(let e=0;e<20&&_(y);e++){let e=g();v(e)>v(y)&&(y=e)}let b=y.reduce((e,t)=>e+t,0)||1,x=[Bo];for(let e of y)x.push(x[x.length-1]+e/b*.73);let S=.43+e()*.04,C=.53+e()*.04,w=new Set,T=x.map((e,t)=>t);for(let t=T.length-1;t>0;t--){let n=Math.floor(e()*(t+1));[T[t],T[n]]=[T[n],T[t]]}for(let e of T)w.size<m&&w.add(e);let E=1/Math.sqrt(Math.max(1,n.grooves)),D=[],O=e=>Yo(u,J(u.x0,e),e),k=(t,r)=>{let i=$o(t,S,C),a=i*(.4+.6*e())*E,o=Go(.006,.016,Wo(i*(.5+.5*e()),0,1))*n.width,s=e()*zo,c=J(u.x0,t)+(e()*2-1)*.15,l=.3+e()*.5,d=.1+e()*.1,f=t>.6;return{u:t,depth:a,width:o,pair:r,xs:f?c-l/2:-1e3,xe:f?c+l/2:1e3,soft:d,phase:s}};return x.forEach((t,n)=>{if(D.push(k(t,0)),!w.has(n))return;let r=n+1<x.length?x[n+1]:Vo,i=(.005+e()*.015)/Math.max(.001,O(t));D.push(k(t,Math.max(1e-4,Math.min(i,.8*(r-t),Vo-t))))}),{mirror:a,flow:u,grooves:D}}function ts(e,t,n){return es(w(e^466405),t,n)}var ns=`uniform vec3 u_ramp[33];     // light ramp, t = i/32 (0 Deep … 0.5 Body … 1 Crest), linear RGB (palette.ts)
uniform vec4 u_flowA[9];     // per knot u = k/8: base, rise, amp, x0 (layout.ts Flow)
uniform float u_flowW[9];    // per knot: logistic width w
uniform vec4 u_gA[80];       // per groove: u, depth, core width (FWHM, p), pair amplitude (u)
uniform vec4 u_gB[80];       // per groove: fade window start x, end x, soft length, pair phase
uniform int u_gCount;
uniform vec4 u_look;         // mirror sign, Glow, Soft, unused

// The flow maths mirrors layout.ts exactly: Y(x;u) = base + rise·R(x) + amp·σ((x − x0)/w), knots joined by monotone
// cubic Hermite (Fritsch–Butland tangents), R(x) = RISE_W·tanh(x/RISE_W).
const float RISE_W = 0.8;
const float PAIR_PERIOD = 0.6;

// Light model (fitted to the original in plan Task 5). t is a position on the ramp.
const float BASE_T[9] = float[9](-0.0043, -0.0043, 0.1714, 0.2948, 0.3647, 0.5922, 0.5503, 0.9258, 0.6279);  // light by u, far from the crest
const float CREST = 0.3343;      // glow on the steep part of the S, at Glow 1
const float CREST_W = 4.0000;     // … its width across, in units of the strand's logistic width
const float CREST_U0 = 0.3665;   // … the u band it lives in
const float CREST_U1 = 0.8568;
const float WEDGE = 0.2004;      // darkening left of the steep part, under the upper bundle
const float WEDGE_DX = 0.4115;
const float WEDGE_W = 0.2002;
const float WEDGE_U0 = 0.5549;
const float WEDGE_U1 = 0.9407;
const float SIDE = 0.1435;       // light rising toward the lit side (the original's left is darker at the same strand)
const float SIDE_W = 0.6;
const float GROOVE = 0.2740;     // groove contrast in ramp units at depth 1
const float SH = 0.4;          // shoulder height relative to the core (the strong lower grooves: lit ridges ≈ half the valley depth)
const float SH_UP = 1.0;       // upper shoulder (the original's light shoulder sits above the core)
const float SH_LOW = 0.5;      // lower shoulder, weaker than the upper one
const float SH_OFF = 3.0;      // shoulder offset from the core, in core σ (≈ 10 px vs a 7 px FWHM core)
const float KNEE = 0.1;        // light above 1 − KNEE eases into 1 instead of clamping

float tangent(float d0, float d1) {
  return d0 * d1 > 0.0 ? 2.0 * d0 * d1 / (d0 + d1) : 0.0;
}

/** Hermite basis for segment k at t. */
vec4 hermite(float t) {
  float t2 = t * t, t3 = t2 * t;
  return vec4(2.0 * t3 - 3.0 * t2 + 1.0, t3 - 2.0 * t2 + t, -2.0 * t3 + 3.0 * t2, t3 - t2);
}

/** Monotone cubic through four neighbouring knots (v0 is k−1, v3 is k+2), first/last segment flags. */
float mono(float v0, float v1, float v2, float v3, bool first, bool last, vec4 H) {
  float m1 = first ? v2 - v1 : tangent(v1 - v0, v2 - v1);
  float m2 = last ? v2 - v1 : tangent(v2 - v1, v3 - v2);
  return H.x * v1 + H.y * m1 + H.z * v2 + H.w * m2;
}

struct Strand { float base; float rise; float amp; float x0; float w; };

Strand strandAt(float u) {
  float s = clamp(u, 0.0, 1.0) * 8.0;
  int k = min(7, int(floor(s)));
  vec4 H = hermite(s - float(k));
  int k0 = max(k - 1, 0), k3 = min(k + 2, 8);
  bool first = k == 0, last = k == 7;
  vec4 a0 = u_flowA[k0], a1 = u_flowA[k], a2 = u_flowA[k + 1], a3 = u_flowA[k3];
  Strand S;
  S.base = mono(a0.x, a1.x, a2.x, a3.x, first, last, H);
  S.rise = mono(a0.y, a1.y, a2.y, a3.y, first, last, H);
  S.amp = mono(a0.z, a1.z, a2.z, a3.z, first, last, H);
  S.x0 = mono(a0.w, a1.w, a2.w, a3.w, first, last, H);
  S.w = mono(u_flowW[k0], u_flowW[k], u_flowW[k + 1], u_flowW[k3], first, last, H);
  return S;
}

float riseX(float x) { return RISE_W * tanh(x / RISE_W); }
float sigm(float z) { return 1.0 / (1.0 + exp(-z)); }

float flowY(float x, float u) {
  Strand S = strandAt(u);
  return S.base + S.rise * riseX(x) + S.amp * sigm((x - S.x0) / S.w);
}

float baseT(float u) {
  float s = clamp(u, 0.0, 1.0) * 8.0;
  int k = min(7, int(floor(s)));
  return mono(BASE_T[max(k - 1, 0)], BASE_T[k], BASE_T[k + 1], BASE_T[min(k + 2, 8)], k == 0, k == 7, hermite(s - float(k)));
}

float band(float u, float a, float b) {
  return smoothstep(a, a + 0.1, u) * (1.0 - smoothstep(b - 0.1, b, u));
}

float gauss(float z, float s) { return exp(-0.5 * (z * z) / (s * s)); }

float knee(float t) {
  float k0 = 1.0 - KNEE;
  return t <= k0 ? t : 1.0 - KNEE * exp(-(t - k0) / KNEE);
}

vec3 rampAt(float t) {
  float f = clamp(t, 0.0, 1.0) * 32.0;
  int i = min(int(floor(f)), 31);
  return mix(u_ramp[i], u_ramp[i + 1], f - float(i));
}

vec3 wallpaper(vec2 p) {
  float px = 1.0 / min(u_resolution.x, u_resolution.y);
  float x = p.x * u_look.x, y = p.y;
  float glow = u_look.y, soft = u_look.z;

  // Solve Y(x; u) = y for u (strands never cross, so Y rises with u at every x).
  float u;
  if (flowY(x, 0.0) >= y) u = 0.0;
  else if (flowY(x, 1.0) <= y) u = 1.0;
  else {
    float lo = 0.0, hi = 1.0;
    for (int i = 0; i < 24; i++) {
      float mid = 0.5 * (lo + hi);
      if (flowY(x, mid) < y) lo = mid; else hi = mid;
    }
    u = 0.5 * (lo + hi);
  }
  // Distance per unit of u, for the groove profiles: |∇u| = sqrt(1 + Yx²) / Yu.
  float h = 1e-3;
  float Yu = max(1e-4, (flowY(x, u + h) - flowY(x, u - h)) / (2.0 * h));
  float Yx = (flowY(x + h, u) - flowY(x - h, u)) / (2.0 * h);
  float g = sqrt(1.0 + Yx * Yx) / Yu;

  Strand S = strandAt(u);
  float t = baseT(u);
  float across = (x - S.x0) / S.w;
  t += glow * CREST * gauss(across, CREST_W) * band(u, CREST_U0, CREST_U1);
  t -= WEDGE * gauss(x - S.x0 + WEDGE_DX, WEDGE_W) * band(u, WEDGE_U0, WEDGE_U1);
  t += SIDE * tanh(x / SIDE_W);

  // Grooves: a dark Gaussian core with a light shoulder each side, filtered over the pixel footprint (Gaussian ⊗
  // Gaussian stays Gaussian: the width grows to σ' and the peak falls by σ/σ', keeping each groove's integral).
  float pxs = 0.5 * px;
  for (int i = 0; i < 80; i++) {
    if (i >= u_gCount) break;
    vec4 A = u_gA[i], B = u_gB[i];
    float uc = A.x + A.w * (0.5 + 0.5 * cos(TAU * (x - B.w) / PAIR_PERIOD));
    float d = (u - uc) / g;
    float sig = A.z * mix(0.6, 1.6, soft) / 2.355;
    float sig2 = sqrt(sig * sig + pxs * pxs);
    if (abs(d) > 7.0 * sig2) continue;
    float fs = max(B.z * mix(0.6, 1.4, soft), 1e-3);
    float env = smoothstep(B.x, B.x + fs, x) * (1.0 - smoothstep(B.y - fs, B.y, x));
    float amp = A.y * env * (sig / sig2) * mix(1.25, 0.8, soft);
    t += GROOVE * amp * (SH * (SH_UP * gauss(d - SH_OFF * sig2, sig2) + SH_LOW * gauss(d + SH_OFF * sig2, sig2)) - gauss(d, sig2));
  }

  return rampAt(knee(max(t, 0.0)));
}
`,rs={deep:`Deep`,body:`Body`,crest:`Crest`},is=e=>({kind:`color`,id:e,label:rs[e],default:ko[e],...Oo[e]}),as=(e,t,n)=>[...e,...Array.from({length:t-e.length},()=>Array(n).fill(0))].flat();function os(e,t){let n=Object.fromEntries(Do.map(t=>[t,String(e[t])])),r=t.flow;return{u_ramp:{vec3Array:Lo(n)},u_flowA:{vec4Array:r.base.flatMap((e,t)=>[e,r.rise[t],r.amp[t],r.x0[t]])},u_flowW:{floatArray:[...r.w]},u_gA:{vec4Array:as(t.grooves.map(e=>[e.u,e.depth,e.width,e.pair]),80,4)},u_gB:{vec4Array:as(t.grooves.map(e=>[e.xs,e.xe,e.soft,e.phase]),80,4)},u_gCount:{int:t.grooves.length},u_look:[t.mirror?-1:1,Number(e.glow),Number(e.soft),0]}}var ss={grooves:1,bend:1,glow:1,soft:.5,width:1,grain:.08},cs=(e,t,n,r,i)=>({id:e,label:t,values:{deep:n,body:r,crest:i,...ss}}),ls={id:`tide`,name:`Tide`,era:`2000s`,version:1,params:[...Do.map(is),{kind:`range`,id:`grooves`,label:`Grooves`,min:.5,max:2,step:.05,default:1},{kind:`range`,id:`bend`,label:`Bend`,min:.6,max:1.4,step:.01,default:1},{kind:`range`,id:`glow`,label:`Glow`,min:0,max:2,step:.01,default:1},{kind:`range`,id:`soft`,label:`Soft`,min:0,max:1,step:.01,default:.5},{kind:`range`,id:`width`,label:`Width`,min:.6,max:1.6,step:.01,default:1},S(.08)],presets:[cs(`blue`,`Blue`,ko.deep,ko.body,ko.crest),cs(`teal`,`Teal`,`#002e3a`,`#03818b`,`#70d9cc`),cs(`violet`,`Violet`,`#25194b`,`#5e48c8`,`#c9a3f5`)],fragment:ns,uniforms(e,t,n){return os(e,ts(t,n,{grooves:Number(e.grooves),bend:Number(e.bend),width:Number(e.width)}))}},us=[`background`,`light`,`warm`,`cool`],ds=[{hue:[60,140],belowL:.8},{hue:[35,60],belowL:.6}],fs={background:{l:[.7,.92],c:[.06,.2],hueBands:ds},light:{l:[.9,.99],c:[.02,.1],hueBands:ds},warm:{l:[.55,.8],c:[.12,.24],hueBands:ds},cool:{l:[.55,.85],c:[.1,.22],hueBands:ds}},ps={background:`#ffbe08`,light:`#fef8a8`,warm:`#f86b01`,cool:`#4dc825`},ms={background:`#f7a8a0`,light:`#fff0f0`,warm:`#f2555a`,cool:`#8a6cf0`},hs={background:`#8fd8e8`,light:`#f2fdff`,warm:`#2f8cf0`,cool:`#1fbfa6`},gs={lightOpacity:.8151,glassScreen:.1836,glassFilter:1,colourOpacity:.7889},_s={deepDL:.1256,deepHue:.6534,haloMix:1,haloC:.6728,glassMix:.7912,glassC:.3688,shadeDL:.0659},vs=e=>(e%360+360)%360,ys=e=>e>60&&e<140;function bs(e,t,n,r){let i=vs(t-e+180)-180,a=vs(e+i*n);if(r>=.8||ys(e)||!ys(a))return a;let o=vs(e+(i-Math.sign(i)*360)*n);return ys(o)?o-60<140-o?60:140:o}function xs(e){let t=_s,n=u(e.background),r=u(e.light),i=u(e.warm),a=u(e.cool),o=n.l-t.deepDL,s=U({l:o,c:n.c,h:bs(n.h,i.h,t.deepHue,o)}),c=H(Cs(V(n),V(r),t.haloMix)),l=U({l:c.l,c:n.c*t.haloC,h:c.h}),d=H(Cs(V(r),V(a),t.glassMix)),f=U({l:r.l,c:d.c*t.glassC,h:d.h}),p=V(r);return{bg:V(n),bgDeep:V(s),halo:V(l),light:p,glass:V(f),glow:[.99,p[1]*.5,p[2]*.5],warm:V(i),cool:V(a),warmShade:V(U({...i,l:Ss(i,t.shadeDL)})),coolShade:V(U({...a,l:Ss(a,t.shadeDL)}))}}function Ss(e,t){let n=e.c<.04?0:e.h>61.5&&e.h<138.5?.8:e.h>36.5&&e.h<58.5?.6:0;return Math.max(e.l-t,Math.min(e.l,n))}var Cs=(e,t,n)=>[e[0]+(t[0]-e[0])*n,e[1]+(t[1]-e[1])*n,e[2]+(t[2]-e[2])*n],ws=40,Ts=.03,Es=e=>e.kind===`light`&&e.opacity<1,Ds=e=>[Math.max(e,1)/2,Math.max(1/e,1)/2];function Os(e,t,n=64){let[r,i]=Ds(t),a=0;for(let t=0;t<n;t++){let o=-i+(t+.5)/n*2*i;for(let t=0;t<n;t++){let i=-r+(t+.5)/n*2*r;e.discs.some(e=>(i-e.c[0])**2+(o-e.c[1])**2<e.r*e.r)||a++}}return a/(n*n)}function ks(e,t){let[n,r]=Ds(t);return Math.abs(e.c[0])+e.r>n||Math.abs(e.c[1])+e.r>r}function As(e,t){let n=e.discs.filter(e=>!Es(e)),r=Os(e,t,32),i=Math.max(0,.1-r)+Math.max(0,r-.4);i+=Math.max(0,.6-n.filter(e=>ks(e,t)).length/n.length);for(let e=0;e<n.length;e++)for(let t=e+1;t<n.length;t++){let r=n[e],a=n[t];i+=10*Math.max(0,.35*Math.min(r.r,a.r)-Math.hypot(r.c[0]-a.c[0],r.c[1]-a.c[1]))}let a=n[n.length-1];return n.some(e=>(e.kind===`warm`||e.kind===`cool`)&&Math.hypot(e.c[0]-a.c[0],e.c[1]-a.c[1])<=a.r+e.r-.15*a.r)||(i+=.5),i}var js=(e,t)=>Math.atan2(t[1]-e[1],t[0]-e[0]);function Ms(e,t,n){let[r,i]=Ds(t),a=(t,n)=>t+(n-t)*e(),o=()=>a(.32,.48)*n.size,s=t>3?2:+(t>2),c=Math.min(7,Math.max(4,Math.round(5*n.discs)))+s,l=[0,0],u={c:[a(-r-.1,-r+.25),a(0,i+.05)],r:o(),kind:`light`,opacity:1,soft:Ts*n.soft,rim:a(.8,1),rimAngle:0,shadeAngle:0,glowAngle:0};u.rimAngle=js(u.c,l)+a(-.6,.6),u.glowAngle=js(u.c,l);let d=[u];e()<.4&&d.push({c:[u.c[0]+a(-.3,-.1),u.c[1]+a(-.3,0)],r:u.r*a(1,1.15),kind:`light`,opacity:a(.15,.3),soft:Ts*n.soft,rim:a(.2,.4),rimAngle:u.rimAngle,shadeAngle:0,glowAngle:u.glowAngle});let f=c-2,p=e()<.5;for(let t=0;t<f;t++){let s={c:[t%2==0?a(0,r+.15):a(-r+.1,r+.15),a(-i-.15,i+.15)],r:o(),kind:p?`warm`:`cool`,opacity:1,soft:a(.06,.09)*n.soft,rim:e()<.5?a(.2,.35):0,rimAngle:0,shadeAngle:0,glowAngle:0};s.rimAngle=js(s.c,u.c)+a(-.4,.4),s.shadeAngle=js(u.c,s.c)+a(-.5,.5),d.push(s),p=!p}let m={c:[a(-r+.1,r-.1),a(-i-.1,-.12)],r:o(),kind:`glass`,opacity:1,soft:Ts*n.soft,rim:a(.7,1),rimAngle:0,shadeAngle:0,glowAngle:0};m.rimAngle=js(m.c,l)+a(-.6,.6),m.glowAngle=js(m.c,u.c),d.push(m);let h=e()<.5;if(h)for(let e of d)e.c=[-e.c[0],e.c[1]],e.rimAngle=Math.PI-e.rimAngle,e.shadeAngle=Math.PI-e.shadeAngle,e.glowAngle=Math.PI-e.glowAngle;return{discs:d,mirror:h}}function Ns(e,t,n){let r=w(e^27406),i=null,a=1/0;for(let e=0;e<ws;e++){let e=Ms(r,t,n),o=As(e,t);if(o<a&&(i=e,a=o),o===0)break}return i}var Ps={light:0,glass:1,warm:2,cool:3},Fs=(e,t)=>[...e,...Array.from({length:t-e.length},()=>[0,0,0,0])].flat();function Is(e,t){let n=xs(Object.fromEntries(us.map(t=>[t,String(e[t])]))),r=Number(e.rims);return{u_discA:{vec4Array:Fs(t.discs.map(e=>[e.c[0],e.c[1],e.r,Ps[e.kind]]),10)},u_discB:{vec4Array:Fs(t.discs.map(e=>[e.opacity,e.soft,e.rim*r,e.rimAngle]),10)},u_discC:{vec4Array:Fs(t.discs.map(e=>[e.shadeAngle,e.glowAngle,0,0]),10)},u_count:{int:t.discs.length},u_bg:n.bg,u_bgDeep:n.bgDeep,u_halo:n.halo,u_light:n.light,u_glass:n.glass,u_warm:n.warm,u_cool:n.cool,u_warmShade:n.warmShade,u_coolShade:n.coolShade,u_glow:n.glow,u_mix:[gs.lightOpacity,gs.glassScreen,gs.glassFilter,gs.colourOpacity],u_look:[t.mirror?-1:1,Number(e.soft),r,0]}}var Ls=`// Bokeh: big soft discs of light over a warm field, composited back to front in OKLab.
// discMix, mudGuard and gamutFit are exact ports of src/recipes/bokeh/palette.ts.

#define MAX_DISCS 10
uniform vec4 u_discA[MAX_DISCS];   // cx, cy, r, kind (0 light, 1 glass, 2 warm, 3 cool)
uniform vec4 u_discB[MAX_DISCS];   // opacity, soft (edge half-width, p), rim strength, rim angle
uniform vec4 u_discC[MAX_DISCS];   // shade angle, glow angle
uniform int u_count;
uniform vec3 u_bg, u_bgDeep, u_halo, u_light, u_glass, u_glow, u_warm, u_cool, u_warmShade, u_coolShade;
uniform vec4 u_mix;                // lightOpacity, glassScreen, glassFilter, colourOpacity
uniform vec4 u_look;               // mirror, soft, rims, -

// Fitted to the original by tools/bokeh_measure.py --fit (the numpy port of this shader).
const float HALO = 0.7595;      // halo strength at the light disc's edge
const float HALO_W = 0.1829;    // halo falloff (p), × Soft
const float SHADE = 1.0262;    // colour discs' darkening toward their shade side
const float RIM = 0.06;        // rim-line peak added to L
const float RIM_W = 0.0015;    // rim-line sigma (p)
const float RIM_LOBE = 2.0;    // how fast a rim fades around the circle
const float DEEP_START = 0.3029; // distance outside the light disc where the field starts to deepen
const float DEEP_END = 0.8289;  // ... and where it reaches the deep colour
const float GLOW = 0.2725;     // inner glow of light and glass discs, toward near-white
const float GLOW_LOBE = 1.479; // how fast the glow fades around the disc from its glow angle
const float GLOW_POW = 2.9081; // how much the glow favours the disc's edge over its centre

// OKLab mix that keeps at least 70% of the interpolated chroma (palette.ts CHROMA_FLOOR): far-apart hues
// would otherwise pass through grey.
vec3 mixKeep(vec3 x, vec3 y, float t) {
  vec3 m = mix(x, y, t);
  float want = 0.7 * mix(length(x.yz), length(y.yz), t);
  float c = length(m.yz);
  if (c < want && c >= 1e-6) m.yz *= want / c;
  return m;
}

vec3 discMix(vec3 under, vec3 col, int kind, float a) {
  if (kind == 1) {
    // Glass filters toward its own colour and adds its light, in linear RGB: u·T + s·g.
    vec3 u = clamp(fromOklab(under), 0.0, 1.0);
    vec3 g = clamp(fromOklab(col), 0.0, 1.0);
    vec3 T = 1.0 + (g / max(max(g.r, max(g.g, g.b)), 1e-6) - 1.0) * u_mix.z;
    vec3 m = toOklab(clamp(u * (1.0 + (T - 1.0) * a) + a * u_mix.y * g, 0.0, 1.0));
    // Keeps at least 60% of the chroma under it (palette.ts GLASS_FLOOR).
    float want = 0.6 * length(under.yz) * a;
    float c = length(m.yz);
    if (c < want && c >= 1e-6) m.yz *= want / c;
    return m;
  }
  return mixKeep(under, col, a * (kind == 0 ? u_mix.x : u_mix.w));
}

bool inGamut(vec3 lab) {
  vec3 rgb = fromOklab(lab);
  return all(greaterThanEqual(rgb, vec3(-1e-4))) && all(lessThanEqual(rgb, vec3(1.0 + 1e-4)));
}

// Largest chroma ≤ the current one that fits sRGB, keeping L and hue.
vec3 gamutFit(vec3 lab) {
  if (inGamut(lab)) return lab;
  float lo = 0.0, hi = 1.0;
  for (int i = 0; i < 16; i++) {
    float mid = 0.5 * (lo + hi);
    if (inGamut(vec3(lab.x, lab.yz * mid))) lo = mid; else hi = mid;
  }
  return vec3(lab.x, lab.yz * lo);
}

// Lifts mud (w = share of the colour not from a yellow pick): hue 60–140 → L ≥ 0.82, 35–60 → L ≥ 0.60; 16° ramps sit outside the bands.
vec3 mudGuard(vec3 lab, float w) {
  float c = length(lab.yz);
  float wc = w * smoothstep(0.01, 0.04, c);
  if (wc <= 0.0) return lab;
  float h = degrees(atan(lab.z, lab.y));
  if (h < 0.0) h += 360.0;
  float wy = smoothstep(44.0, 60.0, h) * (1.0 - smoothstep(140.0, 156.0, h));
  float wb = smoothstep(19.0, 35.0, h) * (1.0 - smoothstep(60.0, 76.0, h));
  float l = max(lab.x, max(lab.x + (0.82 - lab.x) * wy * wc, lab.x + (0.6 - lab.x) * wb * wc));
  return vec3(l, lab.yz);
}

// How much a colour is itself yellow by hue: 0..1, smooth in hue and chroma, measured well inside the band so a
// pick the picker parks on the band's edge (within its 1.5° allowance) is not mistaken for a yellow one.
float yellowHue(vec3 lab) {
  float c = length(lab.yz);
  float h = degrees(atan(lab.z, lab.y));
  if (h < 0.0) h += 360.0;
  return smoothstep(0.02, 0.05, c) * smoothstep(61.5, 77.5, h) * (1.0 - smoothstep(122.5, 138.5, h));
}

// palette.ts noGrey: a mid-light near-grey can only come from chained mixes; lift its chroma to 0.035, hue kept.
vec3 noGrey(vec3 lab) {
  float c = length(lab.yz);
  float target = 0.035 * smoothstep(0.35, 0.4, lab.x) * (1.0 - smoothstep(0.85, 0.9, lab.x)) * smoothstep(0.003, 0.008, c);
  if (c < target) lab.yz *= target / c;
  return lab;
}

vec3 wallpaper(vec2 p) {
  float px = 1.0 / min(u_resolution.x, u_resolution.y);
  float soft = u_look.y;

  // The field: deeper away from the light disc, with the light disc's halo spilling into it.
  vec2 lc = u_discA[0].xy;
  float lr = u_discA[0].z;
  float out0 = length(p - lc) - lr;
  // Wider than 4:3, the gradient stretches with the frame so the far side isn't all deep colour.
  float stretch = max(1.0, 0.5 * u_resolution.x / min(u_resolution.x, u_resolution.y) / 0.6667);
  vec3 col = mixKeep(u_bg, u_bgDeep, smoothstep(DEEP_START, DEEP_END, out0 / stretch));
  col = mixKeep(col, u_halo, HALO * exp(-max(0.0, out0) / (HALO_W * soft)));

  // The mud guard lifts what mixing creates, never a pick. Two shares, blended like the colour so neither
  // switches on a threshold:
  //   pure: the largest share any one source holds here (1 = a pick as picked, a disc's interior or the field);
  //   yo:   how much of the colour comes from yellow picks (the faithful preset's field and light), left as picked.
  float pure = 1.0;
  float yo = yellowHue(u_bg);   // the field's derived shades (deep corner, halo) share its pick's origin
  float cover = 0.0;   // how much earlier discs cover this pixel
  for (int i = 0; i < MAX_DISCS; i++) {
    if (i >= u_count) break;
    vec4 A = u_discA[i], B = u_discB[i];
    int kind = int(A.w + 0.5);
    vec2 d = p - A.xy;
    float dist = length(d);
    float s = dist - A.z;
    float w = B.y + 0.5 * px;
    float a = (1.0 - smoothstep(-w, w, s)) * B.x;
    vec2 dir = d / max(dist, 1e-5);

    vec3 dc;
    int mk;
    if (kind == 0) { dc = u_light; mk = 0; }
    else if (kind == 1) { dc = u_glass; mk = 1; }
    else {
      float th = u_discC[i].x;
      // A linear gradient across the disc (by angle alone it would form a cone with a seam through the centre).
      float sh = min(1.0, SHADE * smoothstep(-1.0, 1.0, dot(d, vec2(cos(th), sin(th))) / A.z));   // never past the shade colour
      dc = kind == 2 ? mix(u_warm, u_warmShade, sh) : mix(u_cool, u_coolShade, sh);
      mk = 2;
    }
    // Glass modifies what it covers (always a mix) and leaves the origin as it is; light and colour discs bring their own.
    if (mk == 1) {
      pure *= 1.0 - 0.2 * a;   // full glass sits at the guard ramp's end (0.8), so the lift fades over its whole soft edge
    } else {
      // Over the open field a disc's interior is a source as drawn (its opacity is part of its look, as in the
      // original's lime corner), so purity follows coverage; over earlier discs what shows through is an overlap.
      float t = a * (mk == 0 ? u_mix.x : u_mix.w);
      // A hand-picked yellow colour disc drawn over the field is a mix too (it may sit just under its floor).
      float yp = kind >= 2 ? yellowHue(kind == 2 ? u_warm : u_cool) : 0.0;
      float te = mix(a, t, max(cover, yp));
      pure = max(pure * (1.0 - te), te);
      // Only the faithful preset's yellows (Background, Light) are exempt; a hand-picked yellow colour disc is not,
      // so its overlaps are still guarded. Judged by the pick, not the shaded colour.
      yo = mix(yo, kind == 0 ? yellowHue(u_light) : 0.0, t);
    }
    col = discMix(col, dc, mk, a);
    cover = max(cover, a);
    if (kind <= 1) {
      // Inner glow: near-white light, strongest near the edge on the side facing the glow angle.
      float gd = mod(atan(d.y, d.x) - u_discC[i].y + PI, 2.0 * PI) - PI;
      float glob = pow(max(0.0, cos(0.5 * gd)), GLOW_LOBE);
      col = mix(col, u_glow, GLOW * B.x * a * glob * pow(clamp(dist / A.z, 0.0, 1.0), GLOW_POW));
    }

    // Rim line: a thin bright gaussian on the edge, brightest toward the rim angle, filtered over the pixel footprint.
    if (B.z > 0.0) {
      float delta = mod(atan(d.y, d.x) - B.w + PI, 2.0 * PI) - PI;
      float lobe = pow(max(0.0, cos(0.5 * delta)), RIM_LOBE);
      float rw = RIM_W * (kind == 1 ? 0.7 : 1.0);
      float sig = sqrt(rw * rw + 0.25 * px * px);
      float amp = RIM * B.z * lobe * (rw / sig) * exp(-0.5 * (s / sig) * (s / sig));
      col.x += amp;
      col.yz *= 1.0 - min(0.5, 3.0 * amp);
    }
  }

  col = gamutFit(noGrey(mudGuard(col, smoothstep(0.97, 0.8, pure) * (1.0 - smoothstep(0.0, 0.5, yo)))));
  return fromOklab(col);
}
`,Rs={background:`Background`,light:`Light`,warm:`Warm`,cool:`Cool`},zs=e=>({kind:`color`,id:e,label:Rs[e],default:ps[e],...fs[e]}),Bs={discs:1,size:1,soft:1,rims:1,grain:.06},Vs=(e,t,n)=>({id:e,label:t,values:{...n,...Bs}}),Hs={id:`bokeh`,name:`Bokeh`,era:`2000s`,version:1,params:[...us.map(zs),{kind:`range`,id:`discs`,label:`Discs`,min:.6,max:1.6,step:.05,default:1},{kind:`range`,id:`size`,label:`Size`,min:.75,max:1.25,step:.01,default:1},{kind:`range`,id:`soft`,label:`Soft`,min:.5,max:2,step:.01,default:1},{kind:`range`,id:`rims`,label:`Rims`,min:0,max:2,step:.01,default:1},S(.06)],presets:[Vs(`citrus`,`Citrus`,ps),Vs(`coral`,`Coral`,ms),Vs(`lagoon`,`Lagoon`,hs)],fragment:Ls,uniforms(e,t,n){return Is(e,Ns(t,n,{discs:Number(e.discs),size:Number(e.size),soft:Number(e.soft)}))}},Us=[`deep`,`inner`,`light`,`far`],Ws={deep:{l:[.35,.65],c:[.08,.18],hueBands:G},inner:{l:[.55,.8],c:[.06,.16],hueBands:G},light:{l:[.85,.97],c:[0,.06],hueBands:G},far:{l:[.55,.85],c:[.05,.14],hueBands:G}},Gs={deep:`#4a56ae`,inner:`#9d8db6`,light:`#d4d3e7`,far:`#65c29f`},Ks={deep:`#1d3a7a`,inner:`#4f7fd8`,light:`#e6f2fb`,far:`#2fa3a0`},qs={deep:`#4f2461`,inner:`#c0567f`,light:`#fbe6dc`,far:`#d26558`},Js=e=>({topDL:e[0],topDC:e[1],topDh:e[2],botDL:e[3],botDC:e[4],botDh:e[5]}),Ys=[Js([-.0849,-.0076,-19.9199,.0641,.0085,15.267]),Js([.0343,-.0154,10.6012,-.0595,-.0151,-14.27]),Js([.07,-.0088,30,-.0909,.0253,-30]),Js([.0711,-.0213,.9002,-.1323,.0367,.1584]),Js([.1063,.0159,-50,-.1308,.0355,18.1305]),Js([.086,-.0532,22.7166,-.133,-.013,6.0607])],Xs={lavMix:.7598,lavMinC:.0386,mintMix:.4053,mintSwing:50,tintMix:0},Zs=(e,t,n)=>[e[0]+(t[0]-e[0])*n,e[1]+(t[1]-e[1])*n,e[2]+(t[2]-e[2])*n];function Qs([e,t,n,r],i){let a=H(Zs(V(t),V(n),Xs.lavMix)),o={...a,c:Math.max(a.c,Xs.lavMinC),h:a.c<.005?t.h:a.h},s=H(Zs(V(n),V(r),Xs.mintMix)),c={...s,h:K((s.c<.005?r.h:s.h)-Xs.mintSwing)};return{at:[0,i.inner,(i.inner+i.light)/2,i.light,(i.light+1)/2,1],col:[e,t,o,n,c,r]}}function $s(e,t){let n=0;for(;n<e.length-2&&t>e[n+1];)n++;let r=e[n+1]-e[n];return[n,r>0?Math.min(1,Math.max(0,(t-e[n])/r)):0]}var ec=(e,t,n,r)=>({l:e.l+t,c:Math.max(0,e.c+n),h:K(e.h+r)});function tc(e,t){return nc(Us.map(t=>u(e[t])),t)}function nc(e,t){let{at:n,col:r}=Qs(e,t),i=[],a=[],o=[];for(let e=0;e<25;e++){let[t,s]=$s(n,e/24),c=Jt(r[t],r[t+1],s),l=Ys[t],u=Ys[t+1],d=e=>l[e]+(u[e]-l[e])*s;i.push(ic(V(c),c.h)),a.push(ic(V(ec(c,d(`topDL`),d(`topDC`),d(`topDh`))),K(c.h+d(`topDh`)))),o.push(ic(V(ec(c,d(`botDL`),d(`botDC`),d(`botDh`))),K(c.h+d(`botDh`))))}return{mid:i,top:a,bot:o,grey:W(.002,.01,e[2].c)}}function rc(e){return Zs(V(u(e.deep)),V(u(e.light)),Xs.tintMix)}function ic(e,t,n=!0,r=1){let i=H(e),{l:a}=i,o=W(.01,.04,i.c);if(n&&o>0){let[e,t]=Yt(i.c,i.h);a+=(Zt(a,.82)-a)*e,a+=(Zt(a,.6)-a)*t}a=Math.min(1,Math.max(0,a));let s=r*Xt*W(.35,.4,a)*(1-W(.85,.9,a)),l=i.c<.002&&t!==void 0?t:i.h,u=i.c<.002&&t===void 0?i.c:Math.max(i.c,s),f={l:a,c:u,h:l};return f.l===i.l&&f.c===i.c&&d(c(i))?e:V(U(f))}var ac=.516,oc=(e,t,n)=>Math.min(n,Math.max(t,e)),sc=e=>Math.max(e,1)/2;function cc(e,t){return oc(Math.round(e/(4/3)*8*t),4,24)}function lc(e,t){return oc(Math.round(e/(4/3)*5*t),3,12)}var Y={sigma:.0035,dL:.058,flankL:{dx:-.044,dL:-.036},flankR:{dx:.011,dL:-.044},flankSigma:.004};function uc(e,t,n){let r=w(e^6024314),i=(e,t)=>e+(t-e)*r(),a=()=>Math.sqrt(-2*Math.log(1-r()))*Math.cos(2*Math.PI*r()),o=sc(t),s=e=>-o+2*o*e,c=i(.45,.7),l={inner:ac*c,light:c},u=s(i(.15,.35)),d=Math.floor(r()*3)+Math.floor(Math.max(0,(o-2/3)/.5)),f=[u,s(c)];for(let e=0;e<d;e++)f.push(i(-o,o));let p=.12*Math.max(1,o/(2/3)),m=.02*o,h=[],g=e=>h.every(t=>Math.abs(t-e)>=m),_=[],v=cc(t,n.streaks);for(let e=0;e<v;e++){let t=f[e%f.length],s=null;for(let e=0;e<40&&!s;e++){let n=a(),c=e<20?oc(t+n*p,-o-.1,o+.1):i(-o-.1,o+.1),l=i(.07,.33),[u,d]=r()<.5?[c,c+l]:[c-l,c];g(u)&&g(d)&&Math.abs(d-u)>=m&&(s=[u,d])}let c=i(.004,.05)*n.soft,l=i(-.05,.05),u=i(-.04,.04);s&&(h.push(s[0],s[1]),_.push({x0:s[0],x1:s[1],ramp:c,dt:l,dL:u}))}let y=[{x:u,sigma:Y.sigma,dL:Y.dL,tint:1},{x:u+Y.flankL.dx,sigma:Y.flankSigma,dL:Y.flankL.dL,tint:0},{x:u+Y.flankR.dx,sigma:Y.flankSigma,dL:Y.flankR.dL,tint:0}],b=lc(t,n.streaks);for(;y.length<b;){let e=oc(f[Math.floor(r()*f.length)]+a()*.15,-o,o),t=i(.003,.007),n=i(.006,.02)*(r()<.5?-1:1);y.push({x:e,sigma:t,dL:n,tint:0}),r()<.4&&y.length<b&&y.push({x:e+i(.015,.03),sigma:t,dL:-n,tint:0})}return{bands:_,lines:y,stops:l,mirror:r()<.5,noise:Math.floor(r()*1e3)}}var dc=(e,t)=>[...e,...Array.from({length:t-e.length},()=>[0,0,0,0])].flat();function fc(e,t){let n=Object.fromEntries(Us.map(t=>[t,String(e[t])])),r=tc(n,t.stops),i=Number(e.lines);return{u_rampMid:{vec3Array:r.mid.flat()},u_rampTop:{vec3Array:r.top.flat()},u_rampBot:{vec3Array:r.bot.flat()},u_bandA:{vec4Array:dc(t.bands.map(e=>[e.x0,e.x1,e.ramp,0]),24)},u_bandB:{vec4Array:dc(t.bands.map(e=>[e.dt,e.dL,0,0]),24)},u_line:{vec4Array:dc(t.lines.map(e=>[e.x,e.sigma,e.dL*i,e.tint]),12)},u_bandCount:{int:t.bands.length},u_lineCount:{int:t.lines.length},u_tint:rc(n),u_look:[t.mirror?-1:1,Number(e.glow),t.noise,r.grey]}}var pc=`// Spectrum: soft vertical streaks sweeping across a spectrum, lit from the top.
// Everything but the y interpolation between ramps is a function of x. colourRaw, columnLift, knee and spectrumGuard
// are exact ports of src/recipes/spectrum/palette.ts.

#define RAMP_SIZE 25
#define MAX_BANDS 24
#define MAX_LINES 12
uniform vec3 u_rampMid[RAMP_SIZE];
uniform vec3 u_rampTop[RAMP_SIZE];
uniform vec3 u_rampBot[RAMP_SIZE];
uniform vec4 u_bandA[MAX_BANDS];   // x0, x1 (p, unmirrored), ramp (edge half-width, p), -
uniform vec4 u_bandB[MAX_BANDS];   // dt (spectrum shift), dL, -, -
uniform vec4 u_line[MAX_LINES];    // x, sigma (p), dL (× Lines), tint
uniform int u_bandCount;
uniform int u_lineCount;
uniform vec3 u_tint;               // hero tint, OKLab
uniform vec4 u_look;               // mirror, glow, noise seed, no-grey floor scale (0 for a neutral Light pick)

// Fitted to the original by tools/spectrum_fit.ts.
const float TINT = 0.5839;       // how far a line's tint pulls a and b toward u_tint at its peak
const float STRIA_P = 0.006;  // striation period (p)
const float STRIA_A = 0.006;  // striation amplitude (L)

vec3 sampleRamp(int which, float t) {
  float x = clamp(t, 0.0, 1.0) * float(RAMP_SIZE - 1);
  int i = min(RAMP_SIZE - 2, int(floor(x)));
  float f = x - float(i);
  if (which == 0) return mix(u_rampMid[i], u_rampMid[i + 1], f);
  if (which == 1) return mix(u_rampTop[i], u_rampTop[i + 1], f);
  return mix(u_rampBot[i], u_rampBot[i + 1], f);
}

vec3 lch(vec3 lab) {
  float c = length(lab.yz);
  float h = c < 1e-7 ? 0.0 : degrees(atan(lab.z, lab.y));   // atan(0, 0) is undefined in GLSL ES
  return vec3(lab.x, c, h < 0.0 ? h + 360.0 : h);
}
float dHue(float a, float b) { return mod(b - a + 180.0, 360.0) - 180.0; }

// palette.ts colourRaw: ramps at t, y-interpolated (yn = +1 at the top), Glow-scaled; L and C separately (C ≥ 0).
// The hue follows the mid hue's offsets where the mid has a usable hue (C ≥ 0.02), else the OKLab interpolation's
// direction, blended over C 0.002–0.02. Returns OKLCh with the hue wrapped to 0–360 (the band checks need it).
vec3 colourRaw(float t, float yn, float glow) {
  vec3 M = sampleRamp(0, t), T = sampleRamp(1, t), B = sampleRamp(2, t);
  vec3 m = lch(M), tp = lch(T), b = lch(B);
  float k1 = glow * yn * 0.5, k2 = glow * yn * yn;
  float l = m.x + k1 * (tp.x - b.x) + k2 * ((tp.x + b.x) * 0.5 - m.x);
  float c = max(m.y + k1 * (tp.y - b.y) + k2 * ((tp.y + b.y) * 0.5 - m.y), 0.0);
  float dt = dHue(m.z, tp.z), db = dHue(m.z, b.z);
  float hA = radians(m.z + k1 * (dt - db) + k2 * (dt + db) * 0.5);
  vec2 ab = M.yz + k1 * (T.yz - B.yz) + k2 * ((T.yz + B.yz) * 0.5 - M.yz);
  float w = smoothstep(0.002, 0.02, m.y);
  vec2 d = vec2(cos(hA), sin(hA)) * w;
  float nB = length(ab);
  if (nB > 1e-9) d += ab / nB * (1.0 - w);
  float h = length(d) > 1e-9 ? degrees(atan(d.y, d.x)) : degrees(hA);
  return vec3(l, c, mod(h, 360.0));
}

bool inGamut(vec3 lab) {
  vec3 rgb = fromOklab(lab);
  return all(greaterThanEqual(rgb, vec3(-1e-4))) && all(lessThanEqual(rgb, vec3(1.0 + 1e-4)));
}

// Largest chroma ≤ the current one that fits sRGB, keeping L and hue.
vec3 gamutFit(vec3 lab) {
  if (inGamut(lab)) return lab;
  float lo = 0.0, hi = 1.0;
  for (int i = 0; i < 16; i++) {
    float mid = 0.5 * (lo + hi);
    if (inGamut(vec3(lab.x, lab.yz * mid))) lo = mid; else hi = mid;
  }
  return vec3(lab.x, lab.yz * lo);
}

// palette.ts bandWeights: how much a colour is in the olive (60–140) and brown (35–60) bands, 8° smoothing outside.
vec2 bandWeights(vec3 o) {
  float wc = smoothstep(0.01, 0.04, o.y);
  return wc * vec2(smoothstep(52.0, 60.0, o.z) * (1.0 - smoothstep(140.0, 148.0, o.z)),
                   smoothstep(27.0, 35.0, o.z) * (1.0 - smoothstep(60.0, 68.0, o.z)));
}

// palette.ts columnLift: one lift for the whole column so none of it sits in the olive band below L 0.84 or the
// brown band below 0.62. dL is the column's x-only lightness change (bands and lines).
float columnLift(float t, float dL, float glow) {
  float lift = 0.0;
  for (int k = 0; k < 9; k++) {
    vec3 o = colourRaw(t, -1.0 + 0.25 * float(k), glow);
    float l = o.x + dL;
    vec2 w = bandWeights(o);
    lift = max(lift, max(w.x * (0.84 - l), w.y * (0.62 - l)));
  }
  return lift;
}

// palette.ts knee: identity below 0.92, then eases toward 1 without a hard clip edge.
float knee(float l) { return l <= 0.92 ? l : 0.92 + 0.08 * tanh((l - 0.92) / 0.08); }

// palette.ts spectrumGuard with floors = false (the column lift did that): chroma floor 0.02 in L 0.40–0.85, L clamped,
// then gamut. \`hue\` (degrees) gives the chroma floor a direction when the colour has none of its own (C < 0.002).
vec3 spectrumGuard(vec3 lab, float hue) {
  float c = length(lab.yz);
  float l = clamp(lab.x, 0.0, 1.0);
  vec2 ab = lab.yz;
  float target = u_look.w * 0.02 * smoothstep(0.35, 0.4, l) * (1.0 - smoothstep(0.85, 0.9, l));
  if (c < 0.002) ab = target * vec2(cos(radians(hue)), sin(radians(hue)));
  else if (c < target) ab *= target / c;
  return gamutFit(vec3(l, ab));
}

// 1D value noise along x: smooth between seeded values at integer cells.
float noise1(float x, uint seed) {
  float i = floor(x), f = x - i;
  uint k = uint(int(i) + 1048576);
  float a = hash11u(k ^ seed), b = hash11u((k + 1u) ^ seed);
  return mix(a, b, f * f * (3.0 - 2.0 * f)) - 0.5;
}

vec3 wallpaper(vec2 p) {
  float px = 1.0 / min(u_resolution.x, u_resolution.y);
  float hx = 0.5 * max(u_aspect, 1.0), hy = 0.5 * max(1.0 / u_aspect, 1.0);
  float xm = u_look.x * p.x;
  float t = (xm + hx) / (2.0 * hx);
  float yn = p.y / hy;

  // Bands: soft boxes, edges widened by the pixel footprint; each shifts the spectrum and the lightness.
  float dL = 0.0;
  for (int i = 0; i < MAX_BANDS; i++) {
    if (i >= u_bandCount) break;
    vec4 A = u_bandA[i];
    float w = sqrt(A.z * A.z + px * px);
    float a = smoothstep(-1.0, 1.0, (xm - A.x) / w) - smoothstep(-1.0, 1.0, (xm - A.y) / w);
    t += a * u_bandB[i].x;
    dL += a * u_bandB[i].y;
  }

  // Lines: gaussians filtered over the footprint (σ' = √(σ² + (px/2)²), area kept); x-only, so summed first.
  float keep = 1.0;   // share of the colour's a, b not pulled toward the hero tint
  for (int i = 0; i < MAX_LINES; i++) {
    if (i >= u_lineCount) break;
    vec4 Ln = u_line[i];
    float s = sqrt(Ln.y * Ln.y + 0.25 * px * px);
    float d = (xm - Ln.x) / s;
    float g = (Ln.y / s) * exp(-0.5 * d * d);
    dL += Ln.z * g;
    keep *= 1.0 - clamp(Ln.w * g * TINT, 0.0, 1.0);
  }

  vec3 o = colourRaw(t, yn, u_look.y);
  float l = knee(o.x + dL + columnLift(t, dL, u_look.y));
  vec3 col = vec3(l, o.y * cos(radians(o.z)), o.y * sin(radians(o.z)));
  col.yz = u_tint.yz + (col.yz - u_tint.yz) * keep;

  // Striations: faint long-exposure texture, faded out before it can alias.
  float fade = 1.0 - smoothstep(0.25, 0.5, px / STRIA_P);
  col.x += STRIA_A * fade * noise1(xm / STRIA_P, pcg(uint(u_look.z) + 7u));

  return fromOklab(spectrumGuard(col, o.z));
}
`,mc={deep:`Deep`,inner:`Inner`,light:`Light`,far:`Far`},hc=e=>({kind:`color`,id:e,label:mc[e],default:Gs[e],...Ws[e]}),gc={streaks:1,lines:1,soft:1,glow:1,grain:.06},_c=(e,t,n)=>({id:e,label:t,values:{...n,...gc}}),vc={id:`spectrum`,name:`Spectrum`,era:`2000s`,version:1,params:[...Us.map(hc),{kind:`range`,id:`streaks`,label:`Streaks`,min:.6,max:1.6,step:.05,default:1},{kind:`range`,id:`lines`,label:`Lines`,min:0,max:2,step:.01,default:1},{kind:`range`,id:`soft`,label:`Soft`,min:.5,max:2,step:.01,default:1},{kind:`range`,id:`glow`,label:`Glow`,min:0,max:2,step:.01,default:1},S(.06)],presets:[_c(`pastel`,`Pastel`,Gs),_c(`ocean`,`Ocean`,Ks),_c(`ember`,`Ember`,qs)],fragment:pc,uniforms(e,t,n){return fc(e,uc(t,n,{streaks:Number(e.streaks),soft:Number(e.soft)}))}},yc=[`light`,`mid`,`deep`,`line`],bc={light:{l:[.92,1],c:[0,.05],hueBands:G},mid:{l:[.65,.85],c:[.05,.12],hueBands:G},deep:{l:[.18,.45],c:[.03,.1],hueBands:G},line:{l:[.55,.8],c:[.07,.16],hueBands:G}},xc={light:`#ffffff`,mid:`#72bfc3`,deep:`#273749`,line:`#52b459`},Sc={light:`#fff4ec`,mid:`#b39ad8`,deep:`#2a235d`,line:`#f08cb4`},Cc={light:`#fff0e2`,mid:`#e38476`,deep:`#4a1530`,line:`#d4609b`},wc={iIce:.8851,iMid:.699,iDark:.1818,iceMix:.169,floorSwing:.4483,floorC:.0659,deepSwing:.349,iceC:.0505,endL:.1465,endC:.04,deepEndSwing:45,floorEndSwing:.9207},Tc={cross:0,phi0:.0708,phiB:.1787,mixB:.5183,tintA:.107};function Ec(e){let t=K(e);return t<=27||t>=148?t:t-27<148-t?27:148}function Dc(e,t){let n=K(t.h-e.h+180)-180;return Ec(e.h+wc.floorSwing*n)}function Oc(e){let{l:t}=e,[n,r]=Yt(e.c,e.h);return t+=(Zt(t,.82)-t)*n,t+=(Zt(t,.6)-t)*r,V(U({l:Math.min(1,Math.max(0,t)),c:Math.max(0,e.c),h:e.h}))}function kc(e,t){let n=[];for(let r=0;r<33;r++){let i=r/32,a=0;for(;a<e.length-2&&i>e[a+1];)a++;let o=Math.min(1,Math.max(0,(i-e[a])/(e[a+1]-e[a])));n.push(Oc(Jt(t[a],t[a+1],o)))}return n}function Ac([e,t,n,r]){let i=wc,a=[0,i.iDark,i.iMid,i.iIce,1],o=Jt(e,t,i.iceMix),s={...o,c:Math.max(o.c,i.iceC)},c=Dc(t,r),l={l:i.endL,c:i.endC,h:Ec(n.h+i.deepEndSwing)},u={l:n.l,c:i.floorC,h:c},d={l:i.endL,c:i.endC,h:Ec(c+i.floorEndSwing)},f=kc(a,[l,n,Jt(t,{...t,h:n.h},i.deepSwing),s,e]),p=kc(a,[d,u,t,s,e]),m=f.map((e,t)=>Kt(H(p[t]),H(e)));for(let e=31;e>=0;e--){for(;m[e]-m[e+1]>180;)m[e]-=360;for(;m[e]-m[e+1]<-180;)m[e]+=360}return{deep:f,floor:p,arc:m}}function jc(e){return Ac(yc.map(t=>u(e[t])))}var X={centre:[-.903,.8908],axis:-.7838,radii:[1.8057,.7087],k:4.3808,peak:1.0449},Mc={s:[.012,.069,.6,0],w:[.007,.005]},Nc={s:[.01,.13,.75,.07],w:[.012,.0045]},Z={max:.3,nearMax:.45,min:.04,reach:4,tol:.005},Pc=.9,Fc=.25;function Ic(e,t){return e.a[0]+e.a[1]*t+e.a[2]*t*t}function Lc(e,t,n){let r=(t[0]-e.centre[0])*e.stretch[0],i=(t[1]-e.centre[1])*e.stretch[1],a=Math.cos(e.axis),o=Math.sin(e.axis),s=(r*a+i*o)/(e.radii[0]*n.size),c=(-r*o+i*a)/(e.radii[1]*n.size);return X.peak*n.glow*Math.exp(-(Math.hypot(s,c)**+e.k))}var Rc=e=>[Math.max(e,1)/2,Math.max(1/e,1)/2];function zc(e,t,n,r=1){let[i,a]=Rc(t),o=t>=1?96:Math.round(96*t),s=t>=1?Math.round(96/t):96,c=0;for(let t=0;t<s;t++)for(let l=0;l<o;l++)Lc(e,[-i+2*i*(l+.5)/o,-a+2*a*(t+.5)/s],n)>=r&&c++;return c/(o*s)}function Bc(e){let[[t,n],[r,i],[a,o]]=e,s=(n-i)*(n-o),c=(i-n)*(i-o),l=(o-n)*(o-i),u=t/s+r/c+a/l,d=-(t*(i+o))/s-r*(n+o)/c-a*(n+i)/l;return[t*i*o/s+r*n*o/c+a*n*i/l,d,u]}function Vc(e,t,n,r,i){let a=Math.hypot(t[0]-e[0],t[1]-e[1]),o=[-(t[1]-e[1])/a,(t[0]-e[0])/a];o[1]>0&&(o=[-o[0],-o[1]]);let s=n=>Bc([e,[(e[0]+t[0])/2+n*o[0],(e[1]+t[1])/2+n*o[1]],t]),c=s(n),l=Hc({a:c,y:[e[1],t[1]],s:[...r],w:[...i]},e,o);return l>1e-9&&(c=s(n*n/l)),{a:c,y:[e[1],t[1]],s:[...r],w:[...i]}}function Hc(e,t,n){let r=0;for(let i=0;i<=64;i++){let a=e.y[0]+(e.y[1]-e.y[0])*i/64;r=Math.max(r,(Ic(e,a)-t[0])*n[0]+(a-t[1])*n[1])}return r}function Uc(e,t,[n,r]){let i=1/0;return t[0]>0&&(i=Math.min(i,(n-e[0])/t[0])),t[0]<0&&(i=Math.min(i,(-n-e[0])/t[0])),t[1]>0&&(i=Math.min(i,(r-e[1])/t[1])),t[1]<0&&(i=Math.min(i,(-r-e[1])/t[1])),[e[0]+t[0]*i,e[1]+t[1]*i]}function Wc(e,t,n,r,i){let a=0,o=4;for(let s=0;s<40;s++){let s=(a+o)/2;Lc(e,[t[0]+n[0]*s,t[1]+n[1]*s],i)>r?a=s:o=s}return(a+o)/2}function Gc(e,t,n){let r=w(C(e^989822)),i=(e,t)=>e+(t-e)*r(),a=Math.PI/180,[o,s]=Rc(t),c=[2/3/o,.5/s],l=[r()<.5?1:-1,r()<.5?1:-1],u=[i(-.08,.08),i(-.08,.08)],d=X.axis+i(-8,8)*a,f=[i(.27,.42),i(.45,.65)],p=i(30,46)*a,m=i(30,46)*a,h=i(.01,.03),g=i(.01,.03),_=i(.03,.06),v=i(.8,1.2),y=i(.8,1.2),b=r()<.5?2:3,x=Array.from({length:3},()=>[i(-15,60),i(.3,.7),i(.6,1),i(.02,.05),i(.003,.007)]),S=r()*1e3,T={mirror:l,centre:[(X.centre[0]+u[0])/c[0],(X.centre[1]+u[1])/c[1]],stretch:c,axis:d,radii:[X.radii[0],X.radii[1]],k:X.k,lines:[],apex:[0,0],sheets:[],noise:S},E=[Math.cos(d)/c[0],Math.sin(d)/c[1]],D=Math.hypot(E[0],E[1]),O=[E[0]/D,E[1]/D],k=[...T.centre],A=e=>(T.centre=[k[0]-e*O[0],k[1]-e*O[1]],zc(T,t,n)),j=e=>A(e)>Z.max||zc(T,t,n,.85)>Z.nearMax,ee=0;if(j(0)){let e=0,t=Z.reach;for(;t-e>Z.tol;){let n=(e+t)/2;j(n)?e=n:t=n}ee=t}else if(n.size>=1&&n.glow>=1&&A(0)<Z.min){let e=e=>k[0]-e*O[0]<-o||k[1]-e*O[1]>s,t=-Z.reach,n=0;if(!e(t)){for(;n-t>Z.tol;){let r=(t+n)/2;e(r)?n=r:t=r}t=n}let r=t;if(A(r)<Z.min)ee=r;else{for(t=r,n=0;n-t>Z.tol;){let e=(t+n)/2;A(e)>=Z.min?t=e:n=e}ee=t}}A(ee);let M=s-2*s*f[1],te=e=>{let t=-o+2*o*.55,r=-o+2*o*.97;Lc(T,[t,M],n)<=e?r=t:Lc(T,[r,M],n)>=e&&(t=r);for(let i=0;i<40&&r-t>1e-9;i++){let i=(t+r)/2;Lc(T,[i,M],n)>e?t=i:r=i}return[(t+r)/2,M]},ne=[-Math.cos(p),-Math.sin(p)],re=[Math.cos(p),Math.sin(p)],ie=[-Math.cos(m),Math.sin(m)],N=(e,t)=>[e[0]*t,e[1]*t,e[2],e[3]*t],ae=e=>{for(let t=_;t<=_+Fc;t+=.01)if(Lc(T,[e[0]+ie[0]*t,e[1]+ie[1]*t],n)>Pc)return!1;return!0},oe=f[0],P=te(oe);for(;!ae(P)&&oe>.05;)P=te(oe-=.03);let se=Uc(P,ne,[o,s]),ce=Math.hypot(se[0]-P[0],se[1]-P[1]);for(let e=0;e<=ce;e+=.005)if(Lc(T,[P[0]+ne[0]*e,P[1]+ne[1]*e],n)>Pc){let t=Math.min(ce,Math.max(e-.005,Fc));se=[P[0]+ne[0]*t,P[1]+ne[1]*t];break}let le=Vc(se,Uc(P,re,[o,s]),h,N(Nc.s,y),Nc.w),ue=[Ic(le,P[1]),P[1]],de=[ue[0]+_*ie[0],ue[1]+_*ie[1]],fe=N(Mc.s,v),F=Uc(de,ie,[o,s]),pe=Math.hypot(F[0]-de[0],F[1]-de[1]),me=e=>[de[0]+ie[0]*e,de[1]+ie[1]*e];for(let e=0;e<=pe;e+=.005)if(Lc(T,me(e),n)>Pc){F=me(Math.min(pe,Math.max(e-.005,Fc))),e-.005<Fc&&(fe[2]=.8);break}T.lines=[Vc(F,de,g,fe,Mc.w),le],T.apex=ue;for(let[e,t,n,r,i]of x.slice(0,b)){let o=d+e*a,s=[Math.cos(o),Math.sin(o)],c=[-s[1],s[0]],l=Wc(T,T.centre,s,t,{size:1,glow:1}),u=[T.centre[0]+s[0]*l,T.centre[1]+s[1]*l],f=[u[0]-c[0]*n/2-r*s[0],u[1]-c[1]*n/2-r*s[1]],p=[u[0]+c[0]*n/2-r*s[0],u[1]+c[1]*n/2-r*s[1]],[m,h]=f[1]<p[1]?[f,p]:[p,f];T.sheets.push({a:Bc([m,u,h]),y:[m[1],h[1]],s:[.3*i,i,.5,.3*i],w:[.04,.02]})}return T}var Kc=(e,t)=>[e.a[0],e.a[1],e.a[2],e.y[0],e.y[1],e.s[0],e.s[1],e.s[2],e.s[3],e.w[0],e.w[1],t];function qc(e,t){let n=Object.fromEntries(yc.map(t=>[t,String(e[t])])),r=jc(n),i=Number(e.size),a=Number(e.glow),o=Number(e.lines),s=Number(e.sheets),c=[...t.lines.map(e=>Kc(e,o)),...t.sheets.map(e=>Kc(e,s))];for(;c.length<5;)c.push(Array(12).fill(0));return{u_rampDeep:{vec3Array:r.deep.flat()},u_rampFloor:{vec3Array:r.floor.flat()},u_rampArc:{floatArray:r.arc},u_flare:[t.centre[0],t.centre[1],t.axis,t.k],u_radii:[t.radii[0]*i,t.radii[1]*i,X.peak*a,0],u_look:[t.mirror[0],t.mirror[1],t.noise,s],u_curve:{vec4Array:c.flat()},u_sheetCount:{int:t.sheets.length},u_lineCol:V(u(n.line)),u_lightCol:V(u(n.light)),u_shade:[Tc.cross,Tc.phi0,Tc.phiB,Tc.mixB],u_shade2:[Tc.tintA,t.stretch[0],t.stretch[1],0]}}var Jc=`// Flare: a clipped white flare beyond one corner, cooling into two dark ramps blended by direction; a chevron of two
// bowed lines, faint sheets and fibres. knee, between, fieldAt, lineBOver and flareGuard are exact ports of
// src/recipes/flare/palette.ts (between as betweenArc on the CPU's continuous arc); intensity and curveStrength of src/recipes/flare/layout.ts.

#define RAMP_SIZE 33
#define MAX_CURVES 5               // 2 lines + MAX_SHEETS
uniform vec3 u_rampDeep[RAMP_SIZE];  // OKLab, I = i/(RAMP_SIZE−1)
uniform vec3 u_rampFloor[RAMP_SIZE];
uniform float u_rampArc[RAMP_SIZE]; // palette.ts Ramps.arc: Floor → Deep hue step per entry, continuous in I
uniform vec4 u_flare;              // centre (canonical q), axis (rad), k
uniform vec4 u_radii;              // along, across (× Size), peak (× Glow), -
uniform vec4 u_look;               // mirror x, mirror y, noise seed, sheets
uniform vec4 u_curve[3 * MAX_CURVES]; // [a0 a1 a2 y0] [y1 s0 sPeak tPeak] [s1 wWide wNarrow gain]
uniform int u_sheetCount;
uniform vec3 u_lineCol;            // OKLab
uniform vec3 u_lightCol;           // OKLab

uniform vec4 u_shade;              // palette.ts SHADE: cross, phi0, phiB, mixB
uniform vec4 u_shade2;             // SHADE.tintA, stretch x, stretch y (the glow in the original's 4:3 proportions), -

const float LIFT_B = 0.08;     // palette.ts LIFT_B
const float FIB_P = 0.002;     // fibre width (p)
const float FIB_STRETCH = 0.08; // fibres are 1/FIB_STRETCH times longer than wide, along the light
const float FIB_A = 0.0025;    // fibre amplitude (L, × Sheets)
const float BAND_C = 0.035;    // palette.ts BAND_C

float wrapH(float h) { return mod(h, 360.0); }
vec3 lch(vec3 lab) {
  float c = length(lab.yz);
  float h = c < 1e-7 ? 0.0 : degrees(atan(lab.z, lab.y));   // atan(0, 0) is undefined in GLSL ES
  return vec3(lab.x, c, wrapH(h));
}
vec3 labOf(vec3 o) { return vec3(o.x, o.y * cos(radians(o.z)), o.y * sin(radians(o.z))); }

// shared/guard.ts: hueWeight, betweenArc (the arc itself comes from u_rampArc).
float hueWeight(float c) { return clamp((c - 0.02) / 0.02, 0.0, 1.0); }
vec3 betweenArc(vec3 a, vec3 b, float u, float d) {
  float wa = hueWeight(a.y), wb = hueWeight(b.y);
  float ah = wa == 0.0 ? b.z : a.z;
  float start = ah + (1.0 - wa) * d;
  float span = d * max(0.0, wa + wb - 1.0);
  return vec3(mix(a.x, b.x, u), mix(a.y, b.y, u), wrapH(start + span * u));
}

float knee(float I) {
  if (I <= 0.85) return I;
  if (I >= 1.0) return 1.0;
  float d = 0.15, x = I - 0.85;
  return 0.85 + x + x * x / d - x * x * x / (d * d);
}

vec3 sampleRamp(bool deep, float I) {
  float x = clamp(I, 0.0, 1.0) * float(RAMP_SIZE - 1);
  int i = min(RAMP_SIZE - 2, int(floor(x)));
  float f = x - float(i);
  return deep ? mix(u_rampDeep[i], u_rampDeep[i + 1], f) : mix(u_rampFloor[i], u_rampFloor[i + 1], f);
}

bool inGamut(vec3 lab) {
  vec3 rgb = fromOklab(lab);
  return all(greaterThanEqual(rgb, vec3(-1e-4))) && all(lessThanEqual(rgb, vec3(1.0 + 1e-4)));
}
vec3 gamutFit(vec3 lab) {
  if (inGamut(lab)) return lab;
  float lo = 0.0, hi = 1.0;
  for (int i = 0; i < 16; i++) {
    float mid = 0.5 * (lo + hi);
    if (inGamut(vec3(lab.x, lab.yz * mid))) lo = mid; else hi = mid;
  }
  return vec3(lab.x, lab.yz * lo);
}

// guard.ts bandWeights and palette.ts bandCap / flareGuard: chroma capped at BAND_C in a dark band, the grey floor,
// L clamped, gamut. No L floors.
vec2 bandWeights(float c, float h) {
  float wc = smoothstep(0.01, 0.04, c);
  return wc * vec2(smoothstep(52.0, 60.0, h) * (1.0 - smoothstep(140.0, 148.0, h)),
                   smoothstep(27.0, 35.0, h) * (1.0 - smoothstep(60.0, 68.0, h)));
}
vec3 flareGuard(vec3 lab, float hue) {
  vec3 o = lch(lab);
  float l = clamp(o.x, 0.0, 1.0);
  float target = 0.02 * smoothstep(0.35, 0.4, l) * (1.0 - smoothstep(0.85, 0.9, l));
  float h = o.y < 0.002 ? hue : o.z;
  float c = max(o.y, target);
  vec2 w = bandWeights(c, h);
  float cap = max(w.x * (1.0 - smoothstep(0.8, 0.82, l)), w.y * (1.0 - smoothstep(0.6, 0.62, l)));
  c += (min(c, BAND_C) - c) * cap;
  return gamutFit(labOf(vec3(l, c, h)));
}

float curveStrength(vec4 R1, vec4 R2, float t) {
  float s0 = R1.y, sp = R1.z, tp = R1.w, s1 = R2.x;
  float u = clamp(t, 0.0, 1.0);
  if (u <= tp) return tp > 0.0 ? s0 + (sp - s0) * smoothstep(0.0, 1.0, u / tp) : sp;
  return tp < 1.0 ? sp + (s1 - sp) * smoothstep(0.0, 1.0, (u - tp) / (1.0 - tp)) : sp;
}

// A curve's footprint-filtered gaussian at q: returns (strength·gain·g, g).
vec2 curveAt(int i, vec2 q, float px) {
  vec4 R0 = u_curve[3 * i], R1 = u_curve[3 * i + 1], R2 = u_curve[3 * i + 2];
  float y0 = R0.w, y1 = R1.x;
  float t = (q.y - y0) / (y1 - y0);
  float past = max(min(y0, y1) - q.y, q.y - max(y0, y1));
  float fade = 1.0 - smoothstep(0.0, 0.02, past);
  if (fade <= 0.0) return vec2(0.0);
  float x = R0.x + R0.y * q.y + R0.z * q.y * q.y, dx = R0.y + 2.0 * R0.z * q.y;
  float dist = (q.x - x) / sqrt(1.0 + dx * dx);
  float s = curveStrength(R1, R2, t);
  float halfw = mix(R2.y, R2.z, R1.z > 0.0 ? s / R1.z : 0.0);
  float sigma = halfw / 1.1774;
  float sp = sqrt(sigma * sigma + 0.25 * px * px);
  float g = (sigma / sp) * exp(-0.5 * (dist / sp) * (dist / sp)) * fade;
  return vec2(s * R2.w * g, g * min(1.0, R2.w));
}

// 2D value noise with a seed.
float noise2(vec2 p, uint seed) {
  vec2 i = floor(p), f = p - i;
  vec2 u = f * f * (3.0 - 2.0 * f);
  uvec2 k = uvec2(ivec2(i) + 1048576);
  float a = hash12(k ^ seed), b = hash12((k + uvec2(1u, 0u)) ^ seed);
  float c = hash12((k + uvec2(0u, 1u)) ^ seed), d = hash12((k + uvec2(1u, 1u)) ^ seed);
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y) - 0.5;
}

vec3 wallpaper(vec2 p) {
  float px = 1.0 / min(u_resolution.x, u_resolution.y);
  vec2 q = u_look.xy * p;

  // Intensity (layout.ts intensity), darkened across the axis, then the direction blend.
  vec2 v = (q - u_flare.xy) * u_shade2.yz;
  vec2 ax = vec2(cos(u_flare.z), sin(u_flare.z));
  float u = dot(v, ax) / u_radii.x, w = (ax.x * v.y - ax.y * v.x) / u_radii.y;
  float I = u_radii.z * exp(-pow(length(vec2(u, w)), u_flare.w));
  float phi = atan(ax.x * v.y - ax.y * v.x, dot(v, ax));
  I *= exp(-u_shade.x * phi * phi);
  float k = knee(I);
  float ax32 = clamp(k, 0.0, 1.0) * float(RAMP_SIZE - 1);
  int ai = min(RAMP_SIZE - 2, int(floor(ax32)));
  float arc = mix(u_rampArc[ai], u_rampArc[ai + 1], ax32 - float(ai));
  vec3 field = betweenArc(lch(sampleRamp(false, k)), lch(sampleRamp(true, k)), smoothstep(u_shade.y - u_shade.z, u_shade.y + u_shade.z, phi), arc);

  // Line B: an OKLab mix toward the Line colour (lineBOver).
  vec2 b = curveAt(1, q, px);
  float mixB = min(1.0, u_shade.w * b.x / max(u_curve[4].z, 1e-6));
  vec3 lift = vec3(min(1.0, u_lineCol.x + LIFT_B * mixB), u_lineCol.yz);
  vec3 col = mix(labOf(field), lift, mixB);
  vec3 o = lch(col);

  // Line A and the sheets: lightness; line A also a little of the Light colour's tint.
  float keep = 1.0;
  for (int i = 0; i < MAX_CURVES; i++) {
    if (i == 1) continue;
    if (i >= 2 + u_sheetCount) break;
    vec2 a = curveAt(i, q, px);
    col.x += a.x;
    if (i == 0) keep *= 1.0 - clamp(u_shade2.x * a.y, 0.0, 1.0);   // sheets add lightness only (a tint greys them)
  }
  col.yz = u_lightCol.yz + (col.yz - u_lightCol.yz) * keep;

  // Fibres along the light, faded out before they can alias.
  vec2 vf = q - u_flare.xy;
  float r = length(vf), ang = atan(vf.y, vf.x);
  float fade = 1.0 - smoothstep(0.25, 0.5, px / FIB_P);
  col.x += FIB_A * u_look.w * fade * noise2(vec2(r * ang / FIB_P, r * FIB_STRETCH / FIB_P), pcg(uint(u_look.z) + 11u));

  return fromOklab(flareGuard(col, o.z));
}
`,Yc={light:`Light`,mid:`Mid`,deep:`Deep`,line:`Line`},Xc=e=>({kind:`color`,id:e,label:Yc[e],default:xc[e],...bc[e]}),Zc={size:1,glow:1,lines:1,sheets:1,grain:.06},Qc=(e,t,n)=>({id:e,label:t,values:{...n,...Zc}}),$c=[At,re,di,ha,ls,Hs,vc,{id:`flare`,name:`Flare`,era:`2000s`,version:1,params:[...yc.map(Xc),{kind:`range`,id:`size`,label:`Size`,min:.6,max:1.5,step:.01,default:1},{kind:`range`,id:`glow`,label:`Glow`,min:.6,max:1.4,step:.01,default:1},{kind:`range`,id:`lines`,label:`Lines`,min:0,max:2,step:.01,default:1},{kind:`range`,id:`sheets`,label:`Sheets`,min:0,max:2,step:.01,default:1},S(.06)],presets:[Qc(`aqua`,`Aqua`,xc),Qc(`dusk`,`Dusk`,Sc),Qc(`ember`,`Ember`,Cc)],fragment:Jc,uniforms(e,t,n){return qc(e,Gc(t,n,{size:Number(e.size),glow:Number(e.glow)}))}},P,de,xe,k,ur,Lr,Eo,Ae,Ie,M,Ke,nt,dt,vt,Vt,Jn],el=E,tl=$c.find(e=>e.id===`petals`)?.id??$c[0]?.id??el.id;function nl(e){return $c.find(t=>t.id===e)??(e===el.id?el:void 0)}function rl(e,t,n={mode:`auto`}){let r=e.presets[0];return{recipeId:e.id,recipeVersion:e.version,presetId:r.id,values:{...r.values},seed:t>>>0,size:n}}var il=class{state;subs=new Set;constructor(e){this.state=e}get(){return this.state}set(e){this.state={...this.state,...e};for(let e of[...this.subs])e(this.state)}subscribe(e){return this.subs.add(e),()=>this.subs.delete(e)}};function al(e,t,n,r){let i=e.presets.find(e=>e.id===t)?.values??{},a=e.presets.find(e=>e.id===r)?.values??{};return Object.fromEntries(e.params.map(e=>{let t=e.kind===`range`&&e.id in n&&n[e.id]!==i[e.id];return[e.id,t?n[e.id]:a[e.id]??n[e.id]]}))}var ol=[{id:`phone`,label:`Phone`,group:`Phone`,width:1179,height:2556},{id:`phone-large`,label:`Large phone`,group:`Phone`,width:1320,height:2868},{id:`phone-plus`,label:`Phone Plus-size`,group:`Phone`,width:1290,height:2796},{id:`android`,label:`Android FHD+`,group:`Phone`,width:1080,height:2400},{id:`android-qhd`,label:`Android QHD+`,group:`Phone`,width:1440,height:3120},{id:`tablet-11`,label:`Tablet 11″`,group:`Tablet`,width:1640,height:2360},{id:`tablet-13`,label:`Tablet 13″`,group:`Tablet`,width:2064,height:2752},{id:`laptop-13`,label:`Laptop 13″`,group:`Laptop`,width:2560,height:1664},{id:`laptop-14`,label:`Laptop 14″`,group:`Laptop`,width:3024,height:1964},{id:`laptop-15`,label:`Laptop 15″`,group:`Laptop`,width:2880,height:1864},{id:`laptop-16`,label:`Laptop 16″`,group:`Laptop`,width:3456,height:2234},{id:`fhd`,label:`1080p`,group:`Display`,width:1920,height:1080},{id:`qhd`,label:`1440p`,group:`Display`,width:2560,height:1440},{id:`uhd`,label:`4K`,group:`Display`,width:3840,height:2160},{id:`d45k`,label:`4.5K`,group:`Display`,width:4480,height:2520},{id:`d5k`,label:`5K`,group:`Display`,width:5120,height:2880},{id:`d6k`,label:`6K`,group:`Display`,width:6016,height:3384},{id:`uw`,label:`Ultrawide`,group:`Display`,width:3440,height:1440},{id:`suw`,label:`Super ultrawide`,group:`Display`,width:5120,height:1440}],sl={minSide:256,maxSide:16384,maxPixels:1e8};function cl(){return{screenW:screen.width,screenH:screen.height,dpr:window.devicePixelRatio||1,coarsePointer:matchMedia(`(pointer: coarse)`).matches}}function ll(e){let t=Math.round(e.screenW*e.dpr),n=Math.round(e.screenH*e.dpr);return e.coarsePointer&&Math.min(e.screenW,e.screenH)<600&&t>n&&([t,n]=[n,t]),{width:t,height:n}}function ul(e){let t=typeof e==`number`?e:typeof e==`string`&&/^\s*\d+\s*$/.test(e)?Number(e):NaN;return Number.isInteger(t)?t:null}function dl(e,t){let n=ul(e),r=ul(t);return n===null||r===null?{ok:!1,message:`Enter whole numbers for width and height.`}:n<sl.minSide||r<sl.minSide?{ok:!1,message:`Each side must be at least 256 pixels.`}:n>sl.maxSide||r>sl.maxSide?{ok:!1,message:`Each side can be at most 16384 pixels.`}:n*r>sl.maxPixels?{ok:!1,message:`That's too many pixels (max 100 megapixels).`}:{ok:!0,width:n,height:r}}function fl(e,t){if(e.mode===`preset`){let n=ol.find(t=>t.id===e.id);return n?{width:n.width,height:n.height}:t}return e.mode===`custom`?{width:e.width,height:e.height}:t}function pl(e,t,n){let r=e.width/e.height,i=t.width/t.height;if(Math.abs(r/i-1)<=.01)return{x:0,y:0,width:t.width,height:t.height};let a=Math.max(1,t.width-2*n),o=Math.max(1,t.height-2*n),s=a,c=s/r;return c>o&&(c=o,s=c*r),{x:(t.width-s)/2,y:(t.height-c)/2,width:s,height:c}}function ml(e){return typeof e==`string`?e.replace(/^#/,``):String(e)}function hl(e){return e.mode===`auto`?`auto`:e.mode===`preset`?e.id:`${e.width}x${e.height}`}function gl(e,t){let n=new URLSearchParams;n.set(`r`,e.recipeId),n.set(`v`,String(e.recipeVersion)),n.set(`p`,e.presetId),n.set(`s`,String(e.seed)),n.set(`z`,hl(e.size));let r=t.find(t=>t.id===e.recipeId)?.presets.find(t=>t.id===e.presetId)?.values??{};for(let[t,i]of Object.entries(e.values))r[t]!==i&&n.set(`k.${t}`,ml(i));return n.toString()}function _l(e){if(!e||e===`auto`)return{mode:`auto`};let t=/^(\d+)x(\d+)$/.exec(e);if(t){let e=dl(Number(t[1]),Number(t[2]));return e.ok?{mode:`custom`,width:e.width,height:e.height}:{mode:`auto`}}return/^[a-z0-9-]+$/.test(e)?{mode:`preset`,id:e}:{mode:`auto`}}function vl(e,t){if(e===null||!/^\d+$/.test(e))return t;let n=Number(e);return Number.isSafeInteger(n)&&n<=4294967295?n:t}function yl(e){let t;try{t=new URLSearchParams(e.replace(/^#/,``))}catch{t=new URLSearchParams}return{q:t,get:e=>{try{return t.get(e)}catch{return null}}}}function bl(e,t){let{get:n}=yl(e),r=t.find(e=>e.id===n(`r`)),i=n(`v`);return!r||i===null||!/^\d+$/.test(i)||Number(i)>=r.version?null:`This link was made with an older version of ${r.name}, so it may look slightly different now.`}function xl(e,t,n){let{q:r,get:i}=yl(e),a=t.find(e=>e.id===i(`r`))??t[0],o=a.presets.find(e=>e.id===i(`p`))??a.presets[0],s={...o.values};for(let[e,t]of r.entries()){if(!e.startsWith(`k.`))continue;let n=e.slice(2),r=a.params.find(e=>e.id===n);r&&(s[n]=r.kind===`color`?`#${t}`:t)}return{recipeId:a.id,recipeVersion:a.version,presetId:o.id,values:x(a.params,s),seed:vl(i(`s`),n>>>0),size:_l(i(`z`))}}var Sl=class extends Error{log;constructor(e,t){super(e),this.log=t,this.name=`ShaderError`}};function Cl(e){return e.getContext(`webgl2`,{antialias:!1,premultipliedAlpha:!1,preserveDrawingBuffer:!0,alpha:!1,depth:!1,stencil:!1})}function wl(e,t,n){let r=e.createShader(t);if(e.shaderSource(r,n),e.compileShader(r),!e.getShaderParameter(r,e.COMPILE_STATUS)){let t=e.getShaderInfoLog(r)||`unknown compile error`;throw e.deleteShader(r),new Sl(`Shader failed to compile: ${t.split(`
`)[0]}`,t)}return r}function Tl(e,t,n){let r=wl(e,e.VERTEX_SHADER,t),i=wl(e,e.FRAGMENT_SHADER,n),a=e.createProgram();if(e.attachShader(a,r),e.attachShader(a,i),e.linkProgram(a),e.deleteShader(r),e.deleteShader(i),!e.getProgramParameter(a,e.LINK_STATUS)){let t=e.getProgramInfoLog(a)||`unknown link error`;throw e.deleteProgram(a),new Sl(`Shader failed to link: ${t.split(`
`)[0]}`,t)}return a}var El=`#version 300 es
precision highp float;
precision highp int;

uniform vec2 u_resolution;   // full output size, px
uniform vec2 u_tileOffset;   // tile's top-left in output px (y down)
uniform vec2 u_tileSize;     // tile size in px (= drawing buffer size)
uniform float u_aspect;      // u_resolution.x / u_resolution.y
uniform uint u_seed;
uniform float u_grain;       // 0..1
out vec4 outColor;

const float PI = 3.14159265358979;
const float TAU = 6.28318530717959;

// ---- integer hashing (no sin-hash: identical on every GPU) ----
uint pcg(uint v) {
  uint state = v * 747796405u + 2891336453u;
  uint word = ((state >> ((state >> 28u) + 4u)) ^ state) * 277803737u;
  return (word >> 22u) ^ word;
}
float u2f(uint v) { return float(v >> 8u) * (1.0 / 16777216.0); }
float hash11u(uint v) { return u2f(pcg(v)); }
float hash12(uvec2 v) { return u2f(pcg(v.x ^ pcg(v.y))); }
float hash13(uvec3 v) { return u2f(pcg(v.x ^ pcg(v.y ^ pcg(v.z)))); }
/** Seeded random in [0,1) for a recipe-chosen index. */
float rand(uint i) { return hash12(uvec2(i, u_seed)); }

// ---- value noise / fbm, seeded ----
float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  uvec2 c = uvec2(ivec2(i));
  float a = hash13(uvec3(c, u_seed));
  float b = hash13(uvec3(c + uvec2(1u, 0u), u_seed));
  float d = hash13(uvec3(c + uvec2(0u, 1u), u_seed));
  float e = hash13(uvec3(c + uvec2(1u, 1u), u_seed));
  return mix(mix(a, b, u.x), mix(d, e, u.x), u.y);
}
float fbm(vec2 p, int octaves) {
  float s = 0.0;
  float a = 0.5;
  float norm = 0.0;
  for (int i = 0; i < 8; i++) {
    if (i >= octaves) break;
    s += a * vnoise(p);
    norm += a;
    p = mat2(1.6, 1.2, -1.2, 1.6) * p + 17.0;
    a *= 0.5;
  }
  return s / norm;
}

// ---- colour ----
vec3 toOklab(vec3 c) {
  vec3 lms = mat3(0.4122214708, 0.2119034982, 0.0883024619,
                  0.5363325363, 0.6806995451, 0.2817188376,
                  0.0514459929, 0.1073969566, 0.6299787005) * c;
  lms = pow(max(lms, 0.0), vec3(1.0 / 3.0));
  return mat3(0.2104542553, 1.9779984951, 0.0259040371,
              0.7936177850, -2.4285922050, 0.7827717662,
              -0.0040720468, 0.4505937099, -0.8086757660) * lms;
}
vec3 fromOklab(vec3 lab) {
  vec3 lms = mat3(1.0, 1.0, 1.0,
                  0.3963377774, -0.1055613458, -0.0894841775,
                  0.2158037573, -0.0638541728, -1.2914855480) * lab;
  lms = lms * lms * lms;
  return mat3(4.0767416621, -1.2684380046, -0.0041960863,
              -3.3077115913, 2.6097574011, -0.7034186147,
              0.2309699292, -0.3413193965, 1.7076147010) * lms;
}
vec3 mixOklab(vec3 a, vec3 b, float t) { return fromOklab(mix(toOklab(a), toOklab(b), t)); }

vec3 linearToSrgb(vec3 c) {
  return mix(c * 12.92, 1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055, step(vec3(0.0031308), c));
}

/** Anti-aliased step, ~1 output pixel wide. */
float aastep(float edge, float x) {
  float w = max(fwidth(x), 1e-6) * 0.75;
  return smoothstep(edge - w, edge + w, x);
}

vec3 wallpaper(vec2 p);

void main() {
  // Global pixel centre, y up, independent of tiling.
  vec2 g = vec2(u_tileOffset.x + gl_FragCoord.x,
                u_resolution.y - (u_tileOffset.y + (u_tileSize.y - gl_FragCoord.y)));
  float s = min(u_resolution.x, u_resolution.y);
  vec2 p = (g - 0.5 * u_resolution) / s;   // shorter side spans [-0.5, 0.5]
  vec3 lin = max(wallpaper(p), 0.0);

  // Texture: fine grain plus a soft mottle a few pixels across (the originals' slightly cloudy
  // surfaces). Luminance-only; cell size scales so the look is resolution-independent.
  float cell = max(1.0, s / 1440.0);
  uvec2 gc = uvec2(floor(g / cell));
  float n = hash13(uvec3(gc, u_seed ^ 0x9e3779b9u)) + hash13(uvec3(gc, u_seed ^ 0x85ebca6bu)) - 1.0;
  float m = fbm(g / (cell * 9.0), 3) - 0.5;
  lin *= 1.0 + u_grain * (0.05 * n + 0.2 * m);

  vec3 srgb = linearToSrgb(clamp(lin, 0.0, 1.0));
  // Triangular-PDF dither at 8 bits, per global pixel.
  uvec2 gi = uvec2(g);
  vec3 d = vec3(hash13(uvec3(gi, 1u)) + hash13(uvec3(gi, 2u)),
                hash13(uvec3(gi, 3u)) + hash13(uvec3(gi, 4u)),
                hash13(uvec3(gi, 5u)) + hash13(uvec3(gi, 6u))) - 1.0;
  outColor = vec4(srgb + d / 255.0, 1.0);
}
`,Dl=`#version 300 es
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`,Ol=class{canvas;gl;maxViewport;programs=new Map;lostCbs=[];isLost=!1;constructor(e){this.canvas=e;let t=Cl(e);if(!t)throw Error(`WebGL2 unavailable`);this.gl=t;let n=t.getParameter(t.MAX_VIEWPORT_DIMS);this.maxViewport=Math.min(n[0],n[1],t.getParameter(t.MAX_RENDERBUFFER_SIZE)),e.addEventListener(`webglcontextlost`,e=>{e.preventDefault(),this.isLost=!0,this.programs.clear();for(let e of this.lostCbs)e()}),e.addEventListener(`webglcontextrestored`,()=>{this.isLost=!1})}get lost(){return this.isLost||this.gl.isContextLost()}onContextLost(e){this.lostCbs.push(e)}program(e){let t=`${e.id}@${e.version}`,n=this.programs.get(t);return n||(n={prog:Tl(this.gl,Dl,`${El}\n#line 1 1\n${e.fragment}`),locs:new Map},this.programs.set(t,n)),n}loc(e,t){return e.locs.has(t)||e.locs.set(t,this.gl.getUniformLocation(e.prog,t)),e.locs.get(t)??null}setUniform(e,t,n){let r=this.gl,i=this.loc(e,t);i&&(typeof n==`number`?r.uniform1f(i,n):Array.isArray(n)?n.length===2?r.uniform2f(i,n[0],n[1]):n.length===3?r.uniform3f(i,n[0],n[1],n[2]):r.uniform4f(i,n[0],n[1],n[2],n[3]):`int`in n?r.uniform1i(i,n.int):`intArray`in n?r.uniform1iv(i,n.intArray):`vec3Array`in n?r.uniform3fv(i,n.vec3Array):`vec2Array`in n?r.uniform2fv(i,n.vec2Array):`vec4Array`in n?r.uniform4fv(i,n.vec4Array):r.uniform1fv(i,n.floatArray))}render(e,t,n,r,i){let a=this.gl;if(this.lost)return;let o=i??{x:0,y:0,width:r.width,height:r.height};this.canvas.width!==o.width&&(this.canvas.width=o.width),this.canvas.height!==o.height&&(this.canvas.height=o.height);let s=this.program(e);a.useProgram(s.prog),a.viewport(0,0,o.width,o.height);let c=r.width/r.height;a.uniform2f(this.loc(s,`u_resolution`),r.width,r.height),a.uniform2f(this.loc(s,`u_tileOffset`),o.x,o.y),a.uniform2f(this.loc(s,`u_tileSize`),o.width,o.height),a.uniform1f(this.loc(s,`u_aspect`),c),a.uniform1ui(this.loc(s,`u_seed`),n>>>0),a.uniform1f(this.loc(s,`u_grain`),Number(t.grain??0));for(let[r,i]of Object.entries(e.uniforms(t,n,c)))this.setUniform(s,r,i);a.drawArrays(a.TRIANGLES,0,3)}readPixels(e){let t=this.gl,{width:n,height:r}=e,i=new Uint8Array(n*r*4);t.readPixels(0,0,n,r,t.RGBA,t.UNSIGNED_BYTE,i);let a=new Uint8Array(i.length),o=n*4;for(let e=0;e<r;e++)a.set(i.subarray((r-1-e)*o,(r-e)*o),e*o);return a}dispose(){for(let e of this.programs.values())this.gl.deleteProgram(e.prog);this.programs.clear(),this.gl.getExtension(`WEBGL_lose_context`)?.loseContext()}};function kl(e,t,n=150,r=()=>performance.now()){let i=null,a=!1,o=0,s=!1,c=()=>{s||(s=!0,e(l))};function l(){if(s=!1,i){let e=i;i=null,e===`full`&&(a=!1),t(e),e===`draft`&&(a=!0)}a&&!i&&(r()-o>=n?(a=!1,t(`full`)):c())}return{request(e){o=r(),i=e?i===`full`?`full`:`draft`:`full`,c()}}}var Al=1.25,jl=3072,Ml=40;function Nl(e,t,n=!1){let r=e.width/e.height,i=t.width/t.height;if(n||Math.max(r/i,i/r)<=Al){let e=r>i?t.height*r:t.width,n=r>i?t.height:t.width/r;return{mode:`cover`,css:{x:(t.width-e)/2,y:(t.height-n)/2,width:e,height:n}}}return{mode:`frame`,css:pl(e,t,Ml)}}function Pl(e,t,n,r,i){let a=n.gl.canvas;a.classList.add(`preview`),e.append(a);let o=!1,s=()=>ll(r()),c=()=>fl(t.get().size,s());function l(e){let r=t.get(),o=nl(r.recipeId);if(!o)return;let s=c(),{mode:l,css:u}=Nl(s,{width:window.innerWidth,height:window.innerHeight},r.size.mode===`auto`);Object.assign(a.style,{left:`${u.x}px`,top:`${u.y}px`,width:`${u.width}px`,height:`${u.height}px`}),a.classList.toggle(`framed`,l===`frame`);let d=window.devicePixelRatio||1,f=u.width*d,p=u.height*d,m=Math.min(1,jl/Math.max(f,p))*(e===`draft`?.5:1);f=Math.max(1,Math.round(f*m)),p=Math.max(1,Math.round(p*m));try{n.render(o,r.values,r.seed,{width:f,height:p})}catch(e){console.error(e);return}i?.({aspect:s.width/s.height,width:f,height:p,quality:e,mode:l,css:u})}let u=kl(e=>requestAnimationFrame(e),l);return t.subscribe(()=>u.request(o)),window.addEventListener(`resize`,()=>u.request(!1)),window.addEventListener(`orientationchange`,()=>u.request(!1)),a.addEventListener(`webglcontextrestored`,()=>u.request(!1)),u.request(!1),{setInteracting(e){o=e,e||u.request(!1)},detectedSize:s,outputSize:c}}function Q(e,t={},...n){let r=document.createElement(e);for(let[e,n]of Object.entries(t))n!==void 0&&n!==!1&&(e===`class`?r.className=String(n):e===`text`?r.textContent=String(n):r.setAttribute(e,n===!0?``:String(n)));for(let e of n)e!=null&&r.append(e);return r}var Fl=(e,t)=>`${e} × ${t}`;function Il(e,t,n=Object.keys(e)){return n.every(n=>e[n]===t[n])}function Ll(e,t){return e.step>=1?String(t):t.toFixed(2)}function Rl(e,t,n){let r=``;function i(i){r=i.id,e.replaceChildren();let o=t.get();if(e.append(Q(`h2`,{class:`recipe-name`,text:i.name})),i.presets.length){let n=Q(`div`,{class:`preset-chips`,role:`group`,"aria-label":`Presets`});for(let e of i.presets){let r=Q(`button`,{type:`button`,class:`preset-chip`,"data-preset":e.id,text:e.label});r.addEventListener(`click`,()=>{let n=t.get();t.set({presetId:e.id,values:al(i,n.presetId,n.values,e.id)})}),n.append(r)}e.append(n)}let s=i.params.filter(e=>e.kind===`color`);if(s.length){let n=Q(`div`,{class:`swatches`});for(let e of s){let r=Q(`input`,{type:`color`,"data-param":e.id,"aria-label":e.label,title:e.label});r.value=String(o.values[e.id]);let i=n=>{let i=v(r.value,e);n&&(r.value=i),t.set({values:{...t.get().values,[e.id]:i}})};r.addEventListener(`input`,()=>i(!1)),r.addEventListener(`change`,()=>i(!0)),n.append(Q(`label`,{class:`swatch`},r,Q(`span`,{text:e.label})))}e.append(Q(`div`,{class:`control`},Q(`div`,{class:`control-label`,text:`Colours`}),n))}for(let r of i.params){if(r.kind!==`range`)continue;let i=Q(`input`,{type:`range`,min:r.min,max:r.max,step:r.step,"data-param":r.id,"aria-label":r.label});i.value=String(o.values[r.id]);let a=Q(`span`,{class:`control-value`,text:Ll(r,Number(o.values[r.id]))});i.addEventListener(`pointerdown`,()=>n.setInteracting(!0));let s=()=>n.setInteracting(!1);i.addEventListener(`pointerup`,s),i.addEventListener(`pointercancel`,s),i.addEventListener(`input`,()=>{let e=b(r,i.value);a.textContent=Ll(r,e),t.set({values:{...t.get().values,[r.id]:e}})}),e.append(Q(`label`,{class:`control`},Q(`div`,{class:`control-label`},Q(`span`,{text:r.label}),a),i))}let c=Q(`button`,{type:`button`,class:`btn shuffle`,text:`Shuffle`});c.addEventListener(`click`,()=>t.set({seed:T()}));let l=Q(`button`,{type:`button`,class:`btn reset`,text:`Reset`,title:`Reset all settings to this colour scheme’s defaults`});l.addEventListener(`click`,()=>{let e=t.get(),n=i.presets.find(t=>t.id===e.presetId)??i.presets[0];n&&t.set({presetId:n.id,values:{...n.values}})}),e.append(Q(`div`,{class:`control-actions`},c,l)),a()}function a(){let n=t.get(),r=nl(n.recipeId);if(!r)return;let i=r.presets.find(e=>e.id===n.presetId),a=i?Il(i.values,n.values):!1,o=r.params.filter(e=>e.kind===`color`).map(e=>e.id),s=i?Il(i.values,n.values,o):!1;e.querySelectorAll(`.preset-chip`).forEach(e=>{let t=s&&e.dataset.preset===n.presetId;e.classList.toggle(`selected`,t),e.setAttribute(`aria-pressed`,String(t))}),e.querySelectorAll(`input[data-param]`).forEach(e=>{let t=String(n.values[e.dataset.param]);if(e.value!==t&&document.activeElement!==e){e.value=t;let n=r.params.find(t=>t.id===e.dataset.param),i=e.parentElement?.querySelector(`.control-value`);n?.kind===`range`&&i&&(i.textContent=Ll(n,Number(t)))}});let c=e.querySelector(`.reset`);c&&(c.disabled=a)}let o=t.subscribe(e=>{if(e.recipeId!==r){let t=nl(e.recipeId);t&&i(t)}else a()}),s=nl(t.get().recipeId);return s&&i(s),o}var zl=(()=>{let e=new Uint32Array(256);for(let t=0;t<256;t++){let n=t;for(let e=0;e<8;e++)n=n&1?3988292384^n>>>1:n>>>1;e[t]=n>>>0}return e})();function Bl(e,t){let n=e;for(let e=0;e<t.length;e++)n=zl[(n^t[e])&255]^n>>>8;return n}function Vl(e){return(Bl(4294967295,e)^4294967295)>>>0}function Hl(e,t){let n=new Uint8Array(12+t.length),r=new DataView(n.buffer);r.setUint32(0,t.length);for(let t=0;t<4;t++)n[4+t]=e.charCodeAt(t);return n.set(t,8),r.setUint32(8+t.length,Vl(n.subarray(4,8+t.length))),n}var Ul=new Uint8Array([137,80,78,71,13,10,26,10]),Wl=class{width;height;parts=[];rowsWritten=0;prev;writer;drained;constructor(e,t){this.width=e,this.height=t;let n=new Uint8Array(13),r=new DataView(n.buffer);r.setUint32(0,e),r.setUint32(4,t),n[8]=8,n[9]=2,this.parts.push(Ul,Hl(`IHDR`,n)),this.prev=new Uint8Array(e*3);let i=new CompressionStream(`deflate`);this.writer=i.writable.getWriter();let a=i.readable.getReader();this.drained=(async()=>{for(;;){let{done:e,value:t}=await a.read();if(e)break;t.length&&this.parts.push(Hl(`IDAT`,t))}})(),this.drained.catch(()=>{})}async writeRows(e,t){if(this.rowsWritten+t>this.height)throw Error(`PngWriter: more rows than image height`);if(e.length<t*this.width*4)throw Error(`PngWriter: not enough pixel data`);let n=this.width*3,r=new Uint8Array(t*(n+1)),i=new Uint8Array(n);for(let a=0;a<t;a++){let t=a*this.width*4;for(let n=0,r=0;n<this.width*4;n+=4,r+=3)i[r]=e[t+n],i[r+1]=e[t+n+1],i[r+2]=e[t+n+2];let o=a*(n+1);r[o]=2;for(let e=0;e<n;e++)r[o+1+e]=i[e]-this.prev[e]&255;this.prev.set(i)}this.rowsWritten+=t,await this.writer.write(r)}async finish(){if(this.rowsWritten!==this.height)throw await this.writer.abort().catch(()=>{}),Error(`PngWriter: wrote ${this.rowsWritten} of ${this.height} rows`);return await this.writer.close(),await this.drained,this.parts.push(Hl(`IEND`,new Uint8Array)),new Blob(this.parts,{type:`image/png`})}async abort(){await this.writer.abort().catch(()=>{})}},Gl={"too-large":`This device can't make an image that large. Try a smaller size.`,"no-webgl":`Your browser can't draw these wallpapers (WebGL 2 is unavailable).`,"context-lost":`The graphics card was interrupted while saving. Please try again.`,aborted:`Cancelled.`},$=class extends Error{code;constructor(e){super(Gl[e]),this.code=e,this.name=`ExportError`}},Kl=256;function ql(){return typeof OffscreenCanvas<`u`?new OffscreenCanvas(1,1):document.createElement(`canvas`)}var Jl=()=>new Promise(e=>setTimeout(e,0));async function Yl(e){let{recipe:t,values:n,seed:r,width:i,height:a,signal:o,onProgress:s}=e;if(!Number.isInteger(i)||!Number.isInteger(a)||i<1||a<1||i>sl.maxSide||a>sl.maxSide||i*a>sl.maxPixels)throw new $(`too-large`);let c;try{c=new Ol(ql())}catch{throw new $(`no-webgl`)}let l=new Wl(i,a),u=Math.min(i,c.maxViewport,4096),d={width:i,height:a},f=!1;try{for(let e=0;e<a;e+=Kl){let f=Math.min(Kl,a-e),p=new Uint8Array(i*f*4);for(let a=0;a<i;a+=u){if(o?.aborted)throw new $(`aborted`);let s={x:a,y:e,width:Math.min(u,i-a),height:f};if(c.render(t,n,r,d,s),c.lost)throw new $(`context-lost`);let l=c.readPixels(s);if(c.lost)throw new $(`context-lost`);let m=s.width*4;for(let e=0;e<f;e++)p.set(l.subarray(e*m,(e+1)*m),(e*i+a)*4)}await l.writeRows(p,f),s?.((e+f)/a),await Jl()}let e=await l.finish();return f=!0,e}catch(e){throw e instanceof $?e:c.lost?new $(`context-lost`):e}finally{f||await l.abort(),c.dispose()}}function Xl(e,t,n){return`wallpaper-${e.id}-${t}x${n}.png`}async function Zl(e,t){let n=new File([e],t,{type:`image/png`});if(matchMedia(`(pointer: coarse)`).matches&&navigator.canShare?.({files:[n]}))try{await navigator.share({files:[n]});return}catch(e){if(e.name===`AbortError`)return}let r=URL.createObjectURL(e),i=document.createElement(`a`);i.href=r,i.download=t,document.body.append(i),i.click(),i.remove(),setTimeout(()=>URL.revokeObjectURL(r),6e4)}function Ql(e,t,n,r=`Download`,i={}){let a=Q(`button`,{type:`button`,class:`btn btn-primary download`}),o=Q(`p`,{class:`download-error`,role:`alert`});e.append(a,o);let s=!1,c=!1,l=()=>{if(s)return;let e=n();a.textContent=`${r} ${Fl(e.width,e.height)}`,a.disabled=c};a.addEventListener(`click`,async()=>{if(s||c)return;let e=t.get(),r=nl(e.recipeId);if(!r)return;let u=n();s=!0,a.disabled=!0,a.textContent=`Saving… 0%`,o.textContent=``,i.onExportStart?.();try{await Zl(await Yl({recipe:r,values:e.values,seed:e.seed,width:u.width,height:u.height,onProgress:e=>a.textContent=`Saving… ${Math.round(e*100)}%`}),Xl(r,u.width,u.height))}catch(e){o.textContent=e instanceof $?e.message:`Something went wrong while saving. Please try again.`,e instanceof $||console.error(e)}finally{s=!1,l()}});let u=t.subscribe(l);return window.addEventListener(`resize`,l),l(),{setBlocked(e){c=e,l()},dispose(){u(),window.removeEventListener(`resize`,l)}}}var $l=[`90s`,`2000s`,`2010s`,`2020s`];function eu(e){return $l.filter(t=>e.some(e=>e.era===t))}var tu=new Map,nu=Promise.resolve();function ru(e){return`./thumbs/${e.id}-v${e.version}.webp`}function iu(e){let t=tu.get(e.id);return t||(t=nu.then(async()=>{let t=await Yl({recipe:e,values:e.presets[0].values,seed:1,width:240,height:150});return URL.createObjectURL(t)}),nu=t.catch(()=>{}),tu.set(e.id,t)),t}var au=0;function ou(e,t,n,r=iu,i=ru){let a=++au,o=Q(`div`,{class:`strip-list`,role:`listbox`,"aria-label":`Recipes`}),s=[];for(let e of eu(n)){let r=`strip-era-${a}-${e}`,i=Q(`div`,{class:`strip-era-items`}),c=Q(`div`,{class:`strip-era`,role:`group`,"data-era":e,"aria-labelledby":r},Q(`span`,{class:`strip-era-label`,id:r,text:e}),i);for(let r of n){if(r.era!==e)continue;let n=Q(`img`,{alt:``,width:120,height:75,decoding:`async`}),a=Q(`button`,{type:`button`,class:`strip-item`,role:`option`,"data-recipe":r.id,"data-era":r.era},Q(`span`,{class:`strip-thumb`},n),Q(`span`,{class:`strip-name`,text:r.name}));a.addEventListener(`click`,()=>{let e=t.get();e.recipeId!==r.id&&(_=r.id,t.set(rl(r,e.seed,e.size)))}),i.append(a),s.push({r,item:a,img:n})}o.append(c)}let c=e=>{let t=Q(`button`,{type:`button`,class:`strip-arrow ${e}`,"aria-label":e===`start`?`Scroll recipes left`:`Scroll recipes right`});return t.innerHTML=`<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="${e===`start`?`M10 3 5 8l5 5`:`M6 3l5 5-5 5`}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,t.addEventListener(`click`,()=>o.scrollBy({left:(e===`start`?-.8:.8)*o.clientWidth,behavior:`smooth`})),t};e.append(Q(`div`,{class:`strip-scroller`},o,c(`start`),c(`end`)));let l=new Map(s.map(e=>[e.item,e])),u=new IntersectionObserver(e=>{for(let t of e){if(!t.isIntersecting)continue;u.unobserve(t.target);let{r:e,img:n}=l.get(t.target),a=()=>{r(e).then(e=>n.src=e).catch(()=>{})};i?(n.addEventListener(`error`,a,{once:!0}),n.src=i(e)):a()}},{root:o,rootMargin:`0px 400px`});for(let{item:e}of s)u.observe(e);let d=e=>{if(Math.abs(e.deltaY)<=Math.abs(e.deltaX)||o.scrollWidth<=o.clientWidth)return;e.preventDefault();let t=e.deltaMode===1?16:e.deltaMode===2?o.clientWidth:1;o.scrollLeft+=e.deltaY*t};o.addEventListener(`wheel`,d,{passive:!1});let f=()=>{let e=o.scrollWidth-o.clientWidth;o.toggleAttribute(`data-more-start`,o.scrollLeft>1),o.toggleAttribute(`data-more-end`,o.scrollLeft<e-1)};o.addEventListener(`scroll`,f,{passive:!0});function p(e){let t=o.scrollWidth-o.clientWidth,n=e.offsetLeft+e.offsetWidth/2-o.clientWidth/2;if(g){let t=o.scrollLeft,r=e.offsetLeft+e.offsetWidth+8-o.clientWidth,i=e.offsetLeft-8;n=Math.min(Math.max(t,r),i)}o.scrollLeft=Math.max(0,Math.min(t,n)),v=o.scrollLeft}let m,h=!1,g=!1,_,v=0;o.addEventListener(`scroll`,()=>{Math.abs(o.scrollLeft-v)>1&&(h=!1)});let y=new ResizeObserver(()=>{f(),h&&m&&o.clientWidth>0&&p(m)});y.observe(o);for(let e of o.querySelectorAll(`.strip-era-items`))y.observe(e);let b,x=()=>{let e=t.get().recipeId;for(let{r:t,item:n}of s)n.setAttribute(`aria-selected`,String(t.id===e));e!==b&&(b=e,m=s.find(({r:t})=>t.id===e)?.item,h=!!m,g=_===e,_=void 0,m&&o.clientWidth>0&&p(m),f())},S=t.subscribe(x);return x(),()=>{S(),y.disconnect(),u.disconnect(),o.removeEventListener(`wheel`,d),o.removeEventListener(`scroll`,f)}}function su(e,t,n,r=()=>{}){let i=Q(`select`,{"data-test":`size`,"aria-label":`Image size`}),a=Q(`option`,{value:`auto`});i.append(a);for(let e of[`Phone`,`Tablet`,`Laptop`,`Display`]){let t=Q(`optgroup`,{label:e});for(let n of ol.filter(t=>t.group===e))t.append(Q(`option`,{value:n.id,text:`${n.label} — ${Fl(n.width,n.height)}`}));i.append(t)}i.append(Q(`option`,{value:`custom`,text:`Custom…`}));let o=Q(`input`,{"data-test":`size-w`,inputmode:`numeric`,"aria-label":`Width in pixels`,placeholder:`Width`}),s=Q(`input`,{"data-test":`size-h`,inputmode:`numeric`,"aria-label":`Height in pixels`,placeholder:`Height`}),c=Q(`p`,{class:`size-error`,role:`alert`}),l=Q(`div`,{class:`size-custom-wrap`,hidden:!0},Q(`div`,{class:`size-custom`},o,Q(`span`,{text:`×`}),s),c);e.append(Q(`label`,{class:`control`},Q(`div`,{class:`control-label`,text:`Size`}),i),l);let u=()=>{let e=n();a.textContent=`Auto — ${Fl(e.width,e.height)}`};function d(){let e=dl(o.value,s.value);if(e.ok){c.textContent=``,r(!0);let n=t.get().size;(n.mode!==`custom`||n.width!==e.width||n.height!==e.height)&&t.set({size:{mode:`custom`,width:e.width,height:e.height}})}else c.textContent=e.message,r(!1)}i.addEventListener(`change`,()=>{let e=i.value;if(e===`custom`){let e=fl(t.get().size,n());o.value=String(e.width),s.value=String(e.height),l.hidden=!1,d()}else l.hidden=!0,c.textContent=``,r(!0),t.set({size:e===`auto`?{mode:`auto`}:{mode:`preset`,id:e}})}),o.addEventListener(`input`,d),s.addEventListener(`input`,d);function f(){let e=t.get().size,n=e.mode===`auto`?`auto`:e.mode===`custom`?`custom`:e.id;i.value!==n&&(i.value=n),e.mode===`custom`?(l.hidden=!1,document.activeElement!==o&&document.activeElement!==s&&(o.value=String(e.width),s.value=String(e.height))):(l.hidden=!0,c.textContent&&(c.textContent=``,r(!0)))}u(),f();let p=t.subscribe(f);return window.addEventListener(`resize`,u),()=>{p(),window.removeEventListener(`resize`,u)}}var cu=e=>e instanceof HTMLElement&&(e.isContentEditable||[`INPUT`,`SELECT`,`TEXTAREA`].includes(e.tagName))&&e.type!==`range`;function lu(e,t,n,r,i={}){let a=Q(`aside`,{class:`panel`,"aria-label":`Wallpaper settings`}),o=Q(`div`,{class:`panel-controls`}),s=Q(`div`,{class:`panel-size`}),c=Q(`div`,{class:`panel-download`});a.append(o,s,c);let l=Q(`nav`,{class:`strip`,"aria-label":`Recipes`});e.append(a,l);let u=[Rl(o,t,n)],d=Ql(c,t,n.outputSize,`Download`,i);u.push(d.dispose,su(s,t,n.detectedSize,e=>d.setBlocked(!e)),ou(l,t,r));let f=t=>e.classList.toggle(`ui-hidden`,t),p=t=>{t.key===`Escape`?f(!1):t.key!==`h`&&t.key!==`H`||t.metaKey||t.ctrlKey||t.altKey||cu(t.target)||f(!e.classList.contains(`ui-hidden`))},m=t=>{(t.target===e||t.target.classList?.contains(`preview`))&&f(!e.classList.contains(`ui-hidden`))};return window.addEventListener(`keydown`,p),e.addEventListener(`click`,m),()=>{u.forEach(e=>e()),window.removeEventListener(`keydown`,p),e.removeEventListener(`click`,m),e.classList.remove(`ui-hidden`),a.remove(),l.remove()}}var uu=[`rest`,`half`,`full`],du=40,fu=6;function pu(e,t,n,r,i={}){let a=Q(`button`,{type:`button`,class:`pill-btn`,text:`Edit`}),o=Q(`button`,{type:`button`,class:`pill-btn pill-save`,text:`Save`}),s=Q(`div`,{class:`pill`},a,Q(`span`,{class:`pill-sep`,"aria-hidden":`true`,text:`·`}),o),c=Q(`button`,{type:`button`,class:`sheet-handle`,"aria-label":`Show more or fewer settings`},Q(`span`)),l=Q(`div`,{class:`sheet-strip`}),u=Q(`div`,{class:`sheet-download`}),d=Q(`div`,{class:`sheet-controls`}),f=Q(`div`,{class:`sheet-size`}),p=Q(`section`,{class:`sheet`,"aria-label":`Wallpaper settings`,"data-detent":`rest`},c,Q(`div`,{class:`sheet-body`},l,u,d,f));e.append(s,p);let m=[ou(l,t,r),Rl(d,t,n)],h=Ql(u,t,n.outputSize,`Save`,i);m.push(h.dispose,su(f,t,n.detectedSize,e=>h.setBlocked(!e)));let g=`rest`,_=0;function v(){clearTimeout(_),p.style.transition=`none`,p.style.top=``,p.offsetHeight,p.style.transition=``}function y(t,n){if(v(),g=t,p.classList.remove(`growing`),p.dataset.detent=t,p.style.transform=``,e.classList.toggle(`sheet-open`,t!==`rest`),n===void 0||t===`rest`)return;let r=p.getBoundingClientRect().top;Math.abs(r-n)<1||(p.style.transition=`none`,p.style.top=`${n}px`,p.offsetHeight,p.style.transition=``,p.style.top=`${r}px`,_=window.setTimeout(v,300))}a.addEventListener(`click`,()=>y(`half`)),o.addEventListener(`click`,()=>{y(`half`),u.querySelector(`button.download`)?.click()});let b=0,x=0,S=!1,C=0;c.addEventListener(`pointerdown`,e=>{e.preventDefault(),v(),S=!0,b=e.clientY,x=p.getBoundingClientRect().top,C=0,c.setPointerCapture?.(e.pointerId),p.classList.add(`dragging`)}),c.addEventListener(`pointermove`,e=>{if(!S||(C=e.clientY-b,Math.abs(C)<=fu))return;let t=Math.min(Math.max(x+C,0),window.innerHeight-c.offsetHeight);p.style.top=`${t}px`,p.classList.toggle(`growing`,C<0)});let w=()=>{if(!S)return;S=!1,p.classList.remove(`dragging`);let e=p.getBoundingClientRect().top,t=uu.indexOf(g);y(Math.abs(C)<=fu?g===`full`?`half`:uu[Math.min(t+1,2)]:C<-40?uu[Math.min(t+1,2)]:C>du?uu[Math.max(t-1,0)]:g,e)};c.addEventListener(`pointerup`,w),c.addEventListener(`pointercancel`,w),c.addEventListener(`lostpointercapture`,w),c.addEventListener(`click`,e=>{e.detail===0&&y(g===`full`?`half`:`full`,p.getBoundingClientRect().top)});let T=t=>{(t.target===e||t.target.classList?.contains(`preview`))&&y(`rest`)};return e.addEventListener(`click`,T),y(`rest`),{setDetent:y,destroy(){clearTimeout(_),m.forEach(e=>e()),e.removeEventListener(`click`,T),e.classList.remove(`sheet-open`),s.remove(),p.remove()}}}function mu(e,t){if(e.querySelector(`.link-notice`)?.remove(),!t)return;let n=Q(`button`,{type:`button`,"aria-label":`Dismiss`,text:`×`}),r=Q(`div`,{class:`link-notice`,role:`status`},Q(`span`,{text:t}),n);n.addEventListener(`click`,()=>r.remove()),e.append(r)}var hu=document.getElementById(`app`),gu=$c.length?$c:[el],_u=gu.find(e=>e.id===tl)??gu[0],vu=[_u,...gu.filter(e=>e!==_u)],yu=new il(xl(location.hash,vu,T())),bu=new URLSearchParams(location.search).has(`debug`),xu={store:yu,lastDraw:null,drawCount:0,exportCount:0};bu&&(window.__app=xu);var Su=``,Cu=0;yu.subscribe(e=>{clearTimeout(Cu),Cu=window.setTimeout(()=>{Su=gl(e,gu),history.replaceState(null,``,`${location.pathname}${location.search}#${Su}`)},250)}),window.addEventListener(`hashchange`,()=>{let e=location.hash.replace(/^#/,``);e!==Su&&(yu.set(xl(e,vu,yu.get().seed)),mu(hu,bl(e,vu)))});var wu=null;try{wu=new Ol(document.createElement(`canvas`))}catch{hu.innerHTML=`<div class="fatal">Your browser can't draw these wallpapers (WebGL 2 is unavailable).</div>`}if(wu){let e=Pl(hu,yu,wu,cl,e=>{xu.lastDraw=e,xu.drawCount++}),t={onExportStart:()=>xu.exportCount++},n=matchMedia(`(max-width: 760px)`),r=()=>{},i=()=>{r(),r=n.matches?pu(hu,yu,e,gu,t).destroy:lu(hu,yu,e,gu,t)};n.addEventListener(`change`,i),i(),mu(hu,bl(location.hash,vu))}