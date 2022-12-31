'use strict'

const Pengguna = use('App/Models/Pengguna')
//const { validate } = use('Validator')

class RegisterController {

    index({ view }) {
        return view.render('auth.register')
    }

    async store({ request, session, response }) {
        
        //declaration validation
        // const rules = {
        //     role: 'required',
        //     nama: 'required',
        //     nrp: 'required|unique',
        //     satuan: 'required',
        //     pangkat: 'required',
        //     jenis_kelamin: 'required',
        //     alamat: 'required',
        //     status: 'required',
        //     username: 'required|unique',
        //     password: 'required'
        // }

        // const messages = {
        //     'role.required': 'Role Tidak Boleh Konsong!',
        //     'nama.required': 'Nama Tidak Boleh Konsong!',
            
        //     'nrp.required': 'NRP Tidak Boleh Konsong!',
        //     'nrp.unique': 'NRP Sudah Terdaftar!',
            
        //     'satuan.required': 'Satuan Tidak Boleh Konsong!',
        //     'pangkat.required': 'Pangkat Tidak Boleh Konsong!',
        //     'jenis_kelamin.required': 'Jenis Kelamin Tidak Boleh Konsong!',
        //     'alamat.required': 'Alamat Tidak Boleh Konsong!',
        //     'status.required': 'Status Tidak Boleh Konsong!',
            
        //     'username.required': 'Username lengkap Tidak Boleh Kosong!',
        //     'username.unique': 'Username Sudah Terdaftar!',
            
        //     'password.required': 'Password Tidak Boleh Kosong!',
        // }

        // const validation = await validate(request.all(), rules, messages)

        //validation failed
        if(validation.fails()) {
            session.withErrors(validation.messages()).flashExcept(['password'])
            return response.redirect('back')
        }

        // //create user
        // const user = await User.create({
        //     role: request.input('role'),
        //     nama: request.input('nama'),
        //     nrp: request.input('nrp'),
        //     satuan: request.input('satuan'),
        //     pangkat: request.input('pangkat'),
        //     jenis_kelamin: request.input('jenis_kelamin'),
        //     alamat: request.input('alamat'),
        //     status: request.input('status'),
        //     username: request.input('username'),
        //     password: request.input('password')
        // })

        session.flash({ notification: 'Register Berhasil!' })
        return response.redirect('back')

    }
}

module.exports = RegisterController