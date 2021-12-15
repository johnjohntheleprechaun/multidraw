import websockets
import asyncio
import json

clients = []

async def client_handler(connection, path):
    print(f"client {id(connection)} connected at {path}")
    clients.append(connection)
    try:
        while True:
            message = await connection.recv()
            await broadcast(message, connection)
    except websockets.exceptions.ConnectionClosed:
        print("client disconnected")
        clients.remove(connection)

async def broadcast(data: str, sender):
    for client in clients:
        if client != sender:
            await client.send(data)

async def main():
    async with websockets.serve(client_handler, "0.0.0.0", 12345):
        await asyncio.Future()

asyncio.run(main())