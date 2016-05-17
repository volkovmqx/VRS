import tornado.ioloop
import tornado.web
import serial

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.write("Hello, world")

class VReality(tornado.web.RequestHandler):
    ser = serial.Serial('/dev/ttyUSB0', 9600)
    def post(self):
        movement = self.get_argument('movement')
        self.ser.write(movement)
        self.write("Movement :  " + movement)

def make_app():
    return tornado.web.Application([
        (r"/", MainHandler),
        (r"/vr/", VReality),
    ])

if __name__ == "__main__":
    app = make_app()
    app.listen(8888)
    tornado.ioloop.IOLoop.current().start()
