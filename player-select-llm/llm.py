"""
File: llm.py

Before running:
1. Convert your Numbers file to CSV and name it "sample_data.csv" (or update the file name/path below).
2. Place "sample_data.csv" in the same directory as this script, or update the csv_path variable accordingly.
3. Install required packages:
   pip install flask pandas openai
4. Replace "YOUR_API_KEY" with your actual OpenAI API key.
"""

from flask import Flask, request, jsonify
import pandas as pd
import openai
import os
import re

# Set your OpenAI API key here
openai.api_key = "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"  # Replace with your OpenAI API key


app = Flask(__name__)

# Determine the path to the CSV file relative to this script
csv_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "sample_data.csv")

# Load the knowledge base CSV
try:
    players_df = pd.read_csv(csv_path)
    print("CSV file loaded successfully.")
except Exception as e:
    print("Error loading CSV file:", e)
    players_df = pd.DataFrame()  # Empty DataFrame if error

def compute_player_points(row):
    """
    Compute a player's points based on provided statistics.
    Using a simple formula: points = Total Runs + (Wickets * 25)
    (You can adjust this formula as needed.)
    """
    try:
        total_runs = float(row.get("Total Runs", 0))
        wickets = float(row.get("Wickets", 0))
        points = total_runs + (wickets * 25)
        return points
    except Exception:
        return 0

# Compute points for each player and store them internally.
if not players_df.empty:
    players_df["Points"] = players_df.apply(compute_player_points, axis=1)

def find_player_by_name(query, df):
    """
    Search for a player's name in the query.
    Assumes that 'Name' is one of the CSV columns.
    Returns the player row as a dictionary if found; else None.
    """
    if df.empty:
        return None

    query_lower = query.lower()
    for idx, row in df.iterrows():
        player_name = str(row.get("Name", "")).strip()
        if player_name and re.search(re.escape(player_name.lower()), query_lower):
            return row.to_dict()
    return None

def build_prompt_for_player(player_data, user_query):
    """
    Build a prompt that includes the player's dataset context.
    This prompt includes all provided variables except the computed 'Points'.
    """
    context_lines = []
    fields = ["Name", "University", "Category", "Total Runs", "Balls Faced", "Innings Played", "Wickets", "Overs Bowled", "Runs Conceded"]
    for field in fields:
        if field in player_data:
            context_lines.append(f"{field}: {player_data[field]}")
    context = "\n".join(context_lines)
    prompt = (
        "You are provided with a player's dataset context below. "
        "Answer the user's query based only on the provided context. "
        "Do not reveal any sensitive data such as the player's computed points.\n\n"
        "Player Context:\n"
        f"{context}\n\n"
        "User Query: " + user_query + "\n\n"
        "Answer:"
    )
    return prompt

def call_llm(prompt):
    """
    Call the OpenAI API to get a response for the given prompt.
    """
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are an assistant for a fantasy cricket game."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.5,
            max_tokens=150
        )
        answer = response["choices"][0]["message"]["content"].strip()
        return answer
    except Exception as e:
        return f"Error calling LLM: {str(e)}"

def is_sensitive_query(query):
    """
    Check if the query explicitly requests sensitive data.
    Allow best team suggestion queries even if they mention 'points' or similar.
    """
    lower_query = query.lower()
    if "best team" in lower_query or "optimal team" in lower_query:
        return False
    sensitive_keywords = ["points", "value", "score"]
    for keyword in sensitive_keywords:
        if re.search(r'\b' + re.escape(keyword) + r'\b', lower_query):
            return True
    return False

def best_team_suggestion():
    """
    Calculate the best possible team of 11 players based on the highest computed points.
    Returns an LLM response with the best team suggestion explanation.
    """
    if players_df.empty:
        return "No player data available."
    if "Points" not in players_df.columns:
        return "Points data not available for team selection."

    # Sort players by computed Points descending and select the top 11
    best_team_df = players_df.sort_values(by="Points", ascending=False).head(11)
    context_lines = []
    fields = ["Name", "University", "Category", "Total Runs", "Balls Faced", "Innings Played", "Wickets", "Overs Bowled", "Runs Conceded"]
    for idx, row in best_team_df.iterrows():
        line_parts = []
        for field in fields:
            line_parts.append(f"{field}: {row.get(field, 'N/A')}")
        line = ", ".join(line_parts)
        context_lines.append(line)
    context = "\n".join(context_lines)
    prompt = (
        "Based on the players' dataset provided below (excluding sensitive computed points), "
        "suggest the best possible team of 11 players with the highest combined performance. "
        "Explain the rationale behind this selection without revealing any sensitive data such as computed points.\n\n"
        "Team Candidate Context:\n" + context + "\n\n"
        "Answer:"
    )
    return call_llm(prompt)

@app.route("/", methods=["GET"])
def home():
    """
    Home endpoint to verify the API is running.
    """
    return jsonify({"message": "Welcome to the LLM Chat API. Use the /chat endpoint with POST requests to interact."})

@app.route("/chat", methods=["POST"])
def chat():
    """
    Chat endpoint that receives a query and returns the LLM's answer.
    """
    data = request.get_json()
    if not data or "query" not in data:
        return jsonify({"error": "Invalid request. Please provide a 'query' field."}), 400

    user_query = data["query"]

    # Check if the query is a best team suggestion query
    if "best team" in user_query.lower() or "optimal team" in user_query.lower():
        llm_response = best_team_suggestion()
        return jsonify({"response": llm_response})

    # Check if the query explicitly requests sensitive data
    if is_sensitive_query(user_query):
        return jsonify({"response": "I'm sorry, I cannot disclose that information."})

    # Attempt to find a player in the knowledge base whose name is mentioned in the query.
    player = find_player_by_name(user_query, players_df)
    if player:
        prompt = build_prompt_for_player(player, user_query)
        llm_response = call_llm(prompt)
        return jsonify({"response": llm_response})
    else:
        # Fallback for unknown queries
        fallback_response = "I don't have enough knowledge to answer that question."
        return jsonify({"response": fallback_response})

if __name__ == "__main__":
    app.run(debug=True)