module.exports={
    //connection 
    HOST : "localhost",
    USER : "root",
    PASSWORD :"",
    DB : "e-comm",
    dialect :"mysql",
    logging:false,
    pool:{
        mix :5,
        min:0,
        acquire :30000,
        idel : 10000
    }
}