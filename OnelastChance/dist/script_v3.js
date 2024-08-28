import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
//import Delaunator from 'https://unpkg.com/delaunator@latest/dist/delaunator.esm.js';

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, 1, 1, 1000);
camera.position.setScalar(150);

var renderer = new THREE.WebGLRenderer({
  antialias: true
});

var canvas = renderer.domElement;
document.body.appendChild(canvas);

var controls = new OrbitControls(camera, canvas);

var light = new THREE.DirectionalLight(0xffffff, 1.5);
light.position.setScalar(100);
scene.add(light);
scene.add(new THREE.AmbientLight(0xffffff, 0.5));

var gridTest = [
  260,430,3,
  270,440,3,
  280,280,3,
  280,290,3,
  280,450,3,
  290,270,3,
  290,450,3,
  300,260,3,
  320,230,3,
  320,460,3,
  330,230,3,
  330,460,3,
  340,220,3,
  340,460,3,
  360,230,3,
  370,450,3,
  380,240,3,
  380,450,3,
  390,440,3,
  390,450,3,
  400,250,3,
  400,440,3,
  410,420,3,
  420,260,3,
  420,420,3,
  430,410,3,
  440,280,3,
  440,400,3,
  450,300,3,
  460,320,3,
  470,340,3,
  470,370,3,
  470,380,3,
  480,360,3,
  240,340,14,
  240,360,14,
  240,370,14,
  240,380,14,
  250,320,14,
  250,330,14,
  250,410,14,
  250,420,14,
  260,300,14,
  260,430,14,
  270,290,14,
  270,440,14,
  280,450,14,
  290,450,14,
  300,260,14,
  310,250,14,
  320,230,14,
  320,240,14,
  320,460,14,
  330,230,14,
  330,460,14,
  340,230,14,
  340,460,14,
  360,230,14,
  360,460,14,
  370,450,14,
  380,240,14,
  380,450,14,
  400,250,14,
  400,440,14,
  410,430,14,
  420,260,14,
  440,280,14,
  440,400,14,
  450,300,14,
  450,390,14,
  460,320,14,
  460,380,14,
  470,340,14,
  470,360,14,
  470,370,14,
  470,380,14
  // ... (rest of your points)
];

var size = { x: 200, z: 200 };
var points3d = [];

for (var j = 0; j < gridTest.length; j += 3) {
  var xs = gridTest[j];
  var ys = gridTest[j + 1];
  var zs = gridTest[j + 2];
  points3d.push(new THREE.Vector3(xs, ys, zs));
}

var geom = new THREE.BufferGeometry().setFromPoints(points3d);
var cloud = new THREE.Points(
  geom,
  new THREE.PointsMaterial({ color: 0x99ccff, size: 2 })
);
scene.add(cloud);

const zLevels = {};
for (const point of points3d) {
  const z = point.z;
  if (!zLevels[z]) {
    zLevels[z] = 1;
  } else {
    zLevels[z]++;
  }
}

// triangulate x, z
var indexDelaunay = Delaunator.from(
  points3d.map(v => [v.x, v.y, v.z]),
  (point, i) => {
    const zThreshold = 1; // Adjust this threshold as needed
    const avgZ = point.z; // Assuming 'point' is a THREE.Vector3

    // Handle the last point separately
    const nextPoint = points3d[i + 1] || points3d[i];

   // const pointCountDifference = Math.abs(zLevels[point.z] - zLevels[nextPoint.z]);

    return Math.sqrt(point.x ** 2 + point.y ** 2 + point.z ** 2) + avgZ * zThreshold  /*pointCountDifference*/;
  }
);

var meshIndex = []; // delaunay index => three.js index
for (let i = 0; i < indexDelaunay.triangles.length; i++) {
  meshIndex.push(indexDelaunay.triangles[i]);
}

geom.setIndex(meshIndex); // add three.js index to the existing geometry
geom.computeVertexNormals();
var mesh = new THREE.Mesh(
  geom, // re-use the existing geometry
  new THREE.MeshLambertMaterial({ color: "purple", wireframe: true })
);
scene.add(mesh);

var gui = new dat.GUI();
gui.add(mesh.material, "wireframe");

render();

function resize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

function render() {
  if (resize(renderer)) {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
