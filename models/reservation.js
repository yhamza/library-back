const mongoose=require('mongoose')


//reservation model
const reservationSchema=new mongoose.Schema(
    {
        bookTitle:{type:String},   
        ncin:{type:String,length:8},
        firstName:{type:String},
        lastName:{type:String},
        debutEmprunt:{type:String},
        finEmprunt:{type:String}
    }
)

//export reservation model
const reservation= mongoose.model('reservations',reservationSchema);
module.exports=reservation;
