
module.exports = {

  HOST: process.env.HOST || '127.0.0.1',
  PORT: process.env.PORT || 5000,
  bdUrl : "mongodb://127.0.0.1:27017/bidoudBD",
  atlasBdUrl:"mongodb+srv://arram:arram@cluster0-3yvyb.mongodb.net/arramdb?retryWrites=true&w=majority",
  secret_token_key:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ",
  token_expiration :"24h"
}
