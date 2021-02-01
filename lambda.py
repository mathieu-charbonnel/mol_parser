import json
import re
from collections import Counter

#my lamda function

def tokenize_mol(molecule):
    return re.findall('[A-Z][a-z]?|\d+|.', molecule)


def lambda_handler(event, context):
    
    def tokenize_mol(molecule):
        return re.findall('[A-Z][a-z]?|\d+|.', molecule)
    
    my_mol=event['molecule']

    composition = [[]]

    for token in tokenize_mol(my_mol):
        
        if token.isalpha():
            last = [token]
            composition[-1].append(token)
        elif token.isdecimal():
            count=int(token)
            composition[-1].extend(last*(count-1))
        elif token in '([{':
            composition.append([])
        elif token in ')]}':
            last = composition.pop()
            composition[-1].extend(last)

    my_dict = dict(Counter(composition[-1]))
    
    return (my_dict)
    
