"use strict";

//const Hash = use('@ioc:Adonis/Core/Hash')
const Pengguna = use("App/Models/Pengguna");

class LoginController {
  index({ view }) {
    return view.render("auth.login");
  }

  async check({ request, auth, session, response }) {

    const users = await Pengguna.all()
    
    /**
     * get data from form
     */
    const { username, password } = request.all();

    /**
     * attemp auth
     */
    await auth.attempt(username, password);

    return response.route("index");
  }

  async logout({ auth, response }) {
    await auth.logout();
    return response.route("login.index");
  }
}

module.exports = LoginController;
