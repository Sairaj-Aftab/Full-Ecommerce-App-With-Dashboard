import mongoose from 'mongoose';

const mongoDBconnected = () => {

    try {
        
        const connect = mongoose.connect(process.env.MONGODB)
        console.log(`MongoDB connected successfully`.bgBlue.black);

    } catch (error) {
        console.log(error);
    }

}

export default mongoDBconnected;