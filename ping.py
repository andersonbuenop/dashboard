import os
import json

with open("C:/Users/ander/OneDrive/Dashboard01/dashboard/hostname.txt") as file:
    dump = file.read()
    dump = dump.splitlines()
    print(dump)
for ip in dump:
    res = os.popen(f"ping {ip}").read()
    if("destino") in res:
        print("down")
        with open('data.json', 'w', encoding='utf-8') as f:
            json.dump(ip, f, ensure_ascii=False, indent=4)        
    else: print("up")