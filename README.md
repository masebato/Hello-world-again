# Running the application with Docker

## Requirements

- [Docker](https://www.docker.com/)
- [docker-compose](https://docs.docker.com/compose/) (optional)
- A .env file with the following environment variables:

  - API_TARGET=
  - PUB_KEY_TEST=
  - PRIV_KEY_TEST=
  - USER_DB=root
  - PASS_DB=root
  - HOST_DB=localhost
  - NAME_DB=TRIPS

## Steps

1. Clone this repository and access the project folder.
2. Create a .env file in the root of the project.
3. Build the Docker image using the command `docker build -t my-app .`
4. Run the container using the command `docker run -p 3000:3000 -d my-app`
5. Access the application in the browser at the address `http://localhost:3000`
