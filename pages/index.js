import axios from "axios"
import { useEffect } from 'react'

const api = require('../lib/api')

function Index() {

    useEffect(() => {
        axios.post('/github/test', { test: 123})
    })
    return <span>Index</span>
}

Index.getInitialProps = async ({ctx}) => {
    // const result = await axios.get('/github/search/repositories?q=react')
    //     .then(res => console.log(res))

    const result = await api.request({
        url: '/search/repositories?q=react'
    }, ctx.req, ctx.res)

    return {
        data: result.data,
    }
}

export default Index