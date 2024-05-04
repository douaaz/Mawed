const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const FormDataModel = require ('./models/FormData');
const AdminsModel = require ('./models/Admins');
const ClinicModel = require ('./models/Clinic');
const AppointmentsModel = require ('./models/Appointment');
const ReviewsModel = require ('./models/Reviews');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/practice_mern');

app.post('/register', (req, res)=>{
    // To post / insert data into database

    const {email, password} = req.body;
    FormDataModel.findOne({email: email})
    .then(user => {
        if(user){
            res.json("Already registered")
        }
        else{
            FormDataModel.create(req.body)
            .then(patients => res.json(patients))
            .catch(err => res.json(err))
        }
    })

})

app.post('/login', (req, res)=>{
    // To find record from the database
    const {email, password} = req.body;
    FormDataModel.findOne({email: email})
    .then(user => {
        if(user){
            // If user found then these 2 cases
            if(user.password === password) {
                res.json("Success");
            }
            else{
                res.json("Wrong password");
            }
        }
        // If user not found then
        else{
            res.json("No records found! ");
        }
    })
})

app.post('/adminlogin', (req, res)=>{
    // To find record from the database
    const {email, password} = req.body;
    AdminsModel.findOne({email: email})
    .then(user => {
        if(user){
            // If user found then these 2 cases
            if(user.password === password) {
            res.status(200).json({
              message: 'Success',
              user: user.name
             });
                //res.json("Success", loggedInUser);
            }
            else{
                res.json("Wrong password");
            }
        }
        // If user not found then
        else{
            res.json("No records found! ");
        }
    })
})

app.post('/searchClinic', (req, res)=>{
    // To find record from the database
    const {location, specific} = req.body;
    ClinicModel.findOne({neighborhood: location})
    .then(user => {
        if(user){
            if(user.name.includes(specific) || typeof specific === 'undefined' || typeof specific === none){
              res.status(200).json({
                message: 'Success',
                user: [[user.name], user.doctors]
               });
            }

        }
        // If user not found then
        else{
            res.json("No clinics! ");
    }

  })
})



app.post('/booking', (req, res)=>{
    // To post / insert data into database

    const {clinic, doctor, date, time, patient, contactNumber, insuranceId, reason, status} = req.body;
    AppointmentsModel.findOne({contactNumber: contactNumber})
    .then(user => {
        if(user){
            res.json("Max");
        }
        else{
          AppointmentsModel.create({clinic, doctor, date, time, patient, contactNumber, insuranceId, reason,status})
            //AppointmentsModel.create(req.body)
            .then(appointments => res.json(appointments))
            .catch(err => res.json(err))
        }
    })

})

app.get('/doctor/appointments', async (req, res) => {
    const { doctorId } = req.query; // Assuming doctorId is passed as a query parameter

    try {
        // Find appointments where the doctor field matches the provided doctorId
        const appointments = await AppointmentsModel.find({ doctor: doctorId });

        res.status(200).json({ appointments });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch appointments', error: error.message });
    }
});


app.patch('/doctor/appointments/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const appointment = await AppointmentsModel.findByIdAndUpdate(
      id,
      { $set: { status } },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.status(200).json(appointment);
  } catch (error) {
    console.error('Failed to update appointment:', error);
    res.status(500).json({ error: 'Failed to update appointment' });
  }
});


app.post('/reviews', async (req, res) => {
  try {
    const { name, content, rating } = req.body;

    const newReview = new ReviewsModel({ name, content, rating });
    await newReview.save();

    console.log('Review saved:', newReview);

    res.status(201).json({ message: 'Review saved successfully', review: newReview });
  } catch (error) {
    console.error('Error saving review:', error);
    res.status(500).json({ error: 'Failed to save review' });
  }
});

// API Endpoint to Get Reviews
app.get('/reviews', async (req, res) => {
  try {
    const reviews = await ReviewsModel.find();
    res.json(reviews);
  } catch (err) {
    console.error('Error fetching reviews:', err);
    res.status(500).json({ error: 'Error fetching reviews' });
  }
});


app.listen(3001, () => {
    console.log("Server listining on http://127.0.0.1:3001");

});
