'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

//Login
Route.get('login', 'Auth/LoginController.index').as('login.index').middleware(['RedirectIfAuthenticated'])
Route.post('login', 'Auth/LoginController.check').as('login.check').middleware(['RedirectIfAuthenticated'])
Route.get('logout', 'Auth/LoginController.logout').as('logout').middleware(['Authenticate'])

Route.group(() => {
    Route.get('/', 'PageController.index').as('index')

    //User
    Route.get('/users', 'UserController.index').as('user.index')
    Route.get('/users/show/:id', 'UserController.show').as('user.show')
    Route.post('/users/store', 'UserController.store').as('user.store')
    Route.get('/users/edit/:id', 'UserController.edit').as('user.edit')
    Route.post('/users/update/:id', 'UserController.update').as('user.update')
    Route.get('/users/delete/:id', 'UserController.delete').as('user.delete')

    //INMAILS
    //Inmail
    Route.get('/inmails', 'InmailController.index').as('inmail.index')
    Route.get('/inmails/show/:id', 'InmailController.show').as('inmail.show')
    Route.get('/inmails/delete/:id', 'InmailController.delete').as('inmail.delete')
    Route.get('/inmails/disposition/:id', 'InmailController.disposition').as('inmail.disposition')
    
    //Inmail-Report
    Route.get('/inmail-reports', 'InmailController.report').as('inmail.report')

    //Inmail-Disposition
    Route.get('/dispositions', 'DispositionController.index').as('inmail.disposition.index')
    Route.get('/dispositions/show/:id', 'DispositionController.show').as('disposition.show')
    Route.post('/dispositions/store', 'DispositionController.store').as('disposition.store')
    Route.get('/dispositions/edit/:id', 'DispositionController.edit').as('disposition.edit')
    Route.post('/dispositions/update/:id', 'DispositionController.update').as('disposition.update')
    Route.get('/dispositions/delete/:id', 'DispositionController.delete').as('disposition.delete')

    //OUTMAILS
    //Outmail
    Route.get('/outmails', 'OutmailController.index').as('outmail.index')
    Route.get('/outmails/show/:id', 'OutmailController.show').as('outmail.show')
    Route.get('/outmails/delete/:id', 'OutmailController.delete').as('outmail.delete')
    
    //Outmail-Report
    Route.get('/outmail-reports', 'OutmailController.report').as('outmail.report')
    Route.get('/outmails-reports/createMail/:id', 'OutmailController.createMail').as('outmail.createMail')
}).middleware(['Authenticate'])

//inmail
Route.post('/inmails/store', 'InmailController.store').as('inmail.store')
Route.get('/inmails/edit/:id', 'InmailController.edit').as('inmail.edit')
Route.post('/inmails/update/:id', 'InmailController.update').as('inmail.update')

//outmail
Route.post('/outmails/store', 'OutmailController.store').as('outmail.store')
Route.get('/outmails/edit/:id', 'OutmailController.edit').as('outmail.edit')
Route.post('/outmails/update/:id', 'OutmailController.update').as('outmail.update')

//createOutmail
Route.get('/outmails-reports/createOutmail/:id', 'OutmailController.createOutmail').as('outmail.createOutmail')
