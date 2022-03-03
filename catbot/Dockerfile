FROM node:16 as development
RUN useradd -s /bin/bash -m vscode \
 && groupadd docker \
 && usermod -aG docker vscode
USER vscode
COPY package*.json ./
RUN npm install
COPY . .
CMD [ "node", "server.js" ]