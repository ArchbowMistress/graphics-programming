console.log("importing these three things was more timeconsuming and sanity sucking than the actual looping stars assignment help");

import * as THREE from "../js/three.module2.js";
  import { TextGeometry } from "../js/TextGeometry.js";
  import { FontLoader } from "../js/FontLoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  10,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
let textMesh = new THREE.Mesh();
let stars, stars2, starGeo;

lighting();
cube();
particles();

function particles() {
  const points = [];

  for (let i = 0; i < 6000; i++) {
    let star = new THREE.Vector3(
      Math.random() * 600 - 300,
      Math.random() * 600 - 300,
      Math.random() * 600 - 300
    );
    points.push(star);
  }

  starGeo = new THREE.BufferGeometry().setFromPoints(points);

  let sprite = new THREE.TextureLoader().load("assets/images/star.png");
  let starMaterial = new THREE.PointsMaterial({
    color: 0xffb6c1,
    size: 0.7,
    map: sprite,
  });
  let starMaterial2 = new THREE.PointsMaterial({
    color: 0xebb434,
    size: 0.7,
    map: sprite,
  });

  stars = new THREE.Points(starGeo, starMaterial);
  scene.add(stars);
  //Add another instance of stars, that starts in a higher position
  stars2 = new THREE.Points(starGeo, starMaterial2);
  scene.add(stars2);
  stars2.position.y = 500;
}

function animateParticles() {
    //star pattern randomization toggle
    starGeo.verticesNeedUpdate = true;


    stars.position.y -= 1;
    stars2.position.y -= 1;

    //Reset the position back on top
    if(stars.position.y < -500)
    {
      stars.position.y = 500;

    }//Both instances of stars take turns
    if (stars2.position.y < -500)
    {
      stars2.position.y = 500;
    }
    // console.log(stars.position.y);
    // console.log(stars2.position.y);
  }

function cube() {
  //my name
  let text = "JHONNA";

  //load funnie font
  const loader = new FontLoader();
  loader.load('./assets/fonts/Playwrite DE SAS_Regular.json', function ( font ) {

	const titleGeometry = new TextGeometry( text, {
    font: font,
    size: 5,
    depth: 3
    } );
  const textMaterial = new THREE.MeshBasicMaterial({color: 0xebb434});
  textMesh = new THREE.Mesh(titleGeometry, textMaterial);
  
  titleGeometry.center();
  scene.add(textMesh);
} );

  camera.position.z = 35;

}

function lighting() {
  const light = new THREE.HemisphereLight(0x780a44, 0x1c3020, 1);
  scene.add(light);

  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(0, 0, 15);
  spotLight.castShadow = true;
  spotLight.shadow.mapSize.width = 1024;
  spotLight.shadow.mapSize.height = 1024;
  spotLight.shadow.camera.near = 500;
  spotLight.shadow.camera.far = 4000;
  spotLight.shadow.camera.fov = 30;
  scene.add(spotLight);
}

function animate() {
  requestAnimationFrame(animate);

  animateParticles();
  
  textMesh.rotation.y += 0.02;
  renderer.render(scene, camera);
}

animate();
