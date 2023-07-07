const bcrypt = require('bcrypt')

class EncryptDecrypt{
    static async encrypt(password) {
        try {
          const salt = await bcrypt.genSalt(6);
          const hash = await bcrypt.hash(password, salt);
          return hash;
        } catch (error) {
          throw error;
        }
      }
    static async matchPassword(password, hashedPassword){
        let isMatch = await bcrypt.compare(password, hashedPassword)
        return isMatch
        
    }

}

module.exports = EncryptDecrypt