from fastapi import FastAPI
from routers import cf
from starlette.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {
        "message": "Welcome to the SwiftDNS xAPI",
    }

# Include the Cloudflare router
app.include_router(cf.router, prefix="/cf")

# Debugging Middleware
@app.middleware("http")
async def cors_debug(request, call_next):
    response = await call_next(request)
    print(f"Request: {request.method} {request.url} - CORS Headers: {response.headers}")
    return response
