'use strict'

const Disposisi = use('App/Models/Disposisi')

class DispositionController {
    
    async index({ request, view, response }) {
        const dispositions = await Disposisi.all()
        
        return view.render('inmail.disposition.index', {
            dispositions: dispositions.rows
        })
    }

    async show({ request, response, view, params }) {
        const id = params.id
        const disposition = await Disposisi.find(id)
    
        return view.render('inmail.disposition.show', { disposition: disposition })
    }

    async edit({ request, response, view, params }) {
        const id = params.id
        const disposition = await Disposisi.find(id)

        return view.render('inmail.disposition.edit', { disposition: disposition })
    }

    async update({ request, response, view, params, session }) {
        const id = params.id
        const disposition = await Disposisi.find(id)

        disposition.kepada = request.input('kepada')
        disposition.no_agenda = request.input('noAgenda')
        disposition.pengirim = request.input('pengirim')
        disposition.no_surat = request.input('noSurat')
        disposition.tgl_surat = request.input('tglSurat')
        disposition.perihal = request.input('perihal')
        disposition.tgl_diterima = request.input('tglDiterima')
        disposition.waktu_diterima = request.input('waktuDiterima')
        disposition.status = request.input('status')

        await disposition.save()

        session.flash({ notification: 'Data Berhasil Diubah!' })
        return response.route('inmail.disposition.index')
    }

    async delete({ request, response, view, params, session }) {
        const id = params.id
        const disposition = await Disposisi.find(id)
        
        await disposition.delete()
        session.flash({ notification: 'Data Berhasil Dihapus!' })
        return response.route('inmail.disposition.index')
    }
}

module.exports = DispositionController
