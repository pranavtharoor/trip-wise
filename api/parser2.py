import os

import requests,json,sys

url = "https://westcentralus.api.cognitive.microsoft.com/vision/v2.0/ocr"

querystring = {"language":"en","detectOrientation":"true"}

payload = "{\n\t\"url\":\"https://i.imgur.com/jk6yeOw.jpg\"\n}"
headers = {
    'Ocp-Apim-Subscription-Key': "4d57713233d64a4bbb5b07a3633ed0cd",
    'Content-Type': "application/json",
    'User-Agent': "PostmanRuntime/7.13.0",
    'Accept': "*/*",
    'Cache-Control': "no-cache",
    'Postman-Token': "06c72356-ea67-450f-9c80-c4547cb1b3c1,ce1da650-ce78-4e3c-a45c-73f215f28324",
    'Host': "westcentralus.api.cognitive.microsoft.com",
    'accept-encoding': "gzip, deflate",
    'content-length': "44",
    'Connection': "keep-alive",
    'cache-control': "no-cache"
    }

response = requests.request("POST", url, data=payload, headers=headers, params=querystring)

js = json.loads(response.text)

boxes = js['regions']
for box in boxes:
    comp = box#['lines']
    if(comp['boundingBox']=='704,395,58,211'):
        tmp = comp['lines']
        res = tmp[:3]
        res.append(tmp[4])
        costs = []
        for r in res:
            costs.append(r['words'][0]['text'])
        print(costs)
    elif(comp['boundingBox']=='70,331,155,186'):
        tmp = comp['lines']
        res = tmp[1:6]
        items = []
        for r in res:
            out = ""
            for i in range(1,len(r['words'])):
                out += r['words'][i]['text'] + " "
            items.append(out)
        print(items)
    #for word in comp:
    #    print(word['']);
sys.stdout.flush()