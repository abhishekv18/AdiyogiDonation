import { Bhandara } from "../models/guest.model.js";

export const addGuest = async (req, res) => {
    try {
        const { name, phone, location } = req.body;

        // Validate input
        if (!name || !phone || !location) {
            return res.status(400).json({
                message: "All fields are required",
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
    //   const guestExists = await Bhandara.findOne({ phone });
    //   if(guestExists){
    //     return res.status(400).json({
    //         message: "Guest with this phone number already registered",
    //         success: false
    //     });
    //   }
        // Create a new volunteer object
        const guest = new Bhandara({
            name,
            phone,
            location
        });
           await guest.save();
        return res.status(201).json({
            message: "Guest Added Successfully",
            success: true,
            guest
        });
        



    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

// export const getGuests = async (req, res) => {
//     try {
//         const guests = await Bhandara.find().sort({ createdAt: -1 });
//         return res.status(200).json({
//             message: "Guests fetched successfully",
//             success: true,
//             guests
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             message: "Internal server error",
//             success: false
//         });
//     }
// }
export const getGuests = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 50;

    const guests = await Bhandara.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Bhandara.countDocuments();

    return res.status(200).json({
      success: true,
      guests,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const deleteGuest = async (req, res) => {
    try {
        const guestId = req.params.id;
       // const guest = await Bhandara.findByIdAndDelete({ _id: guestId });
       const guest = await Bhandara.findByIdAndDelete(guestId);
        if (!guest) {
            return res.status(404).json({
                message: "Guest not found",
                success: false
            });
        }
        return res.status(200).json({
            message: "Guest deleted successfully",
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


