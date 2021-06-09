
function DropManager() {

    var m_iDropChance;

    this.GenerateDrop = function () {
        var arrayIndex = m_dropArray.length;
        m_iDropChance = Math.floor((Math.random() * 100) + 1);
        if (m_iDropChance <= 49) {
            m_iDropChance = Math.floor((Math.random() * 100) + 1);
            if (m_iDropChance % 2 == 0) {
                //Generate a power-up
                if (m_iDropChance <= 50) {
                    //Generate a 1-Up
                    m_dropArray[arrayIndex] = new Drop(m_dropGeom, m_dropMaterial, "OneUp");
                    m_dropArray[arrayIndex].Draw();
                }
                else if (m_iDropChance > 50) {
                    //Generate something else
                    m_dropArray[arrayIndex] = new Drop(m_dropGeom, m_dropMaterial, "SpeedUp");
                    m_dropArray[arrayIndex].Draw();
                }
            }
            else {
                //Generate a debuff
                if (m_iDropChance <= 50) {
                    //Generate a screen flipper
                    m_dropArray[arrayIndex] = new Drop(m_dropGeom, m_dropMaterial, "Invert");
                    m_dropArray[arrayIndex].Draw();
                }
                else if (m_iDropChance > 50) {
                    //Generate a paddle slower
                    m_dropArray[arrayIndex] = new Drop(m_dropGeom, m_dropMaterial, "Slower");
                    m_dropArray[arrayIndex].Draw();
                }
            }
        }
    }
}