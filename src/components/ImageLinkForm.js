import React from 'react'

const ImageLinkForm = ({onChange, onButtonSubmit}) => {
  return (
    <div>
      <p className="f3">
        {'This Magic Brain will detect faces in your pictures. Give it a try.'}
      </p>
      <div className="pa4 br3 w-50 center shadow-5 imageForm">
        <div className="br3 w-100">
          <input className="f4 pa2 w-70" type="text" onChange={onChange} />
          <button className="w-30 f4 link grow ph3 pv2 dib white bg-light-purple" onClick={onButtonSubmit}>Detect</button>
        </div>
      </div>
    </div>
  )
}

export default ImageLinkForm
