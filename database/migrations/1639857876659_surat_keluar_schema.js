'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SuratKeluarSchema extends Schema {
  up () {
    this.create('surat_keluars', (table) => {
      table.increments()
      table.string('klasifikasi_tujuan')
      table.string('tgl')
      table.string('klasifikasi_surat')
      table.string('no_surat')
      table.string('lampiran')
      table.string('kepada')
      table.text('perihal')
      table.text('isi')
      table.string('status')
      table.timestamps()
    })
  }

  down () {
    this.drop('surat_keluars')
  }
}

module.exports = SuratKeluarSchema
