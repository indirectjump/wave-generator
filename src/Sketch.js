import React, { Component } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

class Material {

    // Declare your materials here
    static Basic = new THREE.MeshBasicMaterial({ color: 0x00ff00 })

}

class Geometry {

    static Cube = new THREE.BoxGeometry(1, 1, 1)

}

class Scene extends Component {
    constructor(props) {
        super(props)

        this.setup = this.setup.bind(this)
        this.start = this.start.bind(this)
        this.stop = this.stop.bind(this)
        this.animate = this.animate.bind(this)

    }

    async componentDidMount() {

        // Get width and height
        this.width = this.mount.clientWidth
        this.height = this.mount.clientHeight

        // Create new scene
        this.scene = new THREE.Scene()

        // Create new camera
        this.camera = new THREE.OrthographicCamera(
            this.width / -3,
            this.width / 3,
            this.height / 3,
            this.height / -3,
            1, 10)

        this.camera.zoom = 150
        this.camera.position.z = 4

        this.camera.updateProjectionMatrix()

        // Create new light
        var ambientLight = new THREE.AmbientLight(0xffffff, 0.1);

        var directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);

        directionalLight.position.x = 5;
        directionalLight.position.y = 5;
        directionalLight.position.z = -100;
        directionalLight.position.normalize()

        this.scene.add(directionalLight)

        this.scene.add(ambientLight)


        // var helper = new THREE.GridHelper(1000, 20, 0x303030, 0x303030);
        // helper.position.y = - 75;
        // this.scene.add(helper);


        // Create new renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true })

        // Set cam position

        // Set renderer preset
        this.renderer.setClearColor('#ababab')
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setSize(this.width, this.height)

        // Add domElement to HTML
        this.mount.appendChild(this.renderer.domElement)

        // controls

        this.controls = new OrbitControls(this.camera, this.renderer.domElement)

        this.controls.enableDamping = true
        this.controls.dampingFactor = 0.05
        this.controls.screenSpacePanning = true
        this.controls.minDistance = 1
        this.controls.maxDistance = 50
        this.controls.maxPolarAngle = Math.PI / 2
        this.controls.autoRotate = false
        this.controls.autoRotateSpeed = 5

        // Launch the sketch
        this.setup()
        this.start()


    }

    componentWillUnmount() {
        this.stop()
        this.mount.removeChild(this.renderer.domElement)
    }

    start() {

        if (!this.frameId) {
            this.frameId = requestAnimationFrame(this.animate)
        }
    }

    stop() {
        cancelAnimationFrame(this.frameId)
    }

    setup() {
        // Draw here..

        this.cube = new THREE.Mesh (Geometry.Cube, Material.Basic)

        this.scene.add(this.cube)

    }

    animate() {

        // this.cube.rotation.x += 0.1;
        // this.cube.rotation.y += 0.1;


        this.renderScene()
        this.controls.update()
        this.frameId = window.requestAnimationFrame(this.animate)
    }

    renderScene() {
        this.renderer.render(this.scene, this.camera)
    }

    render() {
        return (
            <div
                style={{ width: '400px', height: '400px' }}
                ref={(mount) => { this.mount = mount }}
            />
        )
    }
}

export default Scene