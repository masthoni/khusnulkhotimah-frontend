'use strict'

/*
|--------------------------------------------------------------------------
| PenggunaSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Pengguna = use('App/Models/Pengguna')

class PenggunaSeeder {
  async run () {

    const data = [
      {
        role: 'Admin',
        nama: 'Administrator',
        nrp: '1222',
        satuan: 'SIUM',
        pangkat: 'BRIGDA',
        jenis_kelamin: 'Laki-laki',
        alamat: 'Lamongan',
        status: 'Aktif',
        username: 'administrator',
        password: '123'
      }
    ]

    await Pengguna.createMany(data)
  }
}

module.exports = PenggunaSeeder
