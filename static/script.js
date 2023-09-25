import { data_BPM, data_SPO2 } from './firebase-config.js'; // Sesuaikan path dengan nama berkas Anda

let inputInteger3;
let inputInteger4;
var data;

document.addEventListener("DOMContentLoaded", function () {
    //tidak lebih dari 150
    var input2 = document.getElementById("input2");
    //tidak diatas 36,2
    var input1 = document.getElementById("input1");
    var errorMessage1 = document.getElementById("error-message1");
    var errorMessage2 = document.getElementById("error-message2");
    var formGender = document.getElementById("formGender");
    var formAngina = document.getElementById("formAngina");
    var pilihanNyeri = document.getElementById("Nyeri");
    //max suhu
    input1.addEventListener("input", function () {
        var nilai = parseInt(input1.value, 10);

        if (nilai < 16.9 || nilai > 36.2) {
            input1.classList.add("input-error");
            errorMessage1.textContent = "Nilai harus antara 17 dan 36°C";
        } else {
            input1.classList.remove("input-error");
            errorMessage1.textContent = "";
        }
    });
    
    //max HR
    input2.addEventListener("input", function () {
        var nilai = parseInt(input2.value, 10);

        if (nilai < 60 || nilai > 175) {
            input2.classList.add("input-error");
            errorMessage2.textContent = "Nilai harus antara 60 dan 175";
        } else {
            input2.classList.remove("input-error");
            errorMessage2.textContent = "";
        }
    });
    //ketika tombol ditekan
    document.getElementById("tombol").addEventListener("click", function (){
        // mendefinisikan data dari input
        //jenis kelamin
        var selectedGender = document.querySelector('input[name="gender"]:checked');
        var genderValue = selectedGender ? selectedGender.value : "Belum dipilih";

        //Angina
        var selectedAngina = document.querySelector('input[name="Angina"]:checked');
        var AnginaValue = selectedAngina ? selectedAngina.value : "Belum dipilih";

        //Suhu dan Max HR
        var dataToSend1 = document.getElementById("input1").value;
        var dataToSend2 = document.getElementById("input2").value; 
        
        //tipe nyeri
        var selectedOption = Nyeri.options[Nyeri.selectedIndex];
        var selectedNyeri = selectedOption.value;

        //Cek apakah semua input telah dimasukkan
        if (input1.value !== "" && input2.value !== "" && genderValue !== "Belum dipilih" && AnginaValue !== "Belum dipilih" ) {
            //setelah aksi selesai, nilai menjadi kosong kembali
            input1.value = "";
            input2.value = "";

            //gender reset
            var radioGender = formGender.querySelectorAll('input[type="radio"]');
            for (var i = 0; i < radioGender.length; i++) {
                radioGender[i].checked = false;
            }

            //angina reset
            var radioAngina = formAngina.querySelectorAll('input[type="radio"]');
            for (var i = 0; i < radioAngina.length; i++) {
                radioAngina[i].checked = false;
            }

            //Nyeri reset
            pilihanNyeri.selectedIndex = 0;

            var inputInteger1 = parseInt(dataToSend1);
            var inputInteger2 = parseInt(dataToSend2);
            inputInteger3 = parseInt(data_BPM);
            inputInteger4 = parseInt(data_SPO2);
            var inputInteger5 = parseInt(genderValue);
            var inputInteger6 = parseInt(AnginaValue);
            var inputInteger7 = parseInt(selectedNyeri);

            var dataToSend = {
                data1: inputInteger1,
                data2: inputInteger2,
                data3: inputInteger3,
                data4: inputInteger4,
                data5: inputInteger5,
                data6: inputInteger6,
                data7: inputInteger7
            };

            //memeriksa apakah konversi berhasil
            if (!isNaN(inputInteger1)) {
            // Melakukan permintaan HTTP POST ke server Python
            fetch('/api', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend)
            })
            .then(response => response.json())
            .then(data => {
                // Menggunakan hasil yang diterima dari python
                var hasilElement = document.getElementById("hasil");
                hasilElement.innerHTML = "Hasil dari python: " + data;
            })
            .catch(error => {
                var hasil2 = document.getElementById("hasil");
                hasil2.innerHTML = "Gagal melakukan permintaan" + error
            });
        } else {
            alert("masukkan data yang valid (bilangan bulat)");
        }
        } else {
            alert("Silakan isi semua input sebelum menekan tombol.");
        }
    });
});
export { inputInteger3, inputInteger4, data};