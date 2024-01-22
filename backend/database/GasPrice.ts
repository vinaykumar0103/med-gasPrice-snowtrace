import mongoose, { Document, Schema } from 'mongoose';

export interface IGasPrice extends Document {
    value: number;
    timeStamp: Date;
}

const gasPriceSchema = new Schema({
    value: { type: Number, require: true },
    timestamp: { type: Date, default: Date.now, index: true },
});

const GasPrice = mongoose.model<IGasPrice>('Gasprice', gasPriceSchema)

export default GasPrice;