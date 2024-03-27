const fs = require('fs');
const axios = require('axios');
const speech = require('@google-cloud/speech').v1p1beta1;

async function getGoogleTranscription(audioUrl) {
    const client = new speech.SpeechClient();
    const response = await axios.get(audioUrl, { responseType: 'arraybuffer' });
    const audioBytes = Buffer.from(response.data, 'binary').toString('base64');
    const audio = {
        content: audioBytes,
    };
    const config = {
        encoding: 'LINEAR16',
        languageCode: 'en-US',
    };
    const request = {
        audio: audio,
        config: config,
    };
    const [result] = await client.recognize(request);
    const transcription = result.results
        .map(result => result.alternatives[0].transcript)
        .join('\n');
    return transcription;
}

// Example usage
const audioUrl = 'https://www2.cs.uic.edu/~i101/SoundFiles/preamble10.wav';
getGoogleTranscription(audioUrl)
    .then(transcription => console.log(transcription))
    .catch(err => console.error('ERROR:', err));