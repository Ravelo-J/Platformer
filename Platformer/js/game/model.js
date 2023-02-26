function Model(platformJSON) {
    this.world;
    this.player;
    this.initializeWorldModel = function(height,width,friction,gravity) {
        this.world = {
            height:height,
            width:width,
    
            friction:friction, //acceleration Horizontal
            gravity:gravity, //acc vert
        }
    }
    this.initializePlayerModel = function(color,size,x,y,velocityX,velocityY,maxSpeed,jumpStrength,grounded) {
        this.player = {
            color:color,
            size:size,
    
            x:x,
            y:y,
            velocityX:velocityX,
            velocityY:velocityY,
            maxSpeed:maxSpeed,
            jumpStrength:jumpStrength,
    
            grounded:grounded,
        }
    }
    //[50x,50y] so [10,10] = [500,500], 0<=x<40 0<=y<20
    this.platformLocationCodes = [[2,2],[3,3],[4,3],[5,3],[6,3],[5,5],[7,7],[9,9],[10,10],[12,12],[14,14],[15,15],[16,16],[17,17]]
    this.platforms = [
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