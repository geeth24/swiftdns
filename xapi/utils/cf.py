from fastapi import HTTPException
from cloudflare import Cloudflare
import requests


def get_cloudflare_client(
    api_token: str = None, api_email: str = None, api_key: str = None
) -> Cloudflare:
    if api_token:
        return Cloudflare(api_token=api_token)
    elif api_email and api_key:
        return Cloudflare(api_email=api_email, api_key=api_key)
    else:
        raise HTTPException(
            status_code=400, detail="API token or API email and key are required"
        )


def verify_token(api_token: str, boolResponse=False):
    headers = {
        "Authorization": f"Bearer {api_token}",
        "Content-Type": "application/json",
    }
    response = requests.get(
        "https://api.cloudflare.com/client/v4/user/tokens/verify", headers=headers
    )
    if boolResponse:
        return response.ok
    return response.json()
