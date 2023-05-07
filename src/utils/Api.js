
// класс для работы с api яндекс практикума
class Api {

  constructor(token, identifikator, zapros){
    this._token = token
    this._identifikator = identifikator
    this._zapros = zapros
  }

  _checkResponse(res){
    if(res.ok){
      return res.json();
    }
    return Promise.reject('Ошибка запроса');
  };

  // получить данные о профиле с сервера
  getInfoUserForServer(){

    return fetch(`${this._zapros}/${this._identifikator}/users/me`, {
    headers: {
      authorization: this._token 
    }
  })
  .then(res => {
    return this._checkResponse(res);
    })
  };

  // изменить данные о профиле с сервера и загрузить на страницу сайта
  patchInfoUserForServer(date){

    return fetch(`${this._zapros}/${this._identifikator}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: date.name,
        about: date.about
      })
    })
    .then(res => {
      return this._checkResponse(res);
    })
  }

  // изменить аватар
  patchAvatarForServer(avatar){

    return fetch(`${this._zapros}/${this._identifikator}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatar.avatar
      })
    })
    .then(res => {
      return this._checkResponse(res);
    })
  }

  // получить карточки с сервера
  getCardsForServer(){
    
    return fetch(`${this._zapros}/${this._identifikator}/cards`, {
        headers: {
          authorization: this._token 
        }
      })
      .then(res => {
        return this._checkResponse(res);
      })
  };

  // добавить новую карточку на сервер
  postCardsForServer(newCardDate){
  
    return fetch(`${this._zapros}/${this._identifikator}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: newCardDate.name,
        link: newCardDate.link
      })
    })
    .then(res => {
      return this._checkResponse(res);
    })
  }

  // удаление карточки
  deleteCardForServer(cardId){
    
    return fetch(`${this._zapros}/${this._identifikator}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
    .then(res => {
      return this._checkResponse(res);
    })
  } 

  //поставить лайк
  putLikeForServer(cardId){
    
    return fetch(`${this._zapros}/${this._identifikator}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._token
      }
    })
    .then(res => {
      return this._checkResponse(res);
    })
  } 

  //убрать лайк
  deleteLikeForServer(cardId){
  
    return fetch(`${this._zapros}/${this._identifikator}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
    .then(res => {
      return this._checkResponse(res);
    })
  } 



}

const token = 'c564ddc3-f58f-47cc-aac8-027be5fd7e89';
const identifikator = 'cohort-63';
const zapros = 'https://mesto.nomoreparties.co/v1';

const api = new Api(token, identifikator, zapros);


export default api;
