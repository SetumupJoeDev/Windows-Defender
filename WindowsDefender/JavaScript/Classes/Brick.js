function Brick(geometry, material, health) {
    Cube.call(this, geometry, material);

    //Geometries, Materials and Meshes\\
    var m_brickMesh = new THREE.Mesh(geometry, material);
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\\

    //Integers\\
    var m_iHealth = health;
    //~~~~~~~~~\\

    this.getMesh = function () { return m_brickMesh; }

    this.LoseHealth = function () {
        //If the brick is currently on 1 health, it is moved out of the play area
        if (m_iHealth == 1) {
            m_brickMesh.position.y = 100;
            m_iBricksRemaining--;
            m_iScore += 10;
            m_dropManager.GenerateDrop();
        }
        //Otherwise, its health is reduced by one
        else {
            m_iHealth--;
            m_iScore += 10;
        }
    }

    this.Draw = function (posX, posY) {
        //Draws the brick on the screen and positions it using the X and Y positions passed through by the brick constructor
        m_scene.add(m_brickMesh);
        m_brickMesh.position.set(posX, posY, 0);
    }
}