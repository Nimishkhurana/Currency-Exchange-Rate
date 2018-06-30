from flask import Flask,render_template,request,jsonify
import requests

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/convert",methods=["POST"])
def convert():
    currency = request.form.get('currency')
    res = requests.get("http://data.fixer.io/api/latest?access_key=076e37e7f7fc9fd9f94921f65df3b421&format=1",
                        params = {'symbols':currency})

    if res.status_code!=200 :
        return jsonify({'success':False}),202

    data = res.json()

    if not data['success']:
        return jsonify({'success':False})

    return jsonify({'success':True,'rate':data['rates'][currency]})
