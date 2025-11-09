from fastapi import FastAPI
from app.routes import sms, incidents
app = FastAPI(title="Phoenix Centralized Server")

# sms stuff
app.include_router(sms.router)
# all incidents
app.include_router(incidents.router)

@app.get("/")
def root():
    return {"message": "Phoenix is live!"}
