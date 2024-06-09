import numpy as np
import pandas as pd
import tensorflow as tf
import pickle
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from tensorflow import keras
from tensorflow.keras.layers import Embedding, Dense, Dropout, Bidirectional, LSTM, GRU, Input, GlobalMaxPooling1D, LayerNormalization, Conv1D, MaxPooling1D
from tensorflow.keras.optimizers import Adam, SGD
from tensorflow.keras import Sequential
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from pyvi import ViTokenizer
from pyvi import ViUtils

data = pd.read_csv('./datasets.csv')
data.head()

sentiment_data = pd.DataFrame({'input': data['text'], 'label': data ['label']})
sentiment_data = sentiment_data.dropna()
sentiment_data = sentiment_data.reset_index(drop=True)
sentiment_data.head()

input_data = sentiment_data['input'].values
input_label = sentiment_data['label'].values
input_pre = []

for idx, dt in enumerate(input_data):
    input_text_pre = list(tf.keras.preprocessing.text.text_to_word_sequence(dt))
    input_text_pre = " ".join(input_text_pre)
    input_text_pre_no_accent = str(ViUtils.remove_accents(input_text_pre).decode("utf-8"))
    input_text_pre_accent = ViTokenizer.tokenize(input_text_pre)
    input_pre.append(input_text_pre_accent)
    input_pre.append(input_text_pre_no_accent)

print("input_pre", input_pre)

tokenizer_data = Tokenizer(oov_token='<OOV>', filters = '', split = ' ')
tokenizer_data.fit_on_texts(input_pre)

print("tokenizer_data", tokenizer_data.word_index)

pickle.dump(tokenizer_data, open("./tokenizer_data.pickle", "wb"))