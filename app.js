// Vibe Coding Web Page Logic - app.js

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // --- Scroll Progress Bar ---
  window.addEventListener('scroll', () => {
    const scrollBar = document.getElementById('scroll-progress');
    const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollTotal > 0) {
      const scrollPercent = (window.scrollY / scrollTotal) * 100;
      scrollBar.style.width = `${scrollPercent}%`;
    }
  });

  // --- Hero Section Typing Effect ---
  const phrases = [
    "문법을 치던 시대에서, 의도를 지휘하는 시대로.",
    "이제 단순 작성이 아닌 설계에 몰입할 시간입니다.",
    "당신은 오케스트라의 지휘자가 되고, AI는 연주 단원이 됩니다.",
    "아이디어가 곧 실시간 제품이 되는 가장 스마트한 흐름."
  ];
  let phraseIndex = 0;
  let characterIndex = 0;
  let isDeleting = false;
  const typedTextSpan = document.getElementById('typed-text');
  const typingSpeed = 100;
  const erasingSpeed = 50;
  const newPhraseDelay = 2000;

  function type() {
    const currentPhrase = phrases[phraseIndex];
    if (isDeleting) {
      typedTextSpan.textContent = currentPhrase.substring(0, characterIndex - 1);
      characterIndex--;
    } else {
      typedTextSpan.textContent = currentPhrase.substring(0, characterIndex + 1);
      characterIndex++;
    }

    if (!isDeleting && characterIndex === currentPhrase.length) {
      isDeleting = true;
      setTimeout(type, newPhraseDelay);
    } else if (isDeleting && characterIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(type, 500);
    } else {
      setTimeout(type, isDeleting ? erasingSpeed : typingSpeed);
    }
  }
  
  if (typedTextSpan) {
    setTimeout(type, 1000);
  }

  // --- Simulator Controls Updates ---
  const energySlider = document.getElementById('slider-energy');
  const creativitySlider = document.getElementById('slider-creativity');
  const speedSlider = document.getElementById('slider-speed');
  const energyVal = document.getElementById('val-energy');
  const creativityVal = document.getElementById('val-creativity');
  const speedVal = document.getElementById('val-speed');

  if (energySlider) {
    energySlider.addEventListener('input', (e) => energyVal.textContent = `${e.target.value}%`);
  }
  if (creativitySlider) {
    creativitySlider.addEventListener('input', (e) => creativityVal.textContent = `${e.target.value}%`);
  }
  if (speedSlider) {
    speedSlider.addEventListener('input', (e) => speedVal.textContent = `${e.target.value}%`);
  }

  // --- Theme Selector & Prompt Presets ---
  const themeSelector = document.getElementById('theme-selector');
  const promptInput = document.getElementById('prompt-input');

  const promptPresets = {
    space: "우주 테마의 슈팅 게임을 HTML5 Canvas를 이용해 만들어줘. 마우스 커서로 플레이어 함선을 움직이고, 화면을 클릭하거나 일정 간격으로 자동 레이저가 나가며, 위에서 떨어지는 유성을 부수고 점수를 획득하는 구조로 작성해줘. 파티클 이펙트도 들어가면 좋겠어.",
    finance: "사용자가 실시간으로 내역을 입력할 수 있는 뱅킹 서비스/자산 대시보드 컴포넌트를 구성해줘. 상단엔 잔액, 입금, 출금 요약 카드가 있고, 하단에는 월별 자산 통계를 보여주는 바 그래프가 작동하게 구현해줘.",
    todo: "개인 업무 관리를 할 수 있는 직관적인 칸반 보드를 개발해줘. '해야 할 일(To Do)', '완료(Done)'의 2단계 칼럼으로 구성하고, 일을 등록하는 폼과 완료 버튼, 삭제 기능이 매끄럽게 처리되는 싱글 보드 구조로 만들어줘."
  };

  if (themeSelector && promptInput) {
    promptInput.value = promptPresets[themeSelector.value];
    themeSelector.addEventListener('change', () => {
      promptInput.value = promptPresets[themeSelector.value];
    });
  }

  // --- Tab Switching Logic ---
  const tabs = document.querySelectorAll('.tab-btn');
  const contents = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      const targetContent = document.getElementById(`content-${target}`);
      if (targetContent) targetContent.classList.add('active');
    });
  });

  function selectTab(tabId) {
    const tabBtn = document.getElementById(`tab-${tabId}`);
    if (tabBtn) tabBtn.click();
  }

  // --- Simulator Generator Logic ---
  const btnSync = document.getElementById('btn-sync');
  const terminalLog = document.getElementById('terminal-log');
  const codeOutput = document.getElementById('code-output');
  const previewWrapper = document.getElementById('preview-wrapper');

  let simulatorRunning = false;

  const mockCodes = {
    space: `// Generated HTML5 Space Shooter Game
class SpaceGame {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.score = 0;
    this.player = { x: 150, y: 350, size: 24, color: '#00f2fe' };
    this.bullets = [];
    this.asteroids = [];
    this.particles = [];
    this.init();
  }
  
  init() {
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.player.x = e.clientX - rect.left - this.player.size / 2;
    });
    setInterval(() => this.spawnAsteroid(), 1500);
    setInterval(() => this.shoot(), 300);
    this.animate();
  }
  
  shoot() {
    this.bullets.push({ x: this.player.x + this.player.size/2, y: 330, speed: 6 });
  }

  spawnAsteroid() {
    this.asteroids.push({
      x: Math.random() * (this.canvas.width - 20),
      y: -20,
      size: Math.random() * 20 + 15,
      speed: Math.random() * 2 + 1
    });
  }

  update() { ... }
  draw() { ... }
}`,
    finance: `// Generated asset management dashboard
const Dashboard = {
  balance: 14250000,
  income: 3820000,
  expense: 1480000,
  
  refreshData() {
    this.balance += Math.floor(Math.random() * 100000 - 50000);
    this.income += Math.floor(Math.random() * 20000);
    this.expense += Math.floor(Math.random() * 15000);
    this.updateUI();
  },
  
  renderChart() {
    const bars = document.querySelectorAll('.chart-bar');
    bars.forEach(bar => {
      const randomHeight = Math.floor(Math.random() * 80) + 20;
      bar.style.height = randomHeight + '%';
    });
  }
};`,
    todo: `// Kanban Task Manager Logic
const Kanban = {
  tasks: [
    { id: 1, text: "바이브 코딩 자료 조사", status: "todo" },
    { id: 2, text: "UI 프로토타입 완료하기", status: "done" }
  ],
  
  addTask(text) {
    if (!text.trim()) return;
    this.tasks.push({
      id: Date.now(),
      text: text,
      status: 'todo'
    });
    this.render();
  },
  
  completeTask(id) {
    const task = this.tasks.find(t => t.id === id);
    if (task) task.status = 'done';
    this.render();
  }
};`
  };

  if (btnSync) {
    btnSync.addEventListener('click', () => {
      if (simulatorRunning) return;
      simulatorRunning = true;
      btnSync.disabled = true;

      const selectedTheme = themeSelector.value;
      const energy = parseInt(energySlider.value);
      const speed = parseInt(speedSlider.value);
      const delayScale = (100 - speed) * 5 + 20; // smaller delay for higher speed

      // 1. Reset Display UI
      terminalLog.innerHTML = `<div class="terminal-line system">[SYSTEM] Syncing vibe parameters with AI engine...</div>`;
      codeOutput.textContent = "// Syncing code structure...";
      previewWrapper.innerHTML = `
        <div class="preview-placeholder">
          <i data-lucide="loader-2" class="placeholder-icon animate-spin"></i>
          <p>AI 에이전트가 코드를 작곡 중입니다...</p>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      selectTab('terminal');

      // 2. Simulated Terminal Log steps
      const steps = [
        `[INPUT] 지시어 접수 완료`,
        `[ANALYZE] 프롬프트 의미 구조 파악 중 (에너지 강도: ${energy}%)`,
        `[COMPILE] 프로젝트 프레임워크 초기화`,
        `[AGENT] 코드 모듈 빌드 프로세스 시작`,
        `[AGENT] UI/UX 와이어프레임 설계 조율`,
        `[COMPILE] 번들 파일 최적화 및 빌드 진행 중`,
        `[SYSTEM] 로컬 호스팅 인프라 구동`,
        `[SUCCESS] 샌드박스 렌더링 완료! 프리뷰가 활성화되었습니다.`
      ];

      let stepIdx = 0;
      function logNextStep() {
        if (stepIdx < steps.length) {
          const line = document.createElement('div');
          line.className = `terminal-line ${stepIdx === steps.length - 1 ? 'success' : 'prompt'}`;
          line.textContent = steps[stepIdx];
          terminalLog.appendChild(line);
          terminalLog.scrollTop = terminalLog.scrollHeight;
          stepIdx++;
          setTimeout(logNextStep, delayScale * 6);
        } else {
          // Switch to Code View and stream code
          setTimeout(streamCode, 500);
        }
      }

      setTimeout(logNextStep, 400);

      // 3. Code streaming
      function streamCode() {
        selectTab('code');
        const fullCode = mockCodes[selectedTheme];
        let codeIdx = 0;
        
        function addCodeChar() {
          const charsPerTick = Math.ceil(speed / 10) * 3; // speed coefficient
          if (codeIdx < fullCode.length) {
            codeOutput.textContent = fullCode.substring(0, codeIdx + charsPerTick);
            codeIdx += charsPerTick;
            setTimeout(addCodeChar, delayScale / 2);
          } else {
            codeOutput.textContent = fullCode; // make sure complete
            // Switch to Preview
            setTimeout(renderPreview, 800);
          }
        }
        addCodeChar();
      }

      // 4. Render Live Interactive App in Preview
      function renderPreview() {
        selectTab('preview');
        previewWrapper.innerHTML = ""; // clean

        if (selectedTheme === 'space') {
          // Embed space game HTML
          previewWrapper.innerHTML = `
            <div class="live-app">
              <div class="live-app-header">
                <span class="live-app-title"><i data-lucide="gamepad-2"></i> Space Shooter (Canvas)</span>
                <span class="text-cyan font-bold" id="game-score">점수: 0</span>
              </div>
              <div class="live-app-body" style="background: #000; padding: 0;">
                <canvas id="game-canvas" width="400" height="300"></canvas>
              </div>
            </div>
          `;
          if (window.lucide) window.lucide.createIcons();
          initSpaceGame();
        } else if (selectedTheme === 'finance') {
          previewWrapper.innerHTML = `
            <div class="live-app">
              <div class="live-app-header">
                <span class="live-app-title"><i data-lucide="wallet"></i> 자산 관리 대시보드</span>
                <button class="btn btn-secondary" id="btn-finance-refresh" style="padding: 4px 10px; font-size: 0.75rem;">갱신</button>
              </div>
              <div class="live-app-body" style="overflow-y: auto;">
                <div class="dashboard-grid">
                  <div class="dashboard-card">
                    <h4>총 자산</h4>
                    <p class="text-cyan" id="fin-balance">14,250,000₩</p>
                  </div>
                  <div class="dashboard-card">
                    <h4>이번달 입금</h4>
                    <p class="text-green" id="fin-income">3,820,000₩</p>
                  </div>
                  <div class="dashboard-card">
                    <h4>이번달 소비</h4>
                    <p class="text-pink" id="fin-expense">1,480,000₩</p>
                  </div>
                </div>
                <div class="dashboard-chart-box">
                  <p style="font-size:0.75rem; color:var(--text-muted); margin-bottom:10px;">월별 금융 성장 추이</p>
                  <div class="chart-bar-container">
                    <div class="chart-bar-wrapper"><div class="chart-bar" style="height: 40%"></div><span class="chart-lbl">3월</span></div>
                    <div class="chart-bar-wrapper"><div class="chart-bar" style="height: 55%"></div><span class="chart-lbl">4월</span></div>
                    <div class="chart-bar-wrapper"><div class="chart-bar" style="height: 75%"></div><span class="chart-lbl">5월</span></div>
                    <div class="chart-bar-wrapper"><div class="chart-bar" style="height: 90%"></div><span class="chart-lbl">6월</span></div>
                  </div>
                </div>
              </div>
            </div>
          `;
          if (window.lucide) window.lucide.createIcons();
          initFinanceDashboard();
        } else if (selectedTheme === 'todo') {
          previewWrapper.innerHTML = `
            <div class="live-app">
              <div class="live-app-header">
                <span class="live-app-title"><i data-lucide="check-square"></i> 업무 칸반 보드</span>
              </div>
              <div class="live-app-body" style="display:flex; flex-direction:column; gap:12px;">
                <div style="display:flex; gap:8px;">
                  <input type="text" id="todo-input" placeholder="새로운 태스크 입력..." style="flex:1; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); padding:8px 12px; border-radius:6px; color:#fff; font-size:0.8rem; outline:none;">
                  <button class="btn btn-primary" id="btn-todo-add" style="padding:8px 14px; font-size:0.8rem;">추가</button>
                </div>
                <div class="kanban-board">
                  <div class="kanban-col">
                    <h4>진행 중</h4>
                    <div class="kanban-tasks" id="kanban-todo-list"></div>
                  </div>
                  <div class="kanban-col">
                    <h4>완료됨</h4>
                    <div class="kanban-tasks" id="kanban-done-list"></div>
                  </div>
                </div>
              </div>
            </div>
          `;
          if (window.lucide) window.lucide.createIcons();
          initKanbanBoard();
        }

        // Complete Simulation
        simulatorRunning = false;
        btnSync.disabled = false;
      }
    });
  }

  // --- Preset App Instantiations ---
  
  // 1. Space Game Simulator Code
  function initSpaceGame() {
    const canvas = document.getElementById('game-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const scoreText = document.getElementById('game-score');

    let score = 0;
    let playerX = canvas.width / 2;
    const playerY = canvas.height - 40;
    const playerSize = 16;
    
    let bullets = [];
    let asteroids = [];
    let particles = [];
    let gameIntervals = [];

    // Mouse movement
    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      const root = document.documentElement;
      const mouseX = e.clientX - rect.left - root.scrollLeft;
      playerX = Math.max(playerSize, Math.min(canvas.width - playerSize, mouseX));
    });

    // Auto Shooters
    const shootInterval = setInterval(() => {
      bullets.push({ x: playerX, y: playerY - 10, speed: 5 });
    }, 250);
    gameIntervals.push(shootInterval);

    // Asteroid Spawner
    const asteroidInterval = setInterval(() => {
      asteroids.push({
        x: Math.random() * (canvas.width - 20) + 10,
        y: -10,
        size: Math.random() * 15 + 10,
        speed: Math.random() * 2 + 1.2
      });
    }, 1000);
    gameIntervals.push(asteroidInterval);

    function createExplosion(x, y) {
      for (let i = 0; i < 8; i++) {
        particles.push({
          x: x,
          y: y,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          life: 20,
          color: Math.random() > 0.5 ? '#ff007f' : '#00f2fe'
        });
      }
    }

    let isRunning = true;
    function update() {
      if (!isRunning) return;

      // Update bullets
      bullets.forEach((b, index) => {
        b.y -= b.speed;
        if (b.y < 0) bullets.splice(index, 1);
      });

      // Update asteroids
      asteroids.forEach((a, index) => {
        a.y += a.speed;
        if (a.y > canvas.height) asteroids.splice(index, 1);
      });

      // Update particles
      particles.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        if (p.life <= 0) particles.splice(index, 1);
      });

      // Collision check
      bullets.forEach((b, bIdx) => {
        asteroids.forEach((a, aIdx) => {
          const dist = Math.hypot(b.x - a.x, b.y - a.y);
          if (dist < a.size) {
            createExplosion(a.x, a.y);
            asteroids.splice(aIdx, 1);
            bullets.splice(bIdx, 1);
            score += 10;
            scoreText.textContent = `점수: ${score}`;
          }
        });
      });

      // Draw
      ctx.fillStyle = '#05070a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw bullets
      ctx.fillStyle = '#00f2fe';
      bullets.forEach(b => {
        ctx.fillRect(b.x - 2, b.y, 4, 10);
      });

      // Draw Player Ship (Glowing triangle)
      ctx.fillStyle = '#7f00ff';
      ctx.beginPath();
      ctx.moveTo(playerX, playerY - 12);
      ctx.lineTo(playerX - playerSize, playerY + 8);
      ctx.lineTo(playerX + playerSize, playerY + 8);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#00f2fe';
      ctx.beginPath();
      ctx.arc(playerX, playerY + 2, 4, 0, Math.PI * 2);
      ctx.fill();

      // Draw asteroids
      ctx.fillStyle = '#94a3b8';
      asteroids.forEach(a => {
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw particles
      particles.forEach(p => {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life / 20;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
      });

      requestAnimationFrame(update);
    }

    requestAnimationFrame(update);

    // Cleanup when DOM elements removed
    const observer = new MutationObserver((mutations) => {
      if (!document.getElementById('game-canvas')) {
        isRunning = false;
        gameIntervals.forEach(clearInterval);
        observer.disconnect();
      }
    });
    observer.observe(previewWrapper, { childList: true });
  }

  // 2. Finance Dashboard Simulator Code
  function initFinanceDashboard() {
    const btnRefresh = document.getElementById('btn-finance-refresh');
    const balanceText = document.getElementById('fin-balance');
    const incomeText = document.getElementById('fin-income');
    const expenseText = document.getElementById('fin-expense');
    
    let balance = 14250000;
    let income = 3820000;
    let expense = 1480000;

    function formatWon(num) {
      return num.toLocaleString() + '₩';
    }

    function randomizeChart() {
      const bars = document.querySelectorAll('.chart-bar');
      bars.forEach(bar => {
        const targetVal = Math.floor(Math.random() * 80) + 15;
        bar.style.height = targetVal + '%';
      });
    }

    if (btnRefresh) {
      btnRefresh.addEventListener('click', () => {
        balance += Math.floor(Math.random() * 400000 - 150000);
        income += Math.floor(Math.random() * 80000);
        expense += Math.floor(Math.random() * 60000);
        
        balanceText.textContent = formatWon(balance);
        incomeText.textContent = formatWon(income);
        expenseText.textContent = formatWon(expense);
        randomizeChart();
      });
    }

    // Initial chart load animation
    setTimeout(randomizeChart, 200);
  }

  // 3. Kanban Task Board Simulator Code
  function initKanbanBoard() {
    const input = document.getElementById('todo-input');
    const btnAdd = document.getElementById('btn-todo-add');
    const todoList = document.getElementById('kanban-todo-list');
    const doneList = document.getElementById('kanban-done-list');

    let tasks = [
      { id: 1, text: "바이브 코딩 분석용 아티팩트 작성", status: "todo" },
      { id: 2, text: "테스트 모듈 자동화 시뮬레이션", status: "done" }
    ];

    function renderTasks() {
      todoList.innerHTML = "";
      doneList.innerHTML = "";

      tasks.forEach(task => {
        const taskEl = document.createElement('div');
        taskEl.className = 'kanban-task';
        taskEl.innerHTML = `
          <span>${task.text}</span>
          ${task.status === 'todo' 
            ? `<button onclick="window.kanbanComplete(${task.id})">완료</button>` 
            : `<button onclick="window.kanbanDelete(${task.id})" style="color:#ff5f56">삭제</button>`
          }
        `;

        if (task.status === 'todo') {
          todoList.appendChild(taskEl);
        } else {
          doneList.appendChild(taskEl);
        }
      });
    }

    // Make global functions so inline onclick triggers them
    window.kanbanComplete = (id) => {
      const task = tasks.find(t => t.id === id);
      if (task) {
        task.status = 'done';
        renderTasks();
      }
    };

    window.kanbanDelete = (id) => {
      tasks = tasks.filter(t => t.id !== id);
      renderTasks();
    };

    if (btnAdd && input) {
      btnAdd.addEventListener('click', () => {
        const text = input.value.trim();
        if (text) {
          tasks.push({
            id: Date.now(),
            text: text,
            status: 'todo'
          });
          input.value = "";
          renderTasks();
        }
      });

      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          btnAdd.click();
        }
      });
    }

    renderTasks();
  }


  // --- Personality Quiz Logic ---
  const quizQuestions = [
    {
      q: "새로운 소규모 토이 프로젝트 아이디어가 생겼을 때, 가장 먼저 하실 행동은?",
      options: [
        { text: "VS Code를 열고 적당한 보일러플레이트 파일을 손수 짠다.", score: { A: 0, B: 2, C: 1 } },
        { text: "AI 코딩 툴에 '이런 프로젝트 스켈레톤 코드 짜줘'라고 프롬프트부터 입력한다.", score: { A: 2, B: 0, C: 1 } },
        { text: "구상 내용을 구조화해서 프롬프트 가이드라인 문서를 먼저 기획한다.", score: { A: 1, B: 1, C: 2 } }
      ]
    },
    {
      q: "코드를 빌드하다가 모르는 복잡한 CSS 정렬 에러를 마주했습니다. 당신의 대처는?",
      options: [
        { text: "에러가 난 코드 블록을 통째로 복사해서 AI 에이전트에 던지고 고치라고 시킨다.", score: { A: 2, B: 0, C: 1 } },
        { text: "MDN 문서나 StackOverflow를 차근차근 검색해서 이유를 탐구한다.", score: { A: 0, B: 2, C: 0 } },
        { text: "원인을 추론하여 가설을 세운 후, AI에게 몇 가지 해결 방향을 제안하며 질문한다.", score: { A: 1, B: 1, C: 2 } }
      ]
    },
    {
      q: "바이브 코딩 시 AI 에이전트가 생성한 결과물을 신뢰하는 수준은?",
      options: [
        { text: "100% 신뢰한다. 대충 잘 굴러가면 눈으로 슥 보고 다음 단계로 넘어간다.", score: { A: 2, B: 0, C: 0 } },
        { text: "상당히 신뢰하지만, 콘솔창을 켜서 에러 로그가 안 떴는지 최소한의 작동 점검은 수행한다.", score: { A: 1, B: 1, C: 2 } },
        { text: "신뢰는 하되, 구체적인 코드 로직까지 한 줄 한 줄 직접 읽으며 문제점을 수정/보완한다.", score: { A: 0, B: 2, C: 1 } }
      ]
    },
    {
      q: "생산성 향상을 위한 최신 LLM 에이전트와 기술의 도입에 대한 당신의 생각은?",
      options: [
        { text: "기술의 정교함도 중요하지만 빠르게 시제품을 완성시키는 '속도'와 '바이브'가 핵심이다.", score: { A: 2, B: 0, C: 1 } },
        { text: "AI가 코드를 짜주더라도 언어의 기반 원리를 모르면 결국 한계에 부딪힌다고 생각한다.", score: { A: 0, B: 2, C: 1 } },
        { text: "어차피 기술은 추상화되므로, AI를 가장 잘 조종하는 오케스트레이터의 역할이 중요해질 것이다.", score: { A: 1, B: 1, C: 2 } }
      ]
    },
    {
      q: "개발 프로세스 중 가장 희열을 느끼는 단계는?",
      options: [
        { text: "아이디어가 동작하는 완성도 높은 앱을 남들에게 번개처럼 시연할 때", score: { A: 2, B: 0, C: 1 } },
        { text: "복잡하고 미궁에 빠졌던 알고리즘이나 구문 버그를 완벽히 자체 해결했을 때", score: { A: 0, B: 2, C: 0 } },
        { text: "AI 에이전트를 잘 다루어 고품질의 설계를 정교하게 빌드해냈을 때", score: { A: 1, B: 1, C: 2 } }
      ]
    }
  ];

  const personas = {
    A: {
      name: "바이브 100% 영혼의 지휘자 (Vibe Conductor)",
      description: "당신은 극강의 스피드와 감각을 바탕으로 흐름을 이끄는 '바이브 코더'입니다! 세부 문법이나 귀찮은 설정에 얽매이지 않고, AI 에이전트와 완벽한 호흡을 맞춰 최소한의 지시어로 번개처럼 동작하는 애플리케이션을 창조합니다. 디렉터 마인드셋을 확실히 탑재한 신시대 개발 형태를 선보이고 있습니다.",
      fit: "95%",
      keyword: "극강의 효율 / 오케스트레이션 / 속도전"
    },
    B: {
      name: "꼼꼼한 전통파 아키텍트 (Pragmatic Developer)",
      description: "당신은 AI에만 의존하기보다 개발 언어 고유의 구문 원리, 데이터 구조의 논리적 정확성을 중시하는 '전통적 아키텍트'입니다. AI를 적극적으로 도구로 활용하지만 최종 구현체의 깊이와 코드 가독성, 최적화까지도 직접 관제하길 원하며, 든든한 기술 백그라운드를 기반으로 한 안정성이 돋보입니다.",
      fit: "45%",
      keyword: "디테일 코드 검증 / 기술 원리 / 구조 설계"
    },
    C: {
      name: "하이브리드 프롬프트 엔지니어 (Synth-Coder)",
      description: "당신은 AI의 높은 생산성과 인간의 논리적 설계를 적절히 블렌딩하는 정교한 '하이브리드 신스-코더(Synth-Coder)'입니다. 기획 의도를 정교하게 매뉴얼화하고 가이드라인을 주입하여 AI가 고품질 결과물을 내게 유도합니다. 정교한 프롬프트 오케스트레이션 설계와 합리적 의심을 병행하는 가장 트렌디한 유형입니다.",
      fit: "80%",
      keyword: "맥락 전달 / 시스템 조율 / 가이드 프롬프팅"
    }
  };

  let currentQuestionIdx = 0;
  let accumulatedScores = { A: 0, B: 0, C: 0 };

  const btnStartQuiz = document.getElementById('btn-start-quiz');
  const btnRestartQuiz = document.getElementById('btn-restart-quiz');
  const quizWelcome = document.getElementById('quiz-welcome');
  const quizQuestionContainer = document.getElementById('quiz-question-container');
  const quizResult = document.getElementById('quiz-result');
  const quizProgressBar = document.getElementById('quiz-progress-bar');
  const quizStepSpan = document.getElementById('quiz-step');
  const quizQuestionText = document.getElementById('quiz-question');
  const quizOptionsContainer = document.getElementById('quiz-options');

  const resultName = document.getElementById('result-name');
  const resultDescription = document.getElementById('result-description');
  const resultScoreVibe = document.getElementById('result-score-vibe');
  const resultKeyword = document.getElementById('result-keyword');

  if (btnStartQuiz) {
    btnStartQuiz.addEventListener('click', () => {
      quizWelcome.classList.add('hidden');
      quizQuestionContainer.classList.remove('hidden');
      currentQuestionIdx = 0;
      accumulatedScores = { A: 0, B: 0, C: 0 };
      showQuestion();
    });
  }

  function showQuestion() {
    const totalQuestions = quizQuestions.length;
    const currentQ = quizQuestions[currentQuestionIdx];
    
    // Update progress bar
    const progressPercent = ((currentQuestionIdx) / totalQuestions) * 100;
    quizProgressBar.style.width = `${progressPercent}%`;
    quizStepSpan.textContent = `질문 ${currentQuestionIdx + 1} / ${totalQuestions}`;
    quizQuestionText.textContent = currentQ.q;
    
    // Inject options
    quizOptionsContainer.innerHTML = "";
    currentQ.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'quiz-opt-btn';
      btn.textContent = opt.text;
      btn.addEventListener('click', () => handleOptionClick(opt.score));
      quizOptionsContainer.appendChild(btn);
    });
  }

  function handleOptionClick(score) {
    // Add up scores
    accumulatedScores.A += score.A;
    accumulatedScores.B += score.B;
    accumulatedScores.C += score.C;

    currentQuestionIdx++;
    if (currentQuestionIdx < quizQuestions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }

  function showResult() {
    quizQuestionContainer.classList.add('hidden');
    quizResult.classList.remove('hidden');
    quizProgressBar.style.width = `100%`;

    // Calculate highest score
    let highestType = 'A';
    let maxScore = -1;
    for (const key in accumulatedScores) {
      if (accumulatedScores[key] > maxScore) {
        maxScore = accumulatedScores[key];
        highestType = key;
      }
    }

    const matchedPersona = personas[highestType];
    resultName.textContent = matchedPersona.name;
    resultDescription.textContent = matchedPersona.description;
    resultScoreVibe.textContent = matchedPersona.fit;
    resultKeyword.textContent = matchedPersona.keyword;
  }

  if (btnRestartQuiz) {
    btnRestartQuiz.addEventListener('click', () => {
      quizResult.classList.add('hidden');
      quizWelcome.classList.remove('hidden');
      quizProgressBar.style.width = `0%`;
    });
  }
});
