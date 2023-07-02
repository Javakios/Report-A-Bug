# Ticket Management Application

The Ticket Management Application is a web-based application that allows users to report bugs and request new features for a company's developed applications. It provides a streamlined process for users to submit tickets and for the company to track, prioritize, and resolve those tickets.

## Features

- User authentication: Users can sign up and log in to the application.
- Ticket submission: Users can submit tickets for bugs or feature requests.
- Ticket management: Company administrators can view, prioritize, and assign tickets to developers.
- Ticket status tracking: Users can track the status of their submitted tickets.
- Commenting system: Users and administrators can add comments to tickets for communication purposes.

## Technologies Used

- Front-end: HTML,SCSS,Typescript,Angular
- Back-end: PHP, Laravel framework
- Database: MySQL

## Installation

1. Clone the repository: `git clone [https://github.com/your-repo-url.git](https://github.com/Javakios/Report-A-Bug.git)`
2. Navigate to the project directory: `cd report-a-bug`
3. Install dependencies: `composer install`
4. Create a copy of the `.env.example` file and rename it to `.env`.
5. Generate an application key: `php artisan key:generate`
6. Configure the database connection in the `.env` file.
7. Run database migrations: `php artisan migrate`
8. Start the development server: `php artisan serve`

## Usage

1. Access the application in your web browser: `http://localhost:8000`
2. Register a new user account or log in with existing credentials.
3. Create a new ticket by clicking on the appropriate button and filling in the necessary details.
4. View and manage tickets from the dashboard.
5. Assign tickets to developers and track their progress.
6. Add comments to tickets for communication purposes.

## Contributing

Contributions to the Ticket Management Application are welcome! If you find any bugs or have suggestions for new features, please open an issue or submit a pull request.


## Contact

For any inquiries or support, please contact us at dev@isg.gr

