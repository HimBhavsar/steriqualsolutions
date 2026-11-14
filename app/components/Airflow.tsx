"use client";
import { useEffect, useRef } from "react";

/**
 * Hero visual: a cleanroom cross-section.
 * Unfiltered particles drift down into a HEPA filter, where they are captured.
 * Below it, air moves as clean unidirectional (laminar) flow toward the critical zone.
 * Moving the pointer through the clean zone disturbs the flow, the way an operator's hand would.
 */
export default function Airflow() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0, h = 0, dpr = 1;
    let filterY = 0, zoneY = 0;
    type P = { x: number; y: number; vx: number; vy: number; r: number; a: number };
    type Dash = { col: number; y: number; len: number; v: number };
    type Flash = { x: number; t: number };
    let particles: P[] = [];
    let dashes: Dash[] = [];
    let cols: number[] = [];
    const flashes: Flash[] = [];
    const pointer = { x: -999, y: -999, tx: -999, ty: -999, k: 0, kt: 0 };

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    function spawnParticle(top = false): P {
      return {
        x: rand(0, w),
        y: top ? rand(-40, -4) : rand(0, filterY - 10),
        vx: rand(-0.25, 0.25),
        vy: rand(0.15, 0.45),
        r: Math.random() < 0.12 ? rand(2, 3.2) : rand(0.8, 1.8),
        a: rand(0.35, 0.85),
      };
    }

    function setup() {
      const rect = canvas!.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width; h = rect.height;
      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      filterY = h * 0.24;
      zoneY = h * 0.84;
      const n = Math.round((w * filterY) / 2600);
      particles = Array.from({ length: n }, () => spawnParticle());
      const gap = w < 500 ? 16 : 20;
      cols = [];
      for (let x = gap / 2; x < w; x += gap) cols.push(x);
      dashes = [];
      cols.forEach((c, i) => {
        let y = filterY + 14 + rand(0, 60);
        while (y < zoneY) {
          const len = rand(26, 70);
          dashes.push({ col: i, y, len, v: rand(1.1, 1.35) });
          y += len + rand(30, 90);
        }
      });
    }

    function disp(x: number, y: number) {
      if (pointer.k < 0.01) return 0;
      const dx = x - pointer.x, dy = y - pointer.y;
      const d = Math.hypot(dx, dy);
      const R = 110;
      if (d > R) return 0;
      const f = (1 - d / R) ** 2;
      return Math.sign(dx || 1) * f * 34 * pointer.k + Math.sin(y * 0.09 + t * 0.12) * f * 6 * pointer.k;
    }

    let t = 0;
    function drawStatic() {
      ctx!.clearRect(0, 0, w, h);
      // filter housing
      ctx!.fillStyle = "rgba(255,255,255,0.04)";
      ctx!.fillRect(0, filterY - 11, w, 22);
      ctx!.strokeStyle = "rgba(2,166,224,0.55)";
      ctx!.lineWidth = 1;
      ctx!.beginPath();
      ctx!.moveTo(0, filterY - 11); ctx!.lineTo(w, filterY - 11);
      ctx!.moveTo(0, filterY + 11); ctx!.lineTo(w, filterY + 11);
      ctx!.stroke();
      // pleats
      ctx!.strokeStyle = "rgba(2,166,224,0.28)";
      ctx!.beginPath();
      for (let x = 0; x <= w; x += 8) {
        ctx!.lineTo(x, (x / 8) % 2 === 0 ? filterY - 9 : filterY + 9);
      }
      ctx!.stroke();
      // critical zone surface
      const g = ctx!.createLinearGradient(0, zoneY, 0, h);
      g.addColorStop(0, "rgba(2,166,224,0.14)");
      g.addColorStop(1, "rgba(2,166,224,0)");
      ctx!.fillStyle = g;
      ctx!.fillRect(0, zoneY, w, h - zoneY);
      ctx!.strokeStyle = "rgba(255,255,255,0.5)";
      ctx!.beginPath();
      ctx!.moveTo(0, zoneY); ctx!.lineTo(w, zoneY);
      ctx!.stroke();
    }

    function frame() {
      t++;
      pointer.x += (pointer.tx - pointer.x) * 0.18;
      pointer.y += (pointer.ty - pointer.y) * 0.18;
      pointer.k += (pointer.kt - pointer.k) * 0.06;
      drawStatic();

      // particles above filter
      for (const p of particles) {
        p.vx += rand(-0.03, 0.03);
        p.vx = Math.max(-0.5, Math.min(0.5, p.vx));
        p.vy += rand(-0.02, 0.025);
        p.vy = Math.max(0.08, Math.min(0.7, p.vy));
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x += w;
        if (p.x > w) p.x -= w;
        if (p.y >= filterY - 11) {
          if (p.r > 1.6 || Math.random() < 0.35) flashes.push({ x: p.x, t: 0 });
          Object.assign(p, spawnParticle(true));
        }
        const fade = Math.min(1, (p.y + 40) / 60);
        ctx!.fillStyle = `rgba(214,224,240,${p.a * fade})`;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fill();
      }

      // capture flashes
      for (let i = flashes.length - 1; i >= 0; i--) {
        const f = flashes[i];
        f.t += 1;
        const life = f.t / 36;
        if (life >= 1) { flashes.splice(i, 1); continue; }
        ctx!.strokeStyle = `rgba(2,166,224,${0.8 * (1 - life)})`;
        ctx!.lineWidth = 1;
        ctx!.beginPath();
        ctx!.arc(f.x, filterY - 11, 1 + life * 7, 0, Math.PI * 2);
        ctx!.stroke();
      }

      // laminar flow below filter
      ctx!.lineCap = "round";
      for (const d of dashes) {
        d.y += d.v;
        if (d.y > zoneY) { d.y = filterY + 12 - d.len; }
        const x0 = cols[d.col];
        const top = Math.max(d.y, filterY + 12);
        const bot = Math.min(d.y + d.len, zoneY - 2);
        if (bot <= top) continue;
        const grad = ctx!.createLinearGradient(0, top, 0, bot);
        grad.addColorStop(0, "rgba(2,166,224,0)");
        grad.addColorStop(1, "rgba(2,166,224,0.85)");
        ctx!.strokeStyle = grad;
        ctx!.lineWidth = 1.4;
        ctx!.beginPath();
        const steps = 6;
        for (let s = 0; s <= steps; s++) {
          const yy = top + ((bot - top) * s) / steps;
          const xx = x0 + disp(x0, yy);
          if (s === 0) ctx!.moveTo(xx, yy); else ctx!.lineTo(xx, yy);
        }
        ctx!.stroke();
      }
    }

    function drawStill() {
      drawStatic();
      for (const p of particles) {
        ctx!.fillStyle = `rgba(214,224,240,${p.a})`;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.strokeStyle = "rgba(2,166,224,0.6)";
      ctx!.lineWidth = 1.4;
      for (const d of dashes) {
        const top = Math.max(d.y, filterY + 12), bot = Math.min(d.y + d.len, zoneY - 2);
        if (bot <= top) continue;
        ctx!.beginPath(); ctx!.moveTo(cols[d.col], top); ctx!.lineTo(cols[d.col], bot); ctx!.stroke();
      }
    }

    setup();
    let raf = 0, running = false;
    const loop = () => { frame(); raf = requestAnimationFrame(loop); };
    const start = () => { if (!running && !reduce) { running = true; raf = requestAnimationFrame(loop); } };
    const stop = () => { running = false; cancelAnimationFrame(raf); };

    if (reduce) drawStill(); else start();

    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()));
    io.observe(canvas);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);
    const ro = new ResizeObserver(() => { setup(); if (reduce) drawStill(); });
    ro.observe(canvas);

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      const inside = x >= 0 && x <= r.width && y > filterY && y < zoneY;
      pointer.tx = x; pointer.ty = y;
      if (pointer.x < -900) { pointer.x = x; pointer.y = y; }
      pointer.kt = inside ? 1 : 0;
    };
    const onLeave = () => { pointer.kt = 0; };
    const host = (canvas.closest("section") ?? canvas.parentElement)!;
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);

    return () => {
      stop(); io.disconnect(); ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} className="airflow-canvas" aria-hidden="true" />;
}
