    Last updated on: 16th October 2023

<div align=center>
    <a href="https://sociodotblog.vercel.app/">
        <img width="702" src="https://i.ibb.co/gTdpzhp/Screenshot-2023-10-16-112011.png" alt="sociopedia">
    </a>
</div>

# [SocioDot: A Blog Web-App](https://sociodotblog.vercel.app/)

![line]

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack Used](#tech-stack-used)
- [Installation](#installation)
- [Preview](#preview)

![line]

## Introduction

- SocioDot is a full-stack blog application that allows users to connect with others, share posts, upload images,  comment, view other's blogs, The project utilizes and incorporates full-stack authentication and authorization.

![line]

## Features

- **User Authentication**: Users can create an account, log in, and log out securely. This ensures that user data and interactions are protected.

- **User Authorization**: Proper authorization mechanisms are implemented to ensure that users can only access and modify their own data. This prevents unauthorized access and protects user privacy.

- **Post Creation**: Users can create and publish posts, including text descriptions and optional image attachments. This allows users to share their thoughts, experiences, and media content with others.

- **Image Upload**: Users can upload images to accompany their posts. The application handles image uploads securely and efficiently, allowing users to enrich their posts with visuals.

- **Comment Functionality**: Users can comment on blogs to engage in conversations and show appreciation for shared content. This fosters social interaction and community engagement within the application.

![line]

## Tech Stack Used

- MongoDB: Database
- Express: Back-End Framework
- Next.js: Front-End Framework
- Node.js: Back-End Runtime
- JWT: Authentication
- Image Upload: Cloudinary API
- Git & Github: Version Control
- Vercel: Frontend Hosting
- Digital Ocean: Back-End Web Services

![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge) ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)  ![JWT](https://img.shields.io/badge/json%20web%20tokens-323330?style=for-the-badge&logo=json-web-tokens&logoColor=pink) ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white) 


![line]

## Installation

To set up and run the SocioDot application locally, follow these steps:

- Clone the repository:

      git clone https://github.com/your-username/SocialDot.git
    
- Install the dependencies in both the client-side and server-side directories:

      cd SocioDot/Frontend
      npm install

      cd ../Backend
      npm install
  
- Configuration 

Create a .env file in the server directory and provide the necessary environment variables, such as the MongoDB connection URL and the desired port number:

      MONGO_URL=your_mongodb_connection_url
      PORT= your-port (e.g: 3001)

- Starting the Application ▶️

Start the Backend:

      cd ../Backend
      nodemon Server.js

Start the Frontend:

      cd ../Frontend
      npm run dev

- Access the application 🌍

Open your web browser and visit `http://localhost:your_port(e.g: 3000)` to access the SocioDot

Please refer to the project's documentation or README files for detailed instructions on setting up and running the application locally.

![line]


## Preview
[badges]: https://github.com/Ileriayo/markdown-badges
