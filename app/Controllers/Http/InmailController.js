"use strict";

const SuratMasuk = use("App/Models/SuratMasuk");
const Disposisi = use("App/Models/Disposisi");
const Helpers = use("Helpers");
const Env = use("Env");

class InmailController {
  async index({ request, view, response }) {
    const inmails = await SuratMasuk.all();
    const selesai = (
      await SuratMasuk.query().where("status", "Selesai").count("* as total")
    )[0].total;
    const proses = (
      await SuratMasuk.query()
        .where("status", "Menunggu Konfirmasi")
        .count("* as total")
    )[0].total;

    return view.render("inmail.index", {
      inmails: inmails.rows,
      selesai: selesai,
      proses: proses,
    });
  }

  async image_path({ response, params }) {
    return response.download(
      Helpers.publicPath(`uploads/produk/${params.file}`)
    );
  }

  async show({ request, response, view, params }) {
    const id = params.id
    const inmail = await SuratMasuk.find(id)

    return view.render('inmail.show', { inmail: inmail })
  }

  async store({ request, response, view, session }) {
    const inmail = new SuratMasuk();

    if (request.file("fileLampiran") != null) {
      const lampiran = request.file("fileLampiran", {
        types: ["image", "jpg", "png", "jpeg", "pdf", "docx", "doc", "xlxs"],
        size: "2mb",
      });
  
      const lampiranName = `lampiran-${request.input("pengirim")}-${request.input(
        "noAgenda"
      )}.${lampiran.extname}`;
  
      await lampiran.move(Helpers.publicPath("uploads/surat-masuk/lampiran"), {
        name: lampiranName,
        overwrite: true,
      });
  
      if (!lampiran.moved()) {
        return lampiran.error();
      } else {
        inmail.lampiran = lampiranName;
      }
    } else {
      inmail.lampiran = '-'
    }
    
    const fileSurat = request.file("fileSurat", {
      types: ["image", "jpg", "png", "jpeg", "pdf", "docx", "doc", "xlxs"],
      size: "5mb",
    });
    
    const suratName = `surat-${request.input("pengirim")}-${request.input(
      "noAgenda"
    )}.${fileSurat.extname}`;

    inmail.tgl = request.input("tanggal");
    inmail.no_agenda = request.input("noAgenda");
    inmail.no_surat = request.input("noSurat");
    inmail.tgl_surat = request.input("tanggalSurat");
    inmail.pengirim = request.input("pengirim");
    inmail.perihal = request.input("perihal");
    inmail.status = request.input("status");
    inmail.diteruskan = ''

    await fileSurat.move(Helpers.publicPath("uploads/surat-masuk/surat"), {
      name: suratName,
      overwrite: true,
    });

    if (!fileSurat.moved()) {
      return [fileSurat.error()];
    } else {
      inmail.file_surat = suratName;
    }

    await inmail.save();

    session.flash({ notification: "Data Berhasil Disimpan!" });
    return response.route("inmail.index");
  }

  async edit({ request, response, view, params }) {
    const id = params.id;
    const inmail = await SuratMasuk.find(id);

    return view.render("inmail.edit", { inmail: inmail });
  }

  async update({ request, response, view, params, session }) {
    const id = params.id;
    const inmail = await SuratMasuk.find(id);

    inmail.tgl = request.input("tanggal");
    inmail.no_agenda = request.input("noAgenda");
    inmail.no_surat = request.input("noSurat");
    inmail.tgl_surat = request.input("tanggalSurat");
    inmail.pengirim = request.input("pengirim");
    inmail.perihal = request.input("perihal");
    inmail.status = request.input("status");
    inmail.diteruskan = request.input("diteruskan");

    if (request.file("fileSurat") != null) {
      const fileSurat = request.file("fileSurat", {
        types: ["image", "jpg", "png", "jpeg", "pdf", "docx", "doc", "xlxs"],
        size: "5mb",
      });

      let suratName = `surat-${request.input("pengirim")}-${request.input(
        "noAgenda"
      )}.${fileSurat.extname}`;

      await fileSurat.move(Helpers.publicPath("uploads/surat-masuk/surat"), {
        name: suratName,
        overwrite: true,
      });

      if (!fileSurat.moved()) {
        return fileSurat.error();
      } else {
        inmail.file_surat = suratName;
      }
    }

    if (request.file("fileLampiran") != null) {
      const lampiran = request.file("fileLampiran", {
        types: ["image", "jpg", "png", "jpeg", "pdf", "docx", "doc", "xlxs"],
        size: "5mb",
      });

      let lampiranName = `lampiran-${request.input("pengirim")}-${request.input(
        "noAgenda"
      )}.${lampiran.extname}`;

      await lampiran.move(Helpers.publicPath("uploads/surat-masuk/lampiran"), {
        name: lampiranName,
        overwrite: true,
      });

      if (!lampiran.moved()) {
        return lampiran.error();
      } else {
        inmail.lampiran = lampiranName;
      }
    }

    await inmail.save();

    session.flash({ notification: "Data Berhasil Diubah!" });
    return response.route("inmail.index");
  }

  async delete({ request, response, view, params, session }) {
    const id = params.id;
    const inmail = await SuratMasuk.find(id);
    
    await inmail.delete();
    session.flash({ notification: "Data Berhasil Dihapus!" });
    return response.route("inmail.index");
  }

  async disposition({ response, view, params, session }) {
    const id = params.id;
    const inmail = await SuratMasuk.find(id);
    const disposition = new Disposisi();

    disposition.no_agenda = inmail.no_agenda;
    disposition.no_surat = inmail.no_surat;
    disposition.tgl_surat = inmail.tgl_surat;
    disposition.pengirim = inmail.pengirim;
    disposition.perihal = inmail.perihal;
    disposition.status = inmail.status;

    await disposition.save();

    session.flash({ notification: "Disposisi Berhasil Dibuat!" });
    return response.route("inmail.index");
  }

  async report({ request, view, response }) {
    const inmails = await SuratMasuk.all()

    return view.render('inmail.report.index', { inmails: inmails.rows })
  }
}

module.exports = InmailController;
