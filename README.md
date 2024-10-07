# NinjaShield Frontend

NinjaShield is a Data Leak Prevention (DLP) tool that helps organizations prevent the leakage of sensitive data through various channels such as file uploads, emails, and clipboard operations. This repository contains the frontend for NinjaShield, which provides an interactive dashboard and various features for managing policies, monitoring data classification, and more.

## Contributors

- [@fazle]([https://github.com/fazle](https://github.com/FazleAlahiMukim))
- [@tonmoy]([https://github.com/tonmoy](https://github.com/TonmoyDaFulkopi))

## 2 separate Back-ends
[@adminbacckend](https://github.com/FazleAlahiMukim/NinjaShield-AdminBackend) for the web-based application & [@devicebackend](https://github.com/FazleAlahiMukim/NinjaShield-Backend) for the Local Machine used by Employees

## Features

### Dashboard
- A comprehensive **Dashboard** to view system status and manage data policies.
- Provides an overview of active policies, monitored devices, and file events in real-time.
- Includes statistical charts and logs to track activity and ensure compliance.

### Data Classification
- **Data Classification** helps categorize different types of data (e.g., text files, images, audio) and apply rules based on sensitive data.
- Allows administrators to create and manage Data Classes, each associated with a set of rules and file categories.
- Integrates with backend policies to automatically scan files and block or allow actions based on the content.

### Device Management
- Manage devices connected to the DLP system through a dedicated **Device Management** interface.
- View device details, monitor activities, and assign policies to different devices.
- Ensure security compliance by enforcing data protection policies on each registered device.

### Policy Management
- **Policy Management** allows administrators to define and enforce rules for data classification.
- Policies can include blocking, logging, or warning actions based on file contents or destination types.
- Policies are applied to specific devices, data classes, and file categories, offering granular control over data protection.

### Service Status Monitoring
- **Service Monitoring** to check the status of different services running on devices.
- Periodically refreshes to show the current state of services, whether they are active or require intervention.
- Integration with backend services to update the status and trigger notifications if needed.

### Browser Cookie for Security
- Uses **browser cookies** for secure user authentication and session management.
- Ensures that all user interactions with the NinjaShield dashboard are secure and protected.

### File Monitoring
- **File Upload Monitoring** detects sensitive content in files uploaded through the browser.
- 
### Real-time Updates
- The dashboard and all features receive real-time updates from the backend, ensuring that policies and services are always current.
- Automatic refreshing and user notifications when updates occur.

## Technologies Used
- **Next.js** for server-side rendering and fast, modern web development.
- **React** for building dynamic, reusable components.
- **MongoDB** as the backend database for storing policies and user data.
- **Spring Boot** to manage backend services and handle real-time updates.
- **Browser Cookies** for security and session management.

## Getting Started

To get started with the NinjaShield Frontend, follow these steps:

### Prerequisites
- Node.js and npm installed on your system.
- MongoDB and Spring Boot backend running.


