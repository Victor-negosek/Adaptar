# Base python image
FROM python:3.8.2

# Set working dir
WORKDIR /backend

# Copy requirements.txt to docker container
COPY requirements.txt requirements.txt

# Install packages from requirements.txt on docker container
RUN pip3 install -r requirements.txt

# Add app file
COPY . .

# Run API
CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]
