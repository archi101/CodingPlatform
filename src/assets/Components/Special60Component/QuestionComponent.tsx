// import React from 'react';
// import { Question } from './Array';

// interface QuestionComponentProps {
//     question: Question;
//     onClose: () => void;
//     onSubmit: () => void;
// }

// export const QuestionComponent: React.FC<QuestionComponentProps> = ({ question, onClose, onSubmit }) => {
    
//     const handleSubmit = () => {
//         onSubmit(); 
//     };

//     return (
//         <div className="question-modal">
//             <div className="question-content">
//                 <h2>Question Details</h2>
//                 <p>{question.text}</p>

//                 <div className="question-actions">
//                     <button className="submit-button" onClick={handleSubmit}>
//                         Submit
//                     </button>
//                     <button className="close-button" onClick={onClose}>
//                         Close
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default QuestionComponent;
