import mongoose, {Schema} from "mongoose"; 

const UserSchema = new Schema({
    name: {
        type: String,   
        required: [true, "name is required!!"],
        trim: true
    },
    phone: {
        type: String,   
        required: [true, "Phone number is required!!"],
        trim: true
    },
    email: {
        type: String,   
        required: [true, "User email is required!!"],
        trim: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please use a valid email address"],
        unique: true
    },
    password: {
        type: String,   
        required: [true, "Password is required!!"],
        unique: true
    },
}, 
    {timestamps: true}
);

const UserModel = (mongoose.models.User) || mongoose.model("User", UserSchema);

export default UserModel;