# Use an official Python runtime as a parent image
FROM python:3.11-slim

# Set the working directory in the container
WORKDIR /app

# Install pipenv
RUN pip install pipenv

# Copy Pipfile and Pipfile.lock
COPY Pipfile Pipfile.lock ./

# Install dependencies
RUN pipenv install --deploy --ignore-pipfile

# If you have a requirements.txt, you can use the following lines to install them as well
COPY requirements.txt .
RUN pipenv run pip install -r requirements.txt

# Copy the rest of the application's code
COPY . .

# Expose port 8000 to the outside world
EXPOSE 8000

# Run the application
CMD ["pipenv", "run", "uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
