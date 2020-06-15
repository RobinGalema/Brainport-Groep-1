# Application

## Discription

This is the central application prototype. This NodeJS application is meant to be ran on the mini-museum to controll all the smaller applications from a admin side as well as a public side (the screens on the museum). For this prototype the screens on the museum will be represented as seperate URLs of the server with each URL getting its own screen when integrated in the real museum

## Downloading and installing

The application can be downloaded by just downloading this repository and unzipping the .zip file or cloning the repo to your local pc.
After downloading and unzipping nothing additional needs to be installed if you already have NodeJS installed on your machine. If not follow to the "Requirements" section.

## Requirements

The only thing required to run this application is for NodeJs to be installed to run the node command. If you don't have NodeJs installed on your machine you can download it by following this link to the official NodeJs download page: https://nodejs.org/en/download/

## Running the Application

To run the project you need to run the server.js file with node. To do this open a terminal window or the terminal in your code editor and navigate to the folder containing the "server.js" file.

Then run the server with the following command; "node server.js".


````shell

F:\Robin\Projects\Brainport Eindhoven\Brainport-Groep-1\Application> node server.js

````

This will start a local server with port 8000. To open the application you can navigate to "http://localhost:8000/" and you will be greeted by a dashboard containing links to the individual parts of the application.


## Navigating

All the public side screens can be accesed through the dashboard running on "http://localhost:8000/". From here you can navigate to the following pages:

- Brainport Maps (http://localhost:8000/Maps)
- Video Screen (http://localhost:8000/Video)
- Hologram Display (http://localhost:8000/Hologram)
- Job Offers (http://localhost:8000/Vacatures)

### The admin side

To get to the admin side of the application you need to go the page "http://localhost:8000/Admin". For now you can click the login button to get another dashboard containing the options for the admin side. Here you can choose the following pages:

- Hologram Dashboard (http://localhost:8000/Admin/holodash)
- Video Dashboard (http://localhost:8000/Admin/videodash) - Currently not functional and obsolete.

## Collaborators

**Robin Galema** - Owner GitHub Repo & Team member - https://github.com/RobinGalema  
**Thomas Dwarshuis** - Team member - https://github.com/ThomasHBOICT  
**Daan Bankers** - Team member - https://github.com/daanbankers1  
**Charly Vos** - Team member - https://github.com/Charlyvos  
**Nick Graus** - Team member - https://github.com/NickGraus
