const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/first_DB', () => {
    console.log('RESULTS')
},
    console.error('ERROR')

)

const StudentSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    address: { type: mongoose.SchemaTypes.ObjectId, ref: 'Address' }
})
const Student = mongoose.model('Student', StudentSchema);

const AddressSchema = new mongoose.Schema({
    streetName: String,
    streetNumber: String,
    postCode: String,
    city: String
})
const Address = mongoose.model('Address', AddressSchema);

async function run() {

    const Adss = await Address.create({
        streetName: 'commander massoud',
        streetNumber: '01',
        postCode: "02525",
        city: 'Panjsher'
    })
    await Adss.save().then(res => {

        const id = res._id
        const std = Student.create({
            firstName: 'Erfan',
            lastName: "Ahmad",
            address: id
        })
        Student.find({ lastName: 'Ahmad' }).populate('address').exec().then(result => {
          console.log(result)  
        })
        
    })

}

run()
