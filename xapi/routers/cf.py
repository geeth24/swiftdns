from fastapi import APIRouter, Header, Body, HTTPException
from pydantic import BaseModel
from typing import Optional
from utils.cf import get_cloudflare_client, verify_token as verify_cf_token
import datetime
from cloudflare import NOT_GIVEN

router = APIRouter()


@router.get("/verify")
def verify_token(
    api_token: str = Header(
        None, alias="api-token", description="API token for Cloudflare"
    )
):
    if not api_token:
        raise HTTPException(status_code=400, detail="API token is required")

    response = verify_cf_token(api_token)
    return response


@router.get("/user")
def read_user(
    api_email: str = Header(
        None, alias="api-email", description="API email for Cloudflare"
    ),
    api_key: str = Header(None, alias="api-key", description="API key for Cloudflare"),
):
    if not api_email or not api_key:
        raise HTTPException(status_code=400, detail="API email and key are required")

    client = get_cloudflare_client(api_email=api_email, api_key=api_key)
    user = client.user.get()
    return user


@router.get("/user/tokens")
def read_tokens(
    api_email: str = Header(
        None, alias="api-email", description="API email for Cloudflare"
    ),
    api_key: str = Header(None, alias="api-key", description="API key for Cloudflare"),
):
    if not api_email or not api_key:
        raise HTTPException(status_code=400, detail="API email and key are required")

    client = get_cloudflare_client(api_email=api_email, api_key=api_key)
    tokens = client.user.tokens.list()
    return tokens.result


@router.post("/user/tokens")
def create_token(
    api_email: str = Header(
        None, alias="api-email", description="API email for Cloudflare"
    ),
    api_key: str = Header(None, alias="api-key", description="API key for Cloudflare"),
):
    if not api_email or not api_key:
        raise HTTPException(status_code=400, detail="API email and key are required")

    client = get_cloudflare_client(api_email=api_email, api_key=api_key)
    try:
        response = client.user.tokens.create(
            name=f"SwiftDNS API Token {datetime.datetime.now()}",
            policies=[
                {
                    "effect": "allow",
                    "resources": {"com.cloudflare.api.account.zone.*": "*"},
                    "permission_groups": [
                        {"id": "82e64a83756745bbbb1c9c2701bf816b", "name": "DNS Read"},
                        {"id": "4755a26eedb94da69e1066d98aa820be", "name": "DNS Write"},
                    ],
                }
            ],
            not_before=None,
            expires_on=(
                datetime.datetime.now(datetime.timezone.utc)
                + datetime.timedelta(days=365)
            ).strftime("%Y-%m-%dT%H:%M:%SZ"),
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Cloudflare API error: {e}")

    return response


@router.get("/zones")
def read_zones(
    api_token: str = Header(
        None, alias="api-token", description="API token for Cloudflare"
    )
):
    if not api_token:
        raise HTTPException(status_code=400, detail="API token is required")

    response = verify_cf_token(api_token=api_token, boolResponse=True)
    if not response:
        raise HTTPException(status_code=401, detail="Invalid API token")

    client = get_cloudflare_client(api_token=api_token)
    zones = client.zones.list()
    return zones.result


class Record(BaseModel):
    type: str
    name: str
    content: str
    id: Optional[str] = None
    comment: Optional[str] = None
    proxied: Optional[bool] = None
    tags: Optional[list] = None
    ttl: Optional[int] = None


@router.post("/zones/{zone_id}/dns_records")
def create_record(
    zone_id: str,
    record: Record = Body(
        description="DNS record to create",
        example={"type": "A", "name": "example.com", "content": "127.0.0.1"},
    ),
    api_token: str = Header(
        None, alias="api-token", description="API token for Cloudflare"
    ),
):
    client = get_cloudflare_client(api_token=api_token)

    response = client.dns.records.create(
        zone_id=zone_id,
        type=record.type,
        name=record.name,
        content=record.content,
        id=record.id or NOT_GIVEN,
        comment=record.comment or NOT_GIVEN,
        proxied=record.proxied or NOT_GIVEN,
        tags=record.tags or NOT_GIVEN,
        ttl=record.ttl or NOT_GIVEN,
    )

    return response


@router.get("/zones/{zone_id}/dns_records")
def read_records(
    zone_id: str,
    api_token: str = Header(
        None, alias="api-token", description="API token for Cloudflare"
    ),
):
    client = get_cloudflare_client(api_token=api_token)
    records = client.dns.records.list(zone_id=zone_id)
    return records.result
