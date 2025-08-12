import HomeLayout from "@/components/layout/home-layout";
import NavHeader from "@/components/shared/nav-header";
import useTitle from "@/hooks/useTitle";

export default function TermsAndConditions() {
  useTitle("Syarat dan Ketentuan Kiriman");
  return (
    <HomeLayout>
      <NavHeader title="Syarat dan Ketentuan Kiriman" />
      <p className="my-3">
        <strong>SYARAT DAN KETENTUAN KIRIMAN</strong>
      </p>
      <p>
        <strong>KETENTUAN UMUM</strong>
      </p>
      <ol className="list-outside list-decimal space-y-2 pl-3">
        <li>Setiap pengirim berhak mendapatkan bukti pengiriman.</li>
        <li>
          PT Pos Indonesia (Persero) bertanggung jawab terhadap kiriman bila
          pengirim telah membayar lunas semua biaya pengiriman dan biaya lainnya
          (kecuali bila ada kesepakatan tertentu, termasuk pembayaran kredit
          bagi pelanggan dengan Perjanjian Kerja Sama).
        </li>
        <li>
          Selama belum diserahkan kepada penerima, hak atas kiriman masih berada
          di tangan pengirim, oleh karena itu tuntutan ganti rugi atas
          kehilangan/kerusakan kiriman hanya dapat diajukan oleh pengirim.
        </li>
        <li>
          Pernyataan tertulis pengirim tentang isi kiriman pada formulir
          pengiriman, harus sama dengan isi kiriman sebenarnya. Dalam hal
          terdapat ketidaksesuaian maka pengirim bertanggung jawab sepenuhnya
          atas segala dampak yang timbul akibat pelanggaran hukum yang
          dilakukan, termasuk jika mengakibatkan kerusakan atau kehilangan
          kiriman lainnya.
        </li>
        <li>
          PT Pos Indonesia (Persero) berhak membuka dan/atau memeriksa kiriman
          di hadapan pengirim untuk meyakini kebenaran informasi terkait isi
          kiriman.
        </li>
        <li>
          Pembungkus adalah kewajiban pengirim berupa wadah dan komponen lain
          atau material yang diperlukan untuk mewadahi barang agar tetap sesuai
          fungsinya, pembungkus harus dapat melindungi isi kiriman dari setiap
          getaran atau benturan selama angkutan, baik yang terjadi antara isi
          dengan kotak pembungkusnya atau antar kotak pembungkus kiriman satu
          dengan yang lainnya.
        </li>
        <li>Biaya pengemasan kiriman menjadi tanggungjawab pengirim.</li>
        <li>
          PT Pos Indonesia (Persero) hanya bertanggung jawab terhadap kerusakan
          fisik isi kiriman yang disebabkan oleh proses operasional, dan tidak
          bertanggung jawab serta tidak memberikan ganti rugi atas kiriman yang
          diakibatkan oleh:
        </li>
        <li>
          Kerugian atau kerusakan yang disebabkan unsur kesengajaan oleh
          pengirim.
        </li>
        <li>
          Pelanggaran terhadap aturan{" "}
          <em>Dangerous Goods, Prohibited Items </em>dan
          <em> Restricted Items.</em>
        </li>
        <li>
          Isi kiriman sebenarnya yang tidak sesuai dengan pernyataan pengirim.
        </li>
        <li>
          Kerugian atau kerusakan sebagai akibat oksidasi, kontaminasi polusi
          dan reaksi nuklir.
        </li>
        <li>
          Kerugian atau kerusakan akibat <em>force majeure</em> seperti: bencana
          alam, kebakaran, perang, huru- hara, aksi melawan pemerintah,
          pemberontakan, perebutan kekuasaan atau penyitaan oleh penguasa
          setempat.
        </li>
        <li>
          Kerugian tidak langsung atau keuntungan yang tidak jadi diperoleh,
          yang disebabkan oleh kekeliruan dalam penyelenggaraan pos (Undang
          Undang Republik Indonesia No. 38 tahun 2009).
        </li>
      </ol>
      <p>
        <strong>&nbsp;</strong>
      </p>
      <p className="my-3">
        <strong>KIRIMAN TERLARANG</strong>
      </p>
      <ol className="list-outside list-decimal space-y-2 pl-4">
        <li>
          Kiriman yang dapat membahayakan kiriman lainnya, lingkungan atau
          keselamatan orang, karena sifat dan pembungkusannya sehingga tidak
          dapat dikirimkan sebagai kiriman domestik.
        </li>
        <li>Kiriman-kiriman yang dimaksud pada ayat (1) meliputi:</li>
        <li>Narkotika, psikotropika, dan obat-obat terlarang lainnya.</li>
        <li>Kiriman yang mudah meledak atau amunisi,</li>
        <li>Kiriman yang mudah terbakar,</li>
        <li>
          Senjata-senjata, senjata api asli ataupun replikasnya termasuk suku
          cadangnya;
        </li>
        <li>Kiriman yang mudah rusak dan dapat mencemari lingkungan,</li>
        <li>Kiriman yang melanggar kesusilaan,</li>
        <li>
          Kiriman yang sifat dan pembungkusnya dapat membahayakan keselamatan
          orang, dapat mengotori dan merusak kiriman lain.
        </li>
        <li>
          Binatang hidup kecuali lebah, lintah, ulat sutera, parasit, serangga.
          dan serangga pembasmi serangga perusak yang dikirim oleh badan yang
          diakui resmi sesuai dengan ketentuan perundangan.
        </li>
        <li>
          Kiriman yang mudah busuk, bahan biologis yang mudah busuk dan mudah
          menularkan penyakit,
        </li>
        <li>
          Barang palsu dan atau dipalsukan, banderol-banderol/ stiker pajak
          palsu.
        </li>
        <li>
          Barang yang dilarang masuk oleh negara tujuan sesuai dengan peraturan
          negara setempat.
        </li>
        <li>
          Barang cetakan yang tidak mencantumkan penerbit atau tulisan yang
          bersifat menghasut, memfitnah, upaya sabotase terhadap pihak tertentu
          atau pemerintah yang sah;
        </li>
        <li>Jasad manusia sebagian atau utuh.</li>
        <li>
          Kiriman lainnya yang menurut peraturan perundang-undangan dinyatakan
          dilarang.
        </li>
        <li>
          Kiriman-kiriman yang dilarang pengirimannya berdasarkan regulasi pihak
          penerbangan meliputi:
        </li>
        <li>
          Kiriman yang dapat meledak atau menyala atau kiriman yang dapat
          terbakar sendiri seperti: peluru, bahan peledak, mercon, atau
          sejenisnya serta segala macam korek api dan gas pengisiannya.
        </li>
        <li>
          Bahan yang rentan terhadap oksidasi misalnya bubuk pemutih, peroksida
          dan bahan sejenis lainnya,
        </li>
        <li>Senjata api, senjata angin atau airsoft gun,</li>
        <li>
          Uang kertas dan uang logam serta instrumen bank yang bernilai uang
          seperti cek, giro bilyet, kartu kredit/ debit yang sudah diaktivasi,
        </li>
        <li>Air atau benda cair lainnya,</li>
        <li>
          Kiriman lainnya yang menurut pihak penerbangan dinyatakan dilarang.
        </li>
      </ol>
      <p>&nbsp;</p>
      <p className="my-3">
        <strong>KATEGORI, BERAT DAN UKURAN KIRIMAN</strong>
      </p>
      <p>Kategori Kiriman terdiri dari kiriman Surat dan Kiriman Paket.</p>
      <ol className="list-outside list-decimal space-y-2 pl-4">
        <li>Klasifikasi tingkat berat menjadi 2 (dua) yaitu:</li>
        <li>Kiriman Surat &gt; 0-gram sampai dengan 2.000 gram.</li>
        <li>Kiriman Paket &gt; 0-gram sampai dengan 50.000 gram.</li>
        <li>
          Klasifikasi yang membedakan Surat dengan Kiriman Paket adalah
          pendekatan jenis kiriman yang dikirim, yaitu:
        </li>
        <li>
          Kiriman Surat adalah berupa komunikasi tertulis dengan atau tanpa
          sampul yang ditujukan kepada individua tau badan dengan alamat
          tertentu, yang dalam penyampaiannya dilakukan sepenuhnya secara fisik.
        </li>
        <li>
          Kiriman paket adalah kegiatan layanan pengembalian, penerimaan dan/
          atau pengantaran barang.
        </li>
        <li>Ukuran Kiriman:</li>
        <li>Minimal sebagai berikut:</li>
      </ol>
      <ul className="list-outside list-disc space-y-2 pl-4">
        <li>Panjang = 15.2 cm</li>
        <li>Lebar = 9 cm</li>
        <li>Tinggi = 0.2 cm</li>
      </ul>
      <p>Maksimal berbentuk kotak/ gulungan sebagai berikut:</p>
      <ul className="list-outside list-disc space-y-2 pl-4">
        <li>Via Udara:</li>
      </ul>
      <p>Panjang + 2(Lebar + Tinggi) &le; 400 cm,</p>
      <p>Dengan sisi terpanjang maksimal 150 cm.</p>
      <ul className="list-outside list-disc space-y-2 pl-4">
        <li>Via Darat:</li>
      </ul>
      <p>Panjang + 2 (Lebar + Tinggi) &le; 600 cm,</p>
      <p>Dengan sisi terpanjang maksimal 200 cm.</p>
      <p>
        Perhitungan volumetric dilakukan apabila salah satu sisi melebihi ukuran
        sebagai berikut:
      </p>
      <ol>
        <li>Panjang = 35 cm</li>
        <li>Lebar = 25 cm</li>
        <li>Tinggi = 20 cm</li>
      </ol>
      <p>Persamaan berat volumetric adalah:</p>
      <p>
        <u>Panjang cm x Lebar&nbsp; cm x Tinggi cm</u> x 1kg
      </p>
      <p>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        6000
      </p>
      <p>&nbsp;</p>
      <ol>
        <li>
          <strong>KIRIMAN POS MELALUI ONLINE BOOKING</strong>
        </li>
        <li>
          Pelanggan melakukan login aplikasi <em>online booking</em>{" "}
          <em>system</em>.
        </li>
        <li>Pelanggan melakukan order dengan mengisi data pengiriman.</li>
        <li>Pelanggan mendapatkan informasi ongkos kirim.</li>
        <li>
          Pelanggan menyetujui syarat dan ketentuan yang berlaku melalui
          aplikasi <em>online booking system</em>.
        </li>
        <li>
          Pelanggan memilih metode pembayaran yang tersedia di aplikasi{" "}
          <em>online booking system</em>.
        </li>
        <li>
          Pelanggan dapat melakuan cetak <em>shipping label</em>
        </li>
        <li>
          Pelanggan dapat melakukan pengumpulan kiriman sesuai metode yang
          tersedia (<em>pickup/ drop off</em>)
        </li>
        <li>
          Pelanggan mempersiapkan kiriman sambil menunggu kedatangan kurir
          pickup, sehingga ketika kurir pickup datang, barang kiriman telah
          dikemas sesuai ketentuan dan siap kirim.
        </li>
      </ol>
      <p>
        <strong>&nbsp;</strong>
      </p>
      <p>
        <strong>&nbsp;</strong>
      </p>
      <ol>
        <li>
          <strong>KETENTUAN JAMINAN GANTI RUGI</strong>
        </li>
      </ol>
      <p>
        <strong>&nbsp;</strong>
      </p>
      <p>
        <strong>RUANG LINGKUP</strong>
      </p>
      <ol>
        <li>
          Jaminan Ganti Rugi Kiriman Kurir dan Logistik diberikan berdasarkan:
          <ol>
            <li>Standar Perusahaan PT Pos Indonesia (Persero).</li>
            <li>Nilai Pertanggungan (Asuransi)</li>
          </ol>
        </li>
        <li>
          Jaminan Ganti Rugi diberikan terhadap kerugian yang diderita oleh
          Pengirim, sebagai akibat risiko keterlambatan, risiko kehilangan dan
          kerusakan untuk kiriman Surat dan Paket Dalam Negeri.
        </li>
        <li>
          Jaminan ganti rugi tidak dimaksudkan untuk kerugian tidak langsung
          yang timbul akibat resiko keterlambatan penyerahan, kehilangan ataupun
          kerusakan kiriman yang diderita oleh pengirim.
        </li>
      </ol>
      <p>&nbsp;</p>
      <p>
        <strong>SYARAT JAMINAN GANTI RUGI</strong>
      </p>
      <p>
        Kiriman Kurir dan Logistik yang dijamin oleh PT Pos Indonesia (Persero),
        harus memenuhi ketentuan sebagai berikut:
      </p>
      <ol>
        <li>
          Isi kiriman sesuai dengan ketentuan Perusahaan dan peraturan
          perundang-undangan.
        </li>
        <li>Membayar ongkos kirim dan/atau Bea Jaminan Ganti Rugi.</li>
      </ol>
      <p>&nbsp;</p>
      <p>
        <strong>&nbsp;</strong>
      </p>
      <p>
        <strong>HAK ATAS TUNTUTAN GANTI RUGI</strong>
      </p>
      <ol>
        <li>
          Tuntutan Ganti Rugi merupakan hak pengirim atau dapat diajukan oleh
          penerima, dalam hal pengirim telah memberikan pernyataan pelepasan hak
          atas kiriman kepada penerima.
        </li>
        <li>
          Tuntutan Ganti Rugi hanya dapat diajukan terhadap kiriman kurir dan
          logistik sebagai berikut:
        </li>
        <li>Keterlambatan</li>
        <li>Kerusakan</li>
        <li>Rusak sebagian</li>
        <li>Rusak seluruhnya</li>
        <li>Hilang</li>
        <li>Hilang sebagian.</li>
        <li>Pengajuan pengaduan harus diajukan sebagai berikut:</li>
        <li>
          Keterlambatan, kerusakan, rusak sebagian, rusak seluruhnya dan hilang
          sebagian selambat-lambatnya 90 (Sembilan puluh) hari kalender sejak
          barang kiriman diterima oleh penerima.
        </li>
        <li>
          Hilang selambat-lambatnya 15 (lima belas) hari kalender sejak tanggal
          penetapan hilang oleh kantorpos.
        </li>
        <li>
          Tuntutan Ganti Rugi dapat diajukan pengirim atau kuasanya dengan
          melampirkan:
        </li>
        <li>
          Asli surat pengajuan ganti rugi atau surat tuntutan klaim yang
          menyebutkan nilai tuntutan serta menerangkan dengan jelas kronologis
          terjadinya kerugian.
        </li>
        <li>
          Asli atau <em>scan</em>
        </li>
        <li>Mengisi formulir pengajuan ganti rugi.</li>
        <li>Mengisi formulir laporan kerugian.</li>
        <li>
          Surat keterangan dari pihak berwenang, untuk kerugian akibat
          kecelakaan.
        </li>
        <li>
          <em>Copy</em> faktur atau <em>invoice</em> pembelian barang kiriman
          (khusus untuk barang baru).
        </li>
        <li>Foto atau video terkait dengan terjadinya kerugian.</li>
      </ol>
      <p>&nbsp;</p>
      <p>&nbsp;</p>
      <p>
        <strong>HILANGNYA HAK GANTI RUGI</strong>
      </p>
      <p>
        PT Pos Indonesia (Persero) tidak berkewajiban memberikan ganti rugi
        terhadap hal-hal sebagai berikut:
      </p>
      <ol>
        <li>
          Kepada pengirim yang telah menyerahkan haknya atas ganti rugi kepada
          penerima berdasarkan surat kuasa pengalihan hak.
        </li>
        <li>
          Tuntutan ganti rugi diajukan melampaui batas waktu yang ditetapkan
          oleh perusahaan.
        </li>
        <li>Isi kiriman yang tidak sesuai dengan resi/ formulir.</li>
        <li>Kiriman berisi barang yang dilarang pengirimannya.</li>
        <li>
          Kiriman dibuka, diperiksa dan/ atau disita oleh pejabat yang berwenang
          sesuai dengan ketentuan perundang-undangan.
        </li>
        <li>
          Keterlambatan, kerusakan atau kehilangan yang disengaja oleh Pengirim
          dan atau Penerima, dengan tujuan untuk mencari keuntungan dari layanan
          Jaminan Ganti Rugi.
        </li>
        <li>
          Pelanggaran terhadap aturan{" "}
          <em>Dangerous Goods, Prohibited Items dan Restricted Items</em>.
        </li>
        <li>
          Semua risiko teknis yang terjadi selama dalam pengangkutan, yang
          menyebabkan barang yang dikirim tidak berfungsi atau berubah fungsinya
          baik yang menyangkut mesin atau sejenisnya maupun barang-barang
          elektronik seperti halnya: handphone, kamera, radio/tape dan lain-lain
          yang sejenis.
        </li>
        <li>
          Kerugian atau kerusakan sebagai akibat oksidasi, kontaminasi polusi
          dan reaksi nuklir.
        </li>
        <li>
          Kerugian atau kerusakan akibat <em>force majeure</em> seperti: bencana
          alam, kebakaran, perang, huru-hara, aksi melawan pemerintah,
          pemberontakan, perebutan kekuasaan atau penyitaan oleh penguasa
          setempat.
        </li>
        <li>
          Kerugian tidak langsung atau keuntungan yang tidak jadi diperoleh,
          yang disebabkan oleh kekeliruan dalam penyelenggaraan pos
        </li>
      </ol>
      <p>
        <strong>NILAI JAMINAN GANTI RUGI</strong>
      </p>
      <ol>
        <li>
          Nilai jaminan ganti rugi atau nilai pertanggungan ditetapkan sebagai
          berikut:
        </li>
        <li>Pengiriman kurir dan logistik ritel:</li>
      </ol>
      <p>
        Nilai pertanggungan lebih dari Rp. 0,00 (nol rupiah) sampai dengan Rp.
        1.000.000.000,00 (satu miliar rupiah) per barang kiriman atau Rp.
        10.000.000.000,00 (sepuluh miliar rupiah) per satu alat angkut.
      </p>
      <ol>
        <li>Pengiriman Logistik Proyek</li>
      </ol>
      <p>
        Nilai Pertanggungan lebih dari Rp0,00 (nol rupiah) sampai dengan
        Rp1.000.000.000,00 (satu miliar rupiah) per barang kiriman atau
        Rp10.000.000.000,00 (sepuluh miliar rupiah) per satu alat angkut.
      </p>
      <ol>
        <li>
          Pengiriman <em>E-commerce</em>
        </li>
      </ol>
      <p>
        Nilai Pertanggungan lebih dari Rp0,00 (nol rupiah) sampai dengan
        Rp50.000.000,00 (lima puluh juta rupiah) per barang kiriman atau
        Rp500.000.000,00 (lima ratus juta rupiah) per satu alat angkut.
      </p>
      <ol>
        <li>Pengiriman Valuable Goods Khusus Logam Mulia</li>
      </ol>
      <p>
        Nilai Pertanggungan ditetapkan sebesar nilai barang yang
        dipertanggungkan.
      </p>
      <ol>
        <li>
          Nilai pertanggungan khusus untuk akta otentik yang diterbitkan oleh
          suatu instansi atau institusi atau Lembaga tertentu, antara lain
          ijazah, Surat Izin Mengemudi (SIM), Buku Pemilik Kendaraan Bermotor
          (BPKB), Surat Tanda Nomor Kendaraan (STNK), atau dokumen lainnya
          ditetapkan sebesar biaya pengurusan atau pembuatannya maksimum sebesar
          Rp. 6.000.000,00 (enam juta rupiah) per satu Akta Otentik.
        </li>
        <li>
          Nilai Pertanggungan khusus untuk barang-barang antik atau
          barang-barang seni ditetapkan maksimum sebesar RP. 6.000.000,00 (enam
          juta rupiah) per satu barang.
        </li>
        <li>
          Nilai Jaminan Ganti Rugi atau Nilai Pertanggungan untuk{" "}
          <em>Account Customer</em> ditetapkan sesuai kesepakatan yang
          dituangkan dalam perjanjian.
        </li>
      </ol>
      <p>&nbsp;</p>
      <p>
        <strong>BEA LAYANAN JAMINAN GANTI RUGI</strong>
      </p>
      <p>
        Jaminan ganti rugi berdasarkan bea jaminan ganti rugi yang dipungut dari
        pengirim dengan besarannya sebesar 0.24% (nol koma duapuluh empat
        perseratus) dari nilai jaminan ganti rugi dengan ketentuan minimal bea
        jaminan ganti&nbsp; rugi peritem isi kiriman sebesar RP. 500,00
        (limaratus rupiah).
      </p>
      <p>&nbsp;</p>
      <p>
        <strong>BESAR GANTI RUGI</strong>
      </p>
      <ol>
        <li>
          Ganti rugi standar PT Pos Indonesia (Persero) terhadap kiriman kurir
          dan logistik yang tidak membayar bea jaminan ganti rugi dapat
          diberikan ganti rugi sebagai berikut:
        </li>
      </ol>
      <table>
        <tbody>
          <tr>
            <td width="37">
              <p>
                <strong>No</strong>
              </p>
            </td>
            <td width="113">
              <p>
                <strong>Kondisi</strong>
              </p>
            </td>
            <td width="403">
              <p>
                <strong>Ganti Rugi Standar Perusahaan</strong>
              </p>
            </td>
          </tr>
          <tr>
            <td width="37">
              <p>1.</p>
            </td>
            <td width="113">
              <p>Hilang</p>
            </td>
            <td width="403">
              <p>
                10 (sepuluh) x Biaya Pengiriman maksimal Rp. 1.000.000,00 (satu
                juta rupiah)
              </p>
            </td>
          </tr>
          <tr>
            <td width="37">
              <p>2.</p>
            </td>
            <td width="113">
              <p>Rusak</p>
            </td>
            <td width="403">
              <p>
                a.&nbsp;&nbsp; 5 (lima) x Biaya Pengiriman maksimal
                Rp.1.000.000,00 apabila kiriman diserahkan kepada pengirim/
                kuasanya.
              </p>
              <p>
                b.&nbsp;&nbsp; 10 (sepuluh) x Biaya Pengiriman maksimal Rp.
                1.000.000,00 apabila pengirim/ kuasanya melepaskan hak atas
                kiriman.
              </p>
            </td>
          </tr>
          <tr>
            <td width="37">
              <p>3.</p>
            </td>
            <td width="113">
              <p>Keterlambatan</p>
            </td>
            <td width="403">
              <p>25% x Biaya Pengiriman</p>
            </td>
          </tr>
        </tbody>
      </table>
      <p>&nbsp;</p>
      <p>&nbsp;</p>
      <ol>
        <li>
          Ganti rugi yang dilindungi perusahaan asuransi dengan nilai jaminan
          ganti rugi terhadap kiriman kurir dan logistik diberikan ganti rugi
          sebagai berikut:
        </li>
      </ol>
      <table>
        <tbody>
          <tr>
            <td width="37">
              <p>
                <strong>No</strong>
              </p>
            </td>
            <td width="132">
              <p>
                <strong>Kondisi</strong>
              </p>
            </td>
            <td width="384">
              <p>
                <strong>Ganti Rugi dengan Nilai Jaminan Ganti Rugi</strong>
              </p>
            </td>
          </tr>
          <tr>
            <td width="37">
              <p>1.</p>
            </td>
            <td width="132">
              <p>Hilang</p>
            </td>
            <td width="384">
              <p>
                a.&nbsp;&nbsp; Maksimal 100% x Nilai Pertanggungan barang yang
                hilang, dibayarkan oleh perusahaan asuransi.
              </p>
              <p>
                b.&nbsp;&nbsp; 1x Biaya Pengiriman dibayarkan oleh PT Pos
                Indonesia (Persero)
              </p>
            </td>
          </tr>
          <tr>
            <td width="37">
              <p>2.</p>
            </td>
            <td width="132">
              <p>Rusak</p>
            </td>
            <td width="384">
              <p>Maksimal 100% x Nilai pertanggungan barang yang rusak.</p>
            </td>
          </tr>
          <tr>
            <td width="37">
              <p>3.</p>
            </td>
            <td width="132">
              <p>Keterlambatan</p>
            </td>
            <td width="384">
              <p>25% x Biaya Pengiriman</p>
            </td>
          </tr>
        </tbody>
      </table>
      <ol>
        <li>
          Penetapan Hilang atau rusak sebagian merupakan kewenangan kepala
          kantorpos yang tertuang dalam surat keterangan pada formulir
          pertimbangan kepala kantorpos, termasuk menentukan besar (persentase)
          kerusakan kiriman kurir dan logistik.
        </li>
      </ol>
      <p>
        <strong>&nbsp;</strong>
      </p>
      <ol>
        <li>
          <strong>TARIF PENGIRIMAN</strong>
        </li>
        <li>
          Tarif ditetapkan berdasarkan kantor tujuan, tingkat berat aktual dan/
          atau volumetrik untuk 1 (satu) kali pengiriman bagi kiriman dengan
          berat dimulai dari 0 gram.
        </li>
        <li>Penentuan besaran tarif dilakukan dengan 2 (dua) metode:</li>
        <li>
          Mempergunakan berat kiriman actual (<em>actual weight</em>).
        </li>
        <li>
          Mempergunakan perhitungan volumetrik untuk kotak/ gulungan yang
          dikonversikan menjadi berat dengan rumusan sebagai berikut:
        </li>
      </ol>
      <p>((Panjang cmx Lebar cm x Tinggi cm)/6000) x 1 kg</p>
      <ol>
        <li>
          Berdasarkan perbandingan penentuan berat kiriman sebagaimana dimaksud
          pada ayat (2), maka penentuan tarif dihitung berdasarkan tarif yang
          tertinggi.
        </li>
        <li>
          Diberikan toleransi berat kiriman sebesar 300-gram dengan perhitungan
          berat 1300-gram, 2300-gram, 3300-gram dan seterusnya sampai dengan
          50.300-gram dikenakan tarif 1000-gram, 2000-gram, 3000-gram dan
          seterusnya sampai dengan 50.000-gram.
        </li>
        <li>Tarif yang dikenakan berlaku untuk 1 (satu) kali pengiriman.</li>
        <li>
          Setiap Kiriman berisi barang merupakan kiriman Paket yang akan
          dikenakan PPN 1.1% sesuai dengan ketentuan perpajakan yang berlaku.
        </li>
      </ol>
      <p>&nbsp;</p>
      <ol>
        <li>
          <strong>PERTANYAAN ATAU KELUHAN</strong>
        </li>
      </ol>
      <p>
        Apabila pelanggan memiliki pertanyaan atau keluhan atas pengiriman
        barang, pelanggan dapat menyalurkannya melalui:
      </p>
      <ul>
        <li>
          <em>Contact Centre</em> 1500161
        </li>
        <li>Email: halopos@posindonesia.co.id</li>
        <li>
          Chat: <em>Livechat</em> di website posindonesia.co.id
        </li>
        <li>
          <em>Social Media</em> Resmi PT Pos Indonesia (Persero)
        </li>
      </ul>
      <p>Twitter (X)&nbsp; : @PosIndonesia</p>
      <p>Instagram&nbsp;&nbsp; : posindonesia.ig</p>
      <p>Facebook&nbsp;&nbsp; : Pos Indonesia</p>
      <p>Website&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : posindonesia.co.id</p>
      <ul>
        <li>
          <em>Customer Service</em> Kantor Pos terdekat
        </li>
      </ul>
      <p>&nbsp;</p>
      <ol>
        <li>
          <strong>PENULISAN ALAMAT DAN PENGEMASAN KIRIMAN</strong>
        </li>
      </ol>
      <ul>
        <li>Penulisan Alamat Kiriman</li>
      </ul>
      <ol>
        <li>
          Alamat Kiriman terdiri dari alamat pengirim dan alamat penerima
          kiriman. Tujuan kelengkapan pengisian alamat ini adalah:
          <ol>
            <li>
              Nama pengirim atau nama penerima bertujuan untuk percepatan pada
              proses pengantaran kiriman. Sehingga penulisan nama penerima juga
              dapat dilengkapi dengan nama panggilan atau nama kecil untuk
              memudahkan proses pengantaran kiriman.
            </li>
            <li>
              Alamat lengkap, penulisan kelengkapan bertujuan untuk percepatan
              waktu pengantaran kiriman. Sehingga penulisan alamat selain
              menuliskan nama jalan, nomor rumah/ gedung, RT/RW, Kelurahan/
              Desa, Kecamatan, Kabupaten/Kota, Provinsi juga dapat menyertakan
              keterangan lainnya seperti: Di samping Masjid Al-Huda, Depan
              Lapangan Bola, Rumah cat warna hijau samping puskesmas, dsb.
            </li>
            <li>
              Kodepos, penulisan kodepos yang tepat sangat berpengaruh pada
              perhitungan tarif, estimasi waktu tempuh kiriman, dan percepatan
              waktu pengantaran. Kesalahan dalam penulisan kodepos dapat
              berpengaruh pada selisih tarif, salah salur, dan menambah waktu
              pengantaran.
            </li>
            <li>
              Nomor telepon/ handphone/ whatsapp, pastikan nomor dicantumkan
              adalah aktif. Nomor yang ditulis juga boleh lebih dari satu nomor.
              Hal ini sangat penting untuk memudahkan komunikasi dengan pengirim
              atau penerima, seperti dalam kondisi alamat tidak ditemukan,
              alamat tidak lengkap, penerima pindah alamat, dsb. Selain itu
              nomor telepon/ handphone/ whatsapp akan dijadikan database
              pelanggan
            </li>
          </ol>
        </li>
        <li>
          Struktur Penulisan Alamat Pengirim dan Penerima mengikuti urutan
          sebagai berikut:
        </li>
      </ol>
      <ul>
        <li>Nama Jelas &ndash; Nama Panggilan (jika ada)</li>
        <li>Nama Perumahan, Nama Gedung</li>
        <li>Nomor Perumahan, Nomor Blok, No Lantai</li>
        <li>Nama Jalan</li>
        <li>Nama Kelurahan</li>
        <li>Nama Kecamatan</li>
        <li>Nama Kabupaten</li>
        <li>Nama Provinsi</li>
        <li>Nomor Hp/ Whatsapp</li>
      </ul>
      <p>Contoh penulisan sebagai berikut:</p>
      <table>
        <tbody>
          <tr>
            <td width="307">
              <p>
                <strong>Kepada:</strong>
              </p>
              <p>Yth. Ibu DR. Mutiara Hashifah, MM (Ibu Mumut)</p>
              <p>Perumahan Permata Hijau Land Blok C.3</p>
              <p>Kel. Sukagalih - Kec. Tarogong Kidul</p>
              <p>Kab. Garut - Prov. Jawa Barat 44150</p>
              <p>Hp 0895-0801-3535</p>
              <p>&nbsp;</p>
            </td>
            <td width="242">
              <p>
                <strong>Pengirim:</strong>
              </p>
              <p>Ade Novel, MM</p>
              <p>Graha Pos Indonesia Lantai 4 Blok C</p>
              <p>Jalan Banda No. 30</p>
              <p>Kel. Citarum - Kec. Bandung Wetan</p>
              <p>Kota Bandung - Prov. Jawa Barat</p>
              <p>Hp 085257534567</p>
            </td>
          </tr>
        </tbody>
      </table>
      <p>&nbsp;</p>
      <ol>
        <li>Letak penulisan alamat:</li>
      </ol>
      <p>Penulisan Alamat diletakkan pada posisi sebagai berikut:</p>
      <ol>
        <li>
          Untuk kiriman dalam kemasan sampul, alamat tujuan ditulis pada depan
          bagian kanan bawah, dan alamat pengirim ditulis di bagian kiri atas
          atau alamat tujuan ditulis pada depan dan alamat pengirim bagian
          belakang sampul.
        </li>
        <li>
          Untuk kiriman dalam kemasan paket, alamat tujuan terletak pada bagian
          atas atau sisi terlebar kiriman, dengan alamat tujuan terletak pada
          bagian kanan bawah, dan alamat pengirim terletak pada bagian kiri atas
          atau bagian belakang paket.
        </li>
        <li>
          Alamat pengirim dan penerima harus ditulis dengan jelas, terbaca,
          menggunakan tinta permanent, dan tidak tertutup oleh lakban, label
          stiker, dsb. Pastikan penempelan label resi tidak menutupi alamat
          pengirim dan penerima.
        </li>
        <li>Alamat ditulis dalam bahasa Indonesia dan huruf alfabet.</li>
      </ol>
      <p>&nbsp;</p>
      <ul>
        <li>Pengemasan Kiriman</li>
      </ul>
      <ol>
        <li>
          Kiriman yang akan dikirimkan melalui Pos Indonesia harus dikemas oleh
          pengirim.
        </li>
        <li>
          Syarat pengemasan kiriman yang baik:
          <ol>
            <li>
              Menjaga isi kiriman agar tidak rusak, kotor, berubah bentuk,
              berubah rasa, berubah aroma, dan berubah warna.
            </li>
            <li>Memudahkan proses penanganan kiriman,</li>
            <li>Tidak membahayakan petugas, dan</li>
            <li>
              Tidak merusak kiriman lain, alat angkut, maupun sarana dan
              prasarana lainnya.
            </li>
          </ol>
        </li>
        <li>Jenis-jenis Kemasan:</li>
        <li>Kayu</li>
        <li>Kardus</li>
        <li>Styrofoal</li>
        <li>Amplop</li>
        <li>Bubble wrap</li>
        <li>
          Panduan pengemasan produk untuk beberapa kiriman dengan bentuk khusus:
          <ol>
            <li>Packing Kiriman Cairan/ Madu/ Parfum</li>
          </ol>
        </li>
        <li>
          Dimasukkan ke dalam botol / jerigen plastik maksimal &frac34; dari
          volume botol/jerigen
        </li>
        <li>Jerigen / botol ditutup rapat dan dilakban</li>
        <li>
          Lalu dimasukkan dalam box <em>styrofoam </em>atau kardus yang telah
          diberi alas yang dapat menyerap madu / Air
        </li>
        <li>
          Kardus dilakban dan diberi potongan kayu pada keempat sisinya lalu
          dilakban sehingga jerigen / botol tetap pada posisi berdiri dan tidak
          bergerak di dalam box
        </li>
        <li>
          Kiriman harus dilampirkan dengan MSDS dan Uji lab (air)
          <ol>
            <li>Packing Produk Berbaterai</li>
          </ol>
        </li>
        <li>
          Barang yang dikirim dalam kondisi Baru, Bersegel Utuh, Original, dan
          berkapasitas maksimal battery 10.000 MaH.
        </li>
        <li>
          Dibungkus atau dikemas menggunakan <em>bubblewrap</em>.
        </li>
        <li>Masukkan barang elektronik ke dalam kardus yang pas.</li>
        <li>Tutup bagian atas dan bagian bawah kardus dengan lakban</li>
        <li>
          Kardus dilakban, dan ditambahkan potongan kayu di setiap sisi-nya,
          lalu lakban kembali hingga rapat. Untuk kiriman yang berukuran kecil,
          potongan kayu dapat diganti dengan <em>bubblewrap</em>.
        </li>
        <li>
          Rekatkan label pengirim dan penerima pada salah satu sisi kardus.
          Untuk kiriman <em>battery </em>non-<em>lithium </em>dikirim tanpa{" "}
          <em>battery </em>(dilepaskan).
          <ol>
            <li>Packing Produk Elektronik</li>
          </ol>
        </li>
        <li>Bungkus menggunakan bubble wrap</li>
        <li>Masukkan produk elektronik ke dalam kardus yang pas</li>
        <li>Tutup kardus bagian atas dan bawah dengan lakban</li>
        <li>Bungkus kembali dengan bubblewrap</li>
        <li>
          Rapatkan dengan lakban, lalu tempel label pengiriman dan penerima
        </li>
        <li>Tempel stiker fragile</li>
      </ol>
      <p>&nbsp;</p>
      <ol>
        <li>Packaging Kayu</li>
      </ol>
      <ol>
        <li>Rapi, simetris, dan kayunya kokoh</li>
        <li>Ujung kayu diberi bantalan</li>
        <li>Paku tidak boleh menonjol</li>
        <li>Kayu tidak boleh lapuk</li>
        <li>Tidak boleh ada ruang kosong</li>
        <li>Kayu tidak boleh menonjol dan harus rapih</li>
      </ol>
      <p>&nbsp;</p>
      <ol>
        <li>Packaging Serbuk</li>
      </ol>
      <ol>
        <li>
          Sebelum membungkus, pastikan kemasan kiriman dalam keadaan baik dan
          utuh, tidak robek atau rusak
        </li>
        <li>Kiriman dibungkus dengan menggunakan buble wrap lalu di lakban</li>
        <li>
          Kiriman dimasukkan dalam kardus, utk kiriman serbuk yang berbau tajam
          misalnya rempah2 dan kopi, dus dilapisi lagi dengan{" "}
          <em>bubblewrap</em>
        </li>
        <li>
          Ukuran dus disesuaikan dengan ukuran kiriman sehingga tidak ada ruang
          tersiasa
        </li>
        <li>Kardus dilakban pada semua sisinya</li>
        <li>Kiriman harus dilampirkan dengan MSDS</li>
      </ol>
      <p>
        <strong>&nbsp;</strong>
      </p>
      <ol>
        <li>
          <strong>KETENTUAN LAIN-LAIN</strong>
        </li>
      </ol>
      <p>
        PT Pos Indonesia (Persero) dapat mengubah, merevisi, memodifikasi Syarat
        dan Ketentuan sewaktu-waktu sesuai dengan kebutuhan basins yang
        diperlukan oleh PT Pos Indonesia (Persero).co.id
      </p>
      <ul>
        <li>
          047/DIRUT/0523 tentang Sistem Operasi Kurir PT Pos Indonesia (Persero)
          (last mile)
        </li>
        <li>040/DIR-5/0523 tentang Layanan Special Cargo</li>
        <li>UU 38 Tahun 2009 tentang Pos bab V Hak dan Kewajiban</li>
        <li>Buku Saku Petugas Loket</li>
      </ul>
      <p>&nbsp;</p>
      <ol>
        <li>Kiriman Terlarang</li>
      </ol>
      <ul>
        <li>
          047/DIRUT/0523 tentanKD. 047/DIRUT/0523 tentang Sistem Operasi Kurir
          PT Pos Indonesia (Persero)
        </li>
      </ul>
      <p>&nbsp;</p>
      <ol>
        <li>Ganti Rugi</li>
      </ol>
      <ul>
        <li>
          112/ DIR-5/1118 tentang Jaminan Ganti Rugi Kiriman Kurir dan Logistik
          Dalam Negeri
        </li>
      </ul>
      <p>&nbsp;</p>
      <ol>
        <li>Tarif Pengiriman</li>
        <li>Pengemasan Kiriman</li>
      </ol>
      <ul>
        <li>
          Petunjuk Pelaksanaan Loket Jasa Kurir dan Logistik untuk Kiriman
          Domestik versi 2023
        </li>
      </ul>
      <p>&nbsp;</p>
    </HomeLayout>
  );
}
