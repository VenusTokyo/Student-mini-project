# Student Enrollment Form ✨
## Project Description:
The Student Enrollment Form is a web-based application that allows users to input and store student enrollment data in the "STUDENT-TABLE" relation of the "SCHOOL-DB" database. The form includes fields for Roll Number, Full Name, Class, Birth Date, Address, and Enrollment Date. The Roll Number serves as the primary key for the database.
## Preview 🖼️
![image](https://github.com/VenusTokyo/Student-mini-project/assets/66830887/5faf2d9e-9ffe-4d43-9c98-ef234b0c16de)


## Features:

### Page Load and Control Button Behavior:

On page load or any control button click, an empty form will be displayed, and the cursor will be focused on the Roll Number field, which is the primary key in the relation.
All other fields and buttons will be disabled initially.
### Data Entry:

Users can enter data in the Roll Number field. If the entered Roll Number is not present in the database, the Save and Reset buttons will be enabled, and the cursor will move to the next field, allowing the user to enter data in the form.
Users must provide valid data in all fields (no empty fields).
### Saving Data:

After completing the data entry form, users can click the Save button to store the data in the database.
If the Roll Number already exists in the database, the form will display the existing data and enable the Update and Reset buttons, allowing the user to make changes.
### Updating Data:

If the Roll Number exists in the database and the user makes changes to the form fields, they can click the Update button to update the data in the database.
### Resetting the Form:

Clicking the Reset button will reset the form to its initial state after saving or updating the data.

## Database Schema:
The database schema for the "SCHOOL-DB" will include a table named "STUDENT-TABLE" with the following columns:

Roll No (Primary Key)
Full Name
Class
Birth Date
Address
Enrollment Date
## Technologies Used:
The Student Enrollment Form is implemented using web technologies, including:

Frontend: HTML, CSS, JavaScript

Database: JsonPowerDB

## Benefits of useing JsonPowerDB

_JsonPowerDB_ is a lightweight, flexible, and developer-friendly NoSQL database that offers several benefits for application development. Here are some of the key benefits of using JsonPowerDB:

_Simplicity and Ease of Use_: JsonPowerDB follows a schema-free architecture, which means developers don't need to define a fixed data structure beforehand. This simplicity makes it easy for developers to start working with the database without much configuration or setup.

_High Performance_: JsonPowerDB is designed for high-performance operations, providing fast read and write operations. It uses a unique indexing mechanism, "PowerIndex," which enables efficient query execution and retrieval of data.

_Real-time Data Synchronization_: JsonPowerDB supports real-time data synchronization, ensuring that changes made in the database are instantly reflected across all connected devices or clients. This feature is particularly useful for building real-time applications and collaboration tools.

_Serverless Architecture_: JsonPowerDB supports a serverless architecture, eliminating the need for dedicated server management. This reduces infrastructure costs and simplifies deployment and scaling of applications.

_Built-in REST API_: JsonPowerDB comes with a built-in REST API, allowing developers to interact with the database using standard HTTP methods. This API-centric approach makes it easy to integrate JsonPowerDB with various programming languages and platforms.

_Multi-mode Database_: JsonPowerDB is a multi-mode database, meaning it supports multiple data models (e.g., document, key-value, graph) within a single database. This flexibility allows developers to choose the data model that best fits their application requirements.

_In-memory Database Support_: JsonPowerDB can operate in in-memory mode, which improves performance for read-intensive workloads by keeping frequently accessed data in memory.

_Cost-effective Solution_: JsonPowerDB's serverless architecture and low maintenance requirements result in cost savings for businesses, especially for startups and small-to-medium-sized projects.

_Multi-platform Support_: JsonPowerDB is platform-independent, meaning it can be used on various operating systems, including Windows, Linux, and macOS.


## Release History
First Release - 8th August 2023


