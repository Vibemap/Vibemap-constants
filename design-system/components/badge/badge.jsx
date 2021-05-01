import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

// TODO: Install from Bit
import { Container } from '../card'
import Heading from '../heading'

import styled from 'styled-components'
import SVG from 'react-inlinesvg'
import * as vibes from 'vibemap-constants/dist/vibes.js'
import badges from 'vibemap-constants/dist/badges.json'

// TODO: make this it's own component
export const Icon = ({ icon, vibe, ...props }) => {
  const iconRef = useRef(null)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const importIcon = async () => {
      try {
        const { default: namedImport } = await import(`vibemap-constants/design-system/assets/icons/badges/${icon}.svg`);
        iconRef.current = namedImport
      } catch (err) {
        throw err;
      } finally {
        setLoading(false);
      }
    }
    importIcon();
  }, [icon]);

  const Noise = styled.div`
    background-image: url('https://vibemap.com/static/noise-035aa3a66cdd98b5e854b3132267bed3.gif');
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
    mix-blend-mode: multiply;
    opacity: 0.085;
    background-size: 100px 100px;
  `;

  const gradientStyle = {
    background: vibes.getVibeGradient(vibe),
    padding: '1rem',
    alignItem: 'center',
    display: 'flex'
  }

  const svgStyle = {
    height: 'auto',
    position: 'relative',
    zIndex: 10
  }

  const { current: ImportedIcon } = iconRef

  return (
    <div className='sing-card-image' style={gradientStyle}>
      {!loading && iconRef &&
        <SVG
          src={ImportedIcon}
          style={svgStyle}/>
      }
      <Noise/>
    </div>
  )
}

const Badge = ({
  badge,
  title,
  subtitle,
  description,
  orientation,
  width,
  vibe,
  ...props }) => {

    const image = <Icon icon={badge} vibe={vibe}/>

    const content = (
      <div className='content' style={{ margin: '1rem'}}>
        <span className='category'>{subtitle}</span>
        <Heading label={title} size='h5'/>
        <div className="description">
          {description}
        </div>
      </div>
    )
    return (
      <Container
        image={image}
        content={content}
        orientation={orientation}
        width={width}>
      </Container>
  )
}

Badge.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  badge: PropTypes.oneOf(badges.badges.map(badge => badge.key)),
  orientation: PropTypes.oneOf(['vertical', 'horizontal']),
  width: PropTypes.string,
  vibe: PropTypes.string,
}

Badge.defaultProps = {
  title: 'Card Title',
  subtitle: 'Sub Title',
  description: 'Description goes here.',
  badge: 'collector',
  orientation: 'horizontal',
  onClick: undefined,
  width: '360px'
}

export const BadgeProps = Badge.propTypes

export default Badge
