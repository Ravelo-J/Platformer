
function View() {
    this.canvas;
    this.ctx;
    //this.img1 = new Image()
    //this.img1.src = "../sprites/grass.png"
    //this.img2 = new Image()
    //this.img2.src = "../sprites/dirt.png"
    //this.img3 = new Image()
    //this.img3.src = "../sprites/background.png"

    this.renderWorld = function(height,width) {
        let newCanvas = document.createElement("canvas")
        newCanvas.height = height
        newCanvas.width = width
        newCanvas.id = "canvas"
        document.body.insertBefore(newCanvas,document.getElementById("menu_container"))
        this.canvas = document.getElementById("canvas")
        this.ctx = this.canvas.getContext("2d")
    }
    this.renderBackground = function() {
        //this.ctx.drawImage(this.img3,0,0,1000,500)
        this.ctx.beginPath()
        this.ctx.fillStyle = "rgba(100, 50, 100, 1.0)"
        this.ctx.rect(0,0,1000,500)
        this.ctx.fill()
    }
    this.renderPlayer = function(size,x,y,color) {
        //this.ctx.clearRect(0,0,1000,500)
        this.ctx.beginPath()
        this.ctx.fillStyle = color
        //this.ctx.strokeRect(x,y,size,size)
        this.ctx.rect(x,y,size,size)
        //this.ctx.stroke()
        this.ctx.fill()
        this.renderOutline(size,size,x,y)
    }
    this.renderOutline = function(height,width,x,y) {
        //stroke//outline lies half over edge and half under edge, so half line width is necessary below to maintain player.size
        this.ctx.beginPath()
        this.ctx.lineWidth = "5"
        this.ctx.strokeStyle = "black"
        this.ctx.moveTo(x,y+2.5)
        this.ctx.lineTo(x+width,y+2.5)
        this.ctx.moveTo(x+width-2.5,y)
        this.ctx.lineTo(x+width-2.5,y+height)
        this.ctx.moveTo(x+width-2.5,y+height-2.5)
        this.ctx.lineTo(x,y+height-2.5)
        this.ctx.moveTo(x+2.5,y+height)
        this.ctx.lineTo(x+2.5,y)
        this.ctx.stroke()
    }
    this.renderPlatforms = function(x,y,width,height,color) {
        this.ctx.beginPath()
        this.ctx.fillStyle = color
        this.ctx.rect(x,y,width,height)
        this.ctx.fill()
        this.renderOutline(height,width,x,y)
    }
    //Image stuff
    /*this.renderPlatformImg = function() {
        this.img3.onload = () => {
            this.ctx.drawImage(this.img1,50,400)
            this.ctx.drawImage(this.img2,50,450)
        }
    }
    this.renderPlatformImgLoop = function() {
        this.ctx.drawImage(this.img1,50,400)
        this.ctx.drawImage(this.img2,50,450)
    } */
    this.displayMainMenu = function() {
        const menuContainer = document.getElementById("menu_container")
        menuContainer.style.width = "100vw"
        menuContainer.style.height = "100vh"

        const title = document.createElement("h1");
        title.innerHTML = "Platformer Gamer";
        title.id = "titleHeading"
        menuContainer.appendChild(title);

        const buttonContainer = document.createElement("div");
        buttonContainer.id = "menu_button_container"
        menuContainer.appendChild(buttonContainer);

        const btn = document.createElement("button");
        btn.innerHTML = "Play";
        btn.id = "startButton"
        btn.setAttribute("class", "menu_button")
        document.getElementById("menu_button_container").appendChild(btn);

        const btn2 = document.createElement("button");
        btn2.innerHTML = "World Editor";
        btn2.id = "worldEditButton"
        btn2.setAttribute("class", "menu_button")
        document.getElementById("menu_button_container").appendChild(btn2);
    }
    this.destroyMainMenu = function() {
        const menuContainer = document.getElementById("menu_container")
        menuContainer.style.width = "0"
        menuContainer.style.height = "0"
        document.getElementById("titleHeading").remove()
        document.getElementById("startButton").remove()
        document.getElementById("worldEditButton").remove()
        document.getElementById("menu_button_container").remove()
    }
}