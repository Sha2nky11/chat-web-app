import React from 'react'
import { Modal } from 'rsuite';
import { useModalState } from '../../../misc/custom-hooks'

const ImgBtnModal = ({src ,fileName}) => {

    const {isOpen , open ,close} = useModalState();

    return (
        <>
          <input type="image" alt="file" src={src} onClick={open} className="mh-100 mw-100 w-auto"/>  
          <Modal show={isOpen} onHide={close} >
              <Modal.Header> 
                  <Modal.Title> {fileName} </Modal.Title>
              </Modal.Header>
              <Modal.Body> 
                  <div>
                      <img src={src} alt="file" width="100%" height="100%"/>
                  </div>
              </Modal.Body>
              <Modal.Footer> 
                  <a href={src} target="blank"  rel ="noopener noreferrer"> 
                    View Original 
                  </a>
              </Modal.Footer>
          </Modal>
        </>
    )
}

export default ImgBtnModal
