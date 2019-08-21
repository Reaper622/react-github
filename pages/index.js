import { useEffect } from 'react'

const api = require('../lib/api')

function Index({ userRepos, userStarredRepos, isLogin }) {
    console.log(userRepos)
    console.log(userStarredRepos)
    console.log(isLogin)
    return <span>Index</span>
}

Index.getInitialProps = async ({ctx, reduxStore}) => {
    // const result = await axios.get('/github/search/repositories?q=react')
    //     .then(res => console.log(res))

    const user = reduxStore.getState().user
    if(!user || !user.id) {
        return {
            isLogin: false
        }
    }

    const userRepos = await api.request({
        url: '/user/repos'
    }, 
    ctx.req, 
    ctx.res
    )

    const userStarredRepos = await api.request({
        url: '/user/starred'
    },
    ctx.req,
    ctx.res
    )
    return {
        isLogin: true,
        userRepos: userRepos.data,
        userStarredRepos: userStarredRepos.data
    }
}

export default Index