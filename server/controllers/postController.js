const postMessage = async (req,res) => {
    console.log('PC5: ', req.session)
    console.log('PC6: ', req.body)
    const db = req.app.get('db'),
        { title, image_url, content } = req.body,
        { id } = req.session.user;

    const postMessage = await db.post_message( [ id, title, image_url, content ] )
    return res.status(200).send(postMessage)
}
const getMessages = async (req,res) => {
    const db = req.app.get('db')
    const messages = await db.get_messages()
    console.log('PC15: ', messages)
    res.status(200).send(messages)
}
searchMessages = async (req, res) => {
    let {title} = req.params
    console.log(req.params, req.body)
    const db = req.app.get('db')
    const results = await db.search_results(title)
    console.log(results)

    res.status(200).send(results)
}

module.exports = {
    postMessage, getMessages, searchMessages
}