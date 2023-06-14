/* document.addEventListener('DOMContentLoaded', () => { */
    const grid = document.querySelector('.grid')
    const frogImg = document.createElement('img')
    const footer = document.querySelector('.footer')


    let spaceFromBottom = 0
    let jumpTimer
    let goingLeft = false;
    let goingRight = false;
    let leftTimerId
    let rightTimerId
    let fallingTimer
    let hasJumped 
    let frogLeftSpace = screen.width/2 - 56
    let lilyPads = []
    let lilyPadCount = 3
    
    /* document.addEventListener('keyup', function(e){console.log(e.keyCode)}); */

    class Lilypad {
      constructor(newLilyPadBottom) {

        let min = Math.ceil(50);
        let max = Math.floor(300);
        console.log(max)
        console.log(min)
        
        let randmonMarginRight = Math.floor(Math.random() * (max - min) + min)
        let randmonMarginLeft = Math.floor(Math.random() * (max - min) + min)
        console.log(randmonMarginRight)
        console.log(randmonMarginLeft)
        
        this.bottom = newLilyPadBottom
        this.visual = document.createElement('div')
  
        const visual = this.visual
        visual.classList.add('lilypad')
        visual.style.margin = `0px ${randmonMarginRight}px 0px ${randmonMarginLeft}px`
        visual.style.left = this.left + 'px'
        visual.style.bottom = this.bottom + 'px'
        footer.appendChild(visual)
      }
    }

    function createlilyPads() {
      for (let i = 0; i < lilyPadCount; i++) {
        let lilyGap = 40 / lilyPadCount
        let newLilyPadBottom = 0 + i * lilyGap
        let newlilypad = new Lilypad(newLilyPadBottom)
        lilyPads.push(newlilypad)
        console.log(lilyPads)
      }
    }

   
  
    
  function movelilyPads() {
    if (spaceFromBottom > 200) {
      lilyPads.forEach(lilyPad => {
        lilyPad.bottom -= 4
        let visual = lilyPad.visual
        visual.style.bottom = lilyPad.bottom + 'px'

        if (lilyPad.bottom < 10) {
          let firstlilyPad = lilyPads[0].visual
          firstlilyPad.classList.remove('lilyPad')
          lilyPads.shift()
          console.log(lilyPads)
          
          var newlilyPad = new lilyPad(600)
          lilyPads.push(newlilyPad)
        }
      })
    }

  }
  
    

    function createFrog() {
        
       frogImg.src = "frog.png"
       frogImg.classList.add('frogPosition')
        grid.appendChild(frogImg)
        
    }

    createFrog();
 

    
    function jump() {
        
        if(hasJumped == false){
            return;
        }else if(spaceFromBottom == 0){
                hasJumped = true
             }
             
        console.log(hasJumped)
        clearInterval(fallingTimer)
        jumpTimer = setInterval(function () {
        
            spaceFromBottom +=20
            frogImg.style.bottom = spaceFromBottom + 'px'
            
            //maximum height the frog is allowed to jump
            if (spaceFromBottom > 600) {
                hasJumped = false
                falling()
                console.log(hasJumped)
                
              }
        }, 20)
        
       
    }


    function falling() {
        
    clearInterval(jumpTimer)
    fallingTimer = setInterval(function () {
      spaceFromBottom -= 5
      frogImg.style.bottom = spaceFromBottom + 'px'
    if (spaceFromBottom <= 0) {
        hasJumped = true
        clearInterval(fallingTimer);
        clearInterval(leftTimerId)
        clearInterval(rightTimerId)
      } 
     /*  lilyPads.forEach(lilypad => {
        if (
          (spaceFromBottom >= lilypad.bottom) &&
          (spaceFromBottom <= (lilypad.bottom + 15)) &&
          ((doodlerLeftSpace + 60) >= lilypad.left) &&
          (doodlerLeftSpace <= (lilypad.left + 85)) &&
          !isJumping
        ) {
          console.log('tick')
          startPoint = spaceFromBottom
          jump()
          console.log('start', startPoint)
          isJumping = true
        }
      }) */

    }, 15)
    }

    function moveLeft() {
    console.log("moved left")
    if (goingRight) {
        clearInterval(rightTimerId)
        goingRight = false
      }
      goingLeft = true
      leftTimerId = setInterval(function () {
        if(spaceFromBottom <= 0){
            clearInterval(leftTimerId);
        } else if (frogLeftSpace >= 0) {
          console.log('going left')
          frogLeftSpace -= 5
          frogImg.style.left = frogLeftSpace + 'px'
        } else 
        clearInterval(leftTimerId);
      }, 15)

    }

    function moveRight() {
        console.log("moved right")
        if (goingLeft) {
            clearInterval(leftTimerId)
            goingLeft = false
          }
          goingRight = true
          rightTimerId = setInterval(function () {
            if(spaceFromBottom <= 0){
                clearInterval(rightTimerId);
            } else if (frogLeftSpace <= screen.width - 70) {
              console.log('going right')
              frogLeftSpace += 5
              frogImg.style.left = frogLeftSpace + 'px'
            } else 
            clearInterval(rightTimerId);
          }, 15)
    }



    function controls(e) {
        frogImg.style.bottom = spaceFromBottom + 'px'
        //keyCode for spacebar up arrow and w key
        if(e.keyCode == 32 || e.keyCode == 38 || e.keyCode == 87){
            jump();
        //key code for left arrow and a key
        }else if (e.keyCode == 37 || e.keyCode == 65){
            moveLeft();
        //key code for right arrow and d key
        }else if (e.keyCode == 39 || e.keyCode == 68){
            moveRight();
         } 
    } 

     document.addEventListener("keyup", controls)  


function startGame() {
  createlilyPads();
  setInterval(movelilyPads, 30)
}

startGame();

   


















/* }) */