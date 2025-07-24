#!/bin/bash

# Activate virtual environment
source venv/bin/activate

# Install dependencies if needed
pip install -r requirements.txt

# Start the FastAPI server
python main.py 