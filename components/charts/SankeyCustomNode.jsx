import { Rectangle, Layer } from "recharts";
import { toMoney } from '../../utils/intlFormats'

export const SankeyCustomNode = ({
    x,
    y,
    width,
    height,
    index,
    payload,
    containerWidth,
    threshold
}) => {
    // const isOut = x + width + 6 > containerWidth;
    const isYearNode = /[0-9]{4}/.test(payload.name)
    return (
        <Layer key={`CustomNode${index}`}>
            <Rectangle
                x={x}
                y={y}
                width={width}
                height={height}
                fill="#3b4252"
                fillOpacity="1"
            />

            {payload.value >= threshold &&
                <>
                    <text
                        textAnchor={isYearNode ? 'start' : 'end'}
                        x={isYearNode ? x + 15 : x - 5}
                        y={y + height / 2}
                        fontSize="14"
                        stroke="#333"
                    >
                        {payload.name}
                    </text>
                    <text
                        textAnchor={isYearNode ? 'start' : 'end'}
                        x={isYearNode ? x + 15 : x - 4}
                        y={y + height / 2 + 13}
                        fontSize="13"
                        stroke="#333"
                        strokeOpacity="0.5"
                    >
                        {toMoney({ number: payload.value })}
                    </text>
                </>
            }
        </Layer>
    );
};