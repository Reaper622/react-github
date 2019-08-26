import Repo from '../../components/Repo'
import Link from 'next/link'

import api from '../../lib/api'

function makeQuery(queryObject) {
    const query = Object.entries(queryObject)
        .reduce((result, entry) => {
            result.push(entry.join('='))
            return result
        }, []).join('&')
    return `?${query}`
}

function Detail({ repoBasic }) {
    return (
        <div className="root">
            <div className="repo-basic">
                <Repo repo={repoBasic} />
                <div className="tabs">
                    <Link href="/detail">
                        <a className="index">ReadMe</a>
                    </Link>
                    <Link href="/detail/issues">
                        <a className="issues">Issues</a>
                    </Link>
                </div>
            </div>
            <div>ReadMe</div>
            <style jsx>{`
                    .root {
                        padding-top: 20px;
                    }
                    .repo-basic {
                        padding: 20px;
                        border: 1px solid #eee;
                        margin-bottom: 20px;
                        border-radius: 5px;
                    }
                    .tab + .tab {
                        margin-left: 20px;
                    }
                `}</style>
        </div>
    )
}

Detail.getInitialProps = async ({ router, ctx }) => {

    const { owner, name } = ctx.query
    // return new Promise((resolve) => {
    //     setTimeout(() => {
    //         resolve({})
    //     }, 1000)
    // })

    const repoBasic = await api.request({
        url: `/repos/${owner}/${name}`
    }, ctx.req, ctx.res)

    return {
        repoBasic: repoBasic.data
    }
}

export default Detail