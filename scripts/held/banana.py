import json, base64, sys, urllib.request, re, time
# Gebruik: python3 -I banana.py <doel.jpg> <prompt-bestand> [aspect] [size] [referentie.png ...]
doel, promptpad = sys.argv[1], sys.argv[2]
aspect = sys.argv[3] if len(sys.argv) > 3 else "16:9"
size = sys.argv[4] if len(sys.argv) > 4 else "2K"
refs = sys.argv[5:]
env = open(__import__("os").path.join(__import__("os").path.dirname(__file__), "../../.env.local")).read()
key = re.search(r'^GEMINI_API_KEY=["\']?([^"\'\n]+)', env, re.M).group(1)
prompt = open(promptpad).read().strip()
parts = [{"text": prompt}]
for r in refs:
    mime = "image/png" if r.endswith(".png") else "image/jpeg"
    parts.append({"inlineData": {"mimeType": mime, "data": base64.b64encode(open(r, "rb").read()).decode()}})
body = {"contents": [{"parts": parts}],
        "generationConfig": {"responseModalities": ["TEXT", "IMAGE"], "imageConfig": {"aspectRatio": aspect, "imageSize": size}}}
req = urllib.request.Request("https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image:generateContent",
                             data=json.dumps(body).encode(), headers={"x-goog-api-key": key, "Content-Type": "application/json"})
t0 = time.time()
try:
    resp = json.load(urllib.request.urlopen(req, timeout=300))
except urllib.error.HTTPError as e:
    print("HTTP", e.code, e.read()[:800].decode(errors="replace")); sys.exit(1)
for p in resp.get("candidates", [{}])[0].get("content", {}).get("parts", []):
    if "inlineData" in p:
        data = base64.b64decode(p["inlineData"]["data"])
        open(doel, "wb").write(data)
        print("opgeslagen", doel, len(data), "bytes", p["inlineData"]["mimeType"], f"{time.time()-t0:.0f}s")
        break
    elif "text" in p:
        print("tekst:", p["text"][:300])
else:
    print("geen beeld in antwoord:", json.dumps(resp)[:600])
