
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
}

const token = 'c564ddc3-f58f-47cc-aac8-027be5fd7e89';
const identifikator = 'cohort-63';
const zapros = 'https://mesto.nomoreparties.co/v1';

const api = new Api(token, identifikator, zapros);


export default api;
