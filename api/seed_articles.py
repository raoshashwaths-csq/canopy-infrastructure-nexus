#!/usr/bin/env python3
"""
CIN Article Seeding Script
Run manually to populate the knowledge base with historical documents.
"""
import asyncio

async def seed():
    print("Seeding historical documents...")
    # In production, this would call the API
    print("Done. Use POST /library/seed-historical via the API.")

if __name__ == "__main__":
    asyncio.run(seed())
