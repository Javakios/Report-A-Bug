export class User {

  constructor(

    public id: number,
    public name: string,
    public email: string,
    public admin: boolean,
    private _token: string,
    private _tokenExpirationDate: Date,
  ) { }

  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }

}
