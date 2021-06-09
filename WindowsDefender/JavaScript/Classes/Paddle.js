
function Paddle(geometry, material) {
    Cube.call(this, geometry, material);

    //Integers\\
    var m_iPaddleSpeed = 0.075;
    //~~~~~~~~~\\

    //Geometries, Materials and Meshes\\
    material.map = m_paddleTexture;
    var m_paddleMesh = new THREE.Mesh(geometry, material);
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\\

    //Getters and Setters\\
    this.getSpeed = function () { return m_iPaddleSpeed; }
    this.setSpeed = function (speed) { m_iPaddleSpeed = speed; }

    this.getMesh = function () { return m_paddleMesh; }
    this.setMesh = function (mesh) { m_paddleMesh = mesh; }
    //~~~~~~~~~~~~~~~~~~~~\\

    this.Draw = function () {
        //Draws the paddle on screen at the correct position
        m_scene.add(m_paddleMesh);
        m_paddleMesh.position.y = -6;
    }

    this.MoveLeft = function () {
        //Moves the paddle left 
        m_paddleMesh.position.x -= m_iPaddleSpeed;
    }

    this.MoveRight = function () {
        //Moves the paddle right
        m_paddleMesh.position.x += m_iPaddleSpeed;
    }

}