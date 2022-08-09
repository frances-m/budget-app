
import Header from './components/Header';
import Income from './components/Income';
import Expenses from './components/Expenses';
import Results from './components/Results';

import './App.css';

function App() {
    return (
        <>
            <Header />
            <main className="wrapper">
                <Income />
                <Results />
                <Expenses />
            </main>
        </>
    );
}

export default App;
