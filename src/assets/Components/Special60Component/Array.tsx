import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import './Array.css';
import Navbar from './Navbar';
import QuestionBlock from './QuestionBlock';
import { useNavigate } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import { db } from './firebase'; // Ensure correct path to your Firebase setup file

ChartJS.register(ArcElement, Tooltip, Legend);

export type Question = {
  id: number;
  text: string;
  solved: boolean;
};

const Array: React.FC = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [blocksArray, setBlocksArray] = useState<Question[][]>([]);

  // Fetch questions from Firestore
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const arrayCollection = collection(db, 'array');
        const querySnapshot = await getDocs(arrayCollection);
        const questions: Question[][] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.questions) {
            questions.push(data.questions);
          }
        });

        if (questions.length > 0) {
          setBlocksArray(questions);
        } else {
          // Default data if Firestore is empty
          const defaultQuestions = [
            [
              { id: 11, text: 'Find Peak Element', solved: false },
              { id: 12, text: 'Container With Most Water', solved: false },
              { id: 13, text: 'Subarray Sum Equals K', solved: false },
            ],
            [
              { id: 14, text: 'Majority Element', solved: false },
              { id: 15, text: 'Product of Array Except Self', solved: false },
            ],
          ];
          setBlocksArray(defaultQuestions);

          // Save default data to Firestore
          const docRef = doc(db, 'array', 'default');
          await setDoc(docRef, { questions: defaultQuestions });
        }
      } catch (error) {
        console.error('Error fetching questions from Firestore:', error);
      }
    };

    fetchQuestions();
  }, []);

  // Compute total, solved, and percentage
  const questions = blocksArray.flat();
  const totalQuestions = questions.length;
  const solvedQuestions = questions.filter((q) => q.solved).length;
  const solvedPercentage = ((solvedQuestions / totalQuestions) * 100).toFixed(2);

  const handleQuestionClick = (questionId: number) => {
    navigate(`/array/question/${questionId}`, { replace: true });
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Chart data
  const doughnutData = {
    labels: ['Solved', 'Unsolved'],
    datasets: [
      {
        data: [solvedQuestions, totalQuestions - solvedQuestions],
        backgroundColor: ['#5A6ACF', '#2FBFDE'],
        hoverBackgroundColor: ['#4C5DB0', '#28A1C8'],
        borderWidth: 1,
      },
    ],
  };

  const doughnutOptions = {
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    cutout: '70%',
  };

  return (
    <div className={`container ${darkMode ? 'dark-mode' : ''}`}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <div className="titleDiv">
        <h1 className="title">Array</h1>
      </div>

      <div className="content-wrapper">
        <div className="question-blocks">
          {questions.map((question) => (
            <QuestionBlock
              key={question.id}
              title={question.text}
              difficulty="Easy"
              problemType="Problem Solving (Basic)"
              maxScore={10}
              successRate={93.0}
              isSolved={question.solved}
              isDarkMode={darkMode}
              onSolveClick={() => handleQuestionClick(question.id)}
              onQuestionClick={() => handleQuestionClick(question.id)}
            />
          ))}
        </div>
        <div className="chart">
          <Doughnut data={doughnutData} options={doughnutOptions} />
          <div className="chart-value">
            {solvedQuestions} / {totalQuestions}
          </div>
          <p className="progress">Progress: {solvedPercentage}% solved</p>
        </div>
      </div>
    </div>
  );
};

export default Array;
