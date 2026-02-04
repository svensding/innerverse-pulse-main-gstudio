import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// --- Improved Global Error Handlers ---

// Catches script errors, syntax errors, etc.
window.addEventListener('error', (event) => {
  console.error('--- Unhandled Global Error ---');
  if (event.error) {
    // This is the best case, we have a full error object
    console.error('Error Object:', event.error);
    if (event.error.stack) {
      console.error('Stack Trace:', event.error.stack);
    }
  } else {
    // This is a fallback for less specific errors
    console.error('Error Message:', event.message);
    console.error(`Source: ${event.filename}, Line: ${event.lineno}, Column: ${event.colno}`);
  }
  console.error('-----------------------------');
});

// Catches unhandled promise rejections (e.g., from async/await without try/catch)
window.addEventListener('unhandledrejection', (event) => {
  console.error('--- Unhandled Promise Rejection ---');
  if (event.reason instanceof Error) {
    // If the rejection reason is an Error object, we get a stack trace
    console.error('Rejection Reason (Error):', event.reason.message);
    console.error('Stack Trace:', event.reason.stack);
  } else {
    // The reason could be a string, an object, etc.
    console.error('Rejection Reason:', event.reason);
  }
  console.error('----------------------------------');
});


const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
