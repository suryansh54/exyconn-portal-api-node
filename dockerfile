FROM node:14.4
WORKDIR /authentication-apis
COPY ./ ./
RUN npm install
CMD [ "/bin/bash" ]