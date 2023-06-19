import {useState, useEffect} from 'react';
import FormFieldComponent from '../components/FormFieldComponent';
import {nameValidation, emailValidation, passwordValidation} from '../utils/formUtils';
import { submitFormData, fetchFormData } from '../utils/formApi';

export default function SignUpComponent() {
    const fields = [
        { id: 'firstName', type: 'text', label: 'First Name', placeholder: 'First name', name: 'firstName', required: true },
        { id: 'lastName', type: 'text', label: 'Last Name', placeholder: 'Last name', name: 'lastName', required: true },
        { id: 'email', type: 'email', label: 'E-mail', placeholder: 'Email', name: 'email', required: true },
        { id: 'password', type: 'password', label: 'Password', placeholder: 'Password', name: 'password', required: true},
    ]

    const [formData, setFormData] = useState({});
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [errorData, setErrorData] = useState({});
    const [success, setSuccess] = useState(false);
    const [progress, setProgress] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
      if (formSubmitted) {
        validateForm(formData);
      }
    }, [formData]);

    async function onSubmitHandler(event) {
        event.preventDefault();
        setFormSubmitted(true);

        const { firstName, lastName, email, password } = event.target.elements;
        const form = {
          firstName: firstName.value,
          lastName: lastName.value,
          email: email.value,
          password: password.value,
        };
        setFormData(form);
        validateForm(form);

        if (Object.keys(errorData).length === 0) {
            setProgress(true);
            setError(null);
            await submitAndFetchData(form);
          }
    }

    async function submitAndFetchData(formData) {
      try {
        await submitFormData(formData);
        await wait(4000);
        setSuccess(true);
        const responseData = await fetchFormData()
        console.log(responseData); // Not entirely sure what to do with this response
      } catch (error) {
        setError(error);
      } finally {
        setProgress(false);
      }
    }

    async function wait(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    function validateForm(form) {
        const validPassword = passwordValidation(form.password);
        const validEmail = emailValidation(form.email);
        const validFirstName = nameValidation(form.firstName);
        const validLastName = nameValidation(form.lastName);

        let errors = {};

        if(!validFirstName) {
          errors.firstName = 'Invalid first name';
        }

        if(!validLastName) {
          errors.lastName = 'Invalid last name';
        }

        if(!validEmail) {
          errors.email = 'Invalid email';
        }

        if(!validPassword) {
          errors.password = 'Invalid password';
        }

        setErrorData(errors);
    }

    function onChangeHandler(event){
      const name = event.target.name;
      const value = event.target.value;
    
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    
      setErrorData((prevErrorData) => ({
        ...prevErrorData,
        [name]: undefined,
      }));
    }

    function renderSuccessMessage() {
      return(
      <div className="flex flex-col items-center justify-center"
            data-testid="success-message"
      >
        <div className="checkmark animate-bounce text-4xl text-green-500">
        <svg
          className="h-10 w-10 text-green-500"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M4.5 12.75l6 6 9-13.5" 
          />
        </svg>
        </div>
        <p className="text-green-500 text-lg font-semibold animate-pulse">
          Success!
        </p>
      </div>
      )
    } 
    
    function renderErrorMessage() {
      return (
        <div className="flex flex-col items-center justify-center mb-4">
          <p className="text-red-500 text-lg font-semibold mb-2">
            Submission Failed!
          </p>
          <p className="text-red-500 text-sm">{error.message}</p>
        </div>
      )
    }

    return(
      <main className='flex items-start justify-center min-h-screen bg-gray-100'>
          <div className='max-w-md w-full px-6'>
            <h1 className='text-3xl font-bold text-center m-6'>
              Rabobank Sign Up Form
            </h1>
            <div className='w-full max-w-md bg-white rounded-lg shadow-md p-6'>
            {error && (
              renderErrorMessage()
            )}
            { success ? (
              renderSuccessMessage()
          ) : (
          <form onSubmit={onSubmitHandler}>
            {fields.map((field) => (
                <FormFieldComponent
                  key={field.id} 
                  id={field.id}
                  type={field.type}
                  label={field.label}
                  placeholder={field.placeholder}
                  name={field.name}
                  onChange={onChangeHandler}
                  required={field.required}
                  error={errorData[field.id]}
                  errorMessageTestId={`error-message-${field.id}`}
                />
            ))}
             <button
              type="submit"
              className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 
                          rounded flex items-center 
                        ${progress ? 'justify-center' : ''}`}
            >
              {progress ? (
                <svg 
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24">
                    <circle 
                      className="opacity-25" 
                      cx="12" 
                      cy="12" 
                      r="10" 
                      stroke="currentColor" 
                      strokeWidth="4">
                    </circle>
                  <path 
                    className="opacity-75" 
                    fill="currentColor" 
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0012 20c4.411 0 8-3.589 8-8h-2c0 3.309-2.691 6-6 6-1.695 0-3.248-.696-4.376-1.809L6 16.291z">
                    </path>
                </svg>
              ) : null}
              {progress ? "Submitting..." : "Sign Up"}
            </button>
        </form>
        ) }    
          </div>
        </div>
      </main>
    )
}