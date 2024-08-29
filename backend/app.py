import pandas as pd
import pickle
from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.preprocessing import MinMaxScaler

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})

model = pickle.load(open("model.pkl", "rb"))

@app.route("/", methods=['GET'])
def get_data():
    data = {
        "message": "API is running",
    }
    
    return jsonify(data)

@app.route("/predict", methods=['POST'])
def predict():
    try:
        data = request.get_json()
        df = pd.DataFrame([data])
        
        x_gender = (int(df['gender'][0]) - 0) / (2 - 0)
        x_age = (float(df['age'][0]) - 0.08) / (80.0 - 0.08)
        x_hypertension = (int(df['hypertension'][0]) - 0) / (1 - 0)
        x_heart_disease = (int(df['heart_disease'][0]) - 0) / (1 - 0)
        x_smoking_history = (int(df['smoking_history'][0]) - 0) / (5 - 0)
        x_bmi = (float(df['bmi'][0]) - 10.01) / (95.69 - 10.01)
        x_HbA1c_level = (float(df['HbA1c_level'][0]) - 3.5) / (9.0 - 3.5)
        x_blood_glucose_level = (float(df['blood_glucose_level'][0]) - 80.0) / (300.0 - 80.0)

        x_data = {
            'gender': x_gender,
            'age': x_age,
            'hypertension': x_hypertension,
            'heart_disease': x_heart_disease,
            'smoking_history': x_smoking_history,
            'bmi': x_bmi,
            'HbA1c_level': x_HbA1c_level,
            'blood_glucose_level': x_blood_glucose_level
        }
        x = pd.DataFrame(x_data, index=[0])

        prediction = model.predict(x)
        print(prediction)
        return jsonify({'Prediction': int(prediction[0])})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == "__main__":
    app.run(debug=True, port=5000)