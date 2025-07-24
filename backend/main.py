from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import data_gathering
import gather_434
import generate_response
import add_data

app = FastAPI(title="Company Pipeline API", version="1.0.0")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CompanyData(BaseModel):
    company_name: str
    company_url: str
    worker_name: Optional[str] = None
    worker_email: Optional[str] = None
    additional_info: Optional[str] = None

@app.get("/")
async def root():
    return {"message": "Company Pipeline API is running"}

@app.post("/process")
async def process_company_data(data: CompanyData):
    try:
        print(f"Received company data: {data}")
        
        # Step 1: Data gathering
        print("Step 1: Running data gathering...")
        data_result = data_gathering.run(data.dict())
        print(f"Data gathering result: {data_result}")
        
        # Step 2: Gather 434 data
        print("Step 2: Running 434 gathering...")
        gather_result = gather_434.run(data_result)
        print(f"434 gathering result: {gather_result}")
        
        # Step 3: Generate response
        print("Step 3: Generating response...")
        response_result = generate_response.run(gather_result)
        print(f"Response generation result: {response_result}")
        
        # Step 4: Add data to Airtable
        print("Step 4: Adding data to Airtable...")
        add_data.run(response_result)
        
        return {"message": response_result}
        
    except Exception as e:
        print(f"Error processing request: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 