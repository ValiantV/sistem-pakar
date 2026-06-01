# Panduan Modifikasi Knowledge Base

## Lokasi File
`src/data/knowledgeBase.ts`

---

## Struktur Data

### 1. Menambah/Mengubah Gejala (Symptoms)

Array `symptoms` berisi 23 objek dengan tipe:

```ts
interface Symptom {
  id: string;       // Kode unik, format G01-G99
  label: string;    // Label singkat gejala
  question: string; // Pertanyaan lengkap yang ditampilkan ke pengguna
}
```

**Contoh menambah gejala baru:**
```ts
{
  id: 'G24',
  label: 'Nyeri dada saat bernapas',
  question: 'Saya mengalami nyeri dada ketika menarik napas.',
},
```

> ⚠️ **Penting:** ID harus unik dan tidak boleh duplikat.

---

### 2. Menambah/Mengubah Penyakit (Diseases)

Array `diseases` berisi 10 objek dengan tipe:

```ts
interface Disease {
  id: string;              // Slug unik, contoh: 'tbc', 'malaria'
  name: string;            // Nama penyakit lengkap
  shortDesc: string;       // Deskripsi singkat (maks 1 baris)
  fullDesc: string;        // Deskripsi panjang untuk halaman detail
  symptoms: string[];      // Array ID gejala yang menjadi ATURAN diagnosa
  commonSymptoms: string[]; // Label gejala umum untuk halaman detail
  selfCare: string;        // Langkah awal mandiri (pisahkan dengan \n)
  image?: string;          // Path gambar dari folder /public
  icon?: string;           // Nama icon untuk pemetaan (tbc/malaria/dll)
}
```

**Contoh menambah penyakit baru:**
```ts
{
  id: 'pneumonia',
  name: 'Pneumonia',
  shortDesc: 'Pneumonia adalah infeksi pada paru-paru yang...',
  fullDesc: 'Pneumonia adalah infeksi serius yang menyebabkan...',
  symptoms: ['G01', 'G02', 'G08', 'G03'],  // <= Aturan diagnosa
  commonSymptoms: ['Batuk berdahak', 'Sesak napas', 'Demam tinggi'],
  selfCare: 'Istirahat total\nMinum air hangat\nSegera ke dokter',
  image: '/assets/Image.png',
  icon: 'lungs',
},
```

---

### 3. Aturan Diagnosa (Inference Rules)

Field `symptoms` pada tiap penyakit adalah **aturan (rule)** untuk mesin inferensi.

**Formula:** `Probabilitas = (Gejala cocok / Total gejala penyakit) × 100%`

**Contoh:**
- Penyakit TBC memiliki aturan: `['G01', 'G02', 'G05', 'G06']` (4 gejala)
- Jika pengguna mencentang G01 dan G05 → Probabilitas TBC = 2/4 × 100% = **50%**

---

### 4. Matrix Aturan Saat Ini

| Penyakit | ID | Aturan Gejala |
|----------|-----|---------------|
| TBC | tbc | G01, G02, G05, G06 |
| Malaria | malaria | G04, G05, G21, G10 |
| ISPA | ispa | G07, G03, G08 |
| Gastritis | gastritis | G11, G10, G12 |
| Hipertensi | hipertensi | G09, G17 |
| Diare | diare | G13, G14 |
| Flu | flu | G07, G04, G15 |
| Myalgia | myalgia | G15, G16 |
| Diabetes Mellitus | diabetes | G18, G19, G20 |
| Dermatitis | dermatitis | G22, G23 |

---

### 5. Daftar Kode Gejala

| Kode | Label |
|------|-------|
| G01 | Batuk lebih dari 2 minggu |
| G02 | Batuk disertai dahak kental atau darah |
| G03 | Demam ringan berlangsung lama |
| G04 | Demam tinggi yang muncul berulang |
| G05 | Sering menggigil atau berkeringat malam hari |
| G06 | Berat badan menurun tanpa sebab |
| G07 | Batuk, pilek, atau sakit tenggorokan |
| G08 | Sesak napas ringan |
| G09 | Sering sakit kepala atau pusing |
| G10 | Mual atau muntah |
| G11 | Nyeri atau perih di ulu hati |
| G12 | Perut terasa kembung atau cepat kenyang |
| G13 | BAB cair lebih dari 3 kali sehari |
| G14 | Diare disertai perut mulas atau lemas |
| G15 | Nyeri, pegal, atau kaku pada otot |
| G16 | Nyeri otot bertambah saat bergerak |
| G17 | Mudah merasa lelah dalam waktu lama |
| G18 | Sering merasa haus dan lapar berlebihan |
| G19 | Sering buang air kecil |
| G20 | Luka pada tubuh sulit sembuh |
| G21 | Demam disertai sakit kepala berat |
| G22 | Kulit terasa gatal |
| G23 | Kulit terlihat merah, kering, atau bersisik |

---

### 6. Workflow Setelah Modifikasi

1. Edit `src/data/knowledgeBase.ts`
2. Tidak perlu restart — Next.js hot-reload otomatis mendeteksi perubahan
3. Untuk produksi: jalankan `npm run build` lalu deploy ulang ke Vercel
