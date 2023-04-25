import { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoginCallbackPage from './pages/LoginCallbackPage';
import { isEditOrPreviewMode } from './helpers/urlHelper';
import SearchPage from './pages/SearchPage';

const queryClient = new QueryClient();
const backendUrl = process.env.REACT_APP_LOGIN_AUTHORITY as string

export default function WrapApp() {
  useEffect(() => {
    if(isEditOrPreviewMode()) {
      const communicationScript = document.createElement('script');
      communicationScript.src = `${backendUrl}/episerver/cms/latest/clientresources/communicationinjector.js`;
      document.body.appendChild(communicationScript);
    }
  });

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login-callback" element={<LoginCallbackPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="*" element={<App />} />
        </Routes>
      </div>
    </Router>
  )
}


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <QueryClientProvider client={queryClient}>
    <WrapApp />
  </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
