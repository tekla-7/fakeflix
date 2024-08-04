export class User {
  constructor(
    public email : string,
    public id: string,
    private _token: string,
    private _tokenExpitationData: Date
  ) {}
  get token() {
    if (!this._tokenExpitationData || new Date() > this._tokenExpitationData) {
      return null;
    }
    return this._token;
  }
}
