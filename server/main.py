import websockets
import asyncio

async def client_handler(connection, path):
    print(f"client {id(connection)} connected at {path}")

async def main():
    async with websockets.serve(client_handler, "0.0.0.0", 12345):
        await asyncio.Future()

asyncio.run(main())