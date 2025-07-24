# Company Pipeline App

A fullstack application for processing company data through a pipeline that will eventually integrate with Airtable and LLM services.

## Project Structure

```
company-pipeline-app/
├── frontend/          # Next.js + TypeScript frontend
├── backend/           # FastAPI Python backend
└── README.md
```

## Features

- **Frontend**: Clean, responsive form with company data input
- **Backend**: Modular FastAPI server with placeholder data processing pipeline
- **Data Pipeline**: Simulated workflow for data gathering, 434 processing, LLM response generation, and Airtable integration

## Quick Start

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Activate the virtual environment:
   ```bash
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Start the FastAPI server:
   ```bash
   python main.py
   ```

The backend will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:3000`

## Usage

1. Open your browser and go to `http://localhost:3000`
2. Fill out the company information form:
   - **Company Name** (required)
   - **Company URL** (required)
   - **Worker Name** (optional)
   - **Worker Email** (optional)
   - **Additional Info** (optional)
3. Click "Generate" to process the data through the pipeline
4. View the response in the alert popup

## Backend Pipeline

The backend processes data through four modules:

1. **`data_gathering.py`**: Accepts form data and returns placeholder response
2. **`gather_434.py`**: Processes company data and returns 434-related information
3. **`generate_response.py`**: Generates LLM responses based on 434 data
4. **`add_data.py`**: Simulates adding data to Airtable

## API Endpoints

- `GET /`: Health check endpoint
- `POST /process`: Main processing endpoint that accepts company data

### Request Format

```json
{
  "company_name": "Acme Corporation",
  "company_url": "https://www.acme.com",
  "worker_name": "John Doe",
  "worker_email": "john.doe@acme.com",
  "additional_info": "Technology, SaaS, B2B"
}
```

### Response Format

```json
{
  "message": "This is a placeholder LLM response."
}
```

## Environment Variables

Create a `.env` file in the backend directory for future Airtable integration:

```env
# Airtable Configuration (for future use)
AIRTABLE_API_KEY=your_airtable_api_key_here
AIRTABLE_BASE_ID=your_airtable_base_id_here
AIRTABLE_TABLE_NAME=your_table_name_here

# API Configuration
API_HOST=0.0.0.0
API_PORT=8000

# CORS Configuration
FRONTEND_URL=http://localhost:3000
```

## Development

### Frontend Development

The frontend uses:
- Next.js 14 with App Router
- TypeScript
- CSS Modules for styling
- Responsive design

### Backend Development

The backend uses:
- FastAPI for the web framework
- Pydantic for data validation
- CORS middleware for cross-origin requests
- Modular architecture for easy extension

## Future Enhancements

- [ ] Real Airtable integration
- [ ] Actual LLM service integration
- [ ] Enhanced error handling
- [ ] Database integration
- [ ] User authentication
- [ ] Advanced form validation
- [ ] Real-time processing status updates

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure the backend is running on port 8000 and frontend on port 3000
2. **Module Import Errors**: Make sure all Python dependencies are installed in the virtual environment
3. **Port Already in Use**: Check if ports 3000 or 8000 are already occupied by other services

### Logs

The backend provides detailed console logging for debugging:
- Form data reception
- Pipeline step execution
- Error messages
- Processing results

## License

This project is for internal use and development purposes.