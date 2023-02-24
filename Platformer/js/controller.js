function Controller(model, view) {
    this.model = model
    this.view = view
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
    this.keyDown = document.addEventListener("keydown", (e) => {
        this.keyHandler(e, true)
    })
    this.keyUp = document.addEventListener("keyup", (e) => {
        this.keyHandler(e, false)
    })
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
    this.move = function() {
        //Forward
        if (this.keys.d.active) {
            this.model.player.velocityX += this.model.world.friction
            //cap speed to right
            if (this.model.player.velocityX >= this.model.player.maxSpeed) {
                this.model.player.velocityX = this.model.player.maxSpeed
            } 
            //SideScroll right within distance form border
            if (this.model.world.width-this.model.player.x < 500-this.model.player.size) {
                this.model.player.x -= this.model.player.maxSpeed
                this.model.platforms.forEach(platform => {
                    platform.x -= this.model.player.maxSpeed
                })
            }
        //backward
        } else if (this.keys.a.active) {
            this.model.player.velocityX -= this.model.world.friction
            //cap speed to left
            if (this.model.player.velocityX <= -this.model.player.maxSpeed) {
                this.model.player.velocityX = -this.model.player.maxSpeed
            }
            //SideScroll left within distance form border
            if (this.model.player.x < 500-this.model.player.size) {
                this.model.player.x += this.model.player.maxSpeed
                this.model.platforms.forEach(platform => {
                    platform.x += this.model.player.maxSpeed
                })
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
        //check for collision
        this.model.platforms.forEach(platform => {
            this.collisionDetection(platform)
        });

        //Left (of Platform)
        if (this.platformCollision.horizontal == "left") {
            console.log("LEFT")
            this.model.player.velocityX = 0
            this.model.player.x = this.platformCollision.hPlatform.x-this.model.player.size
            this.platformCollision.hPlatform = null
            this.platformCollision.horizontal = null
        //Right of
        } else if (this.platformCollision.horizontal == "right") {
            //console.log("RIGHT")
            this.model.player.velocityX = 0
            this.model.player.x = this.platformCollision.hPlatform.x+this.platformCollision.hPlatform.width
            this.platformCollision.hPlatform = null
            this.platformCollision.horizontal = null
        } else {
        //Update position using velocity
            this.model.player.x += this.model.player.velocityX
        }
    }
    this.jump = function() {
        //jump
        if (this.keys.space.active && this.model.player.velocityY == 0 && this.model.player.grounded ) {
            this.model.player.velocityY += this.model.player.jumpStrength
            this.model.player.grounded = false
        //Fall until ground level 0
        } else {
            this.model.player.velocityY -= this.model.world.gravity
            if (this.model.player.y <= 0) {
                this.model.player.y = 0
                this.model.player.velocityY = 0
                this.model.player.grounded = true
            }
        }
        //check for collision
        this.model.platforms.forEach(platform => {
            this.collisionDetection(platform)
        });
        //Top, prevents falling
        if (this.platformCollision.vertical == "top") {
            console.log("TOP")
            this.model.player.velocityY = 0
            this.model.player.y = this.platformCollision.vPlatform.y+this.platformCollision.vPlatform.height
            this.platformCollision.vPlatform = null
            this.platformCollision.vertical = null
            this.model.player.grounded = true
        //Bottom
        } else if (this.platformCollision.vertical == "bottom") {
            //console.log("BOTTOM")
            this.model.player.velocityY = 0
            this.model.player.y = this.platformCollision.vPlatform.y-this.model.player.size
            this.platformCollision.vPlatform = null
            this.platformCollision.vertical = null
        } else {
        //Update Position using velocity
            this.model.player.y += this.model.player.velocityY
        }
    }
    //Check platforms for imminent player move into itself
    this.collisionDetection = function(platform) {
        //X Left
        if (this.model.player.x + this.model.player.size <= platform.x && this.model.player.x + this.model.player.size + this.model.player.velocityX > platform.x &&
            (this.model.player.y+this.model.player.size > platform.y && this.model.player.y < platform.y+platform.height)) {
            this.platformCollision.hPlatform = platform
            this.platformCollision.horizontal = "left"
        }
        //X Right
        else if (this.model.player.x >= platform.x+platform.width && this.model.player.x + this.model.player.velocityX < platform.x+platform.width &&
            (this.model.player.y+this.model.player.size > platform.y && this.model.player.y < platform.y+platform.height)) {
            this.platformCollision.hPlatform = platform
            this.platformCollision.horizontal = "right"
        }
        //Y Top
        else if (this.model.player.y >= platform.y+platform.height && this.model.player.y + this.model.player.velocityY < platform.y+platform.height &&
            (this.model.player.x+this.model.player.size > platform.x && this.model.player.x < platform.x+platform.width)) {
            this.platformCollision.vPlatform = platform
            this.platformCollision.vertical = "top"
        }
        //Y Bottom
        else if (this.model.player.y+this.model.player.size <= platform.y && this.model.player.y + this.model.player.size +this.model.player.velocityY > platform.y &&
            (this.model.player.x+this.model.player.size > platform.x && this.model.player.x < platform.x+platform.width)) {
            this.platformCollision.vPlatform = platform
            this.platformCollision.vertical = "bottom"
        }
    }
}
//NEED WINNING CONDITION

//NEED ENEMIES

//NEED ENVIRONMENTAL HAZARDS

//NEED TO ADD VERTICAL AUTO-SCROLLING

//NEED TO REMOVE Y=0 AS PERMANENT GROUND