'use strict'

const Pengguna = use('App/Models/Pengguna')

class UserController {

    async index({ request, view, response}) {
        const users = await Pengguna.all()
        
        return view.render('user.index', { users: users.rows })
    }

    async show({ request, response, view, params }) {
        const id = params.id
        const user = await Pengguna.find(id)
    
        return view.render('user.show', { user: user })
    }

    async store({ request, response, view, session }) {
        const user = new Pengguna()

        user.role = request.input('role')
        user.nama = request.input('nama')
        user.nrp = request.input('nrp')
        user.satuan = request.input('satuan')
        user.pangkat = request.input('pangkat')
        user.jenis_kelamin = request.input('jenisKelamin')
        user.alamat = request.input('alamat')
        user.status = request.input('status')
        user.username = request.input('username')
        user.password = request.input('password')
        await user.save()

        session.flash({ notification: 'Data Berhasil Disimpan!' })
        return response.route('user.index')
    }

    async edit({ request, response, view, params }) {
        const id = params.id
        const user = await Pengguna.find(id)

        return view.render('user.edit', { user: user })
    }

    async update({ request, response, view, params, session }) {
        const id = params.id
        const user = await Pengguna.find(id)

        user.role = request.input('role')
        user.nama = request.input('nama')
        user.nrp = request.input('nrp')
        user.satuan = request.input('satuan')
        user.pangkat = request.input('pangkat')
        user.jenis_kelamin = request.input('jenisKelamin')
        user.alamat = request.input('alamat')
        user.status = request.input('status')
        user.username = request.input('username')
        user.password = request.input('password')
        await user.save()

        session.flash({ notification: 'Data Berhasil Diubah!' })
        return response.route('user.index')
    }

    async delete({ request, response, view, params, session }) {
        const id = params.id
        const user = await Pengguna.find(id)
        
        await user.delete()
        session.flash({ notification: 'Data Berhasil Dihapus!' })
        return response.route('user.index')
    }

}

module.exports = UserController
