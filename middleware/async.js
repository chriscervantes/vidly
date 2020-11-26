module.exports = function (handler){
    return async (req,res,next) => {
      try{
          handler(res, req);
        }catch(ex){
          next(ex);
      }
    }
  }