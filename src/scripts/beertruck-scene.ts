// Arrière-plan 3D : un Citroën HY transformé en beertruck fait l'aller-retour sur une route pavée,
// à l'heure dorée. Tout est procédural (aucun modèle à télécharger), low-poly, une seule lumière ombrée.
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const WHEEL_R = 0.42;

// Aléatoire déterministe : même pavage à chaque visite
function seeded(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function softDot() {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d')!;
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}

function cobbles(light: boolean) {
  const c = document.createElement('canvas');
  c.width = c.height = 512;
  const g = c.getContext('2d')!;
  const rnd = seeded(7);
  g.fillStyle = light ? '#a39a8b' : '#0f0e0c';
  g.fillRect(0, 0, 512, 512);
  for (let row = 0; row < 16; row++) {
    let x = row % 2 ? -24 : 0;
    while (x < 512) {
      const w = 36 + rnd() * 22;
      const l = light ? 70 + rnd() * 10 : 15 + rnd() * 9;
      g.fillStyle = `hsl(30 7% ${l}%)`;
      g.beginPath();
      g.roundRect(x + 2, row * 32 + 2, w - 4, 28, 7);
      g.fill();
      x += w;
    }
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  tex.repeat.set(30, 9);
  return tex;
}

// Transparence du sol : l'arrière de la route se fond dans la page, pas de ligne d'horizon dure
function horizonFade() {
  const c = document.createElement('canvas');
  c.width = 4;
  c.height = 256;
  const g = c.getContext('2d')!;
  const grad = g.createLinearGradient(0, 0, 0, 256);
  grad.addColorStop(0, '#000');
  grad.addColorStop(0.3, '#fff');
  g.fillStyle = grad;
  g.fillRect(0, 0, 4, 256);
  return new THREE.CanvasTexture(c);
}

function buildTruck() {
  const m = {
    amber: new THREE.MeshPhysicalMaterial({ color: 0xe3a444, roughness: 0.38, metalness: 0.35, clearcoat: 0.7, clearcoatRoughness: 0.3 }),
    cream: new THREE.MeshPhysicalMaterial({ color: 0xebe4d2, roughness: 0.45, metalness: 0.1, clearcoat: 0.5, clearcoatRoughness: 0.4 }),
    wood: new THREE.MeshStandardMaterial({ color: 0x8b5a2b, roughness: 0.85 }),
    woodDark: new THREE.MeshStandardMaterial({ color: 0x4a2f18, roughness: 0.9 }),
    brass: new THREE.MeshStandardMaterial({ color: 0xd9ab52, metalness: 1, roughness: 0.22 }),
    steel: new THREE.MeshStandardMaterial({ color: 0xcfd2d6, metalness: 1, roughness: 0.28 }),
    dark: new THREE.MeshStandardMaterial({ color: 0x16130f, roughness: 0.8 }),
    glass: new THREE.MeshPhysicalMaterial({ color: 0x1f262c, roughness: 0.08, metalness: 0.3, clearcoat: 1 }),
    tire: new THREE.MeshStandardMaterial({ color: 0x121212, roughness: 0.92 }),
    bottle: new THREE.MeshStandardMaterial({ color: 0x5a2d0c, roughness: 0.15, metalness: 0.2 }),
    lamp: new THREE.MeshStandardMaterial({ color: 0xfff1cf, emissive: 0xffc46e, emissiveIntensity: 1.6 }),
    bulb: new THREE.MeshStandardMaterial({ color: 0xfff3d6, emissive: 0xffb347, emissiveIntensity: 3 }),
  };

  const truck = new THREE.Group(); // translation + miroir de direction
  const body = new THREE.Group(); // suspendu : tangage et roulis
  truck.add(body);

  const box = (w: number, h: number, d: number, mat: THREE.Material, x: number, y: number, z: number, parent: THREE.Object3D = body) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    parent.add(mesh);
    return mesh;
  };
  const cyl = (r: number, h: number, mat: THREE.Material, x: number, y: number, z: number, seg = 16, parent: THREE.Object3D = body) => {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, seg), mat);
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    parent.add(mesh);
    return mesh;
  };

  // Caisse basse ambrée, nervurée comme un HY
  box(4.05, 0.85, 1.9, m.amber, -0.025, 0.825, 0);
  for (let x = -1.9; x <= 0.7; x += 0.29) box(0.05, 0.6, 1.95, m.amber, x, 0.85, 0);
  box(4.1, 0.04, 1.94, m.steel, -0.025, 1.26, 0); // jonc chromé entre les deux teintes

  // Capot, calandre, phares, pare-chocs
  box(0.6, 0.75, 1.8, m.amber, 2.3, 0.775, 0);
  for (let z = -0.5; z <= 0.51; z += 0.125) box(0.03, 0.5, 0.05, m.steel, 2.61, 0.78, z);
  for (const z of [-0.68, 0.68]) cyl(0.12, 0.08, m.lamp, 2.62, 1.0, z, 18).rotation.z = Math.PI / 2;
  box(0.12, 0.12, 1.98, m.steel, 2.68, 0.5, 0);
  box(0.12, 0.12, 1.98, m.steel, -2.1, 0.5, 0);

  // Cabine crème
  box(1.1, 0.95, 1.9, m.cream, 1.45, 1.725, 0);
  box(0.04, 0.62, 1.7, m.glass, 2.02, 1.78, 0).rotation.z = -0.12;
  for (const z of [-0.952, 0.952]) box(0.62, 0.42, 0.02, m.glass, 1.5, 1.85, z);

  // Cellule arrière ouverte côté comptoir : toit, paroi du fond, arrière, montants
  box(4.05, 0.08, 1.9, m.cream, -0.025, 2.16, 0);
  box(2.95, 0.95, 0.04, m.woodDark, -0.575, 1.725, -0.93);
  box(0.04, 0.95, 1.9, m.cream, -2.03, 1.725, 0);
  for (const x of [-1.98, 0.85]) box(0.1, 0.95, 0.06, m.cream, x, 1.725, 0.92);

  // Étagère et bouteilles au fond
  box(2.6, 0.04, 0.25, m.wood, -0.6, 1.72, -0.8);
  for (let i = 0; i < 11; i++) cyl(0.035, 0.22, m.bottle, -1.8 + i * 0.24, 1.85, -0.8, 8);

  // Comptoir en bois brut et 4 tireuses en laiton
  box(2.9, 0.07, 0.55, m.wood, -0.575, 1.3, 1.15);
  for (const x of [-1.8, 0.65]) box(0.06, 0.2, 0.3, m.woodDark, x, 1.16, 1.1);
  box(1.9, 0.025, 0.11, m.steel, -0.85, 1.345, 1.28);
  for (let i = 0; i < 4; i++) {
    const x = -1.6 + i * 0.5;
    cyl(0.03, 0.34, m.brass, x, 1.505, 1.1, 12);
    cyl(0.05, 0.05, m.brass, x, 1.68, 1.1, 12);
    cyl(0.016, 0.13, m.brass, x, 1.63, 1.16, 8).rotation.x = Math.PI / 2;
    const handle = cyl(0.022, 0.2, m.woodDark, x, 1.8, 1.1, 8);
    handle.rotation.x = -0.25;
  }

  // Auvent rayé ambre / crème, articulé au bord du toit
  const awning = new THREE.Group();
  awning.position.set(-0.575, 2.16, 0.95);
  awning.rotation.x = 0.22;
  body.add(awning);
  for (let i = 0; i < 8; i++) box(2.95 / 8, 0.035, 0.95, i % 2 ? m.cream : m.amber, -1.475 + 2.95 / 16 + (i * 2.95) / 8, 0, 0.475, awning);

  // Galerie de toit, fûts inox et caisses en bois
  for (const z of [-0.8, 0.8]) box(3.2, 0.04, 0.04, m.steel, -0.4, 2.3, z);
  for (let x = -1.9; x <= 1.1; x += 0.75) box(0.04, 0.04, 1.64, m.steel, x, 2.3, 0);
  for (const [x, z] of [[-1.6, -0.35], [-1.12, -0.35], [-1.6, 0.18]]) {
    cyl(0.21, 0.48, m.steel, x, 2.56, z, 20);
    for (const dy of [-0.2, 0.2]) cyl(0.218, 0.03, m.steel, x, 2.56 + dy, z, 20);
  }
  box(0.5, 0.3, 0.42, m.wood, -0.45, 2.47, 0.2);
  box(0.5, 0.3, 0.42, m.wood, -0.45, 2.47, -0.3);
  box(0.5, 0.3, 0.42, m.wood, -0.45, 2.77, -0.05).rotation.y = 0.15;

  // Guirlandes guinguette : une sur le toit, une au bord de l'auvent
  const bulbs: THREE.Vector3[] = [];
  const wireMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.6 });
  const strand = (a: THREE.Vector3, b: THREE.Vector3, sag: number, count: number) => {
    const pts = Array.from({ length: 12 }, (_, i) => {
      const t = i / 11;
      return new THREE.Vector3().lerpVectors(a, b, t).add(new THREE.Vector3(0, -sag * 4 * t * (1 - t), 0));
    });
    const curve = new THREE.CatmullRomCurve3(pts);
    body.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 40, 0.008, 4), wireMat));
    for (let i = 1; i < count; i++) bulbs.push(curve.getPoint(i / count).add(new THREE.Vector3(0, -0.05, 0)));
  };
  for (const x of [-1.95, 0.8]) box(0.03, 0.55, 0.03, m.steel, x, 2.45, 0.85);
  strand(new THREE.Vector3(-1.95, 2.72, 0.85), new THREE.Vector3(0.8, 2.72, 0.85), 0.16, 10);
  const edgeZ = 0.95 + 0.95 * Math.cos(0.22);
  const edgeY = 2.16 - 0.95 * Math.sin(0.22);
  strand(new THREE.Vector3(-2.0, edgeY, edgeZ), new THREE.Vector3(0.85, edgeY, edgeZ), 0.2, 11);
  const bulbMesh = new THREE.InstancedMesh(new THREE.SphereGeometry(0.045, 10, 8), m.bulb, bulbs.length);
  bulbs.forEach((p, i) => bulbMesh.setMatrixAt(i, new THREE.Matrix4().makeTranslation(p.x, p.y, p.z)));
  body.add(bulbMesh);
  const glow = new THREE.PointLight(0xffb45c, 3, 4, 2);
  glow.position.set(-0.6, 1.9, 1.5);
  body.add(glow);

  // Pot d'échappement (côté visible)
  cyl(0.045, 0.3, m.steel, -2.18, 0.42, 0.6, 8).rotation.z = Math.PI / 2;
  const exhaust = new THREE.Object3D();
  exhaust.position.set(-2.35, 0.42, 0.6);
  body.add(exhaust);

  // Roues (hors de la caisse suspendue : elles restent au sol)
  const wheels: THREE.Object3D[] = [];
  for (const x of [1.75, -1.45]) {
    for (const z of [-0.86, 0.86]) {
      const w = new THREE.Group();
      w.position.set(x, WHEEL_R, z);
      const tire = cyl(WHEEL_R, 0.26, m.tire, 0, 0, 0, 22, w);
      tire.rotation.x = Math.PI / 2;
      cyl(0.22, 0.27, m.cream, 0, 0, 0, 18, w).rotation.x = Math.PI / 2;
      cyl(0.08, 0.28, m.steel, 0, 0, 0, 12, w).rotation.x = Math.PI / 2;
      box(0.05, 0.3, 0.275, m.steel, 0, 0.05, 0, w); // repère : rend la rotation lisible
      truck.add(w);
      wheels.push(w);
    }
  }

  return { truck, body, wheels, exhaust, bulbMat: m.bulb };
}

export function start(canvas: HTMLCanvasElement, { reduced }: { reduced: boolean }) {
  const coarse = matchMedia('(pointer: coarse)').matches;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, coarse ? 1.25 : 1.75));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.35;
  scene.fog = new THREE.Fog(0x121310, 26, 60);

  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 120);

  // Heure dorée : ciel chaud, soleil rasant orangé, ombres douces
  scene.add(new THREE.HemisphereLight(0xffc98a, 0x1a120a, 0.55));
  const sun = new THREE.DirectionalLight(0xff9a45, 3.4);
  sun.position.set(-10, 4.5, 8);
  sun.castShadow = true;
  sun.shadow.mapSize.setScalar(coarse ? 512 : 1024);
  Object.assign(sun.shadow.camera, { left: -26, right: 26, top: 8, bottom: -8, near: 1, far: 50 });
  sun.shadow.radius = 4;
  sun.shadow.bias = -0.0005;
  scene.add(sun);
  const rim = new THREE.DirectionalLight(0xffe2b8, 0.6);
  rim.position.set(8, 4, -6);
  scene.add(rim);

  // Route pavée et bordures
  const paving = { dark: cobbles(false), light: cobbles(true) };
  const roadMat = new THREE.MeshStandardMaterial({ map: paving.dark, alphaMap: horizonFade(), transparent: true, roughness: 0.92 });
  const road = new THREE.Mesh(new THREE.PlaneGeometry(90, 26), roadMat);
  road.rotation.x = -Math.PI / 2;
  road.position.z = 5;
  road.receiveShadow = true;
  scene.add(road);
  const curbMat = new THREE.MeshStandardMaterial({ color: 0x6b6258, roughness: 0.8 });
  const curb = new THREE.Mesh(new THREE.BoxGeometry(90, 0.12, 0.25), curbMat); // bordure côté spectateur
  curb.position.set(0, 0.06, 3.1);
  curb.receiveShadow = true;
  scene.add(curb);

  const { truck, body, wheels, exhaust, bulbMat } = buildTruck();
  scene.add(truck);

  // Fumée d'échappement : petit pool de sprites recyclés
  const dot = softDot();
  const puffs = Array.from({ length: 18 }, () => {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: dot, color: 0xd8cbb4, transparent: true, depthWrite: false, opacity: 0 }));
    scene.add(s);
    return { s, age: 99, vel: new THREE.Vector3() };
  });
  let puffTimer = 0;

  // Bulles de bière qui flottent discrètement dans la scène
  const BUBBLES = 70;
  const rnd = seeded(3);
  const bubblePos = new Float32Array(BUBBLES * 3);
  const bubbleSpeed = new Float32Array(BUBBLES);
  for (let i = 0; i < BUBBLES; i++) {
    bubblePos.set([(rnd() - 0.5) * 26, rnd() * 6, (rnd() - 0.5) * 5], i * 3);
    bubbleSpeed[i] = 0.2 + rnd() * 0.45;
  }
  const bubbleGeo = new THREE.BufferGeometry();
  bubbleGeo.setAttribute('position', new THREE.BufferAttribute(bubblePos, 3));
  scene.add(new THREE.Points(bubbleGeo, new THREE.PointsMaterial({ size: 0.09, map: dot, color: 0xffd68a, transparent: true, opacity: 0.6, depthWrite: false })));

  // Cadrage : la caméra recule sur écran étroit pour garder le camion entier
  let range = 12;
  let camZ = 14;
  const resize = () => {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camZ = Math.min(46, 22 * Math.max(1, 1.5 / camera.aspect) ** 0.85);
    camera.setViewOffset(w, h, 0, -h * 0.3, w, h);
    const fog = scene.fog as THREE.Fog;
    fog.near = camZ + 6;
    fog.far = camZ + 40;
    const halfW = camZ * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.aspect;
    range = halfW + 4;
    camera.updateProjectionMatrix();
  };

  // Le fond de la page sert de brouillard : la route se fond dans le site, en clair comme en sombre
  const syncTheme = () => {
    (scene.fog as THREE.Fog).color.setStyle(getComputedStyle(document.body).backgroundColor);
    roadMat.map = matchMedia('(prefers-color-scheme: dark)').matches ? paving.dark : paving.light;
    curbMat.color.set(roadMat.map === paving.dark ? 0x4a433b : 0xc9bfae);
  };

  const pointer = new THREE.Vector2();
  addEventListener('pointermove', (e) => pointer.set((e.clientX / innerWidth) * 2 - 1, (e.clientY / innerHeight) * 2 - 1), { passive: true });

  let x = -8;
  let dir = 1;
  let speed = 3;
  let lastSpeed = 3;
  let pitch = 0;
  let lastScroll = scrollY;
  let t = 0;
  const clock = new THREE.Clock();
  const tmp = new THREE.Vector3();

  const place = () => {
    truck.position.set(x, 0, dir > 0 ? 0.9 : -0.9);
    truck.scale.x = dir; // miroir : le comptoir reste toujours face à la caméra
  };

  const frame = () => {
    const dt = Math.min(clock.getDelta(), 1 / 20);
    t += dt;

    // Le défilement vers le bas accélère le camion, vers le haut le ralentit
    const scrollVel = (scrollY - lastScroll) / dt;
    lastScroll = scrollY;
    const target = THREE.MathUtils.clamp(3 + scrollVel * 0.006, 1.2, 9);
    speed += (target - speed) * (1 - Math.exp(-dt * 2.5));
    const accel = (speed - lastSpeed) / dt;
    lastSpeed = speed;

    x += dir * speed * dt;
    if (Math.abs(x) > range) {
      x = Math.sign(x) * range;
      dir = -dir; // demi-tour hors champ, sur l'autre voie
    }
    place();

    for (const w of wheels) w.rotation.z -= (speed * dt) / WHEEL_R;

    // Suspensions : rebond de la chaussée + cabrage à l'accélération
    pitch += (THREE.MathUtils.clamp(accel * 0.02, -0.05, 0.05) - pitch) * (1 - Math.exp(-dt * 4));
    body.position.y = Math.sin(t * 11) * 0.012 + Math.sin(t * 4.3) * 0.008;
    body.rotation.z = pitch + Math.sin(t * 6) * 0.004;
    body.rotation.x = Math.sin(t * 3.1) * 0.006;
    bulbMat.emissiveIntensity = 2.8 + Math.sin(t * 2.2) * 0.25;

    puffTimer += dt;
    if (puffTimer > 0.14) {
      puffTimer = 0;
      const p = puffs.find((q) => q.age > 1.6);
      if (p) {
        exhaust.getWorldPosition(p.s.position);
        p.vel.set(-dir * (0.3 + Math.random() * 0.3), 0.45 + Math.random() * 0.3, (Math.random() - 0.5) * 0.3);
        p.age = 0;
      }
    }
    for (const p of puffs) {
      if (p.age > 1.6) continue;
      p.age += dt;
      p.s.position.addScaledVector(p.vel, dt);
      p.s.scale.setScalar(0.15 + p.age * 0.45);
      p.s.material.opacity = 0.3 * (1 - p.age / 1.6);
    }

    for (let i = 0; i < BUBBLES; i++) {
      const y = bubblePos[i * 3 + 1] + bubbleSpeed[i] * dt;
      bubblePos[i * 3 + 1] = y > 6 ? 0 : y;
      bubblePos[i * 3] += Math.sin(t * 1.3 + i) * 0.002;
    }
    bubbleGeo.attributes.position.needsUpdate = true;

    // Parallaxe douce au pointeur
    camera.position.x += (pointer.x * 1.2 - camera.position.x) * (1 - Math.exp(-dt * 2));
    camera.position.y += (4 - pointer.y * 0.6 - camera.position.y) * (1 - Math.exp(-dt * 2));
    camera.position.z = camZ;
    camera.lookAt(tmp.set(camera.position.x * 0.3, 1.6, 0));

    renderer.render(scene, camera);
  };

  const still = () => {
    x = -(range - 4) * 0.08; // garé dans l'espace libre entre le texte et la photo du hero
    dir = -1;
    place();
    camera.position.set(0, 4, camZ);
    camera.lookAt(0, 1.6, 0);
    renderer.render(scene, camera);
  };

  // Pause : onglet caché, bouton pause du site, ou mouvement réduit (une seule image fixe)
  const sync = () => {
    const run = !reduced && !document.hidden && !document.documentElement.classList.contains('still');
    if (run) clock.getDelta(); // évite un saut après la pause
    renderer.setAnimationLoop(run ? frame : null);
  };

  syncTheme();
  resize();
  new ResizeObserver(() => {
    resize();
    if (reduced) still();
  }).observe(canvas);
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    syncTheme();
    if (reduced) still();
  });
  document.addEventListener('visibilitychange', sync);
  new MutationObserver(sync).observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

  camera.position.set(0, 4, camZ);
  if (reduced) still();
  sync();
}
