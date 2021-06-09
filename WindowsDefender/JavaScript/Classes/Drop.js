
function Drop(geometry, material, effect) {
    Cube.call(this, geometry, material);

    //Meshes, Geometries and Materials\\
    var m_dropMesh = new THREE.Mesh(geometry, material);
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\\

    //Getters and Setters\\
    this.getMesh = function () { return m_dropMesh;}
    //~~~~~~~~~~~~~~~~~~~~\\

    var m_strEffect = effect;

    this.Draw = function () {
        //Draws the drop on screen at the point of the collision
        m_scene.add(m_dropMesh);
        m_dropMesh.position.set(m_ball.getMesh().position.x, m_ball.getMesh().position.y, 0);
    }

    this.Collisions = function(){
        var debuffPosY = m_dropMesh.position.y;
        var debuffPosX = m_dropMesh.position.x;
        var paddlePosY = m_paddle.getMesh().position.y;
        var paddlePosX = m_paddle.getMesh().position.x;
        //If the drop collides with the paddle, its effects are activated
        if (debuffPosY <= paddlePosY + 0.35 && debuffPosY >= paddlePosY && (debuffPosX >= paddlePosX - 0.0975 && debuffPosX <= paddlePosX + 0.975)) {
            DropEffect(m_strEffect);
            m_scene.remove(m_dropMesh);
        }
    }

}