interface GameSettings {
    tilesetPath : string; // path to the image file
    tilesetWidth : number; // width of the image file  
    tilesetHeight : number; // height of the image file
    tilesetTileWidth : number; // width of one tile
    tilesetTileHeight : number; // height of one tile
    canvasHeight : number; // height of the game canvas in tiles
    canvasWidth : number; // width of the game canvas in tiles
}

class Game {
    public tileset : Tileset;
    public canvas : Canvas;
    public debug : Debug;
    public input : InputHandler;

    settings : GameSettings;

    constructor(settings : GameSettings) {
        this.settings = settings;
    }

    intialize() : void{
        this.tileset = this.createTileset();
        this.canvas = this.createCanvas();
        this.debug = new Debug();
        this.input = new InputHandler(this.canvas.canvas);
    }

    createTileset() : Tileset {
        let tilesetImage : HTMLImageElement = document.createElement("img");
        tilesetImage.src = this.settings.tilesetPath;
        tilesetImage.width = this.settings.tilesetWidth;
        tilesetImage.height = this.settings.tilesetHeight;

        return new Tileset(tilesetImage, this.settings.tilesetTileWidth, this.settings.tilesetTileHeight);
    }

    createCanvas() : Canvas {
        return new Canvas(this.settings.canvasWidth, this.settings.canvasHeight);
    }
}