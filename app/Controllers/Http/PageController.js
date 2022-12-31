'use strict'

const SuratMasuk = use('App/Models/SuratMasuk')
const SuratKeluar = use('App/Models/SuratKeluar')
const Pengguna = use('App/Models/Pengguna')

class PageController {

    welcome({view}) {
        return view.render('welcome')
    }
    
    async index({ request, view, response, auth }) {
        const user = auth.user.toJSON()
        const inmails = await SuratMasuk.all()
        const outmails = await SuratKeluar.all()
        const users = await Pengguna.all()
        
        const jumlah_suratmasuk = (await SuratMasuk.query().count('* as total'))[0].total
        const jumlah_suratkeluar = (await SuratKeluar.query().count('* as total'))[0].total
        const jumlah_pengguna = (await Pengguna.query().count('* as total'))[0].total
        
        return view.render('index', {
            user: user,
            inmails: inmails.rows,
            outmails: outmails.rows,
            users: users.rows,
            jumlah_suratmasuk: jumlah_suratmasuk,
            jumlah_suratkeluar: jumlah_suratkeluar,
            jumlah_pengguna: jumlah_pengguna
        })
    }
}

module.exports = PageController
