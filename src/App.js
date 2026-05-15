import React from 'react';
import { useState, useEffect, useRef } from "react";

/* ============================================================
   DUALVIRAL.COM — Complete App
   Pages: Landing → Tool → Pricing
   ============================================================ */

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #05080e;
    --surface: #0a0f1a;
    --card: #0e1525;
    --border: #172030;
    --border2: #1f2e45;
    --fb: #1877f2;
    --fb2: #4fa3ff;
    --fb-g: rgba(24,119,242,0.12);
    --tt: #ff0050;
    --tt2: #ff5580;
    --tt-g: rgba(255,0,80,0.10);
    --text: #cdd8ec;
    --muted: #445566;
    --muted2: #607080;
    --white: #f0f6ff;
    --green: #00d4a0;
    --gold: #f5a623;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* ── BG EFFECTS ── */
  .bg-wrap {
    position: fixed; inset: 0; pointer-events: none; z-index: 0; overflow: hidden;
  }
  .bg-grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(24,119,242,0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(24,119,242,0.025) 1px, transparent 1px);
    background-size: 52px 52px;
  }
  .bg-blob {
    position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.6;
  }
  .blob-fb { width: 700px; height: 700px; top: -300px; left: -200px; background: radial-gradient(circle, rgba(24,119,242,0.09) 0%, transparent 70%); }
  .blob-tt { width: 600px; height: 600px; bottom: -200px; right: -200px; background: radial-gradient(circle, rgba(255,0,80,0.07) 0%, transparent 70%); }
  .blob-mid { width: 400px; height: 400px; top: 50%; left: 50%; transform: translate(-50%,-50%); background: radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%); }

  /* ── LAYOUT ── */
  .app { position: relative; z-index: 1; }

  /* ── NAVBAR ── */
  .nav {
    position: sticky; top: 0; z-index: 200;
    display: flex; align-items: center; justify-content: space-between;
    padding: 16px 48px;
    background: rgba(5,8,14,0.88); backdrop-filter: blur(24px);
    border-bottom: 1px solid var(--border);
  }
  .nav-logo { display: flex; align-items: center; gap: 12px; cursor: pointer; }
  .logo-bars { display: flex; gap: 3px; align-items: center; }
  .lb { border-radius: 3px; }
  .lb.f { width: 5px; height: 26px; background: var(--fb); }
  .lb.m { width: 5px; height: 20px; background: linear-gradient(180deg,var(--fb),var(--tt)); }
  .lb.t { width: 5px; height: 14px; background: var(--tt); }
  .logo-txt {
    font-family: 'Syne', sans-serif; font-weight: 900; font-size: 20px; letter-spacing: -0.5px; color: var(--white);
  }
  .logo-txt .d { color: var(--fb2); }
  .logo-txt .v { color: var(--tt2); }
  .nav-right { display: flex; align-items: center; gap: 12px; }
  .nav-link {
    background: none; border: none; color: var(--muted2); font-size: 14px; cursor: pointer;
    font-family: 'DM Sans', sans-serif; padding: 8px 14px; border-radius: 8px; transition: color 0.15s;
  }
  .nav-link:hover { color: var(--text); }
  .nav-cta {
    background: linear-gradient(135deg, var(--fb), var(--tt));
    border: none; color: #fff; font-size: 14px; font-weight: 600;
    font-family: 'Syne', sans-serif; padding: 10px 22px; border-radius: 10px;
    cursor: pointer; transition: all 0.2s; letter-spacing: 0.3px;
  }
  .nav-cta:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(0,0,0,0.35); }

  /* ── HERO ── */
  .hero {
    max-width: 900px; margin: 0 auto;
    padding: 100px 32px 80px; text-align: center;
  }
  .hero-eyebrow {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 7px 18px; border-radius: 30px;
    background: rgba(255,255,255,0.04); border: 1px solid var(--border2);
    font-size: 12px; color: var(--muted2); font-weight: 500;
    letter-spacing: 1.2px; text-transform: uppercase; margin-bottom: 36px;
  }
  .eyebrow-dots { display: flex; gap: 4px; }
  .edot { width: 8px; height: 8px; border-radius: 50%; }
  .edot.fb { background: var(--fb); }
  .edot.tt { background: var(--tt); }

  .hero-h1 {
    font-family: 'Syne', sans-serif;
    font-size: clamp(44px, 8vw, 84px);
    font-weight: 900; line-height: 0.92;
    letter-spacing: -4px; color: var(--white);
    margin-bottom: 28px;
  }
  .hero-h1 .grad {
    display: block;
    background: linear-gradient(90deg, var(--fb2) 0%, #a78bfa 50%, var(--tt2) 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-sub {
    font-size: 18px; color: var(--muted2); line-height: 1.75;
    max-width: 580px; margin: 0 auto 52px; font-weight: 300;
  }
  .hero-sub strong { color: var(--text); font-weight: 500; }

  .hero-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; margin-bottom: 64px; }

  .btn-primary {
    display: flex; align-items: center; gap: 8px;
    background: linear-gradient(135deg, var(--fb), var(--tt));
    border: none; color: #fff; font-family: 'Syne', sans-serif;
    font-size: 16px; font-weight: 700; padding: 18px 36px;
    border-radius: 14px; cursor: pointer; transition: all 0.25s;
    letter-spacing: 0.3px;
  }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 16px 40px rgba(0,0,0,0.4); }

  .btn-secondary {
    display: flex; align-items: center; gap: 8px;
    background: var(--card); border: 1px solid var(--border2);
    color: var(--text); font-family: 'DM Sans', sans-serif;
    font-size: 15px; font-weight: 500; padding: 18px 32px;
    border-radius: 14px; cursor: pointer; transition: all 0.2s;
  }
  .btn-secondary:hover { border-color: var(--muted2); color: var(--white); }

  /* HERO STATS */
  .hero-stats {
    display: flex; justify-content: center; gap: 48px; flex-wrap: wrap;
    padding-top: 40px; border-top: 1px solid var(--border);
  }
  .hstat { text-align: center; }
  .hstat-val {
    font-family: 'Syne', sans-serif; font-size: 32px; font-weight: 900;
    color: var(--white); letter-spacing: -1px; line-height: 1;
    margin-bottom: 5px;
  }
  .hstat-val.fb { color: var(--fb2); }
  .hstat-val.tt { color: var(--tt2); }
  .hstat-lbl { font-size: 12px; color: var(--muted2); text-transform: uppercase; letter-spacing: 1px; }

  /* ── FEATURES SECTION ── */
  .section { padding: 100px 32px; max-width: 1100px; margin: 0 auto; }
  .section-label {
    font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 2px;
    color: var(--muted); margin-bottom: 16px;
  }
  .section-title {
    font-family: 'Syne', sans-serif; font-size: clamp(32px, 5vw, 52px);
    font-weight: 900; color: var(--white); letter-spacing: -2px;
    line-height: 1.05; margin-bottom: 16px;
  }
  .section-sub { font-size: 16px; color: var(--muted2); max-width: 520px; line-height: 1.7; margin-bottom: 60px; font-weight: 300; }

  .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }

  .feat-card {
    background: var(--card); border: 1px solid var(--border);
    border-radius: 20px; padding: 32px;
    transition: border-color 0.2s, transform 0.2s;
    position: relative; overflow: hidden;
  }
  .feat-card::before {
    content: ''; position: absolute; inset: 0; opacity: 0; transition: opacity 0.3s;
    border-radius: 20px;
  }
  .feat-card.fb-card::before { background: var(--fb-g); }
  .feat-card.tt-card::before { background: var(--tt-g); }
  .feat-card:hover { border-color: var(--border2); transform: translateY(-4px); }
  .feat-card:hover::before { opacity: 1; }

  .feat-icon {
    width: 52px; height: 52px; border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
    font-size: 24px; margin-bottom: 20px; border: 1px solid var(--border2);
  }
  .feat-icon.fb { background: rgba(24,119,242,0.1); }
  .feat-icon.tt { background: rgba(255,0,80,0.1); }
  .feat-icon.both { background: linear-gradient(135deg, rgba(24,119,242,0.1), rgba(255,0,80,0.1)); }

  .feat-title { font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 700; color: var(--white); margin-bottom: 10px; }
  .feat-desc { font-size: 14px; color: var(--muted2); line-height: 1.65; }

  /* ── HOW IT WORKS ── */
  .how-wrap { padding: 100px 32px; background: rgba(255,255,255,0.01); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
  .how-inner { max-width: 900px; margin: 0 auto; text-align: center; }
  .steps-row { display: grid; grid-template-columns: repeat(3,1fr); gap: 32px; margin-top: 60px; position: relative; }
  .steps-row::before {
    content: ''; position: absolute; top: 32px; left: 20%; right: 20%;
    height: 1px; background: linear-gradient(90deg, var(--fb), var(--tt));
    opacity: 0.3;
  }
  .step-box { position: relative; }
  .step-num {
    width: 64px; height: 64px; border-radius: 18px; margin: 0 auto 20px;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Syne', sans-serif; font-size: 24px; font-weight: 900;
    border: 1px solid var(--border2); background: var(--card);
    position: relative; z-index: 1;
  }
  .step-num.s1 { color: var(--fb2); border-color: rgba(24,119,242,0.3); }
  .step-num.s2 { color: #a78bfa; border-color: rgba(167,139,250,0.3); }
  .step-num.s3 { color: var(--tt2); border-color: rgba(255,0,80,0.3); }
  .step-title { font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 700; color: var(--white); margin-bottom: 8px; }
  .step-desc { font-size: 13px; color: var(--muted2); line-height: 1.6; }

  /* ── SOCIAL PROOF ── */
  .proof-section { padding: 100px 32px; max-width: 1000px; margin: 0 auto; }
  .proof-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }
  .proof-card {
    background: var(--card); border: 1px solid var(--border);
    border-radius: 16px; padding: 28px; transition: border-color 0.2s;
  }
  .proof-card:hover { border-color: var(--border2); }
  .proof-stars { color: var(--gold); font-size: 14px; margin-bottom: 14px; letter-spacing: 2px; }
  .proof-text { font-size: 14px; color: var(--text); line-height: 1.7; font-style: italic; margin-bottom: 20px; }
  .proof-author { display: flex; align-items: center; gap: 10px; }
  .proof-avatar {
    width: 36px; height: 36px; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px; flex-shrink: 0;
  }
  .proof-name { font-size: 13px; font-weight: 600; color: var(--white); }
  .proof-role { font-size: 11px; color: var(--muted2); }

  /* ── PRICING ── */
  .pricing-wrap { padding: 100px 32px; max-width: 900px; margin: 0 auto; text-align: center; }
  .pricing-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px; margin-top: 60px; }

  .price-card {
    background: var(--card); border: 1px solid var(--border);
    border-radius: 22px; padding: 36px 28px; position: relative;
    transition: all 0.2s; text-align: left;
  }
  .price-card:hover { transform: translateY(-4px); }
  .price-card.popular {
    border-color: transparent;
    background: linear-gradient(var(--card), var(--card)) padding-box,
                linear-gradient(135deg, var(--fb), var(--tt)) border-box;
    box-shadow: 0 0 40px rgba(24,119,242,0.1), 0 0 40px rgba(255,0,80,0.05);
  }
  .popular-badge {
    position: absolute; top: -13px; left: 50%; transform: translateX(-50%);
    background: linear-gradient(135deg, var(--fb), var(--tt));
    color: #fff; font-size: 11px; font-weight: 700;
    padding: 4px 16px; border-radius: 20px;
    font-family: 'Syne', sans-serif; letter-spacing: 0.5px;
    white-space: nowrap;
  }
  .price-plan { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px; color: var(--muted2); margin-bottom: 12px; }
  .price-amount {
    font-family: 'Syne', sans-serif; font-size: 52px; font-weight: 900;
    color: var(--white); letter-spacing: -2px; line-height: 1; margin-bottom: 4px;
  }
  .price-amount sup { font-size: 24px; vertical-align: top; margin-top: 10px; }
  .price-period { font-size: 13px; color: var(--muted2); margin-bottom: 28px; }
  .price-desc { font-size: 14px; color: var(--muted2); line-height: 1.6; margin-bottom: 28px; }
  .price-features { list-style: none; margin-bottom: 32px; display: flex; flex-direction: column; gap: 10px; }
  .price-features li { display: flex; align-items: center; gap: 10px; font-size: 13px; color: var(--text); }
  .check { font-size: 14px; }
  .check.green { color: var(--green); }
  .check.blue { color: var(--fb2); }
  .check.red { color: var(--tt2); }

  .price-btn {
    width: 100%; padding: 15px; border-radius: 12px;
    font-family: 'Syne', sans-serif; font-size: 15px; font-weight: 700;
    cursor: pointer; transition: all 0.2s; border: none; letter-spacing: 0.3px;
  }
  .price-btn.free { background: var(--surface); color: var(--muted2); border: 1px solid var(--border2); }
  .price-btn.free:hover { color: var(--text); border-color: var(--muted2); }
  .price-btn.pro { background: linear-gradient(135deg, var(--fb), var(--tt)); color: #fff; }
  .price-btn.pro:hover { transform: translateY(-1px); box-shadow: 0 12px 32px rgba(0,0,0,0.3); }
  .price-btn.agency { background: var(--surface); color: var(--text); border: 1px solid var(--border2); }
  .price-btn.agency:hover { border-color: var(--muted2); }

  /* ── CTA BANNER ── */
  .cta-banner {
    margin: 0 32px 100px; border-radius: 24px;
    background: linear-gradient(135deg, rgba(24,119,242,0.15) 0%, rgba(255,0,80,0.1) 100%);
    border: 1px solid var(--border2); padding: 72px 40px; text-align: center;
    position: relative; overflow: hidden;
  }
  .cta-banner::before {
    content: ''; position: absolute; inset: 0;
    background: radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.03) 0%, transparent 60%);
  }
  .cta-title {
    font-family: 'Syne', sans-serif; font-size: clamp(32px, 5vw, 52px);
    font-weight: 900; color: var(--white); letter-spacing: -2px; margin-bottom: 16px;
  }
  .cta-sub { font-size: 16px; color: var(--muted2); margin-bottom: 36px; font-weight: 300; }

  /* ── FOOTER ── */
  .footer {
    padding: 40px 48px; border-top: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
    flex-wrap: wrap; gap: 16px;
  }
  .footer-logo-txt { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 16px; }
  .footer-logo-txt .d { color: var(--fb2); }
  .footer-logo-txt .v { color: var(--tt2); }
  .footer-links { display: flex; gap: 24px; }
  .footer-link { font-size: 13px; color: var(--muted2); cursor: pointer; transition: color 0.15s; background: none; border: none; font-family: 'DM Sans', sans-serif; }
  .footer-link:hover { color: var(--text); }
  .footer-copy { font-size: 12px; color: var(--muted); }

  /* ── TOOL PAGE ── */
  .tool-page { min-height: 100vh; }

  .tool-hero { text-align: center; padding: 60px 32px 48px; }
  .tool-hero h2 {
    font-family: 'Syne', sans-serif; font-size: clamp(28px, 5vw, 44px);
    font-weight: 900; color: var(--white); letter-spacing: -2px; margin-bottom: 12px;
  }
  .tool-hero p { font-size: 15px; color: var(--muted2); font-weight: 300; }

  /* INPUT CARD */
  .tool-input-wrap { max-width: 660px; margin: 0 auto; padding: 0 24px 56px; }
  .tool-card {
    background: var(--card); border: 1px solid var(--border2);
    border-radius: 22px; padding: 32px;
    box-shadow: 0 24px 64px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.03);
  }
  .field-label {
    display: block; font-size: 11px; font-weight: 600; color: var(--muted);
    text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 10px;
  }
  .niche-inp {
    width: 100%; background: var(--surface); border: 1.5px solid var(--border);
    color: var(--white); padding: 16px 20px; border-radius: 12px;
    font-size: 15px; font-family: 'DM Sans', sans-serif; outline: none;
    transition: border-color 0.2s; margin-bottom: 20px;
  }
  .niche-inp:focus { border-color: var(--border2); }
  .niche-inp::placeholder { color: var(--muted); }

  .plat-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 10px; margin-bottom: 22px; }
  .plat-btn {
    display: flex; flex-direction: column; align-items: center; gap: 7px;
    padding: 15px 8px; border-radius: 12px; border: 1.5px solid var(--border);
    background: var(--surface); cursor: pointer; transition: all 0.18s;
    font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 500; color: var(--muted2);
  }
  .plat-btn:hover { border-color: var(--border2); color: var(--text); }
  .plat-btn.sel-fb { border-color: var(--fb); background: var(--fb-g); color: var(--fb2); }
  .plat-btn.sel-tt { border-color: var(--tt); background: var(--tt-g); color: var(--tt2); }
  .plat-btn.sel-both { border-color: transparent; color: var(--white);
    background: linear-gradient(var(--surface),var(--surface)) padding-box,
                linear-gradient(135deg,var(--fb),var(--tt)) border-box; }
  .plat-emoji { font-size: 22px; }

  .go-btn {
    width: 100%; padding: 17px; border-radius: 12px; border: none;
    font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 800;
    cursor: pointer; transition: all 0.25s; letter-spacing: 0.3px;
    display: flex; align-items: center; justify-content: center; gap: 8px;
  }
  .go-fb { background: linear-gradient(135deg, #1877f2, #0d5cc9); color: #fff; }
  .go-tt { background: linear-gradient(135deg, #ff0050, #c4003d); color: #fff; }
  .go-both { background: linear-gradient(135deg, #1877f2, #ff0050); color: #fff; }
  .go-off { background: var(--surface); color: var(--muted); border: 1px solid var(--border); cursor: not-allowed; }
  .go-btn:hover:not(.go-off) { transform: translateY(-2px); box-shadow: 0 14px 36px rgba(0,0,0,0.4); }

  .chips-row { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 18px; }
  .chip-lbl { width: 100%; font-size: 11px; color: var(--muted); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 2px; }
  .chip {
    padding: 5px 13px; border-radius: 20px; background: var(--surface);
    border: 1px solid var(--border); color: var(--muted2); font-size: 12px;
    cursor: pointer; transition: all 0.15s; font-family: 'DM Sans', sans-serif;
  }
  .chip:hover { border-color: var(--border2); color: var(--text); }

  /* LOADER */
  .loader-wrap { max-width: 480px; margin: 60px auto; padding: 0 24px; text-align: center; }
  .dual-ring { position: relative; width: 70px; height: 70px; margin: 0 auto 28px; }
  .ring {
    position: absolute; inset: 0; border-radius: 50%;
    border: 3px solid transparent; animation: spin 1.1s linear infinite;
  }
  .ring.a { border-top-color: var(--fb); }
  .ring.b { inset: 12px; border-top-color: var(--tt); animation-duration: 0.75s; animation-direction: reverse; }
  @keyframes spin { to { transform: rotate(360deg); } }

  .loader-title { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 800; color: var(--white); margin-bottom: 6px; }
  .loader-sub { font-size: 13px; color: var(--muted2); margin-bottom: 28px; }
  .loader-steps { display: flex; flex-direction: column; gap: 8px; }
  .lstep {
    display: flex; align-items: center; gap: 10px; font-size: 13px; color: var(--muted);
    padding: 9px 14px; border-radius: 8px; background: var(--card); border: 1px solid var(--border);
    transition: color 0.3s, border-color 0.3s;
  }
  .lstep.done { color: var(--green); border-color: rgba(0,212,160,0.2); }
  .lstep.active { color: var(--text); border-color: var(--border2); }
  .lstep-icon { width: 18px; text-align: center; font-size: 13px; }

  /* RESULTS */
  .res-wrap { max-width: 1080px; margin: 0 auto; padding: 0 24px 100px; animation: fadeUp 0.4s ease; }
  @keyframes fadeUp { from { opacity:0; transform: translateY(20px); } to { opacity:1; transform:translateY(0); } }

  .res-top {
    display: flex; align-items: flex-start; justify-content: space-between;
    margin-bottom: 32px; flex-wrap: wrap; gap: 14px;
  }
  .res-title { font-family: 'Syne', sans-serif; font-size: 26px; font-weight: 900; color: var(--white); letter-spacing: -1px; }
  .res-title .nt { background: linear-gradient(90deg, var(--fb2), var(--tt2)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .res-meta { font-size: 12px; color: var(--muted); margin-top: 4px; }

  .back-btn {
    padding: 9px 18px; border-radius: 9px; background: var(--card);
    border: 1px solid var(--border2); color: var(--muted2); font-size: 13px;
    cursor: pointer; transition: all 0.15s; font-family: 'DM Sans', sans-serif;
    display: flex; align-items: center; gap: 6px;
  }
  .back-btn:hover { color: var(--text); border-color: var(--muted2); }

  .stats-strip { display: grid; grid-template-columns: repeat(4,1fr); gap: 12px; margin-bottom: 22px; }
  .sbox { background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 16px 18px; text-align: center; }
  .sval { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 900; color: var(--white); line-height: 1; margin-bottom: 4px; }
  .sval.fb { color: var(--fb2); } .sval.tt { color: var(--tt2); }
  .slbl { font-size: 10px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.8px; }

  .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
  .rcard { background: var(--card); border: 1px solid var(--border); border-radius: 16px; overflow: hidden; transition: border-color 0.2s; }
  .rcard:hover { border-color: var(--border2); }

  .rcard-head {
    display: flex; align-items: center; gap: 10px;
    padding: 16px 20px; border-bottom: 1px solid var(--border);
  }
  .rcard-head.fh { background: linear-gradient(90deg, rgba(24,119,242,0.1), transparent); }
  .rcard-head.th { background: linear-gradient(90deg, rgba(255,0,80,0.1), transparent); }
  .rcard-head.nh { background: rgba(255,255,255,0.02); }
  .rcard-icon { font-size: 17px; }
  .rcard-title { font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 700; color: var(--white); flex: 1; }
  .ptag {
    padding: 3px 9px; border-radius: 20px; font-size: 10px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.8px;
  }
  .ptag.fb { background: rgba(24,119,242,0.15); color: var(--fb2); border: 1px solid rgba(24,119,242,0.25); }
  .ptag.tt { background: rgba(255,0,80,0.15); color: var(--tt2); border: 1px solid rgba(255,0,80,0.25); }
  .rcard-body { padding: 18px 20px; }

  .trow { display: flex; gap: 10px; padding: 10px 0; border-bottom: 1px solid rgba(23,32,48,0.8); align-items: flex-start; }
  .trow:last-child { border-bottom: none; padding-bottom: 0; }
  .tnum { width: 20px; height: 20px; border-radius: 5px; font-size: 10px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; }
  .tnum.fb { background: rgba(24,119,242,0.12); color: var(--fb2); }
  .tnum.tt { background: rgba(255,0,80,0.12); color: var(--tt2); }
  .ttitle { font-size: 13px; font-weight: 500; color: var(--text); line-height: 1.35; margin-bottom: 2px; }
  .twhy { font-size: 11px; color: var(--muted2); }
  .tpot { font-size: 9px; font-weight: 700; padding: 2px 7px; border-radius: 8px; margin-left: auto; flex-shrink: 0; margin-top: 2px; white-space: nowrap; }
  .tpot.High { background: rgba(0,212,160,0.1); color: var(--green); }
  .tpot.Medium { background: rgba(245,166,35,0.1); color: var(--gold); }

  .hrow { display: flex; align-items: center; gap: 8px; padding: 10px 12px; border-radius: 9px; background: var(--surface); border: 1px solid var(--border); margin-bottom: 7px; cursor: pointer; transition: all 0.15s; }
  .hrow:last-child { margin-bottom: 0; }
  .hrow:hover { border-color: var(--border2); }
  .hrow.fh:hover { border-color: rgba(24,119,242,0.35); }
  .hrow.th:hover { border-color: rgba(255,0,80,0.35); }
  .hnum { font-size: 10px; font-weight: 700; color: var(--muted); width: 16px; flex-shrink: 0; }
  .htxt { font-size: 13px; color: var(--text); line-height: 1.4; flex: 1; }
  .hcopy { font-size: 12px; color: var(--muted); flex-shrink: 0; transition: color 0.15s; }
  .hrow:hover .hcopy { color: var(--text); }

  .hgrp { margin-bottom: 14px; }
  .hgrp:last-child { margin-bottom: 0; }
  .hgrp-lbl { font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: var(--muted); margin-bottom: 8px; }
  .tags { display: flex; flex-wrap: wrap; gap: 6px; }
  .tag { padding: 4px 11px; border-radius: 20px; font-size: 11px; cursor: pointer; transition: all 0.15s; font-weight: 500; }
  .tag:hover { transform: translateY(-1px); filter: brightness(1.2); }
  .tag.hi { background: rgba(0,212,160,0.08); border: 1px solid rgba(0,212,160,0.2); color: var(--green); }
  .tag.md { background: rgba(245,166,35,0.08); border: 1px solid rgba(245,166,35,0.2); color: var(--gold); }
  .tag.lo { background: var(--surface); border: 1px solid var(--border); color: var(--muted2); }

  .srow { display: flex; gap: 12px; padding: 12px 0; border-bottom: 1px solid rgba(23,32,48,0.8); align-items: flex-start; }
  .srow:last-child { border-bottom: none; }
  .sicon { width: 34px; height: 34px; border-radius: 9px; background: var(--surface); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; font-size: 16px; flex-shrink: 0; }
  .stxt .stip { font-size: 13px; font-weight: 600; color: var(--white); margin-bottom: 3px; }
  .stxt .sdet { font-size: 12px; color: var(--muted2); line-height: 1.5; }

  .copy-row { display: grid; gap: 12px; margin-top: 12px; }
  .copy-row.two { grid-template-columns: 1fr 1fr; }
  .cbtn {
    padding: 13px; border-radius: 11px; border: 1px solid var(--border2);
    background: var(--card); color: var(--muted2); font-size: 13px; font-weight: 500;
    cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 7px;
    transition: all 0.15s; font-family: 'DM Sans', sans-serif;
  }
  .cbtn:hover { color: var(--text); border-color: var(--muted2); }
  .cbtn.fbc:hover { border-color: var(--fb); color: var(--fb2); }
  .cbtn.ttc:hover { border-color: var(--tt); color: var(--tt2); }

  /* TOAST */
  .toast {
    position: fixed; bottom: 24px; right: 24px; z-index: 999;
    background: var(--card); border: 1px solid var(--border2); color: var(--text);
    padding: 13px 20px; border-radius: 11px; font-size: 14px; font-weight: 500;
    display: flex; align-items: center; gap: 8px;
    box-shadow: 0 16px 48px rgba(0,0,0,0.4); animation: slideUp 0.3s ease;
  }
  @keyframes slideUp { from { transform: translateY(16px); opacity:0; } to { transform:translateY(0); opacity:1; } }

  /* RESPONSIVE */
  @media (max-width: 700px) {
    .nav { padding: 14px 20px; }
    .nav-link { display: none; }
    .two-col { grid-template-columns: 1fr; }
    .stats-strip { grid-template-columns: repeat(2,1fr); }
    .steps-row { grid-template-columns: 1fr; }
    .steps-row::before { display: none; }
    .copy-row.two { grid-template-columns: 1fr; }
    .hero { padding: 64px 20px 56px; }
    .footer { flex-direction: column; align-items: flex-start; gap: 20px; }
  }
`;

const NICHES = ["Cartoons","Cooking","Fitness","Football","Islam","Comedy","Kids","Travel","Music","Fashion","Business","Animals"];
const PROOFS = [
  { stars: "★★★★★", text: "I used to spend 2 hours finding hooks for my cooking page. DualViral gives me 5 in 10 seconds. My reach doubled in 2 weeks.", name: "Amira K.", role: "Food Creator · 280K followers", emoji: "👩‍🍳" },
  { stars: "★★★★★", text: "The side-by-side Facebook vs TikTok view is genius. Completely different strategies for the same niche — exactly what I needed.", name: "Karim B.", role: "Football Page Owner · 1.2M fans", emoji: "⚽" },
  { stars: "★★★★★", text: "As an Arabic content creator this tool is a game changer. No other tool thinks about our audience the same way.", name: "Fatima H.", role: "Lifestyle Creator · 90K followers", emoji: "🌟" },
];
const FEATURES = [
  { icon: "🔥", title: "Trending Topics", desc: "Discover the 5 hottest topics in your niche right now — with engagement potential ratings so you know what to post first.", cls: "fb-card", iconCls: "fb" },
  { icon: "⚡", title: "Viral Hook Generator", desc: "5 ready-to-use viral hooks per platform, crafted for each platform's algorithm. Click any hook to copy it instantly.", cls: "tt-card", iconCls: "tt" },
  { icon: "#️⃣", title: "Hashtag Intelligence", desc: "Organized hashtag strategy in 3 tiers — High Reach, Medium Reach, and Niche Specific — for maximum discoverability.", cls: "fb-card", iconCls: "fb" },
  { icon: "🧠", title: "Growth Strategy", desc: "Custom AI-powered action plan for your exact niche and platform. Not generic tips — real tactics that match your content.", cls: "tt-card", iconCls: "tt" },
  { icon: "⚡", title: "Dual Platform Mode", desc: "Analyze Facebook AND TikTok simultaneously. See exactly how your strategy should differ between the two platforms.", cls: "fb-card", iconCls: "both" },
  { icon: "📋", title: "One-Click Copy", desc: "Copy hooks, hashtags, and strategy points instantly. Paste directly into your scheduler or caption editor.", cls: "tt-card", iconCls: "tt" },
];
const LOAD_STEPS = [
  { icon: "🔍", label: "Scanning trending topics..." },
  { icon: "⚡", label: "Generating viral hooks..." },
  { icon: "#️⃣", label: "Building hashtag map..." },
  { icon: "🧠", label: "Crafting growth strategy..." },
  { icon: "✨", label: "Preparing your report..." },
];

export default function App() {
  const [page, setPage] = useState("landing"); // landing | tool | pricing
  const [niche, setNiche] = useState("");
  const [platform, setPlatform] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lstep, setLstep] = useState(0);
  const [results, setResults] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (m) => { setToast(m); setTimeout(() => setToast(null), 2500); };
  const copy = (t) => navigator.clipboard.writeText(t).then(() => showToast("✓ Copied!"));

  const goTool = () => { setPage("tool"); setResults(null); window.scrollTo(0,0); };

  const canGo = niche.trim() && platform;

  const getBtnCls = () => {
    if (!canGo) return "go-off";
    return platform === "facebook" ? "go-fb" : platform === "tiktok" ? "go-tt" : "go-both";
  };

  const buildPrompt = () => {
    const isBoth = platform === "both";
    const single = `{
  "niche": "${niche}", "platform": "${platform}",
  "stats": { "audience": "e.g. 2.1B", "avg_engagement": "e.g. 4.8%", "best_time": "e.g. 7-9 PM", "post_frequency": "e.g. 1x daily" },
  "trending_topics": [
    {"title":"topic","why":"reason","potential":"High"},
    {"title":"topic","why":"reason","potential":"High"},
    {"title":"topic","why":"reason","potential":"Medium"},
    {"title":"topic","why":"reason","potential":"Medium"},
    {"title":"topic","why":"reason","potential":"Medium"}
  ],
  "viral_hooks": ["Hook 1","Hook 2","Hook 3","Hook 4","Hook 5"],
  "hashtags": { "high": ["#t1","#t2","#t3","#t4"], "medium": ["#t5","#t6","#t7","#t8"], "niche": ["#t9","#t10","#t11","#t12"] },
  "strategy": [
    {"icon":"🎯","tip":"Title","detail":"detail"},
    {"icon":"📅","tip":"Title","detail":"detail"},
    {"icon":"🔥","tip":"Title","detail":"detail"},
    {"icon":"💡","tip":"Title","detail":"detail"}
  ]
}`;
    const both = `{
  "niche": "${niche}", "platform": "both",
  "stats": { "fb_audience":"e.g. 2.1B","tt_audience":"e.g. 1.4B","fb_best_time":"e.g. 7-9 PM","tt_best_time":"e.g. 6-10 PM" },
  "facebook": {
    "trending_topics":[{"title":"t","why":"w","potential":"High"},{"title":"t","why":"w","potential":"High"},{"title":"t","why":"w","potential":"Medium"},{"title":"t","why":"w","potential":"Medium"},{"title":"t","why":"w","potential":"Medium"}],
    "viral_hooks":["H1","H2","H3","H4","H5"],
    "hashtags":{"high":["#t1","#t2","#t3","#t4"],"medium":["#t5","#t6","#t7","#t8"],"niche":["#t9","#t10","#t11","#t12"]},
    "strategy":[{"icon":"🎯","tip":"T","detail":"d"},{"icon":"📅","tip":"T","detail":"d"},{"icon":"🔥","tip":"T","detail":"d"},{"icon":"💡","tip":"T","detail":"d"}]
  },
  "tiktok": {
    "trending_topics":[{"title":"t","why":"w","potential":"High"},{"title":"t","why":"w","potential":"High"},{"title":"t","why":"w","potential":"Medium"},{"title":"t","why":"w","potential":"Medium"},{"title":"t","why":"w","potential":"Medium"}],
    "viral_hooks":["H1","H2","H3","H4","H5"],
    "hashtags":{"high":["#t1","#t2","#t3","#t4"],"medium":["#t5","#t6","#t7","#t8"],"niche":["#t9","#t10","#t11","#t12"]},
    "strategy":[{"icon":"🎯","tip":"T","detail":"d"},{"icon":"📅","tip":"T","detail":"d"},{"icon":"🔥","tip":"T","detail":"d"},{"icon":"💡","tip":"T","detail":"d"}]
  }
}`;
    return `You are a viral content expert for Facebook and TikTok. Analyze niche: "${niche}" for ${platform}. Return ONLY valid JSON, no markdown, no backticks, matching this exact structure:\n${isBoth ? both : single}`;
  };

  const analyze = async () => {
    if (!canGo) return;
    setLoading(true); setResults(null); setLstep(0);
    const t = setInterval(() => setLstep(s => Math.min(s+1, LOAD_STEPS.length-1)), 900);
    try {
      const r = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: buildPrompt() }]
        })
      });
      const d = await r.json();
      const raw = d.content?.[0]?.text || "";
      const parsed = JSON.parse(raw.replace(/```json|```/g,"").trim());
      clearInterval(t); setResults(parsed);
    } catch { clearInterval(t); showToast("❌ Error — try again"); }
    finally { setLoading(false); }
  };

  const renderTopics = (topics, p) => topics?.map((t,i) => (
    <div key={i} className="trow">
      <div className={`tnum ${p}`}>{i+1}</div>
      <div style={{flex:1}}>
        <div className="ttitle">{t.title}</div>
        <div className="twhy">{t.why}</div>
      </div>
      <div className={`tpot ${t.potential}`}>{t.potential}</div>
    </div>
  ));

  const renderHooks = (hooks, p) => hooks?.map((h,i) => (
    <div key={i} className={`hrow ${p==="facebook"?"fh":"th"}`} onClick={() => copy(h)}>
      <div className="hnum">{i+1}</div>
      <div className="htxt">{h}</div>
      <div className="hcopy">⎘</div>
    </div>
  ));

  const renderTags = (hashtags) => (
    <>
      <div className="hgrp">
        <div className="hgrp-lbl">🟢 High Reach</div>
        <div className="tags">{hashtags?.high?.map(h => <div key={h} className="tag hi" onClick={()=>copy(h)}>{h}</div>)}</div>
      </div>
      <div className="hgrp">
        <div className="hgrp-lbl">🟡 Medium</div>
        <div className="tags">{hashtags?.medium?.map(h => <div key={h} className="tag md" onClick={()=>copy(h)}>{h}</div>)}</div>
      </div>
      <div className="hgrp">
        <div className="hgrp-lbl">🔵 Niche</div>
        <div className="tags">{hashtags?.niche?.map(h => <div key={h} className="tag lo" onClick={()=>copy(h)}>{h}</div>)}</div>
      </div>
    </>
  );

  const renderStrategy = (strategy) => strategy?.map((s,i) => (
    <div key={i} className="srow">
      <div className="sicon">{s.icon}</div>
      <div className="stxt">
        <div className="stip">{s.tip}</div>
        <div className="sdet">{s.detail}</div>
      </div>
    </div>
  ));

  const renderResults = () => {
    if (!results) return null;
    const isBoth = results.platform === "both";
    const isFB = results.platform === "facebook";

    return (
      <div className="res-wrap">
        <div className="res-top">
          <div>
            <div className="res-title">Report — <span className="nt">"{results.niche}"</span></div>
            <div className="res-meta">{isBoth?"Facebook + TikTok":isFB?"Facebook":"TikTok"} · Generated now · AI-Powered</div>
          </div>
          <button className="back-btn" onClick={()=>{setResults(null);setNiche("");setPlatform(null);}}>← New Search</button>
        </div>

        {/* STATS */}
        <div className="stats-strip">
          {isBoth ? <>
            <div className="sbox"><div className="sval fb">{results.stats?.fb_audience||"—"}</div><div className="slbl">FB Reach</div></div>
            <div className="sbox"><div className="sval tt">{results.stats?.tt_audience||"—"}</div><div className="slbl">TT Reach</div></div>
            <div className="sbox"><div className="sval" style={{fontSize:14,paddingTop:4}}>{results.stats?.fb_best_time||"—"}</div><div className="slbl">FB Best Time</div></div>
            <div className="sbox"><div className="sval" style={{fontSize:14,paddingTop:4}}>{results.stats?.tt_best_time||"—"}</div><div className="slbl">TT Best Time</div></div>
          </> : <>
            <div className="sbox"><div className={`sval ${isFB?"fb":"tt"}`}>{results.stats?.audience||"—"}</div><div className="slbl">Audience</div></div>
            <div className="sbox"><div className={`sval ${isFB?"fb":"tt"}`}>{results.stats?.avg_engagement||"—"}</div><div className="slbl">Engagement</div></div>
            <div className="sbox"><div className="sval" style={{fontSize:14,paddingTop:4}}>{results.stats?.best_time||"—"}</div><div className="slbl">Best Time</div></div>
            <div className="sbox"><div className="sval" style={{fontSize:14,paddingTop:4}}>{results.stats?.post_frequency||"—"}</div><div className="slbl">Frequency</div></div>
          </>}
        </div>

        {isBoth ? <>
          <div className="two-col">
            <div className="rcard"><div className="rcard-head fh"><div className="rcard-icon">🔥</div><div className="rcard-title">Trending Topics</div><div className="ptag fb">Facebook</div></div><div className="rcard-body">{renderTopics(results.facebook?.trending_topics,"fb")}</div></div>
            <div className="rcard"><div className="rcard-head th"><div className="rcard-icon">🔥</div><div className="rcard-title">Trending Topics</div><div className="ptag tt">TikTok</div></div><div className="rcard-body">{renderTopics(results.tiktok?.trending_topics,"tt")}</div></div>
          </div>
          <div className="two-col">
            <div className="rcard"><div className="rcard-head fh"><div className="rcard-icon">⚡</div><div className="rcard-title">Viral Hooks</div><div className="ptag fb">Facebook</div></div><div className="rcard-body">{renderHooks(results.facebook?.viral_hooks,"facebook")}</div></div>
            <div className="rcard"><div className="rcard-head th"><div className="rcard-icon">⚡</div><div className="rcard-title">Viral Hooks</div><div className="ptag tt">TikTok</div></div><div className="rcard-body">{renderHooks(results.tiktok?.viral_hooks,"tiktok")}</div></div>
          </div>
          <div className="two-col">
            <div className="rcard"><div className="rcard-head fh"><div className="rcard-icon">#</div><div className="rcard-title">Hashtags</div><div className="ptag fb">Facebook</div></div><div className="rcard-body">{renderTags(results.facebook?.hashtags)}</div></div>
            <div className="rcard"><div className="rcard-head th"><div className="rcard-icon">#</div><div className="rcard-title">Hashtags</div><div className="ptag tt">TikTok</div></div><div className="rcard-body">{renderTags(results.tiktok?.hashtags)}</div></div>
          </div>
          <div className="two-col">
            <div className="rcard"><div className="rcard-head fh"><div className="rcard-icon">🧠</div><div className="rcard-title">Growth Strategy</div><div className="ptag fb">Facebook</div></div><div className="rcard-body">{renderStrategy(results.facebook?.strategy)}</div></div>
            <div className="rcard"><div className="rcard-head th"><div className="rcard-icon">🧠</div><div className="rcard-title">Growth Strategy</div><div className="ptag tt">TikTok</div></div><div className="rcard-body">{renderStrategy(results.tiktok?.strategy)}</div></div>
          </div>
          <div className="copy-row two">
            <button className="cbtn fbc" onClick={()=>copy((results.facebook?.viral_hooks||[]).join("\n\n"))}>👥 Copy All FB Hooks</button>
            <button className="cbtn ttc" onClick={()=>copy((results.tiktok?.viral_hooks||[]).join("\n\n"))}>🎵 Copy All TT Hooks</button>
          </div>
        </> : <>
          <div className="two-col">
            <div className="rcard"><div className={`rcard-head ${isFB?"fh":"th"}`}><div className="rcard-icon">🔥</div><div className="rcard-title">Trending Topics</div><div className={`ptag ${isFB?"fb":"tt"}`}>{isFB?"Facebook":"TikTok"}</div></div><div className="rcard-body">{renderTopics(results.trending_topics,isFB?"fb":"tt")}</div></div>
            <div className="rcard"><div className={`rcard-head ${isFB?"fh":"th"}`}><div className="rcard-icon">⚡</div><div className="rcard-title">Viral Hooks</div><div className={`ptag ${isFB?"fb":"tt"}`}>{isFB?"Facebook":"TikTok"}</div></div><div className="rcard-body">{renderHooks(results.viral_hooks,results.platform)}</div></div>
          </div>
          <div className="two-col">
            <div className="rcard"><div className={`rcard-head ${isFB?"fh":"th"}`}><div className="rcard-icon">#</div><div className="rcard-title">Hashtags</div><div className={`ptag ${isFB?"fb":"tt"}`}>{isFB?"Facebook":"TikTok"}</div></div><div className="rcard-body">{renderTags(results.hashtags)}</div></div>
            <div className="rcard"><div className={`rcard-head ${isFB?"fh":"th"}`}><div className="rcard-icon">🧠</div><div className="rcard-title">Growth Strategy</div><div className={`ptag ${isFB?"fb":"tt"}`}>{isFB?"Facebook":"TikTok"}</div></div><div className="rcard-body">{renderStrategy(results.strategy)}</div></div>
          </div>
          <div className="copy-row">
            <button className={`cbtn ${isFB?"fbc":"ttc"}`} onClick={()=>copy((results.viral_hooks||[]).join("\n\n"))}>📋 Copy All Hooks</button>
          </div>
        </>}
      </div>
    );
  };

  // ── LANDING PAGE ──
  const LandingPage = () => (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-eyebrow">
          <div className="eyebrow-dots"><div className="edot fb"/><div className="edot tt"/></div>
          Facebook + TikTok Intelligence Platform
        </div>
        <h1 className="hero-h1">
          Go Viral On
          <span className="grad">Both Platforms</span>
        </h1>
        <p className="hero-sub">
          Enter your niche → get <strong>trending topics, viral hooks, hashtags</strong> and a custom growth strategy — for <strong>Facebook AND TikTok</strong> simultaneously.
        </p>
        <div className="hero-btns">
          <button className="btn-primary" onClick={goTool}>⚡ Try It Free</button>
          <button className="btn-secondary" onClick={() => setPage("pricing")}>💎 See Pricing</button>
        </div>
        <div className="hero-stats">
          <div className="hstat"><div className="hstat-val fb">500M+</div><div className="hstat-lbl">Arabic Creators</div></div>
          <div className="hstat"><div className="hstat-val">4</div><div className="hstat-lbl">Sections Per Report</div></div>
          <div className="hstat"><div className="hstat-val tt">2</div><div className="hstat-lbl">Platforms Covered</div></div>
          <div className="hstat"><div className="hstat-val">10s</div><div className="hstat-lbl">To Full Report</div></div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section">
        <div className="section-label">What You Get</div>
        <div className="section-title">Everything a creator needs in one place</div>
        <p className="section-sub">No more switching between 5 tools. DualViral gives you everything — customized per platform, per niche, instantly.</p>
        <div className="features-grid">
          {FEATURES.map((f,i) => (
            <div key={i} className={`feat-card ${f.cls}`}>
              <div className={`feat-icon ${f.iconCls}`}>{f.icon}</div>
              <div className="feat-title">{f.title}</div>
              <div className="feat-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <div className="how-wrap">
        <div className="how-inner">
          <div className="section-label" style={{textAlign:"center"}}>How It Works</div>
          <div className="section-title" style={{textAlign:"center"}}>3 steps. 10 seconds.</div>
          <div className="steps-row">
            <div className="step-box"><div className="step-num s1">1</div><div className="step-title">Enter Your Niche</div><div className="step-desc">Type your content niche — cartoons, cooking, football, Islam, anything.</div></div>
            <div className="step-box"><div className="step-num s2">2</div><div className="step-title">Pick Your Platform</div><div className="step-desc">Choose Facebook, TikTok, or both simultaneously for a dual report.</div></div>
            <div className="step-box"><div className="step-num s3">3</div><div className="step-title">Get Your Report</div><div className="step-desc">Instant AI analysis — topics, hooks, hashtags, strategy. Ready to use.</div></div>
          </div>
        </div>
      </div>

      {/* SOCIAL PROOF */}
      <div className="proof-section">
        <div className="section-label" style={{textAlign:"center",marginBottom:8}}>Creators Love It</div>
        <div className="section-title" style={{textAlign:"center",marginBottom:48,fontSize:"clamp(28px,4vw,40px)"}}>Real results from real creators</div>
        <div className="proof-grid">
          {PROOFS.map((p,i) => (
            <div key={i} className="proof-card">
              <div className="proof-stars">{p.stars}</div>
              <div className="proof-text">"{p.text}"</div>
              <div className="proof-author">
                <div className="proof-avatar" style={{background:"var(--surface)",border:"1px solid var(--border2)"}}>{p.emoji}</div>
                <div><div className="proof-name">{p.name}</div><div className="proof-role">{p.role}</div></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="cta-banner">
        <div className="cta-title">Ready to go viral?</div>
        <p className="cta-sub">Start free. No credit card. Full access to the tool in 10 seconds.</p>
        <button className="btn-primary" onClick={goTool} style={{margin:"0 auto"}}>⚡ Start For Free Now</button>
      </div>
    </>
  );

  // ── TOOL PAGE ──
  const ToolPage = () => (
    <div className="tool-page">
      {!loading && !results && (
        <>
          <div className="tool-hero">
            <h2>Content Intelligence Tool</h2>
            <p>Enter your niche and choose your platform to get started</p>
          </div>
          <div className="tool-input-wrap">
            <div className="tool-card">
              <label className="field-label">Your Niche</label>
              <input className="niche-inp" placeholder="e.g. Cartoons, Cooking, Football..." value={niche} onChange={e=>setNiche(e.target.value)} onKeyDown={e=>e.key==="Enter"&&analyze()} />
              <label className="field-label">Platform</label>
              <div className="plat-grid">
                <button className={`plat-btn ${platform==="facebook"?"sel-fb":""}`} onClick={()=>setPlatform("facebook")}>
                  <span className="plat-emoji">👥</span>Facebook
                </button>
                <button className={`plat-btn ${platform==="tiktok"?"sel-tt":""}`} onClick={()=>setPlatform("tiktok")}>
                  <span className="plat-emoji">🎵</span>TikTok
                </button>
                <button className={`plat-btn ${platform==="both"?"sel-both":""}`} onClick={()=>setPlatform("both")}>
                  <span className="plat-emoji">⚡</span>Both
                </button>
              </div>
              <button className={`go-btn ${getBtnCls()}`} onClick={analyze} disabled={!canGo}>
                {canGo ? `⚡ Analyze ${platform==="both"?"Both Platforms":platform==="facebook"?"Facebook":"TikTok"}` : "Select niche & platform"}
              </button>
              <div className="chips-row">
                <div className="chip-lbl">Quick select:</div>
                {NICHES.map(n => <div key={n} className="chip" onClick={()=>setNiche(n)}>{n}</div>)}
              </div>
            </div>
          </div>
        </>
      )}
      {loading && (
        <div className="loader-wrap">
          <div className="dual-ring"><div className="ring a"/><div className="ring b"/></div>
          <div className="loader-title">Analyzing "{niche}"</div>
          <div className="loader-sub">{platform==="both"?"Running dual-platform scan...":`Scanning ${platform}...`}</div>
          <div className="loader-steps">
            {LOAD_STEPS.map((s,i) => (
              <div key={i} className={`lstep ${i<lstep?"done":i===lstep?"active":""}`}>
                <span className="lstep-icon">{i<lstep?"✓":s.icon}</span>{s.label}
              </div>
            ))}
          </div>
        </div>
      )}
      {results && renderResults()}
    </div>
  );

  // ── PRICING PAGE ──
  const PricingPage = () => (
    <div className="pricing-wrap">
      <div className="section-label">Pricing</div>
      <div className="section-title">Start free. Scale when ready.</div>
      <p className="section-sub" style={{margin:"0 auto 0"}}>No contracts. No hidden fees. Cancel anytime.</p>
      <div className="pricing-grid">
        {/* FREE */}
        <div className="price-card">
          <div className="price-plan">Free</div>
          <div className="price-amount"><sup>$</sup>0</div>
          <div className="price-period">forever</div>
          <div className="price-desc">Perfect to try the tool and see results instantly.</div>
          <ul className="price-features">
            <li><span className="check green">✓</span> 3 analyses per day</li>
            <li><span className="check green">✓</span> Facebook OR TikTok</li>
            <li><span className="check green">✓</span> 5 viral hooks</li>
            <li><span className="check green">✓</span> Hashtag strategy</li>
            <li><span className="check" style={{color:"var(--muted)"}}>✗</span> <span style={{color:"var(--muted)"}}>Both platforms at once</span></li>
            <li><span className="check" style={{color:"var(--muted)"}}>✗</span> <span style={{color:"var(--muted)"}}>Unlimited searches</span></li>
          </ul>
          <button className="price-btn free" onClick={goTool}>Start Free</button>
        </div>
        {/* PRO */}
        <div className="price-card popular">
          <div className="popular-badge">⭐ MOST POPULAR</div>
          <div className="price-plan">Pro</div>
          <div className="price-amount"><sup>$</sup>19</div>
          <div className="price-period">per month</div>
          <div className="price-desc">For serious creators who post daily on multiple platforms.</div>
          <ul className="price-features">
            <li><span className="check green">✓</span> Unlimited analyses</li>
            <li><span className="check blue">✓</span> Facebook + TikTok both</li>
            <li><span className="check blue">✓</span> Side-by-side comparison</li>
            <li><span className="check blue">✓</span> 5 hooks per platform</li>
            <li><span className="check blue">✓</span> Full hashtag strategy</li>
            <li><span className="check blue">✓</span> Custom growth plan</li>
          </ul>
          <button className="price-btn pro" onClick={goTool}>Get Pro Access</button>
        </div>
        {/* AGENCY */}
        <div className="price-card">
          <div className="price-plan">Agency</div>
          <div className="price-amount"><sup>$</sup>49</div>
          <div className="price-period">per month</div>
          <div className="price-desc">For agencies managing multiple pages and clients.</div>
          <ul className="price-features">
            <li><span className="check green">✓</span> Everything in Pro</li>
            <li><span className="check red">✓</span> Arabic language mode</li>
            <li><span className="check red">✓</span> Export PDF reports</li>
            <li><span className="check red">✓</span> 5 team members</li>
            <li><span className="check red">✓</span> Priority support</li>
            <li><span className="check red">✓</span> Custom branding</li>
          </ul>
          <button className="price-btn agency" onClick={goTool}>Contact Us</button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <style>{CSS}</style>
      <div className="bg-wrap">
        <div className="bg-grid"/>
        <div className="bg-blob blob-fb"/>
        <div className="bg-blob blob-tt"/>
        <div className="bg-blob blob-mid"/>
      </div>
      <div className="app">
        <nav className="nav">
          <div className="nav-logo" onClick={()=>{setPage("landing");window.scrollTo(0,0);}}>
            <div className="logo-bars">
              <div className="lb f"/><div className="lb m"/><div className="lb t"/>
            </div>
            <div className="logo-txt"><span className="d">Dual</span><span className="v">Viral</span></div>
          </div>
          <div className="nav-right">
            <button className="nav-link" onClick={()=>{setPage("landing");window.scrollTo(0,0);}}>Home</button>
            <button className="nav-link" onClick={()=>{setPage("pricing");window.scrollTo(0,0);}}>Pricing</button>
            <button className="nav-cta" onClick={goTool}>Try Free ⚡</button>
          </div>
        </nav>

        {page === "landing" && <LandingPage />}
        {page === "tool" && <ToolPage />}
        {page === "pricing" && <PricingPage />}

        <footer className="footer">
          <div>
            <div className="footer-logo-txt"><span className="d">Dual</span><span className="v">Viral</span>.com</div>
            <div style={{fontSize:12,color:"var(--muted)",marginTop:4}}>Built for creators who dominate both platforms</div>
          </div>
          <div className="footer-links">
            <button className="footer-link" onClick={()=>{setPage("landing");window.scrollTo(0,0);}}>Home</button>
            <button className="footer-link" onClick={goTool}>Tool</button>
            <button className="footer-link" onClick={()=>{setPage("pricing");window.scrollTo(0,0);}}>Pricing</button>
          </div>
          <div className="footer-copy">© 2026 DualViral.com · All rights reserved</div>
        </footer>
      </div>
      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
