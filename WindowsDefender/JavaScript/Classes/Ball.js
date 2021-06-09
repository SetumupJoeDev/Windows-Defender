
function Ball(geometry, material) {

    //Geometries, Materials and Meshes\\
    var m_ballGeom  = geometry;
    var m_ballMat   = material;
    m_ballMat.map   = m_sphereTexture;
    var m_ballMesh = new THREE.Mesh(m_ballGeom, m_ballMat);
    var paddleMesh = m_paddle.getMesh();
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\\

    //Integers\\
    var m_iSpeedX = 0.075;
    var m_iSpeedY = 0.08;
    var m_iMovementMod;
    var m_iPaddleX = m_paddle.getMesh().position.x;
    var m_iPaddleY = m_paddle.getMesh().position.y;
    var m_iBallX = m_ballMesh.position.x;
    var m_iBallY = m_ballMesh.position.y;
    var m_iTimeSinceBounce = 0;
    //~~~~~~~~~\\

    //Booleans\\
    var m_bInPlay = false;
    var m_bLaunchBall = false;
    //~~~~~~~~~\\

    //Getters and Setters\\
    this.getMesh = function () { return m_ballMesh; }
    this.setMesh = function (mesh) { m_ballMesh = mesh; }

    this.getInPlay = function () { return m_bInPlay; }
    this.setInPlay = function (inPlay) { m_bInPlay = inPlay; }

    this.setSpeedY = function (speed) { m_iSpeedY = speed; }
    this.setSpeedX = function (speed) { m_iSpeedX = speed; }

    this.setLaunchBall = function (launchBall) { m_bLaunchBall = launchBall; }
    //~~~~~~~~~~~~~~~~~~~~\\

    //Raycasting\\
    var m_centerRayCaster = new THREE.Raycaster(new THREE.Vector3(m_iBallX, m_iBallY, 0), new THREE.Vector3(m_iSpeedX, m_iSpeedY, 0), 0, 0.1);
    //~~~~~~~~~~~\\

    this.Draw = function () {
        m_scene.add(m_ballMesh);
    }

    this.IncreaseSpeedX = function () {
        //If the ball is moving right, the speed in the positive X direction is increased
        if (m_iMovementMod % 2 == 0 && m_iSpeedX < 0.009) {
            m_iSpeedX = 0.075 + m_iMovementMod;
        }
        //If the ball is moving left, the speed in the negative X direction is increased
        else if(m_iMovementMod % 2 == 0 && m_iSpeedX > -0.009){
            m_iSpeedX = (0.075 + m_iMovementMod) * -1;
        }
    }

    this.IncreaseSpeedY = function () {
        //If the ball is moving up, the speed in the positive Y is increased
        if (m_iSpeedY > 0 && m_iSpeedY < 0.1) {
            m_iSpeedY += 0.001;
        }
        //If the ball is moving down, the speed in the negative Y is increased
        else if(m_iSpeedY > -0.1){
            m_iSpeedY -= 0.0001;
        }
    }

    this.Movement = function () {
        //Generates a random number between 0 and 1 and divides it by 10 to create a smaller movement modifier
        m_iMovementMod = Math.random() / 5;
        if (m_bLaunchBall) {
            //Determines if the movement modifier is odd or even. If it's even, the ball is fired to the right. If odd, it is fired to the left
            if ((m_iMovementMod * 10) % 2 != 0) {
                m_iMovementMod = m_iMovementMod * -1;
                m_iSpeedX = m_iSpeedX + m_iMovementMod;
            }
            m_bInPlay = true;
            m_bLaunchBall = false;
        }
        if (!m_bInPlay) {
            //If the player has not yet fired the ball from the paddle, the ball sits slightly above the center of the paddle
            m_ballMesh.position.x = paddleMesh.position.x;
            m_ballMesh.position.y = paddleMesh.position.y + 0.5;
        }
        else if(m_bInPlay)
        {
            //If the ball has been fired, it moves along the Y axis according to m_iSpeedY
            m_ballMesh.position.y += m_iSpeedY;
            m_ballMesh.position.x += m_iSpeedX;
            this.IncreaseSpeedY();
        }
    }

    this.CollisionHandler = function () {
        //Increaes the amount of time since the last collision with a brick every update
        m_iTimeSinceBounce += 15;
        //Updates the saved position of the paddle and ball along both the X and Y axis each update
        m_iPaddleX = m_paddle.getMesh().position.x;
        m_iPaddleY = m_paddle.getMesh().position.y;
        m_iBallX = m_ballMesh.position.x;
        m_iBallY = m_ballMesh.position.y;
        //Assigns the brick and mesh array as variables for comparison of meshes on collision
        var brickArray = m_brickConstructor.getBrickArray();
        var meshArray = m_brickConstructor.getMeshArray();
        //Sets the position and direction of the raycasters each update
        m_centerRayCaster.set(new THREE.Vector3(m_iBallX, m_iBallY, 0), new THREE.Vector3(m_iSpeedX, m_iSpeedY, 0));
        //Assigns the array of meshes that the raycaster will use to detect collisions
        var centerCollisions = m_centerRayCaster.intersectObjects(meshArray);

        //If the top of the ball reaches the top of the playspace, it's Y speed is inverted
        if (m_iBallY + 0.075 >= 5.67) {
            m_iSpeedY = m_iSpeedY * -1;
            this.IncreaseSpeedY();
            m_musicManager.PlayEffect();
        }
        //If the sides of the ball hit the sides of the playspace, the ball's X speed is inverted
        if (m_iBallX + 0.075 >= 4.15 || m_iBallX + 0.75 <= -3.25) {
            m_iSpeedX = m_iSpeedX * -1;
            m_musicManager.PlayEffect();
        }
        //If the bottom of the ball hits the top of the paddle, the ball's Y speed is inverted
        if (m_iBallY - 0.075 <= m_iPaddleY + 0.35 && m_iBallY - 0.075 >= m_iPaddleY && (m_iBallX + 0.075 >= m_iPaddleX - 0.975 && m_iBallX - 0.075 <= m_iPaddleX + 0.975)) {
            m_iSpeedY = m_iSpeedY * -1;
            this.IncreaseSpeedY();
            this.IncreaseSpeedX();
            m_musicManager.PlayEffect();
        }
        //If the top of the ball hits the bottom of the paddle, the ball's Y speed is inverted
        if (m_iBallY + 0.075 >= m_iPaddleY + 0.35 && m_iBallY + 0.075 <= m_iPaddleY && (m_iBallX + 0.075 >= m_iPaddleX - 0.975 && m_iBallX - 0.075 <= m_iPaddleX + 0.975)) {
            m_iSpeedY = m_iSpeedY * -1;
            this.IncreaseSpeedY();
            m_musicManager.PlayEffect();
        }
        //If the side of the ball hits the side of the paddle, the ball's X speed is inverted
        if (m_iBallX - 0.075 <= m_iPaddleX + 0.975 && m_iBallX - 0.075 >= m_iPaddleX && (m_iBallY + 0.075 <= m_iPaddleY + 0.35 && m_iBallY - 0.075 >= m_iPaddleY - 0.35)) {
            m_iSpeedX = m_iSpeedX * -1;
            this.IncreaseSpeedX();
            m_musicManager.PlayEffect();
        }
        if (m_iBallX + 0.075 >= m_iPaddleX - 0.975 && m_iBallX + 0.075 <= m_iPaddleX && (m_iBallY + 0.075 <= m_iPaddleY + 0.35 && m_iBallY - 0.075 >= m_iPaddleY - 0.35)) {
            m_iSpeedX = m_iSpeedX * -1;
            this.IncreaseSpeedX();
            m_musicManager.PlayEffect();
        }
        //If the ball falls out of the play area, the ball is out of play, lives is decreased by 1 and the ball's Y speed is inverted
        if (m_iBallY + 0.075 <= -8) {
            m_iLives--;
            if (m_iScore > 89) {
                m_iScore -= 90
            }
            else {
                m_iScore = 0;
            }
            m_iSpeedY = 0.08;
            m_bInPlay = false;
            if (m_iLives == 0) {
                GameOver();
            }
        }
        //If the ball collides with one of the bricks, the brick is sent off-screen and the ball's Y direction is inverted
        if (centerCollisions[0] != undefined) {
            for (i = 0; i < brickArray.length; i++ && m_iTimeSinceBounce > 150) {
                if (brickArray[i].getMesh().id == centerCollisions[0].object.id){
                    brickArray[i].LoseHealth();
                    m_iSpeedY = m_iSpeedY * -1;
                    m_musicManager.PlayEffect();
                    m_iTimeSinceBounce = 0;
                }
            }
        }
    }
}