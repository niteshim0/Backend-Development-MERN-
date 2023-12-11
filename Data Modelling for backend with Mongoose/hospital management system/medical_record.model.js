import mongoose from "mongoose";

const medicalRecordSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other']
  },
  diagnosis: {
    type: String
  },
  medications: [{
    name: String,
    dosage: String,
    frequency: String
  }],
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Doctor",
    required:true,
  }
}, { timestamps: true });

export const MedicalRecord = new mongoose.model("MedicalRecord", medicalRecordSchema);
