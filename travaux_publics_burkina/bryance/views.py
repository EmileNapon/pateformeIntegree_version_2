# your_app/views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import numpy as np
import joblib
import os

from .serializers import FeatureInputSerializer

# Charger le modèle et le scaler une seule fois
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model = joblib.load(os.path.join(BASE_DIR, 'models_KNN', 'knn_model.pkl'))
scaler = joblib.load(os.path.join(BASE_DIR, 'models_KNN', 'scaler.pkl'))

@api_view(['POST'])
def predict_dmos(request):
    serializer = FeatureInputSerializer(data=request.data)
    
    if serializer.is_valid():
        features = serializer.validated_data['features']
        input_array = np.array(features).reshape(1, -1)
        input_scaled = scaler.transform(input_array)
        prediction = model.predict(input_scaled)[0]
        return Response({'prediction': float(prediction)})
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
