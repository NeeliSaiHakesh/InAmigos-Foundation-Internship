// Interactive Logic for Figma NGO Feature Highlight Spec
function switchView(mode) {
  const btnDesign = document.getElementById('btn-design-view');
  const btnProto = document.getElementById('btn-proto-view');
  
  if (mode === 'interactive') {
    btnProto.classList.add('active');
    btnDesign.classList.remove('active');
    document.querySelectorAll('.mockup-card').forEach(card => {
      card.style.transform = 'scale(1.02)';
      card.style.transition = 'transform 0.3s ease';
      card.style.outline = '2px solid #0D99FF';
    });
  } else {
    btnDesign.classList.add('active');
    btnProto.classList.remove('active');
    document.querySelectorAll('.mockup-card').forEach(card => {
      card.style.transform = 'scale(1)';
      card.style.outline = 'none';
    });
  }
}

// Feature 1: Donation Logic
function selectAmount(amt, desc) {
  document.querySelectorAll('.amt-btn').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
  document.getElementById('custom-amount-val').value = amt;
  document.getElementById('btn-amt-display').innerText = amt.toLocaleString('en-IN');
  document.getElementById('impact-desc').innerText = desc;
  document.getElementById('tax-saved-val').innerText = (amt * 0.5).toLocaleString('en-IN');
}

function onCustomAmountChange() {
  const val = parseInt(document.getElementById('custom-amount-val').value) || 0;
  document.querySelectorAll('.amt-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('btn-amt-display').innerText = val.toLocaleString('en-IN');
  document.getElementById('tax-saved-val').innerText = (val * 0.5).toLocaleString('en-IN');
  document.getElementById('impact-desc').innerText = `Direct grassroots funding allocated for InAmigos social upliftment initiatives.`;
}

function setDonationFreq(freq) {
  const b1 = document.getElementById('freq-once');
  const b2 = document.getElementById('freq-monthly');
  if (freq === 'monthly') {
    b2.classList.add('active');
    b1.classList.remove('active');
  } else {
    b1.classList.add('active');
    b2.classList.remove('active');
  }
}

// Feature 3: Region Switcher
const regions = {
  cg: {
    title: 'Chhattisgarh Regional Chapter (Bilaspur / Raipur)',
    meta: 'Active Initiatives: Project Seva, Bachpan Shala, Jeev Daya',
    kitVal: '840 / 1,000 Kits (84%)',
    kitWidth: '84%',
    classVal: '100% Completed',
    classWidth: '100%'
  },
  delhi: {
    title: 'Delhi NCR Outreach Hub',
    meta: 'Active Initiatives: Project Udaan (Skill Development) & Youth Mentorship',
    kitVal: '320 / 400 Youth Mentored (80%)',
    kitWidth: '80%',
    classVal: '92% Completed',
    classWidth: '92%'
  },
  mh: {
    title: 'Maharashtra Chapter (Mumbai / Pune)',
    meta: 'Active Initiatives: Project Prakriti (Urban Afforestation & Eco-Drives)',
    kitVal: '4,200 / 5,000 Seedballs (84%)',
    kitWidth: '84%',
    classVal: '78% Completed',
    classWidth: '78%'
  },
  all: {
    title: 'Pan-India Overview (28 States)',
    meta: 'Unified Operations across 200+ Volunteers & 50,000+ Beneficiaries',
    kitVal: '50,000+ Lives Impacted (95%)',
    kitWidth: '95%',
    classVal: '100% Active Audits',
    classWidth: '100%'
  }
};

function switchRegion(regKey) {
  document.querySelectorAll('.reg-btn').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
  
  const data = regions[regKey];
  const card = document.getElementById('region-card-content');
  card.innerHTML = `
    <div class="reg-header">
      <div>
        <h5>${data.title}</h5>
        <span class="reg-meta">${data.meta}</span>
      </div>
      <span class="status-live-pill">🟢 Live Operations</span>
    </div>
    <div class="progress-track-group">
      <div class="track-item">
        <div class="track-meta"><span>Key Target Delivery</span><strong>${data.kitVal}</strong></div>
        <div class="bar-outer"><div class="bar-inner" style="width: ${data.kitWidth};"></div></div>
      </div>
      <div class="track-item">
        <div class="track-meta"><span>Initiative Completion</span><strong>${data.classVal}</strong></div>
        <div class="bar-outer"><div class="bar-inner" style="width: ${data.classWidth}; background:#00B368;"></div></div>
      </div>
    </div>
  `;
}
