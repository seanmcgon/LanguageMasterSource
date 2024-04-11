import React from 'react';
import { useParams } from "react-router-dom";

export default function ViewAssignment() {
  const { lessonName } = useParams();
  const flashcards = [
    { wordName: 'Hola', englishTranslation: 'Hello', audioFile: 'hola.mp3' },
    { wordName: 'Buenos días', englishTranslation: 'Good morning', audioFile: 'buenos_dias.mp3' },
    { wordName: 'Buenas tardes', englishTranslation: 'Good afternoon', audioFile: 'buenas_tardes.mp3' },
    { wordName: 'Buenas noches', englishTranslation: 'Good night', audioFile: 'buenas_noches.mp3' },
    { wordName: 'Por favor', englishTranslation: 'Please', audioFile: 'por_favor.mp3' },
    { wordName: 'Gracias', englishTranslation: 'Thank you', audioFile: 'gracias.mp3' },
    { wordName: 'De nada', englishTranslation: 'You’re welcome', audioFile: 'de_nada.mp3' },
    { wordName: 'Perdón', englishTranslation: 'Excuse me', audioFile: 'perdon.mp3' },
    { wordName: 'Lo siento', englishTranslation: 'Sorry', audioFile: 'lo_siento.mp3' },
    { wordName: 'Sí', englishTranslation: 'Yes', audioFile: 'si.mp3' },
    { wordName: 'No', englishTranslation: 'No', audioFile: 'no.mp3' },
    { wordName: '¿Cómo te llamas?', englishTranslation: 'What is your name?', audioFile: 'como_te_llamas.mp3' },
    { wordName: 'Me llamo...', englishTranslation: 'My name is...', audioFile: 'me_llamo.mp3' },
    { wordName: '¿Cómo estás?', englishTranslation: 'How are you?', audioFile: 'como_estas.mp3' },
    { wordName: 'Estoy bien, gracias', englishTranslation: 'I’m fine, thank you', audioFile: 'estoy_bien_gracias.mp3' },
    { wordName: 'Mucho gusto', englishTranslation: 'Nice to meet you', audioFile: 'mucho_gusto.mp3' },
    { wordName: 'Hasta luego', englishTranslation: 'See you later', audioFile: 'hasta_luego.mp3' },
    { wordName: 'Adiós', englishTranslation: 'Goodbye', audioFile: 'adios.mp3' },
    { wordName: '¿Puedes ayudarme?', englishTranslation: 'Can you help me?', audioFile: 'puedes_ayudarme.mp3' },
    { wordName: 'No entiendo', englishTranslation: 'I don’t understand', audioFile: 'no_entiendo.mp3' }
  ];

  return (
    <div>
        <h1>{lessonName}</h1>
      {flashcards.map((flashcard, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <div style={{ width: '150px', marginRight: '20px' }}>{flashcard.wordName}</div>
          <div style={{ width: '150px', marginRight: '20px' }}>{flashcard.englishTranslation}</div>
          <audio src={flashcard.audioFile} controls />
        </div>
      ))}
    </div>
  );
}

