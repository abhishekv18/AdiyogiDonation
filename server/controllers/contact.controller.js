import { Contact } from "../models/contact.model.js";

export const addContact = async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        // Validate input
        if (!name || !email || !phone || !message) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: "Invalid email format",
                success: false
            });
        }
        const phoneRegex = /^[6-9]\d{9}$/; // Assuming phone number is 10 digits
        if (!phoneRegex.test(phone)) {
            return res.status(400).json({
                message: "Invalid phone number format",
                success: false
            });
        }
    //   const contactExists = await Contact.findOne({ email });
    //   if(contactExists){
    //     return res.status(400).json({
    //         message: "Contact with this email already registered",
    //         success: false
    //     });
    //   }
        // Create a new volunteer object
        const contact = new Contact({
            name,
            email,
            phone,
            message
        });
           await contact.save();
        return res.status(201).json({
            message: "Details Send Successfully",
            success: true,
            contact
        });
        



    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

export const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        return res.status(200).json({
            message: "Contacts fetched successfully",
            success: true,
            contacts
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

export const deleteContact = async (req, res) => {
    try {
        const contactId = req.params.id;
        const contact = await Contact.findByIdAndDelete({ _id: contactId });
        if (!contact) {
            return res.status(404).json({
                message: "Contact not found",
                success: false
            });
        }
        return res.status(200).json({
            message: "Contact deleted successfully",
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}


