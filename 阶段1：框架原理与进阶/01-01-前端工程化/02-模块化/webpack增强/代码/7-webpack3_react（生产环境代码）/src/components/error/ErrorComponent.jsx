import React from 'react'

const ErrorComponent = () => {
    return <div style={{display:'flex',flex:1,justifyContent:'center',alignItems:'center',fontSize:30,color:'red'}}>
        亲，没有匹配任何组件哦，请检查你的路径是否正确
    </div>
}

export {ErrorComponent}
// export default ErrorComponent