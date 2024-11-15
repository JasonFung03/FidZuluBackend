FROM mcr.microsoft.com/windows/servercore:ltsc2022 as installer

SHELL ["powershell", "-Command", "$ErrorActionPreference = 'Stop';$ProgressPreference='silentlyContinue';"]


RUN Invoke-WebRequest -OutFile nodejs.zip -UseBasicParsing "https://nodejs.org/dist/v18.10.0/node-v18.10.0-win-x64.zip"; Expand-Archive nodejs.zip -DestinationPath C:\; Rename-Item "C:\\node-v18.10.0-win-x64" c:\nodejs

FROM mcr.microsoft.com/windows/nanoserver:ltsc2022

WORKDIR C:/nodejs
COPY --from=installer C:/nodejs/ .
RUN SETX PATH C:\nodejs
RUN npm config set registry https://registry.npmjs.org/

WORKDIR /app
COPY package.json /app/
RUN npm install
COPY A /app/A
COPY B /app/B
CMD ["npm", "run", "start"]