import HomeLayout from "@/components/layout/home-layout";
import NavHeader from "@/components/shared/nav-header";
import { Button } from "@/components/ui/button";
import useTitle from "@/hooks/useTitle";
import { useNavigate } from "react-router-dom";

export default function PrivacyData() {
  useTitle("Kebijakan Privasi");
  const navigate = useNavigate();
  return (
    <HomeLayout>
      <NavHeader title="Kebijakan Privasi" />
      <h1 className="my-3 font-bold text-lg">
        Kebijakan Privasi & Perlindungan Data Pribadi
      </h1>
      <div className="space-y-2">
        <p>
          Selamat datang di Kebijakan Privasi kami. Kami ingin memberikan
          kejelasan dan keyakinan kepada Anda tentang bagaimana kami
          mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda.
          Dengan membaca Kebijakan Privasi ini, diharapkan Anda merasa tenang
          dan yakin bahwa privasi Anda adalah prioritas utama bagi kami.
        </p>
        <p>
          Dalam Kebijakan Privasi ini, kami menyatakan PT. Pos Indonesia
          (Persero) selanjutnya disebut "Pos Indonesia" selaku Pengendali Data
          Pribadi, akan berupaya untuk memberikan keamanan dan perlindungan demi
          kenyamanan Anda dalam bertransaksi.
        </p>
        <p>
          Kami sangat mengutamakan keamanan Data Pribadi Anda. Dengan penuh
          tanggung jawab, Kebijakan Privasi ini secara rinci menjelaskan
          definisi, jenis, legalitas, dan tujuan pemrosesan Data Pribadi. Selain
          itu, kami menjelaskan pengendalian dan transfer Data Pribadi, jangka
          waktu pemrosesan, serta prosedur perubahan kebijakan privasi. Semua
          langkah ini kami lakukan dengan mengacu pada Undang-Undang Nomor 27
          Tahun 2022 tentang Pelindungan Data Pribadi beserta perubahannya, yang
          lebih dikenal sebagai "UU PDP," serta peraturan perundang-undangan
          yang berlaku dan relevan, agar Anda merasa nyaman dan yakin dalam
          memberikan Data Pribadi Anda kepada kami.
        </p>
        <p>
          Untuk memperjelas, jenis, dasar pemrosesan, dan tujuan pemrosesan Data
          Pribadi Anda dapat berbeda-beda tergantung pada produk, layanan,
          dan/atau jasa yang Anda gunakan.
        </p>
      </div>

      <ol className="my-3">
        <li>
          <strong>Definisi Data Pribadi</strong>
        </li>
      </ol>
      <div className="space-y-2">
        <p>
          Data Pribadi adalah data tentang orang perseorangan yang
          teridentifikasi atau dapat diidentifikasi secara tersendiri atau
          dikombinasi dengan informasi lainnya baik secara langsung maupun tidak
          langsung melalui sistem elektronik atau non-elektronik.
        </p>
        <p>
          Data Pribadi yang diproses meliputi Data Pribadi yang telah dan akan
          Anda berikan kepada Pos Indonesia.
        </p>
        <ol>
          <li>
            <strong>Jenis Data Pribadi</strong>
          </li>
        </ol>
      </div>
      <p>
        Pos Indonesia menyadari bahwa penting bagi Anda untuk mengetahui apa
        saja jenis Data Pribadi Anda, yang dapat diproses. Jenis-jenis data
        tersebut meliputi:
      </p>
      <ol className="list-decimal space-y-2 pl-4">
        <li>
          Data identifikasi profil pribadi, yaitu Nama Lengkap, Nomor Induk
          Kependudukan (NIK) untuk KTP Warga Negara Indonesia (WNI) dan Warga
          Negara Asing (WNA), Nomor Pokok Wajib Pajak (NPWP)/Tax Identification
          Number (TIN), Dokumen Keimigrasian, Jenis Kelamin, Kewarganegaraan,
          Tempat dan Tanggal Lahir, Nama Gadis Ibu Kandung, Nama
          alias/panggilan, Agama, Rekaman Suara, Rekaman Gambar, Foto, bentuk
          tanda tangan (basah dan/atau elektronik), dan/atau data biometrik;
        </li>
        <li>
          Data korespondensi, yaitu alamat sesuai KTP, alamat dan status
          domisili, alamat surat elektronik (email), nomor telepon/handphone,
          dan kontak darurat yang mencakup nama, jenis hubungan dengan Anda,
          alamat, nomor telepon/ponsel;
        </li>
        <li>
          Data pendidikan dan pekerjaan, yaitu tingkat pendidikan, jenis
          pekerjaan, bidang usaha (Nomor Induk Berusaha (NIB) dan Klasifikasi
          Baku Lapangan Usaha Indonesia (KBLI)),jabatan, divisi, tahun mulai
          bekerja/usaha, nama perusahaan/instansi tempat bekerja, alamat tempat
          bekerja, status kepegawaian, serta nama, jabatan, dan nomor telepon
          rekan kerja;
        </li>
        <li>
          Data keluarga, yaitu status perkawinan, nama pasangan, jumlah anak,
          dan jumlah tanggungan;
        </li>
        <li>
          Data keuangan, yaitu nomor rekening, sumber penghasilan, jumlah
          penghasilan bulanan/tahunan, jumlah pengeluaran bulanan/tahunan, data
          transaksi, data kredit/pembiayaan, data terkait aset, data terkait
          agunan, dan data perpajakan serta data layanan dari jasa keuangan lain
          yang Anda terima (yaitu asuransi dan kustodian);
        </li>
        <li>
          Data aktivitas digital, yaitu geolokasi, alamat IP, aktivitas Anda di
          aplikasi Pos Indonesia, dan interaksi aplikasi Pos Indonesia dengan
          aplikasi lain di perangkat elektronik Anda; dan/atau
        </li>
        <li>
          Data terkait preferensi pribadi, yaitu preferensi komunikasi, hobi,
          dan minat.
        </li>
      </ol>
      <p className="my-3">
        Data Pribadi yang diproses dapat Pos Indonesia terima secara langsung
        dari Anda atau melalui pihak ketiga.
      </p>
      <ol className="my-2">
        <li>
          <strong>Legalitas Pemrosesan Data Pribadi</strong>
        </li>
      </ol>
      <p className="underline">Dasar Pemrosesan</p>
      <p className="my-2">
        Pemrosesan Data Pribadi dilakukan sepanjang Pos Indonesia telah memenuhi
        satu atau beberapa dasar pemrosesan berikut:
      </p>
      <ol className="list-decimal space-y-2 pl-4">
        <li>
          Pos Indonesia secara eksplisit dan sah telah memperoleh persetujuan
          dari Anda;
        </li>
        <li>
          Pos Indonesia menjalankan hak dan kewajibannya berdasarkan perjanjian
          dengan Anda;
        </li>
        <li>
          Pos Indonesia perlu melaksanakan kewenangan atau memenuhi kewajiban
          berdasarkan peraturan perundang-undangan/perintah instansi yang
          berwenang;
        </li>
        <li>Pos Indonesia perlu untuk memenuhi kepentingan vital Anda;</li>
        <li>
          Pos Indonesia perlu untuk melaksanakan tugas dalam rangka kepentingan
          umum dan/atau pelayanan publik;
        </li>
        <li>
          Pos Indonesia perlu memenuhi kepentingan yang sah lainnya, dengan
          tetap memperhatikan keseimbangan antara kepentingan Pos Indonesia
          dengan hak-hak Anda.
        </li>
      </ol>
      <p className="my-2 underline">Tujuan Pemrosesan Data Pribadi Anda</p>
      <p>
        Pemrosesan Data Pribadi Anda dilakukan oleh Pos Indonesia untuk tujuan
        berikut:
      </p>
      <ol className="list-decimal space-y-2 pl-4">
        <li>
          Pengelolaan produk, layanan, dan/atau jasa Pos Indonesia, termasuk
          pemrofilan dan scoring, untuk peningkatan pelayanan untuk Anda dan
          manajemen risiko Pos Indonesia.
        </li>
        <li>
          Penyediaan promo atau program Pos Indonesia yang dapat bekerja sama
          dengan pihak lain untuk produk dan/atau jasa yang telah Anda miliki.
        </li>
        <li>
          Pemasaran dan/atau penawaran atas produk, layanan, dan/atau jasa Pos
          Indonesia dan/atau perusahaan lain di dalam Pos Indonesia Group
          dan/atau pihak ketiga yang bekerja sama dengan Pos Indonesia, untuk
          produk dan/atau jasa yang yang belum Anda miliki.
        </li>
        <li>
          Pemenuhan terhadap peraturan perundang-undangan dan perintah
          regulator, aparat penegak hukum, serta instansi berwenang lainnya.
        </li>
        <li>
          Penyelesaian pengaduan yang masuk di <em>contact center</em> Pos
          Indonesia.
        </li>
      </ol>
      <ol className="my-3">
        <li>
          <strong>Pengendalian dan Transfer Data Pribadi</strong>
        </li>
      </ol>
      <p>
        Dalam memproses Data Pribadi Anda, Pos Indonesia dapat melibatkan pihak
        ketiga sebagai pengendali bersama dan/atau prosesor Data Pribadi Anda
        baik di dalam dan/atau luar Indonesia. Dalam hal demikian, Pos Indonesia
        akan melakukan perlindungan atas Data Pribadi Anda sesuai peraturan
        perundang-undangan.
      </p>
      <p>
        Jika Pos Indonesia melakukan transfer Data Pribadi Anda ke luar
        Indonesia, Pos Indonesia akan memastikan secara wajar bahwa negara
        tujuan transfer telah memiliki tingkat pelindungan Data Pribadi yang
        setara (atau lebih tinggi) dibandingkan pelindungan Data Pribadi di
        Indonesia.
      </p>
      <p>
        Dalam hal negara tujuan transfer Data Pribadi tidak memiliki tingkat
        pelindungan yang setara (atau lebih tinggi), Pos Indonesia dapat tetap
        melakukan transfer Data Pribadi Anda sepanjang memenuhi peraturan
        perundang-undangan.
      </p>
      <ol className="my-3">
        <li>
          <strong>Hak Anda sebagai Subjek Data Pribadi</strong>
        </li>
      </ol>
      <p>
        Tentunya Pos Indonesia menyadari bahwa Data Pribadi merupakan aset
        terpenting bagi Anda. Maka dari itu, berikut kami informasikan hak-hak
        yang Anda miliki sebagai Subjek Data Pribadi:
      </p>
      <ol className="my-3">
        <li>
          <strong>Hak atas Informasi dan Akses</strong>
        </li>
      </ol>
      <p>
        Anda memiliki hak untuk memperoleh informasi mengenai identitas pihak
        yang meminta Data Pribadi Anda, tujuan permintaannya, serta akses
        terhadap salinan Data Pribadi Anda. Pos Indonesia akan memberikan akses
        ke informasi tersebut melalui sarana resmi Pos Indonesia, seperti cabang
        Pos Indonesia atau channel lainnya, sesuai dengan ketentuan peraturan
        perundang-undangan dan kebijakan Pos Indonesia.
      </p>
      <p>
        Anda memahami bahwa dalam hal Anda meminta salınan mengenai informasi
        Data Pribadi Anda dan/atau detail pemrosesan Data Pribadi Anda, Anda
        dapat dikenakan biaya oleh Pos Indonesia.
      </p>
      <ol start={2} className="my-3">
        <li>
          <strong>Hak atas Perbaikan Data</strong>
        </li>
      </ol>
      <p>
        Anda memiliki hak untuk melengkapi, memperbarui, dan/atau memperbaiki
        Data Pribadi yang salah atau tidak akurat.
      </p>
      <ol start={3} className="my-3">
        <li>
          <strong>
            Hak untuk Mendapatkan, Menggunakan dan/atau Mengirimkan Data Pribadi
            ke Pihak Lain
          </strong>
        </li>
      </ol>
      <p>
        Anda memiliki hak untuk memperoleh, memanfaatkan, atau memberikan Data
        Pribadi Anda yang ada pada Pos Indonesia kepada pihak ketiga, selama
        sistem komunikasi yang digunakan oleh Pos Indonesia dan Pihak Ketiga
        dimaksud aman.
      </p>
      <ol start={4} className="my-3">
        <li>
          <strong>
            Hak untuk Mengakhiri Pemrosesan, Menghapus dan/atau Memusnahkan Data
            Pribadi
          </strong>
        </li>
      </ol>
      <p>
        Anda berhak untuk mengakhiri pemrosesan, menghapus dan/atau memusnahkan
        Data Pribadi Anda. Anda setuju untuk memberikan Pos Indonesia waktu
        untuk memproses pengakhiran pemrosesan, penghapusan dan/atau pemusnahan
        Data Pribadi Anda sejauh Pos Indonesia perlukan.
      </p>
      <p>
        Untuk menjalankan hak mengakhiri pemrosesan, penghapusan dan/atau
        pemusnahan Data Pribadi tersebut, Anda dapat menghubungi Pos Indonesia
        melalui sarana komunikasi yang diatur dalam poin H pada Kebijakan
        Privasi ini.
      </p>
      <p>
        Untuk dipahami, pengakhiran pemrosesan, penghapusan dan/atau pemusnahan
        Data Pribadi tersebut dapat mempengaruhi kemampuan Pos Indonesia untuk
        menyediakan produk, layanan, dan jasa kepada Anda serta hubungan
        kontraktual yang telah dibuat antara Pos Indonesia dengan Anda ataupun
        antara Pos Indonesia dengan pihak ketiga lainnya, termasuk dapat
        mengakibatkan terhentinya layanan yang Anda terima dan/atau terjadinya
        pengakhiran atas satu atau beberapa perjanjian Anda dengan Pos Indonesia
        dan/atau pelanggaran terhadap satu atau beberapa kewajiban Anda
        berdasarkan perjanjian dengan Pos Indonesia.
      </p>
      <p>
        Sehubungan dengan hal tersebut, pengakhiran pemrosesan, penghapusan
        dan/atau pemusnahan Data Pribadi mengakibatkan Anda memberikan hak
        kepada Pos Indonesia untuk melakukan pemblokiran rekening tabungan Anda,
        dan/atau menyatakan bahwa utang dan/atau kewajiban Anda kepada Pos
        Indonesia menjadi jatuh tempo dan dapat ditagih. Segala kerugian yang
        timbul akibat pelaksanaan hak Anda untuk mengakhiri pemrosesan,
        penghapusan dan/atau pemusnahan Data Pribadi merupakan tanggung jawab
        Anda.
      </p>
      <p>
        Kewajiban Pos Indonesia untuk menghapus dan memusnahkan Data Pribadi
        Anda dikecualikan untuk:
      </p>
      <ol className="list-decimal space-y-2 pl-4">
        <li>Kepentingan pertahanan dan keamanan nasional;</li>
        <li>Kepentingan proses penegakan hukum;</li>
        <li>Kepentingan umum dalam rangka penyelenggaraan negara; atau</li>
        <li>
          Kepentingan pengawasan sektor jasa keuangan, moneter, sistem
          pembayaran, dan stabilitas sistem keuangan yang dilakukan dalam rangka
          penyelenggaraan negara.
        </li>
      </ol>
      <ol start={5} className="my-3">
        <li>
          <strong>Hak untuk Menarik Persetujuan</strong>
        </li>
      </ol>
      <p>
        Anda berhak untuk menarik kembali persetujuan pemrosesan Data Pribadi
        yang telah Anda berikan kepada Pos Indonesia, dan Anda setuju untuk
        memberikan Pos Indonesia tambahan waktu untuk memproses pengakhiran
        pemrosesan Data Pribadi Anda sejauh Pos Indonesia perlukan. Untuk
        menjalankan hak penarikan persetujuan tersebut, Anda dapat menghubungi
        Pos Indonesia melalui sarana komunikasi yang diatur dalam poin H pada
        Kebijakan Privasi ini.
      </p>
      <p>
        Anda perlu memahami bahwa penarikan persetujuan tersebut dapat
        mempengaruhi kemampuan Pos Indonesia untuk menyediakan produk, layanan,
        dan jasa kepada Anda serta mengelola hubungan kontraktual yang telah
        dibuat antara Pos Indonesia dengan Anda ataupun antara Pos Indonesia
        dengan pihak ketiga lainnya termasuk dapat mengakibatkan terhentinya
        layanan yang Anda terima dan/atau terjadinya pengakhiran atas satu atau
        beberapa perjanjian Anda dengan Pos Indonesia dan/atau pelanggaran
        terhadap satu atau beberapa kewajiban Anda berdasarkan perjanjian dengan
        Pos Indonesia.
      </p>
      <p>
        Sehubungan dengan hal tersebut, penarikan persetujuan pemrosesan Data
        Pribadi tersebut mengakibatkan Anda memberikan hak kepada Pos Indonesia
        untuk melakukan pemblokiran rekening tabungan Anda, dan/atau menyatakan
        bahwa utang dan/atau kewajiban Anda kepada Pos Indonesia menjadi jatuh
        tempo dan dapat ditagih. Segala kerugian yang timbul akibat pelaksanaan
        hak Anda untuk menarik persetujuan pemrosesan Data Pribadi merupakan
        tanggung jawab Anda.
      </p>
      <ol start={6} className="my-3">
        <li>
          <strong>
            Hak Mengajukan Keberatan atas Hasil Pemrosesan Otomatis
          </strong>
        </li>
      </ol>
      <p>
        Anda berhak mengajukan keberatan atas hasil pemrosesan Data Pribadi Anda
        yang dilakukan secara otomatis yang menimbulkan akibat hukum atau
        berdampak signifikan terhadap Anda, termasuk pemrofilan dan/atau credit
        scoring.
      </p>
      <ol start={7} className="my-3">
        <li>
          <strong>Hak untuk Menunda atau Membatasi Pemrosesan</strong>
        </li>
      </ol>
      <p>
        Anda berhak untuk menunda atau membatasi pemrosesan Data Pribadi Anda
        secara proporsional sesuai dengan tujuan pemrosesan Data Pribadi Anda.
        Untuk pelaksanaan hak ini, Anda dapat menghubungi Pos Indonesia melalui
        sarana komunikasi yang diatur dalam poin H pada Kebijakan Privasi ini.
        Anda perlu memahami bahwa permintaan penundaan atau pembatasan
        pemrosesan tersebut dapat mempengaruhi kemampuan Pos Indonesia untuk
        menyediakan produk, layanan, dan jasa kepada Anda, serta hubungan
        kontraktual yang telah dibuat antara Pos Indonesia dengan Anda ataupun
        antara Pos Indonesia dengan pihak ketiga lainnya
      </p>
      <p>
        termasuk dapat mengakibatkan terhentinya layanan yang Anda terima
        dan/atau terjadinya pengakhiran atas satu atau beberapa perjanjian Anda
        dengan Pos Indonesia dan/atau pelanggaran terhadap satu atau beberapa
        kewajiban Anda berdasarkan perjanjian dengan Pos Indonesia.
      </p>
      <p>
        Sehubungan dengan hal tersebut, penundaan atau pembatasan pemrosesan
        Data Pribadi tersebut mengakibatkan Anda memberikan hak kepada Pos
        Indonesia untuk melakukan pemblokiran rekening tabungan Anda, dan/atau
        menyatakan bahwa utang dan/atau kewajiban Anda kepada Pos Indonesia
        menjadi jatuh tempo dan dapat ditagih. Segala kerugian yang timbul
        akibat pelaksanaan hak Anda untuk menunda atau membatasi pemrosesan Data
        Pribadi merupakan tanggung jawab Anda.
      </p>
      <ol start={8} className="my-3">
        <li>
          <strong>Hak lainnya sesuai peraturan perundang-undangan</strong>
        </li>
      </ol>
      <p>
        Anda berhak untuk mengajukan hak lainnya terkait pemrosesan Data Pribadi
        sepanjang diatur dalam peraturan perundang-undangan yang berlaku.
      </p>
      <ol className="my-3">
        <li>
          <strong>Jangka Waktu Pemrosesan Data Pribadi</strong>
        </li>
      </ol>
      <p>
        Pos Indonesia akan melakukan pemrosesan Data Pribadi sejak Pos Indonesia
        memperoleh dasar pemrosesan. Pemrosesan akan terus Pos Indonesia lakukan
        selama Anda masih menggunakan produk, layanan, dan/atau jasa Pos
        Indonesia atau sesuai dengan ketentuan peraturan perundang-undangan yang
        berlaku. Pos Indonesia dapat menyimpan Data Pribadi Anda setelah Anda
        mengakhiri penggunaan produk, layanan, dan/atau jasa Pos Indonesia
        sampai jangka waktu yang diperlukan dengan mengacu pada peraturan
        perundang-undangan.
      </p>
      <ol className="my-3">
        <li>
          <strong>Perubahan Kebijakan Privasi</strong>
        </li>
      </ol>
      <p>
        Kami senantiasa berkomitmen untuk menjaga keamanan dan privasi informasi
        Anda. Oleh karena itu, Kebijakan Privasi ini dapat kami perbarui sesuai
        dengan perkembangan praktik kami dalam pemrosesan Data Pribadi serta
        sesuai dengan peraturan perundang-undangan yang berlaku.
      </p>
      <p>
        Jika ada perubahan dalam Kebijakan Privasi ini, kami akan memberikan
        informasi melalui sarana komunikasi resmi Pos Indonesia. Pos Indonesia
        berkomitmen untuk memastikan Anda merasa aman dan selalu terinformasi
        mengenai perlindungan privasi Anda.
      </p>
      <p>
        Selain itu, jika ada bagian dari Kebijakan Privasi ini yang menjadi
        tidak dapat digunakan, hal tersebut tidak akan memengaruhi validitas dan
        keberlakuan ketentuan lainnya. Terima kasih atas kepercayaan Anda pada
        Pos Indonesia.
      </p>
      <ol className="my-3">
        <li className="space-y-2">
          <strong>Hubungi </strong>
          <strong>Pos Indonesia</strong>
        </li>
      </ol>
      <p>
        Pos Indonesia siap membantu dan menjawab semua pertanyaan yang mungkin
        Anda miliki mengenai Kebijakan Privasi ini.
      </p>
      <p>
        Silakan menghubungi tim layanan pelanggan kami via Pos Call 1500161,
        kirimkan pertanyaan melalui email ke halopos@posindonesia.co.id, atau
        Anda juga dapat mengunjungi kantor cabang Pos Indonesia terdekat.
      </p>
      <p className="my-3">
        <strong>Pemrosesan Data Pribadi</strong>
      </p>
      <p>
        Saya menyetujui bahwa PT Pos Indonesia (Persero) selanjutnya disebut
        "Pos Indonesia" dapat melakukan pemrosesan terhadap Data Pribadi Saya,
        sesuai ketentuan Undang - Undang Nomor 27 Tahun 2022 tentang Pelindungan
        Data Pribadi beserta penyesuaiannya dan peraturan perundang - undangan
        lainnya serta Kebijakan Privasi Pelanggan/Nasabah/Mitra Pos Indonesia,
        untuk tujuan sebagai berikut :
      </p>
      <ol className="list-decimal space-y-2 pl-4">
        <li>
          Pengelolaan produk, layanan, dan/atau jasa Pos Indonesia (termasuk
          pemrofilan dan scoring) dengan tujuan peningkatan pelayanan bagi Saya
          dan manajemen risiko Pos Indonesia.
        </li>
        <li>
          Penyediaan promo atau program Pos Indonesia yang dapat bekerja sama
          dengan pihak lain untuk produk, layanan, dan/atau jasa yang telah Saya
          miliki.
        </li>
        <li>
          Pemenuhan terhadap peraturan perundang - undangan dan perintah
          regulator, aparat penegak hukum, serta instansi berwenang lainnya.
        </li>
        <li>
          Pemasaran dan/atau penawaran atas produk, layanan, dan/atau jasa Pos
          Indonesia dan/atau perusahaan lain di dalam konglomerasi keuangan Pos
          Indonesia dan/atau pihak ketiga yang bekerja sama dengan Pos
          Indonesia, untuk produk dan/atau jasa yang belum dimiliki.
        </li>
      </ol>
      <p className="my-3">Dengan ini Saya menyetujui bahwa :</p>
      <ol className="list-decimal space-y-2 pl-4">
        <li>
          Saya dan pihak - pihak yang Data Pribadinya Saya sampaikan kepada Pos
          Indonesia telah memberikan persetujuan dan hak kepada Pos Indonesia
          untuk melakukan pemrosesan terhadap Data Pribadi tersebut selama
          dibutuhkan oleh Pos Indonesia untuk tujuan pemrosesan di atas.
        </li>
        <li>
          Seluruh Data Pribadi yang disampaikan kepada Pos Indonesia adalah data
          yang benar dan akurat sesuai dengan kondisi terkini dan jika terdapat
          perubahan Data Pribadi tersebut, maka Saya akan menginformasikan dan
          meminta kepada Pos Indonesia untuk melakukan pembaruan dan/atau
          perbaikan atas Data Pribadi tersebut sesuai dengan informasi terkini
          yang sah.
        </li>
        <li>
          Saya sepenuhnya bertanggung jawab atas segala kerugian yang timbul,
          baik materiil maupun immateriil apabila terjadi kegagalan pelindungan
          Data Pribadi yang disebabkan karena kelalaian dan/atau kesengajaan
          Saya dan/atau pihak yang diberikan kuasa oleh Saya.
        </li>
        <li>
          Pos Indonesia dapat melakukan perubahan atas Data Pribadi Saya jika
          diwajibkan oleh peraturan perundang - undangan, terdapat instruksi
          dari regulator atau instansi berwenang, dan/atau untuk menjaga
          kepentingan Saya dan/atau Pos Indonesia.
        </li>
      </ol>
      <div className="w-full max-w-md py-3">
        <Button
          className="w-full rounded-full bg-brand-500 py-6 text-white"
          onClick={() => navigate(-1)}
        >
          Setuju
        </Button>
      </div>
    </HomeLayout>
  );
}
