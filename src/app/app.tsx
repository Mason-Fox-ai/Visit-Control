import { BrowserRouter } from  "react-router-dom";
import { Router } from '../router/router.tsx'

export const App = () => {
    return (
        <BrowserRouter>
            <Router />
        </BrowserRouter>
    );
};

export default App;