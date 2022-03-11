const Database = require("../db/config")

// Reminder: create slugify function on post input, to throw into the database and use as URL reference

module.exports = {
async open(req, res){
        const db = await Database()

        
        const postSlug = req.params.slug
        const postDate = req.params.date
        const postContents = await db.get(`SELECT * FROM posts WHERE "urlSlug" = "${postSlug}"`)

        console.log(postContents)
        const title = postContents.title
        const urlSlug = postContents.urlSlug
        const subtitle = postContents.subtitle
        const date = postContents.date.split(" ")[0]
        const body = postContents.body
        
        if (date == postDate && postSlug == urlSlug){
            res.render("post", {title: title, subtitle: subtitle, date:date, body:body})
        } else {
            res.render("not-found")
        }

    }
}