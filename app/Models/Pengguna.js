"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");
const Hash = use("Hash");

class Pengguna extends Model {
  static boot() {
    super.boot();

    this.addHook("beforeSave", async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password);
      }
    });
  }

  // static get traits () {
  //   return [
  //     '@provider:Adonis/Acl/HasRole',
  //     '@provider:Adonis/Acl/HasPermission'
  //   ]
  // }
}

module.exports = Pengguna;
