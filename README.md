# Resume Analyzer API

A Flask REST API that analyzes resumes against job descriptions and helps with job searching.

## Setup and Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Create a `.env` file with your Gemini API key:
   ```
   GEMINI=your_api_key_here
   ```
4. Run the API server:
   ```bash
   python app.py
   ```

## API Endpoints

### 1. Health Check

**Endpoint:** `/api/health`  
**Method:** `GET`  
**Description:** Verifies the API is running properly  
**Response:** 
```json
{
  "status": "healthy",
  "service": "resume-analyzer-api"
}
```

### 2. Analyze Resume

**Endpoint:** `/get-score`  
**Method:** `POST`  
**Description:** Analyzes a resume against a job description using Gemini AI  

**Request:**
- Form data:
  - `job`: Job description text (required)
  - `resume`: PDF file of the resume (required)

**Response:**
JSON object with the following structure:
```json
{
  "score": 78.5,
  "suggestions": [
    {
      "title": "Improve Technical Skills",
      "content": "Consider learning more about [specific technology]",
      "courses": [
        {
          "title": "Course Name",
          "link": "https://course-link.com"
        }
      ]
    }
  ],
  "reasoning": [
    {
      "title": "Strong Experience",
      "content": "You have X years of experience in relevant field"
    }
  ]
}
```

**Error Responses:**
- `"No resume provided"` - If no resume file is uploaded
- `"No job provided"` - If job description is empty
- Status 500 with error details if AI processing fails

### 3. Search Jobs

**Endpoint:** `/search-jobs`  
**Method:** `GET`  
**Description:** Searches for jobs across multiple platforms  

**Request Parameters:**
- `query`: Job search term (required)
- `location`: Location for job search (default: "India")

**Response:**
Array of job listings in JSON format:
```json
[
  {
    "title": "Job Title",
    "company": "Company Name",
    "location": "Job Location",
    "date_posted": "2023-05-15",
    "link": "https://job-posting-link.com",
    "source": "linkedin"
  }
]
```

**Error Responses:**
- Status 400: `{"error": "Missing query parameter"}` - If query parameter is missing
- Status 500 with error details if job search fails

## Technologies Used

- Flask - Web framework
- Google Gemini AI - Resume analysis
- PyPDF - PDF parsing
- JobSpy - Job searching across platforms
- Flask-CORS - Cross-Origin Resource Sharing support
- Pydantic - Data validation and settings management

## Frontend Integration

This is a backend-only API service. To use this API with a frontend:
1. Deploy this API on your server
2. Configure your frontend application to make requests to the API endpoints
3. Handle API responses appropriately in your frontend code
