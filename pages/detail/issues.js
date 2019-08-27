import withRepoBasic from '../../components/with-repo-basic'

function Issues({text})  {
    return <span>Issues Index {text}</span>
}

Issues.getInitialProps = async () => {
    return {
        text: 123
    }
}


export default withRepoBasic(Issues, 'issue')