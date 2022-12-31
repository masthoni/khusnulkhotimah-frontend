'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PenggunaSchema extends Schema {
  up () {
    this.create('penggunas', (table) => {
      table.increments()
      table.string('role').notNullable()
      table.string('nama').notNullable()
      table.string('nrp').notNullable()
      table.string('satuan').notNullable()
      table.string('pangkat').notNullable()
      table.string('jenis_kelamin').notNullable()
      table.string('alamat').notNullable()
      table.string('status').notNullable()
      table.string('username', 80).notNullable().unique()
      table.string('password', 60).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('penggunas')
  }
}

module.exports = PenggunaSchema
