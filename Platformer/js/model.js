function Model(platformJSON) {
    this.world = {
        height: 500,
        width: 1000,

        friction: 5, //acceleration Horizontal
        gravity: 5, //acc vert
    }
    this.player = {
        color: "darkred",
        size: 50,

        x:500,
        y:50,
        velocityX:0,
        velocityY:0,
        maxSpeed: 10,
        jumpStrength:30,

        grounded: false,
    }
    this.platforms = [
        {
            x: -500,
            y: 0,
            width: 500,
            height: 500,
            color: "rgb(17, 39, 22)",
        },
        {
            x: 100,
            y: 0,
            width: 50,
            height: 50,
            color: "rgb(39, 29, 17)",
        },
        {
            x: 250,
            y: 0,
            width: 50,
            height: 100,
            color: "rgb(39, 29, 17)",
        },
        {
            x: 400,
            y: 0,
            width: 50,
            height: 150,
            color: "rgb(39, 29, 17)",
        },
        {
            x: 550,
            y: 200,
            width: 100,
            height: 50,
            color: "rgb(39, 29, 17)",
        },
        {
            x: 500,
            y: 0,
            width: 200,
            height: 50,
            color: "rgb(39, 29, 17)",
        },
        {
            x: 700,
            y: 0,
            width: 500,
            height: 100,
            color: "rgb(39, 29, 17)",
        },
        {
            x: 700,
            y: 250,
            width: 50,
            height: 50,
            color: "rgb(39, 29, 17)",
        },
        {
            x: 850,
            y: 300,
            width: 50,
            height: 50,
            color: "rgb(39, 29, 17)",
        },
        {
            x: 1000,
            y: 350,
            width: 50,
            height: 50,
            color: "rgb(39, 29, 17)",
        },
        {
            x: 0,
            y: 450,
            width: 1500,
            height: 50,
            color: "rgb(39, 29, 17)",
        }, 
    ]
}