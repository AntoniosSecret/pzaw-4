import random as rand
import json

json_file = open("data.json", "w")
x: str = "[\n"

def generateJSON(json_str: str) -> str:
    for i in range(167):
        random_letters = "".join(rand.choices("ABCDEFGHIJKLMNOPQRSTUVWXYZ", k=5))
        json_str += f'{{"id":"id_{i}", "count": {rand.randrange(0, 50)}, "text": "{random_letters}"}}'
        if i != 166:
            json_str += ','
        json_str += "\n"
    json_str += "]"
    return json_str

#a = json.loads(generateJSON(x))

json_file.write(generateJSON(x))

json_file.close()
"""
{
    "id": "id_0",
    "count": 49,
    "text": "AABST",
}

"""