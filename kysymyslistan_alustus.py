import os
import json
from os import path
from google.cloud import translate_v2
from numpy import random
import random
import re
#En ihan varma oliko se tälläinen, kun muokkasinkin jo välissä, mutta tällä about tein sen jsonin, missä on kysymykset: mm. sana ja käännökset
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = r"googlekey.json"
translate_client = translate_v2.Client()

def readFile(fileName): #Otetaan sanat txt-filusta ja laitetaan taulukkoo
    
        fileObj = open(fileName, "r") 
       
        words = fileObj.read().splitlines()
        
        #print(words)
        fileObj.close()
        return words

def transLate(en):
    output = translate_client.translate(en,
    target_language="fi")
    return output["translatedText"]

def translate_word_fi(word):
    
    output = translate_client.translate(word,
    target_language="fi")
    return output["translatedText"]

def translate_word_fr(word):
    
    output = translate_client.translate(word,
    target_language="fr")
    return output["translatedText"]

def translate_word_it(word):
    
    output = translate_client.translate(word,
    target_language="it")
    return output["translatedText"]
    


#------------OLIO OSUUS: itse kysymys----------------
class question:
    def __init__(self, ID, fi, en, fr, it, points, on_round, completed):
        self.id = ID 
        self.fi = fi 
        self.en = en 
        self.fr = fr
        self.it = it
        self.points = points 
        self.round = on_round #/Jäi käyttämättä
        self.completed = completed #/Jäi käyttämättä 
        
words = readFile("3000.txt") #Tässä haetaan sanat txt-filusta

q_list = []

for i in range(len(words)):
    q_list.append(question(i,translate_word_fi(words[i]),words[i],translate_word_fr(words[i]),translate_word_it(words[i]),0,False,False))

random.shuffle(q_list)

with open('data.json', 'a+', encoding='utf-8') as f:
    json.dump(q_list, f, ensure_ascii=False, indent=4)


