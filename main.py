from flask import Flask, render_template, url_for
from flask_socketio import SocketIO, emit

app = Flask(__name__)
socketio = SocketIO(app, async_mode=None)

@app.route("/")
def main():
    return render_template("index.html", sync_mode=socketio.async_mode)

@socketio.event()
def draw(data):
    emit("draw", data, broadcast=True, include_self=False)


if __name__ == "__main__":
    socketio.run(app, debug=True, host="0.0.0.0")