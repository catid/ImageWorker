import logging

import tornado.escape
import tornado.ioloop
import tornado.options
import tornado.web
import tornado.websocket
from tornado.options import define, options
from tornado.httpserver import HTTPServer

import json


# Application parameters
define("port", default=8888, help="run on the given port", type=int)


# Request for swarm status
def on_status():
    ws = []

    ws.append({
        "name": "gpu1",
        "rate": 28.3
    })
    ws.append({
        "name": "gpu2",
        "rate": 28.3
    })

    return json.dumps({
        "full_rate": 28.3,
        "workers": ws,
    })

# Request to generate images
def on_generate(prompt, count):
    # FIXME: Call Celery here
    return


class Application(tornado.web.Application):
    def __init__(self):
        handlers = [(r"/chatsocket", TornadoWebSocket)]
        super(Application, self).__init__(handlers)

class TornadoWebSocket(tornado.websocket.WebSocketHandler):
    clients = set()

    # enable cross domain origin
    def check_origin(self, origin):
        return True

    def open(self):
        TornadoWebSocket.clients.add(self)

    def on_close(self):
        TornadoWebSocket.clients.remove(self)

    def on_message(self, message):
        try:
            obj = json.loads(message)
            opcode = obj["opcode"]
            match opcode:
                case "status":
                    self.write_message(on_status())
                    return
                case "generate":
                    prompt = obj["prompt"]
                    count = obj["count"]
                    self.write_message(on_generate(prompt, count))
                    return
                case _:
                    self.write_message("unrecognized opcode")
                    return
        except ValueError:
            self.write_message("invalid input")
            return

def start_websockets():
    tornado.options.parse_command_line()
    app = Application()
    server = HTTPServer(app)
    server.listen(options.port)
    tornado.ioloop.IOLoop.current().start()

if __name__ == "__main__":
    start_websockets()
