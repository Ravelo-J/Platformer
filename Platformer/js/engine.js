function Engine(model,view,controller) {
    this.model = model
    this.view = view
    this.controller = controller
    this.fps = 30
    this.sysClock;
    this.stop = false;

    this.gameLoop = function() {
         //breaks gameloop (test): stops recursion from setTimeout
        if (this.stop) {
            this.sysClock = null
            return
        }
        this.view.renderBackground()
        this.model.platforms.forEach((platform) => {
            this.view.renderPlatforms(platform.x,this.model.world.height-platform.height-platform.y,platform.width,platform.height,platform.color)
        })
        this.view.renderPlayer(this.model.player.size,this.model.player.x,this.model.world.height-this.model.player.size-this.model.player.y,this.model.player.color)
        this.controller.move()
        this.controller.jump()
        
        //this.view.renderPlatformImgLoop()
        this.sysClock = setTimeout(() => this.gameLoop(), 1000/this.fps)
    }
    this.worldEditLoop = function() {
        this.sysClock = setTimeout(() => this.worldEditLoop(), 1000/this.fps)
    }
}

window.addEventListener("DOMContentLoaded", () => {
    let model = new Model()
    let view = new View()
    let controller = new Controller(model,view)
    let engine = new Engine(model,view,controller)
    view.renderWorld(model.world.height,model.world.width)
    //view.renderPlatformImg()

    engine.gameLoop()

})