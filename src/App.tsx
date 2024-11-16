import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Special60Component from './assets/Components/Special60Component/Array';
import LinkedList from './assets/Components/Special60Component/LinkedList';
import Cpptsx from './assets/Components/Special60Component/cpptsx';
import Courses from './assets/Components/Special60Component/Courses';
import QuestionIDEComponent from './assets/Components/QuestionIDEComponent/QuestionIDEComponent';

// localStorage.clear();
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Courses />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/courses/cpp" element={<Cpptsx />} />
                <Route path="/array" element={<Special60Component />} />
                <Route path="/linkedlist" element={<LinkedList />} />
                <Route path="/:topic/question/:questionId" element={<QuestionIDEComponent/>} />
            </Routes>
        </Router>
    );
}

export default App;
