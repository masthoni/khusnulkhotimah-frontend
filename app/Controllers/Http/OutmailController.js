'use strict'

const SuratKeluar = use('App/Models/SuratKeluar')
const Helpers = use("Helpers");
const Env = use("Env");

class OutmailController {

    async index({ request, view, response}) {
        const outmails = await SuratKeluar.all()
        const selesai = (await SuratKeluar.query().where('status', 'Selesai').count('* as total'))[0].total
        const dikembalikan = (await SuratKeluar.query().where('status', 'Dikembalikan').count('* as total'))[0].total
        const menunggu = (await SuratKeluar.query().where('status', 'Menunggu').count('* as total'))[0].total

        return view.render('outmail.index', {
            outmails: outmails.rows,
            selesai: selesai,
            dikembalikan: dikembalikan,
            menunggu: menunggu
        })
    }

    async show({ request, response, view, params }) {
        const id = params.id
        const outmail = await SuratKeluar.find(id)

        return view.render('outmail.show', { outmail: outmail })
    }

    async store({ request, response, view, session }) {
        const outmail = new SuratKeluar()

        if (request.file("fileLampiran") != null) {
            const lampiran = request.file("fileLampiran", {
                types: ["image", "jpg", "png", "jpeg", "pdf", "docx", "doc", "xlxs"],
                size: "2mb",
            });
    
            const lampiranName = `lampiran-${request.input("instansiTujuan")}-${request.input(
                "noSurat"
            )}.${lampiran.extname}`;

            await lampiran.move(Helpers.publicPath("uploads/surat-keluar/lampiran"), {
                name: lampiranName,
                overwrite: true,
            });
    
            if (!lampiran.moved()) {
                return [lampiran.error()];
            } else {
                outmail.lampiran = lampiranName;
            }
        } else {
            outmail.lampiran = '-'
        }

        outmail.klasifikasi_tujuan = request.input('klasifikasiTujuan')
        outmail.tgl = request.input('tglSurat')
        outmail.klasifikasi_surat = request.input('klasifikasiSurat')
        outmail.no_surat = request.input('noSurat')
        outmail.kepada = request.input('instansiTujuan')
        outmail.perihal = request.input('perihal')
        outmail.isi = request.input('isiSurat')
        outmail.status = request.input('status')

        await outmail.save()

        session.flash({ notification: 'Data Berhasil Disimpan!' })
        return response.route('outmail.index')
    }

    async edit({ request, response, view, params }) {
        const id = params.id
        const outmail = await SuratKeluar.find(id)

        return view.render('outmail.edit', { outmail: outmail })
    }

    async update({ request, response, view, params, session }) {
        const id = params.id
        const outmail = await SuratKeluar.find(id)

        outmail.klasifikasi_tujuan = request.input('klasifikasiTujuan')
        outmail.tgl = request.input('tglSurat')
        outmail.klasifikasi_surat = request.input('klasifikasiSurat')
        outmail.no_surat = request.input('noSurat')
        outmail.kepada = request.input('instansiTujuan')
        outmail.perihal = request.input('perihal')
        outmail.isi = request.input('isiSurat')
        outmail.status = request.input('status')

        if (request.file("fileLampiran") != null) {
            const lampiran = request.file("fileLampiran", {
              types: ["image", "jpg", "png", "jpeg", "pdf", "docx", "doc", "xlxs"],
              size: "5mb",
            });
      
            let lampiranName = `lampiran-${request.input("instansiTujuan")}-${request.input(
              "noSurat"
            )}.${lampiran.extname}`;
      
            await lampiran.move(Helpers.publicPath("uploads/surat-keluar/lampiran"), {
              name: lampiranName,
              overwrite: true,
            });
      
            if (!lampiran.moved()) {
              return lampiran.error();
            } else {
              outmail.lampiran = lampiranName;
            }
        }

        await outmail.save()

        session.flash({ notification: 'Data Berhasil Diubah!' })
        return response.route('outmail.index')
    }

    async delete({ request, response, view, params, session }) {
        const id = params.id
        const outmail = await SuratKeluar.find(id)
        
        await outmail.delete()
        session.flash({ notification: 'Data Berhasil Dihapus!' })
        return response.route('outmail.index')
    }

    async report({ request, view, response}) {
        const outmails = await SuratKeluar.all()
        
        return view.render('outmail.report.index', { outmails: outmails.rows })
    }

    async createMail({ request, response, view, params }) {
        const id = params.id
        const outmail = await SuratKeluar.find(id)

        return view.render('outmail.report.show', { outmail: outmail })
    }
    
    async createOutmail({ request, response, view, params }) {
        const id = params.id
        const outmail = await SuratKeluar.find(id)

        return view.render('outmail.report.show', { outmail: outmail })
    }
}

module.exports = OutmailController
