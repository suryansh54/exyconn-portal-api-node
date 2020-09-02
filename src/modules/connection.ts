// Mongo DB connection via mongoose
const mongoose = require('mongoose');
import { Messages } from './utils/enums/message';

const mongoConnectionString = process.env.CONNECTION_STRING;

export function db() {
    return mongoose.connect(mongoConnectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }).then(() => {
        console.log(Messages.CONNECTED_TO_DATABASE);
    }).catch((err: any) => {
        console.log(`${Messages.DB_ERROR} ${err.message}`);
    });
}
