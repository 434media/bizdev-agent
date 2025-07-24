def run(response: str) -> None:
    """
    Accepts the final response and prints that it was added to Airtable.
    This will eventually actually add data to Airtable.
    """
    print(f"Add data module received response: {response}")
    
    # Log the received response
    print(f"Final LLM response: {response}")
    
    # Print that data was added to Airtable
    print("Data was added to Airtable") 