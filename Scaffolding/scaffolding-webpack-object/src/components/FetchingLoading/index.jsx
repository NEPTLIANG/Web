import React from 'react'
import './index.scss';
import classNames from 'classnames';

class FetchingLoading extends React.Component {
  
  render () {
    const isFixedTop = this.props.isFixedTop;
    return (
       <div style={{
          position: 'fixed',
          top:0,
          left:0,
          bottom:0,
          right:0,
          fontSize:0,
          zIndex:999,
          textAlign:'center'
       }}>
          <div className={classNames('fetchingLoad', {fetchingFixedTop: isFixedTop })}
          >
          加载中...
          {this.props.children}
          </div>
          <div style={{
              display: 'inline-block',
              height:'100%',
              width:'1px',
              marginLeft:'-1px',
              content:"",
              verticalAlign: 'middle',
          }}>

          </div>
       </div>
    )
  }
}

FetchingLoading.defaultProps = {
  isFixedTop: false
}

export default FetchingLoading
