import { render, screen, fireEvent, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SignUpComponent from '../components/SignUpComponent';

describe('SignUpForm', () => {
  let firstNameInput;
  let lastNameInput;
  let emailInput;
  let passwordInput;
  let submitButton;

  beforeEach(() => {
    render(<SignUpComponent />);
    firstNameInput = screen.getByLabelText('First Name');
    lastNameInput = screen.getByLabelText('Last Name');
    emailInput = screen.getByLabelText('E-mail');
    passwordInput = screen.getByLabelText('Password');
    submitButton = screen.getByText('Sign Up');
  });

  it('renders the form fields', () => {
    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
    expect(screen.getByLabelText('E-mail')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('updates form data when fields are changed', () => {

    fireEvent.change(firstNameInput, { target: { value: 'Adjoa' } });
    fireEvent.change(lastNameInput, { target: { value: 'Wadee' } });
    fireEvent.change(emailInput, { target: { value: 'adjoa@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123' } });

    expect(firstNameInput.value).toBe('Adjoa');
    expect(lastNameInput.value).toBe('Wadee');
    expect(emailInput.value).toBe('adjoa@example.com');
    expect(passwordInput.value).toBe('Password123');
  });

  it('validates password field - password is too short', () => {
    fireEvent.change(passwordInput, { target: { value: 'short' } });
    fireEvent.click(submitButton);

    waitFor(() => {
      expect(screen.getByTestId('error-message-password')).toHaveTextContent('Invalid password');
    });
  });

  it('validates password field - password doesn\'t contain both lower and uppercase letters', () => {
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(submitButton);

    waitFor(() => {
      expect(screen.getByTestId('error-message-password')).toHaveTextContent('Invalid password');
    });
  });

  it('validates password field - password contains the user\'s first name', () => {
    fireEvent.change(firstNameInput, { target: { value: 'Adjoa' } });

    fireEvent.change(passwordInput, { target: { value: 'Adjoa123' } });
    fireEvent.click(submitButton);

    waitFor(() => {
      expect(screen.getByTestId('error-message-password')).toHaveTextContent("Invalid password");
    });
  });

  it('validates password field - password contains the user\'s last name', () => {
    fireEvent.change(lastNameInput, { target: { value: 'Wadee' } });

    fireEvent.change(passwordInput, { target: { value: 'Wadee123' } });
    fireEvent.click(submitButton);

    waitFor(() => {
      expect(screen.getByTestId('error-message-password')).toHaveTextContent("Invalid password");
    });
  });


  it('validates password field - password meets all the validation rules', () => {
    fireEvent.change(passwordInput, { target: { value: 'SecurePassword123' } });
    fireEvent.click(submitButton);

    waitFor(() => {
      expect(screen.queryByTestId('error-message-password')).toBeNull();
    });
  });

  it('submits the form successfully', async () => {

    fireEvent.change(firstNameInput, { target: { value: 'Adjoa' } });
    fireEvent.change(lastNameInput, { target: { value: 'Wadee' } });
    fireEvent.change(emailInput, { target: { value: 'adjoa@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'SecurePass123' } });

    fireEvent.click(submitButton);

    waitFor(() => {
      expect(submitFormData).toHaveBeenCalledTimes(1);
    });

    waitFor(() => {
      expect(fetchFormData).toHaveBeenCalledTimes(1);
    });

    waitFor(() => {
      expect(screen.queryByTestId('success-message')).toBeInTheDocument();
    });

  });

  it('renders success message after form submission', async () => {

    fireEvent.change(firstNameInput, { target: { value: 'Adjoa' } });
    fireEvent.change(lastNameInput, { target: { value: 'Wadee' } });
    fireEvent.change(emailInput, { target: { value: 'adjoa@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'SecurePass123' } });

    fireEvent.click(submitButton);
    waitFor(() => screen.getByTestId('success-message'));

    waitFor(() => {
      expect(screen.queryByTestId('success-message')).toBeInTheDocument();
    });
  });



})