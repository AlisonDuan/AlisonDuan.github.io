import nengi from 'nengi'
import nengiConfig from '../common/nengiConfig.js'
import instanceHookAPI from './instanceHookAPI.js'
import NetLog from '../common/NetLog.js'
import PlayerCharacter from '../common/PlayerCharacter.js'

const instance = new nengi.Instance(nengiConfig, { port: 8079 })
instanceHookAPI(instance)

const entities = new Map()
/* serverside state here */

instance.on('connect', ({ client, callback }) => {
    /* client init logic & state can go here */
    callback({ accepted: true, text: 'Welcome!' })
    instance.message(new NetLog('hello world'), client)
    const entity = new PlayerCharacter()
    instance.addEntity(entity)
    entities.set(entity.nid, entity)
    client.entity = entity
})

instance.on('disconnect', client => {
    // disconnected
    entities.delete(client.entity.nid)
    instance.removeEntity(client.entity)
})

instance.on('command::PlayerInput', ({ command, client }) => {
    const { up, down, left, right, delta } = command
    const { entity } = client
    const speed = 200
    if (up) {
        entity.y -= speed * delta
    }
    if (down) {
        entity.y += speed * delta
    }
    if (left) {
        entity.x -= speed * delta
    }
    if (right) {
        entity.x += speed * delta
    }
})
/* on('command::AnyCommand', ({ command, client }) => { }) */

const update = (delta, tick, now) => {
    instance.emitCommands()
    /* serverside logic can go here */

    instance.update()
}

export {
    update
}
