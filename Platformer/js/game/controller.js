function Controller(model, view) {
    //Connections
    this.model = model
    this.view = view
    this.engine;
    //Main_menu items/functions
    this.startButton;
    this.worldEditorButton;
    this.activateMenuButtons = function() {
        this.startButton = document.getElementById("startButton").addEventListener("click", () => {
            this.startGame()
            this.deactivateMenuButtons()
        })
        this.worldEditorButton = document.getElementById("worldEditButton").addEventListener("click", () => { 
            this.startWorldEditor()
        })
    }
    this.deactivateMenuButtons = function() {
        this.startButton = null;
        this.worldEditorButton = null;
    }
    this.startGame = function() {
        this.view.destroyMainMenu()

        this.view.renderWorld(this.model.world.height,this.model.world.width)
        this.addPlayerControls()
        this.engine.gameLoop()
    }
    this.startWorldEditor = function() {
        this.view.destroyMainMenu()
    }
    //Controller data
    this.keys = {
        w: {
            active: false
        },
        a: {
            active: false
        },
        s: {
            active: false
        },
        d: {
            active: false
        },
        space: {
            active: false
        },
    }
    this.platformCollision = {
        hPlatform: null,
        vPlatform: null,
        horizontal: null,
        vertical: null,
    }
    this.keyDown;
    this.keyUp;
    this.keyHandler = function(e, bool) {
        switch (e.key) {
            case "w":
                this.keys.w.active = bool
                break
            case "a":
                this.keys.a.active = bool
                break
            case "s":
                this.keys.s.active = bool
                break
            case "d":
                this.keys.d.active = bool
                break
            case " ":
                this.keys.space.active = bool
                break                
        }
    }
    this.addPlayerControls = function() {
        this.keyDown = document.addEventListener("keydown", (e) => {
            this.keyHandler(e, true)
        })
        this.keyUp = document.addEventListener("keyup", (e) => {
            this.keyHandler(e, false)
        })
    }
    this.movePlayer = function() {
        //Forward
        if (this.keys.d.active) {
            this.model.player.velocityX += this.model.world.friction
            //cap speed to right
            if (this.model.player.velocityX >= this.model.player.maxSpeed) {
                this.model.player.velocityX = this.model.player.maxSpeed
            } 
        //backward
        } else if (this.keys.a.active) {
            this.model.player.velocityX -= this.model.world.friction
            //cap speed to left
            if (this.model.player.velocityX <= -this.model.player.maxSpeed) {
                this.model.player.velocityX = -this.model.player.maxSpeed
            }
        //stopping/slowing down
        } else {
            if (this.model.player.velocityX > 0) {
                this.model.player.velocityX -= this.model.world.friction
                if (this.model.player.velocityX <= 0) {
                    this.model.player.velocityX = 0
                }
            } else {
                this.model.player.velocityX += this.model.world.friction
                if (this.model.player.velocityX >= 0) {
                    this.model.player.velocityX = 0
                }
            }
        }
        /*check for collision
            Check left and right collisions, update vertical player movement as per usual if none are detected.

            Collision detections are registered relative to object player collided with.
            i.e. left means player ran into left side of platform
        */
        this.model.platforms.forEach(platform => {
            this.collisionDetection(platform,this.model.player)
        });
        //this.sideScroll("h",this.model.player)
        this.model.player.x += this.model.player.velocityX
        
    }
    this.jumpPlayer = function() {
        //jump
        if (this.keys.space.active && this.model.player.velocityY == 0 && this.model.player.grounded ) {
            this.model.player.velocityY += this.model.player.jumpStrength
            this.model.player.grounded = false
        //Fall
        } else {
            this.model.player.velocityY -= this.model.world.gravity
            /*if (this.model.player.y <= 0) {
                this.model.player.y = 0
                this.model.player.velocityY = 0
                this.model.player.grounded = true
            }*/
        }
        /*check for collision
            Check bottom and top collisions, update vertical player movement as per usual if none are detected

            Collision detections are registered relative to object player collided with.
            i.e. top means player fell on the top side of platform
        */
        
        this.model.platforms.forEach(platform => {
            this.collisionDetection(platform,this.model.player)
        })
        //this.sideScroll("v",this.model.player)
        //this.sideScroll("down",this.model.player)
        this.model.player.y += this.model.player.velocityY
        
    }
    //Check platforms for imminent player move into itself
    this.collisionDetection = function(platform,target) {
        //X Left
        if (target.x + target.size <= platform.x && target.x + target.size + target.velocityX > platform.x &&
            (target.y+target.size > platform.y && target.y < platform.y+platform.height)) {
            this.platformCollision.hPlatform = platform
            this.platformCollision.horizontal = "left"
            //console.log("LEFT")
            target.velocityX = 0
            target.x = this.platformCollision.hPlatform.x-target.size
            this.platformCollision.hPlatform = null
            this.platformCollision.horizontal = null
        }
        //X Right
        else if (target.x >= platform.x+platform.width && target.x + target.velocityX < platform.x+platform.width &&
            (target.y+target.size > platform.y && target.y < platform.y+platform.height)) {
            this.platformCollision.hPlatform = platform
            this.platformCollision.horizontal = "right"
            //console.log("RIGHT")
            target.velocityX = 0
            target.x = this.platformCollision.hPlatform.x+this.platformCollision.hPlatform.width
            this.platformCollision.hPlatform = null
            this.platformCollision.horizontal = null
        }
        //Y Top
        else if (target.y >= platform.y+platform.height && target.y + target.velocityY < platform.y+platform.height &&
            (target.x+target.size  > platform.x && target.x < platform.x+platform.width)) {
            this.platformCollision.vPlatform = platform
            this.platformCollision.vertical = "top"
            //console.log("TOP")
            target.velocityY = 0
            target.y = this.platformCollision.vPlatform.y+this.platformCollision.vPlatform.height
            this.platformCollision.vPlatform = null
            this.platformCollision.vertical = null
            setTimeout(() => {target.grounded = true},10) 
        }
        //Y Bottom
        else if (target.y+target.size <= platform.y && target.y + target.size +target.velocityY > platform.y &&
            (target.x+target.size > platform.x && target.x < platform.x+platform.width)) {
            this.platformCollision.vPlatform = platform
            this.platformCollision.vertical = "bottom"
            //console.log("BOTTOM")
            target.velocityY = 0
            target.y = this.platformCollision.vPlatform.y-target.size
            this.platformCollision.vPlatform = null
            this.platformCollision.vertical = null
        }
    }
    /*
    this.sideScroll = function(direction,target) {
            if (direction=="h") {
                //SideScroll right within distance form border
                if (target.x > this.model.world.width/2-target.size*2) {
                    target.x -= target.velocityX
                    this.model.platforms.forEach(platform => {
                        platform.x -= target.velocityX
                    })
                }
                //SideScroll left within distance form border
                else if (target.x < this.model.world.width/2-target.size*2) {
                    target.x -= target.velocityX
                    this.model.platforms.forEach(platform => {
                        platform.x -= target.velocityX
                    })
                }}
            if (direction =="v") {
                //scroll up
                if (target.y > this.model.world.height/2-target.size) {
                    target.y -=target.velocityY
                    this.model.platforms.forEach(platform => {
                        platform.y -=target.velocityY
                    })
                }
                //scroll down
                else if (target.y < this.model.world.height/2-target.size) {
                        target.y +=target.velocityY
                        this.model.platforms.forEach(platform => {
                            platform.y +=target.velocityY
                        })
                    
                }}   
    }*/
}
//NEED WINNING CONDITION

//NEED ENEMIES

//NEED ENVIRONMENTAL HAZARDS

//NEED TO ADD VERTICAL AUTO-SCROLLING

//NEED TO REMOVE Y=0 AS PERMANENT GROUND for falling
    //No longer invisible floor across bottom of map

//Remove SideScrolling???