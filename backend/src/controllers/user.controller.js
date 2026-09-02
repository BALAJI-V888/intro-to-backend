import { User } from "../models/user.model.js"

const registerUser = async (request, response) => {

    try {
            
    const {username, email, password} = await request.body;

    // Unfilled requests
    if(!username || !email || !password){
        return response.status(400).json({
            message : "Fill all the required fields!"
        });
    }

    // Blocking duplicate user
    const exists = await User.findOne({ email : email.toLowerCase() });

    if(exists){
        return response.status(400).json({
            message : "user is already registered, Please try to sign-in..."
        });
    }

    // Register new user
    const user = await User.create({
        username,
        email,
        password,
    });

    response.status(201).json({
        message : "user created successfully",
        user : {
            id : user._id,
            username : user.username,
            email : user.email,
        }
    });
    } catch (error) {
        response.status(500).json({
            message : "Internal Server Error",
            error : error.message
        })
    }

}

const loginUser = async (request, response) => {
    try {
        //Checking if the user already exists

        const { email, password } = request.body;

        const user = await User.findOne({
            email : email.toLowerCase()
        });

        if(!user){
            request.status(400).json({
                message : "user not found Please register to log-in"
            })
        }

        // Password authentication
        const isMatch = user.comparePassword(password);

        if(!isMatch){
            response.status(400).json({
                message : "invalid credentials"
            })
        }

        response.status(200).json({
            message : "user logged-in",
            user : {
                id : user._id,
                username : user.username,
                email : user.email
            }
        })
        

    } catch (error) {
        response.status(500).json({
            message : "Internal Server Error"
        })
    }
}

const logoutUser = async (request, response) => {
    try {
        const { email } = await request.body;

        const user = await User.findOne({ email });

        if(!user){
            response.status(400).json({
                message : "user not found"
            })
        }

        response.status(200).json({
            message : "Logout successfully"
        })
    } catch (error) {
        response.status(500).json({
            message : "Internal Server Error",
            error : error.message
        })
    }
}

export { registerUser, loginUser, logoutUser };