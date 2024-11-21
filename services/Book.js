const BookModel = require('../models/Book');

class Book {
    static createOne = async (req, res,next) => {
        try {
            console.log(req.body.img);

            const newBook = new BookModel({
                imgSrc:req.body.img,  
                title: req.body.title,
                author: req.body.author,
                publishedYear: req.body.publishedYear,
                genre: req.body.genre,
            });
            await newBook.save();
            console.log("Book created");
            res.status(201).json({ message: "Book created successfully" ,data:newBook});
        } catch (err) {
            console.log("Error creating new book:", err);

        }
    }
  
    static findAll=async (req,res,nex)=>{
        try {
            const finddBook = await BookModel.find();
            if (!finddBook) {
                return res.status(404).json({ error: "Books not found" });
            }
            res.status(200).json({message:"books",data:finddBook});
        } catch (err) {
            console.log("Error finding books:", err);
            res.status(500).json({ error: "Error finding books" });
        }

    }
    

    static deleteById = async (req, res, next) => {
        try {
            const deletedBook = await BookModel.findByIdAndDelete(req.params.id);
            if (!deletedBook) {
                return res.status(404).json({ error: "Book not found" });
            }
            console.log("Book deleted");
            res.status(200).json({ message: "Book deleted successfully" });
        } catch (err) {
            console.log("Error deleting book:", err);
            res.status(500).json({ error: "Error deleting book" });
        }
    }

    static updateById = async (req, res, next) => {
        try {
            const bookId = req.params.id;
            const updatedBook = await BookModel.findByIdAndUpdate(
                bookId,
                {
                    title: req.body.title,
                    author: req.body.author,
                    publishedYear: req.body.publishedYear,
                    genre: req.body.genre,
                },
                { new: true } // Pour retourner le document mis à jour
            );

            if (updatedBook) {
                console.log("Book updated:", updatedBook);
                res.status(200).send("Book updated");
            } else {
                console.log("Book not found");
                res.status(404).send("Book not found");
            }
        } catch (err) {
            console.log("Error updating book:", err);
            res.status(500).send("Error updating book");
        }
    }

}

module.exports = Book;
