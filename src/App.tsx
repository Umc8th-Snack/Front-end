import { useRoutes } from 'react-router-dom';

import routes from '@/routes';
import ErrorBoundary from '@/routes/ErrorBoundary';

function App() {
    const element = useRoutes(routes);
    return <ErrorBoundary>{element}</ErrorBoundary>;
}

export default App;
