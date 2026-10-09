# 🚀 VoiceVerse – AI-Powered Multilingual Learning & Voice Analysis Platform

## 1. Overview

VoiceVerse is an AI-powered multilingual learning platform designed to improve access to educational and vocational content through speech recognition, translation, natural language processing, semantic search, and text-to-speech technologies.

The platform aims to make learning more accessible to regional-language learners and users with different accessibility needs.

## 2. Problem Statement

- Limited educational content in regional languages.
- Accessibility challenges for non-English speakers.
- Difficulty processing educational content in different formats.
- Time-consuming manual translation.
- Inconsistent translation of technical and vocational terminology.

## 3. Proposed Solution

VoiceVerse provides a multilingual content-processing pipeline that supports:

- Speech-to-text conversion using Whisper ASR.
- Text preprocessing using spaCy.
- Multilingual translation using IndicTrans2.
- Context-aware processing using LangChain.
- Semantic search using Sentence Transformers and FAISS.
- Speech generation using Coqui TTS.
- Processing of supported text, audio, video, and document formats.

**Note:** Each feature depends on the corresponding component being implemented and configured in the application.

## 4. Key Features

- Speech-to-text conversion.
- Multilingual translation.
- NLP-based text preprocessing.
- Semantic search and document retrieval.
- Text-to-speech generation.
- Educational content processing.
- Accessible, voice-enabled learning.

## 5. Technology Stack

| Component | Technology |
|---|---|
| Frontend | React.js, TypeScript, Tailwind CSS |
| Backend | FastAPI, Python |
| Speech Recognition | Whisper ASR |
| NLP | spaCy |
| Translation | IndicTrans2 |
| Semantic Search | Sentence Transformers, FAISS |
| Context Processing | LangChain |
| Speech Generation | Coqui TTS |
| Database | SQLite or the database configured in the project |
| Version Control | Git and GitHub |

Use this table only after verifying the actual technologies in the repository.

## 6. System Architecture

The application follows this logical workflow:

1. The user uploads supported content through the web interface.
2. The backend extracts text from the input.
3. The text is cleaned and preprocessed.
4. Embeddings are generated for semantic retrieval, where configured.
5. The content is translated into the selected target language.
6. Contextual processing improves the relevance of the output.
7. Text-to-speech generates audio when enabled.
8. The processed output is returned to the frontend.
9. Translation quality can be evaluated using suitable metrics, such as BLEU, where reference translations are available.

### Architecture Flow

```text
             User
              |
              v
      React Web Interface
              |
              v
        Backend API
              |
              v
      Content Extraction
              |
              v
      NLP Preprocessing
              |
              v
   Translation and Retrieval
              |
              v
       Output Generation
       /              \
      v                v
 Translated Text    Generated Audio
      \                /
       v              v
        Web Interface
```

## 7. Project Structure

```text
VOICEVERSE/
├── client/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── assets/
├── server/
│   ├── main.py
│   ├── routes/
│   ├── models/
│   ├── services/
│   └── uploads/
├── linguaskill.db
├── README.md
├── .gitignore
├── .env.example
├── LICENSE
└── docs/
    └── ARCHITECTURE.md
```

This is an illustrative structure. Keep only files and folders that actually exist in your repository.

## 8. Prerequisites

Install the following software before running the application:

- Git
- Node.js and npm
- Python 3.10 or the version required by the project
- pip
- A supported web browser

Some AI models may require additional disk space, memory, or GPU resources.

## 9. Installation and Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/harishd3504-oss/VOICEVERSE-LIVEIN-LAB-PROJECT.git
cd VOICEVERSE-LIVEIN-LAB-PROJECT
```

### Step 2: Set Up the Backend

If the backend uses FastAPI and Python:

```bash
cd server
python -m venv venv
```

Activate the virtual environment.

**Windows:**

```bash
venv\Scripts\activate
```

**Linux/macOS:**

```bash
source venv/bin/activate
```

Install the project's dependencies if `requirements.txt` exists:

```bash
pip install -r requirements.txt
```

If the project does not contain `requirements.txt`, create it from the actual backend dependencies before asking users to run this command.

### Step 3: Configure Environment Variables

Create a `.env` file in the backend directory if the application loads environment variables from there.

Example `.env.example`:

```env
APP_ENV=development
HOST=127.0.0.1
PORT=8000
DATABASE_URL=sqlite:///./linguaskill.db
UPLOAD_DIR=uploads
MAX_UPLOAD_SIZE_MB=25
```

Add only variables that your code actually reads. If the application uses external AI services, add their required configuration variables separately.

**Security rules:**
- Never commit API keys, passwords, or tokens.
- Add `.env` to `.gitignore`.
- Commit `.env.example` with placeholder values only.
- Do not expose private credentials in frontend environment variables.

### Step 4: Start the Backend

If the backend entry point is `main.py` and it exposes a FastAPI application named `app`:

```bash
uvicorn main:app --reload
```

The API should be available at:

```text
http://127.0.0.1:8000
```

FastAPI documentation is commonly available at:

```text
http://127.0.0.1:8000/docs
```

These commands assume that `main.py` defines the FastAPI application and that Uvicorn is installed.

### Step 5: Set Up the Frontend

Open another terminal:

```bash
cd client
npm install
```

Create the frontend environment file if required by the application.

Example for a Vite-based frontend:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

Run the development server:

```bash
npm run dev
```

Open the local URL displayed by Vite in your browser.

**If the existing backend uses Node.js and Express instead of FastAPI, follow the actual backend scripts and configuration in `server/package.json`.** Do not mix the two setup procedures.

## 10. Environment Variables Reference

| Variable | Purpose | Example |
|---|---|---|
| `APP_ENV` | Application environment | `development` |
| `PORT` | Backend port | `8000` |
| `DATABASE_URL` | Database connection | SQLite connection URL |
| `UPLOAD_DIR` | Uploaded-file directory | `uploads` |
| `MAX_UPLOAD_SIZE_MB` | Upload size limit | `25` |
| `VITE_API_BASE_URL` | Frontend API address | `http://127.0.0.1:8000` |

These are example configuration variables, not a verified inventory of the repository's current environment variables. Remove unused variables and document any additional variables required by the implementation.

## 11. Testing

Run the tests provided by the project.

For a Python backend using pytest:

```bash
pytest
```

For a Node.js frontend with a configured test script:

```bash
npm test
```

The frontend command depends on the scripts configured in `client/package.json`.

### Recommended Test Cases

| Test Case | Expected Result |
|---|---|
| Upload a supported file | File is accepted |
| Upload an unsupported file | Clear validation error |
| Submit text for translation | Translated output is returned |
| Submit supported audio | Speech transcription is returned |
| Request audio generation | Audio output is produced |
| Submit empty input | Validation message is displayed |
| Access the API with invalid input | Appropriate error response |
| Test database connectivity | Database connection succeeds |

Document actual results only after running these tests.

## 12. Sample Data

Include small, non-sensitive sample files for reproducible testing, such as:

- A short sample text in English.
- A sample sentence in a supported regional language.
- A short audio recording for speech recognition.
- A sample document in a supported format.
- Reference translations for translation-quality evaluation.

Store sample files in a dedicated directory, such as `sample_data/`, if applicable. Do not upload private, copyrighted, or confidential user data.

## 13. Evaluation Metrics

Where implemented, the following metrics can be used to evaluate the system:

- **BLEU:** Measures the overlap between generated translations and reference translations.
- **Word Error Rate (WER):** Evaluates speech transcription errors.
- **Response time:** Measures processing latency.
- **Functional accuracy:** Measures successful completion of supported workflows.

Report measured values only when supported by actual experiments.

## 14. License

This project should include a `LICENSE` file describing the terms under which its source code can be used, modified, and redistributed.

Choose an appropriate license after confirming the team's intentions and the licensing requirements of the third-party dependencies.

## 15. Beneficiaries

- Students and regional-language learners.
- Educational institutions.
- Vocational training centres.
- Users who benefit from accessible learning interfaces.
- Skill development programmes.

## 16. Sustainable Development Goals

- **SDG 4 – Quality Education:** Supports access to inclusive learning resources.
- **SDG 8 – Decent Work and Economic Growth:** Supports vocational learning and skill development.
- **SDG 9 – Industry, Innovation and Infrastructure:** Demonstrates the application of AI technologies in education.

## 17. Future Enhancements

- Real-time voice interaction.
- Personalised learning recommendations.
- Additional language support.
- Improved translation evaluation.
- Secure cloud deployment.
- Integration with educational platforms.

## 18. Team

- Lakshman N S
- Rogith S
- Harish D

**Institution:** Sri Sai Ram Engineering College

## 19. Contribution

Contributions can be made through GitHub issues and pull requests. Contributors should describe proposed changes, document setup requirements, and include relevant tests.

## 20. Conclusion

VoiceVerse explores the use of speech processing, multilingual translation, semantic retrieval, and accessible web technologies to support regional-language learning. The repository provides the source code and documentation needed to understand, configure, and evaluate the implemented features.
