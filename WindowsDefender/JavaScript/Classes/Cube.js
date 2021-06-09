
function Cube(geometry, material) {

    //Geometry, Materials and Meshes\\
    var m_cubeGeom = geometry;
    var m_cubeMat = material;
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\\

    //Getters and Setters\\
    this.getGeometry = function(){ return m_cubeGeom; }
    this.setGeometry = function(geometry){ m_cubeGeom = geometry; }

    this.getMaterial = function(){ return m_cubeMat; }
    this.setMaterial = function (material) { m_cubeMat = material; }

    this.getScene = function () { return m_scene; }
    this.setScene = function (scene) { m_scene = scene; }
    //~~~~~~~~~~~~~~~~~~~~\\
}