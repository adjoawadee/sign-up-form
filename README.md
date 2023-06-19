# Sign Up Form
Sign up form assignment for Rabobank

This project is a production-ready sign-up form page that allows users to enter their first name, last name, email, and password. The form includes validation for all fields and performs password validation based on specific criteria.

It's been developed using the latest version of Next.js for server-side rendering.

## Deployment

The project is deployed and accessible at: [http://signup.adjoa.tech/](http://signup.adjoa.tech/)



## Features

- First name, last name, email, and password fields.
- Required field validation for all input fields.
- Password validation criteria:
  - Minimum of 8 characters.
  - Contains both lower and uppercase letters.
  - Does not include the user's first or last name.
- Sequential API requests upon form submission:
  1. POST form data to `https://demo-api.now.sh/users`.
  2. Wait for 4 seconds.
  3. GET data from `https://demo-api.now.sh/users`.

  ## Architecture
    The project follows a structured architecture based on Next.js's recommended folder structure and concepts.

- **Pages**: The `pages` directory contains the index page as the main entry point. In here, it only renders the sign up component which is the main component shown in this application. 
- **Components**: The `components` directory includes reusable form field component and that can be used across multiple pages or forms. It also has the sign up component, that has a list of field properties used to build a form.
- **Utils**: The `utils` directory contains utility functions used for form validation and API requests. It contains the logic for interacting with the API endpoints.
- **Tests**: The `tests` directory includes unit tests and end-to-end tests for verifying the functionality and behavior of the application.

## Getting Started

To get the application up and running:

1. Clone the repository: `git clone https://github.com/adjoawadee/sign-up-form`.
2. Navigate to the project directory: `cd sign-up-form`.
3. Install dependencies: `npm install`.
4. Start the development server: `npm run dev`.
5. Open your browser and view the app running: `http://localhost:3000`.


## Additional Information

- **Handling GET Response**: The current implementation does not specify how to handle the response from the GET request to `https://demo-api.now.sh/users`. 

- **Code Coverage**: The project could benefit from increased code coverage by adding additional unit tests and expanding the end-to-end test scenarios.

## Technology Stack

The project utilizes the following technologies and libraries:

- React.js
- Next.js
- Tailwind CSS
- Jest
- Cypress

## Testing

The project includes comprehensive test coverage, including both unit tests and end-to-end tests. You can run the tests using the following commands:

- Run unit tests: `npm run test`.
- Run end-to-end tests: `npm cypress open`.

## Estimated hours

- Logic: 3 hours
- Styling & Boilerplate setup & Documentation: 1.5 hours
- Test setup & test: 2 hours
Total: 6.5 hours



