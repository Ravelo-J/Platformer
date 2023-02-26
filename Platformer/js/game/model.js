function Model(platformJSON) {
    this.world = {
        height: 1000,
        width: 2000,

        friction: 5, //acceleration Horizontal
        gravity: 5, //acc vert
    }
    this.player = {
        color: "darkred",
        size: 50,

        x:0,
        y:50,
        velocityX:0,
        velocityY:0,
        maxSpeed: 10,
        jumpStrength:30,

        grounded: false,
    }
    //[50x,50y] so [10,10] = [500,500], 0<=x<40 0<=y<20
    this.platformLocationCodes = [[2,2],[3,3],[4,3],[5,3],[6,3],[10,10],[5,5],[15,15],[16,16],[17,17]]
    this.platforms = [
        //left wall
        {
            x: -50,
            y: 0,
            width: 50,
            height: this.world.height,
            color: "rgb(17, 39, 22)",
        },
        //right wall
        {
            x: this.world.width,
            y: 0,
            width: 50,
            height: this.world.height,
            color: "rgb(17, 39, 22)",
        },
        //row 1
        {
            x: 0,
            y: 0,
            width: 50,
            height: 50,
            color: "rgb(17, 39, 22)",
        },
    ]
}