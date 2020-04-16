import pandas as pd
pd.read_csv('dummy_dataset4 -exam.csv', header=None).T.to_csv('dummy_dataset4 -exam-transformed.csv', header=False, index=False)