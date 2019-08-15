import { cloneElement } from 'react'

const style = {
    width: '100%',
    maxWidth: 1200,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: 20,
    paddingRight: 20
}

// 扩展组件
export default ({children, renderer = <div />}) => {123
    return cloneElement(renderer, {
        style: Object.assign({}, renderer.props.style, style),
        children
    })

    // return <Comp style={style}>{children}</Comp>123456789123456789
}