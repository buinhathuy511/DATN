import numpy as np
from tensorflow.keras.models import load_model # type: ignore
from tensorflow.keras.preprocessing.sequence import pad_sequences # type: ignore
from pyvi import ViTokenizer # type: ignore
import pickle

my_model = load_model('./model_cnn_bilstm.h5')

tokenizer_data = pickle.load(open('./tokenizer_data.pickle', 'rb'))

def preprocess_raw_input(raw_input, tokenizer):
  input_text_pre_accent = ViTokenizer.tokenize(raw_input)
  print("Text preprocessed:", input_text_pre_accent)
  tokenized_data_text = tokenizer.texts_to_sequences([input_text_pre_accent])
  print("Tokenized data:", tokenized_data_text)
  vec_data = pad_sequences(tokenized_data_text, padding='post', maxlen = 512)
  return vec_data

def inference_model(input_feature, model):
  output = model(input_feature).numpy()[0]
  result = output.argmax()
  conf = float(output.max())
  label_dict = {'negative':0, 'neutral':1, 'positive':2}
  label = list(label_dict.keys())
  return label[int(result)], conf

def prediction(raw_input):
  input_model = preprocess_raw_input(raw_input, tokenizer_data)
  result, conf = inference_model(input_model, my_model)

  return {"result":result, "conf":conf}
