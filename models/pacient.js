const {Schema,model,Types} = require("mongoose")
const schema = new Schema({
    email: {type: String,required: true, unique: true},
    password:{type: String,required: true},
    name: {type: String,required: true},
    surname:{type: String,required: true},
    links: [{type:Types.ObjectId ,ref:"Link"}] //  связь моедли пациента и определенных записей в базе данных + ссылаемся на будущую модель Link

})

module.exports = model("Pacient",schema)