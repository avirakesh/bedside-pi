# Use an official Python runtime as a parent image
FROM python:3.14-slim

# Set the working directory in the container
WORKDIR /app

# Install system dependencies required for python dev (e.g., for CPython symbols)
# as mentioned in the README: "For some dependencies (namely fastapi) you might need CPython symbols"
# We also install git, which is used for cloning
RUN apt-get update && apt-get install -y \
    python3-dev \
    git \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy the requirements file and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 8000

# Run the application
CMD ["fastapi", "run", "server.py", "--host", "0.0.0.0", "--port", "8000"]
