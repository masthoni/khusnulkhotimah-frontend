'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DisposisiSchema extends Schema {
  up () {
    this.create('disposisis', (table) => {
      table.increments()
      table.string('kepada')
      table.string('no_agenda')
      table.string('pengirim')
      table.string('no_surat')
      table.string('tgl_surat')
      table.text('perihal')
      table.text('isi')
      table.string('tgl_diterima')
      table.string('waktu_diterima')
      table.string('status')
      table.timestamps()
    })
  }

  down () {
    this.drop('disposisis')
  }
}

module.exports = DisposisiSchema
