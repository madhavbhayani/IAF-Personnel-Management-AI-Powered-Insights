import streamlit as st
import requests
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

# --- Page Configuration ---
st.set_page_config(
    page_title="IAF Human Management AI",
    page_icon="✈️",
    layout="wide" # Use wide layout for better graph display
)

# --- Load Data for Plotting ---
# This function loads the data once and caches it for performance
@st.cache_data
def load_data():
    try:
        df = pd.read_csv('dataset_4.csv')
        # Basic cleaning for consistency in plots
        df['AttritionRisk'] = df['AttritionRisk'].str.title()
        df['LeadershipPotential'] = df['LeadershipPotential'].str.title()
        return df
    except FileNotFoundError:
        return None

df_original = load_data()

# --- App Title ---
st.title("✈️ IAF AI-Powered Personnel Insights")
st.write("Enter personnel data to predict Leadership Potential and Attrition Risk, or explore the workforce analytics dashboard below.")

# --- Prediction Section ---
st.header("Personnel Prediction Tool")
with st.form("prediction_form"):
    # Create columns for a cleaner layout
    col1, col2 = st.columns(2)

    with col1:
        age = st.slider("Age", 20, 60, 35)
        years_of_service = st.slider("Years of Service", 1, 40, 12)
        rank = st.selectbox("Rank", ["Flying Officer", "Flight Lieutenant", "Squadron Leader", "Wing Commander", "Group Captain"])
        specialization = st.selectbox("Specialization", ["Pilot", "Engineer", "Admin", "Ground Staff", "Medical"])
        performance_rating = st.slider("Performance Rating (1-5)", 1, 5, 4)
    
    with col2:
        training_courses = st.slider("Training Courses Completed", 0, 20, 9)
        mission_success_rate = st.slider("Mission Success Rate (%)", 0.0, 100.0, 98.5)
        medical_fitness = st.slider("Medical Fitness Score", 0, 100, 96)
        peer_review = st.slider("Peer Review Score (1-5)", 1.0, 5.0, 4.7)
        commanders_assessment = st.slider("Commander's Assessment (1-5)", 1.0, 5.0, 4.8)

    submitted = st.form_submit_button("Analyze Personnel", type="primary")

if submitted:
    api_data = {
        "PersonnelID": 101, "Age": age, "YearsOfService": years_of_service, "Rank": rank,
        "Specialization": specialization, "PerformanceRating": performance_rating,
        "TrainingCoursesCompleted": training_courses, "MissionSuccessRate": mission_success_rate,
        "MedicalFitnessScore": medical_fitness, "PeerReviewScore": peer_review,
        "CommandersAssessment": commanders_assessment, "AttritionRisk": "Low" # Placeholder
    }
    with st.spinner('Asking the AI...'):
        try:
            response = requests.post("http://127.0.0.1:5000/predict", json=api_data)
            response.raise_for_status()
            prediction = response.json()
            st.success("Analysis Complete!")
            res_col1, res_col2 = st.columns(2)
            res_col1.metric(label="Predicted Leadership Potential", value=prediction['leadership_potential'])
            res_col2.metric(label="Predicted Attrition Risk", value=prediction['attrition_risk'])
        except Exception as e:
            st.error(f"Could not connect to the API. Make sure the backend (app.py) is running. Error: {e}")

# --- Analytics Dashboard Section ---
st.header("Workforce Analytics Dashboard")
if df_original is not None:
    with st.expander("Explore Workforce Data Visualizations"):
        # Set a professional style for the plots
        sns.set_style("whitegrid")
        
        # Create two columns for the graphs
        fig_col1, fig_col2 = st.columns(2)

        with fig_col1:
            # --- 1. Bar Chart: Distribution of Personnel by Rank ---
            st.subheader("Distribution of Personnel by Rank")
            fig1, ax1 = plt.subplots(figsize=(8, 6))
            rank_order = df_original['Rank'].value_counts().index
            sns.countplot(y='Rank', data=df_original, order=rank_order, palette='Blues_r', ax=ax1)
            ax1.set_xlabel('Number of Personnel')
            ax1.set_ylabel('Rank')
            st.pyplot(fig1)

            # --- 3. Scatter Plot: Years of Service vs. Mission Success Rate ---
            st.subheader("Years of Service vs. Mission Success Rate")
            fig3, ax3 = plt.subplots(figsize=(8, 6))
            sns.scatterplot(x='YearsOfService', y='MissionSuccessRate', data=df_original, alpha=0.6, color='green', ax=ax3)
            ax3.set_xlabel('Years of Service')
            ax3.set_ylabel('Mission Success Rate (%)')
            st.pyplot(fig3)
            
        with fig_col2:
            # --- 2. Histogram: Age Distribution ---
            st.subheader("Age Distribution of IAF Personnel")
            fig2, ax2 = plt.subplots(figsize=(8, 6))
            sns.histplot(df_original['Age'], bins=15, kde=True, color='navy', ax=ax2)
            ax2.set_xlabel('Age')
            ax2.set_ylabel('Frequency')
            st.pyplot(fig2)

            # --- 4. Box Plot: Mission Success Rate by Rank ---
            st.subheader("Mission Success Rate Across Ranks")
            fig4, ax4 = plt.subplots(figsize=(8, 6))
            sns.boxplot(x='MissionSuccessRate', y='Rank', data=df_original, order=rank_order, palette='coolwarm', ax=ax4)
            ax4.set_xlabel('Mission Success Rate (%)')
            ax4.set_ylabel('Rank')
            st.pyplot(fig4)
else:
    st.warning("Could not load dataset_4.csv. Please make sure the file is in the same folder.")