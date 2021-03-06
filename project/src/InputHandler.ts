class InputHandler {
    mouseX : number;
    mouseY : number;
    isMouseDown : boolean;
    canvas : HTMLCanvasElement;
    listeners : CInput[];
    keyMap : {[key : string] : boolean}; // tracks which keys are down

    constructor(canvas : HTMLCanvasElement) {
        this.canvas = canvas;
        this.listeners = [];
        this.keyMap = {}

        this.hookUpEvents();
    }

    private hookUpEvents() {
        document.onkeyup = this.onKeyUp.bind(this);
        document.onkeydown = this.onKeyDown.bind(this);
        this.canvas.onclick = this.onClick.bind(this);
        this.canvas.onmousedown = this.onMouseDown.bind(this);
        this.canvas.onmouseup = this.onMouseUp.bind(this);
        this.canvas.onmouseenter = this.onMouseEnter.bind(this);
        this.canvas.onmouseleave = this.onMouseLeave.bind(this);
        this.canvas.onmousemove = this.onMouseMove.bind(this);
    }

    public addListener(cInput : CInput) {
        this.listeners.push(cInput);
    }

    public removeListener(cInput : CInput) {
        let index : number = this.listeners.indexOf(cInput);
        if (index !== -1) {
            this.listeners.splice(index, 1);
        }
    }

    // events:

    private onKeyUp(event : KeyboardEvent) {
        for(let cInput of this.listeners) {
            cInput.onKeyPress(event.key);
        }
        this.updateButtonState(event.key, false);
    }

    private onKeyDown(event : KeyboardEvent) {
        for(let cInput of this.listeners) {
        }
        this.updateButtonState(event.key, true);
    }

    private updateButtonState(key : string, newState : boolean) {
        this.keyMap[key] = newState;
    }
    
    private onClick(event : MouseEvent) {
        let x = event.offsetX * this.canvas.width / this.canvas.offsetWidth;
        let y = event.offsetY * this.canvas.height / this.canvas.offsetHeight;
        for(let cInput of this.listeners) {
            cInput.onClick(x, y);
        }
    }

    private onMouseDown() {
        this.isMouseDown = true;
    }

    private onMouseUp() {
        this.isMouseDown = false;
    }

    private onMouseEnter() {
        //stub
    }

    private onMouseLeave() {
        this.isMouseDown = false;
    }

    private onMouseMove() {
        //stub
    }

    public isDown(key : string) {
        return this.keyMap[key]? true : false; // covers false and undefined
    }
}