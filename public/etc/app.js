import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import { gsap } from "https://cdn.skypack.dev/gsap";
import { CSSPlugin } from "https://cdn.skypack.dev/gsap/CSSPlugin";

gsap.registerPlugin(CSSPlugin);


const camera = new THREE.PerspectiveCamera(
    15,
    window.innerWidth / window.innerHeight,
    0.1,
    100
);
camera.position.z = 13;

const sections = document.querySelectorAll('.section');
const scene = new THREE.Scene();
let robot;
let cube;
let phone;
let mixer;
let mixer2;
let mixer3
const loader = new GLTFLoader();
loader.load('/etc/robot.glb',
    function (gltf) {
        robot = gltf.scene;
        scene.add(robot);
        robot.traverse((child) => {
            if (child.isMesh && child.material) {
                child.material.transparent = true;
                child.material.opacity = 1
            }
        });
        
        mixer = new THREE.AnimationMixer(robot);
        mixer.clipAction(gltf.animations[0]).play();

        const initialPosition = arrPositionModel.find(item => item.id === 'home');
        if (initialPosition) {
            robot.position.set(initialPosition.position.x, initialPosition.position.y, initialPosition.position.z);
            robot.rotation.set(initialPosition.rotation.x, initialPosition.rotation.y, initialPosition.rotation.z);
        }

        gsap.to(robot.scale, {
            x: 0.8,
            y: 0.8,
            z: 0.8,
            duration: 0, 
        });
    },
    function (xhr) {},
    function (error) {}
);

const loader2 = new GLTFLoader();
loader2.load('/etc/cube.glb',
    function (gltf) {
        cube = gltf.scene;
        scene.add(cube);
        cube.traverse((child) => {
            if (child.isMesh && child.material) {
                child.material.transparent = true;
                child.material.opacity = 0.5;
            }
        });
        
        mixer2 = new THREE.AnimationMixer(cube);

        if (!cube) return;
        cube.position.set(2, 0.9, 0.5);
        cube.rotation.set(0.35, 0, 0.2);

    },
    function (xhr) {},
    function (error) {}
);

const loader3 = new GLTFLoader();
loader3.load('/etc/phone.glb',
    function (gltf) {
        phone = gltf.scene;
        scene.add(phone);
        phone.traverse((child) => {
            if (child.isMesh && child.material) {
                child.material.transparent = true;
                child.material.opacity = 0.5;
            }
        });
        
        mixer3 = new THREE.AnimationMixer(phone);

        if (!phone) return;
        phone.position.set(-3, -1.5, 0);
        phone.rotation.set(0.0, 0.5, 0.0);

    },
    function (xhr) {},
    function (error) {}
);

const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container3D').appendChild(renderer.domElement);

// light
const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
scene.add(ambientLight);

const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(500, 500, 500);
scene.add(topLight);

document.addEventListener("setGradient", (event) => {
    const { previousColor, newColor } = event.detail;

    if (robot) {
        robot.traverse((child) => {
            if (child.isMesh && child.material) {
                const colorHex = child.material.color.getHexString();

                if (colorHex === previousColor.replace("#", "") || colorHex == "0021cb") {  
                    child.material.color.set(newColor);
                }
            }
        });
    }
    
    if (cube) {
        cube.traverse((child) => {
            if (child.isMesh && child.material) {
                const colorHex = child.material.color.getHexString();
                if (colorHex === previousColor.replace("#", "") || colorHex == "cccccc") {  
                    child.material.color.set(newColor);
                }
            }
        });
    }

});

let speechBubble = document.createElement("div");
speechBubble.className = "robot-speech";
speechBubble.style.display = "none";    
document.body.appendChild(speechBubble);

let currentTypingProcess = null;

document.addEventListener("setSpeechText", (event) => {
    const { text, text2 } = event.detail; 
    console.log("text", text);

    if (!text) return; 

    if (currentTypingProcess) {
        clearTimeout(currentTypingProcess);
        currentTypingProcess = null;
    }

    speechBubble.style.display = "block";
    speechBubble.innerHTML = "";

    let span = document.createElement("span");
    speechBubble.appendChild(span);

    let index = 0;

    function typeWriter() {
        if (index < text.length) {
            span.textContent += text.charAt(index);
            index++;
            currentTypingProcess = setTimeout(typeWriter, 25);
        } else {
            currentTypingProcess = setTimeout(deleteText, 1000);
        }
    }

    function deleteText() {
        if (span.textContent.length > 0) {
            span.textContent = span.textContent.slice(0, -1);
            currentTypingProcess = setTimeout(deleteText, 25); 
        } else {
            if (text2) {
                currentTypingProcess = setTimeout(() => {
                    typeSecondText();
                }, 500);
            } else {
                speechBubble.style.display = "none";
                currentTypingProcess = null;
            }
        }
    }

    function typeSecondText() {
        let secondIndex = 0;
        function typeWriterSecond() {
            if (secondIndex < text2.length) {
                span.textContent += text2.charAt(secondIndex);
                secondIndex++;
                currentTypingProcess = setTimeout(typeWriterSecond, 25); 
            } else {
                currentTypingProcess = setTimeout(deleteTextSecond, 1000); 
            }
        }

        function deleteTextSecond() {
            if (span.textContent.length > 0) {
                span.textContent = span.textContent.slice(0, -1);
                currentTypingProcess = setTimeout(deleteTextSecond, 25); 
            } else {
                speechBubble.style.display = "none"; 
                currentTypingProcess = null;
            }
        }

        typeWriterSecond(); 
    }

    typeWriter(); 
});
document.body.appendChild(speechBubble);

const updateSpeechBubblePosition = () => {
    if (robot) {
        let robotPosition = robot.position.clone();
        
        const vector = robotPosition.project(camera);  
        
        const width = window.innerWidth;
        const height = window.innerHeight;
        const x = (vector.x * 0.5 + 0.5) * width;
        const y = (-vector.y * 0.5 + 0.5) * height;
        
        speechBubble.style.left = `${x + 50}px`;
        speechBubble.style.top = `${y - 50}px`;  
    }
};

let arrPositionModel = [
    {
        id: 'home',
        position: { x: 0, y: -1.5, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
    },
    {
        id: 'about',
        position: { x: -3, y: -0.5, z: 0 },
        rotation: { x: 0, y: 1, z: 0 },
    },
    {
        id: 'contact',
        position: { x: -3, y: 0, z: 0 },
        rotation: { x: 0, y: 1, z: 0 },
    },
];

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
})

const updateRobotPosition = () => {
    let currentSection;
    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 3) {
            currentSection = section.id;
        }
    });

    let position_active = arrPositionModel.findIndex(
        (val) => val.id == currentSection
    );

    if (position_active >= 0 && currentSection !='home') {
        let new_coordinates = arrPositionModel[position_active];

        gsap.to(robot.scale, {
            x: 0.8,
            y: 0.8,
            z: 0.8,
            duration: 1,
            ease: "power2.out",
        });

        gsap.to(robot.position, {
            x: new_coordinates.position.x,
            y: new_coordinates.position.y,
            z: new_coordinates.position.z,
            duration: 3,
            ease: "power1.out"
        });
        gsap.to(robot.rotation, {
            x: new_coordinates.rotation.x,
            y: new_coordinates.rotation.y,
            z: new_coordinates.rotation.z,
            duration: 3,
            ease: "power1.out"
        })

        
        return;
    }
};

document.addEventListener("mousemove", (event) => {
    if (!robot) return;

    let mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    let mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

    let targetRotationX = -mouseY * 0.5;
    let targetRotationY = mouseX * 1;

    gsap.to(robot.rotation, {
        x: targetRotationX,
        y: targetRotationY,
        duration: 1,
        ease: "power2.out"
    });

    let currentSection;
    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 3) {
            currentSection = section.id;
        }
    });

    if (currentSection === 'home') {
        gsap.to(robot.position, {
            x: mouseX * 3,
            y: mouseY * 1,
            duration: 1,
            ease: "power2.out",
        });

        gsap.to(robot.scale, {
            x: 0.5,
            y: 0.5,
            z: 0.5,
            duration: 1,
            ease: "power2.out",
        });
    }

    if (currentSection === 'home') {
        gsap.to(cube.scale, { x: 0.3, y: 0.3, z: 0.3, duration: 1, ease: "power2.out" });
    } else {
        gsap.to(cube.scale, { x: 0, y: 0, z: 0, duration: 1, ease: "power2.out" });
    }
});


const updateCubePosition = () => {
    if (!cube) return;

    let currentSection;
    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 3) {
            currentSection = section.id;
        }
    });

    gsap.to(cube.scale, { x: currentSection === 'home' ? 0.3 : 0, y: currentSection === 'home' ? 0.3 : 0, z: currentSection === 'home' ? 0.3 : 0, duration: 2, ease: "power2.out" });


    if (currentSection !== 'home') {
        gsap.to(cube.scale, { 
            x: 0, 
            y: 0, 
            z: 0, 
            duration: 2, 
            ease: "power2.out" 
        });
    
        gsap.to(cube.rotation, {
            y: "+=6.28319", 
            duration: 5, 
            ease: "power2.out"
        });
    } else {
        gsap.killTweensOf(cube.rotation);

        gsap.to(cube.rotation, {
            y: "+=6.28319",
            duration: 20,
            repeat: -1,
            ease: "linear",
        });

        if (cube.material) {
            cube.material.transparent = true; 
            gsap.to(cube.material, { opacity: 1, duration: 1, ease: "power2.out" });
        }
    }
};

let isMouseOverCube = false;
let lastMouseX = 0;
let lastMouseY = 0;

const onMouseMove = (event) => {
    if (!cube) return;
    if (!isMouseOverCube) return;

    const deltaX = event.clientX - lastMouseX;
    const deltaY = event.clientY - lastMouseY;
    lastMouseX = event.clientX;
    lastMouseY = event.clientY;

    gsap.to(cube.rotation, {
        y: `+=${deltaX * 0.6}`, 
        x: `+=${deltaY * 0.6}`,
        duration: 0.4,
        ease: "power2.out",
    });
};

const onMouseEnter = () => {
    isMouseOverCube = true;
};

const onMouseLeave = () => {
    isMouseOverCube = false;
};

window.addEventListener("mousemove", onMouseMove);

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener("mousemove", (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    
    const intersects = raycaster.intersectObject(cube, true);

    if (intersects.length > 0) {
        if (!isMouseOverCube) {
            onMouseEnter();
        }
    } else {
        onMouseLeave();
    }
});


const onMouseClickPhone = (event) => {
  if (!phone) return;

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObject(phone, true);

  if (intersects.length > 0) {
    setTimeout(() => {
        const contactSection = document.getElementById("contact");
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 1000);
      
    document.addEventListener("setGradient", (event) => {
      const { previousColor, newColor } = event.detail;
      intersects[0].object.material.color.set(previousColor);
   
    });
  }
};


let lastHoveredTime = 0; 
const delay = 5000;

const onMouseMovePhone = (event) => {
  if (!phone) return;

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObject(phone, true);

  const currentTime = Date.now();

  if (intersects.length > 0) {
    document.body.style.cursor = 'url("/mouse/mousePointer.svg"), pointer';
    if (currentTime - lastHoveredTime > delay) {

      document.dispatchEvent(
        new CustomEvent("setSpeechText", {
          detail: {
            text: "Hmmm, there's a telephone box over there..",
            text2: "I wonder, what's its use?",
          },
        })
      );

      lastHoveredTime = currentTime; 
    }
  } else {
    document.body.style.cursor = 'url("/mouse/mouse.svg"), pointer';
  }
};
  
window.addEventListener('mousemove', onMouseMovePhone, false);
window.addEventListener("click", onMouseClickPhone, false);

const updatePhonePosition = () => {
    if (!phone) return;

    let currentSection;
    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 3) {
            currentSection = section.id;
        }
    });

    gsap.to(phone.scale, { 
        x: currentSection === 'home' ? 0.9 : 0, 
        y: currentSection === 'home' ? 0.9 : 0, 
        z: currentSection === 'home' ? 0.9 : 0, 
        duration: 2, 
        ease: "power2.out" 
    });
    


    if (currentSection !== 'home') {
        gsap.to(phone.scale, { 
            x: 0, 
            y: 0, 
            z: 0, 
            duration: 2, 
            ease: "power2.out" 
        });
   
    } else {
        if (phone.material) {
            phone.material.transparent = true; 
            gsap.to(phone.material, { opacity: 1, duration: 1, ease: "power2.out" });
        }
    }
};

const reRender3D = () => {
    requestAnimationFrame(reRender3D);
    renderer.render(scene, camera);
    if (mixer) mixer.update(0.02);
    if (mixer2) mixer2.update(0.02);
    if (mixer3) mixer3.update(0.02);

    updateSpeechBubblePosition();  
    updateRobotPosition();
    updateCubePosition();
    updatePhonePosition();
};

reRender3D();