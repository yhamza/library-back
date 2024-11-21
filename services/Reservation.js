const reservationModel = require('../models/reservation');

class Reservation {
    static create = async (req, res, next) => {
        try {
            const newReservation = new reservationModel({
                bookTitle: req.body.bookTitle,
                ncin: req.body.ncin,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                debutEmprunt: req.body.debutEmprunt,
                finEmprunt: req.body.finEmprunt,
            });
            await newReservation.save();
            console.log("Reservation created");
            res.status(201).json({ message: "Reservation created successfully", data: newReservation });
        } catch (err) {
            console.log("Error creating new reservation:", err);
            res.status(500).json({ error: "Error creating new reservation" });
        }
    }


    static findAll = async (req, res, next) => {
        try {
            const allReservations = await reservationModel.find();
            if (!allReservations.length) {
                return res.status(404).json({ error: "Reservations not found" });
            }
            res.status(200).json({ message: "Reservations found", data: allReservations });
        } catch (err) {
            console.log("Error finding reservations:", err);
            res.status(500).json({ error: "Error finding reservations" });
        }
    }

    static deleteById = async (req, res, next) => {
        try {
            console.log(req.params.id);
            const deletedReservation = await reservationModel.findByIdAndDelete(req.params.id);
            if (!deletedReservation) {
                return res.status(404).json({ error: "Reservation not found" });
            }
            console.log("Reservation deleted");
            res.status(200).json({ message: "Reservation deleted successfully" });
        } catch (err) {
            console.log("Error deleting reservation:", err);
            res.status(500).json({ error: "Error deleting reservation" });
        }
    }

    static updateById = async (req, res, next) => {
        try {
            console.log(req.body.expiredIn);
            const reservationId = req.params.id;
            const updatedReservation = await reservationModel.findByIdAndUpdate(
                reservationId,
                {
                    bookTitle: req.body.title,
                    firstName: req.body.name,
                    finEmprunt: req.body.expiredIn,
                },
                { new: true }
            );

            if (updatedReservation) {
                console.log("Reservation updated:", updatedReservation);
                res.status(200).json({ message: "Reservation updated successfully", data: updatedReservation });
            } else {
                console.log("Reservation not found");
                res.status(404).json({ error: "Reservation not found" });
            }
        } catch (err) {
            console.log("Error updating reservation:", err);
            res.status(500).json({ error: "Error updating reservation" });
        }
    }

   


}

module.exports = Reservation;
