var keystone = require('keystone');
var Types = keystone.Field.Types;

/** 
 * Recipe Model
 * ==========
*/ 

var Recipe = new keystone.List('Recipe');

Recipe.add({
    title: { type: String, required: true, initial: true, index: true  },
    state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
    publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published'} },
    img: { 
		type: String,
		required: true, 
		initial: true, 
		index: true,
	},
    article: {
        brief: { type: Types.Html, wysiwyg: true, height: 150 },
        extend: { type: Types.Html, wysiwyg: true, height: 400 },
    },
    buttontext: { type: String, require: true, initial: true, index: true }
});

// Recipe.schema.virtual('content.full').get(function () {
//     return this.content.extended || this.content.brief;
// });

Recipe.defaultColumns = 'title, article, image, buttontext, state|20%';
Recipe.register();