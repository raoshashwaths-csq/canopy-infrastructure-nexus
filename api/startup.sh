#!/bin/bash
# CIN Backend Startup Script
echo "Starting CIN API..."
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
