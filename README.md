# AIPPTBuilder Frontend

**AIPPTBuilder Frontend** is an AI-powered platform that enables users to develop PowerPoint presentations using advanced **Large Language Models (LLMs)**. The platform automates the process of creating slides, generating content based on user input, and organizing information into well-structured PowerPoint presentations, making it an ideal tool for educators, professionals, and content creators.

Developed by **Wilfredo Aaron Sosa Ramos**, this application is deployed on **Vercel** and integrates with a backend API to provide intelligent and dynamic content generation. Built with a robust tech stack, the platform ensures an intuitive and seamless user experience.

## Table of Contents

- [1. Features](#1-features)
- [2. How it Works](#2-how-it-works)
- [3. Technologies Used](#3-technologies-used)
- [4. Environment Variables](#4-environment-variables)
- [5. Installation Guide](#5-installation-guide)
- [6. How to Use](#6-how-to-use)

---

## 1. Features

**AIPPTBuilder Frontend** offers a variety of features aimed at simplifying the process of PowerPoint creation through AI. These features include:

- **AI-Driven Slide Creation**: Automatically generate PowerPoint slides based on user input and specific topics.
- **Content Structuring**: Organize and structure content into appropriate slide formats, ensuring professional and coherent presentations.
- **Slide Customization**: Modify and customize the slides generated by AI, including titles, bullet points, images, and formatting.
- **Template Support**: Use pre-designed templates for fast and efficient PowerPoint creation, or create custom templates as needed.
- **Real-Time Feedback**: Receive suggestions and optimizations from the AI model to enhance presentation quality.

These features make it easy for users to create detailed, organized, and professional presentations with minimal effort, leveraging the power of LLMs for content generation and structuring.

---

## 2. How it Works

The **AIPPTBuilder Frontend** platform works by integrating with powerful LLMs that understand the input provided by users and generate corresponding slides with relevant content. Here’s a high-level overview of how the platform works:

1. **User Input**: The user provides a topic, key points, or a general description of the presentation they want to create.
2. **AI Slide Generation**: The LLM processes the input and generates structured slides, including text, titles, and bullet points.
3. **Customization**: The user can customize each slide, making adjustments to the content, format, or design as needed.
4. **Downloadable PPT**: Once the slides are generated and customized, users can download the presentation in PowerPoint format.

The platform provides real-time feedback and suggestions to improve the presentation, ensuring that the content is aligned with the user’s goals and the audience’s expectations.

---

## 3. Technologies Used

The **AIPPTBuilder Frontend** is built using a modern tech stack to ensure high performance, scalability, and ease of use. The key technologies used include:

- **NextJS**: A React-based framework that provides server-side rendering and static site generation, ensuring fast performance and SEO benefits.
- **ShadCN**: Delivers reusable components and design patterns for creating a consistent and responsive user interface.
- **axios**: A promise-based HTTP client for making API requests to the backend, allowing seamless communication between the frontend and backend services.
- **react-markdown**: Enables rendering of markdown content within React components, which is useful for displaying formatted text, bullet points, and slide content.
- **zod**: A schema declaration and validation library used to ensure input validation, integrated with **react-hook-form** for managing and validating form data.
- **react-hook-form**: Simplifies form handling and validation, making it easier to manage user inputs for creating and customizing slides.
- **@hookform/resolvers**: Connects **react-hook-form** with **zod**, ensuring smooth validation logic for user inputs.
- **react-toastify**: Provides real-time notifications, such as success or error messages, to enhance user feedback and interactivity.
- **Tailwind CSS**: A utility-first CSS framework used to create custom, responsive designs, ensuring a visually appealing user interface.
- **Async Management**: Ensures efficient handling of asynchronous operations, including API requests and data fetching, improving the responsiveness of the platform.

---

## 4. Environment Variables

The **AIPPTBuilder Frontend** requires the following environment variables to be configured for proper API integration:

- **NEXT_PUBLIC_API_BASE_URL**: The base URL of the backend API that powers the AI-driven PowerPoint generation service.
- **NEXT_PUBLIC_API_KEY**: The API key used to authenticate requests to the backend services.

An example `.env.local` file configuration would look like this:

```env
NEXT_PUBLIC_API_BASE_URL=https://api.aipptbuilder.com
NEXT_PUBLIC_API_KEY=your_api_key_here
```


Ensure that you replace `your_api_key_here` with the actual API key provided by the backend.

---

## 5. Installation Guide

Follow these steps to set up and run the **AIPPTBuilder Frontend** locally:

1. **Clone the repository**:
   - Clone the repository to your local machine using the following command:
     ```
     git clone https://github.com/yourusername/AIPPTBuilderFrontend.git
     ```

2. **Navigate to the project directory**:
   - Move into the project folder:
     ```
     cd AIPPTBuilderFrontend
     ```

3. **Install dependencies**:
   - Install the required packages using npm or yarn:
     ```
     npm install
     ```

4. **Set up environment variables**:
   - Create a `.env.local` file in the root directory of the project and configure the environment variables:
     ```
     NEXT_PUBLIC_API_BASE_URL=https://api.aipptbuilder.com
     NEXT_PUBLIC_API_KEY=your_api_key_here
     ```

5. **Run the development server**:
   - Start the application locally:
     ```
     npm run dev
     ```

6. **Build for production**:
   - To build the application for production deployment:
     ```
     npm run build
     ```

7. **Deploy**:
   - The application is deployed on **Vercel**. To deploy your own version, push the code to a Git repository connected to Vercel, or follow the deployment instructions provided by Vercel.

---

## 6. How to Use

Once the **AIPPTBuilder Frontend** is set up, you can begin creating AI-generated PowerPoint presentations by following these steps:

1. **Provide Input**:
   - Enter the topic or key points for your presentation in the designated input fields. The AI model will process this information to generate relevant slide content.
   
2. **Customize Slides**:
   - Once the slides are generated, you can customize them by adding or editing titles, text, bullet points, and other content. Use the real-time preview to see the changes as you make them.

3. **Download the Presentation**:
   - After finalizing the content, you can download the presentation in PPT format, ready for use in meetings, classes, or presentations.

4. **Receive Real-Time Feedback**:
   - The platform provides real-time feedback via **react-toastify**, notifying you of successful actions or alerting you to any issues that may arise during slide generation or customization.

---

With **AIPPTBuilder Frontend**, users can easily create professional PowerPoint presentations using AI-driven content generation, making it an invaluable tool for educators, business professionals, and content creators.
