// LinkedList.tsx
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { Doughnut } from 'react-chartjs-2';
import './Array.css';
import QuestionBlock from './QuestionBlock';
import {useNavigate } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export type Question = {
    id: number;
    text: string;
    solved: boolean;
};

const LinkedList: React.FC = () => {
    const navigate = useNavigate();

    const [darkMode, setDarkMode] = useState(false);
    const [blocksLinkedList, setBlocksLinkedList] = useState<Question[][]>([
        [
            { id: 21, text: 'Reverse a Linked List', solved: false },
            { id: 22, text: 'Merge Two Sorted Linked Lists', solved: false },
            { id: 23, text: 'Detect Cycle in a Linked List', solved: false },
        ],
        [
            { id: 24, text: 'Find the Middle Element of a Linked List', solved: false },
            { id: 25, text: 'Remove Duplicates from a Linked List', solved: false },
        ],
        [
            { id: 26, text: 'Add Two Numbers Represented by Linked Lists', solved: false },
            { id: 27, text: 'Intersection Point in Y Shaped Linked Lists', solved: false },
        ],
        [
            { id: 28, text: 'Flatten a Multilevel Doubly Linked List', solved: false },
            { id: 29, text: 'Sort a Linked List', solved: false },
        ],
    ]);

    useEffect(() => {
        const savedBlocks = localStorage.getItem('linkedlist-blocks');
        if (savedBlocks) {
            setBlocksLinkedList(JSON.parse(savedBlocks));
        } else {
            // Save initial data to localStorage if not present
            localStorage.setItem('linkedlist-blocks', JSON.stringify(blocksLinkedList));
        }
    }, []);

    // Flatten the blocksLinkedList for progress calculations and rendering
    const questions = blocksLinkedList.flat();
    const totalQuestions = questions.length;
    const solvedQuestions = questions.filter(q => q.solved).length;
    const solvedPercentage = ((solvedQuestions / totalQuestions) * 100).toFixed(2);

    // Mark Linked List topic as complete if all questions are solved
    const allQuestionsSolved = solvedQuestions === totalQuestions;

    // Update completion status in localStorage
    useEffect(() => {
        localStorage.setItem('linkedlist-complete', JSON.stringify(allQuestionsSolved));
    }, [allQuestionsSolved]);

    const handleQuestionClick = (questionId: number) => {
        navigate(`/linkedlist/question/${questionId}`, {replace:true});
    };

    const toggleDarkMode = () => setDarkMode(!darkMode);

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
                <h1 className="title">Linked List</h1>
            </div>

            <div className="content-wrapper">
                <div className="question-blocks">
                    {questions.map(question => (
                        <QuestionBlock
                            key={question.id}
                            title={question.text}
                            difficulty="Easy"
                            problemType="Problem Solving (Basic)"
                            maxScore={10}
                            successRate={93.00}
                            isSolved={question.solved}
                            isDarkMode={darkMode}
                            onSolveClick={() => handleQuestionClick(question.id)}
                            onQuestionClick={() => handleQuestionClick(question.id)}
                        />
                    ))}
                </div>
                <div className='chart'>
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

export default LinkedList;
