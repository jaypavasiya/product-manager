import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';

function App() {
  
  return (
    <BrowserRouter>
      <Suspense fallback={<h2>Loading...</h2>}>
        <Router />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
