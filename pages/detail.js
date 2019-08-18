function Detail() {
    return <span>Detail</span>
}

Detail.getInitalProps = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({})
        }, 1000)
    })
}

export default Detail