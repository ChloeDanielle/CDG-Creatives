/* ============================================================
   Liquid chrome hero background (WebGL, no dependencies).
   Domain-warped noise gives a liquid height field; its surface
   normal reflects a studio-style environment, so it reads as metal.
   Renders at reduced resolution and pauses when off-screen.
   ============================================================ */
(() => {
  const canvas = document.getElementById('chromeCanvas');
  if (!canvas) return;
  const gl = canvas.getContext('webgl', { antialias: false, premultipliedAlpha: false, powerPreference: 'low-power' });
  if (!gl) { canvas.classList.add('is-fallback'); return; }

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const vert = `
    attribute vec2 p;
    void main() { gl_Position = vec4(p, 0.0, 1.0); }
  `;

  const frag = `
    precision highp float;
    uniform vec2 uRes;
    uniform float uTime;
    uniform vec2 uMouse;

    float hash(vec2 p) {
      p = fract(p * vec2(123.34, 456.21));
      p += dot(p, p + 45.32);
      return fract(p.x * p.y);
    }
    float noise(vec2 p) {
      vec2 i = floor(p), f = fract(p);
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
                 mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
    }
    float fbm(vec2 p) {
      float v = 0.0, a = 0.5;
      mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
      for (int i = 0; i < 4; i++) { v += a * noise(p); p = m * p; a *= 0.5; }
      return v;
    }
    float field(vec2 p) {
      float t = uTime * 0.07;
      vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, 1.3) - t));
      vec2 r = vec2(fbm(p + 2.0 * q + vec2(1.7, 9.2) + t * 1.2),
                    fbm(p + 2.0 * q + vec2(8.3, 2.8) - t * 0.8));
      return fbm(p + 2.2 * r);
    }

    // Studio environment: bright softbox overhead, dark horizon, cool floor bounce.
    vec3 env(vec3 d) {
      float y = d.y;
      vec3 c = mix(vec3(0.015, 0.017, 0.022), vec3(0.10, 0.11, 0.13), smoothstep(-1.0, 0.0, y));
      c = mix(c, vec3(0.92, 0.94, 0.97), smoothstep(0.05, 0.55, y));
      c -= 0.9 * vec3(1.0) * exp(-pow((y - 0.02) * 14.0, 2.0));          // horizon line
      c += vec3(0.20, 0.32, 0.55) * 0.35 * exp(-pow((y + 0.45) * 5.0, 2.0)); // cool bounce
      c += 0.6 * exp(-pow((d.x + 0.35) * 6.0, 2.0)) * smoothstep(0.0, 0.6, y); // side strip light
      return max(c, 0.0);
    }

    void main() {
      vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
      float portrait = 1.0 - min(uRes.x / uRes.y, 1.0); // 0 on landscape, ~0.55 on phones
      vec2 p = uv * (1.25 + portrait * 1.6);

      vec2 dm = uv - uMouse;
      float k = exp(-dot(dm, dm) * 6.0);
      p -= dm * k * 0.45;

      float e = 0.0035;
      float h = field(p);
      float hx = field(p + vec2(e, 0.0));
      float hy = field(p + vec2(0.0, e));
      vec3 n = normalize(vec3((h - hx) / e, (h - hy) / e, 1.6));

      vec3 v = vec3(0.0, 0.0, -1.0);
      vec3 r = reflect(v, n);
      vec3 col = env(vec3(r.x, r.y * 1.4 + (h - 0.5) * 0.9, r.z));

      float spec = pow(max(dot(n, normalize(vec3(-0.45, 0.55, 0.9))), 0.0), 80.0);
      col += spec * 0.8;

      // Fresnel-ish darkening on steep slopes keeps edges inky
      col *= mix(0.55, 1.0, n.z);

      // Pools: let the metal sink into black in the troughs
      col *= smoothstep(0.22, 0.62, h);

      // Keep the centre calmer so the name reads
      float asp = uRes.x / uRes.y;
      float centre = smoothstep(0.0, 0.85, length(uv * vec2(0.75 / min(asp, 1.0), 1.25)));
      col *= mix(0.3, 1.15, centre);

      // Vignette
      col *= 1.0 - 0.55 * pow(length(uv * vec2(0.8, 1.0)), 2.0);
      col *= 1.0 + portrait * 0.9;

      gl_FragColor = vec4(col, 1.0);
    }
  `;

  const compile = (type, src) => {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
    return s;
  };
  let prog;
  try {
    prog = gl.createProgram();
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vert));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, frag));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog));
  } catch (err) {
    console.warn('Chrome shader disabled:', err);
    canvas.classList.add('is-fallback');
    return;
  }
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, 'p');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const uRes = gl.getUniformLocation(prog, 'uRes');
  const uTime = gl.getUniformLocation(prog, 'uTime');
  const uMouse = gl.getUniformLocation(prog, 'uMouse');

  const SCALE = 0.5; // render at half resolution; the CSS upscale softens it nicely
  function resize() {
    const w = Math.max(1, Math.round(canvas.clientWidth * SCALE));
    const h = Math.max(1, Math.round(canvas.clientHeight * SCALE));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w; canvas.height = h;
      gl.viewport(0, 0, w, h);
    }
    gl.uniform2f(uRes, w, h);
  }

  let mx = 0.6, my = 0.2, tmx = mx, tmy = my;
  window.addEventListener('pointermove', (e) => {
    const r = canvas.getBoundingClientRect();
    tmx = (e.clientX - r.left - r.width / 2) / r.height;
    tmy = -(e.clientY - r.top - r.height / 2) / r.height;
  }, { passive: true });

  let visible = true, raf = null;
  const start = performance.now();
  function frame(now) {
    resize();
    mx += (tmx - mx) * 0.05;
    my += (tmy - my) * 0.05;
    gl.uniform1f(uTime, reduced ? 8.0 : (now - start) / 1000 + 8.0);
    gl.uniform2f(uMouse, mx, my);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    raf = visible && !reduced ? requestAnimationFrame(frame) : null;
  }

  new IntersectionObserver(([en]) => {
    visible = en.isIntersecting;
    if (visible && !raf) raf = requestAnimationFrame(frame);
  }).observe(canvas);
  window.addEventListener('resize', () => { if (!raf) requestAnimationFrame(frame); });
  document.addEventListener('visibilitychange', () => {
    visible = !document.hidden;
    if (visible && !raf) raf = requestAnimationFrame(frame);
  });
  raf = requestAnimationFrame(frame);
})();
