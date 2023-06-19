import React, { lazy, Suspense } from "react"

import PropTypes from "prop-types"

import ChevronRightCirc from "../stories/assets/chevron-right-circ.svg"

const renderLink = (linkItem, isButtons, hasChevron) => {
  switch (linkItem.linkType) {

    case "email":
      return (
        <a
          target="_blank"
          rel="noreferrer noopener"
          href={`mailto:` + linkItem.email}
          title={`mailto:` + linkItem.email}
          className={isButtons ? "button" : ""}
        >
          {linkItem.linkText}
        </a>
      )
    case "internal":
      return (
        <a
          href={linkItem.pageLink.uri}
          className={isButtons ? "button" : ""}
        >
          {linkItem.linkText}
          {hasChevron && <ChevronRightCirc />}
        </a>
      )
    case "external":
      return (
        <a
          target="_blank"
          rel="noreferrer noopener"
          href={linkItem.externalUrl}
          className={isButtons ? "button" : ""}
        >
          {linkItem.linkText}
        </a>
      )
    case "file":
      if (linkItem.forceDownload) {
        return (
          <a
            target="_blank"
            rel="noreferrer noopener"
            download={`${linkItem.file.localFile.name}${linkItem.file.localFile.ext}`}
            href={linkItem.file.localFile.publicURL}
            className={isButtons ? "button" : ""}
          >
            {linkItem.linkText}
          </a>
        )
      } else {
        return (
          <a
            target="_blank"
            rel="noreferrer noopener"
            href={linkItem.file.localFile.publicURL}
            className={isButtons ? "button" : ""}
          >
            {linkItem.linkText}
          </a>
        )
      }

    // removed "form" option from link types
    default:
      return null
  }
}

const HyperLinks = ({ ...props }) => {
  return (
    <ul className="link-list">
      {props.data.map((linkItem, i) => {
        return (
          <li key={`${i}_${linkItem.id}`}>
            {renderLink(linkItem, props.buttons, props.hasChevron)}
          </li>
        )
      })}
    </ul>
  )
}

export default HyperLinks

HyperLinks.propTypes = {
  data: PropTypes.array.isRequired,
}
