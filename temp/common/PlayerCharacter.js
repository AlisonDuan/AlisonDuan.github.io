import nengi from 'nengi'

class PlayerCharacter {
    constructor() {
        this.x = 50
        this.y = 50
    }
}

PlayerCharacter.protocol = {
    x: { type: nengi.Number, interp: true },
    y: { type: nengi.Number, interp: true }
}

export default PlayerCharacter
