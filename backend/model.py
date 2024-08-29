# Import library
import numpy as np
import pandas as pd
import pickle
from sklearn.preprocessing import MinMaxScaler, LabelEncoder
from sklearn.ensemble import RandomForestClassifier

# Load dataset
df = pd.read_csv("diabetes_prediction_dataset.csv")
df = df.drop_duplicates()

# Label encoder
df['gender'] = LabelEncoder().fit_transform(df['gender']) # Female = 0, Male = 1, Others = 2
df['smoking_history'] = LabelEncoder().fit_transform(df['smoking_history']) # No Info=0, current=1, ever=2, former=3, never=4, not current=5

# Split target dataset
x = df.drop(['diabetes'], axis=1)
y = df['diabetes']

# Data normalization
x = MinMaxScaler().fit_transform(x)

# Model train
model = RandomForestClassifier(max_depth=4)
model.fit(x, y)

# Save model
pickle.dump(model, open('model.pkl', 'wb'))