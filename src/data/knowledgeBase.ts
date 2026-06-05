import { Symptom, Disease } from '@/types';

export const symptoms: Symptom[] = [
  {
    id: 'G01',
    label: 'Batuk lebih dari 2 minggu',
    question: 'Saya mengalami batuk lebih dari 2 minggu.',
  },
  {
    id: 'G02',
    label: 'Batuk disertai dahak kental atau darah',
    question: 'Batuk saya disertai dahak kental atau darah.',
  },
  {
    id: 'G03',
    label: 'Demam ringan berlangsung lama',
    question: 'Saya mengalami demam ringan yang berlangsung lama.',
  },
  {
    id: 'G04',
    label: 'Demam tinggi yang muncul berulang',
    question: 'Saya mengalami demam tinggi yang muncul berulang.',
  },
  {
    id: 'G05',
    label: 'Sering menggigil atau berkeringat malam hari',
    question: 'Saat demam, saya sering menggigil atau berkeringat di malam hari.',
  },
  {
    id: 'G06',
    label: 'Berat badan menurun tanpa sebab',
    question: 'Berat badan saya menurun tanpa sebab yang jelas.',
  },
  {
    id: 'G07',
    label: 'Batuk, pilek, atau sakit tenggorokan',
    question: 'Saya mengalami batuk, pilek, atau sakit tenggorokan.',
  },
  {
    id: 'G08',
    label: 'Sesak napas ringan',
    question: 'Saya merasakan sesak napas ringan.',
  },
  {
    id: 'G09',
    label: 'Sering sakit kepala atau pusing',
    question: 'Saya sering mengalami sakit kepala atau pusing.',
  },
  {
    id: 'G10',
    label: 'Mual atau muntah',
    question: 'Saya mengalami mual atau muntah.',
  },
  {
    id: 'G11',
    label: 'Nyeri atau perih di ulu hati',
    question: 'Saya merasakan nyeri atau perih di ulu hati.',
  },
  {
    id: 'G12',
    label: 'Perut terasa kembung atau cepat kenyang',
    question: 'Perut saya terasa kembung atau cepat kenyang.',
  },
  {
    id: 'G13',
    label: 'BAB cair lebih dari 3 kali sehari',
    question: 'Saya mengalami buang air besar cair lebih dari 3 kali sehari.',
  },
  {
    id: 'G14',
    label: 'Diare disertai perut mulas atau lemas',
    question: 'Diare saya disertai perut mulas atau tubuh terasa lemas.',
  },
  {
    id: 'G15',
    label: 'Nyeri, pegal, atau kaku pada otot',
    question: 'Saya mengalami nyeri, pegal, atau kaku pada otot.',
  },
  {
    id: 'G16',
    label: 'Nyeri otot bertambah saat bergerak',
    question: 'Nyeri otot bertambah saat saya bergerak.',
  },
  {
    id: 'G17',
    label: 'Mudah merasa lelah dalam waktu lama',
    question: 'Saya mudah merasa lelah dalam waktu lama.',
  },
  {
    id: 'G18',
    label: 'Sering merasa haus dan lapar berlebihan',
    question: 'Saya sering merasa haus dan lapar berlebihan.',
  },
  {
    id: 'G19',
    label: 'Sering buang air kecil',
    question: 'Saya sering buang air kecil.',
  },
  {
    id: 'G20',
    label: 'Luka pada tubuh sulit sembuh',
    question: 'Luka pada tubuh saya sulit sembuh.',
  },
  {
    id: 'G21',
    label: 'Demam disertai sakit kepala berat',
    question: 'Saya mengalami demam disertai sakit kepala berat.',
  },
  {
    id: 'G22',
    label: 'Kulit terasa gatal',
    question: 'Kulit saya terasa gatal.',
  },
  {
    id: 'G23',
    label: 'Kulit terlihat merah, kering, atau bersisik',
    question: 'Kulit saya terlihat merah, kering, atau bersisik.',
  },
];

export const diseases: Disease[] = [
  {
    id: 'tbc',
    name: 'Tuberkulosis (TBC)',
    shortDesc: 'Tuberkulosis adalah penyakit menular yang menyerang paru-paru...',
    fullDesc:
      'Tuberkulosis adalah penyakit menular yang menyerang paru-paru dan disebabkan oleh bakteri. Penyakit ini menyebar melalui udara, misalnya saat penderita batuk, bersin, atau berbicara tanpa menggunakan masker. Jika tidak diobati, TBC dapat merusak paru-paru dan menular ke orang lain.',
    symptoms: ['G01', 'G02', 'G05', 'G06'],
    commonSymptoms: [
      'Batuk lebih dari 2 minggu',
      'Batuk berdahak atau berdarah',
      'Berat badan turun',
      'Berkeringat di malam hari',
      'Demam ringan terus-menerus',
    ],
    selfCare:
      'Gunakan masker dan hindari kontak dekat\nIstirahat cukup dan konsumsi makanan bergizi\nSegera periksa ke puskesmas untuk tes dahak',
    image: '/assets/Image.png',
    icon: 'lungs',
  },
  {
    id: 'malaria',
    name: 'Malaria',
    shortDesc: 'Malaria adalah penyakit yang disebabkan oleh parasit dan...',
    fullDesc:
      'Malaria adalah penyakit yang disebabkan oleh parasit dan ditularkan melalui gigitan nyamuk Anopheles. Penyakit ini sering terjadi di daerah tropis dan dapat berulang jika tidak diobati dengan benar. Malaria dapat berbahaya jika tidak segera ditangani.',
    symptoms: ['G04', 'G05', 'G21', 'G10'],
    commonSymptoms: [
      'Demam tinggi berulang',
      'Menggigil dan berkeringat',
      'Sakit kepala berat',
      'Mual dan muntah',
    ],
    selfCare:
      'Istirahat cukup, minum air putih banyak\nGunakan kelambu atau obat nyamuk\nSegera periksa darah jika demam lebih dari 3 hari',
    image: '/assets/Image (1).png',
    icon: 'mosquito',
  },
  {
    id: 'ispa',
    name: 'ISPA',
    shortDesc: 'ISPA adalah infeksi pada saluran pernapasan, mulai dari hidung...',
    fullDesc:
      'ISPA adalah infeksi pada saluran pernapasan, mulai dari hidung hingga paru-paru. Penyakit ini sering disebabkan oleh virus atau bakteri dan mudah menular, terutama di lingkungan padat atau berdebu. ISPA umumnya bersifat ringan, tetapi bisa menjadi berat jika tidak ditangani.',
    symptoms: ['G07', 'G03', 'G08'],
    commonSymptoms: [
      'Batuk dan pilek',
      'Sakit tenggorokan',
      'Demam',
      'Sesak napas ringan',
    ],
    selfCare:
      'Istirahat, Minum air hangat\nGunakan masker\nHindari asap rokok',
    image: '/assets/Image (2).png',
    icon: 'throat',
  },
  {
    id: 'gastritis',
    name: 'Gastritis (Radang Lambung)',
    shortDesc: 'Gastritis adalah peradangan pada dinding lambung yang...',
    fullDesc:
      'Gastritis adalah peradangan pada dinding lambung yang menyebabkan rasa tidak nyaman pada perut. Penyakit ini sering terjadi akibat pola makan yang tidak teratur, stres, konsumsi obat tertentu, atau infeksi. Gastritis dapat muncul tiba-tiba atau berlangsung dalam waktu lama.',
    symptoms: ['G11', 'G10', 'G12'],
    commonSymptoms: [
      'Nyeri atau perih di ulu hati',
      'Mual atau muntah',
      'Perut kembung atau cepat kenyang',
    ],
    selfCare:
      'Makan teratur dalam porsi kecil\nHindari makanan pedas dan asam\nKurangi kopi dan minuman bersoda\nKelola stres',
    image: '/assets/Image (3).png',
    icon: 'stomach',
  },
  {
    id: 'hipertensi',
    name: 'Hipertensi',
    shortDesc: 'Hipertensi adalah kondisi ketika tekanan darah berada di atas...',
    fullDesc:
      'Hipertensi adalah kondisi ketika tekanan darah berada di atas normal dalam jangka waktu lama. Penyakit ini sering tidak menimbulkan gejala, sehingga banyak orang tidak menyadarinya. Jika tidak dikontrol, hipertensi dapat menyebabkan komplikasi serius seperti stroke, penyakit jantung, dan gangguan ginjal.',
    symptoms: ['G09', 'G17'],
    commonSymptoms: ['Sakit kepala', 'Pusing', 'Mudah lelah'],
    selfCare:
      'Kurangi garam dan makanan asin\nIstirahat cukup\nKelola stres\nCek tekanan darah secara rutin',
    image: '/assets/Image (4).png',
    icon: 'heart',
  },
  {
    id: 'diare',
    name: 'Diare',
    shortDesc: 'Diare adalah gangguan pencernaan yang menyebabkan buang air...',
    fullDesc:
      'Diare adalah gangguan pencernaan yang menyebabkan buang air besar cair secara terus-menerus. Penyakit ini biasanya disebabkan oleh infeksi atau makanan dan minuman yang tidak bersih. Diare dapat menyebabkan kekurangan cairan jika tidak ditangani dengan baik.',
    symptoms: ['G13', 'G14'],
    commonSymptoms: ['BAB cair lebih dari 3 kali sehari', 'Mual dan muntah', 'Perut mulas', 'Lemas'],
    selfCare:
      'Minum oralit atau air gula-garam\nTetap makan dalam porsi kecil\nJaga kebersihan makanan dan tangan',
    image: '/assets/Image (5).png',
    icon: 'diarrhea',
  },
  {
    id: 'flu',
    name: 'Flu',
    shortDesc: 'Flu adalah penyakit infeksi yang disebabkan oleh virus influenza...',
    fullDesc:
      'Flu adalah penyakit infeksi yang disebabkan oleh virus influenza dan menyerang saluran pernapasan. Penyakit ini mudah menular dan sering muncul saat perubahan cuaca. Flu biasanya sembuh dengan sendirinya, tetapi dapat mengganggu aktivitas sehari-hari.',
    symptoms: ['G07', 'G04', 'G15'],
    commonSymptoms: ['Demam', 'Batuk dan pilek', 'Sakit kepala', 'Badan pegal'],
    selfCare:
      'Istirahat yang cukup\nMinum air putih lebih banyak\nGunakan masker\nKonsumsi makanan bergizi',
    image: '/assets/Image (6).png',
    icon: 'virus',
  },
  {
    id: 'myalgia',
    name: 'Myalgia (Nyeri Otot)',
    shortDesc: 'Myalgia adalah kondisi nyeri atau pegal pada otot yang dapat...',
    fullDesc:
      'Myalgia adalah kondisi nyeri atau pegal pada otot yang dapat terjadi akibat aktivitas fisik berlebihan, kelelahan, infeksi virus, atau cedera ringan. Nyeri ini dapat muncul di satu bagian tubuh atau menyebar ke beberapa otot.',
    symptoms: ['G15', 'G16'],
    commonSymptoms: ['Nyeri atau pegal otot', 'Otot terasa kaku', 'Nyeri saat bergerak'],
    selfCare:
      'Istirahatkan otot yang nyeri\nKompres hangat\nLakukan peregangan ringan\nMinum air putih cukup',
    image: '/assets/Image (7).png',
    icon: 'muscle',
  },
  {
    id: 'diabetes',
    name: 'Diabetes Mellitus',
    shortDesc: 'Diabetes adalah penyakit kronis yang terjadi ketika kadar gula...',
    fullDesc:
      'Diabetes adalah penyakit kronis yang terjadi ketika kadar gula darah dalam tubuh terlalu tinggi. Kondisi ini dapat berlangsung lama dan menyebabkan berbagai komplikasi jika tidak dikendalikan dengan baik.',
    symptoms: ['G18', 'G19', 'G20'],
    commonSymptoms: ['Sering haus dan lapar', 'Sering buang air kecil', 'Luka sulit sembuh'],
    selfCare:
      'Batasi konsumsi gula dan karbohidrat\nOlahraga teratur\nPeriksa gula darah secara rutin\nJaga berat badan ideal',
    image: '/assets/Image (8).png',
    icon: 'diabetes',
  },
  {
    id: 'dermatitis',
    name: 'Dermatitis',
    shortDesc: 'Dermatitis adalah peradangan pada kulit yang menyebabkan...',
    fullDesc:
      'Dermatitis adalah peradangan pada kulit yang menyebabkan kulit menjadi merah, gatal, dan bengkak. Penyakit ini dapat dipicu oleh alergi, iritasi bahan kimia, atau faktor genetik. Dermatitis tidak menular namun dapat berulang.',
    symptoms: ['G22', 'G23'],
    commonSymptoms: ['Kulit terasa gatal', 'Kulit merah atau ruam', 'Kulit kering dan bersisik'],
    selfCare:
      'Hindari sabun atau bahan kimia keras\nGunakan pelembab kulit\nJangan menggaruk kulit yang gatal\nKonsultasi dokter jika makin parah',
    image: '/assets/Image (9).png',
    icon: 'skin',
  },
];

// Map symptom IDs to labels for quick lookup
export const symptomMap: Record<string, Symptom> = symptoms.reduce(
  (acc, s) => ({ ...acc, [s.id]: s }),
  {}
);

// Map disease IDs to diseases for quick lookup
export const diseaseMap: Record<string, Disease> = diseases.reduce(
  (acc, d) => ({ ...acc, [d.id]: d }),
  {}
);
