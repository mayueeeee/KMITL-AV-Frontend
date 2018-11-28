import React from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import QrReader from 'react-qr-scanner'


class CodeReader extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      delay: 100,
      result: 'No result',
    }
  }

  handleScan(data){
    this.setState({
      result: data,
    })
  }
  handleError(err){
    console.error(err)
    alert(err)
  }

  
  render() {
    const previewStyle = {
      height: 240,
      width: 320,
    }

    return (
      <div>
       <QrReader
          delay={this.state.delay}
          style={previewStyle}
          onError={this.handleError}
          onScan={this.handleScan}
          />
        <p>{this.state.result}</p>
      </div>
    )
  }
}

export default CodeReader