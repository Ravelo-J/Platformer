function Engine(model,view,controller) {
    //Connections
    this.model = model
    this.view = view
    this.controller = controller
    //Engine info
    this.fps = 30
    this.sysClock;

    /*Essential Engine Functions
        menus, setup, initializations, gameloop startup*/
    this.preGameLoop = function() {
        //Initialize Starting/Default Values
        if (this.sysClock) {
            clearInterval(this.sysClock)
        }
        this.model.world = null
        this.model.player = null
        this.model.initializeWorldModel(1000,2000,5,5)  //height,width,friction,gravity
        this.model.initializePlayerModel("darkred",50,0,50,0,0,10,30,false) //color,size,x,y,velocityX,velocityY,maxSpeed,jumpStrength,grounded
        //Pre-Loop Renders
        this.view.renderWorld(this.model.world.height,this.model.world.width)
        //Add Controller Event Listeners
        this.controller.addPlayerControls()
        //Initialize GameLoop
        this.sysClock = setInterval(() => this.gameLoop(), 1000/this.fps)
    }
    this.gameLoop = function() {
        //Render Assets
        this.view.renderBackground(this.model.world.height,this.model.world.width)
        this.model.platforms.forEach((platform) => {
            this.view.renderPlatforms(platform.x,this.model.world.height-platform.height-platform.y,platform.width,platform.height,platform.color)
        })
        this.view.renderPlayer(this.model.player.size,this.model.player.x,this.model.world.height-this.model.player.size-this.model.player.y,this.model.player.color)
        //Check Controls & Collisions
        this.controller.movePlayer()
        this.controller.jumpPlayer()
        this.controller.checkAlternateControls()
        //this.view.renderPlatformImgLoop()
    }
    this.worldEditLoop = function() {
        this.sysClock = setTimeout(() => this.worldEditLoop(), 1000/this.fps)
    }
    this.mainMenu = function() {
        this.view.displayMainMenu()
        this.controller.activateMenuButtons()
    }
    this.generatePlatforms = function(plc = this.model.platformLocationCodes) {
        plc.forEach((item)=> {
            this.model.platforms.push({
                x: 50*item[0]-50,
                y: 50*item[1]-50,
                width: 50,
                height: 50,
                color: "rgb(17, 39, 22)",
            })
        })
    }
}


/*On Dom Load: Initialize each section of JS and any dependencies*/
window.addEventListener("DOMContentLoaded", () => {
    let model = new Model()
    let view = new View()
    let controller = new Controller(model,view)
    let engine = new Engine(model,view,controller)
    controller.engine = engine
    //view.renderPlatformImg()
    
    engine.generatePlatforms(model.platformLocationCodes)
    engine.mainMenu()
    
})