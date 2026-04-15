# Stage 1: Base build stage
FROM python:3.12-slim AS builder

# Create the app directory
RUN mkdir /app

# Set working directory
WORKDIR /app

# Set environment variables to optimize Python 
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install dependencies first (caching benefit)
RUN pip install --upgrade pip
COPY requirements.txt /app
RUN pip install --no-cache-dir -r requirements.txt

# Stage 2: Production stage (reduce image size)
FROM python:3.12-slim

# Create a non-root user, set up the app directory, and switch to that user
RUN useradd -m -r appuser && \
    mkdir /app && \
    chown -R appuser /app

# Copy the Python dependencies from the builder stage
COPY --from=builder /usr/local/lib/python3.12/site-packages /usr/local/lib/python3.12/site-packages
COPY --from=builder /usr/local/bin /usr/local/bin

# Set working directory
WORKDIR /app

# Copy the application code 
COPY --chown=appuser:appuser . .

# Set environment variables to optimize Python 
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Switch to the non-root user
USER appuser

# Expose the port the app runs on
EXPOSE 8000 

# Make entrypoint script executable and run the application
RUN chmod +x entrypoint.sh

CMD [ "/app/entrypoint.sh" ]