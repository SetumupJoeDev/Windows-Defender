function BrickConstructor() {

    var m_brickArray = [];
    var m_meshArray  = [];

    this.getBrickArray = function () { return m_brickArray; }
    this.getMeshArray = function () { return m_meshArray; }

    this.BuildBricks = function () {
        var k = 0;
        m_brickArray = [];
        m_meshArray = [];
        if (m_iLevelNumber == 1) {
            for (i = 0; i < 6; i++) {
                for (j = 0; j < 4; j++) {
                    //Creates a new brick object at position K in the brick array and passes through the necessary parameters
                    //If j is even, the bricks use material one and sets its health to 2, otherwise they use material two which is a different colour and sets its health to 1
                    if (j % 2 == 0) {
                        m_brickArray[k] = new Brick(m_brickGeom, m_brickMaterialOne, 2);
                    }
                    else {
                        m_brickArray[k] = new Brick(m_brickGeom, m_brickMaterialTwo, 1);
                    }
                    //Draws the new brick at the correct position in the play area and adds its mesh to the mesh array before incrememnting k by 1
                    m_brickArray[k].Draw(- 3 + (i * 1.2), 5 - (j * 0.4));
                    m_iBricksRemaining++;
                    m_meshArray.push(m_brickArray[k].getMesh());
                    k++;
                }
            }
        }
        else if (m_iLevelNumber == 2) {
            for (i = 0; i < 4; i++) {
                for (j = 0; j < 8; j++) {
                    //Creates a new brick object at position K in the brick array and passes through the necessary parameters
                    //If j is even, the bricks use material one and sets its health to 2, otherwise they use material two which is a different colour and sets its health to 1
                    if (j % 2 == 0) {
                        m_brickArray[k] = new Brick(m_brickGeom, m_brickMaterialOne, 2);
                    }
                    else {
                        m_brickArray[k] = new Brick(m_brickGeom, m_brickMaterialTwo, 1);
                    }
                    //Draws the new brick at the correct position in the play area and adds its mesh to the mesh array before incrememnting k by 1
                    m_brickArray[k].Draw(- 1.75 + (i * 1.2), 5 - (j * 0.4));
                    m_iBricksRemaining++;
                    m_meshArray.push(m_brickArray[k].getMesh());
                    k++;
                }
            }
        }
        else if (m_iLevelNumber == 3) {
            for (i = 0; i < 6; i++) {
                for (j = 0; j < 9; j++) {
                    //Creates a new brick object at position K in the brick array and passes through the necessary parameters
                    //If j is even, the bricks use material one and sets its health to 2, otherwise they use material two which is a different colour and sets its health to 1
                    if (j < 2 || j == 8) {
                        m_brickArray[k] = new Brick(m_brickGeom, m_brickMaterialOne, 2);
                    }
                    else {
                        m_brickArray[k] = new Brick(m_brickGeom, m_brickMaterialTwo, 1);
                    }
                    //Draws the new brick at the correct position in the play area and adds its mesh to the mesh array before incrememnting k by 1
                    m_brickArray[k].Draw(- 3 + (i * 1.2), 5 - (j * 0.4));
                    m_iBricksRemaining++;
                    m_meshArray.push(m_brickArray[k].getMesh());
                    k++;
                }
            }
        }
    }

    this.RemoveBricks = function () {
        //Removes all bricks from the playspace before new bricks are added
        for (i = 0; i < m_meshArray.length; i++) {
            m_meshArray[i].position.y = 100;
        }
    }

}