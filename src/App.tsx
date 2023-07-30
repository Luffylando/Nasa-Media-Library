import { Routes, Route } from 'react-router-dom';
import MainLayout from './Layout/MainLayout';

import Search from './Pages/Search';
import Show from './Pages/Show';

function App() {
    return (
        <MainLayout>
            <Routes>
                <Route path='/' element={<Search />} />
                <Route path='/show/:nasa_id' element={<Show />} />
            </Routes>
        </MainLayout>
    );
}

export default App;
