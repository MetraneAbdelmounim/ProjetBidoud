
module.exports = {

  HOST: process.env.HOST || 'localhost',
  PORT: process.env.PORT || 5000,
  bdUrl : "mongodb://mongodb:27017/bidoudBD",
  atlasBdUrl:"mongodb+srv://aminebidoud:aminebidoud@cluster0.fzqjb.mongodb.net/bidoudBD?retryWrites=true&w=majority",
  secret_token_key:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ",
  token_expiration :"24h",
  cloudinary:{
    name : "aminebidoud99",
    api_key:"341377448546821",
    api_secret:"dVzp-9r7SD6aeow720LtpdJFkjw"
  }
}
