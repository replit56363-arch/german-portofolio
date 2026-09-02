import { createRoot } from 'react-dom/client';
import { setAuthTokenGetter } from '@workspace/api-client-react';

import App from './App';
import { ErrorBoundary } from '@/components/error-boundary';

import './index.css';

// Configure Bearer auth token getter for robust session retention across iframes
setAuthTokenGetter(() => {
  try {
    return localStorage.getItem("admin_session_token");
  } catch {
    return null;
  }
});

createRoot(document.getElementById('root')!, {
  // Keeps caught errors off reportError(), which would raise the dev overlay.
  onCaughtError: (error, errorInfo) => {
    console.error(error, errorInfo.componentStack);
  },
}).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
);
