import { useEffect } from 'react'
import Repo from './Repo'
import Link from 'next/link'
import { withRouter } from 'next/router'

import api from '../lib/api'
import { get, cache } from '../lib/repo-basic-cache'

function makeQuery(queryObject) {
    const query = Object.entries(queryObject)
        .reduce((result, entry) => {
            result.push(entry.join('='))
            return result
        }, []).join('&')
    return `?${query}`
}

const isServer = typeof window === 'undefined'
export default function(Comp, type= 'index') {

function withDetail({ repoBasic, router, ...rest }) {
    const query = makeQuery(router.query)

    useEffect(() => {
        if (!isServer) {
            cache(repoBasic)
        }
    })

    return (
        <div className="root">
            <div className="repo-basic">
                <Repo repo={repoBasic} />
                <div className="tabs">
                    {
                        type === 'index' ? <span className="tab">ReadMe</span> : <Link href={`/detail${query}`}><a className="tab">ReadMe</a></Link>
                    }
                    {
                        type === 'issue' ? <span className="tab">Issues</span> : <Link href={`/detail/issues${query}`}><a className="tab">Issues</a></Link>
                    }
                </div>
            </div>
            <div>
                <Comp {...rest}/>
            </div>
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

withDetail.getInitialProps = async (context) => {
    const { router, ctx } = context

    const { owner, name } = ctx.query

    const full_name = `${owner}/${name}`


    let pageData = {}
    if (Comp.getInitialProps) {
        pageData = await Comp.getInitialProps(context)
    }

    if (get(full_name)) {
        return {
            repoBasic: get(full_name),
            ...pageData
        }
    }

     const repoBasic = await api.request({
        url: `/repos/${owner}/${name}`
    }, ctx.req, ctx.res)
    
    if (!isServer) {
        cache(repoBasic.data)
    }

    return {
        repoBasic: repoBasic.data,
        ...pageData
    }
}
    return withRouter(withDetail)
}