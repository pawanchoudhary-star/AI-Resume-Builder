import mongoose from 'mongoose';
declare const _default: mongoose.Model<any, {}, {}, {}, any, any, any> | mongoose.Model<{
    userId: mongoose.Types.ObjectId;
    title: string;
    resumeData: any;
    experienceLevel: "student" | "fresher" | "experienced";
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    userId: mongoose.Types.ObjectId;
    title: string;
    resumeData: any;
    experienceLevel: "student" | "fresher" | "experienced";
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    userId: mongoose.Types.ObjectId;
    title: string;
    resumeData: any;
    experienceLevel: "student" | "fresher" | "experienced";
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    userId: mongoose.Types.ObjectId;
    title: string;
    resumeData: any;
    experienceLevel: "student" | "fresher" | "experienced";
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    userId: mongoose.Types.ObjectId;
    title: string;
    resumeData: any;
    experienceLevel: "student" | "fresher" | "experienced";
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    userId: mongoose.Types.ObjectId;
    title: string;
    resumeData: any;
    experienceLevel: "student" | "fresher" | "experienced";
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    userId: mongoose.Types.ObjectId;
    title: string;
    resumeData: any;
    experienceLevel: "student" | "fresher" | "experienced";
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    userId: mongoose.Types.ObjectId;
    title: string;
    resumeData: any;
    experienceLevel: "student" | "fresher" | "experienced";
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default _default;
//# sourceMappingURL=Resume.d.ts.map