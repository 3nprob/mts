import React from 'react'
import cx from 'classnames'
import { topBorder, container1, container1Image, container1Info, container1InfoLead, container1InfoLink } from './Book.scss'
import { bookDefaultProps, bookPropTypes } from './Book.props'
import { windowObjectExists } from '../../../../../library/src/environment'
import BookCover from '../../../asset/image/bookcover.jpg'
import { LoremIpsum } from '../../atom/placeholder/LoremIpsum'
import { element } from '../../../../../library/src/client/dom'
import { size } from '../../../../../library/src/client/placeholder'

export function Book({ className }) {
  return (
    <div className={cx(className, topBorder)}>
      <div className={container1}>
        <div className={container1Image}>
          <div style={{ width: '100%', paddingBottom: '75%' }} />
          <picture>
            <img src={!windowObjectExists ? 'mts/static/bookcover.jpg' : BookCover} alt="banner" />
          </picture>
        </div>
        <div className={container1Info}>
          <h2>Will Smith - A Biography</h2>
          <LoremIpsum className={container1InfoLead} container={element.paragraph} length={size.x2Small} count={1} />
          <div style={{ marginBottom: '10px' }} />
          <div>
            <a
              href="https://www.amazon.com/Will-Smith-Biography-Greenwood-Biographies/dp/0313376107"
              target="_blank"
              rel="noopener noreferrer"
              className={container1InfoLink}
            >
              Get the Book&nbsp;
              <svg viewBox="0 0 185.343 185.343" height="10px" width="10px">
                <path
                  d="M51.707 185.343a10.692 10.692 0 0 1-7.593-3.149 10.724 10.724 0 0 1 0-15.175l74.352-74.347L44.114 18.32c-4.194-4.194-4.194-10.987 0-15.175 4.194-4.194 10.987-4.194 15.18 0l81.934 81.934c4.194 4.194 4.194 10.987 0 15.175l-81.934 81.939a10.678 10.678 0 0 1-7.587 3.15z"
                  fill="#010002"
                />
              </svg>
            </a>
          </div>
          <div style={{ marginBottom: '10px' }} />
          <small>
            <a
              href="https://www.amazon.com/Will-Smith-Biography-Greenwood-Biographies/dp/0313376107"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get it on Amazon.
            </a>
          </small>
        </div>
      </div>
    </div>
  )
}

Book.defaultProps = bookDefaultProps

Book.propTypes = bookPropTypes