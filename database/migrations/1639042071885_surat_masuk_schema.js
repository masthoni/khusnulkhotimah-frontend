'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SuratMasukSchema extends Schema {
  up () {
    this.create('surat_masuks', (table) => {
      table.increments()
      table.string('tgl')
      table.string('no_agenda')
      table.string('no_surat')
      table.string('tgl_surat')
      table.text('lampiran')
      table.string('pengirim')
      table.text('perihal')
      table.string('status')
      table.string('file_surat').notNullable()
      table.string('diteruskan')
      table.timestamps()
    })
  }

  down () {
    this.drop('surat_masuks')
  }
}

module.exports = SuratMasukSchema
