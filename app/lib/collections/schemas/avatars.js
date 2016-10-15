import { SimpleSchema } from 'meteor/aldeed:simple-schema';


const AvatarsSchema = new SimpleSchema({
	userId: {
		type: String,
	},
	imageURL: {
		type: String,
	}
});

export default AvatarsSchema;