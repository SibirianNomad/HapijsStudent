import * as main from './server'

;(async function (): Promise<void> {
  try {
    const server = await main.createServer()

    // Запускаем сервер
    await server.start()
    server.log('info', `Server running at: ${server.info.uri}`)
  } catch (e) {
    console.error(e)
  }
})()
