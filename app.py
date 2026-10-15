from flask import Flask, request, jsonify
from flask_cors import CORS
from google import genai
from google.genai import types
from pydantic import BaseModel
from pypdf import PdfReader
from jobspy import scrape_jobs
import requests as r
import os
from dotenv import load_dotenv
import re
import json

# Load environment variables
load_dotenv()

# Initialize Gemini client
client = genai.Client(api_key=os.getenv("GEMINI"))
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-flash-latest")

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

class Course(BaseModel):
    title: str
    link: str

class Suggestion(BaseModel):
    title: str
    content: str
    courses: list[Course] = []

class Result(BaseModel):
    score: float
    suggestions: list[Suggestion]
    reasoning: list[Suggestion]

# Define a more explicit model documentation for reference
JSON_STRUCTURE = """
{
  "score": 85.5,              // Float: percentage match between resume and job
  "suggestions": [            // Array of suggestions to improve resume
    {
      "title": "String",      // Brief title of the suggestion
      "content": "String",    // Detailed explanation of the suggestion
      "courses": [            // Array of recommended courses
        {
          "title": "String",  // Course title
          "link": "String"    // URL to the course
        }
      ]
    }
  ],
  "reasoning": [              // Array of reasons for the score
    {
      "title": "String",      // Category of reasoning (e.g. "Strengths", "Weaknesses")
      "content": "String",    // Detailed explanation
      "courses": []           // Usually empty for reasoning items
    }
  ]
}
"""

@app.route("/api/schema", methods=["GET"])
def get_schema():
    """Endpoint to return the JSON schema used by the application"""
    return jsonify(Result.model_json_schema())

@app.route("/api/health", methods=["GET"])
def health_check():
    return jsonify({"status": "healthy", "service": "resume-analyzer-api"})

@app.route("/get-score", methods=["POST"])
def get_score():
    job = request.form.get("job")
    if "resume" not in request.files:
        return jsonify({"error": "No resume provided"}), 400
    resume_file = request.files["resume"]
    reader = PdfReader(resume_file.stream)
    resume = "\n".join([page.extract_text() for page in reader.pages])
    if job is None or job.strip() == "":
        return jsonify({"error": "No job provided"}), 400
    
    prompt_template = """I will give you a resume and a job description. Your job is to:
        1. Give a percentage score on how suitable I am for the job.
        2. Give reasoning behind your score.
        3. Provide 4-5 suggestions on how to improve my suitability score.
        4. For each suggestion, also suggest 1-2 top-rated free or paid online courses from platforms like Coursera, edX, Udemy, or YouTube to improve that skill.

        Return the ENTIRE result as JSON with this schema: {schema}
        DO NOT include markdown formatting, code blocks, or explanation text.
        ONLY return the raw JSON object.

        <resume>{resume}</resume> <job>{job}</job>"""
    
    try:
        response = client.models.generate_content(
            model=GEMINI_MODEL,
            config=types.GenerateContentConfig(
                system_instruction="You are a resume analyzer that provides detailed feedback on job suitability. You always return clean JSON without markdown formatting or explanation."
            ),
            contents=prompt_template.format(resume=resume, job=job, schema=Result.model_json_schema())
        )
        
        # Extract only the JSON part from the response
        response_text = response.text
        
        # Remove markdown code blocks if present
        json_content = re.sub(r'```(?:json)?\s*([\s\S]*?)\s*```', r'\1', response_text)
        
        # Try to parse the JSON to ensure it's valid and return as application/json
        try:
            import json
            parsed_json = json.loads(json_content)
            return jsonify(parsed_json)
        except json.JSONDecodeError:
            # If JSON parsing fails, return the cleaned text
            return jsonify({"error": "Failed to parse JSON response", "raw_response": json_content}), 500
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/search-jobs", methods=["GET"])
def search_jobs():
    query = request.args.get("query")
    location = request.args.get("location", "India")
    results_wanted = int(request.args.get("results", 20))
    hours_old = int(request.args.get("hours", 72))
    
    if not query:
        return jsonify({"error": "Missing query parameter"}), 400

    try:
        google_search_term = f"{query} jobs near {location} since yesterday"
        
        jobs = scrape_jobs(
            site_name=["indeed", "linkedin", "google", "naukri"],
            search_term=query,
            google_search_term=google_search_term,
            location=location,
            results_wanted=results_wanted,
            hours_old=hours_old,
            country_indeed="India",
        )
        
        # Convert DataFrame to JSON and then parse it to ensure proper JSON formatting
        jobs_json = jobs.to_json(orient="records")
        parsed_jobs = json.loads(jobs_json)
        
        # Return as proper JSON response
        return jsonify(parsed_jobs)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, port=3001)
