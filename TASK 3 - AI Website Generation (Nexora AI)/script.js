/* ============================================================
   NEXORA AI — INTERACTIVE SCRIPT
   script.js
   ============================================================ */

(function () {
  'use strict';

  // 1. Navigation Scroll State
  const navbar = document.getElementById('navbar');
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile Menu Toggle
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen);
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 2. Scroll Animation Observer
  const animatedEls = document.querySelectorAll('[data-animate]');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = parseInt(el.dataset.delay || 0, 10);
          setTimeout(() => {
            el.classList.add('is-visible');
          }, delay);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.1 });

    animatedEls.forEach(el => observer.observe(el));
  } else {
    animatedEls.forEach(el => el.classList.add('is-visible'));
  }

  // 3. Stats Counter Animation
  const metricNumbers = document.querySelectorAll('.metric-number');
  if ('IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target, 10);
          animateCount(el, target, 1600);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    metricNumbers.forEach(num => counterObserver.observe(num));
  }

  function animateCount(el, target, duration) {
    const start = performance.now();
    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    }
    requestAnimationFrame(step);
  }

  // 4. Interactive AI Swarm Playground Simulator
  const taskData = {
    finance: {
      title: "FinTech Portfolio Risk & Liquidity Audit",
      time: "0.38s",
      logs: `[00:00:01] <span style="color:#60A5FA;">[Planner Agent]</span> Decomposed into 3 sub-tasks: (1) VaR calculation, (2) stress test on interest shift (+75bps), (3) regulatory capital buffer check.
[00:00:02] <span style="color:#C084FC;">[Knowledge Graph]</span> Retrieved Q3 asset ledger from Snowflake: $4.2B AUM across 18 liquidity tiers.
[00:00:03] <span style="color:#FBBF24;">[Auditor Agent]</span> Validating Basel III liquidity coverage ratio: Current LCR = 142% [COMPLIANT].
[00:00:04] <span style="color:#34D399;">[Consensus Agent]</span> All 3 agents verified output schema. Deterministic risk index scored at 0.042 (Low Risk).`
    },
    supply: {
      title: "Supply Chain APAC Node Disruption Re-routing",
      time: "0.45s",
      logs: `[00:00:01] <span style="color:#60A5FA;">[Planner Agent]</span> Identified port congestion alert at Singapore Hub (estimated delay: 5.2 days).
[00:00:02] <span style="color:#C084FC;">[Tool Calling]</span> Dispatched query to Freight API: Evaluated 6 alternative multimodal routes via Klang & Tanjung Pelepas.
[00:00:03] <span style="color:#FBBF24;">[Auditor Agent]</span> Enforced contractual SLA constraints: Avoided expedited surcharge threshold of $120k.
[00:00:04] <span style="color:#34D399;">[Consensus Agent]</span> Re-routing instructions generated & automated purchase order trigger sent to ERP.`
    },
    cyber: {
      title: "Zero-Day CVE Vulnerability Isolation & Patching",
      time: "0.29s",
      logs: `[00:00:01] <span style="color:#60A5FA;">[Planner Agent]</span> Ingested critical CVE alert (CVSS 9.8 Remote Code Execution).
[00:00:02] <span style="color:#C084FC;">[Sandbox Agent]</span> Spawned isolated container to reproduce exploit payload; confirmed vulnerability in dependency lib-jwt v4.1.
[00:00:03] <span style="color:#FBBF24;">[Auditor Agent]</span> Generated backward-compatible hotfix patch; ran 842 regression tests [100% PASSED].
[00:00:04] <span style="color:#34D399;">[Consensus Agent]</span> Zero-downtime canary deployment triggered with automated rollback watchdogs.`
    },
    esg: {
      title: "Scope 1-3 Carbon Footprint Auditing & Telemetry",
      time: "0.32s",
      logs: `[00:00:01] <span style="color:#60A5FA;">[Planner Agent]</span> Ingesting telemetry feeds across 14 manufacturing facilities & cloud compute regions.
[00:00:02] <span style="color:#C084FC;">[Knowledge Graph]</span> Linked electricity consumption to regional grid emission factors (GHG Protocol Scope 2).
[00:00:03] <span style="color:#FBBF24;">[Auditor Agent]</span> Validated carbon offset certificates against Verra registry metadata [VERIFIED].
[00:00:04] <span style="color:#34D399;">[Consensus Agent]</span> Generated auditable CSRD compliant disclosure ready for board approval.`
    }
  };

  const tabButtons = document.querySelectorAll('.tab-btn');
  const outputTitle = document.getElementById('outputTitle');
  const execTimer = document.getElementById('execTimer');
  const outputContent = document.getElementById('outputContent');
  const steps = [document.getElementById('step1'), document.getElementById('step2'), document.getElementById('step3'), document.getElementById('step4')];
  const runBtn = document.getElementById('runSimulationBtn');

  let currentTask = 'finance';

  function runSimulation(taskKey) {
    const data = taskData[taskKey];
    if (!data) return;

    outputTitle.textContent = `Executing: ${data.title}`;
    execTimer.textContent = 'Processing...';
    outputContent.innerHTML = '<span style="color:#9CA3AF;">Initializing agent swarm consensus...</span>';

    // Animate stepper
    steps.forEach(s => s.classList.remove('active'));
    steps[0].classList.add('active');

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < steps.length) {
        steps[currentStep].classList.add('active');
      } else {
        clearInterval(interval);
        execTimer.textContent = `Execution time: ${data.time}`;
        outputContent.innerHTML = data.logs;
      }
    }, 180);
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentTask = btn.dataset.task;
      runSimulation(currentTask);
    });
  });

  if (runBtn) {
    runBtn.addEventListener('click', () => {
      runSimulation(currentTask);
    });
  }

  // Initial run
  runSimulation('finance');

  // 5. Billing Toggle (Monthly / Annual)
  const billingToggle = document.getElementById('billingToggle');
  const monthlyLabel = document.getElementById('monthlyLabel');
  const annualLabel = document.getElementById('annualLabel');
  const priceVals = document.querySelectorAll('.price-val');

  if (billingToggle) {
    function setBilling(isAnnual) {
      billingToggle.classList.toggle('annual', isAnnual);
      monthlyLabel.classList.toggle('active', !isAnnual);
      annualLabel.classList.toggle('active', isAnnual);

      priceVals.forEach(val => {
        const targetPrice = isAnnual ? val.dataset.annual : val.dataset.monthly;
        val.style.opacity = '0';
        setTimeout(() => {
          val.textContent = targetPrice;
          val.style.opacity = '1';
        }, 150);
      });
    }

    billingToggle.addEventListener('click', () => {
      const isAnnual = !billingToggle.classList.contains('annual');
      setBilling(isAnnual);
    });

    monthlyLabel.addEventListener('click', () => setBilling(false));
    annualLabel.addEventListener('click', () => setBilling(true));
  }

  // 6. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => {
        i.classList.remove('active');
        i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });
      if (!isActive) {
        item.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });

})();
