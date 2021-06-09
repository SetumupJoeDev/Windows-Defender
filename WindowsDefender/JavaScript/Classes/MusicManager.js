
function MusicManager() {

    var m_levelOneTheme = document.getElementById("levelOneTheme");
    var m_levelTwoTheme = document.getElementById("levelTwoTheme");
    var m_levelThreeTheme = document.getElementById("levelThreeTheme");

    var m_gameOverSound = document.getElementById("gameOver");
    var m_winSound = document.getElementById("winSound");
    var m_startUp = document.getElementById("startUp");

    var m_effectArray = [document.getElementById("ding1"), document.getElementById("ding2"), document.getElementById("ding3"), document.getElementById("ding4"), document.getElementById("ding5")];

    this.PlayAudio = function () {
        switch (m_iLevelNumber) {
            case 1:
                m_levelOneTheme.play();
                break;
            case 2:
                m_levelTwoTheme.play();
                break;
            case 3:
                m_levelThreeTheme.play()
                break;
        }
    }

    this.PauseAudio = function () {
        switch (m_iLevelNumber) {
            case 1:
                m_levelOneTheme.pause();
                m_levelOneTheme.currentTime = 0;
                break;
            case 2:
                m_levelTwoTheme.pause();
                m_levelTwoTheme.currentTime = 0;
                break;
            case 3:
                m_levelThreeTheme.pause();
                m_levelThreeTheme.currentTime = 0;
                break;
        }
    }

    this.PlayEffect = function () {
        //Generates a number between 0 and 4 and plays the sound effect at that index in the array
        var randomInt = Math.floor(Math.random() * 5);
        m_effectArray[randomInt].play();
    }

    this.PlayGameOver = function () {
        m_gameOverSound.play();
    }

    this.PlayWinSound = function () {
        m_winSound.play();
    }

    this.PlayStartup = function(){
        m_startUp.play();
    }

}