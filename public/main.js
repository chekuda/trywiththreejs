var raycaster = new THREE.Raycaster()
var mouse = new THREE.Vector2()

function onMouseMove(event) {
  // calculate mouse position in normaizxed device coordinates
  // (-1 to +1) for both components

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  mouse.y = (event.clientY / window.innerHeight) * 2 + 1
}

// Create Scene
var scene = new THREE.Scene()
scene.background = new THREE.Color(0xFF0000)

// add camera
// THREE.perspectiveCamera(fov, aspect, near, far)
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth/window.innerHeight,
  0.1,
  1000
)

// Add a renderer
var renderer = new THREE.WebGLRenderer({ alpha: true })
renderer.setSize( window.innerWidth, window.innerHeight )
document.body.appendChild(renderer.domElement)

var controls = new THREE.OrbitControls( camera, renderer.domElement );

//Cube example
var geometry = new THREE.BoxGeometry(20, 20, 20)
var material = new THREE.MeshLambertMaterial({ color: 0xfd59d7 })
var cube = new THREE.Mesh(geometry, material)

// scene.add(cube)

//place the camera at z
camera.position.z = 10

//add the light
var light = new THREE.PointLight(0x0000FF)
//position of the light
light.position.set(0, 10, 50)
scene.add(light)

const loader = new THREE.ColladaLoader()

loader.load("public/mesh5.dae", function(result){
  result.scene.position.z = 1
  window.collada = result.scene
  scene.add(result.scene)
})

var render = function() {
  requestAnimationFrame(render)
  raycaster.setFromCamera( mouse, camera )
  var intersects = raycaster.intersectObjects( scene.children )
  for ( var i = 0; i < intersects.length; i++ ) {

		intersects[ i ].object.material.color.set( 0xff0000 );

	}
  controls.update();
  renderer.render(scene, camera)
}
window.addEventListener('mousemove', onMouseMove, false )
render()


// var render = function() {
//   console.log(raycaster)
//   // update the picking ray with the camera and mouse position
//   raycaster.setFromCamera( mouse, camera )

//   var intersects = raycaster.intersectObjects( scene.children )
//   for ( var i = 0; i < intersects.length; i++ ) {

// 		intersects[ i ].object.material.color.set( 0xff0000 );

// 	}
//   controls.update();
//   renderer.render(scene, camera)
// }

// window.addEventListener('mousemove', onMouseMove, false )
// requestAnimationFrame(render)
// // render()
