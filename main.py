from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import pandas as pd

# Load Exercise Library
EXERCISE_LIBRARY_PATH = "Final_Exercise_Library_Perfected.xlsx"
exercise_df = pd.read_excel(EXERCISE_LIBRARY_PATH)

app = FastAPI()

# Enable CORS so frontend can talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define input model
class PlanRequest(BaseModel):
    days: int
    goal: str
    equipment: str
    fitness_level: str
    injuries: str
    energy_level: int

# Generate Workout Plan Endpoint
@app.post("/generate_multi_day_plan")
def generate_plan(request: PlanRequest):
    # Map fitness level → Progression Tier keywords
    fitness_map = {
        "Beginner": "Level 1",
        "Intermediate": "Level 2",
        "Advanced": "Level 3"
    }

    # Split equipment list into tokens
    equipment_list = [x.strip().lower() for x in request.equipment.split(",") if x.strip()]

    # Split injuries into tokens
    injury_list = [x.strip().lower() for x in request.injuries.split(",") if x.strip()]

    # Filter exercises:
    filtered_df = exercise_df.copy()

    # Goal match (loose match in Goal column)
    filtered_df = filtered_df[filtered_df['Goal'].str.contains(request.goal, case=False, na=False)]

    # Equipment match (if equipment given)
    if equipment_list:
        filtered_df = filtered_df[
            filtered_df['Equipment Used'].fillna('').str.lower().apply(
                lambda x: any(eq in x for eq in equipment_list)
            ) |
            filtered_df['Tool Compatibility'].fillna('').str.lower().apply(
                lambda x: any(eq in x for eq in equipment_list)
            )
        ]

    # Fitness Level match
    progression_filter = fitness_map.get(request.fitness_level, "")
    filtered_df = filtered_df[
        filtered_df['Progression Tier'].fillna('').str.contains(progression_filter, case=False, na=False)
    ]

    # Energy Level → map to Difficulty Score
    max_difficulty_score = min(10, request.energy_level * 3)
    filtered_df = filtered_df[
        (filtered_df['Difficulty Score'].fillna(0) <= max_difficulty_score)
    ]

    # Injury filtering
    def is_injury_safe(row):
        injury_text = str(row['Injury Modifiers']) + " " + str(row['More Injury Modifiers'])
        injury_text = injury_text.lower()
        for injury in injury_list:
            if injury in injury_text:
                return False
        return True

    filtered_df = filtered_df[filtered_df.apply(is_injury_safe, axis=1)]

    # Now build structured workout plan
    workout_plan = []

    for day in range(request.days):
        day_plan = {"day": day + 1, "sections": {}}

        def pick_exercises(phase_filter, count):
            phase_df = filtered_df[filtered_df['Phase of Use'].fillna('').str.contains(phase_filter, case=False, na=False)]
            phase_df = phase_df.sample(n=min(count, len(phase_df))) if not phase_df.empty else pd.DataFrame()
            return phase_df['Exercise Name'].tolist()

        # Section picks:
        day_plan['sections']['Warmup'] = pick_exercises("Warmup", 1)
        day_plan['sections']['Main Lifts'] = pick_exercises("Main Lift", 2)
        day_plan['sections']['Accessories'] = pick_exercises("Accessory", 3)
        day_plan['sections']['Finisher'] = pick_exercises("Finisher", 1)
        day_plan['sections']['Cooldown'] = pick_exercises("Cooldown|Mobility", 1)

        workout_plan.append(day_plan)

    return {"plan": workout_plan}
