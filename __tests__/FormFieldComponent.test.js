import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FormFieldComponent from '../components/FormFieldComponent';

let props;

describe('FormFieldComponent', () => {
    beforeEach(() => {
        props = {
          id: 'firstName',
          type: 'text',
          label: 'First Name',
          placeholder: 'Enter your first name',
          value: '',
          name: 'firstName',
          onChange: jest.fn(),
          required: true,
          error: null,
        };
      });

      it('renders input field with correct label and placeholder', () => {
        render(<FormFieldComponent {...props} />);
    
        const inputElement = screen.getByLabelText('First Name');
        expect(inputElement).toBeDefined();
        expect(inputElement).toHaveAttribute('placeholder', 'Enter your first name');
      });

      it('displays error message when error prop is provided', () => {
        props.error = 'Invalid email';
    
        render(<FormFieldComponent {...props} />);
    
        const errorMessage = screen.getByText('Invalid email');
        expect(errorMessage).toBeDefined();
      });

})