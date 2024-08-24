from fastapi import FastAPI
from routers import cf

app = FastAPI()


@app.get("/")
def read_root():
    return {
        "message": "Welcome to the SwiftDNS xAPI",
    }

# Include the Cloudflare router
app.include_router(cf.router, prefix="/cf")
