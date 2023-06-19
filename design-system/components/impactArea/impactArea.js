import React from "react"

import HyperLinks from "../hyperlinks"

import './impactArea.scss'


const ImpactArea = ({ data }) => {

  if (data.impactArea.hideImpactArea) return null


  const renderMockupBackground = (data) => {
    const backupImage = `https://cms.vibemap.com/wp-content/uploads/2020/06/Dreamy000-compressed-11zon-min.jpg`;

    const backgroundImage = data && data.impactArea && data.impactArea.vibeset && data.impactArea.vibeset.vibesetDetails
      ? data.impactArea.vibeset.vibesetDetails.gradientImage.mediaItemUrl
      : backupImage

    const featuredImage = data.impactArea && data.impactArea.backgroundImage
      ? data.impactArea.backgroundImage.sourceUrl
      : ''
    switch (data.impactArea.backgroundType) {
      case "color":
        return (
          <div
            className={`fill color-fill c-${data.impactArea.backgroundColor}`}
          ></div>
        )

      case "image":
        return (
          <div
            className={`fill image-fill`}
            style={{
              backgroundImage: `url(${featuredImage})`,
            }}
          ></div>
        )

      case "vibe_static":
        return (
          <div
            className={`fill image-fill`}
            style={{
              backgroundImage: `url(${backgroundImage})`,
            }}
          ></div>
        )

      // add option for gradient colors

    }
  }
  const renderImpactArea = (data) => {

    return (
      <>
        {data && data.impactArea && data.impactArea.heading
          ?
          <div className={`container ${data.impactArea.backgroundType} container_height`}>
            <div className={`impact-area-content`} >
              <h1>
                {data.impactArea.heading}
              </h1>
              <p> {data && data.impactArea && data.impactArea.fullImageFields ? data.impactArea.fullImageFields.bodyText : ''} </p>
              {data?.impactArea?.fullImageFields?.links
                ? <HyperLinks
                    buttons={true}
                    data={data?.impactArea?.fullImageFields?.links}
                    hasChevron={false} />
                : null }
            </div>
          </div>
          :
          <div className={`container ${data.impactArea.backgroundType}`}>
            <h1 className={`title c-${data.impactArea.textColor}`}>
              <span>
                {data.title
                }
              </span>
            </h1>
          </div>
        }

      </>
    )

  }
  return (
    <div className="s-impact-area">
      {renderImpactArea(data)}
      <div className="background">
        {data && data.impactArea && renderMockupBackground(data)}
      </div>
    </div>
  )
}

export default ImpactArea