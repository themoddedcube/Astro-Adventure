import * as THREE from "three ";
import experience from "../experience.js";
import GSAP from "gsap";
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';

export default class Room{
     constructor(){
        this.experience = new experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;

        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1,
        };

        this.setModel();
        this.setAnimation();
        this.onMouseMove();
    }

    setModel(){
        const width = .7;
        const height = 1;
        const intensity = 3;
        const rectLight = new THREE.RectAreaLight( 0xffffff, intensity,  width, height );
        rectLight.position.set(30.74153, 8, 2);
        rectLight.rotation.x = -Math.PI / 2;
        rectLight.rotation.z = Math.PI/4.5;
        this.actualRoom.add( rectLight );    

        // const rectLightHelper = new RectAreaLightHelper( rectLight );
        // rectLight.add( rectLightHelper );
        // console.log(this.room);

        this.scene.add(this.actualRoom);
        this.actualRoom.position.set(-3, 0, .5)
        this.actualRoom.scale.set(0.11, 0.11, 0.11);
    }

    
    setAnimation(){
        this.mixer = new THREE.AnimationMixer(this.actualRoom);
        console.log('wo')
    }

    onMouseMove(){
        window.addEventListener("mousemove", (e) => {
            this.rotation = ((e.clientX-window.innerWidth/2)*2)/window.innerWidth;
            this.lerp.target = this.rotation*.1;

        });
    }

    resize() {

    }

    update() {
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );

        this.actualRoom.rotation.y = this.lerp.current;

        this.mixer.update(this.time.delta * .0009);
    }
}