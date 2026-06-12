const pages = {
  landing: document.getElementById("landingPage"),
  tutorial: document.getElementById("tutorialPage"),
  artwork: document.getElementById("artworkPage"),
};

const translations = {
  en: {
    landingKicker: "Interactive media art",
    title: "Hands of Our World",
    subtitle: "A gesture-based interactive experience",
    start: "Start",
    back: "Back",
    next: "Next",
    enter: "Enter Experience",
    help: "Help",
    helpTitle: "Gesture Guide",
    close: "Close",
    cameraStarting: "Starting camera",
    cameraStartingText: "Please allow camera access in the browser.",
    cameraReady: "Camera ready",
    cameraReadyText: "Move your hand in front of the camera to begin.",
    cameraDenied: "Camera permission is blocked",
    cameraDeniedText: "Allow camera access for this page, then refresh and enter again.",
    cameraNoDevice: "No camera found",
    cameraNoDeviceText: "Connect or enable a camera, then refresh and enter again.",
    cameraError: "Camera could not start",
    cameraErrorText: "Close other apps using the camera, then refresh and try again.",
    cameraWaiting: "Waiting for video",
    cameraWaitingText: "If this is the Codex in-app browser, open the same URL in Chrome or Edge. If the permission popup is open, choose Allow.",
    retryCamera: "Retry Camera",
    steps: [
      {
        label: "Open Palm",
        icon: "open",
        instruction: "Open one hand toward the camera.",
        feedback: "A burst of warm particles and an opening sound will appear.",
      },
      {
        label: "Hands Moving Slowly",
        icon: "slow",
        instruction: "Move your hand slowly from side to side.",
        feedback: "Blue wave shapes and water-like sound respond to gentle movement.",
      },
      {
        label: "Hands Close Together",
        icon: "close",
        instruction: "Bring both hands close to each other.",
        feedback: "A soft golden glow and meditation sound appear between your hands.",
      },
      {
        label: "Hand Stays Still",
        icon: "still",
        instruction: "Keep one hand still for a few seconds.",
        feedback: "A pale mist gathers and a steady tone continues.",
      },
      {
        label: "Hand Slowly Extends Toward Camera",
        icon: "approach",
        instruction: "Slowly extend your hand toward the camera.",
        feedback: "Expanding rings and a bright approaching sound appear.",
      },
    ],
  },
  ko: {
    landingKicker: "인터랙티브 미디어 아트",
    title: "Hands of Our World",
    subtitle: "제스처 기반 인터랙티브 경험",
    start: "시작",
    back: "뒤로",
    next: "다음",
    enter: "체험 입장",
    help: "도움말",
    helpTitle: "제스처 안내",
    close: "닫기",
    cameraStarting: "카메라 시작 중",
    cameraStartingText: "브라우저에서 카메라 접근을 허용해 주세요.",
    cameraReady: "카메라 준비 완료",
    cameraReadyText: "카메라 앞에서 손을 움직이면 작품이 시작됩니다.",
    cameraDenied: "카메라 권한이 차단되었습니다",
    cameraDeniedText: "이 페이지의 카메라 접근을 허용한 뒤 새로고침하고 다시 입장해 주세요.",
    cameraNoDevice: "카메라를 찾을 수 없습니다",
    cameraNoDeviceText: "카메라를 연결하거나 활성화한 뒤 새로고침하고 다시 입장해 주세요.",
    cameraError: "카메라를 시작할 수 없습니다",
    cameraErrorText: "카메라를 사용 중인 다른 앱을 닫고 새로고침한 뒤 다시 시도해 주세요.",
    cameraWaiting: "비디오를 기다리는 중",
    cameraWaitingText: "Codex 내장 브라우저라면 같은 주소를 Chrome 또는 Edge에서 열어 주세요. 권한 창이 열려 있으면 허용을 눌러 주세요.",
    retryCamera: "카메라 다시 열기",
    steps: [
      {
        label: "손바닥 펴기",
        icon: "open",
        instruction: "한 손의 손바닥을 카메라 쪽으로 펼쳐 주세요.",
        feedback: "따뜻한 입자와 열리는 듯한 소리가 나타납니다.",
      },
      {
        label: "손 천천히 움직이기",
        icon: "slow",
        instruction: "손을 좌우로 천천히 움직여 주세요.",
        feedback: "푸른 물결 모양과 물소리 같은 반응이 따라옵니다.",
      },
      {
        label: "두 손 가까이 모으기",
        icon: "close",
        instruction: "두 손을 서로 가까이 가져와 주세요.",
        feedback: "두 손 사이에 부드러운 금빛과 명상적인 소리가 생깁니다.",
      },
      {
        label: "손 멈추기",
        icon: "still",
        instruction: "한 손을 몇 초 동안 가만히 유지해 주세요.",
        feedback: "옅은 안개가 모이고 안정적인 소리가 이어집니다.",
      },
      {
        label: "손을 카메라 쪽으로 천천히 뻗기",
        icon: "approach",
        instruction: "손을 카메라 쪽으로 천천히 뻗어 주세요.",
        feedback: "확장되는 고리와 밝은 접근 소리가 나타납니다.",
      },
    ],
  },
  zh: {
    landingKicker: "互动媒体艺术",
    title: "Hands of Our World",
    subtitle: "基于手势的互动体验",
    start: "开始",
    back: "返回",
    next: "下一步",
    enter: "进入体验",
    help: "帮助",
    helpTitle: "手势说明",
    close: "关闭",
    cameraStarting: "正在启动摄像头",
    cameraStartingText: "请在浏览器弹窗中允许摄像头权限。",
    cameraReady: "摄像头已准备好",
    cameraReadyText: "把手放到摄像头前，作品就会开始回应。",
    cameraDenied: "摄像头权限被阻止",
    cameraDeniedText: "请允许此页面使用摄像头，然后刷新页面重新进入体验。",
    cameraNoDevice: "没有找到摄像头",
    cameraNoDeviceText: "请连接或启用摄像头，然后刷新页面重新进入体验。",
    cameraError: "摄像头无法启动",
    cameraErrorText: "请关闭正在占用摄像头的软件，然后刷新页面再试一次。",
    cameraWaiting: "正在等待视频画面",
    cameraWaitingText: "如果你正在用 Codex 内置浏览器，请把同一网址复制到 Chrome 或 Edge 打开。如果权限弹窗还开着，请点击允许。",
    retryCamera: "重新打开摄像头",
    steps: [
      {
        label: "张开手掌",
        icon: "open",
        instruction: "将一只手的手掌朝向摄像头张开。",
        feedback: "画面会出现温暖的粒子爆发，并伴随打开的声音。",
      },
      {
        label: "双手缓慢移动",
        icon: "slow",
        instruction: "把手缓慢地左右移动。",
        feedback: "蓝色波纹和类似水声的声音会回应你的动作。",
      },
      {
        label: "双手靠近",
        icon: "close",
        instruction: "将两只手慢慢靠近彼此。",
        feedback: "两手之间会出现柔和的金色光晕和冥想般的声音。",
      },
      {
        label: "手保持静止",
        icon: "still",
        instruction: "让一只手保持静止几秒钟。",
        feedback: "淡色雾气会聚集，并持续发出稳定的声音。",
      },
      {
        label: "手慢慢伸向摄像头",
        icon: "approach",
        instruction: "将手慢慢向摄像头方向伸出。",
        feedback: "画面会出现扩散的圆环和明亮的靠近声音。",
      },
    ],
  },
};

let currentLanguage = "en";
let currentStep = 0;

const stepCount = document.getElementById("stepCount");
const gestureIcon = document.getElementById("gestureIcon");
const gestureLabel = document.getElementById("gestureLabel");
const tutorialInstruction = document.getElementById("tutorialInstruction");
const tutorialFeedback = document.getElementById("tutorialFeedback");
const tutorialDots = document.getElementById("tutorialDots");
const nextTutorialButton = document.getElementById("nextTutorialButton");
const helpModal = document.getElementById("helpModal");
const helpList = document.getElementById("helpList");
const cameraStatus = document.getElementById("cameraStatus");
const cameraStatusTitle = document.getElementById("cameraStatusTitle");
const cameraStatusText = document.getElementById("cameraStatusText");
const retryCameraButton = document.getElementById("retryCameraButton");

function gestureSvg(type) {
  const icons = {
    open: `
      <svg viewBox="0 0 160 120" role="img" aria-label="Open palm">
        <path class="soft-fill" d="M61 102c-17-18-25-37-21-54 3-13 15-10 18 1V28c0-8 12-9 13 0v25-32c0-8 12-8 13 0v32-28c0-8 12-8 13 0v31-20c0-8 12-8 13 0v44c0 23-14 34-31 34-7 0-13-3-18-8Z"/>
        <line x1="49" y1="20" x2="38" y2="9"/>
        <line x1="80" y1="14" x2="80" y2="4"/>
        <line x1="111" y1="20" x2="122" y2="9"/>
      </svg>`,
    slow: `
      <svg viewBox="0 0 160 120" role="img" aria-label="Slow hand movement">
        <path class="soft-fill" d="M66 96c-15-14-22-30-18-45 3-10 12-8 15 1V34c0-7 10-8 11 0v22-28c0-7 10-7 11 0v28-24c0-7 10-7 11 0v27-16c0-7 10-7 11 0v38c0 20-12 30-28 30-5 0-10-2-13-5Z"/>
        <path class="motion" d="M20 42c12-10 24-10 36 0"/>
        <path class="motion" d="M104 42c12-10 24-10 36 0"/>
        <path class="motion" d="M22 74c12 10 24 10 36 0"/>
        <path class="motion" d="M102 74c12 10 24 10 36 0"/>
      </svg>`,
    close: `
      <svg viewBox="0 0 160 120" role="img" aria-label="Hands close together">
        <path class="soft-fill" d="M45 94c-13-12-18-25-15-37 2-9 9-7 11 1V43c0-6 8-6 9 0v19-24c0-6 8-6 9 0v24-21c0-6 8-6 9 0v23-14c0-6 8-6 9 0v31c0 16-10 25-22 25-4 0-8-2-10-4Z"/>
        <path class="soft-fill" d="M115 94c13-12 18-25 15-37-2-9-9-7-11 1V43c0-6-8-6-9 0v19-24c0-6-8-6-9 0v24-21c0-6-8-6-9 0v23-14c0-6-8-6-9 0v31c0 16 10 25 22 25 4 0 8-2 10-4Z"/>
        <path class="motion" d="M30 24h28"/>
        <path class="motion" d="M102 24h28"/>
        <path class="motion" d="M58 24l-8-8"/>
        <path class="motion" d="M102 24l8-8"/>
      </svg>`,
    still: `
      <svg viewBox="0 0 160 120" role="img" aria-label="Hand stays still">
        <path class="soft-fill" d="M61 99c-16-16-23-33-19-49 3-11 13-9 16 1V32c0-7 11-8 12 0v24-30c0-8 11-8 12 0v30-26c0-8 11-8 12 0v29-18c0-7 11-7 12 0v40c0 21-13 31-29 31-6 0-11-2-16-6Z"/>
        <circle class="motion" cx="80" cy="60" r="52"/>
        <circle class="motion" cx="80" cy="60" r="40"/>
      </svg>`,
    approach: `
      <svg viewBox="0 0 160 120" role="img" aria-label="Hand extends toward camera">
        <circle class="motion" cx="80" cy="58" r="47"/>
        <circle class="motion" cx="80" cy="58" r="31"/>
        <path class="soft-fill" d="M62 88c-13-12-18-25-15-37 2-9 9-7 11 1V38c0-6 9-7 10 0v18-23c0-6 9-6 10 0v23-20c0-6 9-6 10 0v22-13c0-6 9-6 10 0v29c0 16-10 24-23 24-5 0-9-2-13-5Z"/>
        <path class="motion" d="M80 8v19"/>
        <path class="motion" d="M72 20l8 8 8-8"/>
      </svg>`,
  };

  return icons[type] || icons.open;
}

function showPage(pageName) {
  Object.entries(pages).forEach(([name, page]) => {
    page.hidden = name !== pageName;
  });
}

function translateStaticText() {
  const copy = translations[currentLanguage];
  document.documentElement.lang = currentLanguage;

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    if (copy[key]) {
      node.textContent = copy[key];
    }
  });

  document.querySelectorAll("[data-close-help]").forEach((node) => {
    if (node instanceof HTMLButtonElement) {
      node.setAttribute("aria-label", copy.close);
    }
  });

  document.querySelectorAll(".language-button").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.lang === currentLanguage);
  });
}

function renderTutorialStep() {
  const copy = translations[currentLanguage];
  const step = copy.steps[currentStep];

  stepCount.textContent = `${currentStep + 1} / ${copy.steps.length}`;
  gestureIcon.innerHTML = gestureSvg(step.icon);
  gestureLabel.textContent = step.label;
  tutorialInstruction.textContent = step.instruction;
  tutorialFeedback.textContent = step.feedback;
  nextTutorialButton.textContent =
    currentStep === copy.steps.length - 1 ? copy.enter : copy.next;

  tutorialDots.replaceChildren(
    ...copy.steps.map((_, index) => {
      const dot = document.createElement("span");
      dot.className = index === currentStep ? "is-active" : "";
      return dot;
    }),
  );
}

function renderHelp() {
  const copy = translations[currentLanguage];
  helpList.replaceChildren(
    ...copy.steps.map((step) => {
      const item = document.createElement("article");
      item.className = "help-item";

      const icon = document.createElement("div");
      icon.className = "help-icon";
      icon.innerHTML = gestureSvg(step.icon);

      const text = document.createElement("div");

      const title = document.createElement("h3");
      title.textContent = step.label;

      const body = document.createElement("p");
      body.textContent = `${step.instruction} ${step.feedback}`;

      text.append(title, body);
      item.append(icon, text);
      return item;
    }),
  );
}

function showCameraStatus(state, detail = "") {
  const copy = translations[currentLanguage];
  const content = {
    starting: [copy.cameraStarting, copy.cameraStartingText],
    ready: [copy.cameraReady, copy.cameraReadyText],
    denied: [copy.cameraDenied, copy.cameraDeniedText],
    missing: [copy.cameraNoDevice, copy.cameraNoDeviceText],
    waiting: [copy.cameraWaiting, copy.cameraWaitingText],
    error: [copy.cameraError, detail || copy.cameraErrorText],
  }[state];

  if (!cameraStatus || !cameraStatusTitle || !cameraStatusText || !content) return;

  cameraStatusTitle.textContent = content[0];
  cameraStatusText.textContent = content[1];
  cameraStatus.hidden = false;
  retryCameraButton.textContent = copy.retryCamera;
  retryCameraButton.hidden = !["waiting", "denied", "missing", "error"].includes(state);

  if (state === "ready") {
    window.clearTimeout(showCameraStatus.hideTimer);
    showCameraStatus.hideTimer = window.setTimeout(() => {
      cameraStatus.hidden = true;
    }, 2600);
  }
}

window.showCameraStatus = showCameraStatus;

retryCameraButton.addEventListener("click", () => {
  window.retryCamera?.();
});

function setLanguage(language) {
  currentLanguage = language;
  translateStaticText();
  renderTutorialStep();
  renderHelp();
}

document.querySelectorAll(".language-button").forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang || "en"));
});

document.getElementById("startTutorialButton").addEventListener("click", () => {
  currentStep = 0;
  renderTutorialStep();
  showPage("tutorial");
});

document.getElementById("backToLandingButton").addEventListener("click", () => {
  showPage("landing");
});

nextTutorialButton.addEventListener("click", () => {
  const copy = translations[currentLanguage];

  if (currentStep < copy.steps.length - 1) {
    currentStep += 1;
    renderTutorialStep();
    return;
  }

  showPage("artwork");
  window.startExperience?.();
});

document.getElementById("helpButton").addEventListener("click", () => {
  renderHelp();
  helpModal.hidden = false;
});

document.querySelectorAll("[data-close-help]").forEach((node) => {
  node.addEventListener("click", () => {
    helpModal.hidden = true;
  });
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    helpModal.hidden = true;
  }
});

setLanguage(currentLanguage);
