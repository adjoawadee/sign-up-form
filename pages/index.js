import React, {useState, useEffect} from 'react';
import {nameValidation, emailValidation, passwordValidation} from '@/utils/formUtils';
import FormFieldComponent from '@/components/FormFieldComponent';
import { submitFormData, fetchFormData } from '@/utils/formApi';


import SignUpComponent from '@/components/SignUpComponent';

export default function SignUpForm() {
  return (<SignUpComponent />)
}