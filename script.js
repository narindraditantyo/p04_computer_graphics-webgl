import * as THREE from './three.js/build/three.module.js'

let scene, camera, renderer
const meshes = []

function init() {
    scene = new THREE.Scene()

    camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 0.1, 1000)

    renderer = new THREE.WebGLRenderer({
        antialias: true,
    })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFShadowMap

    document.body.appendChild(renderer.domElement)

    camera.position.z = 45

    generateMeshes()
    generateLight()
}

function generateMeshes() {
    let geometry, material, mesh
    
    // Box
    geometry = new THREE.BoxGeometry(2, 2, 2)
    material = new THREE.MeshPhongMaterial({
        color: 0xffB71C1C
    })
    mesh = new THREE.Mesh(geometry, material)
    mesh.position.x = -4
    scene.add(mesh)
    meshes.push(mesh)

    // Sphere
    geometry = new THREE.SphereGeometry(1, 32, 32)
    material = new THREE.MeshPhongMaterial({
        color: 0xff0D47A1
    })
    mesh = new THREE.Mesh(geometry, material)
    mesh.position.x = 0
    scene.add(mesh)
    meshes.push(mesh)

    // Pyramid
    geometry = new THREE.CylinderGeometry(1, 1, 4, 32)
    material = new THREE.MeshPhongMaterial({
        color: 0xff1B5E20
    })
    mesh = new THREE.Mesh(geometry, material)
    mesh.position.x = 4
    scene.add(mesh)
    meshes.push(mesh)

    geometry = new THREE.PlaneGeometry(100, 100)
    material = new THREE.MeshPhongMaterial()
    mesh = new THREE.Mesh(geometry, material)
    mesh.receiveShadow = true
    scene.add(mesh)
}

function generateLight() {
    let light

    light = new THREE.AmbientLight(0xffFFFFFF, 0.5)
    scene.add(light)

    light = new THREE.PointLight(0xffFFFFFF, 1)
    light.position.x = 15
    light.position.y = 15
    light.position.z = 15
    scene.add(light)

    // light = new THREE.SpotLight(0xffFFFFFF, 2)
    // light.angle = 25
    // light.position.y = 45
    // light.penumbra = 1
    // light.shadow.mapSize.width = 1024
    // light.shadow.mapSize.height = 1024
    // light.castShadow = true
    // scene.add(light)
}

function animate() {
    renderer.render(scene, camera)

    meshes.forEach(mesh => {
        mesh.rotation.x += 0.025,
        mesh.rotation.y += 0.025,
        mesh.rotation.z += 0.025
    })

    requestAnimationFrame(animate)
}

init()
requestAnimationFrame(animate)