from typing import List, Optional
from langchain.tools import tool
from pydantic import BaseModel, Field

# Mock data for demonstration
MOCK_ACCOUNT_DATA = {
    "cost": "$1,250.40",
    "conversions": 42,
    "cpa": "$29.77",
    "roas": "3.8x",
    "clicks": "12,400",
    "impressions": "250,000"
}

@tool
def get_account_overview(date_range: str):
    """Returns a high-level performance summary for a Google Ads account.
    Format of date_range: YYYY-MM-DD to YYYY-MM-DD
    """
    return {
        "status": "success",
        "data": MOCK_ACCOUNT_DATA,
        "period": date_range,
        "insight": "Account performance is stable with a slight increase in ROAS compared to previous period."
    }

@tool
def get_campaign_metrics(date_range: str, campaign_ids: Optional[List[str]] = None):
    """Fetches performance metrics for campaigns."""
    return [
        {
            "id": "123",
            "name": "Summer Sale 2024",
            "clicks": 4500,
            "conversions": 120,
            "cost": 850.0,
            "status": "Enabled"
        },
        {
            "id": "456",
            "name": "Brand Search - Global",
            "clicks": 1200,
            "conversions": 85,
            "cost": 320.0,
            "status": "Enabled"
        }
    ]

@tool
def get_search_terms(campaign_id: str, date_range: str, min_spend: float = 0.0):
    """Returns search terms with performance metrics."""
    return [
        {"term": "buy sneakers online", "clicks": 120, "cost": 45.0, "conversions": 12},
        {"term": "running shoes reviews", "clicks": 80, "cost": 20.0, "conversions": 4},
        {"term": "best athletic footwear", "clicks": 50, "cost": 35.0, "conversions": 0}
    ]

@tool
def get_keywords(ad_group_id: str, date_range: str):
    """Fetches keyword-level performance data."""
    return [
        {"keyword": "sneakers", "match_type": "Broad", "clicks": 500, "conversions": 25},
        {"keyword": "+buy +running +shoes", "match_type": "Phrase", "clicks": 200, "conversions": 15}
    ]

@tool
def get_ads(ad_group_id: str, date_range: str):
    """Returns ad creatives and their performance metrics."""
    return [
        {
            "id": "ad1",
            "type": "RSA",
            "headlines": ["Buy Quality Sneakers", "Best Running Shoes 2024"],
            "descriptions": ["Fast shipping on all orders.", "Shop our new collection today!"],
            "clicks": 300,
            "conversions": 12
        }
    ]

@tool
def generate_ad_copy(industry: str, objective: str, location: str = "Worldwide", tone: str = "professional", landing_page_summary: str = ""):
    """Generates Google Search ad copy compliant with Responsive Search Ad (RSA) rules.
    Objective must be one of: traffic, leads, sales.
    Tone must be one of: professional, friendly, luxury, direct.
    """
    return {
        "headlines": [
            f"Expert {industry} Solutions",
            f"Grow Your {industry} Business",
            "Get a Free Quote Today",
            f"Leading {industry} Services",
            "Trusted by 10k+ Customers"
        ],
        "descriptions": [
            f"Professional {industry} services tailored for your needs in {location}.",
            f"Increase your {objective} with our expert strategies. Contact us now!"
        ],
        "compliance_check": "RSA compliant: All headlines under 30 characters, descriptions under 90 characters."
    }

@tool
def generate_weekly_report(date_range: str, audience: str):
    """Creates a plain-English Google Ads performance summary.
    Audience must be: internal, client.
    """
    return f"Weekly Report ({date_range}): The account saw a 12% increase in conversions while maintaining the same budget. CPA decreased by 5% due to better keyword targeting in the Brand Search campaign."

ALL_TOOLS = [
    get_account_overview,
    get_campaign_metrics,
    get_search_terms,
    get_keywords,
    get_ads,
    generate_ad_copy,
    generate_weekly_report
]
