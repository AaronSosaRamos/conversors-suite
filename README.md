# Conversors Suite

**Conversors Suite** is a web application designed to provide a range of conversion and formatting services. It supports essential tools such as **Markdown Conversor**, **JSON Formatter**, **JSON to SQL**, **XML to SQL**, **Math to LaTeX**, **Translator**, **Info to Table**, and **Image Transcription**. The application is built with modern web technologies to deliver high performance, scalability, and user-friendly interaction, making it suitable for various business and personal needs.

Developed by **Wilfredo Aaron Sosa Ramos**, this project integrates multiple APIs and tools to handle diverse conversion tasks efficiently. It is deployed on **Vercel**, ensuring easy accessibility and scalability.

## Table of Contents

- [1. Features](#1-features)
- [2. Conversion Services](#2-conversion-services)
- [3. Technologies Used](#3-technologies-used)
- [4. Environment Variables](#4-environment-variables)
- [5. Installation Guide](#5-installation-guide)
- [6. How to Use](#6-how-to-use)

---

## 1. Features

**Conversors Suite** offers a comprehensive set of tools for converting and formatting various data types. Key features include:

- **Markdown Conversor**: Converts Markdown content into HTML format, making it easy to render Markdown in websites or applications.
- **JSON Formatter**: Formats JSON data to ensure readability and proper structure.
- **JSON to SQL**: Transforms JSON input into SQL queries for various database systems such as MySQL, PostgreSQL, and SQLite.
- **XML to SQL**: Converts XML input into SQL statements, ensuring seamless data migration to relational databases.
- **Math to LaTeX**: Converts mathematical expressions into LaTeX format, ideal for academic and professional use.
- **Translator**: Provides multilingual translation services for text, powered by AI-based models.
- **Info to Table**: Extracts structured tables from unstructured data sources, such as text documents, and presents them in a tabular format.
- **Image Transcription**: Extracts text from images, including complex files like scanned documents or handwritten notes.

Each of these tools is designed to be highly performant and intuitive, making it easy for users to access a variety of data conversion and formatting services from a single interface.

---

## 2. Conversion Services

The **Conversors Suite** offers a diverse set of services to cater to multiple data conversion needs. Below are the supported services:

- **Markdown Conversor**: Users can input Markdown syntax, which is then converted into clean, responsive HTML, making it easier to integrate Markdown into web applications or presentations.
  
- **JSON Formatter**: A tool for formatting raw JSON data into a structured and readable format, ensuring proper indentation and validation.

- **JSON to SQL**: Converts JSON objects into SQL queries. This service supports multiple SQL dialects and provides robust handling of complex JSON structures for database integration.

- **XML to SQL**: Similar to the JSON to SQL service, this tool processes XML data and outputs corresponding SQL queries.

- **Math to LaTeX**: A specialized service that converts mathematical expressions into LaTeX format, allowing easy use in academic papers, presentations, or research documents.

- **Translator**: Converts text from one language to another, utilizing AI-powered translation engines for accuracy and reliability.

- **Info to Table**: Extracts information from unstructured text and arranges it into tabular format, simplifying data extraction and analysis.

- **Image Transcription**: This service transcribes text from images, supporting various file types such as PNG, JPG, and PDF, making it easy to extract data from physical or scanned documents.

These services are integrated into a unified interface, providing users with a convenient and powerful toolkit for diverse conversion tasks.

---

## 3. Technologies Used

The **Conversors Suite** is built using a modern tech stack that ensures high performance, flexibility, and scalability. Below are the primary technologies:

- **NextJS**: A React-based framework for server-side rendering and static site generation, enabling fast performance and SEO optimization.
  
- **ShadCN**: Provides a set of reusable components and utilities for creating consistent and responsive user interfaces.

- **axios**: A promise-based HTTP client used to handle API requests to the backend, ensuring smooth and efficient data retrieval.

- **react-markdown**: Allows the application to render Markdown content directly into React components, making it easier to work with Markdown-based inputs.

- **zod**: A schema-based validation library integrated with **react-hook-form**, ensuring reliable input validation.

- **react-hook-form**: Simplifies form management within React components, ensuring efficient validation and input handling.

- **@hookform/resolvers**: A utility that connects **zod** with **react-hook-form**, ensuring that form validation logic is seamless and effective.

- **react-toastify**: Provides user notifications for various events, such as successful form submissions or errors, enhancing the user experience with real-time feedback.

- **Tailwind CSS**: A utility-first CSS framework used for rapidly building custom, responsive user interfaces.

- **zustand**: A lightweight state management solution, used to manage global state within the application, ensuring smooth and efficient data handling.

- **Async management**: Utilizes JavaScript's async/await patterns to handle asynchronous operations, ensuring responsive and non-blocking user interactions.

This combination of technologies ensures that the application is fast, scalable, and easy to maintain, while providing an intuitive and responsive user experience.

---

## 4. Environment Variables

The **Conversors Suite** requires the following environment variables to interact with the backend API:

- **NEXT_PUBLIC_API_BASE_URL**: The base URL of the backend API that handles conversion services.
  
- **NEXT_PUBLIC_API_KEY**: The API key used for authenticating requests to the backend API.

These environment variables must be configured properly for the application to function correctly. Below is an example of the `.env.local` file:

```env
NEXT_PUBLIC_API_BASE_URL=https://api.conversorssuite.com
NEXT_PUBLIC_API_KEY=your_api_key_here
```


Ensure to replace `your_api_key_here` with the actual API key provided by the backend service.

---

## 5. Installation Guide

Follow the steps below to set up and run the **Conversors Suite** locally:

1. **Clone the repository**:
   - Download the project to your local machine using the following command:
     ```
     git clone https://github.com/yourusername/ConversorsSuite.git
     ```

2. **Navigate to the project directory**:
   - Enter the project folder:
     ```
     cd ConversorsSuite
     ```

3. **Install dependencies**:
   - Install the necessary packages using npm or yarn:
     ```
     npm install
     ```

4. **Set up environment variables**:
   - Create a `.env.local` file in the root directory and configure the environment variables:
     ```
     NEXT_PUBLIC_API_BASE_URL=https://api.conversorssuite.com
     NEXT_PUBLIC_API_KEY=your_api_key_here
     ```

5. **Run the development server**:
   - Start the application locally:
     ```
     npm run dev
     ```

6. **Build for production**:
   - To prepare the application for production deployment:
     ```
     npm run build
     ```

7. **Deploy**:
   - The application is deployed on **Vercel**. For custom deployments, push your code to a repository connected to Vercel or follow the instructions on Vercel’s platform.

---

## 6. How to Use

Once you’ve set up the **Conversors Suite**, you can use the application to access various conversion services:

1. **Choose a Service**:
   - Select one of the available services (e.g., Markdown Conversor, JSON Formatter, Math to LaTeX) from the home page or navigation menu.

2. **Input Data**:
   - Input your data into the designated form fields. Depending on the service, you can input text, upload files, or type directly into the form.

3. **Submit for Processing**:
   - Once you’ve provided the necessary input, submit the form. The application will send an API request to the backend for processing.

4. **Receive Output**:
   - The output from the conversion will be displayed in the interface. For example, if you use the **Markdown Conversor**, the converted HTML will be shown in real-time.

5. **Real-Time Notifications**:
   - The application provides feedback through notifications using **react-toastify**, informing you of successful conversions or any errors encountered during the process.

The user-friendly interface allows for seamless interaction with the various conversion tools, providing instant results for a range of business and personal needs.
