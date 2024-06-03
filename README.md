# Full Stack REST API - SPA - CSV File Viewer - Monorepo w NPM Workspaces
![Portada](./frontend//public/img/Portada.PNG)
Web Application that allow users to upload CSV file with pre formated data and able to show those data as cards in the frontend, additionally able to filter in a search bar. This leads to a full stack project where the best practices in the RESTful API were showed.

## Built with
![Static Badge](https://img.shields.io/badge/HTML5-black?style=for-the-badge&logo=HTML5)<br>
![Static Badge](https://img.shields.io/badge/CSS-black?style=for-the-badge&logo=css3)<br>
![Static Badge](https://img.shields.io/badge/tailwind-black?style=for-the-badge&logo=tailwindcss)<br>
![Static Badge](https://img.shields.io/badge/Typescript-black?style=for-the-badge&logo=typescript) <br>
![Static Badge](https://img.shields.io/badge/React-black?style=for-the-badge&logo=react) <br>
![Static Badge](https://img.shields.io/badge/nodejs-black?style=for-the-badge&logo=nodedotjs) <br>
![Static Badge](https://img.shields.io/badge/express-black?style=for-the-badge&logo=express) <br>
![Static Badge](https://img.shields.io/badge/npm-black?style=for-the-badge&logo=npm)<br>

## Overview
### Frontend
-SPA <br>
-NO Magic Strings to avoid make it more error-prone, and difficult to maintain as it evolves over time. 
<p align="center">
    <img src="./frontend/public/img/Magicstrings.PNG">
</p>
-Search bar to find/filter the results we want(id, name, email, etc...).<br>
<p align="center">
    <img src="./frontend/public/img/searchbar.PNG">
</p>
-Sooner package for toast component to make it friendly the errors.<br>
-window.history.pushState() used to modify the search history without reaload the browser and make it more friendly and efficient to the user.

### Backend
-RESTful API.<br>
-Best practices for the API, accept (in this case since it's a file first we have to check the buffer then convert csv to json) and response with JSON, naming conventions, allowing filtering, handle errors gracefully and return standard error codes.<br>

<p align="center">
    <img src="./frontend/public/img/naming.PNG">
</p>
<p align="center">
    <img src="./frontend/public/img/jsonresponse.PNG">
</p>
-Multer middleware for handling multipart/form-data, for our csv file.<br>
-Part of Multer middleware, convert csv to json function to be able to recieve JSON and response with so to get stick to good practices.

## UI States

### Looking at our CSV file
Before selecting our file  let's see how it looks
<p align="center">
    <img src="./frontend/public/img/statebefore.PNG">
</p>

Now let's select our file
<p align="center">
    <img src="./frontend/public/img/statebefore2.PNG">
</p>

### After selecting a file
<p align="center">
    <img src="./frontend/public/img/state.PNG">
</p>
Now we are ready to hit the upload button and show the result but first...

### Uploading the file 
<p align="center">
    <img src="./frontend/public/img/state2.PNG">
</p>
The uploading state is now on scene.

### Showing the Cards with the result of the CSV
<p align="center">
    <img src="./frontend/public/img/state3.PNG">
</p>
All the results are listed as a card, each inside a div with all the information.

### Toasts
File uploaded successfully
<p align="center">
    <img src="./frontend/public/img/toast.PNG">
</p>
Error
<p align="center">
    <img src="./frontend/public/img/toast2.PNG">
</p>

## Filtering the data and window.history.pushState()
Filter by Number
<p align="center">
    <img src="./frontend/public/img/filter.PNG">
</p>
Filter by Name
<p align="center">
    <img src="./frontend/public/img/filter2.PNG">
</p>
Filter by Department Area
<p align="center">
    <img src="./frontend/public/img/filter3.PNG">
</p>
How pushState handles the searches
<p align="center">
    <img src="./frontend/public/img/hustory.PNG">
</p>