
//Environment Objects\\
var m_scene;
var m_camera;
var m_renderer;
var m_light;
//~~~~~~~~~~~~~~~~~~~~\\

//Geometries, Materials & Meshes\\
var m_rectGeom;
var m_brickGeom;
var m_ballGeom;
var m_dropGeom;
var m_planeGeom;
var m_backgroundMaterial;
var m_winScreenMaterial;
var m_mainMenuMaterial;
var m_paddleMaterial;
var m_brickMaterialOne;
var m_brickMaterialTwo;
var m_ballMaterial;
var m_dropMaterial;
var m_gameOverMaterial;
var m_playspaceMaterial;
var m_gridMaterial;
var m_scoreScreenMaterial;
var m_playspaceSprite;
var m_gridSprite;
var m_scoreScreenSprite;
var m_gameOverMesh;
var m_mainMenuMesh;
var m_backgroundMesh;
var m_winScreenMesh;
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\\

//Sounds and Music\\
var m_bgMusic;
//~~~~~~~~~~~~~~~~~\\

//Textures\\
var m_paddleTexture;
var m_playspaceTexture;
var m_gridTexture;
var m_sphereTexture;
var m_scoreScreenTexture;
var m_gameOverTexture;
var m_backgroundTexture;
var m_mainMenuTexture;
var m_winScreenTexture;
//~~~~~~~~~\\

//Objects\\
var m_baseCube;
var m_paddle;
var m_ball;
var m_brickConstructor;
var m_musicManager;
var m_dropManager;
//~~~~~~~~\\

//Integers\\
var m_iColorArrayIndex;
var m_iLives;
var m_iRows;
var m_iColumns;
var m_iLevelNumber;
var m_iBricksRemaining;
var m_iScore;
var m_iHighScore;
var m_iTimeInverted;
var m_iTimeSlowed;
var m_iTimeSpedUp ;
//~~~~~~~~~\\

//Vector3s\\
var m_gridSpritePos;
var m_scoreScreenPos;
var m_gameOverScreenPos;
//~~~~~~~~~\\

//Booleans\\
var m_bMoveLeft;
var m_bMoveRight;
var m_bGameOver;
var m_bHasWon;
var m_bSpedUp;
var m_bSlowedDown;
var m_bInverted;
//~~~~~~~~~\\

//HTML Elements\\
var m_scoreText;
var m_highScoreText;
var m_levelNumberText;
var m_livesText;
var m_spedUpText;
var m_slowedDownText;
var m_invertedText;
//~~~~~~~~~~~~~~\\

//Arrays\\
var m_dropArray = [];
//~~~~~~~\\

function Initialise() {
    //Code used in initialisation goes here\\\

    //Assigns scene as a new Scene in the project
    m_scene            = new THREE.Scene();
    //Sets the background colour of the scene
    m_scene.background = new THREE.Color(0x008080);
    //Assigns camera as a new Camera in the project
    m_camera           = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    //Assigns renderer as a new WebGLRenderer in the project
    m_renderer         = new THREE.WebGLRenderer({antialias : true});
    //Assigns light as a new DirectionLight in the project
    m_light            = new THREE.AmbientLight(0xfffffe);
    //Sets the renderer size to be equal to that of the window ignoring scrollbars and toolbars
    m_renderer.setSize(window.innerWidth - 20, window.innerHeight - 20);
    //Attaches the renderer object to the browser window
    document.body.appendChild(m_renderer.domElement);
    //Sets the camera's position to 10 so it can view the scene
    m_camera.position.z = 10;
    //Sets the initial number of lives to 3
    m_iLives = 3;
    //Sets the level to be level 1
    m_iLevelNumber = 0;
    //Sets the number of bricks to be 0
    m_iBricksRemaining = 0;
    //Sets the score to 0
    m_iScore = 0;
    //Sets the high score to 0
    m_iHighScore = 0;
    //Sets the effect timers to 0
    m_iTimeSlowed = 0;
    m_iTimeInverted = 0;
    m_iTimeSpedUp = 0;
    //Sets HasWon to false
    m_bHasWon = false;
    //Creates new Vector3s for the positions of different elements in the scene
    m_gridSpritePos = new THREE.Vector3(0, -5.75, -1);
    m_scoreScreenPos = new THREE.Vector3(-8, 0, 0);
    m_gameOverScreenPos = new THREE.Vector3(0, 50, 2);
    //Assigns the HTML elements to their respective variables
    m_scoreText = document.getElementById("playerScore");
    m_livesText = document.getElementById("playerLives");
    m_levelNumberText = document.getElementById("levelNumber");
    m_highScoreText = document.getElementById("highScore");
    m_invertedText = document.getElementById("inverted");
    m_spedUpText = document.getElementById("spedUp");
    m_slowedDownText = document.getElementById("slowedDown");
    //Hides the text elements as the main menu loads up
    m_scoreText.style.visibility = "hidden";
    m_highScoreText.style.visibility = "hidden";
    m_livesText.style.visibility = "hidden";
    m_levelNumberText.style.visibility = "hidden";
    //Calls the LoadContent function
    LoadContent();
}

function LoadContent() {
    //Code used for loading content goes here\\
    var loader = new THREE.TextureLoader();
    //Loads the textures that will be applied to various materials and sprites in the game
    m_paddleTexture      = loader.load("Textures/PaddleTexture.png");
    m_sphereTexture      = loader.load("Textures/BallTexture.png");
    m_playspaceTexture   = loader.load("Textures/PlayAreaTexture.png");
    m_gridTexture        = loader.load("Textures/BackgroundGrid.png");
    m_scoreScreenTexture = loader.load("Textures/ScoreScreenTexture.png");
    m_gameOverTexture    = loader.load("Textures/GameOverBlueScreen.png");
    m_winScreenTexture   = loader.load("Textures/WinScreen.png");
    m_backgroundTexture  = loader.load("Textures/GameBackground.png");
    m_mainMenuTexture    = loader.load("Textures/MainMenu.png");
    //Creates a new geometry and materials to be used by the bricks and paddle
    m_rectGeom           = new THREE.BoxGeometry(1.95, 0.75, 0.25);
    m_paddleMaterial     = new THREE.MeshBasicMaterial();
    m_brickGeom          = new THREE.BoxGeometry(1, 0.25, 0.25);
    m_brickMaterialOne   = new THREE.MeshBasicMaterial({ color: 0xe7b6dc});
    m_brickMaterialTwo   = new THREE.MeshBasicMaterial({ color: 0x9de3ed});
    //Creates a new geometry and material to be used by the ball
    m_ballGeom           = new THREE.SphereGeometry(0.15, 8, 8);
    m_ballMaterial       = new THREE.MeshBasicMaterial({ wireframe: true});
    //Creates a new geometry and material to be used by the drops
    m_dropGeom           = new THREE.BoxGeometry(0.25, 0.25, 0.25);
    m_dropMaterial       = new THREE.MeshBasicMaterial( {color : 0xe699ff});
    //Creates a new geometry and material for the game over plane
    m_planeGeom          = new THREE.PlaneGeometry();
    m_gameOverMaterial   = new THREE.MeshBasicMaterial({ map : m_gameOverTexture });
    m_backgroundMaterial = new THREE.MeshBasicMaterial({ map : m_backgroundTexture });
    m_winScreenMaterial  = new THREE.MeshBasicMaterial({ map : m_winScreenTexture });
    m_mainMenuMaterial   = new THREE.MeshBasicMaterial({ map : m_mainMenuTexture});
    //Creates a new SpriteMaterial that will be used to display the playspace overlay
    m_playspaceMaterial  = new THREE.SpriteMaterial({ map: m_playspaceTexture, color: 0xffffff });
    //Creates a new SpriteMaterial that will be applied to a sprite to display the grid
    m_gridMaterial       = new THREE.SpriteMaterial({ map: m_gridTexture, color: 0xffffff });
    //Creates a new SpriteMaterial that will be applied to a sprite used to display the score
    m_scoreScreenMaterial = new THREE.SpriteMaterial({ map: m_scoreScreenTexture, color: 0xffffff });
    //Creates a new Cube object for the bricks, paddle and drops to inherit from
    m_baseCube           = new Cube(0xffe6ff, m_rectGeom, m_paddleMaterial, m_scene);
    //Creates a new paddle object that inherits from the base cube object
    m_paddle             = new Paddle(m_rectGeom, m_paddleMaterial);
    //Creates a new Ball object
    m_ball               = new Ball(m_ballGeom, m_ballMaterial);
    //Creates a new BrickConstructor object
    m_brickConstructor   = new BrickConstructor();
    //Creates a new MusicManager object
    m_musicManager       = new MusicManager();
    //Creates a new Drop Manager object
    m_dropManager        = new DropManager();
    //Creates a new Sprite using the playspace material
    m_playspaceSprite    = new THREE.Sprite(m_playspaceMaterial);
    //Creates a new Sprite using the grid material
    m_gridSprite         = new THREE.Sprite(m_gridMaterial);
    //Creates a new Sprite using the score screen material
    m_scoreScreenSprite  = new THREE.Sprite(m_scoreScreenMaterial);
    //Assigns a geometry and material to the plane mesh
    m_gameOverMesh       = new THREE.Mesh(m_planeGeom, m_gameOverMaterial);
    m_mainMenuMesh       = new THREE.Mesh(m_planeGeom, m_mainMenuMaterial);
    m_winScreenMesh      = new THREE.Mesh(m_planeGeom, m_winScreenMaterial);
    m_backgroundMesh = new THREE.Mesh(m_planeGeom, m_backgroundMaterial);
    m_musicManager.PlayStartup();
    Draw();
}

function UnloadContent() {
    //Code used for unloading content goes here\\

}

function Draw() {
    //Code used to draw objects and images goes here\\

    //Object Drawing\\
    m_paddle.Draw();
    m_ball.Draw();
    m_scene.add(m_playspaceSprite);
    m_scene.add(m_gridSprite);
    m_scene.add(m_scoreScreenSprite);
    m_scene.add(m_gameOverMesh);
    m_scene.add(m_mainMenuMesh);
    m_scene.add(m_winScreenMesh);
    m_scene.add(m_backgroundMesh);

    //Scaling and Positioning\\
    m_playspaceSprite.scale.set(8.5, 15.3, 1);
    m_gridSprite.scale.set(9.2, 4.5, 1);
    m_scoreScreenSprite.scale.set(4.25, 7.65, 1);
    m_gameOverMesh.scale.set(25.5, 12.23, 1);
    m_winScreenMesh.scale.set(25.5, 12.23, 1);
    m_mainMenuMesh.scale.set(25.23, 12.23, 1);
    m_backgroundMesh.scale.set(38, 18.5, 1);
    m_gridSprite.position.set(0, -5.75, -1);
    m_scoreScreenSprite.position.set(-8, 0, 0);
    m_mainMenuMesh.position.set(0, 0, 2);
    m_gameOverMesh.position.set(0, 50, 2);
    m_winScreenMesh.position.set(0, 50, 2);
    m_backgroundMesh.position.set(0, 0, -2);
}

function Update() {
    //Code to be executed every update goes here\\
    //Calls the Update function repeatedly
    requestAnimationFrame(Update);
    //If there are any drops in the array, they will be drawn
    if (m_dropArray[0] != undefined) {
        for (i = 0; i < m_dropArray.length; i++) {
            m_dropArray[i].Collisions();
            m_dropArray[i].getMesh().position.y -= 0.075;
        }
    }
    Animate();
    MovePaddle();
    ChangeLevel();
    UpdateUI();
    RemoveEffects();
    m_ball.Movement();
    m_ball.CollisionHandler();
    m_renderer.render(m_scene, m_camera);
}

function Animate() {
    //Code used to animate objects goes here\\
    m_ball.getMesh().rotation.x += 0.005;
    m_ball.getMesh().rotation.y += 0.01;
}

function GameOver() {
    m_gameOverMesh.position.y = 0;
    m_musicManager.PauseAudio();
    m_musicManager.PlayGameOver();
    //If the player's current score is greater than the high score, the high score is overwritten with their score
    if (m_iScore > m_iHighScore) {
        m_iHighScore = m_iScore;
    }
    m_iScore = 0;
    m_ball.setSpeedY(0.08);
    m_ball.setSpeedX(0.075);
    m_paddle.setSpeed(0.075);
    m_bInverted = false;
    m_bSlowedDown = false;
    m_bSpedUp = false;
    m_iLevelNumber = 1;
    m_bGameOver = true;
    m_paddle.getMesh().position.x = 0;
    ChangeUIVisibility(false);
}

function UpdateUI() {
    //Updates the text elements in the HTML to display the correct values
    document.getElementById("playerScore").textContent = "Score: " + m_iScore.toString();
    document.getElementById("playerLives").textContent = "Lives: " + m_iLives.toString();
    document.getElementById("levelNumber").textContent = "Level: " + m_iLevelNumber.toString();
    document.getElementById("highScore").textContent = "High Score: " + m_iHighScore.toString();
}

function ChangeUIVisibility(visibility) {
    //Sets the HTML text elements to be visible
    if (visibility == true) {
        m_scoreText.style.visibility = "visible";
        m_highScoreText.style.visibility = "visible";
        m_livesText.style.visibility = "visible";
        m_levelNumberText.style.visibility = "visible";
    }
    //Sets the HTML text elements to be hidden
    else if (visibility == false) {
        m_scoreText.style.visibility = "hidden";
        m_highScoreText.style.visibility = "hidden";
        m_livesText.style.visibility = "hidden";
        m_levelNumberText.style.visibility = "hidden";
    }
}

function ChangeLevel() {
    //If there are no bricks left, the current music is paused, the level number is increased, the next level's music is played and brick pattern constructed
    if (m_iBricksRemaining == 0 && m_iLevelNumber > 0 && m_iLevelNumber < 3) {
        m_musicManager.PauseAudio();
        m_iLevelNumber++;
        m_musicManager.PlayAudio();
        m_ball.setInPlay(false);
        m_brickConstructor.BuildBricks();
    }
    else if (m_iBricksRemaining == 0 && m_iLevelNumber == 3 && !m_bHasWon) {
        m_musicManager.PauseAudio();
        m_musicManager.PlayWinSound();
        ChangeUIVisibility(false);
        m_ball.setInPlay(false);
        if (m_iScore > m_iHighScore) {
            m_iHighScore = m_iScore;
        }
        m_iScore = 0;
        m_winScreenMesh.position.y = 0;
        m_ball.setSpeedX = 0.075;
        m_ball.setSpeedY = 0.08;
        m_bHasWon = true;
    }
}

function MovePaddle() {
    //Used to track player input and move the paddle\\
    if (m_bMoveLeft && m_paddle.getMesh().position.x - 0.975 > -4 && !m_bGameOver) {
        m_paddle.MoveLeft();
    }
    else if (m_bMoveRight && m_paddle.getMesh().position.x + 0.975 < 4 && !m_bGameOver) {
        m_paddle.MoveRight();
    }
}

function DropEffect(effect) {
    if (effect == "OneUp") {
        m_iLives++;
    }
    else if (effect == "SpeedUp") {
        m_paddle.setSpeed(0.12);
        m_bSpedUp = true;
        m_bSlowedDown = false;
        m_spedUpText.style.visibility = "visible";
        m_slowedDownText.style.visibility = "hidden";
    }
    else if (effect == "Invert") {
        m_bInverted = true;
        m_invertedText.style.visibility = "visible";
    }
    else if (effect == "Slower") {
        m_paddle.setSpeed(0.045);
        m_bSlowedDown = true;
        m_bSpedUp = false;
        m_slowedDownText.style.visibility = "visible";
        m_spedUpText.style.visibility = "hidden"
    }
}

function RemoveEffects() {
    if (m_bSpedUp && m_iTimeSpedUp < 600) {
        m_iTimeSpedUp++;
    }
    else if (m_bSpedUp && m_iTimeSpedUp >= 600) {
        m_paddle.setSpeed(0.075);
        m_iTimeSpedUp = 0;
        m_bSpedUp = false;
        m_spedUpText.style.visibility = "hidden";
    }
    if (m_bSlowedDown && m_iTimeSlowed < 600) {
        m_iTimeSlowed++;
    }
    else if (m_bSlowedDown && m_iTimeSlowed >= 600) {
        m_paddle.setSpeed(0.075);
        m_iTimeSlowed = 0;
        m_bSlowedDown = false;
        m_slowedDownText.style.visibility = "hidden";
    }
    if (m_bInverted && m_iTimeInverted < 600) {
        m_iTimeInverted++;
    }
    else if (m_bInverted && m_iTimeInverted >= 60) {
        m_iTimeInverted = 0;
        m_bInverted = false;
        m_invertedText.style.visibility = "hidden";
    }
}

document.addEventListener("keydown", function (event) {
    if (event.keyCode == 37) {
        if (!m_bInverted) {
            m_bMoveLeft = true;
            m_bMoveRight = false;
        }
        else {
            m_bMoveLeft = false;
            m_bMoveRight = true;
        }
    }
});
document.addEventListener("keydown", function (event) {
    if (event.keyCode == 39) {
        if (!m_bInverted) {
            m_bMoveRight = true;
            m_bMoveLeft = false;
        }
        else {
            m_bMoveRight = false;
            m_bMoveLeft  = true;
        }
    }
});
document.addEventListener("keyup", function (event) {
    if (event.keyCode == 37) {
        if (!m_bInverted) {
            m_bMoveLeft = false;
        }
        else {
            m_bMoveRight = false;
        }
    }
});
document.addEventListener("keyup", function (event) {
    if (event.keyCode == 39) {
        if (!m_bInverted) {
            m_bMoveRight = false;
        }
        else {
            m_bMoveLeft = false;
        }
    }
});
document.addEventListener("keydown", function (event) {
    if (event.keyCode == 32) {
        if (m_ball.getInPlay() == false && !m_bGameOver) {
            m_ball.setLaunchBall(true);
        }
    }
});
document.addEventListener("keydown", function (event) {
    if (event.keyCode == 13) {
        if (m_bGameOver == true) {
            m_brickConstructor.RemoveBricks();
            m_iBricksRemaining = 0;
            m_brickConstructor.BuildBricks();
            ChangeUIVisibility(true);
            m_gameOverMesh.position.y = 50;
            m_iLives = 3;
            m_musicManager.PlayAudio();
            m_bGameOver = false;
        }
        else if (m_iLevelNumber == 0 || m_bHasWon) {
            m_iLevelNumber = 1;
            m_musicManager.PlayAudio();
            m_mainMenuMesh.position.y = 100;
            m_winScreenMesh.position.y = 100;
            m_brickConstructor.BuildBricks();
            ChangeUIVisibility(true);
        }
    }
});

Initialise();
Update();