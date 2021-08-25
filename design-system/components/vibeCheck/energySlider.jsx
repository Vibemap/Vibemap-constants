import React, { Component } from 'react';

import CircularSlider from '@fseehawer/react-circular-slider';
import Gradient from '@bit/vibemap.components.gradient';

class EnergySlider extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let {
            energyIndex,
            color1,
            color2,
            label,
            showGradient,
        } = this.props

        const oddOrEven = ( energyIndex & 1 ) ? 'odd' : 'even'

        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center'
            }}>
                <div className={'energy ' + oddOrEven}>
                    {showGradient &&
                        <Gradient
                            color1={color1}
                            color2={color2}
                        />
                    }
                    <div className={'label'}>
                        {label}
                    </div>
                </div>
                <CircularSlider
                    dataIndex={energyIndex}
                    knobColor={'#666666'}
                    knobDraggable={true}
                    min={0}
                    max={6}
                    width={200}
                    hideLabelValue={true}
                    progressColorFrom="#EEEEEE"
                    progressColorTo="#DDDDDD"
                    onChange={ value => { this.props.onChange(value) } }
                />
            </div>

        )
    }
}

EnergySlider.defaultProps = {
    label: 'Calm',
    showGradient: true,
    showLabel: true
};

export default EnergySlider;
