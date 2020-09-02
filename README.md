# NAT-Prot API's

### Installation Process
- Clone the repository using https://github.com/suryansh54/NatProt-apis/invitations
- Inside the **NatProt-apis** folder run `npm install`
- After installation of all dependencies run `npm run dev` to build the project
- Go to http://localhost:3000


### Swagger URL
http://localhost:3000/api-docs

### Docker File
- docker build -t apicontainer . 
- docker run -it apicontainer

### Docker Compose Commands
- docker-compose build
- docker-compose run authentication-apis
- docker-compose up --build