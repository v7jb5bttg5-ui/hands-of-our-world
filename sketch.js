let handPose;
let video;
let hands = [];

let particles = [];
let handWaves = [];
let stillMists = [];
let approachWaves = [];

let openPalmSound;
let slowSound;
let stillSound;
let approachSound;
let meditationSound;

let prevPalmX = 0;
let prevPalmY = 0;
let hasPreviousPalm = false;

let openPalm = false;
let previousOpenPalm = false;

let stillFrames = 0;
let slowHold = 0;
let approachHold = 0;
let meditationGlow = 0;

let meditationHold = 0;
let meditationX = 0;
let meditationY = 0;
let prevSpread = 0;
let hasPreviousSpread = false;
let slowSoundCooldown = 0;
let started = false;
let cameraStarted = false;
let cameraReady = false;
let handPoseStarted = false;
let cameraWaitTimer;
const captureWidth = 640;
const captureHeight = 480;

function preload() {
  handPose = ml5.handPose();

  openPalmSound = loadSound("open_palm.wav");
  approachSound = loadSound("approach.mp3");
  meditationSound = loadSound("meditation.mp3");
  slowSound = loadSound("slow_water.mp3");
  stillSound = loadSound("hand_still.wav");
}

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("artworkMount");
  canvas.addClass("artwork-canvas");
  background(0);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}

function getVideoCoverLayout() {
  const scale = max(width / captureWidth, height / captureHeight);
  const drawWidth = captureWidth * scale;
  const drawHeight = captureHeight * scale;

  return {
    x: (width - drawWidth) / 2,
    y: (height - drawHeight) / 2,
    width: drawWidth,
    height: drawHeight,
    scale,
  };
}

let videoLayout = { x: 0, y: 0, width: 640, height: 480, scale: 1 };

function draw() {
  if (!started || !video) {
    return;
  }

  if (!cameraReady && video.elt.readyState >= 2) {
    markCameraReady();
  }

  if (!cameraReady) {
    return;
  }

  if (slowSoundCooldown > 0) {
    slowSoundCooldown--;
  }

  videoLayout = getVideoCoverLayout();

  push();
  translate(width, 0);
  scale(-1, 1);
  translate(videoLayout.x, videoLayout.y);
  scale(videoLayout.scale);

  image(video, 0, 0, captureWidth, captureHeight);

  if (hands.length > 0) {
    if (hands.length >= 2) {
      let handA = hands[0];
      let handB = hands[1];

      let aTip = handA.keypoints[12];
      let bTip = handB.keypoints[12];

      let handDistance = dist(aTip.x, aTip.y, bTip.x, bTip.y);

      let centerX = (aTip.x + bTip.x) / 2;
      let centerY = (aTip.y + bTip.y) / 2;

      if (handDistance < 200) {
        if (meditationHold === 0) {
          meditationSound.stop();
          meditationSound.play();
        }
        slowSound.stop();
        stillSound.stop();

        meditationHold = 30;
        meditationX = centerX;
        meditationY = centerY;
      }
    }
    if (meditationHold > 0) {
      meditationGlow = min(meditationGlow + 10, 255);
      meditationHold--;
    } else {
      meditationGlow = max(meditationGlow - 6, 0);
    }

    if (meditationGlow > 0) {
      fill(0, 0, 0, map(meditationGlow, 0, 255, 0, 90));

      noStroke();

      rect(0, 0, captureWidth, captureHeight);

      noStroke();

      for (let r = 160; r > 0; r -= 12) {
        fill(255, 235, 180, meditationGlow * 0.08);

        circle(meditationX, meditationY, r);
      }
    }
    let hand = hands[0];

    let thumb = hand.keypoints[4];
    let pinky = hand.keypoints[20];

    let spread = dist(thumb.x, thumb.y, pinky.x, pinky.y);

    let p0 = hand.keypoints[0];
    let p5 = hand.keypoints[5];
    let p9 = hand.keypoints[9];
    let p13 = hand.keypoints[13];
    let p17 = hand.keypoints[17];

    let palmX = (p0.x + p5.x + p9.x + p13.x + p17.x) / 5;

    let palmY = (p0.y + p5.y + p9.y + p13.y + p17.y) / 5;

    let handSpeed = 0;
    let movementX = 0;

    if (hasPreviousPalm) {
      handSpeed = dist(palmX, palmY, prevPalmX, prevPalmY);

      movementX = palmX - prevPalmX;
    }

    let spreadChange = 0;

    if (hasPreviousSpread) {
      spreadChange = spread - prevSpread;
    }

    let wrist = hand.keypoints[0];

    let indexTip = hand.keypoints[8];
    let middleTip = hand.keypoints[12];
    let ringTip = hand.keypoints[16];
    let pinkyTip = hand.keypoints[20];

    let indexDist = dist(wrist.x, wrist.y, indexTip.x, indexTip.y);
    let middleDist = dist(wrist.x, wrist.y, middleTip.x, middleTip.y);
    let ringDist = dist(wrist.x, wrist.y, ringTip.x, ringTip.y);
    let pinkyDist = dist(wrist.x, wrist.y, pinkyTip.x, pinkyTip.y);

    openPalm =
      indexDist > 135 &&
      middleDist > 145 &&
      ringDist > 135 &&
      pinkyDist > 115;

    if (
      spreadChange > 12 &&
      spread > 300 &&
      abs(movementX) < 6 &&
      meditationGlow < 20
    ) {
      if (approachHold === 0) {
        approachSound.stop();
        approachSound.play();
      }
      slowSound.stop();
      stillSound.stop();

      approachHold = 22;
      slowHold = 0;
      handWaves = [];
    }

    prevSpread = spread;
    hasPreviousSpread = true;

    if (
      approachHold === 0 &&
      meditationGlow < 20 &&
      spreadChange < 4 &&
      handSpeed > 6 &&
      handSpeed < 9 &&
      abs(movementX) > 8 &&
      slowHold === 0
    ) {
      if (slowSoundCooldown === 0) {
        slowSound.stop();
        slowSound.play();
        slowSoundCooldown = 45;
      }

      if (slowHold === 0) {
        slowHold = 3;
      }

      stillFrames = 0;
    } else if (handSpeed <= 0.7) {
      stillFrames++;
    } else {
      stillFrames = 0;
    }

    if (meditationGlow > 40) {
      handWaves = [];
      approachWaves = [];
      slowHold = 0;
      approachHold = 0;
    } else if (approachHold > 0) {
      handWaves = [];
      stillMists = [];
      slowHold = 0;

      if (frameCount % 10 === 0) {
        approachWaves.push(new ApproachWave(palmX, palmY));
      }

      approachHold--;
    } else if (openPalm && !previousOpenPalm) {
      openPalmSound.stop();
      openPalmSound.play();

      slowSound.stop();
      stillSound.stop();

      handWaves = [];
      stillMists = [];
      approachWaves = [];

      for (let k = 0; k < 300; k++) {
        particles.push(new Particle(palmX + random(-20, 20), palmY + random(-20, 20)));
      }
    } else if (slowHold > 0 && stillFrames < 15) {
      stillMists = [];

      if (stillSound.isPlaying()) {
        stillSound.stop();
      }

      if (slowHold === 3) {
        handWaves.push(new HandWave(palmX, palmY, movementX));
      }

      slowHold--;
    } else if (stillFrames > 14) {
      handWaves = [];
      approachWaves = [];

      if (!stillSound.isPlaying()) {
        stillSound.loop();
      }

      if (frameCount % 8 === 0) {
        let randomPoint = hand.keypoints[floor(random(hand.keypoints.length))];

        stillMists.push(new StillMist(randomPoint.x, randomPoint.y));
      }
    }

    previousOpenPalm = openPalm;

    prevPalmX = palmX;
    prevPalmY = palmY;
    hasPreviousPalm = true;
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();

    if (particles[i].finished()) {
      particles.splice(i, 1);
    }
  }

  for (let i = handWaves.length - 1; i >= 0; i--) {
    handWaves[i].update();
    handWaves[i].display();

    if (handWaves[i].finished()) {
      handWaves.splice(i, 1);
    }
  }
  for (let i = approachWaves.length - 1; i >= 0; i--) {
    approachWaves[i].update();
    approachWaves[i].display();

    if (approachWaves[i].finished()) {
      approachWaves.splice(i, 1);
    }
  }
  for (let i = stillMists.length - 1; i >= 0; i--) {
    stillMists[i].update();
    stillMists[i].display();

    if (stillMists[i].finished()) {
      stillMists.splice(i, 1);
    }
  }

  pop();
}

function startExperience() {
  if (started) {
    return;
  }

  started = true;
  window.showCameraStatus?.("starting");

  userStartAudio();

  particles = [];
  handWaves = [];
  stillMists = [];
  approachWaves = [];

  previousOpenPalm = false;
  hasPreviousPalm = false;
  hasPreviousSpread = false;

  stillFrames = 0;
  slowHold = 0;
  approachHold = 0;
  meditationHold = 0;
  meditationGlow = 0;

  startCamera();
}

window.startExperience = startExperience;

async function startCamera() {
  if (cameraStarted) {
    return;
  }

  cameraStarted = true;
  cameraReady = false;
  window.clearTimeout(cameraWaitTimer);

  try {
    video = createCapture(
      {
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: "user",
        },
        audio: false,
      },
      () => {
        window.showCameraStatus?.("waiting");
      },
    );
    video.size(640, 480);
    video.hide();
    video.elt.muted = true;
    video.elt.autoplay = true;
    video.elt.playsInline = true;
    video.elt.setAttribute("playsinline", "true");
    video.elt.addEventListener("loadeddata", markCameraReady, { once: true });
    video.elt.addEventListener("canplay", markCameraReady, { once: true });
    video.elt.play?.().catch(() => {});

    cameraWaitTimer = window.setTimeout(() => {
      if (!cameraReady) {
        window.showCameraStatus?.("waiting");
      }
    }, 4000);
  } catch (error) {
    cameraStarted = false;
    cameraReady = false;

    if (error.name === "NotAllowedError" || error.name === "PermissionDeniedError") {
      window.showCameraStatus?.("denied");
      return;
    }

    if (error.name === "NotFoundError" || error.name === "DevicesNotFoundError") {
      window.showCameraStatus?.("missing");
      return;
    }

    window.showCameraStatus?.("error");
  }
}

function markCameraReady() {
  if (cameraReady || !video) {
    return;
  }

  cameraReady = true;
  window.clearTimeout(cameraWaitTimer);
  window.showCameraStatus?.("ready");

  if (!handPoseStarted) {
    handPoseStarted = true;
    handPose.detectStart(video, gotHands);
  }
}

function retryCamera() {
  if (video) {
    const stream = video.elt.srcObject;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    video.remove();
    video = undefined;
  }

  hands = [];
  cameraStarted = false;
  cameraReady = false;
  handPoseStarted = false;
  window.showCameraStatus?.("starting");
  startCamera();
}

window.retryCamera = retryCamera;

function gotHands(results) {
  hands = results;
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    let angle = random(TWO_PI);
    let speed = random(2, 8);

    this.vx = cos(angle) * speed;
    this.vy = sin(angle) * speed;

    this.size = random(8, 25);
    this.alpha = 255;

    this.r = random(240, 255);
    this.g = random(200, 240);
    this.b = random(120, 180);
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 1.2;
  }

  display() {
    noStroke();
    fill(this.r, this.g, this.b, this.alpha);
    circle(this.x, this.y, this.size);
  }

  finished() {
    return this.alpha <= 0;
  }
}

class HandWave {
  constructor(x, y, movementX) {
    this.x = x;
    this.y = y;

    this.r = 45;
    this.alpha = 190;
    this.move = movementX;
    this.offset = random(1000);
  }

  update() {
    this.r += 2.2;
    this.alpha -= 2.5;
    this.x += this.move * 0.25;
  }

  display() {
    noFill();
    stroke(40, 170, 255, this.alpha);
    strokeWeight(5);

    let wobble = sin(frameCount * 0.08 + this.offset) * 8;

    arc(this.x, this.y, this.r * 2 + wobble, this.r * 2, HALF_PI + 0.35, PI + HALF_PI - 0.35);

    arc(this.x, this.y, this.r * 2 + wobble, this.r * 2, -HALF_PI + 0.35, HALF_PI - 0.35);

    arc(this.x, this.y, this.r * 1.6, this.r * 1.6 + wobble, PI + 0.6, TWO_PI - 0.6);

    arc(this.x, this.y, this.r * 1.6, this.r * 1.6 + wobble, 0.6, PI - 0.6);
  }

  finished() {
    return this.alpha <= 0;
  }
}

class StillMist {
  constructor(x, y) {
    this.x = x + random(-25, 25);
    this.y = y + random(-25, 25);

    this.size = random(15, 60);
    this.alpha = random(35, 90);

    this.r = random(210, 255);
    this.g = random(220, 255);
    this.b = random(235, 255);

    this.vx = random(-0.3, 0.3);
    this.vy = random(-0.5, 0.2);
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    this.size += random(0.03, 0.12);
    this.alpha -= 0.08;
  }

  display() {
    noStroke();

    fill(this.r, this.g, this.b, this.alpha);

    circle(this.x, this.y, this.size);
  }

  finished() {
    return this.alpha <= 0;
  }
}

class ApproachWave {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.radius = 20;

    this.alpha = 220;
  }

  update() {
    this.radius += 3.2;

    this.alpha -= 1.8;
  }

  display() {
    noFill();

    stroke(255, 240, 180, this.alpha);
    strokeWeight(5);

    circle(this.x, this.y, this.radius * 2);
  }

  finished() {
    return this.alpha <= 0;
  }
}
