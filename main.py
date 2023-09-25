from flask import render_template, Flask, request, jsonify, redirect, url_for
import joblib

app = Flask(__name__)

@app.route("/home")
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/check")
def analize():
    return render_template("first.html")

@app.route("/data")
def masukkan():
    return render_template("second.html")

@app.route("/result")
def hasil():
    return render_template("third.html")

@app.route('/api', methods=['POST'])
def process_data():
    data = request.json  # Menerima data JSON dari JavaScript

    if 'data1' in data and 'data2' in data and 'data3' in data and 'data4' in data and 'data5' in data and 'data6' in data and 'data7' in data:

        Suhu = int(data['data1'])
        HR = int(data['data2'])
        BPM = int(data['data3'])
        SPO2 = int(data['data4'])
        Gender = int(data['data5'])
        Angina = int(data['data6'])
        Nyeri = int(data['data7'])
        # Proses data yang diterima dari JavaScript di sini
        # Contoh: Menggandakan data yang diterima
        # Muat model pertama dengan kolom 'Temperature', 'Heart_rate', 'SPO2'
        random_forest_model1 = joblib.load("rf_model1.pkl")

        # Muat model kedua dengan kolom 'Sex', 'Chest pain type', 'Max HR', 'Exercise angina', 'Heart Disease'
        random_forest_model2 = joblib.load("rf_model2.pkl")

        # Fungsi untuk memprediksi dengan model pertama
        def predict_with_model1(temperature, heart_rate, spo2):
            input_data = [[temperature, heart_rate, spo2]]
            prediction = random_forest_model1.predict(input_data)
            return prediction[0]

        # Fungsi untuk memprediksi dengan model kedua
        def predict_with_model2(sex, chest_pain_type, max_hr, exercise_angina):
            input_data = [[sex, chest_pain_type, max_hr, exercise_angina]]
            prediction = random_forest_model2.predict(input_data)
            return prediction[0]

        # Melakukan prediksi dengan model pertama
        prediction1 = predict_with_model1(Suhu, BPM, SPO2)

        # Melakukan prediksi dengan model kedua
        prediction2 = predict_with_model2(Gender, Nyeri, HR, Angina)

        # Memberikan bobot pada masing-masing model
        weight_model1 = 0.3 # Contoh bobot untuk model pertama
        weight_model2 = 0.7  # Contoh bobot untuk model kedua

        # Menggabungkan hasil prediksi dari kedua model (menggunakan aturan mayoritas)
        final_prediction = (weight_model1 * prediction1 + weight_model2 * prediction2) / (weight_model1 + weight_model2)
        #stop program
        #lanjutan program
        # Menghitung tingkat normalitas (persentase)
        normal_percentage = (1 - final_prediction) * 100

        # Menampilkan hasil prediksi akhir
        if final_prediction <= 0.5:
            hasil1 = (f"Status: Normal ({normal_percentage:.2f}%)")
        else:
            hasil1 = (f"Status: Tidak Normal ({100 - normal_percentage:.2f}%)")


        return jsonify(hasil1)  # Mengirimkan hasil kembali ke JavaScript
    else:
        return jsonify({"error": "Data tidak lengkap"})

if __name__ == "__main__":
    app.run(debug=True)
