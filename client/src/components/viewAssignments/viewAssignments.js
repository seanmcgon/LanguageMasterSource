import React from 'react';

function ViewAssignment() {
  const flashcards = [
    { wordName: 'Apple', englishTranslation: 'Apple', audioFile: 'apple.mp3' },
    { wordName: 'Banana', englishTranslation: 'Banana', audioFile: 'banana.mp3' },
    { wordName: 'Orange', englishTranslation: 'Orange', audioFile: 'orange.mp3' },
  ];

  return (
    <div>
      {flashcards.map((flashcard, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <div style={{ width: '100px', marginRight: '20px' }}>{flashcard.wordName}</div>
          <div style={{ width: '100px' }}>{flashcard.englishTranslation}</div>
          <audio src={flashcard.audioFile} controls />
        </div>
      ))}
    </div>
  );
}

export default ViewAssignment;